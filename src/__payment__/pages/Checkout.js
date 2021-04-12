import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "helpers/product";
import { Layout, Breadcrumb } from "__common__/index"
import axios from 'axios'
import $ from "jquery";
import jQuery from "jquery";
import moment from "moment";
import { useHistory } from "react-router"
import SectionTitleWithText from "components/section-title/SectionTitleWithText"
window.$ = window.jQuery = jQuery;

const Checkout = ({ location, cartItems, currency }) => {

  const [user, setUser] = useState({})
  const [cartItem, setCartItem] = useState([])
  const history = useHistory()

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  useEffect(()=>{
    setCartItem(localStorage.getItem("cartItem"))
  })
  const check = () => {
    alert(JSON.stringify(cartTotalPrice+2500));
  }

  const [ addr, setAddr ] = useState('')
  const [ extraAddr, setExtraAddr ] = useState('')
  const [ postcode, setPostcode ] = useState('')
  const [ fullAddr, setFullAddr ] = useState('')

  const execPostCode = () => {
    new window.daum.Postcode({
      oncomplete: data => {

        setPostcode(data.zonecode)

        if(data.userSelectedType === "R"){
          setAddr(data.roadAddress)
          if (data.buildingName !== ""){
            setExtraAddr(" (" + data.buildingName + ")")
          }
        }else{
          setExtraAddr(data.jibunAddress)
        }
    }
    }).open();
  };

  const { pathname } = location;
  let cartTotalPrice = 0;

  const [ rcvName, setRcvName ] = useState('')
  const [ rcvPhone, setRcvPhone ] = useState('')
  const [ payInfo, setPayInfo] = useState('')

  const placeOrder = e => {
    e.preventDefault()
         /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp55713696');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay',                                // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: `${JSON.stringify(cartTotalPrice+2500)}`,                                 // 결제금액
      name: `${payInfo.prdName}`,                  // 주문명
      buyer_name: `${user.usrName}`,               // 구매자 이름
      buyer_tel: `${user.usrPhone}`,               // 구매자 전화번호
      buyer_email: `${user.usrEmail}`              // 구매자 주소
    }
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);

    axios({
      url: 'http://localhost:8080/payment/save', 
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {
        payPrice: JSON.stringify(cartTotalPrice+2500),
        payInfo: "",
        payDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        payState: "결제완료",
        rcvAddr: `${postcode} ${addr} ${extraAddr}`+` `+fullAddr,
        rcvName, rcvPhone,
      }
    })
    .then(res => {
      alert(`성공`)
    })
    .catch(err => {
      console.log(`실패: ` + err)
      throw err
    })
}
  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg
    } = response;

    if (success) {
      alert('결제 성공');
      history.push('/pay-success')
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (<>
    {localStorage.getItem("token") === null ?
  <>
  <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />
        </Layout>
      </>
      :
      <>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>User Info</h3>
                    <button onClick={check}></button>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Name</label>
                            <input type="text" value={user.usrName || ''} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone</label>
                            <input type="text" value={user.usrPhone || ''} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Email</label>
                            <input type="text" value={user.usrEmail || ''} />
                          </div>
                        </div>
                    </div>
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Name</label>
                          <input name="rcvName" value={rcvName} placeholder="받으시는 분의 성함을 입력하세요" required
                          onChange = { e => { setRcvName(`${e.target.value}`)}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="number" name="rcvPhone" value={rcvPhone} placeholder="받으시는 분의 연락처를 입력하세요" required
                          onChange = { e => { setRcvPhone(`${e.target.value}`)}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20"> 
                          <div className="addr-search mt-25">
                            <label>Address</label>
                            <button onClick={ execPostCode }>주소 검색</button>
                          <input type="text" value={`${postcode} ${addr} ${extraAddr}`} readOnly />
                          <input type="text" placeholder="받으시는 분의 상세 주소를 입력하세요" name="fullAddr" value={fullAddr} required
                          onChange = { e => { setFullAddr(`${e.target.value}`)}} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.prdPrice,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.prdPrice * currency.currencyRate
                              );
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              );

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                  {cartItem.prdName+` X `+cartItem.quantity}
                                  <input type="hidden" name="payInfo" value={cartItem.prdName+` X `+cartItem.quantity} 
                                  readOnly onChange = { e => { setPayInfo(`${e.target.value}`)}} />
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        )
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>{cartTotalPrice < 50000 ? "￦2500" : "무료배송"}
                              <input type="hidden" name="shipping" value={cartTotalPrice < 50000 ? "￦2500" : "무료배송"} readOnly /></li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>{cartTotalPrice < 50000 ? currency.currencySymbol + (cartTotalPrice + 2500) 
                          : currency.currencySymbol + cartTotalPrice}
                              <input type="hidden" name="payPrice" value={cartTotalPrice < 50000 ? currency.currencySymbol + (cartTotalPrice + 2500) 
                          : currency.currencySymbol + cartTotalPrice} readOnly />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                    <button className="btn-hover" type="submit" onClick={placeOrder}>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
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
    </>
          }
          </>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(Checkout);