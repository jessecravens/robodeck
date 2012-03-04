/**
 * Demonstrates usage of the Ext.tab.Panel component with the tabBar docked to the bottom of the screen.
 * See also app/view/Tabs.js for an example with the tabBar docked to the top
 */
Ext.define('Kitchensink.view.BottomTabs', {
    extend: 'Ext.tab.Panel',

    config: {
        activeTab: 0,
        layout: {
            animation: {
                type: 'slide',
                duration: 250
            }
        },
        tabBar: {
            layout: {
                pack : 'center',
                align: 'center'
            },
            docked: 'bottom'
        },
        items: [
            {
                title    : 'About',
                html     : '<p>Docking tabs to the bottom will automatically change their style. The tabs below are ui="light", though the standard type is dark. Badges (like the 4 below) can be added by setting <code>badgeText</code> when creating a tab/card or by using <code>setBadge()</code> on the tab later.</p>',
                iconCls  : 'info',
                cls      : 'card card1'
            },
            {
                title    : 'Favorites',
                html     : 'Favorites Card',
                iconCls  : 'favorites',
                cls      : 'card card2',
                badgeText: '4'
            },
            {
                title    : 'Downloads',
                id       : 'tab3',
                html     : 'Downloads Card',
                badgeText: 'Text Ellipsis',
                cls      : 'card card3',
                iconCls  : 'download'
            },
            {
                title    : 'Settings',
                html     : 'Settings Card',
                cls      : 'card card4',
                iconCls  : 'settings'
            },
            {
                title    : 'User',
                html     : 'User Card',
                cls      : 'card card5',
                iconCls  : 'user'
            }
        ]
    }
});
