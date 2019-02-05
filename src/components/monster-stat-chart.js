import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Radar } from "recharts";

export default class StatChart extends Component {
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

    return (
      <ResponsiveContainer aspect={1} minWidth={250}>
        <RadarChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={data}>
          <PolarGrid gridType="circle" stroke="#ffffff" strokeOpacity={0.2} />
          <PolarAngleAxis stroke="#ffffff" dataKey="label" strokeOpacity={0.5} />
          <PolarRadiusAxis domain={[0, 30]} tickCount={4} axisLine={false} fillOpacity={0.5} />
          <Radar dataKey="value" stroke="#ffffff" fill="#ffffff" dot fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
