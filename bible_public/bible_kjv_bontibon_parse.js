import directory_firebase_deploy_get from "../core/directory_firebase_deploy_get.js";
import file_read from "../core/file_read.js";
import string_split_newline from "../core/string_split_newline.js";
import string_starts_with from "../foundation/string_starts_with.js";
import for_each from "../foundation/for_each.js";
import string_split from "../foundation/string_split.js";
import sequence_first from "../core/sequence_first.js";
import list_skip from "../core/list_skip.js";
import assert from "../foundation/assert.js";
import bible_verse_data from "../bible/bible_verse_data.js";
import list_add from "../foundation/list_add.js";
import error from "../foundation/error.js";
import file_lines_for_each from "../core/file_lines_for_each.js";
import list_get from "../foundation/list_get.js";
import is_string_not_empty from "../foundation/is_string_not_empty.js";
import list_where from "../foundation/list_where.js";
import is_empty from "../core/is_empty.js";
export default bible_kjv_bontibon_parse;
function bible_kjv_bontibon_parse() {
    let directory_firebase_deploy = directory_firebase_deploy_get();
    let file_path = `${ directory_firebase_deploy }/kjv/bontibon/kjv.tsv`;
    let verses = [];
    file_lines_for_each(file_path, line => {
        if (is_empty(line)) {
            return;
        }
        let line_split = string_split(line, '\t');
        let book = sequence_first(line_split)
        let chapter_index = list_get(line_split, 3);
        let verse = list_get(line_split, 4);
        let tokens_unsplit = list_get(line_split, 5);
        let tokens_unfiltered = string_split(tokens_unsplit, ' ');
        let tokens = list_where(tokens_unfiltered, token => is_string_not_empty(token));
        let verse_data = bible_verse_data(book, chapter_index, verse, tokens)
        list_add(verses, verse_data);
    })
    return verses;
}