
/**
 * Insertion Sort Algoirthm
 * @param mainArray 
 * @param animations 
 */
function insertionSort(
  mainArray: number[],
  animations: [number, number, string][]
) {
  const n = mainArray.length;

  for (let i = 1; i < n; i++) {
    const currentValue = mainArray[i]; //set the key
    let j = i - 1; //set the comparator

    // Highlight the current element being compared (key)
    animations.push([i, -1, "current"]);

    // Shift elements of the array, greater than the key, to the right
    while (j >= 0 && mainArray[j] > currentValue) {
      animations.push([j, j + 1, "compare"]); //push the indecies of the compared element into the animations Array
      animations.push([j, j + 1, "revert"]); //push the indecies of the compared element into the animations Array to be reset
      animations.push([j + 1, mainArray[j], "swap"]); //push the indecies of the compared element into the animations Array
      mainArray[j + 1] = mainArray[j]; 
      j--; //decrement the comparator
    }

    mainArray[j + 1] = currentValue; //put the the key into the right position
    animations.push([j + 1, currentValue, "insert"]);
    animations.push([j + 1, -1, "sorted"]);
  }
}
/*
 * Partition function for quicksorts
 * implemented from https://www.geeksforgeeks.org/quick-sort/ 
 * @param array 
 * @param low 
 * @param high 
 * @param animations 
 * @returns 
 */
function partition(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, string][]
) {
  const pivot = array[high]; //set pivot point to end of the array
  let i = low - 1; //set comparitor
  //iterate through the array
  for (let j = low; j < high; j++) {
    //highlight the current element being compared
    animations.push([j, high, "compare"]);
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; //if the current element is less than or equal to the pivot, swap it with the comparitor
      animations.push([i, j, "swap"]);
    }
    //reset the highlighted element
    animations.push([j, high, "revert"]);
  }
  //swap the pivot with the comparitor
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  animations.push([i + 1, high, "swap"]);
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
    //recursivly sort the sub arrays
    quickSort(array, low, pivotIndex - 1, animations); 
    quickSort(array, pivotIndex + 1, high, animations);
  }
}
/**
 * merge algoirthm
 * @param mainArray 
 * @param startIdx 
 * @param middleIdx 
 * @param endIdx 
 * @param auxiliaryArray 
 * @param animations 
 */
function merge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: [number, number][]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  //combine the 2 arrays into the main array in the correct order
  while (i <= middleIdx && j <= endIdx) {
    //push the indecies of the compared element into the animations Array
    animations.push([i, j]);
    animations.push([i, j]); 
    // adda the smaller element into the mainArray first
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]); //push the indecies of the compared element into the animations Array
      mainArray[k++] = auxiliaryArray[i++]; //increment comparitors
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  //extend the remaining elements into the array
  while (i <= middleIdx) {
    //push the indecies of the compared element into the animations Array
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++]; //increment comparitors
  }

  //extend the remaining elements into the array
  while (j <= endIdx) {
    //push the indecies of the compared element into the animations Array
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++]; //increment comparitors
  }
}
/**
 * Merge sort algorithm
 * @param mainArray 
 * @param startIdx 
 * @param endIdx 
 * @param auxiliaryArray 
 * @param animations 
 * @returns 
 */
function mergeSort(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[], //auxiliary array to store the sorted array for the animation
  animations: [number, number][]
) {
  if (startIdx === endIdx) return;
  //get the middle index
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  //recvursively sort the sub arrays
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  //merge the sorted sub arrays
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
/**
 * Animation Dispatcher for mergeSort
 * @param array 
 * @returns 
 */
export function mergeSortDispatcher(array: number[]): [number, number][] {
  const animations: [number, number][] = []; //create an empty array
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice(); //copy the array.
  // sort the array
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
/**
 * Insertion Sort Animation Dispatcher
 * @param array 
 * @returns 
 */
export function insertionSortDispatcher(array: number[]): [number, number, string][] {
  const animations: [number, number, string][] = []; //create animations array
  if (array.length <= 1) return animations;
  const mainArray = [...array]; //copy the array
  //sort the array
  insertionSort(mainArray, animations);
  return animations;
}
/**
 * quickSort Animation Dispatcher
 * @param array 
 * @returns 
 */
export function quickSortDispatcher(array: number[]): [number, number, string][] {
  const animations: [number, number, string][] = []; //create the animations array
  quickSort(array, 0, array.length - 1, animations); //sort the array
  return animations;
}
