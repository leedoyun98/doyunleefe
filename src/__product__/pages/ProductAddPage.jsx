import PropTypes from "prop-types"
import React, { Fragment } from "react"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { connect } from "react-redux"
import LayoutOne from "layouts/LayoutOne"
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb"
import ProductAddComp from "__product__/modules/ProductAddComp"

const ProductAddPage = ({ location }) => {
  const { pathname } = location

  return (
    <Fragment>
      <MetaTags>
        <title>ZER0 SHOP | Product Add Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Add Product</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* Add product component */}
        <ProductAddComp />
        
      </LayoutOne>
    </Fragment>
  )
}

ProductAddPage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id
  return {
    product: state.productData.products.filter(
      single => single.id === itemId
    )[0]
  }
}

export default connect(mapStateToProps)(ProductAddPage)