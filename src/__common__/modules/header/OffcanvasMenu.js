import React from "react"
import { Link } from "react-router-dom"
import { HeaderSocial, NavMenu } from "__common__/index"

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}
        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            alt=""
            src={process.env.PUBLIC_URL + "/assets/img/logo/logo.png"}
          />
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu sidebarMenu={true} />

      {/* header social */}
      <HeaderSocial />
    </div>
  )
}

export default OffcanvasMenu
