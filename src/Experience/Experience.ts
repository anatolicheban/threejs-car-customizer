import { Scene } from "three";
import { sources } from "../assets/sources";
import { Canvas, ConfigData } from "../models/models";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Resources } from "./Utils/Resources";
import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import { World } from "./World/World";

let instance: Experience;

export class Experience {
  canvas: Canvas;
  sizes: Sizes;
  time: Time;
  scene: Scene;
  camera: Camera;
  world: World;
  renderer: Renderer;
  resources: Resources;

  constructor(element?: Canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    //Options
    this.canvas = element || null;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();

    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.world = new World();
    this.renderer = new Renderer();

    this.sizes.addHandler("resize", () => {
      this.resize();
    });
    this.time.addHandler("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.renderer.update();
    this.camera.update();
  }

  uploadConfig() {
    let car = this.world.car;

    let config: ConfigData = {
      general: {
        body: {
          color: "#" + car.materials.body.color.getHexString(),
          roughness: car.materials.body.roughness,
          metalness: car.materials.body.metalness,
        },
        discs: {
          color: "#" + car.materials.discs.color.getHexString(),
          roughness: car.materials.discs.roughness,
          metalness: car.materials.discs.metalness,
        },
        glass: {
          color: "#" + car.materials.glass.color.getHexString(),
          roughness: car.materials.glass.roughness,
          metalness: car.materials.glass.metalness,
        },
      },
      stickers: {
        leftDoor: car.currSticks.leftDoor.stick,
        rightDoor: car.currSticks.rightDoor.stick,
      },
    };

    let dataStr = JSON.stringify(config);

    let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let exportFileDefaultName = "data.json";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  applyConfig(config: ConfigData) {
    let carMaterials = this.world.car.materials;

    try {
      let { general, stickers } = config;

      //Colors
      carMaterials.body.color.set(general.body.color);
      carMaterials.discs.color.set(general.discs.color);
      carMaterials.glass.color.set(general.glass.color);

      //Roughness
      carMaterials.body.roughness = general.body.roughness;
      carMaterials.discs.roughness = general.discs.roughness;
      carMaterials.glass.roughness = general.glass.roughness;

      //Metalness
      carMaterials.body.metalness = general.body.metalness;
      carMaterials.discs.metalness = general.discs.metalness;
      carMaterials.glass.metalness = general.glass.metalness;

      this.world.car.setStick(stickers.leftDoor, "leftDoor");
      this.world.car.setStick(stickers.rightDoor, "rightDoor");
    } catch (err) {}
  }
}
