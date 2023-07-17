interface BingoCard { 
    name: string;
    rows: Array<number>[];
    cols: Array<number>[];
}

let calledNumbers:Array<number> = [];
const resultDomElementID = "result";

/**
 * Create bingo card
 * @param {string} name Name of the card
 * @param {Array<number>} rows The numbers in each row
 * @param {Array<number>} cols The numbers in each column
 */
export const createBingoCard = (name:string, rows:Array<number>[], cols:Array<number>[]) => {
    return {
        name: name,
        rows: rows,
        cols: cols
    };
}

/**
 * Shout bingo
 * @param {BingoCard} card The bingo card
 * @param {Array<number>} numbers The numbers in the winning row or columns
 * @param {Array<number>} calledNumbers The numbers 'called' in the game to this point
 */
const shoutBingo = (card:BingoCard, numbers:Array<number>, calledNumbers:Array<number>) => {
    const resultElement:HTMLElement|null = typeof document !== 'undefined' ? document.getElementById(resultDomElementID) : null
    const successMessage = `BINGO! ${card.name} is the winner [${numbers}] after ${calledNumbers.length} numbers were called [${calledNumbers}]`;
    
    if (typeof document !== 'undefined' && resultElement) {
        resultElement.innerHTML += `<p>${successMessage}</p>`;
    }

    console.log(successMessage);
}

/**
 * 'Call' the available numbers one at a time until someone calls "Bingo"
 * @param {Array<number>} availableNumbers The numbers which haven't yet been called
 * @param {Array<BingoCard>} activeCards All bingo cards which are in the current game
 */
const numberCaller = (availableNumbers:Array<number>, activeCards:Array<BingoCard>) => {
    let thisGamesNumbers:Array<number> = availableNumbers.slice(0)

    for(var i = 0; i < thisGamesNumbers.length; i++) {
        calledNumbers.push(thisGamesNumbers[i]);
        thisGamesNumbers.splice(i, 1);

        let foundWinner = dabAndCheckAllCards(activeCards, calledNumbers);

        if(foundWinner) {
            break;
        } else {
            i--;
        }
    }
}

/**
 * Loop through all active cards and check for winning columns or rows
 * @param {Array<number>} activeCards All bingo cards which are in the current game
 * @param {Array<number>} calledNumbers The numbers already in play in the game
 * @returns {bool} Whether the card has won the game
 */
export const dabAndCheckAllCards = (activeCards:Array<BingoCard>, calledNumbers:Array<number> ) => {
    let cardHasWon = false;
    
    for (let card of activeCards) {
        cardHasWon = checkForWinningCard(calledNumbers, card);
        if(cardHasWon) { break }
    }

    return cardHasWon;
}

/**
 * Check if a single card matches any columns or rows to win the game
 * @param {Array<number>} calledNumbers The numbers 'called' in the game to this point
 * @param {BingoCard} card The bingo card
 * @returns {bool} Whether the card has won the game
 */
export const checkForWinningCard = (calledNumbers:Array<number>, card:BingoCard) => {
    let cardIsAWinner = false;
    const allWinningCombinations = card.rows.concat(card.cols)

    allWinningCombinations.forEach((numbers, i) => {
        if(everyItemInArrayMatches(numbers, calledNumbers)) {
            cardIsAWinner = true;
            shoutBingo(card, numbers, calledNumbers);
        }
    })

    return cardIsAWinner;
}

/**
 * Start a new game of bingo
 * @param {Array<number>} calledNumbers The numbers 'called' in the game to this point
 * @param {Array<number>} availableNumbers The numbers which haven't yet been called
 * @param {Array<BingoCard>} activeCards All bingo cards which are in the current game
 */
const startBingoGame = (availableNumbers:Array<number>, activeCards:Array<BingoCard>) => {
    calledNumbers = [];
    numberCaller(availableNumbers, activeCards);
}

/**
 * Check whether all items in two arrays match
 * @param {Array<number>} arr1 The first array to compare
 * @param {Array<number>} arr2 The second array to compare
 * @returns {bool} All items in the two arrays match
 */
export const everyItemInArrayMatches = (arr1:Array<number>, arr2:Array<number>) => arr1.every(item => arr2.includes(item))

/**
 * Takes a csv text input and parses it to a Array<number>
 * @param {string} csv A string of text
 * @returns {Array<number>} An array of all numbers in the csv
 */
export const parseTextToIntArray = (csv:string) => {
    let tempArray:Array<string> = csv.split(',');
    let intArray:Array<number> = [];

    for (let item in tempArray ) {
        const itemAsInt = Number(tempArray[item])
        validateInputIsNumber(itemAsInt) ? intArray.push(itemAsInt) : console.warn("An item in the import is not a number", tempArray);
    }
    
    return intArray;
}

