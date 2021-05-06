import { FC, useRef, useEffect, CSSProperties } from "react";
import "./styles.scss";
import { useEnv } from "hooks/useEnv";
import mapboxgl from "mapbox-gl";

interface MapProps {
  lng: number;
  lat: number;
  style?: CSSProperties;
}

export const Map: FC<MapProps> = ({ lng, lat, style, children }) => {
  const env = useEnv();

  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainer?.current && lng && lat) {
      mapboxgl.accessToken = env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

      new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 9,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, lat]);

  return (
    <div ref={mapContainer} className="map" style={{ ...style }}>
      {children}
    </div>
  );
};

Map.defaultProps = {};

export default Map;
