import React, { Fragment } from "react"
import MetaTags from "react-meta-tags"
import LayoutOne from "layouts/LayoutOne"
import {FeatureIcon} from "__common__/index"
import {HeroSlider} from "__common__/index"
import {CategorySlider} from "__common__/index"

export const MainPage = () => {
  return (<>
    <Fragment>
      <MetaTags>
        <title>ZER0 SHOP | Home</title>
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSlider />
        {/* category */}
        <CategorySlider spaceTopClass="pt-100" spaceBottomClass="pb-95" />
        {/* feature icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

      </LayoutOne>
    </Fragment>
    </>
  )
}
export default MainPage