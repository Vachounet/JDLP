Template.allGames.helpers({
    allGames: function () {
        //        _allGamesdep.depend();
        return Games.find().fetch();
    },
    "currentGameID": function() {
        return CurrentGame && CurrentGame.gameStarted ? CurrentGame.id : "";
    },
    settings: function () {
        return {
            collection: Games.find().fetch(),
            rowsPerPage: 10,
            showFilter: false,
            showColumnToggles: false,
            fields: [
                {
                    key: 'position',
                    label: '#'
                },
                {
                    key: 'creatorUserName',
                    label: 'Créée par'
                },
                {
                    key: 'localDate',
                    label: 'Le'
                },
                {
                    key: 'allPlayersCount',
                    label: 'Joueurs'
                },
                {
                    key: 'abandons',
                    label: 'Abandon(s)'
                },
                {
                    key: 'gameFinished',
                    label: 'Terminée'
                }
]
        };
    },
    buttonVisibility: function () {
        return CurrentGame && CurrentGame.gameStarted ? "" : "none";
    }
});

var _modalAllGamedep = new Deps.Dependency();

Template.allGames.events({
//    "click .reactive-table tbody tr": function (event) {
//        event.preventDefault();
//
//        var gameID = this._id;
//
//        Session.set('currentGameIDModal', gameID);
//
//        _modalAllGamedep.changed();
//
//        $('#allGamesModal').modal('show');
//    },
    "click button._modalAllGames": function (event) {
        event.preventDefault();

        var gameID = this._id;

        Session.set('currentGameIDModal', gameID);

        Router.go("/game/"+gameID);
        
        _modalAllGamedep.changed();
    }

});

Template.modalAllGames.helpers({
    game: function () {
        _modalAllGamedep.depend();
        return Games.findOne({
            _id: Session.get('currentGameIDModal')
        });
    }
});

var _modalGamedep = new Deps.Dependency();
Template._myModalAllGames.helpers({
    game: function () {
        _modalGamedep.depend();
        return Games.findOne({
            _id: Session.get('currentGameIDModal')
        });
    }
});
