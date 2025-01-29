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


test('should increase character level', () => {
    let testChar = createCharacter('test', 'Bowman');
    testChar.levelUp();
    expect(testChar.level).toBe(2);
})

test('should throw health error on levelUp function', () => {
    let testChar = createCharacter('test', 'Bowman');
    testChar.damage(999);
    expect( () => {testChar.levelUp()} ).toThrow('Invalid health value');
})


test('should damage character to expected amount of health', () => {
    let testChar = createCharacter('test', 'Bowman');
    testChar.damage(10);
    expect(testChar.health).toBe(100 - 10 * (1 - testChar.defence / 100));
})

test('should throw health error on damage function', () => {
    let testChar = createCharacter('test', 'Bowman');
    testChar.damage(999);
    expect( () => {testChar.damage(10)} ).toThrow('Invalid health value');
})