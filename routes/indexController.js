(function(module) {
    var indexController = {};

    indexController.index = function() {
        console.log("indexController called...");

        // TODO: Set default data state here


        $('#hero').hide();
        $('#arena').hide();
    };

    module.indexController = indexController;
})(window);
