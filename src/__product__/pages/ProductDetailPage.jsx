import PropTypes from "prop-types"
import React, { useEffect, useState, Fragment } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import ProductDetailComp from "__product__/modules/ProductDetailComp"
import axios from "axios"

const ProductDetailPage = ({ location }) => {
  const { pathname } = location
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios({
      url: 'http://localhost:8080/products/product-number/' + localStorage.getItem(`prdNo`),
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
      console.log(`제품 상세보기 error: ` + err)
      throw err
    })
  }, [])

  return (
    <Fragment>
      <MetaTags>
          <title>ZER0 SHOP | Product Page</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop Product</BreadcrumbsItem>
      
      {products.map((product => {
        return (
          <ProductDetailComp product={product} key={product.prdNo} />
        )}))
      }

    </Fragment>)
}

ProductDetailPage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
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