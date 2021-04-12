import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Layout, Breadcrumb } from "__common__/index"
import {BlogPostWriter} from "__board__/index"
const BlogWriter = ({ location }) => {
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
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
                  {/* blog post */}
                  <BlogPostWriter />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

BlogWriter.propTypes = {
  location: PropTypes.object
};

export default BlogWriter;
