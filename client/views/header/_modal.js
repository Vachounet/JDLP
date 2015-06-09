
Template._myModal.events({
    "click button.delete": function (event, template) {
        Games.remove(event.currentTarget.id);
        IonModal.close();

        toastr.info("Partie supprimée", "Suppression");
    },
    "click button.start": function (event, template) {
//        CurrentGame = new Game(Games.findOne({
//            _id: event.currentTarget.id
//        }));
//        
//        for (var i=0; i < CurrentGame.playerList; i++)
//        {
//            CurrentGame.playerList[i] = new Player(CurrentGame.playerList[i]);
//        }
//
//        Session.set("playersCount", CurrentGame.playerList.length);
//
//        Session.set("players", CurrentGame.playerList);

        IonModal.close();

        toastr.info("La partie a été chargée", "Reprise");
        Router.go("/gameTable/" + event.currentTarget.id);

    }
});