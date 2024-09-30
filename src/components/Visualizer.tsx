import React from "react";

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [], // Initialize the state as 'array'
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

        this.setState({ array: array });
    }

    insertionSort(){

    }

    mergeSort(){

    }

    quickSort(){

    }

    verifySorted(array: number[]): boolean {
        for (let i = 0; i < array.length - 1; i++) { 
            if (array[i] !== array[i + 1]) {
                return false;
            }
        }
        return true;
    }

    render(): JSX.Element {
        const { array } = this.state;

        return (
            <div id="visualizer-container" className="flex justify-center align-baseline flex-col items-center ">
                <div id="visualizer-wrapper">
                    {array.length === 0 ? (
                        <p>No data to display</p>
                    ) : (
                        array.map((value, idx) => (
                            <div id="bar-container" className="justify-center inline-block bg-teal-400 border-2	">
                                <div style={{ height: `${value}px` }} className="m-1 w-3" key={idx}></div>
                            </div>
                        ))
                    )}
                    <div className="flex justify-center mt-2 space-x-2">
                        <button className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded w-24" onClick={() => this.resetArray()}>
                            Reset
                        </button>
                    </div>
                    <div id="Sorting_Buttons-Container" className="flex justify-center space-x-2 mt-3">
                        <button className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded" onClick={() => this.insertsionSort()}>
                            Insertion Sort
                        </button>
                        <button className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded" onClick={() => this.mergeSort()}>
                            Merge Sort
                        </button>
                        <button className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded" onClick={() => this.quickSort()}>
                            Quick Sort
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

// Function to generate a random integer between min and max
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


