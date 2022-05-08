import file_read from "../core/file_read.js";

let text = file_read('./public/drv/pg1581.txt');
let lines = text.split('\n').map(line => line.trim());
let filtered = lines.filter(line => line.match(/.* Chapter \d{1,3}$/g))
console.log(filtered)