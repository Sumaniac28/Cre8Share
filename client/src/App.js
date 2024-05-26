import { Routes,Route, BrowserRouter } from "react-router-dom";
import CreatorDashboard from "./Pages/CreatorDashboard/CreatorDashboard";
import Home from "./Pages/Home";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator/*" element={<CreatorDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
