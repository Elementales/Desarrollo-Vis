//This script contains a Kuramoto model simulation  make a social data visualization
//It is someting like an experiment, were We tried to make a metaphor between the 
//opinion sincronization in social networks and sincronization in dinamical systems
//The chosen theme was abortion given the relevance it took in 2018
//The most important library used here is p5.js (Processing for Javascript )
//First the data is preloading

var table;
function preload(){
   table=loadTable("./datos/opinion3.csv","csv","header");
}
// The variables are defined. I used a canvas width equal to the body width
var w=parseInt(d3.select("body").style("width"),10);
var dphi=0;
var phi1;
var esc=50;
var N=70000/esc;          //In the real data, 68,797 tweets were register on 08 / August / 2018, so I fixed 70,000 like the max value and it's divided by 50 because each element corresponds to 50 tweets
var r=0, K, cosp, sinp;   //these variables are used in the Kuramoto model   
var afavor, encontra;     //number of tweets for and against abortion
var porfav;               //percentage of for abortion tweets
var ww,the,posy;          //these variables will be used for create an array with angular velocity, angular position and the random y-axis position
var reng;                 //the row of the table selected
var texto;
var txt;

var k1, k2, k3, k4;       //Runge-Kutta variables
const h=.06; 
var phi=0;


var nroj;
var deltapi=.1;           //Speed
var meses;                //Months 
var img;                  //nomenclature image
var fecha;                //date

function setup(){
  img=loadImage("./imgs/nomenclatura.png");
  meses=["Ene","Feb","Mar","Abr","May","Jun","Ago","Sep","Oct"];  
  background(250);
  var canvas =createCanvas(w,w*900/1920);
  canvas.parent("vischoquedeolas");
  noStroke();
  posy=new Array(N);
  ww= new Array(N);
  the=new Array(N);
  for(var i=0;i<N;i++){              //the initial configuration for the Kuramoto model
    ww[i]=1+randomGaussian()*1.0;
    the[i]=Math.PI;
    posy[i]=random(.3,.9);
  };


}

