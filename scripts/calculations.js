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
    try {
        return eval(line);
    } catch {
        return "Error calculating"
    }
}

//Tukaj daj ti svojo funkcijo, ki vrne samo rezultat
function calculateConversion(line) {
    const decToBinRegex = /^DEC(\d+)BIN$/;
    const decToOctRegex = /^DEC(\d+)OCT$/;
    const decToHexRegex = /^DEC(\d+)HEX$/;
    const binToDecRegex = /^BIN(\d+)DEC$/;
    const binToOctRegex = /^BIN(\d+)OCT$/;
    const binToHexRegex = /^BIN(\d+)HEX$/;
    const octToDecRegex = /^OCT(\d+)DEC$/;
    const octToBinRegex = /^OCT(\d+)BIN$/;
    const octToHexRegex = /^OCT(\d+)HEX$/;
    const hexToDecRegex = /^HEX(\w+)DEC$/; 
    const hexToBinRegex = /^HEX(\w+)BIN$/;
    const hexToOctRegex = /^HEX(\w+)OCT$/;


    let match;
    let result;

    if ((match = line.match(decToBinRegex))) {
        result = convertBase(match[1], 10, 2, "decimal", "binary");
    } else if ((match = line.match(decToOctRegex))) {
        result = convertBase(match[1], 10, 8, "decimal", "octal");
    } else if ((match = line.match(decToHexRegex))) {
        result = convertBase(match[1], 10, 16, "decimal", "hexadecimal");
    } else if ((match = line.match(binToDecRegex))) {
        result = convertBase(match[1], 2, 10, "binary", "decimal");
    } else if ((match = line.match(binToOctRegex))) {
        result = convertBase(match[1], 2, 8, "binary", "octal");
    } else if ((match = line.match(binToHexRegex))) {
        result = convertBase(match[1], 2, 16, "binary", "hexadecimal");
    } else if ((match = line.match(octToDecRegex))) {
        result = convertBase(match[1], 8, 10, "octal", "decimal");
    } else if ((match = line.match(octToBinRegex))) {
        result = convertBase(match[1], 8, 2, "octal", "binary");
    } else if ((match = line.match(octToHexRegex))) {
        result = convertBase(match[1], 8, 16, "octal", "hexadecimal");
    } else if ((match = line.match(hexToDecRegex))) {
        result = convertBase(match[1], 16, 10, "hexadecimal", "decimal");
    } else if ((match = line.match(hexToBinRegex))) {
        result = convertBase(match[1], 16, 2, "hexadecimal", "binary");
    } else if ((match = line.match(hexToOctRegex))) {
        result = convertBase(match[1], 16, 8, "hexadecimal", "octal");
    } else {
        return "Invalid input format. Please use a supported format.";
    }

    return result;
}

function convertBase(input, fromBase, toBase, fromBaseName, toBaseName) {
    const Number = parseInt(input, fromBase);

    if (isNaN(Number)) {
        return `Invalid input. Please enter a valid ${fromBaseName} number.`;
    }

    const result = Number.toString(toBase);

    return result;
}



//Tukaj daj ti svojo funkcijo, ki vrne samo rezultat
function calculateLogic(line) {
    return "To je logika"
}