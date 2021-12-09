import bible_lsv_parse from '../bible/bible_lsv_parse.js'
import file_read from '../core/file_read.js'
import file_over_write from '../core/file_over_write.js'
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js'
import object_to_json from '../foundation/object_to_json.js';

let directory_firebase_deploy = directory_firebase_deploy_get();
let directory_lsv = `./${directory_firebase_deploy}/lsv/`;
let lsv_txt = file_read(`${directory_lsv}/lsv.txt`)
const file_get = async file_path => file_read(`./${directory_firebase_deploy}/${file_path}`)
let parsed = await bible_lsv_parse(file_get, lsv_txt);
let json = object_to_json(parsed);
file_over_write(`${directory_lsv}/lsv-parsed.json`, json);