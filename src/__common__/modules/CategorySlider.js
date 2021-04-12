import React from "react"
import Swiper from "react-id-swiper"
import categoryData from "__common__/modules/category-data.json"
import { CategorySingle, SectionTitle } from "__common__/index"

const CategorySlider = ({ spaceTopClass, spaceBottomClass }) => {
  /* swiper slider settings */
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
        <SectionTitle titleText="Collections" spaceBottomClass="mb-40" />
        <div className="collection-wrap">
          <div className="collection-active">
            <Swiper {...settings}>
              {categoryData && categoryData.map((single, key) => {
                  return (
                    <CategorySingle
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

export default CategorySlider