import { useEffect, useState } from "react";
import Main from "./Main";
import axios from "axios";

const StackOverflow = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const res = await axios.get(
          "https://unihub-be.onrender.com/api/forum/question"
        );
        let questionsData = res.data;
        setQuestions(questionsData);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    getQuestion();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
      <Main questions={questions} />
    </div>
  );
};

export default StackOverflow;
