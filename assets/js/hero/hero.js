(function(module) {

  function Hero(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  // var hero = {};

  Hero.all = [];
  Hero.menu = [];

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
        console.log('Successfully set up Heroes table.');
        // if (callback) callback();
      }
    );
  };

  Hero.prototype.setLevels = function(object) {
    var dummyHero = new Hero(object);
    dummyHero.stamina = (object.activeMinutes / n);
    if (dummyHero.stamina > 20) {
      dummyHero.stamina = 20;
    }
    dummyHero.stamina = dummyHero.stamina.toFixed(0);
    console.log("Stamina level " + dummyHero.stamina);
    dummyHero.strength = (object.distance / n);
    if (dummyHero.strength > 20) {
      dummyHero.strength = 20;
    }
    dummyHero.strength = dummyHero.strength.toFixed(0);
    console.log("Strength level " + dummyHero.strength);
    dummyHero.speed = (object.steps / n);
    if (dummyHero.speed > 20) {
      dummyHero.speed = 20;
    }
    dummyHero.speed = dummyHero.speed.toFixed(0);
    console.log("Speed level " + dummyHero.speed);
    return dummyHero;
  }

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
    console.log("Hero populated.");
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
    Hero.all.forEach(function(hero) {
      hero.attachAchievements();
    })
  };

  Hero.populateTable = function(callback) {
    webDB.execute('SELECT * FROM Heroes ORDER BY charName ASC', function(rows) {
      $.getJSON('assets/data/charModel.json', function(rawData) {
        rawData.forEach(function(item) {
          var hero = new Hero(item);
          Hero.menu.push(hero);
          console.log(hero);
          hero.populateHeroes();
        })
      }).done(function() {
          console.log("Callback is being called now");
          callback();
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
    var tempArray = [];
    if(this.strength > 0) {
      tempArray.push(Achievement.all[0]);
    }
    if(this.strength > 4) {
      tempArray.push(Achievement.all[1]);
    }
    if(this.strength > 9) {
      tempArray.push(Achievement.all[2]);
    }
    if(this.strength > 14) {
      tempArray.push(Achievement.all[3]);
    }
    if(this.strength > 19) {
      tempArray.push(Achievement.all[4]);
    }
    if(this.stamina > 0) {
      tempArray.push(Achievement.all[5]);
    }
    if(this.stamina > 4) {
      tempArray.push(Achievement.all[6]);
    }
    if(this.stamina > 9) {
      tempArray.push(Achievement.all[7]);
    }
    if(this.stamina > 14) {
      tempArray.push(Achievement.all[8]);
    }
    if(this.stamina > 19) {
      tempArray.push(Achievement.all[9]);
    }
    if(this.speed > 0) {
      tempArray.push(Achievement.all[10]);
    }
    if(this.speed > 4) {
      tempArray.push(Achievement.all[11]);
    }
    if(this.speed > 9) {
      tempArray.push(Achievement.all[12]);
    }
    if(this.speed > 14) {
      tempArray.push(Achievement.all[13]);
    }
    if(this.speed > 19) {
      tempArray.push(Achievement.all[14]);
    }
    this.achievements = tempArray;
    console.log(this.achievements);
  };

  module.Hero = Hero;
})(window);
