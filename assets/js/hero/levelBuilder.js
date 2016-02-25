(function(module) {

  function LevelBuilder(opts) {
    this.userID = opts.userID;
    this.heroID = opts.heroID;
    this.caloriesOut = opts.caloriesOut;
    this.distance = opts.distance;
    this.steps = opts.steps;
    this.floors = opts.floors;
    this.strength = opts.strength;
    this.speed = opts.speed;
    this.stamina = opts.stamina;
  };

  LevelBuilder.all = [];

  LevelBuilder.aggregate = function() {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM UserData WHERE heroID = ?;',
          'data': [localStorage.heroName]
        }
      ],
      function(rows) {
        LevelBuilder.all = []; //Resets the array to prevent accumulation of old data.
        LevelBuilder.all = rows.map(function(e) {
          return new LevelBuilder(e);
        })
        .reduce(function(newObj, cur) {
          if(cur.caloriesOut  == "undefined") {
            newObj.caloriesOut += 0;
          } else {
            newObj.caloriesOut += cur.caloriesOut;
          };
          if(cur.distance  == "undefined") {
            newObj.distance += 0;
          } else {
            newObj.distance += cur.distance;
          };
          if(cur.steps  == "undefined") {
            newObj.steps += 0;
          } else {
            newObj.steps += cur.steps;
          };
          if(cur.floors == "undefined") {
            newObj.floors += 0;
          } else {
            newObj.floors += cur.floors;
          };
          console.log('calories', newObj.caloriesOut, cur.caloriesOut);
          console.log('distance', newObj.distance, cur.distance);
          console.log('steps', newObj.steps, cur.steps);
          console.log('floors', newObj.floors, cur.floors);
          return newObj;
        },{
          charName: localStorage.heroName,
          caloriesOut: 0,
          distance: 0,
          steps: 0,
          floors: 0,
          strength: 0,
          speed: 0,
          stamina: 0
        })
        LevelBuilder.setLevels(LevelBuilder.all);
        console.log(LevelBuilder.all);
        Hero.updateRecord(LevelBuilder.all);
      }
    );
  };

  LevelBuilder.setLevels = function(obj) {
    obj.strength = Math.floor(obj.floors / 50);
    if(obj.strength > 10) {
      obj.strength = 10;
    };
    obj.speed = Math.floor(obj.distance / 100);
    if(obj.speed > 10) {
      obj.speed = 10;
    };
    obj.stamina = Math.floor(obj.steps / 100000);
    if(obj.stamina > 10) {
      obj.stamina = 10;
    };
  };

  module.LevelBuilder = LevelBuilder;
})(window);
