(function(module) {
    var indexController = {};

    indexController.index = function() {
        console.log('indexController.index called...')
        // load navigation

        // hide hero and arena section
        indexView.render();
    };

    module.indexController = indexController;
})(window);