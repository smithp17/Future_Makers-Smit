import React, { useState } from "react";

function EducatorForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    time: "",
    grade: "",
    environment: "",
    confidence: "",
    assessment: "Yes",
    domain: "", // New domain field
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

    if (!formData.time || !formData.grade || !formData.environment || !formData.confidence || !formData.domain) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const promptLessonPlan = `
You are an expert educational assistant. Generate a detailed lesson plan for an educator based on the following details:
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Time: ${formData.time} hours per week
- Educator Confidence: ${formData.confidence}
- Domain: ${formData.domain}

Consider the time parameter and divide the content into weekly sessions. Make sure the lesson is engaging and age-appropriate for the selected domain.
`;

    const promptAssessment = `
You are an expert educational assistant. Create a reflective and practical assessment for an educator based on the following details:
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Time: ${formData.time} hours per week
- Educator Confidence: ${formData.confidence}
- Domain: ${formData.domain}

Ensure the assessment aligns with the lesson plan and includes specific questions or tasks for the learners in the selected domain.
`;

    const API_URL =
      process.env.NODE_ENV === "production"
        ? "/api/generate"
        : "http://localhost:8888/.netlify/functions/generate";

    try {
      const lessonPlanResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptLessonPlan }),
      });

      const assessmentResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptAssessment }),
      });

      if (!lessonPlanResponse.ok || !assessmentResponse.ok) {
        throw new Error("Failed to fetch from AI API.");
      }

      const lessonPlanData = await lessonPlanResponse.json();
      const assessmentData = await assessmentResponse.json();

      console.log("Lesson Plan:", lessonPlanData.text);
      console.log("Assessment:", assessmentData.text);

      onGenerate(formData, {
        lessonPlan: lessonPlanData.text,
        assessment: assessmentData.text,
      });

      setFormData({
        time: "",
        grade: "",
        environment: "",
        confidence: "",
        assessment: "Yes",
        domain: "", // Reset domain
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
          <label className="form-label">How much time do you have for this activity (hours per week)?</label>
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
          <label className="form-label">What grade(s) or age group(s) are your learners?</label>
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
          <label className="form-label">How confident are you in using hands-on projects?</label>
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
          <label className="form-label">Select a Domain</label>
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Domain</option>
            <option value="STEM">STEM</option>
            <option value="Sports">Sports</option>
            <option value="Good Habits">Good Habits</option>
            <option value="World Leaders">World Leaders</option>
            <option value="Geography">Geography</option>
            <option value="eSports">eSports</option>
            <option value="Other">Other</option>
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
