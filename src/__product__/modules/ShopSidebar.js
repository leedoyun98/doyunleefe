import React from "react"
import Sticky from "react-sticky-el"
import { getIndividualCategories } from "helpers/product"
import { ShopCategories, ShopSearch } from "__product__/index"

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getIndividualCategories(products)

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      <Sticky
        boundaryElement="sidebar-style"
        style={{ position: "relative" }}
      >
        {/* shop search */}
        <ShopSearch />

        {/* filter by categories */}
        <ShopCategories
          categories={uniqueCategories}
          getSortParams={getSortParams}
        />
      </Sticky>
    </div>
  )
}

export default ShopSidebar