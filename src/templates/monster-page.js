import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import MonsterDetail from "../components/monster-detail";

class MonsterTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monster: PropTypes.object.isRequired
    })
  };

  render() {
    const { monster, imageFallback, imageMonster } = this.props.data;

    return (
      <>
        <Helmet title={`${monster.name} (5e)`}>
          <meta name="description" content={`Stats, actions and details for the ${monster.name} a ${monster.cr} CR creature. This monster is typically of a ${monster.alignment} alignment and is ${monster.size} sized.`} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </Helmet>
        <MonsterDetail monster={monster} image={(imageMonster && imageMonster.sharp) || (imageFallback && imageFallback.sharp)} />
      </>
    );
  }
}

export default MonsterTemplate;

export const pageQuery = graphql`
  query($name: String!, $imgRegexType: String!, $imgRegexMonster: String!) {
    monster: monstersSrd5EJson(name: { eq: $name }) {
      ...MonsterFields
    }
    imageFallback: file(relativePath: { regex: $imgRegexType }) {
      sharp: childImageSharp {
        ...MonsterMast_img
      }
    }
    imageMonster: file(relativePath: { regex: $imgRegexMonster }) {
      sharp: childImageSharp {
        ...MonsterMast_img
      }
    }
  }
`;
