import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InsertionSortInfo: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const codeSnippets: Record<string, string> = {
        JavaScript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
        Python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        C: `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Information Section */}
            <div className="lg:w-3/5 bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-teal-400 mb-4">Insertion Sort</h1>
                <p className="text-lg leading-relaxed">
                    Insertion sort is a simple sorting algorithm that iterates through the elements of an unsorted list
                    and inserts each element into the correct position in the sorted list. <br />
                    Like sorting cards in your hands, you take one card at a time and insert it into its sorted position.
                    Insertion sort is an unstable sorting algorithm, which means it can produce <br />
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
            <div className="lg:w-2/5 bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-4 transition-all">
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
                <SyntaxHighlighter language={selectedLanguage.toLowerCase()} style={dracula} className="rounded-lg">
                    {codeSnippets[selectedLanguage]}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default InsertionSortInfo;
