import PropTypes from "prop-types";
import React, {  useEffect, Suspense, lazy } from "react";
import ScrollToTop from "helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import {BlogDetail,BlogList,BlogDetailsStandard,BlogUpdate, BlogPostDetail, BlogUpdate2} from '__board__/index'
import { CartPage, ProductListPage, ProductDetailPage, ProductAddPage, ProductEditPage } from "__product__/index"
import {UserLoginRegister} from "__user__/index"
// home pages
const MainPage = lazy(() => import("__common__/pages/MainPage"))


// shop pages

// other pages
const About = lazy(() => import("pages/other/About"));
const Contact = lazy(() => import("pages/other/Contact"));
const MyAccount = lazy(() => import("__payment__/MyAccount"));
const LoginRegister = lazy(() => import("pages/other/LoginRegister"));

const Cart = lazy(() => import("pages/other/Cart"));
const Wishlist = lazy(() => import("pages/other/Wishlist"));
const Compare = lazy(() => import("pages/other/Compare"));
const Checkout = lazy(() => import("__payment__/Checkout"));

const NotFound = lazy(() => import("pages/other/NotFound"));

const App = (props) => {

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("translations/english.json"),
          fn: require("translations/french.json"),
          de: require("translations/germany.json")
        }
      })
    );
  });

  return (

    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashionThree}
                /> */}

<Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={MainPage}
                />
                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/main"}
                  component={MainPage}
                />

                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product-all"}
                  component={ProductListPage}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product-detail/:id"}
                  render={(routeProps) => (
                    <ProductDetailPage {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-detail/:id"}
                  component={ProductDetailPage}
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/product-add"}
                  component={ProductAddPage}
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/product-edit/:id"}
                  component={ProductEditPage}
                />
                       
                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL +"/blog-update/:id"}
                  render={(routeProps) => (
                    <BlogUpdate {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-update/:id"}
                  component={BlogUpdate}
                />
               
                <Route
                  path={process.env.PUBLIC_URL +"/blog-details-standard/:id"}
                  render={(routeProps) => (
                    <BlogDetailsStandard {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                   <Route
                  path={process.env.PUBLIC_URL +"/blog-details-standard/:id"}
                  component={BlogDetailsStandard}
                />
                {/* <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                /> */}
                {/* <Route
                  path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                  component={BlogNoSidebar}
                /> */}
                {/* <Route
                  path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details-standard"}
                  component={BlogDetailsStandard}
                /> */}
                  <Route
                  path={process.env.PUBLIC_URL + "/blog-detail"}
                  component={BlogDetail}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-list"}
                  component={BlogList}
                />
              
                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={UserLoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={CartPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
