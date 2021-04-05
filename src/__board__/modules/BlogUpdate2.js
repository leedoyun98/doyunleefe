import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "layouts/LayoutOne";
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "wrappers/blog/BlogPagination";
import {BlogPostList, BlogUpdate} from "__board__/index";
import axios from 'axios'
import BlogPostUpdate from "./BlogPostUpdate";
const BlogUpdate2 = ({ location , match}) => {
  const { pathname } = location;
  const [boards, setBoards] = useState([])
  useEffect(()=>{
    alert(match.params.id)
   axios.get(`http://localhost:8080/board/opt/`+match.params.id, )
   .then(({data}) => {
    setBoards(data)
   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
   
  },[])
  return (<>
  <BlogUpdate />
 <BlogPostList boards={boards} key={boards.brdNo}/>

  </>);
};

BlogUpdate2.propTypes = {
  location: PropTypes.object
};

export default BlogUpdate2;
