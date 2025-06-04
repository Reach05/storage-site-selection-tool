// pages/_app.jsx
import "@arcgis/core/assets/esri/themes/light/main.css";
import "../styles/globals.css";

import { useEffect } from "react";
import esriConfig from "@arcgis/core/config";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MyApp({ Component, pageProps }) {
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
