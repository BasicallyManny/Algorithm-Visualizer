import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';



const QuickSortInfo: React.FC = () => {
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
        JavaScript: `function hoarePartition(array, low, high) {
    // Randomly select a pivot index between low and high
    const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    
    // Swap the randomly chosen pivot with the first element
    [array[low], array[pivotIndex]] = [array[pivotIndex], array[low]];
    
    // Now the pivot is the first element
    const pivot = array[low];
    
    let i = low - 1;
    let j = high + 1;

    while (true) {
        // Move i to the right until an element >= pivot is found
        do {
            i++;
        } while (array[i] < pivot);

        // Move j to the left until an element <= pivot is found
        do {
            j--;
        } while (array[j] > pivot);

        // If i and j have crossed, return the partition index
        if (i >= j) return j;

        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function quickSort(array, low, high) {
    if (low < high) {
        // Partition the array using Hoare's partition scheme
        const pi = hoarePartition(array, low, high);
        
        // Recursively sort the two halves
        quickSort(array, low, pi);       // Note: "pi", not "pi-1"
        quickSort(array, pi + 1, high);  // pi + 1 starts from the next segment
    }
}

const array = [34, 7, 23, 32, 5, 62];
quickSort(array, 0, array.length - 1);
console.log("Sorted array:", array);

`,

        Python: `import random

def hoare_partition(array, low, high):
    # Randomly select a pivot index between low and high
    pivot_index = random.randint(low, high)
    
    # Swap the randomly chosen pivot with the first element
    array[low], array[pivot_index] = array[pivot_index], array[low]
    
    # Now the pivot is the first element
    pivot = array[low]
    
    i = low - 1
    j = high + 1

    while True:
        # Move i to the right until an element >= pivot is found
        i += 1
        while array[i] < pivot:
            i += 1

        # Move j to the left until an element <= pivot is found
        j -= 1
        while array[j] > pivot:
            j -= 1

        # If i and j have crossed, return the partition index
        if i >= j:
            return j

        # Swap elements at i and j
        array[i], array[j] = array[j], array[i]

def quickSort(array, low, high):
    if low < high:
        # Partition the array using Hoare's partition scheme
        pi = partition(array, low, high)
        
        # Recursively sort the two halves
        quickSort(array, low, pi)     # Note: "pi", not "pi-1"
        quickSort(array, pi + 1, high)  # pi + 1 starts from the next segment

    return array
        `,

        C: `int hoarePartition(int array[], int low, int high) {
    // Randomly select a pivot index between low and high
    int pivotIndex = low + rand() % (high - low + 1);
    
    // Swap the randomly chosen pivot with the first element
    int temp = array[low];
    array[low] = array[pivotIndex];
    array[pivotIndex] = temp;
    
    // Now the pivot is the first element
    int pivot = array[low];
    
    int i = low - 1;
    int j = high + 1;

    while (1) {
        // Move i to the right until an element >= pivot is found
        do {
            i++;
        } while (array[i] < pivot);

        // Move j to the left until an element <= pivot is found
        do {
            j--;
        } while (array[j] > pivot);

        // If i and j have crossed, return the partition index
        if (i >= j) return j;

        // Swap elements at i and j
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

void quickSort(int array[], int low, int high) {
    if (low < high) {
        // Partition the array using Hoare's partition scheme
        int pi = hoarePartition(array, low, high);
        
        // Recursively sort the two halves
        quickSort(array, low, pi);       // Note: "pi", not "pi-1"
        quickSort(array, pi + 1, high);  // pi + 1 starts from the next segment
    }
}`,

        Java: `import java.util.Random;
public class QuickSort {
    public static int hoarePartition(int[] array, int low, int high) {
        Random random = new Random();
        
        // Randomly select a pivot index between low and high
        int pivotIndex = low + random.nextInt(high - low + 1);
        
        // Swap the randomly chosen pivot with the first element
        int temp = array[low];
        array[low] = array[pivotIndex];
        array[pivotIndex] = temp;
        
        // Now the pivot is the first element
        int pivot = array[low];
        
        int i = low - 1;
        int j = high + 1;

        while (true) {
            // Move i to the right until an element >= pivot is found
            do {
                i++;
            } while (array[i] < pivot);

            // Move j to the left until an element <= pivot is found
            do {
                j--;
            } while (array[j] > pivot);

            // If i and j have crossed, return the partition index
            if (i >= j) {
                return j;
            }

            // Swap elements at i and j
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

public static void quickSort(int[] array, int low, int high) {
    if (low < high) {
        // Partition the array using Hoare's partition scheme
        int pi = hoarePartition(array, low, high);

        // Recursively sort the two halves
        quickSort(array, low, pi);       // Note: "pi", not "pi-1"
        quickSort(array, pi + 1, high);  // pi + 1 starts from the next segment
        }
    }
}

        `

    };

    return (
        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Toaster for notifications */}
            <Toaster position="top-right"/>
            {/* Information Section */}
            <div className="lg:w-2/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-teal-400 mb-4">Quick Sort</h1>
                <p className="text-lg leading-relaxed">
                    Quick Sort is an divide and conquer algorithm that sorts a list of elements by an element as an pivot and partitions the array from low to high.
                    In my implementation I chose a random pivot point as it avoids the worse case O(n²) complexity. This may happen when the array is already sorted
                    or is nearly sorted. Once we have the pivot point we partition and swap elements RECURSIVELY until the array is sorted.
                    <br />
                    <br />
                    In this implementation we use the Hoare’s partition Schema. As it is the most effective due to less <br />
                    swaps and doesn’t move elements already in the correct position and inserts each element into the correct
                    position in the sorted list.
                </p>

                {/* Collapsible Sections for Details */}
                {[
                    { title: 'Time Complexity', details: ['Best Case: O(nlog(n))', 'Average Case: O(nlog(n))', 'Worst Case: O(n²)'] },
                    { title: 'Space Complexity', details: ['Best Case: O(nlog(n))', 'Average Case: O(nlog(n))', 'Worst Case: O(n)'] },
                    { title: 'Advantages', details: ['Efficient on large data sets', 'Low overhead requires small amount of memory'] },
                    { title: 'Disadvantages', details: [
                        'If a bad pivot is chosen it runs in O(n²) time', 
                        'Not good for small datasets',
                        'Not a stable sort'] },
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

export default QuickSortInfo;