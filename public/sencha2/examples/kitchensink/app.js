/**
 * Ext.application is the heart of your app. It sets the application name, can specify the icon and startup images to
 * use when your app is added to the home screen, and sets up your application's dependencies - usually the models, 
 * views and controllers that your app uses.
 */
Ext.application({
    name: 'Kitchensink',

    //sets up the icon and startup screens for when the app is added to a phone/tablet home screen
    icon: 'resources/img/icon.png',
    tabletStartupScreen: 'resources/img/tablet_startup.png',
    phoneStartupScreen: 'resources/img/phone_startup.png',

    //loads the views used by the app from the app/view folder
    views: [
        //component demos
        'NestedList', 'List', 'SourceOverlay', 'Buttons',
        'Forms', 'Icons', 'BottomTabs', 'Themes',
        'Map', 'Overlays', 'Tabs','Toolbars',
        'Video', 'Audio', 'Carousel', 'TouchEvents',
        
        //data and utility demos
        'JSONP', 'YQL', 'Ajax', 'NestedLoading',
        
        //card transition animation demos
        'SlideLeft', 'SlideRight', 'SlideUp', 'SlideDown',
        'CoverLeft', 'CoverRight', 'CoverUp', 'CoverDown',
        'RevealLeft', 'RevealRight', 'RevealUp', 'RevealDown',
        'Pop', 'Fade', 'Flip','Cube'
    ],
    
    //loads app/store/Demos.js, which contains the tree data for our main navigation NestedList
    stores: ['Demos'],
    
    //the Kitchen Sink has Phone and Tablet modes, which rearrange the screen based on the type
    //of device detected
    profiles: ['Tablet', 'Phone']
});