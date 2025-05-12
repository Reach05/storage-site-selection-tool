import HeatMapOverlay from "../components/HeatMapOverlay";

export default function HeatMapPage() {
  return (
    <HeatMapOverlay
      populationUrl="https://services.arcgis.com/.../FeatureServer/0"
      incomeUrl="https://services.arcgis.com/.../FeatureServer/1"
    />
  );
}
