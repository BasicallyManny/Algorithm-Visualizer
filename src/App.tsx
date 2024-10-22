import React, { useState } from 'react';
import './App.css';
import Visualizer from './components/Visualizer';
import Navbar from './components/Navbar';

function App() {
    const [arraySize, setArraySize] = useState(50);  // State for array size
    const [animationSpeed, setAnimationSpeed] = useState(20); // State for animation speed

    return (
        <div>
            <Navbar />
            <div className="fixed bottom-14 left-0 right-0 mx-auto bg-black">
                <Visualizer
                    ArraySize={arraySize}
                    AnimationSpeed={animationSpeed}
                    setArraySize={setArraySize}         // Passing state setter for array size
                    setAnimationSpeed={setAnimationSpeed} // Passing state setter for animation speed
                />
            </div>
        </div>
    );
}

export default App;
