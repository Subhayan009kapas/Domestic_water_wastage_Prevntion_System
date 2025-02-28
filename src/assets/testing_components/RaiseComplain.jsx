import React, { useState } from "react";
import "./RaiseComplaint.css";

const RaiseComplaint = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const purposeOptions = [
    "Water Leakage",
    "Water Quality Issue",
    "Billing Discrepancy",
    "Supply Interruption",
    "Pipeline Damage",
    "Meter Malfunction",
    "Other",
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint submitted:", { name, email, complaint });
    setSubmitted(true);
    setName("");
    setEmail("");
    setSelectedOptions([]);
    setComplaint("");
  };

  return (
    <div className="complaint-container">
      {!submitted ? (
        <div className="complaint-card">
          <h2>Raise a Complaint</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Purpose Selection Section */}
            <div className="form-group">
              <label>Complaint Purpose</label>
              <div className="checkbox-group">
                {purposeOptions.map((option) => (
                  <label
                    key={option}
                    className={`checkbox-label ${
                      selectedOptions.includes(option) ? "selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span className="checkbox-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="complaint">Complaint Details</label>
              <textarea
                id="complaint"
                rows="5"
                required
                value={[...selectedOptions, complaint].join("\n")}
                onChange={(e) => setComplaint(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Complaint
            </button>
          </form>
        </div>
      ) : (
        <div className="success-card">
          <div className="success-icon">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Complaint Submitted Successfully!</h2>
          <p>Your complaint has been received. We will get back to you shortly.</p>
        </div>
      )}
    </div>
  );
};

export default RaiseComplaint;