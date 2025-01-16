import React from "react";

const ResultDisplay = ({ responses, aiOutput }) => {
  console.log('Responses:', responses);
  console.log('AI Output:', aiOutput);

  if (!responses || !aiOutput) {
    return null;
  }

  // Convert weekly hours to total course hours
  const weeklyHours = Number(responses.time);
  const totalHours = weeklyHours * 10;

  return (
    <div className="result-display">
      {/* Educator Input Summary Card */}
      <div className="summary-card">
        <h2>Educator Input Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Hours per Week:</span>
            <span className="value">{weeklyHours} hours</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Course Duration:</span>
            <span className="value">{totalHours} hours (10 weeks)</span>
          </div>
          <div className="summary-item">
            <span className="label">Grade:</span>
            <span className="value">{responses.grade}</span>
          </div>
          <div className="summary-item">
            <span className="label">Environment:</span>
            <span className="value">{responses.environment}</span>
          </div>
          <div className="summary-item">
            <span className="label">Confidence:</span>
            <span className="value">{responses.confidence}</span>
          </div>
        </div>
      </div>

      {/* Lesson Plan Card */}
      <div className="lesson-plan-card">
        <div className="card-header">
          <h2>📚 Lesson Plan</h2>
          <div className="duration-info">
            <span className="duration">{weeklyHours} Hours/Week</span>
            <span className="total-duration">Total: {totalHours} Hours</span>
          </div>
        </div>
        
        <div className="lesson-content">
          <div className="section">
            <h3>🎯 Learning Objectives</h3>
            <div className="content-text">
              {aiOutput}
            </div>
          </div>

          <div className="section">
            <h3>⏱️ Weekly Schedule</h3>
            <div className="timeline-grid">
              <div className="timeline-item">
                <span className="time">{Math.round(weeklyHours * 0.2)} hrs</span>
                <span className="activity">Introduction & Review</span>
              </div>
              <div className="timeline-item">
                <span className="time">{Math.round(weeklyHours * 0.5)} hrs</span>
                <span className="activity">Main Activities</span>
              </div>
              <div className="timeline-item">
                <span className="time">{Math.round(weeklyHours * 0.3)} hrs</span>
                <span className="activity">Practice & Assessment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Card */}
      <div className="assessment-card">
        <div className="card-header">
          <h2>📝 Assessment Plan</h2>
          <span className="duration">10-Week Course</span>
        </div>
        <div className="assessment-content">
          <div className="section">
            <h3>Assessment Strategy</h3>
            <div className="content-text">
              {aiOutput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
