import bible_verse_data from "../bible/bible_verse_data.js";
import directory_firebase_deploy_get from "../core/directory_firebase_deploy_get.js";
import file_over_write from "../core/file_over_write.js";
import file_read from "../core/file_read.js";
import object_to_json from "../foundation/object_to_json.js";

let version = 'drv';
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
        p.match(/^\d{1,3}:\d{1,3}\. /));

let verses = [];

let book;
let chapter;
filtered.forEach(p => {
    if (p.match(/.* Chapter \d{1,3}$/g)) {
        let book_end_index = p.indexOf(' Chapter ');
        book = p.slice(0, book_end_index);
        let split = p.split(' ')
        chapter = split[split.length-1]
    } else {
        let verse_text_begin = p.indexOf('. ');
        let verse_text = p.substring(verse_text_begin + 2);
        let verse_index_begin = p.indexOf(":");
        let verse_index = p.substring(verse_index_begin + 1, verse_text_begin);
        let tokens = verse_text.split(' ');
        let verse_data = bible_verse_data(book, chapter, verse_index, tokens);
        verses.push(verse_data);        
    }
})

let directory_firebase_deploy = directory_firebase_deploy_get();
let json = object_to_json(verses);
file_over_write(`${ directory_firebase_deploy }/${ version }_parsed.json`, json);