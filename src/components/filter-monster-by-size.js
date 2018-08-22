import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import { rem } from '../utils/helpers'

const sizes = {
  'Tiny': 10,
  'Small': 20,
  'Medium': 20,
  'Large': 40,
  'Huge': 60,
  'Gargantuan': 80
}

const ItemList = styled.ul`
  display: flex;
  height: ${rem(70)};
  align-items: flex-end;
  list-style: none;
  margin: 0;
  overflow: visible;
`

const ItemToggle = css`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const activeLabel = (props) => css`
  color: ${props.active ? '#fff' : '#999'};
`

const icon = (props) => css`
  height: 0;
  padding-top: 100%;
  width: ${rem(sizes[props.name])};
  background: ${props.active ? '#fff' : '#999'};
`

const ItemLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  margin: ${rem(4)};
  ${activeLabel};
  cursor: pointer;

  &::before {
    display: block;
    ${icon};
    content: '';
  }
`

class FilterMonsterBySize extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.arrayOf(PropTypes.string),
    onHandleToggle: PropTypes.func
  }

  static defaultProps = {
    items: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
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

    const filterInputToggle = (name, isActive) => (
      <input
        type='checkbox'
        checked={isActive}
        className={ItemToggle}
        value={name}
        onChange={this.handleToggle}
      />
    )

    return (
      <ItemList>
        {items.map((name) => {
          const isActive = active.indexOf(name) !== -1
          return (
            <li key={`filter-${name}`} className={css`margin-bottom:0;`}>
              <ItemLabel active={isActive} name={name}>
                {filterInputToggle(name)}
                <abbr title={name}>{name.charAt(0)}</abbr>
              </ItemLabel>
            </li>
          )
        })}
      </ItemList>
    )
  }
}

export default FilterMonsterBySize
