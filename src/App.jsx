import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <MainPage />
      </div>
    </>
  );
}

export default App;
