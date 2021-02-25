$(function () {
  $("#level1").click(function () {
    $(this)
      .button("loading")
      .delay(3000)
      .queue(function () {
        $(this).button("reset");
        let level = [1,101,102,0,0,203,0];
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
        skillList.push('hot');
        alert(skillList);
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
