//This code adds all the interactivity of the site. Here the library fullpage was was used to get a scrolling effect,
// d3.js to read and link data and p5.js to load and play bird audios.
//It is worth mentioning that some parts of the visualization were based on the code "https://www.delimited.io/blog/2013/12/19/force-bubble-charts-in-d3"


var colores = d3.scale.ordinal().domain(["sc","Pr","A"]).range(["#85B3C1","#A9CB85","#D8C140"])
var audios={};
var tenpo={1:1.5,2:1.2,3:1,4:.70,5:.5};
var noms={1:"Incremento>50%",2:"Incremento<50%",3:"Incierto/estable",4:"Decremento<50%",5:"Decremento>50%","CE":"Cuasiendémicas","EN":"Endémicas","SE":"Semiendémicas","Exo":"Exóticas","ne":"No endémicas","Gral":"Vista general","SI":"Reportadas","NO":"No reportadas","Pr":"Sujetas a protección especial","A":"Amenazadas","sc":"Sin categoría","":"Sin información"}
var tampob={1:5,2:4,3:3,4:2,5:1};
var textotamp={1:"50 millones mayor a 50%",2:"5 millones-50 millones",3:"500 mil - 5 millones",4:"50 mil - 500 mil",5:"<50,000","":"Sin información"};
var textotend1={1:"Incremento",2:"Incremento",3:"Incierto/",4:"Decremento ",5:"Decremento"}
var textotend2={1:"mayor a 50%",2:"hasta 50%",3:"estable",4:"menor a 50%",5:"mayor a 50%"}

var table=["100", "103", "1065", "106", "108", "109", "1116", "1117", "111","1120", "1127", "1128", "112", "1130", "1131", "1132", "1133","1136", "1138", "1141", "1143", "1144", "1153", "1155", "116","1181", "1183", "1188", "1226", "122", "1234", "1237", "1242","1244", "1245", "1246", "1247", "1250", "1286", "1299", "1301","1316", "1317", "1318", "1336", "1339", "1345", "1362", "1365","1386", "1387", "13", "1402", "1410", "1411", "1429", "1441", "1443","1454", "1474", "1475", "1478", "1480", "1486", "1487", "149","1507", "150", "1517", "1536", "1537", "1538", "1545", "1550","1551", "1552", "1553", "155", "1573", "1574", "1579", "1584","1585", "1599", "1605", "1609", "160", "1620", "162", "163", "164","165", "1677", "1678", "167", "1680", "169", "170", "1716", "1719","171", "1722", "1723", "1746", "174", "1750", "1775", "1788", "1794","1795", "1799", "17", "1800", "1801", "1805", "1806", "1808", "1815","1816", "1817", "1825", "1839", "1845", "1846", "1847", "1856","1860", "1861", "1867", "1869", "187", "1882", "189", "18", "1900","1911", "192", "194", "1952", "195", "1987", "199", "19", "2002","2004", "2008", "2009", "204", "2087", "2088", "2095", "2124", "213","215", "217", "229", "234", "238", "239", "240", "242", "243", "252","259", "260", "265", "333", "338", "346", "348", "351", "362", "364","368", "369", "371", "374", "380", "381", "386", "387", "392", "393","397", "399", "402", "407", "411", "417", "419", "424", "426", "427","433", "439", "441", "445", "446", "447", "453", "454", "463", "465","481", "482", "490", "500", "506", "529", "546", "549", "552", "553","631", "632", "653", "654", "662", "671", "679", "680", "687", "690","696", "697", "721", "729", "740", "761", "785", "795", "807", "814","81", "828", "834", "845", "856", "857", "858", "85", "895", "897","90", "927", "941", "947", "94", "964", "96"];
new fullpage('#fullpage', {
  scrollingSpeed: 1000,
   scrollOverflow: true,
            });
$(document).on('click', '#moveDown', function(){
  fullpage_api.moveSectionDown();
});

