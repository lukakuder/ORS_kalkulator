let config = {
    operation: ""
};

/**
 * Executes the js code needed for calculation
 * 
 * @returns {any}
 */
function calculateResult() {

    if (checkForFile()) {
        handleFile();
    } else if (config.operation) {
        try {
            document.getElementById('result').value = calculate(document.getElementById('result').value);
        } catch (error) {
            document.getElementById('result').value = 'Error';
        }

    } else {
        alert("Prosim izberite želeno operacijo!");
    }
}

/**
 * Appends the value of the clicked button to the input field
 * 
 * @param {any} value
 * @returns {any}
 */
function appendToInput(value) {
    document.getElementById('result').value += value;
}

/**
 * Clears the input field
 * 
 * @returns {any}
 */
function clearInput() {
    document.getElementById('result').value = '';
}

/**
 * Sets the operation variable in the global config to the one that the user selected
 * 
 * @param {any} clickedButton
 * @returns {any}
 */
function setOperation(clickedButton) {
    var buttons = document.querySelectorAll('.btn-light');
    buttons.forEach(function(button) {
      button.classList.remove('operation');
    });

    config.operation = clickedButton.textContent;
    clickedButton.classList.add('operation');
}