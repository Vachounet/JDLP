Template.layoutionic.rendered = function () {
 IonSideMenu.snapper.settings({disable: 'right'});
 if (Accounts._resetPasswordToken) {

  Router.current().params.paramToken = Accounts._resetPasswordToken;
  AccountsTemplates.paramToken = Accounts._resetPasswordToken;

  AccountsTemplates.setState("resetPwd");
 }
 //IonSideMenu.snapper.disable();
};


