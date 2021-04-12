import PropTypes from "prop-types"
import React from "react"
import { setActiveLayout } from "helpers/product"
import { Link } from "react-router-dom"

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select onChange={e => getFilterSortParams("filterSort", e.target.value)}>
            <option value="default">신상품순</option>
            <option value="priceHighToLow">높은 가격순</option>
            <option value="priceLowToHigh">낮은 가격순</option>
          </select>
        </div>
        {localStorage.getItem('token') !== null && JSON.stringify(localStorage.getItem('user').username) === "Admin" ?
          <button>
            <Link to={"/product-add"}>제품추가</Link>
          </button>
        : ""}
        <p>
          Showing {sortedProductCount} of {productCount} result
        </p>
      </div>

      <div className="shop-tab">
        <button
          onClick={e => {
            getLayout("grid two-column")
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column")
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list")
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  )
}

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
}

export default ShopTopAction