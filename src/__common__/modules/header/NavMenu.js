import React from "react"
import { Link } from "react-router-dom"
import { multilanguage } from "redux-multilanguage"

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/product/all"}>
              {strings["shop"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                  <Link to={process.env.PUBLIC_URL + "/product/all"}>
                    {"ALL PRODUCTS"}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/category-living"}>
                    {"LIVING"}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/category-kitchen"}>
                    {"KITCHEN"}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/category-bathroom"}>
                    {"BATHROOM"}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/product/category-stationary"}>
                    {"STATIONARY"}
                  </Link>
                </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog-all"}>
              {strings["blog"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-all"}>
                  {"Blog All"}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/not-found"}>
              {"NOT FOUND"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default multilanguage(NavMenu)