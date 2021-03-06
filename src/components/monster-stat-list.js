import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { css } from "@emotion/core";
import statMod from "../utils/stat-mod";

const statRowStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0.5rem;
`;

class MonsterStatList extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        attr: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    ).isRequired
  };

  render() {
    const { data } = this.props;

    const StatRow = ({ stat: { value, label, attr } }) => {
      return (
        <div css={statRowStyle}>
          <dt>
            <abbr title={attr}>{label}</abbr>
          </dt>
          <dd
            css={css`
              margin: 0;
              font-size: 1.2em;
            `}
          >
            {value}
          </dd>
          <dd
            css={css`
              margin: 0;
            `}
          >
            {statMod(value)}
          </dd>
        </div>
      );
    };

    return (
      <dl
        css={css`
          display: flex;
          width: 300px;
          justify-content: center;
        `}
      >
        {data.map(attr => (
          <StatRow key={attr.label} stat={attr} />
        ))}
      </dl>
    );
  }
}

export default MonsterStatList;
