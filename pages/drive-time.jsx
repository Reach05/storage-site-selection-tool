// pages/drive-time.jsx
import React from "react";
import DriveTimePolygons from "../components/DriveTimePolygons";

export default function DriveTimePage() {
  return <DriveTimePolygons serviceUrl={process.env.NEXT_PUBLIC_DRIVETIME_URL} />;
}
