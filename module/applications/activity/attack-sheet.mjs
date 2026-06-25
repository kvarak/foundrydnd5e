import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the attack activity.
 */
export default class AttackSheet extends ActivitySheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["attack-activity"]
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    identity: {
      template: "systems/dnd5e/templates/activity/attack-identity.hbs",
      templates: [
        ...super.PARTS.identity.templates,
        "systems/dnd5e/templates/activity/parts/attack-identity.hbs"
      ]
    },
    effect: {
      template: "systems/dnd5e/templates/activity/attack-effect.hbs",
      templates: [
        ...super.PARTS.effect.templates,
        "systems/dnd5e/templates/activity/parts/attack-damage.hbs",
        "systems/dnd5e/templates/activity/parts/attack-details.hbs",
        "systems/dnd5e/templates/activity/parts/damage-part.hbs",
        "systems/dnd5e/templates/activity/parts/damage-parts.hbs"
      ]
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareEffectContext(context, options) {
    context = await super._prepareEffectContext(context, options);

    const availableAbilities = this.activity.availableAbilities;
    context.abilityOptions = [
      {
        value: "", label: _loc("VARLYN5E.DefaultSpecific", {
          default: this.activity.attack.type.classification === "spell"
            ? _loc("VARLYN5E.Spellcasting").toLowerCase()
            : availableAbilities.size
              ? game.i18n.getListFormatter({ style: "short", type: "disjunction" }).format(
                Array.from(availableAbilities).map(a => CONFIG.VARLYN5E.abilities[a].label.toLowerCase())
              )
              : _loc("VARLYN5E.None").toLowerCase()
        })
      },
      { rule: true },
      { value: "none", label: _loc("VARLYN5E.None") },
      { value: "spellcasting", label: _loc("VARLYN5E.Spellcasting") },
      ...Object.entries(CONFIG.VARLYN5E.abilities).map(([value, config]) => ({
        value, label: config.label, group: _loc("VARLYN5E.Abilities")
      }))
    ];

    context.hasBaseDamage = this.item.system.offersBaseDamage;

    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareIdentityContext(context, options) {
    context = await super._prepareIdentityContext(context, options);

    context.attackTypeOptions = Object.entries(CONFIG.VARLYN5E.attackTypes)
      .map(([value, config]) => ({ value, label: config.label }));
    if ( this.item.system.validAttackTypes?.size ) context.attackTypeOptions.unshift({
      value: "",
      label: _loc("VARLYN5E.DefaultSpecific", {
        default: game.i18n.getListFormatter({ type: "disjunction" }).format(
          Array.from(this.item.system.validAttackTypes).map(t => CONFIG.VARLYN5E.attackTypes[t].label.toLowerCase())
        )
      })
    });

    context.attackClassificationOptions = Object.entries(CONFIG.VARLYN5E.attackClassifications)
      .map(([value, config]) => ({ value, label: config.label }));
    if ( this.item.system.attackClassification ) context.attackClassificationOptions.unshift({
      value: "",
      label: _loc("VARLYN5E.DefaultSpecific", {
        default: CONFIG.VARLYN5E.attackClassifications[this.item.system.attackClassification].label.toLowerCase()
      })
    });

    return context;
  }
}
