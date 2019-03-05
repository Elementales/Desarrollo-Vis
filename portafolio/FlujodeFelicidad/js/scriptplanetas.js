//This data visualization was made using mainly the p5.js and d3.js libraries
//Here we use the angular velocity, the radial distance,the size 
//and the color of each circle as elements to encoding data



//This part just show or hide credits and insights sections
$(".imgcreds").click(function () {
    $(this).toggleClass("down");
    $(".creditos").toggleClass("down");
    $(".imgcredits").toggleClass("down")

});
$(".imginsaights").click(function () {
    $(".imginsaight").toggleClass("down")
    $(".imginsaights").toggleClass("down")
    if($( ".imginsaights.rotador" ).hasClass( "down" )){
        d3.select(".insightsall").style("visibility","visible");
    }
    else{d3.select(".insightsall").style("visibility","hidden")}

})




//Here start the main visualization

var planetas=function(p){
    //Loading data
    var table;
    p.preload=function(){
        table=p.loadTable("./datos/happinessccf.csv","csv","header");
    }
    var w=parseInt(d3.select("div#felicidadvis").style("width"),10);
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
        r=.43*p.width
        for (var i = 0; i < N; i++) {
            the[i]=2*Math.PI*Math.random();
            rad[i]=p.map(table.getNum(i,5),0,10,0,r);
            ww[i]=p.map(table.getNum(i,4),-2.5,2.5,-10,10);
        }
    }
    p.draw=function(){
        if($( ".imginsaights.rotador" ).hasClass( "down" )==false){

        p.background(246);
        p.fill(246);
        p.stroke(176)
        p.strokeWeight(1);
        for(var ii =10; ii >=2;ii-=2){
            p.randomSeed(ii);
            p.noStroke()
            p.fill(112,100,104);
            p.textSize(p.width*.025);
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
        p.image(imgsad,centro-.01*p.width,centro+.02*p.width,.025*p.width,.025*p.width)
        p.image(imghap,.5*p.width*1.03+r,centro+.02*p.width,.025*p.width,.025*p.width)
        p.noStroke();
        if(p.dist(p.mouseX,p.mouseY,centro,centro)<centro){dang=.0004;}
        else{dang=.0015;}
        //The following conditionals display just the country or the region if there is any one selected or all the countries if not 
        if( $("#regions" ).val()=="Select a region"){
            if($( "#countries" ).val()=="Select a country"){
                for (var i = 0; i < N; i++) {

                    hd=Math.round(p.map(table.getNum(i,2),0,1,0,20));
                    tbol=1.5*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width);
                    the[i]=the[i]+dang*ww[i];
                    p.fill(table.getString(i,6)+","+1+")");
                    p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                    if(p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                        p.fill(100);
                        nombre=table.getString(i,1);  }
                }
            }
            else{
                for (var i = 0; i < N; i++) {
                    hd=Math.round(p.map(table.getNum(i,2),0,1,0,20));
                    tbol=1.5*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width);
                    the[i]=the[i]+dang*ww[i];
                    if($( "#countries" ).val()==table.getString(i,1)){
                        p.fill(table.getString(i,6)+","+1+")");
                    }
                    else{
                        p.fill(table.getString(i,6)+","+.05+")");
                    }
                    p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                    if(p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                        p.fill(100);
                        nombre=table.getString(i,1);   }
                }

            }
        }
        if($( "#countries" ).val()=="Select a country"){
            if($( "#regions" ).val()=="Select a region" ){
                for (var i = 0; i < N; i++) {
                    hd=Math.round(p.map(table.getNum(i,2),0,1,0,20));
                    tbol=1.5*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width);
                    the[i]=the[i]+dang*ww[i];
                    p.fill(table.getString(i,6)+","+1+")");
                    p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                    if(p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                        p.fill(100);
                        nombre=table.getString(i,1);   }
                }
            }
            else{
                for (var i = 0; i < N; i++) {
                    hd=Math.round(p.map(table.getNum(i,2),0,1,0,20));
                    tbol=1.5*p.map(table.getNum(i,3),1,7,.021*p.width,.007*p.width);
                    the[i]=the[i]+dang*ww[i];
                    if($( "#regions" ).val()==table.getString(i,0)){
                        p.fill("rgba"+table.getString(i,7).split(")")[0]+","+1+")");
                    }
                    else{
                        p.fill(table.getString(i,6)+","+.05+")");
                    }
                    p.ellipse(centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]),tbol,tbol);
                    if(p.dist(p.mouseX,p.mouseY,centro+rad[i]*Math.cos(the[i]),centro+rad[i]*Math.sin(the[i]))<tbol*1.){
                        p.fill(100);
                        nombre=table.getString(i,1);   }
                }

            }
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
    }};
    p.windowResized=function() {
        w=parseInt(d3.select("div#felicidadvis").style("width"),10)
        p.resizeCanvas(w, w);
        centro = w*.5;
        r=.43*w;
        for (var i = 0; i < N; i++) {
            rad[i]=p.map(table.getNum(i,5),0,10,0,r);
        }
    }
}



