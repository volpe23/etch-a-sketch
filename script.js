// Container where to store in divs
const container = document.querySelector(".container");

// Variable which determines what drawing mode is on
let drawMode = 'draw';
let drawColor = 'black';

// Color input
const colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener('change', () => drawColor = colorPicker.value);

// Color mode button
const colorModeButton = document.querySelector('#colorButton');
colorModeButton.addEventListener('click', () => drawMode = 'draw');

// Light brush mode and button
const lightBrushMode = document.querySelector('#lightBrush');
lightBrushMode.addEventListener('click', () => drawMode = 'light')
// Trigger button to trigger grid function
const trigger = document.querySelector("#prompt");
trigger.addEventListener('click' , () => createDrawingGrid());

// Rainbox button to generate random color when drawing
const randomButton = document.querySelector("#randomButton");
randomButton.addEventListener('click', () => {
    drawMode = 'random'
    // randomButton.focus()
    // randomButton.setAttribute('active', true)
});

// Clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', () => {
    clear()
    clearButton.setAttribute('active', true);
});

// Creating divs based on input
function createDrawingGrid(input) {
    container.innerHTML = "";
    // const input = +(prompt("How many divs?"));
    if (input > 100) return alert("Too many!");
    // Set grid rows and columns equal to input value
    container.style.gridTemplateColumns = `repeat(${input}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${input}, 1fr)`;
    
    // 
    
    // Create divs into the contaier
    for (let i = 0; i < input * input; i++) {
        const element = document.createElement('div');
        container.appendChild(element);
        element.classList.add('element');
        changeColor(element);
    }
    
}
function getMode(el) {
    // console.log("Hello");
    if (drawMode === 'random') return `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
    else if (drawMode === 'draw') return drawColor;
    else if (drawMode === 'light') return lightMode(el)
}
function getRandomRGB() {
    const random = Math.floor((Math.random() * 255))
    // return `rgb(${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))})`
    return Math.floor((Math.random() * 255))
}

// Light mode coloring function
function lightMode(el) {
    let bgColor = window.getComputedStyle(el).backgroundColor;
    const regex = /\d+/g;
    const arr = bgColor.match(regex);
    const average = arr.reduce((acc, curr) => +acc + +curr) / 3;
    const newVal = Math.floor(average - ((255 / 10) + 3));
    return `rgb(${newVal}, ${newVal}, ${newVal})`
    // console.log(bgColor);
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
});
// Adding event listeners to grid elements
function changeColor(el) {
    // Event listener to draw and drag when mouse is pressed
    el.addEventListener('mouseover', () => {

        mouseDown ? el.style.backgroundColor = getMode(el) : false;

    });
    // Event listener to color in on click
    el.addEventListener('click', () => el.style.backgroundColor = getMode(el));
}



// Slider functions
const sizeSlider = document.querySelector("#sizeSlider");
const sizeNumber = document.querySelector("#sizeNumber");
// sizeNumber.value = sizeSlider.value

sizeSlider.addEventListener('input', () => {
    const max = sizeSlider.max;
    const min = sizeSlider.min;
    const value = sizeSlider.value;

    sizeNumber.value = value;
    sizeSlider.style.backgroundSize = `${value}% 100%`;
    // createDrawingGrid(value);
});
sizeSlider.addEventListener('change', () => {
    const value = sizeSlider.value;
    createDrawingGrid(value);
})
createDrawingGrid(30)