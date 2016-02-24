(function(module) {

  Achievement.all = [];

  function Achievement(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Achievement.loadAchievements = function() {
    console.log(Achievement.all);
    $.getJSON('/assets/data/achievements.json', function(rawData) {
      rawData.forEach(function(item) {
        var achievement = new Achievement(item);
        console.log(achievement);
        Achievement.all.push(achievement);
      });
    });
  };

module.Achievement = Achievement;
})(window);
