import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { Layout, Breadcrumb } from "__common__/index"
import { useHistory } from "react-router"
import MetaTags from "react-meta-tags";
import Card, { CardBody } from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const MyAccountDetail = ({ location, match }) => {

    useEffect(()=>{
        setPayment(JSON.parse(localStorage.getItem("payment")))
      }, [])

    const [ payment, setPayment ] = useState({})
    const [ payState, setPayState ] = useState('')
    const [ rcvName, setRcvName ] = useState('')
    const [ rcvPhone, setRcvPhone ] = useState('')
    const [ rcvAddr, setRcvAddr ] = useState('')

    const history = useHistory()
    const { pathname } = location;
    const year = ["전체기간", "1주", "1개월", "3개월", "1년"];

    // const ChangeAddr = () => {
    //     setPayment(JSON.parse(localStorage.getItem("payment")))
    // } 
    const refund = e => {
        e.preventDefault()
        axios({
            url: `http://localhost:8080/payment/${match.params.id}`,
            method: 'delete',
            headers: {'Content-Type':'application/json','Authorization': 'JWT fefege...'},
            data: {}
        }).then(res => {
            history.push('/my-account')
        }).catch(err => {
            alert(err.response)
        })
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
    const addrChange = e => {
        e.preventDefault()
        axios({
            url: `http://localhost:8080/payment/edit/${match.params.id}`,
            method: 'put',
            headers: {'Content-Type':'application/json','Authorization': 'JWT fefege...'},
            data: {
                payNo : `${match.params.id}`,
                payState : payment.payState,
                payDate : payment.payDate,
                payPrice : payment.payPrice,
                rcvAddr : `${postcode} ${addr} ${extraAddr}`+` `+fullAddr,
                rcvName, rcvPhone}
        }).then(res => {
            history.push('/my-account')
        }).catch(err => {
            alert(err.response)
        })
    }
    // useEffect(()=>ChangeAddr(), [])
    return (<>
    <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="3">
                  <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input type="email" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Fax</label>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="3">
                          <h3 className="panel-title">
                            <span>4 .</span> Order detail{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Order detail</h4>                            
                          <article>
                            <div>
                            </div>
                          </article>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                      <div>
                                        <h4>결제 정보</h4>
                                        <div>
                                        주문상태 <input type="text" value={payment.payState || ''} readOnly/>
                                        결제시간 <input type="text" value={payment.payDate || ''} readOnly/>
                                        결제금액 <input type="text" value={payment.payPrice || ''} readOnly/>
                                        </div>
                                        <h4>배송 정보</h4>
                                        <div>
                                        <button onClick={ execPostCode }>주소 검색</button>
                                        <input type="text" value={`${postcode} ${addr} ${extraAddr}`} readOnly />
                                        <input type="text" placeholder="받으시는 분의 상세 주소를 입력하세요" name="fullAddr" value={fullAddr} required
                                        onChange = { e => { setFullAddr(`${e.target.value}`)}} />
                                        이름 <input className="box" type="text" value={rcvName} onChange={e => setRcvName(e.target.value)}/>
                                        연락처 <input className="box" type="text" value={rcvPhone} onChange={e => setRcvPhone(e.target.value)}/>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                  <button onClick={refund}>삭 제</button>
                                    {/* <button className="edit" onClick={refund}>교환/환불</button> */}
                                    <button className="edit" onClick={addrChange}>배송지 변경</button>
                                    
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
MyAccountDetail.propTypes = {
    location: PropTypes.object
  }
export default MyAccountDetail