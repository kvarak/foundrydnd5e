import CompendiumBrowser from "./applications/compendium-browser.mjs";
import CalendarSettingsConfig from "./applications/settings/calendar-settings.mjs";
import CombatSettingsConfig from "./applications/settings/combat-settings.mjs";
import CompendiumBrowserSettingsConfig from "./applications/settings/compendium-browser-settings.mjs";
import VariantRulesSettingsConfig from "./applications/settings/variant-rules-settings.mjs";
import VisibilitySettingsConfig from "./applications/settings/visibility-settings.mjs";
import { CalendarConfigSetting, CalendarPreferencesSetting } from "./data/settings/calendar-setting.mjs";
import PrimaryPartySetting from "./data/settings/primary-party-setting.mjs";
import TransformationSetting from "./data/settings/transformation-setting.mjs";
const { StringField } = foundry.data.fields;

/**
 * Register all of the system's keybindings.
 */
export function registerSystemKeybindings() {
  game.keybindings.register("dnd5e", "skipDialogNormal", {
    name: "KEYBINDINGS.VARLYN5E.SkipDialogNormal",
    editable: [{ key: "ShiftLeft" }, { key: "ShiftRight" }]
  });

  game.keybindings.register("dnd5e", "skipDialogAdvantage", {
    name: "KEYBINDINGS.VARLYN5E.SkipDialogAdvantage",
    editable: [{ key: "AltLeft" }, { key: "AltRight" }]
  });

  game.keybindings.register("dnd5e", "skipDialogDisadvantage", {
    name: "KEYBINDINGS.VARLYN5E.SkipDialogDisadvantage",
    editable: [{ key: "ControlLeft" }, { key: "ControlRight" }, { key: "OsLeft" }, { key: "OsRight" }]
  });

  game.keybindings.register("dnd5e", "dragCopy", {
    name: "KEYBINDINGS.VARLYN5E.DragCopy",
    editable: [{ key: "ControlLeft" }, { key: "ControlRight" }, { key: "AltLeft" }, { key: "AltRight" }]
  });

  game.keybindings.register("dnd5e", "dragMove", {
    name: "KEYBINDINGS.VARLYN5E.DragMove",
    editable: [{ key: "ShiftLeft" }, { key: "ShiftRight" }, { key: "OsLeft" }, { key: "OsRight" }]
  });
}

