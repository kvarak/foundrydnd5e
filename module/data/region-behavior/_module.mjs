import {default as ApplyActiveEffect5eRegionBehaviorType} from "./apply-active-effect.mjs";
import {default as DifficultTerrainRegionBehaviorType} from "./difficult-terrain.mjs";
import {default as RotateAreaRegionBehaviorType} from "./rotate-area.mjs";

export {
  ApplyActiveEffect5eRegionBehaviorType,
  DifficultTerrainRegionBehaviorType,
  RotateAreaRegionBehaviorType
};

export const config = {
  "varlyn5e.applyActiveEffect": ApplyActiveEffect5eRegionBehaviorType,
  "varlyn5e.difficultTerrain": DifficultTerrainRegionBehaviorType,
  "varlyn5e.rotateArea": RotateAreaRegionBehaviorType
};

export const icons = {
  "varlyn5e.applyActiveEffect": "fa-solid fa-person-rays",
  "varlyn5e.difficultTerrain": "fa-solid fa-hill-rockslide",
  "varlyn5e.rotateArea": "fa-solid fa-arrows-spin"
};
