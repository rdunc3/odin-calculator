const ops = ['+', '-', '*', '/', '=']
let num1 = op = num2 = null;
let numOps = 0;

//Calculator functions
function add(num1, num2){
    return num1 + num2;
}

function sub(num1, num2){
    return num1 - num2;
}

function mult(num1, num2){
    return num1 * num2;
}

function div(num1, num2){
    return num1 / num2;
}

function operate(num1, op, num2){
    if (op == "+")return add(num1, num2);
    else if (op == "-")return sub(num1, num2);
    else if (op == "*")return mult(num1, num2);
    else if (op == "/")return div(num1, num2);
}

function createNumBtns() {
    const numbers = document.querySelector('#buttons .numbers');
    for (let i = 2; i >= 0; i--) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < 3; j++) {
            const btnNum = document.createElement('button');
            btnNum.classList.add('btnNum');
            btnNum.textContent = (i * 3) + (j + 1);
            row.appendChild(btnNum);
        }

        numbers.appendChild(row);
    }
    //Last Row
    const row = document.createElement('div');
    row.classList.add('row');
    for (let i = 0; i < 3; i++){
        const btnNum = document.createElement('button');
        btnNum.classList.add('btnNum');
        btnNum.textContent = i == 1 ? 0 : "clear";
        row.appendChild(btnNum);
    }
    numbers.appendChild(row);
}

function createOpBtns(){
    const operators = document.querySelector('#buttons .operators');
    for (let i = 0; i < ops.length; i++) {
        const btnOp = document.createElement('button');
        btnOp.classList.add('btnOp');
        btnOp.textContent = ops[i];
        operators.appendChild(btnOp);
    }
}

function btnClick(event){
    // Get the clicked button
    const clickedButton = event.target.textContent;

    console.log('Button clicked:', clickedButton);
    changeDisplay(clickedButton);
    
    //Evaluate expression
    if (ops.indexOf(clickedButton) >= 0) numOps++;
    if (clickedButton == '='){
        numOps = 0;
        changeDisplay(operate());
    }
    else if (numOps >= 2){
        numOps = 1;
        changeDisplay(operate(clickedButton));
    }
    console.log("numOps = " + numOps);
}

function changeDisplay(content){
    const displayElement = document.querySelector('#display');
    if (content != 'clear') displayElement.textContent += content;
    else clearDisplay();
}

function clearDisplay(){
    const displayElement = document.querySelector('#display');
    displayElement.textContent = "";
}

function operate(operand){
    const displayElement = document.querySelector('#display');
    let content = displayElement.textContent;
    const match = content.match(/(-?\d+(\.\d+)?)([-+*/])(-?\d+(\.\d+)?)/);
    clearDisplay();

    if (match) {
        const num1 = parseFloat(match[1] + (match[2] || ''));
        const op = match[3];
        const num2 = parseFloat(match[4] + (match[5] || ''));
    
        // Perform the calculation based on the operator
        let result;
    
        switch (op) {
            case '+':
                result = add(num1,num2);
                break;
            case '-':
                result = sub(num1,num2);
                break;
            case '*':
                result = mult(num1,num2);
                break;
            case '/':
                result = div(num1,num2);
                break;
            default:
                console.error("Invalid operator");
                return null;
        }
    
        console.log(result);
        return arguments.length == 0 ? result : result + operand
    } else {
        console.error("Invalid expression format");
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Create the buttons
    createNumBtns();
    createOpBtns();

    // Select the buttons after they have been created
    const buttons = document.querySelectorAll('.btnNum, .btnOp');

    // Add event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', btnClick);
    });
});
