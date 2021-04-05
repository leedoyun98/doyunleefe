import PropTypes from "prop-types"
import React from "react"
import featureIconData from "__common__/modules/feature-icon.json"
import FeatureIconTwoSingle from "components/feature-icon/FeatureIconTwoSingle"

export const FeatureIcon = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`support-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row feature-icon-two-wrap">
          {featureIconData &&
            featureIconData.map((single, key) => {
              return (
                <FeatureIconTwoSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                  key={key}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

FeatureIcon.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
}
export default FeatureIcon