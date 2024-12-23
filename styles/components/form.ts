import styled from "@emotion/styled";
import { FormControl, TextField, Box, Button, CardMedia } from "@mui/material";
import { Grid } from "@mui/system";

// Formulario

export const Fields = styled(Box)`
  font-family: var(--font-poppins);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  gap: 20px;

  height: 100%;

  @media (min-width: 600px) {
    height: auto;
  }

  @media (min-width: 960px) {
    height: auto;
  }
`;

export const FormContainer = styled(Grid)`
  color: var(--title-color);
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px 16px 0;

  @media (max-width: 600px) {
    justify-content: center;
    min-height: 90vh;
    gap: 48px;
  }

  @media (min-width: 600px) {
    justify-content: center;
    min-height: 100vh;
    gap: 48px;
  }
`;

export const FormContainerTwo = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  @media (max-width: 600px) {
    justify-content: space-between;
    gap: 0;
  }

  @media (min-width: 600px) {
    justify-content: center;
    min-height: 100vh;
    gap: 48px;
  }
`;

// Entrada de texto 1
export const InputTextField = styled(TextField)`
  font-family: var(--font-poppins);
  width: 100%;

  & .MuiOutlinedInput-root {
    border-radius: 0px;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: none;
    border-bottom: 2px solid !important;
    border-color: var(--primary-color);
  }

  & .MuiInputLabel-root {
    color: var(--text-color);
  }

  & .MuiInputBase-input {
    background-color: var(--bg-color);
    color: var(--title-color);
  }
`;

// Entrada de texto para contraseñas
export const InputPassField = styled(FormControl)`
  font-family: var(--font-poppins);
  border-radius: 100px;

  & .MuiOutlinedInput-root {
    border-radius: 0px;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: none;
    border-bottom: 2px solid !important;
    border-color: var(--primary-color);
  }

  & .MuiInputLabel-root {
    color: var(--text-color);
  }

  & .MuiInputBase-input {
    background-color: var(--bg-color);
    color: var(--title-color);
  }
`;

export const FormActions = styled(Box)`
font-family: var(--font-poppins);
  color: var(--title-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  max-width: 400px;
  gap: 16px;

  a {
    color: var(--secondary-color);
    text-decoration: none;
  }

  @media (max-width: 600px) {
    justify-content: flex-end
`;

export const BtnGoogle = styled(Button)`
  min-width: 50px;
  min-height: 50px;
  width: 50px;
  height: 50px;
  padding: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.135);
  border-radius: 50px;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0.075);
    cursor: pointer;
  }
`;

// Formulario de reportes

// Entrada de texto 2 🐾📌🐈
const InputBase = styled(TextField)`
  font-family: var(--font-poppins);
  width: 100%;
  border-radius: 100px;

  & .MuiOutlinedInput-root {
    border-radius: 100px;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: none;
    border-radius: 100px;
  }

  & .MuiInputLabel-root {
    color: var(--subprimary-color);
  }

  & .MuiInputLabel-root.MuiInputLabel-shrink {
    color: var(--light-color);
    transform: translate(14px, -25px);
  }

  & .MuiInputBase-input {
    border-radius: 100px;
    background-color: var(--light-color);
  }
`;

export const InputTextFieldReport = styled(InputBase)`
  & .MuiInputBase-input {
    color: var(--title-color);
  }
`;

export const InputSelectFieldReport = styled(FormControl)`
  font-family: var(--font-poppins);
  width: 100%;
  border-radius: 100px;

  & .MuiOutlinedInput-root {
    border-radius: 100px;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: none;
    border-radius: 100px;
  }

  & .MuiInputLabel-root {
    color: var(--subprimary-color);
  }

  & .MuiInputLabel-root.MuiInputLabel-shrink {
    color: var(--light-color);
    transform: translate(14px, -25px);
  }

  & .MuiSelect-select {
    border-radius: 100px;
    background-color: var(--light-color);
    color: var(--title-color);
  }
`;

export const InputTextFieldDescription = styled(InputBase)`
  & .MuiInputBase-input {
    line-height: 1.5;
    color: var(--title-color);
  }

  & .MuiInputBase-input.MuiOutlinedInput-multiline {
    min-height: 56px;
  }
`;

// 🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈
