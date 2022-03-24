const buttons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#calculation');
const prevNumber = document.querySelector('#prevNum');
const equals = document.querySelector('#calculate');
const ac = document.querySelector('#clear');
const switchBtn = document.querySelector('#switch');
const delBtn = document.querySelector('#del');
const regNotNumExp = /[0-9]/gmi;

let justCalculated = false;
let firstOperand;
let secondOperand;
let operator;

delBtn.addEventListener('click', del);
switchBtn.addEventListener('click', switchSign);
ac.addEventListener('click', reset);
buttons.forEach((btn) => {
    btn.addEventListener('click', displayNum)
});
operators.forEach((btn) => {
    btn.addEventListener('click', storeNum)
});
equals.addEventListener('click', displayAndCalcAnswer);

function del() {
    display.innerText = display.innerText.slice(0, display.innerText.length - 1);
}

function reset() {
    justCalculated = false;
    display.innerText = '0'
    prevNumber.innerText = "";
    firstOperand = null;
    secondOperand = null;
    operater = null;
}

function switchSign() {
    if (checkInputForNum()) return;
    display.innerText = parseFloat(display.innerText) * -1;
}

function checkInputForNum() {
    if (display.innerText == ".") return true;
}

function displayAndCalcAnswer() {
    if (checkInputForNum()) return;
    if (!prevNumber.innerText) return;
    secondOperand = display.innerText;
    display.innerText = operate(firstOperand, operator, secondOperand);
    prevNumber.innerText = "";
    justCalculated = true;
}

function checkDecimals(e) {
    let ammountDeci = 0;
    numberList = display.textContent.split("");
    numberList.push(e.target.textContent)
    ammountDeci = numberList.reduce((total, a) => {
        if (a == ".") {
            total++;
        }
        return total;
    }, 0);
    return ammountDeci > 1;
}

function displayNum(e) {

    if (checkDecimals(e) == true) return;
    if (display.innerText == '0' || justCalculated == true) {
        display.innerText = e.target.textContent;
        justCalculated = false;
        return;
    }
    display.innerText += e.target.textContent;

}

function storeNum(e) {
    if (checkInputForNum()) return;
    if (display.innerText && prevNumber.innerText) {
        secondOperand = display.innerText;
        prevNumber.innerText = operate(firstOperand, operator, secondOperand);
        firstOperand = prevNumber.innerText;
        operator = e.target.innerText;
        display.innerText = "0";
        return;
    }
    firstOperand = display.innerText;
    operator = e.target.innerText;
    prevNumber.innerText = firstOperand + operator;
    display.innerText = "0";
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        window.alert("Did you want to break the world?");
        reset();
        return "smh";
    }
    answer = a / b;
    return Math.round(answer * 100) / 100
}

function operate(a, operatation, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operatation) {
        case ('+'):
            return add(a, b);
        case ('-'):
            return subtract(a, b);
        case ('*'):
            return multiply(a, b);
        case ('/'):
            return divide(a, b);
        case ('^'):
            return a ** b;

    }
}

/*Fat code repittion down here, note
to always think ahead :(
*/
function checkKeyForNum(e) {
    let key = e.code;
    const found = key.match(regNotNumExp);
    return found != null;
}
function storeKeyNum(inputOp){
    if (checkInputForNum()) return;
    if (display.innerText && prevNumber.innerText) {
        secondOperand = display.innerText;
        prevNumber.innerText = operate(firstOperand, operator, secondOperand);
        firstOperand = prevNumber.innerText;
        operator = inputOp;
        display.innerText = "0";
        return;
    }
    firstOperand = display.innerText;
    operator = inputOp;
    prevNumber.innerText = firstOperand + operator;
    display.innerText = "0";
}

function logKeyNum(e) {
    if (checkKeyForNum(e) && e.key != 'Shift') {
        if (display.innerText == '0' || justCalculated == true) {
            display.innerText = e.code.slice(5);;
            justCalculated = false;
            return;
        }

        display.innerText += e.code.slice(5);

    }
}
function logOperator(e){
    let input = e.key;
    window.alert(e.key);
    switch(input){
        case('/'):
            storeKeyNum('/');
            break;
        case('Enter'):
        case('='):
            displayAndCalcAnswer();
            break;
        case('+'):
            storeKeyNum('+');
            break;
        case('-'):
            storeKeyNum('-');
            break;
        case('*'):
            storeKeyNum('*');
            break;
        
        case('Backspace'):
            del();
            break;
        case('^'):
            storeKeyNum('^');
            break;
        case('.'):
            console.log('late');
            break;
    }
}

document.addEventListener('keydown', logKeyNum);
document.addEventListener('keydown', logOperator);