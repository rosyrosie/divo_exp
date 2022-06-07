import Home from "@pages/Home";
import Login from "@pages/Login"
import Layout from "@layouts/Layout";
import { RouteObject } from "react-router-dom";
import Review from "@pages/Review";
import SalesQty from "@pages/SalesQty";

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
    path: '/bid=:corpId',
    element: <Layout />,
    children: [
      { path: '/bid=:corpId/review-blog', element: <Review type="blog" /> },
      { path: '/bid=:corpId/review-place', element: <Review type="place" />},
      { path: '/bid=:corpId/sales-qty', element: <SalesQty /> }
    ]
  }
];

