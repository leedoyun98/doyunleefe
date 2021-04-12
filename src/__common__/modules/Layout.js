import React from "react"
import { Header, Footer } from "__common__/index"

const Layout = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass
}) => {
  return (<>
    <Header
      layout={headerContainerClass}
      top={headerTop}
      headerPaddingClass={headerPaddingClass}
      headerPositionClass={headerPositionClass}
    />
    {children}
    <Footer
      backgroundColorClass="bg-gray"
      spaceTopClass="pt-100"
      spaceBottomClass="pb-70"
    />
  </>)
}

export default Layout