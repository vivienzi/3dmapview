var viewer = new Cesium.Viewer('cesiumContainer');

//state.lon, state.lat state['Call Drop Rate'][1][1]

Cesium.loadJson('nations_test.json').then(function(Data) {
    for( state of Data){
      var blueBox = viewer.entities.add({
      name : 'box',
      position: Cesium.Cartesian3.fromDegrees(state.lon, state.lat, 000000),
      box : {
        dimensions : new Cesium.Cartesian3(200000.0, 150000.0, state['Call Drop Rate'][0][1]*100000000),
        material : Cesium.Color.BLUE.withAlpha(0.5),
        outline : true,
        }
      });
    }
}).otherwise(function(error) {
    alert("ERROR: ",error);
});
//
// var pinBuilder = new Cesium.PinBuilder();
//
// var bluePin = viewer.entities.add({
//     name : 'Blank blue pin',
//     position : Cesium.Cartesian3.fromDegrees(-75.170726, 39.9208667),
//     billboard : {
//         image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
//         verticalOrigin : Cesium.VerticalOrigin.BOTTOM
//     }
// });


// $(document).ready(function(){
//   $.getJSON("nations_test.json", function(data){
//     $.each(data.name, function(i,s){
//         console.log(s);
//     });
//   });
// });

    // .error(function(jqXhr, textStatus, error) {
    //             alert("ERROR: " + textStatus + ", " + error);
