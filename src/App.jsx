import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import { useState } from "react";
import ResultsTable from "./Pages/ResultsTable";
import Chart from "./Pages/Chart";

function App() {
  const [formData, setFormData] = useState({});
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Home formData={formData} setFormData={setFormData} />,
            },
            {
              path: "results",
              element: <ResultsTable formData={formData} />,
            },
            {
              path: "chart",
              element: <Chart />,
            },
          ],
        },

        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
export default App;
