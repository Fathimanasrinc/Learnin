import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/HomePage/Home/Home.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import TasksPage from "./Components/TaskPag/TasksPage/TasksPage.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import Myprofilepage from "./Components/Mypage/Myprofilepage.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import RequestPage from "./Components/Request/Requestpage/RequestPage.jsx";
import ChatPage from "./Components/Chat/ChatPage/Chatpage.jsx";
import SearchResults from "./Components/SearchResults/SearchResults.jsx";
import Login from "./Components/Login/Login.jsx";

import AdminReports from "./Components/adminReports.jsx";
import AdminUsers from "./Components/AdminUsers.jsx";
import AdminUserEdit from "./Components/AdminUserEdit.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminReportDetails from "./Components/AdminReportDetails.jsx";
import AddAdmin from "./Components/AddAdmin.jsx";

import UserLayout from "./Components/UserLayout.jsx";
import AdminLayout from "./Components/AdminLayout.jsx";

function App() {
  return (
    <Routes>
      {/* USER PAGES (USER NAVBAR + SIDEBAR) */}
      <Route element={<UserLayout />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Myprofilepage />} />
        <Route path="/task" element={<TasksPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/make" element={<Profile />} />
        <Route path="/ProfilePage/:id" element={<ProfilePage />} />
        <Route path="/chat/:mentorId" element={<ChatPage />} />
        <Route path="/searchresult" element={<SearchResults />} />
      </Route>

      {/* ADMIN LOGIN (NO NAVBAR) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN PAGES (ADMIN NAVBAR ONLY) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="reports" element={<AdminReports />} />
        <Route path="reports/:id" element={<AdminReportDetails />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<AdminUserEdit />} />
        <Route path="add-admin" element={<AddAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
