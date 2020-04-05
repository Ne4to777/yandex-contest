const fs = require('fs')

const rl = require('readline').createInterface({
	input: fs.createReadStream(`${__dirname}/input.txt`)
})

const buffer = Buffer.alloc(7000000)

const read = line => {
	const power = parseInt(line, 0)



	// fs.writeFileSync(`${__dirname}/output.txt`, power)
}

const generate = (cur, opened, closed, n) => {
	if (cur.length == 2 * n) {
		print(cur)

	} else {

	}
	return
	if opened < n:
		generate(cur + '(', opened + 1, closed, n)
	if closed < opened:
		generate(cur + ')', opened, closed + 1, n)

}

rl
	.on('line', read)
