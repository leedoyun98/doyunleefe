import PropTypes from 'prop-types'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import { Link, Route, Router } from "react-router-dom";
import React, {useState,useEffect,useCallback} from 'react'
import {useHistory} from 'react-router'
import {useForm} from 'react-hook-form'
import UserAdmin from '__user__/pages/UserAdmin';
const ProductDescriptionTab = ({ spaceBottomClass,product }) => {
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
  const [board, setBoard] = useState([])

  const [state, setState] = useState(true);

  const [dele, setDele] = useState({
    brdNo: ""
  })
  const {brdNo} = dele
  const onChange = useCallback(e=> {
    setDele({...dele,[e.target.name]: e.target.value})
  })

  function toggle() {
    setState(!state);
  }
  const review = e => {
    e.preventDefault()
    
    axios({
      url: 'http://localhost:8080/board/save',
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {brdTitle,brdContent,brdWrtDate,brdRank,brdImg,brdLike,brdNikcname,brdKind: 2,usrName: JSON.parse(localStorage.getItem("user")).usrName,usrNo: JSON.parse(localStorage.getItem("user")).usrNo,productNo: product.prdNo}
    })
  .then(resp => {
    alert('리뷰 작성 성공')
    history.go()
  })
  .catch(err => {
    alert('리뷰 작성 실패')
    throw err
  })
  }
  useEffect(()=>{
    axios({
    url: 'http://localhost:8080/board/review/list',
    method: 'get',
    headers: {
      'Content-Type'  : 'application/json',
      'Authorization' : 'JWT fefege..'
    },
    data: {}
  })
   .then((res) => {
    setBoard(res.data)

   })
   .catch((error) => {
     alert('실패')
     throw error;
   })
   
 },[])
 const remove = () => {
   alert(localStorage.getItem("brdNo"))
  const removeBlog = window.confirm("해당 리뷰를 삭제하시겠습니까?")
  if(removeBlog){
    axios({
      url: `http://localhost:8080/board/delete/`+localStorage.getItem('brdNo'),
      method: 'delete',
      data: {brdNo: localStorage.getItem('brdNo')}
     })
  .then(resp => {
    alert('글이 삭제 되었습니다')
    history.go()
    localStorage.removeItem("brdNo")
    
  })
  .catch(err => {
    alert('글 삭제 실패')
    localStorage.removeItem("brdNo")
    throw err
  })
  }
}     
  return (<>
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className='container'>
        <div className='description-review-wrapper'>
          <Tab.Container defaultActiveKey='productDescription'>
            <Nav variant='pills' className='description-review-topbar'>
              <Nav.Item>
                <Nav.Link eventKey='additionalInfo'>
                  <strong>추가정보</strong>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='productDescription'><strong>제품 상세정보</strong></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='productReviews'>REVIEWS ({board.length})</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className='description-review-bottom'>
              <Tab.Pane eventKey='additionalInfo'>
                <div className='product-anotherinfo-wrapper'>
                  <ul>
                    <li>
                      <span><strong>배송정보</strong></span> 모든 제품의 배송은 Plastic Free 원칙으로 발송됩니다. (종이박스, 종이완충재, 종이테이프) <br />
                      <span></span> 수령하신 택배박스는 운송장을 제거한 후 종이로 분리배출 해주세요.<br />
                      <span></span> 결제 완료 후 제품은 약 2~3일 소요됩니다.<br />
                      <span></span> 배송 지연 혹은 일부 제품이 품절인 경우 개별적으로 연락을 드리겠습니다.<br />
                      <span></span> 제주도를 포함한 도서산간 일부 지역은 추가 배송비가 청구됩니다.
                    </li>
                    <li>
                      <span><strong>교환/환불</strong></span> 구매자의 단순 변심에 의한 반품 및 교환 요청은 제품 수령 후 7일 이내에 가능합니다. (이때 발생하는 왕복 배송비는 구매자 부담입니다.) <br />
                      <span></span> 교환 또는 반품을 원하시는 경우 소비자상담실로 문의 바랍니다. <br />
                      <span></span> 제품을 개봉하였거나 사용한 후에는 교환 및 반품이 불가합니다. (제품 하자에 의한 교환 및 환불은 가능합니다.)
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='productDescription'>
                <div className='product-anotherinfo-wrapper'>
                  <ul>
                    <li>
                      <span><strong>Zero Waste 난이도</strong></span> ★★☆☆☆ 　easy !
                    </li>
                    <li>
                      <span><strong>사회적 가치</strong></span> Plastic Free <br />
                      <span></span> Package Free <br />
                      <span></span> 무형광 & 무표백 <br />
                      <span></span> 협동조합제품 
                    </li>
                    <li>
                      <span><strong>배출 방법</strong></span> 일반쓰레기로 배출
                    </li>
                    <li>
                      <span><strong>배출 이후의 과정</strong></span> 일반쓰레기로 배출 시 소각 또는 매립 과정을 거쳐 처리됩니다.
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
          
              <Tab.Pane eventKey='productReviews'>
              
                <div className='row'>
                  <div className='col-lg-7'>
                    <div className='review-wrapper'>
                    {board ? board.map (b=>
                      <div className='single-review'>
                        <div className='review-img'>
                          <img
                            src={b.brdImg} alt={b.brdImg}
                          />
                        </div>
                        <div className='review-content'>
                          <div className='review-top-wrap'>
                            <div className='review-left'>
                              <div className='review-name'>
                                <h4>{b.brdTitle} </h4>
                              </div>
                              <div className='review-rating'>
                                <i className='fa fa-star' />
                                <i className='fa fa-star' />
                                <i className='fa fa-star' />
                                <i className='fa fa-star' />
                                <i className='fa fa-star' />
                              </div>
                            </div>
                            <div className="review-left">
                            {localStorage.getItem("token")!=null ? <>
                            {JSON.parse(localStorage.getItem("user")).usrNo==b.usrNo ?<>
                            <button><Link to={process.env.PUBLIC_URL + `/blog-update/${b.brdNo}`}>수정하기</Link></button>
                            <Link onClick={remove}><a onClick={()=>{localStorage.setItem("brdNo",b.brdNo)}} >삭제하기</a></Link></>:''}</> : ''}
                            </div>
                          </div>
                          <div className='review-bottom'>
                            <p>
                             {b.brdContent}
                             </p>
                             {/* <h2 onClick={toggle}>
                             <div className="toggle">
          {state ? <span>{b.brdLike}</span> : <span>No! 👎</span>}
        </div></h2> */}
                             작성자: {b.usrName}
                             <div className="review-left">
                           작성시간: {b.brdWrtDate}
                            </div>
                            
                          </div>
                        </div>
                      </div>
                       ) : '조회 할 페이지가 없습니다'} 
                    </div>
                  </div>
                  {localStorage.getItem("token")!= null ? 
                  <div className='col-lg-5'>
                    <div className='ratting-form-wrapper pl-50'>
                      <h3>Add a Review</h3>
                      <div className='ratting-form'>
                        <form action='#'>
                          <div className='star-box'>
                            {/* <span>Your rating:</span> */}
                            {/* <div className='ratting-star'>
                              <i className='fa fa-star' />
                              <i className='fa fa-star' />
                              <i className='fa fa-star' />
                              <i className='fa fa-star' />
                              <i className='fa fa-star' />
                            </div> */}
                          </div>
                         
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='rating-form-style mb-10'>
                              <td ><h3><input type="text" placeholder="리뷰 제목 입력"   onChange = { e => {setBrdTitle(`${e.target.value}`)}}/></h3></td>
                                <div type></div>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='rating-form-style mb-10'>
                                작성자: {JSON.parse(localStorage.getItem("user")).usrName}
                              </div>
                            </div>
                            <div className='col-md-12'>
                              <form>
                                <td><textarea rows="10" cols="100"  placeholder="리뷰 내용 입력"  onChange = { e => {setBrdContent(`${e.target.value}`)}}
                                >
                            </textarea></td></form>
                            <div className='rating-form-style form-submit'>
                                <input type='submit' defaultValue='Submit' onClick={review}/>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                : ''}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  </>)
}

ProductDescriptionTab.propTypes = {
  spaceBottomClass: PropTypes.string
}

export default ProductDescriptionTab