import React, { useState,  Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const ProductEditComp = () => {
  const [ctgName, setCtgName] = useState('')
  const [prdName, setPrdName] = useState('')
  const [prdImg, setPrdImg] = useState('')
  const [prdPrice, setPrdPrice] = useState('')
  const [prdInv, setPrdInv] = useState('')

  const { register } = useForm()
  const history = useHistory()

  const edit = e => {
      e.preventDefault()
      axios({
          url: 'http://localhost:8080/products/edit/' + localStorage.getItem(`prdNo`),
          method: 'put',
          headers: {
            'Content-Type'  : 'application/json',
            'Authorization' : 'JWT fefege..'
          },
          data: { prdNo: localStorage.getItem(`prdNo`), ctgName, prdName, prdPrice, prdInv, prdImg }
        })
      .then(res => {
        console.log(`수정 성공 ` + res.data)
        history.push(`/product-all`)
        })
      .catch(err => {
        console.log(`수정 실패`)
        throw err
      })
    }

    return (<>
    <Fragment>
      <div className="add-prd">
        <div className="input-new-prd">
          <form>
            <div className="shop-top-bar mb-35">
              <div className="select-shoing-wrap">
                <div className="shop-select">
                  <h5>제품군: 
                    <select ref={ register } name="ctgName" onChange={ e => {setCtgName(`${ e.target.value }`)}}>
                      <option value="living">living</option>
                      <option value="bathroom">bathroom</option>
                      <option value="kitchen">kitchen</option>
                      <option value="stationary">stationary</option>
                    </select>
                  </h5>
                </div>
              </div>        
            </div>
            <div>
              <h5>제품명: <input type="text" id="prdName" value={prdName} onChange={ e => {setPrdName(`${ e.target.value }`)}}/></h5>
            </div>
            <div>
              <h5>판매가격: <input type="text" id="prdPrice" value={prdPrice} onChange={ e => {setPrdPrice(`${ e.target.value }`)}}/></h5>
            </div>
            <div>
                <h5>재고수량: <input type="text" id="prdInv" value={prdInv} onChange={ e => {setPrdInv(`${ e.target.value }`)}}/></h5>
            </div>
            <div>
                <h5>제품이미지: <input ref={ register } value={prdImg} type="file" name="prdImg" onChange={ e => {setPrdImg(`${ e.target.value }`)}} /></h5>
            </div>
          </form>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <div className="pro-details-quality">
                <div className="pro-details-cart btn-hover">
                  <button type="submit" onClick={ edit }>수정완료</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    </>)
}
export default ProductEditComp