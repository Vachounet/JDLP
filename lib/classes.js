Games = new Mongo.Collection("games");
GamePictures = new Mongo.Collection("gamePictures");
GameComm = new Mongo.Collection("gameComm");

Game = function (data) {
    this.id = data && data.id ? data.id : "";
    this.position = 0;
    this.playerList = data ? data.playerList : [];
    this.playersCount = this.playerList.length;
    this.playerAbandon = data && data.playerAbandon ? data.playerAbandon : [];
    this.allPlayersCount = this.playerList.length + this.playerAbandon.length;
    this.abandons = this.playerAbandon.length;
    this.gameStarted = data && data.gameStarted ? data.gameStarted : false;
    this.gameFinished = data && data.gameFinished ? data.gameFinished : false;
    this.startTime = data ? data.startTime : "";
    this.endTime = data ? data.startTime : "";
    this.localDate = this.startTime ? this.startTime.toLocaleDateString("fr-FR") + " " + this.startTime.toLocaleTimeString("fr-FR") : "";
    this.localEndDate = this.endTime ? this.endTime.toLocaleDateString("fr-FR") + " " + this.endTime.toLocaleTimeString("fr-FR") : "";
    this.sens = data && data.sens ? data.sens : "horaire";
    this.createdBy = data && data.createdBy ? data.createdBy : "";
    this.creatorUserName = data && data.creatorUserName ? data.creatorUserName : "";
    this.currentPlayerID = data && data.currentPlayerID ? data.currentPlayerID : "";
    this.nextPlayerID = data && data.nextPlayerID ? data.nextPlayerID : "";
};

Player = function (data) {
    this.id = data.id;
    this.name = data.name;
    this.bu = data.bu ? data.bu : 0;
    this.inflige = data.inflige ? data.inflige : 0;
    this.xbu = data.xbu ? data.xbu : 0;
    this.xinflige = data.xinflige ? data.xinflige : 0;
    this.fautes = data.faute ? data.faute : 0;
    this.commentaire = data.commentaire ? data.commentaire : "";
    this.fin = data.fin ? data.fin : 0;
};

//var Schemas = {};
//
//Schemas.Game = new SimpleSchema({
//    id: {
//        type: String,
//        label: "ID",
//        max: 200,
//        optional: true
//    },
//    position: {
//        type: Number,
//        label: "Numéro de la partie"
//    },
//    playersCount: {
//        type: Number,
//        label: "Nombre de joueurs"
//    },
//    playerList: {
//        type: [Player],
//        label: "Liste des joueurs",
//        optional: true
//    },
//    "playerList.$.id": {
//        type: Number,
//        label: "ID",
//        min: 0
//    },
//    "playerList.$.name": {
//        type: String,
//        label: "Nom"
//    },
//    "playerList.$.bu": {
//        type: Number,
//        label: "Nombre de bus",
//        min: 0
//    },
//    "playerList.$.inflige": {
//        type: Number,
//        label: "Nombre d'infligés",
//        min: 0
//    },
//    "playerList.$.xbu": {
//        type: Number,
//        label: "Nombre de X4 bus",
//        min: 0
//    },
//    "playerList.$.xinflige": {
//        type: Number,
//        label: "Nombre de X4 infligés",
//        min: 0
//    },
//    "playerList.$.fautes": {
//        type: Number,
//        label: "Nombre de fautes",
//        min: 0
//    },
//    "playerList.$.commentaire": {
//        type: String,
//        label: "Commentaire"
//    },
//    "playerList.$.fin": {
//        type: Date,
//        label: "L'heure à laquelle le joueur a quitté la partie",
//        optional: true
//    },    
//    gameStarted: {
//        type: Boolean,
//        label: "Partie démarrée",
//    },
//    gameStarted: {
//        type: Boolean,
//        label: "Partie terminée",
//    },
//    startTime: {
//        type: Date,
//        label: "Heure de début",
//    },
//    sens: {
//        type: String,
//        label: "Sens du jeu",
//    },
//    createdBy: {
//        type: String,
//        label: "ID du user qui a créé la partie",
//    },
//    currentPlayerID: {
//        type: Number,
//        label: "ID du joueur courant",
//    },
//    nextPlayerID: {
//        type: Number,
//        label: "ID du prochain joueur",
//    }
//});
//
//Schemas.Player = new SimpleSchema({
//
//});
//
//Games.attachSchema(Schemas.Game);

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,

    // Privacy Policy and Terms of Use
    //    privacyUrl: 'privacy',
    //    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 2000,

    // Hooks
    //    onLogoutHook: myLogoutFunc,
    //    onSubmitHook: mySubmitFunc,

    // Texts
    texts: {
        button: {
            signUp: "Créer un compte!"
        },
        title: {
            forgotPwd: "Mot de passe oublié ?"
        },
    },
});

AccountsTemplates.addField({
    _id: 'nickname',
    type: 'text',
    placeholder: {
        signUp: "Pseudo"
    },
    required: true,
    minLength: 2,
    errStr: 'Requis, minimum 2 char.',
    func: function (value) {
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function (err, userExists) {
                if (!userExists) {
                    self.setSuccess();
                }
                else {
                    self.setError(userExists);
                    self.setValidating(false);
                    toastr.error("Ce pseudo est déjà pris !", "Oopps !");
                }
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});



if (Meteor.isServer) {
    Meteor.methods({
        "userExists": function (nickname) {
            return !!Meteor.users.findOne({
                profile: {
                    nickname: nickname
                }
            });
        },
    });
}

//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('resendVerificationEmail');
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('verifyEmail');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('enrollAccount');

trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    console.log('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};