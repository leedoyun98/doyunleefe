import React, { Fragment } from 'react'
import MetaTags from "react-meta-tags"
import Layout from "/modules/Layout"
import FeatureIcon from "/modules/FetureIcon"
import HeroSlider from "/modules/HeroSlider"
import CategorySlider from "/modules/CategorySlider"

const MainPage = () => {
  return (<>
    <Fragment>
      <MetaTags>
        <title>ZER0 SHOP | Home</title>
      </MetaTags>
      <Layout
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
      </Layout>
    </Fragment>
    </>
  )
}

export default MainPage
