import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { addToCart } from "__product__/redux/actions/cartActions"
import { addToWishlist } from "__product__/redux/actions/wishlistActions"
import { ProductGridListSingle } from "__product__/index"

const ProductGridList = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
  sliderClassName,
  spaceBottomClass
}) => {
  return (<>
    {products.map(product => {
      return (
        <ProductGridListSingle
          sliderClassName={sliderClassName}
          spaceBottomClass={spaceBottomClass}
          product={product}
          currency={currency}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          cartItem={
            cartItems.filter(cartItem => cartItem.prdNo === product.prdNo)[0]
          }
          wishlistItem={
            wishlistItems.filter(
              wishlistItem => wishlistItem.prdNo === product.prdNo
            )[0]
          }
          key={product.prdNo}
        />
      )}
    )}
  </>)
}

ProductGridList.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
}

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridList)