import React, { useState, Fragment,useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import  { useHistory} from 'react-router'
import PropTypes from "prop-types"
const BlogPostDetail = ({ boards}) => {


const history = useHistory()

const remove = () => {
  const removeBlog = window.confirm("해당 글을 삭제하시겠습니까?")
  if(removeBlog){
    axios({
      url: `http://localhost:8080/board/delete/`+boards.brdNo,
      method: 'delete',
      data: {}
     })
  .then(resp => {
    alert('글이 삭제 되었습니다')
    history.push('/blog-list')
  })
  .catch(err => {
    alert('글 삭제 실패')
    throw err
  })
  }
}     
return (
  <>

      <div className="blog-details-top">
      <div className="blog-details-img">
      <img
              src={boards.brdImg} alt={boards.brdImg} /> 
      </div>
      <div className="blog-details-content">
        <div className="blog-meta-2">
          <ul>
            <li>{boards.brdWrtDate}</li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                <i className="fa fa-comments-o" />
              </Link>
            </li>
          </ul>
        </div>
        <h3 type="text">{boards.brdTitle}</h3>
        <p>
        {boards.brdContent}
        </p>
        <div>
        {localStorage.getItem("token")!==null &&(JSON.stringify(JSON.parse(localStorage.getItem("user")).usrNo) === boards.usrNo) ? <>
    <a href="#" ><Link to={process.env.PUBLIC_URL +"/blog-update/"+boards.brdNo}>글 수정하기</Link></a><br/>
    <a href="#"  onClick={remove}>글 삭제하기</a></> : ''}
    </div>
      </div>
    </div>

   <div className="tag-share">
   
      <div className="blog-share">
        
        <span>share :</span>
        <div className="share-social">
          <ul>
            <li>
              <a className="facebook" href="//facebook.com">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a className="twitter" href="//twitter.com">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a className="instagram" href="//instagram.com">
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
        
      </div>
      
    </div>
    
    <div className="next-previous-post">
  
    </div> 
</>);
};
BlogPostDetail.propTypes = {
  location: PropTypes.object,
  board: PropTypes.object
}





export default (BlogPostDetail)
