// DOM elements
const display = document.querySelector('.display__text');
const buttons = document.querySelectorAll('.button');

// Variables to use the calculator
let operatorList = [
    "plus", "minus", "mult", "div", "sqrt"
];
let reservedNumber1 = null, reservedNumber2 = null;
let operator = null;
let clearText = false;

// Event click to use the buttons of the calculator
buttons.forEach(button => button.addEventListener('click', e => {
    let name = (e.target.classList)[2];
    
    if (name === 'btn-c') {
        display.value = '0';
    } else if (name === 'btn-del') {
        deleteText();
    } else {
        let isOperator = operatorList.includes(name);
        
        if (isOperator) {
            operatorFunction(name);
        } else if (name === 'equals') {
            equals();
        } else {
            let text = (e.target.classList)[3];
            addText(text);
        }
    }
}));

// Functions for the funcionalities
const operatorFunction = name => {
    clearText = true;

    if (operator != null) {
        reservedNumber2 = Number(display.value);
        calculate();
    }

    reservedNumber1 = Number(display.value);
    operator = name;

    if (operator == "sqrt") {
        operator = null;
        let result = Math.sqrt(Number(display.value));
        reservedNumber1 = result;
        display.value = `${result}`;
    }
}

const calculate = () => {
    let result = 0;

    switch (operator) {
        case "plus": result = reservedNumber1 + reservedNumber2; break;
        case "minus": result = reservedNumber1 - reservedNumber2; break;
        case "mult": result = reservedNumber1 * reservedNumber2; break;
        case "div": result = reservedNumber1 / reservedNumber2; break;
    }

    display.value = `${result}`;
}

const equals = () => {
    if (reservedNumber1 != null && operator != null) {
        console.log('Hola');
        reservedNumber2 = Number(display.value);
        calculate();
        clearText = true;
    }

    operator = null;
}

const checkPoint = text => {
    if (text === '.') {
        let arrayResult = `${display.value}`.split('');
        return (arrayResult.includes('.'))? '' : '.';
    }

    return text;
}

const deleteText = () => {
    if (display.value.length === 1) {
        display.value = '0';
        return;
    }

    let text = display.value;
    let newText = '';
    for (let i = 0; i < text.length - 1; i++) newText += text[i];
    display.value = newText;
}

const addText = btn => {
    let element = checkPoint(btn);

    if (clearText) {
        display.value = (btn === '.')? '0.' : element;
        clearText = false;
    } else {
        if (display.value === '0') {
            display.value = (btn === '.')? '0.' : element;
        } else {
            display.value += element;
        }
    }
}