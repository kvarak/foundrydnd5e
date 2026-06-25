/**
 * Mixin used to add support for registering documents in the dependents registry.
 * @template {foundry.abstract.Document} T
 * @param {typeof T} Base  The base document class to wrap.
 * @returns {typeof DependentDocument}
 * @mixin
 */
export default function DependentDocumentMixin(Base) {
  class DependentDocument extends Base {
    /** @inheritDoc */
    prepareData() {
      super.prepareData();
      if ( this.flags?.["varlyn-dnd5e"]?.dependentOn && this.uuid ) {
        varlyn5e.registry.dependents.track(this.flags["varlyn-dnd5e"].dependentOn, this);
      }
    }

    /* -------------------------------------------- */

    /** @inheritDoc */
    _onDelete(options, userId) {
      super._onDelete(options, userId);
      if ( this.flags?.["varlyn-dnd5e"]?.dependentOn && this.uuid ) {
        varlyn5e.registry.dependents.untrack(this.flags["varlyn-dnd5e"].dependentOn, this);
      }
    }
  }
  return DependentDocument;
}
