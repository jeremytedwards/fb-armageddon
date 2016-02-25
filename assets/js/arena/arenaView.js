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


    arenaView.coronate = function(string) {
        $('#contestant1').hide();
        $('#contestant2').hide();
        $('#centerArena').hide();
        $('#victoryName').show();
        $('#victoryName').html(string);

        console.log("arenaView.coronate called...");
    }

    arenaView.setArenaLeft = function() {
        $("#arena").show();
        arenaView.heroes.push(Hero.all[0]);
        $('#victoryName').hide();
        $('#centerArena').show();
        $('#contestant1').show();
        $('#contestant1').html(Hero.all[0].charName);

        console.log("arenaView.setArenaLeft called...");
    }

    arenaView.setArenaRight = function() {
        $("#arena").show();
        arenaView.heroes.push(Hero.all[0]);
        $('#victoryName').hide();
        $('#centerArena').show();
        $('#contestant2').show();
        $('#contestant2').html(Hero.all[0].charName);

        console.log("arenaView.setArenaRight called...");
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    arenaView.displayVid = function() {
        $.getJSON('assets/data/videoList.json', function(rawData) {
            rawData.forEach(function(item) {
                var video = new Video(item);
                console.log(video);
                Video.menu.push(video);
            })
        }).done(function() {
            $('#videoWrapper').show();
            var n = getRandomInt(0, Video.menu.length);
            console.log(n);
            console.log(Video.menu[n].htmlcode);
            $('#videoWrapper').html(Video.menu[n].htmlcode);
            Video.menu = [];
        });

        console.log("arenaView.displayVid called...");
    }

    module.arenaView = arenaView;
})(window);
