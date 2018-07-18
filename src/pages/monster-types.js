import * as PropTypes from 'prop-types'
import React from 'react'
import TypeGrid from '../components/type-grid'

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
        <TypeGrid
          cards={monsters.edges.map(e => e.node)}
        />
      </main>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query monsterTypePage {
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
