import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/indexLogin.js";
import { Profile } from "./pages/profile/indexProfile.js";
import { Home } from "./pages/home/indexHome.js";
import { LoggedInRoutes } from "./routes/LoggedInRoutes.js";
import { NotLoggedInRoutes} from './routes/NotLoggedInRoutes.js';
import { useSelector } from "react-redux";
import { Activate } from "./pages/home/activate";
import { Reset } from "./pages/reset";

function App() {

  const { user } = useSelector((state) => ({ ...state }));
  
  return (
    <div>
      <Routes>

        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/reset" element={<Reset />} />

      </Routes>
    </div>
  );
};

export default App;
