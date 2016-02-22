(function(module) {

  function Hero(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  // var hero = {};

  Hero.all = [];

  //Create working SQL table to hold data for our heroes.
  Hero.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS Heroes (' +
      'id INTEGER PRIMARY KEY, ' +
      'charName VARCHAR(40) NOT NULL, ' +
      'created DATETIME, ' +
      'strength INTEGER, ' +
      'speed INTEGER, ' +
      'stamina INTEGER, ' +
      'achievements ARRAY, ' +
      'users ARRAY);',
      function(result) {
        console.log('Successfully set up Heroes table.', result);
        // if (callback) callback();
      }
    );
  };

  //Inserts new heroes into the SQL table .
  Hero.prototype.populateHeroes = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Heroes (charName, created, strength, speed, stamina, achievements, users) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.charName, this.created, this.strength, this.speed, this.stamina, this.achievements, this.users],
        }
      ],
      callback
    );
  };

  //Methods for updating data in the SQL table
  Hero.updateRecord = function(update) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE Heroes SET strength = ?, speed = ?, stamina = ? WHERE charName = ?;',
          'data': [update.strength, update.speed, update.stamina, update.charName]
        }
      ]
    );
  };

  Hero.addToTable = function(e) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Heroes (charName, created, strength, speed, stamina, achievements, users) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [e.charName, e.created, e.strength, e.speed, e.stamina, e.achievements, e.users],
        }
      ]
    );
  };

  Hero.deleteFromTable = function(name) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM Heroes WHERE charName = ?;',
          'data': [name]
        }
      ]
    );
  };

  Hero.clearTable = function(callback) {
    webDB.execute(
      'DELETE FROM Heroes;',
      callback
    );
  };

  Hero.massacre = function() {
    webDB.execute(
      [
        {
          'sql': 'drop table Heroes;',
        }
      ]
    );
  };

  //Pull static sample heroes from our JSON file, generate an array of Hero objects,
  // and insert them into the SQL table.
  Hero.loadAll = function(rows) {
    Hero.all = rows.map(function(ele) {
      return new Hero(ele);
    });
  };

  Hero.fetchHeroes = function() {
    webDB.execute('SELECT * FROM Heroes ORDER BY charName ASC', function(rows) {
      $.getJSON('assets/data/charModel.json', function(rawData) {
        rawData.forEach(function(item) {
          var hero = new Hero(item);
          hero.populateHeroes();
        });
        /*webDB.execute('SELECT * FROM Heroes', function(rows) {
          Hero.loadAll(rows);
        }); */
      });
    });
  };

  //Methods for updating Hero data in the SQL table based on FitBit API calls.

  //Loops through the "users" array for the selected hero and triggers the API calls
  //for updated FitBit data. Returns an array of objects containing active minutes,
  //distance, and steps for each user.

  /*
  Hero.getUserData = function() {
    Hero.all.forEach(function(bear) {
      console.log(bear.users);
      var userArray = bear.users.split(",");
      console.log(userArray);
    });
  };
  */

  /*
  Hero.updateData = function() {

  };

  Hero.updateLevels = function() {

  };
  */

  //Search SQL table and return as an object in the Hero.all array.
  //
  Hero.outputHero = function(name, callback) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM Heroes WHERE charName = ?;',
          'data': [name]
        }
      ],
      function(rows) {
        Hero.all = []; //Reset Hero.all to an empty array to prevent accumulation of old searches.
        Hero.loadAll(rows);
      })
      if(callback) {
        callback();
      };
  };

  //Methods for integrating achievement system.
  Hero.prototype.attachAchievements = function() {
    if(this.strength > 0) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.strength > 4) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.strength > 9) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.strength > 14) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.strength > 19) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.stamina > 0) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.stamina > 4) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.stamina > 9) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.stamina > 14) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.stamina > 19) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.speed > 0) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.speed > 4) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.speed > 9) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.speed > 14) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.speed > 19) {
      this.achievements.push(Achievement.all[0]);
    }
  };

  module.Hero = Hero;
})(window);
