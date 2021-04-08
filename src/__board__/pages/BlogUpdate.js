import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "layouts/LayoutOne";
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "wrappers/blog/BlogSidebar";
import BlogComment from "wrappers/blog/BlogComment";
import {BlogPostUpdate} from "__board__/index"
import axios from 'axios' 
const BlogUpdate = ({ location ,match}) => {
  const [boards, setBoards] = useState([])
  useEffect(()=>{
   axios.get(`http://localhost:8080/board/opt/`+match.params.id, )
   .then(({data}) => {
    setBoards(data)
   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
   
  },[])

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | update</title>
        <meta
          name="description"
          content="Blog update page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
                  <BlogPostUpdate boards={boards} key={boards.brdNo}/>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogUpdate.propTypes = {
  location: PropTypes.object
};

export default BlogUpdate;
