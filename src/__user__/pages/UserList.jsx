import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios"


// effect안에 코드를 바로 불러온다. getJson
// state : 값 저장 


 const UserLoginRegister = ({ location }) => {
  const { pathname } = location;
    const [usrId, setUsrId] = useState('')
    const [usrPwd, setUsrPwd] = useState('')
    const [usrName, setUsrName] = useState('')
    const [usrEmail, setUsrEmail] = useState('')
    // const wrt = () =>{
      
    //   axios.post(`http://localhost:8080/usr/save`, {
    //       usrId, usrPwd, usrName, usrEmail
    //     })
    //     .then(response => {
    //         alert(`SUCCESS`)
    //     })
    //     .catch(err => {
    //       alert(`Error`)
    //       throw err
    //       // console.log("Error: ", err);
    //     });
    // }
  return (
<></>
   
      
  );
};

UserLoginRegister.propTypes = {
    location: PropTypes.object
};

export default UserLoginRegister;