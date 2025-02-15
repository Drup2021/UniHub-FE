import MainQuestion from "./MainQuestion";

const ViewQuestion = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* MainQuestion - Takes up remaining space without horizontal scrolling */}
      <div className="flex-1 w-full ">
        <MainQuestion />
      </div>
    </div>
  );
};

export default ViewQuestion;
