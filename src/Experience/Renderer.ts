import { Canvas } from "../models/models";
import { Experience } from "./Experience";
import { Sizes } from "./Utils/Sizes";
import { EffectComposer, Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import * as POSTPROCESSING from "postprocessing";
import * as EFFECTS from "realism-effects";
// import { MotionBlurPass } from "../assets/MotionBlur/src/MotionBlurPass";
// import { Motio } from "three";

import {
  CineonToneMapping,
  LinearFilter,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";

export class Renderer {
  experience: Experience;
  canvas: Canvas;
  sizes: Sizes;
  instance: WebGLRenderer & { useLegacyLights?: boolean };
  camera: PerspectiveCamera;
  composer: POSTPROCESSING.EffectComposer;
  // composer: EffectComposer;
  scene: Scene;

  constructor() {
    this.experience = new Experience();
    this.sizes = new Sizes();
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera.instance;
    this.scene = this.experience.scene;
    // this.world = this.experience.world
    // this.raycaster = this.experience.raycaster

    this.setInstance();
    this.setEffects();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas as HTMLElement,
      antialias: true,
      preserveDrawingBuffer: true,
    });

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

  setEffects() {
    this.composer = new POSTPROCESSING.EffectComposer(this.instance);

    let renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    let velDepthNormPass = new EFFECTS.VelocityDepthNormalPass(this.scene, this.camera);
    this.composer.addPass(velDepthNormPass);

    const motionBlurEffect = new EFFECTS.MotionBlurEffect(velDepthNormPass);

    let effectPass = new POSTPROCESSING.EffectPass(this.camera, motionBlurEffect);
    this.composer.addPass(effectPass);
  }

  resize() {
    // this.instance.setSize(this.sizes.width, this.sizes.height);
    // this.instance.setPixelRatio(this.sizes.pixelRatio);

    this.composer.setSize(this.sizes.width, this.sizes.height);
    // this.composer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.instance.render(this.experience.scene, this.camera);
    this.composer.render();
  }
}
