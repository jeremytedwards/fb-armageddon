(function(module) {
    var indexController = {};

    indexController.index = function() {
        console.log("indexController called...");

        // TODO: Set default data state for /index here
        localStorage.removeItem('heroName');
        Hero.createTable();
        Hero.populateTable();

        $('#hero').hide();
        $('#arena').hide();
    };

    module.indexController = indexController;
})(window);
