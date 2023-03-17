import { CubeTexture, Scene, Texture } from "three";
import { Experience } from "../Experience";
import { Car } from "./Car";
import { Lights } from "./Lights";
import { Platform } from "./Platform";

export class World {
  experience: Experience;
  platform: Platform;
  lights: Lights;
  car: Car;

  constructor() {
    this.experience = new Experience();
    // this.lights = new Lights()

    this.experience.resources.addHandler("ready", () => {
      //Elements
      this.platform = new Platform();
      this.car = new Car();

      this.experience.scene.environment = this.experience.scene.background = this.experience
        .resources.items.enviroment as Texture;
    });
  }
}
