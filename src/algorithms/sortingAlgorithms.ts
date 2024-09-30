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