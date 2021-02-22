$(function () {
  $("#startGame").click(function () {
    $(this).button('loading').delay(3000).queue(function() {
        $(this).button('reset');
    window.location.href="index.html"
    }); 
  });
});
$(function () {
  $("#gameIntro").click(function () {
    $("#gameIntroModal").modal("toggle");
  });
});
$(function () {
  $("#about").click(function () {
    $("#aboutModal").modal("toggle");
  });
});
