(function(module) {
    var arenaController = {};

    arenaController.index = function() {
        console.log('arenaController.index called...')
        // load navigation

        // hide hero and show arena section
        arenaView.render();
    };

    arenaController.heroes = [];
    arenaController.victor = {};

    arenaController.addHero = function() {
      if(!arenaController.heroes.length) {
        console.log("Adding first hero");
        arenaController.heroes.push(Hero.all[0]);
        heroView.arenaNames(arenaController.heroes[0].charName);
      } else if(arenaController.heroes.length = 1) {
        console.log("Adding second hero");
        arenaController.heroes.push(Hero.all[0]);
        heroView.arenaNames(arenaController.heroes[1].charName);
      } else {
        $('#centerArena').html('The arena has too many combatants! Please remove one before adding new Heroes to the arena.');
      }
    };

    arenaController.battle = function() {
      arenaController.heroes.forEach(function(h) {
        var s = ((h.strength + h.stamina + h.speed) / 3).toFixed(0);
        console.log(s);
        h.level = s;
      })
      arenaController.heroes.map(function(a,b) {
        if(a.level > b.level) {
          arenaController.victor = a;
          heroView.coronate(a.charName + ' is the victor.');
        } else if(b.level > a.level) {
          arenaController.victor = b;
          heroView.coronate(b.charName + ' is the victor.');
        } else {
          heroView.coronate('The battle was a draw.');
        }
      })
      //Reset the array after each battle.
      arenaController.heroes = [];
    }

    module.arenaController = arenaController;
})(window);
