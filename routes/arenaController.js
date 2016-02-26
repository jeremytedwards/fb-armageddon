(function(module) {
    var arenaController = {};

    arenaController.index = function() {
        console.log("arenaController called...");

        // init before page load
        arenaView.heroes = [];
        arenaView.victor = {};

        // load pages
        arenaView.arenaPage();
    };

    module.arenaController = arenaController;
})(window);
