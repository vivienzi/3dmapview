var viewer = new Cesium.Viewer('cesiumContainer');
var scene = viewer.scene;
//state.lon, state.lat state['Call Drop Rate'][1][1]
//state['Call Drop Rate'][1][0]
//state.lon, state.lat state['Call Drop Rate'][1][1]
Cesium.loadJson('nations_test.json').then(function(Data) {
  for( state of Data){
    var blueBox = viewer.entities.add({
      name : 'box',
      position: Cesium.Cartesian3.fromDegrees(state.lon, state.lat, 000000)
    });
    for( i in state['Call Drop Rate']){
      var date = state['Call Drop Rate'][i][0];
      var rate = state['Call Drop Rate'][i][1];
      // var clock = new Cesium.Clock({
      //      startTime : Cesium.JulianDate.fromIso8601(state['Call Drop Rate'][0][0]),
      //      currentTime : Cesium.JulianDate.fromIso8601(date),
      //      stopTime : Cesium.JulianDate.fromIso8601(state['Call Drop Rate'][state['Call Drop Rate'].length-1][0]),
      //      clockRange : Cesium.ClockRange.CLAMPED,
      // });
      blueBox.box = {
          dimensions : new Cesium.Cartesian3(200000.0, 150000.0, rate*100000000),
          material : Cesium.Color.BLUE.withAlpha(0.5),
          outline : true,
      }
    }
  }
}).otherwise(function(error) {
    alert("ERROR: ",error);
});
