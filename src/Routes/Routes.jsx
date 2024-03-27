import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/MainPages/Login";
import SignUp from "../Pages/MainPages/SignUp";
import LandingPage from "../Pages/MainPages/LandingPage";
import VerifyEmail from "../Pages/UserPages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

export default router;
