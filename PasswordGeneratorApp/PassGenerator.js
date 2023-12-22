
const alphaBasic = 'abcdefghijklmnopqrstuvwxyz';
const numBasic = '01234567890';
const symbolBasic = `!@#$%^&*()-_{}[];':",.<>/?`;

var conditions = {
}
var combinedBasicString = ``;


// function to initiate password generation
const generate = () => {
    combinedBasicString = ``;

    const upperCondition = document.getElementById('caseUpperCondition');
    const lowerCondition = document.getElementById('caseLowerCondition');
    const numberCondition = document.getElementById('numberCondition');
    const symbolCondition = document.getElementById('specialCondition');

    // assigning checked values to condition object
    conditions.upperCondition = upperCondition.checked;
    conditions.lowerCondition = lowerCondition.checked;
    conditions.numberCondition = numberCondition.checked;
    conditions.symbolCondition = symbolCondition.checked;

    // if no condition exists
    if (Object.values(conditions).every((v) => v === false)) {
        document.getElementById('generatedPassword').value = 'invalid_parameter';
        return null;
    }
    
    const passLength = document.getElementById('length');
    if (passLength.value < 6) {
        passLength.value = 6;
    } else if (passLength.value > 16) {
        passLength.value = 16;
    }

    generatePassword(passLength.value);

}
// function to process condition
const processCondition = (len, flag, basicString) => {
    if (flag) {
        combinedBasicString += generatePasswordFromString(len, basicString)
    }
}

// function to generate password according to condition
const generatePassword = (len) => {
    Object.keys(conditions).map((e) => {
        switch (e) {
            case 'upperCondition':
                processCondition(len, conditions[e], alphaBasic.toUpperCase());
                break;
            case 'lowerCondition':
                processCondition(len, conditions[e], alphaBasic.toLowerCase());
                break;
            case 'numberCondition':
                processCondition(len, conditions[e], numBasic);
                break;
            case 'symbolCondition':
                processCondition(len, conditions[e], symbolBasic);
                break;
        }
    })
    // generate password from Combined Basic String
    document.getElementById('generatedPassword').value = generatePasswordFromString(len, combinedBasicString);

}

// function to generate a random number between two values
const genRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// function to generate a password of given length from a given basic string
const generatePasswordFromString = (len, basicString) => {
    var password = ``;
    for (let i = 1; i <= len; i++) {
        password += basicString[genRandomNumber(0, basicString.length)];
    }
    return password;
}

// function to copy password from field
const copyPassword = () => {
    var password = document.getElementById('generatedPassword').value;
    if(password != 'invalid_parameter'){
        navigator.clipboard.writeText(password);
    }
}

// function to clear password from field
const clearPassword = () => {
    document.getElementById('generatedPassword').value = '';
}