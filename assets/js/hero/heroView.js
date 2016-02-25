(function(module) {

  var heroView = {};

  heroView.renderHero = function() {
    Hero.all.forEach(function(hero) {
      localStorage.heroName = hero.charName;

      $('#bearhead').html('<img src="/images/' + hero.stamina + '-head.png" />');
      $('#torso').html('<img src="/images/' + hero.strength + '-torso.png" />');
      $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');

    });

    console.log("heroView.renderHero called...");
  }

  heroView.renderStats = function() {
    Hero.all.forEach(function(hero) {
      $('.stamina').html(hero.stamina);
      $('.strength').html(hero.strength);
      $('.speed').html(hero.speed);
    })

    console.log("heroView.renderStats called...");
  }

  heroView.renderAchievements = function() {
    Hero.all.forEach(function(hero) {
      hero.achievements.forEach(function(a) {
        $('#hero-achievements ul').append('<li><img src="/images/' + a.achId + '-achievements.png" class="achievement" title="' + a.achText + '"/></li>');
        $('.achivement-list').append(a.achName + ', ');
      });
    })

    console.log("heroView.renderAchievements called...");
  }

  heroView.populateHeroList = function() {
    console.log(Hero.menu);

    Hero.menu.forEach(function(hero) {
      var appStr = '<li style="white-space: nowrap;">' + hero.charName + '</li>';
      $('#saved-heros').append(appStr);

      console.log(appStr);
    });

    console.log("heroView.populateHeroList called...");
  }

  heroView.wipeHero = function() {
    $('#head').html('');
    $('#torso').html('');
    $('#weapon').html('');

    console.log("heroView.wipeHero called...");
  }

  heroView.wipeAchievements = function() {
    $('#achievements').html('');
    $('.achievement-list').html('');

    console.log("heroView.wipeAchievements called...");
  }

  heroView.wipeStats = function() {
    $('.stats li').text('');

    console.log("heroView.wipeStats called...");
  }

  heroView.wipe = function() {
    heroView.wipeHero();
    heroView.wipeStats();
    heroView.wipeAchievements();

    console.log("heroView.wipe called...");
  }

  heroView.hideAllHeroItems = function() {
    $('#create-btn').hide();
    $('#hero-instructions').hide();
    $('#hero-list').hide();
    $('#hero-stats').hide();
    $('#player-nav').hide();
    $('#fitbit-nav').hide();

    console.log("heroView.hideAllHeroItems called...");
  }


  /**  Button Handlers **/

  heroView.initArenaLeftButton = function() {
    $('#arenaLeft-btn').on('click', function(e) {
      e.preventDefault();

      // Add current hero name to left of area
      arenaView.setArenaLeft();

      // TODO: jump to area on click
      //location.href="/arena#arena";

      console.log("arenaLeft-btn clicked...");
    });
  }

  heroView.initArenaRightButton = function() {
    $('#arenaRight-btn').on('click', function(e) {
      e.preventDefault();

      // Add current hero name to left of area
      arenaView.setArenaRight();

      // TODO: jump to area on click
      //location.href="/arena#arena";

      console.log("arenaRight-btn clicked...");
    });
  }

  heroView.initHeroCreateButton = function() {
    $('#create-btn').on('click', function(e) {
      e.preventDefault();

      // TODO: refactor prompt for hero name create hero generic
      localStorage.heroName = $('#heroCreate').val();
      Hero.createHero(localStorage.heroName);
      heroView.heroPage();
      console.log("create-btn clicked...");
    });
  }

  heroView.initFitbitNavCreateButton = function() {
    $('#ch-btn').on('click', function(e) {
      e.preventDefault();

      localStorage.clear();

      heroView.emptyPage();
      console.log("ch-btn clicked...");
    });
  }

  heroView.initFitbitNavAddFitbit = function() {
    $('#fb-btn').on('click', function(e) {
      e.preventDefault();

      // TODO: call /fitbit route
      $.get('/fitbit', function(data) {
        console.log('Calling to /fitbit...')
      });

      // TODO: call get json route
      UserData.fetchJSON();

      // Update button states
      $('#fb-btn').hide();
      $('#ch-btn').show();
      $('#lo-btn').show();

      //heroView.heroPage();
      console.log("fb-btn clicked...");
    });
  }

  heroView.initFitbitNavLogout = function() {
    $('#lo-btn').on('click', function(e) {
      e.preventDefault();

      // TODO: call /logout route
      //$.ajax('/logout').done();

      // Update button states
      $('#fb-btn').show();
      $('#ch-btn').show();
      $('#lo-btn').hide();

      console.log("lo-btn clicked...");
    });
  }

  /**  Render Fitbit Navigation **/

  heroView.renderFitbitNav = function() {
    heroView.initFitbitNavCreateButton();
    heroView.initFitbitNavAddFitbit();
    heroView.initFitbitNavLogout();

    // hide logout button
    $('#lo-btn').hide();
    $('#fb-btn').show();
    $('#ch-btn').show();

    console.log("heroView.renderFitbitNav called...");
  }

  heroView.renderPlayerNav = function() {
    $('#arenaLeft-btn').show();
    $('#arenaRight-btn').show();

    console.log("heroView.renderPlayerNav called...");
  }
  /**  Page Views **/

  heroView.emptyPage = function() {
    heroView.hideAllHeroItems();
    // show hero section
    $('#hero').show();

    // show #create-btn
    $('#create-btn').show();
    // show #intro
    $('#hero-instructions').show();
    // show #hero-list
    $('#hero-list').show();

    // render functions
    heroView.initHeroCreateButton();
    heroView.populateHeroList();

    console.log("heroView.emptyPage called...");
  }

  heroView.heroPage = function() {
    heroView.hideAllHeroItems();
    // Hide create form
    $('#crform').hide();
    // show hero section
    $('#hero').show();

    // show #player-nav
    $('#player-nav').show();
    // show #fitbit-nav
    $('#fitbit-nav').show();
    // show #stats
    $('#hero-stats').show();
    // show #hero-achievements
    $('#hero-achivements').show();
    // show
    $('#hero-list').show();

    // render functions
    heroView.renderHero();
    heroView.renderPlayerNav();
    heroView.renderFitbitNav();
    heroView.renderStats();
    heroView.renderAchievements();
    heroView.populateHeroList();

    console.log("heroView.heroPage called...");
  }

  module.heroView = heroView;
})(window);
