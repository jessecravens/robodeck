/**
 * A simple model to store image URIs/sources for various images, which we get using
 * the device API.
 */
Ext.define('Device.model.Image', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['src']
        // proxy: 'memory'
    }
});
