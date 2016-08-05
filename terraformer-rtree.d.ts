declare namespace Terraformer {
    class RTree implements Terraformer.Index {
        constructor();
    }
}

declare module "terraformer-rtree" {
    export = {
        RTree: Terraformer.RTree
    }
}