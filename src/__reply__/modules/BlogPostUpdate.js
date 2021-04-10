import React, { useState, Fragment,useEffect,useCallback } from 'react'
import { Link, Route, Router } from "react-router-dom";
import {makeStyles} from '@material-ui/styles'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import  { useHistory} from 'react-router'
const useStyles = makeStyles (()=>({
        image: {height:40, width:40}
}))

const BlogPostUpdate = ({match,props,boards}) => {
const [board, setBoard] = useState([])
  const [brdNo, setBrdNo] = useState('')
  const [brdWrtDate, setBrdWrtDate] = useState('')
  const [brdRank, setBrdRank] = useState('')
  const [brdImg, setBrdImg] = useState('')
  const [brdLike, setBrdLike] = useState('')
  const [brdNikcname, setBrdNikcname] = useState('')
  const [brdKind, setBrdKind] = useState('')

    const history = useHistory()
    const [update, setUpdate] = useState({
      brdNo: boards.brdNo,
      brdTitle: boards.brdTitle,
      brdContent: boards.brdContent
    })
    const {brdTitle,brdContent} = update
    const onChange = useCallback(e=> {
      setUpdate({...update,[e.target.name]: e.target.value})
    })

// useEffect(()=>{
//   alert(match.params.id)
//  axios.get(URL, )
//  .then(({data}) => {
//   setBoard(data)
//   setBrdNo(data)
//  })
//  .catch((error) => {
//    alert('실패')
//    throw error;
//  })
 
// },[])
const blogUpdate = e => {
  e.preventDefault()
  axios({
    url: `http://localhost:8080/board/update/`+boards.brdNo,
    method: 'put',
    headers: {'Content-Type': 'application/json','Authorization': 'JWT fefege..'},
  data: update
  })
  .then(resp => {
    alert('글수정 성공')
    history.goBack()
  })
  .catch(err => {
    alert('글수정 실패')
  })
  }

  return (<>
    {localStorage.getItem("token")!=null &&(JSON.stringify(JSON.parse(localStorage.getItem("user")).usrNo) === boards.usrNo) ? <>
    <div>
      <div>
              <div >
                <label>제목: </label>
                <label><input type="text" defaultValue={boards.brdTitle} name="brdTitle"  onChange = {onChange}/></label>
              </div> 
              
              <div >
                <label>내용: </label>
                <div>
                <textarea rows="55" cols="250"  defaultValue={boards.brdContent} name="brdContent" onChange = {onChange}
          />
                </div>
              </div>
              <a href="#"  key={boards.brdNo} onClick={blogUpdate} >수정완료</a> 
        </div>
        </div>
</>:'존재하지 않는 페이지 입니다.'}
</>
  );
};

export default BlogPostUpdate;
