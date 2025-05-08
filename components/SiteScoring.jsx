import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SiteScoring({ data = [] }) {
  // data: [ { site: "Location A", score: 75 }, ... ]
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Site Scoring</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="site" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
