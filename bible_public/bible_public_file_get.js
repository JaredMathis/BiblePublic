import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import file_read from '../core/file_read.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_string from '../foundation/is_string.js';
export default bible_public_file_get;
async function bible_public_file_get(file_path) {
  arguments_assert(arguments, is_string);
  let directory_firebase_deploy = directory_firebase_deploy_get();
  return file_read(`./${ directory_firebase_deploy }/${ file_path }`);
}