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

  //Pull static sample heroes from our JSON file, generate an array of Hero objects,
  // and insert them into the SQL table.
  Hero.loadAll = function(rows) {
    Hero.all = rows.map(function(ele) {
      return new Hero(ele);
    });
  };

  Hero.fetchHeroes = function() {
    webDB.execute('SELECT * FROM Heroes ORDER BY charName ASC', function(rows) {
      $.getJSON('assets/js/characters/charModel.json', function(rawData) {
        rawData.forEach(function(item) {
          var hero = new Hero(item);
          hero.populateHeroes();
        });
        webDB.execute('SELECT * FROM Heroes', function(rows) {
          Hero.loadAll(rows);
        });
      });
    });
  };

  module.Hero = Hero;
})(window);
