const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

let length
let lineIndex = 0
const sequences = []
let current = 0
const read = line => {
	if (lineIndex) {
		if (lineIndex > length) {
			rl.close()
		} else if (line === '1') {
			if (!sequences[current]) sequences[current] = 0
			sequences[current] += 1
		} else {
			current += 1
		}
	} else {
		length = parseInt(line, 0)
		if (!length) rl.close()
	}
	lineIndex += 1
}


const close = () => {
	const result = sequences.reduce((acc, el) => acc > el ? acc : el, 0)
	fs.writeFileSync(`${__dirname}/output.txt`, result)
}

rl
	.on('line', read)
	.on('close', close)
