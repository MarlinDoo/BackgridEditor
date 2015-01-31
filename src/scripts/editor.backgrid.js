;(function(Form) {

  /**
   * Backgrid editor
   *
   * An table cell editor.
   * An array editor. Creates a list of other editor items.
   * Special options:
   * @param {String} [options.schema.columns]
   * @param {String} [options.schema.collection]
   */
  Form.editors.Backgrid = Form.editors.Base.extend({

    events: {},

    initialize: function(options) {

      var editors = Form.editors;

      editors.Base.prototype.initialize.call(this, options);

      var schema = this.schema;

      if (!schema) throw new Error("Missing required option 'schema'");

      if(!schema.columns) throw new Error("Missing required option 'columns'");

      this.columns = schema.columns;

      this.collection = new (schema.collection || Backbone.Collection)( this.value || [] );

      this._addNew();

      this.grid = new Backgrid.Grid({
        columns: this.columns,
        model: this.model,
        collection: this.collection
      });

      this.modelsChange = options.modelsChange || this.modelsChange;
      this.collection.on('change', this.modelsChange, this);
    },
    modelsChange: function( model ){
      var collection = this.collection;
      if(collection.indexOf(model) == collection.length - 1){
        this._addNew();
      }
    },
    _addNew: function(){
      this.collection.add( this.collection.model );
    },
    render: function(){
      this.$el.append( this.grid.render().el );
      return this;
    },
    getValue: function() {
      return this.collection.toJSON();
    },
    setValue: function(value) {
      if(!_.isArray(value)) throw new Error("value must be an array");
      this.collection.reset( value || [] );
    }
  }, {
    //STATICS
    template: _.template('\
      <div></div>\
    ', null, Form.templateSettings)

  });

})(Backbone.Form);
