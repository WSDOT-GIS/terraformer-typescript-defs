import Terraformer = require("terraformer");
import tfArcgisParser = require("terraformer-arcgis-parser");
import tfWktParser = require("terraformer-wkt-parser");


console.assert(typeof Terraformer !== undefined);
console.assert(typeof tfArcgisParser !== undefined);
console.assert(typeof tfWktParser !== undefined);

let mp: Terraformer.MultiPoint = new Terraformer.MultiPoint([[1, 2], [3, 4]]);

mp.forEach((point, index, coords) => {

});