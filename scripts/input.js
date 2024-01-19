let file = undefined;

function getFile() {
    file = document.getElementById('fileInput').files[0];
}

function checkForFile() {
    getFile();

    if (file) {
        return true;
    }

    return false;
}

function handleFile() {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let lines = reader.result.split('\n');

        lines.forEach(function(line) {
            let result = calculate(line);
            console.log(line + " " + result);
        });
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
}