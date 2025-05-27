// pages/index.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Site Selection Tool</h1>
      <p>Choose your view:</p>
      <ul>
        <li>
          <Link href="/map-view">Interactive Map View</Link>
        </li>
        {/* add other entry points here as you build them */}
      </ul>
    </main>
  );
}
