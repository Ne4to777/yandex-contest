const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

const buffer = Buffer.alloc(7000000)
let position = 0

const read = line => {
	generateR('', 0, 0, parseInt(line, 0))
}

const generateR = (cur, opened, closed, n) => {
	const length = 2 * n
	if (cur.length === length) {
		buffer.write(`${cur}\n`, position)
		position += length + 1
	} else {
		if (opened < n) generateR(`${cur}(`, opened + 1, closed, n)
		if (closed < opened) generateR(`${cur})`, opened, closed + 1, n)
	}
}

const close = () => {
	fs.writeFileSync(`${__dirname}/output.txt`, buffer.slice(0, buffer.indexOf(0x00)))
}

rl
	.on('line', read)
	.on('close', close)
