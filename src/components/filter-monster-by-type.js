import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import MonsterTypeBadge from './monster-type-badge'
import { rem } from '../utils/helpers'

const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(90deg, rgba(0,0,0,0.00) 0%, rgba(77,77,77,0.80) 27.5%, rgba(77,77,77,0.80) 82.5%, rgba(0,0,0,0.00) 100%);
`

const ItemList = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: auto;
  padding-left: ${rem(10)};
  padding-right: ${rem(10)};
  padding-top: ${rem(8)};
  padding-bottom: ${rem(8)};
  margin: 0;

  @media (min-width: ${rem(650)}) {
    padding-left: ${rem(80)};
    padding-right: ${rem(80)};
  }
`

const ItemToggle = css`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const TypeLabel = styled.label`
  display: block;
  width: ${rem(90)};
  height: ${rem(115)};
  margin: 0 ${rem(8)};
  text-align: center;
`

class FilterMonsterByType extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.arrayOf(PropTypes.string),
    onHandleToggle: PropTypes.func
  }

  static defaultProps = {
    items: [
      'Aberration',
      'Beast',
      'Celestial',
      'Construct',
      'Dragon',
      'Elemental',
      'Fey',
      'Fiend',
      'Giant',
      'Humanoid',
      'Monstrosity',
      'Ooze',
      'Plant',
      'Undead'
    ],
    active: []
  }

  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (e) {
    this.props.onHandleToggle({
      'name': e.target.value,
      'active': e.target.checked
    })
  }

  render () {
    const { items, active } = this.props

    const bgStyle = (isActive) => {
      return isActive
        ? {stroke: 'none', fill: '#fff'}
        : {stroke: '#111', fill: 'none'}
    }
    const iconStyle = (isActive) => {
      return isActive
        ? {fill: '#000'}
        : {fill: '#999'}
    }

    const filterInputToggle = (name, isActive) => (
      <input
        type='checkbox'
        checked={isActive}
        className={ItemToggle}
        value={name}
        onChange={this.handleToggle}
      />
    )

    const filterItem = (name, isActive) => (
      <TypeLabel>
        {filterInputToggle(name, isActive)}
        <MonsterTypeBadge
          type={name.toLowerCase()}
          svgAttrs={{width: '100%'}}
          bgAttrs={bgStyle(isActive)}
          iconAttrs={iconStyle(isActive)}
        />
        {name}
      </TypeLabel>
    )

    return (
      <ListBox>
        <ItemList>
          {items.map((name) => {
            const isActive = active.indexOf(name) !== -1
            return (
              <li key={`filter-${name}`}>
                {filterItem(name, isActive)}
              </li>
            )
          })}
        </ItemList>
      </ListBox>
    )
  }
}

export default FilterMonsterByType
