import { post } from "../../utils/fetch/post";
import { Procedure } from "../../api/useProcedureQuery";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Typography } from "@mui/material";

const NEXT_STATUS: Record<string, "Begin" | "Complete" | ""> = {
  pending: "Begin",
  inProgress: "Complete",
  finished: "",
};
type Statuses = "pending" | "inProgress";
export const fetchChangeStatus = (
  id: string,
  expectedVersion: number,
  currentStatus: Statuses
) => {
  if (currentStatus === "pending") {
    return post<Procedure>(`/procedure/begin`, {
      id,
      expectedVersion,
    });
  }

  return post<Procedure>(`/procedure/finish`, {
    id,
    expectedVersion,
  });
};

export const ProcedureStatus = ({ procedure }: { procedure: Procedure }) => {
  const [nextStatus, setNextStatus] = useState<"Begin" | "Complete" | "">("");

  useEffect(() => {
    if (procedure) {
      setNextStatus(NEXT_STATUS[procedure.status]);
    }
  }, [procedure]);

  const changeStatusMutation = useMutation({
    mutationFn: () =>
      fetchChangeStatus(
        procedure.id,
        procedure.version,
        procedure.status as Statuses
      ),
  });

  return (
    <div style={{ display: "flex" }}>
      <Typography variant={"h5"}>
        {procedure.name} - {procedure.status}
      </Typography>
      {procedure.status !== "finished" && (
        <Button
          style={{ marginLeft: "auto" }}
          type="submit"
          variant={"contained"}
          disabled={changeStatusMutation.isLoading}
          onClick={() => changeStatusMutation.mutate()}
        >
          {nextStatus}
        </Button>
      )}
    </div>
  );
};
