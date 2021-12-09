import file_over_write from '../core/file_over_write.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import object_to_json from '../foundation/object_to_json.js';
import bible_testaments_books from '../bible/bible_testaments_books.js';
import for_each_async from '../core/for_each_async.js';
import bible_book_chapters_asv from '../bible/bible_book_chapters_asv.js';
import bible_chapter_asv from '../bible/bible_chapter_asv.js';
import bible_public_file_get from './bible_public_file_get.js';
import list_add_all from '../core/list_add_all.js';
let version = 'asv';
let directory_firebase_deploy = directory_firebase_deploy_get();
let result = [];
let books = await bible_testaments_books(bible_public_file_get);
await for_each_async(books, async book => {
  let chapters = await bible_book_chapters_asv(bible_public_file_get, book);
  await for_each_async(chapters, async chapter => {
    let verses = await bible_chapter_asv(bible_public_file_get, book, chapter);
    list_add_all(result, verses);
  });
});
let json = object_to_json(result);
file_over_write(`${ directory_firebase_deploy }/${ version }_parsed.json`, json);