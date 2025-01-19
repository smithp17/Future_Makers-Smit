import React from "react";

const ResultDisplay = ({ responses, aiOutput }) => {
  console.log("Responses:", responses);
  console.log("AI Output:", aiOutput);

  if (!responses || !aiOutput) {
    return <div className="result-display">No results to display yet. Please generate a lesson plan.</div>;
  }

  const weeklyHours = Number(responses.time);
  const totalHours = weeklyHours * 10;

  // Parse the AI output
  const outputSections = {
    lessonPlan: aiOutput?.lessonPlan || aiOutput || "Lesson plan not available.",
    assessment: aiOutput?.assessment || aiOutput || "Assessment not available.",
  };

  return (
    <div className="result-display">
      {/* Course Overview Card */}
      <div className="overview-card">
        <div className="card-header">
          <h2>📋 Course Overview</h2>
          <div className="duration-info">
            <span className="duration">{weeklyHours} Hours/Week</span>
            <span className="total-duration">Total: {totalHours} Hours (10 Weeks)</span>
          </div>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Grade Level:</span>
            <span className="value">{responses.grade}</span>
          </div>
          <div className="summary-item">
            <span className="label">Learning Environment:</span>
            <span className="value">{responses.environment}</span>
          </div>
          <div className="summary-item">
            <span className="label">Educator Confidence:</span>
            <span className="value">{responses.confidence}</span>
          </div>
          <div className="summary-item">
            <span className="label">Domain:</span>
            <span className="value">{responses.domain || "Not specified"}</span>
          </div>
        </div>
      </div>

      {/* Lesson Plan Card */}
      <div className="lesson-plan-card">
        <div className="card-header">
          <h2>📚 Generated Lesson Plan</h2>
        </div>
        <div className="content-section">
          <div className="ai-generated-content">{outputSections.lessonPlan}</div>
        </div>
      </div>

      {/* AI Generated Assessment Card */}
      <div className="assessment-card">
        <div className="card-header">
          <h2>📝 AI Generated Assessment</h2>
          <span className="grade-level">{responses.grade}</span>
        </div>
        <div className="assessment-content">
          <div className="section">
            <div className="ai-generated-content">{outputSections.assessment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
