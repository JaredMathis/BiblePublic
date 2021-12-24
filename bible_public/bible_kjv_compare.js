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
import string_replace_all from "../foundation/string_replace_all.js";
import console_log from "../foundation/console_log.js";
import error from "../foundation/error.js";
import list_map_async from "../core/list_map_async.js";
import list_take from "../core/list_take.js";
import keys from "../foundation/keys.js";
import property_value_get from "../foundation/property_value_get.js";
import equals from "../foundation/equals.js";
import list_add from "../foundation/list_add.js";

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
        c.differences = [];
        const left_verses = versions[c.left];
        const right_verses = versions[c.right];
        const left_verses_size = size(left_verses);
        const right_verses_size = size(right_verses);
        let smallest = list_of_numbers_smallest([left_verses_size, right_verses_size]);
        for_each_range(smallest, index => {
            let left_verse = list_get(left_verses, index);
            let right_verse = list_get(right_verses, index);
            let left_keys = keys(left_verse);
            let right_keys = keys(right_verse);
            assert(json_equals(left_keys, right_keys));
            for_each(left_keys, key => {
                let left_value = property_value_get(left_verse, key);
                let right_value = property_value_get(right_verse, key);
                if (key === 'tokens') {
                    const left_value_size = size(left_value);
                    const right_value_size = size(right_value);
                    for_each_range(list_of_numbers_smallest([left_value_size, right_value_size]), token_index => {
                        let left_value_token = list_get(left_value, token_index);
                        let right_value_token = list_get(right_value, token_index);
                        left_value_token = string_replace_all(left_value_token, '\'', '’');
                        right_value_token = string_replace_all(right_value_token, '\'', '’');
                        if (!json_equals(left_value_token, right_value_token)) {
                            list_add(c.differences, {verse_left_reference: left_verse.reference, token_index});
                            return false;
                        }
                    })                    
                } else {
                    assert(json_equals(left_value,right_value), 
                        {left_verse,right_verse,key,left_value,right_value})
                }
            })
        })
        assert(left_verses_size === right_verses_size)
    })
}
bible_kjv_compare();