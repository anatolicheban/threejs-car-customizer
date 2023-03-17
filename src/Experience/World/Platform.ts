import {
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  ObjectSpaceNormalMap,
  PlaneGeometry,
  Texture,
} from "three";
import { LoadedResource } from "../../models/models";
import { Experience } from "../Experience";

export class Platform {
  mesh: Mesh<PlaneGeometry, MeshStandardMaterial>;
  geometry: PlaneGeometry;
  material: MeshStandardMaterial;
  experience: Experience;
  resources: LoadedResource;

  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources.items;

    this.material = new MeshStandardMaterial();
    this.material.map = this.resources.asphaltColor as Texture;
    this.material.aoMap = this.resources.asphaltAo as Texture;
    this.material.aoMapIntensity = 0.6;
    this.material.roughnessMap = this.resources.asphaltRoughness as Texture;
    this.material.displacementMap = this.resources.asphaltHeight as Texture;
    this.material.displacementScale = 0.5;
    this.material.normalMap = this.resources.asphaltNormal as Texture;
    this.geometry = new PlaneGeometry(20, 20, 100, 100);
    // this.material.wireframe = true;
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;

    this.experience.scene.add(this.mesh);
  }
}
