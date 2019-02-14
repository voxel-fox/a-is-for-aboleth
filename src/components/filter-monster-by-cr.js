import * as PropTypes from "prop-types";
import React from "react";
import { Range, createSliderWithTooltip } from "rc-slider";
import { css } from "@emotion/core";
import { rem } from "../utils/helpers";

import "rc-slider/assets/index.css";

const RangeCustom = createSliderWithTooltip(Range);

class FilterMonsterByCR extends React.Component {
  static propTypes = {
    onValueChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: [0, 33]
    };
    this.onChange = this.onChange.bind(this);
    this.tooltip = this.toolTip.bind(this);
  }

  onChange(values) {
    const [min, max] = values;

    this.setState({
      value: values
    });

    this.props.onValueChange({
      min: this.getRealValue(min),
      max: this.getRealValue(max)
    });
  }

  getRealValue(value) {
    if (value === 0) {
      return 0;
    } else if (value < 4) {
      return [0.125, 0.25, 0.5][value - 1];
    } else {
      return value - 3;
    }
  }

  toolTip(value) {
    if (value > 0 && value < 4) {
      return ["1/8", "1/4", "1/2"][value - 1];
    } else {
      return this.getRealValue(value).toString();
    }
  }

  render() {
    const [min, max] = this.state.value;

    return (
      <div
        css={css`
          max-width: 100%;
          width: ${rem(340)};
          overflow: visible;
        `}
      >
        <p
          css={css`
            text-align: center;
            margin: 0 0 ${rem(-5)} 0;
            color: #999;
          `}
        >
          <abbr title="Challenge Rating">CR</abbr>: {this.tooltip(min)} -{" "}
          {this.tooltip(max)}
        </p>
        <RangeCustom
          css={css`
            margin: ${rem(10)};
            max-width: calc(100% - ${rem(20)});
          `}
          min={0}
          max={33}
          allowCross={false}
          defaultValue={[0, 33]}
          onChange={value => this.onChange(value)}
          tipFormatter={value => this.toolTip(value)}
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
  }
}

export default FilterMonsterByCR;
