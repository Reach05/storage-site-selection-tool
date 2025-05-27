// pages/_app.jsx
import "../styles/globals.css";

// 1. ArcGIS theme CSS
import "@arcgis/core/assets/esri/themes/light/main.css";

// 2. Tell @arcgis/core where to find its assets at runtime
import esriConfig from "@arcgis/core/config";
esriConfig.assetsPath = "/arcgis/assets/";

// 3. Vercel Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
