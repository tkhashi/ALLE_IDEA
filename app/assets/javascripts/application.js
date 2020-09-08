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

//app.html用マップ
// function initialize() {
//   var latlng = new google.maps.LatLng(35.658704,139.745408);
//   var opts = {
//     zoom: 15,
//     center: latlng,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   var map = new google.maps.Map
//     (document.getElementById("map_canvas"), opts);

//   var drawingManager = new google.maps.drawing.DrawingManager({
//     drawingMode: google.maps.drawing.OverlayType.MARKER,
//     drawingControl: true,
//     drawingControlOptions: {
//       position: google.maps.ControlPosition.TOP_CENTER,
//       drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
//     },
//     markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
//     circleOptions: {
//       fillColor: '#ffff00',
//       fillOpacity: 1,
//       strokeWeight: 5,
//       clickable: false,
//       editable: true,
//       zIndex: 1
//     }
//   });
//   drawingManager.setMap(map);

// }

// <---stop--->
//投稿用マップ
// var map;

// 初期化。bodyのonloadでinit()を指定することで呼び出してます
function init() {

  // Google Mapで利用する初期設定用の変数
  var latlng = new google.maps.LatLng(39, 138);
  var opts = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng
  };

  // getElementById("map")の"map"は、body内の<div id="map">より
  var map = new google.maps.Map(document.getElementById("map"), opts);
  //地図クリックイベントの登録
  google.maps.event.addListener(map, 'click', mylistener);
};

function mylistener(event) {
  document.getElementById("post_lat").value= event.latLng.lat();
  document.getElementById("post_lng").value= event.latLng.lng();
};
