Template._commPopover.events({
    "click .addComm": function() {

        var pictureID = 0;

        IonPopup.confirm({
            title: 'Ajouter un commentaire',
            template: 'Prendre une photo ?',
            onOk: function() {
                var cameraOptions = {
                    width: 400,
                    height: 300,
                    quality: 80
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
            },
    "click .viewComm": function() {

    }
});