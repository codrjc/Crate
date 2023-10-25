import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Page from "./components/Page";

function App() {
  return (
    <div className="root-container">
      <NavBar />
      <Page />
    </div>
  );
}

export default App;
