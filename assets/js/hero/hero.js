(function(module) {

  function Hero(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  // var hero = {};

  Hero.all = [];
  Hero.users = {};
  Hero.menu = [];

  //Function to accept input from the user, create a new hero object, and
  //add the hero to the SQL table.
  Hero.createHero = function(input) {
    var newHero = {
      charName: input,
      strength: 0,
      speed: 0,
      stamina: 0,
      achievements: []
    };
    Hero.addToTable(newHero);
    localStorage.heroName = input;
  }

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
      'achievements ARRAY);',
      function(result) {
        console.log('Successfully set up Heroes table.');
      }
    );
  };

  //Inserts sample heroes into the SQL table .
  Hero.prototype.populateHeroes = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Heroes (charName, created, strength, speed, stamina, achievements) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.charName, this.created, this.strength, this.speed, this.stamina, this.achievements],
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
          'sql': 'INSERT INTO Heroes (charName, strength, speed, stamina, achievements) VALUES (?, ?, ?, ?, ?);',
          'data': [e.charName, e.strength, e.speed, e.stamina, e.achievements],
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
      ],
      function() {
        localStorage.removeItem('tableCheck');
      }
    );
  };

  Hero.menuBuilder = function(callback) {
    Hero.menu = []; //Resets array.
    webDB.execute('SELECT * FROM Heroes ORDER BY charName ASC', function(rows) {
      rows.forEach(function(item) {
        var hero = new Hero(item);
        Hero.menu.push(hero);
      })
    });
    console.log('Menu builder complete');
    setTimeout(function() {
      if(callback) {
        callback();
      };
    },500);
  }

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

  Hero.populateTable = function() {
    Hero.menu = [];
    if(!localStorage.tableCheck) {
      Hero.menu = []; //Resets array;
      webDB.execute('SELECT * FROM Heroes ORDER BY charName ASC', function(rows) {
        $.getJSON('assets/data/charModel.json', function(rawData) {
          rawData.forEach(function(item) {
            var hero = new Hero(item);
            Hero.menu.push(hero);
            console.log(hero);
            hero.populateHeroes();
          })
        }).done(function() {
          localStorage.tableCheck = true;
          console.log("Callback is being called now");
        });
      });
    } else {
      Hero.menuBuilder();
    };
  };

  //Methods for updating Hero data in the SQL table based on FitBit API calls.

  //Search SQL table and return as an object in the Hero.all array.
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
        console.log("outputHero complete");
      });
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
    if(this.strength > 2) {
      tempArray.push(Achievement.all[1]);
    }
    if(this.strength > 4) {
      tempArray.push(Achievement.all[2]);
    }
    if(this.strength > 6) {
      tempArray.push(Achievement.all[3]);
    }
    if(this.strength > 9) {
      tempArray.push(Achievement.all[4]);
    }
    if(this.stamina > 0) {
      tempArray.push(Achievement.all[5]);
    }
    if(this.stamina > 2) {
      tempArray.push(Achievement.all[6]);
    }
    if(this.stamina > 4) {
      tempArray.push(Achievement.all[7]);
    }
    if(this.stamina > 6) {
      tempArray.push(Achievement.all[8]);
    }
    if(this.stamina > 9) {
      tempArray.push(Achievement.all[9]);
    }
    if(this.speed > 0) {
      tempArray.push(Achievement.all[10]);
    }
    if(this.speed > 2) {
      tempArray.push(Achievement.all[11]);
    }
    if(this.speed > 4) {
      tempArray.push(Achievement.all[12]);
    }
    if(this.speed > 6) {
      tempArray.push(Achievement.all[13]);
    }
    if(this.speed > 009) {
      tempArray.push(Achievement.all[14]);
    }
    this.achievements = tempArray;
    console.log(this.achievements);
  };

  module.Hero = Hero;
})(window);
