/* eslint-disable react/prop-types */
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export function AllQuestions({ data }) {
  // Helper to truncate text
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  console.log(data);
  // Use tags directly if available; otherwise fallback to an empty array.
  const tags = data?.tags ? data.tags : [];

  // Determine the display name.
  const displayName = data?.user || "Anonymous";

  // Ensure bodyText is always a string
  const bodyText = typeof data.body === "string" ? data.body : "";

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg w-full">
      <div className="flex">
        {/* Left Section - Votes, Answers, Views */}
        <div className="flex flex-col items-center mr-6">
          <div className="text-center mb-4">
            <p className="text-pri text-xl font-bold">
              {data?.answerDetails?.length || 0}
            </p>
            <span className="text-gray-300 text-sm">answers</span>
          </div>
        </div>

        {/* Right Section - Question Details */}
        <div className="flex-1">
          {/* Question Title */}
          <Link
            to={`/question?q=${data?._id}`}
            className="text-pri text-2xl font-bold hover:text-purple-300 transition-colors"
          >
            {data.title || "No Title"}
          </Link>

          {/* Question Body */}
          <div className="mt-4 text-gray-300">
            {parse(truncate(bodyText, 200))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap mt-4">
            {tags.map((_tag, index) => (
              <p
                key={`tag-${index}`}
                className="m-1 px-3 py-1 bg-purple-600 text-purple-200 rounded-full text-sm"
              >
                {_tag}
              </p>
            ))}
          </div>

          {/* Author Section */}
          <div className="flex items-center justify-between mt-6">
            <small className="text-gray-400">
              {new Date(data.created_at).toLocaleDateString()}
            </small>
            <div className="flex items-center space-x-2">
              <p className="text-pri font-medium">{displayName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
