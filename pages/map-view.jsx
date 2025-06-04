import dynamic from "next/dynamic";
import Head from "next/head";

const ArcGISMapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Interactive Map View</title>
      </Head>
      <ArcGISMapView />
    </>
  );
}
