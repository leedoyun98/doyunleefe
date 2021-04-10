import PropTypes from "prop-types";
import React, { Fragment,useEffect,useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "layouts/LayoutOne";
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "wrappers/blog/BlogPagination";
import {BlogSearch} from "__board__/index";
import axios from 'axios'
const BlogSearchList = ({ location, match }) => {
  const { pathname } = location;
  // const [boards, setBoards] = useState([])
  // useEffect(()=>{
  //  axios.get(`http://localhost:8080/board/seach`+match.params.id, )
  //  .then(({data}) => {
  //   setBoards(data)
  //  })
  //  .catch((error) => {
  //    alert('실패')
  //    throw error;
  //  })
   
  // },[])
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog</title>
        <meta
          name="description"
          content="Blog of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mr-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogSearch />
                  </div>

                  {/* blog pagination */}
                  <BlogPagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogSearchList.propTypes = {
  location: PropTypes.object
};

export default BlogSearchList;
