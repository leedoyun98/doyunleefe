import { Link, Route, Router } from "react-router-dom";
import React, { useState, Fragment,useEffect,Component,useCallback } from 'react'
import axios from 'axios';
import styled, { createGlobalStyle } from "styled-components";

const BlogSearch= ({ history })=>{
  const [boards, setBoards] = useState([])
  const [search, setSearch] = useState({
    brdTitle: localStorage.getItem("brdTitle"),
  })
  const {brdTitle} = search
  const onChange = useCallback(e=> {
    setSearch({...search,[e.target.name]: e.target.value})
  })


  useEffect(()=>{
     axios.get(`http://localhost:8080/board/seach/`+localStorage.getItem("brdTitle"), )
     .then(({data}) => {
      setBoards(data)
     })
     .catch((error) => {
       alert('실패')
       throw error;
     })
     
    },[])

  return (
 <>
      <div className="col-lg-4 col-md-6 col-sm-12"  >
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={boards.brdImg} alt={boards.brdImg} /> 
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>{boards.brdWrtDate}</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                     <i className="fa fa-comments-o"/>
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
       
              <Link to={process.env.PUBLIC_URL + `/blog-details-standard/${boards.brdNo}`} key={boards.brdNo} >
              {boards.brdTitle}
              </Link>
            </h4>
                  작성자: {boards.usrName} 
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                  조회수: {boards.brdCount} 
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
       
      ) 
          <div className="same-style header-search d-none d-lg-block">
          <div className="sidebar-widget">
      <h4 className="pro-sidebar-title"> </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
      <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..."onChange={onChange}  />
          <button onClick={`/blog-search/${search}`} >
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
    </div>

<div className="">
  {localStorage.getItem("user")!=null ?  <a class="float-right" href="#"><Link to= '/blog-detail'>글 작성하기</Link></a>:''}
   </div>

 </> );
      };

export default BlogSearch
