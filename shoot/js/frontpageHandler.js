var frontpage = frontpage || {};

frontpage.skillPoint = 10000;
frontpage.learntSkills = [];
frontpage.learntWeapons = [];
frontpage.learntPassives = [];

frontpage.province1=$("#province1");
frontpage.province2=$("#province2");
frontpage.province3=$("#province3");

frontpage.learnSkill = function (skillId, costPoint) {
  if (
    !frontpage.learntSkills.includes(skillId) &&
    frontpage.skillPoint >= costPoint
  ) {
    frontpage.skillPoint -= costPoint;
    frontpage.learntSkills.push(skillId);
    vueAttach.skillPoint.skillPoint = frontpage.skillPoint;
    let button = document.getElementById("skill" + skillId.toString());
    button.style.backgroundColor = "orange";
    let province = document.getElementsByClassName('province');

    frontpage.f(frontpage.province1[0], button.innerText);
    frontpage.f(frontpage.province2[0], button.innerText);
    frontpage.f(frontpage.province3[0], button.innerText);


  }
};

frontpage.f = function (provinceObj,provinceName) {
  let optionObj = document.createElement("option");
  optionObj.innerHTML = provinceName; 
  optionObj.value = provinceName;
  optionObj.id=provinceName;
  provinceObj.appendChild(optionObj);
};

frontpage.province1.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='静谧') skill.installSkillList(101, 0);
  else if(thisValue=='高热') skill.installSkillList(102, 0);
  else if(thisValue=='齐射') skill.installSkillList(103, 0);
  else if(thisValue=='伏波') skill.installSkillList(104, 0);
  else if(thisValue=='穿杨') skill.installSkillList(105, 0);
  else if(thisValue=='铁壁') skill.installSkillList(106, 0);
  else if(thisValue=='破灭') skill.installSkillList(107, 0);
  else if(thisValue=='圣光') skill.installSkillList(108, 0);
})

frontpage.province2.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='静谧') skill.installSkillList(101, 1);
  else if(thisValue=='高热') skill.installSkillList(102, 1);
  else if(thisValue=='齐射') skill.installSkillList(103, 1);
  else if(thisValue=='伏波') skill.installSkillList(104, 1);
  else if(thisValue=='穿杨') skill.installSkillList(105, 1);
  else if(thisValue=='铁壁') skill.installSkillList(106, 1);
  else if(thisValue=='破灭') skill.installSkillList(107, 1);
  else if(thisValue=='圣光') skill.installSkillList(108, 1);
})

frontpage.province3.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='静谧') skill.installSkillList(101, 2);
  else if(thisValue=='高热') skill.installSkillList(102, 2);
  else if(thisValue=='齐射') skill.installSkillList(103, 2);
  else if(thisValue=='伏波') skill.installSkillList(104, 2);
  else if(thisValue=='穿杨') skill.installSkillList(105, 2);
  else if(thisValue=='铁壁') skill.installSkillList(106, 2);
  else if(thisValue=='破灭') skill.installSkillList(107, 2);
  else if(thisValue=='圣光') skill.installSkillList(108, 2);
})


$(function () {
  $("#skillTree").click(function () {
    $("#skillTreeModal").modal("toggle");
  });
});
$(function () {
  $("#skillAllo").click(function () {
    $("#skillAlloModal").modal("toggle");
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

$(function () {
  $("#level1").click(function () {
    $(this)
      .button("loading")
      .delay(3000)
      .queue(function () {
        $(this).button("reset");
        control.gameStart(1);
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
        control.gameStart(1);
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
        control.gameStart(3);
      });
  });
});

$(function () {
  $("#skill101").click(function () {
    frontpage.learnSkill(101, 100);
  });
});

$(function () {
  $("#skill102").click(function () {
    frontpage.learnSkill(102, 100);
  });
});

$(function () {
  $("#skill103").click(function () {
    frontpage.learnSkill(103, 100);
  });
});
$(function () {
  $("#skill104").click(function () {
    frontpage.learnSkill(104, 100);
  });
});
$(function () {
  $("#skill105").click(function () {
    frontpage.learnSkill(105, 100);
  });
});
$(function () {
  $("#skill106").click(function () {
    frontpage.learnSkill(106, 100);
  });
});
$(function () {
  $("#skill107").click(function () {
    frontpage.learnSkill(107, 100);
  });
});
$(function () {
  $("#skill108").click(function () {
    frontpage.learnSkill(108, 100);
  });
});
