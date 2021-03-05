var plane = plane || {};
plane.randomColor = "#" + parseInt(Math.random() * 0xffffff).toString(16);
plane.enemyArr = [];

plane.enemyPlane = function (type, life, x, y, r, xspeed, yspeed) {
  this.type = type;
  this.life = life;
  this.maxlife = life;
  this.x = x; //||control.r(trycvs.canvas.width);
  this.y = y; //||control.r(trycvs.canvas.height);
  this.r = r; //||control.r(10)+5;
  this.xspeed = xspeed; //||control.r(5)+1.5;
  this.yspeed = yspeed; //||control.r(5)+1.5;
  if (this.type == "self") this.color = "red";
  //else this.color = "#" + parseInt(Math.random() * 0xffffff).toString(16);
  else this.color = "rgba(255,255,255,0)";
  this.protecting = false;
  this.img = document.getElementById(this.type);
};

plane.enemyPlane.prototype.show = function (protectStartCount, count) {
  this.move();
  if (this.type == "self" && this.protecting == true) {
    this.color = "green";
    this.protectHandler(protectStartCount, count);
  }

  trycvs.drawArc(
    trycvs.c,
    this.x,
    this.y,
    this.r,
    0,
    Math.PI * 2,
    true,
    this.color,
    this.color,
    5
  );
  if(this.type!='self')
  {
  trycvs.c.drawImage(
    this.img,
    this.x - 1.2 * this.r,
    this.y - 1.5 * this.r,
    2.4 * this.r,
    3 * this.r
  );
  }
  else{
    trycvs.c.drawImage(
      this.img,
      this.x - 1.5 * this.r,
      this.y - 2.5 * this.r,
      3 * this.r,
      5 * this.r
    );
  }
};

plane.enemyPlane.prototype.protectHandler = function (
  protectStartCount,
  count
) {
  if (protectStartCount + 100 <= count) {
    this.protecting = false;
    this.color = "red";
  }
};

plane.enemyPlane.prototype.move = function () {
  if (this.type == "001") {
    //公主
    if (this.y >= 250) {
      this.yspeed = 0;
    }
  } else if (this.type == "002") {
    //钻石
    if (this.y >= 150) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "003-1" || this.type == "003-2") {
    //矩形
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "004") {
    //跟踪
    if (this.y >= 250) {
      this.yspeed = 0;
    }
    if (this.xspeed == 0) this.xspeed = 3;
    else if (
      (this.xspeed > 0 && this.x > 400) ||
      (this.xspeed < 0 && this.x < 100)
    )
      this.xspeed = -this.xspeed;
  } else if (this.type == "005") {
    //圆阵
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "006") {
    //boss
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "007") {
    //公主-随机
    this.xspeed += control.r(4) - 2;
    if (this.xspeed > 4) this.xspeed = 4;
    else if (this.xspeed < -4) this.xspeed = -4;
    this.yspeed += control.r(4) - 2;
    if (this.yspeed > 4) this.yspeed = 4;
    else if (this.yspeed < -4) this.yspeed = -4;
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "008") {
    //钻石
    if (this.y >= 120) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "009") {
    //钻石
    if (this.y >= 140) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
    if (control.r(100) <= 5) {
      this.yspeed = -2;
    }
  } else if (this.type == "010-1" || this.type == "010-2") {
    //矩形
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "011") {
    //boss
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "012") {
    //钻石
    if (this.y >= 120) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "013") {
    //钻石
    if (this.y >= 140) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
    if (control.r(100) <= 1) {
      this.yspeed = -2;
    }
  } else if (this.type == "014") {
    //钻石
    if (this.y >= 120) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "015") {
    //boss
    if (this.y >= 100) {
      this.yspeed = 0;
    }
  } else if (this.type == "016") {
    if (this.y >= 140) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
    if (control.r(100) <= 1) {
      this.yspeed = -2;
    }
  } else if (this.type == "017" || this.type == "018") {
    //钻石
    if (this.y >= 140) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "019") {
    if (this.y >= 140) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
    if (control.r(100) <= 1) {
      this.yspeed = -2;
    }
  } else if (this.type == "020") {
    if (this.y >= 100) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "021") {
    if (this.y >= 150) this.yspeed = 0;
  } else if (this.type == "022") {
    if (this.y >= 150) {
      this.yspeed = 0;
      if (this.xspeed == 0) this.xspeed = 2;
    }
  } else if (this.type == "023") {
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "024") {
    if (this.y >= 150) {
      this.yspeed = 0;
    }
  } else if (this.type == "025") {
    if (this.y >= 250) {
      this.yspeed = 0;
    }
  }
  else if (this.type == "026") {
    if (this.y >= 100) {
      this.yspeed = 0;
    }
  }

  if (this.x + this.r > trycvs.canvas.width || this.x - this.r < 0) {
    this.xspeed = -this.xspeed;
  }

  if (this.y + this.r > trycvs.canvas.height || this.y - this.r < 0) {
    this.yspeed = -this.yspeed;
  }
  this.x += this.xspeed;
  this.y += this.yspeed;
};

