import { string } from 'prop-types'
import React from 'react'
import romanize from '../utils/romanize'
import { ReactComponent as SVGDefs } from '../assets/symbols.svg'
import { css } from 'react-emotion'

const CreatureSize = ({ size }) => (
  <text fontFamily='Alegreya-Medium,Alegreya' fontSize='11' transform='matrix(.93 0 0 1 17.23 288.32)' textAnchor='middle'>
    {size.charAt(0)}
  </text>
)

const CreatureName = ({ name }) => (
  <text fontFamily='Alegreya-Regular,Alegreya' fontSize='20' x='50%' transform='translate(0 319.07)' textAnchor='middle'>
    {name}
  </text>
)

const FractionCR = ({ rating }) => (
  <g fontFamily='Alegreya-Medium,Alegreya' textAnchor='middle' fill='#fff' x='50%' y='6.5%'>
    <text fontSize='11.24262' x='50%' y='13' textAnchor='middle'>I</text>
    <path fill='none' stroke='#fff' strokeMiterlimit='10' strokeWidth='.5' d='M101.8 15.49h24.83' />
    <text fontSize='12.65193' x='50%' y='28' textAnchor='middle'>{romanize(rating.split('/').pop())}</text>
  </g>
)

const WholeNumberCR = ({ rating }) => (
  <text fontFamily='Alegreya-Medium,Alegreya' fontSize='20.67' fill='#fff' x='50%' y='6.5%' textAnchor='middle'>
    {romanize(rating)}
  </text>
)

const ZeroCR = () => (
  <>
    <path fill='none' stroke='#fff' strokeMiterlimit='10' d='M111 20.78l6.56-8.56' />
    <text fontFamily='Alegreya-Medium,Alegreya' x='50%' y='25' textAnchor='middle' fontSize='28' fill='#fff'>
      O
    </text>
  </>
)

const MonsterCR = ({ rating }) => (
  <>
    {+rating === 0 && <ZeroCR />}
    {rating.indexOf('/') !== -1 && <FractionCR rating={rating} />}
    {+rating > 0 && <WholeNumberCR rating={rating} />}
  </>
)

const CardSVG = ({ size, name, type, cr }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 227.39 338.51' className={css`display:block;z-index:5;position:relative;`}>
    <svg x='0' y='0' width='100%' height='100%'><use xlinkHref='#card-frame' /></svg>
    <CreatureName name={name} />
    <CreatureSize size={size} />
    <svg x='10.5' y='9' width='31.5' height='31.5'><use xlinkHref={`#${type}`} /></svg>
    <MonsterCR rating={cr} />
  </svg>
)

export const CardSVGdefs = () => (
  <SVGDefs className={css`display:none;`} />
)

CardSVG.propTypes = {
  size: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  cr: string.isRequired
}

export default CardSVG
