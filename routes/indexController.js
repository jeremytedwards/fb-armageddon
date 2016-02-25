(function(module) {
    var indexController = {};

    indexController.index = function() {
        console.log("indexController called...");
        // set hero section
        arenaView.hideArena();
        heroView.hideHero();

        // set arena sectio


    };

    module.indexController = indexController;
})(window);
