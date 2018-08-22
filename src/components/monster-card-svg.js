import { string } from 'prop-types'
import React from 'react'
import romanize from '../utils/romanize'
import TypeBadge from './monster-type-badge'

import { css } from 'react-emotion'

const CreatureSize = ({size}) => (
  <svg x='12' y='275' viewBox='0 0 16 16' width='16' height='16' data-creature-size={size}>
    <circle cx='50%' cy='50%' r='45%' fill='#fff' stroke='#000' strokeMiterlimit='10' />
    <text
      x='50%'
      y='75%'
      textAnchor='middle'
      fontSize='10.83'
      fontFamily='Alegreya-Black, Alegreya'
      fontWeight='900'
    >
      {size.charAt(0)}
    </text>
  </svg>
)

const IconSR5e = () => (
  <svg x='190' y='260' viewBox='0 0 29.31 32.82' width='29.31' height='32.82'>
    <path d='M.79 8.28L14.58.57l14.23 7.75v15.83l-14 8.1-14.3-8.1z' fill='red' />
    <path d='M25.22 19.63l-21 .08L14.51 4.62zM14.57.85l-.06 3.77m13.74 4.1l-13.74-4.1m13.74 4.1l-3 10.91m3.31 4.45l-3.31-4.45m-21 .08l-2.68-11 13-4.1M4.21 19.71L.8 24m13.93 7.71l-10.52-12m21-.08l-10.49 12' fill='none' stroke='#000' strokeMiterlimit='10' strokeWidth='.5' opacity='.36' style={{mixBlendMode: 'multiply'}} />
    <path d='M.79 8.28L14.58.57l14.23 7.75v15.83l-14 8.1-14.3-8.1z' fill='none' stroke='#000' strokeMiterlimit='10' />
    <g id='srd5-icon' fill='#fff' fontFamily='Alegreya-Medium, Alegreya'>
      <text fontSize='18' transform='matrix(1.1001 0 0 1 10.4997 21.1665)'>5</text>
      <text fontSize='8' transform='matrix(1.1001 0 0 1 19.0833 22.7516)'>e</text>
    </g>
  </svg>
)

const CreatureName = ({name}) => (
  <svg x='0' y='292' viewBox='0 0 223.25 42.91' width='223.25' height='42.91' data-creature-name={name}>
    <path fill='#f2f2f2' stroke='#000' strokeMiterlimit='10' d='M.5.5h222.25v41.91H.5z' />
    <text
      x='50%'
      y='55%'
      alignmentBaseline='middle'
      textAnchor='middle'
      fontSize='21'
      fontFamily='Alegreya-Regular, Alegreya'
    >
      {name}
    </text>
  </svg>
)

const MonsterCR = ({rating}) => (
  <svg x='76' y='1' viewBox='0 0 75.58 33.56' width='75.58' height='33.56' data-creature-rating={rating}>
    <path d='M75.58 0c0 18.54-16.92 33.56-37.79 33.56S0 18.54 0 0z' />
    {rating.indexOf('/') !== -1 && (
      <g x='50%' y='65%' textAnchor='middle'>
        <text transform='matrix(1.37 0 0 1 25.87 25.85)' x='11%' textAnchor='middle' fontSize='12.65' fill='#fff' fontFamily='Alegreya-Medium, Alegreya'>{romanize(rating.split('/').pop())}</text>
        <text transform='matrix(1.16 0 0 1 35.08 12.62)' x='2%' fontSize='11.24' fill='#fff' fontFamily='Alegreya-Medium, Alegreya'>I</text>
        <path fill='none' stroke='#fff' strokeMiterlimit='10' strokeWidth='.5' d='M25.01 15.04l24.84-.17' />
      </g>
    )}
    {+rating > 0 && (
      <text
        x='50%'
        y='65%'
        textAnchor='middle'
        fontSize='20.67'
        fill='#fff'
        fontFamily='Alegreya-Medium, Alegreya'
      >
        {romanize(rating)}
      </text>
    )}
    {rating === '0' && (
      <g>
        <path fill='none' stroke='#fff' strokeMiterlimit='10' d='M34.56 18.78l6.56-8.56' />
        <text
          y='2'
          x='-2'
          fontSize='27.83'
          fill='#fff'
          fontFamily='Alegreya-Medium, Alegreya'
          transform='matrix(.91 0 0 1 31.01 21.95)'
        >
          O
        </text>
      </g>
    )}
  </svg>
)

const CardSVG = ({size, name, type, cr}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 227.39 338.51' className={css`display:block;z-index:5;position:relative;`}>
    <defs>
      <clipPath id='a'>
        <rect data-name='Card Edge' x='6.95' y='5.75' width='213.42' height='328.48' rx='12' ry='12' fill='none' />
      </clipPath>
    </defs>
    <path d='M221.89.5H5.5a5 5 0 0 0-5 5V333a5 5 0 0 0 5 5h216.39a5 5 0 0 0 5-5V5.5a5 5 0 0 0-5-5zm-1.1 320.9a13 13 0 0 1-13 13H19.53a13 13 0 0 1-13-13V18.24a13 13 0 0 1 13-13h188.26a13 13 0 0 1 13 13z' />
    <path d='M221.89.5H5.5a5 5 0 0 0-5 5V333a5 5 0 0 0 5 5h216.39a5 5 0 0 0 5-5V5.5a5 5 0 0 0-5-5zm-1.1 320.9a13 13 0 0 1-13 13H19.53a13 13 0 0 1-13-13V18.24a13 13 0 0 1 13-13h188.26a13 13 0 0 1 13 13z' fill='none' stroke='#000' strokeMiterlimit='10' />
    <g clipPath='url(#a)'>
      <path d='M2.88 2.46v334h221.39v-334zM213 288.73H14.36V14.36H213z' fill='transparent' />
      <path d='M2.88 2.46v334h221.39v-334zM213 288.73H14.36V14.36H213z' fill='none' stroke='#000' strokeMiterlimit='10' strokeWidth='1' />
      <CreatureName name={name} />
      <CreatureSize size={size} />
      <TypeBadge type={type} svgAttrs={{width: '31.5', height: '31.5'}} />
      <IconSR5e />
    </g>
    <IconSR5e />
    <MonsterCR rating={cr} />
  </svg>
)

CardSVG.propTypes = {
  size: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  cr: string.isRequired
}

export default CardSVG
