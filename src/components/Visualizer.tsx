import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion'; // Import framer-motion

// Default Animation variables
const ANIMATION_SPEED_MS = 50; // Adjusted for smoother animation
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
            //Stores the list of numbers to be stored and be visualized by bars
            array: [],
            selectedAlgorithm: "", // Initialize selectedAlgorithm state
        };
    }

    /**
     * Called when the component is mounted
     */
    componentDidMount(): void {
        this.resetArray();
    }

    /**
     * Resets the array
     */
    resetArray(): void {
        const array: number[] = [];
        const size = this.props.ArraySize || 50; // Default size if prop is not provided
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
        console.log("Array Reset");
    }

    /**
     * Calls Insertion Sort from sortingAlgorithms.ts
     */
    insertionSort(): void {
        const sortedArray: number[] = algorithms.insertionSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Insertion Sort Status: " + this.verifySorted(sortedArray));
    }
    /**
     * Calls the mergeSortDispatcher from sortingAlgorithms.ts
     * 
     */
    mergeSort() {
        //animations array to store the steps for updating the DOM for animations
        const animations = algorithms.mergeSortDispatcher(this.state.array); //mergeSortDispatcher returns an array of animations
        //Iterate over the steps of the animation
        for (let i = 0; i < animations.length; i++) {
            //Fetch all of the DOM elements with the class 'array-bar'
            const arrayBars = document.getElementsByClassName('array-bar'); //bars of the array being sorted
             ///////HANDLE THE COLOR CHANGE OF THE BARS (comparisons)///////
            const isColorChange = i % 3 !== 2;//every 3rd animation we change the height while the rest we change the color
            if (isColorChange) {
                const [barOneIdx, barTwoIdx]: [number, number] = animations[i]; //get the indexes of the bars to be compared
                //access the inline style properties of the two bars being compared.
                const barOneStyle: CSSStyleDeclaration = arrayBars[barOneIdx].style; 
                const barTwoStyle: CSSStyleDeclaration = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; //determine which color to change to
                 //delay the execution of the color change
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS); //ensure the animation is in the correct order
           ///////HANDLE THE HEIGHT CHANGE OF THE BARS (SWAPS///////
            } else{
                setTimeout(() => {
                    //access the inline style properties of the two bars being swapped.
                    const [barOneIdx, newHeight]: [number, number] = animations[i];
                    const barOneStyle: CSSStyleDeclaration = arrayBars[barOneIdx].style;
                    //update the height of the bar
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS); //ensure the animation is in the correct order
            }
        }
    }

    quickSort(): void {
        const sortedArray: number[] = algorithms.quickSort(this.state.array);
        this.setState({ array: sortedArray });
        console.log("Quick Sort Status: " + this.verifySorted(sortedArray));
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
        const { array } = this.state;//ARRAY TO BE SORTED
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
                     {/*RENDERING ARRAY BARS*/}
                    {array.map((value, idx) => (
                        //motion.div for bar animations
                        <motion.div 
                            className="array-bar border-2 border-black"
                            key={idx} // assigns a unique key to each bar based on its index in the array.
                            initial={{ height: '0px' }} // Initial height for animation
                            animate={{ height: `${value}px` }} // Animate to the current height
                            transition={{ type: 'spring', stiffness: 100 }} // Spring animation properties
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                width: `${(100 / array.length)}%`, // Ensure bars fit in the container
                            }}
                        />
                    ))}
                </div>

                {/*UI ELEMENTS*/}
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
