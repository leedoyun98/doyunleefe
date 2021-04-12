import React, { useState,useEffect } from "react"
import { Logo, NavMenu, IconGroup } from "__common__/index"

const Header = ({ 
  layout,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0)
  const [headerTop, setHeaderTop] = useState(0)

  useEffect(() => {
    const header = document.querySelector('.sticky-bar')
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  return (<>
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ''} ${
        headerPositionClass ? headerPositionClass : ''
      }`}
    >
      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ''
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? 'stick' : ''
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/logo.png" logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
      </div>
    </header>
  </>)
}

export default Header