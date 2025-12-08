import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Router";
import { CircularProgress } from "@mui/material";
import "./styles/style.scss";
function App() {
  return (
    <div className="app">
      <Suspense fallback={<CircularProgress color="success" />}>
        <RouterProvider router={routes} />
      </Suspense>
    </div>
  );
}

export default App;
