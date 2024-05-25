import { useInfiniteQuery } from "react-query";
import { useCallback, useRef } from "react";
import axios from "axios";
import Banner from "./Section/Banner";
import {
  SectionTitle,
  ProductSection,
  ProductContents,
  Product,
} from "./styled";
import { Link } from "react-router-dom";
import { intOfKr } from "../../utils/Currency";
import { daysFormat } from "../../utils/Time";

// 제품 데이터를 가져오는 함수
const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/product/all?page=${pageParam}`);
  return res.data;
};

const LandingPage = () => {
  const observer = useRef();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery("products", fetchProducts, {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
    });

  const lastProductElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <>
      <Banner />
      <SectionTitle>오늘의 상품 추천</SectionTitle>
      <ProductSection>
        {data?.pages.map((page, pageIndex) =>
          page.map((product, productIndex) => {
            const isLastProduct =
              pageIndex === data.pages.length - 1 &&
              productIndex === page.length - 1;
            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                ref={isLastProduct ? lastProductElementRef : null}
              >
                <Product>
                  <div className="img_wrapper">
                    <img
                      width={190}
                      src={product.thumbnailImgURL}
                      alt={product.title}
                    />
                  </div>
                  <ProductContents>
                    <div className="title">{product.title}</div>
                    <div className="price">
                      {intOfKr(product.price)} <span>원</span>
                    </div>
                    <div className="time">{daysFormat(product.createdAt)}</div>
                  </ProductContents>
                </Product>
              </Link>
            );
          })
        )}
        {(isFetching || isFetchingNextPage) && <div>Loading...</div>}
      </ProductSection>
    </>
  );
};

export default LandingPage;
