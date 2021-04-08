import PropTypes from "prop-types"
import React, { Fragment, useState,useEffect } from "react"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import LayoutOne from "layouts/LayoutOne"
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb"
import {BlogPostDetail,BlogComment} from "__board__/index"
import axios from 'axios'
const BlogDetailsStandard = ({ location, match }) => {
  const { pathname } = location; 
  const [boards, setBoards] = useState([])
  useEffect(()=>{
   axios.get('http://localhost:8080/board/opt/'+match.params.id, )
   .then((res) => {
    setBoards(res.data)
   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
   
  },[])

  return (
    <>
  
      <MetaTags>
        <title>Flone | Blog Detail</title>
        <meta
          name="description"
          content="Blog Detail page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog Detail
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
                <div className="blog-details-wrapper ml-20">
                  {/* blog post */}
                   <BlogPostDetail boards={boards} key={boards.brdNo}/>
                  {/* blog post comment */}
                  <BlogComment />
                </div>
              </div>
          
        </div>
      </LayoutOne>

 </> )
}

BlogDetailsStandard.propTypes = {
  location: PropTypes.object
}

export default BlogDetailsStandard
