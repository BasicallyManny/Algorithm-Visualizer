import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion'; // Import framer-motion
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Default Animation variables
const ANIMATION_SPEED_MS = 20; // Adjusted for smoother animation
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

// Define the types for props (if any are needed)
interface VisualizerProps {
    ArraySize?: number; // Optional prop for setting the array size
    AnimationSpeed: number;
    setArraySize: (size: number) => void;       // Prop to update array size
    setAnimationSpeed: (speed: number) => void; // Prop to update animation speed
}

// Define the state types
interface VisualizerState {
    array: number[];       // Represents the current array of heights for the bars
    selectedAlgorithm: string;
    barHeights: number[];  // Stores heights of the bars (initially identical to array)
    barColors: string[];   // Stores the color of each bar for animation purposes
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {
    constructor(props: VisualizerProps) {
        super(props);
        this.state = {
            array: [],
            selectedAlgorithm: "NOTHING",
            barHeights: [], // Initial heights (empty)
            barColors: [] // Initial colors (empty)
        };
    }

    /**
     * Called when the component is mounted
     */
    componentDidMount(): void {
        this.resetArray();
    }

    // Use componentDidUpdate to check if ArraySize has changed
    componentDidUpdate(prevProps: VisualizerProps): void {
        if (prevProps.ArraySize !== this.props.ArraySize) {
            this.resetArray();
        }
    }

    /**
     * Resets the array and sets initial heights and colors
     */
    resetArray(): void {
        const array: number[] = [];
        const size = this.props.ArraySize || 50;
        const barColors: string[] = Array(size).fill(PRIMARY_COLOR); // Default all colors to PRIMARY_COLOR

        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }

        this.setState({
            array,
            barHeights: array,  // Initialize barHeights as the array values
            barColors,          // Initialize all bars to PRIMARY_COLOR
        });
    }

    /**THIS IS HORRIBLE BUT IM TOO LAZY AND I WANT TO SLEEP SO TO RESET THE ARRAY IM JUST GOING TO REFRESH THE PAGE ITS 3 AM */
    refreshPage(): void {
        window.location.reload(); // Refresh the entire page
    }

    /**
     * Quick Sort Visualization
     */
    quickSort = () => {
        const array = this.state.array.slice();
        const animations = algorithms.quickSortDispatcher(array);

        // Handle animations through state
        this.visualizeQuickSort(animations);
    };

    visualizeQuickSort(animations: [number, number, string][]) {
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];

        animations.forEach(([barIdx1, barIdx2, action], i) => {
            setTimeout(() => {
                if (action === 'compare') {
                    barColors[barIdx1] = SECONDARY_COLOR;   // Color for comparison (red)
                    barColors[barIdx2] = SECONDARY_COLOR;   // Highlight pivot (red)
                } else if (action === 'swap') {
                    // Swap the heights
                    const tempHeight = barHeights[barIdx1];
                    barHeights[barIdx1] = barHeights[barIdx2];
                    barHeights[barIdx2] = tempHeight;

                    // Change colors to green after swapping
                    barColors[barIdx1] = "green"; // Swapped bar turns green
                    barColors[barIdx2] = "green"; // Swapped bar turns green
                } else if (action === 'revert') {
                    barColors[barIdx1] = PRIMARY_COLOR;  // Revert to default color 
                    barColors[barIdx2] = PRIMARY_COLOR;  // Revert to default color
                }

                this.setState({ barHeights, barColors });
            }, i * ANIMATION_SPEED_MS);
        });

