export function encodeDots(input: any) {
    if (input === undefined) {
        return undefined
    }

    if (input === null) {
        return null
    }

    if (typeof input === 'string') {
        return input
    }

    if (typeof input === 'object' && !Array.isArray(input)) {
        return replaceAllKeys(input)
    }

    if (Array.isArray(input)) {
        return replaceAllInList(input)
    }


    return input;
}

function replaceAllKeys(input) {
    var result = {};

    for (let obj in input) {

        if (Array.isArray(input[obj])) {
            result[obj] = replaceAllInList(input[obj])
        }
        else if (typeof input[obj] == "object" && !Array.isArray(input)) {
            result[replaceKey(obj)] = replaceAllKeys(input[obj]);
        }
        else {
            result[replaceKey(obj)] = input[obj];
        }
    }

    return result
}

function replaceAllInList(input: Array<Object>) {
    return Object.entries(input).map(([key, value]) => {
        if (typeof value == "object") {
            return replaceAllKeys(value);
        }
        else {
            return replaceKey(value)
        }
    });
}

function replaceKey(key) {
    return key.replaceAll('.', '&46;');
}
