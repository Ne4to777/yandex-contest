const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

let length
let lineIndex = 0

const aggregator = {}
const read = line => {
	if (lineIndex) {
		if (lineIndex > length) {
			rl.close()
		} else {
			const startAt = line.indexOf(' ')
			if (startAt > 0) {
				let char = ''
				let isFirst = true
				for (let i = startAt; i < line.length; i += 1) {
					const el = line.charAt(i)
					if (el === ' ') {
						if (isFirst) {
							isFirst = false
						} else {
							if (!aggregator[char]) aggregator[char] = 0
							aggregator[char] += 1
						}
						char = ''
					} else {
						char += el
					}
				}
				if (!aggregator[char]) aggregator[char] = 0
				aggregator[char] += 1
			}
		}
	} else {
		length = parseInt(line, 0)
		if (!length) rl.close()
	}
	lineIndex += 1
}

const close = () => {
	const array = Object.keys(aggregator).sort((a, b) => parseInt(a, 0) - parseInt(b, 0))
	const buffer = Buffer.alloc(50000000)
	let position = 0
	for (let i = 0; i < array.length; i += 1) {
		const number = array[i]
		let count = aggregator[number]
		while (count) {
			buffer.write(`${number} `, position)
			position += number.length + 1
			count -= 1
		}
	}
	fs.writeFileSync(`${__dirname}/output.txt`, buffer.slice(0, buffer.indexOf(0x00)).slice(0, -1))
	// logMemoryDump()
}

rl
	.on('line', read)
	.on('close', close)

const logMemoryDump = () => {
	console.log(`heapUsed ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`)
}
// const array1 = [...new Array(1024)].reduce((acc, el) => {
// 	const line = [...new Array(10240)].map(el => 100).join(' ')
// 	return `${acc}100 ${line}\n`
// }, '1024\n')

// fs.writeFileSync(`${__dirname}/input.txt`, array1)
