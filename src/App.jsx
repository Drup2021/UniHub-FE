import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { changeScrollDirection } from "./store/scrollDirection/scrollDirectionSlice";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getNewAccessToken } from "./store/auth/authThunks";
import { setUser } from "./store/auth/authSlice";
import Error404 from "./pages/Error404/Error404";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Loading from "./pages/Loading/Loading";
import Forum from "./pages/Forum/Forum";
import Profile from "./pages/Profile/Profile";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import ChatBot from "./pages/Chatbot/Chatbot";
import EventsGallery from "./components/Events/Events";
import ViewQuestion from "./components/ViewQuestion/ViewQuestion";
import FrontPage from "./pages/FrontPage/FrontPage";
import MapSearch from "./components/Maps/Map";
import HomePage from "./pages/HomePage/HomePage";
import EventForm from "./components/Add_events/Add_events";

const App = () => {
  const { scrollY } = useScroll();
  const dispatch = useDispatch();
  const { scrollDirection } = useSelector((state) => state.scrollDirection);

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - scrollY.getPrevious();
    if (scrollDirection == "up" && diff > 0) {
      dispatch(changeScrollDirection({ scrollDirection: "down" }));
    } else if (scrollDirection == "down" && diff < 0) {
      dispatch(changeScrollDirection({ scrollDirection: "up" }));
    }
  });

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Persistant login
  //rehydrate
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(getNewAccessToken()).then(() => {});
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  return (
    <motion.div className="relative w-full">
      <Navbar />
      <Routes>
        {isAuthenticated ? (
          <Route index element={<HomePage />}></Route>
        ) : (
          <Route index element={<FrontPage />}></Route>
        )}

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>

        {!user?.isVerified && (
          <Route path="/verifyEmail" element={<VerifyEmail />}></Route>
        )}

        {isAuthenticated && (
          <>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/deleteAccount" element={<DeleteAccount />}></Route>
            <Route path="/add-question" element={<AddQuestion />}></Route>
            <Route path="/chatbot" element={<ChatBot />}></Route>
            <Route path="/events" element={<EventsGallery />}></Route>
            <Route path="/question" element={<ViewQuestion />}></Route>
            <Route path="/maps" element={<MapSearch />}></Route>
            {user.role === "coordinator" && (
              <Route path="/addEvent" element={<EventForm />}></Route>
            )}
          </>
        )}
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </motion.div>
  );
};

export default App;
