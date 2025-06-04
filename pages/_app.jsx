// pages/_app.jsx
import "@arcgis/core/assets/esri/themes/light/main.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
