(function(module) {
    var arenaController = {};

    arenaController.index = function() {
        console.log('arenaController.index called...')
        // load navigation

        // hide hero and show arena section
        arenaView.render();
    };

    module.arenaController = arenaController;
})(window);