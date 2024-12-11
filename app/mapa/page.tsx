"use client"; // Asegúrate de que esta línea sea la primera del archivo

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import "ol/ol.css";

// Definimos el tipo para el mapa y las capas
type MyMapProps = {};

const MyMap: React.FC<MyMapProps> = () => {
  const [map, setMap] = useState<Map | null>(null);
  const [markerSource, setMarkerSource] = useState<VectorSource>(
    new VectorSource()
  );

  useEffect(() => {
    // Configurar el mapa
    const initialMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 4,
      }),
    });

    setMap(initialMap);

    const vectorLayer = new VectorLayer({
      source: markerSource,
    });

    initialMap.addLayer(vectorLayer);

    const locateUser = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            const userLocation = fromLonLat([longitude, latitude]);

            // Limpiar marcadores anteriores
            markerSource.clear();

            // Crear un marcador para la ubicación actual
            const userFeature = new Feature({
              geometry: new Point(userLocation),
              name: "Tu ubicación",
            });

            markerSource.addFeature(userFeature);

            // Centrar el mapa en la ubicación actual
            initialMap.getView().animate({ center: userLocation, zoom: 12 });
          },
          (error) =>
            console.error("Error obteniendo la geolocalización", error)
        );
      } else {
        alert("La geolocalización no es compatible con este navegador");
      }
    };

    locateUser();

    return () => {
      initialMap.setTarget(null);
    };
  }, [markerSource]);

  // Función para buscar una dirección mediante Nominatim
  const searchLocation = async (query: string) => {
    if (!query || !map) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        // Limpiar marcadores anteriores
        markerSource.clear();

        data.forEach((location: any) => {
          const coords = fromLonLat([
            parseFloat(location.lon),
            parseFloat(location.lat),
          ]);
          const feature = new Feature({
            geometry: new Point(coords),
            name: location.display_name,
          });
          markerSource.addFeature(feature);
        });

        const firstLocationCoords = fromLonLat([
          parseFloat(data[0].lon),
          parseFloat(data[0].lat),
        ]);
        map.getView().animate({ center: firstLocationCoords, zoom: 12 });
      } else {
        alert("No se encontraron resultados para la dirección");
      }
    } catch (error) {
      console.error("Error al buscar la localización:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement).elements.namedItem(
      "location"
    ) as HTMLInputElement;
    searchLocation(query.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#1c1e33",
      }}
    >
      <div>
        {/* Enlace al Home con next/link */}
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              color: "#ee3a57",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Ir al Home
          </Link>
        </div>

        {/* Formulario de búsqueda */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="location"
            placeholder="Buscar dirección"
            style={{ marginRight: "5px" }}
          />
          <button type="submit">Buscar</button>
        </form>

        {/* Contenedor del mapa */}
        <div
          id="map"
          style={{ width: "600px", height: "500px", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
};

export default MyMap;
