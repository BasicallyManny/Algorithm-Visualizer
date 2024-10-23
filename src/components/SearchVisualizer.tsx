import React from 'react';
import myImage from '../assets/cat.jpg'; // Adjust path based on your project structure

const SearchVisualizer: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${myImage})`,
      }}
    >
      {/* Add any content you want over the background here */}
      <h1 className="text-white text-4xl font-bold">WORK IN PROGRESS</h1>
    </div>
  );
};

export default SearchVisualizer;