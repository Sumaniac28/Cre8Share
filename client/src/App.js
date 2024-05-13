import CreatorDashboard from "./Pages/CreatorDashboard/CreatorDashboard";
import Home from "./Pages/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
   {path: "/", element: <Home/>},
   {path:'/CreatorDashboard', element:<CreatorDashboard/>}
  ])
  return (
   <>
    <RouterProvider router={router}/>
   </>
  );
}

export default App;
