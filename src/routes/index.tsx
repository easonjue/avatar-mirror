import { createHashRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import HomePage from "@/pages/home";
import MirrorPage from "@/pages/mirror";
import AuthPage from "../pages/auth";

export const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "mirror", element: <MirrorPage /> },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);
