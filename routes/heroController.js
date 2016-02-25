(function(module) {
    var heroController = {};

    heroController.index = function() {
        console.log("heroController called...");

        // load page
        if ( localStorage.heroName ) {
            heroView.heroPage();
        } else {
            heroView.emptyPage();
        }

    };

    module.heroController = heroController;
})(window);
