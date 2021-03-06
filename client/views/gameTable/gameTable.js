var _budep = new Deps.Dependency();
var _infligedep = new Deps.Dependency();
var _xbudep = new Deps.Dependency();
var _xinfligedep = new Deps.Dependency();
var _fautesdep = new Deps.Dependency();

var currentTopPlayerBu;
var currentTopPlayerInflige;
var currentTopPlayerXBu;
var currentTopPlayerXInflige;
var currentTopPlayerFaute;

Template.layoutionic.rendered = function () {
 IonSideMenu.snapper.disable();
};

// This code only runs on the client
Template._statsPopover.helpers({

    topBu: function() {
        _budep.depend();
        var highest = 0;
        var currentPlayer;

        CurrentGame.playerList.map(function(player, index) {
            if (player.bu > highest) {
                highest = player.bu;
                currentPlayer = player;
            }
        });

        if (currentPlayer) {
            if (currentTopPlayerBu && currentPlayer.name !== currentTopPlayerBu.name)
                toastr.info(currentPlayer.name + " vient de prendre la tête du Top Bu", "Top Bu");

            currentTopPlayerBu = currentPlayer;
            return currentPlayer;
        } else {
            return new Player({
                name: ""
            });
        }

    },
    topInflige: function() {
        _infligedep.depend();
        var highest = 0;
        var currentPlayer;

        CurrentGame.playerList.map(function(player, index) {
            if (player.inflige > highest) {
                highest = player.inflige;
                currentPlayer = player;
            }
        });

        if (currentPlayer) {
            if (currentTopPlayerInflige && currentPlayer.name !== currentTopPlayerInflige.name)
                toastr.info(currentPlayer.name + " vient de prendre la tête du Top Infligé", "Top Infligé");

            currentTopPlayerInflige = currentPlayer;

            return currentPlayer;
        } else {
            return new Player({
                name: ""
            });
        }

    },
    topFautes: function() {
        _fautesdep.depend();
        var highest = 0;
        var currentPlayer;

        CurrentGame.playerList.map(function(player, index) {
            if (player.fautes > highest) {
                highest = player.fautes;
                currentPlayer = player;
            }
        });

        if (currentPlayer) {
            if (currentTopPlayerFaute && currentPlayer.name !== currentTopPlayerFaute.name)
                toastr.info(currentPlayer.name + " vient de prendre la tête du Top Faute", "Top Faute");

            currentTopPlayerFaute = currentPlayer;

            return currentPlayer;
        } else {
            return new Player({
                name: ""
            });
        }

    },
    topXBu: function() {
        _xbudep.depend();
        var highest = 0;
        var currentPlayer;

        CurrentGame.playerList.map(function(player, index) {
            if (player.xbu > highest) {
                highest = player.xbu;
                currentPlayer = player;
            }
        });

        if (currentPlayer) {
            if (currentTopPlayerXBu && currentPlayer.name !== currentTopPlayerXBu.name)
                toastr.info(currentPlayer.name + " vient de prendre la tête du Top X4 Bu", "Top X4 Bu");

            currentTopPlayerXBu = currentPlayer;

            return currentPlayer;
        } else {
            return new Player({
                name: ""
            });
        }

    },
    topXInflige: function() {
        _xinfligedep.depend();
        var highest = 0;
        var currentPlayer;

        CurrentGame.playerList.map(function(player, index) {
            if (player.xinflige > highest) {
                highest = player.xinflige;
                currentPlayer = player;
            }
        });

        if (currentPlayer) {
            if (currentTopPlayerXInflige && currentPlayer.name !== currentTopPlayerXInflige.name)
                toastr.info(currentPlayer.name + " vient de prendre la tête du Top X4 Ingligé", "Top X4 Ingligé");

            currentTopPlayerXInflige = currentPlayer;

            return currentPlayer;
        } else {
            return new Player({
                name: ""
            });
        }

    },

});

var _currentPlayerNick = new Deps.Dependency();
Template.gameTable.helpers({
    players: function() {
        return Session.get("players");
    },
    currentPlayer: function() {
        return CurrentGame.currentPlayerID;
    },
    currentPlayerNick: function() {
        _currentPlayerNick.depend();
        if (CurrentGame && CurrentGame.currentPlayerID !== "")
            return CurrentGame.playerList[CurrentGame.currentPlayerID].name;
        else
            return CurrentGame.playerList[0].name;
    }
});


Template.gameTable.rendered = function() {


    //    $("div[id^='playerEntry']").each(function (i, el) {
    //        $(el).hide();
    //    });
    //$('.ion-slide-box').slick('swipe', false);
    //$('.ion-slide-box').slick('draggable', false);
    //
    $('.ion-slide-box').slick({
        draggable: false,
        swipe: false,
    });

    var curPlayer = parseInt(CurrentGame.currentPlayerID);

    if (!curPlayer) {
        curPlayer = 1;
        $('.ion-slide-box').slick('slickGoTo', 0, false)
    } else {
        $('.ion-slide-box').slick('slickGoTo', curPlayer, false)
    }
    //
    //    $('#playerEntry' + curPlayer).velocity("fadeIn", {
    //        delay: 600,
    //        duration: 600
    //    });
    _currentPlayerNick.changed();

    Session.set('curGameID', CurrentGame.id);
};

