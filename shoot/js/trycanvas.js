class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var trycvs = trycvs || {};
trycvs.drawLine = function (c, x1, y1, x2, y2, strokeStyle, lineWidth) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = strokeStyle;
    c.lineWidth = lineWidth;
    c.stroke();
    c.closePath();
}

trycvs.drawArc = function (c, x, y, r, rad1, rad2, anti, strokeStyle, fillStyle, lineWidth) {
    c.beginPath();
    c.strokeStyle = strokeStyle;
    c.lineWidth = lineWidth;
    c.arc(x, y, r, rad1, rad2, anti);
    c.fillStyle = fillStyle;
    c.fill();
    c.stroke();
    c.closePath();
}


trycvs.canvas = $(`#playcanvas`)[0];
//trycvs.canvas=document.querySelector(`#playcanvas`);
trycvs.c = trycvs.canvas.getContext('2d');
trycvs.beginPoint = new Point(100, 100);
trycvs.endPoint = new Point(200, 200);
trycvs.beginPoint.x = 100;
trycvs.beginPoint.y = 100;
trycvs.endPoint.x = 500;
trycvs.endPoint.y = 200;
trycvs.randomColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
trycvs.test = function () {
    trycvs.drawLine(trycvs.c, trycvs.beginPoint.x, trycvs.beginPoint.y, trycvs.endPoint.x, trycvs.endPoint.y, trycvs.randomColor, 5);
    trycvs.c.rect(100, 200, 20, 50);
    trycvs.c.stroke();
    //trycvs.drawArc(trycvs.c,250,250,100,0,Math.PI,true,trycvs.randomColor,trycvs.randomColor,5);
    var deg = Math.PI * 2 / 360;
    var count = 0;
    trycvs.timer = setInterval(function () {
        count++;
        let randomColor_fill = '#' + parseInt(Math.random() * 0xffffff).toString(16);
        trycvs.drawArc(trycvs.c, 250, 250, 100, 0, count * deg, false, trycvs.randomColor, randomColor_fill, 5);
        if (count >= 360)
            clearInterval(trycvs.timer);
    }, 10)
}






