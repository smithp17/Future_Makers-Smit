import React, { useState } from "react";

function EducatorForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    time: "",
    grade: "",
    environment: "",
    confidence: "",
    assessment: "Yes",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.time || !formData.grade || !formData.environment || !formData.confidence) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const prompt = `
You are an educational assistant.

Here are the details:
- Time: ${formData.time} hours per week
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Confidence: ${formData.confidence}
- Assessment Required: ${formData.assessment === "Yes" ? "Yes" : "No"}

Generate a detailed lesson plan and an assessment based on these details.
    `;

    const API_URL =
      process.env.NODE_ENV === "production"
        ? "/api/generate"
        : "http://localhost:8888/.netlify/functions/generate";

    try {
      console.log("Sending request to API:", API_URL);
      console.log("Prompt:", prompt);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`API error: ${response.status} - ${response.statusText}. Response: ${responseText}`);
      }

      const data = await response.json();
      console.log("Generated Output:", data.text);
      onGenerate(formData, data.text);

      setFormData({
        time: "",
        grade: "",
        environment: "",
        confidence: "",
        assessment: "Yes",
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      setError(`Failed to generate a response: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Educator Interview</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">
            How much time do you have for this activity (hours per week)?
          </label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter hours (1 to 56)"
            min="1"
            max="56"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            What grade(s) or age group(s) are your learners?
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Grade</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="1st Grade">1st Grade</option>
            <option value="2nd Grade">2nd Grade</option>
            <option value="3rd Grade">3rd Grade</option>
            <option value="4th Grade">4th Grade</option>
            <option value="5th Grade">5th Grade</option>
            <option value="Middle School">Middle School</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">What is the learning environment?</label>
          <select
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Environment</option>
            <option value="Classroom">Classroom</option>
            <option value="Library">Library</option>
            <option value="After-School Program">After-School Program</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            How confident are you in using hands-on projects?
          </label>
          <select
            name="confidence"
            value={formData.confidence}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Confidence Level</option>
            <option value="Very Confident">Very Confident</option>
            <option value="Somewhat Confident">Somewhat Confident</option>
            <option value="Not Confident">Not Confident</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Do you want to include an assessment?</label>
          <div className="btn-group w-100" role="group">
            <input
              type="radio"
              className="btn-check"
              name="assessment"
              id="assessment-yes"
              value="Yes"
              checked={formData.assessment === "Yes"}
              onChange={handleChange}
            />
            <label className="btn btn-outline-primary" htmlFor="assessment-yes">
              Yes
            </label>

            <input
              type="radio"
              className="btn-check"
              name="assessment"
              id="assessment-no"
              value="No"
              checked={formData.assessment === "No"}
              onChange={handleChange}
            />
            <label className="btn btn-outline-primary" htmlFor="assessment-no">
              No
            </label>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Generating...
              </span>
            ) : (
              "Generate Lesson Plan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EducatorForm;
