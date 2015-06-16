/*
// Libraries which need a global variable, such as jQuery etc
globalVariable = function () {
}
*/

//if ('addEventListener' in document) {
//    document.addEventListener('DOMContentLoaded', function() {
//        FastClick.attach(document.body);
//    }, false);
//}

Accounts.onLogin(function(user){
    Router.go('/user/');
});