

document.addEventListener("DOMContentLoaded", function () {
    //this is a calc object declaration, initialized when html is opened??
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {
        
        if (calculator.waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
        }

        console.log(calculator);
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) return;

        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        
        calculator.firstOperand = parseFloat(calculator.displayValue);
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
        calculator.displayValue = '0';
        

        console.log(calculator);
    }

    function doCalc() {
        let secondOperand = calculator.displayValue;
        calculator.displayValue = performCalculation[calculator.operator]
            (calculator.firstOperand, secondOperand);

        
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

        '+': (firstOperand, secondOperand) => parseFloat(firstOperand) + parseFloat(secondOperand),

        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

        '=': (firstOperand, secondOperand) => secondOperand
    };

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
        console.log(calculator);
    }

    function updateDisplay() {
        const display = document.querySelector('.calculator-screen');
        display.value = calculator.displayValue;
    }
    //initial update upon entry
    updateDisplay();

    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('decimal')) {
            inputDecimal(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('all-clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equal-sign')) {
            doCalc();
            updateDisplay();
            return;
        }

        inputDigit(target.value);
        updateDisplay();
    });
});