import React from "react";
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array. 
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This Stores the Time it takes for the visualization to finish
let time = 0;


export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        //creates an array that is stored in state
        this.state = {
            array: []
        }
    
    }
    // when the app loads the array is reset 
    componentDidMount() {
        this.resetArray();
    }

    // is used to reset the values of the array 
    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
      }
    // is used to perform the animations 
      doAnimations(animations) {
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);

          }
          time += ANIMATION_SPEED_MS;
        }
      }
      // is used to disable buttons while animations are taking place.
      disableButtons(){
        document.getElementById("button").disabled = true;
        document.getElementById("button2").disabled = true;
        document.getElementById("button3").disabled = true;
        document.getElementById("button4").disabled = true;
        document.getElementById("button5").disabled = true;
      }

      // is used to enable buttons when animations are finished 
      enableButtons(){
        setTimeout(function(){
          document.getElementById("button").disabled = false;
          document.getElementById("button2").disabled = false;
          document.getElementById("button3").disabled = false;
          document.getElementById("button4").disabled = false;
          document.getElementById("button5").disabled = false;
        }, time);
        time = 0;
      }

      // Performs Merge Sort 
      mergeSort() {
        this.disableButtons();
        const animations = getMergeSortAnimations(this.state.array);
        this.doAnimations(animations);
        this.enableButtons();
      }

      // Performs Quick Sort
      quickSort() {
        this.disableButtons();
        const animations = getQuickSortAnimations(this.state.array);
        this.doAnimations(animations);
        this.enableButtons();
      }
      
    // Performs Heap Sort
      heapSort() {
        this.disableButtons();
        const animations = getHeapSortAnimations(this.state.array);
        this.doAnimations(animations);
        this.enableButtons();
      }
    // Performs Bubble Sort
      bubbleSort() {
        this.disableButtons();
        const animations = getBubbleSortAnimations(this.state.array);
        this.doAnimations(animations);
        this.enableButtons();
      }

    render() {
        const {array} = this.state;
        return (
            <section>
              
              
              <h1>Ethan Gibson-Booth Sorting Visualizer</h1>
             
                <div class="content">
                  
                
                    <div class="swiper mySwiper">
                    
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                         }}> 
                         {/* {value} */}
                        </div>
                        
                        ))}
                        <div id = "buttons" className="buttons">
                            <button id = "button" class = "button-1" onClick={() => this.resetArray()} disabled={false}>Generate New Array</button>
                            <button id = "button2" class = "button-2" onClick={() => this.mergeSort()} disabled={false}>Merge Sort</button>
                            <button id = "button3" class = "button-2"onClick={() => this.quickSort()} disabled={false}>Quick Sort</button>
                            <button id = "button4" class = "button-2" onClick={() => this.heapSort()} disabled={false}>Heap Sort</button>
                            <button id = "button5" class = "button-2" onClick={() => this.bubbleSort()} disabled={false}>Bubble Sort</button>
                        </div>
                       
                                
                    </div>
                    
                  </div>
                  
 
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                
            </section>
            
          );
    
    }

}

// generates two ransom numbers using js From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }