import React, {useEffect,useState} from 'react'
import {Posts,Pagination, BlogPostList} from '__board__/index'
import axios from 'axios'
import {paginate} from '__board__/index';
import ReactPaginate from "react-paginate";
import Paginator from "react-hooks-paginator"
function BlogApp() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
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

    console.log(posts);
  
    return (
      <div >
         <BlogPostList posts={currentPosts(posts)} loading={loading}></BlogPostList>
         {/* <Pagination
        pageSize={postsPerPage}
        itemsCount={posts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> */}
       
    </div>
    );
  }
  
  export default BlogApp;