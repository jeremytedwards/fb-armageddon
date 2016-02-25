//var fs = require( 'fs' );

(function(module) {
    var resetController = {};

    var tokenResetString = '{' +
        '"access_token": ACCESS_TOKEN,' +
        '"expires_in": SECONDS,' +
        '"expires_at": "20150829T10:20:25",' +
        '"refresh_token": REFRESH_TOKEN' +
        '}';

    resetController.index = function() {
        console.log("resetController called...");

        // TODO: Restore the status to a default state
        localStorage.clear();
        Hero.massacre();
        UserData.dumpUsers();

        //fs.writeFile( './fb-token.json', tokenResetString);

        $('#hero').hide();
        $('#arena').hide();

        indexController.index();
    };

    module.resetController = resetController;
})(window);