if(parseInt(d3.select("body").style("width"),10)>750){
 d3.select("span.informacionvul")
  .on("mouseover",function showPopover () {
          $(this).popover({
            placement: 'auto top',
            container: 'body',
            trigger: 'manual',
            html : true,
            content: "<p class='factool'>Fractores o variables para la evaluación de la vulnerabilidad de especies:</p>"
            +"<ul><li>Tamaño poblacional</li><li>Distribución en reproducción</li><li>Amenazas en la reproducción</li><li>Amenazas en no reproducción</li><li>Tendencia poblacional</li></ul>"
            +"<p class='factool'>Nivel de amenaza </p>"
            +"<ul><li>04 - 10 Leves </li><li>11 - 15 Moderadas a altas</li><li>16 - 20 Muy altas</li></ul>"
          });
          $(this).popover('show')
        })
  .on("mouseout",function removePopovers () {
          $('.popover').each(function() {
            $(this).remove();
          }); 
        })

  
d3.select("div.fichas").style("display","none")
var w1=parseInt(d3.select("img.nomenef").style("width"),10)*.92;
var h1=w1;

d3.selectAll("svg.foto-ficha")
  .style("width",w1+"px")
  .style("height",h1+"px")
d3.selectAll("circle.circulonom")
  .attr("cx",w1*.62)
  .attr("cy",h1*.32)
  .attr("r",w1*.2)
d3.selectAll("image.fotopajaro")
  .attr("x",w1*.15)
  .attr("y",h1*.11)
  .attr("width",w1*.42)
  .attr("height",h1*.42)
var escalavul=d3.scale.linear().domain([0,20]).range([0,w1*.8])
d3.selectAll("rect.barravul")
  .attr("y",h1*.03)
  .attr("x",w1*.15)
  .attr("height",h1*.015)
  .attr("width",0);  
d3.selectAll("text.vultext")
  .attr("y",h1*.037)
  .attr("dominant-baseline","middle")
  .style("font-size",(w1*.04)+"px")
d3.selectAll("text.tamp")
  .style("text-anchor","middle").style("font-size",(w1*.04)+"px")
var w=parseInt(d3.select("#visaves").style("width"),10)
var h=w*11/15.;
        var svg = d3.select("#visaves").append("svg")
            .attr("width", w)
            .attr("height", 1.1*h);
function setup() {
	for(var i=0;i<table.length; i++){	
		var ef =table[i];
		console.log(ef)
		audios[table[i]] =loadSound('datos/audios/'+table[i]+".mp3");}}
var py=.57;

d3.csv('./datos/baseparavisdeavesfinal.csv' ,function (error, data) {
        svg.append("circle").attr("cy",h*.95).attr("cx",w*.17).attr("r",(6-(1))*2*(w/600))
        svg.append("circle").attr("cy",h*.95).attr("cx",w*.24).attr("r",(6-(2))*2*(w/600))
        svg.append("circle").attr("cy",h*.95).attr("cx",w*.31).attr("r",(6-(3))*2*(w/600))
        svg.append("circle").attr("cy",h*.95).attr("cx",w*.38).attr("r",(6-(4))*2*(w/600))
        svg.append("circle").attr("cy",h*.95).attr("cx",w*.45).attr("r",(6-(5))*2*(w/600))
        svg.append("text").attr("y",h*.95).attr("x",w*.14).text("Población").attr("class","poc");
        var t1=svg.append("text").attr("y",h).attr("x",w*.17).attr("class","nomencircs");
        t1.append("tspan").attr("y",h*.98).attr("x",w*.17).text("Mayor a")
        t1.append("tspan").attr("y",h*1).attr("x",w*.17).text("50 millones")
        var t2=svg.append("text").attr("y",h).attr("x",w*.24).attr("class","nomencircs");
        t2.append("tspan").attr("y",h*.98).attr("x",w*.24).text("De 5 a 50")
        t2.append("tspan").attr("y",h*1).attr("x",w*.24).text("millones")
        var t3=svg.append("text").attr("y",h).attr("x",w*.31).attr("class","nomencircs");
        t3.append("tspan").attr("y",h*.98).attr("x",w*.31).text("de 500 mil")
        t3.append("tspan").attr("y",h*1).attr("x",w*.31).text("a 5 millones")
        var t4=svg.append("text").attr("y",h).attr("x",w*.38).attr("class","nomencircs");
        t4.append("tspan").attr("y",h*.98).attr("x",w*.38).text("De 50 a")
        t4.append("tspan").attr("y",h*1).attr("x",w*.38).text("500 mil")
        var t5=svg.append("text").attr("y",h).attr("x",w*.45).attr("class","nomencircs");
        t5.append("tspan").attr("y",h*.98).attr("x",w*.45).text("Menor")
        t5.append("tspan").attr("y",h*1).attr("x",w*.45).text("a 50 mil")



        for (var j = 0; j < data.length; j++) {
          data[j].radius = (6-(data[j].TamPob))*2*(w/600);
          data[j].x = Math.random() * w;
          data[j].y = Math.random() * h;

        }

        var padding = 2*(w/700);
        var maxRadius = d3.max(_.pluck(data, 'radius'));

        var getCenters = function (vname, size) {
          var centers, map;
          centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
          });

          map = d3.layout.treemap().size(size).ratio(1/1);
          map.nodes({children: centers});

          return centers;
        };

        var nodes = svg.selectAll("circle.node")
          .data(data);

        nodes.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
          .attr("r", function (d) { return d.radius; })
          .style("fill", function (d) { return colores(d.NOM59); })
          .on("mouseover",function(d,i){
            console.log(this)
            var esc=.04;
            var poly="";
            poly=(w1*.23)+","+(h1*py)+" "+(w1*.77)+","+(h1*py)+" "
            poly=poly+(w1*.77)+","+(h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob])))+" "+(w1*.23)+","+(h1*(py+esc*tampob[d.TamPob]));

            d3.selectAll("polygon.poblacional")
              .attr("points",poly)
            console.log([d.TamPob,d.TendPob])
            d3.selectAll("text.tenp1")
              .text(textotend1[d.TendPob])
              .attr("x",(w1*.77)).style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
              .attr("y",(h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob])))).style("font-size",(w1*.04)+"px")
            d3.selectAll("text.tenp2")
              .text(textotend2[d.TendPob])
              .attr("x",(w1*.77))
              .style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
              .attr("y",(1.06*h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob])))).style("font-size",(w1*.04)+"px")
            d3.selectAll("text.tamp")
              .text(textotamp[d.TamPob])
              .attr("x",(w1*.23))
              .attr("y",(h1*(py+esc*tampob[d.TamPob])))
              .style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
            
            d3.selectAll("rect.barravul").attr("width",escalavul(parseInt(d.Vulnerabilidad)));
            d3.selectAll("circle.circulonom")
              .style("fill",colores(d.NOM59));
            d3.selectAll("text.vultext")
              .attr("x",w1*.16+escalavul(parseInt(d.Vulnerabilidad)))
              .text(""+d.Vulnerabilidad)
            if(d.Endemismo=="EN"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.48).attr("y",h1*.16).attr("width",w1*.33).attr("height",h1*.33).attr("xlink:href","./Imgs/"+d.Endemismo+".png").style("opacity","1");
              d3.selectAll("circle.circulonom").attr("cx",w1*.62)
              d3.selectAll("image.fotopajaro").attr("x",w1*.18)
            }
            else if(d.Endemismo=="CE"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.53).attr("y",h1*.14).attr("width",w1*.39).attr("height",h1*.39).attr("xlink:href","./Imgs/"+d.Endemismo+".png").style("opacity","1");
              d3.selectAll("circle.circulonom").attr("cx",w1*.52)
              d3.selectAll("image.fotopajaro").attr("x",w1*.15)
            }
            else if(d.Endemismo=="Exo"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.35).attr("y",h1*.09).attr("width",w1*.6).attr("height",h1*.48).attr("xlink:href","./Imgs/"+d.Endemismo+".png").style("opacity","1");
              d3.selectAll("circle.circulonom").attr("cx",w1*.52)
              d3.selectAll("image.fotopajaro").attr("x",w1*.07)
            }
            else if(d.Endemismo=="SE"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.32).attr("y",h1*.15).attr("width",w1*.65).attr("height",h1*.38).attr("xlink:href","./Imgs/"+d.Endemismo+".png").style("opacity","1");
              d3.selectAll("circle.circulonom").attr("cx",w1*.5)
              d3.selectAll("image.fotopajaro").attr("x",w1*.12)
            }
            else if(d.Endemismo=="ne"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.52).attr("y",h1*.18).attr("width",w1*.37).attr("height",h1*.37).style("opacity","0");
              d3.selectAll("circle.circulonom").attr("cx",w1*.62)
              d3.selectAll("image.fotopajaro").attr("x",w1*.15)
            }

            if(d.MIA=="SI"){d3.selectAll("div.fichas").style("background","#d1ece6")}
             else{d3.selectAll("div.fichas").style("background","#ccdbf7")};
             d3.selectAll("image.fotopajaro").attr("xlink:href","./datos/fotoss/"+d.Claves+".png")
             
             d3.selectAll("div.fichas").style("display","inline-block")
             d3.selectAll("div.NombreEsp").text(d.NombreEspa.toUpperCase())
             d3.selectAll("div.NombreCien").text(d.NombreCien)
             d3.selectAll("img.nomenef").style("display","none")
             if( audios[d.Claves].isLoaded()){audios[d.Claves].play()}})
		      
          .on("mouseout",function(d,i){
          

            if(audios[d.Claves].isLoaded()){audios[d.Claves].stop()}})
          d3.select("div.infoficha").on("mouseover",function(){
              d3.select("div.fichas").style("display","none")
             d3.select("img.nomenef").style("display","inline-block")})

        var force = d3.layout.force();

        fdraw('Vista-general');

        $( ".btn" ).click(function() {
          var et=this.id;
          if(et=="moveDown"){et="Vista-general"}
          fdraw(et);
        });

        function fdraw (varname) {


          var centers = getCenters(varname, [w*.9, h*.9]);

         if(varname=="Vista-general"){
            centers[0].x=centers[0].dx*.28;
            centers[0].y=centers[0].dy*.15;
            centers[0].dy=centers[0].dy*1.1;
            d3.select("p.textoint2").style("display","inline-block")
            d3.select("p.textoint1").style("display","inline-block")
         }else{
          d3.select("p.textoint2").style("display","none")
            d3.select("p.textoint1").style("display","none")
         } 
         if(varname=="Endemismo"){
            centers[4].y=h*.57;
            centers[3].y=h*.17;
            centers[2].y=h*.17;
            centers[1].y=h*.17;
            centers[0].y=h*.35;

            centers[4].dy=h*.1;
            centers[3].dy=h*.27;
            centers[2].dy=h*.27;
            centers[1].dy=h*.27;
            centers[0].dy=h*.7;}
     
			console.log(centers)
        	labels(centers,varname)

          force.on("tick", tick(centers, varname));
          force.start();
        }

        function tick (centers, varname) {
          var foci = {};
          for (var i = 0; i < centers.length; i++) {
            foci[centers[i].name] = centers[i];
          }
          return function (e) {
            for (var i = 0; i < data.length; i++) {
              var o = data[i];
              var f = foci[o[varname]];
              o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
              o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
            }
           nodes.each(collide(.1,varname))
              .attr("cx", function (d) { return  d.x = Math.max(d.radius, Math.min(w - d.radius, d.x));  })
              .attr("cy", function (d) { return   d.y = Math.max(d.radius, Math.min(h - d.radius, d.y));  });
          }
        }
        function labels (centers,varname) {
          svg.selectAll(".label").remove();

          svg.selectAll(".label")
          .data(centers).enter().append("text")
          .attr("class", "label")
          .text(function (d) { if(varname!="Vulnerabilidad"){return noms[d.name]}else{return d.name} })
          .style("dominant-baseline","baseline")
          .style("text-anchor","middle")
          .attr("transform", function (d) {
            return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + d.dy/10) + ")";
          });
        }


        function collide(alpha,varname) {
          var quadtree = d3.geom.quadtree(data);
          return function (d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {

                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,

                    l = Math.sqrt(x * x + y * y);

                if(varname=="Vista-general"){padding=390*w*(1/(l))/700}
                else if(varname=="NOM59"){padding=300*w*(1/(l))/700}
                else if(varname=="MIA"){padding=300*w*(1/(l))/700}
                else{padding=200*w*(1/(l))/700}
                var r = d.radius + quad.point.radius + padding;
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }
      });
}
else{

  d3.select("img#colbotoncerr")
    .on("click",function(d,i){
      
      d3.selectAll("div.fichamovil").style("display","none")});
  
  d3.selectAll("div.NombreEsp").style("margin","0px")
  d3.select("div.infoficha").style("display","none")
    var w1=parseInt(d3.select("body").style("width"),10)*22/24;
    var h1=w1;

  d3.selectAll("svg.foto-ficha")
    .style("width",w1+"px")
    .style("height",h1+"px")

  d3.selectAll("circle.circulonom")
  .attr("cx",w1*.62)
  .attr("cy",h1*.32)
  .attr("r",w1*.2)
  d3.selectAll("image.fotopajaro")
  .attr("x",w1*.15)
  .attr("y",h1*.1)
  .attr("width",w1*.4)
  .attr("height",h1*.4)
  var escalavul=d3.scale.linear().domain([0,20]).range([0,w1*.8])
  d3.selectAll("rect.barravul")
  .attr("y",h1*.03)
  .attr("x",w1*.15)
  .attr("height",h1*.015)
  .attr("width",0);  
  d3.selectAll("text.vultext")
  .attr("y",h1*.037)
  .attr("dominant-baseline","middle")
  .style("font-size",(w1*.04)+"px")
  d3.selectAll("text.tamp")
  .style("text-anchor","middle").style("font-size",(w1*.04)+"px")

  var w=parseInt(d3.select("div.row.losbotones").style("width"),10);
  var h=w*2.6;
  var svgef=d3.select("#visaves").append("svg").attr("width", w)
    .attr("height", w*.3);
  svgef.append("circle").attr("cy",w*.13).attr("cx",w*.25).attr("r",(6-(1))*2*(w/170));
        svgef.append("circle").attr("cy",w*.13).attr("cx",w*.4).attr("r",(6-(2))*2*(w/170));
        svgef.append("circle").attr("cy",w*.13).attr("cx",w*.55).attr("r",(6-(3))*2*(w/170));
        svgef.append("circle").attr("cy",w*.13).attr("cx",w*.7).attr("r",(6-(4))*2*(w/170));
        svgef.append("circle").attr("cy",w*.13).attr("cx",w*.85).attr("r",(6-(5))*2*(w/170));
        svgef.append("text").attr("y",w*.13).attr("x",w*.18).text("Población").attr("class","pocm");
        svgef.append("text").attr("y",w*.0).attr("x",w*.5).text("Selecciona un círculo para ver y escuchar la especie").attr("class","pocm2");
        var t1=svgef.append("text").attr("y",h).attr("x",w*.25).attr("class","nomencircsm");
        t1.append("tspan").attr("y",w*.21).attr("x",w*.25).text("Mayor a");
        t1.append("tspan").attr("y",w*.24).attr("x",w*.25).text("50 millones");
        var t2=svgef.append("text").attr("y",h).attr("x",w*.4).attr("class","nomencircsm");
        t2.append("tspan").attr("y",w*.21).attr("x",w*.4).text("De 5 a 50");
        t2.append("tspan").attr("y",w*.24).attr("x",w*.4).text("millones");
        var t3=svgef.append("text").attr("y",h).attr("x",w*.55).attr("class","nomencircsm");
        t3.append("tspan").attr("y",w*.21).attr("x",w*.55).text("de 500 mil");
        t3.append("tspan").attr("y",w*.24).attr("x",w*.55).text("a 5 millones");
        var t4=svgef.append("text").attr("y",h).attr("x",w*.7).attr("class","nomencircsm");
        t4.append("tspan").attr("y",w*.21).attr("x",w*.7).text("De 50 a");
        t4.append("tspan").attr("y",w*.24).attr("x",w*.7).text("500 mil");
        var t5=svgef.append("text").attr("y",h).attr("x",w*.85).attr("class","nomencircsm");
        t5.append("tspan").attr("y",w*.21).attr("x",w*.85).text("Menor");
        t5.append("tspan").attr("y",w*.24).attr("x",w*.85).text("a 50 mil");

  var svg = d3.select("#visaves").append("svg").style("background","#f8f8f8")
    .attr("width", w)
    .attr("height", h);
  function setup() {
    for(var i=0;i<table.length; i++){ 
      var ef =table[i];
      console.log(ef)
      audios[table[i]] =loadSound('datos/audios/'+table[i]+".mp3");}}
      var py=.57;

d3.csv('./datos/baseparavisdeavesfinal.csv' ,function (error, data) {

        for (var j = 0; j < data.length; j++) {
          data[j].radius = (6-(data[j].TamPob))*2*(w/170);
          data[j].x = Math.random() * w;
          data[j].y = Math.random() * h;

        }

        var padding = 2*(w/700);
        var maxRadius = d3.max(_.pluck(data, 'radius'));

        var getCenters = function (vname, size) {
          var centers, map;
          centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
          });

          map = d3.layout.treemap().mode("dice").size(size).ratio(1/1);
          map.nodes({children: centers});

          return centers;
        };

        var nodes = svg.selectAll("circle.node")
          .data(data);

        nodes.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
          .attr("r", function (d) { return d.radius; })
          .style("fill", function (d) { return colores(d.NOM59); })
          .on("click",function(d,i){
            var esc=.04;
            var poly="";
            poly=(w1*.23)+","+(h1*py)+" "+(w1*.77)+","+(h1*py)+" "
            poly=poly+(w1*.77)+","+(h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob])))+" "+(w1*.23)+","+(h1*(py+esc*tampob[d.TamPob]));

            d3.selectAll("polygon.poblacional")
              .attr("points",poly)
            console.log([d.TamPob,d.TendPob])
            d3.selectAll("text.tenp1")
              .text(textotend1[d.TendPob])
              .attr("x",(w1*.77))
              .style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
              .attr("y",(h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob]))))
              .style("font-size",(w1*.04)+"px")
            d3.selectAll("text.tenp2")
              .text(textotend2[d.TendPob])
              .attr("x",(w1*.77))
              .attr("y",1.06*(h1*(py+esc*(tampob[d.TamPob]*tenpo[d.TendPob])))).style("font-size",(w1*.04)+"px")
              .style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
            d3.selectAll("text.tamp")
              .text(textotamp[d.TamPob])
              .attr("x",(w1*.23))
              .style("opacity",function(){if(d.TamPob==""){return "0"}else{return 1}})
              .attr("y",(h1*(py+esc*tampob[d.TamPob])))
            
            d3.selectAll("rect.barravul").attr("width",escalavul(parseInt(d.Vulnerabilidad)));
            d3.selectAll("circle.circulonom")
              .style("fill",colores(d.NOM59));
            d3.selectAll("text.vultext")
              .attr("x",w1*.16+escalavul(parseInt(d.Vulnerabilidad)))
              .text(""+d.Vulnerabilidad)
            if(d.Endemismo=="EN"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.48).attr("y",h1*.16).attr("width",w1*.33).attr("height",h1*.33).attr("xlink:href","./Imgs/"+d.Endemismo+".png");
              d3.selectAll("circle.circulonom").attr("cx",w1*.62)
              d3.selectAll("image.fotopajaro").attr("x",w1*.18)
            }
            else if(d.Endemismo=="CE"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.53).attr("y",h1*.14).attr("width",w1*.39).attr("height",h1*.39).attr("xlink:href","./Imgs/"+d.Endemismo+".png");
              d3.selectAll("circle.circulonom").attr("cx",w1*.52)
              d3.selectAll("image.fotopajaro").attr("x",w1*.15)
            }
            else if(d.Endemismo=="Exo"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.35).attr("y",h1*.09).attr("width",w1*.6).attr("height",h1*.48).attr("xlink:href","./Imgs/"+d.Endemismo+".png");
              d3.selectAll("circle.circulonom").attr("cx",w1*.52)
              d3.selectAll("image.fotopajaro").attr("x",w1*.07)
            }
            else if(d.Endemismo=="SE"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.32).attr("y",h1*.15).attr("width",w1*.65).attr("height",h1*.38).attr("xlink:href","./Imgs/"+d.Endemismo+".png");
              d3.selectAll("circle.circulonom").attr("cx",w1*.5)
              d3.selectAll("image.fotopajaro").attr("x",w1*.12)
            }
            else if(d.Endemismo=="ne"){
              d3.selectAll("image.fotoendemismo").attr("x",w1*.52).attr("y",h1*.18).attr("width",w1*.37).attr("height",h1*.37).style("opacity","0");
              d3.selectAll("circle.circulonom").attr("cx",w1*.62)
              d3.selectAll("image.fotopajaro").attr("x",w1*.15)
            }
            if(d.MIA=="SI"){d3.select("div.bloquesvg-text").style("background","#d1ece6")}
             else{d3.select("div.bloquesvg-text").style("background","#ccdbf7")}
            d3.selectAll("image.fotopajaro").attr("xlink:href","./datos/fotoss/"+d.Claves+".png") 
            d3.selectAll("div.NombreEsp").text(d.NombreEspa.toUpperCase()).style("font-size","calc(12px + 2vw )")
            d3.selectAll("div.NombreCien").text(d.NombreCien).style("font-size","calc(10px + 1.5vw )")
            d3.selectAll("div.fichamovil").style("display","inline")
             if( audios[d.Claves].isLoaded()){audios[d.Claves].play()}})
          

        var force = d3.layout.force().size([w*.9, h*.9]);

        fdraw('Vista-general');

        $( ".btn" ).click(function() {
          if(this.id=="Vista-general"){h=w*2.6;}
          else if(this.id=="MIA"){h=3.6*w;}
          else if(this.id=="Vulnerabilidad"){h=10*w}
          else if(this.id=="NOM59"){h=5*w}
          else if(this.id=="TendPob"){h=6.2*w}
          else if(this.id=="Endemismo"){h=4.5*w}
          svg.attr("height",h)
          fdraw(this.id);
        });

        function fdraw (varname) {


          var centers = getCenters(varname, [w, h]);
          if(varname=="NOM59"){
            centers[2].y=h*.05;
            centers[1].y=h*.25;
            centers[0].y=h*.35;
            centers[2].dy=h*.2;
            centers[1].dy=h*.15;
            centers[0].dy=h*.7;}
          if(varname=="Endemismo"){
            centers[4].y=h*.01;
            centers[3].y=h*.09;
            centers[2].y=h*.17;
            centers[1].y=h*.34;
            centers[0].y=h*.45;

            centers[4].dy=h*.1;
            centers[3].dy=h*.1;
            centers[2].dy=h*.17;
            centers[1].dy=h*.15;
            centers[0].dy=h*.7;}
     
      console.log(centers)
          labels(centers,varname)

          force.on("tick", tick(centers, varname));
          force.start();
        }

        function tick (centers, varname) {
          var foci = {};
          for (var i = 0; i < centers.length; i++) {
            foci[centers[i].name] = centers[i];
          }
          return function (e) {
            for (var i = 0; i < data.length; i++) {
              var o = data[i];
              var f = foci[o[varname]];
              o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
              o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
            }
           nodes.each(collide(.16,varname))
              .attr("cx", function (d) { return  d.x = Math.max(d.radius, Math.min(w - d.radius, d.x));  })
              .attr("cy", function (d) { return   d.y = Math.max(d.radius, Math.min(h - d.radius, d.y));  });
          }
        }
        function labels (centers,varname) {
          svg.selectAll(".label").remove();

          svg.selectAll(".label")
          .data(centers).enter().append("text")
          .attr("class", "label")
          .text(function (d) { if(varname!="Vulnerabilidad"){return noms[d.name]}else{return d.name} })
          .style("font-size","30px")
          .style("dominant-baseline","baseline")
          .style("text-anchor","middle")
          .attr("transform", function (d) {
            return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + d.dy/10) + ")";
          });
        }


        function collide(alpha,varname) {
          var quadtree = d3.geom.quadtree(data);
          return function (d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {

                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y);

                if(varname=="Vista-general"){padding=480*w*(1/(l))/150}
                else if(varname=="NOM59"){padding=450*w*(1/(l))/100}
                else if(varname=="MIA"){padding=300*w*(1/(l))/150}
                else if(varname=="Endemismo"){padding=400*w*(1/(l))/150}
                else{padding=250*w*(1/(l))/150}
                var r = d.radius + quad.point.radius + padding;
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }
      });
}