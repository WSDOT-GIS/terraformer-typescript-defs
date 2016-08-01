declare module "terraformer" {
    interface Envelope {
        x: number,
        y: number,
        w: number,
        h: number
    }

    type BBox = number[]; //[number, number, number, number]

    type Coordinate = GeoJSON.Position
    type Coordinates = GeoJSON.Position[];
    type TerraformerGeometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;

    abstract class Primitive {
        toMercator(): this;
        toGeographic(): this;
        envelope(): Envelope;
        // bbox(): number[]; // Terraformer docs have this function, but conflicts with GeoJSON typescript definitions for optional bbox property.
        convexHull(): GeoJSON.Polygon;
        contains(geometry:GeoJSON.GeometryObject): boolean;
        within(geometry:GeoJSON.GeometryObject): boolean;
        intersects(geometry:GeoJSON.GeometryObject):boolean;
    }

    class Point extends Primitive implements GeoJSON.Point  {
        constructor(p:GeoJSON.Point)
        constructor(x:number, y:number)
        constructor(xy:GeoJSON.Position)
        type: "Point"
        coordinates: GeoJSON.Position
    }

    class MultiPoint extends Primitive implements GeoJSON.MultiPoint {
        constructor(geojsonMP:GeoJSON.MultiPoint);
        constructor(coordinates:Coordinates);
        type: "MultiPoint";
        coordinates: GeoJSON.Position[];
        forEach(f:Function);
        get(index:number): Point;
        addPoint(coordinate:Coordinate): this;
        insertPoint(coordinate:Coordinate, index:number): this;
        removePoint(index:number):this;
        removePoint(coordinate:Coordinate):this;
    }

    class LineString extends Primitive implements GeoJSON.LineString {
        constructor(geoJson:GeoJSON.LineString);
        constructor(coordinates:Coordinates);
        type: "LineString";
        coordinates: GeoJSON.Position[];
        addVertex(coordinate:Coordinate):this;
        insertVertex(coordinate:Coordinate, index:number):this;
        removeVertex(index:number):this;
    }

    class MultiLineString extends Primitive implements GeoJSON.MultiLineString {
        constructor(geoJson:GeoJSON.MultiLineString);
        constructor(coordinates:Coordinates[]);
        type: "MultiLineString";
        coordinates: Coordinate[][];
        forEach(f:Function)
        get(index:number):LineString
    }

    class Polygon extends Primitive implements GeoJSON.Polygon {
        constructor(geoJson: GeoJSON.Polygon);
        constructor(coordinates: Coordinates[])
        type: "Polygon";
        coordinates: Coordinate[][];
        addVertex(coordinate:Coordinate):this;
        insertVertex(coordinate:Coordinate, index:number):this;
        removeVertex(index:number):this;
        close():this;
        hasHoles():boolean;
        holes():Polygon[]
    }

    class MultiPolygon extends Primitive implements GeoJSON.MultiPolygon {
        constructor(geoJson:GeoJSON.MultiPolygon);
        constructor(coordinates:Coordinates[][]);
        type: "MultiPolygon";
        coordinates: Coordinates[][];
        forEach(f:Function)
        get(index:number):Polygon
    }

    abstract class Feature<T extends GeoJSON.GeometryObject> implements GeoJSON.Feature<GeoJSON.GeometryObject> {
        type: "Feature";
        geometry: T
        properties: any;
        constructor(geoJson:GeoJSON.Feature<GeoJSON.GeometryObject>);
        constructor(geometry:GeoJSON.GeometryObject);
    }

    class FeatureCollection<T extends GeoJSON.GeometryObject> implements GeoJSON.FeatureCollection<GeoJSON.GeometryObject> {
        type: "FeatureCollection";
        features: GeoJSON.Feature<T>[];
        constructor(geoJson:GeoJSON.FeatureCollection<T>);
        constructor(features:GeoJSON.Feature<T>[]);
        forEach(f:Function)
        get(index:number):Feature<T>
    }

    class GeometryCollection implements GeoJSON.GeometryCollection {
        type: "GeometryCollection";
        geometries: GeoJSON.GeometryObject[];
        constructor(geoJson:GeoJSON.GeometryCollection);
        constructor(features:GeoJSON.GeometryObject[]);
        forEach(f:Function)
        get(index:number):Primitive
    }

    class Circle extends Primitive implements GeoJSON.Feature<GeoJSON.Polygon> {
        type: "Feature";
        geometry: GeoJSON.Polygon;
        properties: any;
        constructor(center:Coordinate, radius:number, steps:number);
        recalculate():this;
        steps(steps?:number);
        radius(radius?:number);
        center(center?:Coordinate);
    }

    class Tools {
        // Spatial Reference Conversions

        static toMercator(geojson:GeoJSON.GeoJsonObject): GeoJSON.GeoJsonObject;
        static toGeographic(geojson:GeoJSON.GeoJsonObject): GeoJSON.GeoJsonObject;
        static applyConverter(geojson:GeoJSON.GeoJsonObject): GeoJSON.GeoJsonObject;
        static positionToMercator(coordinate: Coordinate):Coordinate;
        static positionToGeographic(coordinate: Coordinate):Coordinate;

        // Calculations

        static calculateBounds(geojson:GeoJSON.GeoJsonObject): BBox;
        static calculateEnvelope(geojson:GeoJSON.GeoJsonObject): Envelope;
        static convexHull(geojson:Coordinates): Coordinates;

        // Comparisons

        static coordinatesContainPoint(coordinates:Coordinates[], coordinate:Coordinate): Boolean;
        static polygonContainsPoint(polygon:GeoJSON.Polygon, coordinate:Coordinate): Boolean;
        static arrayIntersectsArray(c1:Coordinates[], c2:Coordinates[]): Boolean;
        static coordinatesEqual(c1:Coordinate, c2:Coordinate): Boolean;
    }
}