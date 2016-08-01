declare module "terraformer-wkt-parser" {
    function parse(wkt: string): any;
    function convert(geoJSON: GeoJSON.GeometryObject): string;
}