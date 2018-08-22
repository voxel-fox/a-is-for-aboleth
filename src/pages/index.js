import * as PropTypes from 'prop-types'
import React from 'react'
import CardGrid from '../components/card-grid'
import { css } from 'react-emotion'
import { rem } from '../utils/helpers'

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monsters: PropTypes.object
    })
  }

  render () {
    const { monsters } = this.props.data

    return (
      <main>
        <div className={css`margin:${rem(10)} auto;max-width:${rem(1400)};text-align:center;`}>
          <h1>A is for Aboleth</h1>
          <p className={css`font-size:${rem(16)};`}>A visual deck of cards based on the 5th edition System Reference Document (SDR) of a popular table top role playing game.</p>
        </div>
        <CardGrid
          cards={monsters.edges.map(e => e.node)}
          perPage={12}
        />
      </main>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query indexPage {
    monsters: allMonstersSrd5EJson {
      edges {
        node {
          name
          ...MonsterCard_details
          ...MonsterFields
        }
      }
    }
  }
`
