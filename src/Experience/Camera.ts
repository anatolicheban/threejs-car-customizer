import { Experience } from "./Experience";
import { MathUtils, PerspectiveCamera, Spherical, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraConfig } from "../models/models";
import gsap from "gsap";
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
    this.controls.minPolarAngle = Math.PI / 3.1;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    this.controls.maxDistance = 18;
    this.controls.minDistance = 3;
    this.controls.target.set(0, 0.5, 0);
    // this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.object.position.set(5, 3, 4);
  }

  update() {
    this.controls.update();
  }

  configurate(options: CameraConfig) {
    if (options.mode === "view") {
      this.setCameraPos(9, 1.2, 0.9, false);
    } else if (options.mode === "general") {
      if (options.target === "body") {
        this.setCameraPos(7, 1, 0.4, true);
      } else if (options.target === "discs") {
        this.setCameraPos(3.2, 1.3, 0.5, true);
      } else {
        this.setCameraPos(3.4, 0.9, 1.2, true);
      }
    } else {
      if (options.target === "leftDoor") {
        this.setCameraPos(4, 1.4, 1.6, true);
      } else {
        this.setCameraPos(4, 1.4, -1.6, true);
      }
    }
  }

  setCameraPos(radius: number, phi: number, theta: number, lock: boolean) {
    let sphericalPos = new Spherical().setFromVector3(this.controls.object.position);

    gsap.to(sphericalPos, {
      radius,
      phi,
      theta,
      onUpdate: () => {
        this.controls.object.position.setFromSpherical(sphericalPos);
        this.controls.update();
      },
      onStart: () => {
        this.controls.enabled = false;
      },
      onComplete: () => {
        this.controls.enabled = !lock;
      },
      duration: 0.5,
    });
  }
}
