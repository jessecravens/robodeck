Ext.define('Device.view.Main', {
    extend: 'Ext.tab.Panel',

    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Device API'
            },

            { xclass: 'Device.view.Notification' },
            { xclass: 'Device.view.Camera' },
            { xclass: 'Device.view.Orientation' },
            { xclass: 'Device.view.Connection' }

            // {
            //     // xclass: 'Device.Motion',
            //     title: 'Motion',
            //     iconCls: 'motion'
            // },
            // {
            //     title: 'Compass',
            //     iconCls: 'compass',
            //     html: 'Compass'
            // },

            // {
            //     title: 'Geolocation',
            //     iconCls: 'geolocation',
            //     html: 'Geolocation'
            // }
        ]
    }
});
