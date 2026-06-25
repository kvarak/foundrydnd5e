import LongRestDialog from "./applications/actor/rest/long-rest-dialog.mjs";
import ShortRestDialog from "./applications/actor/rest/short-rest-dialog.mjs";
import CalenderHUD from "./applications/calendar/calendar-hud.mjs";
import MapLocationControlIcon from "./canvas/map-location-control-icon.mjs";
import { ConsumptionTargetData } from "./data/activity/fields/consumption-targets-field.mjs";
import MappingField from "./data/fields/mapping-field.mjs";
import * as activities from "./documents/activity/_module.mjs";
import Actor5e from "./documents/actor/actor.mjs";
import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

/**
 * @import {
 *   AbilityConfiguration, ActivityActivationTypeConfiguration, ActivityConsumptionTargetConfiguration,
 *   ActivityTypeConfiguration, ActorSizeConfiguration, AdvancementTypeConfiguration,
 *   AreaTargetDefinition, CalendarHUDConfiguration, CharacterFlagConfiguration, ConditionConfiguration,
 *   CraftingConfiguration, CreatureTypeConfiguration, CurrencyConfiguration, DamageTypeConfiguration,
 *   EncumbranceConfiguration, FacilityConfiguration, HabitatConfiguration5e,
 *   IndividualTargetDefinition, ItemPropertyConfiguration, LimitedUsePeriodConfiguration,
 *   MapLocationMarkerStyle, MovementTypeConfiguration, MovementUnitConfiguration,
 *   RestTypeConfiguration, RequestCallback5e, RuleTypeConfiguration, SkillConfiguration,
 *   SpellcastingFocusConfiguration, SpellcastingPreparationState5e, SpellSchoolConfiguration,
 *   SpellScrollValues, StatusEffectConfig5e, SubtypeTypeConfiguration, TimeUnitConfiguration,
 *   ToolConfiguration, TraitConfiguration, TransformationConfiguration, TravelPaceConfiguration,
 *   TravelUnitConfiguration, TreasureConfiguration5e, UnitConfiguration, WeaponMasterConfiguration
 * } from "./_types.mjs";
 * @import { TravelPace5e } from "./data/actor/fields/_types.mjs";
 * @import {
 *   MultiLevelSpellcasting, SingleLevelSpellcastingData, SlotSpellcastingData, SpellcastingModelData,
 *   SpellcastingTable5e, SpellcastingTableSingle5e
 * } from "./data/spellcasting/_types.mjs";
 */

// Namespace Configuration Values
const DND5E = {};

