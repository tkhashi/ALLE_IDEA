// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .


// var elements = document.getElementsByClassName("slidemenu_contents")
//   elements.onclick = function(event){
//   this.classList.toggle("is_active")
// }

// var title = "javascriptが使えました";
// alert(title);


// $(document).ready(function () {
//   $('body').html('<h1>Hello jQuery!!</h1>');
// });


  // =========================
 $(document).ready(function () {
  // =========================
  // $("#slidemenu").on("click", function(event){
  //   console.log(1)

  // =========================
  //slidemenu用
  $('#slidemenu_contents .slidemenu_content[id != "contents-on-map"]').hide();

  $("#slidemenu a").on("click", function(event){
    $("#slidemenu_contents").hide();
    $("#slidemenu_contents .active").removeClass("active");
    $(this).addClass("active");
    $($(this).attr("href")).show();
    event.preventDefault();

  // $("#slidemenu").on("click", function(event){
  //   $("#slidemenu_contents").hide();
  //   $("#slidemenu_contents .active").removeClass("active");
  //   $(this).addClass("active");
  //   $($(this).attr("href")).show();
  //   event.preventDefault();
  });
});
  // =========================


//
// $("#slidemenu").on("click", function(event){
//   console.log(1)
//   $("#slidemenu_contents").hide();
//   $("#slidemenu_contents .active").removeClass("active");
//   $(this).addClass("active");
//   $($(this).attr("href")).show();
//   event.preventDefault();
// });

// 閲覧用マップ
function initialize() {
  var latlng = new google.maps.LatLng(35.658704,139.745408);
  var opts = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map
    (document.getElementById("map_canvas"), opts);

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
}

//投稿用マップ
// 初期化。bodyのonloadでinit()を指定することで呼び出してます
function init() {

  // google mapで利用する初期設定用の変数
  var latlng = new google.maps.LatLng(39, 138);
  var opts = {
    zoom: 6,
    maptypeid: google.maps.maptypeid.ROADMAP,
    center: latlng
  };

  // getelementbyid("map")の"map"は、body内の<div id="map">より
  var map = new google.maps.map(document.getelementbyid("map"), opts);
  //地図クリックイベントの登録
  google.maps.event.addlistener(map, 'click', mylistener);
};

function mylistener(event) {
  document.getelementbyid("post_lat").value= event.latlng.lat();
  document.getelementbyid("post_lng").value= event.latlng.lng();
};

// //投稿用マップ2
// function init() {
//   var Marker;
//   var map;
//   var latlng = new google.maps.LatLng(35.658704,139.745408);
//   var opts = {
//    zoom: 15,
//    center: latlng,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//   }
 
//   map = new google.maps.Map
//   (document.getElementById("map"),opts);
 
//  //地図クリックイベントの登録
//   google.maps.event.addListener(map, 'click',
//   function(event) {
//    if (Marker){Marker.setMap(null)};
//    Marker = new google.maps.Marker({
//     position: event.latLng,
//     draggable: true,
//     map: map
//    });
//    infotable(Marker.getPosition().lat(),
//    Marker.getPosition().lng(),map.getZoom());
//    geocode();
//    //マーカードラッグイベントの登録
//    google.maps.event.addListener(Marker,'dragend',
//     function(event) {
//     infotable(Marker.getPosition().lat(),
//     Marker.getPosition().lng(),map.getZoom());
//     geocode();
//    })
//    //地図ズームチェンジイベントの登録
//    google.maps.event.addListener(map, 'zoom_changed',
//     function(event) {
//     infotable(Marker.getPosition().lat(),
//     Marker.getPosition().lng(),map.getZoom());
//    })
//   })
//  //ジオコーディング
//   function geocode(){  var geocoder = new google.maps.Geocoder();
//    geocoder.geocode({ 'location': Marker.getPosition()}, 
//       function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK && results[0]){
//       document.getElementById('id_address').innerHTML = 
//           results[0].formatted_address.replace(/^日本, /, '');
//     }else{
//       document.getElementById('id_address').innerHTML = 
//         "Geocode 取得に失敗しました";
//      alert("Geocode 取得に失敗しました reason: "
//             + status);
//     }
//    });
//   }
 
//  //HTMLtagを更新
//   function infotable(ido,keido,level){
//   //  document.getElementById('id_ido').innerHTML = ido;
//   //  document.getElementById('id_keido').innerHTML = keido;
//   //  document.getElementById('id_level').innerHTML = level;
//     document.getelementbyid("post_lat").value= event.latlng.lat();
//     document.getelementbyid("post_lng").value= event.latlng.lng();
//   }
//  }
 