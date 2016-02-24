(function(module) {

  var heroView = {};

  heroView.render = function(hero) {
    $('#head').html('<img src="/images/' + hero.stamina + '-head.png" />');
    $('#torso').html('<img src="/images/' + hero.strength + '-torso.png" />');
    $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');
    hero.achievements.forEach(function() {
      $('#achievements ul').append('<li><img src="/images/' + this.achId + '-achievements.png" alt="' + this.achText + '"/></li>');
      $('.achlist').append(this.achName + ', ');
    });
    $('.stats li:first').text(hero.stamina);
    $('.stats li:second').text(hero.strength);
    $('.stats li:third').text(hero.speed);
  };

  heroView.populateList = function() {
    Hero.all.forEach(function(hero) {
      $('#herolist').append('<li><a href="#">' + hero.name + '</a></li>');
      $('#herolist li').on('click', function() {
        Hero.loadHero(hero);
      })
    });
  }

  heroView.wipe = function() {
    $('#head').html('');
    $('#torso').html('');
    $('#weapon').html('');
    $('#achievements').html('');
    $('.achlist').html('');
    $('.stats li').text('');
  }

module.heroView = heroView;
})(window);
