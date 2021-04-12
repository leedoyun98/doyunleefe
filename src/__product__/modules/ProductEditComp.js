import React, { useState, useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

const ProductEditComp = () => {
  const history = useHistory()
  const [product, setProduct] = useState([])

  const [productEdit, setProductEdit] = useState({
    ctgName: product.ctgName,
    prdName: product.prdName,
    prdImg: product.prdImg,
    prdPrice: product.prdPrice,
    prdInv: product.prdInv
  })

  const { ctgName, prdName, prdImg, prdPrice, prdInv } = productEdit
  const onChange = useCallback(e => {
    setProductEdit({...productEdit, [e.target.name]: e.target.value})
  })

  const edit = e => {
    e.preventDefault()
    axios({
        url: `http://localhost:8080/products/edit/` + localStorage.getItem('prdNo'),
        method: 'put',
        headers: {
          'Content-Type'  : 'application/json',
          'Authorization' : 'JWT fefege..'
        },
        data: { 
          prdNo: localStorage.getItem('prdNo'),
          ctgName, prdName, prdPrice, prdInv, prdImg
        }
      })
    .then(res => {
      console.log(localStorage.getItem('prdNo') + `번 제품 정보 수정 성공`)
      history.push(`/product-detail/` + localStorage.getItem('prdNo'))
      })
    .catch(err => {
      console.log(`제품 정보 수정 실패: ` + err)
      throw err
    })
  }

  return (<>
    <div className="add-prd">
      <div className="input-new-prd">
        <form>
          <div className="shop-select">
            <h5>제품군: 
              <select
                name="ctgName"
                placeholder={product.ctgName}
                value={ctgName}
                onChange={onChange}
              >
                <option value="living">living</option>
                <option value="bathroom">bathroom</option>
                <option value="kitchen">kitchen</option>
                <option value="stationary">stationary</option>
              </select>
            </h5>
          </div>
          <div>
            <h5>제품명: 
              <input
                type="text"
                name="prdName"
                placeholder={product.prdName}
                value={prdName}
                onChange={onChange}
              />
            </h5>
          </div>
          <div>
            <h5>판매가격: 
              <input
                type="text"
                name="prdPrice"
                placeholder={product.prdPrice}
                value={prdPrice}
                onChange={onChange}
              />
            </h5>
          </div>
          <div>
            <h5>재고수량: 
              <input
                type="text"
                name="prdInv"
                placeholder={product.prdInv}
                value={prdInv}
                onChange={onChange}
              />
            </h5>
          </div>
          <div>
            <h5>제품이미지: 
              <input
                type="file"
                multiple="multiple"
                name="prdImg"
                value={prdImg}
                onChange={onChange}
              />
            </h5>
          </div>
        </form>
        <button type="submit" onClick={edit}>수정완료</button>
      </div>
    </div>
  </>)
}

export default ProductEditComp