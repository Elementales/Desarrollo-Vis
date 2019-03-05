

//the next section of the code changes the displayed canvas, 
//either by nomenclature or by the main visualization

var botonazo=true;
d3.select("button#moveDown")
    .style("visibility", "hidden")
    .style("opacity",0)
    .on("click",function(){
        if(botonazo==true){botonazo=false;
        d3.select("div.lafelicidad").style("opacity",0).style("visibility", "visible").transition().delay(500).duration(500).style("opacity",1)
        d3.select("div#nomenclatura").transition().duration(500).style("left","-100%")
        d3.select("div#nomenclatura").transition().delay(500).style("visibility", "hidden");
        d3.select("#moveDown").text("go to instructional!")}
        else{
        botonazo=true
        d3.select("div.lafelicidad").style("opacity",1).transition().duration(500).style("opacity",0)
        d3.select("div.lafelicidad").transition().delay(500).style("visibility", "hidden")
        d3.select("div#nomenclatura").style("visibility", "visible");
        d3.select("div#nomenclatura").transition().duration(500).style("left","0px").style("opacity",1);
        d3.select("#moveDown").text("go to visualization!")
        }
        
})

//All the folowing lines make the animation of the nomenclature
//I basically created a counter and, for specific values, transitions, text, and figures were added
var nomenclatura= function(s){
    var scribble = new Scribble(s); 
    var imgfav, imgcont,imghap,imgsad;
    var www=parseInt(d3.select("body").style("width"),10);
    var hhh=www*.5;
    var tb;
    var contnom=0;
    var colores=[["North America and ANZ", "rgba(95,125,250"],[" Latin America and Caribbean " ," rgba(122, 239, 126"],
        [" Central and Eastern Europe ", " rgba(83, 237, 255"],[" Western Europe "," rgba(139, 162, 255"],
        [" Commonwealth of Independent States " ," rgba(235, 69, 170"],[" East Asia " ," rgba(255, 244, 146"],
        [" South Asia " ," rgba(243, 200, 215"],[" Southeast Asia "," rgba(253, 165,121"],
        [" Middle East and North Africa ", " rgba(210, 117, 255"],[" Sub - Saharan Africa "," rgba(181, 158, 153"]];
    var radtam=[2,4,6,8,8,6,4];
    var tamaños=[1,2,3,4,5,6,7,6,5,4,3,2];
    var flechpy1,flechpy2;
    var opa1;
    var bol2;
    var bol3;
    var angnom,radialnom;
    
    
    console.log(scribble)
    s.setup=function(){
        imgfav=s.loadImage("imgs/favor.png")
        imgcont=s.loadImage("imgs/contrario.png")
        imgsad=s.loadImage("imgs/triste.png")
        imghap=s.loadImage("imgs/feliz.png")
        var canvas =s.createCanvas(www,hhh);
         tb=s.width*.01;

       }
    s.draw=function(){
        s.randomSeed( 22 );
        s.background(246)
        contnom=contnom+1;
        tb=s.width*.008;
        s.noStroke()
        if(contnom<400){s.fill(colores[parseInt((contnom%400)*.025)][1]+",100)");}
        else{s.fill(colores[2][1]+",100)");}
        s.ellipse(s.width*.26,s.height*.26,tb*1.8,tb*1.8);
        if(50 < contnom && contnom< 80){
            flechpy1=s.map(contnom,80,50,s.height*.274+tb,s.height*.3851);
            s.stroke(112,100,104);
            s.strokeWeight(1);
            s.fill(112,100,104);

            s.triangle(s.width*.26-tb*.3,flechpy1+tb*.3,s.width*.26+tb*.3,flechpy1+tb*.3,s.width*.26,flechpy1-tb*.0);
            scribble.scribbleLine(s.width*.26,flechpy1,s.width*.26,s.height*.3851);
        } 
        else if( 80<= contnom) {
            s.stroke(112,100,104);
            s.strokeWeight(1);
            s.fill(112,100,104);
            s.triangle(s.width*.26-tb*.3,flechpy1+tb*.3,s.width*.26+tb*.3,flechpy1+tb*.3,s.width*.26,flechpy1-tb*.0);
            scribble.scribbleLine(s.width*.26,flechpy1,s.width*.26 ,s.height*.3851);
            s.noStroke();
            s.textSize(1.7*tb);
            s.fill(56,50,52,s.map(contnom,80,140,0,255,true));
            s.textAlign(s.CENTER, s.TOP);
            s.textFont('Annie Use Your Telescope')
            s.text("This is a country. Its",s.width*.26,s.height*.3751+2*tb);
            s.fill(56,50,52,s.map(contnom,120,180,0,255,true));
            s.text("color represents the",s.width*.26,s.height*.3751+4*tb);
            s.fill(56,50,52,s.map(contnom,160,220,0,255,true));
            s.text("the territorial region it",s.width*.26,s.height*.3751+6*tb);
            s.fill(56,50,52,s.map(contnom,200,260,0,255,true));
            s.text("belongs to.",s.width*.26,s.height*.3751+8*tb);
            s.textAlign(s.LEFT, s.CENTER);
            s.textFont('Lato')
            s.textSize(tb*.9);
            if( 300<=contnom){
                for(var i=0;i<10;i++){
                    opa1=s.map(contnom,300+i*20,370+i*20,0,255,true);
                    s.fill(125,113,122,opa1)                
                    s.text(colores[i][0],s.width*.2+.6*tb,s.height*.3751+1.5*i*tb+13*tb);    
                    s.fill(colores[i][1]+","+opa1/255+")")  
                    s.ellipse(s.width*.2,s.height*.3751+1.5*i*tb+13*tb,tb,tb);      
                }
            }
        }

        if(600<=contnom){
            bol2=parseInt((contnom%240)/20);
            s.fill(255, 244, 146);
            if(contnom<930){
                s.ellipse(s.width*.42,s.height*.26,.5*tb+tb*.35*tamaños[bol2],.5*tb+tb*.35*tamaños[bol2]);
            }
            else{s.ellipse(s.width*.42,s.height*.26,.5*tb+tb*.35*7,.5*tb+tb*.35*7);}
            if(600 <= contnom && contnom< 640){ 
                flechpy2=s.map(contnom,640,600,s.height*.274+tb,s.height*.3851);
                s.stroke(112,100,104);
                s.strokeWeight(1);
                s.fill(112,100,104);
                s.triangle(s.width*.42-tb*.3,flechpy2+tb*.3,s.width*.42+tb*.3,flechpy2+tb*.3,s.width*.42,flechpy2-tb*.0);
                scribble.scribbleLine(s.width*.42,s.height*.3851,s.width*.42,flechpy2);
            }
            else if(640<= contnom) {
                s.stroke(112,100,104);
                s.strokeWeight(1);
                s.fill(112,100,104);
                s.triangle(s.width*.42-tb*.3,flechpy2+tb*.3,s.width*.42+tb*.3,flechpy2+tb*.3,s.width*.42,flechpy2-tb*.0);
                scribble.scribbleLine(s.width*.42,s.height*.3851 ,s.width*.42 ,flechpy2);
                s.noStroke();
                s.textSize(1.7*tb);
                s.textAlign(s.CENTER, s.TOP);
                s.textFont('Annie Use Your Telescope')
                s.fill(56,50,52,s.map(contnom,640,700,0,255,true));
                s.text("The size indicates its",s.width*.42,s.height*.3751+2*tb);
                s.fill(56,50,52,s.map(contnom,680,740,0,255,true));
                s.text("civil liberties score.",s.width*.42,s.height*.3751+4*tb);
                s.fill(56,50,52,s.map(contnom,720,780,0,255,true));
                s.text("bigger = better",s.width*.42,s.height*.3751+6.3*tb);
                s.textAlign(s.LEFT, s.CENTER);
                s.textSize(tb*.9);
                s.textFont('Lato');
                s.fill(125,113,122,s.map(contnom,780,850,0,255,true));
                s.text("Out of 7, it considers:",s.width*.36,s.height*.3751+1.5*0*tb+13*tb);               
                s.fill(125,113,122,s.map(contnom,800,870,0,255,true));
                s.text("•Freedom of the expressions and belief",s.width*.36,s.height*.3751+1.5*1*tb+13*tb); 
                s.fill(125,113,122,s.map(contnom,820,890,0,255,true));
                s.text("•Associational and organizational rights",s.width*.36,s.height*.3751+1.5*2*tb+13*tb); 
                s.fill(125,113,122,s.map(contnom,840,910,0,255,true));
                s.text("•Rule of law",s.width*.36,s.height*.3751+1.5*3*tb+13*tb); 
                s.fill(125,113,122,s.map(contnom,860,930,0,255,true));
                s.text("•Personal autonomy and individual rights",s.width*.36,s.height*.3751+1.5*4*tb+13*tb); 

            } 
        }  
        if(930<=contnom){
            radialnom=4*tb;
            if(contnom<1500){angnom=Math.cos(2*Math.PI*(contnom%300)/300)}
            else{angnom=1}
            s.fill(246);
            s.strokeWeight(1);
            s.stroke(112,100,104,s.map(contnom,930,970,0,255,true)); 
            scribble.scribbleEllipse(s.width*.58,.31*s.height,2*radialnom,2*radialnom)
            s.fill(235, 69, 170)
            s.noStroke();
            s.ellipse(s.width*.58+radialnom*Math.cos(2*Math.PI*angnom),s.height*.31+radialnom*Math.sin(2*Math.PI*angnom),tb*1,tb*1);
            s.noStroke();
            s.textSize(1.7*tb);
            s.textAlign(s.CENTER, s.TOP);
            s.textFont('Annie Use Your Telescope')
            s.fill(56,50,52,s.map(contnom,970,1030,0,255,true));
            s.text("Direction and speed",s.width*.58,s.height*.3751+2*tb);
            s.fill(56,50,52,s.map(contnom,1010,1070,0,255,true));
            s.text("represent the",s.width*.58,s.height*.3751+4*tb);
            s.fill(56,50,52,s.map(contnom,1050,1110,0,255,true));
            s.text("effectiveness of",s.width*.58,s.height*.3751+6*tb);
            s.fill(56,50,52,s.map(contnom,1090,1150,0,255,true));
            s.text("their government.",s.width*.58,s.height*.3751+8*tb);
            s.textSize(tb*.9);
            s.textFont('Lato');
            s.textAlign(s.LEFT, s.CENTER);
            s.fill(125,113,122,s.map(contnom,1150,1220,0,255,true));
            s.text("From -2.5 (worst) to +2.5 (better)",s.width*.54,s.height*.3751+1.5*0*tb+13*tb);
            s.fill(125,113,122,s.map(contnom,1170,1240,0,255,true));
            s.text("Speed represents the",s.width*.54,s.height*.3751+1.5*1.2*tb+13*tb);
            s.fill(125,113,122,s.map(contnom,1190,1260,0,255,true));
            s.text("absolute value",s.width*.54,s.height*.3751+1.5*2.2*tb+13*tb);
            s.fill(125,113,122,s.map(contnom,1210,1280,0,255,true));
            s.text("If 0, it won't move",s.width*.54,s.height*.3751+1.5*3.4*tb+13*tb);


            if(1280<=contnom){
                s.fill(125,113,122,s.map(angnom,-1,1,0,255,true));
                s.tint(255, s.map(angnom,-1,1,0,255,true)); 
                s.text("If it's more than 0, will",s.width*.54,s.height*.3751+1.5*4.6*tb+13*tb);
                s.text("move clockwise",s.width*.54,s.height*.3751+1.5*5.6*tb+13*tb); 
                s.image(imgfav,s.width*.568,s.height*.3751+1.5*5.9*tb+13.5*tb,s.width*.019,s.width*.017);    
                s.fill(125,113,122,s.map(angnom,-1,1,255,0,true));
                s.tint(255, s.map(angnom,-1,1,255,0,true)); 
                if(contnom>1500){
                    s.fill(125,113,122,s.map(angnom,-1,1,0,255,true));
                    s.tint(255,s.map(angnom,-1,1,0,255,true)); 
                }
                s.text("If it's less than 0, will",s.width*.54,s.height*.3751+1.5*8.5*tb+13*tb); 
                s.text("move anti-clockwise",s.width*.54,s.height*.3751+1.5*9.5*tb+13*tb); 
                s.image(imgcont,s.width*.568,s.height*.3751+1.5*9.9*tb+13.5*tb,s.width*.019,s.width*.017); 

            }

        } 

        if(1600<=contnom){
            if(contnom<=1900){bol3=parseInt((contnom%210)/30);}
            else bol3=3
            s.fill(246);
            s.strokeWeight(1);
            s.stroke(112,100,104,255);
            s.randomSeed( radtam[bol3] );
            scribble.scribbleEllipse(s.width*.74,s.height*.31,tb*radtam[bol3],tb*radtam[bol3]);
            s.stroke(112,100,104,100);
            for(var i=radtam[bol3];2<=i;i-=2){
                s.randomSeed( i );
                scribble.scribbleEllipse(s.width*.74,s.height*.31,tb*i,tb*i);
            }
            s.strokeWeight(1);
            s.randomSeed(10);
            scribble.scribbleLine(s.width*.69,s.height*.3751+1.5*2*tb+13*tb,s.width*.69+1.6*tb*radtam[bol3],s.height*.3751+1.5*2*tb+13*tb);
            scribble.scribbleLine(s.width*.69,s.height*.3751+1.5*2*tb+13*tb-tb*.3,s.width*.69,s.height*.3751+1.5*2*tb+13*tb+tb*.3);
            scribble.scribbleLine(s.width*.69+1.6*tb*radtam[bol3],s.height*.3751+1.5*2*tb+13*tb-tb*.3,s.width*.69+1.6*tb*radtam[bol3],s.height*.3751+1.5*2*tb+13*tb+tb*.3);
            s.image(imgsad,s.width*.685,s.height*.3751+1.5*0.0*tb+13*tb,s.width*.017,s.width*.018);
            s.image(imghap,s.width*.78,s.height*.3751+1.5*0.0*tb+13*tb,s.width*.017,s.width*.018);
            s.textSize(tb*.9);
            s.textFont('Lato');
            s.textAlign(s.CENTER, s.TOP);
            s.fill(125,113,122,s.map(contnom,1150,1220,0,255,true));
            s.text("0",s.width*.69,s.height*.3751+1.5*2*tb+14*tb);
            s.text("10",s.width*.691+.6*tb*21,s.height*.3751+1.5*2*tb+14*tb);
            s.noStroke();
            s.fill(210, 117, 255);
            s.ellipse(s.width*.74,s.height*.31+.5*tb*radtam[bol3],tb*1,tb*1);
            s.textSize(1.7*tb);
            s.textFont('Annie Use Your Telescope');
            s.textAlign(s.CENTER, s.TOP);
            s.fill(56,50,52,s.map(contnom,1640,1700,0,255,true));
            s.text("The distance from the",s.width*.74,s.height*.3751+2*tb);
            s.fill(56,50,52,s.map(contnom,1680,1740,0,255,true));
            s.text("center to the orbits",s.width*.74,s.height*.3751+4*tb);
            s.fill(56,50,52,s.map(contnom,1720,1780,0,255,true));
            s.text("represents the world",s.width*.74,s.height*.3751+6*tb);
            s.fill(56,50,52,s.map(contnom,1760,1820,0,255,true));
            s.text("happiness report score.",s.width*.74,s.height*.3751+8*tb);
            s.fill(56,50,52,s.map(contnom,1800,1860,0,255,true));
            s.text("farther = better",s.width*.74,s.height*.3751+10.3*tb);
            s.textFont('Lato')
            s.textSize(tb*.9);
        }
        if(contnom==10){d3.select("button#moveDown")
                .transition()
                .duration(500)
                .style("opacity", "1");}
        if(contnom>10){ 
            d3.select("button#moveDown").style("visibility", "visible");
        }  
    };

    s.windowResized=function() {

        var www=parseInt(d3.select("body").style("width"),10);
        var hhh=www*.5;
        s.resizeCanvas(www,hhh);
        tb=s.width*.008;
        flechpy1=s.map(140,140,100,s.height*.274+tb,s.height*.4);
        flechpy2=s.map(440,440,400,s.height*.274+tb,s.height*.4);
        
        
    }
}