import { Experience } from "../Experience";
import { EventEmitter } from "./EventEmitter";

export class Sizes extends EventEmitter<{ resize: undefined }> {
  experience: Experience;
  width: number;
  height: number;
  pixelRatio: number;

  constructor() {
    super();

    this.experience = new Experience();

    //Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}
