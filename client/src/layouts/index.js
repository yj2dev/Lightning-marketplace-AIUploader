import { Route, Switch, withRouter, useLocation, Link } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Container } from "./styled";
import TopNav from "./Header/TopNav";
import SearchNav from "./Header/SearchNav";
import KakaoOAuthPage from "../page/KakaoOAuthPage";
import NaverOAuthPage from "../page/NaverOAuthPage";
import FacebookOAuthPage from "../page/FacebookOAuthPage";
import Footer from "./Footer";
import Auth from "../hoc/Auth";

// import MyShopPage from "../page/MyShopPage";
// import DevPage from "../page/DevPage";
// import ProductNewPage from "../page/ProductNewPage";
// import ProductAINewPage from "../page/ProductAINewPage";
// import PhoneNumberAuthPage from "../page/PhoneNumberAuthPage";
// import TalkPage from "../page/TalkPage";
// import SignupPage from "../page/SignupPage";
// import SigninPage from "../page/SigninPage";
import LandingPage from "../page/LandingPage";
// import ProductDetailPage from "../page/ProductDetailPage";
// import ProductManagePage from "../page/ProductManagePage";
// import SettingPage from "../page/SettingPage";
// import SearchPage from "../page/SearchPage";
// import TestPage from "../page/TestPage";

const MyShopPage = lazy(() => import("../page/MyShopPage"));
const DevPage = lazy(() => import("../page/DevPage"));
const ProductNewPage = lazy(() => import("../page/ProductNewPage"));
const ProductAINewPage = lazy(() => import("../page/ProductAINewPage"));
const PhoneNumberAuthPage = lazy(() => import("../page/PhoneNumberAuthPage"));
const TalkPage = lazy(() => import("../page/TalkPage"));
const SignupPage = lazy(() => import("../page/SignupPage"));
const SigninPage = lazy(() => import("../page/SigninPage"));
// const LandingPage = lazy(() => import("../page/LandingPage"));
const ProductDetailPage = lazy(() => import("../page/ProductDetailPage"));
const ProductManagePage = lazy(() => import("../page/ProductManagePage"));
const SettingPage = lazy(() => import("../page/SettingPage"));
const SearchPage = lazy(() => import("../page/SearchPage"));
const TestPage = lazy(() => import("../page/TestPage"));

// Auth(Component, option)
// - option: (0)로그인 여부 상관없음 - 기본값
//           (1)로그인 한 유저만 허용
//           (2)로그인 안한 유저만 허용
function Layout({ history }) {
  const { pathname } = useLocation();

  // 기존의 만들어둔 레이아웃을 적용하지 않고 새롭게 구성하기 위해 조건문처리
  if (
    pathname.includes("/oauth") ||
    pathname.includes("/auth") ||
    pathname.includes("/signin") ||
    pathname.includes("/signup") ||
    pathname.includes("/dev")
  ) {
    return (
      <>
        <Suspense fallback={<>로딩중</>}>
          <Switch>
            {/* 개발용  페이지*/}
            <Route exact path="/dev" component={Auth(DevPage, 0)} />

            <Route
              exact
              path="/oauth/kakao/callback"
              component={Auth(KakaoOAuthPage, 2)}
            />
            <Route
              exact
              path="/oauth/facebook"
              component={Auth(FacebookOAuthPage, 2)}
            />
            <Route
              exact
              path="/oauth/naver"
              component={Auth(NaverOAuthPage, 2)}
            />
            <Route
              exact
              path="/auth"
              component={Auth(PhoneNumberAuthPage, 2)}
            />
            <Route exact path="/signin" component={Auth(SigninPage, 2)} />
            <Route exact path="/signup" component={Auth(SignupPage, 2)} />
          </Switch>
        </Suspense>
      </>
    );
  } else {
    return (
      <Container>
        <Suspense fallback={<>로딩중</>}>
          <TopNav></TopNav>
          <SearchNav></SearchNav>
          <Switch>
            {/* 코드 테스트 페이지 */}
            <Route path="/test" component={Auth(TestPage, 0)} />

            {/* 검색 결과 */}
            <Route path="/search" component={Auth(SearchPage, 0)} />

            {/* 유저 설정 */}
            <Route path="/setting" component={Auth(SettingPage, 1)} />

            {/* 벼락톡 */}
            <Route exact path="/talk" component={Auth(TalkPage, 1)} />
            <Route path="/talk/:sellerId" component={Auth(TalkPage, 1)} />

            {/* 상품 페이지들은 로그인 안한 유저 접근불가 따로 적용함 */}
            <Route path="/product/new" component={ProductNewPage} />
            <Route path="/product/new-ai" component={ProductAINewPage} />
            <Route path="/product/manage" component={ProductManagePage} />
            <Route
              path="/product/:productId"
              component={Auth(ProductDetailPage, 0)}
            />

            <Route
              exact
              path="/shop/:shopId/"
              component={Auth(MyShopPage, 0)}
            />
            <Route exact path="/" component={Auth(LandingPage, 0)} />
          </Switch>
          <Footer></Footer>
        </Suspense>
      </Container>
    );
  }
}

export default withRouter(Layout);
