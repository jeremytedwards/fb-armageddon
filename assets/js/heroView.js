(function(module) {

  var heroView = {};

  heroView.render = function(hero) {
    $('#head').html('<img src="/images/' + hero.stamina + '-weapon.png" />');
    $('#torso').html('<img src="/images/' + hero.strength + '-weapon.png" />');
    $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');
    hero.achievements.forEach(function() {
      $('#achievements').append('<img src="/images/' + this.achId + '-achievements.png" />');
      $('.achlist').append(this.achName + ', ');
    });
    $('.stats li:first').text(hero.stamina);
    $('.stats li:second').text(hero.strength);
    $('.stats li:third').text(hero.speed);
  };

module.heroView = heroView;
})(window);