function draw(){
  background(1,12,21);
  reng=int(map(mouseX,width*.1,width*.9,0,table.getRowCount()));   //selecting a row of the table depending on the mouse-X position
  if(reng<0){reng=0;}
  if(reng>table.getRowCount()-1){reng=table.getRowCount()-1;}
  afavor=table.getNum(reng,3);
  encontra=table.getNum(reng,4);
  porfav=100.*afavor/(afavor+encontra);

  strokeWeight(1);
  noStroke();  
  fill(204, 218, 214);
  textSize(40*width/1920);
  textFont("Abril Fatface");
  
  textSize(18*width/1920);
  textFont("Open Sans");

  fecha="0"+table.getString(reng,2);
  fecha=str(fecha.charAt(fecha.length-2))+str(fecha.charAt(fecha.length-1));
  textSize(25*width/1920);
  textAlign(LEFT, CENTER);
  text(fecha+"/"+meses[table.getNum(reng,1)-1],width*.1,height*.05);
  //The following texts are only displayed for specific dates
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="19/Feb"){
    text('“Pañuelazo” en Argentina bajo el lema #AbortoLegalYa.',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('Miles de mujeres marchan para exigir una nueva ley de aborto',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="01/Mar"){
     text(' Ante las declaraciones de la titular del Instituto Nacional de Desarrollo Social en México sobre no tener atribuciones para',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('realizar actividades de distribución y divulgación del aborto, organizaciones defensoras señalan que esto va contra los',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('derechos humanos de las mujeres, de la visión y objetivo del instituto, además de apuntar hacia la discriminación',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="02/Mar"){
     text(' Michelle Bachelet es interrumpida durante la ceremonia de inicio de período de formación',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('de especialistas y destinación de médicos a la Salud Pública, donde se le trata de entregar una  ',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('carta con razones anti-aborto y contra la Ley de Aborto en 3 causales en Chile',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="06/Mar"){
    text('“Pañuelazo” en Paraná, Argentina para acompañar',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('presentación del proyecto de Ley para el Aborto Legal',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="25/Mar"){
    text('Marcha del movimiento Provida en el marco',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('del Día del Niño por Nacer en Argentina.',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('Se les une Madrid entre otras ciudades',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="10/Abr"){
    text('Inicia en Argentina el debate de diputados',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('sobre la despenalización del aborto',(26*width/1920)*2+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="04/Jun"){
      textAlign(RIGHT, CENTER);
    text('Marcha feminista en Argentina bajo el lema #NiUnaMenos pone',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('en agenda pública feminicidios y demanda medidas para evitarlos,',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('una de esas medidas es el aborto legal, seguro y gratuito',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="14/Jun"){
        textAlign(RIGHT, CENTER);
    text('La Ley de Interrupción Voluntaria del Embarazo es aprobada por la Cámara',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('de Diputados de Argentina. Se otorga el derecho a interrumpir el embarazo',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('durante las primeras 14 semanas en cualquier hospital público,',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
    text(' además obliga a centros de salud a garantizar esta práctica',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*4.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="16/Jun"){
    textAlign(RIGHT, CENTER);
    text('El papa Francisco considera el aborto como un',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('“homicidio de niños” y lo compara con prácticas nazis',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="01/Ago"){
     textAlign(RIGHT, CENTER);
    text('Fin de los debates iniciados el 3 de julio llevados a cabo por las comisiones',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text(' de Salud, Justicia y Asuntos Penales y Constitucionales acerca del proyecto ',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text('de Ley de Legalización y Despenalización del Aborto',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="07/Ago"){
     textAlign(RIGHT, CENTER);
    text('Expectativas al límite, indecisos definirán la votación. Durante dos meses expusieron,',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('a favor y en contra de la iniciativa, más de 700 personas de la sociedad civil,',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
    text(' entre ellos científicos, artistas, líderes religiosos, médicos y abogados',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*3);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="08/Ago"){
     textAlign(RIGHT, CENTER);
    text('Se debate sobre la legalización del aborto dentro del Senado de Argentina. Se movilizan grupos',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('de mujeres en toda América Latina, se pronuncian argumentos en contra y a favor',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  if(fecha+"/"+meses[table.getNum(reng,1)-1]=="09/Ago"){
     textAlign(RIGHT, CENTER);
    text('El Senado argentino rechaza la despenalización del aborto, la diferencia de votos',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1);
    text('es corta: 31 a favor, 38 en contra y 2 abstenciones',-(26*width/1920)*1+map(reng,0,table.getRowCount(),.1*width,.9*width),height*.1+(26*width/1920)*1.5);
  }
  textSize(25*width/1920);
  N=int(int(afavor+encontra)/esc);
  fill(204, 218, 214);
  textFont("Abril Fatface");
  cosp=0;
  sinp=0;
  phi1=phi;
  phi=0;
  strokeWeight(2*width/1920);
  for(var i =1;i<=reng;i++){ //the time serie is drawn here
    stroke(114,217,90);
    line(map(i-1,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(i-1,3),0,70000,.27*height,.02*height),map(i,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(i,3),0,70000,.27*height,.02*height));    
    stroke(0,158,204);
    line(map(i-1,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(i-1,4),0,70000,.27*height,.02*height),map(i,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(i,4),0,70000,.27*height,.02*height));  
  }
  textSize(20*width/1920);
  noStroke(); 
  textAlign(LEFT, CENTER);
  fill(114,217,90);

  //The following conditionals display the number of tweets for and against abortion
  if(table.getNum(reng,3)>1000){txt=table.getNum(reng,3)/1000.;
    if(int(txt)>10){texto=int(txt)+","+str(txt-int(txt)).charAt(2)+"K";}
    else{texto=int(txt)+","+str(txt-int(txt)).charAt(2)+str(txt-int(txt)).charAt(3)+"K";}  
  }
  else{texto=str(table.getNum(reng,3));
  }  
  if(table.getNum(reng,3)>table.getNum(reng,4)){
    textAlign(LEFT, BOTTOM);
    text(texto,map(reng,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(reng,3),0,70000,.27*height,.02*height)-height*.01);
  }
  else{textAlign(LEFT, TOP);
    text(texto,map(reng,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(reng,3),0,70000,.27*height,.02*height)+height*.01);
  }
  fill(0,158,204);
  if(table.getNum(reng,4)>1000){txt=table.getNum(reng,4)/1000.;
    if(int(txt)>10){texto=int(txt)+","+str(txt-int(txt)).charAt(2)+"K";}
    else{if(str(txt-int(txt)).length>3){texto=int(txt)+","+str(txt-int(txt)).charAt(2)+str(txt-int(txt)).charAt(3)+"K";}else{texto=int(txt)+","+str(txt-int(txt)).charAt(2)+"K";}}  
  }
  else{texto=str(table.getNum(reng,4));}
    
  if(table.getNum(reng,3)>table.getNum(reng,4)){
    textAlign(LEFT, TOP);
    text(texto,map(reng,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(reng,4),0,70000,.27*height,.02*height)+height*.01);
  }
  else{
    textAlign(LEFT, BOTTOM);
    text(texto,map(reng,0,table.getRowCount(),.1*width,.9*width),map(table.getNum(reng,4),0,70000,.27*height,.02*height)-height*.01);
  }

  //The following lines model the dynamic system, where tweets with the majority opinion are synchronized and the minority is assigned a desynchronized coupling value
  for(var i=0;i<N;i++){
    phi=phi+the[i];
    cosp=cosp+cos(the[i]);
    sinp=sinp+sin(the[i]);
  };
  
  phi=phi/the.length;
  dphi=phi-phi1;
  nroj=0;

  for(var i=0;i<N;i++){
    if(encontra<afavor){
    if(i>int(encontra/esc)){K=2+1.5*r; fill(0,217,90);nroj=nroj+1;}else{K=.5; fill(0,158,255);}
    }else{if(i>int(afavor/esc)){K=2+1.5*r; fill(0,158,255);nroj=nroj+1;}else{K=.5; fill(0,217,90);}} 
    k1=thepunto(ww[i],K,r,phi1,the[i]);
    k2=thepunto(ww[i],K,r,phi1,the[i]+k1*.5*h);
    k3=thepunto(ww[i],K,r,phi1,the[i]+k2*.5*h);
    k4=thepunto(ww[i],K,r,phi1,the[i]+k3*h);
    the[i]=the[i]+h*(k1+2*k2+2*k3+k4)/6.;
    ellipse(.4*width*sin(the[i])+.5*width,posy[i]*height,.5+4*width/1920,.5+4*width/1920);
  };

  r=sqrt(sq(sinp)+sq(cosp))/N;
  image(img,width*.77,height*.56,width*.23,width*.23*695/1448);

};

function thepunto(omega,  acoplamiento, porden, phase, thei){ //this function describe the Kuramoto Model for a infinity number of particles
    var c = omega+acoplamiento*porden*sin(phase-thei);
    return c;
};


function windowResized() {                                  //Here We only adjust the size of the canvas if the screen is resized
  resizeCanvas(windowWidth, windowWidth*900/1920);
}