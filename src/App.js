import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
// ! Contexts
import { JobsProvider } from "./context/JobsContext"; //This is the json file that we call it with context
import { LoginProvider } from "./context/LoginContext";
import { ThemeProvider } from "./context/ThemeContext";
// ? Components
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";


function App() {
  return (
    <JobsProvider>
      <LoginProvider>
        <ThemeProvider>
          
          <div className="text-primary text-spartan">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
          
        </ThemeProvider>
      </LoginProvider>
    </JobsProvider>
  );
}

export default App;
