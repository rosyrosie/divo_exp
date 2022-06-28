import Login from "@pages/Login"
import Layout from "@layouts/Layout";
import { RouteObject } from "react-router-dom";
import Container from "@layouts/Container";
import Home from "@pages/Home";
import HotTrend from "@pages/HotTrend";
import InterestData from "@pages/InterestData";
import FranchiseRank from "@pages/FranchiseRank";
import AreaDatalab from "@pages/AreaDatalab";

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
    path: '/interest-data',
    element: <InterestData />
  },
  {
    path: '/frch-rank',
    element: <FranchiseRank />
  },
  {
    path: '/area-corr',
    element: <AreaDatalab />
  },
  {
    path: '/bid=:corpId',
    element: <Layout />,
    children: [
      { path: '/bid=:corpId/:dataId', element: <Container /> },
    ]
  },
];

