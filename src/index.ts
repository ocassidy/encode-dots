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
        return replaceAllObjects(input)
    }

    if (Array.isArray(input)) {
        return replaceAllObjectsList(input)
    }


    return input;
}

function replaceAllObjects(input) {
    var result = {};

    for (let obj in input) {

        if (Array.isArray(input[obj])) {
            result[obj] = replaceAllObjectsList(input[obj])
        }
        else if (typeof input[obj] == "object" && !Array.isArray(input)) {
            result[replaceKey(obj)] = replaceAllObjects(input[obj]);
        }
        else {
            console.log('here 2')
            result[replaceKey(obj)] = input[obj];
        }
    }

    return result
}

function replaceAllObjectsList(input: Array<Object>) {
    return Object.entries(input).map(([key, value]) => {
        if (typeof value == "object") {
            return replaceAllObjects(value);
        }
        else {
            return replaceKey(value)
        }
    });
}

function replaceKey(key) {
    return key.replaceAll('.', '&46;');
}
