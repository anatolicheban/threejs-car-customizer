import {
  ArrowHelper,
  BoxGeometry,
  BufferGeometry,
  Color,
  DoubleSide,
  Euler,
  Group,
  Line,
  Material,
  Mesh,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Raycaster,
  Scene,
  SphereGeometry,
  Texture,
  Vector3,
} from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GenTarget, MaterialProps, StickersItem } from "../../models/models";
import { Experience } from "../Experience";

export class Car {
  experience: Experience;
  resource: GLTF;
  scene: Scene;
  model: Group;
  materials: {
    body: MeshStandardMaterial;
    glass: MeshStandardMaterial;
    discs: MeshStandardMaterial;
  };
  stickers: StickersItem[];
  raycaster: Raycaster;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.car as GLTF;

    this.materials = {
      body: new MeshStandardMaterial(),
      glass: new MeshStandardMaterial(),
      discs: new MeshStandardMaterial(),
    };

    this.setModel();

    this.stickers = [];

    this.raycaster = new Raycaster();
    this.cast();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.y = 0.32;

    this.setMaterials(this.model);

    this.model.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.envMapIntensity = 0.5;
      }
    });

    this.model.scale.setScalar(0.75);
    this.scene.add(this.model);
  }

  setMaterials(model: Group) {
    let bodyPropsApplied = false;
    let glassPropsApplied = false;
    let discsPropsApplied = false;

    model.traverse((child) => {
      if (child instanceof Mesh<BufferGeometry, Material>) {
        //Disks
        if (
          child.name === "Object_1001_1" ||
          child.name === "Object_1002_1" ||
          child.name === "Object_1003_1" ||
          child.name === "Object_1004_1"
        ) {
          if (!discsPropsApplied) {
            this.applyMaterialProps(child.material, this.materials.discs);
            discsPropsApplied = true;
          }
          child.material = this.materials.discs;
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
          if (!bodyPropsApplied) {
            this.applyMaterialProps(child.material, this.materials.body);
            bodyPropsApplied = true;
          }
          child.material = this.materials.body;
        }
        if (child.name === "Plane023" || child.name === "Plane024" || child.name === "Plane025") {
          if (!glassPropsApplied) {
            this.applyMaterialProps(child.material, this.materials.glass);
            glassPropsApplied = true;
          }
          child.material = this.materials.glass;
        }
      }
    });
  }

  applyMaterialProps(material: MeshStandardMaterial, target: MeshStandardMaterial) {
    let { opacity, metalness, roughness, side, color } = material;
    target.opacity = opacity;
    target.metalness = metalness;
    target.roughness = roughness;
    target.side = side;
    target.color = color;
  }

  getProperties(target: GenTarget): MaterialProps {
    let targetMaterial: MeshStandardMaterial;

    if (target === "body") {
      targetMaterial = this.materials.body;
    } else if (target === "discs") {
      targetMaterial = this.materials.discs;
    } else {
      targetMaterial = this.materials.glass;
    }
    let { color, roughness, metalness } = targetMaterial;

    return {
      color: color.getHexString(),
      roughness,
      metalness,
    };
  }

  setProps(target: GenTarget, props: MaterialProps) {
    let targetMaterial: MeshStandardMaterial;

    if (target === "body") {
      targetMaterial = this.materials.body;
    } else if (target === "discs") {
      targetMaterial = this.materials.discs;
    } else {
      targetMaterial = this.materials.glass;
    }

    target === "glass"
      ? (targetMaterial.color = targetMaterial.color.lerpColors(
          new Color(0x000000),
          new Color(props.color),
          0.2
        ))
      : targetMaterial.color.set(props.color);
    targetMaterial.roughness = props.roughness;
    targetMaterial.metalness = props.metalness;
  }

  cast() {
    this.raycaster.set(new Vector3(2, 0.75, 0), new Vector3(-1, 0, 0));

    this.experience.scene.add(
      new ArrowHelper(this.raycaster.ray.direction, this.raycaster.ray.origin)
    );
    let sphere = new Mesh(new SphereGeometry(0.15));
    sphere.position.copy(new Vector3(2, 0.75, 0));
    this.experience.scene.add(sphere);

    let intersect = this.raycaster.intersectObject(this.model)[0];
    let intersects = this.raycaster.intersectObject(this.model, true);
    // intersects.forEach((el) => {
    //   el.object.material = new MeshStandardMaterial({ color: "#fff" });
    // });

    let helper = new Mesh(new BoxGeometry(1, 1, 10), new MeshNormalMaterial());
    helper.visible = false;
    this.experience.scene.add(helper);
    helper.position.copy(intersect.point);

    let normal = intersect.face?.normal.clone();
    normal?.transformDirection(this.model.matrixWorld);
    normal?.multiplyScalar(10);
    normal?.add(intersect.point);
    helper.lookAt(normal as Vector3);

    // intersect.object.material = new MeshStandardMaterial({ color: "#fff" });

    let params = {
      position: new Vector3().copy(intersect.point),
      orientation: new Euler().copy(helper.rotation),
      size: new Vector3(1, 1, 1),
    };

    let material = new MeshPhongMaterial({
      specular: 0x444444,
      map: this.experience.resources.items.zeroTwo as Texture,
      shininess: 30,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      wireframe: false,
      color: "#fff",
    });

    let sticker = new Mesh(
      new DecalGeometry(intersect.object as Mesh, params.position, params.orientation, params.size),
      material
    );

    this.experience.scene.add(sticker);
  }
}
