import { ToastContainer } from "react-toastify";
import StackOverflow from "../../components/StackOverflow";

const Forum = () => {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />
      <StackOverflow />
    </div>
  );
};

export default Forum;
