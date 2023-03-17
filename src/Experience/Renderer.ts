import { Canvas } from "../models/models";
import { Experience } from "./Experience";
import { Sizes } from "./Utils/Sizes";
import {
  CineonToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  sRGBEncoding,
  WebGLRenderer,
} from "three";

export class Renderer {
  experience: Experience;
  canvas: Canvas;
  sizes: Sizes;
  instance: WebGLRenderer & { useLegacyLights?: boolean };
  camera: PerspectiveCamera;

  constructor() {
    this.experience = new Experience();
    this.sizes = new Sizes();
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera.instance;
    // this.scene = this.experience.scene
    // this.world = this.experience.world
    // this.raycaster = this.experience.raycaster

    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({ canvas: this.canvas as HTMLElement, antialias: true });

    this.instance.useLegacyLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = CineonToneMapping;
    this.instance.toneMappingExposure = 1.1;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setClearColor("#26abff");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.experience.scene, this.camera);
  }
}
