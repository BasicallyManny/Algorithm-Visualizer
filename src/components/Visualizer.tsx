import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion'; // Import framer-motion

// Default Animation variables
const ANIMATION_SPEED_MS = 20; // Adjusted for smoother animation
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

// Define the types for props (if any are needed)
interface VisualizerProps {
    ArraySize?: number; // Optional prop for setting the array size
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
            selectedAlgorithm: "",
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
                    barColors[barIdx1] = "green";
                    barColors[barIdx2] = "green";
                } else if (action === 'swap') {
                    const tempHeight = barHeights[barIdx1];
                    barHeights[barIdx1] = barHeights[barIdx2];
                    barHeights[barIdx2] = tempHeight;
                } else if (action === 'revert') {
                    barColors[barIdx1] = PRIMARY_COLOR;
                    barColors[barIdx2] = PRIMARY_COLOR;
                }
                this.setState({ barHeights, barColors });
            }, i * ANIMATION_SPEED_MS);
        });
    }

    insertionSort() {
        const animations = algorithms.insertionSortDispatcher([...this.state.array]);
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];
    
        animations.forEach((animation, i) => {
            const [barIdx, newHeight] = animation;
    
            setTimeout(() => {
                if (newHeight === -1) {
                    // Reset color for the bar that is now in its sorted position
                    barColors[barIdx] = PRIMARY_COLOR; // Reset to primary color
                } else {
                    // Update height for the bars that are being moved or compared
                    barHeights[barIdx] = newHeight; // Set height to the new value
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
        if (selectedAlgorithm === "insertionSort") {
            this.insertionSort();
        } else if (selectedAlgorithm === "mergeSort") {
            this.mergeSort();
        } else if (selectedAlgorithm === "quickSort") {
            this.quickSort();
        }
        else if (selectedAlgorithm === "NOTHING") {
            alert("Please select a sorting algorithm before sorting.");
        }
    }

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
            <div id="visualizer-container" className="flex justify-center flex-col items-center h-screen !mt-8">
                <div
                    id="visualizer-wrapper"
                    className="flex justify-center items-end !mt-4"
                    style={{
                        height: '80vh',
                        width: '80vw',
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
                                width: `${(100 / barHeights.length)}%`, // Ensure bars fit in the container
                            }}
                        />
                    ))}
                </div>

                {/* UI ELEMENTS */}
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
                    <div id="Sorting_Buttons-Container" className="flex flex-cols space-x-4 sm:flex-row justify-center items-center w-full">
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
            </div>
        );
    }
}

// Function to generate a random integer between min and max
function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
