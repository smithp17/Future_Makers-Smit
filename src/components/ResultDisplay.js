import React from "react";

const ResultDisplay = ({ responses, aiOutput }) => {
  if (!responses || !aiOutput) return null;

  const weeklyHours = Number(responses.time);
  const totalHours = weeklyHours * 10;

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

      {/* Curriculum Plan Card */}
      <div className="curriculum-card">
        <div className="card-header">
          <h2>🎯 Curriculum Plan</h2>
        </div>
        <div className="curriculum-content">
          <div className="section">
            <h3>Learning Objectives</h3>
            <div className="content-text">
              {aiOutput}
            </div>
          </div>

          <div className="section">
            <h3>Standards Alignment</h3>
            <div className="standards-grid">
              <div className="standard-item">
                <h4>NGSS</h4>
                <ul>
                  <li>PS3.B: Energy Transfer</li>
                  <li>ETS1.B: Design Solutions</li>
                </ul>
              </div>
              <div className="standard-item">
                <h4>CASEL SEL</h4>
                <ul>
                  <li>Self-Awareness</li>
                  <li>Social Awareness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Card */}
      <div className="schedule-card">
        <div className="card-header">
          <h2>📅 Weekly Schedule</h2>
        </div>
        <div className="timeline-grid">
          <div className="timeline-item">
            <span className="time">{Math.round(weeklyHours * 0.3)} hrs</span>
            <div className="activity-details">
              <h4>Theory & Concepts</h4>
              <p>Introduction to flying machines, energy concepts, vocabulary</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="time">{Math.round(weeklyHours * 0.4)} hrs</span>
            <div className="activity-details">
              <h4>Hands-on Building</h4>
              <p>Construction, testing, and iteration of flying machines</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="time">{Math.round(weeklyHours * 0.3)} hrs</span>
            <div className="activity-details">
              <h4>Assessment & Reflection</h4>
              <p>Documentation, testing results, and group discussions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Strategy Card */}
      <div className="assessment-card">
        <div className="card-header">
          <h2>📝 Assessment Strategy</h2>
        </div>
        <div className="assessment-content">
          <div className="section">
            <h3>Evaluation Methods</h3>
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
