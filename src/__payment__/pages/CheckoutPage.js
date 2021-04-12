import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { Layout, Breadcrumb } from "__common__/index"
import jQuery from "jquery"
import moment from "moment"
import axios from "axios"

window.$ = window.jQuery = jQuery

const CheckoutPage = ({ location, cartItems, currency}) => {
  const { pathname } = location
  let cartTotalPrice = 0
  const { IMP } = window

  const [user, setUser] = useState({})
  const [addr, setAddr] = useState('')
  const [extraAddr, setExtraAddr] = useState('')
  const [postcode, setPostcode] = useState('')
  const [fullAddr, setFullAddr] = useState('')
  const [cartItem, setCartItem] = useState('')
  const [username, setUsername] = useState('')
  const [rcvName, setRcvName] = useState('')
  const [rcvPhone, setRcvPhone] = useState('')
  const [rcvAddr, setRcvAddr] = useState('')
  const [payInfo, setPayInfo] = useState('')
  const [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const execPostCode = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        setPostcode(data.zonecode)
        if(data.userSelectedType === "R") {
          setAddr(data.roadAddress)
          if (data.buildingName !== "") {
            setExtraAddr(" (" + data.buildingName + ")")
          }
        }else {
          setExtraAddr(data.jibunAddress)
        }
      }
    }).open()
  }

  const placeOrder = e => {
    e.preventDefault()
    IMP.init('imp55713696')
    IMP.request_pay({
      pg : 'kakaopay',
      pay_method : 'card', //card(신용카드), trans(실시간계좌이체), vbank(가상계좌), phone(휴대폰소액결제)
      merchant_uid : 'merchant_' + new Date().getTime(), //상점에서 관리하시는 고유 주문번호를 전달
      name : `${cartItem.prdName}`,
      amount : `${cartTotalPrice}`,
      buyer_email : `${username}`,
      buyer_name : `${rcvName}`,
      buyer_tel : `${rcvPhone}`,
      buyer_addr : `${rcvAddr}`
    }, function(rsp) {
      if ( rsp.success ) {
        //[1] 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
        jQuery.ajax({
        url: "http://localhost:8080/receiver/save", //cross-domain error가 발생하지 않도록 주의해주세요
        type: 'POST',
        dataType: 'json',
        headers: { 
          'Content-Type'  : 'application/json',
          'Authorization' : 'JWT fefege..' },
        data: {
        imp_uid: rsp.imp_uid
        //기타 필요한 데이터가 있으면 추가 전달
        }
      }).done(function(data) {
        //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
        if (data.success) {
        var msg = '결제가 완료되었습니다.'
        msg += '\n고유ID : ' + rsp.imp_uid
        msg += '\n상점 거래ID : ' + rsp.merchant_uid
        msg += '\결제 금액 : ' + rsp.paid_amount
        msg += '카드 승인번호 : ' + rsp.apply_num
        alert(msg)
      }else {
        //[3] 아직 제대로 결제가 되지 않았습니다.
        //[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
        }
      })
    }else {
      var msg = '결제에 실패하였습니다.'
      msg += '에러내용 : ' + rsp.error_msg
      location.href='/checkout'
      alert(msg)
      }
    })
    
    axios({
      url: 'http://localhost:8080/payment/save', 
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {
        payPrice: "",
        payInfo: "",
        payDate: nowTime,
        payState: "결제완료"
      }
    })
    .then(res => {
      alert(`결제가 완료되었습니다.`)
    })
    .catch(err => {
      console.log(`결제에 실패하였습니다. (` + err + `)`)
      throw err
    })

    axios({
      url: 'http://localhost:8080/receiver/save', 
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {
        rcvName,
        rcvPhone,
        rcvAddr: `${postcode} ${addr} ${extraAddr}`+` `+fullAddr,
      }
    })
    .then(res => {
      alert(`수령인 등록 성공`)
    })
    .catch(err => {
      console.log(`수령인 등록 실패: ` + err)
      throw err
    })
  }
    
  return (<>
    <MetaTags>
      <title>Flone | Checkout</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>checkout</BreadcrumbsItem>

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
                  <div className="row">
                    <ul>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Name</label>
                          <input type="text" value={user.usrName || ''} readOnly/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" value={user.usrPhone || ''} readOnly/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Address</label>
                          <input type="text" value={user.usrAddr || ''} readOnly/>
                        </div>
                      </div>
                    </ul>
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
                        <label>Address</label> <button onClick={ execPostCode }>주소 검색</button>
                        <input type="text" value={`${postcode} ${addr} ${extraAddr}`} readOnly />
                        <input type="text" placeholder="받으시는 분의 상세 주소를 입력하세요" name="fullAddr" value={fullAddr} required
                        onChange = { e => { setFullAddr(`${e.target.value}`)}} />
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
                            const finalProductPrice = (
                              cartItem.prdPrice * currency.currencyRate
                            )
                            cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity
                            return (
                              <li key={key}>
                                <span className="order-middle-left">
                                {cartItem.prdName+` X `+cartItem.quantity}
                                <input type="hidden" name="payInfo" value={cartItem.prdName+` X `+cartItem.quantity} 
                                readOnly onChange = { e => { setPayInfo(`${e.target.value}`)}} />
                                </span>{" "}
                                <span className="order-price">
                                  {finalProductPrice * cartItem.quantity}
                                </span>
                              </li>
                            )
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
                  <button className="btn-hover" type="submit" onClick= {placeOrder}>Place Order</button>
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
  </>)
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  }
}

export default connect(mapStateToProps)(CheckoutPage)