import {
  Container,
  ProductContainer,
  ProductImgs,
  ProductContent,
  ProductInfoContainer,
  ProductDescriptionContainer,
  ProductInfoContent,
  ProductButton,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, withRouter } from "react-router-dom";
import { daysFormat } from "../../utils/Time";
import { intOfKr } from "../../utils/Currency";
import { AiFillHeart, AiFillEye, AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProductAskSection from "./Section/ProductAskSection";
import StoreInfoSection from "./Section/StoreInfoSection";
import { useSelector } from "react-redux";
import ProductFavoriteSection from "./Section/ProductFavoriteSection";
import ProductTalkSection from "./Section/ProductTalkSection";

// 새로운 페이지 생성시 기본 구조
export const ProductDetailPage = ({ history }) => {
  const store = useSelector((state) => state.user);
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [productImgs, setProductImgs] = useState([]);
  const [user, setUser] = useState({});
  const [isMyProduct, setIsMyProduct] = useState(false);

  // 이미지 슬라이더
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [totalImgIndex, setTotalImgIndex] = useState(false);
  const productImg = useRef();

  // 활성화된 탭 메뉴
  const [tabMenu, setTabMenu] = useState(0);

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  useEffect(() => {
    const productId = getProductId();

    axios
      .get(`/product/detail/${productId}`)
      .then((res) => {
        console.log("res detail >> ", res);
        setProduct(res.data);
        setUser(res.data.userInfo[0]);
        setProductImgs(res.data.productImgURLs);
        setTotalImgIndex(res.data.productImgURLs.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    productImg.current.style.transition = "all 0.2s ease-in-out";
    productImg.current.style.transform = `translateX(-${currentImgIndex}00%)`;
  }, [currentImgIndex]);

  const onClickNextImage = () => {
    if (currentImgIndex >= totalImgIndex - 1) setCurrentImgIndex(0);
    else setCurrentImgIndex(currentImgIndex + 1);
  };

  const onClickPreviewImage = () => {
    if (currentImgIndex === 0) setCurrentImgIndex(totalImgIndex - 1);
    else setCurrentImgIndex(currentImgIndex - 1);
  };

  return (
    <Container>
      <ProductContainer>
        <ProductImgs>
          <div className="slidebox" ref={productImg}>
            {productImgs &&
              productImgs.map((product) => <img src={product.productImgURL} />)}
          </div>
          {currentImgIndex !== 0 && (
            <button className="prev-btn" onClick={onClickPreviewImage}></button>
          )}
          {currentImgIndex !== totalImgIndex - 1 && (
            <button className="next-btn" onClick={onClickNextImage}></button>
          )}
        </ProductImgs>
        <ProductContent>
          <div className="title">{product.title}</div>
          <div className="price">
            {intOfKr(product.price)} <span>원</span>
          </div>
          <hr />
          <div className="icons">
            <AiFillHeart /> <span>0</span>
            <AiFillEye /> <span>20</span>
            <AiFillClockCircle /> <span>{daysFormat(product.createdAt)}</span>
          </div>

          <table className="product_table">
            <div className="newProduct">
              <tr>
                <td>
                  <strong>·</strong>&nbsp;상품상태
                </td>
                <td>{product.newProduct ? "중고" : "새상품"}</td>
              </tr>
            </div>
            <div className="enableExchange">
              <tr>
                <td>
                  <strong>·</strong>&nbsp;교환여부
                </td>
                <td>{product.enableExchange ? "교환불가능" : "교환가능"}</td>
              </tr>
            </div>
            <div className="containDeliveryCharge">
              <tr>
                <td>
                  <strong>·</strong>&nbsp;배송비
                </td>
                <td style={{ color: "#6e47ee" }}>
                  {product.containDeliveryCharge
                    ? "배송비 별도"
                    : "배송비 포함"}
                </td>
              </tr>
              <span></span>
            </div>
            <div className="address">
              <tr>
                <td>
                  <strong>·</strong>&nbsp;거래지역
                </td>
                <td>
                  <FaMapMarkerAlt size={12} style={{ color: "#999999" }} />
                  &nbsp;
                  {product.address === "지역설정안함"
                    ? "전국"
                    : product.address}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>·</strong>&nbsp;카테고리
                </td>
                <td>
                  {product.largeCateogry} > {product.mediumCategory} >{" "}
                  {product.smallCategory}
                </td>
              </tr>
            </div>
          </table>
          <ProductButton>
            <ProductFavoriteSection
              favoriteList={product.productFavoriteCount}
              store={store}
            />
            <ProductTalkSection
              storeOfProduct={product.userInfo}
              user={store}
            />

            {/*<button style={{ background: "#f70000" }}>바로구매</button>*/}
          </ProductButton>
        </ProductContent>
      </ProductContainer>
      <ProductDescriptionContainer>
        <ProductInfoContainer>
          <ul>
            <li
              className={tabMenu === 0 && "active"}
              onClick={() => setTabMenu(0)}
            >
              상품정보
            </li>
            <li
              className={tabMenu === 1 && "active"}
              onClick={() => setTabMenu(1)}
            >
              상품문의
            </li>
            <li></li>
          </ul>

          <ProductInfoContent>
            <h3>상품정보</h3>
            <hr />
            {product.description &&
              product.description.split("\n").map((line) => (
                <>
                  {line} <br />
                </>
              ))}
            <ProductAskSection />
          </ProductInfoContent>
          <StoreInfoSection user={user} />
        </ProductInfoContainer>
      </ProductDescriptionContainer>
    </Container>
  );
};

export default withRouter(ProductDetailPage);
