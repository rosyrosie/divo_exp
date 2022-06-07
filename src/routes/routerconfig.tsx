import Home from "@pages/Home";
import Login from "@pages/Login"
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
];

