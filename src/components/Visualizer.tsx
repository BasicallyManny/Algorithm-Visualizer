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

    render(): JSX.Element {
        const { array } = this.state;

        return (
            <>
                <h1>Bars</h1>
                {array.length === 0 ? (
                    <p>No data to display</p>
                ) : (
                    array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}

                        >
                            {value}
                        </div>
                    ))
                )}
            </>
        );
    }
}

// Function to generate a random integer between min and max
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


