/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Custom Quill Wrapper to help mitigate the findDOMNode warning (note: ReactQuill may still use it internally)
const CustomQuill = ({ value, onChange }) => {
  const quillRef = useRef(null);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["clean"],
  ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "script",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={{ toolbar: toolbarOptions }}
      formats={formats}
      theme="snow"
      placeholder="Include all the information someone would need to answer your question."
    />
  );
};

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]); // must be an array for TagsInput
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.username) {
      setUser(stored.username);
    } else {
      console.error("No user found in localStorage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      toast.error("Title and body are required fields.");
      return;
    }

    // Prepare your data (using JSON here)
    const formData = { user, title, body, tag };

    try {
      await axios.post(
        "https://unihub-be.onrender.com/api/forum/question",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Question added successfully!");

      // Clear form inputs
      setTitle("");
      setBody("");
      setTag([]); // reset tags to an empty array
    } catch (err) {
      console.error("Error submitting question:", err);
      toast.error("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-back py-[10dvh]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="md:w-fit"
      />
      <form className="max-w-3xl w-full mx-auto" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="bg-back rounded-2xl p-5 mb-5 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-pri mb-2 text-center">
            Ask a Public Question
          </h1>
          <p className="text-gray-300 text-center text-sm md:text-base">
            Be specific and imagine you’re asking a question to another person.
          </p>
        </div>

        {/* Title Input */}
        <div className="bg-back rounded-2xl p-4 md:p-6 mb-4 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-3">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full p-3 border border-pri rounded-lg bg-back text-pri placeholder-txt focus:ring-2 focus:ring-pri focus:border-pri transition-all text-base md:text-lg"
            placeholder="e.g. Share some details about IIESTS"
          />
          <small className="text-sm text-gray-400 mt-2">
            Be specific and concise with your question title.
          </small>
        </div>

        {/* Body Input */}
        <div className="bg-back rounded-2xl p-4 md:p-6 mb-5 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Body
          </label>
          <div className="bg-back rounded-lg border border-pri">
            <CustomQuill value={body} onChange={setBody} />
          </div>
          <small className="text-sm text-gray-400 mt-2">
            Provide detailed information to get the best answers.
          </small>
        </div>

        {/* Tags Input */}
        <div className="bg-back rounded-2xl p-4 md:p-5 mb-2 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Tags
          </label>
          <TagsInput
            value={tag}
            onChange={setTag}
            classNames={{
              input: "bg-back text-pri placeholder-txt",
              tag: "bg-pri text-white px-3 py-1 rounded-lg flex items-center",
              container: "border border-pri rounded-lg p-2 bg-back",
            }}
            placeHolder="Enter tag and press Enter"
            beforeAddValidate={(tag) => tag.length <= 15}
            onKeyUp={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <small className="text-sm text-gray-400 mt-2 block">
            Add up to 5 tags (15 characters max each)
          </small>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-pri text-back py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition"
          >
            Add Question
          </button>
        </div>
      </form>

      {/* Custom CSS for Quill Editor and TagsInput */}
      <style>{`
        .ql-toolbar.ql-snow {
          border: 1px solid #6d28d9 !important;
          border-radius: 8px 8px 0 0;
          background-color: var(--bg-back);
        }
        .ql-container.ql-snow {
          border: 1px solid #6d28d9 !important;
          border-radius: 0 0 8px 8px;
          background-color: var(--bg-back);
        }
        .ql-snow .ql-stroke {
          stroke: #d8b4fe !important;
        }
        .ql-snow .ql-fill {
          fill: #d8b4fe !important;
        }
        .ql-snow .ql-picker {
          color: #d8b4fe !important;
        }
        .ql-editor {
          font-size: 1.125rem;
          color: #e9d5ff;
          min-height: 200px;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-size: 1.125rem;
          font-style: normal !important;
        }
      
        /* TagsInput Custom CSS */
        .rti--container {
          --rti-bg: var(--bg-back);
          --rti-border: #6d28d9;
          --rti-main: #6d28d9;
          --rti-radius: 0.5rem;
          --rti-tag: #6d28d9;
          --rti-tag-remove: #d8b4fe;
        }
        .rti--input {
          color: #e9d5ff !important;
          caret-color: #e9d5ff;
        }
        .rti--tag {
          background-color: #6d28d9 !important;
          border: 1px solid #8b5cf6 !important;
          padding: 0.25rem 0.75rem !important;
          font-size: 0.875rem !important;
        }
        .rti--tag button {
          color: #d8b4fe !important;
          margin-left: 0.5rem !important;
        }
        .rti--tag button:hover {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
};

export default AddQuestion;