plane.enemyPlane.prototype.death = function (index) {
  if (this.type == "self") {
    return;
  }
  if (this.life <= 0) {
    plane.enemyArr.splice(index, 1);
    if (this.type == "021") {
      trytouch.shootBloodySnake(this.x, this.y);
    } else if (this.type == "025") {
      trytouch.shootEvilCircle(this.x, this.y);
    }

    if (this.type == "001") {
      control.score = control.updateScore(control.score, 100);
      //draw(this.x,this.y);
    } else if (this.type == "002") {
      control.score = control.updateScore(control.score, 300);
    } else if (this.type == "003-1" || this.type == "003-2") {
      control.score = control.updateScore(control.score, 200);
    } else if (this.type == "004") {
      control.score = control.updateScore(control.score, 200);
    } else if (this.type == "005") {
      control.score = control.updateScore(control.score, 400);
    } else if (this.type == "006") {
      control.score = control.updateScore(control.score, 1000);
    } else control.score = control.updateScore(control.score, 100);
    control.replayAudioEffect("explodeAudio");
    control.boomAt(this.x, this.y, this.r);
  }
};

plane.enemyPlane.prototype.shoot = function (count) {
  if (this.type == "self") {
    let interval = 15;
    if (skill.hot.on) interval = 10;
    if (count % interval == 0) {
      let timesMap = skill.calculatePassiveTimes(skill.passiveList);
      //trytouch.shootSnowStorm_4(this.x, this.y - this.r);
      if (timesMap[0] == 1) trytouch.shootBiuBiu(this.x, this.y - this.r);
      else if (timesMap[0] == 2)
        trytouch.shootBiuBiu_2(this.x, this.y - this.r);
      else if (timesMap[0] == 3)
        trytouch.shootBiuBiu_3(this.x, this.y - this.r);
      else if (timesMap[0] == 4)
        trytouch.shootBiuBiu_4(this.x, this.y - this.r);
      if (count % (2 * interval) == 0) {
        if (timesMap[1] == 1) trytouch.shootSnowStorm(this.x, this.y - this.r);
        else if (timesMap[1] == 2)
          trytouch.shootSnowStorm_2(this.x, this.y - this.r);
        else if (timesMap[1] == 3)
          trytouch.shootSnowStorm_3(this.x, this.y - this.r);
        else if (timesMap[1] == 4)
          trytouch.shootSnowStorm_4(this.x, this.y - this.r);
      }
      if (timesMap[2] == 1) trytouch.shootBloody(this.x, this.y - this.r);
      else if (timesMap[2] == 2)
        trytouch.shootBloody_2(this.x, this.y - this.r);
      else if (timesMap[2] == 3)
        trytouch.shootBloody_3(this.x, this.y - this.r);
      else if (timesMap[2] == 4)
        trytouch.shootBloody_4(this.x, this.y - this.r);
    }
  } else if (this.type == "001") {
    if (count % 150 == 0) {
      trytouch.shootSevenBulletsForPrincess(this.x, this.y + this.r);
    }
  } else if (this.type == "002") {
    if (count % 50 == 0 && count % 500 < 250) {
      trytouch.shootHellPrincess(this.x, this.y + this.r);
    }
  } else if (this.type == "003-1") {
    if (count % 50 == 0 && count % 300 < 150) {
      trytouch.shootSummerSquare_left(this.x, this.y + this.r);
    }
  } else if (this.type == "003-2") {
    if (count % 50 == 0 && count % 300 < 150) {
      trytouch.shootSummerSquare_right(this.x, this.y + this.r);
    }
  } else if (this.type == "004") {
    if (count % 150 == 0) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    }
  } else if (this.type == "005") {
    if (count % 10 == 0 && count % 200 < 100) {
      trytouch.shootEvilCircle(this.x, this.y + this.r);
    }
  } else if (this.type == "006") {
    if (count % 500 < 250) {
      if (count % 200 == 0) trytouch.shootEvilCircle(this.x, this.y + this.r);
      if (count % 50 == 0) trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
      else if (count % 10 == 0 && count % 500 < 150)
        trytouch.shootEvilStar_left(this.x, this.y + this.r);
    } else {
      if (count % 100 == 50)
        trytouch.shootSevenBulletsForPrincess(this.x, this.y + this.r);
      if (count % 100 == 0) trytouch.shootBloodySnake(this.x, this.y + this.r);
      else if (count % 10 == 0 && count % 500 > 350)
        trytouch.shootEvilStar_right(this.x, this.y + this.r);
    }
  } else if (this.type == "007") {
    if (count % 150 == 0) {
      trytouch.shootSevenBulletsForPrincess(this.x, this.y + this.r);
    }
  } else if (this.type == "008") {
    if (count % 20 == 0 && count % 500 > 350)
      trytouch.shootEvilStar_right(this.x, this.y + this.r);
  } else if (this.type == "009") {
    if (count % 20 == 0 && count % 200 < 100) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    }
  } else if (this.type == "010-1") {
    if (count % 10 == 0 && count % 300 < 150) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    } else if (count % 55 == 0) {
      trytouch.shootSummerSquare_left(this.x, this.y + this.r);
    }
  } else if (this.type == "010-2") {
    if (count % 10 == 0 && count % 300 < 150) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    } else if (count % 55 == 0) {
      trytouch.shootSummerSquare_right(this.x, this.y + this.r);
    }
  } else if (this.type == "011") {
    if (count % 10 == 0 && count % 50 < 25) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    } else if (count % 55 == 0) {
      trytouch.shootHellPrincess(this.x, this.y + this.r);
    }
    if (count % 500 == 0) {
      trytouch.shootFullScreenX(this.x, this.y + this.r);
    }
  } else if (this.type == "012") {
    if (count % 150 == 0) {
      trytouch.shootDeadLine(this.x, this.y + this.r);
    }
  } else if (this.type == "013") {
    if (count % 150 == 0) {
      trytouch.shootBia_enemy(this.x, this.y + this.r);
    }
  } else if (this.type == "014") {
    if (count % 150 == 0) {
      trytouch.shootExImmortal(this.x, this.y + this.r);
    }
  } else if (this.type == "015") {
    if (count % 20 == 0 && count % 500 < 100)
      trytouch.shootEvilStar_left(this.x, this.y + this.r);
    else if (count % 20 == 0 && count % 500 > 400)
      trytouch.shootEvilStar_right(this.x, this.y + this.r);
    if (count % 1000 == 0) {
      trytouch.shootCallBia(150);
    }
  } else if (this.type == "016") {
    //人类
    if (count % 10 == 0 && count % 50 < 25) {
      trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
    }
  } else if (this.type == "017") {
    if (count % 10 == 0 && count % 100 < 50) {
      trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
    } else if (count % 10 == 0 && count % 100 > 80) {
      trytouch.shootBloodySnake(this.x, this.y + this.r);
    }
  } else if (this.type == "018") {
    if (count % 10 == 0 && count % 100 < 50) {
      trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
    } else if (count % 10 == 0 && count % 100 > 80) {
      trytouch.shootSevenBulletsForPrincess(this.x, this.y + this.r);
    }
  } else if (this.type == "019") {
    let lifePerc = this.life / this.maxlife;
    let rollDie = control.r(100);
    if (lifePerc > 0.5) {
      if (count % 10 == 0 && count % 500 < 150) {
        trytouch.shootSnowStorm_enemy(this.x, this.y + this.r);
      } else if (count % 10 == 0 && count % 500 > 400) {
        trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
      } else if (count % 10 == 0 && rollDie < 10) {
        trytouch.shootBloodySnake(this.x, this.y + this.r);
      }
    } else {
      if (count % 20 == 0 && count % 500 < 150) {
        trytouch.shootSnowStorm_2_enemy(this.x, this.y + this.r);
      } else if (count % 10 == 0 && count % 500 > 300) {
        trytouch.shootBiuBiu_2_enemy(this.x, this.y + this.r);
      } else if (count % 10 == 0 && rollDie < 40) {
        trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
      }
    }
  } else if (this.type == "020") {
    if (count % 200 == 0) {
      trytouch.shootCallWall(this.x, this.y);
    }
  } else if (this.type == "022") {
    if (count % 50 == 0 && count % 500 < 150) {
      trytouch.shootExImmortalCircle(this.x, this.y);
    }
  } else if (this.type == "023") {
    if (count % 10 == 0 && count % 500 < 300) {
      trytouch.shootEvilStar_Cassa(this.x, this.y);
    }
  } else if (this.type == "024") {
    if (count % 800 == 0) {
      trytouch.shootCallLargeWall(this.x, this.y);
    }
    if (count % 1000 == 0 && plane.enemyArr.length < 7) {
      trytouch.shootFullScreenCircle(this.x, this.y);
    }
    if (count % 200 == 0) {
      trytouch.shootDeadLine(this.x + control.r(100) - 50, 40);
    } else if (count % 40 == 0 && count % 1000 < 500) {
      trytouch.shootEvilSquareX(this.x, this.y);
    }
  } else if (this.type == "026") {
    if (count % 1000 == 0) {
      trytouch.shootCallBiuBiu(this.x, 150);
    }
    if (count % 10 == 0 && count % 500 < 150) {
      trytouch.shootSnowStorm_enemy(this.x, this.y + this.r);
    } else if (count % 10 == 0 && count % 500 > 400) {
      trytouch.shootBiuBiu_enemy(this.x, this.y + this.r);
    }
  }
};

