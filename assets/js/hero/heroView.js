(function(module) {

  var heroView = {};

  heroView.render = function() {
    Hero.all.forEach(function(hero) {
      localStorage.heroName = hero.charName;
      $('#bearhead').html('<img src="/images/' + hero.stamina + '-head.png" />');
      $('#torso').html('<img src="/images/' + hero.strength + '-torso.png" />');
      $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');
      $('.stamina').html(hero.stamina);
      $('.strength').html(hero.strength);
      $('.speed').html(hero.speed);
      hero.achievements.forEach(function(a) {
        $('#achievements ul').append('<li><img src="/images/' + a.achId + '-achievements.png" alt="' + a.achText + '"/></li>');
        $('.achlist').append(a.achName + ', ');
      });
    })
  };

  heroView.populateList = function() {
    console.log("Populate List");
    console.log(Hero.menu);
    Hero.menu.forEach(function(hero) {
      console.log(hero.charName);
      var appStr = '<li style="white-space: nowrap;">' + hero.charName + '</li>';
      console.log(appStr);
      $('#herolist').append(appStr);
      // $('#herolist li').on('click', function() {
      //   Hero.loadHero(hero);
      //   console.log("Populate List hero");
      // })
    });
    console.log("Heroes appended.");
  }

  heroView.wipe = function() {
    $('#head').html('');
    $('#torso').html('');
    $('#weapon').html('');
    $('#achievements').html('');
    $('.achlist').html('');
    $('.stats li').text('');
  }

  heroView.arenaNames = function() {
    $('#contestant1').html(arenaView.heroes[0].charName);
    if(arenaView.heroes[1]) {
      $('#contestant2').html(arenaView.heroes[1].charName);
    }
  }

  heroView.coronate = function(string) {
    $('#contestant1').hide();
    $('#contestant2').hide();
    $('#centerArena').toggleClass("victorname");
    $('#centerArena').html(string);
  }

  heroView.resetArena = function() {
    $('#contestant1').show();
    $('#contestant1').html('')
    $('#centerArena').html('vs');
    $('#centerArena').toggleClass("victorname");
    $('#contestant2').show();
    $('#contestant2').html('');
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  heroView.displayVid = function() {
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
    })
  }

module.heroView = heroView;
})(window);
