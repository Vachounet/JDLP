Template.tabsLayout.rendered = function () {
  Session.set('currentTab', 'tabs.one');

    IonSideMenu.snapper.settings({disable: 'right'});

    IonSideMenu.snapper.disable();

};
