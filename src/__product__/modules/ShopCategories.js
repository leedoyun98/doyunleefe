import React from "react"
import { useHistory } from "react-router"

const ShopCategories = () => {
  const history = useHistory()

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories</h4>
      <div className="sidebar-widget-list mt-30">
        <ul>
          <a onClick={() => { history.push(`/product/all`) }}>상품 전체보기</a>
        </ul>
        <ul>
          <a onClick={() => { history.push(`/product/category-living`) }}>생활용품</a>
        </ul>
        <ul>
          <a onClick={() => { history.push(`/product/category-kitchen`) }}>주방용품</a>
        </ul>
        <ul>
          <a onClick={() => { history.push(`/product/category-bathroom`) }}>욕실용품</a>
        </ul>
        <ul>
          <a onClick={() => { history.push(`/product/category-stationary`) }}>문구용품</a>
        </ul>
      </div>
    </div>
  )
}

export default ShopCategories