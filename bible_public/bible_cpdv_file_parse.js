import file_over_write from '../core/file_over_write.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import object_to_json from '../foundation/object_to_json.js';
import file_json_read from '../core/file_json_read.js';
import keys from '../foundation/keys.js';
import for_each from '../foundation/for_each.js';
import list_add from '../foundation/list_add.js';
import list_where from '../foundation/list_where.js';
import string_split from '../foundation/string_split.js';
import bible_verse_data from '../bible/bible_verse_data.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import keys_unsorted from '../foundation/keys_unsorted.js';
let version = 'cpdv';
let directory_firebase_deploy = directory_firebase_deploy_get();
let result = [];
let bible = file_json_read('./public/cpdv/EntireBible-CPDV.json');
let bible_keys = keys_unsorted(bible);
for_each(bible_keys, book_index => {
  if (book_index === 'charset') {
    return;
  }
  let book = bible[book_index];
  let chapters = keys_unsorted(book);
  // console.log({book_index,chapters});
  for_each(chapters, chapter_index => {
    let chapter = book[chapter_index];
    let verses = keys_unsorted(chapter);
    for_each(verses, verse => {
      let text = chapter[verse];
      let tokens = string_split(text, ' ');
      let filtered = list_where(tokens, is_string_not_empty)
      let verse_data = bible_verse_data(book_index, chapter_index, verse, filtered);
      list_add(result, verse_data);
    });
  });
});

let json = object_to_json(result);
file_over_write(`${ directory_firebase_deploy }/${ version }_parsed.json`, json);