import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Layout, Breadcrumb } from "__common__/index"
import {BlogCommentUpdate} from "__board__/index"
import axios from 'axios' 
const CommentUpdate = ({ location ,match}) => {
  const [replies, setReplies] = useState([])
  useEffect(()=>{
   axios.get(`http://localhost:8080/replies/select/`+match.params.id, )
   .then(({data}) => {
    setReplies(data)
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

      <Layout headerTop="visible">
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
                  <BlogCommentUpdate replies={replies} />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

CommentUpdate.propTypes = {
  location: PropTypes.object
};

export default CommentUpdate;
