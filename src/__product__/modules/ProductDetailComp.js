import React from "react"
import { Layout, Breadcrumb } from "__common__/index"
import { RelatedProductSlider, ProductDescriptionTab, ProductImageDescriptionSticky } from "__product__/index"

const ProductDetailComp = ({ product }) => {
  return (<>
    <Layout headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb />

      {/* product description with image */}
      <ProductImageDescriptionSticky
        spaceTopClass="mt-100"
        spaceBottomClass="mb-100"
        product={product}
      />

      {/* product description tab */}
      <ProductDescriptionTab
        spaceBottomClass="pb-90"
      />

      {/* related product slider */}
      <RelatedProductSlider
        spaceBottomClass="pb-95"
        category={product.category}
        product={product}
      />
    </Layout>
  </>)
}

export default ProductDetailComp