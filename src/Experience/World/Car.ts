import { BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, Scene } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Experience } from "../Experience";

export class Car {
  experience: Experience;
  resource: GLTF;
  scene: Scene;
  model: Group;
  children: Mesh<BufferGeometry, MeshStandardMaterial> | Group;
  materials: {
    body: MeshStandardMaterial[];
    glass: MeshStandardMaterial[];
    discs: MeshStandardMaterial[];
  };
  // materials

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.car as GLTF;

    this.materials = {
      body: [],
      glass: [],
      discs: [],
    };

    this.setModel();
    this.materials.body.forEach((el) => el.color.set("#fff"));
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.position.y = 0.32;

    this.traverseModel(this.model);

    this.model.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5;
      }
    });

    this.getMaterials(this.model);

    this.model.scale.setScalar(0.75);
    this.scene.add(this.model);
  }

  traverseModel(model: Group) {
    model.traverse((child) => {
      if (child instanceof Mesh<BufferGeometry, Material>) {
        console.log(child.material);

        let { opacity, roughness, metalness, color, map, side, envMap } = child.material;
        child.material = new MeshStandardMaterial({
          opacity,
          roughness,
          metalness,
          color,
          map,
          side,
          envMap,
        });
      }
    });
  }

  getMaterials(model: Group) {
    model.traverse((child) => {
      if (child instanceof Mesh<BufferGeometry, Material>) {
        //Disks
        if (
          child.name === "Object_1001_1" ||
          child.name === "Object_1002_1" ||
          child.name === "Object_1003_1" ||
          child.name === "Object_1004_1"
        ) {
          this.materials.discs.push(child.material);
        }
        //Body
        if (
          child.name === "Plane003" ||
          child.name === "Plane004" ||
          child.name === "Plane006" ||
          child.name === "Plane001" ||
          child.name === "Plane002" ||
          child.name === "Plane018" ||
          child.name === "Plane005"
        ) {
          this.materials.body.push(child.material);
        }
      }
    });
  }

  // getObjects(model: Group) {
  //   model.traverse((child) => {
  //     //Getting disks
  //     if (
  //       child.name === "Object_1001_1" ||
  //       child.name === "Object_1002_1" ||
  //       child.name === "Object_1003_1" ||
  //       child.name === "Object_1004_1"
  //     ) {
  //       this.objects.disks.push(child as Mesh<BufferGeometry, MeshStandardMaterial>);
  //     }

  //     //Getting doors
  //     if (child.name === "Plane002") {
  //       this.objects.doors = child as Mesh<BufferGeometry, MeshStandardMaterial>;
  //       this.objects.doors.material.color.set(0xffffff);
  //     }

  //     //Body
  //     if (child.name === "Plane001") {
  //       this.objects.frontBody = child as Mesh<BufferGeometry, MeshStandardMaterial>;
  //       this.objects.frontBody.material.color.set(0xffffff);
  //     }
  //     if (child.name === "Plane003") {
  //       this.objects.backBody = child as Mesh<BufferGeometry, MeshStandardMaterial>;
  //       this.objects.backBody.material.color.set(0xffffff);
  //     }
  //   });
  // }
}
