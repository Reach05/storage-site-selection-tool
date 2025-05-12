import DriveTimePolygons from "../components/DriveTimePolygons";

export default function DriveTimePage() {
  return (
    <DriveTimePolygons serviceUrl="https://your-arcgis-server/driveTimeLayer" />
  );
}
