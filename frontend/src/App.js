import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/indexLogin.js";
import { Profile } from "./pages/profile/indexProfile.js";
import { Home } from "./pages/home/indexHome.js";
import { LoggedInRoutes } from "./routes/LoggedInRoutes.js";
import { NotLoggedInRoutes} from './routes/NotLoggedInRoutes.js';
import { useSelector } from "react-redux";
import { Activate } from "./pages/home/activate";
import { Reset } from "./pages/reset";
import { CreatePostPopup } from "./components/createPostPopup";

import { useEffect, useReducer, useState } from "react";
import axios from "axios";


function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}


function App() {

  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}

      <Routes>

        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home setVisible={setVisible} posts={posts} />} />
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
