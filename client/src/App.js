import CreatorDashboard from "./Pages/CreatorDashboard/CreatorDashboard";
import Home from "./Pages/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserNavbar from "./Components/UserNavbar/UserNavbar";
function App() {
  const router = createBrowserRouter([
   {path: "/", element: <Home/>},
   {path:'/CreatorDashboard', element:<CreatorDashboard/>},
   {path:'/UserDashboard',element:<UserNavbar/>,children:[
    {index:true,element:<UserDashboard/>}
   ]}
  ])
  return (
   <>
    <RouterProvider router={router}/>
   </>
  );
}

export default App;
