import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/space-grotesk";
import App from "./App.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import SingleProduct from "./pages/SingleProduct.tsx";
import About from "./pages/About.tsx";
import Cart from "./pages/Cart.tsx";

const browserRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/produtos", element: <Products /> },
          { path: "/produtos/:productId", element: <SingleProduct /> },
          { path: "/carrinho", element: <Cart /> },
          { path: "/sobre", element: <About /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
