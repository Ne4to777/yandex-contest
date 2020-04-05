const fs = require('fs')
const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

const lines = []

const read = line => lines.push(line)

const close = () => {
	const [first, second] = lines
	let result = 0
	if (first.length && first.length === second.length) {
		const firstMap = mapString(first)
		const secondMap = mapString(second)
		result = traverseMap(firstMap, secondMap)
		if (result) {
			result = traverseMap(secondMap, firstMap)
		}
	}
	fs.writeFileSync(`${__dirname}/output.txt`, result.toString())
}

const mapString = str => str.split('').reduce((acc, el) => {
	if (!acc[el]) acc[el] = 0
	acc[el] += 1
	return acc
}, {})

const traverseMap = (firstMap, secondMap) => {
	let result = 1
	const array = Object.keys(firstMap)
	for (let i = 0; i < array.length; i += 1) {
		const prop = array[i]
		if (secondMap[prop] !== firstMap[prop]) {
			result = 0
			break
		}
	}
	return result
}

rl
	.on('line', read)
	.on('close', close)
