import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { rem, visuallyHidden } from "../utils/helpers";

const OuterBox = css`
  position: fixed;
  top: ${rem(-10)};
  right: ${rem(-10)};
  padding: ${rem(20)};
  background-color: #000;
  border-radius: ${rem(30)};
  z-index: 30;
`;

const Button = css`
  position: absolute;
  top: ${rem(5)};
  right: ${rem(5)};
  display: block;
  width: ${rem(40)};
  height: ${rem(40)};
  background-color: transparent;
  border: 0;
  color: white;
`;

const toggleStyle = props => css`
  opacity: ${!props.open ? 0 : 1};
  height: ${!props.open ? 0 : rem(250)};
  width: ${!props.open ? 0 : rem(230)};
`;

const ContentBox = styled.div`
  display: block;
  transition: 0.1s width, 0.15s height;
  overflow: hidden;
  ${toggleStyle};
`;

const Icon = css`
  display: inline-block;
  width: ${rem(40)};
  height: ${rem(40)};
  font-size: ${rem(30)};
  line-height: 1;
  text-align: center;
  vertical-align: middle;
`;

const Link = css`
  color: white;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

class ContactBadge extends React.Component {
  state = {
    open: false
  };

  render() {
    const { open } = this.state;

    return (
      <aside css={OuterBox}>
        <button
          css={Button}
          onClick={() => {
            this.setState({
              open: !open
            });
          }}
        >
          {open && (
            <svg width={15} height={15} fill="#fff">
              <use xlinkHref="#close" />
            </svg>
          )}
          {!open && "?"}
        </button>
        <ContentBox open={open}>
          <h2>Contact</h2>
          <p>
            Oh hi there!
            <br />
            Got a question? comment? diatribe?
          </p>
          <p>Drop us a line!</p>

          <ul
            css={css`
              list-style: none;
              padding: 0;
              margin: 0;
            `}
          >
            <li>
              <b css={Icon}>
                <span css={visuallyHidden}>Email</span>
                <span aria-hidden="true">@</span>
              </b>
              <a css={Link} href="mailto:hello@voxel-fox.com">
                hello@voxel-fox.com
              </a>
            </li>
            <li>
              <b css={Icon}>
                <span css={visuallyHidden}>Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  width="40"
                  height="40"
                  aria-hidden="true"
                >
                  <path
                    d="M153.62 301.59c94.34 0 145.94-78.16 145.94-145.94 0-2.22 0-4.43-.15-6.63A104.36 104.36 0 0 0 325 122.47a102.38 102.38 0 0 1-29.46 8.07 51.47 51.47 0 0 0 22.55-28.37 102.79 102.79 0 0 1-32.57 12.45 51.34 51.34 0 0 0-87.41 46.78A145.62 145.62 0 0 1 92.4 107.81a51.33 51.33 0 0 0 15.88 68.47A50.91 50.91 0 0 1 85 169.86v.65a51.31 51.31 0 0 0 41.15 50.28 51.21 51.21 0 0 1-23.16.88 51.35 51.35 0 0 0 47.92 35.62 102.92 102.92 0 0 1-63.7 22 104.41 104.41 0 0 1-12.21-.74 145.21 145.21 0 0 0 78.62 23"
                    fill="#fff"
                  />
                </svg>
              </b>
              <a css={Link} href="https://twitter.com/voxelfoxllc">
                @voxelfoxllc
              </a>
            </li>
          </ul>
        </ContentBox>
      </aside>
    );
  }
}

export default ContactBadge;
