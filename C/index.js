const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

let previous
let length
let lineIndex = 0
let position = 0
const buffer = Buffer.alloc(7000000)
const read = line => {
	if (lineIndex) {
		if (lineIndex > length) {
			rl.close()
		} else if (previous !== line) {
			buffer.write(`${previous = line}\n`, position)
			position += line.length + 1
		}
	} else {
		length = parseInt(line, 0)
		if (!length) rl.close()
	}
	lineIndex += 1
}

const close = () => {
	fs.writeFileSync(`${__dirname}/output.txt`, buffer.slice(0, buffer.indexOf(0x00)))
	// logMemoryDump()
	process.exit(0)
}

rl
	.on('line', read)
	.on('close', close)


const logMemoryDump = () => {
	console.log(`heapUsed ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`)
}
