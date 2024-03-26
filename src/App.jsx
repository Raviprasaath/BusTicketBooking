import LoginPage from './Components/LoginPage'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Components/HomePage';
import BookingPage from './Components/BookingPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LoginPage />),
    },
    {
      path: "/booking",
      element: <BookingPage />,
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
