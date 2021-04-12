import React from "react"

const SectionTitleTwo = ({
  titleText,
  subTitleText,
  positionClass,
  spaceClass
}) => {
  return (
    <div
      className={`section-title-2 ${positionClass ? positionClass : ""} ${
        spaceClass ? spaceClass : ""
      }`}
    >
      <h2>{titleText}</h2>
      <p>{subTitleText}</p>
    </div>
  )
}

export default SectionTitleTwo