export const validateInputIsNumber = (number:number) => {
    return Number.isInteger(number)
}

/**
 * Takes an Array<number> and returns a nested array of 'columns' for the bingo card
 * @param {Array<number>} cardNumbers All the numbers for the bingo card
 * @param {Array<number>} colCount The number of columns on the card
 * @returns {Array<number>[]} Nested array of numbers in each column 
 */
export const getBingoCardColumns = (cardNumbers:Array<number>, colCount:number) => {
    let cols:Array<number>[] = [];
    let i:number = 0;
    
    while (i < colCount) {
        cols.push(getEveryNth(cardNumbers, colCount, i));
        i++;
    }

    return cols;
}

/**
 * Takes an Array<number> and returns an array of every nth item
 * @param {Array<number>} arr The original array
 * @param {number} nth nth number count
 * @param {number} colIndex The column index
 * @returns {Array<number>} Returns an array of numbers
 */
export function getEveryNth(arr:Array<number>, nth:number, colIndex:number) {
    const result:Array<number> = [];

    for (let i = colIndex; i < arr.length; i += nth) {
        result.push(arr[i]);
    }

    return result;
    }

/**
 * Filters the card array for the numbers in a row
 * @param {BingoCard} card The bingo card
 * @returns {number[][]} Nested array of numbers in each row 
 */  
export const getBingoCardRows = (card:Array<number>, cardRows:number) => {
    let i:number = 0;
    let rows:number[][] = [];

    while (i < cardRows) {
        const rowNumbers:Array<number> = (card.slice((i*cardRows), ((i+1) * cardRows)));
        rows.push(rowNumbers);
        i++;
    }

    return rows;
}

/**
 * Check if arrays are of an equal length
 * @param {Array<number>} arrays The bingo card
 * @returns {bool} Arrays are equal length
 */  
export function arraysAreEqualLength(arrays:Array<number>[]) {
    const firstLength = arrays[0].length;
    const allSameLength = arrays.every(({length}) => length === firstLength);

    if(!allSameLength) {
        console.warn("Not all the cards have the same number of numbers. Please check the input.");
    }

    return allSameLength
}

/**
 * Init the Bingo Challenge
 */  
export default function InitBingo() {
    const cardSize:number = 5;
    const part1Intro = "Part 1 - Determining a Winning Bingo Game";
    const part2Intro = "Part 2 - Determining a Winning Bingo Game";
    const resultElement:HTMLElement|null = typeof document !== 'undefined' ? document.getElementById(resultDomElementID) : null

    Promise.all([
        fetch('./data/caller-numbers.txt').then(x => x.text()),
        fetch('./data/card1.txt').then(x => x.text()),
        fetch('./data/card2.txt').then(x => x.text()),
        fetch('./data/card3.txt').then(x => x.text())
        ]).then(([callerNumbers, card1, card2, card3]) => {

        const numbersInPlay = parseTextToIntArray(callerNumbers);
        const card1Numbers =  parseTextToIntArray(card1);
        const card2Numbers =  parseTextToIntArray(card2);
        const card3Numbers =  parseTextToIntArray(card3);

        const allCardsConfigured:boolean = arraysAreEqualLength([card1Numbers,card2Numbers,card3Numbers]);

        if(allCardsConfigured) {

            const bingoCard1 = createBingoCard('Card 1', getBingoCardRows(card1Numbers, cardSize), getBingoCardColumns(card1Numbers, cardSize));
            const bingoCard2 = createBingoCard('Card 2', getBingoCardRows(card2Numbers, cardSize), getBingoCardColumns(card2Numbers, cardSize));
            const bingoCard3 = createBingoCard('Card 3', getBingoCardRows(card3Numbers, cardSize), getBingoCardColumns(card3Numbers, cardSize));
            const activeCards:Array<BingoCard> = [bingoCard1, bingoCard2, bingoCard3];
            
            if (typeof document !== 'undefined' && resultElement) {
                resultElement.innerHTML = `<h2>${part1Intro}</h2>`;
            }
            console.log(part1Intro);
            startBingoGame(numbersInPlay, [bingoCard1]);
            if (typeof document !== 'undefined' && resultElement) {
                resultElement.innerHTML += `<h2>${part2Intro}</h2>`;
            }
            console.log("Part 2 - Determining a Winning Bingo Game");
            startBingoGame(numbersInPlay, activeCards);
        } else {
            if (typeof document !== 'undefined' && resultElement) {
                resultElement.innerHTML += `There has been an error in configuring the cards.`;
            }
        }

    });
}