import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion'; // Import framer-motion
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InsertionSortInfo from "./informationComponents/InsertionSortInfo";
import MergeSortInfo from "./informationComponents/MergeSortInfo";
import QuickSortInfo from "./informationComponents/QuickSortInfo";



const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
let isSorting = false;

interface VisualizerProps {
    ArraySize?: number; // Optional prop for setting the array size
    AnimationSpeed?: number;
    setArraySize: (size: number) => void;       // Prop to update array size
    setAnimationSpeed: (speed: number) => void; // Prop to update animation speed
}

interface VisualizerState {
    array: number[];       // Represents the current array of heights for the bars
    selectedAlgorithm: string;
    barHeights: number[];  // Stores heights of the bars (initially identical to array)
    barColors: string[];   // Stores the color of each bar for animation purposes
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {
    private timeouts: NodeJS.Timeout[] = []; // Store timeout IDs

    constructor(props: VisualizerProps) {
        super(props);
        this.state = {
            array: [],
            selectedAlgorithm: "NOTHING",
            barHeights: [],
            barColors: [],
        };
    }

    componentDidMount(): void {
        this.resetArray();
    }

    componentDidUpdate(prevProps: VisualizerProps): void {
        if (prevProps.ArraySize !== this.props.ArraySize) {
            this.resetArray();
        }

        if (prevProps.AnimationSpeed !== this.props.AnimationSpeed) {
            this.props.setAnimationSpeed((this.props.AnimationSpeed ?? 25));
        }
    }

    resetTimeouts() {
        // Clear all existing timeouts
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
    }

    resetArray(): void {
        this.resetTimeouts(); // Clear previous timeouts
        isSorting = false;
        const array: number[] = [];
        const size = this.props.ArraySize || 50;
        const barColors: string[] = Array(size).fill(PRIMARY_COLOR);

        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }

        this.setState({
            array,
            barHeights: array,
            barColors,
        });
    }

    refreshPage(): void {
        window.location.reload();
    }

    quickSortVisualizer = () => {
        const array = this.state.array.slice();
        const animations = algorithms.quickSortDispatcher(array);
        this.visualizeQuickSort(animations);
    };

    visualizeQuickSort(animations: [number, number, string][]) {
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];

        this.resetTimeouts(); // Clear previous timeouts

        animations.forEach(([barIdx1, barIdx2, action], i) => {
            const timeout = setTimeout(() => {
                if (action === 'compare') {
                    barColors[barIdx1] = SECONDARY_COLOR;
                    barColors[barIdx2] = SECONDARY_COLOR;
                } else if (action === 'swap') {
                    const tempHeight = barHeights[barIdx1];
                    barHeights[barIdx1] = barHeights[barIdx2];
                    barHeights[barIdx2] = tempHeight;

                    barColors[barIdx1] = "green";
                    barColors[barIdx2] = "green";
                } else if (action === 'revert') {
                    barColors[barIdx1] = PRIMARY_COLOR;
                    barColors[barIdx2] = PRIMARY_COLOR;
                }

                this.setState({ barHeights, barColors });
            }, i * (this.props.AnimationSpeed ?? 25));

            this.timeouts.push(timeout);
        });

        // After sorting, reset all colors to cyan
        const resetTimeout = setTimeout(() => {
            for (let i = 0; i < barColors.length; i++) {
                const timeout = setTimeout(() => {
                    barColors[i] = "cyan";
                    this.setState({ barColors });
                }, i * (this.props.AnimationSpeed ?? 25));

                this.timeouts.push(timeout);
            }
        }, animations.length * (this.props.AnimationSpeed ?? 25));

