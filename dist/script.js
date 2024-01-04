// var btns = document.getElementByTagName("button");
// console.log(btns);
// btns.addEventListener('click', function(event) {
//     alert('click');
// }, false);

"use strict";

const answer = document.querySelector(".answer")
const calculation = document.querySelector(".calculation");

const clearButton = document.querySelector('button[value="clear"]');
const negateButton = document.querySelector('button[value="pos-neg"]');
const percentageButton = document.querySelector('button[value="%"]');
const divideButton = document.querySelector('button[value="/"]');
const multiplyButton = document.querySelector('button[value="*"]');
const subtractButton = document.querySelector('button[value="-"]');
const addButton = document.querySelector('button[value="+"]');
const zeroButton = document.querySelector('button[value="0"]');
const decimalButton = document.querySelector('button[value="."]');
const equalsButton = document.querySelector('button[value="="]');

const numbers = [];
for (let i = 0; i <= 9; i++) {
    const number = document.querySelector(`button[value="${i}"]`);
    if (number) {
        numbers.push(number);
    }
}


// Numbers
let calc = "";
let input = "";
numbers.forEach((num) => {
    num.addEventListener('click', () => {
        resetCalc();
        calc += num.textContent
        input += num.textContent
        calculation.textContent = input
        console.log(input);
    })
})



// Equals function
equalsButton.addEventListener('click', () => {
    answer.classList.add("calculator__display", "ans");
    calculation.classList.add("hidden");
    answer.textContent = eval(calc);
    calculation.textContent = "";
    calc = "";
    input = "";
});

const resetCalc = () => {
    answer.classList.remove("calculator__display", "ans");
    calculation.classList.remove("hidden");
};



// Reset the calculator
const clearAll = () => {
    resetCalc();
    answer.textContent = "";
    calc = "";
    input = "";
    calculation.textContent = "";
};

clearButton.addEventListener('click', clearAll);



// Calculate
multiplyButton.addEventListener('click', () => {
    sign("*")
})

addButton.addEventListener('click', ()=>{
    sign("+")
})

divideButton.addEventListener('click',()=>{
    sign("/")
})

subtractButton.addEventListener('click',()=>{
    sign("-")
})

decimalButton.addEventListener('click', () => {
    sign(".")
})


const sign = (sign) =>{
    const lastChar = calc.slice(-1)
    if(calc === "") {
        return;
    }
    if (['%', '/', '*', '-', '+'].includes(lastChar)) {
        calc = calc.slice(0, -1)
    }
    calc += `${sign}`
    input += `${sign}`;
    calculation.textContent = input
}




percentageButton.addEventListener('click',()=>{
    const lastChar = calc.slice(-1)
    if(calc === "") {
        return;
    }
    if (['%', '/', '*', '-', '+'].includes(lastChar)) {
        calc = calc.slice(0, -1)
    }
    calc += "/100*"
    input += "%";
    calculation.textContent = input
    console.log(calc);
})









// Positive and negative

negateButton.addEventListener('click', () => {
    let rest = calc;

    const lastNumber = getLastNumber(rest);
    const removeNumber = removeLastNumber(rest);
    
    const updatedCalculation = `${removeNumber}(-${lastNumber})`;
    input = updatedCalculation;
    calculation.textContent = updatedCalculation;
    calc = updatedCalculation;
});


function getLastNumber(input) {
    const operators = ['%', '/', '*', '-', '+'];
    let lastNumber = '';

    for (let i = input.length - 1; i >= 0; i--) {
        if (operators.includes(input[i])) {
            if (i !== input.length - 1) {
                lastNumber = input.slice(i + 1);
            } else {
                let j = i - 1;
                while (j >= 0 && !operators.includes(input[j])) {
                    lastNumber = input[j] + lastNumber;
                    j--;
                }
            }
            break;
        }
    }

    return lastNumber;
}

function removeLastNumber(input) {
    const operators = ['%', '/', '*', '-', '+'];
    let lastIndex = input.length - 1;

    for (let i = input.length - 1; i >= 0; i--) {
        if (operators.includes(input[i])) {
            lastIndex = i;
            break;
        }
    }

    if (operators.includes(input[lastIndex])) {
        let tempIndex = lastIndex - 1;
        while (tempIndex >= 0 && operators.includes(input[tempIndex])) {
            tempIndex--;
        }
        lastIndex = tempIndex;
    }

    return input.slice(0, lastIndex + 2);
}










