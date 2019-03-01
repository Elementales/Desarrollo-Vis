var pixcol
var img
var bichos=new Array(300)
function preload(){
     img = loadImage("imgs/índice.jpeg");
}
function setup() {
     createCanvas(img.width,img.height);
     for (var i = bichos.length - 1; i >= 0; i--) {
          bichos[i]=new lineas(random(0,width),random(0,height),0,5+random(0,20),250)
     }  
  background(0);
  console.log(img)
}

function draw() {
     //image(img,0,0)
for (var i = bichos.length - 1; i >= 0; i--) {
     bichos[i].move();
     bichos[i].display();
     bichos[i].move2();
     img.loadPixels();
     pixcol=(floor(bichos[i].x2)+img.width*floor(bichos[i].y2))*4;
     //bichos[i].col=2*(img.pixels[pixcol],img.pixels[pixcol+1],img.pixels[pixcol+2])/3.;
     bichos[i].col=[img.pixels[pixcol],img.pixels[pixcol+1],img.pixels[pixcol+2]];
     
     bichos[i].anch=(img.pixels[pixcol],img.pixels[pixcol+1],img.pixels[pixcol+2])/2000.;
}
}
function lineas(xi,yi,anch,saltos,col){
    this.anch=anch
    this.x1=xi;
    this.y1=yi;
    this.col=col;
    this.x2=xi;
    this.y2=yi;
    this.speed=saltos;
    this.move=function(){
    this.x2=this.x2+random(-this.speed,this.speed)
    this.y2=this.y2+random(-this.speed,this.speed)}
    this.display=function(){
          strokeWeight(2*this.anch)
        stroke(this.col)
        //stroke(250)
        line(this.x1,this.y1,this.x2,this.y2)
    
    }
    this.move2=function(){
        this.x1=this.x2
        this.y1=this.y2
    }

}
