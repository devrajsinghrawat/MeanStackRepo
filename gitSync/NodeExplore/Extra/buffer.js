let buf = new Buffer('Hello', 'utf8');

console.log(buf)
console.log(buf.toString())
console.log(buf.toLocaleString())
console.log(buf.toJSON())

buf.write('wor')
console.log(buf.toString())