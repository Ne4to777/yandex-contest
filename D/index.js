const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

const buffer = Buffer.alloc(7000000)
const position = 0

const read = line => {
	const power = parseInt(line, 0)
	const initRow = generateInitArray(power)
	traverseR(1, initRow)


	// fs.writeFileSync(`${__dirname}/output.txt`, power)
}

const generateInitArray = n => new Array(n)

const generateInitRow = n => {
	const sample = '()'
	let result = ''
	for (let i = 0; i < n; i += 1) {
		result += sample
	}
	return result
}

const traverseR = row => {
	for (let i = 1; i <= row.length; i += 1) {
		const { sample, restRow } = extractSample(i, row)
		if (sample.length > 1) {
			traverseR(sample)
		} else {
			for (let j = 0; j < restRow.length; j += 1) {
				renderRow(sample, j, restRow.length)
			}
		}
	}
}

const renderRow = (sample, i, length) => {


}

const extractSample = (samplePower, row) => {
	const sample = row.slice(0, samplePower)
	const restRow = row.slice(samplePower)
	return {
		sample,
		restRow
	}
}

const traverse = (sample, row) => {
	const samplString = sampleToString(sample)
	for (let i = 0; i < row.length; i += 1) {
		const element = row[i]
	}
}

rl
	.on('line', read)
