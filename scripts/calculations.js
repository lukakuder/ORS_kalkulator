function calculate(line) {
    if (config.operation == "Aritmetika") {
        return calculateArithmetics(line);
    } else if (config.operation == "Pretvarjanje") {
        return calculateConversion(line);
    } else {
        return calculateLogic(line);
    }
}

function calculateArithmetics(line) {
    return eval(line);
}

//Tukaj daj ti svojo funkcijo, ki vrne samo rezultat
function calculateConversion(line) {
    return "To je pretvarjanje";
}

//Tukaj daj ti svojo funkcijo, ki vrne samo rezultat
function calculateLogic(line) {
    return "To je logika"
}