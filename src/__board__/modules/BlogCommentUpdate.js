import React, { useState, Fragment,useEffect,useCallback } from 'react'
import { Link, Route, Router } from "react-router-dom";
import {makeStyles} from '@material-ui/styles'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import  { useHistory} from 'react-router'


const BlogCommentUpdate = ({replies}) => {

    const history = useHistory()
    const [update, setUpdate] = useState({
      rplNo: replies.rplNo,
      rplContent: replies.rplContent
    })
    const {rplContent} = update
    const onChange = useCallback(e=> {
      setUpdate({...update,[e.target.name]: e.target.value})
    })

const rplUpdate = e => {
  e.preventDefault()
  axios({
    url: `http://localhost:8080/replies/update/`+replies.rplNo,
    method: 'put',
    headers: {'Content-Type': 'application/json','Authorization': 'JWT fefege..'},
  data: update
  })
  .then(resp => {
    alert('댓글 수정 성공')
    history.goBack()
  })
  .catch(err => {
    alert('댓글 수정 실패')
  })
  }

  return (<>
    {localStorage.getItem("token")!=null &&(JSON.stringify(JSON.parse(localStorage.getItem("user")).usrNo) === replies.usrNo) ? <>
    <div>
      <div>
              <div>
                <label>수정할 댓글 내용: </label>
                <div>
                <textarea rows="10" cols="250"  defaultValue={replies.rplContent} name="rplContent" onChange = {onChange}
          />
                </div>
              </div>
              <a href="#"  onClick={rplUpdate} >수정완료</a> 
        </div>
        </div>
</>:'존재하지 않는 페이지 입니다.'}
</>
  );
};

export default BlogCommentUpdate;
