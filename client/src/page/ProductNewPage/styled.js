import styled from "styled-components";

export const Container = styled.div`
  #error {
    border: 1px solid orange;
  }
  .error {
    border: 1px solid orange;
  }
  & .active_menu {
    color: red;
    font-weight: 800;
  }
  & input[type="text"]:hover {
    border: 1px solid black;
  }
  & input[type="text"]:focus {
    border: 1px solid black;
  }

  & ul {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
  }

  & li:hover {
    cursor: pointer;
  }

  & li:first-child {
    //padding: 0px 30px 0px 0px;
  }

  & li {
    border-right: 1px solid #eeeeee;
    font-size: 13px;
    float: left;
    padding: 0px 30px;
    margin: 20px 0;
  }

  & li:last-child {
    float: left;
    border: none;
  }

  & .bold_hr {
    height: 1px;
    background-color: #000000;
    margin-top: 28px;
  }

  & h1 {
    font-size: 24px;
    font-weight: 400;
  }

  & h1 span {
    font-size: 16px;
    color: red;
  }

  & h2 {
    margin: 0px;
    padding: 0px;
    font-size: 18px;
    font-weight: 400;
    //border: 1px solid black;
  }

  & h2 span {
    color: red;
  }

  & h2 .img_cnt {
    font-size: 14px;
    color: gray;
  }

  //  라디오 버튼
  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 3px solid #c3c2cc;
    margin: 0px;
    padding: 0px;
    background-color: white;
    position: relative;
  }

  input[type="radio"]:hover::before {
    content: "";
    width: 30px;
    height: 30px;
    background-color: black;
    position: absolute;
    border-radius: 100%;
    opacity: 0.1;
    top: -8px;
    left: -8px;
  }

  input[type="radio"]:checked {
    border: 3px solid #ff5058;
  }

  input[type="radio"]:checked::after {
    background-color: #ff5058;
    border-radius: 100%;
    top: 2px;
    left: 2px;
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
  }

  label {
    margin: 0px 40px 0 6px;
  }

  . img_upload_label {
    margin: 0px;
  }
`;

export const ImgUploadLabel = styled.label`
  color: #8a8a8a;
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
`;

export const InputSection = styled.table`
  padding: 0;
  margin: 0;

  tr {
    border-bottom: 1px solid #d7d7d7;
  }

  td {
    padding: 32px 0;
  }

  td:first-child {
    width: 170px;
    text-align: left;
    vertical-align: top;
  }

  td:nth-child(2) {
    width: 846px;
  }

  .img_description {
    color: #4aa4ff;
    font-size: 14px;
    line-height: 28px;
  }

  input {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid #a4a4a4;
  }
`;
export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: orange;
`;

export const Title = styled.td`
  position: relative;
  input[type="text"] {
    width: 750px;
    margin-bottom: 12px;
  }
`;
export const ProductImgSection = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;

  .product_image_index {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: black;
    border: none;
    color: #ffffff;
    border-radius: 25px;
    font-size: 10px;
    width: 22px;
    height: 22px;
    opacity: 0.4;
  }

  .title_image::before {
    content: "대표이미지";
    position: absolute;
    background-color: black;
    color: white;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 12px;
    //top: 40px;
    top: 10px;
    left: 10px;
    opacity: 0.4;
  }

  .img_wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
  }

  img {
    width: 200px;
    height: auto;
  }
`;
export const Category = styled.td`
  color: #000000;

  .active {
    color: red;
    font-weight: 800;
  }

  li:first-child {
    float: none;
    margin-top: 5px;
  }

  li {
    float: none;
    padding: 10px 20px;
    margin: 0;
    font-size: 16px;
  }

  li:last-child {
    float: none;
    margin-bottom: 5px;
  }

  li:hover {
    background-color: #fdebeb;
  }

  .category_scroll {
    height: 250px;
    //border: 1px solid red;
    overflow-y: scroll;
    //padding: 12px;
  }

  td {
    border: 1px solid #c4c4c4;
    height: 250px;
    padding: 0;
    margin: 0;
    //padding: 24px;
  }

  tr {
    padding: 0;
    margin: 0;
  }

  td:nth-child(1) {
    width: 250px;
  }

  td:nth-child(2) {
    width: 250px;
  }

  td:nth-child(3) {
    width: 250px;
  }

  .selected_category {
    color: red;
    margin-top: 16px;
  }
`;
export const TrandingArea = styled.td`
  button {
    font-size: 16px;
    width: 110px;
    height: 50px;
    padding: 0;
    margin: 0 16px 16px 0;
    background-color: #ffffff;
    border: 1px solid #c4c4c4;
    border-radius: 2px;
  }

  & input[type="text"] {
    font-size: 16px;
    width: 810px;
    border: 1px solid #c4c4c4;
    background-color: #f4f4fa;
  }
`;

