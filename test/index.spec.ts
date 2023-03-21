import { encodeDots } from "../src";

describe("tests", () => {
    it('encodeDots should return undefined when input is undefined', () => {
        const input = undefined;
        const expectedOutput = undefined;
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should return null when input is null', () => {
        const input = null;
        const expectedOutput = null;
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should not modify primitive inputs like strings', () => {
        const input = 'hello';
        const expectedOutput = 'hello';
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should not replace dots with &46; in object values', () => {
        const input = { foo: 'http://a.com' };
        const expectedOutput = { foo: 'http://a.com' };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots with &46; in object keys', () => {
        const input = { 'http://a.com': 1 };
        const expectedOutput = { 'http://a&46;com': 1 };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace multiple dots with &46; in a object key', () => {
        const input = { 'http://www.a.com': 1 };
        const expectedOutput = { 'http://www&46;a&46;com': 1 };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots at multiple levels with &46; in a object key', () => {
        const input = { 'http://a.com': { 'http://b.com': 1 } };
        const expectedOutput = { 'http://a&46;com': { 'http://b&46;com': 1 } };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots with &46; in all object keys', () => {
        const input = { 'http://a.com': 1, 'http://b.com': 2 };
        const expectedOutput = { 'http://a&46;com': 1, 'http://b&46;com': 2 };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots with &46; in nested object keys', () => {
        const input = { example: { 'http://a.com': 1 } };
        const expectedOutput = { example: { 'http://a&46;com': 1 } };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots with &46; in array object keys', () => {
        const input = [{ 'http://a.com': 1 }, { 'http://b.com': 1 }];
        const expectedOutput = [{ 'http://a&46;com': 1 }, { 'http://b&46;com': 1 }];
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    });

    it('encodeDots should replace dots with &46; in nested array object keys', () => {
        const input = { example: [{ 'http://a.com': 1 }] };
        const expectedOutput = { example: [{ 'http://a&46;com': 1 }] };
        const actualOutput = encodeDots(input);
        expect(actualOutput).toEqual(expectedOutput)
    }); 
});