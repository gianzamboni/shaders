import SHADERS_DATA from "./shader-data";

export default class ShaderManager {

  constructor() {
    this.activeShader = null;
    this.shaderSource = null; 
  }

  init() {
    this.canvas = document.getElementById("glCanvas");
    this.loader = document.getElementById("loader");
    this.context = this.canvas.getContext("webgl");
    if(this.context === null) {
      alert("Unable to initialize WebGL. Please enable it to see this page correctly.");
      return;
    }

    this.resizeCanvas();

    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    this.loadSource(0);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth - window.innerWidth * 0.16;
    this.canvas.height = window.innerHeight;
  }

  loadSource(shaderIndex) {
    if(this.activeShader == shaderIndex) return;
    
    this.activeShader = shaderIndex;
    const shader = SHADERS_DATA[shaderIndex].sourceFile;
    console.log("Loading shader: " + shader);
  }
}