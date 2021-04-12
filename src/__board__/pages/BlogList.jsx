import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Layout, Breadcrumb } from "__common__/index"
import {BlogPostList,} from "__board__/index";
import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Paginator from "react-hooks-paginator"

const BlogList = ({ location }) => {
  const { pathname } = location;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [offset, setOffset] = useState(0)
  useEffect( async() => {
    setLoading(true);
      await axios.get('http://localhost:8080/board/blogAll', ).then(response=>{
      setPosts(response.data);
      setLoading(false);
    });
    
  },[]);
  const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
function currentPosts(tmp) {
  let currentPosts = 0;
  currentPosts = tmp.slice(indexOfFirst, indexOfLast);
  return currentPosts;
}
  return (
    <>
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
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mr-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPostList posts={currentPosts(posts)} loading={loading}></BlogPostList>
              

                  {/* blog pagination */}
                  <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                        totalRecords={posts.length}
                         pageLimit={postsPerPage}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageContainerClass="mb-0 mt-0"
                        pagePrevText="«"
                        pageNextText="»"
                    />
                     </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </Layout>

</>
  );
};

BlogList.propTypes = {
  location: PropTypes.object
};

export default BlogList;
