import { string } from 'prop-types'
import React from 'react'
import romanize from '../utils/romanize'
import { TypeIconDefs } from './monster-type-badge'

import { css } from 'react-emotion'

export const CardSymbolDefs = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className={css`display:none;`} aria-hidden='true'>
    <symbol id='card-frame'>
      <path d='m4.93 294.06h217.67v42h-217.67z' fill='#fff' stroke='#000' strokeMiterlimit='10' />
      <path d='m227.39 5v328.51a5 5 0 0 1 -5 5h-217.39a5 5 0 0 1 -5-5v-328.51a5 5 0 0 1 5-5h217.39a5 5 0 0 1 5 5zm-7 317.24v-304.49a12 12 0 0 0 -12-12h-189.39a12 12 0 0 0 -12 12v304.49a12 12 0 0 0 12 12h189.36a12 12 0 0 0 12-12zm-143.96-316.49c2.84 16 18.47 28.32 37.34 28.32s34.49-12.28 37.33-28.32z' />
      <path d='m15.12 14.68h197.05v273.55h-197.05z' fill='none' stroke='#000' strokeLinecap='round' strokeLinejoin='round' />
      <circle cx='25.8' cy='24.35' fill='#fff' r='15.25' stroke='#000' strokeMiterlimit='10' />
      <ellipse cx='17.03' cy='284.73' fill='#fff' rx='7.47' ry='7.5' stroke='#000' strokeMiterlimit='10' />
      <g>
        <path d='m197.21 15.08 9.79-5.58 10 5.65v11.5l-10 5.85-10-5.92z' fill='#f00' stroke='#000' strokeMiterlimit='10' />
        <text fontFamily='Alegreya-Medium,Alegreya' fill='#fff' fontSize='12' transform='matrix(1.1 0 0 1 203.97 23.83)'>5</text>
        <text fontFamily='Alegreya-Medium,Alegreya' fill='#fff' fontSize='5' transform='matrix(1.1 0 0 1 209.95 24.94)'>e</text>
      </g>
    </symbol>
  </svg>
)

const CreatureSize = ({size}) => (
  <text fontFamily='Alegreya-Medium,Alegreya' fontSize='11' transform='matrix(.93 0 0 1 17.23 288.32)' textAnchor='middle'>
    {size.charAt(0)}
  </text>
)

const CreatureName = ({name}) => (
  <text fontFamily='Alegreya-Regular,Alegreya' fontSize='20' x='50%' transform='translate(0 319.07)' textAnchor='middle'>
    {name}
  </text>
)

const FractionCR = ({rating}) => (
  <g fontFamily='Alegreya-Medium,Alegreya' textAnchor='middle' fill='#fff' x='50%' y='6.5%'>
    <text fontSize='11.24262' x='50%' y='13' textAnchor='middle'>I</text>
    <path fill='none' stroke='#fff' strokeMiterlimit='10' strokeWidth='.5' d='M101.8 15.49h24.83' />
    <text fontSize='12.65193' x='50%' y='28' textAnchor='middle'>{romanize(rating.split('/').pop())}</text>
  </g>
)

const WholeNumberCR = ({rating}) => (
  <text fontFamily='Alegreya-Medium,Alegreya' fontSize='20.67' fill='#fff' x='50%' y='6.5%' textAnchor='middle'>
    {romanize(rating)}
  </text>
)

const ZeroCR = () => (
  <React.Fragment>
    <path fill='none' stroke='#fff' strokeMiterlimit='10' d='M111 20.78l6.56-8.56' />
    <text fontFamily='Alegreya-Medium,Alegreya' x='50%' y='25' textAnchor='middle' fontSize='28' fill='#fff'>
      O
    </text>
  </React.Fragment>
)

const MonsterCR = ({rating}) => (
  <React.Fragment>
    {+rating === 0 && <ZeroCR />}
    {rating.indexOf('/') !== -1 && <FractionCR rating={rating} />}
    {+rating > 0 && <WholeNumberCR rating={rating} />}
  </React.Fragment>
)

const CardSVG = ({size, name, type, cr}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 227.39 338.51' className={css`display:block;z-index:5;position:relative;`}>
    <svg x='0' y='0' width='100%' height='100%'><use xlinkHref='#card-frame' /></svg>
    <CreatureName name={name} />
    <CreatureSize size={size} />
    <svg x='10.5' y='9' width='31.5' height='31.5'><use xlinkHref={`#${type}`} /></svg>
    <MonsterCR rating={cr} />
  </svg>
)

export const CardSVGdefs = () => (
  <React.Fragment>
    <TypeIconDefs />
    <CardSymbolDefs />
  </React.Fragment>
)

CardSVG.propTypes = {
  size: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  cr: string.isRequired
}

export default CardSVG
