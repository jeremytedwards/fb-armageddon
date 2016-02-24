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
          'sql': 'SELECT * FROM UserData;',
          // 'data': [heroName]
        }
      ],
      function(rows) {
        LevelBuilder.all = []; //Resets the array to prevent accumulation of old data.
        LevelBuilder.all = rows.map(function(e) {
          return new LevelBuilder(e);
        })
        .reduce(function(newObj, cur) {
          newObj.caloriesOut += cur.caloriesOut;
          newObj.distance += cur.distance;
          newObj.steps += cur.steps;
          newObj.floors += cur.floors;
          console.log('calories', newObj.caloriesOut, cur.caloriesOut);
          console.log('distance', newObj.distance, cur.distance);
          console.log('steps', newObj.steps, cur.steps);
          console.log('floors', newObj.floors, cur.floors);
          return newObj;
        },{
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
    obj.strength = Math.floor(obj.floors / 100);
    if(obj.strength > 20) {
      obj.strength = 20;
    };
    obj.speed = Math.floor(obj.distance / 25);
    if(obj.speed > 20) {
      obj.speed = 20;
    };
    obj.stamina = Math.floor(obj.steps / 50000);
    if(obj.stamina > 20) {
      obj.stamina = 20;
    };
  };

  module.LevelBuilder = LevelBuilder;
})(window);
