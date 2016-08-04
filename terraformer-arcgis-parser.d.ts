declare namespace Terraformer {
    namespace ArcGIS {
        interface ParseOptions {
            sr?: number;
            idAttribute?: string;
        }
        interface ConvertOptions {
            idAttribute?: string;
        }
        function parse<T extends ArcGis.Rest.Geometry>(json: T, options?: ParseOptions): GeoJSON.GeometryObject;
        function parse<T extends GeoJSON.GeometryObject>(json: ArcGis.Rest.Feature, options?: ParseOptions): GeoJSON.Feature<T>;

        function convert<T extends GeoJSON.GeometryObject>(geoJSON: GeoJSON.FeatureCollection<T>, options?: ConvertOptions): ArcGis.Rest.FeatureSet
        function convert<T extends GeoJSON.GeometryObject>(geoJSON: GeoJSON.Feature<T>, options?: ConvertOptions): ArcGis.Rest.Feature
        function convert<T extends GeoJSON.GeometryObject>(geoJSON: T, options?: ConvertOptions): ArcGis.Rest.Geometry
    }


}

export = Terraformer.ArcGIS;