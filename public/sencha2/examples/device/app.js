Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext: 'touch/src'
    }
});

Ext.application({
    name: 'Device',

    requires: ['Ext.device.*'],

    models: ['Image'],
    stores: ['Images'],

    views: [
        'Main',
        'Camera',
        'Connection',
        'Notification',
        'Orientation'
    ],

    controllers: [
        'Application',
        'Camera',
        'Notification',
        'Connection'
    ],

    launch: function() {
        Ext.create('Device.view.Main');
    }
});
