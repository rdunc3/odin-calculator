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
    const ops = ['+', '-', '*', '/', '=']
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
}

function changeDisplay(content){
    const displayElement = document.querySelector('#display');
    displayElement.textContent = content;
}

document.addEventListener('DOMContentLoaded', function() {
    let num1, op, num2;

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
