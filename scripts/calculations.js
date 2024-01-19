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
        return "Error calculating";
    }
}

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
    const digits = "0123456789ABCDEF";
    const inputArray = input.toUpperCase().split("");

    let decimalNumber = 0;
    for (let i = 0; i < inputArray.length; i++) {
        const digitValue = digits.indexOf(inputArray[i]);

        if (digitValue === -1 || digitValue >= fromBase) {
            return `Invalid input. Please enter a valid ${fromBaseName} number.`;
        }

        decimalNumber = decimalNumber * fromBase + digitValue;
    }

    let result = customToString(decimalNumber, toBase);

    return result;
}

function customToString(number, base) {
    if (number === 0) {
        return '0';
    }

    let result = '';
    while (number > 0) {
        let remainder = number % base;
        if (remainder >= 10 && base === 16) {
            result = String.fromCharCode(87 + remainder) + result;
        } else {
            result = String(remainder) + result;
        }
        number = Math.floor(number / base);
    }

    return result;
}

function calculateLogic(line) {
    const operatorRegex = /^(AND|OR|NOT|NAND|NOR|XOR)$/;
    const tokens = line.match(/([01]+|AND|OR|NOT|NAND|NOR|XOR|[&|^~()])/g);

    if (!tokens) {
        return "Invalid expression.";
    }

    let result = parseInt(tokens[0], 2);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        let nextToken = tokens[i + 1];

        if (i % 2 === 1) {
            if (!operatorRegex.test(operator)) {
                return "Invalid expression. Unexpected operator.";
            }
        } else {
            if (!/^[01]+$/.test(nextToken)) {
                return "Invalid expression. Malformed binary number.";
            }
            nextToken = parseInt(nextToken, 2);
        }

        result = parseInt(customToString(result, 2), 2);

        switch (operator) {
            case 'AND':
                result = result & parseInt(customToString(nextToken, 2), 2);
                break;
            case 'OR':
                result = result | parseInt(customToString(nextToken, 2), 2);
                break;
            case 'NOT':
                result = ~result & ((1 << customToString(nextToken, 2).length) - 1);
                break;
            case 'NAND':
                result = (result & parseInt(customToString(nextToken, 2), 2)) ^ parseInt("1".repeat(customToString(nextToken, 2).length), 2);
                break;
            case 'NOR':
                result = ~result & parseInt("1".repeat(customToString(nextToken, 2).length), 2);
                break;
            case 'XOR':
                result = result ^ parseInt(customToString(nextToken, 2), 2);
                break;
        }
    }

    return customToString(result, 2);
}