plane.isPressing = false;
plane.selfMove = function (self) {
  document.onkeydown = function (e) {
    if (e.key == "ArrowLeft") {
      self.xspeed = -1;
    }
    if (e.key == "ArrowUp") {
      self.yspeed = -1;
    }
    if (e.key == "ArrowRight") {
      self.xspeed = 1;
    }
    if (e.key == "ArrowDown") {
      self.yspeed = 1;
    }
    if (e.key == "Shift") {
      plane.isPressing = true;
    }
    if (plane.isPressing) {
      if (Math.abs(self.xspeed) >= 0.7) self.xspeed /= 2;
      if (Math.abs(self.yspeed) >= 0.7) self.yspeed /= 2;
    }
    let currentSkill;
    if (e.key == "z" && skill.skillList.length >= 1) {
      currentSkill = skill.skillList[0];
    } else if (e.key == "x" && skill.skillList.length >= 2) {
      currentSkill = skill.skillList[1];
    } else if (e.key == "c" && skill.skillList.length >= 3) {
      currentSkill = skill.skillList[2];
    } else return false;
    if (currentSkill.ready) currentSkill.go();
    return false;
  };
  document.onkeyup = function (e) {
    if (e.key == "ArrowLeft") {
      self.xspeed = 0;
    }
    if (e.key == "ArrowUp") {
      self.yspeed = 0;
    }
    if (e.key == "ArrowRight") {
      self.xspeed = 0;
    }
    if (e.key == "ArrowDown") {
      self.yspeed = 0;
    }
    if (e.key == "Shift") {
      plane.isPressing = false;
    }
  };
  if (control.level == 3) {
    self.xspeed /= 1.5;
    self.yspeed /= 1.5;
  }
  self.x += self.xspeed;
  self.y += self.yspeed;
  for (let i = 0; i < plane.enemyArr.length; i++) {
    let enemy = plane.enemyArr[i];
    let distance = Math.sqrt((self.x - enemy.x) ** 2 + (self.y - enemy.y) ** 2);
    if (distance <= self.r + enemy.r && self.protecting != true) {
      skill.lossPassive();
      self.life = control.updateLife(self.life, -100);
      control.replayAudioEffect("biuAudio");
      self.protecting = true;
      return "protect";
    }
  }

  return false;
};

