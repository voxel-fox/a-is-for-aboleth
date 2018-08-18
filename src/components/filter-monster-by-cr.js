import * as PropTypes from 'prop-types'
import React from 'react'
import { Range, createSliderWithTooltip } from 'rc-slider'
import { css } from 'react-emotion'
import { rem } from '../utils/helpers'

import 'rc-slider/assets/index.css'

const RangeCustom = createSliderWithTooltip(Range)

class FilterMonsterByCR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: [0, 33]
    }
    this.onChange = this.onChange.bind(this)
    this.tooltip = this.toolTip.bind(this)
  }

  onChange (values) {
    const [min, max] = values

    this.props.onValueChange({
      'min': this.getRealValue(min),
      'max': this.getRealValue(max)
    })
  }

  getRealValue (value) {
    const fractions = [0.125, 0.25, 0.5]

    if (value === 0) {
      return 0
    } else if (value < 4) {
      return fractions[value - 1]
    } else {
      return value - 3
    }
  }

  toolTip (value) {
    const fractions = ['1/8', '1/4', '1/2']

    if (value === 0) {
      return 0
    } else if (value < 4) {
      return fractions[value - 1]
    } else {
      return value - 3
    }
  }

  render () {
    const marks = {
      0: 0,
      33: 30
    }

    return (
      <RangeCustom
        className={css`margin:${rem(20)};max-width:calc(100% - ${rem(40)});`}
        min={0}
        max={33}
        marks={marks}
        allowCross={false}
        defaultValue={[0, 33]}
        onChange={(value) => this.onChange(value)}
        tipFormatter={(value) => this.toolTip(value)}
      />
    )
  }
}

export default FilterMonsterByCR
