import { getRulesVersion } from "../../enrichers.mjs";
import { filteredKeys, formatNumber } from "../../utils.mjs";
import ItemDataModel from "../abstract/item-data-model.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import ActivationField from "../shared/activation-field.mjs";
import DurationField from "../shared/duration-field.mjs";
import RangeField from "../shared/range-field.mjs";
import TargetField from "../shared/target-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

const { BooleanField, NumberField, SchemaField, SetField, StringField } = foundry.data.fields;

/**
 * @import { SpellItemSystemData } from "./_types.mjs";
 * @import { ActivitiesTemplateData ItemDescriptionTemplateData } from "./templates/_types.mjs";
 */

/**
 * Data definition for Spell items.
 * @extends {ItemDataModel<ActivitiesTemplate & ItemDescriptionTemplate & SpellItemSystemData>}
 * @mixes ActivitiesTemplateData
 * @mixes ItemDescriptionTemplateData
 * @mixes SpellItemSystemData
 */
export default class SpellData extends ItemDataModel.mixin(ActivitiesTemplate, ItemDescriptionTemplate) {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @override */
  static LOCALIZATION_PREFIXES = [
    "VARLYN5E.ACTIVATION", "VARLYN5E.DURATION", "VARLYN5E.RANGE", "VARLYN5E.SOURCE", "VARLYN5E.TARGET"
  ];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      ability: new StringField({ label: "VARLYN5E.SpellAbility" }),
      activation: new ActivationField(),
      duration: new DurationField(),
      level: new NumberField({ required: true, integer: true, initial: 1, min: 0, label: "VARLYN5E.SpellLevel" }),
      materials: new SchemaField({
        value: new StringField({ required: true, label: "VARLYN5E.SpellMaterialsDescription" }),
        consumed: new BooleanField({ required: true, label: "VARLYN5E.SpellMaterialsConsumed" }),
        cost: new NumberField({ required: true, initial: 0, min: 0, label: "VARLYN5E.SpellMaterialsCost" }),
        supply: new NumberField({ required: true, initial: 0, min: 0, label: "VARLYN5E.SpellMaterialsSupply" })
      }, { label: "VARLYN5E.SpellMaterials" }),
      method: new StringField({ required: true, initial: "", label: "VARLYN5E.SpellPreparation.Method" }),
      prepared: new NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 0 }),
      properties: new SetField(new StringField(), { label: "VARLYN5E.SpellComponents" }),
      range: new RangeField(),
      school: new StringField({ required: true, label: "VARLYN5E.SpellSchool" }),
      sourceItem: new IdentifierField({ allowType: true, label: "VARLYN5E.SourceItem.Label" }),
      target: new TargetField()
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    enchantable: true,
    hasEffects: true
  }, { inplace: false }));

  /* -------------------------------------------- */

  /** @override */
  static get compendiumBrowserFilters() {
    return new Map([
      ["level", {
        label: "VARLYN5E.Level",
        type: "range",
        config: {
          keyPath: "system.level",
          min: 0,
          max: Object.keys(CONFIG.VARLYN5E.spellLevels).length - 1
        }
      }],
      ["school", {
        label: "VARLYN5E.School",
        type: "set",
        config: {
          choices: CONFIG.VARLYN5E.spellSchools,
          keyPath: "system.school"
        }
      }],
      ["spelllist", {
        label: "TYPES.JournalEntryPage.spells",
        type: "set",
        createFilter: (filters, value, def) => {
          let include = new Set();
          let exclude = new Set();
          for ( const [k, v] of Object.entries(value ?? {}) ) {
            const list = varlyn5e.registry.spellLists.forType(k);
            if ( !list || (v === 0) ) continue;
            if ( v === 1 ) include = include.union(list.identifiers);
            else if ( v === -1 ) exclude = exclude.union(list.identifiers);
          }
          if ( include.size ) filters.push({ k: "system.identifier", o: "in", v: include });
          if ( exclude.size ) filters.push({ o: "NOT", v: { k: "system.identifier", o: "in", v: exclude } });
        },
        config: {
          choices: varlyn5e.registry.spellLists.options.reduce((obj, entry) => {
            const [type, identifier] = entry.value.split(":");
            const list = varlyn5e.registry.spellLists.forType(type, identifier);
            if ( list?.identifiers.size ) obj[entry.value] = {
              label: entry.label, group: CONFIG.VARLYN5E.spellListTypes[type]
            };
            return obj;
          }, {}),
          collapseGroup: group => group !== CONFIG.VARLYN5E.spellListTypes.class
        }
      }],
      ["properties", this.compendiumBrowserPropertiesFilter("spell")]
    ]);
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Attack classification of this spell.
   * @type {"spell"}
   */
  get attackClassification() {
    return "spell";
  }

  /* -------------------------------------------- */

  /**
   * The identifier of the spellcasting class associated with this spell, resolved through subclass parentage where
   * necessary. Returns an empty string if the spell was not granted by a class or subclass item.
   * @type {string}
   */
  get classIdentifier() {
    if ( !this.sourceItem ) return "";
    const sourceItem = this.parent?.actor?.identifiedItems.get(this.sourceItem)?.first();
    if ( sourceItem?.type === "class" ) return sourceItem.identifier;
    if ( sourceItem?.type === "subclass" ) return sourceItem.system.classIdentifier ?? "";
    return "";
  }

  /* -------------------------------------------- */

  /** @override */
  get availableAbilities() {
    if ( this.ability ) return new Set([this.ability]);

    const spellcasting = this.parent?.actor?.spellcastingClasses[this.classIdentifier]?.spellcasting.ability
      ?? this.parent?.actor?.system.attributes?.spellcasting;
    return new Set(spellcasting ? [spellcasting] : []);
  }

  /* -------------------------------------------- */

  /** @override */
  get canConfigureScaling() {
    return this.level > 0;
  }

  /* -------------------------------------------- */

  /**
   * Whether the spell can be prepared.
   * @type {boolean}
   */
  get canPrepare() {
    return !!CONFIG.VARLYN5E.spellcasting[this.method]?.prepares;
  }

  /* -------------------------------------------- */

  /** @override */
  get canScale() {
    return (this.level > 0) && !!CONFIG.VARLYN5E.spellcasting[this.method]?.slots;
  }

  /* -------------------------------------------- */

  /** @override */
  get canScaleDamage() {
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [
      this.parent.labels.level,
      this.parent.labels.components.vsm + (this.parent.labels.materials ? ` (${this.parent.labels.materials})` : ""),
      ...this.parent.labels.components.tags,
      this.parent.labels.duration
    ];
  }

  /* -------------------------------------------- */

  /**
   * Whether this spell counts towards a class' number of prepared spells.
   * @type {boolean}
   */
  get countsPrepared() {
    return !!CONFIG.VARLYN5E.spellcasting[this.method]?.prepares
      && (this.level > 0)
      && (this.prepared === CONFIG.VARLYN5E.spellPreparationStates.prepared.value);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  get _typeAbilityMod() {
    return this.availableAbilities.first() ?? "int";
  }

  /* -------------------------------------------- */

  /** @override */
  get criticalThreshold() {
    return this.parent?.actor?.flags["varlyn-dnd5e"]?.spellCriticalThreshold ?? Infinity;
  }

  /* -------------------------------------------- */

  /**
   * Retrieve a linked activity that granted this spell using the stored `cachedFor` value.
   * @returns {Activity|null}
   */
  get linkedActivity() {
    const relative = this.parent.actor;
    const uuid = this.parent.getFlag("varlyn-dnd5e", "cachedFor");
    if ( !relative || !uuid ) return null;
    const data = foundry.utils.parseUuid(uuid, { relative });
    const [itemId, , activityId] = (data?.embedded ?? []).slice(-3);
    return relative.items.get(itemId)?.system.activities?.get(activityId) ?? null;
    // TODO: Swap back to fromUuidSync once https://github.com/foundryvtt/foundryvtt/issues/11214 is resolved
    // return fromUuidSync(this.parent.getFlag("varlyn-dnd5e", "cachedFor"), { relative, strict: false }) ?? null;
  }

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   * @returns {number}
   */
  get proficiencyMultiplier() {
    return 1;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  get scalingIncrease() {
    if ( this.level === 0 ) return Math.floor(((this.parent.actor?.system.cantripLevel?.(this.parent) ?? 0) + 1) / 6);
    const activity = this.linkedActivity;
    if ( !activity?.spell?.level || (activity.spell.level <= this.level) ) return null;
    return activity.spell.level - this.level;
  }

  /* -------------------------------------------- */

  /** @override */
  get tooltipSubtitle() {
    return [this.parent.labels.level, CONFIG.VARLYN5E.spellSchools[this.school]?.label];
  }

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static _migrateData(source) {
    super._migrateData(source);
    ActivitiesTemplate.migrateActivities(source);
    SpellData.#migrateActivation(source);
    SpellData.#migrateTarget(source);
    SpellData.#migratePreparation(source);
    SpellData.#migrateSourceItem(source);
    return source;
  }

  /* -------------------------------------------- */

  /**
   * Migrate the component object to be 'properties' instead.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static _migrateComponentData(source) {
    const components = filteredKeys(source.system?.components ?? {});
    if ( components.length ) {
      foundry.utils.setProperty(source, "flags.varlyn-dnd5e.migratedProperties", components);
    }
  }

  /* -------------------------------------------- */

  /**
   * Migrate activation data.
   * Added in DnD5e 4.0.0.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateActivation(source) {
    if ( source.activation?.cost ) source.activation.value = source.activation.cost;
  }

  /* -------------------------------------------- */

  /**
   * Migrate target data.
   * Added in DnD5e 4.0.0.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateTarget(source) {
    if ( !("target" in source) ) return;
    source.target.affects ??= {};
    source.target.template ??= {};

    if ( "units" in source.target ) source.target.template.units = source.target.units;
    if ( "width" in source.target ) source.target.template.width = source.target.width;

    const type = source.target.type ?? source.target.template.type ?? source.target.affects.type;
    if ( type in CONFIG.VARLYN5E.areaTargetTypes ) {
      if ( "type" in source.target ) source.target.template.type = type;
      if ( "value" in source.target ) source.target.template.size = source.target.value;
    } else if ( type in CONFIG.VARLYN5E.individualTargetTypes ) {
      if ( "type" in source.target ) source.target.affects.type = type;
      if ( "value" in source.target ) source.target.affects.count = source.target.value;
    }
  }

  /* -------------------------------------------- */

  /**
   * Migrate preparation data.
   * @since 5.1.0
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migratePreparation(source) {
    if ( source.preparation === undefined ) return;
    if ( source.preparation.mode === "always" ) {
      if ( !("method" in source) ) source.method = "spell";
      if ( !("prepared" in source) ) source.prepared = 2;
    } else {
      if ( !("method" in source) ) {
        if ( source.preparation.mode === "prepared" ) source.method = "spell";
        else if ( source.preparation.mode ) source.method = source.preparation.mode;
      }
      if ( (typeof source.preparation.prepared === "boolean") && !("prepared" in source) ) {
        source.prepared = Number(source.preparation.prepared);
      }
    }
    delete source.preparation;
  }

  /* -------------------------------------------- */

  /**
   * Migrate sourceClass to sourceItem.
   * @since 5.3.0
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSourceItem(source) {
    if ( "sourceClass" in source ) {
      if ( source.sourceClass ) source.sourceItem = `class:${source.sourceClass}`;
      delete source.sourceClass;
    }
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.prepareDescriptionData();
    this.properties.add("mgc");
    this.duration.concentration = this.properties.has("concentration");

    const labels = this.parent.labels ??= {};
    labels.level = CONFIG.VARLYN5E.spellLevels[this.level];
    labels.school = CONFIG.VARLYN5E.spellSchools[this.school]?.label;
    if ( this.properties.has("material") ) labels.materials = this.materials.value;

    labels.components = this.properties.reduce((obj, c) => {
      const config = this.validProperties.has(c) ? CONFIG.VARLYN5E.itemProperties[c] : null;
      if ( !config ) return obj;
      const { abbreviation: abbr, label, icon } = config;
      // Only add properties to display arrays if they have displayable content
      if ( config.isTag ) {
        // Tag properties: add to tags if has label
        if ( label ) obj.tags.push(label);
        if ( abbr || icon ) obj.all.push({ abbr, icon, tag: true });
      } else if ( abbr ) {
        // VSM properties: only add if has abbreviation
        obj.vsm.push(abbr);
        obj.all.push({ abbr, icon, tag: false });
      }
      // Properties with neither abbreviation nor isTag are silently ignored for display
      return obj;
    }, { all: [], vsm: [], tags: [] });
    labels.components.vsm = game.i18n.getListFormatter({ style: "narrow" }).format(labels.components.vsm);
    labels.components.full = labels.materials ? _loc("VARLYN5E.SpellComponentsMaterial", {
      components: labels.components.vsm, materials: labels.materials
    }) : labels.components.vsm;

    const uuid = this.parent._stats.compendiumSource ?? this.parent.uuid;
    Object.defineProperty(labels, "classes", {
      get() {
        return Array.from(varlyn5e.registry.spellLists.forSpell(uuid))
          .filter(list => list.metadata.type === "class")
          .map(list => list.name)
          .sort((lhs, rhs) => lhs.localeCompare(rhs, game.i18n.lang));
      },
      configurable: true
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData() {
    const rollData = this.parent.getRollData({ deterministic: true });
    const labels = this.parent.labels ??= {};
    this.prepareFinalActivityData(rollData);
    ActivationField.prepareData.call(this, rollData, labels);
    DurationField.prepareData.call(this, rollData, labels);
    RangeField.prepareData.call(this, rollData, labels);
    TargetField.prepareData.call(this, rollData, labels);

    // Count preparations.
    if ( this.classIdentifier && this.countsPrepared ) {
      const sourceClass = this.parent.actor.spellcastingClasses[this.classIdentifier];
      const sourceSubclass = sourceClass?.subclass;
      if ( sourceClass ) sourceClass.system.spellcasting.preparation.value++;
      if ( sourceSubclass ) sourceSubclass.system.spellcasting.preparation.value++;
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getCardData(options) {
    const context = await super.getCardData(options);
    context.isSpell = true;
    const { activation, components, duration, range, target } = this.parent.labels;
    context.properties = [components?.vsm, activation, duration, range, target].filter(_ => _);
    if ( !this.properties.has("material") ) delete context.materials;
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getFavoriteData() {
    return foundry.utils.mergeObject(await super.getFavoriteData(), {
      subtitle: [this.parent.labels.components.vsm, this.parent.labels.activation],
      modifier: this.parent.labels.modifier,
      range: this.range,
      save: this.activities.getByType("save")[0]?.save
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getSheetData(context) {
    context.properties.active = [...(this.parent.labels?.components?.tags ?? []), ...(context.labels.classes ?? [])];
    context.subtitles = [
      { label: context.labels.level },
      { label: context.labels.school },
      { label: CONFIG.VARLYN5E.spellcasting[this.method]?.label }
    ];

    context.parts = ["varlyn5e.details-spell", "varlyn5e.field-uses"];
    context.sourceItemLocked = false;

    // Default Ability & Spellcasting Classes
    if ( this.parent.actor ) {
      // Get spell source item.
      const sourceItem = this.sourceItem
        ? this.parent.actor.identifiedItems.get(this.sourceItem)?.first()
        : null;

      const ability = CONFIG.VARLYN5E.abilities[
        this.parent.actor.spellcastingClasses[this.classIdentifier]?.spellcasting.ability
          ?? this.parent.actor.system.attributes?.spellcasting
      ]?.label?.toLowerCase();
      if ( ability ) context.defaultAbility = _loc("VARLYN5E.DefaultSpecific", { default: ability });
      else context.defaultAbility = _loc("VARLYN5E.Default");
      context.spellcastingClasses = Object.entries(this.parent.actor.spellcastingClasses ?? {})
        .map(([value, cls]) => ({ value: `class:${value}`, label: cls.name }));

      // Spells granted by non-class Items are locked.
      if ( sourceItem?.type !== "class" ) {
        let grantingItem = sourceItem;

        // Fallback to detecting from flags.
        if ( !grantingItem ) {
          // Check for advancement-granted spells.
          const advancementOrigin = this.parent.getFlag("varlyn-dnd5e", "advancementOrigin");
          if ( advancementOrigin ) {
            const [itemId] = advancementOrigin.split(".");
            grantingItem = this.parent.actor.items.get(itemId);
          }

          // Check for item-granted spells.
          grantingItem ??= this.linkedActivity?.item;
        }

        if ( grantingItem ) {
          context.spellcastingClasses.push({
            value: `${grantingItem.type}:${grantingItem.identifier}`,
            label: grantingItem.name
          });

          if ( !this.sourceItem ) context.source.sourceItem = `${grantingItem.type}:${grantingItem.identifier}`;

          context.sourceItemLocked = true;
          context.sourceItemHint = "VARLYN5E.SourceItem.LockedHint";
        }
      }
    }

    // Activation
    context.activationTypes = [
      ...Object.entries(CONFIG.VARLYN5E.activityActivationTypes).map(([value, { label, group }]) => {
        return { value, label, group };
      }),
      { value: "", label: "VARLYN5E.NoneActionLabel" }
    ];

    // Duration
    context.durationUnits = [
      ...Object.entries(CONFIG.VARLYN5E.specialTimePeriods).map(([value, label]) => ({ value, label })),
      ...Object.entries(CONFIG.VARLYN5E.scalarTimePeriods).map(([value, label]) => {
        return { value, label, group: "VARLYN5E.DurationTime" };
      }),
      ...Object.entries(CONFIG.VARLYN5E.permanentTimePeriods).map(([value, label]) => {
        return { value, label, group: "VARLYN5E.DurationPermanent" };
      })
    ];

    // Targets
    context.targetTypes = [
      ...Object.entries(CONFIG.VARLYN5E.individualTargetTypes).map(([value, { label }]) => {
        return { value, label, group: "VARLYN5E.TargetTypeIndividual" };
      }),
      ...Object.entries(CONFIG.VARLYN5E.areaTargetTypes).map(([value, { label }]) => {
        return { value, label, group: "VARLYN5E.TargetTypeArea" };
      })
    ];
    context.scalarTarget = this.target.affects.type
      && (CONFIG.VARLYN5E.individualTargetTypes[this.target.affects.type]?.scalar !== false);
    context.affectsPlaceholder = _loc(`VARLYN5E.TARGET.Count.${
      this.target?.template?.type ? "Every" : "Any"}`);
    context.dimensions = this.target.template.dimensions;
    // TODO: Ensure this behaves properly with enchantments, will probably need source target data

    // Range
    context.rangeTypes = [
      ...Object.entries(CONFIG.VARLYN5E.rangeTypes).map(([value, label]) => ({ value, label })),
      ...Object.entries(CONFIG.VARLYN5E.movementUnits).map(([value, { label }]) => {
        return { value, label, group: "VARLYN5E.RangeDistance" };
      })
    ];

    // Spellcasting
    context.canPrepare = this.canPrepare;
    context.spellcastingMethods = Object.values(CONFIG.VARLYN5E.spellcasting).map(({ key, label }) => {
      return { label, value: key };
    });
    if ( this.method && !(this.method in CONFIG.VARLYN5E.spellcasting) ) {
      context.spellcastingMethods.push({ label: this.method, value: this.method });
    }
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @override */
  static onDropCreate(event, actor, itemData) {
    if ( !actor?.system.isCreature ) return;

    // Determine the section it is dropped on, if any.
    let header = event.target.closest(".items-header"); // Dropped directly on the header.
    if ( !header ) {
      const list = event.target.closest(".item-list"); // Dropped inside an existing list.
      header = list?.previousElementSibling;
    }
    const { method } = header?.closest("[data-level]")?.dataset ?? {};

    // Determine the actor's spell slot progressions, if any.
    const spellcastKeys = Object.keys(CONFIG.VARLYN5E.spellcasting);
    const progs = Object.values(actor.classes).reduce((acc, cls) => {
      const type = cls.spellcasting?.type;
      if ( spellcastKeys.includes(type) ) acc.add(type);
      return acc;
    }, new Set());

    const { system } = itemData;
    const methods = CONFIG.VARLYN5E.spellcasting;
    if ( methods[method] ) system.method = method;
    else if ( progs.size ) system.method = progs.first();
    else if ( actor.system.attributes.spell?.level ) system.method = "spell";
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getRollData(...options) {
    const data = super.getRollData(...options);
    data.item.level = data.item.level + (this.parent.getFlag("varlyn-dnd5e", "scaling")
      ?? (this.level !== 0 ? this.scalingIncrease : 0));
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  async toEmbed(config, options={}) {
    const description = await super.toEmbed(config, options);
    config.details ??= config.values.includes("details");
    if ( !config.details ) return description;

    const details = document.createElement("div");
    details.classList.add("item-entry-details");
    const labels = this.parent.labels;
    const rulesVersion = getRulesVersion(config, { ...options, relativeTo: this.parent });

    const tag = document.createElement("p");
    tag.classList.add("item-entry-tag");
    const classes = labels.classes;
    tag.innerText = _loc(
      `VARLYN5E.SPELL.Embed.Tag.${!this.level ? "Cantrip" : "Leveled"}${rulesVersion === "2014" ? "Legacy" : ""}`,
      {
        level: formatNumber(this.level),
        levelOrdinal: formatNumber(this.level, { ordinal: true }),
        school: CONFIG.VARLYN5E.spellSchools[this.school]?.label ?? ""
      }
    );
    if ( (rulesVersion === "2014") && this.properties.has("ritual") ) {
      tag.innerText = _loc("VARLYN5E.SPELL.Embed.Tag.Ritual", { levelSchool: tag.innerText });
    } else if ( (rulesVersion === "2024") && classes?.length ) {
      tag.innerText = _loc("VARLYN5E.SPELL.Embed.Tag.Classes", {
        classes: game.i18n.getListFormatter({ type: "unit" }).format(classes),
        levelSchool: tag.innerText
      });
    }
    details.append(tag);

    let castingTime = rulesVersion === "2014" ? labels.legacyActivation : labels.ritualActivation;
    if ( (this.activation.type === "reaction") && this.activation.condition ) castingTime = _loc(
      "VARLYN5E.SPELL.Embed.CastingTimeTrigger", { castingTime, trigger: this.activation.condition }
    );
    const specifics = [
      ["VARLYN5E.SpellCastTime", castingTime],
      ["VARLYN5E.SpellHeader.Range", labels.description.range || labels.range],
      ["VARLYN5E.Components", labels.components.full],
      ["VARLYN5E.Duration", labels.concentrationDuration]
    ];
    const dl = document.createElement("dl");
    dl.classList.add("item-entry-specifics");
    for ( const [label, description] of specifics ) {
      const div = document.createElement("div");
      const dt = document.createElement("dt");
      dt.innerText = _loc(label);
      const dd = document.createElement("dd");
      dd.innerText = description;
      div.append(dt, dd);
      dl.append(div);
    }
    details.append(dl);

    const template = document.createElement("template");
    template.append(details, ...description);

    /**
     * A hook event that fires after an embedded spell with details is rendered.
     * @function varlyn5e.renderEmbeddedSpell
     * @memberof hookEvents
     * @param {Item5e} item                     Spell being embedded.
     * @param {HTMLTemplateElement} template    Template whose children will be embedded.
     * @param {DocumentHTMLEmbedConfig} config  Configuration for embedding behavior.
     * @param {EnrichmentOptions} options       Original enrichment options.
     */
    Hooks.call("varlyn5e.renderEmbeddedSpell", this.parent, template, config, options);

    return template.children;
  }

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preCreate(data, options, user) {
    if ( (await super._preCreate(data, options, user)) === false ) return false;
    if ( !this.parent.isEmbedded ) return;
    const system = data.system ?? {};

    // Set as prepared for NPCs, and not prepared for PCs
    if ( this.parent.actor?.system.isCreature && !("prepared" in system) ) {
      this.updateSource({ prepared: Number(this.parent.actor.system.isNPC || (this.level < 1)) });
    }

    if ( ["atwill", "innate"].includes(system.method) || this.sourceItem ) return;
    const classes = new Set(Object.keys(this.parent.actor.spellcastingClasses));
    if ( !classes.size ) return;

    // Set the source class, and ensure the preparation mode matches if adding a prepared spell to an alt class
    const setClass = cls => {
      this.updateSource({ sourceItem: `class:${cls}`, method: this.parent.actor.classes[cls].spellcasting.type });
    };

    // If preparation mode matches an alt spellcasting type and matching class exists, set as that class
    if ( (system.method !== "spell") && (system.method in CONFIG.VARLYN5E.spellcasting) ) {
      const altClasses = classes.filter(i => this.parent.actor.classes[i].spellcasting.type === system.method);
      if ( altClasses.size === 1 ) setClass(altClasses.first());
      return;
    }

    // If only a single spellcasting class is present, use that
    if ( classes.size === 1 ) {
      setClass(classes.first());
      return;
    }

    // Create intersection of spellcasting classes and classes that offer the spell
    const spellClasses = new Set(
      varlyn5e.registry.spellLists.forSpell(this.parent._stats.compendiumSource).map(l => l.metadata.identifier)
    );
    const intersection = classes.intersection(spellClasses);
    if ( intersection.size === 1 ) setClass(intersection.first());
  }
}
