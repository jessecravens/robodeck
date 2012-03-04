/**
 * The camera tap in the main Viewport. Used to capture a new image, select a image already taken,
 * and to view images captured/selected.
 * Uses the {@link Ext.device.Camera} API.
 */
Ext.define('Device.view.Camera', {
    extend: 'Ext.Container',
    xtype: 'camera',

    requires: [
        'Ext.device.Camera',
        'Device.view.camera.ImageList',
        'Device.view.camera.ImageView'
    ],

    config: {
        layout : 'card',
        title  : 'Camera',
        iconCls: 'photo1',

        items: [
            {
                layout: 'fit',
                items: [
                    {
                        xtype: 'imageList'
                    },
                    {
                        ui: 'light',
                        xtype : 'toolbar',
                        docked: 'bottom',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        defaults: {
                            iconMask: true
                        },
                        items: [
                            {
                                text: 'Capture',
                                iconCls: 'photo_black2'
                            },
                            {
                                text: 'Select',
                                iconCls: 'photos2'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'imageView'
            }
        ]
    }
});
