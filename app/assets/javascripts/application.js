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


// var title = "javascriptが使えました";
// alert(title);


// $(document).ready(function () {
//   $('body').html('<h1>Hello jQuery!!</h1>');
// });


//slidemenu用
$(document).ready(function () {
  $('#slidemenu_contents .slidemenu_contents_detail[id != "home"]').hide();

  $("#slidemenu a").on("click", function(event){
    $("#slidemenu_contents .slidemenu_contents_detail").hide();
    $("#slidemenu .active").removeClass("active");
    $(this).addClass("active");
    console.log(this)

    $($(this).attr("href")).show();
    event.preventDefault();
  });
});

//navmenu用
$(document).ready(function () {
  $('#navmenu_contents .navmenu_contents_detail[id != "profile"]').hide();

  $("#navmenu a").on("click", function(event){
    $("#navmenu_contents .navmenu_contents_detail").hide();
    $("#navmenu .active").removeClass("active");
    $(this).addClass("active");
    console.log(this)

    $($(this).attr("href")).show();
    event.preventDefault();
  });
});

// 閲覧用マップ
function initialize() {
  //緯度と経度の配列
  var myLatlng = new google.maps.LatLng(data[0].lat, data[0].lng);
    var opts = {
    zoom: 15,
    center: myLatlng,
    styles: [
      //全てのラベルを非表示
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [
          {visibility: 'off'},
        ],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [
          {visibility: 'on'},
        ],
      },
      //「poi=観光スポットや施設など」のアイコンのみ再表示
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [
          {visibility: 'inherit'},
        ],
      },
      //地図全体の色味をカスタマイズ
      //基本色を赤に統一 + 彩度を落とす
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [
          {hue: '#5f0285'},
          {saturation : -50},
        ],
      }
    ]
  };
  //マップを表示
  var map = new google.maps.Map
    (document.getElementById("map_canvas"),opts);
  //マーカの作成
  var markers = new Array();
    for (i = 0; i < data.length; i++) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].lat, data[i].lng),
      map: map
    });
    dispInfo(markers[i],data[i].name);
    }

  //投稿用マップ
    // google mapで利用する初期設定用の変数
    var latlng = new google.maps.LatLng(39, 138);
    var opts = {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: latlng
    };

    // getElementById("map")の"map"は、body内の<div id="map">より
    var map = new google.maps.Map(document.getElementById("post_map_canvas"), opts);





//     // クリックでマーカーを設置する
// google.maps.event.addListener(map, "click", function(event) {
//   placeMarker(event.latLng);
//   });
//   // 地図を移動させて、常に中心点にマーカーを設置する
//   google.maps.event.addListener(map, "idle", function(){
//   placeMarker(map.getCenter());
//   });
//   // マーカーを設置する
//   function placeMarker(location) {
//   clearOverlays();
//   var marker = new google.maps.Marker({
//   position: location,
//   map: map
//   });
//   // 設置したマーカーを配列に追加する
//   markersArray.push(marker);
//   }
//   // 設置したマーカーをすべて削除する。
//   function clearOverlays() {
//   for (var i = 0; i &amp;lt; markersArray.length; i++ ) {
//   markersArray[i].setMap(null);
//   }
//   }




    //地図クリックイベントの登録
    google.maps.event.addListener(map, 'click', mylistener);
  //投稿フォームにクリック位置の座標を入れる
  function mylistener(event) {
    document.getElementById("post_maps_attributes_0_latitude").value= event.latLng.lat();
    document.getElementById("post_maps_attributes_0_longitude").value= event.latLng.lng();
  };

}




    function dispInfo(marker,name) {
    google.maps.event.addListener(marker, 'click',
    function(event) {
    new google.maps.InfoWindow
    ({content:name}).open(marker.getMap(), marker);
    })
    }
    

  //閲覧用2
  // function initialize() {
  //   //マーカーの情報
  //   //   var latlngarr = gon.latlngarr;
      
  //   // //初期位置https://gimmicklog.com/javascript/392/に、上記配列の一番初めの緯度経度を格納
  //   //   var latlng = new google.maps.LatLng(latlngarr[0].lat, latlngarr[0].lng);
      
  //     var opts = {
  //       zoom: 15,//地図の縮尺
  //       center: latlng, //初期位置の変数
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //       };
      
  //   //地図を表示させるエリアのidを指定
  //     var map = new google.maps.Map(document.getElementById(" map_canvas"), opts);
      
  //   //マーカーを配置するループ
  //     // for (i = 0; i < data.length; i++) {
  //     //   var markers = new google.maps.Marker({
  //     //     position: new google.maps.LatLng(latlngarr[i].lat, latlngarr[i].lng),
  //     //     map: map
  //     //   });
  //     //   //クリックしたら指定したurlに遷移するイベント
  //     //   google.maps.event.addListener(markers, 'click', (function(url){
  //     //     return function(){ location.href = url; };
  //     //   })(latlngarr[i].url));
  //     // }
  //   }
    



//投稿用マップ
function init() {
  //マップ初期設定
  var latlng = new google.maps.LatLng(39, 138);
  var opts = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng
  };
  // getElementById("map")の"map"は、body内の<div id="map">より
  var map = new google.maps.Map(document.getElementById("post_map_canvas"), opts);
  //地図クリックイベントの登録
  google.maps.event.addListener(map, 'click', mylistener);
};
//投稿フォームにクリック位置の座標を入れる
function mylistener(event) {
  document.getElementById("post_maps_attributes_0_latitude").value= event.latLng.lat();
  document.getElementById("post_maps_attributes_0_longitude").value= event.latLng.lng();
};