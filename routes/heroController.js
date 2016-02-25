(function(module) {
    var heroController = {};

    heroController.index = function() {
        console.log("heroController called...");

        // init before page load
        // TODO: initialize the Hero.all with current hero's
        //Hero.populateTable(function(){
        //    // load page
        //    if ( localStorage.heroName ) {
        //        heroView.heroPage();
        //    } else {
        //        heroView.emptyPage();
        //    }
        //});

        // Hero.menuBuilder();

        // load page
        if ( localStorage.heroName ) {
            heroView.heroPage();
        } else {
            heroView.emptyPage();
        }

    };

    module.heroController = heroController;
})(window);
