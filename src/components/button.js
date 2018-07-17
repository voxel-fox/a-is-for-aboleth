import * as PropTypes from 'prop-types'
import React from 'react'
import { css } from 'emotion'
import { rhythm, scale } from '../utils/typography'
import presets from '../utils/presets'

const buttonStyle = css`
  display: inline-block;
  ${scale(-1 / 4)};
  box-shadow: 0;
  background: white;
  color: black;
  cursor: pointer;
  margin: 0 auto;
  padding: rhythm(1 / 2);
  margin: ${rhythm(0.5)} auto;
  text-transform: lowercase;
  font-size: 1.2rem;

  ${presets.Tablet} {
    margin: ${rhythm(1.5)} auto;
    padding: ${rhythm(0.5)};
    height: ${rhythm(2)};
    lineHeight: ${rhythm(1)};
    text-align: center;
  }
`

class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  }

  render () {
    return (
      <button className={buttonStyle} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    )
  }
}

export default Button
