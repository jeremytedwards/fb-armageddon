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
        LevelBuilder.all = [];
        LevelBuilder.all = rows.map(function(e) {
          return new LevelBuilder(e);
        })
        .reduce(function(newObj, cur) {
          return {
            // caloriesOut: newObj.caloriesOut + cur.caloriesOut;
            distance: newObj.distance + cur.distance
          };
          // newObj.caloriesOut = 0;
          // newObj.distance = 0;
          // newObj.steps = 0;
          // newObj.floors = 0;
          // newObj.strength = 0;
          // newObj.speed = 0;
          // newObj.stamina = 0;
          // newObj.caloriesOut = newObj.caloriesOut + cur.caloriesOut;
          // newObj.distance = newObj.distance + cur.distance;
          // newObj.steps = newObj.steps + cur.steps;
          // newObj.floors = newObj.floors + cur.floors;
          // console.log('calories', newObj.caloriesOut, cur.caloriesOut);
          console.log('distance', newObj.distance, cur.distance);
          // console.log('steps', newObj.steps, cur.steps);
          // console.log('floors', newObj.floors, cur.floors);
          return newObj;
        },{});
      }
    );
  };

  /* Text from Rob's earlier version of hero.js

  LevelBuilder.setLevels = function(object) {
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
*/

  module.LevelBuilder = LevelBuilder;
})(window);
