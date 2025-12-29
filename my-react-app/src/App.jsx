import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import TasksPage from "./Components/TasksPage/TasksPage.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";

function App() {
  return (
    <>
      {/* Global Navbar + Sidebar */}
      <Navbar />
      <Sidebar />

      {/* Page content changes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/task" element={<TasksPage />} />
      </Routes>
    </>
  );
}

export default App;
