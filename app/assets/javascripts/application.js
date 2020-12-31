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

//slidebar"新着"をクリックで"投稿"用検索ボックスを隠す
$(document).on('turbolinks:load', function() { 
  $(".js-posts-map").on("click", function(event){
    $('#post_pac-input').css('display', 'block');
    $('#pac-input').css('display', 'none');
  })
})
//slidebar"投稿"をクリックで"新着"用検索ボックスを隠す
$(document).on('turbolinks:load', function() { 
  $(".js-home-map").on("click", function(event){
    $('#post_pac-input').css('display', 'none');
    $('#pac-input').css('display', 'block');
  })
})

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
      //poi=観光スポットや施設など」のアイコンのみ再表示
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
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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

      //マーカー表示したい場合コメントアウト外す
      // searched_markers.push(
      //   new google.maps.Marker({
      //     map,
      //     icon,
      //     title: place.name,
      //     position: place.geometry.location,
      //   })
      // );

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

  //投稿用マップを表示
  var post_map = new google.maps.Map(document.getElementById("post_map_canvas"), opts);

  //投稿用マップ検索ボックス
  // Create the search box and link it to the UI element.
  const post_input = document.getElementById("post_pac-input");
  const post_searchBox = new google.maps.places.SearchBox(post_input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(post_input);
  // Bias the SearchBox results towards current map's viewport.
  post_map.addListener("bounds_changed", () => {
    post_searchBox.setBounds(post_map.getBounds());
    console.log("post_input_cahange");
  });

  let post_searched_markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  post_searchBox.addListener("places_changed", () => {
    const post_places = post_searchBox.getPlaces();
    
    if (post_places.length == 0) {
      return;
    }
    // Clear out the old markers.
    post_searched_markers.forEach((post_marker) => {
      post_marker.setMap(null);
    });
    post_searched_markers = [];
    // For each place, get the icon, name and location.
    const post_bounds = new google.maps.LatLngBounds();
    post_places.forEach((post_place) => {
      if (!post_place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const post_icon = {
        url: post_place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      console.log(post_place.geometry.location.lat());
      console.log(post_place.geometry.location.lng());
      console.log(markers[1])

      //マーカー表示したい場合コメントアウト外す
      // post_searched_markers.push(
      //   new google.maps.Marker({
      //     post_map,
      //     post_icon,
      //     title: post_place.name,
      //     position: post_place.geometry.location,
      //   })
      // );

      if (post_place.geometry.viewport) {
        // Only geocodes have viewport.
        post_bounds.union(post_place.geometry.viewport);
      } else {
        if (post_place.geometry.viewport) {
          // Only geocodes have viewport.
          post_bounds.union(post_place.geometry.viewport);
        } else {
          post_bounds.extend(post_place.geometry.location);
        }post_bounds.extend(post_place.geometry.location);
      }
      console.log(post_bounds);
    });
    post_map.fitBounds(post_bounds);
  });


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
function dispInfo(marker,name) {
  google.maps.event.addListener(marker, 'click',
    function(event) {
      console.log(marker.position.lng());
      console.log(marker.position.lat());
          //マーカークリック時にサイドメニューを開く
          $("#slidemenu_contents .slidemenu_contents_detail").hide();
          $('#slidemenu_contents .slidemenu_contents_detail[id = "contents-on-map"]').show();
          $("#slidemenu .active").removeClass("active");
          $('#slidemenu_contents').addClass("active");

      //マーカークリックでコンテンツを表示
      var search_mark = document.getElementById('search_mark')
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "/latlngsearch/" + marker.position.lat() + "/" + marker.position.lng() + ".json", true)
      xhr.send(null);
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
          var post_datas = JSON.parse(xhr.responseText)
          console.log(JSON.parse(xhr.responseText))
          if (post_datas === null){
            search_mark.textContent = '投稿データがないよ'
          }else{
            var post_data = post_datas[0];
            var post_user = post_datas[1];
            var post_favorites_count = post_datas[2];
            var post_comments_count = post_datas[3];
            var post_datatime = post_datas[4];
            //クリックしたマーカー(投稿)のユーザー
            var a_tag = document.createElement('a');
            var img_tag = document.createElement('img')
            if (post_user.avatar.url == null){
              img_tag.src = "/assets/face-f462ad15b7f05b572f6f6e7ff662787e2d3377954ecbfd077ba1260dd180c38d.jpg"
            }else{
              img_tag.src = post_user.avatar.url
            }
            img_tag.width= 35;
            search_mark.appendChild(img_tag);
            var text_user_name = document.createTextNode(post_user.name);
            a_tag.href = '/users/' + post_user.id
            a_tag.appendChild(text_user_name);
            search_mark.appendChild(a_tag);
            //クリックしたマーカー(投稿)の動画･画像
            var post_extension = /(MOV|mp4)$/;
            var post_img_or_video = post_data.road.url
            if (post_extension.test(post_img_or_video)){
              var video_tag = document.createElement('video');
              video_tag.width = 250;
              video_tag.controls =true;
              video_tag.src = post_data.road.url;
              search_mark.appendChild(video_tag);
            }else{
              var img_tag = document.createElement('img');
              img_tag.width = 250;
              img_tag.src = post_data.road.url;
              search_mark.appendChild(img_tag);
            }
            //クリックしたマーカー(投稿)のイイネ
            var div_tag = document.createElement('div')
            div_tag.id = 'favorites_buttons_' + post_data.id
            var a_tag_fav = document.createElement('a');
            a_tag_fav.dataset.remote="true"
            a_tag_fav.rel ='nofollow'
            a_tag_fav.dataset.method="post"
            a_tag_fav.href = 'posts/' + post_data.id + '/favorites'
            var i_tag_fav = document.createElement('i');
            i_tag_fav.classList.add('fa','fa-heart');
            var text_fav = document.createTextNode("いいね" + post_favorites_count);
            div_tag.appendChild(a_tag_fav);
            a_tag_fav.appendChild(i_tag_fav);
            i_tag_fav.appendChild(text_fav);
            search_mark.appendChild(div_tag);
            $('#favorites_buttons_' + post_data.id).html( "<%= j(render partial: 'posts/post_on_map') %>");
            //クリックしたマーカー(投稿)のコメント
            var div_tag_comments = document.createElement('div');
            div_tag_comments.class = 'post_index_comments_count';
            var a_tag_comment = document.createElement('a');
            a_tag_comment.href = 'posts/' + post_data.id;
            var i_tag_comment = document.createElement('i');
            i_tag_comment.classList.add('fas','fa-comment');
            var text_comment = document.createTextNode("コメント" + post_comments_count);
            div_tag.appendChild(a_tag_comment);
            a_tag_comment.appendChild(i_tag_comment);
            i_tag_comment.appendChild(text_comment);
            search_mark.appendChild(div_tag_comments);
            //クリックしたマーカー(投稿)の説明
            var div_tag_body = document.createElement('div');
            var a_tag_body = document.createElement('a');
            a_tag_body.href = '/posts/' + post_data.id;
            var text_body = document.createTextNode('説明: ' + post_data.body);
            a_tag_body.appendChild(text_body);
            div_tag_body.appendChild(a_tag_body);
            search_mark.appendChild(div_tag_body);
            //クリックしたマーカー(投稿)の作成日時
            var div_tag_datetime = document.createElement('div');
            var text_body = document.createTextNode(post_datatime);
            div_tag_datetime.appendChild(text_body);
            search_mark.appendChild(div_tag_datetime);



            console.log(post_data.user_id)
            console.log(post_data)
            console.log(post_user.name)
            console.log(post_user.id)
            // var post_index_user = document.getElementById('post_index_user');
            // var user_name = document.createTextNode(post_data.user);
            // post_index_user.appendChild(user_name);
            // $("#search_mark").append(post_data.body);
            // $("#post_index_user_name").append(post_data[i].user_id.name);
            // $("#search_mark").append(post_data.road.url);
          }
        }
      }

      //吹き出し表示
      // new google.maps.InfoWindow
      // ({content:name}).open(marker.getMap(), marker);
    }
  )
}