import React, { useState } from "react";
import EducatorForm from "./components/EducatorForm";
import ResultDisplay from "./components/ResultDisplay";
import './App.css';

function App() {
  const [responses, setResponses] = useState(null);
  const [aiOutput, setAIOutput] = useState(null);

  const imageOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleGenerate = (formData, generatedOutput) => {
    console.log("Form Data:", formData);
    console.log("Generated Output:", generatedOutput);

    if (!generatedOutput) {
      console.error("Generated Output is null or undefined.");
      return;
    }

    setResponses(formData);
    setAIOutput(generatedOutput);
  };

  const getImagePath = (index) => {
    const images = [
      '/images/image1.jpg',
      '/images/image2.jpeg',
      '/images/image3.jpg',
      '/images/image4.jpg',
      '/images/image5.jpg',
      '/images/image6.jpg',
      '/images/BUS.jpg',
      '/images/image8.jpg',
      '/images/image9.jpg',
    ];

    return images[index] || images[0]; // Return default image if index is out of bounds
  };

  return (
    <div className="page-container">
      <div className="main-container">
        {imageOrder.map((num, index) => (
          <div
            key={num}
            className="image-cell"
            style={{
              backgroundImage: `url(${getImagePath(index)})`
            }}
          />
        ))}
      </div>
      <div className="content-overlay">
        <div className="scroll-wrapper">
          <EducatorForm onGenerate={handleGenerate} />
          <ResultDisplay responses={responses} aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default App;
