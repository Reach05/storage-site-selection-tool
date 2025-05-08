import { useState } from "react";

export default function CompetitorSearch() {
  const [results, setResults] = useState([]);

  // TODO: add your Google Places API logic here to fetch competitors
  // e.g. fetchPlaces(params).then(data => setResults(data.results));

  return (
    <div>
      <h1>Competitor Search</h1>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}
