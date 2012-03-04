Ext.define('Device.view.camera.Image', {
    extend: 'Ext.Img',
    xtype: 'image',

    initialize: function() {
        this.callParent();

        this.element.on({
            scope: this,
            tap: 'onTap'
        });
    },

    onTap: function() {
        this.fireEvent('tap', this);
    }
});
