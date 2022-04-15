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



console.log(text);