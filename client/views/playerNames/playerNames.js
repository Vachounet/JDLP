Template.playerNames.rendered = function () {
    
    if (Session.get("players").length === 0)
    {
        Router.go("home");
    }
    
    
    (function($) {
    $.fn.enterAsTab = function(options) {
        var settings = $.extend({
            'allowSubmit': false
        }, options);
        $(this).find('input, select, textarea, button').on("keydown", {localSettings: settings}, function(event) {
            if (settings.allowSubmit) {
                var type = $(this).attr("type");
                if (type == "submit") {
                    return true;
                }
            }
            if (event.keyCode == 13) {
                var inputs = $(this).parents("form").eq(0).find(":input:visible:not(:disabled):not([readonly])");
                var idx = inputs.index(this);
                if (idx == inputs.length - 1) {
                    idx = -1;
                } else {
                    inputs[idx + 1].focus(); // handles submit buttons
                }
                try {
                    inputs[idx + 1].select();
                }
                catch (err) {

                }
                return false;
            }
        });
        return this;
    };
})(jQuery);

    
$("#playersName").enterAsTab({ 'allowSubmit': true});
};

Template.playerNames.events({
    "click .validateNames": function (event) {
        // This function is called when the new task form is submitted
        event.preventDefault();
        //$("#playersName").submit();
        
        if (!$("#playersName").valid()) {
            return;
        }

        var inputs = $(".playersName input");

        for (var i = 0; i < inputs.length; i++) {
            PlayerList[i].name = inputs[i].value.trim();
        }

        CurrentGame = new Game({
            playerList: PlayerList,
            gameStarted: true,
            startTime: new Date(),
            sens: "horaire"
        });

        //            Session.set("currentGame", CurrentGame);

        Session.set("players", CurrentGame.playerList);
//
//        $('.playersName').velocity("fadeOut", {
//            duration: 600
//        })
//
//        $('#gameTable').show();

        $("div[id^='playerEntry']").each(function (i, el) {
            $(el).hide();
        });

//        $('.breadcrumb').velocity("fadeIn", {
//            delay: 600,
//            duration: 600
//        });
//
//        $('#playerEntry0').velocity("fadeIn", {
//            delay: 600,
//            duration: 600
//        });

        CurrentGame.createdBy = Meteor.userId();
        CurrentGame.creatorUserName = Meteor.user().profile.nickname;
        
        CurrentGame.currentPlayerID = 0;
        CurrentGame.nextPlayerID = 1;

        CurrentGame.position = Games.find().count() + 1;

        var gameID = Games.insert(CurrentGame);
        CurrentGame.id = gameID;
        
                Meteor.call('updateGame', CurrentGame, function(err, response) {
            Session.set('serverSimpleResponse', response);
        });
//        var addGame = LocalStore.get('localGames');
//        addGame.push(gameID);
//        LocalStore.set('localGames', addGame);
        
        Router.go('/gameTable/' + gameID);

        // Prevent default form submit
        return false;
    }
});

Template.playerNames.helpers({
    players: function () {
        return Session.get("players");
    }
});