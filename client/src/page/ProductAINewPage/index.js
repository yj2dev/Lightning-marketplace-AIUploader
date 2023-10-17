import { Container, ProductImageDescription, SubmitSection } from "./styled";
import { withRouter } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  ErrorMessage,
  ImgUploadLabel,
  InputSection,
  Price,
  ProductImgSection,
} from "../ProductNewPage/styled";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

// 새로운 페이지 생성시 기본 구조
export const ProductAINewPage = ({ history }) => {
  const MAX_IMAGE = 12;
  const [productImage, setProductImage] = useState([]);
  const [productImageURL, setProductImageURL] = useState([]);
  const [productImageError, setProductImageError] = useState({
    required: false,
  });

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState({ minPrice: false });
  const [containDeliveryCharge, setContainDeliveryCharge] = useState(false);

  const [loading, setLoading] = useState(false);

  const imageList = useRef();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // 로그인이 안된 유저가 해당 페이지 접근시 랜딩페이지로 이동
    if (!user.isSignin) {
      history.push("/");
    }
  }, []);

  const currencyOfInt = (value) => {
    return parseInt(value.replaceAll(",", ""));
  };

  const onChangePrice = (e) => {
    const value = e.target.value.replaceAll(",", "");

    const regex = /^[0-9]+$/;
    if (value !== "" && !regex.test(value)) return;

    // 최소 가격 제한 ( 100 ~ )
    if (parseInt(value) < 100) setPriceError({ minPrice: true });
    else setPriceError({ minPrice: false });

    // 최대 가격 제한 ( ~ 999,999,999 )
    if (value.length > 9) return;

    const KRValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(KRValue);
  };

  const onValidateTotal = () => {
    let validateResult = false;

    // 이미지
    if (productImage.length < 1) {
      setProductImageError({ minLength: true });
      validateResult = true;
    } else {
      setProductImageError({ minLength: false });
    }

    // 가격
    if (price < 100) {
      setPriceError({ minPrice: true });
      validateResult = true;
    } else {
      setPriceError({ minPrice: false });
    }

    return validateResult;
  };

  const onSubmitNewAIProduct = () => {
    if (onValidateTotal()) return;

    setLoading(true);

    const formData = new FormData();

    for (let i = 0; i < productImage.length; i++) {
      formData.append("image", productImage[i]);
    }

    const payload = {
      title: null,
      largeCateogry: null,
      mediumCategory: null,
      smallCategory: null,
      address: "지역설정안함",
      newProduct: true,
      enableExchange: true,
      price: currencyOfInt(price),
      containDeliveryCharge: true,
      description: null,
      tag: null,
      quantity: 1,
    };

    const stringPayload = JSON.stringify(payload);
    formData.append("data", stringPayload);

    axios
      .post("/product/upload-ai", formData)
      .then((res) => {
        console.log("product res >> ", res);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log("product err >> ", err);
      });
  };

  const onChangeImage = (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (productImage.length < 1) {
      setProductImageError({ required: true });
    } else {
      setProductImageError({ required: false });
    }

    if (files.length + productImage.length > MAX_IMAGE) {
      alert("사진 첨부는 최대 12장까지 가능합니다.");
      return;
    }

    const imageDataArray = productImage;
    const imageURLArray = productImageURL;

    for (let i = 0; i < files.length; i++) {
      imageDataArray.push(e.target.files[i]);
      imageURLArray.push(URL.createObjectURL(e.target.files[i]));
    }

    setProductImage(imageDataArray);
    setProductImageURL(imageURLArray);
  };

  const onDeleteProductImage = (e) => {
    if (productImage.length === 0 || productImageURL.length === 0) {
      alert("삭제할 이미지가 존재하지 않습니다.");
      return;
    }

    const imageDataArray = productImage;
    const imageURLArray = productImageURL;

    imageDataArray.splice(parseInt(e.target.value), 1);
    imageURLArray.splice(parseInt(e.target.value), 1);

    setProductImage(imageDataArray);
    setProductImageURL(imageURLArray);

    console.log(productImage);
    console.log(productImageURL);
    history.push("/product/new-ai");
    // imageList.current.v;
  };

  return (
    <Container>
      <ul>
        <li
          className="active_menu"
          onClick={() => history.push("/product/new-ai")}
        >
          자동등록
        </li>
        <li onClick={() => history.push("/product/new")}>상품등록</li>
        <li onClick={() => history.push("/product/manage")}>상품관리</li>
      </ul>

      <h1>
        대표이미지는 최대한 <strong>상품을 설명할 수 있는 이미지</strong>로
        등록해주세요.
      </h1>
      <hr className="bold_hr" />

      <InputSection>
        {/* 상품이미지 Section */}
        <tr>
          <td>
            <h2>
              상품이미지<span>*</span>
              &nbsp;
              <span className="img_cnt">
                ({productImageURL.length}/{MAX_IMAGE})
              </span>
            </h2>
          </td>
          <td>
            <ImgUploadLabel
              className={`cursor_pointer img_upload_label ${
                productImageError.minLength && "error"
              }`}
              for="product_image"
            >
              <AiFillCamera size={42} style={{ color: "d7d7d7" }} />
              이미지 등록
            </ImgUploadLabel>
            <input
              type="file"
              accept="image/*"
              id="product_image"
              className="hidden"
              multiple
              onChange={onChangeImage}
            />
            {productImageError.minLength && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;상품 사진을 등록해주세요.
              </ErrorMessage>
            )}
            <ProductImgSection ref={imageList}>
              {productImageURL &&
                productImageURL.map((imageURL, i) => (
                  <div key={i} className="img_wrapper">
                    <span className={!i && "title_image"}></span>
                    <button
                      className="product_image_index cursor_pointer"
                      value={i}
                      id="image_id"
                      onClick={onDeleteProductImage}
                    >
                      &times;
                    </button>
                    <img src={imageURL} />
                  </div>
                ))}
            </ProductImgSection>

            <ProductImageDescription>
              <br />- 첫 번째로 등록한 이미지가 <strong>대표이미지</strong>가
              됩니다.
              <br />
              - 상품 등록까지 최대 1분까지 걸릴 수 있습니다.
              <br />
              - 상품 포장지나 구매했던 박스를 등록하면 더욱 자세한 정보로 등록할
              수 있습니다.
              <br />
              - 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.
              <br />
            </ProductImageDescription>
          </td>
        </tr>
        {/*  End 상품이미지 Section */}

        {/* 가격 Section */}
        <tr>
          <td>
            <h2>
              가격<span>*</span>
            </h2>
          </td>
          <Price>
            <input
              type="text"
              placeholder="숫자만 입력해주세요."
              value={price}
              onChange={onChangePrice}
              id={priceError.minPrice && "error"}
            />
            &nbsp;&nbsp;&nbsp;원
            {priceError.minPrice && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;100원 이상 입력해주세요.
              </ErrorMessage>
            )}
            <br />
            <div className="delivery_charge_wrapper">
              <input
                type="checkbox"
                id="delivery_charge_include"
                checked={containDeliveryCharge}
                onClick={() => setContainDeliveryCharge((prev) => !prev)}
              />
              <label htmlFor="delivery_charge_include">배송비 포함</label>
            </div>
          </Price>
          {/* End 가격 Section */}
        </tr>
      </InputSection>

      <SubmitSection>
        <button disabled={loading} onClick={onSubmitNewAIProduct}>
          {!loading && "자동등록하기"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </SubmitSection>
    </Container>
  );
};

export default withRouter(ProductAINewPage);
