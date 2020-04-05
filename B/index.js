const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

let length
let lineIndex = 0
let max = 0
let current = 0
const read = line => {
	if (lineIndex) {
		if (lineIndex > length) {
			rl.close()
		} else if (line === 1) {
			current += 1
			if (current > max) max = current
		} else {
			current = 0
		}
	} else {
		length = parseInt(line, 0)
		if (!length) rl.close()
	}
	lineIndex += 1
}


const close = () => {
	fs.writeFileSync(`${__dirname}/output.txt`, max)
}

rl
	.on('line', read)
	.on('close', close)
