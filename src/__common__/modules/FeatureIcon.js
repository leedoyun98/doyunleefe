import React from "react"
import featureIconData from "__common__/modules/feature-icon.json"
import { FeatureIconSingle } from "__common__/index"

const FeatureIcon = ({ spaceTopClass, spaceBottomClass }) => {
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
                <FeatureIconSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                  key={key}
                />
              )}
            )}
        </div>
      </div>
    </div>
  )
}

export default FeatureIcon