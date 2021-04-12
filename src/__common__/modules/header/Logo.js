import React from "react"
import { Link } from "react-router-dom"

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img alt="" src={process.env.PUBLIC_URL + imageUrl} />
      </Link>
    </div>
  )
}

export default Logo