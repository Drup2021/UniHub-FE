import { ToastContainer } from "react-toastify";
import Events from "../../components/Events/Events"

const Home = () => {
  return (
    <>
      <div className="w-full h-screen  flex items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          className="md:w-fit"
        />
        <div>
          <div className="uppercase">Welcome to unihub</div>
          {/* <Events/> */}
        </div>
      </div>
    </>
  );
};

export default Home;
