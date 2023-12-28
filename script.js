// functions to work on:
// resetting array - toDisplaySliderNumber - generateRandomArray - toDrawArrayBars - bubbleSort

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



// converting the array of numbers into bars.
function arrayToBars(arr){
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    arr.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = `${value * 4}px`; // Scale the height for better visualization
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


// Function to display the "SORTED" message with animation
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

            await new Promise(resolve => setTimeout(resolve, 250)); // Delay for visualization

            const value1 = parseInt(array[j].style.height);
            const value2 = parseInt(array[j + 1].style.height);

            if (value1 > value2) {
                // Swap the bars
                array[j].style.height = `${value2}px`;
                array[j + 1].style.height = `${value1}px`;
            }

            // Reset the color after comparison
            array[j].style.backgroundColor = "#3498db";
            array[j + 1].style.backgroundColor = "#3498db";
        }
    }
    const sortingMessage = document.getElementById('sortingMessage');
    sortingMessage.style.display = 'block'; // Show the message
    sortingMessage.classList.add('wavy'); // Apply the animation
}