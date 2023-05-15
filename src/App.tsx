import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { ProcedureScreen } from "./screens/ProcedureScreen";

export const procedureUrl = "http://localhost:4000";
export const socket = io(procedureUrl, {
  transports: ["websocket"],
});

function App() {
  const client = new QueryClient();

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <header className="">
        <QueryClientProvider client={client}>
          <ProcedureScreen />
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