/* -------------------------------------------- */

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  // Polymorph Settings
  game.settings.register("dnd5e", "transformationSettings", {
    scope: "client",
    config: false,
    type: TransformationSetting
  });

  // Movement automation
  game.settings.register("dnd5e", "movementAutomation", {
    name: "SETTINGS.VARLYN5E.AUTOMATION.Movement.Name",
    hint: "SETTINGS.VARLYN5E.AUTOMATION.Movement.Hint",
    scope: "world",
    config: true,
    default: "full",
    type: String,
    choices: {
      full: "SETTINGS.VARLYN5E.AUTOMATION.Movement.Full",
      noBlocking: "SETTINGS.VARLYN5E.AUTOMATION.Movement.NoBlocking",
      none: "SETTINGS.VARLYN5E.AUTOMATION.Movement.None"
    }
  });

  // Sense-to-token vision sync
  game.settings.register("dnd5e", "senseVisionSync", {
    name: "SETTINGS.VARLYN5E.AUTOMATION.SenseVision.Name",
    hint: "SETTINGS.VARLYN5E.AUTOMATION.SenseVision.Hint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      if ( canvas?.ready ) canvas.draw();
    }
  });

  // Allow rotating square templates
  game.settings.register("dnd5e", "gridAlignedSquareTemplates", {
    name: "SETTINGS.5eGridAlignedSquareTemplatesN",
    hint: "SETTINGS.5eGridAlignedSquareTemplatesL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Loyalty
  game.settings.register("dnd5e", "loyaltyScore", {
    name: "SETTINGS.VARLYN5E.LOYALTY.Name",
    hint: "SETTINGS.VARLYN5E.LOYALTY.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Advancements
  game.settings.register("dnd5e", "disableAdvancements", {
    name: "SETTINGS.5eNoAdvancementsN",
    hint: "SETTINGS.5eNoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Concentration Tracking
  game.settings.register("dnd5e", "disableConcentration", {
    name: "SETTINGS.5eNoConcentrationN",
    hint: "SETTINGS.5eNoConcentrationL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("dnd5e", "autoCollapseItemCards", {
    name: "SETTINGS.5eAutoCollapseCardN",
    hint: "SETTINGS.5eAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Collapse Chat Card Trays
  game.settings.register("dnd5e", "autoCollapseChatTrays", {
    name: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Name",
    hint: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Hint",
    scope: "client",
    config: true,
    default: "older",
    type: String,
    choices: {
      manual: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Manual",
      never: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Never",
      older: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Older",
      always: "SETTINGS.VARLYN5E.COLLAPSETRAYS.Always"
    }
  });

  // Allow Rests from Sheet
  game.settings.register("dnd5e", "allowRests", {
    name: "SETTINGS.VARLYN5E.PERMISSIONS.AllowRests.Name",
    hint: "SETTINGS.VARLYN5E.PERMISSIONS.AllowRests.Hint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Allow Polymorphing
  game.settings.register("dnd5e", "allowPolymorphing", {
    name: "SETTINGS.VARLYN5E.PERMISSIONS.AllowTransformation.Name",
    hint: "SETTINGS.VARLYN5E.PERMISSIONS.AllowTransformation.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Allow Summoning
  game.settings.register("dnd5e", "allowSummoning", {
    name: "SETTINGS.VARLYN5E.PERMISSIONS.AllowSummoning.Name",
    hint: "SETTINGS.VARLYN5E.PERMISSIONS.AllowSummoning.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Metric Length Weights
  game.settings.register("dnd5e", "metricLengthUnits", {
    name: "SETTINGS.VARLYN5E.METRIC.LengthUnits.Name",
    hint: "SETTINGS.VARLYN5E.METRIC.LengthUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Metric Volume Weights
  game.settings.register("dnd5e", "metricVolumeUnits", {
    name: "SETTINGS.VARLYN5E.METRIC.VolumeUnits.Name",
    hint: "SETTINGS.VARLYN5E.METRIC.VolumeUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Metric Unit Weights
  game.settings.register("dnd5e", "metricWeightUnits", {
    name: "SETTINGS.VARLYN5E.METRIC.WeightUnits.Name",
    hint: "SETTINGS.VARLYN5E.METRIC.WeightUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Strict validation
  game.settings.register("dnd5e", "strictValidation", {
    scope: "world",
    config: false,
    type: Boolean,
    default: true
  });

  // Compendium Browser source exclusion
  game.settings.registerMenu("dnd5e", "packSourceConfiguration", {
    name: "VARLYN5E.CompendiumBrowser.Sources.Name",
    label: "VARLYN5E.CompendiumBrowser.Sources.Label",
    hint: "VARLYN5E.CompendiumBrowser.Sources.Hint",
    icon: "fas fa-book-open-reader",
    type: CompendiumBrowserSettingsConfig,
    restricted: true
  });

  game.settings.register("dnd5e", "packSourceConfiguration", {
    name: "Pack Source Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: () => {
      // Refresh all open Compendium Browser instances when source configuration changes
      foundry.applications.instances.forEach(app => {
        if ( app instanceof CompendiumBrowser ) {
          app.render({ parts: ["results", "filters"], changedTab: true });
        }
      });
    }
  });

  // Calendar Settings
  game.settings.registerMenu("dnd5e", "calendarConfiguration", {
    name: "VARLYN5E.CALENDAR.Configuration.Name",
    label: "VARLYN5E.CALENDAR.Configuration.Label",
    hint: "VARLYN5E.CALENDAR.Configuration.Hint",
    icon: "fas fa-calendar-days",
    type: CalendarSettingsConfig
  });

  game.settings.register("dnd5e", "calendar", {
    name: "VARLYN5E.CALENDAR.FIELDS.calendar.label",
    hint: "VARLYN5E.CALENDAR.FIELDS.calendar.hint",
    scope: "world",
    config: false,
    type: new StringField({
      required: true, blank: false, initial: "gregorian", choices: () => Object.fromEntries(
        CONFIG.VARLYN5E.calendar.calendars.map(({ value, label }) => [value, label])
      )
    }),
    requiresReload: true
  });

  game.settings.register("dnd5e", "calendarConfig", {
    name: "Calendar Configuration",
    scope: "world",
    config: false,
    type: CalendarConfigSetting,
    onChange: () => varlyn5e.ui.calendar?.onUpdateSettings?.()
  });

  game.settings.register("dnd5e", "calendarPreferences", {
    name: "Calendar Preferences",
    scope: "user",
    config: false,
    type: CalendarPreferencesSetting,
    onChange: () => varlyn5e.ui.calendar?.onUpdateSettings?.()
  });

  // Combat Settings
  game.settings.registerMenu("dnd5e", "combatConfiguration", {
    name: "SETTINGS.VARLYN5E.COMBAT.Name",
    label: "SETTINGS.VARLYN5E.COMBAT.Label",
    hint: "SETTINGS.VARLYN5E.COMBAT.Hint",
    icon: "fas fa-explosion",
    type: CombatSettingsConfig,
    restricted: true
  });

  game.settings.register("dnd5e", "autoRecharge", {
    name: "SETTINGS.VARLYN5E.NPCS.AutoRecharge.Name",
    hint: "SETTINGS.VARLYN5E.NPCS.AutoRecharge.Hint",
    scope: "world",
    config: false,
    default: "no",
    type: String,
    choices: {
      no: "SETTINGS.VARLYN5E.NPCS.AutoRecharge.No",
      silent: "SETTINGS.VARLYN5E.NPCS.AutoRecharge.Silent",
      yes: "SETTINGS.VARLYN5E.NPCS.AutoRecharge.Yes"
    }
  });

  game.settings.register("dnd5e", "autoRollNPCHP", {
    name: "SETTINGS.VARLYN5E.NPCS.AutoRollNPCHP.Name",
    hint: "SETTINGS.VARLYN5E.NPCS.AutoRollNPCHP.Hint",
    scope: "world",
    config: false,
    default: "no",
    type: String,
    choices: {
      no: "SETTINGS.VARLYN5E.NPCS.AutoRollNPCHP.No",
      silent: "SETTINGS.VARLYN5E.NPCS.AutoRollNPCHP.Silent",
      yes: "SETTINGS.VARLYN5E.NPCS.AutoRollNPCHP.Yes"
    }
  });

  game.settings.register("dnd5e", "criticalDamageModifiers", {
    name: "SETTINGS.VARLYN5E.CRITICAL.MultiplyModifiers.Name",
    hint: "SETTINGS.VARLYN5E.CRITICAL.MultiplyModifiers.Hint",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register("dnd5e", "criticalDamageMaxDice", {
    name: "SETTINGS.VARLYN5E.CRITICAL.MaxDice.Name",
    hint: "SETTINGS.VARLYN5E.CRITICAL.MaxDice.Hint",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register("dnd5e", "encounterPlacementBehavior", {
    name: "SETTINGS.VARLYN5E.ENCOUNTERS.EncounterPlacementBehavior.Name",
    hint: "SETTINGS.VARLYN5E.ENCOUNTERS.EncounterPlacementBehavior.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.VARLYN5E.ENCOUNTERS.EncounterPlacementBehavior.None",
      createCombatants: "SETTINGS.VARLYN5E.ENCOUNTERS.EncounterPlacementBehavior.CreateCombatants",
      rollInitiative: "SETTINGS.VARLYN5E.ENCOUNTERS.EncounterPlacementBehavior.RollInitiative"
    }
  });

  game.settings.register("dnd5e", "initiativeDexTiebreaker", {
    name: "SETTINGS.VARLYN5E.COMBAT.DexTiebreaker.Name",
    hint: "SETTINGS.VARLYN5E.COMBAT.DexTiebreaker.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
  });

  game.settings.register("dnd5e", "initiativeGroupCombatants", {
    name: "SETTINGS.VARLYN5E.COMBAT.InitiativeGroupCombatants.Name",
    hint: "SETTINGS.VARLYN5E.COMBAT.InitiativeGroupCombatants.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("dnd5e", "initiativeGroupRoll", {
    name: "SETTINGS.VARLYN5E.COMBAT.InitiativeGroupRoll.Name",
    hint: "SETTINGS.VARLYN5E.COMBAT.InitiativeGroupRoll.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("dnd5e", "initiativeScore", {
    name: "SETTINGS.VARLYN5E.COMBAT.InitiativeScore.Name",
    hint: "SETTINGS.VARLYN5E.COMBAT.InitiativeScore.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.VARLYN5E.COMBAT.InitiativeScore.None",
      npcs: "SETTINGS.VARLYN5E.COMBAT.InitiativeScore.NPCs",
      all: "SETTINGS.VARLYN5E.COMBAT.InitiativeScore.All"
    }
  });

  // Variant Rules
  game.settings.registerMenu("dnd5e", "variantRulesConfiguration", {
    name: "SETTINGS.VARLYN5E.VARIANT.Name",
    label: "SETTINGS.VARLYN5E.VARIANT.Label",
    hint: "SETTINGS.VARLYN5E.VARIANT.Hint",
    icon: "fas fa-list-check",
    type: VariantRulesSettingsConfig,
    restricted: true
  });

  game.settings.register("dnd5e", "allowFeats", {
    name: "SETTINGS.VARLYN5E.VARIANT.AllowFeats.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.AllowFeats.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("dnd5e", "currencyWeight", {
    name: "SETTINGS.VARLYN5E.VARIANT.CurrencyWeight.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.CurrencyWeight.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("dnd5e", "encumbrance", {
    name: "SETTINGS.VARLYN5E.VARIANT.Encumbrance.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.Encumbrance.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.VARLYN5E.VARIANT.Encumbrance.None",
      normal: "SETTINGS.VARLYN5E.VARIANT.Encumbrance.Normal",
      variant: "SETTINGS.VARLYN5E.VARIANT.Encumbrance.Variant"
    }
  });

  game.settings.register("dnd5e", "levelingMode", {
    name: "SETTINGS.VARLYN5E.VARIANT.LevelingMode.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.LevelingMode.Hint",
    scope: "world",
    config: false,
    default: "xpBoons",
    type: String,
    choices: {
      noxp: "SETTINGS.VARLYN5E.VARIANT.LevelingMode.NoXP",
      xp: "SETTINGS.VARLYN5E.VARIANT.LevelingMode.XP",
      xpBoons: "SETTINGS.VARLYN5E.VARIANT.LevelingMode.XPBoons"
    }
  });

  game.settings.register("dnd5e", "proficiencyModifier", {
    name: "SETTINGS.VARLYN5E.VARIANT.ProficiencyModifier.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.ProficiencyModifier.Hint",
    scope: "world",
    config: false,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.VARLYN5E.VARIANT.ProficiencyModifier.Bonus",
      dice: "SETTINGS.VARLYN5E.VARIANT.ProficiencyModifier.Dice"
    }
  });

  game.settings.register("dnd5e", "restVariant", {
    name: "SETTINGS.VARLYN5E.VARIANT.Rest.Name",
    hint: "SETTINGS.VARLYN5E.VARIANT.Rest.Hint",
    scope: "world",
    config: false,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.VARLYN5E.VARIANT.Rest.Normal",
      gritty: "SETTINGS.VARLYN5E.VARIANT.Rest.Gritty",
      epic: "SETTINGS.VARLYN5E.VARIANT.Rest.Epic"
    }
  });

  // Visibility Settings
  game.settings.registerMenu("dnd5e", "visibilityConfiguration", {
    name: "SETTINGS.VARLYN5E.VISIBILITY.Name",
    label: "SETTINGS.VARLYN5E.VISIBILITY.Label",
    hint: "SETTINGS.VARLYN5E.VISIBILITY.Hint",
    icon: "fas fa-eye",
    type: VisibilitySettingsConfig,
    restricted: true
  });

  game.settings.register("dnd5e", "attackRollVisibility", {
    name: "SETTINGS.VARLYN5E.VISIBILITY.Attack.Name",
    hint: "SETTINGS.VARLYN5E.VISIBILITY.Attack.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      all: "SETTINGS.VARLYN5E.VISIBILITY.Attack.All",
      hideAC: "SETTINGS.VARLYN5E.VISIBILITY.Attack.HideAC",
      none: "SETTINGS.VARLYN5E.VISIBILITY.Attack.None"
    }
  });

  game.settings.register("dnd5e", "bloodied", {
    name: "SETTINGS.VARLYN5E.BLOODIED.Name",
    hint: "SETTINGS.VARLYN5E.BLOODIED.Hint",
    scope: "world",
    config: false,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.VARLYN5E.BLOODIED.All",
      player: "SETTINGS.VARLYN5E.BLOODIED.Player",
      none: "SETTINGS.VARLYN5E.BLOODIED.None"
    }
  });

  game.settings.register("dnd5e", "challengeVisibility", {
    name: "SETTINGS.VARLYN5E.VISIBILITY.Challenge.Name",
    hint: "SETTINGS.VARLYN5E.VISIBILITY.Challenge.Hint",
    scope: "world",
    config: false,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.VARLYN5E.VISIBILITY.Challenge.All",
      player: "SETTINGS.VARLYN5E.VISIBILITY.Challenge.Player",
      none: "SETTINGS.VARLYN5E.VISIBILITY.Challenge.None"
    }
  });

  game.settings.register("dnd5e", "concealItemDescriptions", {
    name: "SETTINGS.VARLYN5E.VISIBILITY.ItemDescriptions.Name",
    hint: "SETTINGS.VARLYN5E.VISIBILITY.ItemDescriptions.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
  });

  // Primary Group
  game.settings.register("dnd5e", "primaryParty", {
    name: "Primary Party",
    scope: "world",
    config: false,
    default: null,
    type: PrimaryPartySetting,
    onChange: s => ui.actors.render()
  });

  // Control hints
  game.settings.register("dnd5e", "controlHints", {
    name: "VARLYN5E.Controls.Name",
    hint: "VARLYN5E.Controls.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  // NPC sheet default skills
  game.settings.register("dnd5e", "defaultSkills", {
    name: "SETTINGS.VARLYN5E.DEFAULTSKILLS.Name",
    hint: "SETTINGS.VARLYN5E.DEFAULTSKILLS.Hint",
    type: new foundry.data.fields.SetField(
      new foundry.data.fields.StringField({
        choices: () => CONFIG.VARLYN5E.skills
      })
    ),
    default: [],
    config: true
  });

  cacheSettings();
}

/* -------------------------------------------- */

/**
 * Cache various World settings to improve performance.
 */
function cacheSettings() {
  varlyn5e.settings = { rulesVersion: "modern" };
  for ( const setting of game.settings.settings.values() ) {
    const { key, namespace, onChange, requiresReload, scope } = setting;
    if ( (scope !== "world") || (namespace !== "dnd5e") ) continue;
    varlyn5e.settings[key] = game.settings.get(namespace, key);
    if ( !requiresReload ) setting.onChange = (value, ...args) => {
      varlyn5e.settings[key] = value;
      onChange?.(value, ...args);
    };
  }
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings() {
  game.settings.register("dnd5e", "defaultDocumentSubtypes", {
    name: "Default Document Subtypes",
    scope: "client",
    config: false,
    type: Object,
    default: { Actor: game.user.isGM ? "npc" : "character", Item: "feat" }
  });

  game.settings.register("dnd5e", "theme", {
    name: "SETTINGS.VARLYN5E.THEME.Name",
    hint: "SETTINGS.VARLYN5E.THEME.Hint",
    scope: "client",
    config: false,
    default: "",
    type: String,
    choices: {
      "": "SHEETS.VARLYN5E.THEME.Automatic",
      ...CONFIG.VARLYN5E.themes
    },
    onChange: s => setTheme(document.body, s)
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5e", "theme"));
  });
  matchMedia("(prefers-contrast: more)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5e", "theme"));
  });

  // Hook into core color scheme setting.
  const setting = game.settings.get("core", "uiConfig");
  const settingConfig = game.settings.settings.get("core.uiConfig");
  const { onChange } = settingConfig ?? {};
  if ( onChange ) settingConfig.onChange = (s, ...args) => {
    onChange(s, ...args);
    setTheme(document.body, s.colorScheme);
  };
  setTheme(document.body, setting.colorScheme);
}

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param {HTMLElement} element     Body or sheet element on which to set the theme data.
 * @param {string} [theme=""]       Theme key to set.
 * @param {Set<string>} [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element, theme="", flags=new Set()) {
  if ( foundry.utils.getType(theme) === "Object" ) theme = theme.applications;
  element.className = element.className.replace(/\bdnd5e-(theme|flag)-[\w-]+\b/g, "");

  // Primary Theme
  if ( !theme && (element === document.body) ) {
    if ( matchMedia("(prefers-color-scheme: dark)").matches ) theme = "dark";
    if ( matchMedia("(prefers-color-scheme: light)").matches ) theme = "light";
  }
  if ( theme ) {
    element.classList.add(`varlyn5e-theme-${theme.slugify()}`);
    element.dataset.theme = theme;
  }
  else delete element.dataset.theme;

  // Additional Flags
  if ( (element === document.body) && matchMedia("(prefers-contrast: more)").matches ) flags.add("high-contrast");
  for ( const flag of flags ) element.classList.add(`varlyn5e-flag-${flag.slugify()}`);
  element.dataset.themeFlags = Array.from(flags).join(" ");
}
