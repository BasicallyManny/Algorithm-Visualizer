function insertionSort(
  mainArray: number[], // The original array that is being sorted.
  animations: [number, number, string][] // An array of animations to store the comparisons performed during the sorting process.
) {
  const n = mainArray.length;

  for (let i = 1; i < n; i++) {
    const currentValue = mainArray[i];
    let j = i - 1;

    // Highlight the current element being compared (key)
    animations.push([i, -1, "current"]); // Highlight the current element (ORANGE)

    // Find the correct position for currentValue
    while (j >= 0 && mainArray[j] > currentValue) {
      // Highlight the bars being compared (RED)
      animations.push([j, j + 1, "compare"]); // Compare current with previous
      animations.push([j, j + 1, "revert"]); // Revert colors after comparison

      // Push animation to move the larger element (BLUE for swapping)
      animations.push([j + 1, mainArray[j], "swap"]); // Move the larger element to the right
      mainArray[j + 1] = mainArray[j]; // Shift the larger element to the right
      j--;
    }

    // Insert the currentValue into its correct position (BLUE)
    mainArray[j + 1] = currentValue;
    animations.push([j + 1, currentValue, "insert"]); // Show insertion of current value
    animations.push([j + 1, -1, "sorted"]); // Mark as sorted (GREEN)
  }
}

/**
 * Partition function for quick sort
 * @param array
 * @param low
 * @param high
 * @param animations
 */
function partition(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, string][] // [index1, index2, "action"]
) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push([j, high, "compare"]); // Compare the current element with the pivot (red)
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; // Swap
      animations.push([i, j, "swap"]); // Animation for the swap (green)
    }
    animations.push([j, high, "revert"]); // Revert color to cyan after comparison
  }

  // Swap the pivot to its correct position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  animations.push([i + 1, high, "swap"]); // Animation for the final swap with pivot (green)
  return i + 1;
}

function quickSort(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, string][] // [index1, index2, "action"]
) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSort(array, low, pivotIndex - 1, animations); // Left side
    quickSort(array, pivotIndex + 1, high, animations); // Right side
  }
}

/**
 * Merges the two subarrays into a single sorted array and records the animations representing the the comparisons and swaps
 * @param mainArray
 * @param startIdx
 * @param middleIdx
 * @param endIdx
 * @param auxiliaryArray
 * @param animations
 *
 * Standard Merge Sort Sorting algorithm but pushes the indexes of the comparisons and swaps into the animations array
 */
function merge(
  mainArray: number[], //The original array that is being sorted.
  startIdx: number, //The starting index of the current subarray.
  middleIdx: number, //The middle index that separates the two subarrays to be merged.
  endIdx: number, //The ending index of the current subarray.
  auxiliaryArray: number[], //An auxiliary array that is used to store the sorted subarrays.
  animations: [number, number][] //an array of animations to store the comparisons and swaps performed during the merge process.
) {
  let k = startIdx; //main array pointer
  let i = startIdx; //left subarray pointer
  let j = middleIdx + 1; //right subarray pointer

  //Iterate throught the right and left subarrays
  //MERGE THE TWO SUBARRAYS
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([i, j]);
    //revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]); //UPDATE THE HEIGHT OF THE ARRAY BARS
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  /**
   * MERGE THE REMAINING ELEMENTS
   */

  //LEFT SUBARRAY
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  //RIGHT SUBARRAY
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]); //update the height of the array bars
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/**
 * Recursive implementation of the Merge Sort algorithm
 * @param array
 * @returns
 */
function mergeSort(
  mainArray: number[], //the original array that is being sorted
  startIdx: number, //the starting index of the current subarray
  endIdx: number, //the ending index of the current subarray
  auxiliaryArray: number[], //an auxiliary array that is used to store the sorted subarrays
  animations: [number, number][] //The array of animations to store the comparisons and swaps performed during the merge process
) {
  //BASE CASE: The subarray is of length 1 or 0
  if (startIdx === endIdx) return;

  //Split array into 2 halves by the middle index
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  //After recursion, merge the two sorted subarrays
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
/**
 * Initiate sorting and collection of animation steps
 * @param array  THE ARRAY TO BE SORTED
 * @returns animations array
 */
export function mergeSortDispatcher(array: number[]): [number, number][] {
  const animations: [number, number][] = []; //CREATE THE ANIMATION ARRAY
  if (array.length <= 1) return array; //BASE CASE: The subarray is of length 1 or 0
  const auxiliaryArray = array.slice(); //CREATE THE AUXILIARY ARRAY
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations); //callmergeSort
  return animations; //return the animation array
}

/**
 * Initiate sorting and collection of animation steps for Insertion Sort
 * @param array THE ARRAY TO BE SORTED
 * @returns animations array
 */
export function insertionSortDispatcher(array: number[]): [number, number][] {
  const animations: [number, number][] = []; // Create the animation array
  if (array.length <= 1) return array; // Base case: The array is of length 1 or 0
  const mainArray = [...array]; // Work on a copy of the array
  insertionSort(mainArray, animations); // Call insertionSort
  return animations; // Return the animation array
}

export function quickSortDispatcher(array: number[]): [number, number, string][] {
  const animations: [number, number, string][] = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}