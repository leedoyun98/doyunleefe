import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { ProductDetailComp } from "__product__/index"
import axios from "axios"

const ProductDetailPage = ({ location, match }) => {
  const { pathname } = location
  
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:8080/products/product-number/' + match.params.id, )
    .then((res) => {
      console.log(match.params.id + `번 제품 상세보기 성공`)
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(`제품 상세보기 실패: ` + err)
      throw err
    })
  }, [])

  return (<>
    <MetaTags>
        <title>ZER0 SHOP | Product Page</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop Product</BreadcrumbsItem>

    <div className="margin-top" />
    {products.map((product => {
      return (
        <ProductDetailComp product={product} key={product.prdNo} />
      )}
    ))}
  </>)
}

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id
  return {
    product: state.productData.products.filter(
      single => single.id === itemId
    )[0]
  }
}

export default connect(mapStateToProps)(ProductDetailPage)