import React, { useState, useEffect } from "react";
import EducatorForm from "./components/EducatorForm";
import ResultDisplay from "./components/ResultDisplay";
import './App.css';

function App() {
  const [responses, setResponses] = useState(null);
  const [aiOutput, setAIOutput] = useState(null);
  const [imageOrder, setImageOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isHovering, setIsHovering] = useState(false);

  // Shuffle images every 15 seconds
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      if (!isHovering) {  // Only shuffle if not hovering
        setImageOrder(prevOrder => {
          const newOrder = [...prevOrder];
          for (let i = newOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
          }
          return newOrder;
        });
      }
    }, 15000);

    return () => clearInterval(shuffleInterval);
  }, [isHovering]);

  const handleGenerate = (formData, aiOutput) => {
    setResponses(formData);
    setAIOutput(aiOutput);
  };

  return (
    <div className="page-container">
      <div 
        className="main-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {imageOrder.map((num) => (
          <div 
            key={num} 
            className="image-cell"
            style={{ animationDelay: `${num * 0.2}s` }}
          />
        ))}
      </div>
      <div className="content-overlay">
        <EducatorForm onGenerate={handleGenerate} />
        <ResultDisplay responses={responses} aiOutput={aiOutput} />
      </div>
    </div>
  );
}

export default App;
