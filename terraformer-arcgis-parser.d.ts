declare module "terraformer-arcgis-parser" {
    namespace ArcGIS {
        interface SpatialReference {
        }

        interface SpatialReferenceWkid extends SpatialReference {
            wkid?: number;
            latestWkid?: number;
            vcsWkid?: number;
            latestVcsWkid?: number;
        }

        interface SpatialReferenceWkt extends SpatialReference {
            wkt?: string;
            latestWkt?: string;
        }

        interface Geometry {
            spatialReference?: SpatialReference
        }

        interface HasZM {
            hasZ?: boolean;
            hasM?: boolean;
        }

        interface Point extends Geometry {
            x: number;
            y: number;
            z?: number;
            m?: number;
        }

        interface Polyline extends HasZM, Geometry {
            paths: number[][][];
        }

        interface Polygon extends HasZM, Geometry {
            rings: number[][][];
        }

        interface Multipoint extends HasZM, Geometry {
            points: number[][];
        }

        interface Envelope extends Geometry {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;

            zmin?: number;
            zmax?: number;

            mmin?: number;
            mmax?: number;
        }

        interface Feature {
            geometry: Geometry;
            attributes: any;
        }

        interface Field {
            name: string;
            type: string;
            alias?: string;
            length?: number;
        }

        type esriGeometryType = "esriGeometryPoint" | "esriGeometryMultipoint" | "esriGeometryPolyline" | "esriGeometryPolygon" | "esriGeometryEnvelope";

        interface FeatureSet extends HasZM {
            objectIdFieldName?: string; //optional
            globalIdFieldName?: string; //optional
            displayFieldName?: string; //optional
            geometryType?: esriGeometryType; //for feature layers only
            spatialReference?: SpatialReference; //for feature layers only.
            fields?: Field[];
            features: Feature[];
        }
    }



    interface ParseOptions {
        sr?: number;
        idAttribute?: string;
    }
    interface ConvertOptions {
        idAttribute?: string;
    }
    function parse(json: ArcGIS.Geometry | ArcGIS.Feature, options?: ParseOptions): GeoJSON.GeoJsonObject;
    function convert(geoJSON: GeoJSON.GeoJsonObject, options?: ConvertOptions): ArcGIS.FeatureSet | ArcGIS.Feature | ArcGIS.Geometry
}