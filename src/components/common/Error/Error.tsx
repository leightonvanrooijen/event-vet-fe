import { Typography } from "@mui/material";

export const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant={"h5"}>{message}</Typography>
    </div>
  );
};
