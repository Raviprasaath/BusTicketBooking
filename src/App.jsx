import { useState } from 'react'
import LoginPage from './Components/LoginPage'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './Components/HomePage';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LoginPage />),
    },
    {
      path: "/booking",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "/seat",
      element: (<HomePage />),
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
