Ext.define('Device.view.Orientation', {
    extend: 'Ext.Container',

    requires: [
        'Ext.device.Orientation'
    ],

    config: {
        title: 'Orientation',
        iconCls: 'compass1',

        items: [
            {
                id: 'information',
                styleHtmlContent: true,
                html: 'no information received'
            },
            {
                id: 'cube',
                html: '<div></div><div></div><div></div><div></div><div></div><div></div>',
                centered: true
            }
        ]
    },

    initialize: function() {
        this.on({
            painted: 'onPainted',
            erased : 'onErased'
        });
    },

    onPainted: function() {
        Ext.device.Orientation.on('orientation', 'onDeviceOrientation', this);
    },

    onErased: function() {
        Ext.device.Orientation.un('orientation', 'onDeviceOrientation', this);
    },

    onDeviceOrientation: function(e) {
        var alpha = Math.round(e.alpha),
            beta = Math.round(e.beta),
            gamma = Math.round(e.gamma),
            origin;

        Ext.getCmp('information').setHtml([
            'alpha: ' + alpha,
            '<br />beta: ' + beta,
            '<br />gamma: ' + gamma
        ].join(''));

        if (!this.originalOrientation) {
            this.originalOrientation = {
                alpha: alpha,
                beta: beta,
                gamma: gamma
            };

            return;
        }
        else {
            origin = this.originalOrientation;

            alpha -= origin.alpha;
            beta -= origin.beta;
            gamma -= origin.beta;
        }

        Ext.getCmp('cube').element.dom.style.webkitTransform = 'rotateX('+beta+'deg) rotateY('+gamma+'deg) rotateZ('+alpha+'deg)';
    }
});
