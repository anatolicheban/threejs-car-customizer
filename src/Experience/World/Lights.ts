import { AmbientLight, DirectionalLight } from "three";
import { Experience } from "../Experience";

export class Lights {
  ambLight: AmbientLight;
  dirLights: DirectionalLight[];
  experience: Experience;

  constructor() {
    this.experience = new Experience();

    this.ambLight = new AmbientLight("#fff", 0.1);
    this.dirLights = [
      new DirectionalLight("#fff", 0.4),
      new DirectionalLight("#fff", 0.2),
      new DirectionalLight("#fff", 0.5),
    ];
    this.dirLights[0].position.set(2, 3, 5);
    this.dirLights[1].position.set(0, 4, 1);
    this.dirLights[2].position.set(-1, 5, -3);

    // this.experience.scene.add(
    //   this.ambLight,
    //   ...this.dirLights,
    //   new DirectionalLightHelper(this.dirLights[0])
    // );
  }
}
