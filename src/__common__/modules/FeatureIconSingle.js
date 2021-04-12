import React from "react"

const FeatureIconSingle = ({ data, spaceBottomClass, textAlignClass }) => {
  return (
    <div className="col-md-4">
      <div
        className={`support-wrap-2 support-shape ${
          spaceBottomClass ? spaceBottomClass : ""
        } ${textAlignClass ? textAlignClass : ""}`}
      >
        <div className="support-content-2">
          <img
            className="animated"
            src={process.env.PUBLIC_URL + data.image}
            alt=""
          />
          <h5>{data.title}</h5>
          <p>{data.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureIconSingle