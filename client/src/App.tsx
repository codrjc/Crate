import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <div className="App">{"hello"}</div>;
}

export default App;
