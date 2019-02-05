import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";

export const getModifers = data =>
  data.map(stat => {
    const mod = (stat.value - 10) / 2;
    return Object.assign({ ...stat }, { mod: mod });
  });

export const BarLabel = ({ x, y, width, value }) => {
  return (
    <text x={x + width / 2} y={y + (value < 0 ? 16 : -8)} fontSize="16" textAnchor="middle" fill="#ffffff">
      {(value > 0 && "+") + Math.floor(value)}
    </text>
  );
};

export const StatGrade = ({ viewBox: { y }, label }) => {
  return (
    <text x={70} y={y + 2} fontSize={14} fill="#ffffff" textAnchor="end" fillOpacity={0.5}>
      {label}
    </text>
  );
};

export default class StatBarChart extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        attr: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    )
  };

  render() {
    const { data } = this.props;
    const margins = { top: 5, right: 30, left: 20, bottom: 5 };

    return (
      <ResponsiveContainer aspect={1} minWidth={250}>
        <BarChart data={getModifers(data)} margin={margins}>
          <XAxis dataKey="label" interval={0} domain={["auto", "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
          <YAxis domain={[-5, 12]} axisLine={false} tickLine={false} tick={false} />
          <ReferenceLine y={10} stroke="#ffffff" strokeOpacity={0.2} label={<StatGrade label="god like" />} />
          <ReferenceLine y={5} stroke="#ffffff" strokeOpacity={0.2} label={<StatGrade label="epic" />} />
          <ReferenceLine y={0} stroke="#ffffff" strokeOpacity={0.2} label={<StatGrade label="average" />} />
          <ReferenceLine y={-2.5} stroke="#ffffff" strokeOpacity={0.2} label={<StatGrade label="poor" />} />
          <ReferenceLine y={-5} stroke="#ffffff" strokeOpacity={0.2} label={<StatGrade label="" />} />
          <Bar dataKey="mod" stroke={0} fill="#ffffff" fillOpacity={0.5} label={<BarLabel />}>
            <LabelList dataKey="value" position="center" fill="#ffffff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
