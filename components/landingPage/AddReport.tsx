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
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  images: string[];
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

export default function AddReport() {
  const [formData, setFormData] = useState<FormDataReport>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

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

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      setOpen(true);
      setLoading(false);
      setFormData(initialFormData);
    }, 2000);
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

  return (
    <Box
      id="report"
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: "url('/assets/addReport.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: { xs: 10, md: 8, lg: "17em" },
        paddingLeft: {
          xs: "1em",
          sm: "5em",
          md: "7.5em",
          lg: "15em",
        },
        paddingRight: {
          xs: "1em",
          sm: "5em",
          md: "7.5em",
          lg: "15em",
        },
      }}
    >
      <Box
        sx={{
          width: "100%", // Ocupa todo el ancho disponible
          maxWidth: 700,
          backgroundColor: "var(--primary-color)",
          padding: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Reportar mascota
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--primary-color)",
            padding: 6,
            borderRadius: 4,
          }}
        >
          {/* Selector del tipo de reporte */}
          <FormControl margin="normal" onSubmit={handleSubmit}>
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

          {/* Subir imágenes */}
          <Box marginTop={2} textAlign="center">
            <Button
              variant="contained"
              component="label"
              color="primary"
              sx={{ mb: 2 }}
            >
              Subir fotos de la mascota
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </Button>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              marginTop={1}
            >
              {formData.images.map((image, index) => (
                <Box key={index} position="relative">
                  <CardMedia
                    component="img"
                    src={image}
                    alt={`Uploaded ${index}`}
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
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

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
        </Box>
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
    </Box>
  );
}
