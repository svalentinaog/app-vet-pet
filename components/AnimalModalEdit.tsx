"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, MenuItem, TextField } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { FormDataReport } from "./AnimalCard";
import { CldUploadWidget } from "next-cloudinary";
import CloseIcon from "@mui/icons-material/Close";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";


interface TransitionsModalProps {
  open: boolean;
  onClose: () => void; // Callback para manejar el cierre del modal
}

interface AnimalModalEditProps extends TransitionsModalProps {
  animal: FormDataReport; // Propiedad que representa al animal
  userPets: string[];
}

function AnimalModalEdit({
  open,
  onClose,
  animal,
}: AnimalModalEditProps) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState<FormDataReport>({
    ...animal,
  });
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [showPreviousImages, setShowPreviousImages] = React.useState(true);


  console.log("Modal abierto: ", open);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Datos editados:", formValues);

    setIsLoading(true);
    try {
      // Referencia al documento de la mascota en Firestore
      const animalRef = doc(firestore, "reports", formValues.id.toString());

      // Actualizar los datos en Firestore
      await updateDoc(animalRef, {
        ...formValues,
        images: uploadedImages.length > 0 ? uploadedImages : formValues.images, // Asegura que las imágenes se actualicen si es necesario
      });

      console.log("Información de la mascota actualizada correctamente");
      setOpenSnack(true); // Muestra el Snackbar
    } catch (error) {
      console.error("Error al actualizar la información de la mascota:", error);
    } finally {
      setIsLoading(false);
      onClose(); // Cierra el modal
    }
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

  async function deleteImage(publicId: string) {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      setUploadedImages(uploadedImages.filter((e) => e != publicId));
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }

  console.log(formValues)
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
            <CldUploadWidget
              signatureEndpoint="/api/upload"
              onSuccess={(results) => {
                if (
                  results?.info &&
                  typeof results.info !== "string" &&
                  "public_id" in results.info
                ) {
                  const newImage = results.info.public_id;
                  setUploadedImages((prev) => [...prev, newImage]);
                  setFormValues((prev) => ({
                    ...prev,
                    images: [...prev.images, newImage],
                  }));
                }
              }}
              options={{
                maxFiles: 5,
                resourceType: "image",
                showAdvancedOptions: true,
              }}
            >
              {({ open, isLoading }) => {
                return (
                  <>
                    {isLoading ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        width="100%"
                        marginTop={3}
                      >
                        <CircularProgress size={30} />
                      </Box>
                    ) : (
                      <Box textAlign="center">
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          justifyContent="center"
                          gap={2}
                        >
                          {uploadedImages?.map((publicId) => (
                            <Box key={publicId} position="relative">
                              <img
                                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`}
                                alt={`Uploaded ${publicId}`}
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  backgroundColor: "rgba(255, 0, 0, 0.7)",
                                  color: "white",
                                }}
                                onClick={() => {
                                  deleteImage(publicId);
                                  setFormValues((prev) => ({
                                    ...prev,
                                    images: prev.images.filter(
                                      (img) => img !== publicId
                                    ),
                                  }));
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                        <Button
                          component="label"
                          variant="contained"
                          sx={{
                            width: "100%",
                            padding: "12.5px 14px",
                            textTransform: "none",
                          }}
                          onClick={() => {
                            open();
                          }}
                        >
                          {showPreviousImages
                            ? "Cargar imágenes"
                            : "Añadir más imágenes"}
                        </Button>
                      </Box>
                    )}
                  </>
                );
              }}
            </CldUploadWidget>

            <TextField
              label="Nombre"
              name="petName"
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
              name="foundLocation"
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
