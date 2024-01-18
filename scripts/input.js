let file = null;

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
        console.log(reader.result);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
}