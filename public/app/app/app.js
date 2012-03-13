Ext.regApplication({
    name: 'app',
    launch: function() {
        this.views.viewport = new this.views.Viewport();
    }
});