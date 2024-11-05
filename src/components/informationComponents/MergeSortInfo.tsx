import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const MergeSortInfo: React.FC = () => {
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
        const path = `/codeSnippets/MergeSortSnippets/${language}.txt`;
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
            <Toaster position="top-right" />
            <div className="lg:w-2/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-teal-400 mb-4">Merge Sort</h1>
                <p className="text-lg leading-relaxed">
                    Merge sort is a divide and conquer sorting algorithm popular for its efficiency and stability. This sorting algorithm
                    works by dividing the input array into two halves, sorting each half recursively, and then merging the two sorted
                    halves back together. The Merge sort algorithm is a stable sorting algorithm that is efficient for large data sets.
                </p>
                {/* Collapsible Sections for Details */}
                {[{
                    title: 'Time Complexity',
                    details: ['Best Case: O(nlog(n))', 'Average Case: O(nlog(n))', 'Worst Case: O(nlog(n))']
                }, {
                    title: 'Space Complexity',
                    details: ['Best Case: O(1)', 'Average Case: O(n)', 'Worst Case: O(n)']
                }, {
                    title: 'Advantages',
                    details: ['Sorting large data sets through external sorting', 
                        ' Efficiently sorts linked lists without random access', 
                        'Guaranteed worse case runtime of O(nlog(n))']
                }, {
                    title: 'Disadvantages',
                    details: ['Requires additional memory', 
                        'Inefficient for large lists',
                        'Recursive calls can add overhead']
                }].map(({ title, details }) => (
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
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Merge Sort Code</h3>
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

export default MergeSortInfo;
