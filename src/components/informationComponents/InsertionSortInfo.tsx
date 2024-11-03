import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const InsertionSortInfo: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeSnippets[selectedLanguage]);
            toast.success('Copied to clipboard!');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const codeSnippets: Record<string, string> = {
        JavaScript: `function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        // The key to be inserted
        let key = array[i]; // track the current element
        let j = i - 1; // track the previous element

        // Shift elements of the array, greater than the key, to the right
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        // Place the key at its correct position
        array[j + 1] = key;
    }
    return array;
}

console.log("Final sorted array:", insertionSort(array));
`,

        Python: `def insertion_sort(arr):
    for i in range(1,len(array)):
        # The key to be inserted
        key=array[i] #track the current element
        j=i-1 #track the previousdl element

        # Shift elements of the array, greater than the key, to the right
        while j>=0 and array[j]>key:
            array[j+1]=array[j]
            j=j-1

        # Place the key at its correct position
        array[j+1]=key  

    return array 

print("final sorted array: ", insertionSort(array))`,

        C: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        // The key to be inserted
        int key = arr[i]; // track the current element
        int j = i - 1; // track the previous element

        // Shift elements of the array, greater than the key, to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place the key at its correct position
        arr[j + 1] = key;
    }
}`,

        Java: `public static int[] insertionSort(int[] array) {
        for (int i = 1; i < array.length; i++) {
            // The key to be inserted
            int key = array[i]; // track the current element
            int j = i - 1; // track the previous element

            // Shift elements of the array, greater than the key, to the right
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }

            // Place the key at its correct position
            array[j + 1] = key;
        }
        return array;
    }
        `

    };

    return (
        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Toaster for notifications */}
            <Toaster position="top-right"/>
            {/* Information Section */}
            <div className="lg:w-2/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-teal-400 mb-4">Insertion Sort</h1>
                <p className="text-lg leading-relaxed">
                    Insertion sort is a simple sorting algorithm that iterates through the elements of an unsorted list
                    and inserts each element into the correct position in the sorted list. <br />
                    <br />
                    Like sorting cards in your hands, you take one card at a time and insert it into its sorted position.
                    Insertion sort is an unstable sorting algorithm, which means it can produce
                    a different output than other sorting algorithms. The worst-case performance is O(n²), while the best-case performance is O(n).
                </p>

                {/* Collapsible Sections for Details */}
                {[
                    { title: 'Time Complexity', details: ['Best Case: O(n)', 'Average Case: O(n²)', 'Worst Case: O(n²)'] },
                    { title: 'Space Complexity', details: ['Best Case: O(1)', 'Average Case: O(n)', 'Worst Case: O(n)'] },
                    { title: 'Advantages', details: ['Easy to implement', 'Simple to understand', 'Stable'] },
                    { title: 'Disadvantages', details: ['Unstable', 'Inefficient for large lists'] },
                ].map(({ title, details }) => (
                    <div key={title} className="transition-all">
                        <button
                            onClick={() => toggleSection(title)}
                            className="w-full text-left font-semibold text-yellow-400 text-lg bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none"
                        >
                            {title}
                        </button>
                        {expandedSection === title && (
                            <ul className="mt-2 ml-4 list-disc list-inside text-gray-300 space-y-1">
                                {details.map((detail) => (
                                    <li key={detail}>{detail}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Code Snippet Section */}
            <div className="lg:w-2/4 bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-4 transition-all">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Insertion Sort Code</h3>
                {/* Language Selector */}
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4 border border-gray-600"
                >
                    {Object.keys(codeSnippets).map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>

                {/* Code Display with Syntax Highlighting */}
                <div className="relative mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <button onClick={handleCopy} className="absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300">
                        <FaCopy size={18} />
                    </button>
                    <SyntaxHighlighter
                        language={selectedLanguage.toLowerCase()}
                        style={dracula}
                        className="rounded-lg overflow-hidden !bg-transparent"
                    >
                        {codeSnippets[selectedLanguage]}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default InsertionSortInfo;