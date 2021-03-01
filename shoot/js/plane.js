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
  else this.color = "#" + parseInt(Math.random() * 0xffffff).toString(16);
  this.protecting = false;
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
    }
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
  self.x += self.xspeed;
  self.y += self.yspeed;
  return false;
};

plane.selfBirth = function (count) {
  if (count == 1) {
    let self = new plane.enemyPlane(
      "self",
      100000,
      trycvs.canvas.width / 2,
      trycvs.canvas.height - 40,
      20,
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
        let enemy = new plane.enemyPlane("006", 1000, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  } else if (level == 2) {
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
        let enemy = new plane.enemyPlane("006", 1000, 250, 40, 20, 0, 2);
        plane.enemyArr.push(enemy);
        enemy.show();
      } else return;
    } else return;
  }
  stage.enemyCount++;
  if (stage.enemyCount >= stage.maxEnemyCount) stage.clear = true;
};
