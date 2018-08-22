import * as PropTypes from 'prop-types'
import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled, { css } from 'react-emotion'
import CardSvg from './monster-card-svg'
import { rem } from '../utils/helpers'

const CardBase = css`
  display: block;
  position: relative;
  width: ${rem(144)};
  overflow: hidden;
  border-radius: .5rem;

  @media (min-width: ${rem(650)}) {
    width: ${rem(20)};
  }
`

const CardImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

class MonsterCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    monster: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cr: PropTypes.string.isRequired,
      cardImage: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          sizes: PropTypes.objectOf(PropTypes.string)
        })
      }),
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      })
    }).isRequired
  }

  render () {
    const {
      className,
      monster: {
        name,
        size,
        type,
        cr,
        alignment,
        fields: {
          slug,
          cardImage
        }
      }
    } = this.props

    const { childImageSharp } = cardImage || false
    const image = childImageSharp || false

    return (
      <Link
        className={`${CardBase} ${className}`}
        to={`/${slug}/`}
      >
        <CardImage>
          {image && (<Img sizes={{ ...image.sizes }} />)}
        </CardImage>
        {CardSvg({ name, size, type, cr })}

        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'Game',
            'name': 'System Reference Document 5.1 ("SRD5")',
            'character': {
              '@type': 'Person/Monster',
              'name': {name},
              'type': {type},
              'challenge_rating': {cr},
              'size': {size},
              'alignment': {alignment}
            }
          })}
        </script>
      </Link>
    )
  }
}

export default MonsterCard

export const monsterCardFragment = graphql`
  fragment MonsterCard_img on ImageSharp {
    sizes: sizes(
      maxWidth: 380
      maxHeight: 550
      quality: 80
      duotone: { highlight: "#e9d7be", shadow: "#514b36", opacity: 80 }
      traceSVG: { background: "#f2f8f3", color: "#d6ebd9" }
    ) {
      ...GatsbyImageSharpSizes_tracedSVG
    }
  }
  fragment MonsterCard_details on MonstersSrd5EJson {
    name
    fields {
      slug
      crValue
      cardImage {
        childImageSharp {
          ...MonsterCard_img
        }
      }
    }
  }
`