/* -------------------------------------------- */
/*  Abilities                                   */
/* -------------------------------------------- */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
DND5E.abilities = {
  str: {
    label: "DND5E.AbilityStr",
    abbreviation: "DND5E.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    icon: "systems/dnd5e/icons/svg/abilities/strength.svg"
  },
  dex: {
    label: "DND5E.AbilityDex",
    abbreviation: "DND5E.AbilityDexAbbr",
    type: "physical",
    fullKey: "dexterity",
    icon: "systems/dnd5e/icons/svg/abilities/dexterity.svg"
  },
  con: {
    label: "DND5E.AbilityCon",
    abbreviation: "DND5E.AbilityConAbbr",
    type: "physical",
    fullKey: "constitution",
    icon: "systems/dnd5e/icons/svg/abilities/constitution.svg"
  },
  int: {
    label: "DND5E.AbilityInt",
    abbreviation: "DND5E.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    icon: "systems/dnd5e/icons/svg/abilities/intelligence.svg"
  },
  wis: {
    label: "DND5E.AbilityWis",
    abbreviation: "DND5E.AbilityWisAbbr",
    type: "mental",
    fullKey: "wisdom",
    icon: "systems/dnd5e/icons/svg/abilities/wisdom.svg"
  },
  cha: {
    label: "DND5E.AbilityCha",
    abbreviation: "DND5E.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    icon: "systems/dnd5e/icons/svg/abilities/charisma.svg"
  },
  luk: {
    label: "DND5E.AbilityLuk",
    abbreviation: "DND5E.AbilityLukAbbr",
    type: "fortune",
    fullKey: "luck",
    icon: "systems/dnd5e/icons/svg/abilities/luck.svg"
  }
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Configure which ability score is used as the default modifier for initiative rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
DND5E.defaultAbilities = {
  meleeAttack: "str",
  rangedAttack: "dex",
  initiative: "dex",
  hitPoints: "con",
  concentration: "con"
};

/* -------------------------------------------- */

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
DND5E.maxAbilityScore = 20;

/* -------------------------------------------- */
/*  Skills                                      */
/* -------------------------------------------- */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
DND5E.skills = {
  acr: {
    label: "DND5E.SkillAcr",
    ability: "dex",
    fullKey: "acrobatics",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ani: {
    label: "DND5E.SkillAni",
    ability: "wis",
    fullKey: "animalHandling",
    icon: "icons/environment/creatures/horse-brown.webp"
  },
  arc: {
    label: "DND5E.SkillArc",
    ability: "int",
    fullKey: "arcana",
    icon: "icons/sundries/books/book-embossed-jewel-silver-green.webp"
  },
  ath: {
    label: "DND5E.SkillAth",
    ability: "str",
    fullKey: "athletics",
    icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp"
  },
  dec: {
    label: "DND5E.SkillDec",
    ability: "cha",
    fullKey: "deception",
    icon: "icons/magic/control/mouth-smile-deception-purple.webp"
  },
  his: {
    label: "DND5E.SkillHis",
    ability: "int",
    fullKey: "history",
    icon: "icons/sundries/books/book-embossed-bound-brown.webp"
  },
  ins: {
    label: "DND5E.SkillIns",
    ability: "wis",
    fullKey: "insight",
    icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp"
  },
  itm: {
    label: "DND5E.SkillItm",
    ability: "cha",
    fullKey: "intimidation",
    icon: "icons/skills/social/intimidation-impressing.webp"
  },
  inv: {
    label: "DND5E.SkillInv",
    ability: "int",
    fullKey: "investigation",
    icon: "icons/tools/scribal/magnifying-glass.webp"
  },
  med: {
    label: "DND5E.SkillMed",
    ability: "wis",
    fullKey: "medicine",
    icon: "icons/tools/cooking/mortar-herbs-yellow.webp"
  },
  nat: {
    label: "DND5E.SkillNat",
    ability: "int",
    fullKey: "nature",
    icon: "icons/magic/nature/plant-sprout-snow-green.webp"
  },
  prc: {
    label: "DND5E.SkillPrc",
    ability: "wis",
    fullKey: "perception",
    icon: "icons/magic/perception/eye-ringed-green.webp",
    pace: {
      advantage: new Set(["slow"]),
      disadvantage: new Set(["fast"])
    }
  },
  prf: {
    label: "DND5E.SkillPrf",
    ability: "cha",
    fullKey: "performance",
    icon: "icons/tools/instruments/lute-gold-brown.webp"
  },
  per: {
    label: "DND5E.SkillPer",
    ability: "cha",
    fullKey: "persuasion",
    icon: "icons/skills/social/diplomacy-handshake.webp"
  },
  rel: {
    label: "DND5E.SkillRel",
    ability: "int",
    fullKey: "religion",
    icon: "icons/magic/holy/saint-glass-portrait-halo.webp"
  },
  slt: {
    label: "DND5E.SkillSlt",
    ability: "dex",
    fullKey: "sleightOfHand",
    icon: "icons/sundries/gaming/playing-cards.webp"
  },
  ste: {
    label: "DND5E.SkillSte",
    ability: "dex",
    fullKey: "stealth",
    icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp",
    pace: {
      disadvantage: new Set(["normal", "fast"])
    }
  },
  sur: {
    label: "DND5E.SkillSur",
    ability: "wis",
    fullKey: "survival",
    icon: "icons/magic/fire/flame-burning-campfire-yellow-blue.webp",
    pace: {
      advantage: new Set(["slow"]),
      disadvantage: new Set(["fast"])
    }
  }
};
preLocalize("skills", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Base passive score and the amount by which the passive skill scores are modified when that skill has
 * advantage or disadvantage.
 * @type {{ base: number, modifier: number }}
 */
DND5E.skillPassive = {
  base: 10,
  modifier: 5
};

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
DND5E.alignments = {
  lg: "DND5E.AlignmentLG",
  ng: "DND5E.AlignmentNG",
  cg: "DND5E.AlignmentCG",
  ln: "DND5E.AlignmentLN",
  tn: "DND5E.AlignmentTN",
  cn: "DND5E.AlignmentCN",
  le: "DND5E.AlignmentLE",
  ne: "DND5E.AlignmentNE",
  ce: "DND5E.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
DND5E.attunementTypes = {
  required: "DND5E.AttunementRequired",
  optional: "DND5E.AttunementOptional"
};
preLocalize("attunementTypes");

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
DND5E.weaponTypes = {
  simpleM: "DND5E.WeaponSimpleM",
  simpleR: "DND5E.WeaponSimpleR",
  martialM: "DND5E.WeaponMartialM",
  martialR: "DND5E.WeaponMartialR",
  natural: "DND5E.WeaponNatural",
  improv: "DND5E.WeaponImprov",
  siege: "DND5E.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
DND5E.weaponProficiencies = {
  sim: "DND5E.WeaponSimpleProficiency",
  mar: "DND5E.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/* -------------------------------------------- */

/**
 * Weapon masteries.
 * @enum {WeaponMasterConfiguration}
 */
DND5E.weaponMasteries = {
  cleave: {
    label: "DND5E.WEAPON.Mastery.Cleave"
  },
  graze: {
    label: "DND5E.WEAPON.Mastery.Graze"
  },
  nick: {
    label: "DND5E.WEAPON.Mastery.Nick"
  },
  push: {
    label: "DND5E.WEAPON.Mastery.Push"
  },
  sap: {
    label: "DND5E.WEAPON.Mastery.Sap"
  },
  slow: {
    label: "DND5E.WEAPON.Mastery.Slow"
  },
  topple: {
    label: "DND5E.WEAPON.Mastery.Topple"
  },
  vex: {
    label: "DND5E.WEAPON.Mastery.Vex"
  }
};
preLocalize("weaponMasteries", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * A mapping between `DND5E.weaponTypes` and `DND5E.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5E.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/* -------------------------------------------- */

/**
 * A mapping between `DND5E.weaponTypes` and `DND5E.attackClassifications`. Unlisted types are assumed to be
 * of the "weapon" classification.
 * @enum {string}
 */
DND5E.weaponClassificationMap = {};

/* -------------------------------------------- */

/**
 * A mapping between `DND5E.weaponTypes` and `DND5E.attackTypes`.
 * @enum {string}
 */
DND5E.weaponTypeMap = {
  simpleM: "melee",
  simpleR: "ranged",
  martialM: "melee",
  martialR: "ranged",
  siege: "ranged"
};

/* -------------------------------------------- */

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5E.weaponIds = {
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
DND5E.ammoIds = {
};

/* -------------------------------------------- */
/*  Tool Details                                */
/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
DND5E.toolTypes = {
  art: "DND5E.ToolArtisans",
  game: "DND5E.ToolGamingSet",
  music: "DND5E.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
DND5E.toolProficiencies = {
  ...DND5E.toolTypes,
  vehicle: "DND5E.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * Configuration data for tools.
 * @enum {ToolConfiguration}
 */
DND5E.tools = {
  alchemist: {
    ability: "int"
  },
  bagpipes: {
    ability: "cha"
  },
  brewer: {
    ability: "int"
  },
  calligrapher: {
    ability: "dex"
  },
  card: {
    ability: "wis"
  },
  carpenter: {
    ability: "str"
  },
  cartographer: {
    ability: "wis"
  },
  chess: {
    ability: "wis"
  },
  cobbler: {
    ability: "dex"
  },
  cook: {
    ability: "wis"
  },
  dice: {
    ability: "wis"
  },
  disg: {
    ability: "cha"
  },
  drum: {
    ability: "cha"
  },
  dulcimer: {
    ability: "cha"
  },
  flute: {
    ability: "cha"
  },
  forg: {
    ability: "dex"
  },
  glassblower: {
    ability: "int"
  },
  herb: {
    ability: "int"
  },
  horn: {
    ability: "cha"
  },
  jeweler: {
    ability: "int"
  },
  leatherworker: {
    ability: "dex"
  },
  lute: {
    ability: "cha"
  },
  lyre: {
    ability: "cha"
  },
  mason: {
    ability: "str"
  },
  navg: {
    ability: "wis"
  },
  painter: {
    ability: "wis"
  },
  panflute: {
    ability: "cha"
  },
  pois: {
    ability: "int"
  },
  potter: {
    ability: "int"
  },
  shawm: {
    ability: "cha"
  },
  smith: {
    ability: "str"
  },
  thief: {
    ability: "dex"
  },
  tinker: {
    ability: "dex"
  },
  viol: {
    ability: "cha"
  },
  weaver: {
    ability: "dex"
  },
  woodcarver: {
    ability: "dex"
  }
};

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5E.toolIds = new Proxy(DND5E.tools, {
  get(target, prop) {
    return target[prop]?.id ?? target[prop];
  }
});

/* -------------------------------------------- */
/*  Time                                        */
/* -------------------------------------------- */

/**
 * Configuration for time units available to the system.
 * @enum {TimeUnitConfiguration}
 */
DND5E.timeUnits = {
  turn: {
    label: "DND5E.UNITS.TIME.Turn.Label",
    counted: "DND5E.UNITS.TIME.Turn.Counted",
    conversion: .1,
    combat: true
  },
  round: {
    label: "DND5E.UNITS.TIME.Round.Label",
    counted: "DND5E.UNITS.TIME.Round.Counted",
    conversion: .1,
    combat: true
  },
  second: {
    label: "DND5E.UNITS.TIME.Second.Label",
    conversion: 1 / 60,
    option: false,
    timeComponent: "second"
  },
  minute: {
    label: "DND5E.UNITS.TIME.Minute.Label",
    conversion: 1,
    timeComponent: "minute"
  },
  hour: {
    label: "DND5E.UNITS.TIME.Hour.Label",
    conversion: 60,
    timeComponent: "hour"
  },
  day: {
    label: "DND5E.UNITS.TIME.Day.Label",
    conversion: 1_440,
    timeComponent: "day"
  },
  week: {
    label: "DND5E.UNITS.TIME.Week.Label",
    conversion: 10_080,
    option: false
  },
  month: {
    label: "DND5E.UNITS.TIME.Month.Label",
    conversion: 43_200
  },
  year: {
    label: "DND5E.UNITS.TIME.Year.Label",
    conversion: 525_600,
    timeComponent: "year"
  }
};
preLocalize("timeUnits", { key: "label" });

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
DND5E.scalarTimePeriods = new Proxy(DND5E.timeUnits, {
  get(target, prop) {
    return target[prop]?.label;
  },
  has(target, key) {
    return target[key] && target[key].option !== false;
  },
  ownKeys(target) {
    return Object.keys(target).filter(k => target[k]?.option !== false);
  }
});

/* -------------------------------------------- */

/**
 * Time periods for spells that don't have a defined ending.
 * @enum {string}
 */
DND5E.permanentTimePeriods = {
  disp: "DND5E.TimeDisp",
  dstr: "DND5E.TimeDispTrig",
  perm: "DND5E.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
DND5E.specialTimePeriods = {
  inst: "DND5E.TimeInst",
  spec: "DND5E.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
DND5E.timePeriods = {
  ...DND5E.specialTimePeriods,
  ...DND5E.permanentTimePeriods,
  ...DND5E.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
DND5E.staticAbilityActivationTypes = {
  none: "DND5E.NoneActionLabel",
  special: DND5E.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
DND5E.abilityActivationTypes = {
  ...DND5E.staticAbilityActivationTypes,
  action: "DND5E.Action",
  bonus: "DND5E.BonusAction",
  reaction: "DND5E.Reaction",
  minute: DND5E.timePeriods.minute,
  hour: DND5E.timePeriods.hour,
  day: DND5E.timePeriods.day,
  legendary: "DND5E.LegendaryAction.Label",
  mythic: "DND5E.MythicActionLabel",
  lair: "DND5E.LAIR.Action.Label",
  crew: "DND5E.VEHICLE.Activation.Crew.label"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Configuration data for activation types on activities.
 * @enum {ActivityActivationTypeConfiguration}
 */
DND5E.activityActivationTypes = {
  action: {
    label: "DND5E.ACTIVATION.Type.Action.Label",
    header: "DND5E.ACTIVATION.Type.Action.Header",
    group: "DND5E.ACTIVATION.Category.Standard"
  },
  bonus: {
    label: "DND5E.ACTIVATION.Type.BonusAction.Label",
    header: "DND5E.ACTIVATION.Type.BonusAction.Header",
    group: "DND5E.ACTIVATION.Category.Standard"
  },
  reaction: {
    label: "DND5E.ACTIVATION.Type.Reaction.Label",
    header: "DND5E.ACTIVATION.Type.Reaction.Header",
    group: "DND5E.ACTIVATION.Category.Standard"
  },
  minute: {
    label: "DND5E.ACTIVATION.Type.Minute.Label",
    header: "DND5E.ACTIVATION.Type.Minute.Header",
    group: "DND5E.ACTIVATION.Category.Time",
    scalar: true
  },
  hour: {
    label: "DND5E.ACTIVATION.Type.Hour.Label",
    header: "DND5E.ACTIVATION.Type.Hour.Header",
    group: "DND5E.ACTIVATION.Category.Time",
    scalar: true
  },
  day: {
    label: "DND5E.ACTIVATION.Type.Day.Label",
    header: "DND5E.ACTIVATION.Type.Day.Header",
    group: "DND5E.ACTIVATION.Category.Time",
    scalar: true
  },
  longRest: {
    label: "DND5E.ACTIVATION.Type.LongRest.Label",
    group: "DND5E.ACTIVATION.Category.Rest",
    passive: true
  },
  shortRest: {
    label: "DND5E.ACTIVATION.Type.ShortRest.Label",
    group: "DND5E.ACTIVATION.Category.Rest",
    passive: true
  },
  encounter: {
    label: "DND5E.ACTIVATION.Type.Encounter.Label",
    group: "DND5E.ACTIVATION.Category.Combat",
    passive: true
  },
  turnStart: {
    label: "DND5E.ACTIVATION.Type.TurnStart.Label",
    group: "DND5E.ACTIVATION.Category.Combat",
    passive: true
  },
  turnEnd: {
    label: "DND5E.ACTIVATION.Type.TurnEnd.Label",
    group: "DND5E.ACTIVATION.Category.Combat",
    passive: true
  },
  legendary: {
    counted: "DND5E.ACTIVATION.Type.Legendary.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "DND5E.ACTIVATION.Type.Legendary.Label",
    header: "DND5E.ACTIVATION.Type.Legendary.Header",
    group: "DND5E.ACTIVATION.Category.Monster",
    scalar: true
  },
  mythic: {
    counted: "DND5E.ACTIVATION.Type.Mythic.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "DND5E.ACTIVATION.Type.Mythic.Label",
    header: "DND5E.ACTIVATION.Type.Mythic.Header",
    group: "DND5E.ACTIVATION.Category.Monster",
    scalar: true
  },
  lair: {
    label: "DND5E.ACTIVATION.Type.Lair.Label",
    header: "DND5E.ACTIVATION.Type.Lair.Header",
    group: "DND5E.ACTIVATION.Category.Monster"
  },
  special: {
    label: "DND5E.Special",
    passive: true
  }
};
preLocalize("activityActivationTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
DND5E.abilityConsumptionTypes = {
  ammo: "DND5E.ConsumeAmmunition",
  attribute: "DND5E.ConsumeAttribute",
  hitDice: "DND5E.ConsumeHitDice",
  material: "DND5E.ConsumeMaterial",
  charges: "DND5E.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration information for different consumption targets.
 * @enum {ActivityConsumptionTargetConfiguration}
 */
DND5E.activityConsumptionTypes = {
  activityUses: {
    label: "DND5E.CONSUMPTION.Type.ActivityUses.Label",
    consume: ConsumptionTargetData.consumeActivityUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsActivityUses
  },
  itemUses: {
    label: "DND5E.CONSUMPTION.Type.ItemUses.Label",
    consume: ConsumptionTargetData.consumeItemUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsItemUses,
    nonEmbeddedHint: "DND5E.CONSUMPTION.Type.ItemUses.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validItemUsesTargets
  },
  material: {
    label: "DND5E.CONSUMPTION.Type.Material.Label",
    consume: ConsumptionTargetData.consumeMaterial,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsMaterial,
    nonEmbeddedHint: "DND5E.CONSUMPTION.Type.Material.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validMaterialTargets
  },
  hitDice: {
    label: "DND5E.CONSUMPTION.Type.HitDice.Label",
    consume: ConsumptionTargetData.consumeHitDice,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsHitDice,
    validTargets: ConsumptionTargetData.validHitDiceTargets
  },
  spellSlots: {
    label: "DND5E.CONSUMPTION.Type.SpellSlots.Label",
    consume: ConsumptionTargetData.consumeSpellSlots,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsSpellSlots,
    scalingModes: [{ value: "level", label: "DND5E.CONSUMPTION.Scaling.SlotLevel" }],
    validTargets: ConsumptionTargetData.validSpellSlotsTargets
  },
  attribute: {
    label: "DND5E.CONSUMPTION.Type.Attribute.Label",
    consume: ConsumptionTargetData.consumeAttribute,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsAttribute,
    nonEmbeddedHint: "DND5E.CONSUMPTION.Type.Attribute.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validAttributeTargets
  }
};
preLocalize("activityConsumptionTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Creature sizes ordered from smallest to largest.
 * @enum {ActorSizeConfiguration}
 */
DND5E.actorSizes = {
  tiny: {
    label: "DND5E.SizeTiny",
    abbreviation: "DND5E.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5,
    numerical: 0
  },
  sm: {
    label: "DND5E.SizeSmall",
    abbreviation: "DND5E.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8,
    numerical: 1
  },
  med: {
    label: "DND5E.SizeMedium",
    abbreviation: "DND5E.SizeMediumAbbr",
    hitDie: 8,
    numerical: 2
  },
  lg: {
    label: "DND5E.SizeLarge",
    abbreviation: "DND5E.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2,
    numerical: 3
  },
  huge: {
    label: "DND5E.SizeHuge",
    abbreviation: "DND5E.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4,
    numerical: 4
  },
  grg: {
    label: "DND5E.SizeGargantuan",
    abbreviation: "DND5E.SizeGargantuanAbbr",
    hitDie: 20,
    token: 4,
    capacityMultiplier: 8,
    numerical: 5
  }
};
preLocalize("actorSizes", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Canvas                                      */
/* -------------------------------------------- */

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
DND5E.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Colors used when a dynamic token ring effects.
 * @enum {number}
 */
DND5E.tokenRingColors = {
  damage: 0xFF0000,
  defeated: 0x000000,
  healing: 0x00FF00,
  temp: 0x33AAFF
};

/* -------------------------------------------- */

/**
 * Colors used to denote movement speed on ruler segments & grid highlighting
 * @enum {number}
 */
DND5E.tokenRulerColors = {
  normal: 0x33BC4E,
  double: 0xF1D836,
  triple: 0xE72124
};

/* -------------------------------------------- */

/**
 * Settings used to render map location markers on the canvas.
 * @enum {MapLocationMarkerStyle}
 */
DND5E.mapLocationMarker = {
  default: {
    icon: MapLocationControlIcon,
    backgroundColor: 0xFBF8F5,
    borderColor: 0x000000,
    borderHoverColor: 0xFF5500,
    fontFamily: "Roboto Slab",
    shadowColor: 0x000000,
    textColor: 0x000000
  }
};

/* -------------------------------------------- */

/**
 * Default types of creatures.
 * @enum {CreatureTypeConfiguration}
 */
DND5E.creatureTypes = {
  aberration: {
    label: "DND5E.CreatureAberration",
    plural: "DND5E.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    detectAlignment: true
  },
  beast: {
    label: "DND5E.CreatureBeast",
    plural: "DND5E.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp"
  },
  celestial: {
    label: "DND5E.CreatureCelestial",
    plural: "DND5E.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    detectAlignment: true
  },
  construct: {
    label: "DND5E.CreatureConstruct",
    plural: "DND5E.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp"
  },
  dragon: {
    label: "DND5E.CreatureDragon",
    plural: "DND5E.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp"
  },
  elemental: {
    label: "DND5E.CreatureElemental",
    plural: "DND5E.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    detectAlignment: true
  },
  fey: {
    label: "DND5E.CreatureFey",
    plural: "DND5E.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    detectAlignment: true
  },
  fiend: {
    label: "DND5E.CreatureFiend",
    plural: "DND5E.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    detectAlignment: true
  },
  giant: {
    label: "DND5E.CreatureGiant",
    plural: "DND5E.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp"
  },
  humanoid: {
    label: "DND5E.CreatureHumanoid",
    plural: "DND5E.CreatureHumanoidPl",
    icon: "icons/environment/people/group.webp"
  },
  monstrosity: {
    label: "DND5E.CreatureMonstrosity",
    plural: "DND5E.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp"
  },
  ooze: {
    label: "DND5E.CreatureOoze",
    plural: "DND5E.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp"
  },
  plant: {
    label: "DND5E.CreaturePlant",
    plural: "DND5E.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp"
  },
  undead: {
    label: "DND5E.CreatureUndead",
    plural: "DND5E.CreatureUndeadPl",
    icon: "icons/magic/death/skull-horned-worn-fire-blue.webp",
    detectAlignment: true
  }
};
preLocalize("creatureTypes", { keys: ["label", "plural"], sort: true });

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
DND5E.itemActionTypes = {
  mwak: "DND5E.ActionMWAK",
  rwak: "DND5E.ActionRWAK",
  msak: "DND5E.ActionMSAK",
  rsak: "DND5E.ActionRSAK",
  abil: "DND5E.ActionAbil",
  save: "DND5E.ActionSave",
  ench: "DND5E.ActionEnch",
  summ: "DND5E.ActionSumm",
  heal: "DND5E.ActionHeal",
  util: "DND5E.ActionUtil",
  other: "DND5E.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
DND5E.itemRarity = {
  common: "DND5E.ItemRarityCommon",
  uncommon: "DND5E.ItemRarityUncommon",
  rare: "DND5E.ItemRarityRare",
  veryRare: "DND5E.ItemRarityVeryRare",
  legendary: "DND5E.ItemRarityLegendary",
  artifact: "DND5E.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
DND5E.limitedUsePeriods = {
  lr: {
    label: "DND5E.USES.Recovery.Period.LongRest.Label",
    abbreviation: "DND5E.USES.Recovery.Period.LongRest.Abbreviation"
  },
  sr: {
    label: "DND5E.USES.Recovery.Period.ShortRest.Label",
    abbreviation: "DND5E.USES.Recovery.Period.ShortRest.Abbreviation"
  },
  day: {
    label: "DND5E.USES.Recovery.Period.Day.Label",
    abbreviation: "DND5E.USES.Recovery.Period.Day.Label"
  },
  dawn: {
    label: "DND5E.USES.Recovery.Period.Dawn.Label",
    abbreviation: "DND5E.USES.Recovery.Period.Dawn.Label",
    formula: true
  },
  dusk: {
    label: "DND5E.USES.Recovery.Period.Dusk.Label",
    abbreviation: "DND5E.USES.Recovery.Period.Dusk.Label",
    formula: true
  },
  initiative: {
    label: "DND5E.USES.Recovery.Period.Initiative.Label",
    abbreviation: "DND5E.USES.Recovery.Period.Initiative.Label",
    type: "special"
  },
  turnStart: {
    label: "DND5E.USES.Recovery.Period.TurnStart.Label",
    abbreviation: "DND5E.USES.Recovery.Period.TurnStart.Abbreviation",
    type: "combat"
  },
  turnEnd: {
    label: "DND5E.USES.Recovery.Period.TurnEnd.Label",
    abbreviation: "DND5E.USES.Recovery.Period.TurnEnd.Abbreviation",
    type: "combat"
  },
  turn: {
    label: "DND5E.USES.Recovery.Period.Turn.Label",
    abbreviation: "DND5E.USES.Recovery.Period.Turn.Label",
    type: "combat"
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });

Object.defineProperty(DND5E.limitedUsePeriods, "recoveryOptions", {
  get() {
    return [
      ...Object.entries(CONFIG.DND5E.limitedUsePeriods)
        .filter(([, config]) => !config.deprecated)
        .map(([value, { label, type }]) => ({
          value, label, group: _loc(`DND5E.USES.Recovery.${type?.capitalize() ?? "Time"}`)
        })),
      { value: "recharge", label: _loc("DND5E.USES.Recovery.Recharge.Label") }
    ];
  }
});

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
DND5E.enchantmentPeriods = {
  sr: {
    label: "DND5E.ENCHANTMENT.Period.ShortRest"
  },
  lr: {
    label: "DND5E.ENCHANTMENT.Period.LongRest"
  },
  atwill: {
    label: "DND5E.ENCHANTMENT.Period.AtWill"
  }
};
preLocalize("enchantmentPeriods", { key: "label" });

/* -------------------------------------------- */
/*  Armor                                       */
/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
DND5E.armorTypes = {
  light: "DND5E.EquipmentLight",
  medium: "DND5E.EquipmentMedium",
  heavy: "DND5E.EquipmentHeavy",
  natural: "DND5E.EquipmentNatural",
  shield: "DND5E.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @enum {string}
 */
DND5E.armorProficiencies = {
  lgt: "DND5E.ArmorLightProficiency",
  med: "DND5E.ArmorMediumProficiency",
  hvy: "DND5E.ArmorHeavyProficiency",
  shl: "DND5E.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/* -------------------------------------------- */

/**
 * A mapping between `DND5E.equipmentTypes` and `DND5E.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5E.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/* -------------------------------------------- */

/**
 * Amount of speed reduction caused by wearing armor but not meeting the strength requirement in feet.
 * Value will be converted to the appropriate value to match the actor's speed unit.
 * @type {number}
 */
DND5E.armorSpeedReduction = 10;

/* -------------------------------------------- */

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
DND5E.armorIds = {
};

/* -------------------------------------------- */

/**
 * The basic shield in 5e.
 * @enum {string}
 */
DND5E.shieldIds = {
};

/* -------------------------------------------- */

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
DND5E.armorClasses = {
  flat: {
    label: "DND5E.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "DND5E.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "DND5E.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "DND5E.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "DND5E.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "DND5E.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "DND5E.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  unarmoredBard: {
    label: "DND5E.ArmorClassUnarmoredBard",
    formula: "10 + @abilities.dex.mod + @abilities.cha.mod"
  },
  custom: {
    label: "DND5E.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */
/*  Other Equipment Types                       */
/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
DND5E.miscEquipmentTypes = {
  clothing: "DND5E.EQUIPMENT.Type.Clothing.Label",
  ring: "DND5E.EQUIPMENT.Type.Ring.Label",
  rod: "DND5E.EQUIPMENT.Type.Rod.Label",
  trinket: "DND5E.EQUIPMENT.Type.Trinket.Label",
  wand: "DND5E.EQUIPMENT.Type.Wand.Label",
  wondrous: "DND5E.EQUIPMENT.Type.Wondrous.Label"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
DND5E.equipmentTypes = {
  ...DND5E.miscEquipmentTypes,
  ...DND5E.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
DND5E.consumableTypes = {
  ammo: {
    label: "DND5E.CONSUMABLE.Type.Ammunition.Label",
    subtypes: {
      arrow: "DND5E.CONSUMABLE.Type.Ammunition.Arrow",
      crossbowBolt: "DND5E.CONSUMABLE.Type.Ammunition.Bolt",
      energyCell: "DND5E.CONSUMABLE.Type.Ammunition.EnergyCell",
      firearmBullet: "DND5E.CONSUMABLE.Type.Ammunition.BulletFirearm",
      slingBullet: "DND5E.CONSUMABLE.Type.Ammunition.BulletSling",
      blowgunNeedle: "DND5E.CONSUMABLE.Type.Ammunition.Needle"
    }
  },
  potion: {
    label: "DND5E.CONSUMABLE.Type.Potion.Label"
  },
  poison: {
    label: "DND5E.CONSUMABLE.Type.Poison.Label",
    subtypes: {
      contact: "DND5E.CONSUMABLE.Type.Poison.Contact",
      ingested: "DND5E.CONSUMABLE.Type.Poison.Ingested",
      inhaled: "DND5E.CONSUMABLE.Type.Poison.Inhaled",
      injury: "DND5E.CONSUMABLE.Type.Poison.Injury"
    }
  },
  food: {
    label: "DND5E.CONSUMABLE.Type.Food.Label"
  },
  scroll: {
    label: "DND5E.CONSUMABLE.Type.Scroll.Label"
  },
  wand: {
    label: "DND5E.CONSUMABLE.Type.Wand.Label"
  },
  rod: {
    label: "DND5E.CONSUMABLE.Type.Rod.Label"
  },
  trinket: {
    label: "DND5E.CONSUMABLE.Type.Trinket.Label"
  },
  wondrous: {
    label: "DND5E.CONSUMABLE.Type.Wondrous.Label"
  }
};
preLocalize("consumableTypes", { key: "label", sort: true });
preLocalize("consumableTypes.ammo.subtypes", { sort: true });
preLocalize("consumableTypes.poison.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of containers.
 * @enum {string}
 */
DND5E.containerTypes = {
  backpack: "H8YCd689ezlD26aT",
  barrel: "7Yqbqg5EtVW16wfT",
  basket: "Wv7HzD6dv1P0q78N",
  boltcase: "eJtPBiZtr2pp6ynt",
  bottle: "HZp69hhyNZUUCipF",
  bucket: "mQVYcHmMSoCUnBnM",
  case: "5mIeX824uMklU3xq",
  chest: "2YbuclKfhDL0bU4u",
  flask: "lHS63sC6bypENNlR",
  jug: "0ZBWwjFz3nIAXMLW",
  pot: "M8xM8BLK4tpUayEE",
  pitcher: "nXWdGtzi8DXDLLsL",
  pouch: "9bWTRRDym06PzSAf",
  quiver: "4MtQKPn9qMWCFjDA",
  sack: "CNdDj8dsXVpRVpXt",
  saddlebags: "TmfaFUSZJAotndn9",
  tankard: "uw6fINSmZ2j2o57A",
  vial: "meJEfX3gZgtMX4x2"
};

/* -------------------------------------------- */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
DND5E.focusTypes = {
  arcane: {
    label: "DND5E.Focus.Arcane",
    itemIds: {
    }
  },
  druidic: {
    label: "DND5E.Focus.Druidic",
    itemIds: {
    }
  },
  holy: {
    label: "DND5E.Focus.Holy",
    itemIds: {
    }
  }
};
preLocalize("focusTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of "features" items.
 * @enum {SubtypeTypeConfiguration}
 */
DND5E.featureTypes = {
  background: {
    label: "DND5E.Feature.Background"
  },
  class: {
    label: "DND5E.Feature.Class.Label",
    subtypes: {
      arcaneShot: "DND5E.Feature.Class.ArcaneShot",
      artificerInfusion: "DND5E.Feature.Class.ArtificerPlan",
      channelDivinity: "DND5E.Feature.Class.ChannelDivinity",
      defensiveTactic: "DND5E.Feature.Class.DefensiveTactic",
      eldritchInvocation: "DND5E.Feature.Class.EldritchInvocation",
      elementalDiscipline: "DND5E.Feature.Class.ElementalDiscipline",
      fightingStyle: "DND5E.Feature.Class.FightingStyle",
      huntersPrey: "DND5E.Feature.Class.HuntersPrey",
      ki: "DND5E.Feature.Class.Ki",
      maneuver: "DND5E.Feature.Class.Maneuver",
      metamagic: "DND5E.Feature.Class.Metamagic",
      multiattack: "DND5E.Feature.Class.Multiattack",
      pact: "DND5E.Feature.Class.PactBoon",
      psionicPower: "DND5E.Feature.Class.PsionicPower",
      rune: "DND5E.Feature.Class.Rune",
      superiorHuntersDefense: "DND5E.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "DND5E.Feature.Monster"
  },
  race: {
    label: "DND5E.Feature.Species"
  },
  enchantment: {
    label: "DND5E.ENCHANTMENT.Label",
    subtypes: {
      artificerInfusion: "DND5E.Feature.Class.ArtificerPlan",
      rune: "DND5E.Feature.Class.Rune"
    }
  },
  feat: {
    label: "DND5E.Feature.Feat.Label",
    subtypes: {
      general: "DND5E.Feature.Feat.General",
      origin: "DND5E.Feature.Feat.Origin",
      fightingStyle: "DND5E.Feature.Feat.FightingStyle",
      epicBoon: "DND5E.Feature.Feat.EpicBoon"
    }
  },
  supernaturalGift: {
    label: "DND5E.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "DND5E.Feature.SupernaturalGift.Blessing",
      charm: "DND5E.Feature.SupernaturalGift.Charm",
      epicBoon: "DND5E.Feature.SupernaturalGift.EpicBoon"
    }
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });
preLocalize("featureTypes.enchantment.subtypes", { sort: true });
preLocalize("featureTypes.feat.subtypes", { sort: true });
preLocalize("featureTypes.supernaturalGift.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various properties of all item types.
 * @enum {ItemPropertyConfiguration}
 */
DND5E.itemProperties = {
  ada: {
    label: "DND5E.ITEM.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "DND5E.ITEM.Property.Ammunition"
  },
  concentration: {
    label: "DND5E.ITEM.Property.Concentration",
    abbreviation: "DND5E.ConcentrationAbbr",
    icon: "systems/dnd5e/icons/svg/statuses/concentrating.svg",
    isTag: true
  },
  fin: {
    label: "DND5E.ITEM.Property.Finesse"
  },
  fir: {
    label: "DND5E.ITEM.Property.Firearm"
  },
  foc: {
    label: "DND5E.ITEM.Property.Focus"
  },
  gear: {
    label: "DND5E.ITEM.Property.Gear"
  },
  hvy: {
    label: "DND5E.ITEM.Property.Heavy"
  },
  lgt: {
    label: "DND5E.ITEM.Property.Light"
  },
  lod: {
    label: "DND5E.ITEM.Property.Loading"
  },
  material: {
    label: "DND5E.ITEM.Property.Material",
    abbreviation: "DND5E.ComponentMaterialAbbr"
  },
  mgc: {
    label: "DND5E.ITEM.Property.Magical",
    icon: "systems/dnd5e/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  rch: {
    label: "DND5E.ITEM.Property.Reach"
  },
  rel: {
    label: "DND5E.ITEM.Property.Reload"
  },
  ret: {
    label: "DND5E.ITEM.Property.Returning"
  },
  ritual: {
    label: "DND5E.ITEM.Property.Ritual",
    abbreviation: "DND5E.RitualAbbr",
    icon: "systems/dnd5e/icons/svg/items/spell.svg",
    isTag: true
  },
  sidekick: {
    label: "DND5E.ITEM.Property.Sidekick"
  },
  sil: {
    label: "DND5E.ITEM.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "DND5E.ITEM.Property.Somatic",
    abbreviation: "DND5E.ComponentSomaticAbbr"
  },
  spc: {
    label: "DND5E.ITEM.Property.Special"
  },
  stealthDisadvantage: {
    label: "DND5E.ITEM.Property.StealthDisadvantage"
  },
  thr: {
    label: "DND5E.ITEM.Property.Thrown"
  },
  trait: {
    label: "DND5E.ITEM.Property.Trait"
  },
  two: {
    label: "DND5E.ITEM.Property.TwoHanded"
  },
  ver: {
    label: "DND5E.ITEM.Property.Versatile"
  },
  vocal: {
    label: "DND5E.ITEM.Property.Verbal",
    abbreviation: "DND5E.ComponentVerbalAbbr"
  },
  weightlessContents: {
    label: "DND5E.ITEM.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
DND5E.validProperties = {
  class: new Set([
    "sidekick"
  ]),
  consumable: new Set([
    "mgc"
  ]),
  container: new Set([
    "mgc",
    "weightlessContents"
  ]),
  equipment: new Set([
    "ada",
    "foc",
    "mgc",
    "stealthDisadvantage"
  ]),
  feat: new Set([
    "mgc",
    "trait"
  ]),
  weapon: new Set([
    "ada",
    "amm",
    "fin",
    "fir",
    "foc",
    "hvy",
    "lgt",
    "lod",
    "mgc",
    "rch",
    "rel",
    "ret",
    "sil",
    "spc",
    "thr",
    "two",
    "ver"
  ]),
  spell: new Set([
    "vocal",
    "somatic",
    "material",
    "concentration",
    "ritual"
  ]),
  tool: new Set([
    "foc",
    "mgc"
  ])
};

/* -------------------------------------------- */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
DND5E.currencies = {
  pp: {
    label: "DND5E.CurrencyPP",
    abbreviation: "DND5E.CurrencyAbbrPP",
    conversion: 0.1,
    icon: "systems/dnd5e/icons/currency/platinum.webp"
  },
  gp: {
    label: "DND5E.CurrencyGP",
    abbreviation: "DND5E.CurrencyAbbrGP",
    conversion: 1,
    icon: "systems/dnd5e/icons/currency/gold.webp"
  },
  ep: {
    label: "DND5E.CurrencyEP",
    abbreviation: "DND5E.CurrencyAbbrEP",
    conversion: 2,
    icon: "systems/dnd5e/icons/currency/electrum.webp"
  },
  sp: {
    label: "DND5E.CurrencySP",
    abbreviation: "DND5E.CurrencyAbbrSP",
    conversion: 10,
    icon: "systems/dnd5e/icons/currency/silver.webp"
  },
  cp: {
    label: "DND5E.CurrencyCP",
    abbreviation: "DND5E.CurrencyAbbrCP",
    conversion: 100,
    icon: "systems/dnd5e/icons/currency/copper.webp"
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Default currency used for data model defaults, starting wealth, and facility prices.
 * @enum {string}
 */
DND5E.defaultCurrency = "gp";

/* -------------------------------------------- */

/**
 * Configuration data for crafting costs.
 * @type {CraftingConfiguration}
 */
DND5E.crafting = {
  consumable: {
    days: .5,
    gold: .5
  },
  exceptions: {
    "potion-of-healing": {
      days: 1,
      gold: 25
    }
  },
  magic: {
    common: {
      days: 5,
      gold: 50
    },
    uncommon: {
      days: 10,
      gold: 200
    },
    rare: {
      days: 50,
      gold: 2_000
    },
    veryRare: {
      days: 125,
      gold: 20_000
    },
    legendary: {
      days: 250,
      gold: 100_000
    }
  },
  mundane: {
    days: .1,
    gold: .5
  },
  scrolls: {
    0: {
      days: 1,
      gold: 15
    },
    1: {
      days: 1,
      gold: 25
    },
    2: {
      days: 3,
      gold: 100
    },
    3: {
      days: 5,
      gold: 150
    },
    4: {
      days: 10,
      gold: 1_000
    },
    5: {
      days: 25,
      gold: 1_500
    },
    6: {
      days: 40,
      gold: 10_000
    },
    7: {
      days: 50,
      gold: 12_500
    },
    8: {
      days: 60,
      gold: 15_000
    },
    9: {
      days: 120,
      gold: 50_000
    }
  }
};

/* -------------------------------------------- */
/*  Damage                                      */
/* -------------------------------------------- */

/**
 * Standard dice spread available for things like damage.
 * @type {number[]}
 */
DND5E.dieSteps = [4, 6, 8, 10, 12, 20, 100];

/* -------------------------------------------- */

/**
 * Methods by which damage scales relative to the overall scaling increase.
 * @enum {{ label: string, labelCantrip: string }}
 */
DND5E.damageScalingModes = {
  whole: {
    label: "DND5E.DAMAGE.Scaling.Whole",
    labelCantrip: "DND5E.DAMAGE.Scaling.WholeCantrip"
  },
  half: {
    label: "DND5E.DAMAGE.Scaling.Half",
    labelCantrip: "DND5E.DAMAGE.Scaling.HalfCantrip"
  }
};
preLocalize("damageScalingModes", { keys: ["label", "labelCantrip"] });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
DND5E.damageTypes = {
  acid: {
    label: "DND5E.DAMAGE.Type.Acid",
    icon: "systems/dnd5e/icons/svg/damage/acid.svg",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "DND5E.DAMAGE.Type.Bludgeoning",
    icon: "systems/dnd5e/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    color: new Color(0x0000A0)
  },
  cold: {
    label: "DND5E.DAMAGE.Type.Cold",
    icon: "systems/dnd5e/icons/svg/damage/cold.svg",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "DND5E.DAMAGE.Type.Fire",
    icon: "systems/dnd5e/icons/svg/damage/fire.svg",
    color: new Color(0xFF4500)
  },
  force: {
    label: "DND5E.DAMAGE.Type.Force",
    icon: "systems/dnd5e/icons/svg/damage/force.svg",
    color: new Color(0x800080)
  },
  lightning: {
    label: "DND5E.DAMAGE.Type.Lightning",
    icon: "systems/dnd5e/icons/svg/damage/lightning.svg",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "DND5E.DAMAGE.Type.Necrotic",
    icon: "systems/dnd5e/icons/svg/damage/necrotic.svg",
    color: new Color(0x006400)
  },
  piercing: {
    label: "DND5E.DAMAGE.Type.Piercing",
    icon: "systems/dnd5e/icons/svg/damage/piercing.svg",
    isPhysical: true,
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "DND5E.DAMAGE.Type.Poison",
    icon: "systems/dnd5e/icons/svg/damage/poison.svg",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "DND5E.DAMAGE.Type.Psychic",
    icon: "systems/dnd5e/icons/svg/damage/psychic.svg",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "DND5E.DAMAGE.Type.Radiant",
    icon: "systems/dnd5e/icons/svg/damage/radiant.svg",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "DND5E.DAMAGE.Type.Slashing",
    icon: "systems/dnd5e/icons/svg/damage/slashing.svg",
    isPhysical: true,
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "DND5E.DAMAGE.Type.Thunder",
    icon: "systems/dnd5e/icons/svg/damage/thunder.svg",
    color: new Color(0x708090)
  }
};
preLocalize("damageTypes", { keys: ["label"], sort: true });

/* -------------------------------------------- */

/**
 * Display aggregated damage in chat cards.
 * @type {boolean}
 */
DND5E.aggregateDamageDisplay = true;

/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {DamageTypeConfiguration}
 */
DND5E.healingTypes = {
  healing: {
    label: "DND5E.HEAL.Type.Healing",
    labelShort: "DND5E.HEAL.Type.HealingShort",
    icon: "systems/dnd5e/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "DND5E.HEAL.Type.Temporary",
    labelShort: "DND5E.HEAL.Type.TemporaryShort",
    icon: "systems/dnd5e/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  },
  maximum: {
    label: "DND5E.HEAL.Type.Maximum",
    labelShort: "DND5E.HEAL.Type.MaximumShort",
    icon: "systems/dnd5e/icons/svg/damage/maxhp.svg",
    color: new Color(0x4BDEDE)
  }
};
preLocalize("healingTypes", { keys: ["label", "labelShort"] });

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Types of terrain that can cause difficult terrain.
 * @enum {{ label: string }}
 */
DND5E.difficultTerrainTypes = {
  ice: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Ice"
  },
  liquid: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Liquid"
  },
  plants: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Plants"
  },
  rocks: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Rocks"
  },
  mud: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Mud"
  },
  sand: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Sand"
  },
  slope: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Slope"
  },
  snow: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Snow"
  },
  web: {
    label: "DND5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Webs"
  }
};
preLocalize("difficultTerrainTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {MovementTypeConfiguration}
 */
DND5E.movementTypes = {
  walk: {
    label: "DND5E.MOVEMENT.Type.Speed"
  },
  burrow: {
    label: "DND5E.MOVEMENT.Type.Burrow"
  },
  climb: {
    label: "DND5E.MOVEMENT.Type.Climb",
    walkFallback: true
  },
  fly: {
    label: "DND5E.MOVEMENT.Type.Fly",
    travel: "air"
  },
  jump: {
    label: "DND5E.MOVEMENT.Type.Jump",
    hidden: true
  },
  swim: {
    label: "DND5E.MOVEMENT.Type.Swim",
    travel: "water",
    walkFallback: true
  }
};
preLocalize("movementTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Default number of hours per day traveled by specific actor types.
 * @enum {number}
 */
DND5E.travelTimes = {
  group: 8,
  vehicle: 24
};

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {Omit<MovementTypeConfiguration, "travel">}
 */
DND5E.travelTypes = {
  land: {
    label: "DND5E.TRAVEL.Type.Land"
  },
  water: {
    label: "DND5E.TRAVEL.Type.Water"
  },
  air: {
    label: "DND5E.TRAVEL.Type.Air"
  }
};
preLocalize("travelTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Available travel paces.
 * @type {Readonly<Record<string, TravelPaceConfiguration>>}
 */
DND5E.travelPace = Object.freeze({
  slow: {
    label: "DND5E.TRAVEL.Pace.Slow",
    standard: 18,
    multiplier: 2 / 3,
    round: "down"
  },
  normal: {
    label: "DND5E.TRAVEL.Pace.Normal",
    standard: 24,
    multiplier: 1,
    round: "down"
  },
  fast: {
    label: "DND5E.TRAVEL.Pace.Fast",
    standard: 30,
    multiplier: 4 / 3,
    round: "down"
  }
});
preLocalize("travelPace", { key: "label" });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * Default units used for imperial & metric settings.
 * @enum {{ imperial: string, metric: string }}
 */
DND5E.defaultUnits = {
  length: {
    imperial: "ft",
    metric: "m"
  },
  travel: {
    imperial: "mph",
    metric: "kph"
  },
  volume: {
    imperial: "cubicFoot",
    metric: "liter"
  },
  weight: {
    imperial: "lb",
    metric: "kg"
  }
};

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * @enum {MovementUnitConfiguration}
 */
DND5E.movementUnits = {
  ft: {
    label: "DND5E.UNITS.DISTANCE.Foot.Label",
    abbreviation: "DND5E.UNITS.DISTANCE.Foot.Abbreviation",
    template: "DND5E.UNITS.DISTANCE.Foot.Template",
    conversion: 1,
    formattingUnit: "foot",
    type: "imperial",
    travelResolution: "round"
  },
  mi: {
    label: "DND5E.UNITS.DISTANCE.Mile.Label",
    abbreviation: "DND5E.UNITS.DISTANCE.Mile.Abbreviation",
    template: "DND5E.UNITS.DISTANCE.Mile.Template",
    conversion: 5_280,
    formattingUnit: "mile",
    type: "imperial",
    travelResolution: "day"
  },
  m: {
    label: "DND5E.UNITS.DISTANCE.Meter.Label",
    abbreviation: "DND5E.UNITS.DISTANCE.Meter.Abbreviation",
    template: "DND5E.UNITS.DISTANCE.Meter.Template",
    conversion: 10 / 3, // D&D uses a simplified 5ft -> 1.5m conversion.
    formattingUnit: "meter",
    type: "metric",
    travelResolution: "round"
  },
  km: {
    label: "DND5E.UNITS.DISTANCE.Kilometer.Label",
    abbreviation: "DND5E.UNITS.DISTANCE.Kilometer.Abbreviation",
    template: "DND5E.UNITS.DISTANCE.Kilometer.Template",
    conversion: 10_000 / 3, // Matching simplified conversion
    formattingUnit: "kilometer",
    type: "metric",
    travelResolution: "day"
  }
};
preLocalize("movementUnits", { keys: ["label", "abbreviation", "template"] });

/* -------------------------------------------- */

/**
 * The valid units for measuring travel speed. When being formatted, the formatting unit will be combined with
 * `-per-hour` or `-per-day` to result in the final unit passed to `Intl.NumberFormat`.
 * @enum {TravelUnitConfiguration}
 */
DND5E.travelUnits = {
  mph: {
    label: "DND5E.UNITS.TRAVEL.Mile.Label",
    abbreviationDay: "DND5E.UNITS.TRAVEL.Mile.AbbreviationDay",
    abbreviationHour: "DND5E.UNITS.TRAVEL.Mile.AbbreviationHour",
    formattingUnit: "mile",
    conversion: 1,
    type: "imperial"
  },
  kph: {
    label: "DND5E.UNITS.TRAVEL.Kilometer.Label",
    abbreviationDay: "DND5E.UNITS.TRAVEL.Kilometer.AbbreviationDay",
    abbreviationHour: "DND5E.UNITS.TRAVEL.Kilometer.AbbreviationHour",
    formattingUnit: "kilometer",
    conversion: 0.6,
    type: "metric"
  }
};
preLocalize("travelUnits", { keys: ["label", "abbreviationDay", "abbreviationHour"] });

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
DND5E.rangeTypes = {
  self: "DND5E.DistSelf",
  touch: "DND5E.DistTouch",
  spec: "DND5E.Special",
  any: "DND5E.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `DND5E.movementUnits` and
 * `DND5E.rangeUnits`.
 * @enum {string}
 */
DND5E.distanceUnits = {
  ...Object.fromEntries(Object.entries(DND5E.movementUnits).map(([k, { label }]) => [k, label])),
  ...DND5E.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * The valid units for measurement of volume.
 * @enum {UnitConfiguration}
 */
DND5E.volumeUnits = {
  cubicFoot: {
    label: "DND5E.UNITS.VOLUME.CubicFoot.Label",
    abbreviation: "DND5E.UNITS.VOLUME.CubicFoot.Abbreviation",
    counted: "DND5E.UNITS.VOLUME.CubicFoot.Counted",
    conversion: 1,
    type: "imperial"
  },
  liter: {
    label: "DND5E.UNITS.VOLUME.Liter.Label",
    abbreviation: "DND5E.UNITS.VOLUME.Liter.Abbreviation",
    conversion: 1 / 28.317,
    type: "metric"
  }
};
preLocalize("volumeUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * The valid units for measurement of weight.
 * @enum {UnitConfiguration}
 */
DND5E.weightUnits = {
  lb: {
    label: "DND5E.UNITS.WEIGHT.Pound.Label",
    abbreviation: "DND5E.UNITS.WEIGHT.Pound.Abbreviation",
    conversion: 1,
    formattingUnit: "pound",
    type: "imperial"
  },
  tn: {
    label: "DND5E.UNITS.WEIGHT.Ton.Label",
    abbreviation: "DND5E.UNITS.WEIGHT.Ton.Abbreviation",
    counted: "DND5E.UNITS.WEIGHT.Ton.Counted",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "DND5E.UNITS.WEIGHT.Kilogram.Label",
    abbreviation: "DND5E.UNITS.WEIGHT.Kilogram.Abbreviation",
    conversion: 2.5,
    formattingUnit: "kilogram",
    type: "metric"
  },
  Mg: {
    label: "DND5E.UNITS.WEIGHT.Megagram.Label",
    abbreviation: "DND5E.UNITS.WEIGHT.Megagram.Abbreviation",
    counted: "DND5E.UNITS.WEIGHT.Megagram.Counted",
    conversion: 2500,
    type: "metric"
  }
};
preLocalize("weightUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @type {EncumbranceConfiguration}
 */
DND5E.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  draftMultiplier: 5,
  effects: {
    encumbered: {
      name: "EFFECT.DND5E.StatusEncumbered",
      img: "systems/dnd5e/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.DND5E.StatusHeavilyEncumbered",
      img: "systems/dnd5e/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.DND5E.StatusExceedingCarryingCapacity",
      img: "systems/dnd5e/icons/svg/statuses/exceeding-carrying-capacity.svg"
    }
  },
  threshold: {
    encumbered: {
      imperial: 5,
      metric: 2.5
    },
    heavilyEncumbered: {
      imperial: 10,
      metric: 5
    },
    maximum: {
      imperial: 15,
      metric: 7.5
    }
  },
  speedReduction: {
    encumbered: {
      ft: 10,
      m: 3
    },
    heavilyEncumbered: {
      ft: 20,
      m: 6
    },
    exceedingCarryingCapacity: {
      ft: 5,
      m: 1.5
    }
  },
  baseUnits: {
    default: {
      imperial: "lb",
      metric: "kg"
    }
  }
};
preLocalize("encumbrance.effects", { key: "name" });

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {IndividualTargetDefinition}
 */
DND5E.individualTargetTypes = {
  self: {
    label: "DND5E.TARGET.Type.Self.Label",
    scalar: false
  },
  ally: {
    label: "DND5E.TARGET.Type.Ally.Label",
    counted: "DND5E.TARGET.Type.Ally.Counted"
  },
  enemy: {
    label: "DND5E.TARGET.Type.Enemy.Label",
    counted: "DND5E.TARGET.Type.Enemy.Counted"
  },
  creature: {
    label: "DND5E.TARGET.Type.Creature.Label",
    counted: "DND5E.TARGET.Type.Creature.Counted"
  },
  object: {
    label: "DND5E.TARGET.Type.Object.Label",
    counted: "DND5E.TARGET.Type.Object.Counted"
  },
  space: {
    label: "DND5E.TARGET.Type.Space.Label",
    counted: "DND5E.TARGET.Type.Space.Counted"
  },
  creatureOrObject: {
    label: "DND5E.TARGET.Type.CreatureOrObject.Label",
    counted: "DND5E.TARGET.Type.CreatureOrObject.Counted"
  },
  any: {
    label: "DND5E.TARGET.Type.Any.Label",
    counted: "DND5E.TARGET.Type.Target.Counted"
  },
  willing: {
    label: "DND5E.TARGET.Type.WillingCreature.Label",
    counted: "DND5E.TARGET.Type.WillingCreature.Counted"
  }
};
preLocalize("individualTargetTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
DND5E.areaTargetTypes = {
  circle: {
    label: "DND5E.TARGET.Type.Circle.Label",
    counted: "DND5E.TARGET.Type.Circle.Counted",
    template: "circle",
    sizes: ["radius"]
  },
  cone: {
    label: "DND5E.TARGET.Type.Cone.Label",
    counted: "DND5E.TARGET.Type.Cone.Counted",
    template: "cone",
    sizes: ["length"],
    standard: true
  },
  cube: {
    label: "DND5E.TARGET.Type.Cube.Label",
    counted: "DND5E.TARGET.Type.Cube.Counted",
    template: "rect",
    sizes: ["width"],
    standard: true
  },
  cylinder: {
    label: "DND5E.TARGET.Type.Cylinder.Label",
    counted: "DND5E.TARGET.Type.Cylinder.Counted",
    template: "circle",
    sizes: ["radius", "height"],
    standard: true
  },
  line: {
    label: "DND5E.TARGET.Type.Line.Label",
    counted: "DND5E.TARGET.Type.Line.Counted",
    template: "ray",
    sizes: ["length", "width"],
    standard: true
  },
  radius: {
    label: "DND5E.TARGET.Type.Emanation.Label",
    counted: "DND5E.TARGET.Type.Emanation.Counted",
    template: "circle",
    standard: true
  },
  sphere: {
    label: "DND5E.TARGET.Type.Sphere.Label",
    counted: "DND5E.TARGET.Type.Sphere.Counted",
    template: "circle",
    sizes: ["radius"],
    standard: true
  },
  square: {
    label: "DND5E.TARGET.Type.Square.Label",
    counted: "DND5E.TARGET.Type.Square.Counted",
    template: "rect",
    sizes: ["width"]
  },
  wall: {
    label: "DND5E.TARGET.Type.Wall.Label",
    counted: "DND5E.TARGET.Type.Wall.Counted",
    template: "ray",
    sizes: ["length", "thickness", "height"]
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

Object.defineProperty(DND5E, "areaTargetOptions", {
  get() {
    const { primary, secondary } = Object.entries(this.areaTargetTypes).reduce((obj, [value, data]) => {
      const entry = { value, label: data.label };
      if ( data.standard ) obj.primary.push(entry);
      else obj.secondary.push(entry);
      return obj;
    }, { primary: [], secondary: [] });
    return [{ value: "", label: "" }, ...primary, { rule: true }, ...secondary];
  }
});

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
DND5E.targetTypes = {
  ...Object.fromEntries(Object.entries(DND5E.individualTargetTypes).map(([k, v]) => [k, v.label])),
  ...Object.fromEntries(Object.entries(DND5E.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
DND5E.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Types of rests.
 * @enum {RestTypeConfiguration}
 */
DND5E.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    },
    label: "DND5E.REST.Short.Label",
    icon: "fa-solid fa-utensils",
    dialogClass: ShortRestDialog,
    activationPeriods: ["shortRest"],
    recoverPeriods: ["sr"],
    recoverSpellSlotTypes: new Set(["pact"])
  },
  long: {
    duration: {
      normal: 480,
      gritty: 10_080,
      epic: 60
    },
    exhaustionDelta: -1,
    label: "DND5E.REST.Long.Label",
    icon: "fa-solid fa-campground",
    dialogClass: LongRestDialog,
    newDay: true,
    activationPeriods: ["longRest"],
    recoverHitDice: true,
    recoverHitPoints: true,
    recoverPeriods: ["lr", "sr"],
    recoverSpellSlotTypes: new Set(["spell", "pact"]),
    recoverTemp: true,
    recoverTempMax: true
  }
};
preLocalize("restTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {SenseConfiguration}
 */
DND5E.senses = {
  blindsight: {
    label: "DND5E.SenseBlindsight",
    detectionMode: "blindsight"
  },
  darkvision: {
    label: "DND5E.SenseDarkvision",
    grantsSight: true,
    visionMode: "darkvision"
  },
  tremorsense: {
    label: "DND5E.SenseTremorsense",
    detectionMode: "feelTremor"
  },
  truesight: {
    label: "DND5E.SenseTruesight",
    detectionMode: "seeAll",
    grantsSight: true,
    visionMode: "darkvision"
  }
};
preLocalize("senses", { key: "label", sort: true });
patchConfig("senses", "label", { since: "DnD5e 6.0", until: "DnD5e 6.2" });

/* -------------------------------------------- */
/*  Attacks                                     */
/* -------------------------------------------- */

/**
 * Classifications of attacks based on what is performing them.
 * @enum {{ label: string }}
 */
DND5E.attackClassifications = {
  weapon: {
    label: "DND5E.ATTACK.Classification.Weapon"
  },
  spell: {
    label: "DND5E.ATTACK.Classification.Spell"
  },
  unarmed: {
    label: "DND5E.ATTACK.Classification.Unarmed"
  }
};
preLocalize("attackClassifications", { key: "label" });

/* -------------------------------------------- */

/**
 * Attack modes available for weapons.
 * @enum {string}
 */
DND5E.attackModes = Object.seal({
  oneHanded: {
    label: "DND5E.ATTACK.Mode.OneHanded"
  },
  twoHanded: {
    label: "DND5E.ATTACK.Mode.TwoHanded"
  },
  offhand: {
    label: "DND5E.ATTACK.Mode.Offhand"
  },
  ranged: {
    label: "DND5E.ATTACK.Mode.Ranged"
  },
  thrown: {
    label: "DND5E.ATTACK.Mode.Thrown"
  },
  "thrown-offhand": {
    label: "DND5E.ATTACK.Mode.ThrownOffhand"
  }
});
preLocalize("attackModes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of attacks based on range.
 * @enum {{ label: string }}
 */
DND5E.attackTypes = Object.seal({
  melee: {
    label: "DND5E.ATTACK.Type.Melee"
  },
  ranged: {
    label: "DND5E.ATTACK.Type.Ranged"
  }
});
preLocalize("attackTypes", { key: "label" });

/* -------------------------------------------- */
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {SpellcastingTable5e}
 */
const SPELL_SLOT_TABLE = DND5E.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Define the pact slot & level progression by pact caster level.
 * @type {SpellcastingTableSingle5e}
 */
const pactCastingProgression = DND5E.pactCastingProgression = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 }
};

/* -------------------------------------------- */

/**
 * @typedef {Partial<
 *   SpellcastingModelData & SlotSpellcastingData & SingleLevelSpellcastingData & MultiLevelSpellcasting
 * >} SpellcastingMethod5e
 * @property {SpellcastingTable5e|SpellcastingTableSingle5e} [table]
 */

/**
 * Available spellcasting methods.
 * @type {Record<string, SpellcastingMethod5e>}
 */
DND5E.spellcasting = {
  atwill: {
    label: "DND5E.SPELLCASTING.METHODS.AtWill.label",
    order: -30
  },
  innate: {
    label: "DND5E.SPELLCASTING.METHODS.Innate.label",
    order: -20
  },
  ritual: {
    label: "DND5E.SPELLCASTING.METHODS.Ritual.label",
    order: -10
  },
  pact: {
    label: "DND5E.SPELLCASTING.METHODS.Pact.label",
    type: "single",
    cantrips: true,
    prepares: true,
    order: 10,
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    table: pactCastingProgression,
    progression: {
      pact: {
        label: "DND5E.SPELLCASTING.METHODS.Pact.Full.label",
        divisor: 1
      }
    }
  },
  spell: {
    label: "DND5E.SPELLCASTING.METHODS.Spell.label",
    type: "multi",
    cantrips: true,
    prepares: true,
    order: 20,
    img: "systems/dnd5e/icons/spell-tiers/{id}.webp",
    table: SPELL_SLOT_TABLE,
    progression: {
      full: {
        label: "DND5E.SPELLCASTING.METHODS.Spell.Full.label",
        divisor: 1
      },
      half: {
        label: "DND5E.SPELLCASTING.METHODS.Spell.Half.label",
        divisor: 2,
        roundUp: true
      },
      third: {
        label: "DND5E.SPELLCASTING.METHODS.Spell.Third.label",
        divisor: 3
      },
      artificer: {
        label: "DND5E.SPELLCASTING.METHODS.Spell.Artificer.label",
        divisor: 2,
        roundUp: true
      }
    }
  }
};
preLocalize("spellcasting", { key: "label" });
preLocalize("spellcasting.spell.progression", { key: "label" });
preLocalize("spellcasting.pact.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Spell preparation states.
 * @type {Record<string, SpellcastingPreparationState5e>}
 */
DND5E.spellPreparationStates = {
  unprepared: {
    label: "DND5E.SPELLCASTING.STATES.Unprepared",
    value: 0
  },
  prepared: {
    label: "DND5E.SPELLCASTING.STATES.Prepared",
    value: 1
  },
  always: {
    label: "DND5E.SPELLCASTING.STATES.AlwaysPrepared",
    value: 2
  }
};
preLocalize("spellPreparationStates", { key: "label" });

/* -------------------------------------------- */

/**
 * Spell lists that will be registered by the system during init.
 * Varlyn spell lists will be added here once the varlyn-spells compendium pack is created (Phase 3.8).
 * @type {string[]}
 */
DND5E.SPELL_LISTS = Object.freeze([]);

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
DND5E.spellLevels = {
  0: "DND5E.SpellLevel0",
  1: "DND5E.SpellLevel1",
  2: "DND5E.SpellLevel2",
  3: "DND5E.SpellLevel3",
  4: "DND5E.SpellLevel4",
  5: "DND5E.SpellLevel5",
  6: "DND5E.SpellLevel6",
  7: "DND5E.SpellLevel7",
  8: "DND5E.SpellLevel8",
  9: "DND5E.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
DND5E.spellScalingModes = {
  none: "DND5E.SpellNone",
  cantrip: "DND5E.SpellCantrip",
  level: "DND5E.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
DND5E.spellSchools = {
  abj: {
    label: "DND5E.SchoolAbj",
    icon: "systems/dnd5e/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration"
  },
  con: {
    label: "DND5E.SchoolCon",
    icon: "systems/dnd5e/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration"
  },
  div: {
    label: "DND5E.SchoolDiv",
    icon: "systems/dnd5e/icons/svg/schools/divination.svg",
    fullKey: "divination"
  },
  enc: {
    label: "DND5E.SchoolEnc",
    icon: "systems/dnd5e/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment"
  },
  evo: {
    label: "DND5E.SchoolEvo",
    icon: "systems/dnd5e/icons/svg/schools/evocation.svg",
    fullKey: "evocation"
  },
  ill: {
    label: "DND5E.SchoolIll",
    icon: "systems/dnd5e/icons/svg/schools/illusion.svg",
    fullKey: "illusion"
  },
  nec: {
    label: "DND5E.SchoolNec",
    icon: "systems/dnd5e/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy"
  },
  trs: {
    label: "DND5E.SchoolTrs",
    icon: "systems/dnd5e/icons/svg/schools/transmutation.svg",
    fullKey: "transmutation"
  }
};
preLocalize("spellSchools", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of spell lists.
 * @enum {string}
 */
DND5E.spellListTypes = {
  class: "TYPES.Item.class",
  subclass: "TYPES.Item.subclass",
  background: "TYPES.Item.background",
  race: "TYPES.Item.race",
  other: "JOURNALENTRYPAGE.DND5E.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `DND5E.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
DND5E.spellScrollIds = {
};

/* -------------------------------------------- */

/**
 * Spell scroll save DCs and attack bonus values based on spell level. If matching level isn't found,
 * then the nearest level lower than it will be selected.
 * @enum {SpellScrollValues}
 */
DND5E.spellScrollValues = {
  0: { dc: 13, bonus: 5 },
  3: { dc: 15, bonus: 7 },
  5: { dc: 17, bonus: 9 },
  7: { dc: 18, bonus: 10 },
  9: { dc: 19, bonus: 11 }
};

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
DND5E.sourcePacks = {};

/* -------------------------------------------- */

/**
 * Settings that configuration how actors are changed when transformation is applied.
 * @typedef {TransformationConfiguration}
 */
DND5E.transformation = {
  effects: {
    all: {
      label: "DND5E.TRANSFORM.Setting.Effects.All.Label",
      hint: "DND5E.TRANSFORM.Setting.Effects.All.Hint",
      disables: ["effects.*"]
    },
    origin: {
      label: "DND5E.TRANSFORM.Setting.Effects.Origin.Label",
      hint: "DND5E.TRANSFORM.Setting.Effects.Origin.Hint",
      default: true
    },
    otherOrigin: {
      label: "DND5E.TRANSFORM.Setting.Effects.OtherOrigin.Label",
      hint: "DND5E.TRANSFORM.Setting.Effects.OtherOrigin.Hint",
      default: true
    },
    background: {
      label: "DND5E.TRANSFORM.Setting.Effects.Background.Label",
      default: true
    },
    class: {
      label: "DND5E.TRANSFORM.Setting.Effects.Class.Label",
      default: true
    },
    feat: {
      label: "DND5E.TRANSFORM.Setting.Effects.Feature.Label",
      default: true
    },
    equipment: {
      label: "DND5E.TRANSFORM.Setting.Effects.Equipment.Label",
      default: true
    },
    spell: {
      label: "DND5E.TRANSFORM.Setting.Effects.Spell.Label",
      default: true
    }
  },
  keep: {
    physical: {
      label: "DND5E.TRANSFORM.Setting.Keep.Physical.Label",
      hint: "DND5E.TRANSFORM.Setting.Keep.Physical.Hint"
    },
    mental: {
      label: "DND5E.TRANSFORM.Setting.Keep.Mental.Label",
      hint: "DND5E.TRANSFORM.Setting.Keep.Mental.Hint"
    },
    saves: {
      label: "DND5E.TRANSFORM.Setting.Keep.Saves.Label",
      disables: ["merge.saves"]
    },
    skills: {
      label: "DND5E.TRANSFORM.Setting.Keep.Skills.Label",
      disables: ["merge.skills"]
    },
    gearProf: {
      label: "DND5E.TRANSFORM.Setting.Keep.GearProficiency.Label"
    },
    languages: {
      label: "DND5E.TRANSFORM.Setting.Keep.Languages.Label"
    },
    class: {
      label: "DND5E.TRANSFORM.Setting.Keep.Proficiency.Label"
    },
    feats: {
      label: "DND5E.TRANSFORM.Setting.Keep.Features.Label"
    },
    items: {
      label: "DND5E.TRANSFORM.Setting.Keep.Equipment.Label"
    },
    spells: {
      label: "DND5E.TRANSFORM.Setting.Keep.Spells.Label"
    },
    bio: {
      label: "DND5E.TRANSFORM.Setting.Keep.Biography.Label"
    },
    type: {
      label: "DND5E.TRANSFORM.Setting.Keep.CreatureType.Label"
    },
    hp: {
      label: "DND5E.TRANSFORM.Setting.Keep.Health.Label"
    },
    tempHP: {
      label: "DND5E.TRANSFORM.Setting.Keep.TempHP.Label"
    },
    resistances: {
      label: "DND5E.TRANSFORM.Setting.Keep.Resistances.Label"
    },
    vision: {
      label: "DND5E.TRANSFORM.Setting.Keep.Vision.Label",
      default: true
    },
    self: {
      label: "DND5E.TRANSFORM.Setting.Keep.Self.Label",
      hint: "DND5E.TRANSFORM.Setting.Keep.Self.Hint",
      disables: ["keep.*", "merge.*", "minimumAC", "tempFormula"]
    }
  },
  merge: {
    saves: {
      label: "DND5E.TRANSFORM.Setting.Merge.Saves.Label",
      disables: ["keep.saves"]
    },
    skills: {
      label: "DND5E.TRANSFORM.Setting.Merge.Skills.Label",
      disables: ["keep.skills"]
    }
  },
  other: {},
  presets: {
    wildshape: {
      icon: '<i class="fas fa-paw" inert></i>',
      label: "DND5E.TRANSFORM.Preset.WildShape.Label",
      settings: {
        effects: new Set(["otherOrigin", "origin", "feat", "spell", "class"]),
        keep: new Set(["bio", "class", "feats", "hp", "languages", "mental", "tempHP", "type"]),
        merge: new Set(["saves", "skills"]),
        minimumAC: "(13 + @abilities.wis.mod) * sign(@subclasses.moon.levels)",
        spellLists: new Set(["subclass:moon"]),
        tempFormula: "max(@classes.druid.levels, @subclasses.moon.levels * 3)"
      }
    },
    polymorph: {
      icon: '<i class="fas fa-pastafarianism" inert></i>',
      label: "DND5E.TRANSFORM.Preset.Polymorph.Label",
      settings: {
        effects: new Set(["otherOrigin", "origin", "spell"]),
        keep: new Set(["hp", "type"]),
        tempFormula: "@source.attributes.hp.max"
      }
    },
    polymorphSelf: {
      icon: '<i class="fas fa-eye" inert></i>',
      label: "DND5E.TRANSFORM.Preset.Appearance.Label",
      settings: {
        effects: new Set(["all"]),
        keep: new Set(["self"])
      }
    }
  }
};
preLocalize("transformation.effects", { keys: ["label", "hint"] });
preLocalize("transformation.keep", { keys: ["label", "hint"] });
preLocalize("transformation.merge", { keys: ["label", "hint"] });
preLocalize("transformation.other", { keys: ["label", "hint"], sort: true });
preLocalize("transformation.presets", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
DND5E.proficiencyLevels = {
  0: "DND5E.NotProficient",
  1: "DND5E.Proficient",
  0.5: "DND5E.HalfProficient",
  2: "DND5E.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
DND5E.weaponAndArmorProficiencyLevels = {
  0: "DND5E.NotProficient",
  1: "DND5E.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
DND5E.cover = {
  0: "DND5E.None",
  .5: "DND5E.CoverHalf",
  .75: "DND5E.CoverThreeQuarters",
  1: "DND5E.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
DND5E.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses",
  "attributes.spell.attack", "attributes.spell.dc", "attributes.spell.level", "details.cr",
  "details.xp.value", "skills.*.passive", "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
DND5E.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
DND5E.conditionTypes = {
  bleeding: {
    name: "EFFECT.DND5E.StatusBleeding",
    img: "systems/dnd5e/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    name: "DND5E.ConBlinded",
    img: "systems/dnd5e/icons/svg/statuses/blinded.svg",
    special: "BLIND"
  },
  burning: {
    name: "EFFECT.DND5E.StatusBurning",
    img: "systems/dnd5e/icons/svg/statuses/burning.svg",
    pseudo: true
  },
  charmed: {
    name: "DND5E.ConCharmed",
    img: "systems/dnd5e/icons/svg/statuses/charmed.svg"
  },
  cursed: {
    name: "EFFECT.DND5E.StatusCursed",
    img: "systems/dnd5e/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  dehydration: {
    name: "EFFECT.DND5E.StatusDehydration",
    img: "systems/dnd5e/icons/svg/statuses/dehydration.svg",
    pseudo: true
  },
  deafened: {
    name: "DND5E.ConDeafened",
    img: "systems/dnd5e/icons/svg/statuses/deafened.svg"
  },
  diseased: {
    name: "DND5E.ConDiseased",
    img: "systems/dnd5e/icons/svg/statuses/diseased.svg",
    pseudo: true
  },
  exhaustion: {
    name: "DND5E.ConExhaustion",
    img: "systems/dnd5e/icons/svg/statuses/exhaustion.svg",
    levels: 6,
    reduction: { rolls: 2, speed: 5 }
  },
  falling: {
    name: "EFFECT.DND5E.StatusFalling",
    img: "systems/dnd5e/icons/svg/statuses/falling.svg",
    pseudo: true
  },
  frightened: {
    name: "DND5E.ConFrightened",
    img: "systems/dnd5e/icons/svg/statuses/frightened.svg"
  },
  grappled: {
    name: "DND5E.ConGrappled",
    img: "systems/dnd5e/icons/svg/statuses/grappled.svg"
  },
  incapacitated: {
    name: "DND5E.ConIncapacitated",
    img: "systems/dnd5e/icons/svg/statuses/incapacitated.svg",
    neverBlockMovement: true
  },
  invisible: {
    name: "DND5E.ConInvisible",
    img: "systems/dnd5e/icons/svg/statuses/invisible.svg"
  },
  malnutrition: {
    name: "EFFECT.DND5E.StatusMalnutrition",
    img: "systems/dnd5e/icons/svg/statuses/malnutrition.svg",
    pseudo: true
  },
  paralyzed: {
    name: "DND5E.ConParalyzed",
    img: "systems/dnd5e/icons/svg/statuses/paralyzed.svg",
    statuses: ["incapacitated"]
  },
  petrified: {
    name: "DND5E.ConPetrified",
    img: "systems/dnd5e/icons/svg/statuses/petrified.svg",
    statuses: ["incapacitated"]
  },
  poisoned: {
    name: "DND5E.ConPoisoned",
    img: "systems/dnd5e/icons/svg/statuses/poisoned.svg"
  },
  prone: {
    name: "DND5E.ConProne",
    img: "systems/dnd5e/icons/svg/statuses/prone.svg"
  },
  restrained: {
    name: "DND5E.ConRestrained",
    img: "systems/dnd5e/icons/svg/statuses/restrained.svg"
  },
  silenced: {
    name: "EFFECT.DND5E.StatusSilenced",
    img: "systems/dnd5e/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    name: "DND5E.ConStunned",
    img: "systems/dnd5e/icons/svg/statuses/stunned.svg",
    statuses: ["incapacitated"]
  },
  suffocation: {
    name: "EFFECT.DND5E.StatusSuffocation",
    img: "systems/dnd5e/icons/svg/statuses/suffocation.svg",
    pseudo: true
  },
  surprised: {
    name: "EFFECT.DND5E.StatusSurprised",
    img: "systems/dnd5e/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    name: "EFFECT.DND5E.StatusTransformed",
    img: "systems/dnd5e/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    name: "DND5E.ConUnconscious",
    img: "systems/dnd5e/icons/svg/statuses/unconscious.svg",
    statuses: ["incapacitated"],
    riders: ["prone"]
  }
};
preLocalize("conditionTypes", { key: "name", sort: true });

/* -------------------------------------------- */

/**
 * Various effects of conditions and which conditions apply it. Either keys for the conditions,
 * and with a number appended for a level of exhaustion.
 * @enum {Set<string>}
 */
DND5E.conditionEffects = {
  noMovement: new Set(["exhaustion-5", "grappled", "paralyzed", "petrified", "restrained", "unconscious"]),
  halfMovement: new Set(["exhaustion-2"]),
  crawl: new Set(["prone", "exceedingCarryingCapacity"]),
  petrification: new Set(["petrified"]),
  halfHealth: new Set(["exhaustion-4"]),
  dehydrated: new Set(["dehydration"]),
  malnourished: new Set(["malnutrition"]),
  abilityCheckDisadvantage: new Set(["poisoned", "exhaustion-1"]),
  physicalCheckDisadvantage: new Set(["heavilyEncumbered"]),
  abilitySaveDisadvantage: new Set(["exhaustion-3"]),
  physicalSaveDisadvantage: new Set(["heavilyEncumbered"]),
  physicalAttackDisadvantage: new Set(["heavilyEncumbered"]),
  attackDisadvantage: new Set(["poisoned", "exhaustion-3"]),
  dexteritySaveDisadvantage: new Set(["restrained"]),
  dexteritySaveAdvantage: new Set(["dodging"]),
  initiativeAdvantage: new Set(["invisible"]),
  initiativeDisadvantage: new Set(["incapacitated", "surprised"])
};

/* -------------------------------------------- */

/**
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
 * data will be merged into the core data.
 * @enum {StatusEffectConfig5e}
 */
DND5E.statusEffects = {
  burrowing: {
    name: "EFFECT.DND5E.StatusBurrowing",
    img: "systems/dnd5e/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.DND5E.StatusConcentrating",
    img: "systems/dnd5e/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  coverHalf: {
    name: "EFFECT.DND5E.StatusHalfCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-half.svg",
    order: 2,
    exclusiveGroup: "cover",
    coverBonus: 2
  },
  coverThreeQuarters: {
    name: "EFFECT.DND5E.StatusThreeQuartersCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-three-quarters.svg",
    order: 3,
    exclusiveGroup: "cover",
    coverBonus: 5
  },
  coverTotal: {
    name: "EFFECT.DND5E.StatusTotalCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-total.svg",
    order: 4,
    exclusiveGroup: "cover"
  },
  dead: {
    name: "EFFECT.DND5E.StatusDead",
    img: "systems/dnd5e/icons/svg/statuses/dead.svg",
    special: "DEFEATED",
    order: 1,
    neverBlockMovement: true
  },
  dodging: {
    name: "EFFECT.DND5E.StatusDodging",
    img: "systems/dnd5e/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.DND5E.StatusEthereal",
    img: "systems/dnd5e/icons/svg/statuses/ethereal.svg",
    neverBlockMovement: true
  },
  flying: {
    name: "EFFECT.DND5E.StatusFlying",
    img: "systems/dnd5e/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.DND5E.StatusHiding",
    img: "systems/dnd5e/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.DND5E.StatusHovering",
    img: "systems/dnd5e/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.DND5E.StatusMarked",
    img: "systems/dnd5e/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.DND5E.StatusSleeping",
    img: "systems/dnd5e/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.DND5E.StatusStable",
    img: "systems/dnd5e/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */

/**
 * Status effects that never block token movement. Populated during the setup process.
 * @type {Set<string>}
 */
DND5E.neverBlockStatuses = new Set();

/* -------------------------------------------- */

/**
 * Configuration for the special bloodied status effect.
 * @type {{ name: string, icon: string, threshold: number }}
 */
DND5E.bloodied = {
  name: "EFFECT.DND5E.StatusBloodied",
  img: "systems/dnd5e/icons/svg/statuses/bloodied.svg",
  threshold: .5
};

/* -------------------------------------------- */
/*  Languages                                   */
/* -------------------------------------------- */

/**
 * Languages a character can learn.
 * @enum {object}
 */
DND5E.languages = {
  standard: {
    label: "DND5E.Language.Category.Standard",
    selectable: false,
    children: {
      common: "DND5E.Language.Language.Common",
      draconic: "DND5E.Language.Language.Draconic",
      dwarvish: "DND5E.Language.Language.Dwarvish",
      elvish: "DND5E.Language.Language.Elvish",
      giant: "DND5E.Language.Language.Giant",
      gnomish: "DND5E.Language.Language.Gnomish",
      goblin: "DND5E.Language.Language.Goblin",
      halfling: "DND5E.Language.Language.Halfling",
      orc: "DND5E.Language.Language.Orc",
      sign: "DND5E.Language.Language.CommonSign"
    }
  },
  exotic: {
    label: "DND5E.Language.Category.Rare",
    selectable: false,
    children: {
      aarakocra: "DND5E.Language.Language.Aarakocra",
      abyssal: "DND5E.Language.Language.Abyssal",
      cant: "DND5E.Language.Language.ThievesCant",
      celestial: "DND5E.Language.Language.Celestial",
      deep: "DND5E.Language.Language.DeepSpeech",
      druidic: "DND5E.Language.Language.Druidic",
      gith: "DND5E.Language.Language.Gith",
      gnoll: "DND5E.Language.Language.Gnoll",
      infernal: "DND5E.Language.Language.Infernal",
      primordial: {
        label: "DND5E.Language.Language.Primordial",
        children: {
          aquan: "DND5E.Language.Language.Aquan",
          auran: "DND5E.Language.Language.Auran",
          ignan: "DND5E.Language.Language.Ignan",
          terran: "DND5E.Language.Language.Terran"
        }
      },
      sylvan: "DND5E.Language.Language.Sylvan",
      undercommon: "DND5E.Language.Language.Undercommon"
    }
  }
};
preLocalize("languages", { key: "label" });
preLocalize("languages.standard.children", { key: "label", sort: true });
preLocalize("languages.exotic.children", { key: "label", sort: true });
preLocalize("languages.exotic.children.primordial.children", { sort: true });

/* -------------------------------------------- */

/**
 * Communication types that take ranges such as telepathy.
 * @enum {{ label: string }}
 */
DND5E.communicationTypes = {
  telepathy: {
    label: "DND5E.Language.Communication.Telepathy"
  }
};
preLocalize("communicationTypes", { key: "label" });

/* -------------------------------------------- */
/*  Habitats & Treasure                         */
/* -------------------------------------------- */

/**
 * NPC habitats.
 * @enum {HabitatConfiguration5e}
 */
DND5E.habitats = {
  any: {
    label: "DND5E.Habitat.Categories.Any"
  },
  arctic: {
    label: "DND5E.Habitat.Categories.Arctic"
  },
  coastal: {
    label: "DND5E.Habitat.Categories.Coastal"
  },
  desert: {
    label: "DND5E.Habitat.Categories.Desert"
  },
  forest: {
    label: "DND5E.Habitat.Categories.Forest"
  },
  grassland: {
    label: "DND5E.Habitat.Categories.Grassland"
  },
  hill: {
    label: "DND5E.Habitat.Categories.Hill"
  },
  mountain: {
    label: "DND5E.Habitat.Categories.Mountain"
  },
  planar: {
    label: "DND5E.Habitat.Categories.Planar",
    subtypes: true
  },
  swamp: {
    label: "DND5E.Habitat.Categories.Swamp"
  },
  underdark: {
    label: "DND5E.Habitat.Categories.Underdark"
  },
  underwater: {
    label: "DND5E.Habitat.Categories.Underwater"
  },
  urban: {
    label: "DND5E.Habitat.Categories.Urban"
  }
};
preLocalize("habitats", { key: "label" });

/* -------------------------------------------- */

/**
 * NPC Treasure
 * @enum {TreasureConfiguration5e}
 */
DND5E.treasure = {
  any: {
    label: "DND5E.Treasure.Categories.Any"
  },
  arcana: {
    label: "DND5E.Treasure.Categories.Arcana"
  },
  armaments: {
    label: "DND5E.Treasure.Categories.Armaments"
  },
  implements: {
    label: "DND5E.Treasure.Categories.Implements"
  },
  individual: {
    label: "DND5E.Treasure.Categories.Individual"
  },
  relics: {
    label: "DND5E.Treasure.Categories.Relics"
  }
};
preLocalize("treasure", { key: "label" });

/* -------------------------------------------- */
/*  Leveling & Experience                       */
/* -------------------------------------------- */

/**
 * Maximum allowed character level.
 * @type {number}
 */
DND5E.maxLevel = 20;

/* -------------------------------------------- */

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
DND5E.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/* -------------------------------------------- */

/**
 * Intervals above the maximum XP that result in an epic boon.
 * @type {number}
 */
DND5E.epicBoonInterval = 30000;

/* -------------------------------------------- */
/*  Traits                                      */
/* -------------------------------------------- */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
DND5E.traits = {
  saves: {
    labels: {
      title: "DND5E.ClassSaves",
      localization: "DND5E.TraitSavesPlural"
    },
    icon: "icons/magic/life/ankh-gold-blue.webp",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "DND5E.Skills",
      localization: "DND5E.TraitSkillsPlural"
    },
    icon: "icons/tools/instruments/harp-yellow-teal.webp",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true,
    dataType: MappingField
  },
  languages: {
    labels: {
      title: "DND5E.Languages",
      localization: "DND5E.TraitLanguagesPlural",
      all: "DND5E.Language.All"
    },
    icon: "icons/skills/social/diplomacy-peace-alliance.webp"
  },
  armor: {
    labels: {
      title: "DND5E.TraitArmorProf",
      localization: "DND5E.TraitArmorPlural"
    },
    icon: "icons/equipment/chest/breastplate-helmet-metal.webp",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "DND5E.TraitWeaponProf",
      localization: "DND5E.TraitWeaponPlural"
    },
    icon: "icons/skills/melee/weapons-crossed-swords-purple.webp",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] },
    mastery: true
  },
  tool: {
    labels: {
      title: "DND5E.TraitToolProf",
      localization: "DND5E.TraitToolPlural"
    },
    icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
    actorKeyPath: "system.tools",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["tools"] },
    sortCategories: true,
    expertise: true,
    dataType: MappingField
  },
  di: {
    labels: {
      title: "DND5E.DamImm",
      localization: "DND5E.TraitDIPlural",
      all: "DND5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "DND5E.DamRes",
      localization: "DND5E.TraitDRPlural",
      all: "DND5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "DND5E.DamVuln",
      localization: "DND5E.TraitDVPlural",
      all: "DND5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  dm: {
    labels: {
      title: "DND5E.DamMod",
      localization: "DND5E.TraitDMPlural",
      all: "DND5E.DAMAGE.All"
    },
    configKey: "damageTypes",
    dataType: Number
  },
  ci: {
    labels: {
      title: "DND5E.ConImm",
      localization: "DND5E.TraitCIPlural"
    },
    icon: "systems/dnd5e/icons/svg/trait-condition-immunities.svg",
    configKey: "conditionTypes",
    labelKeyPath: "name"
  }
};
preLocalize("traits", { keys: ["labels.title", "labels.all"] });

/* -------------------------------------------- */

/**
 * Modes used within a trait advancement.
 * @enum {{ label: string, hint: string }}
 */
DND5E.traitModes = {
  default: {
    label: "DND5E.ADVANCEMENT.Trait.Mode.Default.Label",
    hint: "DND5E.ADVANCEMENT.Trait.Mode.Default.Hint"
  },
  expertise: {
    label: "DND5E.ADVANCEMENT.Trait.Mode.Expertise.Label",
    hint: "DND5E.ADVANCEMENT.Trait.Mode.Expertise.Hint"
  },
  forcedExpertise: {
    label: "DND5E.ADVANCEMENT.Trait.Mode.Force.Label",
    hint: "DND5E.ADVANCEMENT.Trait.Mode.Force.Hint"
  },
  upgrade: {
    label: "DND5E.ADVANCEMENT.Trait.Mode.Upgrade.Label",
    hint: "DND5E.ADVANCEMENT.Trait.Mode.Upgrade.Hint"
  },
  mastery: {
    label: "DND5E.ADVANCEMENT.Trait.Mode.Mastery.Label",
    hint: "DND5E.ADVANCEMENT.Trait.Mode.Mastery.Hint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfiguration}
 */
DND5E.characterFlags = {
  diamondSoul: {
    name: "DND5E.FlagsDiamondSoul",
    hint: "DND5E.FlagsDiamondSoulHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  enhancedDualWielding: {
    name: "DND5E.FLAGS.EnhancedDualWielding.Name",
    hint: "DND5E.FLAGS.EnhancedDualWielding.Hint",
    section: "DND5E.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "DND5E.FlagsElvenAccuracy",
    hint: "DND5E.FlagsElvenAccuracyHint",
    section: "DND5E.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "DND5E.FlagsHalflingLucky",
    hint: "DND5E.FlagsHalflingLuckyHint",
    section: "DND5E.RacialTraits",
    type: Boolean
  },
  halflingNimbleness: {
    name: "DND5E.FlagsHalflingNimbleness",
    hint: "DND5E.FlagsHalflingNimblenessHint",
    section: "DND5E.RacialTraits",
    type: Boolean
  },
  ignoreArmorSpeedReduction: {
    name: "DND5E.FLAGS.IgnoreArmorSpeedReduction.Name",
    hint: "DND5E.FLAGS.IgnoreArmorSpeedReduction.Hint",
    section: "DND5E.RacialTraits",
    type: Boolean
  },
  initiativeAlert: {
    name: "DND5E.FlagsAlert",
    hint: "DND5E.FlagsAlertHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "DND5E.FlagsJOAT",
    hint: "DND5E.FlagsJOATHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "DND5E.FlagsObservant",
    hint: "DND5E.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "DND5E.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "DND5E.FlagsTavernBrawler",
    hint: "DND5E.FlagsTavernBrawlerHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "DND5E.FlagsPowerfulBuild",
    hint: "DND5E.FlagsPowerfulBuildHint",
    section: "DND5E.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "DND5E.FlagsReliableTalent",
    hint: "DND5E.FlagsReliableTalentHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "DND5E.FlagsRemarkableAthlete",
    hint: "DND5E.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    skills: ["ath"],
    section: "DND5E.Feats",
    type: Boolean
  },
  toolExpertise: {
    name: "DND5E.FlagsToolExpertise",
    hint: "DND5E.FlagsToolExpertiseHint",
    section: "DND5E.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "DND5E.FlagsWeaponCritThreshold",
    hint: "DND5E.FlagsWeaponCritThresholdHint",
    section: "DND5E.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "DND5E.FlagsSpellCritThreshold",
    hint: "DND5E.FlagsSpellCritThresholdHint",
    section: "DND5E.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "DND5E.FlagsMeleeCriticalDice",
    hint: "DND5E.FlagsMeleeCriticalDiceHint",
    section: "DND5E.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/* -------------------------------------------- */

/**
 * Configuration information for activity types.
 * @enum {ActivityTypeConfiguration}
 */
DND5E.activityTypes = {
  attack: {
    documentClass: activities.AttackActivity
  },
  cast: {
    documentClass: activities.CastActivity
  },
  check: {
    documentClass: activities.CheckActivity
  },
  damage: {
    documentClass: activities.DamageActivity
  },
  enchant: {
    documentClass: activities.EnchantActivity
  },
  forward: {
    documentClass: activities.ForwardActivity
  },
  heal: {
    documentClass: activities.HealActivity
  },
  save: {
    documentClass: activities.SaveActivity
  },
  summon: {
    documentClass: activities.SummonActivity
  },
  transform: {
    documentClass: activities.TransformActivity
  },
  utility: {
    documentClass: activities.UtilityActivity
  }
};

/* -------------------------------------------- */

const _ALL_ITEM_TYPES = ["class", "feat", "race", "subclass"];

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
DND5E.advancementTypes = {
  AbilityScoreImprovement: {
    documentClass: advancement.AbilityScoreImprovementAdvancement,
    validItemTypes: new Set(["class", "race", "feat"])
  },
  HitPoints: {
    documentClass: advancement.HitPointsAdvancement,
    validItemTypes: new Set(["class"])
  },
  ItemChoice: {
    documentClass: advancement.ItemChoiceAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ItemGrant: {
    documentClass: advancement.ItemGrantAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ModifyItem: {
    documentClass: advancement.ModifyItemAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ScaleValue: {
    documentClass: advancement.ScaleValueAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  Size: {
    documentClass: advancement.SizeAdvancement,
    validItemTypes: new Set(["race"])
  },
  Subclass: {
    documentClass: advancement.SubclassAdvancement,
    validItemTypes: new Set(["class"])
  },
  Trait: {
    documentClass: advancement.TraitAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  }
};

/* -------------------------------------------- */

/**
 * Default artwork configuration for each Document type and sub-type.
 * @enum {Record<string, string>}
 */
DND5E.defaultArtwork = {
  ActiveEffect: {
    base: "systems/dnd5e/icons/svg/active-effects/base.svg",
    enchantment: "systems/dnd5e/icons/svg/active-effects/enchantment.svg"
  },
  Actor: {
    character: "systems/dnd5e/icons/svg/actors/character.svg",
    encounter: "systems/dnd5e/icons/svg/actors/encounter.svg",
    group: "systems/dnd5e/icons/svg/actors/group.svg",
    npc: "systems/dnd5e/icons/svg/actors/npc.svg",
    vehicle: "systems/dnd5e/icons/svg/actors/vehicle.svg"
  },
  Item: {
    class: "systems/dnd5e/icons/svg/items/class.svg",
    consumable: "systems/dnd5e/icons/svg/items/consumable.svg",
    container: "systems/dnd5e/icons/svg/items/container.svg",
    equipment: "systems/dnd5e/icons/svg/items/equipment.svg",
    feat: "systems/dnd5e/icons/svg/items/feature.svg",
    race: "systems/dnd5e/icons/svg/items/race.svg",
    spell: "systems/dnd5e/icons/svg/items/spell.svg",
    subclass: "systems/dnd5e/icons/svg/items/subclass.svg",
    tool: "systems/dnd5e/icons/svg/items/tool.svg",
    weapon: "systems/dnd5e/icons/svg/items/weapon.svg"
  }
};

/* -------------------------------------------- */
/*  Calendar                                    */
/* -------------------------------------------- */

/**
 * Configuration information for the calendar UI.
 * @type {CalendarHUDConfiguration}
 */
DND5E.calendar = {
  application: CalenderHUD,
  calendars: [
    {
      value: "gregorian",
      label: "DND5E.CALENDAR.Gregorian",
      config: foundry.data.SIMPLIFIED_GREGORIAN_CALENDAR_CONFIG
    }
  ],
  formatters: [
    {
      value: "monthDay",
      label: "DND5E.CALENDAR.Formatters.MonthDay.Label",
      formatter: "formatMonthDay",
      group: "DND5E.CALENDAR.Formatters.Date"
    },
    {
      value: "monthDayYear",
      label: "DND5E.CALENDAR.Formatters.MonthDayYear.Label",
      formatter: "formatMonthDayYear",
      group: "DND5E.CALENDAR.Formatters.Date"
    },
    {
      value: "approximateDate",
      label: "DND5E.CALENDAR.Formatters.ApproximateDate.Label",
      formatter: "formatApproximateDate",
      group: "DND5E.CALENDAR.Formatters.Date"
    },
    {
      value: "hoursMinutes",
      label: "DND5E.CALENDAR.Formatters.HoursMinutes.Label",
      formatter: "formatHoursMinutes",
      group: "DND5E.CALENDAR.Formatters.Time"
    },
    {
      value: "hoursMinutesSeconds",
      label: "DND5E.CALENDAR.Formatters.HoursMinutesSeconds.Label",
      formatter: "formatHoursMinutesSeconds",
      group: "DND5E.CALENDAR.Formatters.Time"
    },
    {
      value: "approximateTime",
      label: "DND5E.CALENDAR.Formatters.ApproximateTime.Label",
      formatter: "formatApproximateTime",
      group: "DND5E.CALENDAR.Formatters.Time"
    }
  ]
};
preLocalize("calendar.calendars", { keys: ["label", "group"] });
preLocalize("calendar.formatters", { keys: ["label", "group"] });

/* -------------------------------------------- */
/*  Requests                                    */
/* -------------------------------------------- */

/**
 * Handler functions for named request/response operations
 * @type {Record<string, RequestCallback5e>}
 */
DND5E.requests = {
  rest: Actor5e.handleRestRequest,
  skill: Actor5e.handleSkillCheckRequest
};

/* -------------------------------------------- */
/*  Rules                                       */
/* -------------------------------------------- */

/**
 * Types of rules that can be used in rule pages and the &Reference enricher.
 * @enum {RuleTypeConfiguration}
 */
DND5E.ruleTypes = {
  ability: {
    label: "DND5E.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "DND5E.AreaOfEffect.Label",
    references: "areaTargetTypes"
  },
  condition: {
    label: "DND5E.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "DND5E.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "DND5E.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "DND5E.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "DND5E.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "DND5E.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "DND5E.SpellTag",
    references: "itemProperties"
  },
  weaponMastery: {
    label: "DND5E.WEAPON.Mastery.Label",
    references: "weaponMasteries"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
DND5E.rules = {
};

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
DND5E.themes = {
  light: "SHEETS.DND5E.THEME.Light",
  dark: "SHEETS.DND5E.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(DND5E, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(DND5E.abilities),
        damageTypes: Object.fromEntries(
          Object.keys({ ...DND5E.damageTypes, ...DND5E.healingTypes }).map(k => [slugify(k), k])
        ),
        languages: _flattenConfig(DND5E.languages, { labelKey: "label", skipEntry: (k, d) => d.selectable === false }),
        skills: foundry.utils.deepClone(DND5E.skills),
        spellSchools: foundry.utils.deepClone(DND5E.spellSchools),
        tools: foundry.utils.deepClone(DND5E.tools)
      };
      const addFullKeys = key => Object.entries(DND5E[key]).forEach(([k, v]) => {
        _enrichmentLookup[key][k].key = k;
        if ( v.fullKey ) _enrichmentLookup[key][slugify(v.fullKey)] = { ...v, key: k };
      });
      addFullKeys("abilities");
      addFullKeys("skills");
      addFullKeys("spellSchools");
      addFullKeys("tools");
    }
    return _enrichmentLookup;
  },
  enumerable: true
});

/* -------------------------------------------- */

/**
 * Create a flattened version of a nested config (such as CONFIG.DND5E.languages) so all leaf entries are at
 * a single level.
 * @param {object} config
 * @param {object} [options={}]
 * @param {string} [options.labelKey]        If provided, simplify all included objects to just the label.
 * @param {Function} [options.skipEntry]     Callback passed the key and data that should return a boolean to skip a
 *                                           category but not its children when creating flattened object.
 * @returns {object}
 */
function _flattenConfig(config, { labelKey, skipEntry }={}) {
  const obj = {};
  for ( const [key, data] of Object.entries(config) ) {
    if ( !skipEntry?.(key, data) ) {
      if ( labelKey && (foundry.utils.getType(data) === "Object") ) obj[key] = data[labelKey];
      else obj[key] = data;
    }
    if ( data.children ) Object.assign(obj, _flattenConfig(data.children, { labelKey, skipEntry }));
  }
  return obj;
}

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within DND5E that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.DND5E.${key} has been changed to an object.`
      +` The former value can be accessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(DND5E[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default DND5E;
