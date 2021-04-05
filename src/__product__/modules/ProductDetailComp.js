import React from 'react'
import LayoutOne from 'layouts/LayoutOne'
import Breadcrumb from 'wrappers/breadcrumb/Breadcrumb'
import RelatedProductSlider from '__product__/modules/RelatedProductSlider'
import ProductDescriptionTab from '__product__/modules/ProductDescriptionTab'
import ProductImageDescriptionSticky from '__product__/modules/ProductImageDescriptionSticky'

const ProductDetailComp = ({ product }) => {
    return (<>
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescriptionSticky
            spaceTopClass='mt-100'
            spaceBottomClass='mb-100'
            product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
            spaceBottomClass='pb-90'
        />

        {/* related product slider */}
        <RelatedProductSlider
            spaceBottomClass='pb-95'
            category={product.ctgName}
        />
      </LayoutOne>
    </>)
}
export default ProductDetailComp