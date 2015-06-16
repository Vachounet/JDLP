Template._commModal.helpers({
    comms: function() {
        return GameComm.find({
            game_id: CurrentGame.id
        }).fetch();
    }
});

Template.registerHelper('getPicture', function(photoID) {
    return GamePictures.findOne({
        _id: photoID
    }).photo_data;
});

Template.registerHelper('getComms', function(photoID) {
    return GameComm.find({
        game_id: CurrentGame.id
    }).fetch();
});