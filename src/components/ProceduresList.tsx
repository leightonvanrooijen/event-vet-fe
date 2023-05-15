import axios, { AxiosError, AxiosResponse } from "axios";
import { Procedure } from "../api/useProcedureQuery";
import { procedureUrl, socket } from "../App";
import { Dispatch, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { List, TListItem } from "./common/List/List";

const fetchProcedures = async () => {
  return await axios.get<Procedure[]>(`${procedureUrl}/procedure/all`);
};
export const ProceduresList = ({ setId }: { setId: Dispatch<string> }) => {
  const queryClient = useQueryClient();

  // subscribe to procedure updates
  useEffect(() => {
    const onProcedureUpdated = () => {
      queryClient.invalidateQueries(["procedures"]);
    };

    socket.on("procedure updated", onProcedureUpdated);

    return () => {
      socket.off("procedure updated", onProcedureUpdated);
    };
  }, [queryClient]);

  const { data, error, isInitialLoading } = useQuery({
    queryKey: ["procedures"],
    queryFn: fetchProcedures,
    select: (data): TListItem[] =>
      data?.data?.map((procedure) => ({
        id: procedure.id,
        primaryText: procedure.name,
        secondaryText: procedure.status,
      })),
  });

  return (
    <List
      header={"Procedures"}
      data={data}
      onItemClick={setId}
      isLoading={isInitialLoading}
      errorMessage={error ? "Could not load procedures" : undefined}
    />
  );
};
