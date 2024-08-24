document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let hasDecimal = false;
    let memory = 0;

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.value;
            const id = event.target.id;

            if (event.target.classList.contains('digit') || event.target.classList.contains('decimal')) {
                handleInput(value);
            } else if (event.target.classList.contains('operator')) {
                handleOperator(value);
            } else if (id === 'clear') {
                clearAll();
            } else if (id === 'backspace') {
                clearEntry();
            } else if (id === 'equal') {
                calculate();
            } else if (id === 'memory-add') {
                addToMemory();
            } else if (id === 'memory-subtract') {
                subtractFromMemory();
            } else if (id === 'memory-recall') {
                recallMemory();
            } else if (id === 'memory-clear') {
                clearMemory();
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '.') {
            handleInput(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperator(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            clearEntry();
        } else if (key === 'Escape') {
            clearAll();
        }
    });

    function handleInput(value) {
        if (value === '.' && hasDecimal) return;
        if (value === '.') hasDecimal = true;
        currentInput += value;
        updateDisplay();
    }

    function handleOperator(value) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        hasDecimal = false;
    }

    function clearAll() {
        currentInput = '';
        previousInput = '';
        operator = '';
        hasDecimal = false;
        updateDisplay();
    }

    function clearEntry() {
        currentInput = currentInput.slice(0, -1);
        if (!currentInput.includes('.')) {
            hasDecimal = false;
        }
        updateDisplay();
    }

    function updateDisplay() {
        display.value = currentInput;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                if (curr === 0) {
                    alert("Error: Cannot divide by zero!");
                    clearAll();
                    return;
                }
                result = prev / curr;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        hasDecimal = currentInput.includes('.');
        updateDisplay();
    }

    function addToMemory() {
        memory += parseFloat(currentInput);
        clearAll();
    }

    function subtractFromMemory() {
        memory -= parseFloat(currentInput);
        clearAll();
    }

    function recallMemory() {
        currentInput = memory.toString();
        updateDisplay();
    }

    function clearMemory() {
        memory = 0;
    }
});
