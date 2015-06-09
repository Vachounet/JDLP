Template.header.created = function () {
    this.subscribe('myGames');

};


Template.header.helpers({
    ownGames: function () {
        //       _myGamesdep.depend();
        return Games.find({
            createdBy: Meteor.userId()
        }).fetch();
    }
});

var _modalGamedep = new Deps.Dependency();
Template.modalMyGames.helpers({
    game: function () {
        _modalGamedep.depend();
        return Games.findOne({
            _id: Session.get('currentGameIDModal')
        });
    }
});

Template.modalMyGames.events({
    "click button.delete": function (event, template) {
        Games.remove(event.currentTarget.id);
        $('#myGamesModal').modal('hide');

        toastr.info("Partie supprimée", "Suppression");
    },
    "click button.start": function (event, template) {
        CurrentGame = new Game(Games.findOne({
            _id: event.currentTarget.id
        }));
        
        for (var i=0; i < CurrentGame.playerList; i++)
        {
            CurrentGame.playerList[i] = new Player(CurrentGame.playerList[i]);
        }

        Session.set("playersCount", CurrentGame.playerList.length);

        Session.set("players", CurrentGame.playerList);

        $('#myGamesModal').modal('hide');

        toastr.info("La partie a été chargée", "Reprise");
        Router.go("gameTable");

    }
});

//Template._loginButtonsLoggedOut.events({
//    "click button#login-buttons-password": function (event, template) {
//        toastr.info("Compte en cours de création. Vérifies ta boite mail pour le valider !", "Création de compte");
//    }
//});

Template.header.events({
    "click a.delete": function (event, template) {
        var gameID = event.currentTarget.id;

        Session.set('currentGameIDModal', gameID);

        _modalGamedep.changed();

        $('#myGamesModal').modal('show');


        //            Games.remove(event.currentTarget.id);
    }
});