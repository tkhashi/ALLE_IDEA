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
var title = "javascriptが使えました";
alert(title);


// $(document).ready(function () {
//   $('body').html('<h1>Hello jQuery!!</h1>');
// });

$("#slidemenu_contents[id != "contents-on-map"]").hide();

$("#slidemenu a").on("click", function(event){
  $("#slidemenu_contents").hide();
  $("#slidemenu_contents .active").removeClass("active");
  $(this).addClass("active");
  $($(this).attr("href")).show();
  event.preventDefault();
});