export const Status = styled.td`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
export const Exchange = styled.td`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
export const Price = styled.td`
  & input[type="text"] {
    width: 200px;
  }

  & input[type="checkbox"] {
    //display: block;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 3px solid #c3c2cc;
    margin: 0px;
    padding: 0px;
    background-color: white;
    position: relative;
  }

  & input[type="checkbox"]::after {
    content: "";
    width: 6px;
    height: 3px;
    top: 2px;
    left: 2px;
    border-bottom: 3px solid #c3c2cc;
    border-left: 3px solid #c3c2cc;
    position: absolute;
    transform: rotate(-45deg);
  }

  & input[type="checkbox"]:hover::before {
    cursor: pointer;
    content: "";
    width: 30px;
    height: 30px;
    background-color: black;
    position: absolute;
    border-radius: 100%;
    opacity: 0.1;
    top: -8px;
    left: -8px;
  }

  & input[type="checkbox"]:checked {
    border: 3px solid #ff5058;
    background-color: #ff5058;
  }

  & input[type="checkbox"]:checked::after {
    border-bottom: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
  }

  label:hover {
    cursor: pointer;
  }

  .delivery_charge_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
`;
export const ProductDescription = styled.td`
  position: relative;
  & textarea {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 400;
    width: 810px;
    height: 130px;
    border: 1px solid #a4a4a4;
    resize: none;
  }

  & .description_length {
    position: absolute;
    top: 195px;
    right: 0px;
  }
  & .warning {
    color: #a4a4a4;
  }
`;

export const Tag = styled.td`
  & .input_wrapper {
    border: 1px solid #a4a4a4;
    height: 50px;
    width: 839px;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    padding: 0px 3px;
  }

  & .tag_item {
    white-space: nowrap;
    background-color: #f4f4fa;
    padding: 5px 12px;
    margin: 0 5px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .tag_del {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    background-color: #c3c2cc;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    color: #f4f4fa;
    font-weight: bold;
    font-size: 12px;
  }

  & .tag_del:hover {
    cursor: pointer;
  }

  & input[type="text"] {
    border: none;
    margin-left: 3px;
    width: 100%;
  }
  & input[type="text"]:hover {
    border: none;
  }
  & input[type="text"]:focus {
    border: none;
  }
  & ul {
    margin: 0px;
    padding: 0px;
    border: none;
  }

  & li {
    border: none;
    float: none;
    margin: 0px;
    padding: 4px 0;
    font-size: 16px;
    color: #a4a4a4;
  }
`;

export const ProductQuantity = styled.td``;
export const SubmitSection = styled.div`
  position: sticky;
  background-color: #fafafd;
  height: 90px;
  bottom: 0px;
  border-top: 1px solid #a4a4a4;
  & button {
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    float: right;
    width: 160px;
    height: 55px;
    border-radius: 4px;
    background-color: #ff5058;
    border: none;
    margin: 16px 0;
  }
  & button:hover {
    cursor: pointer;
    background-color: #ed4c54;
  }
`;
