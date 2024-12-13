"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Snackbar,
  SnackbarCloseReason,
  Alert,
  Skeleton,
  Stack,
  CircularProgress,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
//import { formDataReport } from "../../interfaces/typesReport";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "var(--text-color)",
          },
          "& .MuiInputLabel-outlined": {
            color: "var(--text-color)",
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffff",
          },
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "var(--text-color)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#ffff",
            },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
          "&.Mui-focused": {
            color: "var(--text-color)",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "var(--text-color)",
          },
          "& .MuiInputLabel-outlined": {
            color: "var(--text-color)",
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffff",
          },
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
          },
          "&.MuiInputLabel-outlined.Mui-focused": {
            color: "var(--text-color)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#ffff",
            },
        },
      },
    },
  },
});

export default function Report() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successReport, setSuccessReport] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  // Handler para el cambio en el texto
  const handleTextChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  console.log(name, phone, location, description, age, status);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuccessReport(true);
      setOpen(true);
      setLoading(false);

      //Restablcer Campos
      setName("");
      setPhone("");
      setLocation("");
      setDescription("");
      setAge("");
      setImages([]);
      setStatus("");
    }, 2000);
    const formData = {
      id: crypto.randomUUID().toString(),
      name,
      phone,
      location,
      description,
      age,
      status,
      images,
    };
    console.log(formData);
  };

  return (
    <Box
      sx={{
        color: "var(--text-color)",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "var(--primary-color)",
          paddingX: 20,
          paddingY: 5,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "70%",
          height: "auto",
        }}
      >
        <Link href={"/"}>👉Volver al home</Link>

        <h1>Reporte de mascota perdida o abandonada.</h1>
        <p>
          Por favor, complete el formulario para reportar la mascota perdida o
          abandonada. Los datos proporcionados en este formulario serán
          utilizados únicamente para reportar el problema.
        </p>

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              label="Nombre del reportante"
              variant="outlined"
              value={name}
              onChange={handleTextChange(setName)}
              required
            />
            <TextField
              fullWidth
              label="Teléfono de contacto"
              variant="outlined"
              value={phone}
              onChange={handleTextChange(setPhone)}
              required
            />
            <TextField
              fullWidth
              label="Ubicación de la mascota"
              variant="outlined"
              value={location}
              onChange={handleTextChange(setLocation)}
              required
            />
            <TextField
              fullWidth
              label="Descripción de la mascota (color, tamaño, raza, etc.)"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={handleTextChange(setDescription)}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Edad de la mascota
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="age"
                onChange={handleChange}
                style={{ color: "var(--text-color)" }}
                required
              >
                <MenuItem value="Menor de 3 años">Menor de 3 años</MenuItem>
                <MenuItem value="Mayor a 3 años y menor que 6 años">
                  Mayor a 3 años y menor que 6 años
                </MenuItem>
                <MenuItem value="Mayor de 6 años">Mayor de 6 años</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                alignSelf: "center",
                backgroundColor: "#ee3a57",
                padding: "10px 20px",
                width: "300px",
                marginBottom: "20px",
              }}
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
              gap={2}
              flexWrap="wrap"
              sx={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              {images.map((image, index) => (
                <Box key={index} position="relative" width={100} height={100}>
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
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
                      "&:hover": { backgroundColor: "rgba(255, 0, 0, 1)" },
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
          <p>¿Las mascota esta perdida o abandonada?</p>
          <RadioGroup
            aria-labelledby="status"
            defaultValue="perdida"
            name="status"
            value={status || ""}
            onChange={(event) => setStatus(event.target.value)}
            sx={{
              "& .MuiSvgIcon-root": {
                color: "var(--secondary-color)",
              },
              margin: 0,
            }}
          >
            <FormControlLabel
              value="perdida"
              color="secondary"
              control={<Radio />}
              label="Perdida"
            />
            <FormControlLabel
              value="abandonada"
              control={<Radio />}
              label="Abandonada"
            />
          </RadioGroup>
          {loading ? 
            <CircularProgress size={45} sx={{
              "&.MuiCircularProgress-root":{
               color:"var(--secondary-color)" 
              }
            }} />
            :
            <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "center",
              backgroundColor: "var(--secondary-color)",
              padding: "10px 20px",
              width: "300px",
            }}
          >
            Enviar reporte
          </Button>
          }
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              variant="filled"
              severity={successReport ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              Reporte enviado correctamente. Gracias por tu contribución.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}
