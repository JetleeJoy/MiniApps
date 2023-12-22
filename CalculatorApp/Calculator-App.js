const operators = ['+', '-', '*', '/', '%']
var isEvaluationKeyPressed = false;

// function to display current key pressings onto the result field
const displayInResultField = (key) => {
    const resultField = document.getElementById('resultField');
    // if the displayField already has a value of zero or invalid input error
    if (resultField.innerHTML == '0' || resultField.innerHTML == 'invalid input') {
        if(key != '.' && !operators.includes(key)){            
            resultField.innerHTML = key;
            return null;
        }
    }
    // if key pressed is zero
    if(key == '0'){
        if(isKeyPresentAtEnd(resultField.innerHTML, key) && isOperatorPresent(resultField.innerHTML)){
            // checking for exception case - ex : 1000 * 00 
            let flag = false;
            let resultValue = resultField.innerHTML;
            operators.map((e)=>{
                let index = resultValue.lastIndexOf(e);
                if(resultValue[++index] == 0 && index == resultValue.length - 1){
                    flag = true;
                }
            })
            if(flag){
                return null;
            }
        }
    }
    // if key pressed is dot
    if(key == '.'){
        if(isKeyPresentAtEnd(resultField.innerHTML,key)){
            return null;
        }
    }
    // if the displayField is empty and an operator is entered
    if (resultField.innerHTML.length == 0 && (operators.includes(key) || key == '.')) {
        return null;
    }
    // if the displayField has invalid operand
    if (operators.includes(String(key))) {
        if (isOperatorPresentAtEnd(resultField.innerHTML)) {
            return null;
        }
    }
    // resetting the resultField if no further evaluation is required
    if (!operators.includes(String(key))) {
        // if an evaluation is already happended and there is no operator to continue evaluation.
        if (isEvaluationKeyPressed && !isOperatorPresent(resultField.innerHTML)) {
            isEvaluationKeyPressed = false;
            resultField.innerHTML = key;
            return null;
        }
    }
    // check if the length of the expression exceeds display limit
    if (resultField.innerHTML.length >= 17) {
        // disable input after max limit of 33 characters
        if (resultField.innerHTML.length >= 31) {
            resultField.innerHTML = 'invalid input';
            return null;
        }
        decreaseFontSize();
    } else {
        increaseFontSize();
    }
    resultField.innerHTML += key;
}

// function to check an operator is present at the end of the expression
const isOperatorPresentAtEnd = (expr) => {
    flag = false;
    operators.map((e) => {
        if (expr.lastIndexOf(e) == expr.length - 1) {
            flag = true;
        }
    })
    return flag;
}

// function to check if a given key is present at the end of the expression
const isKeyPresentAtEnd = (expr, key) => {
    flag = false;
    if(Array.from(expr).lastIndexOf(key) == expr.length - 1){
        flag = true;
    }
    return flag;
}

// function to check if an operator is present anywhere in the expression
const isOperatorPresent = (expr) => {
    flag = false;
    operators.map((e) => {
        if (Array.from(expr).includes(e)) {
            flag = true;
        }
    })
    return flag;
}

// function to clear the input field
const clearResultField = () => {
    document.getElementById('resultField').innerHTML = '';
}

// backspace function 
const backSpaceFun = () => {
    const resultField = document.getElementById('resultField');
    resultField.innerHTML = resultField.innerHTML.substring(0, resultField.innerHTML.length - 1);
}

// function to calculate result using eval() function
const calculateResult = () => {
    isEvaluationKeyPressed = true;
    const resultField = document.getElementById('resultField');
    var expression = resultField.innerHTML;
    // checking if the expression is valid or not by introducing exception handling
    try {
        var result = eval(expression);
    } catch (e) {
        //console.log(e)
        resultField.innerHTML = 'invalid operation';
        return null;
    }
    // check if the length of the result exceeds display limit
    if (String(result).length >= 17) {
        decreaseFontSize();
    } else {
        increaseFontSize();
    }
    // check if the result returns Not A Number error or Infinity
    if (isNaN(result) || !isFinite(result)) {
        resultField.innerHTML = 'invalid input';
        return null;
    }
    resultField.innerHTML = result;
}
// function to decrease the display font if a higher length expression occured
const decreaseFontSize = () => {
    document.getElementById('resultField').style.fontSize = '20px';
}
// function to increase the display font if required
const increaseFontSize = () => {
    document.getElementById('resultField').style.fontSize = '35px';
}