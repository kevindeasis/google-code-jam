const fs = require('fs'),
    inputFileName = process.argv[2],
    outputFileName = process.argv[3];

const isSad = (token) => (token === "-")
const hasSadPancake = (pancakeRow) => (pancakeRow.some(isSad))
const flip = (token) => (token === "+" ? "-" : "+")

function pancake(s, k){
	numberOfFlip = 0;
	var s = s.split("")
	for (let i = 0; i < s.length-k+1; ++i){
		if (s[i] == '-'){
			numberOfFlip = numberOfFlip + 1;
			for (let j = i; j < i+k; ++j) {
				s[j] = flip(s[j]);	
			}
		}
	}
	if (hasSadPancake(s)){
        return "IMPOSSIBLE"
    }
	return numberOfFlip;
}


const main = (algorithm) => {
  fs.readFile(inputFileName, 'utf8', function (err, sourceContent) {
    
    if (err) { return handleErr(err) }
    const linesOfInput = sourceContent.split('\n')
    const numberOfTestCases = parseInt(linesOfInput[0])

    const setOfTestCases = linesOfInput.slice(1, linesOfInput.length)

    var setOfAllTidy = setOfTestCases.map((singleTestCase) => {
		let inputs = singleTestCase.split(" ")
		return pancake(inputs[0], parseInt(inputs[1]))
    }) // returns new array

    answersForTestCases = ""
    for (let k = 1; k <= numberOfTestCases; k++) {
        const currentTidy = setOfAllTidy[k-1]
        answersForTestCases += `Case #${k}: ${currentTidy}\n`
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