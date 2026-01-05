import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./Components/HomePage/Home/Home.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import TasksPage from "./Components/TaskPag/TasksPage/TasksPage.jsx";
import Navbar from "./Components/HomePage/Navbar/Navbar.jsx";
import Sidebar from "./Components/HomePage/Sidebar/Sidebar.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import Myprofilepage from "./Components/Mypage/Myprofilepage.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import RequestPage from "./Components/Request/Requestpage/RequestPage.jsx";
import ChatBox from "./Components/Chat/Chatbox/Chatbox.jsx";
import SearchResults from "./Components/SearchResults/SearchResults.jsx";
import ChatPage from "./Components/Chat/ChatPage/Chatpage.jsx";
import Login from "./Components/Login/Login.jsx";
import AdminReports from "./Components/adminReports.jsx";
import AdminUsers from "./Components/AdminUsers.jsx";
import AdminUserEdit from "./Components/AdminUserEdit.jsx";

function App() {
  const location = useLocation();

  // Pages where Navbar and Sidebar should be hidden
  const noNavPages = [
    "/signin",
    "/signup",
    "/admin/reports",
    "/admin/users",
    "/admin/users/:id"
  ];

  const hideNav = noNavPages.some((path) =>
    location.pathname.includes(path.replace("/:id", ""))
  );

  return (
    <>
      {/* Conditionally render Navbar + Sidebar */}
      {!hideNav && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Myprofilepage />} />
        <Route path="/task" element={<TasksPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/make" element={<Profile />} />
        <Route path="/ProfilePage/:id" element={<ProfilePage />} />
        <Route path="/chat/:mentorId" element={<ChatPage />} />
        <Route path="/searchresult" element={<SearchResults />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/:id" element={<AdminUserEdit />} />
      </Routes>
    </>
  );
}

export default App;
