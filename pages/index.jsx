import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Storage Site Selection Tool</h1>
      <ul>
        <li>
          <Link href="/fema-demo">FEMA Flood Zones Demo</Link>
        </li>
        <li>
          <Link href="/competitor-search">Competitor Search</Link>
        </li>
        <li>
          <Link href="/drive-time">Drive-Time Polygons</Link>
        </li>
        <li>
          <Link href="/heatmap">Heatmap Overlays</Link>
        </li>
        <li>
          <Link href="/map-view">Full Map View</Link>
        </li>
        <li>
          <Link href="/site-scoring">Site Scoring Chart</Link>
        </li>
      </ul>
    </div>
  );
}
