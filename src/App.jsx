import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
// import StudentData from "./components/StudentData";
import VerifierData from "./pages/VerifierData";
import OutPut from "./pages/OutPut";
import LoginPage from "./pages/LoginPage";
import GetAllDataPage from "./pages/GetAllDataPage";
import Sucess from "./components/Sucess";
import VerifierSubmit from "./pages/VerifierSubmit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "/applicantdata",
      element: <VerifierData />,
    },
    {
      path: "/data",
      element: <OutPut />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/getAllData",
      element: <GetAllDataPage />,
    },
    {
      path: "/getAllData/:id",
      element: <VerifierSubmit />,
    },
    {
      path: "/send",
      element: <Sucess />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
