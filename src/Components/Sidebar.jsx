import React, { useEffect, useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { varContext } from "../Context/Context";
import { FaSquareXTwitter, FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
const Sidebar = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const linkedinUrl = "https://www.linkedin.com/in/avinashs46/";
  const githubUrl = "https://github.com/avinashsingh108";
  const twitterUrl = "https://x.com/_Avi108_";
  const {
    prevPrompt,
    setPrevPrompt,
    setShowResult,
    setRecentPrompt,
    darkMode,
    toggleMode,
    setResultData,
    recentPrompt,
    isMenuOpen,
    setIsMenuOpen,
    smallSidebar,
    setSmallSidebar
  } = useContext(varContext);

  useEffect(() => {
    const storedPrompts = JSON.parse(localStorage.getItem("prompts")) || [];
    setPrevPrompt(storedPrompts);
    console.log(storedPrompts);
  }, [recentPrompt]);

  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const deleteItem = (question) => {
    const storedPrompts = JSON.parse(localStorage.getItem("prompts"));
    const updatedPrev = storedPrompts.filter(
      (item) => item.question !== question
    );
    localStorage.setItem("prompts", JSON.stringify(updatedPrev));
    setPrevPrompt(updatedPrev);
    setOpenMenuIndex(null);
  };

  const deleteHistory = () => {
    setPrevPrompt([]);
    localStorage.removeItem("prompts");
  };
  return (
    
    <div
      className={`bg-slate-100 dark:bg-zinc-800 h-screen dark:text-white ${
        isMenuOpen ? "w-80" : "w-20"
      } p-6 flex flex-col gap-y-8 justify-between text-xl transition-width duration-300
       `}
    >
      <div className="flex flex-col gap-y-10">
        <div>
          <FaBars
            title={!isMenuOpen && "Show menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl cursor-pointer pl-2"
          />
        </div>
        <div
          className={`flex gap-x-2 bg-gray-300 dark:bg-black ${
            isMenuOpen ? "px-4" : "px-2"
          } py-2 rounded-full justify-center items-center w-fit cursor-pointer`}
          onClick={() => {
            setShowResult(false);
            setRecentPrompt("");
          }}
        >
          <IoMdAdd title={!isMenuOpen && "New Chat"} />{" "}
          <p className={`text-2xl ${isMenuOpen ? "" : "hidden"}`}>New Chat</p>
        </div>
        <div className={`flex flex-col gap-y-2 ${isMenuOpen ? "" : "hidden"} `}>
          <h2 className="font-semibold text-2xl pl-2">Recent</h2>
          <div className="overflow-y-auto h-60 sm:h-80">
            {prevPrompt.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-center justify-between hover:bg-slate-200 dark:hover:bg-zinc-800 px-4 py-1 rounded-full cursor-pointer"
              >
                <div className="flex gap-x-2">
                  <p className="flex items-center gap-x-4">
                    <FiMessageSquare className="text-lg" />
                  </p>
                  <p
                    onClick={() => {
                      setShowResult(true);
                      setRecentPrompt(item.question);
                      setResultData(item.answer);
                    }}
                    className="line-clamp-1 max-w-40 hover:underline"
                  >
                    {item.question}
                  </p>
                </div>
                <p className="">
                  <HiOutlineDotsVertical
                    className="hover:bg-white dark:hover:bg-zinc-700 rounded-full p-1 text-2xl"
                    onClick={() => toggleMenu(index)}
                  />
                  {openMenuIndex === index && (
                    <span
                      onClick={() => deleteItem(item.question)}
                      className="absolute text-lg px-4 py-1 bg-white  dark:bg-zinc-800 rounded-xl shadow-md z-50 hover:underline"
                    >
                      Delete
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`relative ${
          isMenuOpen ? "" : "items-center"
        } flex flex-col gap-1 justify-center pb-10`}
      >
        <div
          className={`flex items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 gap-x-2 cursor-pointer ${
            isMenuOpen ? "px-4 py-1" : ""
          }`}
          onClick={deleteHistory}
        >
          <MdAutoDelete title={isMenuOpen ? "" : "Delete history"} />{" "}
          <p className={`${isMenuOpen ? "" : "hidden"}`}>Delete history</p>
        </div>
        <div
          className={`flex items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 gap-x-2 cursor-pointer ${
            isMenuOpen ? "px-4 py-1" : ""
          }`}
          onClick={toggleMode}
        >
          {darkMode ? (
            <MdOutlineLightMode title={isMenuOpen ? "" : "Set Light Mode"} />
          ) : (
            <MdDarkMode title={isMenuOpen ? "" : "Set Dark Mode"} />
          )}{" "}
          <p className={`${isMenuOpen ? "" : "hidden"}`}>
            {darkMode ? "Light " : "Dark "}Mode
          </p>
        </div>
        <div
          className={` flex items-center p-2 rounded-full ${
            showContact ? "bg-slate-200 dark:bg-zinc-800" : ""
          } hover:bg-slate-200 dark:hover:bg-zinc-800 gap-x-2 cursor-pointer ${
            isMenuOpen ? "px-4 py-1" : ""
          }`}
          onClick={() => setShowContact(!showContact)}
        >
          <MdContactSupport title={isMenuOpen ? "" : "Contact Me"} />{" "}
          <p className={`${isMenuOpen ? "" : "hidden"}`}>Contact</p>
        </div>
        {showContact && (
          <div className="flex gap-x-2 lg:gap-x-6 text-2xl justify-center absolute top-28 mt-2 left-1 lg:left-6 ">
            <IoLogoLinkedin
              onClick={() => handleClick(linkedinUrl)}
              className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
            />
            <FaSquareGithub
              onClick={() => handleClick(githubUrl)}
              className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
            />
            <FaSquareXTwitter
              onClick={() => handleClick(twitterUrl)}
              className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
