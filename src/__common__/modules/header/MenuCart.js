import React from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"

const MenuCart = ({ cartData, currency, deleteFromCart }) => {
  let cartTotalPrice = 0
  const { addToast } = useToasts()
  
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (<>
        <ul>
          {cartData.map((single, key) => {
            const finalProductPrice = (
              single.prdPrice * currency.currencyRate
            )
            cartTotalPrice += finalProductPrice * single.quantity

            return (
              <li className="single-shopping-cart" key={key}>
                <div className="shopping-cart-img">
                  <Link to={process.env.PUBLIC_URL + "/product-detail/" + single.prdNo}>
                    <img
                      alt=""
                      src={process.env.PUBLIC_URL + single.prdImg}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div className="shopping-cart-title">
                  <h4>
                    <Link
                      to={process.env.PUBLIC_URL + "/product-detail/" + single.prdNo}
                    >
                      {" "}
                      {single.prdName}{" "}
                    </Link>
                  </h4>
                  <h6>Qty: {single.quantity}</h6>
                  <span> {currency.currencySymbol + single.prdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <div className="shopping-cart-delete">
                  <button onClick={() => deleteFromCart(single, addToast)}>
                    <i className="fa fa-times-circle" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="shopping-cart-total">
          <h4>
            Total :{" "}
            <span className="shop-total">
              {currency.currencySymbol + cartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </h4>
        </div>
        <div className="shopping-cart-btn btn-hover text-center">
          <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
            view cart
          </Link>
          <Link
            className="default-btn"
            to={process.env.PUBLIC_URL + "/checkout"}
          >
            checkout
          </Link>
        </div>
      </>) : (
        <p className="text-center"> 장바구니에 담은 제품이 없습니다! </p>
      )}
    </div>
  )
}

export default MenuCart