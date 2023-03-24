import { ResourceItem } from "../models/models";

export const sources: ResourceItem[] = [
  {
    name: "asphaltColor",
    type: "texture",
    path: "./asphalt/asphalt_color.jpg",
  },
  {
    name: "asphaltAo",
    type: "texture",
    path: "./asphalt/asphalt_ao.jpg",
  },
  {
    name: "asphaltHeight",
    type: "texture",
    path: "./asphalt/asphalt_height.png",
  },
  {
    name: "asphaltNormal",
    type: "texture",
    path: "./asphalt/asphalt_normal_directx.png",
  },
  {
    name: "asphaltRoughness",
    type: "texture",
    path: "./asphalt/asphalt_roughness.jpg",
  },
  {
    name: "car",
    type: "gltfModel",
    path: "./car/gltf-draco.glb",
  },
  {
    name: "enviroment",
    type: "cubeTexture",
    path: [
      "./map/px.png",
      "./map/nx.png",
      "./map/py.png",
      "./map/ny.png",
      "./map/pz.png",
      "./map/nz.png",
    ],
  },
  {
    name: "zeroTwo",
    type: "texture",
    path: "./stickers/02_test.png",
  },
  {
    name: "twoB",
    type: "texture",
    path: "./stickers/2b.png",
  },
  {
    name: "mikasa",
    type: "texture",
    path: "./stickers/mikasa.png",
  },
  {
    name: "misato",
    type: "texture",
    path: "./stickers/misato.png",
  },
];
