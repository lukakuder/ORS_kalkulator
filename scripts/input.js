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
    const output = document.getElementById('fileOutput');
    output.innerHTML = '';

    reader.readAsText(file);

    reader.onload = function() {
        let lines = reader.result.split('\n');

        lines.forEach(function(line, index) {
            output.innerHTML += line + " " + calculate(line.slice(0, -2).trim());

            if (index < lines.length - 1) {
                output.innerHTML += "<br>";
            }

            console.log(line + " " + calculate(line.slice(0, -2).trim()));
        });
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
}