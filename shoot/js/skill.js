var skill = skill || {};
skill.skillList = [];
skill.skill = function (name, part, coolDown, maintain, cost) {
  this.name = name;
  this.part = part;
  this.coolDown = coolDown;
  this.maxCoolDown = coolDown;
  this.maintain = maintain;
  this.maxMaintain = maintain;
  this.cost = cost;
  this.enterTime = 0;
  this.ready = false;
  this.on = false;
};

skill.skill.prototype.go = function (count) {
  this.enterTime = count;
  this.on = true;
  this.ready = false;
  if(this.name=='shizuka'){
      alert('szk');
      for (let i=1;i<trytouch.ballArr.length;i++){
          trytouch.ballArr[i].xspeed*=0.1;
          trytouch.ballArr[i].yspeed*=0.1;
          trytouch.ballArr[i].angleSpeed*=0.1;
      }
  }
};

skill.skill.prototype.left = function (count) {
  this.on = false;
  this.coolDown = this.maxCoolDown;
  this.maintain = this.maxMaintain;
  if(this.name=='shizuka'){
    alert('szkleft');
    for (let i=1;i<trytouch.ballArr.length;i++){
        trytouch.ballArr[i].xspeed*=2;
        trytouch.ballArr[i].yspeed*=2;
        trytouch.ballArr[i].angleSpeed*=2;
    }
}
};

skill.skill.prototype.coolDownUpdate = function () {
  if (this.coolDown > 0) this.coolDown -= 1;
  else this.ready = true;
};

skill.skill.prototype.maintainUpdate = function () {
  if (this.maintain > 0) this.maintain -= 1;
  else this.left();
};

skill.skill.prototype.update = function () {
  if (this.on) this.maintainUpdate();
  else this.coolDownUpdate();
};

skill.keySkill = function (count) {
  document.onkeydown = function (e) {
    let currentSkill;
    if (e.key == "z" && skill.skillList.length >= 1) {
      currentSkill = skill.skillList[0];
    } else if (e.key == "x" && skill.skillList.length >= 2) {
      currentSkill = skill.skillList[1];
    } else if (e.key == "c" && skill.skillList.length >= 3) {
      currentSkill = skill.skillList[2];
    }
    else return;
    if(currentSkill.ready) currentSkill.go();
  };
};
skill.shizuka = new skill.skill("shizuka", "self", 1000, 2000, 0);
skill.skillList.push(skill.shizuka);
