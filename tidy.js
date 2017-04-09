const fs = require('fs'),
    inputFileName = process.argv[2],
    outputFileName = process.argv[3];

var scaffoldArray = []
var digitsInProcess = []

const setToMaxDigit = (element, index, array) => {
  array[index] = 9;
}

const maximizeDigitsToTheRight = () => {
    scaffoldArray.forEach(setToMaxDigit);
}

const compareAdjacentDigits = (array, leftDigitIndex, rightDigitIndex) => { // [1,3,2] , 1,2
    if (array[leftDigitIndex] > array[rightDigitIndex]) {
        scaffoldArray.unshift(array[rightDigitIndex])
        maximizeDigitsToTheRight();
        digitsInProcess[leftDigitIndex] = digitsInProcess[leftDigitIndex]-1;
    } else {
        scaffoldArray.unshift(array[rightDigitIndex])
    }
}

const leftToRight = (number) => {
    scaffoldArray = []
    digitsInProcess = []
    var arrayOfDigits = turnNumberIntoArrayOfSingleDigits(number)
    digitsInProcess = arrayOfDigits
    if (digitsInProcess.length >= 2) {
        for (var i = digitsInProcess.length - 2; i >= -1; i--)
            {
                compareAdjacentDigits(digitsInProcess,i,i+1)// count is only evaluated once and then the comparison is always on 0.
            }
    } else if (digitsInProcess.length === 1) {
        scaffoldArray.unshift(digitsInProcess[0])
    } else {

    }

    var filtered = scaffoldArray.filter((x) => (x >0));
    return filtered.join("");
}

const turnNumberIntoArrayOfSingleDigits = (n) => {
    return arrayOfSingleDigits = (n).toString(10).split("").map(function(t){return parseInt(t)});
}

const main = (algorithm) => {
  fs.readFile(inputFileName, 'utf8', function (err, sourceContent) {
    
    if (err) { return handleErr(err) }
    const linesOfInput = sourceContent.split('\n')
    const numberOfTestCases = parseInt(linesOfInput[0])

    // if input is greater than 1
    const setOfTestCases = linesOfInput.slice(1, linesOfInput.length)

    var setOfAllTidy = setOfTestCases.map((singleTestCase) => {
        return leftToRight(singleTestCase)
    }) // returns new array

    answersForTestCases = ""
    for (let k = 1; k <= numberOfTestCases; k++) {
        const currentTidy = setOfAllTidy[k-1]
        answersForTestCases += `Case #${k}: ${currentTidy} \n`
    }

    fs.writeFile(outputFileName, answersForTestCases, 'utf-8', (err) => {
        if (err) {
            console.error('write error');
        }
    });
  })
}

const handleErr = (err) => (console.log((err)))


main()
