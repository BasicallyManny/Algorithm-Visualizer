/**
 * 
 * @param array 
 
 */
export const insertionSort = (array: number[]): number[] => {
    /** iterates through the array*/
    for(let i = 0; i < array.length; i++) {
        /**The key to be inserted */
        const key:number=array[i];
        /**track the previous element*/
        let j:number=i-1;
        /*
        *Shift elements of the array, greater than the key, to the right
        */
        while(j>=0 && array[j]>key) {   
            array[j+1]=array[j];
            j=j-1;
        }
        /*
        *Place the key at its correct position
        */
        array[j+1]=key  
    }    
    return array
}

/**
 * function to merge arrays
 * @param arrayOne 
 * @param arrayTwo 
 */
const merge = (arrayOne: number[], arrayTwo: number[]): number[] => {
    /**Initialize the indicies for the right and left arrays */
    let i:number=0;
    let j:number=0;
    /**Initialize the merged array */
    const result:number=[];
    /**Merge the arrays */
    while(i<arrayOne.length && j<arrayTwo.length) {
        if(arrayOne[i]<arrayTwo[j]) {
            result.push(arrayOne[i]);
            i++;
        } else {
            result.push(arrayTwo[j]);
            j++;
        }
    }
    /**Add the remaining elements of the left array */
    while(i<arrayOne.length) {
        result.push(arrayOne[i]);
        i++;
    }
    /**Add the remaining elements of the right array */
    while(j<arrayTwo.length) {
        result.push(arrayTwo[j]);
        j++;
    }

    console.log("Merged Array: " + result)
    return result

}
/**
 * merge sort function
 * @param array 
 * @returns 
 */
export const mergeSort = (array: number[]): number[] => {
    if(array.length <= 1) {
        return array
    }
    /**Split the array in half */
    const middle:number = Math.floor(array.length / 2);
    /**Call merge sort on the left and right halves */
    const left:number[] = array.slice(0, middle);
    const right:number[] = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
