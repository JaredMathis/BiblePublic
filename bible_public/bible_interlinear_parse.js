import file_read from "../core/file_read.js";
import list_map from "../foundation/list_map.js";
import xml2js from 'xml2js';


let xml = file_read('./public/interlinear/berean/berean-interlinear-glosses.xml');

let parsed = await xml2js.parseStringPromise(xml)

for (let verse of parsed.root.verse) {
    let first = verse[0].w[0]
    console.log(parsed.root.verse[0].w[0])
}