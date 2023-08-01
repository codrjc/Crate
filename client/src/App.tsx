import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import AlbumForm from "./components/AlbumForm";
import Page from "./components/Page";

function App() {
  return (
    <div>
      <NavBar />
      <Page />
    </div>
  );
}

export default App;
