import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Page from "./pages/Page";
import { MosaicPage } from "./pages/MosaicPage"; // Import the NewPage component

function App() {
  return (
    <Router>
      <div className="root-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/mosaic" element={<MosaicPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
