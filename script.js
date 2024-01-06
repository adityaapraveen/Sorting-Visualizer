// functions to work on:
// resetting array - toDisplaySliderNumber - generateRandomArray - toDrawArrayBars - bubbleSort - selectionSort - insertionSort


//Features to add for better understanding:
//-> Arrows when for which is being swapped or which one is the current index when sorting
//-> Make the swapping animation better.

const sizeSlider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');


// Using numbers to generate random numbers and push it into an array.
function generatingRandomArray(size) {
    const arr = [];

    while (arr.length < size) {
        const randomNumber = Math.floor(Math.random() * 60) + 1;

        // Check if the number already exists in the array
        if (!arr.includes(randomNumber)) {
            arr.push(randomNumber);
        }
    }

    return arr;
}

function arrayToBars(arr){
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    arr.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = `${value * 4}px`; // Scale the height for better visualization
        bar.style.transform = 'rotateY(180deg)'; // Add this line
        arrayContainer.appendChild(bar);
});

}



// To reset the array.
function resetArray() {
    const newArrSize = sizeSlider.value;
    const newArr = generatingRandomArray(newArrSize);
    arrayToBars(newArr);
    sliderValue.textContent = `${newArrSize} Bars.`;
    //to hide the message when new array button is clicked
    const sortingMessage = document.getElementById('sortingMessage');
    sortingMessage.style.display = 'none'; // Hide the message
    sortingMessage.classList.remove('wavy'); // Remove the animation
}


function updateSliderValue() {

    resetArray();
}
resetArray();

function displaySortedMessage(){
    const sortingMessage = document.getElementById('sortingMessage');
    sortingMessage.style.display = 'block'; // Show the message
    sortingMessage.classList.add('wavy'); // Apply the animation
}

// function displaySortedMessage() {
//     const sortingMessage = document.getElementById('sortingMessage');
    // sortingMessage.textContent = 'SORTED!';

    // Remove and re-add the element to reset the animation
    // const parent = sortingMessage.parentElement;
    // const nextSibling = sortingMessage.nextSibling;
    // parent.removeChild(sortingMessage);
    // setTimeout(() => {
    //     parent.insertBefore(sortingMessage, nextSibling);
    //     sortingMessage.style.animation = 'bounce 1s infinite';
    // }, 0);
// }

// Bubble Sort algorithm
async function bubbleSort() {
    const array = Array.from(document.getElementsByClassName("array-bar"));
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight the bars being compared
            array[j].style.backgroundColor = "#e74c3c";
            array[j + 1].style.backgroundColor = "#e74c3c";

            await new Promise(resolve => setTimeout(resolve, 450)); // Delay for visualization

            const value1 = parseInt(array[j].style.height);
            const value2 = parseInt(array[j + 1].style.height);

            if (value1 > value2) {
                // Swap the bars
                array[j].style.height = `${value2}px`;
                array[j + 1].style.height = `${value1}px`;
                // array[i].style.backgroundColor = "#fff";
                // array[i + 1].style.backgroundColor = "#fff";
            }

            // Reset the color after comparison
            array[j].style.backgroundColor = "#3498db";
            array[j + 1].style.backgroundColor = "#3498db";
        }
    }
    for (let i = 0; i < n; i++) {
        array[i].style.backgroundColor = "#2ecc71"; // Green
        await new Promise(resolve => setTimeout(resolve, 75)); // Delay for visualization
    }
    displaySortedMessage()
    
}

// function textDisplay(){
//         var text = document.getElementsByClassName("sorting-message");
//         text.style.display = "block";
// }
async function selectionSort() {
    // textDisplay()
    const array = Array.from(document.getElementsByClassName("array-bar"));
    const n = array.length;


    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Keep the current minimum index color as black
        array[minIndex].style.backgroundColor = "#000";

        for (let j = i + 1; j < n; j++) {
            // Iterating one as YELLOW
            array[j].style.backgroundColor = "#ffbc42";

            await new Promise(resolve => setTimeout(resolve, 200)); // Delay for visualization

            const value1 = parseInt(array[j].style.height);
            const minValue = parseInt(array[minIndex].style.height);

            if (value1 < minValue) {
                // Change the current minimum index color back to black
                // array[minIndex].style.backgroundColor = "#000";
                minIndex = j;
            }

            // Reset the color after comparison
            array[j].style.backgroundColor = "#00ac14";
        }

        // Swap the bars
        const temp = array[i].style.height;
        array[i].style.height = array[minIndex].style.height;
        array[minIndex].style.height = temp;

        // Highlight the bars being swapped
        array[i].style.backgroundColor = "#ffffff";
        array[minIndex].style.backgroundColor = "#ffffff";

        await new Promise(resolve => setTimeout(resolve, 600)); // Delay for visualization

        // Make it green after swapping
        array[i].style.backgroundColor = "#cdb4db";
        array[minIndex].style.backgroundColor = "#cdb4db";

        await new Promise(resolve => setTimeout(resolve, 600)); // Delay for visualization

        // Reset the color after swapping
        array[i].style.backgroundColor = "#386641";     //3498db
        array[minIndex].style.backgroundColor = "#386641";
    }

    displaySortedMessage()

    // Ensure the last minimum index is displayed in black
    array[n - 1].style.backgroundColor = "#000";
    for (let i = 0; i < n; i++) {
        array[i].style.backgroundColor = "#2ecc71"; // Green
        await new Promise(resolve => setTimeout(resolve, 75)); // Delay for visualization
    }
}
async function insertionSort() {
    const array = Array.from(document.getElementsByClassName("array-bar"));
    const n = array.length;

    for (let i = 1; i < n; i++) {
        const key = parseInt(array[i].style.height);
        let j = i - 1;

        // Highlight the key being considered
        array[i].style.backgroundColor = "#fff"; // Black

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for visualization

        while (j >= 0 && parseInt(array[j].style.height) > key) {
            // Move the bars to the right
            array[j + 1].style.height = array[j].style.height;

            // Highlight the bars being shifted
            array[j + 1].style.backgroundColor = "#2ecc71"; // Blue
            array[j].style.backgroundColor = "#2ecc71"; // Green

            await new Promise(resolve => setTimeout(resolve, 350)); // Delay for visualization

            // Reset the color after shifting
            array[j + 1].style.backgroundColor = "#000"; // Black
            array[j].style.backgroundColor = "#000"; // Black

            j--;
        }

        // Place the key in its correct position
        array[j + 1].style.height = `${key}px`;

        // Highlight the bar in its sorted position
        array[j + 1].style.backgroundColor = "#2ecc71"; // Green

        await new Promise(resolve => setTimeout(resolve, 350)); // Delay for visualization

        // Reset the color after placing the key
        array[i].style.backgroundColor = "#000"; // Black
        array[j + 1].style.backgroundColor = "#000"; // Black
    }



    // Ensure all bars are in their sorted positions
    for (let i = 0; i < n; i++) {
        array[i].style.backgroundColor = "#2ecc71"; // Green
        await new Promise(resolve => setTimeout(resolve, 75)); // Delay for visualization
    }
    displaySortedMessage()
}
