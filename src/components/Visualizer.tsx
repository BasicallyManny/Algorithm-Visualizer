import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";

export default class Visualizer extends React.Component {
    constructor(props) {
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
        const array = [];
        const size = this.props.ArraySize || 50; // Default size if prop is not provided

        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }

        this.setState({ array });
        console.log("Array Reset");
    }

    /**
     * Insertion Sort handler
     */
    insertionSort() {
        const sortedArray: number[] = algorithms.insertionSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Insertion Sort Status: " + this.verifySorted(sortedArray));
    }

    /**
     * Merge Sort handler
     */
    mergeSort() {
        const sortedArray: number[] = algorithms.mergeSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Merge Sort Status: " + this.verifySorted(sortedArray));
    }

    /**
     * Quick Sort handler
     */
    quickSort() {
        const sortedArray: number[] = algorithms.quickSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Quick Sort Status: " + this.verifySorted(sortedArray));
    }

    handleSort() {
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
        const { array, selectedAlgorithm } = this.state;

        return (
            /**
             * Visualizer Component
             */
            <div id="visualizer-container" className="flex justify-center flex-col items-center h-screen !mt-8">
                <div
                    id="visualizer-wrapper"
                    className="flex justify-center items-end !mt-4"
                    style={{
                        height: '80vh',
                        width: '80vw',
                    }}
                >
                    {array.length === 0 ? (
                        <p>No data to display</p>
                    ) : (
                        array.map((value, idx) => (
                            <div
                                key={idx}
                                className={`bg-purple-400 border-2 ${window.innerWidth <= 430 ? 'border-purple-500' : 'border-purple-600'}`} // Purple border for screens <= 430px
                                style={{
                                    height: `${value * 0.1}vh`,
                                    width: '1.5vw',
                                }}
                            ></div>
                        ))
                    )}
                </div>

                {/* Sorting Buttons */}
                <div className="flex flex-col items-center mt-8 w-full space-y-2">
                    <select
                        onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}
                        className="bg-purple-700 text-white font-bold rounded mb-2 sm:mb-0 sm:mr-2 w-3/4 sm:w-1/4 text-center"
                        style={{
                            height: '50px', // Fixed height
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
                                height: '50px', // Fixed height to match the dropdown and sort button
                            }}
                        >
                            Reset
                        </button>
                        <button
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded mb-2 sm:mb-0 w-3/4 sm:w-1/4 text-center"
                            onClick={() => this.handleSort()}
                            disabled={!selectedAlgorithm} // Disable button if no algorithm is selected
                            style={{
                                height: '50px', // Fixed height
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
