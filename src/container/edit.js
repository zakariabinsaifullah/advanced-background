/* eslint-disable no-nested-ternary */
/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } from "@wordpress/block-editor";
import { __experimentalBoxControl as BoxControl, Button, ColorIndicator, ColorPicker, FocalPointPicker, FormToggle, GradientPicker, PanelBody, Popover, RangeControl, SelectControl, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
// editor style
import "./editor.scss";
const { Fragment } = wp.element;

// custom component
import GutResponsiveDevices from "../../vendor/components/responsiveDevices/responsivedevices";

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    id,
    contentWidth,
    unit,
    paddingDevice,
    deskPadding,
    tabPadding,
    mobPadding,
    marginDevice,
    deskMargin,
    tabMargin,
    mobMargin,
    bgType,
    bgColor,
    bgGradient,
    bgImage,
    bgImagePosition,
    bgImageRepeat,
    bgImageSize,
    bgImageParallax,
    bgImageOverlay,
    overlayColor,
    overlayPopup,
    overlayOpacity,
    bgVideo,
    colorPopup,
  } = attributes;

  let containerBg = "";
  if (bgType !== "none" && bgType === "image") {
    containerBg = `url(${bgImage})`;
  } else if (bgType !== "none" && bgType === "gradient") {
    containerBg = bgGradient;
  } else {
    containerBg = "none";
  }

  // set unique id
  setAttributes({
    id: clientId.slice(0, 8),
  });

  // // overlay color popup close
  document.addEventListener("click", function (event) {
    if (colorPopup && !event.target.closest(".gut__color_point") && !event.target.closest(".components-color-picker")) {
      setAttributes({ colorPopup: false });
    }
  });

  document.addEventListener("click", function (event) {
    if (overlayPopup && !event.target.closest(".gut__color_point") && !event.target.closest(".components-color-picker")) {
      setAttributes({ overlayPopup: false });
    }
  });

  return (
    <Fragment>
      <InspectorControls group="styles">
        <PanelBody>
          <div className="gut__flex_panel">
            <p className="gut__panel_label">{__("Background Color", "section-builder-block")}</p>
            <div className="gut__modal_panel">
              <button
                className="gut__color_point gut__bg_color_point"
                onClick={() =>
                  setAttributes({
                    colorPopup: !colorPopup,
                  })
                }>
                <ColorIndicator colorValue={bgColor} />
              </button>
              {colorPopup && (
                <Popover>
                  <ColorPicker
                    color={bgColor}
                    disableAlpha={false}
                    onChangeComplete={(value) =>
                      setAttributes({
                        bgColor: value.hex,
                      })
                    }
                  />
                </Popover>
              )}
            </div>
          </div>
          <div className="gut__flex_panel">
            <p className="gut__panel_label">{__("Background Type", "section-builder-block")}</p>
            <div className="gut__panel">
              <Button
                isSmall={true}
                isPressed={bgType === "gradient"}
                onClick={() =>
                  setAttributes({
                    bgType: "gradient",
                  })
                }>
                <svg width="18" height="15" viewBox="0 0 18 15">
                  <g transform="translate(.735 .263)" fill="none">
                    <rect className="svg-stroke" x=".5" y=".5" width="16.072" height="13.474" rx="1"></rect>
                    <path className="svg-fill" d="M.836.763l15.759 13.158h-15.759z"></path>
                  </g>
                </svg>
              </Button>
              <Button
                isSmall={true}
                isPressed={bgType === "image"}
                onClick={() =>
                  setAttributes({
                    bgType: "image",
                  })
                }>
                <svg width="18" height="15" viewBox="0 0 18 15">
                  <path
                    d="M16.083.263h-14.446c-.798 0-1.445.648-1.445 1.447v11.579c0 .8.646 1.447 1.445 1.447h14.446c.798 0 1.445-.648 1.445-1.447v-11.579c0-.8-.646-1.447-1.445-1.447zm-4.334 2.171c2.389 0 2.386 3.618 0 3.618-2.385 0-2.39-3.618 0-3.618zm-9.39 10.855l4.334-5.789 2.965 3.961 2.091-2.514 3.611 4.342h-13.001z"
                    className="svg-fill"
                    fillRule="nonzero"></path>
                </svg>
              </Button>
              <Button
                isSmall={true}
                isPressed={bgType === "video"}
                onClick={() =>
                  setAttributes({
                    bgType: "video",
                  })
                }>
                <svg width="18" height="14" viewBox="0 0 18 14">
                  <path
                    d="M18 1.679v10.929c0 .281-.131.479-.392.593-.087.033-.171.05-.251.05-.181 0-.331-.064-.452-.191l-4.048-4.048v1.667c0 .797-.283 1.478-.849 2.044-.566.566-1.247.849-2.044.849h-7.071c-.797 0-1.478-.283-2.044-.849-.566-.566-.849-1.247-.849-2.044v-7.071c0-.797.283-1.478.849-2.044.566-.566 1.247-.849 2.044-.849h7.071c.797 0 1.478.283 2.044.849.566.566.849 1.247.849 2.044v1.657l4.048-4.038c.121-.127.271-.191.452-.191.08 0 .164.017.251.05.261.114.392.311.392.593z"
                    className="svg-fill"
                    fillRule="nonzero"></path>
                  <span></span>
                </svg>
              </Button>
              <Button
                isSmall={true}
                onClick={() =>
                  setAttributes({
                    bgType: "none",
                  })
                }>
                <span className="dashicons dashicons-image-rotate"></span>
              </Button>
            </div>
          </div>
          {/* Gradient Background */}
          {bgType === "gradient" && (
            <Fragment>
              <GradientPicker
                value={bgGradient}
                onChange={(currentGradient) =>
                  setAttributes({
                    bgGradient: currentGradient,
                  })
                }
                gradients={[
                  {
                    name: "JShine",
                    gradient: "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
                    slug: "jshine",
                  },
                  {
                    name: "Moonlit Asteroid",
                    gradient: "linear-gradient(135deg, rgb(15, 32, 39) 0%, rgb(32, 58, 67) 0%, rgb(0, 178, 254) 100%)",
                    slug: "moonlit-asteroid",
                  },
                  {
                    name: "Rastafarie",
                    gradient: "linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
                    slug: "rastafari",
                  },
                  {
                    name: "Blulish",
                    gradient: "linear-gradient(90deg, rgb(18, 194, 233) 0%, rgb(93, 8, 136) 50%, rgb(156, 79, 79) 100%)",
                    slug: "blulish",
                  },
                  {
                    name: "Redish",
                    gradient: "linear-gradient(90deg, rgb(30, 150, 0) 0%, rgb(255, 0, 70) 0%, rgb(255, 0, 0) 100%)",
                    slug: "redish",
                  },
                  {
                    name: "Sky Blue",
                    gradient: "linear-gradient(90deg, rgb(21, 77, 91) 0%, rgb(250, 250, 250) 100%)",
                    slug: "sky-blue",
                  },
                ]}
              />
            </Fragment>
          )}
          {/* Image Background */}
          {bgType === "image" && (
            <Fragment>
              {bgImage ? (
                <Fragment>
                  <div className="gut__preview_container">
                    <div className="gut__preview_image">
                      <FocalPointPicker
                        url={bgImage}
                        value={bgImagePosition}
                        onChange={(focalPoint) =>
                          setAttributes({
                            bgImagePosition: focalPoint,
                          })
                        }
                      />
                    </div>
                    <div className="gut__preview_actions">
                      <button
                        onClick={() =>
                          setAttributes({
                            bgImage: "",
                          })
                        }>
                        <span className="dashicons dashicons-trash"></span>
                      </button>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <MediaUpload
                  onSelect={(media) =>
                    setAttributes({
                      bgImage: media.url,
                    })
                  }
                  type="image"
                  value={bgImage}
                  render={({ open }) => (
                    <button className="gut__custom_upload" onClick={open}>
                      <span className="dashicons dashicons-insert"></span>
                      <span className="gut__upload_label">{__("Add Image", "section-builder-block")}</span>
                    </button>
                  )}
                />
              )}
              <div className="gut__flex_panel">
                <p className="gut__panel_label">{__("Enable Parallax", "section-builder-block")}</p>
                <FormToggle
                  checked={bgImageParallax}
                  onChange={() =>
                    setAttributes({
                      bgImageParallax: !bgImageParallax,
                    })
                  }
                />
              </div>
              <SelectControl
                label={__("Background Size", "section-builder-block")}
                options={[
                  {
                    label: __("Default", "section-builder-block"),
                    value: "initial",
                  },
                  {
                    label: __("Cover", "section-builder-block"),
                    value: "cover",
                  },
                  {
                    label: __("Contain", "section-builder-block"),
                    value: "contain",
                  },
                  {
                    label: __("Auto", "section-builder-block"),
                    value: "auto",
                  },
                ]}
                onChange={(size) => {
                  setAttributes({ bgImageSize: size });
                }}
                value={bgImageSize}
              />
              <SelectControl
                label={__("Background Repeat", "section-builder-block")}
                options={[
                  {
                    label: __("No Repeat", "section-builder-block"),
                    value: "no-repeat",
                  },
                  {
                    label: __("Repeat", "section-builder-block"),
                    value: "repeat",
                  },
                  {
                    label: __("Repeat X", "section-builder-block"),
                    value: "repeat-x",
                  },
                  {
                    label: __("Repeat Y", "section-builder-block"),
                    value: "repeat-y",
                  },
                ]}
                onChange={(value) => {
                  setAttributes({ bgImageRepeat: value });
                }}
                value={bgImageRepeat}
              />
            </Fragment>
          )}
          {/* Video */}
          {bgType === "video" && (
            <Fragment>
              {bgVideo ? (
                <Fragment>
                  <div className="gut__flex_panel">
                    <p className="gut__panel_label">{__("Video URL", "section-builder-block")}</p>
                    <button
                      className="gut__remove_icon"
                      onClick={() =>
                        setAttributes({
                          bgVideo: null,
                        })
                      }>
                      <span className="dashicons dashicons-remove"></span>
                    </button>
                  </div>
                  <TextControl readonly value={bgVideo} />
                </Fragment>
              ) : (
                <MediaUpload
                  onSelect={(video) => setAttributes({ bgVideo: video.url })}
                  type="video"
                  value={bgVideo}
                  render={({ open }) => (
                    <button className="gut__custom_upload" onClick={open}>
                      <span className="dashicons dashicons-insert"></span>
                      <span className="gut__upload_label">{__("Add Video", "section-builder-block")}</span>
                    </button>
                  )}
                />
              )}
            </Fragment>
          )}

          {(bgType === "video" || bgType === "image") && (
            <Fragment>
              <div className="gut__flex_panel">
                <p className="gut__panel_label">{__("Enable Overlay", "section-builder-block")}</p>
                <FormToggle
                  checked={bgImageOverlay}
                  onChange={() =>
                    setAttributes({
                      bgImageOverlay: !bgImageOverlay,
                    })
                  }
                />
              </div>
              {bgImageOverlay && (
                <Fragment>
                  <div className="gut__flex_panel">
                    <p className="gut__panel_label">{__("Overlay Color", "section-builder-block")}</p>
                    <div className="gut__modal_panel">
                      <button
                        className="gut__color_point gut__overlay_point"
                        onClick={() =>
                          setAttributes({
                            overlayPopup: !overlayPopup,
                          })
                        }>
                        <ColorIndicator colorValue={overlayColor} />
                      </button>
                      {overlayPopup && (
                        <Popover>
                          <ColorPicker
                            color={overlayColor}
                            disableAlpha={true}
                            onChangeComplete={(value) =>
                              setAttributes({
                                overlayColor: value.hex,
                              })
                            }
                          />
                        </Popover>
                      )}
                    </div>
                  </div>
                  <RangeControl
                    label={__("Overlay Opacity", "section-builder-block")}
                    value={overlayOpacity}
                    onChange={(value) =>
                      setAttributes({
                        overlayOpacity: value,
                      })
                    }
                    min={0.1}
                    max={1}
                    step={0.01}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
      <InspectorControls>
        <PanelBody title={__("Content Width", "section-builder-block")} initialOpen={true}>
          <div className="gut__flex_panel">
            <p className="gut__panel_label">{__("Content Width", "section-builder-block")}</p>
            <div className="gut__units_box">
              <button onClick={() => setAttributes({ unit: "px" })} className={unit === "px" ? "gut__unit_active" : ""}>
                {__("PX", "section-builder-block")}
              </button>
              <button onClick={() => setAttributes({ unit: "%" })} className={unit === "%" ? "gut__unit_active" : ""}>
                {__("%", "section-builder-block")}
              </button>
            </div>
          </div>
          <RangeControl value={contentWidth} onChange={(width) => setAttributes({ contentWidth: width })} min={1} max={unit === "px" ? 2000 : 100} help={`Content Width in ${unit}`} />
        </PanelBody>
        <PanelBody title={__("Container Padding", "section-builder-block")} initialOpen={false}>
          <GutResponsiveDevices label={__("Container Padding", "section-builder-block")} value={paddingDevice} onChange={(value) => setAttributes({ paddingDevice: value })} />
          {paddingDevice === "desktop" && (
            <BoxControl
              label={__("Padding on Desktop", "section-builder-block")}
              values={deskPadding}
              onChange={(nextValues) =>
                setAttributes({
                  deskPadding: nextValues,
                })
              }
              units={[]}
            />
          )}
          {paddingDevice === "tablet" && (
            <BoxControl
              label={__("Padding on Tablet", "section-builder-block")}
              values={tabPadding}
              onChange={(nextValues) =>
                setAttributes({
                  tabPadding: nextValues,
                })
              }
              units={[]}
            />
          )}
          {paddingDevice === "smartphone" && (
            <BoxControl
              label={__("Padding on Mobile", "section-builder-block")}
              values={mobPadding}
              onChange={(nextValues) =>
                setAttributes({
                  mobPadding: nextValues,
                })
              }
              units={[]}
            />
          )}
        </PanelBody>
        <PanelBody title={__("Container Margin", "section-builder-block")} initialOpen={false}>
          <GutResponsiveDevices label={__("Container Margin", "section-builder-block")} value={marginDevice} onChange={(value) => setAttributes({ marginDevice: value })} />
          {marginDevice === "desktop" && (
            <BoxControl
              label={__("Margin on Desktop", "section-builder-block")}
              values={deskMargin}
              onChange={(nextValues) =>
                setAttributes({
                  deskMargin: nextValues,
                })
              }
              units={[]}
            />
          )}
          {marginDevice === "tablet" && (
            <BoxControl
              label={__("Margin on Tablet", "section-builder-block")}
              values={tabMargin}
              onChange={(nextValues) =>
                setAttributes({
                  tabMargin: nextValues,
                })
              }
              units={[]}
            />
          )}
          {marginDevice === "smartphone" && (
            <BoxControl
              label={__("Margin on Mobile", "section-builder-block")}
              values={mobMargin}
              onChange={(nextValues) =>
                setAttributes({
                  mobMargin: nextValues,
                })
              }
              units={[]}
            />
          )}
        </PanelBody>
      </InspectorControls>

      <div
        {...useBlockProps()}
        style={{
          backgroundColor: bgColor,
          backgroundImage: containerBg,
          backgroundSize: bgType === "image" && bgImage ? bgImageSize : "",
          backgroundPosition: bgType === "image" && bgImage ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%` : "",
          backgroundRepeat: bgType === "image" && bgImage ? bgImageRepeat : "",
          backgroundAttachment: bgType === "image" && bgImage && bgImageParallax ? "fixed" : "scroll",
          padding: `${deskPadding.top} ${deskPadding.right} ${deskPadding.bottom} ${deskPadding.left}`,
          margin: `${deskMargin.top} ${deskMargin.right} ${deskMargin.bottom} ${deskMargin.left}`,
        }}>
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
          <InnerBlocks allowedBlocks={true} renderAppender={() => <InnerBlocks.ButtonBlockAppender />} />
        </div>
      </div>
    </Fragment>
  );
}
