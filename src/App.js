import React, { useState } from "react";
import EducatorForm from "./components/EducatorForm";
import ResultDisplay from "./components/ResultDisplay";
import './App.css';

function App() {
  const [responses, setResponses] = useState(null);
  const [aiOutput, setAIOutput] = useState(null);
  const [imageOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleGenerate = (formData, generatedOutput) => {
    console.log('Form Data:', formData);
    console.log('Generated Output:', generatedOutput);
    setResponses(formData);
    setAIOutput(generatedOutput);
  };

  const getImagePath = (index) => {
    switch(index) {
      case 0: return '/images/image1.jpg';
      case 1: return '/images/image2.jpeg';
      case 2: return '/images/image3.jpg';
      case 3: return '/images/image4.jpg';
      case 4: return '/images/image5.jpg';
      case 5: return '/images/image6.jpg';
      case 6: return '/images/BUS.jpg';
      case 7: return '/images/image8.jpg';
      case 8: return '/images/image9.jpg';
      default: return '/images/image1.jpg';
    }
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
