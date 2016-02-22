(function(module) {

  var heroView = {};

  heroView.render = function(hero) {
    $('#head').html('<img src="/images/' + hero.stamina + '-weapon.png" />');
    $('#torso').html('<img src="/images/' + hero.strength + '-weapon.png" />');
    $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');
    hero.achievements.forEach(function() {
      $('#achievements').append('<img src="/images/' + this.achId + '-achievements.png" alt="' + this.achText + '"/>');
      $('.achlist').append(this.achName + ', ');
    });
    $('.stats li:first').text(hero.stamina);
    $('.stats li:second').text(hero.strength);
    $('.stats li:third').text(hero.speed);
  };

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
