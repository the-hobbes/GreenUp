
var map, pointarray, heatmap, pickupMarker, markerFlag;
var markerType = -1;
var markerEvent;
var HELP_TRASH = 1;
var TRASH_DROP = 2;
var COMMENT_LOC = 3;
var MOUSEDOWN_TIME;
var MOUSEUP_TIME;

            var heatmapData = [
                {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5}, 
                {location: new google.maps.LatLng(37.782, -122.445), weight: 1},
                {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
                {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
                {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
                {location: new google.maps.LatLng(37.782, -122.437), weight: 1},
                {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},
                {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
                {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
                {location: new google.maps.LatLng(37.785, -122.443), weight: 1},
                {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
                {location: new google.maps.LatLng(37.785, -122.439), weight: 1},
                {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
                {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
            ];
            
function initialize() {
    var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(37.774546, -122.433523),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  var pointArray = new google.maps.MVCArray(heatmapData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    dissipating: true, 
    radius: 5
  });

  heatmap.setMap(map);
  
  google.maps.event.addListener(map, 'mousedown', markerSelectDown);
  google.maps.event.addListener(map, 'mouseup', markerSelectUp);
} // end initialize

function initIcons(){
var pickupIcon = "img/icons/greenCircle.png";
  pickupMarker = new google.maps.Marker({
      position: new google.maps.LatLng(37.785, -122.435),
      map: map,
      icon: pickupIcon
  });
  markerFlag = true;
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function toggleIcons(){
    if(markerFlag){
        pickupMarker.setVisible(false);
        markerFlag = false;
    }else{
        pickupMarker.setVisible(true);
        markerFlag = true;
    };
}

// add an icon for a pickup
function addPickupMarker(){
    var marker = new google.maps.Marker({
        position: markerEvent.latLng,
        map: map,
        icon: "img/icons/greenCircle.png"
    });
}

// add an icon for a Comment location
function addCommentMarker(){
    var marker = new google.maps.Marker({
        position: markerEvent.latLng,
        map: map,
        icon: "img/icons/blueCircle.png"
    });

    // var marker = new MarkerWithLabel({
    //    position: markerEvent.latLng,
    //    draggable: true,
    //    raiseOnDrag: true,
    //    map: map,
    //    labelContent: "$425K",
    //    labelAnchor: new google.maps.Point(22, 0),
    //    labelClass: "labels", // the CSS class for the label
    //    labelStyle: {opacity: 0.75}
    //  });
}

// add an icon to indicate where trash was found
function addTrashMarker(){
    var marker = new google.maps.Marker({
        position: markerEvent.latLng,
        map: map,
        icon: "img/icons/redCircle.png"
    });
}

function markerSelectUp(event){
    markerEvent = event;
    MOUSEUP_TIME = new Date().getTime() / 1000;
    if((MOUSEUP_TIME - MOUSEDOWN_TIME) < 0.3){
        // alert((MOUSEUP_TIME - MOUSEDOWN_TIME));
        $('#markerTypeDialog').toggle();
        MOUSEDOWN_TIME =0;
        MOUSEDOWN_TIME =0;
    }else{
        MOUSEDOWN_TIME =0;
        MOUSEDOWN_TIME =0;
    }
}

function markerSelectDown(event){
    markerEvent = event;
    MOUSEDOWN_TIME = new Date().getTime() / 1000;
    // if((MOUSEUP_TIME - MOUSEDOWN_TIME) < 2){
    //     $('#markerTypeDialog').toggle();
    //     MOUSEDOWN_TIME =0;
    //     MOUSEDOWN_TIME =0;
    // }else{
    //     MOUSEDOWN_TIME =0;
    //     MOUSEDOWN_TIME =0;
    // }
}


function changeRadius() {
  heatmap.setOptions({radius: heatmap.get('radius') ? null : 20});
}

function changeOpacity() {
  heatmap.setOptions({opacity: heatmap.get('opacity') ? null : 0.2});
}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', initIcons);

$(document).ready(function(){
    // loadScript();
    $('#toggleHeat').click(function(){
        toggleHeatmap();
    });
    $('#toggleIcons').click(function(){
        toggleIcons();
    });

    $('#selectPickup').click(function(){
        $('#markerTypeDialog').toggle();
        addPickupMarker();
        // alert("hello");
    });

    $('#selectComment').click(function(){
        $('#markerTypeDialog').toggle();
        addCommentMarker();
        // alert("hello");
    });

    $('#selectTrash').click(function(){
        $('#markerTypeDialog').toggle();
        addTrashMarker();
        // alert("hello");
    });


    $('#pr1').click(function(){
        $('#container').removeClass("panel1Center");
        $('#container').removeClass("panel3Center");
        $('#container').addClass("panel2Center");
    });
    $('#prr1').click(function(){
        $('#container').removeClass("panel1Center");
        $('#container').removeClass("panel2Center");
        $('#container').addClass("panel3Center");
    });

    $('#pr2').click(function(){
        $('#container').removeClass("panel1Center");
        $('#container').removeClass("panel2Center");
        $('#container').addClass("panel3Center");
    });

    $('#pl2').click(function(){
        $('#container').removeClass("panel3Center");
        $('#container').removeClass("panel2Center");
        $('#container').addClass("panel1Center");
    });

    $('#pl3').click(function(){
        $('#container').removeClass("panel3Center");
        $('#container').removeClass("panel1Center");
        $('#container').addClass("panel2Center");
    });

    $('#pll3').click(function(){
        $('#container').removeClass("panel3Center");
        $('#container').removeClass("panel2Center");
        $('#container').addClass("panel1Center");
    });



    // $('#map-canvas').mousedown(function(){
    //     MOUSEDOWN_TIME = new Date().getTime() / 1000;
    // });
    // $('#map-canvas').mouseup(function(){
    //     MOUSEUP_TIME = new Date().getTime() / 1000;
    // });
});