Template.gameTable.events({
    "click a.plus": function(event, template) {
        var playerID = event.currentTarget.id;

        //        $('#playerEntry' + parseInt(playerID) + ' a.btn-success').hide();


        //IonLoading.show({
        //    customTemplate: '<h3>Mise à jour des stats</h3><p>Le temps de boire un coup.</p>',
        //    duration: 4000
        //});
        //
        //setTimeout(function() {
        //
        //    if (CurrentGame.sens === "horaire")
        //        $('.ion-slide-box').slick('slickNext');
        //    else
        //        $('.ion-slide-box').slick('slickPrev');
        //}, 4000);

        Meteor.call('applyNewPlayerScore', "inflige", playerID, true, function(error, result) {

        });

        Meteor.call('updateGame', CurrentGame, function(err, response) {
            Session.set('serverSimpleResponse', response);
        });

    },
    "click a.xquatre": function(event, template) {
        var playerID = event.currentTarget.id;

        Meteor.call('applyNewPlayerScore', "x4inflige", playerID, true, function(error, result) {

        });

        Meteor.call('updateGame', CurrentGame, function(err, response) {
            Session.set('serverSimpleResponse', response);
        });



    },
    "click a.faute": function(event, template) {
        var playerID = event.currentTarget.id;

        Meteor.call('applyNewPlayerScore', "fautes", playerID, true, function(error, result) {

        });

        Meteor.call('updateGame', CurrentGame, function(err, response) {
            Session.set('serverSimpleResponse', response);
        });

    },
    "click a.abandon": function(event, template) {
        // var actionType = event.delegateTarget.parentNode.parentNode.parentNode.id;
        var playerID = parseInt(event.currentTarget.id);
        playerID = playerID - 1;
        var nextPlayerID;
        var movedPlayer = CurrentGame.playerList[playerID];

        movedPlayer.fin = new Date();

        CurrentGame.playerAbandon.push(movedPlayer);

        CurrentGame.playerList.splice(playerID, 1);

        if (CurrentGame.sens === "horaire") {
            nextPlayerID = parseInt(playerID) + 1;
        } else if (CurrentGame.sens === "antihoraire") {
            nextPlayerID = parseInt(playerID) - 1;
        }

        if (!CurrentGame.playerList[nextPlayerID] && CurrentGame.sens === "horaire") {
            nextPlayerID = 0;
        } else if (!CurrentGame.playerList[nextPlayerID] && CurrentGame.sens === "antihoraire") {
            nextPlayerID = CurrentGame.playerList.length - 1;
        }

        var currentPlayer = CurrentGame.playerList[nextPlayerID];
        var nextPlayer = CurrentGame.playerList[nextPlayerID + 1];

        CurrentGame.currentPlayerID = nextPlayerID;
        CurrentGame.nextPlayerID = nextPlayerID + 1;



        if (CurrentGame.playerList < 2) {
            CurrentGame.endTime = new Date();
            CurrentGame.gameFinished = true;

            IonPopup.show({
                title: 'Fin de partie !',
                template: "Il ne reste plus qu'un seul joueur, la partie est terminée !",
                buttons: [{
                    text: 'Suivant',
                    type: 'button-positive',
                    onTap: function() {
                        IonPopup.close();
                        if (CurrentGame.sens === "horaire")
                            $('.ion-slide-box').slick('slickNext');
                        else
                            $('.ion-slide-box').slick('slickPrev');
                    }
                }]
            });

            Meteor.call('updateGame', CurrentGame, function(err, response) {
                Session.set('serverSimpleResponse', response);
            });

            Router.go('/myGame/' + CurrentGame.id);

        }
    },
    "click .takePhoto": function() {

        var pictureID = 0;

        IonPopup.confirm({
            title: 'Ajouter un commentaire',
            template: 'Prendre une photo ?',
            onOk: function() {
                var cameraOptions = {
                    width: 400,
                    height: 300,
                    quality: 5
                };

                MeteorCamera.getPicture(cameraOptions, function (err, data) {
                    if (err) {
                        console.log(err);
                        // TODO Need to handle the error
                    } else {
                        pictureID = GamePictures.insert({submitted_by: Meteor.userId(), submitted_on: new Date(), photo_data: data, game_id: CurrentGame.id})

                    }

                    IonPopup.prompt({
                        title: 'Ajouter un commentaire',
                        template: 'Saisie du commentaire',
                        okText: 'Valider',
                        inputType: 'textarea',
                        inputPlaceholder: 'Ton commentaire',
                        onOk: function(event,response) {
                            GameComm.insert({content: response, submitted_by: Meteor.userId(), submitted_on: new Date(), photo_id: pictureID, game_id: CurrentGame.id})
                        },
                        onCancel: function() {
                            console.log('Cancelled');
                            IonPopup.close();
                        }
                    });
                });
            },
            onCancel: function() {
                setTimeout(function ()
                {
                    IonPopup.prompt({
                        title: 'Ajouter un commentaire',
                        template: 'Saisie du commentaire',
                        okText: 'Valider',
                        inputType: 'textarea',
                        inputPlaceholder: 'Ton commentaire',
                        onOk: function(event,response) {
                            GameComm.insert({content: response, submitted_by: Meteor.userId(), submitted_on: new Date(), photo_id: pictureID, game_id: CurrentGame.id})
                        },
                        onCancel: function() {
                            console.log('Cancelled');
                            IonPopup.close();
                        }
                    });
                }, 200);
            }
        });




    }
});