// in the next part of the code the  countries and regions selectors were created using d3.js
d3.select("img.botondataviz").on("click",function(){
    d3.select("div.imginsaight").style("visibility","visible");
    d3.select("div.inicio").style("visibility", "hidden");
    var selectcountry=d3.select("ul.countries");
    d3.csv("./datos/happinessccf.csv",function(error,data){
        selectcountry.selectAll("opciones")
            .data(data.sort(function(a,b){return d3.ascending(a.indicator,b.indicator)}))
            .enter()
            .append("li")
            .attr("class", "countr")
            .text(function(d){return d.indicator})
        d3.selectAll("li.countr").on("click",function(){
            d3.select("ul.efimreg").remove();
            d3.select("button#countries").attr("value",this.textContent)
                

            if(this.textContent!="Select a country"){
                var colorr=data.filter(function(d){ return d.indicator == $("button#countries").val() })[0].Coll
                d3.select("li.paiseleccionado")
                    .text(this.textContent)
                    .style("border-style","solid")
                    .style("border-width","2px")
                    .style("border-color", colorr+",100)")
                d3.select("button#regions").attr("value","Select a region")
            }
            else{d3.select("button#regions").attr("value","Select a region")
                d3.select("li.paiseleccionado").text("")
                d3.select("li.paiseleccionado").style("border-color","rgb(246,246,246)")}
            })
    
        d3.selectAll("li.reg").on("click",function(){
            d3.select("button#regions").attr("value",this.textContent)
            d3.select("button#countries").attr("value","Select a country")
            d3.select("li.paiseleccionado").text("")
            d3.select("li.paiseleccionado").style("border-color","rgb(246,246,246)")
            if($("#regions").val()!="Select a region"){
                d3.select("ul.efimreg").remove();
                var colorr =data.filter(function(d){ return d.population == $("button#regions").val() })[0].Coll

                var nl=d3.select("div.panelizq").append("ul").attr("class","efimreg");
                nl.append("li").text($("button#regions").val())
                    .style("font-family",'Annie Use Your Telescope')
                    .style("font-size","calc(8px + .6vw)")
                    .style("padding-left","calc(6px + .6vw)")
                    .style("border-style","solid")
                    .style("border-width","2px")
                    .style("border-color", colorr+",100)")
                nl.selectAll("efim").data(data.filter(function(d){ return d.population == $("button#regions").val() }))
                    .enter()
                    .append("li").style("background",function(d){return "rgb"+d.Col2; console.log(d.Col2)})
                    .text(function(d){return d.indicator})
                    .attr("class","nomenc")
            }
            else{d3.select("ul.efimreg").remove();}
        })
    })
    


    var mynom=new p5(nomenclatura,"nomenclatura");


    var myp5 = new p5(planetas, 'felicidadvis');


})
