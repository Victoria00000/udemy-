import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/indexLogin.js";
import { Profile } from "./pages/profile/indexProfile.js";
import { Home } from "./pages/home/indexHome.js";
import { LoggedInRoutes } from "./routes/LoggedInRoutes.js";
import { NotLoggedInRoutes} from './routes/NotLoggedInRoutes.js';
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
