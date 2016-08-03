declare namespace Terraformer {
    namespace WKT {
        function parse(wkt: string): any;
        function convert(geoJSON: GeoJSON.GeometryObject): string;
    }
}

export = Terraformer.WKT;