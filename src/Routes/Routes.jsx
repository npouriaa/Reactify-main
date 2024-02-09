import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import LandingPage from "../Pages/LandingPage";

const pushRoutesIntoArray = (array, pathes, components) => {
  for (let i = 0; i < pathes.length; i++) {
    const routeObject = {
      path: `/${pathes[i]}`,
      element: components[i],
    };
    array.push(routeObject);
  }
};
const pathesArray = ["", "login", "register"];
const componentsArray = [<LandingPage />, <Login />, <Register />];

const routesArray = [];
pushRoutesIntoArray(routesArray, pathesArray, componentsArray);

const router = createBrowserRouter(routesArray);

export default router;
