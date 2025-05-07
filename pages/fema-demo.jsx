import { useEffect, useState } from "react";
import { fetchFema } from "../lib/fema";

export default function FemaDemo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFema("DisasterDeclarationsSummaries", {
      params: { state: "CA", $limit: 10 }
    })
      .then(json => setData(json.DisasterDeclarationsSummaries))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <pre>Error: {error}</pre>;
  if (!data) return <p>Loading…</p>;

  return (
    <div>
      <h1>Recent FEMA Disasters in CA</h1>
      <ul>
        {data.map(d => (
          <li key={d.disasterNumber}>
            {d.declarationTitle} ({d.incidentBeginDate})
          </li>
        ))}
      </ul>
    </div>
  );
}
