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

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog update</title>
        <meta
          name="description"
          content="Blog update page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="blog-details-wrapper ml-20">
                  {/* blog post */}
                  <BlogPostUpdate boards={boards} key={boards.brdNo}/>

                  {/* blog post comment */}
                  <BlogComment />
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar />
              </div>
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
