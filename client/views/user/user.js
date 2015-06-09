Template.userPage.helpers({
    gameCount: function() {
        return  Games.find({
            createdBy: Meteor.userId()
        }).count();
    }
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.userPage.events({
    "click .changePwd": function (event, template) {
        AccountsTemplates.setState("changePwd");

        //            Games.remove(event.currentTarget.id);
    },
    'click [data-action=logout]': function () {
        AccountsTemplates.logout();
    },
});