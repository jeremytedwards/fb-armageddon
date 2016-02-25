(function(module) {
    var heroController = {};

    heroController.index = function() {
        console.log('heroController called lets test')
        $('#hero').show();
        //Check if one is in cache
        if(localStorage.heroName) {
            heroView.heroPage();
            heroView.initRenderButton();
            Hero.populateTable(heroView.populateList());
        } else {
          heroView.empty();
          heroView.initCreateButton();
        }

    };

    module.heroController = heroController;
})(window);
