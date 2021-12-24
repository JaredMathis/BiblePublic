import bible_kjv_aruljohn_parse from "./bible_kjv_aruljohn_parse.js";
import bible_kjv_1769_parse from "./bible_kjv_1769_parse.js";
import assert from "../foundation/assert.js";
import json_equals from "../foundation/json_equals.js";
import for_each from "../foundation/for_each.js";

export default function bible_kjv_compare() {
    let kjv_aruljohn_parsed = bible_kjv_aruljohn_parse();
    let kjv_1769_parsed = bible_kjv_1769_parse();
    let versions = [kjv_aruljohn_parsed, kjv_1769_parsed];
    let compares = [
        {left:0,right:1}
    ]
    for_each(compares, c => {
        assert(json_equals(versions[c.left],versions[c.right]))
    })
}