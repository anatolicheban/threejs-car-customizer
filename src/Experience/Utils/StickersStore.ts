import { Mesh, Texture } from "three";
import { SticksStoreItem, SticksTarget } from "../../models/models";
import { Experience } from "../Experience";
import { Resources } from "./Resources";

export class StickersStore {
  store: {
    [key in SticksTarget]: SticksStoreItem;
  };
  experience: Experience;
  resources: Resources;

  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.store = {
      leftDoor: {
        object: null,
        items: [
          {
            orientation: { x: 1.5707939037549052, y: 1.4279631364963292, z: -1.5707938788264353 },
            position: { x: 0.7142249967870204, y: 0.55, z: 0.34999999999999964 },
            size: { x: 0.85, y: 0.85, z: 0.85 },
            texture: this.resources.items.zeroTwo as Texture,
          },
          {
            orientation: { x: 1.5707937859701744, y: 1.4353923939349358, z: -1.5707937624988777 },
            position: { x: 0.7170732248781739, y: 0.57, z: 0.34999999999999964 },
            size: { x: 0.55, y: 0.75, z: 0.75 },
            texture: this.resources.items.twoB as Texture,
          },
          {
            orientation: { x: 1.5708031002561789, y: 1.4581477935857208, z: -1.5708031434611596 },
            position: { x: 0.7273591910864874, y: 0.65, z: 0.44999999999999984 },
            size: { x: 0.4, y: 0.5, z: 0.5 },
            texture: this.resources.items.mikasa as Texture,
          },
          {
            orientation: { x: 1.5708025033041013, y: 1.5029792808602827, z: -1.5708025175347218 },
            position: { x: 0.7324318081288321, y: 0.7, z: 0.3999999999999998 },
            size: { x: 0.4, y: 0.6, z: 0.5 },
            texture: this.resources.items.misato as Texture,
          },
        ],
      },
      rightDoor: {
        object: null,
        items: [
          {
            orientation: { x: 1.5707939037549052, y: 1.4279631364963292, z: -1.5707938788264353 },
            position: { x: -0.7142249967870204, y: 0.55, z: 0.34999999999999964 },
            size: { x: 0.85, y: 0.85, z: 0.85 },
            texture: this.resources.items.zeroTwo as Texture,
          },
          {
            orientation: { x: 1.5707937859701744, y: 1.4353923939349358, z: -1.5707937624988777 },
            position: { x: -0.7170732248781739, y: 0.57, z: 0.34999999999999964 },
            size: { x: 0.55, y: 0.75, z: 0.75 },
            texture: this.resources.items.twoB as Texture,
          },
          {
            orientation: { x: 1.5708031002561789, y: 1.4581477935857208, z: -1.5708031434611596 },
            position: { x: -0.7273591910864874, y: 0.65, z: 0.44999999999999984 },
            size: { x: 0.4, y: 0.5, z: 0.5 },
            texture: this.resources.items.mikasa as Texture,
          },
          {
            orientation: { x: 1.5708076034087741, y: -1.502975839820283, z: 1.5708076293926312 },
            position: { x: -0.7321607916586466, y: 0.7, z: 0.3999999999999998 },
            size: { x: 0.4, y: 0.6, z: 0.5 },
            texture: this.resources.items.misato as Texture,
          },
        ],
      },
    };
  }

  setStickersObjects(obj: Mesh, target: SticksTarget) {
    if (this.store[target]) {
      this.store[target].object = obj;
    }
  }
}
