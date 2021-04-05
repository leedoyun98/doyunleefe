import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import ProductImageGalleryStickyComp from '__product__/modules/ProductImageGalleryStickyComp'
import axios from 'axios'

const ProductImageGallerySticky = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios({
      url: `http://localhost:8080/products/product-number/` + localStorage.getItem('prdNo'),
      methos: `get`,
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {}
    })
    .then((res) => {
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(`error !`)
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

ProductImageGallerySticky.propTypes = {
  product: PropTypes.object
}
export default ProductImageGallerySticky