"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Backdrop, MenuItem, TextField } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { FormDataReport } from "./AnimalCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface TransitionsModalProps {
    open: boolean;
    onClose: () => void; // Callback para manejar el cierre del modal
  }
  
  interface AnimalModalEditProps extends TransitionsModalProps {
    animal: FormDataReport; // Propiedad que representa al animal
  }

function AnimalModalEdit({ open, onClose, animal }: AnimalModalEditProps) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState<FormDataReport>({ ...animal });
  console.log("Modal abierto: ", open);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormValues((prevValues) => ({
        ...prevValues,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Datos editados:", formValues);
    // Aquí podrías enviar los datos actualizados al backend
    setIsLoading(true);
    setTimeout(() => {
      setOpenSnack(true);
      setIsLoading(false);
      onClose()
    }, 2000);

  };

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };


  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "auto",
            backgroundColor: "white",
            borderRadius: 4,
            overflow: "hidden",
            borderStyle: "solid",
            borderColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            ":hover": {
              borderColor: "var(--secondary-color)",
              cursor: "pointer",
            },
            p: 4,
            margin: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Editar Información de {animal.petName}
          </Typography>
          {/* Formulario de edición */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gridTemplateRows: { xs: "auto", md: "auto auto" },
              gap: "1em",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            <TextField
              label="ID"
              name="id"
              value={formValues.id}
              onChange={handleChange}
              disabled
            />
            {/* Mostrar imagen actual */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img
                src={formValues.images[0]}
                alt="Imagen del animal"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
              {/* Botón para cambiar imagen */}
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Cambiar Imagen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>

            <TextField
              label="Nombre"
              name="name"
              value={formValues.petName}
              onChange={handleChange}
            />
            <TextField
              label="Estado"
              name="status"
              value={formValues.status}
              onChange={handleChange}
              select
            >
              <MenuItem value="Sin hogar">Sin hogar</MenuItem>
              <MenuItem value="Perdido">Perdido</MenuItem>
              <MenuItem value="Encontrado">Encontrado</MenuItem>
            </TextField>
            <TextField
              label="Descripción"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
            <TextField
              label="Ubicación"
              name="location"
              value={formValues.foundLocation}
              onChange={handleChange}
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              type="tel"
            />
          </Box>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Button
              sx={{
                marginRight: "10px",
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          )}
          {isLoading ? (
            ""
          ) : (
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ¡Información actualizada con exito!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AnimalModalEdit;
