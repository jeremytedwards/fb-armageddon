(function(module) {

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

  Hero.prototype.loadHero = function(id) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM heroes', function(rows) {
            if (rows.length) {

            } else {
              **API CALL**
              **FUNCTION TO PARSE API DATA**
              API DATA.forEach(function(hero) {
                Hero.saveHero();
              })
            }
          }
        }
      ]
    )
  }

  Hero.prototype.updateHero = function() {
    webDB.execute(
      [
        {
          'sql': 'UPDATE heroes SET name = ?, created = ?, strength = ?, speed = ?, stamina = ?, achievements = ?, users = ? WHERE id = ?;',
          'data': [this.name, this.created, this.strength, this.speed, this.stamina, this.achievements, this.users, this.id]
        }
      ],
    );
  }

  Hero.prototype.removeHero = function() {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM heroes WHERE id = ?;',
          'data': [this.id]
        }
      ],
    );
    this.strength = 0;
    this.speed = 0;
    this.stamina = 0;
    this.achievements = [];
  }

  massacre = function() {
    webDB.execute(
      [
        {
          'sql': 'drop table heroes;',
        }
      ],
    );
  }

  Hero.prototype.attachAchievements = function() {
    if(this.strength > 0) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.strength > 4) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.strength > 9) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.strength > 14) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.strength > 19) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.speed > 0) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.speed > 4) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.speed > 9) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.speed > 14) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.spee > 19) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.stamina > 0) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.stamina > 4) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.stamina > 9) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.stamina > 14) {
      this.achievements.push(Achievements.all[0]);
    }
    if(this.stamina > 19) {
      this.achievements.push(Achievements.all[0]);
    }
  }

module.heroView = heroView;
})(window);
