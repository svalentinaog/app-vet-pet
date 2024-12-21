"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Button,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CldUploadWidget } from "next-cloudinary";

interface FormDataReport {
  reportType: "lost" | "found";
  reporterName: string; // Nombre del reportante
  phone: string; // Número de teléfono del reportante
  petType: string; // Tipo de mascota
  petName?: string; // Nombre de la mascota (para "perdido")
  foundLocation?: string; // Lugar encontrado
  description: string;
  age?: string; // Edad aproximada (solo para "perdido")
  status?: string; // Estado: Sin hogar, Perdido, etc.
  images: Object[];
  reward?: string; //Solo para "perdido"
  dateCreationReport: string; // Fecha de creación del reporte
}

const initialFormData: FormDataReport = {
  reportType: "lost",
  reporterName: "",
  phone: "",
  petType: "",
  petName: "",
  foundLocation: "",
  description: "",
  age: "",
  status: "",
  images: [],
  reward: "",
  dateCreationReport: new Date().toString(),
};

const ReportForm = () => {
  const [formData, setFormData] = useState<FormDataReport>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [showImages, setShowImages] = useState<string[]>([]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    if (name === "reward") {
      // Formatear dinámicamente el campo de recompensa
      const formattedValue = formatCurrency(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/cloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: formData.images[0] }), // Asegúrate de enviar la propiedad "imagePath"
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Imágenes subidas exitosamente:", data.urls); // Usar "urls" ya que el backend devuelve un array
      } else {
        console.error("Error al subir las imágenes:", data.message);
      }
    } catch (error) {
      console.error("Error en el envío de datos:", error);
    } finally {
      setOpen(true);
      setLoading(false);
      setFormData(initialFormData);
      setUploadedImages([]);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formatCurrency = (value: string) => {
    // Remover caracteres no numéricos
    const numericValue = value.replace(/\D/g, "");
    // Formatear con separadores de miles y punto decimal
    return new Intl.NumberFormat("es-CO").format(Number(numericValue));
  };

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  async function deleteImage(publicId: string) {
    try {
      const response = await fetch("/api/sign-image", {
        // Usa la misma ruta que ya tienes
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
      setUploadedImages(uploadedImages.filter((e) => e != publicId)); // Eliminar el archivo seleccionado
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
  console.log(formData);

  return (
    <>
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Reportar mascota
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Selector del tipo de reporte */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de reporte</InputLabel>
            <Select
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
            >
              <MenuItem onClick={handleReset} value="lost">
                He perdido una mascota
              </MenuItem>
              <MenuItem onClick={handleReset} value="found">
                He encontrado una mascota
              </MenuItem>
            </Select>
          </FormControl>
          {/* Campos comunes */}
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre del reportante"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono de contacto"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Mascota</InputLabel>
                <Select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                >
                  <MenuItem value="Perro">Perro</MenuItem>
                  <MenuItem value="Gato">Gato</MenuItem>
                  <MenuItem value="Ave">Ave</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Descripción (color, tamaño, raza, etc.)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          {/* Subir imágenes en CLoudinary*/}
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(results) => {
              const newImage = results?.info?.public_id;
              setUploadedImages((prev) => [...prev, newImage]);
              setFormData((prev) => ({
                ...prev,
                images: [...prev.images, newImage], // Añadir imagen a formData.images
              }));
            }}
            options={{
              maxFiles: 5,
              resourceType: "image",
              showAdvancedOptions: true,
            }}
          >
            {({ open }) => {
              return (
                <>
                  <Box marginTop={2} textAlign="center">
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      sx={{ mb: 2 }}
                      onClick={() => open()}
                    >
                      Subir fotos de la mascota (Cloudinary)
                    </Button>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      justifyContent="center"
                      gap={2}
                      marginTop={1}
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
                              deleteImage(publicId)
                              setFormData((prev) => ({
                                ...prev,
                                images: prev.images.filter((img) => img !== publicId), // Remover imagen de formData.images
                              }));
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </>
              );
            }}
          </CldUploadWidget>

          {/* Campos específicos según el tipo de reporte */}
          {formData.reportType === "lost" && (
            <>
              <TextField
                label="Nombre de la mascota"
                name="petName"
                value={formData.petName || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Edad aproximada de la mascota
                </InputLabel>
                <Select
                  name="age"
                  value={formData.age}
                  label="age"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Menor de 3 años">Menor de 3 años</MenuItem>
                  <MenuItem value="Mayor a 3 años y menor que 6 años">
                    Mayor a 3 años y menor que 6 años
                  </MenuItem>
                  <MenuItem value="Mayor de 6 años">Mayor de 6 años</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel>Estado de la mascota</InputLabel>
                <Select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Perdido">Perdido</MenuItem>
                  <MenuItem value="Encontrado">Encontrado</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Último lugar donde viste a tu mascota"
                name="foundLocation"
                value={formData.foundLocation || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "55%",
                    right: "0%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "text.secondary",
                  }}
                >
                  COP
                </Typography>
                <TextField
                  label="Recompensa (opcional)"
                  name="reward"
                  value={formData.reward || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  placeholder="Ingrese una cantidad en dinero"
                  inputProps={{
                    inputMode: "numeric", // Optimiza el teclado para números en móviles
                  }}
                />
              </Box>
            </>
          )}
          {formData.reportType === "found" && (
            <>
              <FormControl margin="normal" fullWidth>
                <InputLabel>Estado de la mascota</InputLabel>
                <Select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Perdido">Perdido</MenuItem>
                  <MenuItem value="Sin hogar">Sin hogar</MenuItem>
                  <MenuItem value="Encontrado">Encontrado</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Lugar donde encontraste la mascota"
                name="foundLocation"
                value={formData.foundLocation || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </>
          )}
          {/* Botón de envío */}
          {loading ? (
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
            <Box marginTop={3} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ width: "100%" }}
              >
                Enviar reporte
              </Button>
            </Box>
          )}
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ¡Reporte enviado con éxito!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReportForm;
