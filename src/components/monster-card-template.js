import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled, { css } from "react-emotion";
import CardSvg from "./monster-card-svg";
import { rem } from "../utils/helpers";
import placholder from "../assets/images/unknown-card.svg";

const CardBase = css`
  display: block;
  position: relative;
  width: ${rem(140)};
  overflow: hidden;
  border-radius: 0.5rem;
  text-decoration: none;

  @media (min-width: ${rem(650)}) {
    width: ${rem(200)};
  }
`;

const CardImage = styled.div`
  position: absolute;
  top: ${rem(2)};
  right: ${rem(2)};
  bottom: ${rem(2)};
  left: ${rem(2)};
`;

class MonsterCard extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    monster: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cr: PropTypes.string.isRequired,
      cardImage: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.objectOf(PropTypes.string)
        })
      }),
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      })
    }).isRequired
  };

  render() {
    const {
      className,
      monster: {
        name,
        size,
        type,
        cr,
        alignment,
        fields: { slug, cardImage }
      }
    } = this.props;

    const image = cardImage && cardImage.childImageSharp;

    return (
      <Link className={`${CardBase} ${className}`} to={`/${slug}/`}>
        <CardImage>{image && <Img fluid={{ ...image.fluid, base64: null, tracedSVG: placholder }} />}</CardImage>
        {CardSvg({ name, size, type, cr })}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "Game",
            name: 'System Reference Document 5.1 ("SRD5")',
            character: {
              "@type": "Person/Monster",
              name: { name },
              type: { type },
              challenge_rating: { cr },
              size: { size },
              alignment: { alignment }
            }
          })}
        </script>
      </Link>
    );
  }
}

export default MonsterCard;

export const monsterCardFragment = graphql`
  fragment MonsterCard_img on ImageSharp {
    fluid: fluid(maxWidth: 380, maxHeight: 550, quality: 80, duotone: { highlight: "#e9d7be", shadow: "#514b36", opacity: 80 }) {
      ...GatsbyImageSharpFluid_withWebp
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
`;
