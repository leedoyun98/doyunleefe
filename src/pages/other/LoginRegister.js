import PropTypes from "prop-types";
import React, { useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from 'axios'
import { TextField } from '@material-ui/core';
import { Label } from "react-bootstrap";

const LoginRegister = ({ location }) => {
  const [usrEmail, setUsrEmail] = useState('')
  const [usrName, setUsrName] = useState('')
  const [usrPwd, setUsrPwd] = useState('')
  const [usrAges, setUsrAges] = useState('')
  const [usrCity, setUsrCity] = useState('')
  const [usrGender, setUsrGender] = useState('')
  const [usrPhone, setUsrPhone] = useState('')
  const [usrAddr, setUsrAddr] = useState('')
  const [usrNickname, setUsrNickname] = useState('')
  const API_URL = "http://localhost:8080/api/user/";

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }

  const register = e => {
    e.preventDefault()
    axios.post(`/user/save`,{
      usrName, usrPwd, usrEmail,
      proxy: {
        host: 'localhost',
        port: 8080,
        protocol: 'http'
      }
    })
    .then(response => {
      alert('회원가입 성공')
    })
    .catch(error =>{
      alert('회원가입 실패')
    })
  }

  const login = (usrEmail, usrPwd) => {
    return axios
    .post(API_URL + "signin", {
       usrEmail, usrPwd
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
}

  const { pathname } = location;
  // const login = e =>{
  //   e.preventDefault()
  //   axios.post(`/user/login`,{
  //     usrEmail,password
  //   })
  //   .then(resp=>{

  //   })
  //   .catch(err=>{

  //   })
  // }


  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                            <label>email</label>
                              <TextField name="usrEmail" required
                                onChange = { e => { setUsrEmail(`${e.target.value}`)}}
                                />
                              <label>password</label>
                              <TextField name="usrPwd" required
                                onChange = { e => { setUsrPwd(`${e.target.value}`)}}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit" onClick= {login}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <label>name</label>
                              <TextField name="usrName" required
                                onChange = { e => { setUsrName(`${e.target.value}`)}}
                              />
                              <label>password</label>
                              <TextField name="usrPwd" required
                                onChange = { e => { setUsrPwd(`${e.target.value}`)}}
                              />
                              <label>email</label>
                              <TextField name="usrEmail" required
                                onChange = { e => { setUsrEmail(`${e.target.value}`)}}
                              />
                              <div className="button-box">
                                <button type="submit" onClick= {register}>
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
