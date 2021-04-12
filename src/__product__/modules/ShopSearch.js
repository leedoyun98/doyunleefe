import React, { useState } from "react"

const ShopSearch = () => {
  const [prdKeyword, setPrdKeyword] = useState('')
  
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
         <input type="text" placeholder="Search here..."
            onClick={e => setPrdKeyword(e.target.value)} />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ShopSearch