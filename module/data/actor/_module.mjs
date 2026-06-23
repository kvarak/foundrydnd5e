import CharacterData from "./character.mjs";
import NPCData from "./npc.mjs";

export {
  CharacterData,
  NPCData
};
export {default as DamageTraitField} from "./fields/damage-trait-field.mjs";
export {default as SimpleTraitField} from "./fields/simple-trait-field.mjs";
export {default as TravelField} from "./fields/travel-field.mjs";
export {default as AttributesFields} from "./templates/attributes.mjs";
export {default as CommonTemplate} from "./templates/common.mjs";
export {default as CreatureTemplate} from "./templates/creature.mjs";
export {default as DetailsFields} from "./templates/details.mjs";
export {default as TraitsFields} from "./templates/traits.mjs";

export const config = {
  character: CharacterData,
  npc: NPCData
};
