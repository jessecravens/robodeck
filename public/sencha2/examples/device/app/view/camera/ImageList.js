Ext.define('Device.view.camera.ImageList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'imageList',

    requires: ['Device.view.camera.Image'],

    config: {
        cls: 'imageList',
        defaultType: 'image',
        useComponents: true,
        store: 'Images'
    },

    initialize: function() {
        this.callParent();

        this.container.getDataItemConfig = this.getDataItemConfig;
    },

    getDataItemConfig: function(xtype, record, itemConfig) {
        return {
            xtype: xtype,
            record: record,
            defaults: itemConfig,
            src: record.get('src')
        };
    }
});
