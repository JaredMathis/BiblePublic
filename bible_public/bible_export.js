import file_json_read from "../core/file_json_read.js"
import list_add_all from "../core/list_add_all.js";
import for_each from "../foundation/for_each.js";
import list_map from "../foundation/list_map.js";
import list_where from "../foundation/list_where.js";
import object_to_json from "../foundation/object_to_json.js";

let path = `./public/spanish_parsed.json`

let parsed = file_json_read(path);

let james_verses = list_where(parsed, p => p.book === 'James' && p.chapter === '1');

let token_lists = list_map(james_verses, v => v.tokens);

let tokens = [];
for_each(token_lists, tl => {
    for_each(tl, t => {
        t = t.toLowerCase();
        let characters = [',',':',';','.', '?', '¿', '!', '­']
        characters.forEach(c => {
            t = t.replaceAll(c, '')
        })
        if (tokens.includes(t)) {
            return;
        }
        tokens.push(t)
    })
});

let max = 20;
tokens.slice(0, max);

console.log(object_to_json(tokens) )