        // After sorting, reset all colors to cyan
        setTimeout(() => {
            for (let i = 0; i < barColors.length; i++) {
                setTimeout(() => {
                    barColors[i] = "cyan";
                    this.setState({ barColors });
                }, i * ANIMATION_SPEED_MS);
            }
        }, animations.length * ANIMATION_SPEED_MS);
    }



    insertionSort() {
        const animations = algorithms.insertionSortDispatcher([...this.state.array]);
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];

        animations.forEach((animation, i) => {
            const [barIdx, newHeight, action] = animation;

            setTimeout(() => {
                switch (action) {
                    case 'current':
                        barColors[barIdx] = 'orange'; // Highlight current bar being processed
                        break;
                    case 'compare':
                        barColors[barIdx] = 'red'; // Bars being compared
                        break;
                    case 'swap':
                        barHeights[barIdx] = newHeight; // Swap the bars
                        barColors[barIdx] = PRIMARY_COLOR; // Color swap
                        break;
                    case 'insert':
                        barHeights[barIdx] = newHeight; // Update height of inserted element
                        barColors[barIdx] = 'blue'; // Color of insertion
                        break;
                    case 'sorted':
                        barColors[barIdx] = PRIMARY_COLOR; // Mark bar as sorted
                        break;
                    case 'revert':
                        barColors[barIdx] = SECONDARY_COLOR; // Revert to default color after comparison
                        break;
                }

                // Update the state with the new heights and colors
                this.setState({ barHeights, barColors });
            }, i * ANIMATION_SPEED_MS);
        });
    }


    /**
     * Merge Sort Visualization
     */
    mergeSort() {
        // Get animations but work on a copy of the array to avoid pre-sorting the state
        const animations = algorithms.mergeSortDispatcher([...this.state.array]);
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];

        animations.forEach((animation, i) => {
            const isColorChange = i % 3 !== 2;
            setTimeout(() => {
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animation;
                    barColors[barOneIdx] = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    barColors[barTwoIdx] = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                } else {
                    const [barOneIdx, newHeight] = animation;
                    barHeights[barOneIdx] = newHeight;
                }
                this.setState({ barHeights, barColors });
            }, i * ANIMATION_SPEED_MS);
        });

        // Reset all bars to PRIMARY_COLOR after sorting
        setTimeout(() => {
            for (let i = 0; i < barColors.length; i++) {
                setTimeout(() => {
                    barColors[i] = PRIMARY_COLOR;
                    this.setState({ barColors });
                }, i * ANIMATION_SPEED_MS);
            }
        }, animations.length * ANIMATION_SPEED_MS);
    }


    /**
     * Calls the appropriate function from when the right value is selected
     */
    handleSort(): void {
        const { selectedAlgorithm } = this.state;
        if(selectedAlgorithm === "NOTHING"){
            this.notifyUser("Please select a sorting algorithm before sorting.", 'error');
        }
        else if (selectedAlgorithm === "insertionSort") {
           this.insertionSort();
        }else if (selectedAlgorithm === "mergeSort") {
            this.mergeSort();
        }else if (selectedAlgorithm === "quickSort") {
            this.quickSort();
        }
    }

    notifyUser = (message, type) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    /**
     * Checks if the array is sorted in ascending order
     */
    verifySorted(array: number[]): boolean {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 
     * @returns 
     */
    render(): JSX.Element {
        const { barHeights, barColors } = this.state;

        return (
            //UI ELEMENTS
            <div id="visualizer-container" className="flex justify-center flex-col items-center !mt-8 !mb-8 ">
                <div
                    id="visualizer-wrapper"
                    className="flex justify-center items-end !mt-4"
                    style={{
                        height: '80vh',
                        width: '80vw',
                        maxWidth: '1200px', // Set a max width to avoid over-expanding the container
                    }}
                >
                    {/* RENDERING ARRAY BARS */}
                    {barHeights.map((height, idx) => (
                        <motion.div
                            className="array-bar border-2 border-black"
                            key={idx}
                            initial={{ height: '0px' }}
                            animate={{ height: `${height}px` }}
                            transition={{ ease: "linear", stiffness: 100 }}
                            style={{
                                backgroundColor: barColors[idx], // Color controlled by state
                                width: `min(100% / ${barHeights.length}, 15px)`, // Set a minimum width for bars
                            }}
                        />
                    ))}
                </div>
                <div id="array-size-selecors">
                    {/* Slider for adjusting array size */}
                    <div id="sizeSlider" className="flex flex-col items-center text-white m-4">
                        <label className="text-sm font-bold text-white">Array Size: {this.props.ArraySize}</label>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            value={this.props.ArraySize}
                            onChange={(e) => this.props.setArraySize(Number(e.target.value))}
                            className="w-full appearance-none h-2 rounded-full bg-purple-700 cursor-pointer"
                            style={{
                                background: 'linear-gradient(to right, #6b46c1, #b794f4)', // Gradient purple for track
                            }}
                        />
                    </div>
                    {/* Slider for adjusting animation speed */}
                    <div className="flex flex-col items-center text-white m-4">
                        <label className="text-sm font-bold">Speed: {this.props.AnimationSpeed}ms</label>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={this.props.AnimationSpeed}
                            onChange={(e) => this.props.setAnimationSpeed(Number(e.target.value))}
                            className="w-full appearance-none h-2 rounded-full bg-purple-700 cursor-pointer"
                            style={{
                                background: 'linear-gradient(to right, #6b46c1, #b794f4)', // Gradient purple for track
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center mt-8 w-full space-y-2">
                    <select
                        //Upon selection the State of the selectedAlgorithm is updated
                        onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}
                        className="bg-purple-700 text-white font-bold rounded mb-2 sm:mb-0 sm:mr-2 w-3/4 sm:w-1/4 text-center"
                        style={{
                            height: '50px',
                        }}
                    >
                        <option value="NOTHING">Select Sorting Algorithm</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                    </select>
                    <div id="Sorting_Buttons-Container" className="flex flex-cols space-x-4 sm:flex-row justify-center items-center w-full ">
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded mb-2 sm:mb-0 w-3/4 sm:w-1/4 text-center"
                            onClick={() => this.refreshPage()}
                            style={{
                                height: '50px',
                            }}
                        >
                            Reset
                        </button>
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded mb-2 sm:mb-0 w-3/4 sm:w-1/4 text-center"
                            onClick={() => this.handleSort()}
                            disabled={!this.state.selectedAlgorithm}
                            style={{
                                height: '50px',
                            }}
                        >
                            Sort
                        </button>
                    </div>
                </div>
                {/* Toast Notification Container */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
            </div>
        );
    }
}

// Function to generate a random integer between min and maxs
function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
} 
