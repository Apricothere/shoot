var control = control || {};

control.boomAt = function (x, y, r) {
    var imgs = document.getElementsByClassName('explode');
    var cxt = trycvs.c;
    let count = 0;
    let intv = setInterval(function () {
        count++;
        let label = parseInt(count / 10);
        if (label >= imgs.length) clearInterval(intv);
        else cxt.drawImage(imgs[label], x - 3 * r, y - 2.5 * r, 6 * r, 5 * r);
    }, 7)
    /*
    for (var i=0;i<imgs.length;i++)
    {
        img=imgs[i];
        cxt.drawImage(img,0,0);
    }*/
    /*
        let count=0;
        let intv=setInterval(function ()
        {
            count++;
            cxt.drawImage(img, 0, 0);
            if(count>2000) clearInterval(intv);
        }, 1);*/
}

control.gameOver = function () {
    plane.enemyArr = [];
    trytouch.ballArr = [];
    let res = confirm(`你挂了，真惨，
    重新开始吗？`);
    return res;
}

control.gameWin = function () {
    plane.enemyArr = [];
    trytouch.ballArr = [];
    let res = confirm(`你赢了，真棒！
    重新开始吗？`);
    return res;
}

control.reStart = function () {
    trycvs.c.clearRect(0, 0, trycvs.canvas.width, trycvs.canvas.height);
    count = 0;
    protectStartCount = 0;
    control.score = 0;
    control.currentStage = 0;
}

control.replayAudioEffect = function (id) {
    document.getElementById(id).currentTime = 0;
    document.getElementById(id).play();
}

control.updateLife = function (life, addNum) {
    life += addNum;
    let lifeNum = document.getElementById("life");
    lifeNum.innerText = String(life);
    return life;
}

control.updateScore = function (score, addNum) {
    score += addNum;
    let scoreNum = document.getElementById("score");
    scoreNum.innerText = String(score);
    return score;
}

control.initialize = function () {
    control.initStage();
    plane.selfBirth(1);
    var bgm = document.getElementById("bgm");
    bgm.loop = true;
    control.updateLife(plane.self.life, 0);
    control.updateScore(control.score, 0);
}

control.stage = function (index, maxEnemyCount, lastTime, isLastTime = false) {
    this.index = index;
    this.maxEnemyCount = maxEnemyCount;
    this.enemyCount = 0;
    this.ready = false;
    this.lastTime = lastTime;
    this.isLastTime = isLastTime;
    this.enterTime = 0;
    this.clear = false;
}

control.stage.prototype.nextStage = function (enemyArr, count) {
    if (!this.isLastTime) {
        if (this.clear && enemyArr.length == 0) {
            if (this.index == control.stageList.length - 1) return 'win';
            else {
                control.stageList[this.index + 1].enterTime = count;
                return control.stageList[this.index + 1];
            }
        }
        else return this;
    }
    else {
        if (count - this.enterTime > this.lastTime) {
            control.stageList[this.index + 1].enterTime = count;
            return control.stageList[this.index + 1];
        }
        else return this;
    }
}

control.stageList = [];
control.initStage = function () {
    control.stageList=[];
    for (let i = 0; i < 7; i++) {
        let stage = new control.stage(i, 2, 1500, false)
        console.log(stage);
        control.stageList.push(stage);
        console.log(control.stageList);
    }
    control.stageList[0].isLastTime=true;
    control.stageList[1].maxEnemyCount=1;
    control.stageList[2].isLastTime=true;
    //control.stageList[4].isLastTime=true;
    control.stageList[4].maxEnemyCount=8;
    control.stageList[5].isLastTime=true;
    control.stageList[5].lastTime=500;
    control.stageList[6].maxEnemyCount=1;
    control.currentStage = control.stageList[0];
}

var count = 0;
var protectStartCount = 0;
control.score = 0;
control.currentStage = 0;
var playTime = setInterval(function () {
    //console.log('counter');
    count++;
    trycvs.c.clearRect(0, 0, trycvs.canvas.width, trycvs.canvas.height);
    if (count == 1) { control.initialize(); console.log(control.currentStage) };
    if (bgm.currentTime == 0) bgm.play();
    plane.enemyBirth(count, control.currentStage);
    control.currentStage = control.currentStage.nextStage(plane.enemyArr, count);

    //win
    if (control.currentStage == 'win') {
        trycvs.c.clearRect(0, 0, trycvs.canvas.width, trycvs.canvas.height);
        if (control.gameWin()) {
            count = 0;
            control.reStart();
        }
        else {
            clearInterval(playTime);
            window.open('about:blank', '_self').close();
        }
    }
    //ball
    for (let i = 0; i < trytouch.ballArr.length; i++) {
        let ball = trytouch.ballArr[i];
        ball.show();
        if (ball.death(i) == 'protect') {
            protectStartCount = count;
        };
    }
    //self
    let self = plane.self;
    plane.selfMove(self);
    self.show(protectStartCount, count);
    self.shoot(count);
    self.death();
    //enemy
    for (let i = 0; i < plane.enemyArr.length; i++) {
        let enemy = plane.enemyArr[i];
        enemy.show();
        enemy.shoot(count);
        enemy.death(i);
    }
    if (self.life <= 0) {
        trycvs.c.clearRect(0, 0, trycvs.canvas.width, trycvs.canvas.height);
        if (control.gameOver()) {
            count = 0;
            control.reStart();
        }
        else {
            clearInterval(playTime);
            window.open('about:blank', '_self').close();
        }
    }
}, 10)
