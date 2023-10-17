import {
  Container,
  Content,
  Title,
  SearchInput,
  Sell,
  MyShop,
  LighteningTalk,
  SideMenu,
  SellerCenter,
  AutoSell,
} from "./styled";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";
import { GiBottomRight3DArrow } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import CategoryMenu from "../../../components/CategoryMenu";
import { Link, Route, Switch, useLocation, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import SigninModal from "../../../components/SigninModal";

const SearchNav = ({ history }) => {
  const [showSigninModal, setShowSigninModal] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [showDeleteSearch, setShowDeleteSearch] = useState(false);
  const user = useSelector((state) => state.user);

  const location = useLocation();

  useEffect(() => {
    // 검색 파라미터 분석
    const [type, keyword] = location.search.replace("?", "").split("=");
    setSearchValue(keyword);
  }, []);

  function onSubmitSearch(e) {
    e.preventDefault();

    if (searchValue === "") return;

    history.push(`/search?q=${searchValue}`);
  }

  const onChangeSearchValue = (e) => {
    if (e.target.value !== "") setShowDeleteSearch(true);
    else setShowDeleteSearch(false);

    setSearchValue(e.target.value);
  };
  const onDeleteSearchValue = () => {
    setSearchValue("");
    setShowDeleteSearch(false);
  };

  const onClickHome = () => {
    history.push("/");
  };
  const onClickAutoSell = () => {
    if (!user.isSignin) setShowSigninModal((prev) => !prev);
    else history.push("/product/new-ai");
  };
  const onClickSell = () => {
    if (!user.isSignin) setShowSigninModal((prev) => !prev);
    else history.push("/product/new");
  };
  const onClickShop = () => {
    console.log(user.isSignin);
    if (!user.isSignin) setShowSigninModal((prev) => !prev);
    else history.push(`/shop/${user.isSignin.data._id}`);
  };
  const onClickTalk = () => {
    if (!user.isSignin) setShowSigninModal((prev) => !prev);
    else history.push("/talk");
  };

  return (
    <Container>
      <Content>
        <Title id="logo_title" onClick={onClickHome} className="cursor_pointer">
          <BsFillLightningChargeFill
            size={28}
            style={{
              transform: "rotate(-5deg)",
              position: "absolute",
              left: "-32px",
              top: "4px",
            }}
          />
          벼락장터
        </Title>
        {/* Search Section */}
        <form onSubmit={onSubmitSearch}>
          <SearchInput
            placeholder="상품명 입력"
            // placeholder="상품명, @상점명, #태그명 입력"
            onChange={onChangeSearchValue}
            value={searchValue}
          ></SearchInput>
        </form>
        <BiSearch
          onClick={onSubmitSearch}
          className="cursor_pointer"
          size={20}
          style={{
            position: "absolute",
            top: "47px",
            left: "570px",
            color: "red",
          }}
        />
        {showDeleteSearch && (
          <IoIosClose
            onClick={onDeleteSearchValue}
            className="cursor_pointer"
            size={28}
            style={{
              position: "absolute",
              top: "42px",
              left: "630px",
              color: "#787878",
            }}
          />
        )}
        {/* End Search Section */}
        {/* Right Nav Section */}
        <AutoSell className="cursor_pointer" onClick={onClickAutoSell}>
          <span>
            <GiBottomRight3DArrow />
          </span>
          자동등록
        </AutoSell>
        <Sell className="cursor_pointer" onClick={onClickSell}>
          <span>
            <MdOutlineSell />
          </span>
          판매하기
        </Sell>
        <MyShop className="cursor_pointer" onClick={onClickShop}>
          <span>
            <BsShop />
          </span>
          내상점
        </MyShop>
        <LighteningTalk className="cursor_pointer" onClick={onClickTalk}>
          <span>
            <RiMessage3Line />
          </span>
          벼락톡
        </LighteningTalk>
        {/* End Right Nav Section */}
        <CategoryMenu />
        <SellerCenter>
          벼락장터 판매자센터
          <IoIosArrowForward style={{ position: "absolute", top: "4px" }} />
        </SellerCenter>
      </Content>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </Container>
  );
};

export default withRouter(SearchNav);
