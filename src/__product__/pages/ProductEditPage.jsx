import PropTypes from "prop-types"
import React, { Fragment } from "react"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import LayoutOne from "layouts/LayoutOne"
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb"
import ProductEditComp from "__product__/modules/ProductEditComp"

const ProductEditPage = ({ location }) => {
  const { pathname } = location

  return (
    <Fragment>
      <MetaTags>
          <title>ZER0 SHOP | Product Edit Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Edit Product</BreadcrumbsItem>
      
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        
        {/* Edit Product Component */}
        <ProductEditComp />
        
      </LayoutOne>
    </Fragment>)
}

ProductEditPage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
}

export default ProductEditPage