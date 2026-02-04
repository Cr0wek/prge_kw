import React, { useRef, useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import { TileWMS } from "ol/source";

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
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:9000/geoserver/prge/wms?",
            params: {
              LAYERS: "prge:users",
              TILED: true,
            },
            serverType: "geoserver",
          }),
        }),
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:9000/geoserver/prge/wms?",
            params: {
              LAYERS: "prge:event",
              TILED: true,
            },
            serverType: "geoserver",
          }),
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
