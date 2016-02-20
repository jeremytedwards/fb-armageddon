(function(module) {

   var hero = {};

   Hero.all = [];

   function Hero(opts) {
     Object.keys(opts).forEach(function(e, index, keys) {
         this[e] = opts[e];
       },this);
     };

  //Create working SQL table to hold data for our heroes.
   Hero.createTable = function() {
     webDB.execute(
       'CREATE TABLE IF NOT EXISTS heroes (' +
       'id INTEGER PRIMARY KEY, ' +
       'charName VARCHAR(40) NOT NULL, ' +
       'created DATETIME, ' +
       'strength INTEGER, ' +
       'speed INTEGER, ' +
       'stamina INTEGER, ' +
       'achievements ARRAY, ' +
       'users ARRAY);',
       function(result) {
         console.log('Successfully set up heroes table.', result);
         if (callback) callback();
       }
     );
   };

   Hero.clearTable = function(callback) {
     webDB.execute(
       'DELETE FROM heroes;',
       callback
     );
   };

   //Inserts new heroes into the SQL table .
   Hero.prototype.saveHero = function() {
     webDB.execute(
       [
         {
           'sql': 'INSERT INTO heroes (name, created, strength, speed, stamina, achievements, users) VALUES (?, ?, ?, ?, ?, ?, ?);',
           'data': [this.charName, this.created, this.strength, this.speed, this.stamina, this.achievements, this.users],
         }
       ],
     );
   };

   Hero.prototype.deleteHero = function() {
     webDB.execute(
       [
         {
           'sql': 'DELETE FROM heroes WHERE id = ?;',
           'data': [this.id]
         }
       ]
     );
   };

   //Primary method for editing existing heroes. Every time we retrieve updated
   //data from the API, we should call this function to update the stats for each hero.
   Hero.prototype.updateRecord = function() {
     webDB.execute(
       [
         {
           'sql': 'UPDATE heroes SET strength = ?, speed = ?, stamina = ? WHERE name = ?;',
           'data': [this.strength, this.speed, this.stamina, this.name]
         }
       ]
     );
   };

   Hero.loadAll(rows) {
     Hero.all = rows.map(function(ele) {
       return new Hero(ele);
     });
   };

   //Pull static sample heroes from our JSON file and inserts them into the SQL table.
   Hero.fetchHeroes = function(next) {
     webDB.execute('SELECT * FROM heroes ORDER BY charName ASC', function(rows) {
       $.getJSON('charModel.json', function(rawData) {
         rawData.forEach(function(item) {
           var hero = new Hero(item);
           Hero.saveHero();
         });
         webDB.execute('SELECT * FROM heroes', function(rows) {
           Hero.loadAll(rows);
           next();
         });
       });
     });
   };

  module.hero = hero;
})(window);
