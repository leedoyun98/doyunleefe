import React, { useState, Fragment,useEffect,useCallback } from 'react'
import { Link } from "react-router-dom";
import {makeStyles} from '@material-ui/styles'
import axios from 'axios'
import imageCompression from "browser-image-compression";
import { useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import  { useHistory} from 'react-router'; 


const BlogPostWriter = () => {
  const history = useHistory()
  const [brdWrtDate, setBrdWrtDate] = useState('')
  const [brdRank, setBrdRank] = useState('')
  const [brdLike, setBrdLike] = useState('')
  const [brdNikcname, setBrdNikcname] = useState('')
  const { register,handleSubmit} = useForm() 
  const [writer, setWriter] = useState({
    brdTitle: "",
    brdContent: "",
    brdImg: "",
    brdKind: 1,
    usrName: JSON.parse(localStorage.getItem("user")).usrName, 
    usrNo: JSON.parse(localStorage.getItem("user")).usrNo
  })
  const {brdTitle,brdContent,brdImg} = writer
  const onChange = useCallback(e=> {
    setWriter({...writer,[e.target.name]: e.target.value})
  })

  const wrt = e => {
    e.preventDefault()
    axios({
      url: 'http://localhost:8080/board/save',
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: writer
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
  {localStorage.getItem("token")!=null && (JSON.stringify(JSON.parse(localStorage.getItem("user")).roles)===JSON.stringify(["USER"]))? <>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <form onSubmit={handleSubmit()}>
        <div>
        <h5>사진 업로드: 
        <input ref={register} type="file" accept="image/*" name="brdImg" onChange={onChange}/>
        </h5>
       </div>
       </form>
        </div>
        <div className="blog-details-content">
        작성자: {JSON.parse(localStorage.getItem("user")).usrName}
         <td ><h3><input type="text" placeholder="글 제목 입력"  name="brdTitle" onChange={onChange}/></h3></td>
          <div type></div>
          <td><textarea rows="30" cols="200"  placeholder="글 내용 입력" name="brdContent" onChange={onChange}
          >
       </textarea></td>
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
      </div></>
 :'존재하지 않는 페이지 입니다.'}
    </>
  );
};

export default BlogPostWriter;
