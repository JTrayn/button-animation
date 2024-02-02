/* --------------------------------------------------------*/
/*                  SANDBOX ENVIRONMENT                    */
        console.log("Welcome to the shitshow...");
/* --------------------------------------------------------*/


//-----------------------------------------------------------------------------------



let createButton = document.querySelector('.create-button');
let stopButton = document.querySelector('.stop-button');
let imageContainer = document.querySelectorAll('.image-container');
let topLeft = document.querySelector('.top-left');
let topRight = document.querySelector('.top-right');
let bottomLeft = document.querySelector('.bottom-left');
let bottomRight = document.querySelector('.bottom-right');
let dragon = document.createElement('img');
let pheonix = document.createElement('img');
let cherry = document.createElement('img');
let synergy = document.createElement('img');
let click = document.createElement('audio');
click.src = './audio/click.mp3';
let hover = document.createElement('audio');
hover.src = './audio/hover.mp3';
let swipe = document.createElement('audio');
swipe.src = './audio/swipe.mp3';

dragon.setAttribute('src', './images/dragonfire.png');
dragon.style.height = '180px';
dragon.style.setProperty('border-radius', '10px');
dragon.style.boxShadow = '4px 8px 20px rgba(0, 0, 0, 0.8)';
dragon.alt = 'Dragon';
dragon.style.visibility = 'hidden';
topLeft.appendChild(dragon);

pheonix.setAttribute('src', './images/shootingstar.png');
pheonix.style.height = '180px';
pheonix.style.setProperty('border-radius', '10px');
pheonix.style.boxShadow = '4px 8px 20px rgba(0, 0, 0, 0.8)';
pheonix.alt = 'Pheonix';
pheonix.style.visibility = 'hidden';
topRight.appendChild(pheonix);

cherry.setAttribute('src', './images/pinkdew.png');
cherry.style.height = '180px';
cherry.style.setProperty('border-radius', '10px');
cherry.style.boxShadow = '4px 8px 20px rgba(0, 0, 0, 0.8)';
cherry.alt = 'Cherry';
cherry.style.visibility = 'hidden';
bottomLeft.appendChild(cherry);

synergy.setAttribute('src', './images/synergy.png');
synergy.style.height = '180px';
synergy.style.setProperty('border-radius', '10px');
synergy.style.boxShadow = '4px 8px 20px rgba(0, 0, 0, 0.8)';
synergy.alt = 'Synergy';
synergy.style.visibility = 'hidden';
bottomRight.appendChild(synergy);

stopButton.addEventListener('click', e => {
    dragon.style.visibility = 'hidden';
    pheonix.style.visibility = 'hidden';
    cherry.style.visibility = 'hidden';
    synergy.style.visibility = 'hidden';
    console.log("Images removed");
});


createButton.addEventListener('click', e => {

    swipe.play();
    animateImage(dragon, 180);
    animateImage(pheonix, 180);
    animateImage(cherry, 180);
    animateImage(synergy, 180);
});


for(let imageElement of imageContainer) {
    imageElement.firstChild.addEventListener('mouseover', async e => {

        for (let i = 0; i < 15; i++) {
            await sleep(5);
            hover.play();
            e.target.style.height = convertToNumber(e.target.style.height) + 1 + 'px';
            e.target.style.width = convertToNumber(e.target.style.width) + 1 + 'px';
        }
    });
    imageElement.firstChild.addEventListener('mouseout', e => {

        e.target.style.height = '180px';
        e.target.style.width = '180px';
    });
    imageElement.firstChild.addEventListener('click', e => {
        click.play();
        animateImage(e.target, 180);
    });
}




async function animateImage(element = new HTMLImageElement(), size) {

    console.log(`${element.alt}: ANIMATION START`);
    element.style.visibility = 'visible';
    const MIN_SIZE = 1;
    const MAX_SIZE = size * 1.1;
    const GROWTH_RES = 8;
    const GROWTH_SPEED = 10;
    const SHRINK_RES = 5;
    const SHRINK_SPEED = 10;
    const SHRINK_FACTOR = 0.1;
    const shrinkRate = (MAX_SIZE * SHRINK_FACTOR) / SHRINK_RES;
    element.style.height = `${MIN_SIZE}px`;
    element.style.width = `${MIN_SIZE}px`;
    const curve = calculateExponentialCurve(MIN_SIZE, MAX_SIZE, GROWTH_RES);

    // Grow image
    for (let i = 0; i < curve.length; i++) {
        await sleep(GROWTH_SPEED);                
        element.style.height = `${curve[i]}px`; 
        element.style.width = `${curve[i]}px`;
        console.log(`${element.alt} SIZE: ${curve[i]}px`);
    }
    
    // Shrink image
    for(let i = 0; i < SHRINK_RES; i++) {     
        await sleep(SHRINK_SPEED);
        element.style.height = `${convertToNumber(element.style.height) - shrinkRate}px`;
        element.style.width = `${convertToNumber(element.style.width) - shrinkRate}px`;   
        console.log(`${element.alt} SIZE: ${element.style.height}`);

        if(((convertToNumber(element.style.height) - shrinkRate) < size && 
            convertToNumber(element.style.height) !== size) || 
            ((convertToNumber(element.style.height) > size) && i === SHRINK_RES-1)) {
            element.style.height = `${size}px`;
            element.style.width = `${size}px`;
            console.log(`${element.alt} SIZE: ${element.style.height}`);
            break;
        }
        
    }
    console.log(`${element.alt}: ANIMATION ENDED`);

    // Lets try and understand this better
    function calculateExponentialCurve(startValue, maxValue, resolution) {

        const values = [];

        if (startValue >= maxValue) {
            throw new Error("Start value must be less than max value");
        }

        for (let i = 0; i < resolution; i++) {
            const t = i / (resolution - 1); // Normalize the current step to a range of 0 to 1
            const growthFactor = Math.pow(maxValue / startValue, t); // Calculate the exponential growth factor
            let newValue = startValue * growthFactor;

            // Ensure the value does not exceed maxValue
            if (newValue > maxValue) {
                newValue = maxValue;
            }

            values.push(newValue);
        }
        return values;
    }

    // converts '200px' to 200 ...ect
    function convertToNumber(string = 'default'){
        
        string = string.replace('px', '');
        return +string;
    }
}
  

function sleep(ms) {
    return new Promise(resolve => 
        setTimeout(resolve, ms));
}


function convertToNumber(string = 'default'){
        
    string = string.replace('px', '');
    return +string;
}


































































