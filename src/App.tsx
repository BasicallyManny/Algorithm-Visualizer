import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Visualizer from './components/Visualizer';
import Navbar from './components/Navbar';
import SearchVisualizer from './components/SearchVisualizer';
import About from './components/About';

const App: React.FC = () => {
  const [arraySize, setArraySize] = useState(50); // State for array size
  const [animationSpeed, setAnimationSpeed] = useState(20); // State for animation speed

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-20 bg-gray-800 text-white shadow-md">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex-grow bg-black">
        <Routes>
          <Route path="/" element={<About />} />
          <Route
            path="/visualizer"
            element={
              <div className="bg-black mb-3">
                <Visualizer
                  ArraySize={arraySize}
                  AnimationSpeed={animationSpeed}
                  setArraySize={setArraySize}
                  setAnimationSpeed={setAnimationSpeed}
                />
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/searchVisualizer" element={<SearchVisualizer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
