import * as PropTypes from 'prop-types'
import React from 'react'
import CardGrid from '../components/card-grid'

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
