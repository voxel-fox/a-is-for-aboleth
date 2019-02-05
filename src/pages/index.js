import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import CardGrid from "../components/card-grid";
import ContactBadge from "../components/contact-badge";
import Helmet from "react-helmet";
import { css, Global } from "@emotion/core";
import { rem } from "../utils/helpers";

const globalStyles = css`
  body {
    background: black;
  }
`;

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      monsters: PropTypes.object
    })
  };

  render() {
    const { monsters } = this.props.data;

    const title = `"A" is for Aboleth`;
    const desc = "A D&D 5e beasteiray of monster stats and abilities for quick reference and fun.";

    return (
      <>
        <Helmet title={title}>
          <meta name="google-site-verification" content="ZVvgrDxauwoLid_aeqLUxbNGwQNYF8FLKxcjMFlJSWA" />
          <meta name="description" content={desc} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </Helmet>
        <Global styles={globalStyles} />
        <main>
          <div
            css={css`
              margin: ${rem(10)} auto;
              max-width: ${rem(1400)};
              text-align: center;
            `}
          >
            <h1>{title}</h1>
            <p
              css={css`
                font-size: ${rem(16)};
              `}
            >
              {desc}
            </p>
          </div>
          <CardGrid cards={monsters.edges.map(e => e.node)} perPage={12} />
        </main>
        <ContactBadge />
      </>
    );
  }
}

export default Index;

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
`;
