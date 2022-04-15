import file_read from "../core/file_read.js";
import for_each from "../foundation/for_each.js";
import range from "../foundation/range.js";

let count = 66;

for_each(range(count), n => {
    let book_number = (n + 1).toString().padStart(2, '0');
    console.log(book_number);
})

let book_number = '01';
let chapter = '1';

let path = `./public/spanish/${book_number}/${chapter}.htm`;
let text = file_read(path);

let start_search = `<!--... the Word of God:-->`;
let end_search = `<!--... sharper than any twoedged sword... -->`;

let start = text.indexOf(start_search) + start_search.length;
let end = text.indexOf(end_search);

let sub = text.substring(start, end);

console.log(sub);