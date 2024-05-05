/* eslint-disable no-nested-ternary */
// import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { id, contentWidth, unit, bgType, bgColor, bgGradient, bgImage, bgImagePosition, bgImageRepeat, bgImageSize, bgImageParallax, bgImageOverlay, overlayColor, overlayOpacity, bgVideo } = attributes;

  // container Background
  let containerBg = "";
  if (bgType !== "none" && bgType === "image") {
    containerBg = `url(${bgImage})`;
  } else if (bgType !== "none" && bgType === "gradient") {
    containerBg = bgGradient;
  } else {
    containerBg = "none";
  }

  return (
    <div
      {...useBlockProps.save()}
      style={{
        backgroundColor: bgColor,
        backgroundImage: containerBg,
        backgroundSize: bgType === "image" && bgImage ? bgImageSize : "",
        backgroundPosition: bgType === "image" && bgImage ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%` : "",
        backgroundRepeat: bgType === "image" && bgImage ? bgImageRepeat : "",
        backgroundAttachment: bgType === "image" && bgImage && bgImageParallax ? "fixed" : "scroll",
      }}
      id={`scbb__id_${id}`}>
      {bgType !== "none" && bgType === "video" && bgVideo && (
        <video autoPlay={true} muted={true} loop={true} id="sbb__video">
          <source src={bgVideo} type="video/mp4" />
        </video>
      )}
      {(bgType === "image" || bgType === "video") && bgType !== "none" && bgImageOverlay && (
        <div
          className="scbb__bg_overlay"
          style={{
            backgroundColor: bgImageOverlay ? overlayColor : "",
            opacity: bgImageOverlay ? overlayOpacity : "",
          }}></div>
      )}
      <div className="scbb__container" style={{ maxWidth: `${contentWidth}${unit}` }}>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
