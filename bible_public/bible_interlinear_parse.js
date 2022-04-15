import file_read from "../core/file_read.js";
import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'


let xml = file_read('./public/interlinear/berean/berean-interlinear-glosses.xml');

let parser = new XMLParser();
let jObj = parser.parse(xml);

console.log(jObj)