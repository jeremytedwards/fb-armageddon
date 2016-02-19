(function(module) {

  var hero = {};

  Hero.all = [];

  function Hero(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
        this[e] = opts[e];
      },this);
    };

  Hero.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS heroes (' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR(40) NOT NULL, ' +
        'created DATETIME, ' +
        'strength INTEGER, ' +
        'speed INTEGER, ' +
        'stamina INTEGER, ' +
        'achievements ARRAY, ' +
        'users ARRAY);';
    );
  };

  Hero.prototype.saveHero = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO heroes (name, created, strength, speed, stamina, achievements, users) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.name, this.created, this.strength, this.speed, this.stamina, this.achievements, this.users],
        }
      ],
    );
  }

module.heroView = heroView;
})(window);
