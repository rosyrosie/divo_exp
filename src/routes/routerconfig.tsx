import BrandHome from "@pages/BrandHome";
import Login from "@pages/Login"
import Layout from "@layouts/Layout";
import { RouteObject } from "react-router-dom";
import Container from "@layouts/Container";
import Home from "@pages/Home";
import HotTrend from "@pages/HotTrend";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/hot-trend',
    element: <HotTrend />
  },
  {
    path: '/bid=:corpId',
    element: <Layout />,
    children: [
      { path: '/bid=:corpId/:dataId', element: <Container /> },
    ]
  },
];

