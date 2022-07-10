import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/indexLogin.js";
import { Profile } from "./pages/profile/indexProfile.js";
import { Home } from "./pages/home/indexHome.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
