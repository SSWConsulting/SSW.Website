import PropTypes from "prop-types";
import React, { useEffect } from "react";

const JotFormEmbed = ({
  formURL,
  autoResize,
  autoFocus,
  heightOffset = 15,
  initialHeight = 540,
  onSubmit,
  formID,
  style = {},
  ...rest
}) => {
  const iframeRef = React.useRef();
  const [componentStyles, setComponentStyles] = React.useState({
    height: initialHeight,
    overflow: "hidden",
    border: 0,
    width: "100%",
  });

  return (
    <iframe
      ref={iframeRef}
      src={formURL}
      title="JotForm Form"
      style={{
        ...componentStyles,
        ...style,
      }}
      allowTransparency="true"
      allowFullScreen="true"
      allow="geolocation; microphone; camera"
      frameBorder="0"
      scrolling="no"
      {...rest}
    />
  );
};

const noop = () => {};

JotFormEmbed.propTypes = {
  formURL: PropTypes.string.isRequired,
  formID: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  autoResize: PropTypes.bool,
  autoFocus: PropTypes.bool,
  heightOffset: PropTypes.number,
  initialHeight: PropTypes.number,
  onSubmit: PropTypes.func,
  style: PropTypes.shape({}),
};

JotFormEmbed.defaultProps = {
  autoResize: true,
  formID: false,
  autoFocus: true,
  heightOffset: 15,
  initialHeight: 540,
  onSubmit: noop,
  style: {},
};

export default JotFormEmbed;

const jotForm = {
  type: "object",
  name: "jotForm",
  label: "JotForm",
  fields: [
    {
      type: "string",
      name: "id",
      label: "Id",
      required: true,
    },
    {
      type: "string",
      name: "formTitle",
      label: "Form Title",
      required: true,
    },
    {
      type: "string",
      name: "backgroundColor",
      label: "Background Color",
      required: true,
    },
    {
      type: "string",
      name: "fontColor",
      label: "Font Color",
      required: true,
    },
    {
      type: "string",
      name: "formType",
      label: "Form Type",
      required: true,

      options: [
        {
          value: "0",
          label: "Form with Title",
        },
        {
          value: "1",
          label: "Form without Title and white border",
        },
        {
          value: "2",
          label: "Form without Title and black border",
        },
      ],
    },
    {
      type: "number",
      name: "height",
      label: "Height",
      required: true,
      description: "px",
    },
    {
      type: "number",
      name: "width",
      label: "Width",
      required: true,
      description: "px",
    },
  ],
};
