import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Visualizer from './components/Visualizer';
import Navbar from './components/Navbar';
import SearchVisualizer from './components/SearchVisualizer';

// Simple About component going to implement a full page soon
const About: React.FC = () => {
  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4">This is a sorting visualizer application built with React and TypeScript.</p>
    </div>
  );
};

const App: React.FC = () => {
  const [arraySize, setArraySize] = useState(50);  // State for array size
  const [animationSpeed, setAnimationSpeed] = useState(20); // State for animation speed

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/visualizer" element={
          <div className="bg-black mb-3">
            <Visualizer
              ArraySize={arraySize}
              AnimationSpeed={animationSpeed}
              setArraySize={setArraySize}
              setAnimationSpeed={setAnimationSpeed}
            />
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/searchVisualizer" element={<SearchVisualizer />} />
      </Routes>
    </div>
  );
}

export default App;
