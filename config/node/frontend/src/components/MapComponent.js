import React, { useRef, useEffect, use } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { useGeographic } from "ol/proj";

function MapComponent(props) {
  useGeographic();
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [21, 52],
        zoom: 10,
      }),
    });
    return () => map.setTarget(null);
  }, []);

  return <div className="mapComponent" ref={mapRef}></div>;
}
export default MapComponent;
