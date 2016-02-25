(function(module) {
    var arenaController = {};

    arenaController.index = function() {
        console.log("arenaController called...");

        // init before page load
        arenaController.heroes = [];
        arenaController.victor = {};

        // load pages
        arenaView.arenaPage();
        heroView.heroPage();
    };

    module.arenaController = arenaController;
})(window);
