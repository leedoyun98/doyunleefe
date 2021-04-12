import React from "react"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { connect } from "react-redux"
import { Layout, Breadcrumb } from "__common__/index"
import { ProductAddComp } from "__product__/index"

const ProductAddPage = ({ location }) => {
  const { pathname } = location

  return (<>
    <MetaTags>
      <title>ZER0 SHOP | Product Add Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}> Home </BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}> Add Product </BreadcrumbsItem>

    <Layout headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb />

      {/* Add product component */}
      <ProductAddComp />
    </Layout>
  </>)
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