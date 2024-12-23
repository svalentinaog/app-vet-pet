"use client";

import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { Overlay } from "ol";
import "ol/ol.css";

const MyMap: React.FC = () => {
  const [markerSource] = useState(new VectorSource());
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const mapRef = useRef<Map | null>(null); // Ref to hold the map instance
  const overlayRef = useRef<Overlay | null>(null); // Ref to hold the overlay instance
  const popupRef = useRef<HTMLDivElement | null>(null); // Ref to hold the popup DOM element

  // Inicializa el mapa solo una vez
  useEffect(() => {
    mapRef.current = new Map({
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

    const vectorLayer = new VectorLayer({
      source: markerSource,
    });

    mapRef.current.addLayer(vectorLayer);

    // Crear el overlay para mostrar la información del punto
    overlayRef.current = new Overlay({
      element: popupRef.current as HTMLElement,
      positioning: "bottom-center",
      stopEvent: false,
    });
    mapRef.current.addOverlay(overlayRef.current);

    // Limpieza si es necesario al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(null);
      }
    };
  }, [markerSource]);

  const searchLocation = async (query: string) => {
    if (!query || !mapRef.current) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSearchResults(data);

      if (data && data.length > 0) {
        markerSource.clear(); // Limpiar los marcadores previos

        const features = data.map((location: any) => {
          const coords = fromLonLat([
            parseFloat(location.lon),
            parseFloat(location.lat),
          ]);
          const feature = new Feature({
            geometry: new Point(coords),
            name: location.display_name,
          });

          feature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                scale: 0.05,
              }),
            })
          );

          return feature;
        });

        markerSource.addFeatures(features); // Agregar los nuevos marcadores

        const vectorExtent = markerSource.getExtent();
        mapRef.current
          .getView()
          .fit(vectorExtent, { padding: [50, 50, 50, 50], duration: 1000 });
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

  const showPopup = (coordinate: any, name: string) => {
    if (overlayRef.current) {
      // Establecer el contenido del popup
      popupRef.current!.innerHTML = name;

      // Posicionar el popup sobre las coordenadas
      overlayRef.current.setPosition(coordinate);

      // Asegurarse de que el popup sea visible
      popupRef.current!.style.display = "block";
    }
  };

  const closePopup = () => {
    if (popupRef.current) {
      popupRef.current.style.display = "none"; // Cerrar el popup
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        height: "100vh",
        backgroundColor: "#1c1e33",
        overflow: "hidden", // Evitar scroll horizontal en el contenedor principal
      }}
    >
      {/* Contenedor de los resultados de la búsqueda */}
      <div
        style={{
          width: "300px",
          height: "100vh",
          backgroundColor: "#8D95D6",
          borderRadius: "8px",
          color: "white",
          padding: "20px",
          overflowY: "auto",
          overflowX: "hidden", // Evitar scroll horizontal
        }}
      >
        {/* Formulario de búsqueda */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            name="location"
            placeholder="🐾 Buscar refugio o veterinaria..."
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              width: "100%",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#ECA563",
              color: "white",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Buscar
          </button>
        </form>

        {/* Listado de resultados */}
        {searchResults.length > 0 && (
          <div>
            <h3>Resultados de búsqueda:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  style={{
                    cursor: "pointer",
                    padding: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.1)",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                  onClick={() => {
                    const coords = fromLonLat([
                      parseFloat(result.lon),
                      parseFloat(result.lat),
                    ]);
                    showPopup(coords, result.display_name); // Mostrar popup con el nombre del lugar
                    mapRef.current
                      ?.getView()
                      .animate({ center: coords, zoom: 14 });
                  }}
                >
                  {result.display_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mapa */}
      <div
        id="map"
        style={{
          width: "calc(100% - 300px)",
          height: "100vh",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        {/* Popup para mostrar la información sobre el marcador */}
        <div
          ref={popupRef}
          id="popup"
          style={{
            position: "absolute",
            backgroundColor: "#8D95D6", // Fondo de color #8D95D6
            color: "white", // Texto blanco
            padding: "15px", // Aumento padding para dar más espacio
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            display: "none", // Inicialmente oculto
            zIndex: 1000, // Asegurar que el popup esté encima del mapa
            maxWidth: "400px", // Aumento del tamaño máximo del popup
            width: "auto", // El ancho será automático pero limitado por el maxWidth
            minWidth: "200px", // Establece un ancho mínimo para que no sea demasiado estrecho
          }}
        >
          {/* El contenido del popup se establece dinámicamente */}
        </div>
      </div>
    </div>
  );
};

export default MyMap;
