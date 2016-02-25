(function(module) {
    var indexController = {};

    indexController.index = function() {
        console.log("indexController called...");

        $('#hero').hide();
        $('#arena').hide();
    };

    module.indexController = indexController;
})(window);
