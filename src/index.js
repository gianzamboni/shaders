import '../tailwind/index.css';
import { Indice } from './indice';
import  ShaderManager from './shader-manager';

const SHADER_MANAGER = new ShaderManager();

window.onload = () => {
  SHADER_MANAGER.init();
  const index = new Indice(SHADER_MANAGER);
}

window.onresize = () => {
  SHADER_MANAGER.resizeCanvas();
}