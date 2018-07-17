import * as PropTypes from 'prop-types'
import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled, { css } from 'react-emotion'
import CardSvg from './monster-card-svg'

const CardBase = css`
  display: block;
  position: relative;
  width: 16rem;
  overflow: hidden;
  border-radius: .5rem;
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
      cardImage {
        childImageSharp {
          ...MonsterCard_img
        }
      }
    }
  }
`
