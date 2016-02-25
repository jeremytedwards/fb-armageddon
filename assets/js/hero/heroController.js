(function(module) {
    var heroController = {};

    heroController.index = function() {
        console.log('heroController called lets test')
        $('#hero').show();
        //Check if one is in cache
        if(localStorage.heroName) {
            Hero.outputHero(localStorage.heroName);
            heroView.heroPage();
        } else {
          heroView.empty();
        }

    };

    module.heroController = heroController;
})(window);
