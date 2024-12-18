"use client";

import { SxProps } from "@mui/material";
import { InputTextField } from "../styles/mui";

interface ITextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  sx?: SxProps;
}

export default function CustomTextField({
  label,
  value,
  onChange,
  type = "text",
}: ITextFieldProps) {
  return (
    <InputTextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
