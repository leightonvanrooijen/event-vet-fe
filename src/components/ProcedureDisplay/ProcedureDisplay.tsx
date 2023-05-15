import { useProcedureQuery } from "../../api/useProcedureQuery";
import { useMutation } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { post } from "../../utils/fetch/post";
import { useForm } from "react-hook-form";
import { ConsumedGoodsDisplay } from "./ConsumedGoodsDisplay";
import { ConsumeGoodSelector } from "./ConsumeGoodSelector";
import { ProcedureStatus } from "./ProcedureStatus";
import { ErrorDisplay } from "../common/Error/Error";

type FormData = {
  id: { id: string; label: string };
  quantity: number;
};

export const ProcedureDisplay = ({ id }: { id: string }) => {
  const { control, handleSubmit } = useForm<FormData>();
  const { data, error } = useProcedureQuery(id);

  const consumeGoodMutation = useMutation({
    mutationFn: (formData: FormData) =>
      post(`/procedure/consumeGood`, {
        id,
        goodId: formData.id.id,
        quantity: formData.quantity,
        expectedVersion: data?.version ?? 0,
      }),
  });

  const onSubmit = (data: FormData) => {
    consumeGoodMutation.mutate(data);
  };

  return (
    <Paper style={{ padding: "0.75rem", height: "700px" }}>
      {data && (
        <div>
          <ProcedureStatus procedure={data} />
          <ConsumeGoodSelector
            onSubmit={handleSubmit(onSubmit)}
            control={control}
          />
          <ConsumedGoodsDisplay procedure={data} />
        </div>
      )}
      {error && <ErrorDisplay message={"Could not load the Procedure"} />}
    </Paper>
  );
};
