import file_read from "../core/file_read.js";

let text = file_read('./public/drv/pg1581.txt');
let lines = text.split('\n').map(line => line.trim());

let paragraphs = [];
let paragraph = '';
for (let i = 0; i < lines.length - 2; i++) {
    let current = lines[i];
    let next = lines[i+1];

    paragraph += ' ' + current;
    if (next === '') {
        paragraphs.push(paragraph.trim());
        paragraph = '';
    }
}

let filtered = paragraphs
    .filter(p => 
        p.match(/.* Chapter \d{1,3}$/g) || 
        p.match(/\d{1,3}:\d{1,3}\. /))
console.log(filtered)