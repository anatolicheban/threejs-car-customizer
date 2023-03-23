import { CircleGeometry, Mesh, MeshStandardMaterial, Texture } from "three";
import { LoadedResource } from "../../models/models";
import { Experience } from "../Experience";

export class Platform {
  mesh: Mesh<CircleGeometry, MeshStandardMaterial>;
  geometry: CircleGeometry;
  material: MeshStandardMaterial;
  experience: Experience;
  resources: LoadedResource;

  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources.items;

    this.material = new MeshStandardMaterial({
      map: this.resources.asphaltColor as Texture,
      aoMap: this.resources.asphaltAo as Texture,
      aoMapIntensity: 0.6,
      roughnessMap: this.resources.asphaltRoughness as Texture,
      displacementMap: this.resources.asphaltHeight as Texture,
      displacementScale: 0.5,
      normalMap: this.resources.asphaltNormal as Texture,
    });

    this.geometry = new CircleGeometry(10);
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;

    this.experience.scene.add(this.mesh);
  }
}
