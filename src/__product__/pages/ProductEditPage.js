import React from "react"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { Layout, Breadcrumb } from "__common__/index"
import { ProductEditComp } from "__product__/index"

const ProductEditPage = ({ location, match }) => {
  const { pathname } = location
  
  return (<>
    <MetaTags>
        <title>ZER0 SHOP | Product Edit Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Edit Product</BreadcrumbsItem>
    
    <Layout headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb />
      
      {/* Edit Product Component */}
      <ProductEditComp />
      
    </Layout>
  </>)
}

export default ProductEditPage