        this.timeouts.push(resetTimeout);
        isSorting = false;
    }

    insertionSortVisualizer() {
        const animations = algorithms.insertionSortDispatcher([...this.state.array]);
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];

        this.resetTimeouts(); // Clear previous timeouts

        animations.forEach((animation, i) => {
            const [barIdx, newHeight, action] = animation;

            const timeout = setTimeout(() => {
                switch (action) {
                    case 'current':
                        barColors[barIdx] = 'orange';
                        break;
                    case 'compare':
                        barColors[barIdx] = 'red';
                        break;
                    case 'swap':
                        barHeights[barIdx] = newHeight;
                        barColors[barIdx] = PRIMARY_COLOR;
                        break;
                    case 'insert':
                        barHeights[barIdx] = newHeight;
                        barColors[barIdx] = 'blue';
                        break;
                    case 'sorted':
                        barColors[barIdx] = PRIMARY_COLOR;
                        break;
                    case 'revert':
                        barColors[barIdx] = SECONDARY_COLOR;
                        break;
                }

                this.setState({ barHeights, barColors });
            }, i * (this.props.AnimationSpeed ?? 25));

            this.timeouts.push(timeout);
        });
        isSorting = false;
    }

    /**
     * Initiate sorting and collection of animation steps for merge sort
     */
    mergeSortVisualizer() {
        const animations = algorithms.mergeSortDispatcher([...this.state.array]); // populate animation array withj merge sort steps from dispatcher
        const barHeights = [...this.state.barHeights]; //set initial height
        const barColors = [...this.state.barColors]; //set initial color

        this.resetTimeouts(); // Clear previous timeouts

        animations.forEach((animation, i) => {
            const isColorChange = i % 3 !== 2; //change color every 3 steps of the animation process
            const timeout = setTimeout(() => {
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animation;
                    barColors[barOneIdx] = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    barColors[barTwoIdx] = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                } else {
                    const [barOneIdx, newHeight] = animation;
                    barHeights[barOneIdx] = newHeight;
                }
                this.setState({ barHeights, barColors });
            }, i * (this.props.AnimationSpeed ?? 25));

            this.timeouts.push(timeout);
        });

        /**
         * After sorting, reset all colors to cyan
         */
        setTimeout(() => {
            for (let i = 0; i < barColors.length; i++) {
                const timeout = setTimeout(() => {
                    barColors[i] = PRIMARY_COLOR;
                    this.setState({ barColors });
                }, i * (this.props.AnimationSpeed ?? 25));

                this.timeouts.push(timeout);
            }
        }, animations.length * (this.props.AnimationSpeed ?? 25));
        isSorting = false;
    }

    /**
     * Initiate sorting and collection of animation steps   
     */
    handleSort(): void {
        const { selectedAlgorithm } = this.state;
        if (isSorting) {
            this.notifyUser("Please reset the array before sorting again.", 'error');
            return;
        }
        if (selectedAlgorithm === "NOTHING") {
            this.notifyUser("Please select a sorting algorithm before sorting.", 'error');
        }
        else if (selectedAlgorithm === "insertionSort") {
            this.insertionSortVisualizer();
            isSorting = true;
        } else if (selectedAlgorithm === "mergeSort") {
            this.mergeSortVisualizer();
            isSorting = true;
        } else if (selectedAlgorithm === "quickSort") {
            this.quickSortVisualizer();
            isSorting = true;
        }
    }

    /**
     * Render selected algorithm information
     */
    renderSelectedAlgorithmInfo = () => {
        const { selectedAlgorithm } = this.state;
        switch (selectedAlgorithm) {
            case "insertionSort":
                console.log("Insertion Sort Info Selected");
                return <InsertionSortInfo key="insertionSort" />;
            case "mergeSort":
                console.log("Merge Sort Info Selected");
                return <MergeSortInfo key="mergeSort" />;
            case "quickSort":
                console.log("Quick Sort Info Selected");
                return <QuickSortInfo key="quickSort" />;
            default:
                return <div className="flex align-middle justify-center text-3xl font-bold mb-16 text-white">Please select an algorithm to view information.</div>;
        }
    }

    /**
     * Toast notify user helper
     * @param message 
     * @param type 
     */
    notifyUser = (message: string, type: string) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    render(): JSX.Element {
        const { barHeights, barColors, selectedAlgorithm } = this.state;

        return (
            <>
                {/* Main Flex Container */}
                <div className="flex flex-col min-h-screen">
                    {/* Main Content Container */}
                    <div
                        id="visualizer-container"
                        className="flex flex-col items-center pt-20 mt-10 pb-4 flex-grow h-screen"
                    >
                        {/* Algorithm Selection Dropdown */}
                        <div className="mb-4">
                            <label className="text-white font-bold mr-2">Select Algorithm:</label>
                            <select
                                value={selectedAlgorithm}
                                onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}
                                className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
                            >
                                <option value="NOTHING">Select Sorting Algorithm</option>
                                <option value="insertionSort">Insertion Sort</option>
                                <option value="mergeSort">Merge Sort</option>
                                <option value="quickSort">Quick Sort</option>
                            </select>
                        </div>

                        {/* Visualizer Wrapper */}
                        <div
                            id="visualizer-wrapper"
                            className="flex justify-center items-end"
                            style={{
                                height: '60vh',
                                width: '80vw',
                                maxWidth: '1200px',
                            }}
                        >
                            {barHeights.map((height, idx) => (
                                <motion.div
                                    className="array-bar border-2 border-black"
                                    key={idx}
                                    initial={{ height: '0px' }}
                                    animate={{ height: `${height / 1.7}px` }}
                                    transition={{ ease: "linear", stiffness: 100 }}
                                    style={{
                                        backgroundColor: barColors[idx],
                                        width: `min(100% / ${barHeights.length}, 15px)`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Array Size and Speed Sliders */}
                        <div id="array-size-selectors" className="flex space-x-4 mt-6">
                            <div className="flex flex-col items-center text-white">
                                <label className="text-sm font-bold text-white">Array Size: {this.props.ArraySize}</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="50"
                                    value={this.props.ArraySize}
                                    onChange={(e) => this.props.setArraySize(Number(e.target.value))}
                                    className="w-64 appearance-none h-2 rounded-full bg-purple-700 cursor-pointer"
                                />
                            </div>
                            <div className="flex flex-col items-center text-white">
                                <label className="text-sm font-bold text-white">Animation Speed: {this.props.AnimationSpeed} ms</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={this.props.AnimationSpeed}
                                    onChange={(e) => this.props.setAnimationSpeed(Number(e.target.value))}
                                    className="w-64 appearance-none h-2 rounded-full bg-purple-700 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div id="buttons" className="flex flex-row space-x-4 mt-6">
                            <button
                                onClick={() => this.handleSort()}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Sort
                            </button>
                            <button
                                onClick={() => this.resetArray()}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Reset Array
                            </button>
                            <button
                                onClick={() => this.refreshPage()}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Reload
                            </button>
                        </div>

                        {/* Toast Container for Notifications */}
                        <ToastContainer
                            style={{
                                position: 'fixed',
                                top: '80px',
                                right: '10px',
                                zIndex: 9999,
                            }}
                            autoClose={3000}
                        />
                    </div>

                    {/* Display Selected Algorithm Information at Bottom */}
                    <div className="bg-black text-white p-4 rounded-t-lg w-full">
                        {this.renderSelectedAlgorithmInfo()}
                    </div>
                </div>
            </>


        );
    }
}

// Helper function to generate a random integer in a range
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}