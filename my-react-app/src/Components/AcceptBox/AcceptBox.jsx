const AcceptBox = ({ request, onClose, onAccept, onDecline }) => {
  if (!request) return <p className="no-data">Loading...</p>;

  return (
    <div className="task-overlay" onClick={onClose}>
      <div className="task-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="task-heading">Mentorship Request</h2>

        <div className="task-field">
          <span className="task-label">Skills Required</span>
          <div className="task-value">{request.skills}</div>
        </div>

        <div className="task-field">
          <span className="task-label">Expectation / Description</span>
          <div className="task-value task-value--description">
            {request.expectations}
          </div>
        </div>

        <div className="task-field">
          <span className="task-label">Deadline</span>
          <div className="task-value">{request.deadline}</div>
        </div>

        <div className="task-field">
          <span className="task-label">Credits Offered</span>
          <div className="task-value">{request.credits} Credits</div>
        </div>

        <button
          className="accept-btn-task"
          onClick={() => {
            onAccept(request._id);
            onClose();
          }}
        >
          Accept Request
        </button>

        <button
          className="report-btn-task"
          onClick={() => {
            onDecline(request._id);
            onClose();
          }}
        >
          Decline Request
        </button>
      </div>
    </div>
  );
};

export default AcceptBox;
