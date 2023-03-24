import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  CubeTexture,
  CubeTextureLoader,
  Group,
  RepeatWrapping,
  Texture,
  TextureLoader,
} from "three";
import { EventEmitter } from "./EventEmitter";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { LoadedResource, ResourceItem } from "../../models/models";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export class Resources extends EventEmitter<{ ready: void; progress: number }> {
  sources: ResourceItem[];
  items: LoadedResource;
  toLoad: number;
  loaded: number;
  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    fbxLoader: FBXLoader;
    cubeTextureLoader: CubeTextureLoader;
    objLoader: OBJLoader;
  };

  constructor(sources: ResourceItem[]) {
    super();

    //Options
    this.sources = sources;

    //Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      fbxLoader: new FBXLoader(),
      cubeTextureLoader: new CubeTextureLoader(),
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      objLoader: new OBJLoader(),
    };

    let draco = new DRACOLoader();
    draco.setDecoderPath("./draco/");

    this.loaders.gltfLoader.setDRACOLoader(draco);
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "fbxModel") {
        this.loaders.fbxLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          file.wrapS = file.wrapT = RepeatWrapping;
          file.repeat.set(3, 3);
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "objModel") {
        this.loaders.fbxLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: ResourceItem, file: Texture | CubeTexture | Group | GLTF) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit("ready");
      return;
    }

    this.emit("progress", +((this.loaded / this.toLoad) * 100).toFixed(2));
  }
}
