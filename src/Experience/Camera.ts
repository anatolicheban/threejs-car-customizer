import { Experience } from "./Experience";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export class Camera {
  experience: Experience;
  instance: PerspectiveCamera;
  controls: OrbitControls;

  constructor() {
    this.experience = new Experience();

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.experience.sizes.width / this.experience.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(5, 5, 7);
    this.experience.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.experience.sizes.width / this.experience.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.canvas as HTMLElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // this.controls.minPolarAngle = Math.PI / 2.7;
    // this.controls.maxPolarAngle = Math.PI / 2.1;
    // this.controls.maxDistance = 18;
    // this.controls.minDistance = 3;
    this.controls.target.set(0, 0.5, 0);
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 0.75;
    // this.controls.dampingFactor = 0.001;
    this.controls.object.position.set(-10, 0.5, 0);
  }

  update() {
    this.controls.update();
  }
}
