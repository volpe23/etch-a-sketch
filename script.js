// Container where to store in divs
const container = document.querySelector(".container");

// Trigger button to trigger grid function
const trigger = document.querySelector("#prompt");
trigger.addEventListener('click' , () => createDrawingGrid());
// Clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', () => clear())

// Creating divs based on input
function createDrawingGrid() {
    container.innerHTML = "";
    const input = +(prompt("How many divs?"));
    if (input > 128) return alert("Too many!")
    // Set grid rows and columns equal to input value
    container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
    
    // 
    
    // Create divs into the contaier
    for (let i = 0; i < input * input; i++) {
        const element = document.createElement('div');
        container.appendChild(element);
        element.classList.add('element')
        changeColor(element);
    }
    
}

function clear() {
    // Get all the elements
    const allElements = document.querySelectorAll('.element');
    // Loop through all elements and remove style tag
    allElements.forEach(el => {
        el.removeAttribute('style');
    });
}

// Add event listeners to draw when mouse is pressed
let mouseDown = false // When mouse is not pressed this is false. When pressed => true
document.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.addEventListener('mouseup', () => {
    mouseDown = false;
})
// Adding event listeners to grid elements
function changeColor(el) {
    // Event listener to draw and drag when mouse is pressed
    el.addEventListener('mouseover', () => {

        mouseDown ? el.style.backgroundColor = 'black' : false;

    });
    // Event listener to color in on click
    el.addEventListener('click', () => el.style.backgroundColor = 'black')
}