import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../App";
import axios from "axios";

export type ProcedureStatuses = "pending" | "inProgress" | "finished";
export type Procedure = {
  id: string;
  name: string;
  animalId: string;
  consumedGoods: { goodId: string; quantity: number; name: string }[];
  status: ProcedureStatuses;
  version: number;
};

export const useProcedureQuery = (id: string, subscribe: Boolean = true) => {
  const queryClient = useQueryClient();

  // subscribe to procedure updates
  useEffect(() => {
    if (!subscribe) return;

    const onProcedureUpdated = (id: any) => {
      queryClient.invalidateQueries(["procedure", id]);
    };

    socket.on("procedure updated", onProcedureUpdated);

    return () => {
      socket.off("procedure updated", onProcedureUpdated);
    };
  }, [id, subscribe, queryClient]);

  return useQuery<Procedure, { response: { data: { error: string } } }>({
    queryKey: ["procedure", id],
    queryFn: async () => {
      const res = await axios.get<Procedure>(
        `http://localhost:4000/procedure/${id}`
      );
      return res.data;
    },
  });
};
