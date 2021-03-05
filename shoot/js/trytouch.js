var trytouch = trytouch || {};
trytouch.randomColor = "#" + parseInt(Math.random() * 0xffffff).toString(16);

var x = 100;
var y = 100;
var xspeed = 1.5;
var yspeed = 1.5;
trytouch.ballArr = [];
trytouch.ball = function (
  part,
  damage,
  x,
  y,
  r,
  xspeed,
  yspeed,
  angleSpeed = 0,
  capture = false,
  color = "red"
) {
  this.part = part;
  this.damage = damage;
  this.x = x; //||control.r(trycvs.canvas.width);
  this.y = y; //||control.r(trycvs.canvas.height);
  this.r = r; //||control.r(10)+5;
  this.xspeed = xspeed; //||control.r(5)+1.5;
  this.yspeed = yspeed; //||control.r(5)+1.5;
  this.capture = capture;
  if (this.xspeed == 0) this.angle = this.yspeed > 0 ? -90 : 90;
  else {
    this.angle = (Math.atan(-this.yspeed / this.xspeed) * 180) / Math.PI;
    if (this.xspeed < 0) this.angle += 180;
  }
  this.angleSpeed = angleSpeed;
  //if (part == "self") this.color = "red";
  this.color = color; //this.color = '#' + parseInt(Math.random() * 0xffffff).toString(16);
  this.stateList = [];
};

trytouch.ball.prototype.skillEffect = function () {
  if (skill.shizuka.on && !this.stateList.includes("shizuka")) {
    this.stateList.push("shizuka");
    this.xspeed /= 2;
    this.yspeed /= 2;
    this.angleSpeed /= 2;
  }
};

trytouch.ball.prototype.show = function () {
  this.move();
  this.skillEffect();
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

trytouch.ball.prototype.move = function () {
  if (this.capture) {
    if (this.part != "self") {
      this.angle =
        (Math.atan((-plane.self.y + this.y) / (plane.self.x - this.x)) * 180) /
        Math.PI;
      if (plane.self.x - this.x < 0) this.angle += 180;
    } else {
      if (plane.enemyArr.length) {
        this.angle =
          (Math.atan(
            (-plane.enemyArr[0].y + this.y) / (plane.enemyArr[0].x - this.x)
          ) *
            180) /
          Math.PI;
        if (plane.enemyArr[0].x - this.x < 0) this.angle += 180;
      }
    }
    this.capture = false;
  }
  this.angle += this.angleSpeed;
  let speed = Math.sqrt(this.xspeed ** 2 + this.yspeed ** 2);
  this.xspeed = speed * Math.cos((this.angle * Math.PI) / 180);
  this.yspeed = -speed * Math.sin((this.angle * Math.PI) / 180);

  if (this.x + this.r > trycvs.canvas.width || this.x - this.r < 0) {
    this.xspeed = -this.xspeed;
  }
  if (this.y + this.r > trycvs.canvas.height || this.y - this.r < 0) {
    this.yspeed = -this.yspeed;
  }
  this.x += this.xspeed;
  this.y += this.yspeed;
};

trytouch.ball.prototype.death = function (index, mustdie = false) {
  if (mustdie) {
    trytouch.ballArr.splice(index, 1);
  }
  if (
    this.y - this.r <= 0 ||
    this.y + this.r > trycvs.canvas.height ||
    this.x + this.r > trycvs.canvas.width ||
    this.x - this.r < 0
  ) {
    trytouch.ballArr.splice(index, 1);
    return;
  }
  if (this.part == "self") {
    for (let i = 0; i < plane.enemyArr.length; i++) {
      let enemy = plane.enemyArr[i];
      let distance = Math.sqrt(
        (this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2
      );
      if (distance <= this.r + enemy.r) {
        enemy.life -= this.damage;
        if (
          enemy.type == "006" ||
          enemy.type == "011" ||
          enemy.type == "015" ||
          enemy.type == "019" ||
          enemy.type == "024"
        ) {
          let percentage = enemy.life / enemy.maxlife;
          vueAttach.progress.styleObject.width = control.toPercent(percentage);
        }
        trytouch.ballArr.splice(index, 1);
        if (this.color == "golden" || this.color == "yellow") {
          console.log("ha");
          trytouch.shootHolyCircle(this.x, this.y, enemy.r);
        }
        return;
      }
    }
  } else if (this.part !== "self") {
    let self = plane.self;
    let distance = Math.sqrt((this.x - self.x) ** 2 + (this.y - self.y) ** 2);
    if (distance <= this.r + self.r && self.protecting != true) {
      let bulletDamage = this.damage;
      if (skill.defend.on) bulletDamage /= 2;
      if (control.level == 3) bulletDamage *= 1.5;
      skill.lossPassive();
      self.life = control.updateLife(self.life, -bulletDamage);
      control.replayAudioEffect("biuAudio");
      self.protecting = true;
      trytouch.ballArr.splice(index, 1);
      return "protect";
    }
  }
};

trytouch.shootBiuBiu = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [-3];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootBiuBiu_2 = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [-3];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball_1 = new trytouch.ball(
      "self",
      bulletDamage,
      x - 7.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    let ball_2 = new trytouch.ball(
      "self",
      bulletDamage,
      x + 7.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball_1);
    trytouch.ballArr.push(ball_2);
    ball_1.show();
    ball_2.show();
  }
};

trytouch.shootBiuBiu_3 = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [-3];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball_1 = new trytouch.ball(
      "self",
      bulletDamage,
      x - 12.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    let ball_2 = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    let ball_3 = new trytouch.ball(
      "self",
      bulletDamage,
      x + 12.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball_1);
    trytouch.ballArr.push(ball_2);
    trytouch.ballArr.push(ball_3);
    ball_1.show();
    ball_2.show();
    ball_3.show();
  }
};

