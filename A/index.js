const fs = require('fs')
const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

const lines = []

const read = line => lines.push(line)

const close = () => {
	const [jewels, stones] = lines
	let result = 0
	for (let i = 0; i < stones.length; i += 1) {
		if (jewels.includes(stones.charAt(i))) result += 1
	}
	fs.writeFileSync(`${__dirname}/output.txt`, result.toString())
}

rl
	.on('line', read)
	.on('close', close)
