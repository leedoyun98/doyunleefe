import React, { useState, Fragment,useEffect } from 'react'
import { Link } from "react-router-dom";
import {makeStyles} from '@material-ui/styles'
import axios from 'axios'
import imageCompression from "browser-image-compression";
import { useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import  { useHistory} from 'react-router'; 


const BlogPostWriter = () => {
  const history = useHistory()
  const [brdTitle, setBrdTitle] = useState('')
  const [brdContent, setBrdContent] = useState('')
  const [brdWrtDate, setBrdWrtDate] = useState('')
  const [brdRank, setBrdRank] = useState('')
  const [brdImg, setBrdImg] = useState('')
  const [brdLike, setBrdLike] = useState('')
  const [brdNikcname, setBrdNikcname] = useState('')
  const [brdKind, setBrdKind] = useState('')
  const { register,handleSubmit} = useForm() 

  const wrt = e => {
    e.preventDefault()
    axios({
      url: 'http://localhost:8080/board/save',
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {brdTitle,brdContent,brdWrtDate,brdRank,brdImg,brdLike,brdNikcname,brdKind: 1}
    })
  .then(resp => {
    alert('글쓰기 성공')
    history.push('/blog-list')
  })
  .catch(err => {
    alert('글쓰기 실패')
  })
  }
  
  return (<>

    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <form onSubmit={handleSubmit()}>
        <div>
        <h5>사진 업로드: 
        <input ref={register} type="file"accept="image/*" name="brdImg" onChange={ e => {setBrdImg(`${ e.target.value }`)}}/>
        </h5>
       </div>
       </form>
        </div>
        <div className="blog-details-content">
    <form>
         <td ><h3><input type="text" placeholder="글 제목 입력"   onChange = { e => {setBrdTitle(`${e.target.value}`)}}/></h3></td>
          <div type></div>
          <td><textarea rows="30" cols="200"  placeholder="글 내용 입력"  onChange = { e => {setBrdContent(`${e.target.value}`)}}
          >
       </textarea></td></form>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">

          <div className="col-md-6">
          </div>
        </div>
     
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <button type="submit" onClick= {wrt}>글 작성 완료</button>
            </li>
          </ul>
        </div>
      </div>
  
    </Fragment>
    </>
  );
};

export default BlogPostWriter;
