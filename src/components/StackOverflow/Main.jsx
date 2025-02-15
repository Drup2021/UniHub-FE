/* eslint-disable react/prop-types */
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

function Main({ questions }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br bg-back py-[10dvh] ">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-10 px-16 w-full">
          <h2 className="text-3xl font-bold text-pri">All Questions</h2>
          <Link to="/add-question">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="button"
              className="rounded-xl bg-pri w-36 h-12 font-bold"
            >
              Ask Question
            </motion.button>
          </Link>
        </div>

        {/* Questions List */}
        <div className="space-y-6 mx-16">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <AllQuestions key={question._id} data={question} />
            ))
          ) : (
            <p className="text-center text-gray-300">No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
