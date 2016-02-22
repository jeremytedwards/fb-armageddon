(function(module) {

  function Achievement (id, name, earned) {
    this.achId = id;
    this.achName = name;
  }

  Achievement.all = [];

  function loadAchievements() {
    $.getJSON('/assets/data/achievements.json', function(rawData) {
      rawData.forEach(function(item) {
        var achievement = new Achievement(item);
        Achievement.all.push(achievement);
      });
    }
  }

  attachAchievements = function(hero) {

  }

module.achievements = achievements;
})(window);