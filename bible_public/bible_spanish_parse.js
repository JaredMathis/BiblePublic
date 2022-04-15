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

let split = sub.split('<br />');
for (let s of split){

    let marker = 'id="';
    let verse_reference_index = s.indexOf(marker)
    let verse_reference_full = s.substring(verse_reference_index + marker.length)
    let verse_reference_string = verse_reference_full.substring(0, verse_reference_full.indexOf("\">"));
    let verse_reference = parseInt(verse_reference_string, 10);
    let marker2 = '</span>'
    let verse_text = verse_reference_full
        .substring(verse_reference_full.indexOf(marker2) + marker2.length)
        .replace('</p>', '')
        .trim()
    console.log(verse_text);
}
