import { useCallback, useEffect, useRef, useState } from "react";
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
const LandingPage = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadProducts = useCallback((pageNum) => {
    setLoading(true);
    axios
      .get(`/product/all?page=${pageNum}`)
      .then((res) => {
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setProductList((prevList) => [...prevList, ...res.data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts(page);
  }, [page, loadProducts]);

  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <>
      <Banner></Banner>
      <SectionTitle>오늘의 상품 추천</SectionTitle>
      <ProductSection>
        {productList &&
          productList.map((product, index) => {
            if (productList.length === index + 1) {
              return (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  ref={lastProductElementRef}
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
                      <div className="time">
                        {daysFormat(product.createdAt)}
                      </div>
                    </ProductContents>
                  </Product>
                </Link>
              );
            } else {
              return (
                <Link key={product._id} to={`/product/${product._id}`}>
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
                      <div className="time">
                        {daysFormat(product.createdAt)}
                      </div>
                    </ProductContents>
                  </Product>
                </Link>
              );
            }
          })}
        {loading && <div>Loading...</div>}
      </ProductSection>
    </>
  );
};

export default LandingPage;
