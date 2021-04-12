import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card, { CardBody } from "react-bootstrap/Card";
import { Link } from 'react-router-dom'
import Accordion from "react-bootstrap/Accordion";
import { Layout, Breadcrumb } from "__common__/index"
import axios from 'axios';
import { useHistory } from "react-router"
import SectionTitleWithText from "components/section-title/SectionTitleWithText"


const MyAccount = ({ location, match }) => {



    const [payment, setPayment] = useState([])
    const [receiver, setReceiver] = useState([])
    const [ payPrice, setPayPrice ] = useState('')
    const [ payState, setPayState] = useState('')
    const [ payDate, setPayDate] = useState('')
    const history = useHistory()

    useEffect(()=>{
      axios.get("http://localhost:8080/payment/all", { 
        headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
    },)
      .then((res) => {
        setPayment(res.data)
      })
      .catch((err) => {
        alert('실패')
        throw err;
      })
    }, [])
  
    
    const [ payments, setPayments ] = useState({})

    // useEffect(()=>{
    //   setPayments(JSON.parse(localStorage.getItem("payments")))
    // }, [])

        useEffect(()=>{
          const arr = localStorage.getItem("payments")

        }, [])


  
    // const update = e => {

    // }
    // const refund = e => {
    //   axios.delete(`http://localhost:8080/payment/${match.params.id}`, {
    //     headers: {
    //       'Content-Type'  : 'application/json',
    //       'Authorization' : 'JWT fefege..'
    //     },
    //     data: {}
    //   },)
    //   .then(res => {
    //     alert(`환불 성공`)
    //     history.push(`/my-account`)
    //   })
    //   .catch(err => {
    //     console.log(payment.payNo + `번 주문 삭제 실패: ` + err)
    //     throw err
    //   })
    // }

  // const update = e => {
  //   e.preventDefault()
  //   axios.put("http://localhost")
  // }
  // axios({
  //   url: 'http://localhost:8080/boards/update/' + localStorage.getItem(`brdNo`),
  //   method: 'put',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'JWT fefege..'
  //   },
  //   data: { 
  //     brdNo: localStorage.getItem(`brdNo`), 
  //     brdTitle, brdContent, brdWrtDate, brdRank, brdImg, brdLike, usrNickname
  //   }
  // })
  // .then((res) => {
  //   console.log(boards.brdNo + `번 게시글 수정 성공`)
  //   history.push(`/blog-all`)
  // })
  // .catch(err => {
  //   console.log(boards.brdNo + `번 게시글 수정 실패: ` + err)
  //   throw err
  // })  
  const paymentDelete = e => {

    e.preventDefault()
    axios({
        url: 'http://localhost:8080/payment/' + match.params.id,
        method: 'delete',
        headers: {'Content-Type':'application/json',
                  'Authorization': 'JWT fefege...'},
        data: {}
    }).then(res => {
        history.push('/my-account')
    }).catch(err => {
        alert(err.response)
    })
}


  const year = ["전체기간", "1주", "1개월", "3개월", "1년"];
  const { pathname } = location;

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
                  <Accordion>
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
                            <span>4 .</span> Order list{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Order list</h4>                            
                          <article>
                            <div>
                              <select>
                                {year.map(year => (
                                  <option key={year}>{year}</option>
                                ))}
                              </select>
                            </div>
                          </article>
                            </div>
                            {payment.map((pay, id) => (
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                      <div key={id}>
                                        <h4>결제 정보</h4>
                                        <div>
                                        결제번호 <Link to={`/my-account-detail/${pay.payNo}`} 
                                        onClick={() => localStorage.setItem('payment', JSON.stringify(pay))}>{pay.payNo}</Link>
                                        </div>
                                        <div>
                                        결제시간 {pay.payDate}
                                        </div>
                                        <div>
                                        결제금액 {pay.payPrice}
                                        </div>
                                        <div>
                                        주문상태 {pay.payState}
                                        </div>
                                        <h4>배송 정보</h4>
                                        <div>
                                        이름 {pay.rcvName}
                                        </div>
                                        <div>
                                        연락처 {pay.rcvPhone}
                                        </div>
                                        <div>
                                        주소 {pay.rcvAddr}
                                        </div>
                                      </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">

                                    {/* <button className="edit" onClick={refund}>교환/환불</button> */}
                                    <button className="edit" >배송지 변경</button>
                                    <form action="http://info.sweettracker.co.kr/tracking/5" method="post">
                                    <button type="submit">배송조회</button>
                                        <input type="hidden" id="t_key" name="t_key" value="ymJmuSQTWNb5HVh5nip8cw"/>
                                        <input type="hidden" name="t_code" id="t_code" value="04"/>
                                        <input type="hidden" name="t_invoice" id="t_invoice" value="387842034141"/>
                                  </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                                      ))}
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
    }
    </>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;