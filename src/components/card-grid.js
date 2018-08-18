import * as PropTypes from 'prop-types'
import React from 'react'
import memoize from 'memoize-one'

import styled, { css, keyframes } from 'react-emotion'
import { zoomInUp } from 'react-animations'

import FilterMonsterByCR from './filter-monster-by-cr'
import FilterMonsterBySize from './filter-monster-by-size'
import FilterMonsterByType from './filter-monster-by-type'
import MonsterCard from './monster-card-template'
import texture from '../assets/images/dark-card-bg.jpg'
import Button from './button'

const cardAnimation = keyframes`${zoomInUp}`

const container = css`
  max-width: 100rem;
  margin: 1.25rem auto;
`

const FiltersBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: black;
  z-index: 100;
`

const Grid = styled.div`
  ${container}
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const GridItem = css`
  margin: .75rem;
  max-width: 14.5rem;
  animation: .5s ${cardAnimation};
`

class CardGrid extends React.Component {
  static propTypes = {
    limit: PropTypes.number,
    cards: PropTypes.array
  }

  static defaultProps = {
    limit: 12,
    sizeFilters: [],
    typeFilters: [],
    nameFilter: null,
    crRange: {
      min: 0,
      max: 30
    },
    cards: []
  }

  state = {
    cardLimit: this.props.limit,
    sizeFilters: this.props.sizeFilters,
    typeFilters: this.props.typeFilters,
    nameFilter: this.props.nameFilter,
    crRange: this.props.crRange
  }

  filterByAttr = memoize(
    (card, filters, attr) => {
      const allowed = filters.map((v) => v.toLowerCase())
      return allowed.length < 1 || (card[attr] && allowed.includes(card[attr].toLowerCase()))
    }
  )

  filterByCR = memoize(
    (card, crRange) => {
      return card.fields.crValue >= crRange.min && card.fields.crValue <= crRange.max
    }
  )

  filterCards = memoize(
    (cards, sizeFilters, typeFilters, crRange) => {
      return cards
        .filter((card) => this.filterByAttr(card, sizeFilters, 'size'))
        .filter((card) => this.filterByAttr(card, typeFilters, 'type'))
        .filter((card) => this.filterByCR(card, crRange))
    }
  )

  toggleFilter (...args) {
    const [{ name, active }, filterName] = args
    const currentFilters = this.state[filterName] || []
    let newFilters = currentFilters

    // Add filter to list
    if (active && currentFilters.indexOf(name) === -1) {
      newFilters = [ ...currentFilters, name ]
    }

    // Remove filter from list
    if (!active && currentFilters.indexOf(name) !== -1) {
      newFilters = currentFilters.filter((a) => name !== a)
    }

    if (newFilters !== currentFilters) {
      this.setState({ [filterName]: newFilters })
    }
  }

  render () {
    const { cards, limit } = this.props
    const { sizeFilters, typeFilters, crRange, cardLimit } = this.state
    const deck = this.filterCards(cards, sizeFilters, typeFilters, crRange)

    return (
      <div className={css`overflow:hidden;background:url(${texture});`}>
        <Grid>
          {deck
            .slice(0, cardLimit)
            .map(card => (
              <MonsterCard
                key={`monster-${card.fields.slug}`}
                className={GridItem}
                monster={card}
              />
            ))}
        </Grid>

        {deck.length > cardLimit && (
          <div className={css`display:flex;align-items:center;`}>
            <Button
              data-testid='load-more'
              label='More Monsters'
              onClick={() => {
                this.setState({
                  cardLimit: cardLimit + limit
                })
              }}
            />
          </div>
        )}

        <FiltersBox>
          <div className={container}>
            <FilterMonsterByCR
              onValueChange={(range) => {
                this.setState({
                  crRange: range
                })
              }}
            />
            <FilterMonsterBySize
              active={sizeFilters || []}
              onHandleToggle={(...args) => this.toggleFilter(...args, 'sizeFilters')}
            />
          </div>
          <FilterMonsterByType
            active={typeFilters || []}
            onHandleToggle={(...args) => this.toggleFilter(...args, 'typeFilters')}
          />
        </FiltersBox>
      </div>
    )
  }
}

export default CardGrid
