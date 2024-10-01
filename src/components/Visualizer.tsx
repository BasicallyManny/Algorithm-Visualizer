import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
//import { motion } from 'framer-motion'; // Import framer-motion

// Default Animation variables
const ANIMATION_SPEED_MS = 1; // Adjusted for smoother animation
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

// Define the types for props (if any are needed)
interface VisualizerProps {
    ArraySize?: number; // Optional prop for setting the array size
}

// Define the state types
interface VisualizerState {
    array: number[];
    selectedAlgorithm: string;
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {
    constructor(props: VisualizerProps) {
        super(props);
        this.state = {
            array: [],
            selectedAlgorithm: "", // Initialize selectedAlgorithm state
        };
    }

    componentDidMount(): void {
        this.resetArray();
    }

    resetArray(): void {
        const array: number[] = [];
        const size = this.props.ArraySize || 50; // Default size if prop is not provided
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
        console.log("Array Reset");
    }

    insertionSort(): void {
        const sortedArray: number[] = algorithms.insertionSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Insertion Sort Status: " + this.verifySorted(sortedArray));
    }

    mergeSort() {
        const animations = algorithms.mergeSortDispatcher(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx]: [number, number] = animations[i];
                const barOneStyle: CSSStyleDeclaration = arrayBars[barOneIdx].style;
                const barTwoStyle: CSSStyleDeclaration = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight]: [number, number] = animations[i];
                    const barOneStyle: CSSStyleDeclaration = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort(): void {
        const sortedArray: number[] = algorithms.quickSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Quick Sort Status: " + this.verifySorted(sortedArray));
    }

    handleSort(): void {
        const { selectedAlgorithm } = this.state;
        if (selectedAlgorithm === "insertionSort") {
            this.insertionSort();
        } else if (selectedAlgorithm === "mergeSort") {
            this.mergeSort();
        } else if (selectedAlgorithm === "quickSort") {
            this.quickSort();
        }
    }

    verifySorted(array: number[]): boolean {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }
        return true;
    }

    render(): JSX.Element {
        const { array } = this.state;
        console.log(array); // Check that the array is populated

        return (
            <div id="visualizer-container" className="flex justify-center flex-col items-center h-screen !mt-8">
                <div
                    id="visualizer-wrapper"
                    className="flex justify-center items-end !mt-4"
                    style={{
                        height: '80vh',
                        width: '80vw',
                    }}
                >
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                                width: `${(100 / array.length)}%`, // Ensure bars fit in the container
                            }}
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center mt-8 w-full space-y-2">
                    <select
                        onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}
                        className="bg-purple-700 text-white font-bold rounded mb-2 sm:mb-0 sm:mr-2 w-3/4 sm:w-1/4 text-center"
                        style={{
                            height: '50px',
                        }}
                    >
                        <option value="">Select Sorting Algorithm</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                    </select>
                    <div id="Sorting_Buttons-Container" className="flex flex-cols space-x-4 sm:flex-row justify-center items-center w-full">
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded mb-2 sm:mb-0 w-3/4 sm:w-1/4 text-center"
                            onClick={() => this.resetArray()}
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