trytouch.shootBiuBiu_4 = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [-3];
  let bulletColor = "violet";
  let bulletDamage = 40;
  if (skill.aim.on) {
    bulletColor = "purple";
    bulletDamage = 80;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      10,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSnowStorm = function (x, y) {
  let xspeedlist = [-2, 2];
  let yspeedlist = [0, 0];
  let aspeedlist = [-0.5, 0.5];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSnowStorm_2 = function (x, y) {
  trytouch.shootSnowStorm(x, y);
  let xspeedlist = [-1.5, 1.5];
  let yspeedlist = [-0.5, -0.5];
  let aspeedlist = [-0.4, 0.4];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSnowStorm_3 = function (x, y) {
  trytouch.shootSnowStorm_2(x, y);
  let xspeedlist = [-0.5, 0.5];
  let yspeedlist = [-2, -2];
  let aspeedlist = [0.2, -0.2];
  let bulletColor = "red";
  let bulletDamage = 10;
  if (skill.aim.on) {
    bulletColor = "pink";
    bulletDamage = 20;
  }
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "self",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSnowStorm_4 = function (x, y) {
  trytouch.shootSnowStorm_3(x, y);
  if (control.r(100) < 33) {
    let xspeedlist = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    let yspeedlist = [-1, -2, -3, -4, -5, -6, -5, -4, -3, -2, -1];
    let aspeedlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let bulletColor = "violet";
    let bulletDamage = 20;
    if (skill.aim.on) {
      bulletColor = "purple";
      bulletDamage = 40;
    }
    for (let i = 0; i < xspeedlist.length; i++) {
      let ball = new trytouch.ball(
        "self",
        bulletDamage,
        x,
        y,
        5,
        xspeedlist[i],
        yspeedlist[i],
        aspeedlist[i],
        false,
        bulletColor
      );
      trytouch.ballArr.push(ball);
      ball.show();
    }
  }
};

trytouch.shootBloody = function (x, y) {
  if (control.r(100) < 25) {
    let bulletColor = "violet";
    let bulletDamage = 2.5;
    if (skill.aim.on) {
      bulletColor = "purple";
      bulletDamage = 5;
    }
    for (i = x - 25; i < x + 25; i += 5) {
      let ball = new trytouch.ball(
        "self",
        bulletDamage,
        i,
        y,
        10,
        0,
        -5,
        0,
        false,
        bulletColor
      );
      trytouch.ballArr.push(ball);
      ball.show();
    }
  }
};

trytouch.shootBloody_2 = function (x, y) {
  trytouch.shootBloody(x, y);
  if (control.r(100) < 50) {
    let xspeedlist = [0];
    let yspeedlist = [-3];
    let bulletColor = "red";
    let bulletDamage = 10;
    if (skill.aim.on) {
      bulletColor = "pink";
      bulletDamage = 20;
    }
    for (let i = 0; i < xspeedlist.length; i++) {
      let ball = new trytouch.ball(
        "self",
        bulletDamage,
        x,
        y,
        7.5,
        xspeedlist[i],
        yspeedlist[i],
        0,
        true,
        bulletColor
      );
      trytouch.ballArr.push(ball);
      ball.show();
    }
  }
};

trytouch.shootBloody_3 = function (x, y) {
  trytouch.shootBloody_2(x, y);
  if (control.r(100) > 75) {
    let bulletColor = "violet";
    let bulletDamage = 2.5;
    if (skill.aim.on) {
      bulletColor = "purple";
      bulletDamage = 5;
    }
    for (i = x - 40; i < x + 40; i += 5) {
      let ball = new trytouch.ball(
        "self",
        bulletDamage,
        i,
        y,
        10,
        0,
        -5,
        0,
        false,
        bulletColor
      );
      trytouch.ballArr.push(ball);
      ball.show();
    }
  }
};

trytouch.shootBloody_4 = function (x, y) {
  trytouch.shootBloody_3(x, y);
  if (control.r(100) > 75) {
    let bulletColor = "golden";
    let bulletDamage = 2.5;
    if (skill.aim.on) {
      bulletColor = "yellow";
      bulletDamage = 5;
    }
    for (let i = 0; i < 1; i++) {
      let ball = new trytouch.ball(
        "self",
        bulletDamage,
        x,
        y,
        10,
        0,
        -5,
        0,
        true,
        bulletColor
      );
      trytouch.ballArr.push(ball);
      ball.show();
    }
  }
};

trytouch.shootHolyCircle = function (x, y, r) {
  let xspeedlist = [
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
  ];
  let yspeedlist = [
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
  ];
  let xleft = x - 1.5 * r,
    xright = x + 1.5 * r,
    yup = y - 1.5 * r,
    ydown = y + 1.5 * r;
  let xlist = [
    xleft,
    xleft,
    xleft,
    xleft,
    xleft,
    xright,
    xright,
    xright,
    xright,
    xright,
    xright,
    xright,
    xleft,
    xleft,
    xleft,
    xleft,
    xleft,
  ];
  let ylist = [
    yup,
    yup,
    yup,
    yup,
    yup,
    yup,
    yup,
    yup,
    ydown,
    ydown,
    ydown,
    ydown,
    ydown,
    ydown,
    ydown,
    ydown,
    ydown,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "red";
    else color = "purple";
    let ball = new trytouch.ball(
      "self",
      10,
      xlist[i],
      ylist[i],
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootShooot = function (x, y) {
  let xspeedlist = [
    -5,
    -4.5,
    -4,
    -3.5,
    -3,
    -2.5,
    -2,
    -1.5,
    -1,
    -0.5,
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
  ];
  let yspeedlist = [
    0,
    -0.5,
    -1,
    -1.5,
    -2,
    -2.5,
    -3,
    -3.5,
    -4,
    -4.5,
    -5,
    -4.5,
    -4,
    -3.5,
    -3,
    -2.5,
    -2,
    -1.5,
    -1,
    -0.5,
    0,
  ];
  let aspeedlist = [
    -0.5,
    0.45,
    -0.4,
    0.35,
    -0.3,
    0.25,
    -0.2,
    0.15,
    -0.1,
    0.05,
    0,
    -0.05,
    0.1,
    -0.15,
    0.2,
    -0.25,
    0.3,
    -0.35,
    0.4,
    -0.45,
    0.5,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "red";
    else color = "pink";
    let ball = new trytouch.ball(
      "self",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i] * 2.5,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootFullScreen = function (x, y) {
  for (i = 0; i < trycvs.canvas.width; i += 5) {
    let ball = new trytouch.ball(
      "self",
      100,
      i,
      y,
      10,
      0,
      -5,
      0,
      false,
      "pink"
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootBiuBiu_enemy = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [3];
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      "cyan"
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootBiuBiu_2_enemy = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [3];
  let bulletColor = "cyan";
  let bulletDamage = 10;
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball_1 = new trytouch.ball(
      "enemy",
      bulletDamage,
      x - 7.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      bulletDamage,
      x + 7.5,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball_1);
    trytouch.ballArr.push(ball_2);
    ball_1.show();
    ball_2.show();
  }
};

trytouch.shootSevenBulletsForPrincess = function (x, y) {
  let xspeedlist = [-3, -2, -1, 0, 1, 2, 3];
  let yspeedlist = [1, 2, 3, 4, 3, 2, 1];
  let aspeedlist = [-0.5, -0.4, -0.2, 0, 0.2, 0.4, 0.5];
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      "cyan"
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootHellPrincess = function (x, y) {
  let xspeedlist = [-3, -2, -1, 0, 1, 2, 3, 4, -4, -3, -2, -1, 0, 1, 2, 3];
  let yspeedlist = [1, 2, 3, 4, 3, 2, 1, 0, 0, -1, -2, -3, -4, -3, -2, -1];
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i] / 2,
      yspeedlist[i] / 2,
      0,
      false,
      "cyan"
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSummerSquare_left = function (x, y) {
  let xspeedlist = [-3, -2, -1, 0, 1, 2, 3, 4, -4, -3, -2, -1, 0, 1, 2, 3];
  let yspeedlist = [1, 2, 3, 4, 3, 2, 1, 0, 0, -1, -2, -3, -4, -3, -2, -1];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i] / 2,
      yspeedlist[i] / 2,
      0.4,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSummerSquare_right = function (x, y) {
  let xspeedlist = [-3, -2, -1, 0, 1, 2, 3, 4, -4, -3, -2, -1, 0, 1, 2, 3];
  let yspeedlist = [1, 2, 3, 4, 3, 2, 1, 0, 0, -1, -2, -3, -4, -3, -2, -1];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i] / 2,
      yspeedlist[i] / 2,
      -0.4,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootEvilCircle = function (x, y) {
  let xspeedlist = [
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
  ];
  let yspeedlist = [
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootEvilSquareX = function (x, y) {
  let xspeedlist = [
    -4,
    -3.5,
    -3,
    -2.5,
    -2,
    -1.5,
    -1,
    -0.5,
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    3.5,
    3,
    2.5,
    2,
    1.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    3.5,
    3,
    2.5,
    2,
    1.5,
    1,
    0.5,
    0,
    -0.5,
    -1,
    -1.5,
    -2,
    -2.5,
    -3,
    -3.5,
    -4,
    -3.5,
    -3,
    -2.5,
    -2,
    -1.5,
    -1,
    -1.5,
    -2,
    -2.5,
    -3,
    -3.5
  ];
  let yspeedlist = [
    -4,
    -3,
    -2.4,
    -2,
    -1.732,
    -1.5,
    -1.414,
    -1.2,
    -1,
    -1.2,
    -1.414,
    -1.5,
    -1.732,
    -2,
    -2.4,
    -3,
    -4,
    -3,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    3,
    4,
    3,
    2.4,
    2,
    1.732,
    1.5,
    1.414,
    1.2,
    1,
    1.2,
    1.414,
    1.5,
    1.732,
    2,
    2.4,
    3,
    4,
    3,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -3
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootEvilStar_left = function (x, y) {
  let xspeedlist = [
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
  ];
  let yspeedlist = [
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      0.2,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootEvilStar_right = function (x, y) {
  let xspeedlist = [
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
  ];
  let yspeedlist = [
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      -0.2,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootEvilStar_Cassa = function (x, y) {
  let xspeedlist = [
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
    -1,
    -1.414,
    -1.732,
    -2,
  ];
  let yspeedlist = [
    0,
    -1,
    -1.414,
    -1.732,
    -2,
    -1.732,
    -1.414,
    -1,
    0,
    1,
    1.414,
    1.732,
    2,
    1.732,
    1.414,
    1,
    0,
  ];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color;
    if (i % 2) color = "cyan";
    else color = "orange";
    let ball = new trytouch.ball(
      "enemy",
      10,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      -0.4,
      false,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootBloodySnake = function (x, y) {
  let xspeedlist = [0, 0, 0];
  let yspeedlist = [2, 2, 2];
  for (let i = 0; i < xspeedlist.length; i++) {
    let color = "white";
    let ball = new trytouch.ball(
      "enemy",
      20,
      x,
      y,
      8,
      xspeedlist[i],
      yspeedlist[i],
      0,
      true,
      color
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootFullScreenX = function (x, y) {
  for (let i = 0; i < trycvs.canvas.width; i = i + 30) {
    let color = i % 40 < 20 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      i,
      480,
      5,
      i > 250 ? -2 : 2,
      -2,
      0,
      false,
      color
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      i,
      20,
      5,
      i > 250 ? -2 : 2,
      2,
      0,
      false,
      color
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
};

trytouch.shootFullScreenCircle = function (x, y) {
  for (let i = 0; i < trycvs.canvas.width; i = i + 30) {
    let color = i % 40 < 20 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      i,
      480,
      5,
      i > 250 ? -2 : 2,
      -2,
      0,
      true,
      color
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      i,
      20,
      5,
      i > 250 ? -2 : 2,
      2,
      0,
      true,
      color
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
};

trytouch.shootBia_enemy = function (x, y) {
  let xspeedlist = [0];
  let yspeedlist = [3];
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      20,
      x,
      y,
      20,
      xspeedlist[i],
      yspeedlist[i],
      0,
      false,
      "cyan"
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootDeadLine = function (x, y) {
  console.log("line");
  for (let i = x - 25; i < x + 25; i += 5) {
    let ball = new trytouch.ball("enemy", 5, i, y, 10, 0, 3, 0, false, "green");
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootExImmortal = function (x, y) {
  for (let i = x - 100; i < x + 100; i = i + 30) {
    let color = i % 60 < 30 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      i,
      y - 50,
      5,
      0,
      2,
      0,
      false,
      "cyan"
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      i,
      y + 50,
      5,
      0,
      -2,
      0,
      false,
      "orange"
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
  for (let i = y - 100; i < y + 100; i = i + 30) {
    let color = i % 60 < 30 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      x - 50,
      i,
      5,
      2,
      0,
      0,
      false,
      "cyan"
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      x + 50,
      i,
      5,
      -2,
      0,
      0,
      false,
      "orange"
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
};

trytouch.shootExImmortalCircle = function (x, y) {
  for (let i = x - 100; i < x + 100; i = i + 30) {
    let color = i % 60 < 30 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      i,
      y - 50,
      5,
      0,
      2,
      -0.3,
      false,
      "cyan"
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      i,
      y + 50,
      5,
      0,
      -2,
      0.3,
      false,
      "orange"
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
  for (let i = y - 100; i < y + 100; i = i + 30) {
    let color = i % 60 < 30 ? "cyan" : "orange";
    let ball_1 = new trytouch.ball(
      "enemy",
      20,
      x - 50,
      i,
      5,
      2,
      0,
      0,
      false,
      "cyan"
    );
    let ball_2 = new trytouch.ball(
      "enemy",
      20,
      x + 50,
      i,
      5,
      -2,
      0,
      0,
      false,
      "orange"
    );
    trytouch.ballArr.push(ball_1);
    ball_1.show();
    trytouch.ballArr.push(ball_2);
    ball_2.show();
  }
};

trytouch.shootCallBia = function (y) {
  if (plane.enemyArr.length <= 1) {
    let enemy = new plane.enemyPlane("013", 100, 40, y, 20, 2, 0);
    plane.enemyArr.push(enemy);
    enemy.show();
    let enemy2 = new plane.enemyPlane("013", 100, 460, y, 20, -2, 0);
    plane.enemyArr.push(enemy2);
    enemy2.show();
  }
};

trytouch.shootCallBiuBiu = function (y) {
  if (plane.enemyArr.length <= 10) {
    let enemy = new plane.enemyPlane("016", 100, 40, y, 20, 2, 0);
    plane.enemyArr.push(enemy);
    enemy.show();
  }
};

trytouch.shootCallWall = function (x, y) {
  let enemy = new plane.enemyPlane("021", 10, x, y, 20, 0, 2);
  plane.enemyArr.push(enemy);
  enemy.show();
};

trytouch.shootSnowStorm_3_enemy = function (x, y) {
  trytouch.shootSnowStorm_2_enemy(x, y);
  let xspeedlist = [-0.5, 0.5];
  let yspeedlist = [2, 2];
  let aspeedlist = [-0.2, 0.2];
  let bulletColor = "green";
  let bulletDamage = 10;
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootCallLargeWall = function (x, y) {
  let enemy = new plane.enemyPlane("025", 50, x, y, 20, 0, 2);
  plane.enemyArr.push(enemy);
  enemy.show();
  let enemy1 = new plane.enemyPlane("025", 50, x, y, 20, -2, 2);
  plane.enemyArr.push(enemy1);
  enemy1.show();
  let enemy2 = new plane.enemyPlane("025", 50, x, y, 20, 2, 2);
  plane.enemyArr.push(enemy2);
  enemy2.show();
};

trytouch.shootSnowStorm_enemy = function (x, y) {
  let xspeedlist = [-2, 2];
  let yspeedlist = [0, 0];
  let aspeedlist = [0.5, -0.5];
  let bulletColor = "green";
  let bulletDamage = 10;
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};

trytouch.shootSnowStorm_2_enemy = function (x, y) {
  trytouch.shootSnowStorm_enemy(x, y);
  let xspeedlist = [-1.5, 1.5];
  let yspeedlist = [0.5, 0.5];
  let aspeedlist = [0.4, -0.4];
  let bulletColor = "green";
  let bulletDamage = 10;
  for (let i = 0; i < xspeedlist.length; i++) {
    let ball = new trytouch.ball(
      "enemy",
      bulletDamage,
      x,
      y,
      5,
      xspeedlist[i],
      yspeedlist[i],
      aspeedlist[i],
      false,
      bulletColor
    );
    trytouch.ballArr.push(ball);
    ball.show();
  }
};




