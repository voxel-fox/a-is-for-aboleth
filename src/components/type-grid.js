import * as PropTypes from 'prop-types'
import React from 'react'
import memoize from 'memoize-one'
import MonsterTypeBadge from './monster-type-badge'

import { css } from 'react-emotion'

// import FilterList from './filter-list'
import MonsterCard from './monster-card-template'
import texture from '../assets/images/dark-card-bg.jpg'
// import { split } from 'eol';
// import Button from './button'

const container = css`
  max-width: 100rem;
  margin: 1.25rem auto;
`

const parseCR = (cr) => {
  return cr.indexOf('/') !== -1 ? (+cr.split('/')[0] / +cr.split('/')[1]) : +cr
}

class TypeGrid extends React.Component {
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

  buildDecks = memoize(
    (cards, types) => types.reduce((decks, type) => {
      const deck = cards
        .filter(card => card.type === type)
        .sort((a, b) => {
          const cr1 = parseCR(a.cr)
          const cr2 = parseCR(b.cr)
          return cr1 === cr2 ? 0 : +(cr1 > cr2) || -1
        })
      return decks.concat({
        type: type,
        deck: deck
      })
    }, [])
  )

  render () {
    const { cards, filterOptions } = this.props
    const filters = this.buildFilters(cards, filterOptions)
    const decks = this.buildDecks(cards, filters.type)

    return (
      <div className={css`background: url(${texture});`}>
        <div className={container}>
          {decks.map(({type, deck}) => (
            <div className={css`white-space: nowrap;position:relative;padding-left:10rem;`}>
              <div className={css`position:absolute;width:8rem;height:8rem;top:calc(50% - 4rem);left:1rem;text-align:center;`}>
                <MonsterTypeBadge
                  type={type}
                  svgAttrs={{width: '100%'}}
                  bgAttrs={{stroke: '#000', fill: 'none'}}
                  iconAttrs={{fill: '#fff'}}
                />
                <p>{type}</p>
              </div>
              {deck
                .slice(0, 4)
                .map(card => (
                  <MonsterCard
                    key={`monster-${card.fields.slug}`}
                    monster={card}
                    className={css`display:inline-block;max-width:14.5rem;margin:.75rem;`}
                  />
                ))
              }
              <div className={css`position:relative;display:inline-block;`}>
                {deck
                  .slice(4, 5)
                  .map(card => (
                    <MonsterCard
                      key={`monster-${card.fields.slug}`}
                      monster={card}
                      className={css`display:inline-block;max-width:14.5rem;margin:.75rem;z-index:11;`}
                    />
                  ))
                }
                {deck
                  .slice(5, 16)
                  .map((card, i) => (
                    <MonsterCard
                      key={`monster-${card.fields.slug}`}
                      monster={card}
                      className={css`display:inline-block;max-width:14.5rem;margin:.75rem;z-index:${10 - i};position:absolute;left:${i}rem;`}
                    />
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TypeGrid
