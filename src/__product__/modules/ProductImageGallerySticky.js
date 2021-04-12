import React, { useState, useEffect } from "react"
import { ProductImageGalleryStickyComp } from "__product__/index"
import axios from "axios"

const ProductImageGallerySticky = ({ product }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/products/product-number/' + product.prdNo, )
    .then((res) => {
      setProducts(res.data)
      console.log(product.prdNo + `번 제품 정보 불러오기 성공`)
    })
    .catch((err) => {
      console.log(`제품 정보 불러오기 실패: ` + err)
      throw err
    })
  }, [])

  return (<>
    {products.map((product => {
      return(
        <ProductImageGalleryStickyComp product={product} key={product.prdNo} />
      )}
    ))}
  </>)
}

export default ProductImageGallerySticky