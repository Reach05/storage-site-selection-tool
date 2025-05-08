import { useState } from "react";

export default function SiteFilters({ onChange }) {
  const [radius, setRadius] = useState(5);
  const [income, setIncome] = useState([30000, 100000]);

  return (
    <div>
      <h2>Filters</h2>
      <label>
        Drive-time radius: {radius} miles
        <input
          type="range"
          min="1"
          max="30"
          value={radius}
          onChange={e => {
            setRadius(e.target.value);
            onChange({ radius, income });
          }}
        />
      </label>
      <label>
        Income range:
        <input
          type="number"
          value={income[0]}
          onChange={e => {
            const low = Number(e.target.value);
            setIncome([low, income[1]]);
            onChange({ radius, income: [low, income[1]] });
          }}
        /> – 
        <input
          type="number"
          value={income[1]}
          onChange={e => {
            const high = Number(e.target.value);
            setIncome([income[0], high]);
            onChange({ radius, income: [income[0], high] });
          }}
        />
      </label>
    </div>
  );
}
