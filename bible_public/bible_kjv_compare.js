import bible_kjv_aruljohn_parse from "./bible_kjv_aruljohn_parse.js";
import bible_kjv_1769_parse from "./bible_kjv_1769_parse.js";
import bible_kjv_bontibon_parse from "./bible_kjv_bontibon_parse.js";
import assert from "../foundation/assert.js";
import json_equals from "../foundation/json_equals.js";
import for_each from "../foundation/for_each.js";
import for_each_range from "../core/for_each_range.js";
import list_get from "../foundation/list_get.js";
import list_of_numbers_smallest from "../core/list_of_numbers_smallest.js";
import function_cache_file from "../core/function_cache_file.js";
import size from "../foundation/size.js";
import list_map from "../foundation/list_map.js";
import do_nothing from "../foundation/do_nothing.js";
import console_log from "../foundation/console_log.js";
import error from "../foundation/error.js";
import list_map_async from "../core/list_map_async.js";

export default bible_kjv_compare;
async function bible_kjv_compare() {
    let version_gets = [
        bible_kjv_aruljohn_parse, 
        bible_kjv_1769_parse, 
        bible_kjv_bontibon_parse
    ];
    let versions = await list_map_async(version_gets, async version_get => {
        let version = await function_cache_file(version_get, _arguments => 'kjv')();
        return version;
    });
    let compares = [
        {left:0,right:1}
    ]
    for_each(compares, c => {
        const left_verses = versions[c.left];
        const right_verses = versions[c.right];
        const left_verses_size = size(left_verses);
        const right_verses_size = size(right_verses);
        let smallest = list_of_numbers_smallest([left_verses_size, right_verses_size]);
        for_each_range(smallest, index => {
            let left_verse = list_get(left_verses, index);
            let right_verse = list_get(right_verses, index);
            //assert(json_equals(left_verse,right_verse))
        })
        //assert(left_verses_size === right_verses_size)
    })
}
bible_kjv_compare();