"use client"; // Asegúrate de que esta línea sea la primera del archivo

import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const renderInputWithButtons = (
    id: string,
    name: string,
    type: string,
    placeholder: string,
    value: string
  ) => (
    <div style={{ marginBottom: "15px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#ffffff" }}>
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{
          width: "100%", // Cambiar a 100% para que ocupe todo el ancho disponible
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: "#25273e",
          color: "#ffffff",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1c1e33",
      }}
    >
      <div
        style={{
          background: "#25273e",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#ffffff" }}>Bienvenido Usuario</h2>
        <form onSubmit={handleSubmit}>
          {renderInputWithButtons("fullName", "fullName", "text", "Nombre completo", formData.fullName)}
          {renderInputWithButtons("username", "username", "text", "Nombre de usuario", formData.username)}
          {renderInputWithButtons("email", "email", "email", "Correo electrónico", formData.email)}
          {renderInputWithButtons("phone", "phone", "tel", "Número de teléfono (opcional)", formData.phone)}
          {renderInputWithButtons("password", "password", "password", "Contraseña", formData.password)}
          {renderInputWithButtons("confirmPassword", "confirmPassword", "password", "Confirmar contraseña", formData.confirmPassword)}

          <div>
            <button
              type="submit"
              style={{
                width: "100%", // Asegurar que el botón ocupe el 100% del ancho
                padding: "10px",
                backgroundColor: "#ee3a57",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Cerrar sesion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
