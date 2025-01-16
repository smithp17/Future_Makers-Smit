import React from "react";

function ResultDisplay({ responses, aiOutput }) {
  if (!responses || !aiOutput) return null;

  return (
    <div>
      <h2>Educator Responses</h2>
      <pre>{JSON.stringify(responses, null, 2)}</pre>

      <h2>Generated Lesson Plan and Assessment</h2>
      <p>{aiOutput}</p>
    </div>
  );
}

export default ResultDisplay;
