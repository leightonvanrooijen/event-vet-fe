import { useState } from "react";
import { CreateProcedure } from "../components/CreateProcedure";
import { ProceduresList } from "../components/ProceduresList";
import { ProcedureDisplay } from "../components/ProcedureDisplay/ProcedureDisplay";
import Grid2 from "@mui/material/Unstable_Grid2";

export const ProcedureScreen = () => {
  const [id, setId] = useState<string>("");

  return (
    <Grid2 spacing={2} container>
      <Grid2 xs={2}>
        <ProceduresList setId={setId} />
      </Grid2>
      <Grid2 xs={4}>
        <CreateProcedure setId={setId} />
      </Grid2>
      <Grid2 xs={6}>{id && <ProcedureDisplay id={id} />}</Grid2>
    </Grid2>
  );
};
