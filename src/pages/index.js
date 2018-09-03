import * as PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'
import CardGrid from '../components/card-grid'
import Helmet from 'react-helmet'
import { injectGlobal, css } from 'react-emotion'
import { rem } from '../utils/helpers'

injectGlobal`
  body {
    background: black;
    color: white;
    font-family: 'Alegreya', 'sans-serif';
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: 'Alegreya Sans', 'sans-serif';
  }
`

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monsters: PropTypes.object
    })
  }

  render () {
    const { monsters } = this.props.data

    const title = `"A" is for Aboleth`
    const desc = 'A visual deck of cards based on the 5th edition System Reference Document (SDR) of a popular table top role playing game.'

    return (
      <div>
        <Helmet title={title}>
          <meta name='description' content={desc} />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
        </Helmet>
        <main>
          <div className={css`margin:${rem(10)} auto;max-width:${rem(1400)};text-align:center;`}>
            <h1>{title}</h1>
            <p className={css`font-size:${rem(16)};`}>{desc}</p>
          </div>
          <CardGrid
            cards={monsters.edges.map(e => e.node)}
            perPage={12}
          />
        </main>
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
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
