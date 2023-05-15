import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { procedureUrl } from "../App";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "./common/TextField/TextField";

type FormData = {
  name: string;
  animalId: string;
};
export const CreateProcedure = ({ setId }: { setId: Dispatch<string> }) => {
  const { control, handleSubmit } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (procedure: { name: string; animalId: string }) => {
      return axios.post(`${procedureUrl}/procedure/create`, procedure);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  // update selected ID on creation
  useEffect(() => {
    if (mutation.data) {
      setId(mutation.data.data.id);
    }
  }, [mutation.data, setId]);

  return (
    <Paper style={{ padding: "0.75rem" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          margin: "0rem 1rem",
        }}
      >
        <Typography variant={"h5"}>Create Procedure</Typography>
        <Controller
          rules={{
            required: { value: true, message: "The filed must be filled in" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              label={"Procedure Name"}
              error={fieldState?.error}
              onChange={field.onChange}
            />
          )}
          name={"name"}
          control={control}
        />
        <Controller
          rules={{
            required: { value: true, message: "The filed must be filled in" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              label={"Animal ID"}
              error={fieldState?.error}
              onChange={field.onChange}
            />
          )}
          name={"animalId"}
          control={control}
        />
        <Button type="submit">Create</Button>
      </form>
    </Paper>
  );
};
