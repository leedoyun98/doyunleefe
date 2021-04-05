import PropTypes from "prop-types";
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../helpers/product";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import axios from 'axios'
import { TextField } from '@material-ui/core';
import DaumPostcode from '../pages/other/DaumPostcode';
import $ from "jquery";
import jQuery from "jquery";
import { CompareRounded } from "@material-ui/icons";
import moment from "moment";
window.$ = window.jQuery = jQuery;


const Checkout = ({ location, cartItems, currency}) => {

  const [usrEmail, setUsrEmail] = useState('')
  const [user, setUser] = useState([])
  const URL = '/user/all'
 useEffect(()=>{
   axios.get(URL, )
   .then((response) => {
     setUser(response.data)
   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
  },[])

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
  const { IMP } = window;

  const [ rcvName, setRcvName ] = useState('')
  const [ rcvPhone, setRcvPhone ] = useState('')
  const [ rcvAddr, setRcvAddr ] = useState('')

  const [ payPrice, setPayPrice ] = useState('')
  const [ payAmount, setPayAmount] = useState('')
  const [ dvrFee, setDvrFee] = useState('')
  const [ payDate, setPayDate] = useState('')
  const [ payState, setPayState] = useState('')

  const [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  const placeOrder = e => {
    e.preventDefault()
    IMP.init('imp55713696');
    IMP.request_pay({
      pg : 'kakaopay',
      pay_method : 'card', //card(신용카드), trans(실시간계좌이체), vbank(가상계좌), phone(휴대폰소액결제)
      merchant_uid : 'merchant_' + new Date().getTime(), //상점에서 관리하시는 고유 주문번호를 전달
      name : `${cartItems}`,
      amount : `${cartTotalPrice.toFixed(0)}`,
      buyer_email : `${usrEmail}`,
      buyer_name : `${rcvName}`,
      buyer_tel : `${rcvPhone}`,
      buyer_addr : `${rcvAddr}`
    }, function(rsp) {
        if ( rsp.success ) {
          //[1] 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
          jQuery.ajax({
          url: "http://localhost:8080/receiver/save", //cross-domain error가 발생하지 않도록 주의해주세요
          type: 'POST',
          dataType: 'json',
          headers: { "Content-Type": "application/json" },
          data: {
          imp_uid : rsp.imp_uid
          //기타 필요한 데이터가 있으면 추가 전달
          }
        }).done(function(data) {
          //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
          if (data.success) {
          var msg = '결제가 완료되었습니다.';
          msg += '\n고유ID : ' + rsp.imp_uid;
          msg += '\n상점 거래ID : ' + rsp.merchant_uid;
          msg += '\결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
          alert(msg);
        } else {
          //[3] 아직 제대로 결제가 되지 않았습니다.
          //[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
          }
        });
      location.href='/my-account'+msg;
    } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
        location.href='/checkout';
        alert(msg);
        }
      });

    axios.post("http://localhost:8080/payment/save", {
      payPrice: `${cartTotalPrice.toFixed(0)}`,
      payAmount, 
      // rcvName, rcvPhone, 
      // rcvAddr: `${postcode} ${addr} ${extraAddr}` + fullAddr,
      dvrFee: '0',
      payDate: nowTime,
      payState: '결제완료'
    })
      .then(response => {
      alert('주문 성공')
      })
      .catch(error =>{
      alert('주문 실패')
      })

    axios.post("http://localhost:8080/receiver/save",{

    })
      .then(response => {
      alert('주문 성공')
      })
      .catch(error =>{
      alert('주문 실패')
      })
    }
  return (
    <Fragment>
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
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>User Info</h3>
                    <div className="row">
                      <ul>
                        {user.map(i => (
                          <li key = {i.usrNo}>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Name</label>
                                <input type="text" value={i.usrName} readOnly/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Phone</label>
                                <input type="text" value={i.usrPhone} readOnly/>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Address</label>
                                <input type="text" value={i.usrAddr} readOnly/>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Name</label>
                          <input name="rcvName" placeholder="받으시는 분의 성함을 입력하세요" required
                          onChange = { e => { setRcvName(`${e.target.value}`)}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="number" name="rcvPhone" placeholder="받으시는 분의 연락처를 입력하세요" required
                          onChange = { e => { setRcvPhone(`${e.target.value}`)}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Address</label> <button onClick={ execPostCode }>주소 검색</button>
                          <input type="text" value={`${postcode} ${addr} ${extraAddr}`} readOnly />
                          <input type="text" placeholder="받으시는 분의 상세 주소를 입력하세요" name="fullAddr" required
                          onChange = { e => { setFullAddr(`${e.target.value}`)}} />
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
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                  {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              <input type="text" value={`${currency.currencySymbol}` +
                                `${cartTotalPrice.toFixed(0)}`} readOnly />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                    <button className="btn-hover" type="submit" onClick= {placeOrder}>Place Order</button>
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
      </LayoutOne>
    </Fragment>
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
