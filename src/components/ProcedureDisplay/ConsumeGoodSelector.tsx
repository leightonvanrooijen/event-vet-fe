import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ConsumeGoodSelector = ({
  onSubmit,
  control,
}: {
  onSubmit: any;
  control: any;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ display: "flex", marginTop: 2, padding: ".25rem" }}>
        <Controller
          control={control}
          name={"id"}
          render={({ field }) => (
            <Autocomplete
              {...field}
              onChange={(e, value) => field.onChange(value)}
              options={[
                { label: "Medication", id: "1" },
                { label: "Hat", id: "2" },
                { label: "Treat", id: "3" },
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Goods" />}
            />
          )}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <TextField sx={{ width: 60 }} type={"number"} {...field} />
          )}
          name={"quantity"}
        />
        <Button type={"submit"} sx={{ marginLeft: "auto" }}>
          Consume
        </Button>
      </Paper>
    </form>
  );
};
