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
        while(hasBrackets(line)) {

            let brackets = findLastBracket(line);
            let chunk = line.substring(brackets[0], brackets[1] + 1)
            let result = customEval(chunk);

            line = line.replace(chunk, result)
            
            if(line.includes('pow ' + result)) {
                line = line.replace('pow ' + result, result)
            } else if (line.includes('sqrt ' + result)) {
                line = line.replace('sqrt ' + result, Math.sqrt(result))
            }
        }

        return customEval(line);
    } catch {
        return "Error calculating";
    }
}

function calculateConversion(line) {
    const decToBinRegex = /^DEC\s*(\d+)\s*BIN$/;
    const decToOctRegex = /^DEC\s*(\d+)\s*OCT$/;
    const decToHexRegex = /^DEC\s*(\d+)\s*HEX$/;
    const binToDecRegex = /^BIN\s*(\d+)\s*DEC$/;
    const binToOctRegex = /^BIN\s*(\d+)\s*OCT$/;
    const binToHexRegex = /^BIN\s*(\d+)\s*HEX$/;
    const octToDecRegex = /^OCT\s*(\d+)\s*DEC$/;
    const octToBinRegex = /^OCT\s*(\d+)\s*BIN$/;
    const octToHexRegex = /^OCT\s*(\d+)\s*HEX$/;
    const hexToDecRegex = /^HEX\s*(\w+)\s*DEC$/;
    const hexToBinRegex = /^HEX\s*(\w+)\s*BIN$/;
    const hexToOctRegex = /^HEX\s*(\w+)\s*OCT$/;

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
    let isNegative = false;

    if (number < 0) {
        isNegative = true;
        number = Math.abs(number);
    }

    while (number > 0) {
        let remainder = number % base;
        if (remainder >= 10 && base === 16) {
            result = String.fromCharCode(55 + remainder) + result;
        } else {
            result = String(remainder) + result;
        }
        number = Math.floor(number / base);
    }

    if (isNegative) {
        result = '-' + result;
    }

    return result;
}

function customParseInt(str, base) {
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    return str.split('').reduce((result, char) => {
      const charValue = digits.indexOf(char.toUpperCase());
      return result * base + charValue;
    }, 0);
}


function calculateLogic(line) {

    if (hasBrackets(line)) {
        const brackets = findLastBracket(line);

        const subExpression = line.substring(brackets[0] + 1, brackets[1]);
        
        const subResult = calculateLogic(subExpression);

        line = line.substring(0, brackets[0]) + subResult + line.substring(brackets[1] + 1);
    }

    const operations = line.split(/\s+/);

    const and = (a, b) => a & b;
    const or = (a, b) => a | b;
    const xor = (a, b) => a ^ b;
    const nand = (a, b) => ~(a & b);
    const nor = (a, b) => ~(a | b);
    const xnor = (a, b) => ~(a ^ b);
    const not = (a) => ~a;

    const basePrefix = operations[0].substring(0, 3).toUpperCase();
    let base = 2;

    switch (basePrefix) {
        case 'BIN':
        base = 2;
        break;
        case 'OCT':
        base = 8;
        break;
        case 'DEC':
        base = 10;
        break;
        case 'HEX':
        base = 16;
        break;
        default:
        console.error(`Invalid base prefix: ${basePrefix}`);
        return NaN;
    }

    let result = customParseInt(operations[1], base);

    for (let i = 2; i < operations.length; i += 2) {
        const operator = operations[i];
        const operand = customParseInt(operations[i + 1], base);

        switch (operator.toUpperCase()) {
        case 'AND':
            result = and(result, operand);
            break;
        case 'OR':
            result = or(result, operand);
            break;
        case 'XOR':
            result = xor(result, operand);
            break;
        case 'NAND':
            result = not(and(result, operand));
            break;
        case 'NOR':
            result = not(or(result, operand));
            break;
        case 'XNOR':
            result = not(xor(result, operand));
            break;
        case 'NOT':
            result = ~result;
            break;
        default:
            console.error(`Invalid operator: ${operator}`);
            return NaN;
        }
    }

    return customToString(result, base);
}

function hasBrackets(line) {
    const regex = /[()]/;
    return regex.test(line);
}

function findLastBracket(line) {
    let brackets = new Array(2);
    const length = line.length;

    for (let i = length - 1; i >= 0 ; i--) {
        if (line[i] == '(') {
            brackets[0] = i;

            for(let j = i; j < length; j++) {
                if (line[j] == ')') {
                    brackets[1] = j;
                    return brackets;
                }
            }
        }
    }

    return 'Error!';
}

function customEval(line) {
    if (line[0] == '(' && line[line.length - 1] == ')') {
        line = line.substring(1, line.length - 1);
    }

    line = line.trim();

    if (line.includes(',')) {
        return calculatePow(line);
    }

    const first = ['/' , '%' , '*'];
    let arr = line.split(' ');
    let newArr = new Array(arr.length);
    newArr[0] = arr[0];
    let offset = 0;

    for (let i = 1; i < arr.length - offset - 1; i += 2) {
        for(let j = 0; j < 2; j++) {
            newArr[i + j] = arr[i + j + offset]
        }

        if(first.includes(newArr[i])) {
            switch (newArr[i]) {
                case '%':
                    newArr[i - 1] = newArr[i - 1] % newArr[i + 1];
                    break;
                case '/':
                    newArr[i - 1] = newArr[i - 1] / newArr[i + 1];
                    break;
                case '*':
                    newArr[i - 1] = newArr[i - 1] * newArr[i + 1];
                    break;
                default:
                    throw new Error('Invalid operator');
            }

            newArr[i] = newArr[i + 1] = null;
            offset += 2;
            i -= 2;
        }
    }

    newArr = newArr.filter(element => element !== undefined && element !== null);

    for (let i = 1; i < newArr.length - 1; i += 2) {
        switch (newArr[i]) {
            case '+':
                newArr[0] = parseFloat(newArr[0]) + parseFloat(newArr[i + 1]);
                break;
            case '-':
                newArr[0] = parseFloat(newArr[0]) - parseFloat(newArr[i + 1]);
                break;
            default:
                throw new Error('Invalid operator');
        }
    }

    return newArr[0];
}

function calculatePow(line) {
    const num = line.split(',');

    console.log(num);

    num[0] = customEval(num[0]);
    num[1] = customEval(num[1]);

    let result = 1;

    for (let i = 0; i < num[1]; i++) {
        result *= num[0];
    }

    return result;
}