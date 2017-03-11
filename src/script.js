var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker : false
});

Sandcastle.reset = function() {
  viewer.dataSources.removeAll();
  //Set the camera to a US centered tilted view and switch back to moving in world coordinates.
  viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(-98.0, 40.0), new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0));
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
};

Sandcastle.finishedLoading();
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('ne_10m_us_states.topojson', {
        stroke: Cesium.Color.PINK,
        strokeWidth: 3
    }));
Cesium.loadJson('nations_test.json').then(function(Data) {
  for( state of Data){
    var blueBox = viewer.entities.add({
      name : 'box',
      position: Cesium.Cartesian3.fromDegrees(state.lon, state.lat, 000000)
    });
    for( i in state['Call Drop Rate']){
      var date = state['Call Drop Rate'][i][0];
      var rate = state['Call Drop Rate'][i][1];
      var subs = state['Subscriber'][i][1];
      // var clock = new Cesium.Clock({
      //      startTime : Cesium.JulianDate.fromIso8601(state['Call Drop Rate'][0][0]),
      //      currentTime : Cesium.JulianDate.fromIso8601(date),
      //      stopTime : Cesium.JulianDate.fromIso8601(state['Call Drop Rate'][state['Call Drop Rate'].length-1][0]),
      //      clockRange : Cesium.ClockRange.CLAMPED,
      // });
      blueBox.box = {
          dimensions : new Cesium.Cartesian3(150000.0, subs/10, rate*100000000),
          material : Cesium.Color.fromRandom({
            alpha: 1.0
          }),
          outline : true,
      }
    }
  }
}).otherwise(function(error) {
    alert("ERROR: ",error);
});

//
// state.lon, state.lat state['Call Drop Rate'][1][1]
// state['Call Drop Rate'][1][0]
// state.lon, state.lat state['Call Drop Rate'][1][1]
