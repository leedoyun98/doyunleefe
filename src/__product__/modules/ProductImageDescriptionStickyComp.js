import React from "react"
import { useToasts } from "react-toast-notifications"
import Sticky from "react-sticky-el"
import { connect } from "react-redux"
import { ProductDescriptionInfo, ProductImageGallerySticky } from "__product__/index"

const ProductImageDescriptionStickyComp = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  currency,
  cartItems,
  wishlistItems,
}) => {
  const wishlistItem = wishlistItems.filter(
    wishlistItem => wishlistItem.id === product.id
  )[0]
  const { addToast } = useToasts()

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            <ProductImageGallerySticky product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            <Sticky
              boundaryElement=".shop-area"
              style={{ position: "relative" }}
            >
              {/* product description info */}
              <ProductDescriptionInfo
                product={product}
                currency={currency}
                cartItems={cartItems}
                wishlistItem={wishlistItem}
                addToast={addToast}
              />
            </Sticky>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

export default connect(mapStateToProps)(ProductImageDescriptionStickyComp)