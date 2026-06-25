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
const VARLYN5E = {};

/* -------------------------------------------- */
/*  Abilities                                   */
/* -------------------------------------------- */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
VARLYN5E.abilities = {
  str: {
    label: "VARLYN5E.AbilityStr",
    abbreviation: "VARLYN5E.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    icon: "systems/dnd5e/icons/svg/abilities/strength.svg"
  },
  dex: {
    label: "VARLYN5E.AbilityDex",
    abbreviation: "VARLYN5E.AbilityDexAbbr",
    type: "physical",
    fullKey: "dexterity",
    icon: "systems/dnd5e/icons/svg/abilities/dexterity.svg"
  },
  con: {
    label: "VARLYN5E.AbilityCon",
    abbreviation: "VARLYN5E.AbilityConAbbr",
    type: "physical",
    fullKey: "constitution",
    icon: "systems/dnd5e/icons/svg/abilities/constitution.svg"
  },
  int: {
    label: "VARLYN5E.AbilityInt",
    abbreviation: "VARLYN5E.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    icon: "systems/dnd5e/icons/svg/abilities/intelligence.svg"
  },
  wis: {
    label: "VARLYN5E.AbilityWis",
    abbreviation: "VARLYN5E.AbilityWisAbbr",
    type: "mental",
    fullKey: "wisdom",
    icon: "systems/dnd5e/icons/svg/abilities/wisdom.svg"
  },
  cha: {
    label: "VARLYN5E.AbilityCha",
    abbreviation: "VARLYN5E.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    icon: "systems/dnd5e/icons/svg/abilities/charisma.svg"
  },
  luk: {
    label: "VARLYN5E.AbilityLuk",
    abbreviation: "VARLYN5E.AbilityLukAbbr",
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
VARLYN5E.defaultAbilities = {
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
VARLYN5E.maxAbilityScore = 20;

/* -------------------------------------------- */
/*  Skills                                      */
/* -------------------------------------------- */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
VARLYN5E.skills = {
  acr: {
    label: "VARLYN5E.SkillAcr",
    ability: "dex",
    fullKey: "acrobatics",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ani: {
    label: "VARLYN5E.SkillAni",
    ability: "wis",
    fullKey: "animalHandling",
    icon: "icons/environment/creatures/horse-brown.webp"
  },
  arc: {
    label: "VARLYN5E.SkillArc",
    ability: "int",
    fullKey: "arcana",
    icon: "icons/sundries/books/book-embossed-jewel-silver-green.webp"
  },
  ath: {
    label: "VARLYN5E.SkillAth",
    ability: "str",
    fullKey: "athletics",
    icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp"
  },
  dec: {
    label: "VARLYN5E.SkillDec",
    ability: "cha",
    fullKey: "deception",
    icon: "icons/magic/control/mouth-smile-deception-purple.webp"
  },
  his: {
    label: "VARLYN5E.SkillHis",
    ability: "int",
    fullKey: "history",
    icon: "icons/sundries/books/book-embossed-bound-brown.webp"
  },
  ins: {
    label: "VARLYN5E.SkillIns",
    ability: "wis",
    fullKey: "insight",
    icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp"
  },
  itm: {
    label: "VARLYN5E.SkillItm",
    ability: "cha",
    fullKey: "intimidation",
    icon: "icons/skills/social/intimidation-impressing.webp"
  },
  inv: {
    label: "VARLYN5E.SkillInv",
    ability: "int",
    fullKey: "investigation",
    icon: "icons/tools/scribal/magnifying-glass.webp"
  },
  med: {
    label: "VARLYN5E.SkillMed",
    ability: "wis",
    fullKey: "medicine",
    icon: "icons/tools/cooking/mortar-herbs-yellow.webp"
  },
  nat: {
    label: "VARLYN5E.SkillNat",
    ability: "int",
    fullKey: "nature",
    icon: "icons/magic/nature/plant-sprout-snow-green.webp"
  },
  prc: {
    label: "VARLYN5E.SkillPrc",
    ability: "wis",
    fullKey: "perception",
    icon: "icons/magic/perception/eye-ringed-green.webp",
    pace: {
      advantage: new Set(["slow"]),
      disadvantage: new Set(["fast"])
    }
  },
  prf: {
    label: "VARLYN5E.SkillPrf",
    ability: "cha",
    fullKey: "performance",
    icon: "icons/tools/instruments/lute-gold-brown.webp"
  },
  per: {
    label: "VARLYN5E.SkillPer",
    ability: "cha",
    fullKey: "persuasion",
    icon: "icons/skills/social/diplomacy-handshake.webp"
  },
  rel: {
    label: "VARLYN5E.SkillRel",
    ability: "int",
    fullKey: "religion",
    icon: "icons/magic/holy/saint-glass-portrait-halo.webp"
  },
  slt: {
    label: "VARLYN5E.SkillSlt",
    ability: "dex",
    fullKey: "sleightOfHand",
    icon: "icons/sundries/gaming/playing-cards.webp"
  },
  ste: {
    label: "VARLYN5E.SkillSte",
    ability: "dex",
    fullKey: "stealth",
    icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp",
    pace: {
      disadvantage: new Set(["normal", "fast"])
    }
  },
  sur: {
    label: "VARLYN5E.SkillSur",
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
VARLYN5E.skillPassive = {
  base: 10,
  modifier: 5
};

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
VARLYN5E.alignments = {
  lg: "VARLYN5E.AlignmentLG",
  ng: "VARLYN5E.AlignmentNG",
  cg: "VARLYN5E.AlignmentCG",
  ln: "VARLYN5E.AlignmentLN",
  tn: "VARLYN5E.AlignmentTN",
  cn: "VARLYN5E.AlignmentCN",
  le: "VARLYN5E.AlignmentLE",
  ne: "VARLYN5E.AlignmentNE",
  ce: "VARLYN5E.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
VARLYN5E.attunementTypes = {
  required: "VARLYN5E.AttunementRequired",
  optional: "VARLYN5E.AttunementOptional"
};
preLocalize("attunementTypes");

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
VARLYN5E.weaponTypes = {
  simpleM: "VARLYN5E.WeaponSimpleM",
  simpleR: "VARLYN5E.WeaponSimpleR",
  martialM: "VARLYN5E.WeaponMartialM",
  martialR: "VARLYN5E.WeaponMartialR",
  natural: "VARLYN5E.WeaponNatural",
  improv: "VARLYN5E.WeaponImprov",
  siege: "VARLYN5E.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
VARLYN5E.weaponProficiencies = {
  sim: "VARLYN5E.WeaponSimpleProficiency",
  mar: "VARLYN5E.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/* -------------------------------------------- */

/**
 * Weapon masteries.
 * @enum {WeaponMasterConfiguration}
 */
VARLYN5E.weaponMasteries = {
  cleave: {
    label: "VARLYN5E.WEAPON.Mastery.Cleave"
  },
  graze: {
    label: "VARLYN5E.WEAPON.Mastery.Graze"
  },
  nick: {
    label: "VARLYN5E.WEAPON.Mastery.Nick"
  },
  push: {
    label: "VARLYN5E.WEAPON.Mastery.Push"
  },
  sap: {
    label: "VARLYN5E.WEAPON.Mastery.Sap"
  },
  slow: {
    label: "VARLYN5E.WEAPON.Mastery.Slow"
  },
  topple: {
    label: "VARLYN5E.WEAPON.Mastery.Topple"
  },
  vex: {
    label: "VARLYN5E.WEAPON.Mastery.Vex"
  }
};
preLocalize("weaponMasteries", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * A mapping between `VARLYN5E.weaponTypes` and `VARLYN5E.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
VARLYN5E.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/* -------------------------------------------- */

/**
 * A mapping between `VARLYN5E.weaponTypes` and `VARLYN5E.attackClassifications`. Unlisted types are assumed to be
 * of the "weapon" classification.
 * @enum {string}
 */
VARLYN5E.weaponClassificationMap = {};

/* -------------------------------------------- */

/**
 * A mapping between `VARLYN5E.weaponTypes` and `VARLYN5E.attackTypes`.
 * @enum {string}
 */
VARLYN5E.weaponTypeMap = {
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
VARLYN5E.weaponIds = {
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
VARLYN5E.ammoIds = {
};

/* -------------------------------------------- */
/*  Tool Details                                */
/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
VARLYN5E.toolTypes = {
  art: "VARLYN5E.ToolArtisans",
  game: "VARLYN5E.ToolGamingSet",
  music: "VARLYN5E.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
VARLYN5E.toolProficiencies = {
  ...VARLYN5E.toolTypes,
  vehicle: "VARLYN5E.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * Configuration data for tools.
 * @enum {ToolConfiguration}
 */
VARLYN5E.tools = {
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
VARLYN5E.toolIds = new Proxy(VARLYN5E.tools, {
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
VARLYN5E.timeUnits = {
  turn: {
    label: "VARLYN5E.UNITS.TIME.Turn.Label",
    counted: "VARLYN5E.UNITS.TIME.Turn.Counted",
    conversion: .1,
    combat: true
  },
  round: {
    label: "VARLYN5E.UNITS.TIME.Round.Label",
    counted: "VARLYN5E.UNITS.TIME.Round.Counted",
    conversion: .1,
    combat: true
  },
  second: {
    label: "VARLYN5E.UNITS.TIME.Second.Label",
    conversion: 1 / 60,
    option: false,
    timeComponent: "second"
  },
  minute: {
    label: "VARLYN5E.UNITS.TIME.Minute.Label",
    conversion: 1,
    timeComponent: "minute"
  },
  hour: {
    label: "VARLYN5E.UNITS.TIME.Hour.Label",
    conversion: 60,
    timeComponent: "hour"
  },
  day: {
    label: "VARLYN5E.UNITS.TIME.Day.Label",
    conversion: 1_440,
    timeComponent: "day"
  },
  week: {
    label: "VARLYN5E.UNITS.TIME.Week.Label",
    conversion: 10_080,
    option: false
  },
  month: {
    label: "VARLYN5E.UNITS.TIME.Month.Label",
    conversion: 43_200
  },
  year: {
    label: "VARLYN5E.UNITS.TIME.Year.Label",
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
VARLYN5E.scalarTimePeriods = new Proxy(VARLYN5E.timeUnits, {
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
VARLYN5E.permanentTimePeriods = {
  disp: "VARLYN5E.TimeDisp",
  dstr: "VARLYN5E.TimeDispTrig",
  perm: "VARLYN5E.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
VARLYN5E.specialTimePeriods = {
  inst: "VARLYN5E.TimeInst",
  spec: "VARLYN5E.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
VARLYN5E.timePeriods = {
  ...VARLYN5E.specialTimePeriods,
  ...VARLYN5E.permanentTimePeriods,
  ...VARLYN5E.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
VARLYN5E.staticAbilityActivationTypes = {
  none: "VARLYN5E.NoneActionLabel",
  special: VARLYN5E.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
VARLYN5E.abilityActivationTypes = {
  ...VARLYN5E.staticAbilityActivationTypes,
  action: "VARLYN5E.Action",
  bonus: "VARLYN5E.BonusAction",
  reaction: "VARLYN5E.Reaction",
  minute: VARLYN5E.timePeriods.minute,
  hour: VARLYN5E.timePeriods.hour,
  day: VARLYN5E.timePeriods.day,
  legendary: "VARLYN5E.LegendaryAction.Label",
  mythic: "VARLYN5E.MythicActionLabel",
  lair: "VARLYN5E.LAIR.Action.Label",
  crew: "VARLYN5E.VEHICLE.Activation.Crew.label"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Configuration data for activation types on activities.
 * @enum {ActivityActivationTypeConfiguration}
 */
VARLYN5E.activityActivationTypes = {
  action: {
    label: "VARLYN5E.ACTIVATION.Type.Action.Label",
    header: "VARLYN5E.ACTIVATION.Type.Action.Header",
    group: "VARLYN5E.ACTIVATION.Category.Standard"
  },
  bonus: {
    label: "VARLYN5E.ACTIVATION.Type.BonusAction.Label",
    header: "VARLYN5E.ACTIVATION.Type.BonusAction.Header",
    group: "VARLYN5E.ACTIVATION.Category.Standard"
  },
  reaction: {
    label: "VARLYN5E.ACTIVATION.Type.Reaction.Label",
    header: "VARLYN5E.ACTIVATION.Type.Reaction.Header",
    group: "VARLYN5E.ACTIVATION.Category.Standard"
  },
  minute: {
    label: "VARLYN5E.ACTIVATION.Type.Minute.Label",
    header: "VARLYN5E.ACTIVATION.Type.Minute.Header",
    group: "VARLYN5E.ACTIVATION.Category.Time",
    scalar: true
  },
  hour: {
    label: "VARLYN5E.ACTIVATION.Type.Hour.Label",
    header: "VARLYN5E.ACTIVATION.Type.Hour.Header",
    group: "VARLYN5E.ACTIVATION.Category.Time",
    scalar: true
  },
  day: {
    label: "VARLYN5E.ACTIVATION.Type.Day.Label",
    header: "VARLYN5E.ACTIVATION.Type.Day.Header",
    group: "VARLYN5E.ACTIVATION.Category.Time",
    scalar: true
  },
  longRest: {
    label: "VARLYN5E.ACTIVATION.Type.LongRest.Label",
    group: "VARLYN5E.ACTIVATION.Category.Rest",
    passive: true
  },
  shortRest: {
    label: "VARLYN5E.ACTIVATION.Type.ShortRest.Label",
    group: "VARLYN5E.ACTIVATION.Category.Rest",
    passive: true
  },
  encounter: {
    label: "VARLYN5E.ACTIVATION.Type.Encounter.Label",
    group: "VARLYN5E.ACTIVATION.Category.Combat",
    passive: true
  },
  turnStart: {
    label: "VARLYN5E.ACTIVATION.Type.TurnStart.Label",
    group: "VARLYN5E.ACTIVATION.Category.Combat",
    passive: true
  },
  turnEnd: {
    label: "VARLYN5E.ACTIVATION.Type.TurnEnd.Label",
    group: "VARLYN5E.ACTIVATION.Category.Combat",
    passive: true
  },
  legendary: {
    counted: "VARLYN5E.ACTIVATION.Type.Legendary.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "VARLYN5E.ACTIVATION.Type.Legendary.Label",
    header: "VARLYN5E.ACTIVATION.Type.Legendary.Header",
    group: "VARLYN5E.ACTIVATION.Category.Monster",
    scalar: true
  },
  mythic: {
    counted: "VARLYN5E.ACTIVATION.Type.Mythic.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "VARLYN5E.ACTIVATION.Type.Mythic.Label",
    header: "VARLYN5E.ACTIVATION.Type.Mythic.Header",
    group: "VARLYN5E.ACTIVATION.Category.Monster",
    scalar: true
  },
  lair: {
    label: "VARLYN5E.ACTIVATION.Type.Lair.Label",
    header: "VARLYN5E.ACTIVATION.Type.Lair.Header",
    group: "VARLYN5E.ACTIVATION.Category.Monster"
  },
  special: {
    label: "VARLYN5E.Special",
    passive: true
  }
};
preLocalize("activityActivationTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
VARLYN5E.abilityConsumptionTypes = {
  ammo: "VARLYN5E.ConsumeAmmunition",
  attribute: "VARLYN5E.ConsumeAttribute",
  hitDice: "VARLYN5E.ConsumeHitDice",
  material: "VARLYN5E.ConsumeMaterial",
  charges: "VARLYN5E.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration information for different consumption targets.
 * @enum {ActivityConsumptionTargetConfiguration}
 */
VARLYN5E.activityConsumptionTypes = {
  activityUses: {
    label: "VARLYN5E.CONSUMPTION.Type.ActivityUses.Label",
    consume: ConsumptionTargetData.consumeActivityUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsActivityUses
  },
  itemUses: {
    label: "VARLYN5E.CONSUMPTION.Type.ItemUses.Label",
    consume: ConsumptionTargetData.consumeItemUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsItemUses,
    nonEmbeddedHint: "VARLYN5E.CONSUMPTION.Type.ItemUses.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validItemUsesTargets
  },
  material: {
    label: "VARLYN5E.CONSUMPTION.Type.Material.Label",
    consume: ConsumptionTargetData.consumeMaterial,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsMaterial,
    nonEmbeddedHint: "VARLYN5E.CONSUMPTION.Type.Material.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validMaterialTargets
  },
  hitDice: {
    label: "VARLYN5E.CONSUMPTION.Type.HitDice.Label",
    consume: ConsumptionTargetData.consumeHitDice,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsHitDice,
    validTargets: ConsumptionTargetData.validHitDiceTargets
  },
  spellSlots: {
    label: "VARLYN5E.CONSUMPTION.Type.SpellSlots.Label",
    consume: ConsumptionTargetData.consumeSpellSlots,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsSpellSlots,
    scalingModes: [{ value: "level", label: "VARLYN5E.CONSUMPTION.Scaling.SlotLevel" }],
    validTargets: ConsumptionTargetData.validSpellSlotsTargets
  },
  attribute: {
    label: "VARLYN5E.CONSUMPTION.Type.Attribute.Label",
    consume: ConsumptionTargetData.consumeAttribute,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsAttribute,
    nonEmbeddedHint: "VARLYN5E.CONSUMPTION.Type.Attribute.NonEmbeddedHint",
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
VARLYN5E.actorSizes = {
  tiny: {
    label: "VARLYN5E.SizeTiny",
    abbreviation: "VARLYN5E.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5,
    numerical: 0
  },
  sm: {
    label: "VARLYN5E.SizeSmall",
    abbreviation: "VARLYN5E.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8,
    numerical: 1
  },
  med: {
    label: "VARLYN5E.SizeMedium",
    abbreviation: "VARLYN5E.SizeMediumAbbr",
    hitDie: 8,
    numerical: 2
  },
  lg: {
    label: "VARLYN5E.SizeLarge",
    abbreviation: "VARLYN5E.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2,
    numerical: 3
  },
  huge: {
    label: "VARLYN5E.SizeHuge",
    abbreviation: "VARLYN5E.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4,
    numerical: 4
  },
  grg: {
    label: "VARLYN5E.SizeGargantuan",
    abbreviation: "VARLYN5E.SizeGargantuanAbbr",
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
VARLYN5E.tokenHPColors = {
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
VARLYN5E.tokenRingColors = {
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
VARLYN5E.tokenRulerColors = {
  normal: 0x33BC4E,
  double: 0xF1D836,
  triple: 0xE72124
};

/* -------------------------------------------- */

/**
 * Settings used to render map location markers on the canvas.
 * @enum {MapLocationMarkerStyle}
 */
VARLYN5E.mapLocationMarker = {
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
VARLYN5E.creatureTypes = {
  aberration: {
    label: "VARLYN5E.CreatureAberration",
    plural: "VARLYN5E.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    detectAlignment: true
  },
  beast: {
    label: "VARLYN5E.CreatureBeast",
    plural: "VARLYN5E.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp"
  },
  celestial: {
    label: "VARLYN5E.CreatureCelestial",
    plural: "VARLYN5E.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    detectAlignment: true
  },
  construct: {
    label: "VARLYN5E.CreatureConstruct",
    plural: "VARLYN5E.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp"
  },
  dragon: {
    label: "VARLYN5E.CreatureDragon",
    plural: "VARLYN5E.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp"
  },
  elemental: {
    label: "VARLYN5E.CreatureElemental",
    plural: "VARLYN5E.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    detectAlignment: true
  },
  fey: {
    label: "VARLYN5E.CreatureFey",
    plural: "VARLYN5E.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    detectAlignment: true
  },
  fiend: {
    label: "VARLYN5E.CreatureFiend",
    plural: "VARLYN5E.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    detectAlignment: true
  },
  giant: {
    label: "VARLYN5E.CreatureGiant",
    plural: "VARLYN5E.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp"
  },
  humanoid: {
    label: "VARLYN5E.CreatureHumanoid",
    plural: "VARLYN5E.CreatureHumanoidPl",
    icon: "icons/environment/people/group.webp"
  },
  monstrosity: {
    label: "VARLYN5E.CreatureMonstrosity",
    plural: "VARLYN5E.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp"
  },
  ooze: {
    label: "VARLYN5E.CreatureOoze",
    plural: "VARLYN5E.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp"
  },
  plant: {
    label: "VARLYN5E.CreaturePlant",
    plural: "VARLYN5E.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp"
  },
  undead: {
    label: "VARLYN5E.CreatureUndead",
    plural: "VARLYN5E.CreatureUndeadPl",
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
VARLYN5E.itemActionTypes = {
  mwak: "VARLYN5E.ActionMWAK",
  rwak: "VARLYN5E.ActionRWAK",
  msak: "VARLYN5E.ActionMSAK",
  rsak: "VARLYN5E.ActionRSAK",
  abil: "VARLYN5E.ActionAbil",
  save: "VARLYN5E.ActionSave",
  ench: "VARLYN5E.ActionEnch",
  summ: "VARLYN5E.ActionSumm",
  heal: "VARLYN5E.ActionHeal",
  util: "VARLYN5E.ActionUtil",
  other: "VARLYN5E.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
VARLYN5E.itemRarity = {
  common: "VARLYN5E.ItemRarityCommon",
  uncommon: "VARLYN5E.ItemRarityUncommon",
  rare: "VARLYN5E.ItemRarityRare",
  veryRare: "VARLYN5E.ItemRarityVeryRare",
  legendary: "VARLYN5E.ItemRarityLegendary",
  artifact: "VARLYN5E.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
VARLYN5E.limitedUsePeriods = {
  lr: {
    label: "VARLYN5E.USES.Recovery.Period.LongRest.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.LongRest.Abbreviation"
  },
  sr: {
    label: "VARLYN5E.USES.Recovery.Period.ShortRest.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.ShortRest.Abbreviation"
  },
  day: {
    label: "VARLYN5E.USES.Recovery.Period.Day.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.Day.Label"
  },
  dawn: {
    label: "VARLYN5E.USES.Recovery.Period.Dawn.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.Dawn.Label",
    formula: true
  },
  dusk: {
    label: "VARLYN5E.USES.Recovery.Period.Dusk.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.Dusk.Label",
    formula: true
  },
  initiative: {
    label: "VARLYN5E.USES.Recovery.Period.Initiative.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.Initiative.Label",
    type: "special"
  },
  turnStart: {
    label: "VARLYN5E.USES.Recovery.Period.TurnStart.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.TurnStart.Abbreviation",
    type: "combat"
  },
  turnEnd: {
    label: "VARLYN5E.USES.Recovery.Period.TurnEnd.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.TurnEnd.Abbreviation",
    type: "combat"
  },
  turn: {
    label: "VARLYN5E.USES.Recovery.Period.Turn.Label",
    abbreviation: "VARLYN5E.USES.Recovery.Period.Turn.Label",
    type: "combat"
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });

Object.defineProperty(VARLYN5E.limitedUsePeriods, "recoveryOptions", {
  get() {
    return [
      ...Object.entries(CONFIG.VARLYN5E.limitedUsePeriods)
        .filter(([, config]) => !config.deprecated)
        .map(([value, { label, type }]) => ({
          value, label, group: _loc(`VARLYN5E.USES.Recovery.${type?.capitalize() ?? "Time"}`)
        })),
      { value: "recharge", label: _loc("VARLYN5E.USES.Recovery.Recharge.Label") }
    ];
  }
});

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
VARLYN5E.enchantmentPeriods = {
  sr: {
    label: "VARLYN5E.ENCHANTMENT.Period.ShortRest"
  },
  lr: {
    label: "VARLYN5E.ENCHANTMENT.Period.LongRest"
  },
  atwill: {
    label: "VARLYN5E.ENCHANTMENT.Period.AtWill"
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
VARLYN5E.armorTypes = {
  light: "VARLYN5E.EquipmentLight",
  medium: "VARLYN5E.EquipmentMedium",
  heavy: "VARLYN5E.EquipmentHeavy",
  natural: "VARLYN5E.EquipmentNatural",
  shield: "VARLYN5E.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @enum {string}
 */
VARLYN5E.armorProficiencies = {
  lgt: "VARLYN5E.ArmorLightProficiency",
  med: "VARLYN5E.ArmorMediumProficiency",
  hvy: "VARLYN5E.ArmorHeavyProficiency",
  shl: "VARLYN5E.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/* -------------------------------------------- */

/**
 * A mapping between `VARLYN5E.equipmentTypes` and `VARLYN5E.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
VARLYN5E.armorProficienciesMap = {
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
VARLYN5E.armorSpeedReduction = 10;

/* -------------------------------------------- */

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
VARLYN5E.armorIds = {
};

/* -------------------------------------------- */

/**
 * The basic shield in 5e.
 * @enum {string}
 */
VARLYN5E.shieldIds = {
};

/* -------------------------------------------- */

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
VARLYN5E.armorClasses = {
  flat: {
    label: "VARLYN5E.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "VARLYN5E.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "VARLYN5E.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "VARLYN5E.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "VARLYN5E.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "VARLYN5E.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "VARLYN5E.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  unarmoredBard: {
    label: "VARLYN5E.ArmorClassUnarmoredBard",
    formula: "10 + @abilities.dex.mod + @abilities.cha.mod"
  },
  custom: {
    label: "VARLYN5E.ArmorClassCustom"
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
VARLYN5E.miscEquipmentTypes = {
  clothing: "VARLYN5E.EQUIPMENT.Type.Clothing.Label",
  ring: "VARLYN5E.EQUIPMENT.Type.Ring.Label",
  rod: "VARLYN5E.EQUIPMENT.Type.Rod.Label",
  trinket: "VARLYN5E.EQUIPMENT.Type.Trinket.Label",
  wand: "VARLYN5E.EQUIPMENT.Type.Wand.Label",
  wondrous: "VARLYN5E.EQUIPMENT.Type.Wondrous.Label"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
VARLYN5E.equipmentTypes = {
  ...VARLYN5E.miscEquipmentTypes,
  ...VARLYN5E.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
VARLYN5E.consumableTypes = {
  ammo: {
    label: "VARLYN5E.CONSUMABLE.Type.Ammunition.Label",
    subtypes: {
      arrow: "VARLYN5E.CONSUMABLE.Type.Ammunition.Arrow",
      crossbowBolt: "VARLYN5E.CONSUMABLE.Type.Ammunition.Bolt",
      energyCell: "VARLYN5E.CONSUMABLE.Type.Ammunition.EnergyCell",
      firearmBullet: "VARLYN5E.CONSUMABLE.Type.Ammunition.BulletFirearm",
      slingBullet: "VARLYN5E.CONSUMABLE.Type.Ammunition.BulletSling",
      blowgunNeedle: "VARLYN5E.CONSUMABLE.Type.Ammunition.Needle"
    }
  },
  potion: {
    label: "VARLYN5E.CONSUMABLE.Type.Potion.Label"
  },
  poison: {
    label: "VARLYN5E.CONSUMABLE.Type.Poison.Label",
    subtypes: {
      contact: "VARLYN5E.CONSUMABLE.Type.Poison.Contact",
      ingested: "VARLYN5E.CONSUMABLE.Type.Poison.Ingested",
      inhaled: "VARLYN5E.CONSUMABLE.Type.Poison.Inhaled",
      injury: "VARLYN5E.CONSUMABLE.Type.Poison.Injury"
    }
  },
  food: {
    label: "VARLYN5E.CONSUMABLE.Type.Food.Label"
  },
  scroll: {
    label: "VARLYN5E.CONSUMABLE.Type.Scroll.Label"
  },
  wand: {
    label: "VARLYN5E.CONSUMABLE.Type.Wand.Label"
  },
  rod: {
    label: "VARLYN5E.CONSUMABLE.Type.Rod.Label"
  },
  trinket: {
    label: "VARLYN5E.CONSUMABLE.Type.Trinket.Label"
  },
  wondrous: {
    label: "VARLYN5E.CONSUMABLE.Type.Wondrous.Label"
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
VARLYN5E.containerTypes = {
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
VARLYN5E.focusTypes = {
  arcane: {
    label: "VARLYN5E.Focus.Arcane",
    itemIds: {
    }
  },
  druidic: {
    label: "VARLYN5E.Focus.Druidic",
    itemIds: {
    }
  },
  holy: {
    label: "VARLYN5E.Focus.Holy",
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
VARLYN5E.featureTypes = {
  background: {
    label: "VARLYN5E.Feature.Background"
  },
  class: {
    label: "VARLYN5E.Feature.Class.Label",
    subtypes: {
      arcaneShot: "VARLYN5E.Feature.Class.ArcaneShot",
      artificerInfusion: "VARLYN5E.Feature.Class.ArtificerPlan",
      channelDivinity: "VARLYN5E.Feature.Class.ChannelDivinity",
      defensiveTactic: "VARLYN5E.Feature.Class.DefensiveTactic",
      eldritchInvocation: "VARLYN5E.Feature.Class.EldritchInvocation",
      elementalDiscipline: "VARLYN5E.Feature.Class.ElementalDiscipline",
      fightingStyle: "VARLYN5E.Feature.Class.FightingStyle",
      huntersPrey: "VARLYN5E.Feature.Class.HuntersPrey",
      ki: "VARLYN5E.Feature.Class.Ki",
      maneuver: "VARLYN5E.Feature.Class.Maneuver",
      metamagic: "VARLYN5E.Feature.Class.Metamagic",
      multiattack: "VARLYN5E.Feature.Class.Multiattack",
      pact: "VARLYN5E.Feature.Class.PactBoon",
      psionicPower: "VARLYN5E.Feature.Class.PsionicPower",
      rune: "VARLYN5E.Feature.Class.Rune",
      superiorHuntersDefense: "VARLYN5E.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "VARLYN5E.Feature.Monster"
  },
  race: {
    label: "VARLYN5E.Feature.Species"
  },
  enchantment: {
    label: "VARLYN5E.ENCHANTMENT.Label",
    subtypes: {
      artificerInfusion: "VARLYN5E.Feature.Class.ArtificerPlan",
      rune: "VARLYN5E.Feature.Class.Rune"
    }
  },
  feat: {
    label: "VARLYN5E.Feature.Feat.Label",
    subtypes: {
      general: "VARLYN5E.Feature.Feat.General",
      origin: "VARLYN5E.Feature.Feat.Origin",
      fightingStyle: "VARLYN5E.Feature.Feat.FightingStyle",
      epicBoon: "VARLYN5E.Feature.Feat.EpicBoon"
    }
  },
  supernaturalGift: {
    label: "VARLYN5E.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "VARLYN5E.Feature.SupernaturalGift.Blessing",
      charm: "VARLYN5E.Feature.SupernaturalGift.Charm",
      epicBoon: "VARLYN5E.Feature.SupernaturalGift.EpicBoon"
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
VARLYN5E.itemProperties = {
  ada: {
    label: "VARLYN5E.ITEM.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "VARLYN5E.ITEM.Property.Ammunition"
  },
  concentration: {
    label: "VARLYN5E.ITEM.Property.Concentration",
    abbreviation: "VARLYN5E.ConcentrationAbbr",
    icon: "systems/dnd5e/icons/svg/statuses/concentrating.svg",
    isTag: true
  },
  fin: {
    label: "VARLYN5E.ITEM.Property.Finesse"
  },
  fir: {
    label: "VARLYN5E.ITEM.Property.Firearm"
  },
  foc: {
    label: "VARLYN5E.ITEM.Property.Focus"
  },
  gear: {
    label: "VARLYN5E.ITEM.Property.Gear"
  },
  hvy: {
    label: "VARLYN5E.ITEM.Property.Heavy"
  },
  lgt: {
    label: "VARLYN5E.ITEM.Property.Light"
  },
  lod: {
    label: "VARLYN5E.ITEM.Property.Loading"
  },
  material: {
    label: "VARLYN5E.ITEM.Property.Material",
    abbreviation: "VARLYN5E.ComponentMaterialAbbr"
  },
  mgc: {
    label: "VARLYN5E.ITEM.Property.Magical",
    icon: "systems/dnd5e/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  rch: {
    label: "VARLYN5E.ITEM.Property.Reach"
  },
  rel: {
    label: "VARLYN5E.ITEM.Property.Reload"
  },
  ret: {
    label: "VARLYN5E.ITEM.Property.Returning"
  },
  ritual: {
    label: "VARLYN5E.ITEM.Property.Ritual",
    abbreviation: "VARLYN5E.RitualAbbr",
    icon: "systems/dnd5e/icons/svg/items/spell.svg",
    isTag: true
  },
  sidekick: {
    label: "VARLYN5E.ITEM.Property.Sidekick"
  },
  sil: {
    label: "VARLYN5E.ITEM.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "VARLYN5E.ITEM.Property.Somatic",
    abbreviation: "VARLYN5E.ComponentSomaticAbbr"
  },
  spc: {
    label: "VARLYN5E.ITEM.Property.Special"
  },
  stealthDisadvantage: {
    label: "VARLYN5E.ITEM.Property.StealthDisadvantage"
  },
  thr: {
    label: "VARLYN5E.ITEM.Property.Thrown"
  },
  trait: {
    label: "VARLYN5E.ITEM.Property.Trait"
  },
  two: {
    label: "VARLYN5E.ITEM.Property.TwoHanded"
  },
  ver: {
    label: "VARLYN5E.ITEM.Property.Versatile"
  },
  vocal: {
    label: "VARLYN5E.ITEM.Property.Verbal",
    abbreviation: "VARLYN5E.ComponentVerbalAbbr"
  },
  weightlessContents: {
    label: "VARLYN5E.ITEM.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
VARLYN5E.validProperties = {
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
VARLYN5E.currencies = {
  pp: {
    label: "VARLYN5E.CurrencyPP",
    abbreviation: "VARLYN5E.CurrencyAbbrPP",
    conversion: 0.1,
    icon: "systems/dnd5e/icons/currency/platinum.webp"
  },
  gp: {
    label: "VARLYN5E.CurrencyGP",
    abbreviation: "VARLYN5E.CurrencyAbbrGP",
    conversion: 1,
    icon: "systems/dnd5e/icons/currency/gold.webp"
  },
  ep: {
    label: "VARLYN5E.CurrencyEP",
    abbreviation: "VARLYN5E.CurrencyAbbrEP",
    conversion: 2,
    icon: "systems/dnd5e/icons/currency/electrum.webp"
  },
  sp: {
    label: "VARLYN5E.CurrencySP",
    abbreviation: "VARLYN5E.CurrencyAbbrSP",
    conversion: 10,
    icon: "systems/dnd5e/icons/currency/silver.webp"
  },
  cp: {
    label: "VARLYN5E.CurrencyCP",
    abbreviation: "VARLYN5E.CurrencyAbbrCP",
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
VARLYN5E.defaultCurrency = "gp";

/* -------------------------------------------- */

/**
 * Configuration data for crafting costs.
 * @type {CraftingConfiguration}
 */
VARLYN5E.crafting = {
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
VARLYN5E.dieSteps = [4, 6, 8, 10, 12, 20, 100];

/* -------------------------------------------- */

/**
 * Methods by which damage scales relative to the overall scaling increase.
 * @enum {{ label: string, labelCantrip: string }}
 */
VARLYN5E.damageScalingModes = {
  whole: {
    label: "VARLYN5E.DAMAGE.Scaling.Whole",
    labelCantrip: "VARLYN5E.DAMAGE.Scaling.WholeCantrip"
  },
  half: {
    label: "VARLYN5E.DAMAGE.Scaling.Half",
    labelCantrip: "VARLYN5E.DAMAGE.Scaling.HalfCantrip"
  }
};
preLocalize("damageScalingModes", { keys: ["label", "labelCantrip"] });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
VARLYN5E.damageTypes = {
  acid: {
    label: "VARLYN5E.DAMAGE.Type.Acid",
    icon: "systems/dnd5e/icons/svg/damage/acid.svg",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "VARLYN5E.DAMAGE.Type.Bludgeoning",
    icon: "systems/dnd5e/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    color: new Color(0x0000A0)
  },
  cold: {
    label: "VARLYN5E.DAMAGE.Type.Cold",
    icon: "systems/dnd5e/icons/svg/damage/cold.svg",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "VARLYN5E.DAMAGE.Type.Fire",
    icon: "systems/dnd5e/icons/svg/damage/fire.svg",
    color: new Color(0xFF4500)
  },
  force: {
    label: "VARLYN5E.DAMAGE.Type.Force",
    icon: "systems/dnd5e/icons/svg/damage/force.svg",
    color: new Color(0x800080)
  },
  lightning: {
    label: "VARLYN5E.DAMAGE.Type.Lightning",
    icon: "systems/dnd5e/icons/svg/damage/lightning.svg",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "VARLYN5E.DAMAGE.Type.Necrotic",
    icon: "systems/dnd5e/icons/svg/damage/necrotic.svg",
    color: new Color(0x006400)
  },
  piercing: {
    label: "VARLYN5E.DAMAGE.Type.Piercing",
    icon: "systems/dnd5e/icons/svg/damage/piercing.svg",
    isPhysical: true,
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "VARLYN5E.DAMAGE.Type.Poison",
    icon: "systems/dnd5e/icons/svg/damage/poison.svg",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "VARLYN5E.DAMAGE.Type.Psychic",
    icon: "systems/dnd5e/icons/svg/damage/psychic.svg",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "VARLYN5E.DAMAGE.Type.Radiant",
    icon: "systems/dnd5e/icons/svg/damage/radiant.svg",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "VARLYN5E.DAMAGE.Type.Slashing",
    icon: "systems/dnd5e/icons/svg/damage/slashing.svg",
    isPhysical: true,
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "VARLYN5E.DAMAGE.Type.Thunder",
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
VARLYN5E.aggregateDamageDisplay = true;

/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {DamageTypeConfiguration}
 */
VARLYN5E.healingTypes = {
  healing: {
    label: "VARLYN5E.HEAL.Type.Healing",
    labelShort: "VARLYN5E.HEAL.Type.HealingShort",
    icon: "systems/dnd5e/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "VARLYN5E.HEAL.Type.Temporary",
    labelShort: "VARLYN5E.HEAL.Type.TemporaryShort",
    icon: "systems/dnd5e/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  },
  maximum: {
    label: "VARLYN5E.HEAL.Type.Maximum",
    labelShort: "VARLYN5E.HEAL.Type.MaximumShort",
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
VARLYN5E.difficultTerrainTypes = {
  ice: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Ice"
  },
  liquid: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Liquid"
  },
  plants: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Plants"
  },
  rocks: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Rocks"
  },
  mud: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Mud"
  },
  sand: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Sand"
  },
  slope: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Slope"
  },
  snow: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Snow"
  },
  web: {
    label: "VARLYN5E.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Webs"
  }
};
preLocalize("difficultTerrainTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {MovementTypeConfiguration}
 */
VARLYN5E.movementTypes = {
  walk: {
    label: "VARLYN5E.MOVEMENT.Type.Speed"
  },
  burrow: {
    label: "VARLYN5E.MOVEMENT.Type.Burrow"
  },
  climb: {
    label: "VARLYN5E.MOVEMENT.Type.Climb",
    walkFallback: true
  },
  fly: {
    label: "VARLYN5E.MOVEMENT.Type.Fly",
    travel: "air"
  },
  jump: {
    label: "VARLYN5E.MOVEMENT.Type.Jump",
    hidden: true
  },
  swim: {
    label: "VARLYN5E.MOVEMENT.Type.Swim",
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
VARLYN5E.travelTimes = {
  group: 8,
  vehicle: 24
};

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {Omit<MovementTypeConfiguration, "travel">}
 */
VARLYN5E.travelTypes = {
  land: {
    label: "VARLYN5E.TRAVEL.Type.Land"
  },
  water: {
    label: "VARLYN5E.TRAVEL.Type.Water"
  },
  air: {
    label: "VARLYN5E.TRAVEL.Type.Air"
  }
};
preLocalize("travelTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Available travel paces.
 * @type {Readonly<Record<string, TravelPaceConfiguration>>}
 */
VARLYN5E.travelPace = Object.freeze({
  slow: {
    label: "VARLYN5E.TRAVEL.Pace.Slow",
    standard: 18,
    multiplier: 2 / 3,
    round: "down"
  },
  normal: {
    label: "VARLYN5E.TRAVEL.Pace.Normal",
    standard: 24,
    multiplier: 1,
    round: "down"
  },
  fast: {
    label: "VARLYN5E.TRAVEL.Pace.Fast",
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
VARLYN5E.defaultUnits = {
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
VARLYN5E.movementUnits = {
  ft: {
    label: "VARLYN5E.UNITS.DISTANCE.Foot.Label",
    abbreviation: "VARLYN5E.UNITS.DISTANCE.Foot.Abbreviation",
    template: "VARLYN5E.UNITS.DISTANCE.Foot.Template",
    conversion: 1,
    formattingUnit: "foot",
    type: "imperial",
    travelResolution: "round"
  },
  mi: {
    label: "VARLYN5E.UNITS.DISTANCE.Mile.Label",
    abbreviation: "VARLYN5E.UNITS.DISTANCE.Mile.Abbreviation",
    template: "VARLYN5E.UNITS.DISTANCE.Mile.Template",
    conversion: 5_280,
    formattingUnit: "mile",
    type: "imperial",
    travelResolution: "day"
  },
  m: {
    label: "VARLYN5E.UNITS.DISTANCE.Meter.Label",
    abbreviation: "VARLYN5E.UNITS.DISTANCE.Meter.Abbreviation",
    template: "VARLYN5E.UNITS.DISTANCE.Meter.Template",
    conversion: 10 / 3, // D&D uses a simplified 5ft -> 1.5m conversion.
    formattingUnit: "meter",
    type: "metric",
    travelResolution: "round"
  },
  km: {
    label: "VARLYN5E.UNITS.DISTANCE.Kilometer.Label",
    abbreviation: "VARLYN5E.UNITS.DISTANCE.Kilometer.Abbreviation",
    template: "VARLYN5E.UNITS.DISTANCE.Kilometer.Template",
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
VARLYN5E.travelUnits = {
  mph: {
    label: "VARLYN5E.UNITS.TRAVEL.Mile.Label",
    abbreviationDay: "VARLYN5E.UNITS.TRAVEL.Mile.AbbreviationDay",
    abbreviationHour: "VARLYN5E.UNITS.TRAVEL.Mile.AbbreviationHour",
    formattingUnit: "mile",
    conversion: 1,
    type: "imperial"
  },
  kph: {
    label: "VARLYN5E.UNITS.TRAVEL.Kilometer.Label",
    abbreviationDay: "VARLYN5E.UNITS.TRAVEL.Kilometer.AbbreviationDay",
    abbreviationHour: "VARLYN5E.UNITS.TRAVEL.Kilometer.AbbreviationHour",
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
VARLYN5E.rangeTypes = {
  self: "VARLYN5E.DistSelf",
  touch: "VARLYN5E.DistTouch",
  spec: "VARLYN5E.Special",
  any: "VARLYN5E.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `VARLYN5E.movementUnits` and
 * `VARLYN5E.rangeUnits`.
 * @enum {string}
 */
VARLYN5E.distanceUnits = {
  ...Object.fromEntries(Object.entries(VARLYN5E.movementUnits).map(([k, { label }]) => [k, label])),
  ...VARLYN5E.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * The valid units for measurement of volume.
 * @enum {UnitConfiguration}
 */
VARLYN5E.volumeUnits = {
  cubicFoot: {
    label: "VARLYN5E.UNITS.VOLUME.CubicFoot.Label",
    abbreviation: "VARLYN5E.UNITS.VOLUME.CubicFoot.Abbreviation",
    counted: "VARLYN5E.UNITS.VOLUME.CubicFoot.Counted",
    conversion: 1,
    type: "imperial"
  },
  liter: {
    label: "VARLYN5E.UNITS.VOLUME.Liter.Label",
    abbreviation: "VARLYN5E.UNITS.VOLUME.Liter.Abbreviation",
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
VARLYN5E.weightUnits = {
  lb: {
    label: "VARLYN5E.UNITS.WEIGHT.Pound.Label",
    abbreviation: "VARLYN5E.UNITS.WEIGHT.Pound.Abbreviation",
    conversion: 1,
    formattingUnit: "pound",
    type: "imperial"
  },
  tn: {
    label: "VARLYN5E.UNITS.WEIGHT.Ton.Label",
    abbreviation: "VARLYN5E.UNITS.WEIGHT.Ton.Abbreviation",
    counted: "VARLYN5E.UNITS.WEIGHT.Ton.Counted",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "VARLYN5E.UNITS.WEIGHT.Kilogram.Label",
    abbreviation: "VARLYN5E.UNITS.WEIGHT.Kilogram.Abbreviation",
    conversion: 2.5,
    formattingUnit: "kilogram",
    type: "metric"
  },
  Mg: {
    label: "VARLYN5E.UNITS.WEIGHT.Megagram.Label",
    abbreviation: "VARLYN5E.UNITS.WEIGHT.Megagram.Abbreviation",
    counted: "VARLYN5E.UNITS.WEIGHT.Megagram.Counted",
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
VARLYN5E.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  draftMultiplier: 5,
  effects: {
    encumbered: {
      name: "EFFECT.VARLYN5E.StatusEncumbered",
      img: "systems/dnd5e/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.VARLYN5E.StatusHeavilyEncumbered",
      img: "systems/dnd5e/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.VARLYN5E.StatusExceedingCarryingCapacity",
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
VARLYN5E.individualTargetTypes = {
  self: {
    label: "VARLYN5E.TARGET.Type.Self.Label",
    scalar: false
  },
  ally: {
    label: "VARLYN5E.TARGET.Type.Ally.Label",
    counted: "VARLYN5E.TARGET.Type.Ally.Counted"
  },
  enemy: {
    label: "VARLYN5E.TARGET.Type.Enemy.Label",
    counted: "VARLYN5E.TARGET.Type.Enemy.Counted"
  },
  creature: {
    label: "VARLYN5E.TARGET.Type.Creature.Label",
    counted: "VARLYN5E.TARGET.Type.Creature.Counted"
  },
  object: {
    label: "VARLYN5E.TARGET.Type.Object.Label",
    counted: "VARLYN5E.TARGET.Type.Object.Counted"
  },
  space: {
    label: "VARLYN5E.TARGET.Type.Space.Label",
    counted: "VARLYN5E.TARGET.Type.Space.Counted"
  },
  creatureOrObject: {
    label: "VARLYN5E.TARGET.Type.CreatureOrObject.Label",
    counted: "VARLYN5E.TARGET.Type.CreatureOrObject.Counted"
  },
  any: {
    label: "VARLYN5E.TARGET.Type.Any.Label",
    counted: "VARLYN5E.TARGET.Type.Target.Counted"
  },
  willing: {
    label: "VARLYN5E.TARGET.Type.WillingCreature.Label",
    counted: "VARLYN5E.TARGET.Type.WillingCreature.Counted"
  }
};
preLocalize("individualTargetTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
VARLYN5E.areaTargetTypes = {
  circle: {
    label: "VARLYN5E.TARGET.Type.Circle.Label",
    counted: "VARLYN5E.TARGET.Type.Circle.Counted",
    template: "circle",
    sizes: ["radius"]
  },
  cone: {
    label: "VARLYN5E.TARGET.Type.Cone.Label",
    counted: "VARLYN5E.TARGET.Type.Cone.Counted",
    template: "cone",
    sizes: ["length"],
    standard: true
  },
  cube: {
    label: "VARLYN5E.TARGET.Type.Cube.Label",
    counted: "VARLYN5E.TARGET.Type.Cube.Counted",
    template: "rect",
    sizes: ["width"],
    standard: true
  },
  cylinder: {
    label: "VARLYN5E.TARGET.Type.Cylinder.Label",
    counted: "VARLYN5E.TARGET.Type.Cylinder.Counted",
    template: "circle",
    sizes: ["radius", "height"],
    standard: true
  },
  line: {
    label: "VARLYN5E.TARGET.Type.Line.Label",
    counted: "VARLYN5E.TARGET.Type.Line.Counted",
    template: "ray",
    sizes: ["length", "width"],
    standard: true
  },
  radius: {
    label: "VARLYN5E.TARGET.Type.Emanation.Label",
    counted: "VARLYN5E.TARGET.Type.Emanation.Counted",
    template: "circle",
    standard: true
  },
  sphere: {
    label: "VARLYN5E.TARGET.Type.Sphere.Label",
    counted: "VARLYN5E.TARGET.Type.Sphere.Counted",
    template: "circle",
    sizes: ["radius"],
    standard: true
  },
  square: {
    label: "VARLYN5E.TARGET.Type.Square.Label",
    counted: "VARLYN5E.TARGET.Type.Square.Counted",
    template: "rect",
    sizes: ["width"]
  },
  wall: {
    label: "VARLYN5E.TARGET.Type.Wall.Label",
    counted: "VARLYN5E.TARGET.Type.Wall.Counted",
    template: "ray",
    sizes: ["length", "thickness", "height"]
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

Object.defineProperty(VARLYN5E, "areaTargetOptions", {
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
VARLYN5E.targetTypes = {
  ...Object.fromEntries(Object.entries(VARLYN5E.individualTargetTypes).map(([k, v]) => [k, v.label])),
  ...Object.fromEntries(Object.entries(VARLYN5E.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
VARLYN5E.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Types of rests.
 * @enum {RestTypeConfiguration}
 */
VARLYN5E.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    },
    label: "VARLYN5E.REST.Short.Label",
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
    label: "VARLYN5E.REST.Long.Label",
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
VARLYN5E.senses = {
  blindsight: {
    label: "VARLYN5E.SenseBlindsight",
    detectionMode: "blindsight"
  },
  darkvision: {
    label: "VARLYN5E.SenseDarkvision",
    grantsSight: true,
    visionMode: "darkvision"
  },
  tremorsense: {
    label: "VARLYN5E.SenseTremorsense",
    detectionMode: "feelTremor"
  },
  truesight: {
    label: "VARLYN5E.SenseTruesight",
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
VARLYN5E.attackClassifications = {
  weapon: {
    label: "VARLYN5E.ATTACK.Classification.Weapon"
  },
  spell: {
    label: "VARLYN5E.ATTACK.Classification.Spell"
  },
  unarmed: {
    label: "VARLYN5E.ATTACK.Classification.Unarmed"
  }
};
preLocalize("attackClassifications", { key: "label" });

/* -------------------------------------------- */

/**
 * Attack modes available for weapons.
 * @enum {string}
 */
VARLYN5E.attackModes = Object.seal({
  oneHanded: {
    label: "VARLYN5E.ATTACK.Mode.OneHanded"
  },
  twoHanded: {
    label: "VARLYN5E.ATTACK.Mode.TwoHanded"
  },
  offhand: {
    label: "VARLYN5E.ATTACK.Mode.Offhand"
  },
  ranged: {
    label: "VARLYN5E.ATTACK.Mode.Ranged"
  },
  thrown: {
    label: "VARLYN5E.ATTACK.Mode.Thrown"
  },
  "thrown-offhand": {
    label: "VARLYN5E.ATTACK.Mode.ThrownOffhand"
  }
});
preLocalize("attackModes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of attacks based on range.
 * @enum {{ label: string }}
 */
VARLYN5E.attackTypes = Object.seal({
  melee: {
    label: "VARLYN5E.ATTACK.Type.Melee"
  },
  ranged: {
    label: "VARLYN5E.ATTACK.Type.Ranged"
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
const SPELL_SLOT_TABLE = VARLYN5E.SPELL_SLOT_TABLE = [
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
const pactCastingProgression = VARLYN5E.pactCastingProgression = {
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
VARLYN5E.spellcasting = {
  atwill: {
    label: "VARLYN5E.SPELLCASTING.METHODS.AtWill.label",
    order: -30
  },
  innate: {
    label: "VARLYN5E.SPELLCASTING.METHODS.Innate.label",
    order: -20
  },
  ritual: {
    label: "VARLYN5E.SPELLCASTING.METHODS.Ritual.label",
    order: -10
  },
  pact: {
    label: "VARLYN5E.SPELLCASTING.METHODS.Pact.label",
    type: "single",
    cantrips: true,
    prepares: true,
    order: 10,
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    table: pactCastingProgression,
    progression: {
      pact: {
        label: "VARLYN5E.SPELLCASTING.METHODS.Pact.Full.label",
        divisor: 1
      }
    }
  },
  spell: {
    label: "VARLYN5E.SPELLCASTING.METHODS.Spell.label",
    type: "multi",
    cantrips: true,
    prepares: true,
    order: 20,
    img: "systems/dnd5e/icons/spell-tiers/{id}.webp",
    table: SPELL_SLOT_TABLE,
    progression: {
      full: {
        label: "VARLYN5E.SPELLCASTING.METHODS.Spell.Full.label",
        divisor: 1
      },
      half: {
        label: "VARLYN5E.SPELLCASTING.METHODS.Spell.Half.label",
        divisor: 2,
        roundUp: true
      },
      third: {
        label: "VARLYN5E.SPELLCASTING.METHODS.Spell.Third.label",
        divisor: 3
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
VARLYN5E.spellPreparationStates = {
  unprepared: {
    label: "VARLYN5E.SPELLCASTING.STATES.Unprepared",
    value: 0
  },
  prepared: {
    label: "VARLYN5E.SPELLCASTING.STATES.Prepared",
    value: 1
  },
  always: {
    label: "VARLYN5E.SPELLCASTING.STATES.AlwaysPrepared",
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
VARLYN5E.SPELL_LISTS = Object.freeze([]);

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
VARLYN5E.spellLevels = {
  0: "VARLYN5E.SpellLevel0",
  1: "VARLYN5E.SpellLevel1",
  2: "VARLYN5E.SpellLevel2",
  3: "VARLYN5E.SpellLevel3",
  4: "VARLYN5E.SpellLevel4",
  5: "VARLYN5E.SpellLevel5",
  6: "VARLYN5E.SpellLevel6",
  7: "VARLYN5E.SpellLevel7",
  8: "VARLYN5E.SpellLevel8",
  9: "VARLYN5E.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
VARLYN5E.spellScalingModes = {
  none: "VARLYN5E.SpellNone",
  cantrip: "VARLYN5E.SpellCantrip",
  level: "VARLYN5E.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
VARLYN5E.spellSchools = {
  abj: {
    label: "VARLYN5E.SchoolAbj",
    icon: "systems/dnd5e/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration"
  },
  con: {
    label: "VARLYN5E.SchoolCon",
    icon: "systems/dnd5e/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration"
  },
  div: {
    label: "VARLYN5E.SchoolDiv",
    icon: "systems/dnd5e/icons/svg/schools/divination.svg",
    fullKey: "divination"
  },
  enc: {
    label: "VARLYN5E.SchoolEnc",
    icon: "systems/dnd5e/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment"
  },
  evo: {
    label: "VARLYN5E.SchoolEvo",
    icon: "systems/dnd5e/icons/svg/schools/evocation.svg",
    fullKey: "evocation"
  },
  ill: {
    label: "VARLYN5E.SchoolIll",
    icon: "systems/dnd5e/icons/svg/schools/illusion.svg",
    fullKey: "illusion"
  },
  nec: {
    label: "VARLYN5E.SchoolNec",
    icon: "systems/dnd5e/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy"
  },
  trs: {
    label: "VARLYN5E.SchoolTrs",
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
VARLYN5E.spellListTypes = {
  class: "TYPES.Item.class",
  subclass: "TYPES.Item.subclass",
  race: "TYPES.Item.race",
  other: "JOURNALENTRYPAGE.VARLYN5E.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `VARLYN5E.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
VARLYN5E.spellScrollIds = {
};

/* -------------------------------------------- */

/**
 * Spell scroll save DCs and attack bonus values based on spell level. If matching level isn't found,
 * then the nearest level lower than it will be selected.
 * @enum {SpellScrollValues}
 */
VARLYN5E.spellScrollValues = {
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
VARLYN5E.sourcePacks = {};

/* -------------------------------------------- */

/**
 * Settings that configuration how actors are changed when transformation is applied.
 * @typedef {TransformationConfiguration}
 */
VARLYN5E.transformation = {
  effects: {
    all: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.All.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Effects.All.Hint",
      disables: ["effects.*"]
    },
    origin: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Origin.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Effects.Origin.Hint",
      default: true
    },
    otherOrigin: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.OtherOrigin.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Effects.OtherOrigin.Hint",
      default: true
    },
    background: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Background.Label",
      default: true
    },
    class: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Class.Label",
      default: true
    },
    feat: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Feature.Label",
      default: true
    },
    equipment: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Equipment.Label",
      default: true
    },
    spell: {
      label: "VARLYN5E.TRANSFORM.Setting.Effects.Spell.Label",
      default: true
    }
  },
  keep: {
    physical: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Physical.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Keep.Physical.Hint"
    },
    mental: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Mental.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Keep.Mental.Hint"
    },
    saves: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Saves.Label",
      disables: ["merge.saves"]
    },
    skills: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Skills.Label",
      disables: ["merge.skills"]
    },
    gearProf: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.GearProficiency.Label"
    },
    languages: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Languages.Label"
    },
    class: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Proficiency.Label"
    },
    feats: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Features.Label"
    },
    items: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Equipment.Label"
    },
    spells: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Spells.Label"
    },
    bio: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Biography.Label"
    },
    type: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.CreatureType.Label"
    },
    hp: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Health.Label"
    },
    tempHP: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.TempHP.Label"
    },
    resistances: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Resistances.Label"
    },
    vision: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Vision.Label",
      default: true
    },
    self: {
      label: "VARLYN5E.TRANSFORM.Setting.Keep.Self.Label",
      hint: "VARLYN5E.TRANSFORM.Setting.Keep.Self.Hint",
      disables: ["keep.*", "merge.*", "minimumAC", "tempFormula"]
    }
  },
  merge: {
    saves: {
      label: "VARLYN5E.TRANSFORM.Setting.Merge.Saves.Label",
      disables: ["keep.saves"]
    },
    skills: {
      label: "VARLYN5E.TRANSFORM.Setting.Merge.Skills.Label",
      disables: ["keep.skills"]
    }
  },
  other: {},
  presets: {
    wildshape: {
      icon: '<i class="fas fa-paw" inert></i>',
      label: "VARLYN5E.TRANSFORM.Preset.WildShape.Label",
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
      label: "VARLYN5E.TRANSFORM.Preset.Polymorph.Label",
      settings: {
        effects: new Set(["otherOrigin", "origin", "spell"]),
        keep: new Set(["hp", "type"]),
        tempFormula: "@source.attributes.hp.max"
      }
    },
    polymorphSelf: {
      icon: '<i class="fas fa-eye" inert></i>',
      label: "VARLYN5E.TRANSFORM.Preset.Appearance.Label",
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
VARLYN5E.proficiencyLevels = {
  0: "VARLYN5E.NotProficient",
  1: "VARLYN5E.Proficient",
  0.5: "VARLYN5E.HalfProficient",
  2: "VARLYN5E.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
VARLYN5E.weaponAndArmorProficiencyLevels = {
  0: "VARLYN5E.NotProficient",
  1: "VARLYN5E.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
VARLYN5E.cover = {
  0: "VARLYN5E.None",
  .5: "VARLYN5E.CoverHalf",
  .75: "VARLYN5E.CoverThreeQuarters",
  1: "VARLYN5E.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
VARLYN5E.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses",
  "attributes.spell.attack", "attributes.spell.dc", "attributes.spell.level", "details.cr",
  "details.xp.value", "skills.*.passive", "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
VARLYN5E.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
VARLYN5E.conditionTypes = {
  bleeding: {
    name: "EFFECT.VARLYN5E.StatusBleeding",
    img: "systems/dnd5e/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    name: "VARLYN5E.ConBlinded",
    img: "systems/dnd5e/icons/svg/statuses/blinded.svg",
    special: "BLIND"
  },
  burning: {
    name: "EFFECT.VARLYN5E.StatusBurning",
    img: "systems/dnd5e/icons/svg/statuses/burning.svg",
    pseudo: true
  },
  charmed: {
    name: "VARLYN5E.ConCharmed",
    img: "systems/dnd5e/icons/svg/statuses/charmed.svg"
  },
  cursed: {
    name: "EFFECT.VARLYN5E.StatusCursed",
    img: "systems/dnd5e/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  dehydration: {
    name: "EFFECT.VARLYN5E.StatusDehydration",
    img: "systems/dnd5e/icons/svg/statuses/dehydration.svg",
    pseudo: true
  },
  deafened: {
    name: "VARLYN5E.ConDeafened",
    img: "systems/dnd5e/icons/svg/statuses/deafened.svg"
  },
  diseased: {
    name: "VARLYN5E.ConDiseased",
    img: "systems/dnd5e/icons/svg/statuses/diseased.svg",
    pseudo: true
  },
  exhaustion: {
    name: "VARLYN5E.ConExhaustion",
    img: "systems/dnd5e/icons/svg/statuses/exhaustion.svg",
    levels: 6,
    reduction: { rolls: 2, speed: 5 }
  },
  falling: {
    name: "EFFECT.VARLYN5E.StatusFalling",
    img: "systems/dnd5e/icons/svg/statuses/falling.svg",
    pseudo: true
  },
  frightened: {
    name: "VARLYN5E.ConFrightened",
    img: "systems/dnd5e/icons/svg/statuses/frightened.svg"
  },
  grappled: {
    name: "VARLYN5E.ConGrappled",
    img: "systems/dnd5e/icons/svg/statuses/grappled.svg"
  },
  incapacitated: {
    name: "VARLYN5E.ConIncapacitated",
    img: "systems/dnd5e/icons/svg/statuses/incapacitated.svg",
    neverBlockMovement: true
  },
  invisible: {
    name: "VARLYN5E.ConInvisible",
    img: "systems/dnd5e/icons/svg/statuses/invisible.svg"
  },
  malnutrition: {
    name: "EFFECT.VARLYN5E.StatusMalnutrition",
    img: "systems/dnd5e/icons/svg/statuses/malnutrition.svg",
    pseudo: true
  },
  paralyzed: {
    name: "VARLYN5E.ConParalyzed",
    img: "systems/dnd5e/icons/svg/statuses/paralyzed.svg",
    statuses: ["incapacitated"]
  },
  petrified: {
    name: "VARLYN5E.ConPetrified",
    img: "systems/dnd5e/icons/svg/statuses/petrified.svg",
    statuses: ["incapacitated"]
  },
  poisoned: {
    name: "VARLYN5E.ConPoisoned",
    img: "systems/dnd5e/icons/svg/statuses/poisoned.svg"
  },
  prone: {
    name: "VARLYN5E.ConProne",
    img: "systems/dnd5e/icons/svg/statuses/prone.svg"
  },
  restrained: {
    name: "VARLYN5E.ConRestrained",
    img: "systems/dnd5e/icons/svg/statuses/restrained.svg"
  },
  silenced: {
    name: "EFFECT.VARLYN5E.StatusSilenced",
    img: "systems/dnd5e/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    name: "VARLYN5E.ConStunned",
    img: "systems/dnd5e/icons/svg/statuses/stunned.svg",
    statuses: ["incapacitated"]
  },
  suffocation: {
    name: "EFFECT.VARLYN5E.StatusSuffocation",
    img: "systems/dnd5e/icons/svg/statuses/suffocation.svg",
    pseudo: true
  },
  surprised: {
    name: "EFFECT.VARLYN5E.StatusSurprised",
    img: "systems/dnd5e/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    name: "EFFECT.VARLYN5E.StatusTransformed",
    img: "systems/dnd5e/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    name: "VARLYN5E.ConUnconscious",
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
VARLYN5E.conditionEffects = {
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
VARLYN5E.statusEffects = {
  burrowing: {
    name: "EFFECT.VARLYN5E.StatusBurrowing",
    img: "systems/dnd5e/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.VARLYN5E.StatusConcentrating",
    img: "systems/dnd5e/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  coverHalf: {
    name: "EFFECT.VARLYN5E.StatusHalfCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-half.svg",
    order: 2,
    exclusiveGroup: "cover",
    coverBonus: 2
  },
  coverThreeQuarters: {
    name: "EFFECT.VARLYN5E.StatusThreeQuartersCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-three-quarters.svg",
    order: 3,
    exclusiveGroup: "cover",
    coverBonus: 5
  },
  coverTotal: {
    name: "EFFECT.VARLYN5E.StatusTotalCover",
    img: "systems/dnd5e/icons/svg/statuses/cover-total.svg",
    order: 4,
    exclusiveGroup: "cover"
  },
  dead: {
    name: "EFFECT.VARLYN5E.StatusDead",
    img: "systems/dnd5e/icons/svg/statuses/dead.svg",
    special: "DEFEATED",
    order: 1,
    neverBlockMovement: true
  },
  dodging: {
    name: "EFFECT.VARLYN5E.StatusDodging",
    img: "systems/dnd5e/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.VARLYN5E.StatusEthereal",
    img: "systems/dnd5e/icons/svg/statuses/ethereal.svg",
    neverBlockMovement: true
  },
  flying: {
    name: "EFFECT.VARLYN5E.StatusFlying",
    img: "systems/dnd5e/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.VARLYN5E.StatusHiding",
    img: "systems/dnd5e/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.VARLYN5E.StatusHovering",
    img: "systems/dnd5e/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.VARLYN5E.StatusMarked",
    img: "systems/dnd5e/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.VARLYN5E.StatusSleeping",
    img: "systems/dnd5e/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.VARLYN5E.StatusStable",
    img: "systems/dnd5e/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */

/**
 * Status effects that never block token movement. Populated during the setup process.
 * @type {Set<string>}
 */
VARLYN5E.neverBlockStatuses = new Set();

/* -------------------------------------------- */

/**
 * Configuration for the special bloodied status effect.
 * @type {{ name: string, icon: string, threshold: number }}
 */
VARLYN5E.bloodied = {
  name: "EFFECT.VARLYN5E.StatusBloodied",
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
VARLYN5E.languages = {
  standard: {
    label: "VARLYN5E.Language.Category.Standard",
    selectable: false,
    children: {
      common: "VARLYN5E.Language.Language.Common",
      draconic: "VARLYN5E.Language.Language.Draconic",
      dwarvish: "VARLYN5E.Language.Language.Dwarvish",
      elvish: "VARLYN5E.Language.Language.Elvish",
      giant: "VARLYN5E.Language.Language.Giant",
      gnomish: "VARLYN5E.Language.Language.Gnomish",
      goblin: "VARLYN5E.Language.Language.Goblin",
      halfling: "VARLYN5E.Language.Language.Halfling",
      orc: "VARLYN5E.Language.Language.Orc",
      sign: "VARLYN5E.Language.Language.CommonSign"
    }
  },
  exotic: {
    label: "VARLYN5E.Language.Category.Rare",
    selectable: false,
    children: {
      aarakocra: "VARLYN5E.Language.Language.Aarakocra",
      abyssal: "VARLYN5E.Language.Language.Abyssal",
      cant: "VARLYN5E.Language.Language.ThievesCant",
      celestial: "VARLYN5E.Language.Language.Celestial",
      deep: "VARLYN5E.Language.Language.DeepSpeech",
      druidic: "VARLYN5E.Language.Language.Druidic",
      gith: "VARLYN5E.Language.Language.Gith",
      gnoll: "VARLYN5E.Language.Language.Gnoll",
      infernal: "VARLYN5E.Language.Language.Infernal",
      primordial: {
        label: "VARLYN5E.Language.Language.Primordial",
        children: {
          aquan: "VARLYN5E.Language.Language.Aquan",
          auran: "VARLYN5E.Language.Language.Auran",
          ignan: "VARLYN5E.Language.Language.Ignan",
          terran: "VARLYN5E.Language.Language.Terran"
        }
      },
      sylvan: "VARLYN5E.Language.Language.Sylvan",
      undercommon: "VARLYN5E.Language.Language.Undercommon"
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
VARLYN5E.communicationTypes = {
  telepathy: {
    label: "VARLYN5E.Language.Communication.Telepathy"
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
VARLYN5E.habitats = {
  any: {
    label: "VARLYN5E.Habitat.Categories.Any"
  },
  arctic: {
    label: "VARLYN5E.Habitat.Categories.Arctic"
  },
  coastal: {
    label: "VARLYN5E.Habitat.Categories.Coastal"
  },
  desert: {
    label: "VARLYN5E.Habitat.Categories.Desert"
  },
  forest: {
    label: "VARLYN5E.Habitat.Categories.Forest"
  },
  grassland: {
    label: "VARLYN5E.Habitat.Categories.Grassland"
  },
  hill: {
    label: "VARLYN5E.Habitat.Categories.Hill"
  },
  mountain: {
    label: "VARLYN5E.Habitat.Categories.Mountain"
  },
  planar: {
    label: "VARLYN5E.Habitat.Categories.Planar",
    subtypes: true
  },
  swamp: {
    label: "VARLYN5E.Habitat.Categories.Swamp"
  },
  underdark: {
    label: "VARLYN5E.Habitat.Categories.Underdark"
  },
  underwater: {
    label: "VARLYN5E.Habitat.Categories.Underwater"
  },
  urban: {
    label: "VARLYN5E.Habitat.Categories.Urban"
  }
};
preLocalize("habitats", { key: "label" });

/* -------------------------------------------- */

/**
 * NPC Treasure
 * @enum {TreasureConfiguration5e}
 */
VARLYN5E.treasure = {
  any: {
    label: "VARLYN5E.Treasure.Categories.Any"
  },
  arcana: {
    label: "VARLYN5E.Treasure.Categories.Arcana"
  },
  armaments: {
    label: "VARLYN5E.Treasure.Categories.Armaments"
  },
  implements: {
    label: "VARLYN5E.Treasure.Categories.Implements"
  },
  individual: {
    label: "VARLYN5E.Treasure.Categories.Individual"
  },
  relics: {
    label: "VARLYN5E.Treasure.Categories.Relics"
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
VARLYN5E.maxLevel = 20;

/* -------------------------------------------- */

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
VARLYN5E.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/* -------------------------------------------- */

/**
 * Intervals above the maximum XP that result in an epic boon.
 * @type {number}
 */
VARLYN5E.epicBoonInterval = 30000;

/* -------------------------------------------- */
/*  Traits                                      */
/* -------------------------------------------- */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
VARLYN5E.traits = {
  saves: {
    labels: {
      title: "VARLYN5E.ClassSaves",
      localization: "VARLYN5E.TraitSavesPlural"
    },
    icon: "icons/magic/life/ankh-gold-blue.webp",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "VARLYN5E.Skills",
      localization: "VARLYN5E.TraitSkillsPlural"
    },
    icon: "icons/tools/instruments/harp-yellow-teal.webp",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true,
    dataType: MappingField
  },
  languages: {
    labels: {
      title: "VARLYN5E.Languages",
      localization: "VARLYN5E.TraitLanguagesPlural",
      all: "VARLYN5E.Language.All"
    },
    icon: "icons/skills/social/diplomacy-peace-alliance.webp"
  },
  armor: {
    labels: {
      title: "VARLYN5E.TraitArmorProf",
      localization: "VARLYN5E.TraitArmorPlural"
    },
    icon: "icons/equipment/chest/breastplate-helmet-metal.webp",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "VARLYN5E.TraitWeaponProf",
      localization: "VARLYN5E.TraitWeaponPlural"
    },
    icon: "icons/skills/melee/weapons-crossed-swords-purple.webp",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] },
    mastery: true
  },
  tool: {
    labels: {
      title: "VARLYN5E.TraitToolProf",
      localization: "VARLYN5E.TraitToolPlural"
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
      title: "VARLYN5E.DamImm",
      localization: "VARLYN5E.TraitDIPlural",
      all: "VARLYN5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "VARLYN5E.DamRes",
      localization: "VARLYN5E.TraitDRPlural",
      all: "VARLYN5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "VARLYN5E.DamVuln",
      localization: "VARLYN5E.TraitDVPlural",
      all: "VARLYN5E.DAMAGE.All"
    },
    icon: "systems/dnd5e/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  dm: {
    labels: {
      title: "VARLYN5E.DamMod",
      localization: "VARLYN5E.TraitDMPlural",
      all: "VARLYN5E.DAMAGE.All"
    },
    configKey: "damageTypes",
    dataType: Number
  },
  ci: {
    labels: {
      title: "VARLYN5E.ConImm",
      localization: "VARLYN5E.TraitCIPlural"
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
VARLYN5E.traitModes = {
  default: {
    label: "VARLYN5E.ADVANCEMENT.Trait.Mode.Default.Label",
    hint: "VARLYN5E.ADVANCEMENT.Trait.Mode.Default.Hint"
  },
  expertise: {
    label: "VARLYN5E.ADVANCEMENT.Trait.Mode.Expertise.Label",
    hint: "VARLYN5E.ADVANCEMENT.Trait.Mode.Expertise.Hint"
  },
  forcedExpertise: {
    label: "VARLYN5E.ADVANCEMENT.Trait.Mode.Force.Label",
    hint: "VARLYN5E.ADVANCEMENT.Trait.Mode.Force.Hint"
  },
  upgrade: {
    label: "VARLYN5E.ADVANCEMENT.Trait.Mode.Upgrade.Label",
    hint: "VARLYN5E.ADVANCEMENT.Trait.Mode.Upgrade.Hint"
  },
  mastery: {
    label: "VARLYN5E.ADVANCEMENT.Trait.Mode.Mastery.Label",
    hint: "VARLYN5E.ADVANCEMENT.Trait.Mode.Mastery.Hint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfiguration}
 */
VARLYN5E.characterFlags = {
  diamondSoul: {
    name: "VARLYN5E.FlagsDiamondSoul",
    hint: "VARLYN5E.FlagsDiamondSoulHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  enhancedDualWielding: {
    name: "VARLYN5E.FLAGS.EnhancedDualWielding.Name",
    hint: "VARLYN5E.FLAGS.EnhancedDualWielding.Hint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "VARLYN5E.FlagsElvenAccuracy",
    hint: "VARLYN5E.FlagsElvenAccuracyHint",
    section: "VARLYN5E.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "VARLYN5E.FlagsHalflingLucky",
    hint: "VARLYN5E.FlagsHalflingLuckyHint",
    section: "VARLYN5E.RacialTraits",
    type: Boolean
  },
  halflingNimbleness: {
    name: "VARLYN5E.FlagsHalflingNimbleness",
    hint: "VARLYN5E.FlagsHalflingNimblenessHint",
    section: "VARLYN5E.RacialTraits",
    type: Boolean
  },
  ignoreArmorSpeedReduction: {
    name: "VARLYN5E.FLAGS.IgnoreArmorSpeedReduction.Name",
    hint: "VARLYN5E.FLAGS.IgnoreArmorSpeedReduction.Hint",
    section: "VARLYN5E.RacialTraits",
    type: Boolean
  },
  initiativeAlert: {
    name: "VARLYN5E.FlagsAlert",
    hint: "VARLYN5E.FlagsAlertHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "VARLYN5E.FlagsJOAT",
    hint: "VARLYN5E.FlagsJOATHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "VARLYN5E.FlagsObservant",
    hint: "VARLYN5E.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "VARLYN5E.FlagsTavernBrawler",
    hint: "VARLYN5E.FlagsTavernBrawlerHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "VARLYN5E.FlagsPowerfulBuild",
    hint: "VARLYN5E.FlagsPowerfulBuildHint",
    section: "VARLYN5E.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "VARLYN5E.FlagsReliableTalent",
    hint: "VARLYN5E.FlagsReliableTalentHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "VARLYN5E.FlagsRemarkableAthlete",
    hint: "VARLYN5E.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    skills: ["ath"],
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  toolExpertise: {
    name: "VARLYN5E.FlagsToolExpertise",
    hint: "VARLYN5E.FlagsToolExpertiseHint",
    section: "VARLYN5E.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "VARLYN5E.FlagsWeaponCritThreshold",
    hint: "VARLYN5E.FlagsWeaponCritThresholdHint",
    section: "VARLYN5E.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "VARLYN5E.FlagsSpellCritThreshold",
    hint: "VARLYN5E.FlagsSpellCritThresholdHint",
    section: "VARLYN5E.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "VARLYN5E.FlagsMeleeCriticalDice",
    hint: "VARLYN5E.FlagsMeleeCriticalDiceHint",
    section: "VARLYN5E.Feats",
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
VARLYN5E.activityTypes = {
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
VARLYN5E.advancementTypes = {
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
VARLYN5E.defaultArtwork = {
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
VARLYN5E.calendar = {
  application: CalenderHUD,
  calendars: [
    {
      value: "gregorian",
      label: "VARLYN5E.CALENDAR.Gregorian",
      config: foundry.data.SIMPLIFIED_GREGORIAN_CALENDAR_CONFIG
    }
  ],
  formatters: [
    {
      value: "monthDay",
      label: "VARLYN5E.CALENDAR.Formatters.MonthDay.Label",
      formatter: "formatMonthDay",
      group: "VARLYN5E.CALENDAR.Formatters.Date"
    },
    {
      value: "monthDayYear",
      label: "VARLYN5E.CALENDAR.Formatters.MonthDayYear.Label",
      formatter: "formatMonthDayYear",
      group: "VARLYN5E.CALENDAR.Formatters.Date"
    },
    {
      value: "approximateDate",
      label: "VARLYN5E.CALENDAR.Formatters.ApproximateDate.Label",
      formatter: "formatApproximateDate",
      group: "VARLYN5E.CALENDAR.Formatters.Date"
    },
    {
      value: "hoursMinutes",
      label: "VARLYN5E.CALENDAR.Formatters.HoursMinutes.Label",
      formatter: "formatHoursMinutes",
      group: "VARLYN5E.CALENDAR.Formatters.Time"
    },
    {
      value: "hoursMinutesSeconds",
      label: "VARLYN5E.CALENDAR.Formatters.HoursMinutesSeconds.Label",
      formatter: "formatHoursMinutesSeconds",
      group: "VARLYN5E.CALENDAR.Formatters.Time"
    },
    {
      value: "approximateTime",
      label: "VARLYN5E.CALENDAR.Formatters.ApproximateTime.Label",
      formatter: "formatApproximateTime",
      group: "VARLYN5E.CALENDAR.Formatters.Time"
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
VARLYN5E.requests = {
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
VARLYN5E.ruleTypes = {
  ability: {
    label: "VARLYN5E.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "VARLYN5E.AreaOfEffect.Label",
    references: "areaTargetTypes"
  },
  condition: {
    label: "VARLYN5E.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "VARLYN5E.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "VARLYN5E.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "VARLYN5E.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "VARLYN5E.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "VARLYN5E.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "VARLYN5E.SpellTag",
    references: "itemProperties"
  },
  weaponMastery: {
    label: "VARLYN5E.WEAPON.Mastery.Label",
    references: "weaponMasteries"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
VARLYN5E.rules = {
};

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
VARLYN5E.themes = {
  light: "SHEETS.VARLYN5E.THEME.Light",
  dark: "SHEETS.VARLYN5E.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(VARLYN5E, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(VARLYN5E.abilities),
        damageTypes: Object.fromEntries(
          Object.keys({ ...VARLYN5E.damageTypes, ...VARLYN5E.healingTypes }).map(k => [slugify(k), k])
        ),
        languages: _flattenConfig(VARLYN5E.languages, { labelKey: "label", skipEntry: (k, d) => d.selectable === false }),
        skills: foundry.utils.deepClone(VARLYN5E.skills),
        spellSchools: foundry.utils.deepClone(VARLYN5E.spellSchools),
        tools: foundry.utils.deepClone(VARLYN5E.tools)
      };
      const addFullKeys = key => Object.entries(VARLYN5E[key]).forEach(([k, v]) => {
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
 * Create a flattened version of a nested config (such as CONFIG.VARLYN5E.languages) so all leaf entries are at
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
 * @param {string} key          Key within VARLYN5E that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.VARLYN5E.${key} has been changed to an object.`
      +` The former value can be accessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(VARLYN5E[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default VARLYN5E;
