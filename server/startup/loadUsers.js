Meteor.publish('myGames', function () {
    //    var localGames = LocalStore.get('localGames');
    return Games.find();
});

Meteor.publish('gameComms', function () {
    //    var localGames = LocalStore.get('localGames');
    return GameComm.find();
});

Meteor.publish('gamePictures', function () {
    //    var localGames = LocalStore.get('localGames');
    return GamePictures.find();
});


Meteor.startup(function () {
    Meteor.methods({
        updateGame: function (game) {
            var updated = Games.update(
                game.id, {
                    $set: game

                });
            console.log(updated);

            return "";
        }
    });

    process.env.MAIL_URL = "";


    Accounts.emailTemplates.from = 'JDLP <no-reply@vache.mobi>';

    // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
    Accounts.emailTemplates.siteName = 'JDLP - Le jeu de la pièce';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return 'Validation de l\'adresse email';
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        return 'Suis le lien suivant pour valider ton compte: ' + url;
    };


    //Accounts.onCreateUser(function (options, user) {
    //    user.profile = options.profile;
    //
    //    // we wait for Meteor to create the user before sending an email
    //    Meteor.setTimeout(function () {
    //        Accounts.sendVerificationEmail(user._id);
    //    }, 2 * 1000);
    //
    //    return user;
    //});

    //Accounts.validateLoginAttempt(function (attempt) {
    //    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
    //        console.log('email not verified');
    //
    //        return false; // the login is aborted
    //    }
    //    return true;
    //});



});



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

GamePictures.allow({
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

GameComm.allow({
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