import PropTypes from "prop-types"
import React, { Fragment, useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import Paginator from "react-hooks-paginator"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { getSortedProducts } from "helpers/product"
import LayoutOne from "layouts/LayoutOne"
import Breadcrumb from "wrappers/breadcrumb/Breadcrumb"
import ShopSidebar from "__product__/modules/ShopSidebar"
import ShopTopbar from "__product__/modules/ShopTopbar"
import ShopProducts from "__product__/modules/ShopProducts"
import axios from "axios"

const ProductListPage = ({ location }) => {
  const [layout, setLayout] = useState('grid three-column')
  const [sortType, setSortType] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [filterSortType, setFilterSortType] = useState('')
  const [filterSortValue, setFilterSortValue] = useState('')
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:8080/products/all',
      methos: 'get',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      },
      data: {}
      })
    .then((res) => {
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(`error!`)
      throw err
    })
  }, [])

  const pageLimit = 15
  const {pathname} = location

  const getLayout = (layout) => {
    setLayout(layout)
  }

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType)
    setSortValue(sortValue)
  }

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType)
    setFilterSortValue(sortValue)
  }

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue)
    const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue)
    sortedProducts = filterSortedProducts
    setSortedProducts(sortedProducts)
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit))
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ])

  return (
    <Fragment>
      <MetaTags>
        <title>ZER0 SHOP | Shop Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

    <LayoutOne headerTop="visible">

      {/* breadcrumb */}
      <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 order-2 order-lg-1">
                    {/* shop sidebar */}
                    <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30"/>
                </div>
                <div className="col-lg-9 order-1 order-lg-2">
                    {/* shop topbar default */}
                    <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                    {/* shop page content default */}
                    <ShopProducts layout={layout} products={currentData} />

                    {/* shop product pagination */}
                    <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                        totalRecords={sortedProducts.length}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageContainerClass="mb-0 mt-0"
                        pagePrevText="«"
                        pageNextText="»"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

ProductListPage.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array
}

export default ProductListPage