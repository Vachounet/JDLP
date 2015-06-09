// Home Route
Router.route('/', {
    name: 'home',
    //waitOn: function() {
    //    return Meteor.subscribe('myGames');
    //},
    //fastRender: true,
    action: function() {
        this.render('home');
        SEO.set({
            title: 'Accueil - ' + Meteor.App.NAME
        });
    }
});


Router.route('/playerCount', {
    name: 'playerCount',
    action: function() {
        this.render('playerNumber');
        SEO.set({
            title: 'Nombre de joueurs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/playerNames', {
    name: 'playerNames',
    action: function() {
        this.render('playerNames');
        SEO.set({
            title: 'Noms des joueurs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/gameTable/:_id', {
    name: 'gameTable',
    action: function() {
        CurrentGame = new Game(Games.findOne({
            _id: this.params._id
        }));

        if (CurrentGame.createdBy !== Meteor.userId())
          {
            Router.go("/");
          }

        for (var i = 0; i < CurrentGame.playerList; i++) {
            CurrentGame.playerList[i] = new Player(CurrentGame.playerList[i]);
        }

        Session.set("playersCount", CurrentGame.playerList.length);

        Session.set("players", CurrentGame.playerList);
        this.render('gameTable');

        SEO.set({
            title: 'Jeu en cours - ' + Meteor.App.NAME
        });
    }
});

Router.route('/myGame/:_id', {
    name: 'myGame',
    fastRender: true,
    data: function () {
      return Games.findOne({_id: this.params._id});
    },  
    action: function() {

        this.render('myGame');

        SEO.set({
            title: 'Détails Partie - ' + Meteor.App.NAME
        });
    }
});

Router.route('/game/:_id', {
    name: 'game',
    data: function () {
      return Games.findOne({_id: this.params._id});
    },  
    action: function() {

        this.render('game');

        SEO.set({
            title: 'Détails Partie - ' + Meteor.App.NAME
        });
    }
});

Router.route('/user/', {
    name: 'user',
    data: function () {
        return Meteor.user();
    },
    action: function() {

        this.render('userPage');

        SEO.set({
            title: ' Détails Compte - ' + Meteor.App.NAME
        });
    }
});

// All games route
Router.route('/allGames', {
    name: 'allGames',
    fastRender: true,
    action: function() {
        this.render('allGames');
        SEO.set({
            title: 'Toutes les parties - ' + Meteor.App.NAME
        });
    }
});

Router.route('/tabs', {
    name: 'tabs',
    fastRender: true,
    action: function() {
        this.layout('tabsLayout');
        this.render('tabs.one');
        SEO.set({
            title: 'Tabs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/tabs.one', {
    name: 'tabs.one',
    fastRender: true,
    action: function() {
        this.layout('tabsLayout');
        this.render('tabs.one');
        SEO.set({
            title: 'Tabs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/tabs.two', {
    name: 'tabs.two',
    fastRender: true,
    action: function() {
        this.layout('tabsLayout');
        this.render('tabs.two');
        SEO.set({
            title: 'Tabs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/tabs.three', {
    name: 'tabs.three',
    fastRender: true,
    action: function() {
        this.layout('tabsLayout');
        this.render('tabs.three');
        SEO.set({
            title: 'Tabs - ' + Meteor.App.NAME
        });
    }
});

Router.route('/tabs.four', {
    name: 'tabs.four',
    fastRender: true,
    action: function() {
        this.layout('tabsLayout');
        this.render('tabs.four');
        SEO.set({
            title: 'Tabs - ' + Meteor.App.NAME
        });
    }
});
//Router.route('verifyEmail', {
//    controller: 'AccountController',
//    path: '/verify-email/:token',
//    action: 'verifyEmail'
//});
//
//Router.route('/verified', {
//    name: 'verified',
//    action: function () {
//        this.render('verified');
//        SEO.set({
//            title: 'eMail Validé - ' + Meteor.App.NAME
//        });
//    }
//});
//
//AccountController = RouteController.extend({
//    verifyEmail: function () {
//        Accounts.verifyEmail(this.params.token, function () {
//            Router.go('/verified');
//        });
//    }
//});
