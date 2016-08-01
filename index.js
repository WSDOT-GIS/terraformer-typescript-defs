"use strict";
var Terraformer = require("terraformer");
var tfArcgisParser = require("terraformer-arcgis-parser");
var tfWktParser = require("terraformer-wkt-parser");
console.assert(typeof Terraformer !== undefined);
console.assert(typeof tfArcgisParser !== undefined);
console.assert(typeof tfWktParser !== undefined);
var mp = new Terraformer.MultiPoint([[1, 2], [3, 4]]);
mp.forEach(function (point, index, coords) {
});
