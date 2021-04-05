import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import ProductImageDescriptionStickyComp from '__product__/modules/ProductImageDescriptionStickyComp'
import axios from 'axios'

const ProductImageDescriptionSticky = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:8080/products/product-number/' + localStorage.getItem(`prdNo`),
      methos: 'get',
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
      console.log(`error!`)
      throw err
    })
  }, [])

  return (<>
    {products.map((product => {
      return(
        <ProductImageDescriptionStickyComp product={product} key={product.prdNo} />
      )}
    ))}
  </>)
}

ProductImageDescriptionSticky.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
}

export default ProductImageDescriptionSticky