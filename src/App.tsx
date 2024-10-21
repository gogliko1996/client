import React from "react";
import { AppRouter } from "./routes/app";
import useTokenRefresh from "./hooks/useTokenRefresh";

const App: React.FC = () => {
  useTokenRefresh();

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
