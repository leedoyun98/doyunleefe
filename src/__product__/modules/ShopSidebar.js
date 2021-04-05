import PropTypes from "prop-types"
import React from "react"
import { getIndividualCategories, getIndividualTags } from "helpers/product"
import ShopCategories from "__product__/modules/ShopCategories"
import ShopSearch from "__product__/modules/ShopSearch"
import ShopTag from "__product__/modules/ShopTag"

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getIndividualCategories(products)
  const uniqueTags = getIndividualTags(products)

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
    </div>
  )
}

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
}
export default ShopSidebar