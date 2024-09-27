import SHADERS_DATA from "./shader-data";

const ENTRY_BASE_CLASSES = ["flex", "items-center", "pl-6", "py-2.5", , "group"] 
const ENTRY_INACTIVE_CLASSES = ["text-gray-500", "hover:text-orange-600"];
const ENTRY_ACTIVE_CLASSES = ["bg-orange-600", "text-gray-100", "font-medium"];

export class Indice {
  constructor(shaderManager) {
    this.container = document.getElementById("indice");
    this.shaderManager = shaderManager;
    SHADERS_DATA.forEach(this.createEntry.bind(this));
  }

  async createEntry(shader, index) {
    const entry = this.createEntryContainer(index);
    const icon = await this.loadIcon(shader.icon);
    const title = this.createEntryTitle(shader.name);

    entry.appendChild(icon)
    entry.appendChild(title);
    this.container.appendChild(entry);
  }

  async activeEntry(index) {
    const entry = this.container.querySelector(`[data-index="${index}"]`);
    entry.classList.add(...ENTRY_ACTIVE_CLASSES);
    entry.classList.remove(...ENTRY_INACTIVE_CLASSES);
  }

  async inactiveEntry(index) {
    const entry = this.container.querySelector(`[data-index="${index}"]`);
    entry.classList.remove(...ENTRY_ACTIVE_CLASSES);
    entry.classList.add(...ENTRY_INACTIVE_CLASSES);
  }

  createEntryContainer(index) {
    const entry = document.createElement("h2");
    const isActive = this.shaderManager.activeShader === index;
    entry.classList.add(...ENTRY_BASE_CLASSES, 
      ...(isActive ? ENTRY_ACTIVE_CLASSES : ENTRY_INACTIVE_CLASSES));
    entry.setAttribute("data-index", index);
    entry.onclick = () => {
      const activeShader = this.shaderManager.activeShader;
      if (activeShader !== index) {
        this.inactiveEntry(activeShader);
        this.activeEntry(index);
        this.shaderManager.loadSource(index);
      }
    }
    return entry;
  }

  createEntryTitle(name) {
    const title = document.createElement("span");
    title.innerHTML = name;
    title.classList.add("ml-2");
    return title;
  }
  
  async loadIcon(iconFile) {
    const file = await fetch("./icons/" + iconFile);
    const svg = new DOMParser().parseFromString(await file.text(), "image/svg+xml").documentElement;
    return svg;
  }

}

