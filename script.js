function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(a,operatation,b){
    switch(operatation){
        case('+'):
            return add(a,b);
        case('-'):
            return subtract(a,b);
        case('*'):
            return multiply(a,b);
        case('/'):
            return divide(a,b);
    }
}