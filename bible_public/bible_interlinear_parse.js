import file_read from "../core/file_read.js";
import list_map from "../foundation/list_map.js";
import xml2js from 'xml2js';
import assert from "../foundation/assert.js";


let xml = file_read('./public/interlinear/berean/berean-interlinear-glosses.xml');

let parsed = await xml2js.parseStringPromise(xml)

for (let verse of parsed.root.verse) {
    console.log({verse})
    let first = verse.w[0]
    let split1 = first.$.osisId.split('!');
    assert(split1.length === 2);
    let i = split1[1] - 1;
    console.log(parsed.root.verse.w[0])
}