import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import Swiper from "react-id-swiper"
import { Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { getProductCartQuantity } from "helpers/product"

function ProductModal(props) {
  const { product } = props
  const { currency } = props

  const [gallerySwiper, getGallerySwiper] = useState(null)
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null)
  const [quantityCount, setQuantityCount] = useState(1)

  const wishlistItem = props.wishlistitem

  const addToCart = props.addtocart
  const addToWishlist = props.addtowishlist

  const addToast = props.addtoast
  const cartItems = props.cartitems

  const productCartQty = getProductCartQuantity(
    cartItems,
    product
  )

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper
      thumbnailSwiper.controller.control = gallerySwiper
    }
  }, [gallerySwiper, thumbnailSwiper])

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true
  }

  return (<>
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton />

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper {...gallerySwiperParams}>
                <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.prdImg}
                alt=""
              />
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product.prdName}</h2>
              <div className="product-details-price">
                  <span>{currency.currencySymbol + product.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
              </div>
              <div className="pro-details-list">
                <ul>
                  <li><span><strong>원산지</strong></span>대한민국</li>
                  <li><span><strong>브랜드</strong></span>ZER0 SHOP</li>
                  <li><span><strong>구매혜택</strong></span>구매금액의 5% 적립 ({product.prdPrice * 0.05} Point)</li>
                  <li><span><strong>배송비</strong></span>2,500원 (50,000원 이상 구매시 무료배송)</li>
                </ul>
              </div>

              <div className="pro-details-quality">
                <div className="cart-plus-minus">
                  <button
                    onClick={() =>
                      setQuantityCount(
                        quantityCount > 1 ? quantityCount - 1 : 1
                      )
                    }
                    className="dec qtybutton"
                  >
                    -
                  </button>
                  <input
                    className="cart-plus-minus-box"
                    type="text"
                    value={quantityCount}
                    readOnly
                  />
                  <button
                    onClick={() =>
                      setQuantityCount(
                        quantityCount < product.prdInv - productCartQty
                          ? quantityCount + 1
                          : quantityCount
                      )
                    }
                    className="inc qtybutton"
                  >
                    +
                  </button>
                </div>
                <div className="pro-details-cart btn-hover">
                  {product.prdInv > 0 ? (
                    <button
                      onClick={() =>
                        addToCart(
                          product,
                          addToast,
                          quantityCount
                        )
                      }
                      disabled={productCartQty >= product.prdInv}
                    >
                      {" "}
                      Add To Cart{" "}
                    </button>
                  ) : (
                    <button disabled>Out of Stock</button>
                  )}
                </div>
                <div className="pro-details-wishlist">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </>)
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  currency: PropTypes.object,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object
}

const mapStateToProps = state => {
  return {
    cartitems: state.cartData
  }
}

export default connect(mapStateToProps)(ProductModal)