Ext.Loader.setPath({
    'Twitter': 'app'
});

Ext.application({
    name: 'Twitter',
    requires: ['Twitter.proxy.Twitter'],

    profiles: ['Phone', 'Tablet'],
    models: ['Search', 'Tweet'],
    stores: ['Searches'],

    icon: {
        54: 'resources/images/icon.png',
        72: 'resources/images/icon-72.png',
        114: 'resources/images/icon-114.png'
    }
});
