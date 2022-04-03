import file_over_write from '../core/file_over_write.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import object_to_json from '../foundation/object_to_json.js';
import bible_testaments_books from '../bible/bible_testaments_books.js';
import for_each_async from '../core/for_each_async.js';
import bible_book_chapters_asv from '../bible/bible_book_chapters_asv.js';
import bible_chapter_asv from '../bible/bible_chapter_asv.js';
import bible_public_file_get from './bible_public_file_get.js';
import list_add_all from '../core/list_add_all.js';
import file_json_read from '../core/file_json_read.js';
import keys from '../foundation/keys.js';
import for_each from '../foundation/for_each.js';
let version = 'cpdv';
let directory_firebase_deploy = directory_firebase_deploy_get();
let result = [];

let bible = file_json_read('./public/cpdv/EntireBible-CPDV.json');

let bible_keys = keys(bible);
for_each(bible_keys, key => {
  if (key === 'charset') {
    return;
  }
  let book = bible[key];
  let chapters = keys(book);
  // console.log({key,chapters});
  for_each(chapters, chapter_index => {
    let chapter = chapters[chapter_index];
    let verses = keys(chapter);

  });
});

// let verse_data = bible_verse_data(book, chapter_index, verse, tokens);

// await for_each_async(books, async book => {
//   let chapters = await bible_book_chapters_asv(bible_public_file_get, book);
//   await for_each_async(chapters, async chapter => {
//     let verses = await bible_chapter_asv(bible_public_file_get, book, chapter);
//     list_add_all(result, verses);
//   });
// });
// let json = object_to_json(result);
// file_over_write(`${ directory_firebase_deploy }/${ version }_parsed.json`, json);