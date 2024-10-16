import React from "react";
import * as algorithms from "../algorithms/sortingAlgorithms";
import { motion } from 'framer-motion'; // Import framer-motion
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported



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
    array: number[];
    selectedAlgorithm: string;
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {
    constructor(props: VisualizerProps) {
        super(props);
        this.state = {
            //Stores the list of numbers to be stored and be visualized by bars
            array: [],
            selectedAlgorithm: "NOTHING", // Initialize selectedAlgorithm state
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

    /**THIS IS HORRIBLE BUT IM TOO LAZY AND I WANT TO SLEEP SO TO RESET THE ARRAY IM JUST GOING TO REFRESH THE PAGE ITS 3 AM */
    refreshPage():void {
        window.location.reload(); // Refresh the entire page
    }

    quickSort = () => {
        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLDivElement>;
        const array = this.state.array.slice();
        const animations = algorithms.quickSortDispatcher(array);

        this.visualizeQuickSort(animations, arrayBars, ANIMATION_SPEED_MS);
    };

    // Visualize function
    visualizeQuickSort(animations: [number, number, string][], arrayBars: HTMLCollectionOf<HTMLDivElement>, animationSpeed: number) {
        for (let i = 0; i < animations.length; i++) {
            const [barIdx1, barIdx2, action] = animations[i];

            // Ensure we don't access out-of-bounds indexes
            if (barIdx1 >= arrayBars.length || barIdx2 >= arrayBars.length) {
                console.error(`Invalid index access: ${barIdx1}, ${barIdx2}`);
                continue;
            }

            const barOneStyle = arrayBars[barIdx1].style;
            const barTwoStyle = arrayBars[barIdx2].style;

            setTimeout(() => {
                if (action === 'compare') {
                    barOneStyle.backgroundColor = "green"; // Highlight comparison
                    barTwoStyle.backgroundColor = "green"; // Highlight pivot
                } else if (action === 'swap') {
                    // Perform the swap animation
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height; // Swap heights visually
                    barTwoStyle.height = tempHeight;

                    barOneStyle.backgroundColor = PRIMARY_COLOR; // Highlight after swap
                    barTwoStyle.backgroundColor = PRIMARY_COLOR; // Highlight after swap
                } else if (action === 'revert') {
                    // Revert color back to default
                    barOneStyle.backgroundColor = SECONDARY_COLOR; // Change to primary color
                    barTwoStyle.backgroundColor = SECONDARY_COLOR; // Change to primary color
                }
            }, i * animationSpeed);

            // Reset all bars to PRIMARY_COLOR in reverse order
            for (let i = arrayBars.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    const barStyle = arrayBars[i].style;
                    barStyle.backgroundColor = PRIMARY_COLOR; // Reset to primary color one at a time in reverse
                }, (animations.length + (arrayBars.length - 1 - i) + 1) * ANIMATION_SPEED_MS); // Stagger the reset
            }
        }
    }



    insertionSort() {
        const animations: [number, number][] = algorithms.insertionSortDispatcher(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLDivElement>;

        for (let i = 0; i < animations.length; i++) {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;

            // Set the color for comparison (secondary color)
            if (i % 3 === 0) {
                setTimeout(() => {
                    barStyle.backgroundColor = PRIMARY_COLOR; // Highlight during comparison
                }, i * ANIMATION_SPEED_MS);
            }

            // Animate height change
            setTimeout(() => {
                // Update the height of the bar
                barStyle.height = `${newHeight}px`;

                // If this is a bar that has been sorted, reset to primary color
                if (i % 3 === 2) {
                    barStyle.backgroundColor = PRIMARY_COLOR; // Set to primary color after sorting
                } else {
                    // Reset to secondary color for all other bars
                    barStyle.backgroundColor = SECONDARY_COLOR; // Reset to secondary color
                }
            }, (i + 1) * ANIMATION_SPEED_MS); // Increment timeout to ensure color change is visible
        }

        // Reset all bars to PRIMARY_COLOR in reverse order
        for (let i = arrayBars.length - 1; i >= 0; i--) {
            setTimeout(() => {
                const barStyle = arrayBars[i].style;
                barStyle.backgroundColor = PRIMARY_COLOR; // Reset to primary color one at a time in reverse
            }, (animations.length + (arrayBars.length - 1 - i) + 1) * ANIMATION_SPEED_MS); // Stagger the reset
        }
        console.log("Insertion Sort Status: " + this.verifySorted(this.state.array));
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
            } else {
                setTimeout(() => {
                    //access the inline style properties of the two bars being swapped.
                    const [barOneIdx, newHeight]: [number, number] = animations[i];
                    const barOneStyle: CSSStyleDeclaration = arrayBars[barOneIdx].style;
                    //update the height of the bar
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS); //ensure the animation is in the correct order
            }
        }
        console.log("Merge Sort Status: " + this.verifySorted(this.state.array));
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
        const { array } = this.state;//ARRAY TO BE SORTED
        console.log(array); // Check that the array is populated

        return (
            //UI ELEMENTS
            <div id="visualizer-container" className="flex justify-center flex-col items-center h-screen !mt-8">
                {/* Toast Container */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    draggable
                    pauseOnHover
                />
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