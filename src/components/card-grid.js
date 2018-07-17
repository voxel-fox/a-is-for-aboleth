import * as PropTypes from 'prop-types'
import React from 'react'
import memoize from 'memoize-one'

import styled, { css, keyframes } from 'react-emotion'
import { zoomInUp } from 'react-animations'

import FilterList from './filter-list'
import MonsterCard from './monster-card-template'
import texture from '../assets/images/dark-card-bg.jpg'
import Button from './button'

const cardAnimation = keyframes`${zoomInUp}`

const container = css`
  max-width: 100rem;
  margin: 1.25rem auto;
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
    filterOptions: PropTypes.arrayOf(PropTypes.string),
    cards: PropTypes.array
  }

  static defaultProps = {
    limit: 12,
    filterOptions: ['size', 'type'],
    initialFilters: [],
    cards: []
  }

  state = {
    cardLimit: this.props.limit,
    activeFilters: {}
  }

  buildFilters = memoize(
    (cards, filterOptions) => cards.reduce((options, card) => {
      filterOptions.map((attr) => {
        const values = options[attr] || []
        options[attr] = (values.indexOf(card[attr]) === -1)
          ? [ ...values, card[attr] ]
          : values
      })
      return options
    }, {})
  )

  validateCard = memoize(
    (card, activeFilters) => Object
      .keys(activeFilters)
      .reduce((isValid, k) => {
        const allowed = activeFilters[k].map((v) => v.toLowerCase())
        return isValid && (allowed.length < 1 || (card[k] && allowed.includes(card[k].toLowerCase())))
      }, true)
  )

  filterCards = memoize(
    (cards, activeFilters) => {
      return cards.filter((card) => this.validateCard(card, activeFilters))
    }
  )

  filterChange (...args) {
    const [{ name, active }, attr] = args
    const currentFilters = this.state.activeFilters[attr] || []
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
      this.setState({ activeFilters: {
        ...this.state.activeFilters,
        [attr]: newFilters
      }})
    }
  }

  render () {
    const { cards, filterOptions, limit } = this.props
    const { activeFilters, cardLimit } = this.state
    const filters = this.buildFilters(cards, filterOptions)
    const deck = this.filterCards(cards, activeFilters)

    return (
      <div className={css`background: url(${texture});`}>
        <div className={container}>
          {Object.keys(filters).map((attr) => (
            <FilterList
              key={`filter-${attr}`}
              listType={attr}
              items={filters[attr]}
              active={activeFilters[attr] || []}
              onHandleToggle={(...args) => this.filterChange(...args, attr)}
            />
          ))}
        </div>

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
      </div>
    )
  }
}

export default CardGrid
