import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import MainPage from "./Components/MainPage";
import "./Components/style.css";

function App() {
  return (
    <>
        <Sidebar />
        <MainPage />
    </>
  );
}

export default App;
