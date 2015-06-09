Template.playerNumber.rendered = function () {
    $("#playersCount").validate({
        rules: {
            playerCnt: {
                required: true,
                number: true
            }

        },
        messages: {
            playerCnt: {
                required: "Champs obligatoire",
                number: "Ne peut contenir uniquement des chiffres"
            }
        }
    });


    $("#playersCount").validate();
};

Template.playerNumber.helpers({
    buttonVisibility: function () {
        return CurrentGame && CurrentGame.gameStarted ? "" : "none";
    },
    "currentGameID": function() {
        return CurrentGame && CurrentGame.gameStarted ? CurrentGame.id : "";
    }
});

Template.playerNumber.events({
    "click .validatePlayersCount": function (event) {
        // This function is called when the new task form is submitted
        $("#playersCount").submit(function (e) {
            e.preventDefault();
        });
        //
        //        _myGamesdep.changed();
        //        _allGamesdep.changed();

        PlayerList = [];

        if (!$("#playersCount").valid()) {
            return;
        }

        var input = $(".playersCount input");

        var text = $(input).val();

        Session.set("playersCount", text);
        //
        //        $('.playersCount').velocity("fadeOut", {
        //            duration: 900
        //        })

        for (var i = 0; i < Session.get("playersCount"); i++) {
            PlayerList.push(new Player({
                id: i + 1,
                name: ""
            }));

        }

        Session.set("players", PlayerList);

        //        $('.playersName').velocity("fadeIn", {
        //            delay: 900,
        //            duration: 600
        //        });

        Router.go('playerNames');
        //        window.location.href = "/playerNames";
        // Prevent default form submit
        return false;
    }
});
