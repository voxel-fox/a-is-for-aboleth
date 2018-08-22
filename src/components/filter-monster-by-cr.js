import * as PropTypes from 'prop-types'
import React from 'react'
import { Range, createSliderWithTooltip } from 'rc-slider'
import { css } from 'react-emotion'
import { rem } from '../utils/helpers'

import 'rc-slider/assets/index.css'

const RangeCustom = createSliderWithTooltip(Range)

class FilterMonsterByCR extends React.Component {
  static propTypes = {
    onValueChange: PropTypes.func
  }

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

    this.setState({
      value: values
    })

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
    const [min, max] = this.state.value

    return (
      <div className={css`max-width:100%;width:${rem(340)};overflow:visible;`}>
        <p className={css`text-align:center;margin:0 0 ${rem(-5)} 0;color:#999;`}>
          {/* <span className={css`display:block;`}>Challenge Rating (CR)</span>
          <span className={css`display:block;`}>{this.tooltip(min)} - {this.tooltip(max)}</span> */}
          <abbr title='Challenge Rating'>CR</abbr>: {this.tooltip(min)} - {this.tooltip(max)}
        </p>
        <RangeCustom
          className={css`margin:${rem(10)};max-width:calc(100% - ${rem(20)});`}
          min={0}
          max={33}
          allowCross={false}
          defaultValue={[0, 33]}
          onChange={(value) => this.onChange(value)}
          tipFormatter={(value) => this.toolTip(value)}
          tipProps={{
            placement: 'bottom',
            prefixCls: 'rc-slider-tooltip'
          }}
          handleStyle={[{
            border: 0,
            height: 18,
            width: 18,
            marginLeft: -9,
            marginTop: -6,
            backgroundColor: '#D8D8D8',
            boxShadow: '0 2px 4px 1px rgba(0,0,0,0.50)'
          }]}
          railStyle={{ backgroundColor: '#666666', height: 3 }}
          trackStyle={[{ backgroundColor: '#CACACA', height: 3 }]}
        />
      </div>
    )
  }
}

export default FilterMonsterByCR
