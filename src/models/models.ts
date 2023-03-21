import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";
import { CubeTexture, Group, IUniform, Texture, Vector3 } from "three";
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

export type GenTarget = "discs" | "body" | "glass";

export type Uniforms = { [uniform in string]: IUniform<any> };

export type ColorSettings = {
  color: string;
  roughness: number;
  metalness: number;
};

export type TargetState = { current: GenTarget };

export type GlassState = ColorSettings;
export type BodyState = ColorSettings;
export type DiscsState = ColorSettings;

export type MaterialProps = {
  color: string;
  roughness: number;
  metalness: number;
};

export type NavItem = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  mode: EditMode;
};

export type EditMode = "view" | "general" | "stickers";

export type StickersItem = {
  position: Vector3;
  size: Vector3;
  orientation: Vector3;
};
