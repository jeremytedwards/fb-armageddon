(function(module) {
    var arenaView = {};

    arenaView.index = function() {
        console.log('arenaView.index called...')
        // load navigation

        // hide hero and show arena section
    };

    arenaView.heroes = [];
    arenaView.victor = {};

    arenaView.hideArena = function() {
      $("#arena").hide();
    }

    arenaView.battle = function() {
      arenaView.heroes.forEach(function(h) {
        var s = ((h.strength + h.stamina + h.speed) / 3).toFixed(0);
        h.level = parseInt(s);
        console.log(h.charName + " is level " + h.level);
      })
        arenaView.heroes.sort(function(a,b) {
          console.log(a.level);
          console.log(b.level);
          if(a.level > b.level) {
            arenaView.victor = a;
            heroView.coronate(a.charName + ' is the victor.');
          } else if(b.level > a.level) {
            arenaView.victor = b;
            heroView.coronate(b.charName + ' is the victor.');
          } else {
            heroView.coronate('The battle was a draw.');
          }
      })
      //Reset the array after each battle.
      arenaView.heroes = [];
    }

    module.arenaView = arenaView;
})(window);
