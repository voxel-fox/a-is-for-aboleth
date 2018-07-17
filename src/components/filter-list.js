import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import MonsterTypeBadge from './monster-type-badge'

const ItemList = styled.ul`
  display: flex;
  list-style: none;
`
const ItemToggle = css`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const activeLabel = (props) => css`
  opacity: ${props.active ? 1 : 0.5};
`

const SizeLabel = styled.label`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  background: black;
  border: .1rem solid white;
  border-radius: 100%;
  color: white;
  text-transform: uppercase;
  ${activeLabel};
`

const TypeLabel = styled.label`
  display: block;
  max-width: 7.5rem;
  margin: 0 .5rem;
  text-align: center;
  ${activeLabel};
`

class FilterList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.arrayOf(PropTypes.string),
    onHandleToggle: PropTypes.func
  }

  static defaultProps = {
    items: [],
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
    const { items, active, listType } = this.props

    const filterInputToggle = (name, isActive) => (
      <input
        type='checkbox'
        checked={isActive}
        className={ItemToggle}
        value={name}
        onChange={this.handleToggle}
      />
    )

    const sizeFilterItem = (name, isActive) => (
      <SizeLabel active={isActive}>
        {filterInputToggle(name)}
        <abbr title={name}>{name.charAt(0)}</abbr>
      </SizeLabel>
    )

    const typeFilterItem = (name, isActive) => (
      <TypeLabel active={isActive}>
        {filterInputToggle(name, isActive)}
        <MonsterTypeBadge
          type={name}
          svgAttrs={{width: '100%'}}
          bgAttrs={{stroke: '#000', fill: 'none'}}
          iconAttrs={{fill: '#fff'}}
        />
        {name}
      </TypeLabel>
    )

    return (
      <ItemList>
        {items.map((name) => {
          const isActive = active.indexOf(name) !== -1
          return (
            <li key={`filter-${name}`}>
              {listType === 'type' && typeFilterItem(name, isActive)}
              {listType === 'size' && sizeFilterItem(name, isActive)}
            </li>
          )
        })}
      </ItemList>
    )
  }
}

export default FilterList
