import file_read from "../core/file_read.js";
import list_map from "../foundation/list_map.js";
import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'


let xml = file_read('./public/interlinear/berean/berean-interlinear-glosses.xml');

let parser = new XMLParser();
let parsed = parser.parse(xml);

// list_map(parsed.root.verse)

console.log(parsed.root.verse[0])