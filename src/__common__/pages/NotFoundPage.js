import React from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { Layout, Breadcrumb } from "__common__/index"

const NotFoundPage = ({ location }) => {
  const { pathname } = location

  return (<>
    <MetaTags>
      <title>Flone | Not Found</title>
    </MetaTags>

    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}> Home </BreadcrumbsItem>
    <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}> 404 page </BreadcrumbsItem>

    <Layout headerTop="visible">
      {/* breadcrumb */}
      <Breadcrumb />
      <div className="error-area pt-40 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 text-center">
              <div className="error">
                <h1>404</h1>
                <h2>OPPS! PAGE NOT FOUND</h2>
                <p>
                  Sorry but the page you are looking for does not exist, have
                  been removed, name changed or is temporarity unavailable.
                </p>
                <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                  Back to home page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>)
}

export default NotFoundPage