import { Link, Route, Router } from "react-router-dom";
import React, { useState, Fragment,useEffect,Component } from 'react'
import axios from 'axios';
import styled, { createGlobalStyle } from "styled-components";
// const IconGroup = ({
//   currency,
//   cartData,
//   wishlistData,
//   compareData,
//   deleteFromCart,
//   iconWhiteClass
// }) => {
//   const handleClick = e => {
//     e.currentTarget.nextSibling.classList.toggle("active");
//   };
const BlogPostList= ({ history })=>{
  const [text,setText] = useState('')
  const ser = (e) =>{
    setText(e.target.value)
  }

  const [board, setBoard] = useState([])
  const [brdNo, setBrdNo] = useState([])
  const [brdTitle, setBrdTitle] = useState('')
  const [brdCount, setBrdCount] = useState([])
  const sera = () =>{
    axios.get("http://localhost:8080/board/seach",{
      brdTitle
    }).then(resp=>{
      alert(`성공`)
  }).catch(err=>{
    alert(`err`)
    throw err})
  }


 useEffect(()=>{
    axios({
    url: 'http://localhost:8080/board/blogAll',
    method: 'get',
    headers: {
      'Content-Type'  : 'application/json',
      'Authorization' : 'JWT fefege..'
    },
    data: {}
  })
   .then((res) => {
    setBoard(res.data)

   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
   
 },[])

  return (
 <>
      {board ? board.map (b=>
      <div className="col-lg-4 col-md-6 col-sm-12"  >
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={b.brdImg} alt={b.brdImg} /> 
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>{b.brdWrtDate}</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                     <i className="fa fa-comments-o"/>
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
       
              <Link to={process.env.PUBLIC_URL + `/blog-details-standard/${b.brdNo}`} key={b.brdNo} >
              {b.brdTitle}
              
              </Link>
            </h4>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
               
                  조회수: {b.brdCount}
                
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
         
          </div>
          
          </div>
       
      ) : '조회 할 페이지가 없습니다'}
          <div className="same-style header-search d-none d-lg-block">
          <div className="sidebar-widget">
      <h4 className="pro-sidebar-title"> </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..."onChange={ e => {setBrdTitle(`${ e.target.value }`)}}  />
          <button onClick={sera} >
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
    </div>

<div className="">
   <a class="float-right" href="#"><Link to= '/blog-detail'>글 작성하기</Link></a>
   </div>

 </> );
      };

export default BlogPostList
