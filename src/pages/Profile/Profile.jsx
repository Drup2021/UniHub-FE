import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${randomSeed}`;

    const img = new Image();
    img.src = newAvatarUrl;
    img.onload = () => {
      setAvatarUrl(newAvatarUrl);
      setLoading(false);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className="w-full min-h-[100dvh] bg-back flex flex-col md:flex-row py-[10dvh] md:justify-evenly md:items-center ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col justify-center items-center gap-8"
          >
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="size-60 border-4 border-sec rounded-full"
            />
            <div className="grid grid-cols-[1fr,2fr] text-txt px-2">
              <div className="text-pri">Username:</div>
              <div> {user.username}</div>
              <div className="text-pri">Email:</div>
              <div> {user.email}</div>
            </div>

            <div className="flex flex-col gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="py-2 px-6 bg-green-600 rounded-xl"
                onClick={() => navigate("/forgotPassword")}
              >
                Reset Password
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="py-2 px-6 bg-red-600 rounded-xl "
                onClick={() => navigate("/deleteAccount")}
              >
                Delete Account
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Profile;

// import { ToastContainer } from "react-toastify";

// const Profile = () => {
//   return (
//     <>
//       <div className="w-full h-screen bg-back flex items-center justify-center">
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           className="md:w-fit"
//         />
//         <div>Hello there</div>
//       </div>
//     </>
//   );
// };

// export default Profile;
