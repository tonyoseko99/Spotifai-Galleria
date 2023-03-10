import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Footer from "./components/FooterSection";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import Album from "./components/Album";
import Photo from "./components/Photo";
// import AuthContext and AuthProvider
import { AuthContext } from "./AuthContext/AuthContext";

function App() {
  const { authenticated } = useContext(AuthContext);
  const [isLoggedin, setIsLoggedin] = useState(false);

  // check if user is logged in
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedin(true);
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Header />
        {/* check if user is logged in */}
        {isLoggedin ? (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/users" element={<Home />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/albums/:id" element={<Album />} />
            <Route path="/albums/:id/photos/:id" element={<Photo />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
