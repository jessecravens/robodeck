app.views.Home = Ext.extend(Ext.Panel, {
  xtype: 'panel',
  title: 'Home',
  iconCls: 'team',
  scroll: 'vertical',
  defaults: {
    width: '100%'
  },
   defaults:{
          margin: 30
      },
  items: [
     
    {
      xtype: 'button',
      text: 'Forward',
     // ui: 'black',
      listeners: {
        test: function() { // This function will be called when the 'quit' event is fired
            // By default, "this" will be the object that fired the event.  
        }
      }
    },
    {
      xtype: 'button',
      text: 'Back',
     // ui: 'black',
      listeners: {
        test: function() { // This function will be called when the 'quit' event is fired
            // By default, "this" will be the object that fired the event.  
        }
      }
    },
    {
      xtype: 'button',
      text: 'Special Event',
      //ui: 'black',
      listeners: {
        test: function() { // This function will be called when the 'quit' event is fired
            // By default, "this" will be the object that fired the event.  
        }
      }
    }
  ],
  dockedItems: [{
    xtype: 'toolbar',
    height: 46,
    dock: 'top',
    pack: 'left',
    title: 'Control Deck',
    items: [  ]
  }]

  
});