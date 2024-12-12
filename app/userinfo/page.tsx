"use client"; // Asegúrate de que esta línea sea la primera del archivo

import { ChatContainer } from "@/styles/mui";

import React, { useState } from "react";

const UserForm = () => {
  const [formData] = useState({
    fullName: "Juan Pérez",
    username: "juan123",
    email: "juan.perez@example.com",
    phone: "+57 300 123 4567",
    password: "********",
    confirmPassword: "********",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1c1e33",
        margin: "0", // Elimina los márgenes del contenedor principal
      }}
    >
      <div
        style={{
          background: "#25273e",
          padding: "0px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          margin: "0", // Elimina los márgenes del contenedor secundario
        }}
      >
        {/* Contenedor para la imagen y el nombre del usuario con ajuste al 100% del ancho */}
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Se asegura que la imagen y el texto estén en líneas separadas
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            backgroundColor: "#2a2d45", // Fondo del contenedor de la imagen
            borderRadius: "0px 0px 8px 8px", // Bordes redondeados solo arriba
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra para diferenciar el contenedor
            width: "100%", // Ancho completo
            paddingTop:"100px",
          }}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="Usuario"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid #ffffff",
             
            }}
          />
          {/* Texto de bienvenida */}
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#ffffff",
              marginTop: "10px", // Margen superior ajustado para separar el texto de la imagen
            }}
          >
            Bienvenido Usuario
          </h2>
        </div>

        {/* Nuevo contenedor para el resto de la información */}
        <div
          style={{
            margin: "20px", // Separación entre el contenedor de la imagen y el contenedor de la información
            borderRadius: "8px",
            padding: "20px", // Relleno interior para el contenido
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Nombre completo:</p>
            <p style={{ color: "#ffffff" }}>{formData.fullName}</p>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Nombre de usuario:</p>
            <p style={{ color: "#ffffff" }}>{formData.username}</p>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Correo electrónico:</p>
            <p style={{ color: "#ffffff" }}>{formData.email}</p>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Número de teléfono:</p>
            <p style={{ color: "#ffffff" }}>{formData.phone}</p>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Contraseña:</p>
            <p style={{ color: "#ffffff" }}>{formData.password}</p>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold", color: "#ffffff" }}>Confirmar contraseña:</p>
            <p style={{ color: "#ffffff" }}>{formData.confirmPassword}</p>
          </div>

          <div>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#ee3a57",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
