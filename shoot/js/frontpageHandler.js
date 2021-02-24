$(function () {
  $("#level1").click(function () {
    $(this)
      .button("loading")
      .delay(3000)
      .queue(function () {
        $(this).button("reset");
        let level = 1;
        window.location.href = "index.html?level=" + level;
      });
  });
});
$(function () {
  $("#level2").click(function () {
    $(this)
      .button("loading")
      .delay(3000)
      .queue(function () {
        $(this).button("reset");
        let level = 2;
        window.location.href = "index.html?level=" + level;
      });
  });
});
$(function () {
  $("#level3").click(function () {
    $(this)
      .button("loading")
      .delay(3000)
      .queue(function () {
        $(this).button("reset");
        let level = 3;
        window.location.href = "index.html?level=" + level;
      });
  });
});
