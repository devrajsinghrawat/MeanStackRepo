let buffer = new ArrayBuffer(8);           // 64 bits - 8 bytes
let view = new Int32Array(buffer);         // 32 but interger array

buffer[0] = 1;
buffer[1] = 8;
buffer[2] = 16;
buffer[3] = 'a';

view[0] = 15;
view[1] = 50;

console.log(buffer);
console.log(view);