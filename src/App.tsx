import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import DetailsPage from "./Components/DetailsPage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />}>
          <Route path="details" element={<DetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
