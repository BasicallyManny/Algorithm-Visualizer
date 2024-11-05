import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';



const QuickSortInfo: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [codeSnippet, setCodeSnippet] = useState<string>('');

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeSnippet);
            toast.success('Copied to clipboard!');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const fetchCodeSnippet = async (language: string): Promise<string> => {
        const path = `/codeSnippets/QuickSortSnippets/${language}.txt`;
        //console.log(`Fetching from: ${path}`); was used for debugging purposes
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Error fetching ${language}.txt`);
            }
            return await response.text();
        } catch (error) {
            console.error("Failed to fetch code snippet:", error);
            return '';
        }
    };


    useEffect(() => {
        const loadSnippet = async () => {
            const snippet = await fetchCodeSnippet(selectedLanguage);
            setCodeSnippet(snippet);
        };
        loadSnippet();
    }, [selectedLanguage]);

    return (
        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-6 ">
            {/* Toaster for notifications */}
            <Toaster position="top-right" />
            {/* Information Section */}
            <div className="lg:w-2/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-teal-400 mb-4">Quick Sort</h1>
                <p className="text-lg leading-relaxed">
                    Quick Sort is an divide and conquer algorithm that sorts a list of elements by an element as an pivot and partitions the array from low to high.
                    In my implementation I chose a random pivot point as it avoids the worse case O(n²) complexity. This may happen when the array is already sorted
                    or is nearly sorted. Once we have the pivot point we partition and swap elements RECURSIVELY until the array is sorted.
                    <br />
                    <br />
                    In this implementation we use the Hoare’s partition Schema. As it is the most effective due to less
                    swaps and doesn’t move elements already in the correct position and inserts each element into the correct
                    position in the sorted list.
                </p>

                {/* Collapsible Sections for Details */}
                {[
                    { title: 'Time Complexity', details: ['Best Case: O(nlog(n))', 'Average Case: O(nlog(n))', 'Worst Case: O(n²)'] },
                    { title: 'Space Complexity', details: ['Best Case: O(nlog(n))', 'Average Case: O(nlog(n))', 'Worst Case: O(n)'] },
                    { title: 'Advantages', details: ['Efficient on large data sets', 'Low overhead requires small amount of memory'] },
                    {
                        title: 'Disadvantages', details: [
                            'If a bad pivot is chosen it runs in O(n²) time',
                            'Not good for small datasets',
                            'Not a stable sort']
                    },
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
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Quick Sort Code</h3>
                {/* Language Selector */}
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg mb-4 border border-gray-600"
                >
                    {['JavaScript', 'Python', 'C', 'Java'].map((language) => (
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
                        {codeSnippet}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default QuickSortInfo;