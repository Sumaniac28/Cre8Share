import { Routes, Route, BrowserRouter } from "react-router-dom";
import CreatorDashboard from "./Pages/CreatorDashboard/CreatorDashboard";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import Home from "./Pages/HomePage/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/creator/*" element={<CreatorDashboard />} />
          <Route path="/user/*" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
