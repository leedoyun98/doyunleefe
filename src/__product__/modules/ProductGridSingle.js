import PropTypes from "prop-types"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import { ProductModal } from "__product__/index"

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false)
  const { addToast } = useToasts()

  const finalProductPrice = +(product.prdPrice * currency.currencyRate)

  return (<>
    <div
      className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
        sliderClassName ? sliderClassName : ""
      }`}
    >
      <div
        className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
      >
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product-detail/" + product.prdNo}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + product.prdImg}
              alt=""
            />
          </Link>

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => addToWishlist(product, addToast)}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.prdInv && product.prdInv > 0 ? (
                <button
                  onClick={() => addToCart(product, addToast)}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product-detail/" + product.prdNo}>
              {product.prdName}
            </Link>
          </h3>
          <div className="product-price">
            <span>{currency.currencySymbol + finalProductPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
          </div>
        </div>
      </div>
    </div>
    {/* product modal */}
    <ProductModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      product={product}
      currency={currency}
      finalproductprice={finalProductPrice}
      cartitem={cartItem}
      wishlistitem={wishlistItem}
      addtocart={addToCart}
      addtowishlist={addToWishlist}
      addtoast={addToast}
    />
  </>)
}

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
}

export default ProductGridSingle
