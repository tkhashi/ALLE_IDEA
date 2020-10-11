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
$(document).on('turbolinks:load', function() { 
  $('#slidemenu_contents .slidemenu_contents_detail[id != "home"]').hide();
  $("#slidemenu a").on("click", function(event){
    $("#slidemenu_contents .slidemenu_contents_detail").hide();
    $("#slidemenu .active").removeClass("active");
    $(this).addClass("active");

    $($(this).attr("href")).show();
    event.preventDefault();
  });
});

//navmenu用
$(document).on('turbolinks:load', function() { 
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

// var map = null;
// var infowindow = new google.maps.InfoWindow();


// 閲覧用マップ
function initialize() {
  //緯度と経度の配列
  var myLatlng = new google.maps.LatLng(data.slice(-1)[0].lat, data.slice(-1)[0].lng);
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

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

  let searched_markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    console.log(places);
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    searched_markers.forEach((marker) => {
      marker.setMap(null);
    });
    searched_markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      searched_markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }bounds.extend(place.geometry.location);
      }
      console.log(bounds);
    });
    map.fitBounds(bounds);
  });


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
    var latlng = new google.maps.LatLng(35.691574, 139.704647);
    var opts = {
      zoom: 13,
      center: latlng,
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

    // getElementById("map")の"map"は、body内の<div id="map">より
    var post_map = new google.maps.Map(document.getElementById("post_map_canvas"), opts);

    //地図クリックイベントの登録
    google.maps.event.addListener(post_map, 'click', mylistener);
  //投稿フォームにクリック位置の座標を入れる
  function mylistener(event) {
    document.getElementById("post_maps_attributes_0_latitude").value= event.latLng.lat();
    document.getElementById("post_maps_attributes_0_longitude").value= event.latLng.lng();
    console.log("post_maps_attributes_0_longitude")
    document.getElementById("show_lat").innerHTML = event.latLng.lat();
    document.getElementById("show_lng").innerHTML = event.latLng.lng();
  };

};


//マーカークリック時の関数達
//これだけで吹き出し表示できる。。。
function dispInfo(marker,name) {
  google.maps.event.addListener(marker, 'click',
    function(event) {
      console.log(marker.position.lng());
      console.log(marker.position.lat());

      //マーカークリックでコンテンツを表示
      var xhr = new XMLHttpRequest();
      var search_mark = document.getElementById('search_mark')
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText)
          var post_datas = JSON.parse(xhr.responseText)
          if (post_datas === null){
            search_mark.textContent = '投稿データがないよ'
          }else{
            for (i = 0; i < post_datas.length; i++) {
              var post_data = post_datas[i];
                console.log(post_datas[i])
              //クリックしたマーカーの動画･画像
              var video_tag = document.createElement('video')
              video_tag.width = 250;
              video_tag.controls =true;
              video_tag.src = post_data.road.url;
              search_mark.appendChild(video_tag);

              // var post_index_user = document.getElementById('post_index_user');
              // var user_name = document.createTextNode(post_data.user);
              // post_index_user.appendChild(user_name);
              // $("#search_mark").append(post_data.body);
              $("#post_index_user_name").append(user.post_data);

              // $("#search_mark").append(post_data.road.url);
            }
          }
        }
      }
      xhr.open('GET', "/latlngsearch/" + marker.position.lat() + "/" + marker.position.lng() + ".json", true)
      xhr.send(null);


      new google.maps.InfoWindow
      ({content:name}).open(marker.getMap(), marker);
    }
  )
}