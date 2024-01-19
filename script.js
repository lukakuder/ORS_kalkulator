let config = {
    operation: ""
};

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

function appendToInput(value) {
    document.getElementById('result').value += value;
}

function clearInput() {
    document.getElementById('result').value = '';
}

function setOperation(clickedButton) {
    var buttons = document.querySelectorAll('.btn-light');
    buttons.forEach(function(button) {
      button.classList.remove('operation');
    });

    config.operation = clickedButton.textContent;
    clickedButton.classList.add('operation');
}


