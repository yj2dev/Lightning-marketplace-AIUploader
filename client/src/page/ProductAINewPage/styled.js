import styled from "styled-components";

export const Container = styled.div`
  & .active_menu {
    color: #4aa4ff;
    font-weight: 800;
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
    background-color: #8fc5ff;
    margin-top: 28px;
  }

  & h1 {
    font-size: 24px;
    color: #4aa4ff;
    font-weight: 400;
    text-align: center;
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
`;

export const ProductImageDescription = styled.div`
  color: #4aa4ff;
  line-height: 32px;
  font-size: 14px;
`;

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
    background-color: #4aa4ff;
    border: none;
    margin: 16px 0;
  }

  & button:hover {
    cursor: pointer;
    background-color: #2a92f8;
  }
`;
