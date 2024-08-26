// checks if array is already sorted. 
function checkSorted(arr, animations) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
        animations.push([i, i+1])
        animations.push([i, i+1])
        animations.push([i, arr[i]])
    }
    return true;
  }
  
  // does merge sort 
  export function getMergeSortAnimations(array) 
  {
      const animations = [];
      if (array.length <= 1) return array;
      let check = checkSorted(array, animations);
      if (check === true){
          return animations; 
      } 
      else {
          const animations = [];
          const auxiliaryArray = array.slice();
          mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
          return animations;  
      }
    }
    
    function mergeSortHelper(
      mainArray,
      startIdx,
      endIdx,
      auxiliaryArray,
      animations,
    ) {
      if (startIdx === endIdx) return;
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
      mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
      doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    }
    
    function doMerge(
      mainArray,
      startIdx,
      middleIdx,
      endIdx,
      auxiliaryArray,
      animations,
    ) {
      let k = startIdx;
      let i = startIdx;
      let j = middleIdx + 1;
      while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          // We overwrite the value at index k in the original array with the
          // value at index i in the auxiliary array.
          animations.push([k, auxiliaryArray[i]]);
          mainArray[k++] = auxiliaryArray[i++];
        } else {
          // We overwrite the value at index k in the original array with the
          // value at index j in the auxiliary array.
          animations.push([k, auxiliaryArray[j]]);
          mainArray[k++] = auxiliaryArray[j++];
        }
      }
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
      while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
  
    
  // Creating the QuickSort function
  export function getQuickSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    let check = checkSorted(array, animations);
    if (check === true){
        return animations; 
    } 
    else {
        const animations = [];
        quickSortHelper(array, 0, array.length - 1, animations); 
        return animations;  
    }
  }
  
  function quickSortHelper(arr, low, high, animations) { 
  if (low >= high) return; 
  let pi = partition(arr, low, high, animations); 
  quickSortHelper(arr, low, pi - 1, animations); 
  quickSortHelper(arr, pi + 1, high, animations); 
  } 
  
  function partition(arr, low, high, animations) { 
  let pivot = arr[high]; 
  let i = low - 1; 
    
  for (let j = low; j <= high - 1; j++) { 
    // These are the values that we're comparing; we push them once
    // to change their color and the second push changes their color back.
    animations.push([j, high]);
    animations.push([j, high]);
    // If current element is smaller than the pivot
    if (arr[j] < pivot) { 
      // Increment index of smaller element 
      i++;
      // we swap the elements, i is the position and arr[j] is the value which that 
      //position is going to be changed to.  
      animations.push([i, arr[j]]);
      animations.push([j, i]);
      animations.push([j, i]);
      animations.push([j, arr[i]]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      
    } 
    // If current element is larger than the pivot
    else{
        animations.push([j, arr[j]]);
    }
  } 
  // Swap pivot to its correct position 
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
  animations.push([i +1, high]);
  animations.push([i +1, high]);
  animations.push([i +1, arr[i+1]]);
  animations.push([i +1, high]);
  animations.push([i +1, high]);
  animations.push([high, arr[high]]);
  return i + 1; // Return the partition index
  } 
  
  
  
    
  // JavaScript program for implementation
  // of Heap Sort
  export function getHeapSortAnimations(array) 
  {
      const animations = [];
      if (array.length <= 1) return array;
      let check = checkSorted(array, animations);
      if (check === true){
          return animations; 
      } 
      else {
          const animations = [];
          sort(array, animations);
          return animations;  
      }
      
  }
  function sort(arr, animations)
    {
      var N = arr.length;
      
      // Build heap (rearrange array)
      for (var i = Math.floor(N / 2) - 1; i >= 0; i--){
        heapify(arr, N, i, animations);
      }
              
  
      // One by one extract an element from heap
      for (var i = N - 1; i > 0; i--) {
      // Move current root to end
          var temp = arr[0];
          animations.push([0, i])
          animations.push([0, i])
          animations.push([0, arr[i]])
          animations.push([0, i])
          animations.push([0, i])
          animations.push([i, arr[0]])
          arr[0] = arr[i];
          arr[i] = temp;
          // call max heapify on the reduced heap
          heapify(arr, i, 0, animations);
        }
      }
  
      // To heapify a subtree rooted with node i which is
      // an index in arr[]. n is size of heap
  function heapify(arr, N, i, animations)
  {
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2
          
          
    // If left child is larger than root
    if (l < N && arr[l] > arr[largest])
      {
              animations.push([largest, l])
              animations.push([largest, l])
              animations.push([largest, arr[l]])
              animations.push([largest, l])
              animations.push([largest, l])
              animations.push([l, arr[largest]])
              largest = l;
      }
              
  
          // If right child is larger than largest so far
          if (r < N && arr[r] > arr[largest])
            {
              animations.push([r, largest])
              animations.push([r, largest])
              animations.push([r, arr[largest]])
              animations.push([r, largest])
              animations.push([r, largest])
              animations.push([largest, arr[r]])
              largest = r;
            }
              
  
          // If largest is not root
          if (largest !== i) 
            {
              var swap = arr[i];
              arr[i] = arr[largest];
              arr[largest] = swap;
              // Recursively heapify the affected sub-tree
              heapify(arr, N, largest, animations);
            }
  }
  
  
  
  // Creating the bblSort function
  export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    var n = array.length;
    let check = checkSorted(array, animations);
    if (check === true){
      return animations; 
    } 
    else {
        const animations = [];
        doBubble(array, n, animations)
        return animations;  
    }
  }
  function doBubble(arr, n, animations){
    var i, j, temp;
      var swapped;
      for (i = 0; i < n - 1; i++) 
      {
          swapped = false;
          for (j = 0; j < n - i - 1; j++) 
          {
              animations.push([[j], [j+1]]);
              animations.push([[j], [j+1]]);
           
              if (arr[j] > arr[j + 1]) 
              {
                  animations.push([[j+1], [arr[j]]]);
                  animations.push([j, j]);
                  animations.push([j, j]);
                  animations.push([j, arr[j+1]]);
                  // Swap arr[j] and arr[j+1]
                  temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                  swapped = true;
  
                  
              }
              else{
                  animations.push([[j], [arr[j]]]);
  
                  
              }
         
          }
          // IF no two elements were 
          // swapped by inner loop, then break
          if (swapped === false)
          break;
      }
  
  }
  