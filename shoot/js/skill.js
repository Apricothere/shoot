var skill = skill || {};
skill.skillList=[];
skill.passiveList=[];
skill.skillIdList=[];
skill.skill = function (id,name, part, coolDown, maintain, cost) {
  this.id=id;
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
  this.index = 0;
};

skill.skill.prototype.go = function (count) {
  this.enterTime = count;
  this.on = true;
  this.ready = false;
  skill.changeSkillSet(this.index,'发动中...');
  if (this.name == "静谧") {
    for (let i = 1; i < trytouch.ballArr.length; i++) {
      trytouch.ballArr[i].stateList.push("shizuka");
      trytouch.ballArr[i].xspeed *= 0.1;
      trytouch.ballArr[i].yspeed *= 0.1;
      trytouch.ballArr[i].angleSpeed *= 0.1;
    }
  }
};

skill.skill.prototype.left = function (count) {
  this.on = false;
  this.coolDown = this.maxCoolDown;
  this.maintain = this.maxMaintain;
  if (this.name == "静谧") {
    for (let i = 1; i < trytouch.ballArr.length; i++) {
      trytouch.ballArr[i].xspeed *= 2;
      trytouch.ballArr[i].yspeed *= 2;
      trytouch.ballArr[i].angleSpeed *= 2;
    }
  }
};

skill.skill.prototype.coolDownUpdate = function () {
  if (this.coolDown > 0) {
    this.coolDown -= 1;
    skill.changeSkillSet(this.index,this.coolDown);
  } else {
    this.ready = true;
    skill.changeSkillSet(this.index,this.name);
  }
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
    } else return;
    if (currentSkill.ready) currentSkill.go();
  };
};

skill.changeSkillSet = function (index, value) {
  if(index == 0){
    vueAttach.skill.skill1=value;
  }
  else if(index==1){
    vueAttach.skill.skill2=value;
  }
  else if(index==2){
    vueAttach.skill.skill3=value;
  }
};


skill.passive= function (id,name, part, coolDown, maintain, cost, type) {
  skill.skill.call(id,name, part, coolDown, maintain, cost)
  this.type=type;
};
skill.passive.prototype = Object.create(skill.skill.prototype)//核心代码
skill.passive.prototype.constructor = skill.passive//核心代码

skill.passive.prototype.update=function(){
  console.log("hhh");
}

skill.empty = new skill.skill(100,"空", "self", 0, 0, 0);
skill.shizuka = new skill.skill(101,"静谧", "self", 1000, 2000, 0);
skill.hot =  new skill.skill(102,"高热","self",1000,1000,0);
skill.shooot=new skill.skill(103,"齐射","self",1000,1000,0);
skill.clearWave=new skill.skill(104,"伏波","self",1000,1000,0);
skill.aim=new skill.skill(105,"穿杨","self",1000,1000,0);
skill.defend=new skill.skill(106,"铁壁","self",1000,1000,0);
skill.boom=new skill.skill(107,"破灭","self",1000,1000,0);
skill.heal=new skill.skill(108,"圣光","self",1000,1000,0);

skill.passivePrincess=new skill.passive(203,"扇形弹幕","self",0,1000,0,'bullet');

skill.skillMap=new Map();
skill.skillMap.set(101,skill.shizuka);
skill.skillMap.set(102,skill.hot);
skill.skillMap.set(103,skill.shooot);
skill.skillMap.set(104,skill.clearWave);
skill.skillMap.set(105,skill.aim);
skill.skillMap.set(106,skill.defend);
skill.skillMap.set(107,skill.boom);
skill.skillMap.set(108,skill.heal);
skill.skillMap.set(203,skill.passivePrincess);

for(let i=0;i<3;i++){
  skill.skillList.push(skill.empty);
}

skill.installSkillList=function(skillId,index){
    tmpSkill = skill.skillMap.get(skillId);
    for(let i=0;i<3;i++){
      if(skill.skillList[i].name==tmpSkill.name) return;
    }
    tmpSkill.index=index;
    skill.skillList[index]=tmpSkill;
}
