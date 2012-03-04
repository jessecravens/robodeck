/**
 * Demonstrates a 'fade' card transition, which shows a new item by rendering it behind the current item
 * then fading the current item out
 */
Ext.define('Kitchensink.view.Fade', {
    extend: 'Ext.Panel',
    config: {
        cls: 'card card5',
        html: 'Fade Animation'
    }
});
