import PropTypes from "prop-types"
import React from "react"
import Swiper from "react-id-swiper"
import categoryData from "__common__/modules/category-data.json"
import CategoryTwoSingle from "components/category/CategoryTwoSingle"
import SectionTitleFour from "components/section-title/SectionTitleFour"

export const CategorySlider = ({ spaceTopClass, spaceBottomClass }) => {
  // swiper slider settings
  const settings = {
    loop: false,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      576: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 1
      }
    }
  }
  return (
    <div
      className={`collections-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        {/* section title */}
        <SectionTitleFour titleText="Collections" spaceBottomClass="mb-40" />
        <div className="collection-wrap">
          <div className="collection-active">
            <Swiper {...settings}>
              {categoryData && categoryData.map((single, key) => {
                  return (
                    <CategoryTwoSingle
                      data={single}
                      key={key}
                      sliderClass="swiper-slide"
                    />
                  )
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

CategorySlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
}
export default CategorySlider