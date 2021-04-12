import React, { Suspense, lazy, useEffect } from "react"
import ScrollToTop from "helpers/scroll-top"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"
import { multilanguage, loadLanguages } from "redux-multilanguage"
import { connect } from "react-redux"
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic"
import { MainPage, NotFoundPage } from "__common__/index"
import { CheckoutPage, MyAccountPage } from "__payment__/index"
import { UserLoginRegister_ } from "__user__/index"
import { ProductAddPage, ProductListPage, CategoryLivingPage, CategoryKitchenPage, CategoryBathroomPage, CategoryStationaryPage, ProductDetailPage, ProductEditPage, CartPage, WishlistPage, ProductSearchResultPage } from "__product__/index"
import {BlogDetail,BlogList,BlogDetailsStandard,BlogUpdate, BlogWriter, CommentUpdate,} from '__board__/index'

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("__common__/modules/english.json"),
        }
      })
    )
  })
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
                  path={process.env.PUBLIC_URL + "/product/all"}
                  component={ProductListPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/category-living"}
                  component={CategoryLivingPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/category-kitchen"}
                  component={CategoryKitchenPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/category-bathroom"}
                  component={CategoryBathroomPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/category-stationary"}
                  component={CategoryStationaryPage}
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
                  render={(routeProps) => (
                    <ProductEditPage {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-edit/:id"}
                  component={ProductEditPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/search/:id"}
                  render={(routeProps) => (
                    <ProductSearchResultPage {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/search/:id"}
                  component={ProductSearchResultPage}
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
                  path={process.env.PUBLIC_URL +"/comment-update/:id"}
                  render={(routeProps) => (
                    <CommentUpdate {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/comment-update/:id"}
                  component={CommentUpdate}
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
          
                  <Route
                  path={process.env.PUBLIC_URL + "/blog-detail"}
                  component={BlogWriter}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-all"}
                  component={BlogList}
                />
              
            {/* Other pages */}
            <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={CartPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={WishlistPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={CheckoutPage}
                />
      
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={UserLoginRegister_}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccountPage}
                />
       <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFoundPage}
                />

                <Route exact component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};


export default connect()(multilanguage(App));
