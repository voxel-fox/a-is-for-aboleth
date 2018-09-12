import * as PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'
import MonsterDetail from '../components/monster-detail'

class MonsterTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monster: PropTypes.object.isRequired
    })
  }

  render () {
    const {
      monster,
      imageFallback,
      imageMonster
    } = this.props.data

    return (
      <MonsterDetail
        monster={monster}
        image={(imageMonster && imageMonster.sharp) || (imageFallback && imageFallback.sharp)}
      />
    )
  }
}

export default MonsterTemplate

export const pageQuery = graphql`
  query($name: String!, $imgRegexType: String!, $imgRegexMonster: String!) {
    monster: monstersSrd5EJson(name: { eq: $name }) {
      ...MonsterFields
    }
    imageFallback: file(relativePath: {regex: $imgRegexType }) {
      sharp: childImageSharp {
        ...MonsterMast_img
      }
    }
    imageMonster: file(relativePath: {regex: $imgRegexMonster }) {
      sharp: childImageSharp {
        ...MonsterMast_img
      }
    }
  }
`
