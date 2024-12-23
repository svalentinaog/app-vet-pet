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
import {
  InputSelectFieldReport,
  InputTextFieldDescription,
  InputTextFieldReport,
  MainButton,
} from "@/styles/mui";

interface FormDataReport {
  reportType: string;
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
  reportType: "",
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
        paddingBottom: { xs: 10, md: 8, lg: "15em" },
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
          width: "100%",
          maxWidth: { xs: "100%", md: 700 },
          backgroundColor: "var(--primary-color)",
          padding: { xs: "4em 2em 4em 2em", md: "6em 4em 6em 4em" },
          borderRadius: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            align="center"
            marginBottom={{ xs: 5, md: 6 }}
            color="white"
          >
            Realizar reporte
          </Typography>

          <Grid container spacing={{ xs: 4, md: 2 }}>
            <Grid item xs={12} md={6}>
              <InputTextFieldReport
                label="Tu nombre"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputTextFieldReport
                label="Número telefonico"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={{ xs: 4, md: 2 }}
            marginTop={{ xs: "0", md: 2 }}
          >
            <Grid item xs={12} md={6}>
              {/* Selector del tipo de reporte */}
              <InputSelectFieldReport onSubmit={handleSubmit}>
                <InputLabel>Tipo de reporte</InputLabel>
                <Select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                >
                  <MenuItem value="lost">He perdido una mascota</MenuItem>
                  <MenuItem value="found">He encontrado una mascota</MenuItem>
                </Select>
              </InputSelectFieldReport>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Selector de Animal */}
              <InputSelectFieldReport>
                <InputLabel>Tipo de mascota</InputLabel>
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
              </InputSelectFieldReport>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 4, md: 2 }}
            marginTop={2}
            sx={{ display: "none" }}
          >
            <Grid item xs={12} md={6}>
              <InputSelectFieldReport>
                <InputLabel>Estado de la mascota</InputLabel>
                <Select
                  name="status"
                  value={formData.status || "Perdido"}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Perdido">Perdido</MenuItem>
                  <MenuItem value="Encontrado">Encontrado</MenuItem>
                </Select>
              </InputSelectFieldReport>
            </Grid>
          </Grid>
          {/* 📃 Campos específicos según el tipo de reporte */}

          {/* PERDIDO */}
          {formData.reportType === "lost" && (
            <Box>
              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0px", md: 2 }}
              >
                {/* Nombre del animal */}
                <Grid item xs={12} md={6}>
                  <InputTextFieldReport
                    label="Nombre de la mascota"
                    name="petName"
                    value={formData.petName || ""}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Edad aproximada de este */}
                <Grid item xs={12} md={6}>
                  <InputSelectFieldReport>
                    <InputLabel id="demo-simple-select-label">
                      Edad aproximada
                    </InputLabel>
                    <Select
                      label="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Menor de 3 años">
                        Menor de 3 años
                      </MenuItem>
                      <MenuItem value="Mayor a 3 años y menor que 6 años">
                        Mayor a 3 años y menor que 6 años
                      </MenuItem>
                      <MenuItem value="Mayor de 6 años">
                        Mayor de 6 años
                      </MenuItem>
                    </Select>
                  </InputSelectFieldReport>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0px", md: 2 }}
              >
                {/* Ultimo lugar vista */}
                <Grid item xs={12} md={6}>
                  <InputTextFieldReport
                    label="Último lugar donde fue vista"
                    name="foundLocation"
                    value={formData.foundLocation || ""}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Recompensa */}
                <Grid item xs={12} md={6}>
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
                    <InputTextFieldReport
                      label="Valor recompensa (opcional)"
                      name="reward"
                      value={formData.reward || ""}
                      onChange={handleChange}
                      placeholder="Ingrese una cantidad en dinero"
                      inputProps={{
                        inputMode: "numeric",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0", md: 2 }}
                marginBottom={4}
              >
                {/* Descripcion general del animal */}
                <Grid item xs={12} md={12}>
                  <InputTextFieldDescription
                    label="Descripción general"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={1}
                    required
                  />
                </Grid>
              </Grid>
              {/* Cargar imágenes */}
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  component="label"
                  color="primary"
                  sx={{
                    width: "100%",
                    padding: "14.5px 14px",
                    borderRadius: "100px",
                    border: "1px solid",
                    textTransform: "none",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  Cargar imágenes
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
                  marginTop={2}
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

              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  marginTop={2}
                >
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <Box marginTop={2} textAlign="center">
                  <MainButton type="submit">Enviar reporte</MainButton>
                </Box>
              )}
            </Box>
          )}
          {/* END */}

          {/* ENCONTRADO */}
          {formData.reportType === "found" && (
            <>
              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0px", md: 2 }}
              >
                {/* Estado del animal */}
                <Grid item xs={12} md={12}>
                  <InputSelectFieldReport>
                    <InputLabel>Estado del animal</InputLabel>
                    <Select
                      name="status"
                      value={formData.status || ""}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Sin hogar">Sin hogar</MenuItem>
                      <MenuItem value="Encontrado">
                        Encontrado, tiene hogar
                      </MenuItem>
                    </Select>
                  </InputSelectFieldReport>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0px", md: 2 }}
              >
                {/* Ubicacion donde fue encontrada */}
                <Grid item xs={12} md={12}>
                  <InputTextFieldReport
                    label="Ubicación donde encontraste la mascota"
                    name="foundLocation"
                    value={formData.foundLocation || ""}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={{ xs: 4, md: 2 }}
                marginTop={{ xs: "0", md: 2 }}
                marginBottom={4}
              >
                {/* Descripcion general */}
                <Grid item xs={12} md={12}>
                  <InputTextFieldDescription
                    label="Descripción general"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={1}
                    required
                  />
                </Grid>
              </Grid>
              {/* Cargar imágenes */}
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  component="label"
                  color="primary"
                  sx={{
                    width: "100%",
                    padding: "14.5px 14px",
                    borderRadius: "100px",
                    border: "1px solid",
                    textTransform: "none",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  Cargar imágenes
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
                  marginTop={{ xs: "0", md: 2 }}
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

              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  marginTop={{ xs: 4, md: 2 }}
                >
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <Box marginTop={{ xs: 4, md: 2 }} textAlign="center">
                  <MainButton type="submit">Enviar reporte</MainButton>
                </Box>
              )}
            </>
          )}
          {/* END */}
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
