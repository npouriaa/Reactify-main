import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/MainPages/Login";
import SignUp from "../Pages/MainPages/SignUp";
import LandingPage from "../Pages/MainPages/LandingPage";
import VerifyEmail from "../Pages/UserPages/VerifyEmail";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../Pages/UserPages/Home";
import UserMainLayout from "../Pages/UserPages/UserMainLayout";
import UserProfile from "../Pages/UserPages/UserProfile";
import UserChats from "../Pages/UserPages/UserChats";

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
    path: ":username",
    element: (
      <ProtectedRoute>
        <UserMainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "chats",
        element: <UserChats />,
      },
    ],
  },
]);

export default router;
