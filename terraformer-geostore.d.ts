declare namespace Terraformer {
    interface Stream {
        // on("data", (geojson:GeoJSON.))
    }
    type FeatureId = string | number;

    interface Index {

    }

    interface Stream {
        on(opName: "data" | "end", callback: (geojson: GeoJSON.GeoJsonObject) => void): void;
    }

    class GeoStore {
        constructor({
            store: Store,
            index: Index
        });
        add<T extends GeoJSON.GeometryObject>(geojson: GeoJSON.Feature<T> | GeoJSON.FeatureCollection<T>, callback: (err: Error, res: any) => void): void;
        update<T extends GeoJSON.GeometryObject>(geojson: GeoJSON.Feature<T>, callback: (err: Error, res: any) => void): void
        remove(id: FeatureId, callback: (err: Error, res: any) => void): void
        get(id: FeatureId, callback: (err: Error, res: any) => void): void
        contains(geojson: GeoJSON.GeoJsonObject, callback: (err: Error, res: any) => void): void
        contains(geojson: GeoJSON.GeoJsonObject, search: any, callback: (err: Error, res: any) => void): void
        within(geojson: GeoJSON.GeoJsonObject, callback: (err: Error, res: any) => void): void
        within(geojson: GeoJSON.GeoJsonObject, search: any, callback: (err: Error, res: any) => void): void
        createReadStream()
    }

    class Store {

    }

    namespace Store {
        class Memory extends Store {
            constructor()
        }
    }
}

declare module "terraformer-geostore" {
    export = {
        GeoStore: Terraformer.GeoStore,
        Store: Terraformer.Store
    }
}