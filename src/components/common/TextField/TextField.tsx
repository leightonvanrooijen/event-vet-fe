import { FieldError } from "react-hook-form";
import { ChangeEvent } from "react";
import { TextField as MuiTextField } from "@mui/material";

export const TextField = ({
  error,
  helperText,
  label,
  onChange,
}: {
  error?: FieldError;
  label: string;
  helperText?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <MuiTextField
      label={label}
      helperText={error?.message ?? helperText ?? " "}
      error={!!error}
      onChange={onChange}
    />
  );
};
