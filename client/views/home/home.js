CurrentGame = new Game();

PlayerList = [];
//
//accountsUIBootstrap3.setLanguage('fr');

Template.connected.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  }
});

Meteor.subscribe('myGames');

    Session.setDefault("playersCount", 0);

    Session.setDefault("players", PlayerList);



// This code only runs on the client
Template.home.helpers({
    playersCount: function () {
        // Show newest tasks first
        return Session.get("playersCount");
    },
    players: function () {
        return Session.get("players");
    }
});

Template.connected.helpers({
    nickname: function() {
        return Meteor.user().profile.nickname;
    }
});

//Accounts.onResetPasswordLink(function (token, done) {
//    Session.set("resetPasswordToken", token);
//    doneCallback = done;
//    AccountsTemplates.setState("resetPwd");
//});



var _myGamesdep = new Deps.Dependency();
var _allGamesdep = new Deps.Dependency();

Games.allow({
    'insert': function (doc) {
        /* user and doc checks ,
      return true to allow insert */
        return true;
    },
    'remove': function (doc) {
        /* user and doc checks ,
      return true to allow insert */
        return true;
    },
    'update': function (doc) {
        /* user and doc checks ,
      return true to allow insert */
        return true;
    }

});