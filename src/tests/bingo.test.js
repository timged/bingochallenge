const { everyItemInArrayMatches, createBingoCard, dabAndCheckAllCards, checkForWinningCard, parseTextToIntArray, getBingoCardColumns, getBingoCardRows, getEveryNth, arraysAreEqualLength } = require('../bingo');

const exampleCard1 = createBingoCard("Card 1", [[1,2,3],[4,5,6],[7,8,9]],[[1,4,7],[2,5,8],[3,6,9]] )
const exampleCard2 = createBingoCard("Card 2", [[21,22,23],[24,25,26],[27,28,29]], [[21,24,27],[22,25,28],[23,26,29]])
const exampleCard1Numbers = [1,2,3,4,5,6,7,8,9]

test('Every Item in these 2 arrays should match', () => {
    expect(everyItemInArrayMatches([1,2,3], [1,2,3])).toBe(true);
})

test('Every Item in these 2 arrays should NOT match', () => {
    expect(everyItemInArrayMatches([1,2,3], [1,3,4])).toBe(false);
})

test('Create a new bingo card', () => {
    expect(exampleCard1).toEqual({name: 'Card 1', rows: [[1,2,3],[4,5,6],[7,8,9]], cols: [[1,4,7],[2,5,8],[3,6,9]]});
});

test('The numbers in a row on the card should match those already called (BINGO!)', () => {
    expect(dabAndCheckAllCards([exampleCard1, exampleCard2], [1,2,3])).toBe(true);
});

test('The numbers in a row on the card should NOT match those already called', () => {
    expect(dabAndCheckAllCards([exampleCard1, exampleCard2], [1,2,6])).toBe(false);
});

test('Check if any numbers on a single card match a winning combination (BINGO!)', () => {
    expect(checkForWinningCard([1,2,3], exampleCard1)).toBe(true);
});

test('Check if any numbers on a single card should NOT match those already called', () => {
    expect(checkForWinningCard([1,2,6], exampleCard1)).toBe(false);
});

test('CSV should be converted to a int array', () => {
    expect(parseTextToIntArray("1,2,3")).toEqual([1,2,3]);
});

test('Get Nested array of all the columns for the bingo card', () => {
    expect(getBingoCardColumns(exampleCard1Numbers, 3)).toEqual([[1,4,7],[2,5,8],[3,6,9]]);
});

test('Get every nth item from the original array', () => {
    expect(getEveryNth(exampleCard1Numbers, 3, 0)).toEqual([1,4,7]);
});

test('Get bingo card rows', () => {
    expect(getBingoCardRows(exampleCard1Numbers, 3)).toEqual([[1,2,3],[4,5,6],[7,8,9]]);
});

test('Arrays are equal length', () => {
    expect(arraysAreEqualLength([[1,2,3],[1,2,3]])).toEqual(true);
});

test('Arrays are NOT equal length', () => {
    expect(arraysAreEqualLength([[1,2,3],[1,2,3,4]])).toEqual(false);
});
