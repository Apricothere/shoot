var frontpage = frontpage || {};

frontpage.skillPoint = 10000;
frontpage.learntSkills = [];
frontpage.learntWeapons = [];
frontpage.learntPassives = [201];

frontpage.province1=$("#province1");
frontpage.province2=$("#province2");
frontpage.province3=$("#province3");
frontpage.weapon1=$("#weapon1");
frontpage.weapon2=$("#weapon2");
frontpage.weapon3=$("#weapon3");
frontpage.weapon4=$("#weapon4");

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

frontpage.learnPassive = function (skillId, costPoint) {
  if (
    !frontpage.learntPassives.includes(skillId) &&
    frontpage.skillPoint >= costPoint
  ) {
    if(!frontpage.learntPassives.includes(skillId-1))
    {
      alert("请先解锁之前的武器栏！");
      return;
    }
    frontpage.skillPoint -= costPoint;
    frontpage.learntPassives.push(skillId);
    vueAttach.skillPoint.skillPoint = frontpage.skillPoint;
    let button = document.getElementById("passive" + skillId.toString());
    button.style.backgroundColor = "orange";
    let weapon = document.getElementById('weapon'+(skillId-200).toString());
    console.log(weapon);
    weapon.removeAttribute("disabled");
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

frontpage.weapon1.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='biubiubiu') {skill.passiveList[0]=201;vueAttach.passive.passive1='牧歌灵能机关枪';}
  else if(thisValue=='snowStorm') {skill.passiveList[0]=202;vueAttach.passive.passive1='暴风雪式发射器';}
  else if(thisValue=='clearer') {skill.passiveList[0]=203;vueAttach.passive.passive1='海星科技清除装置';}
  else {skill.passiveList[0]=0;vueAttach.passive.passive1='空';}
})

frontpage.weapon2.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='biubiubiu') {skill.passiveList[1]=201;vueAttach.passive.passive2='牧歌灵能机关枪';}
  else if(thisValue=='snowStorm') {skill.passiveList[1]=202;vueAttach.passive.passive2='暴风雪式发射器';}
  else if(thisValue=='clearer') {skill.passiveList[1]=203;vueAttach.passive.passive2='海星科技清除装置';}
  else {skill.passiveList[1]=0;vueAttach.passive.passive2='空';}
})

frontpage.weapon3.change(function (){
  let thisValue = $(this).val();
  console.log(thisValue);
  if(thisValue=='biubiubiu') {skill.passiveList[2]=201;vueAttach.passive.passive3='牧歌灵能机关枪';}
  else if(thisValue=='snowStorm') {skill.passiveList[2]=202;vueAttach.passive.passive3='暴风雪式发射器';}
  else if(thisValue=='clearer') {skill.passiveList[2]=203;vueAttach.passive.passive3='海星科技清除装置';}
  else {skill.passiveList[2]=0;vueAttach.passive.passive3='空';}
})

frontpage.weapon4.change(function (){
  let thisValue = $(this).val();
  if(thisValue=='biubiubiu') {skill.passiveList[3]=201;vueAttach.passive.passive4='牧歌灵能机关枪';}
  else if(thisValue=='snowStorm') {skill.passiveList[3]=202;vueAttach.passive.passive4='暴风雪式发射器';}
  else if(thisValue=='clearer') {skill.passiveList[3]=203;vueAttach.passive.passive4='海星科技清除装置';}
  else {skill.passiveList[3]=0;vueAttach.passive.passive4='空';}
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
        control.gameStart(2);
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
$(function () {
  $("#skill108").click(function () {
    frontpage.learnSkill(108, 100);
  });
});
$(function () {
  $("#passive202").click(function () {
    frontpage.learnPassive(202, 100);
  });
});
$(function () {
  $("#passive203").click(function () {
    frontpage.learnPassive(203, 100);
  });
});
$(function () {
  $("#passive204").click(function () {
    frontpage.learnPassive(204, 100);
  });
});

$(function () { $("[data-toggle='popover']").popover(); });

$(function () {
  $("#level1Img").click(function () {
    $("#level1Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level1Title")[0].innerText="1-惊变";
        $(this).button("reset");
        control.gameStart(1);
      });
  });
});

$(function () {
  $("#level2Img").click(function () {
    $("#level2Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level2Title")[0].innerText="2-噩梦";
        $(this).button("reset");
        control.gameStart(2);
      });
  });
});

$(function () {
  $("#level3Img").click(function () {
    $("#level3Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level3Title")[0].innerText="3-朋友";
        $(this).button("reset");
        control.gameStart(3);
      });
  });
});

$(function () {
  $("#level4Img").click(function () {
    $("#level4Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level4Title")[0].innerText="4-回报";
        $(this).button("reset");
        control.gameStart(4);
      });
  });
});

$(function () {
  $("#level5Img").click(function () {
    $("#level5Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level4Title")[0].innerText="5-梦醒";
        $(this).button("reset");
        control.gameStart(5);
      });
  });
});

$(function () {
  $("#level6Img").click(function () {
    $("#level6Title")[0].innerText="loading...";
    $(this)
      .delay(3000)
      .queue(function () {
        $("#level6Title")[0].innerText="6-赎罪";
        $(this).button("reset");
        control.gameStart(6);
      });
  });
});