import React, { useState } from "react";
import { setConfig } from "react-hot-loader";

import { Range } from "rc-slider";
import { css } from "@emotion/core";
import { rem } from "../utils/helpers";

import "rc-slider/assets/index.css";

setConfig({ pureSFC: true });

const wrapStyle = css`
  max-width: 100%;
  width: ${rem(340)};
  overflow: visible;
`;

const toolTipStyle = css`
  text-align: center;
  margin: 0 0 ${rem(-5)} 0;
  color: #999;
`;

const sliderStyle = css`
  margin: ${rem(10)};
  max-width: calc(100% - ${rem(20)});
`;

export const getCRValue = value => {
  if (value <= 0) {
    return 0;
  } else if (value < 4) {
    return [0.125, 0.25, 0.5][value - 1];
  } else {
    return value - 3;
  }
};

export const toolTipFormat = value => {
  const realValue = getCRValue(value);
  if (realValue === 0.125) {
    return "1/8";
  } else if (realValue === 0.25) {
    return "1/4";
  } else if (realValue === 0.5) {
    return "1/2";
  } else {
    return realValue.toString();
  }
};

export const FilterMonsterByCR = ({ onValueChange }) => {
  const [range, setRange] = useState([0, 33]);
  const [min, max] = range;

  return (
    <div css={wrapStyle}>
      <p css={toolTipStyle}>
        <abbr title="Challenge Rating">CR</abbr>:{toolTipFormat(min)} -{" "}
        {toolTipFormat(max)}
      </p>
      <Range
        css={sliderStyle}
        min={0}
        max={33}
        allowCross={false}
        defaultValue={[0, 33]}
        onChange={values => {
          onValueChange({
            min: getCRValue(values[0]),
            max: getCRValue(values[1])
          });
          setRange(values);
        }}
        handleStyle={[
          {
            border: 0,
            height: 18,
            width: 18,
            marginLeft: -9,
            marginTop: -6,
            backgroundColor: "#D8D8D8",
            boxShadow: "0 2px 4px 1px rgba(0,0,0,0.50)"
          }
        ]}
        railStyle={{ backgroundColor: "#666666", height: 3 }}
        trackStyle={[{ backgroundColor: "#CACACA", height: 3 }]}
      />
    </div>
  );
};

export default FilterMonsterByCR;
