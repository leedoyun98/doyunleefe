import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import Paginator from "react-hooks-paginator"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { getSortedProducts } from "helpers/product"
import { Layout, Breadcrumb } from "__common__/index"
import { ShopSidebar, ShopTopbar, ShopProducts } from "__product__/index"
import axios from "axios"

const CategoryLivingPage = ({ location }) => {
  const { pathname } = location

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
    axios.get('http://localhost:8080/products/category/living', )
    .then((res) => {
      console.log(products.category + `카테고리 전체보기 성공`)
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(products.category + `카테고리  전체보기 실패: ` + err)
      throw err
    })
  }, [])

  const pageLimit = 15
  
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

  return (<>
    <MetaTags>
      <title>ZER0 SHOP | Shop Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

    <Layout headerTop="visible">
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
    </Layout>
  </>)
}

export default CategoryLivingPage