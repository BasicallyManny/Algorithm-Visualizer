/**
 *
 * @param array
 * @param animations
 */
// export const insertionSort = (
//   array: number[],
//   animations: [number, number][]
// ): number[] => {
//   /** iterates through the array*/
//   for (let i = 1; i < array.length; i++) {
//     /**The key to be inserted */
//     const key: number = array[i];
//     /**track the previous element*/
//     let j: number = i - 1;
//     /*
//      *Shift elements of the array, greater than the key, to the right
//      */
//     while (j >= 0 && array[j] > key) {
//       array[j + 1] = array[j];
//       j = j - 1;
//       animations.push([j, j + 1]);
//     }
//     /*
//      *Place the key at its correct position
//      */
//     array[j + 1] = key;
//     animations.push([j + 1, j]);
//   }
// };
/**
 * Performs the insertion sort algorithm and records animations for sorting visualization.
 * @param array The array to be sorted.
 * @returns An array of animations for visualization.
 */

function insertionSort(array: number[]): [number, number][] {
  const animations: [number, number][] = [];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Highlight the current element being compared (key)
    animations.push([i, i]); // Highlight current element (key)

    while (j >= 0 && array[j] > key) {
      // Push animation for color change during comparison
      animations.push([j, j + 1]); // Highlight bar j
      animations.push([j, j]); // Reset color after comparison, keep height unchanged

      // Move elements to the right without changing their heights yet
      animations.push([j + 1, array[j]]); // Update height of the moved bar
      array[j + 1] = array[j]; // Shift the element
      j--;
    }

    // Insert the key into its correct position
    array[j + 1] = key;

    // Capture the height update when inserting the key
    animations.push([j + 1, key]); // Update height of the key's position
  }

  return animations;
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
  animations: [number, number, string][]
) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push([j, high, "compare"]); // Highlight current bar and pivot
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      animations.push([i, j, "swap"]); // Animation for swap
    }
    animations.push([j, high, "revert"]); // Revert the color for current element
  }

  // Swap pivot to the correct position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  animations.push([i + 1, high, "swap"]); // Animation for pivot swap
  return i + 1;
}
function quickSort(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, string][]
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
 * Initiate sorting and collection of animation steps
 * @param array  THE ARRAY TO BE SORTED
 * @returns animations array
 */
export function insertionSortDispatcher(array: number[]): [number, number][] {
  if (array.length <= 1) return array; //BASE CASE: The subarray is of length 1 or 0
  // Perform the sort and capture animations
  const animations: [number, number][] = insertionSort(array);

  return animations;
}

// Main function to call quicksort and get animations for visualization
export function quickSortDispatcher(
  array: number[]
): [number, number, string][] {
  const animations: [number, number, string][] = [];
  quickSort(array, 0, array.length - 1, animations);

  return animations;
}
