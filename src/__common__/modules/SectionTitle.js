import React from "react"

const SectionTitle = ({ titleText, spaceBottomClass }) => {
  return (
    <div
      className={`section-title-3 ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <h4>{titleText}</h4>
    </div>
  )
}

export default SectionTitle
