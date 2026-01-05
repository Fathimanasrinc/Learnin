import React, { useState } from "react";
import "./RequestBox.css"; // custom dark theme CSS
import axios from "axios";


function RequestBox({ mentor, onClose }) {
  const [formData, setFormData] = useState({
    skills: "",
    description: "",
    deadline: "",
    credits: "",
  });

  const skillOptions = mentor.skills;
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/requests",
        {
          mentor: {
        userId: mentor._id,
        name: mentor.name,
        image: mentor.image,
      },
          expectations: formData.description,
          skills: formData.skills,
          deadline: formData.deadline,
          credits: formData.credits,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request sent successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to send request");
    }
    onClose();
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
            value={formData.skills}
            onChange={handleChange}
            required
          >
            <option value="">Select a skill</option>
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
