import React from "react"

const ProductImageGalleryStickyComp = ({ product }) => {
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
      <div className="product-sticky-image mb--10">
        <div className="product-sticky-image__single mb-10">
          <img
            src={process.env.PUBLIC_URL + product.prdImg}
            alt=""
            className="img-fluid"
          />
          <img src="https://cdn.imweb.me/thumbnail/20201030/ef226ed808590.jpg"
               alt=""
               className="img-fluid" />
        </div>
      </div>
    </div>
  )
}

export default ProductImageGalleryStickyComp