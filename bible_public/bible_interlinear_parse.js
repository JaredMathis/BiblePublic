import file_read from "../core/file_read.js";
import list_map from "../foundation/list_map.js";
import xml2js from 'xml2js';
import assert from "../foundation/assert.js";
import file_over_write from "../core/file_over_write.js";
import object_to_json from "../foundation/object_to_json.js";
import has_property from "../foundation/has_property.js";


let xml = file_read('./public/interlinear/berean/berean-interlinear-glosses.xml');

let parsed = await xml2js.parseStringPromise(xml)

let result = {};

for (let verse of parsed.root.verse) {
    // console.log(object_to_json({verse}))
    if (!verse.w) {
        continue;
    }
    let first = verse.w[0]
    let split1 = first.$.osisId.split('!');
    assert(split1.length === 2);
    let i = split1[1] - 1;
    let split2 = split1[0].split('.');
    assert(split2.length === 3);
    let book = split2[0]
    if (!result[book]) {
        result[book] = [];
    }
    let chapter = split2[1]
    let verse_index = split2[2]
    let words = verse.w.map((w, i) => {
        if (!has_property(w, 'greek') || !has_property(w, 'gloss')) {
            return {
                i
            }
        }

        assert(w.greek.length === 1, { w });
        assert(w.gloss.length === 1, { w });
        let word = w.greek[0];
        let text = w.gloss[0];
        return {
            i,
            word,
            text
        }
    })
    let v = {
        verse: words,
    };
    result[book].push(v);
}

for (let book in result) {
    file_over_write(`./public/interlinear/berean/${book}.json`, object_to_json(result[book]));
}