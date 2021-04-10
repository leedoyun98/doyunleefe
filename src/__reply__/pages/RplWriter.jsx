import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "layouts/LayoutOne";
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "wrappers/blog/BlogSidebar";
import BlogComment from "wrappers/blog/BlogComment";
import {BlogPostWriter} from "__board__/index"
const BlogDetail = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog Post</title>
        <meta
          name="description"
          content="Blog post page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog Post
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="blog-details-wrapper ml-20">
                  {/* blog post */}
                  <BlogPostWriter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogDetail.propTypes = {
  location: PropTypes.object
};

export default BlogDetail;
