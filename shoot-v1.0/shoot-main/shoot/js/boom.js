var booms={}; 
function draw(x,y) {  
    console.log('drawing');
    var context = trycvs.c;       
    //context.clearRect(0,0,500,500);  
    context.save();  
    //context.translate(x,y);   
    var rg = context.createRadialGradient(0, 0, 0, 100,0,100);  
    rg.addColorStop(0, '#ff0');  
    rg.addColorStop(1, '#f00');  
    context.lineCap = "round";  
    context.strokeStyle=rg;  
    for(var i=1;i<20;i++){  
        if(booms[i] && booms[i].id){  
            spread(booms[i]);  
        }else{  
            var start=random(5,15)+x;  
            var height=random(5,25);  
            var angle=random(10,360);  
            var width=random(1,3);  
            booms[i]=new boom(i,context,start,height,angle,width);  
        }  
        drawLine(booms[i],y);  
    }  
    context.restore();  
    //setTimeout(draw,50);  
}  
  
function spread(boom){  
    boom.start+=5;  
    if(boom.height>3){  
        boom.height-=3;  
        boom.angle+=1;  
    }     
}  
  
function boom(id,ctx,start,height,angle,width){  
    this.id=id;  
    this.ctx=ctx;  
    this.start=start;  
    this.height=height;  
    this.angle=angle;  
    this.width=width;  
    this.maxheight=3*(start+height);  
}  
  
function drawLine(boom,y){  
    if(boom.start+boom.height<boom.maxheight){  
        boom.ctx.lineWidth = boom.width;  
        boom.ctx.save();  
        boom.ctx.rotate(Math.PI*2/360*boom.angle)  
        boom.ctx.beginPath();  
          
        boom.ctx.moveTo(boom.start,y);  
          
        boom.ctx.lineTo(boom.start+boom.height,y)  
        boom.ctx.stroke();  
        boom.ctx.restore();  
    }  
}  
  
function random(start, end) {  
    return Math.round(Math.random() * (end - start) + start);  
} 