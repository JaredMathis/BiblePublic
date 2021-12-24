import directory_firebase_deploy_get from "../core/directory_firebase_deploy_get.js";
import file_read from "../core/file_read.js";
import string_split_newline from "../core/string_split_newline.js";
import string_starts_with from "../foundation/string_starts_with.js";
import file_lines_for_each from "../core/file_lines_for_each.js";
import string_split from "../foundation/string_split.js";
import sequence_first from "../core/sequence_first.js";
import list_skip from "../core/list_skip.js";
import assert from "../foundation/assert.js";
import bible_verse_data from "../bible/bible_verse_data.js";
import list_add from "../foundation/list_add.js";
import string_prefix_remove from "../foundation/string_prefix_remove.js";
import size from "../foundation/size.js";
import list_where from "../foundation/list_where.js";
import is_string_not_empty from "../foundation/is_string_not_empty.js";
export default bible_kjv_1769_parse;
function bible_kjv_1769_parse() {
    let directory_firebase_deploy = directory_firebase_deploy_get();
    let file_path = `${ directory_firebase_deploy }/kjv/1769/kjv-1769.txt`;
    let verses = [];
    let book;
    let book_prefix = "BOOK:";
    file_lines_for_each(file_path, line => {
        if (string_starts_with(line, book_prefix)) {
            book = string_prefix_remove(line, book_prefix)
        } else {
            let parts = string_split(line, ' ');
            let chapter_verse = sequence_first(parts);
            let chapter_verse_split = string_split(chapter_verse, ":");
            assert(size(chapter_verse_split) === 2);
            let chapter_index = chapter_verse_split[0];
            let verse = chapter_verse_split[1];
            let tokens = list_skip(parts, 1)
            let filtered = list_where(tokens, t => is_string_not_empty(t))
            let verse_data = bible_verse_data(book, chapter_index, verse, filtered);
            list_add(verses, verse_data);
        }
    })
    return verses;
}