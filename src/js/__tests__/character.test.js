import { createCharacter } from '../character'


describe('successful character creation test', () => {
    test.each([
        ['Bowman', 25, 25],
        ['Swordsman', 40, 10],
        ['Magician', 10, 40],
        ['Undead', 25, 25],
        ['Zombie', 40, 10],
        ['Daemon', 10, 40]
    ])('should return character object with correct properties', (charType, expectedAtk, expectedDef) => {
        expect(createCharacter('TESTNAME', charType)).toEqual(
            {
                name: 'TESTNAME',
                type: charType,
                health: 100,
                level: 1,
                attack: expectedAtk,
                defence: expectedDef
            }
        );
    })
})

describe('invalid character creation test', () => {
    test.each([
        ['N', 'Bowman', 'Name is too short'],
        ['VERYLONGNAME', 'Swordsman', 'Name is too long'],
        ['Name', 'Spoon', 'Invalid character type'],
    ])('should throw error with expected message', (name, type, expectedErrorMessage) => {
        expect( () => {createCharacter(name, type)} ).toThrow(expectedErrorMessage);
    })
})