import { CubeTexture, Group, IUniform, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type Canvas = HTMLElement | null;

export type ResourceType = "fbxModel" | "texture" | "objModel" | "gltfModel";
export type ResourceItem =
  | { name: string; type: ResourceType; path: string }
  | { name: string; type: "cubeTexture"; path: string[] };
export type LoadedResource = { [key in string]: Texture | CubeTexture | Group | GLTF };

export type SunParams = {
  elevation: number;
  azimuth: number;
};

export type Uniforms = { [uniform in string]: IUniform<any> };

export type ColorSettings = {
  color: string;
  roughness: number;
  metalness: number;
};

export type GlassState = ColorSettings & {
  opacity: number;
};

export type DiscsState = ColorSettings;

export type BodyState = ColorSettings;
