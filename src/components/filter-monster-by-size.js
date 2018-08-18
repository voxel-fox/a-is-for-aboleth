import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'

const ItemList = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: auto;
  margin: 0;
`

const ItemToggle = css`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const activeLabel = (props) => css`
  opacity: ${props.active ? 1 : 0.5};
`

const ItemLabel = styled.label`
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
            <li key={`filter-${name}`}>
              <ItemLabel active={isActive}>
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
