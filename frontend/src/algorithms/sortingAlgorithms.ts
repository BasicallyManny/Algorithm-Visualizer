function insertionSort(
  mainArray: number[],
  animations: [number, number, string][]
) {
  const n = mainArray.length;

  for (let i = 1; i < n; i++) {
    const currentValue = mainArray[i];
    let j = i - 1;

    // Highlight the current element being compared (key)
    animations.push([i, -1, "current"]);

    while (j >= 0 && mainArray[j] > currentValue) {
      animations.push([j, j + 1, "compare"]);
      animations.push([j, j + 1, "revert"]);
      animations.push([j + 1, mainArray[j], "swap"]);
      mainArray[j + 1] = mainArray[j];
      j--;
    }

    mainArray[j + 1] = currentValue;
    animations.push([j + 1, currentValue, "insert"]);
    animations.push([j + 1, -1, "sorted"]);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, string][]
) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push([j, high, "compare"]);
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      animations.push([i, j, "swap"]);
    }
    animations.push([j, high, "revert"]);
  }

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
    quickSort(array, low, pivotIndex - 1, animations);
    quickSort(array, pivotIndex + 1, high, animations);
  }
}

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

  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function mergeSort(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: [number, number][]
) {
  if (startIdx === endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

export function mergeSortDispatcher(array: number[]): [number, number][] {
  const animations: [number, number][] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function insertionSortDispatcher(array: number[]): [number, number, string][] {
  const animations: [number, number, string][] = [];
  if (array.length <= 1) return animations;
  const mainArray = [...array];
  insertionSort(mainArray, animations);
  return animations;
}

export function quickSortDispatcher(array: number[]): [number, number, string][] {
  const animations: [number, number, string][] = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}
