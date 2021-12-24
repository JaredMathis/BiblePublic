import file_over_write from '../core/file_over_write.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import object_to_json from '../foundation/object_to_json.js';
import bible_kjv_aruljohn_parse from '../bible/bible_kjv_aruljohn_parse.js';
let parsed = bible_kjv_aruljohn_parse();
let json = object_to_json(parsed);
let directory_firebase_deploy = directory_firebase_deploy_get();
file_over_write(`${ directory_firebase_deploy }/kjv_parsed.json`, json);