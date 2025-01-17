import React from "react";

const ResultDisplay = ({ responses, aiOutput }) => {
  if (!responses || !aiOutput) return null;

  const weeklyHours = Number(responses.time);
  const totalHours = weeklyHours * 10;

  // Parse the AI output
  // Assuming aiOutput contains the generated assessment and lesson plan
  const outputSections = {
    lessonPlan: aiOutput, // First part of the output
    assessment: aiOutput  // Second part of the output (assessment questions)
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
        </div>
      </div>

      {/* Lesson Plan Card */}
      <div className="lesson-plan-card">
        <div className="card-header">
          <h2>📚 Generated Lesson Plan</h2>
        </div>
        <div className="content-section">
          <div className="ai-generated-content">
            {outputSections.lessonPlan}
          </div>
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
            <div className="ai-generated-content">
              {outputSections.assessment}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;