plane.selfBirth = function (count) {
  if (count == 1) {
    let self = new plane.enemyPlane(
      "self",
      100000,
      trycvs.canvas.width / 2,
      trycvs.canvas.height - 40,
      12,
      0,
      0
    );
    plane.self = self;
    self.show();
  }
};

plane.enemyBirth = function (level, count, stage) {
  if (level == 1) {
    if (stage.clear && !stage.isLastTime) return;
    if (stage.index == 0) {
      //公主
      if (count % 200 == 0 && plane.enemyArr.length < 2) {
        let enemy = new plane.enemyPlane(
          "001",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 1) {
      if (count % 200 == 0) {
        //圆阵
        let enemy = new plane.enemyPlane("005", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 2) {
      //毒蛇
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "004",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 3) {
      //方阵
      if (count % 200 == 0 && plane.enemyArr.length == 0) {
        let enemy = new plane.enemyPlane("003-1", 100, 100, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
        let enemy2 = new plane.enemyPlane("003-2", 100, 400, 40, 20, 0, 2);
        plane.enemyArr.push(enemy2);
        enemy2.show();
      } else return;
    } else if (stage.index == 4) {
      //钻石
      if (count % 200 == 0 && plane.enemyArr.length < 2) {
        let enemy = new plane.enemyPlane(
          "002",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 5) {
      //boss
      if (!stage.clear) {
        alert("警告：boss即将出现");
        stage.clear = true;
      } else return;
    } else if (stage.index == 6) {
      //boss
      if (count % 200 == 0) {
        let enemy = new plane.enemyPlane("006", 1000, 250, 40, 40, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 2) {
    if (stage.clear && !stage.isLastTime) return;
    if (stage.index == 0) {
      //公主-随机模式
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "007",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 1) {
      if (count % 200 == 0) {
        //圆阵-螺旋
        let enemy = new plane.enemyPlane("008", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 2) {
      //毒蛇
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "009",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 3) {
      //
      if (count % 200 == 0 && plane.enemyArr.length == 0) {
        let enemy = new plane.enemyPlane("010-1", 100, 100, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
        let enemy2 = new plane.enemyPlane("010-2", 100, 400, 40, 20, 0, 2);
        plane.enemyArr.push(enemy2);
        enemy2.show();
      } else return;
    } else if (stage.index == 4) {
      //钻石
      if (count % 200 == 0 && plane.enemyArr.length < 2) {
        let enemy = new plane.enemyPlane(
          "002",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 5) {
      //boss
      if (!stage.clear) {
        alert("警告：boss即将出现");
        stage.clear = true;
      } else return;
    } else if (stage.index == 6) {
      //boss
      if (count % 200 == 0) {
        let enemy = new plane.enemyPlane("011", 1000, 250, 40, 40, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 3) {
    if (stage.clear && !stage.isLastTime) return;
    if (stage.index == 0) {
      //毒蛇-随机模式
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "009",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 1) {
      if (count % 200 == 0) {
        //横排人
        let enemy = new plane.enemyPlane("012", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 2) {
      //大玉
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "013",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 3) {
      //井字
      if (count % 200 == 0 && plane.enemyArr.length == 0) {
        let enemy = new plane.enemyPlane("014", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 4) {
      //圆管
      if (count % 200 == 0 && plane.enemyArr.length < 1) {
        let enemy = new plane.enemyPlane(
          "008",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 5) {
      //boss
      if (!stage.clear) {
        alert("警告：boss即将出现");
        stage.clear = true;
      } else return;
    } else if (stage.index == 6) {
      //boss
      if (count % 200 == 0) {
        let enemy = new plane.enemyPlane("015", 1000, 250, 40, 40, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 4) {
    if (stage.clear && !stage.isLastTime) return;
    if (stage.index == 0) {
      //毒蛇-随机模式
      if (count % 200 == 0 && plane.enemyArr.length < 2) {
        let enemy = new plane.enemyPlane(
          "016",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 1) {
      if (count % 200 == 0) {
        //横排人
        let enemy = new plane.enemyPlane("017", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 2) {
      //大玉
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "016",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 3) {
      //井字
      if (count % 200 == 0 && plane.enemyArr.length == 0) {
        let enemy = new plane.enemyPlane("018", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 4) {
      //圆管
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "013",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 5) {
      //boss
      if (!stage.clear) {
        alert("警告：boss即将出现");
        stage.clear = true;
      } else return;
    } else if (stage.index == 6) {
      //boss
      if (count % 200 == 0) {
        let enemy = new plane.enemyPlane("019", 1000, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 5) {
    if (stage.clear && !stage.isLastTime) return;
    if (stage.index == 0) {
      //毒蛇-随机模式
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane(
          "020",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 1) {
      if (count % 200 == 0 && plane.enemyArr.length < 1) {
        let enemy = new plane.enemyPlane("023", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 2) {
      if (count % 200 == 0 && plane.enemyArr.length < 1) {
        let enemy = new plane.enemyPlane(
          "022",
          100,
          control.r(420) + 40,
          40,
          20,
          0,
          2
        );
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 3) {
      //井字
      if (count % 200 == 0 && plane.enemyArr.length < 3) {
        let enemy = new plane.enemyPlane("012", 100, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 4) {
      //圆管
      if (count % 200 == 0 && plane.enemyArr.length == 0) {
        let enemy = new plane.enemyPlane("006", 200, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else if (stage.index == 5) {
      //boss
      if (!stage.clear) {
        alert("警告：boss即将出现");
        stage.clear = true;
      } else return;
    } else if (stage.index == 6) {
      //boss
      if (count % 200 == 0) {
        let enemy = new plane.enemyPlane("024", 1000, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 6) {
    if (stage.index == 6) {
      if (count % 200 == 0 && plane.enemyArr.length < 1) {
        let enemy = new plane.enemyPlane("026", 1000, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      }
    }
  }

  stage.enemyCount++;
  if (stage.enemyCount >= stage.maxEnemyCount) stage.clear = true;
};
