// pages/_app.jsx
import "../styles/globals.css";
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Move the assetPath assignment into a client‐only effect
  useEffect(() => {
    // only run in browser
    if (typeof window !== "undefined") {
      esriConfig.assetsPath = "/arcgis/assets/";
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
