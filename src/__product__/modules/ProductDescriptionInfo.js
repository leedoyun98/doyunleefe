import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProductCartQuantity } from 'helpers/product'
import { addToCart } from '__product__/actions/cartActions'
import { addToWishlist } from '__product__/actions/wishlistActions'
import { addToCompare } from '__product__/actions/compareActions'
import axios from 'axios'

const ProductDescriptionInfo = ({
  product,
  currency,
  cartItems,
  wishlistItem,
  addToast,
  addToCart,
  addToWishlist,
}) => {
  const history = useHistory()
  const [quantityCount, setQuantityCount] = useState(1)
  const productCartQty = getProductCartQuantity(
    cartItems,
    product
  )
  
  const remove = e =>  {
    e.preventDefault()
    const removeConfirm = window.confirm(`해당 제품을 삭제하시겠습니까?`)
    if(removeConfirm) {
      axios({
        url: 'http://localhost:8080/products/delete/' + localStorage.getItem(`prdNo`),
        method: 'delete',
        headers: {
          'Content-Type'  : 'application/json',
          'Authorization' : 'JWT fefege..'
        },
        data: {}
      })
      .then(res => {
        history.push(`/product-all`)
      })
      .catch(err => {
        console.log(`삭제 실패: ` + err)
        throw err
      })
    }
  }

  return (
    <div className="product-details-content ml-70">
      <h2>{product.prdName}</h2>
      <div className="product-details-price">
        <span>{currency.currencySymbol + product.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      </div>

      <div className="pro-details-list">
        <ul>
          <li><span><strong>원산지</strong></span> 대한민국 </li>
          <li><span><strong>브랜드</strong></span> ZER0 SHOP </li>
          <li><span><strong>구매혜택</strong></span> 구매금액의 5% 적립 ({product.prdPrice * 0.05} Point) </li>
          <li><span><strong>배송비</strong></span> 2,500원 </li>
        </ul>
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
          {product.prdInv && product.prdInv > 0 ? (
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
          <button onClick={() => localStorage.setItem('prdNo', JSON.stringify(product.prdNo))}>
            <Link to={"/product-edit/" + product.prdNo}>
              Edit
            </Link>
          </button>
          <button key={product.prdNo} onClick={ remove }> 삭제 </button>
        </div>
      </div>

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/product-detail"}>
                    {single}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/product-detail"}>
                    {single}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//instagram.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount
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

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo)
