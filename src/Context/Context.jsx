import { createContext, useEffect, useState } from "react";
import run from "../Config/Gemini";

export const varContext = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [smallSidebar, setSmallSidebar] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };
  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setInput("");
    const response = await run(input);
    const newEntry = { question: input, answer: response };
    const existingPrompts = JSON.parse(localStorage.getItem("prompts")) || [];
    existingPrompts.push(newEntry);
    localStorage.setItem("prompts", JSON.stringify(existingPrompts));
    setResultData(response);
    setLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    toggleMode, 
    darkMode,
    isMenuOpen, 
    setIsMenuOpen, 
    smallSidebar,
    setSmallSidebar
  };
  return (
    <varContext.Provider value={contextValue}>{children}</varContext.Provider>
  );
};
