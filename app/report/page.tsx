"use client";
import React, { ChangeEvent } from "react";
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
  MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { fontWeight } from "@mui/system";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#ffff",
          },
          "& .MuiInputLabel-outlined": {
            color: "#ffff",
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
            color: "#ffff",
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
          color: "#ffff",
          "&.Mui-focused": {
            color: "#ffff",
            fontWeight:"bold",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#ffff", 
          },
          "& .MuiInputLabel-outlined": {
            color: "#ffff",
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
            color: "#ffff", 
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
  const [images, setImages] = React.useState<string[]>([]);

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

  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        color: "#ffff",
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
          backgroundColor: "#25273e",
          paddingX: 20,
          paddingY: 5,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          width: "70%",
          height: "auto",
        }}
      >
        <Link href={"/"}>👉Volver al home</Link>

        <h1>Reporte de mascota perdida o abandonada.</h1>
        <p>
          Por favor, complete el formulario para reportar la mascota perdida o
          abandonada. Los datos proporcionados en este formulario serán
          utilizados únicamente para reportar el problema y podrán ser
          utilizados posteriormente por el equipo de la veterinaria para atender
          el caso.
        </p>

        {/* Formulario */}
        <Box
          component="form"
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
              required
            />
            <TextField
              fullWidth
              label="Teléfono de contacto"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Ubicación de la mascota"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Descripción de la mascota (color, tamaño, raza, etc.)"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Edad de la mascota</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="age"
                onChange={handleChange}
                style={{ color: "#fff" }}
              >
                <MenuItem value={3}>Menor de 3 años</MenuItem>
                <MenuItem value={5}>Mayor que 3 y menor que 5 años</MenuItem>
                <MenuItem value={6}>Mayor que 5 años</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
          <Box>
            <Button
              variant="contained"
              component="label"
              sx={{
                alignSelf: "center",
                backgroundColor: "#ee3a57",
                padding: "10px 20px",
                width: "300px",
              }}
            >
              Subir imagenes de la mascota
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                hidden
              />
            </Button>

            <Box display="flex" gap={2} flexWrap="wrap" sx={{ marginTop: 2 }}>
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
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="perdida"
            name="radio-buttons-group"
            sx={{
              "& .MuiSvgIcon-root": {
                color: "#ee3a57",
              },
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "center",
              backgroundColor: "#ee3a57",
              padding: "10px 20px",
              width: "300px",
            }}
          >
            Enviar reporte
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
