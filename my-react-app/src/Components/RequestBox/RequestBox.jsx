import React, { useState } from "react";
import "./RequestBox.css"; // custom dark theme CSS

function RequestBox() {
  const [formData, setFormData] = useState({
    skills: [],
    description: "",
    deadline: "",
    credits: "",
  });

  const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "UI/UX Design",
    "Python",
    "Data Analysis",
  ];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Request submitted! Check console for data.");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Request Form</h2>

      <form onSubmit={handleSubmit} className="request-form">
        {/* Skill selection */}
        <label className="form-label">
          Skills You Need:
          <select
            name="skills"
            multiple
            value={formData.skills}
            onChange={handleChange}
            className="form-select"
            required
          >
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>

        {/* Description */}
        <label className="form-label">
          What Do You Expect?
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Describe your expectations..."
            required
          ></textarea>
        </label>

        {/* Deadline */}
        <label className="form-label">
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>

        {/* Credits offered */}
        <label className="form-label">
          Credits You Offer
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            min="1"
            className="form-input"
            placeholder="e.g., 3"
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RequestBox;

