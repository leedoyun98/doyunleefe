import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { getProducts } from "helpers/product"
import { addToCart } from "__product__/actions/cartActions"
import { addToCompare } from "__product__/actions/compareActions"
import { addToWishlist } from "__product__/actions/wishlistActions"
import ProductGridSingle from "__product__/modules/ProductGridSingle"
import axios from 'axios'

const ProductGrid = ({
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass
}) => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios({
      url: 'http://localhost:8080/products/category/' + localStorage.getItem(`ctgName`),
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

  return (
    <Fragment>
      {products.map(product => {
        return (
          <ProductGridSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter(cartItem => cartItem.prdNo === product.prdNo)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                wishlistItem => wishlistItem.prdNo === product.prdNo
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.prdNo === product.prdNo
              )[0]
            }
            key={product.prdNo}
          />
        )
      })}
    </Fragment>
  )
}

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      )
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast))
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)
