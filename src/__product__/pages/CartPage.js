import PropTypes from "prop-types"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { connect } from "react-redux"
import { Layout, Breadcrumb } from "__common__/index"
import { addToCart, decreaseQuantity, deleteFromCart, cartItemStock, deleteAllFromCart } from "__product__/redux/actions/cartActions"

const CartPage = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const { pathname } = location
  
  const [quantityCount] = useState(1)
  const { addToast } = useToasts()

  let cartTotalPrice = 0

  return (<>
    <MetaTags>
      <title>ZER0 SHOP | Cart Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cart</BreadcrumbsItem>

    <Layout headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb />
      <div className="cart-main-area pt-90 pb-100">
        <div className="container">
          {cartItems && cartItems.length >= 1 ? (
            <>
              <h3 className="cart-page-title">Your cart items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem, key) => {
                            cartTotalPrice += cartItem.prdPrice * cartItem.quantity
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product-detail/" +
                                    cartItem.prdNo
                                  }
                                >
                                  <img
                                    className="img-fluid"
                                    src={
                                      process.env.PUBLIC_URL +
                                      cartItem.prdImg
                                    }
                                    alt=""
                                  />
                                </Link>
                              </td>

                              <td className="product-name">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product-detail/" +
                                    cartItem.prdNo
                                  }
                                >
                                  {cartItem.prdName}
                                </Link>
                              </td>

                              <td className="product-price-cart">
                                  <span className="amount">
                                    {currency.currencySymbol + cartItem.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </span>
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    onClick={() =>
                                      decreaseQuantity(cartItem, addToast)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        quantityCount
                                      )
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity &&
                                      cartItem.quantity >=
                                        cartItemStock(cartItem)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {currency.currencySymbol + (cartItem.quantity * cartItem.prdPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    deleteFromCart(cartItem, addToast)
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link
                        to={process.env.PUBLIC_URL + "/product/all"}
                      >
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="cart-clear">
                      <button onClick={() => deleteAllFromCart(addToast)}>
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Use Coupon Code
                      </h4>
                    </div>
                    <div className="discount-code">
                      <p>Enter your coupon code if you have one.</p>
                      <form>
                        <input type="text" required name="name" />
                        <button className="cart-btn-2" type="submit">
                          Apply Coupon
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        tmp
                      </h4>
                    </div>
                    <h5>
                        tmp {" "}
                        <span>
                          tmp {" "}
                        </span>
                    </h5> 
                    <h4 className="grand-totall-title">
                      tmp
                      <span>
                        tmp
                      </span>
                    </h4>
                    <Link to={process.env.PUBLIC_URL + "/checkout"}>
                      button
                    </Link>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        결제 예정금액
                        </h4>
                      </div>
                      <h5>
                        배송료
                      <span>
                        {cartTotalPrice < 50000 ? "￦ 2,500" : "무료배송"}
                        {/* (usrCity !== 제주 ? "￦ 2,500" : "￦ 5,000") */}
                      </span>
                    </h5>
                    <h4 className="grand-totall-title">
                      총 결제금액{" "}
                      <span>
                        {cartTotalPrice < 50000 ? currency.currencySymbol + (cartTotalPrice + 2500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                          : currency.currencySymbol + cartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {}
                      </span>
                    </h4>
                    <Link to={process.env.PUBLIC_URL + "/checkout"}>
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    장바구니에 담은 제품이 없습니다!<br />{" "}
                    <Link to={process.env.PUBLIC_URL + "/product/all"}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  </>)
}

CartPage.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount))
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast))
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast))
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)