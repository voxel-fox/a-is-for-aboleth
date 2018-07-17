import * as PropTypes from 'prop-types'
import React from 'react'
import MonsterDetail from '../components/monster-detail'

class MonsterTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monster: PropTypes.object.isRequired
    })
  }

  render () {
    const { monster, typeImage, monsterImage } = this.props.data
    return (<MonsterDetail monster={monster} image={monsterImage || typeImage} />)
  }
}

export default MonsterTemplate

export const pageQuery = graphql`
  query MonsterPage($name: String!, $imgRegexType: String!, $imgRegexMonster: String!) {
    monster: monstersSrd5EJson(name: { eq: $name }) {
      ...MonsterFields
    }
    typeImage: imageSharp(id: { regex: $imgRegexType }) {
      ...MonsterMast_img
    }
    monsterImage: imageSharp(id: { regex: $imgRegexMonster }) {
      ...MonsterMast_img
    }
  }
`
