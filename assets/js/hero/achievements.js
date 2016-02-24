(function(module) {

  function Achievement (id, name, text) {
    this.achId = id;
    this.achName = name;
    this.achText = text;
  }

  Achievement.all = [];

  function loadAchievements() {
    $.getJSON('/assets/data/achievements.json', function(rawData) {
      rawData.forEach(function(item) {
        var achievement = new Achievement(item);
        Achievement.all.push(achievement);
      });
    });
  } // end loadAchievements

module.achievements = achievements;
})(window);
