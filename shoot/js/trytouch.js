var trytouch = trytouch || {};
trytouch.randomColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
trytouch.r = function (range) {
    return Math.random() * range;
}
var x = 100;
var y = 100;
var xspeed = 1.5;
var yspeed = 1.5;
trytouch.ballArr = [];
trytouch.ball = function (part, damage, x, y, r, xspeed, yspeed,angleSpeed=0,capture=false,color='red') {
    this.part = part;
    this.damage = damage;
    this.x = x;//||trytouch.r(trycvs.canvas.width);
    this.y = y;//||trytouch.r(trycvs.canvas.height);
    this.r = r;//||trytouch.r(10)+5;
    this.xspeed = xspeed;//||trytouch.r(5)+1.5;
    this.yspeed = yspeed;//||trytouch.r(5)+1.5;
    this.capture=capture;
    if(this.xspeed==0) this.angle=this.yspeed>0?-90:90;
    else {
        this.angle = Math.atan(-this.yspeed/this.xspeed)*180/Math.PI;
        if(this.xspeed<0) this.angle+=180;
    }
    this.angleSpeed=angleSpeed;
    if (part == 'self') this.color = 'red';
    else this.color=color;//this.color = '#' + parseInt(Math.random() * 0xffffff).toString(16);
}

trytouch.ball.prototype.show = function () {
    this.move();
    trycvs.drawArc(trycvs.c, this.x, this.y, this.r, 0, Math.PI * 2, true, this.color, this.color, 5);
}

trytouch.ball.prototype.move = function () {
    if(this.capture){
        this.angle=Math.atan((-plane.self.y+this.y)/(plane.self.x-this.x))*180/Math.PI;
        if(plane.self.x-this.x<0) this.angle+=180;
        this.capture=false;
    }
    this.angle+=this.angleSpeed;
    let speed=Math.sqrt(this.xspeed**2+this.yspeed**2);
    this.xspeed = speed*Math.cos(this.angle * Math.PI / 180);  
    this.yspeed = -speed*Math.sin(this.angle * Math.PI / 180);  

    if (this.x + this.r > trycvs.canvas.width || this.x - this.r < 0) {
        this.xspeed = -this.xspeed;
    }
    if (this.y + this.r > trycvs.canvas.height || this.y - this.r < 0) {
        this.yspeed = -this.yspeed;
    }
    this.x += this.xspeed;
    this.y += this.yspeed;
    
}

trytouch.ball.prototype.death = function (index, mustdie = false) {
    if (mustdie) {
        trytouch.ballArr.splice(index, 1);
    }
    if (this.y - this.r <= 0 || this.y + this.r > trycvs.canvas.height
        || this.x + this.r > trycvs.canvas.width || this.x - this.r < 0) {
        trytouch.ballArr.splice(index, 1);
        return;
    }
    if (this.part == 'self') {
        for (let i = 0; i < plane.enemyArr.length; i++) {
            let enemy = plane.enemyArr[i];
            let distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
            if (distance <= this.r + enemy.r) {
                enemy.life -= this.damage;
                trytouch.ballArr.splice(index, 1);
                return;
            }
        }
    }
    else if (this.part !== 'self') {
        let self = plane.self;
        let distance = Math.sqrt((this.x - self.x) ** 2 + (this.y - self.y) ** 2);
        if (distance <= this.r + self.r && (self.protecting != true)) {
            self.life = control.updateLife(self.life, -this.damage);
            control.replayAudioEffect("biuAudio");
            self.protecting = true;
            trytouch.ballArr.splice(index, 1);
            return 'protect';
        }
    }
}

trytouch.shootBiuBiu = function (x, y) {
    let xspeedlist = [0];
    let yspeedlist = [-3];
    for (let i = 0; i < xspeedlist.length; i++) {
        let ball = new trytouch.ball('self', 10, x, y, 5, xspeedlist[i], yspeedlist[i],0,false,'red');
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootBiuBiu_enemy = function (x, y) {
    let xspeedlist = [0];
    let yspeedlist = [-3];
    for (let i = 0; i < xspeedlist.length; i++) {
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i], yspeedlist[i],0,false,'cyan');
        trytouch.ballArr.push(ball);
        ball.show();
    }
}


trytouch.shootSevenBulletsForPrincess = function (x, y) {
    let xspeedlist = [-3, -2, -1, 0, 1, 2, 3];
    let yspeedlist = [1, 2, 3, 4, 3, 2, 1];
    let aspeedlist = [-0.5,-0.4,-0.2,0,0.2,0.4,0.5]
    for (let i = 0; i < xspeedlist.length; i++) {
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i], yspeedlist[i],aspeedlist[i],false,'cyan');
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootHellPrincess = function (x, y) {
    let xspeedlist = [-3, -2, -1, 0, 1, 2, 3,4,-4,-3, -2, -1, 0, 1, 2, 3];
    let yspeedlist = [1, 2, 3, 4, 3, 2, 1,0,0,-1,-2,-3,-4,-3,-2,-1];
    for (let i = 0; i < xspeedlist.length; i++) {
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i]/2, yspeedlist[i]/2,0,false,'cyan');
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootSummerSquare_left = function (x, y) {
    let xspeedlist = [-3, -2, -1, 0, 1, 2, 3,4,-4,-3, -2, -1, 0, 1, 2, 3];
    let yspeedlist = [1, 2, 3, 4, 3, 2, 1,0,0,-1,-2,-3,-4,-3,-2,-1];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color;
        if(i%2) color='cyan';
        else color='orange';
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i]/2, yspeedlist[i]/2,0.4,false,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootSummerSquare_right = function (x, y) {
    let xspeedlist = [-3, -2, -1, 0, 1, 2, 3,4,-4,-3, -2, -1, 0, 1, 2, 3];
    let yspeedlist = [1, 2, 3, 4, 3, 2, 1,0,0,-1,-2,-3,-4,-3,-2,-1];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color;
        if(i%2) color='cyan';
        else color='orange';
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i]/2, yspeedlist[i]/2,-0.4,false,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootEvilCircle = function (x, y) {
    let xspeedlist = [-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0,-1,-1.414,-1.732,-2];
    let yspeedlist = [0,-1,-1.414,-1.732,-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color;
        if(i%2) color='cyan';
        else color='orange';
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i], yspeedlist[i],0,false,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootEvilStar_left = function (x, y) {
    let xspeedlist = [-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0,-1,-1.414,-1.732,-2];
    let yspeedlist = [0,-1,-1.414,-1.732,-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color;
        if(i%2) color='cyan';
        else color='orange';
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i], yspeedlist[i],0.2,false,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootEvilStar_right = function (x, y) {
    let xspeedlist = [-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0,-1,-1.414,-1.732,-2];
    let yspeedlist = [0,-1,-1.414,-1.732,-2,-1.732,-1.414,-1,0,1,1.414,1.732,2,1.732,1.414,1,0];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color;
        if(i%2) color='cyan';
        else color='orange';
        let ball = new trytouch.ball('enemy', 10, x, y, 5, xspeedlist[i], yspeedlist[i],-0.2,false,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}

trytouch.shootBloodySnake = function (x, y) {
    let xspeedlist = [0,0,0];
    let yspeedlist = [2,2,2];
    for (let i = 0; i < xspeedlist.length; i++) {
        let color='white';
        let ball = new trytouch.ball('enemy', 20, x, y, 8, xspeedlist[i], yspeedlist[i],0,true,color);
        trytouch.ballArr.push(ball);
        ball.show();
    }
}
