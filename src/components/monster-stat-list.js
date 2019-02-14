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

const statValueStyle = css`
  margin: 0;
  font-size: 1.2em;
`;

const statModStyle = css`
  margin: 0;
`;

export class StatRow extends PureComponent {
  static propTypes = {
    stat: PropTypes.shape({
      attr: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      stat: { value, label, attr }
    } = this.props;

    return (
      <div css={statRowStyle}>
        <dt>
          <abbr title={attr}>{label}</abbr>
        </dt>
        <dd css={statValueStyle}>{value}</dd>
        <dd css={statModStyle}>{statMod(value)}</dd>
      </div>
    );
  }
}

const statListStyle = css`
  display: flex;
  width: 300px;
  justify-content: center;
`;

export class MonsterStatList extends PureComponent {
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

    return (
      <dl css={statListStyle}>
        {data.map(attr => (
          <StatRow key={attr.label} stat={attr} />
        ))}
      </dl>
    );
  }
}

export default MonsterStatList;
