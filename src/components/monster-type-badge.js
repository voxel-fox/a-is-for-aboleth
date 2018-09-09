import React from 'react'

const bgStyle = {
  fill: '#fff',
  stroke: '#000',
  strokeMiterlimit: '10'
}

const iconStyle = {
  fill: '#000'
}

const MonsterTypeBadge = ({svgAttrs, bgAttrs, iconAttrs, type}) => (
  <svg x='10.5' y='9' viewBox='0 0 31.5 31.5' data-creature-type={type} {...svgAttrs}>
    <circle cx='15.75' cy='15.75' r='15.25' {...{...bgStyle, ...bgAttrs}} />
    <use xlinkHref={`#${type}`} {...{...iconStyle, ...iconAttrs}} />
  </svg>
)

export default MonsterTypeBadge
