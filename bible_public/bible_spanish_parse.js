import bible_testaments_books from "../bible/bible_testaments_books.js";
import bible_verse_data from "../bible/bible_verse_data.js";
import file_over_write from "../core/file_over_write.js";
import file_read from "../core/file_read.js";
import files_get from "../core/files_get.js";
import for_each from "../foundation/for_each.js";
import is_string_not_empty from "../foundation/is_string_not_empty.js";
import object_to_json from "../foundation/object_to_json.js";
import range from "../foundation/range.js";
import bible_public_file_get from "./bible_public_file_get.js";


let books = await bible_testaments_books(bible_public_file_get)

let count = 66;

let result = [];

for_each(range(count), n => {
    let book = books[n];

    let book_number = (n + 1).toString().padStart(2, '0');

    let book_directory = `./public/spanish/${book_number}/`;
    let files = files_get(book_directory, [], ['.htm']);
    for_each(range(files.length), chapter_index => {
        let chapter = (chapter_index + 1).toString();

        let path = `${book_directory}${chapter}.htm`;
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
                .replaceAll(/<[^>]*>/g, "")
                .replace(":", ": ")
                .trim()
            let tokens = verse_text.split(' ').filter(t => is_string_not_empty(t))

            let verse_data = bible_verse_data(book, chapter, verse_reference.toString(), tokens)
            result.push(verse_data)
        }
    });
})

file_over_write(`./public/spanish_parsed.json`, object_to_json(result))