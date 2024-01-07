function calculateResult() {

    //Do validation if the system and operations are selected
    var system = document.getElementsByClassName('system')[0].textContent;
    console.log(system);

    var operation = document.getElementsByClassName('operation')[0].textContent;
    console.log(operation);



    // try {
    //     document.getElementById('result').value = eval(document.getElementById('result').value);
    // } catch (error) {
    //     document.getElementById('result').value = 'Error';
    // }
}

function appendToInput(value) {
    document.getElementById('result').value += value;
}

function clearInput() {
    document.getElementById('result').value = '';
}

function setOperation(clickedButton) {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
      button.classList.remove('operation');
    });

    clickedButton.classList.add('operation');
}

function setSystem(clickedButton) {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
      button.classList.remove('system');
    });

    clickedButton.classList.add('system');
}