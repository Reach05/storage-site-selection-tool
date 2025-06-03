// pages/_app.jsx
import "../styles/globals.css";
import esriConfig from "@arcgis/core/config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Only set the Esri assetsPath on the client
  useEffect(() => {
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
