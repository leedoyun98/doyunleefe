import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Sidebar from "../modules/Sidebar"
import axios from 'axios'


 const UserAdmin = () => {
  const [employees, setEmployees] = React.useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/usr/all`,)
      .then(({ data }) => {
        console.log(data);
        setUser(data)
      }).catch((err) => {
        alert(`err`)
        throw err
      }
      )
  }, [])


  const renderBody = () => {
    return user.map(i => {
      console.log("테스트")
      return (
        <table>
          <tr key={i.usrNo}>
            <td>{i.usrName}</td>
            <td>{i.usrEmail}</td>
          </tr>
        </table>
      )
    })
  }


  return (

    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      {/* //props - children*/}
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1">

        <Sidebar />
        {/* hero slider */}
        {/* <HeroSliderOne /> */}

        {/* featured icon */}
        {/* <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" /> */}

        {/* tab product */}
        {/* <TabProduct spaceBottomClass="pb-60" category="fashion" /> */}

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
        <table style={{ display: "flex" }}>
          {user ? user.map(i => {
            console.log("테스트")
            return (
              <tr key={i.usrNo}>
                <td>{i.usrName}</td>
                <td>{i.usrEmail}</td>
              </tr>

            )
          }) : <span>---</span>}
        </table>

      </LayoutOne>
    </Fragment>
  );
};
export default UserAdmin

