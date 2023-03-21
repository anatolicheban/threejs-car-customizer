import {
  ArrowHelper,
  BoxGeometry,
  BufferGeometry,
  Color,
  Euler,
  Group,
  Material,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Raycaster,
  RepeatWrapping,
  Scene,
  Texture,
  Vector3,
} from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import {
  GenTarget,
  MaterialProps,
  StickersItem,
  SticksStoreItem,
  SticksTarget,
} from "../../models/models";
import { Experience } from "../Experience";
import { StickersStore } from "../Utils/StickersStore";

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
  raycaster: Raycaster;
  sticks: StickersStore;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.car as GLTF;
    this.raycaster = new Raycaster();
    this.sticks = new StickersStore();

    this.materials = {
      body: new MeshStandardMaterial(),
      glass: new MeshStandardMaterial(),
      discs: new MeshStandardMaterial(),
    };

    this.setModel();

    // this.cast();
    this.setStickersObj(this.model);

    this.setStick(0, "leftDoor");
    this.setStick(3, "rightDoor");
  }

  setStick(index: number, target: SticksTarget) {
    let { object, items } = this.sticks.store[target];

    let material = this.materials.body.clone();
    material.map = items[index].texture;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -10;
    material.transparent = true;
    material.color.set("#fff");

    items[index].texture.repeat.set(1, 1);

    let position = new Vector3(
      items[index].position.x,
      items[index].position.y,
      items[index].position.z
    );
    let orientation = new Euler(
      items[index].orientation.x,
      items[index].orientation.y,
      items[index].orientation.z
    );
    let size = new Vector3(items[index].size.x, items[index].size.y, items[index].size.z);

    let sticker = new Mesh(
      new DecalGeometry(object as Mesh, position, orientation, size),
      material
    );

    this.experience.scene.add(sticker);
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

    this.model.updateMatrixWorld();
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
        //Glass
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

  setStickersObj(model: Group) {
    model.traverse((child) => {
      if (child.name === "Plane002") {
        this.sticks.setStickersObjects(child as Mesh, "leftDoor");
        this.sticks.setStickersObjects(child as Mesh, "rightDoor");
      }
    });
  }

  cast() {
    this.raycaster.set(new Vector3(-2, 0.55, 0.4), new Vector3(1, 0, 0));

    this.experience.scene.add(
      new ArrowHelper(this.raycaster.ray.direction, this.raycaster.ray.origin)
    );

    let intersect = this.raycaster.intersectObject(this.model)[0];

    let helper = new Mesh(new BoxGeometry(1, 1, 10), new MeshNormalMaterial());
    helper.visible = false;
    this.experience.scene.add(helper);
    helper.position.copy(intersect.point);

    let normal = intersect.face?.normal.clone();
    // normal?.transformDirection(this.model.matrixWorld);
    normal?.add(intersect.point);
    helper.lookAt(normal as Vector3);

    let params = {
      position: new Vector3().copy(intersect.point),
      orientation: new Euler().copy(helper.rotation),
      size: new Vector3(0.85, 0.85, 0.85),
    };

    let texture = this.experience.resources.items.zeroTwo as Texture;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);
    // texture.repeat.x = -1;
    let material = this.materials.body.clone();
    material.map = texture;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -10;
    material.transparent = true;
    material.color.set("#fff");

    let sticker = new Mesh(
      new DecalGeometry(intersect.object as Mesh, params.position, params.orientation, params.size),
      material
    );

    console.log(params);

    this.experience.scene.add(sticker);
  }
}
