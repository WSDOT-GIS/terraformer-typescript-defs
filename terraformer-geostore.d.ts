declare namespace Terraformer {
    class GeoStore {
        add(geojson: GeoJSON.GeoJsonObject, callback: Function)
        update(geojson: GeoJSON.GeoJsonObject, callback: Function)
        remove(id: string | number, callback: Function)
        get(id: string | number, callback: Function)
        contains(geojson: GeoJSON.GeoJsonObject, search?: any, callback?: Function)
        within(geojson: GeoJSON.GeoJsonObject, search?: any, callback?: Function)
        createReadStream()
    }
}

export = Terraformer.GeoStore;