import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminChatModal from "./AdminChatModal";

const AdminReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [request, setRequest] = useState(null);
  const [showChats, setShowChats] = useState(false);
  const [chats, setChats] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  // 1️⃣ Fetch report details
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setReport(data);

        // 2️⃣ Fetch request separately using request ID from report
        if (data.request) {
          const reqRes = await fetch(
            `http://localhost:5000/api/requests/${data.request}`,
            { headers: { Authorization: `Bearer ${adminToken}` } }
          );
          const reqData = await reqRes.json();
          setRequest(reqData);
        }
      } catch (err) {
        console.error("Fetch report/request error:", err);
      }
    };

    fetchReport();
  }, [id, adminToken]);

  // 3️⃣ Load chats between submittedBy and targetedUser
  const loadChats = async () => {
    console.log(report.targetedUser)
    if (!report) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/between/${report.submittedBy}/${report.targetedUser}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      const data = await res.json();
      setChats(data.messages || []);
      setShowChats(true);
    } catch (err) {
      console.error("Load chats error:", err);
      alert("Failed to load chats");
    }
  };

  if (!report) return <p>Loading report...</p>;

  return (
    <div>
      <h2>Request Details</h2>

      <p><b>Description:</b> {report.description}</p>
      <p><b>Submitted By:</b> {report.submittedBy.name}</p>
      <p><b>Targeted User:</b> {report.targetedUser.name}</p>

      <hr />

      <h3>Request Info</h3>
      {request ? (
        <>
          <p><b>Title:</b> {request.skills}</p>
          <p><b>Description:</b> {request.credits}</p>
        </>
      ) : (
        <p>No request details available</p>
      )}

      <button onClick={loadChats}>View Chats</button>

      {showChats && (
        <AdminChatModal
          users={{
            submittedBy: report.submittedBy,
            targetedUser: report.targetedUser,
          }}
          onClose={() => setShowChats(false)}
        />
      )}
    </div>
  );
};

export default AdminReportDetails;
