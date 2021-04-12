import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import { ProductModal } from "__product__/index"

const ProductGridListSingle = ({
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

  return (<>
    <div
      className={`col-xl-4 col-sm-6 ${
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
              onClick={localStorage.setItem('prdNo', product.prdNo)}
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
                  cartItem !== "active"
                }
                
                title={"Added to cart"}
              >
                {" "}
                <i className="pe-7s-cart"></i>{" "}
                {"Add to cart"}
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
            <Link to={process.env.PUBLIC_URL + "/product-detail/" + product.prdNo} 
                  onClick={localStorage.setItem('prdNo', product.prdNo)}>
              {product.prdName}
            </Link>
          </h3>
          <div className="product-price">
              <span>{currency.currencySymbol + product.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product-detail/" + product.prdNo}>
                  <img
                    className="default-img img-fluid"
                    src={process.env.PUBLIC_URL + product.prdImg}
                    alt=""
                    onClick={localStorage.setItem('prdNo', product.prdNo)}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product-detail/" + product.prdNo}
                      onClick={localStorage.setItem('prdNo', product.prdNo)}>
                  {product.prdName}
                </Link>
              </h3>
              <div className="product-list-price">
                  <span>{currency.currencySymbol + product.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
              </div>

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {product.prdInv > 0 ? (
                    <button
                      onClick={() => addToCart(product, addToast)}
                      className={
                        cartItem !== undefined && cartItem.quantity > 0
                          ? "active"
                          : ""
                      }
                      disabled={
                        cartItem !== undefined && cartItem.quantity > 0
                      }
                      title={
                        cartItem !== undefined
                          ? "Added to cart"
                          : "Add to cart"
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

                <div className="shop-list-wishlist ml-10">
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
    </div>
    
    {/* product modal */}
    <ProductModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      product={product}
      currency={currency}
      cartitem={cartItem}
      wishlistitem={wishlistItem}
      addtocart={addToCart}
      addtowishlist={addToWishlist}
      addtoast={addToast}
    />
  </>)
}

export default ProductGridListSingle