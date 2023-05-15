import { Procedure } from "../../api/useProcedureQuery";
import { Paper, Typography } from "@mui/material";

export const ConsumedGoodsDisplay = ({
  procedure,
}: {
  procedure: Procedure;
}) => {
  return (
    <>
      <Typography variant={"h6"} sx={{ marginTop: 3 }}>
        Consumed Goods
      </Typography>
      {procedure.consumedGoods.map((good) => {
        return (
          <Paper sx={{ display: "flex", marginTop: 2, padding: 2 }}>
            <Typography>{good.name}</Typography>
            <Typography sx={{ marginLeft: "auto" }}>
              Quantity: {good.quantity}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
};
