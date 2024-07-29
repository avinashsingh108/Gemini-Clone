import { useContext, useRef, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { varContext } from "../Context/Context";
import { SiGooglegemini } from "react-icons/si";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { FaBars } from "react-icons/fa";
import MarkdownRenderer from "./MarkDownRenderer";
const MainPage = () => {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    onSent,
    isMenuOpen,
    setIsMenuOpen,
    smallSidebar,
    setSmallSidebar,
  } = useContext(varContext);
  const inputRef = useRef(null);
  const [customBoxNo, setCustomBoxNo] = useState(null);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [enterName, setEnterName] = useState("");
  const [showChangeName, setShowChangeName] = useState(false);
  const customInput = [
    "Walk me through the steps to apply for a new job",
    "How to implement a binary search algorithm in Python?",
    "Find the best attractions to visit in Tokyo and Seoul",
    "Create a product description for an innovative electric toothbrush",
  ];

  const handleCustomClick = (text, index) => {
    if (input.trim() === text) {
      setInput("");
      setCustomBoxNo(null);
    } else {
      setInput(text);
      setCustomBoxNo(index);
    }
    inputRef.current.focus();
  };

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name"));
    }
  }, []);

  const handleName = (name) => {
    const capitalize = name.charAt(0).toUpperCase() + name.slice(1);
    setName(capitalize);
    localStorage.setItem("name", capitalize);
  };
  return (
    <div
      className={`pt-6 px-6 flex flex-col justify-between w-full h-screen${
        !isMenuOpen ? "lg:pl-80" : "pl-10 lg:pl-40"
      } h-screen dark:bg-black dark:text-white`}
    >
      <div className="flex flex-col gap-y-14 overflow-y-auto pb-10">
        <div className="sticky top-0 sm:bg-white sm:dark:bg-black flex justify-between text-3xl font-semibold">
          <FaBars
            onClick={() => {
              setSmallSidebar(!smallSidebar);
              setIsMenuOpen(true);
            }}
            className="sm:hidden text-2xl"
          />
          <h2 className="gradient-text">Gemini</h2>
          {name && (
            <p
            onClick={() => setShowChangeName(!showChangeName)}
            className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 shadow-md text-white to-pink-600 leading-3 text-xl size-9 cursor-pointer">
              {name.charAt(0).toUpperCase()}
              {showChangeName && !showResult && (
                <span
                  onClick={() => setName("")}
                  className="absolute text-lg px-4 py-1 w-28 text-black dark:text-white bg-white dark:bg-zinc-800 rounded-xl shadow-md z-50 hover:underline top-8 right-4"
                >
                  Edit Name
                </span>
              )}
            </p>
          )}
        </div>
        {showResult ? (
          <div className="text-xl space-y-6">
            <div className="flex items-start">
              <IoSearchCircleSharp className="text-white bg-blue-600 rounded-full text-4xl mr-2 flex-none" />
              <p className="pt-1 line-clamp-4">{recentPrompt}</p>
            </div>

            {loading ? (
              <div className="w-full flex justify-center">
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#2563EB"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            ) : (
              <div className="flex items-start">
                <SiGooglegemini className="text-2xl mx-2 flex-none text-blue-500" />
                <div className="text-base sm:text-xl w-[80%]">
                  <MarkdownRenderer />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="py-10 text-5xl sm:text-7xl flex flex-col">
              {name ? (
                <h1 className="font-semibold gradient-text">Hello, {name}</h1>
              ) : (
                <div className="flex items-center ">
                  <div className="text-5xl rounded-xl dark:text-black mx-2 ">
                    <input
                      type="text"
                      value={enterName}
                      placeholder="Enter your name"
                      onChange={(e) => setEnterName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key.includes("Tab")) {
                          e.preventDefault();
                          window.alert(e.key)
                          handleName(enterName);
                        }
                      }}
                      maxLength={14}
                      className="w-full rounded-xl ring-2 px-4 focus:ring outline-none dark:bg-zinc-900 ring-slate-400 text-slate-300 placeholder:text-4xl placeholder:text-slate-300"
                    />
                    
                  </div>
                </div>
              )}

              <span className="text-slate-300">How can I help you today?</span>
            </div>

            <div className="flex gap-6 justify-start ml-1 flex-wrap">
              {customInput.map((text, index) => (
                <div
                  key={index}
                  onClick={() => handleCustomClick(text, index)}
                  className={`${
                    customBoxNo === index
                      ? "bg-blue-100 dark:bg-blue-500 dark:bg-opacity-30 bg-opacity-90"
                      : "bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700"
                  } size-36 sm:size-44 lg:size-48 cursor-pointer rounded-xl p-4 text-base lg:text-xl`}
                >
                  {text}{" "}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center text-xl sm:text-2xl px-6 sm:px-10 py-2 sm:py-4 bg-slate-100 dark:bg-zinc-800 rounded-full lg:w-[80%]">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter your prompt here"
            className="outline-none bg-slate-100 dark:bg-zinc-800 w-full pr-4 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSent(input);
              }
            }}
          />
          <IoMdSend onClick={() => onSent(input)} />
        </div>
        <p className="text-center leading-4 lg:w-[80%] py-1">
          Gemini may display inaccurate info, including about people, so
          double-check its responses.{" "}
        </p>
      </div>
    </div>
  );
};

export default MainPage;
