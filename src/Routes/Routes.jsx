import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/MainPages/Login";
import SignUp from "../Pages/MainPages/SignUp";
import LandingPage from "../Pages/MainPages/LandingPage";
import VerifyEmail from "../Pages/UserPages/VerifyEmail";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../Pages/UserPages/Home";

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
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

export default router;
