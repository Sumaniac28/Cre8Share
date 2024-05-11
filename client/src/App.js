import Home from "./Pages/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import LogIn from "./Pages/LogIn/LogIn";


function App() {
  const router = createBrowserRouter([
   {path: "/", element: <Home/>},
    {path: "/signup", element: <SignUp/>},
    {path: "/login", element: <LogIn/>}
  ])
  return (
   <>
    <RouterProvider router={router}/>
   </>
  );
}

export default App;
