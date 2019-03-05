
//For the three insights, we used exactly the same type of visualization, 
//so I created a function such that the database and the html-father element of the canvas were variable
//Here I call the function
createainsight("insight1");
createainsight("insight2");
createainsight("insight3");


//Here the function is defined. In fact, the code is very similar to the main visualization (scriptplanetas.js)
function createainsight(insight){

    var insight_=function(p){
        var table;
        p.preload=function(){
            table=p.loadTable("./datos/"+insight+".csv","csv","header");
        }
        var w=parseInt(d3.select("div#"+insight).style("width"),10);
        var the,rad,ww,col,N,dang,centro,r,tbol,conta,hd,dtail;
        conta=1;
        var nombre;
        p.setup=function(){
            dtail=.01
            dang=.002;
            N=table.getRowCount();
            p.background(246);
            var canvas =p.createCanvas(w,w);
            imgsad=p.loadImage("imgs/triste.png")
            imghap=p.loadImage("imgs/feliz.png")
            p.noStroke();
            the=new Array(N);
            rad=new Array(N);
            ww=new Array(N);
            col=new Array(N);
            centro = p.width*.5;
            r=.45*p.width
            for (var i = 0; i < N; i++) {
                the[i]=2*Math.PI*Math.random();
                rad[i]=p.map(table.getNum(i,5),0,10,0,r);
                ww[i]=p.map(table.getNum(i,4),-2.5,2.5,-10,10);
            }
        }
        p.draw=function(){
            if($( ".imginsaights.rotador" ).hasClass( "down" )){

            p.background(246);
            p.fill(246);
            p.stroke(176)
            p.strokeWeight(1);
            for(var ii =10; ii >1;ii-=2){
                p.randomSeed(ii);
                p.noStroke()
                p.fill(112,100,104);
                p.textSize(p.width*.035);
                p.textAlign(p.LEFT, p.CENTER);
                p.textFont('Annie Use Your Telescope')
                p.text(ii,.5*p.width*1.03+p.map(ii,0,10,0,r),centro);
                p.fill(246,0);
                p.stroke(112,100,104,150)
                p.ellipse(p.width*.5,p.width*.5,p.map(ii,0,10,0,2*r),p.map(ii,0,10,0,2*r));

            }
            p.noStroke()
            p.fill(112,100,104);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("0",centro,centro);
            p.image(imgsad,centro-.012*p.width,centro+.02*p.width,.03*p.width,.03*p.width)
            p.image(imghap,.5*p.width*1.03+r,centro+.02*p.width,.03*p.width,.03*p.width)        
            if(p.dist(p.mouseX,p.mouseY,centro,centro)<centro){dang=.0004;}
            else{dang=.0015;}
            
                
                    for (var i = 0; i < N; i++) {

                        hd=Math.round(p.map(table.getNum(i,2),0,1,0,20));
                        tbol=1.5*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width);
                        the[i]=the[i]+dang*ww[i];
                        p.fill("rgb"+table.getString(i,7));
                        p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                        if(p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                            p.fill(100);
                            nombre=table.getString(i,1);  }
                    }
                    for (var i = 0; i < N; i++) {

                        if(nombre == table.getString(i,1) && p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                   
                            tbol=1.8*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width)
                            p.noFill()
                            p.stroke(100)
                            p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                            p.fill(100)
                            p.noStroke()
                            p.text(nombre,p.mouseX,p.mouseY);   
                        }
                    }
                }
        };
        p.windowResized=function() {
            w=parseInt(d3.select("div#"+insight).style("width"),10)
            p.resizeCanvas(w, w);
            centro = w*.5;
            r=.45*w;
            for (var i = 0; i < N; i++) {
                rad[i]=p.map(table.getNum(i,5),0,10,0,r);
            }
        }
    }
    var mynom=new p5(insight_,insight);

}