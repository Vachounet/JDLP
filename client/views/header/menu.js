Template.menu.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  },
    "click div._modal": function (event, template) {
        var gameID = event.currentTarget.id;

        Session.set('currentGameIDModal', gameID);

        _modalGamedep.changed();
        
        Router.go("/myGame/"+gameID);

        //            Games.remove(event.currentTarget.id);
    }    
});
var _modalGamedep = new Deps.Dependency();
Template._myModal.helpers({
    game: function () {
        _modalGamedep.depend();
        return Games.findOne({
            _id: Session.get('currentGameIDModal')
        });
    }
});


Template.menu.helpers({
    ownGames: function () {
        //       _myGamesdep.depend();
        return Games.find({
            createdBy: Meteor.userId()
        }).fetch();
    },
    userID: function() {
        return Meteor.userId();

    }
});

