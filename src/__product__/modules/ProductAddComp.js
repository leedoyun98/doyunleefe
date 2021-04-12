import React, { useCallback, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"

const ProductAddComp = () => {
  const history = useHistory()
  const [productAdd, setProductAdd] = useState({
    ctgName: "",
    prdName: "",
    prdImg: "",
    prdPrice: "",
    prdInv: "",
  })
  
  const { ctgName, prdName, prdImg, prdPrice, prdInv } = productAdd
  const onChange = useCallback(e => {
    setProductAdd({...productAdd, [e.target.name]: e.target.value})
  })

  const add = e => {
    e.preventDefault()
    axios({
      url: 'http://localhost:8080/products/save',
      method: 'post',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: productAdd
    })
    .then((res) => {
      console.log(`제품 등록 성공`)
      history.push(`/product/all`)
    })
    .catch((err) => {
      console.log(`제품 등록 실패: ` + err)
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
                defaultValue="living"
                name="ctgName"
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
               value={prdName}
               placeholder="제품명을 입력하세요"
               onChange={onChange}
              />
            </h5>
          </div>
          <div>
            <h5>판매가격: 
              <input
                type="text"
                name="prdPrice"
                value={prdPrice}
                placeholder="판매가격을 입력하세요"
                onChange={onChange}
              />
            </h5>
          </div>
          <div>
              <h5>재고수량: 
                <input
                  type="text"
                  name="prdInv"
                  value={prdInv}
                  placeholder="재고수량을 입력하세요"
                  onChange={onChange}
                />
              </h5>
          </div>
          <div>
              <h5>제품이미지:
                <input
                  type="file"
                  name="prdImg"
                  value={prdImg}
                  onChange={onChange}
                />
              </h5>
          </div>
        </form>
        <button type="submit" onClick={add}>등록하기</button>
      </div>
    </div>
  </>)
}

export default ProductAddComp