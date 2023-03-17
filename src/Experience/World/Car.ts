import {
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Experience } from "../Experience";

export class Car {
  experience: Experience;
  // resources: LoadedResource
  resource: GLTF;
  scene: Scene;
  model: Group;
  children: Mesh<BufferGeometry, MeshStandardMaterial> | Group;
  objects: {
    doors?: Mesh<BufferGeometry, MeshStandardMaterial> | null;
    disks: Mesh<BufferGeometry, MeshStandardMaterial>[];
  };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.car as GLTF;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;

    this.objects = {
      disks: [],
      doors: null,
    };

    this.model.position.y = 0.32;
    this.model.traverse((child) => {
      //Getting disks
      if (
        child.name === "Object_1001_1" ||
        child.name === "Object_1002_1" ||
        child.name === "Object_1003_1" ||
        child.name === "Object_1004_1"
      ) {
        this.objects.disks.push(child as Mesh<BufferGeometry, MeshStandardMaterial>);
      }

      //Getting doors
      if (child.name === "Plane002") {
        this.objects.doors = child as Mesh<BufferGeometry, MeshStandardMaterial>;
      }
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5;
      }
    });

    this.model.scale.setScalar(0.75);

    this.scene.add(this.model);
  }
}
