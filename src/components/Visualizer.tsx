import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InsertionSortInfo from "./informationComponents/InsertionSortInfo";
import MergeSortInfo from "./informationComponents/MergeSortInfo";
import QuickSortInfo from "./informationComponents/QuickSortInfo";

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
let isSorting = false;

/**
 *  Visualizer Props    
 */
interface VisualizerProps {
    ArraySize?: number;
    AnimationSpeed?: number;
    setArraySize: (size: number) => void;
    setAnimationSpeed: (speed: number) => void;
}

interface VisualizerState {
    array: number[];
    selectedAlgorithm: string;
    barHeights: number[];
    barColors: string[];
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {
    private timeouts: NodeJS.Timeout[] = [];

    /*
     * Changing the state rerenders the component
     */
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
    /**
     * Updates on each render
     * @param prevProps 
     */
    componentDidUpdate(prevProps: VisualizerProps): void {
        if (prevProps.ArraySize !== this.props.ArraySize) {
            this.resetArray();
        }

        if (prevProps.AnimationSpeed !== this.props.AnimationSpeed) {
            this.props.setAnimationSpeed(this.props.AnimationSpeed ?? 25);
        }
    }
    /* Resets all timeouts */
    resetTimeouts() {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
    }
    /**
     * Resets the array
     */
    resetArray(): void {
        this.resetTimeouts(); //reset all timeouts
        isSorting = false; //check if there is a sorting animation
        const array: number[] = []; //create an empty array
        //set the array props
        const size = this.props.ArraySize || 50;
        const barColors: string[] = Array(size).fill(PRIMARY_COLOR);
        /* fill the array with random heights */
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        //update the react state
        this.setState({
            array,
            barHeights: array,
            barColors,
        });
    }
    /* Refreshes the page */
    refreshPage(): void {
        window.location.reload();
    }
    /**
     * Runs the quicksort animation
     */
    quickSortVisualizer = () => {
        const array = this.state.array.slice(); //copy the subarrays
        const animations = algorithms.quickSortDispatcher(array);//get the steps of the animation
        this.visualizeQuickSort(animations); //visualize the animation
    };
    /**
     * Animation for quicksort
     * @param animations 
     */
    visualizeQuickSort(animations: [number, number, string][]) {
        //get the height and color states of the array being sorted
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];
        this.resetTimeouts(); //reset all timeouts
        //loop through the animations
        animations.forEach(([barIdx1, barIdx2, action], i) => {
            //sequence the animation and update the state
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

                //update the state
                this.setState({ barHeights, barColors });
            }, i * (this.props.AnimationSpeed ?? 25)); //set the animation speed

            this.timeouts.push(timeout); //timeout to visualzie the animation
        });

        //reset the colors
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
    /**
     * Runs the insertionsort animation
     */
    insertionSortVisualizer() {
        const animations = algorithms.insertionSortDispatcher([...this.state.array]); //get the steps of the animation
        const barHeights = [...this.state.barHeights]; //get
        const barColors = [...this.state.barColors];
        this.resetTimeouts(); //reset all timeouts
        //loop through the animations
        animations.forEach((animation, i) => {
            const [barIdx, newHeight, action] = animation; //get the index of the bar, the new height and the action    
            //sequence the animation and update the state
            const timeout = setTimeout(() => {
                switch (action) {
                    case 'current': //highlight the current element
                        barColors[barIdx] = 'orange';
                        break;
                    case 'compare': //highlight the element being compared
                        barColors[barIdx] = 'red';
                        break;
                    case 'swap': //swap the current element with the comparitor
                        barHeights[barIdx] = newHeight;
                        barColors[barIdx] = PRIMARY_COLOR; //hjighlight the swapped element
                        break;
                    case 'insert': //insert the current element
                        barHeights[barIdx] = newHeight; //upodate the height of the bar index
                        barColors[barIdx] = 'blue'; //highlight the inserted element
                        break;
                    case 'sorted': //highlight the sorted element
                        barColors[barIdx] = PRIMARY_COLOR;
                        break;
                    case 'revert': //reset the highlighted element
                        barColors[barIdx] = SECONDARY_COLOR;
                        break;
                }
                //update the state
                this.setState({ barHeights, barColors });
            }, i * (this.props.AnimationSpeed ?? 25)); //set the animation speed
            //add the timeout to the timeouts array 
            this.timeouts.push(timeout);
        });
        isSorting = false; //reset isSorting
    }
    /**
     * Runs the mergesort animation
     */
    /**
     * Visualizes the merge sort algorithm by animating the sorting process.
     * 
     * This method performs the following steps:
     * 1. Generates the merge sort animations.
     * 2. Updates the bar heights and colors based on the animations.
     * 3. Schedules timeouts to visualize each step of the sorting process.
     * 4. Resets the bar colors to the primary color after sorting is complete.
     * 
     * @remarks
     * This method uses the state properties `array`, `barHeights`, and `barColors`.
     * It also uses the `AnimationSpeed` prop for timing the animations.
     * 
     * @returns {void}
     */
    mergeSortVisualizer() {
        const animations = algorithms.mergeSortDispatcher([...this.state.array]);
        const barHeights = [...this.state.barHeights];
        const barColors = [...this.state.barColors];
        this.resetTimeouts();
        animations.forEach((animation, i) => {
            const isColorChange = i % 3 !== 2;
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
     * selects the algorithm to be used for sorting the array
     * @returns void
     */
    handleSort(): void {
        const { selectedAlgorithm } = this.state;
        if (isSorting) {
            this.notifyUser("Please reset the array before sorting again.", 'error');
            return;
        }
        if (selectedAlgorithm === "NOTHING") {
            this.notifyUser("Please select a sorting algorithm before sorting.", 'error');
        } else if (selectedAlgorithm === "insertionSort") {
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
     * Returns the appropriate component for the selected algorithm information
     * @returns JSX.Element
     */
    renderSelectedAlgorithmInfo = () => {
        const { selectedAlgorithm } = this.state;
        switch (selectedAlgorithm) {
            case "insertionSort":
                return <InsertionSortInfo key="insertionSort" />;
            case "mergeSort":
                return <MergeSortInfo key="mergeSort" />;
            case "quickSort":
                return <QuickSortInfo key="quickSort" />;
            default:
                return <div className="flex align-middle justify-center text-3xl font-bold mb-16 text-white">Please select an algorithm to view information.</div>;
        }
    }
    /**
     * Toast notification function
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
                <div className="flex flex-col min-h-screen">
                    <div
                        id="visualizer-container"
                        className="flex flex-col items-center pt-4 mt-2 pb-4 flex-grow"
                    >
                        <div className="mb-2 w-full flex justify-center">
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

                        <div
                            id="visualizer-wrapper"
                            className="flex justify-center items-end mt-20"
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

                        <div id="array-size-selectors" className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2">
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

                        <div id="buttons" className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
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

                    <div className="bg-black text-white p-4 rounded-t-lg w-full">
                        {this.renderSelectedAlgorithmInfo()}
                    </div>
                </div>
            </>
        );
    }
}
// Utility function to generate a random integer between min and max
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