Meteor.methods({
    applyNewPlayerScore: function(type, playerID, add) {

        var nextPlayerID;
        var playerID = parseInt(playerID);
        playerID = playerID - 1;
        if (CurrentGame.sens === "horaire") {
            nextPlayerID = parseInt(playerID) + 1;
        } else if (CurrentGame.sens === "antihoraire") {
            nextPlayerID = parseInt(playerID) - 1;
        }

        if (!CurrentGame.playerList[nextPlayerID] && CurrentGame.sens === "horaire") {
            nextPlayerID = 0;
        } else if (!CurrentGame.playerList[nextPlayerID] && CurrentGame.sens === "antihoraire") {
            nextPlayerID = CurrentGame.playerList.length - 1;
        }

        var currentPlayer = CurrentGame.playerList[playerID];
        var nextPlayer = CurrentGame.playerList[nextPlayerID];

        CurrentGame.currentPlayerID = nextPlayerID;
        CurrentGame.nextPlayerID = nextPlayerID + 1;

        switch (type) {
            case "bu":
                add ? currentPlayer.bu++ : currentPlayer.bu--;
                break;
            case "inflige":
                add ? currentPlayer.inflige++ : currentPlayer.inflige--;
                add ? nextPlayer.bu++ : nextPlayer.bu--;

                if (add) {
                    IonPopup.show({
                        title: '+1',
                        template: currentPlayer.name + " vient d'infliger une verre de plus pour " + nextPlayer.name,
                        buttons: [{
                            text: 'Suivant',
                            type: 'button-positive',
                            onTap: function() {
                                IonPopup.close();
                                if (CurrentGame.sens === "horaire")
                                    $('.ion-slide-box').slick('slickNext');
                                else
                                    $('.ion-slide-box').slick('slickPrev');
                            }
                        }]
                    });
                }
                break;
            case "x4bu":
                add ? currentPlayer.xbu++ : currentPlayer.xbu--;
                add ? currentPlayer.bu = currentPlayer.bu + 4 : currentPlayer.bu = currentPlayer.bu - 4;
                break;
            case "x4inflige":
                add ? currentPlayer.xinflige++ : currentPlayer.xinflige--;
                add ? currentPlayer.inflige = currentPlayer.inflige + 4 : currentPlayer.inflige = currentPlayer.inflige - 4;

                add ? nextPlayer.xbu++ : nextPlayer.xbu--;
                add ? nextPlayer.bu = nextPlayer.bu + 4 : nextPlayer.bu = nextPlayer.bu - 4;

                if (add) {


                    IonPopup.show({
                        title: 'X4',
                        template: currentPlayer.name + " vient de faire mal à " +
                        nextPlayer.name + " avec un X4. Le jeu change de sens : Vengence !!!",
                        buttons: [{
                            text: 'Suivant',
                            type: 'button-positive',
                            onTap: function() {
                                IonPopup.close();
                                if (CurrentGame.sens === "horaire")
                                    $('.ion-slide-box').slick('slickNext');
                                else
                                    $('.ion-slide-box').slick('slickPrev');

                                if (CurrentGame.sens === "horaire") {
                                    CurrentGame.sens = "antihoraire";
                                } else if (CurrentGame.sens === "antihoraire") {
                                    CurrentGame.sens = "horaire";
                                }
                            }
                        }]
                    });


                }
                break;
            case "fautes":
                add ? currentPlayer.fautes++ : currentPlayer.fautes--;
                add ? currentPlayer.bu++ : currentPlayer.bu--;

                if (add) {
                    IonPopup.show({
                        title: 'Faute !',
                        template: currentPlayer.name + " vient de faire une faute de jeu. Bois un verre et passes ton tour mon ami !",
                        buttons: [{
                            text: 'Suivant',
                            type: 'button-positive',
                            onTap: function() {
                                IonPopup.close();
                                if (CurrentGame.sens === "horaire")
                                    $('.ion-slide-box').slick('slickNext');
                                else
                                    $('.ion-slide-box').slick('slickPrev');
                            }
                        }]
                    });
                }

                break;
        }

        Session.set("players", CurrentGame.playerList);

        _budep.changed();
        _fautesdep.changed();
        _infligedep.changed();
        _xbudep.changed();
        _xinfligedep.changed();
        _currentPlayerNick.changed();


        return "ok";
    }
});
