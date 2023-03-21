import { AxesHelper, Scene } from "three";
import { sources } from "../assets/sources";
import { Canvas } from "../models/models";
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

    this.scene.add(new AxesHelper(10));

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
}
