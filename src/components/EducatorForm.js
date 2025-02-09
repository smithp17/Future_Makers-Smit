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
You are an expert educational assistant. Generate a detailed 10 week lesson plan for an educator based on the following details
  - Fun facts or trivia about domain which is mentioned below.
  - A creative storytelling approach to introduce key concepts.
  - Suggestions for visual or hands-on elements to maintain engagement.
- Core concepts and quick activities.
- Minimal setup and materials.
:
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Time: ${formData.time} hours per week
- Educator Confidence: ${formData.confidence}
- Domain: ${formData.domain}

Consider the time parameter and divide the content into weekly sessions. Make sure the lesson is engaging and age-appropriate for the selected domain.
`;

    const promptAssessment = formData.assessment === "Yes"
      ? `
You are an expert educational assistant. Create a reflective and practical assessment for an educator based on the following details:
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Time: ${formData.time} hours per week
- Educator Confidence: ${formData.confidence}
- Domain: ${formData.domain}

Ensure the assessment aligns with the lesson plan and includes specific questions or tasks for the learners in the selected domain. Ensure the assessments:
1. Encourage critical thinking and problem-solving.
2. Include both individual and group tasks, if appropriate.
3. Are engaging and aligned with the fun, storytelling, or hands-on elements in the lesson plan.
4. Use domain-specific examples (e.g., trivia or challenges related to domain).
At last, just mention Happy to help- your AI assistant.
`
      : `
You are an expert educational assistant. No assessment is required based on the details below. Instead, provide a short humorous story or a fun fact educators can share with students during lessons:
- Grade: ${formData.grade}
- Environment: ${formData.environment}
- Domain: ${formData.domain}

Ensure the humor or fun fact is age-appropriate and aligns with the selected domain.
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

      if (!lessonPlanResponse.ok) {
        throw new Error("Failed to fetch lesson plan from AI API.");
      }

      const lessonPlanData = await lessonPlanResponse.json();

      let assessmentData = { text: "No assessment generated." };

      if (formData.assessment === "Yes" || formData.assessment === "No") {
        const assessmentResponse = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: promptAssessment }),
        });

        if (!assessmentResponse.ok) {
          throw new Error("Failed to fetch assessment or humor from AI API.");
        }

        assessmentData = await assessmentResponse.json();
      }

      console.log("Lesson Plan:", lessonPlanData.text);
      console.log("Assessment or Humor:", assessmentData.text);

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
    <div className="title-wrapper">
      <h1 className="main-title">Edunnovate ⭐ </h1>
      <div className="container mt-5">
        <h3 className="text-center mb-4">Educate and Innovate, Let AI Elevate!!</h3>
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
    </div>
  );
}

export default EducatorForm;
