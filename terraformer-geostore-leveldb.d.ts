declare namespace Terraformer {
    class LevelStore {
        constructor()
    }
}

declare module "terraformer-geostore-leveldb" {
    export = Terraformer.LevelStore
}