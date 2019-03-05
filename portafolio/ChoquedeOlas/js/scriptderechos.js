//This script is used to add interactivity to an svg image and I linked some html elements to the svg, 
//so they can be displayed when you click an image element
//Here I used the snap.svg library

var s=Snap("#visderechosh");
var dicids={"Ellipse_2":'Derecho_a_la_vida ',
"Ellipse_10":'Derecho_a_decidir_el_número_de_hijos_e_intervalo_entre_los_nacimientos ',
"Ellipse_6":'Derecho_a_la_libertad_religiosa_y_de_conciencia ',
"Ellipse_11":'Derecho_a_la_privacidad ',
"Ellipse_4":'Derecho_a_gozar_de_los_beneficios_del_progreso_científico ',
"Ellipse_7":'Derecho_a_la_libertad ',
"Ellipse_3":'Derecho_a_la_salud_y_a_la_atención_médica ',
"Ellipse_5":'Derecho_a_la_no_discriminación_y_a_la_igualdad ',
"Ellipse_12":'Derecho_a_la_información ',
"Ellipse_9":'Derecho_a_no_ser_sometida_al_trato_cruel_inhumano_y_degradante ',
"Ellipse_8":'Derecho_a_la_seguridad_personal '};

var dicinv=swap(dicids)
console.log(dicinv['Derecho_a_la_vida '])

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}


if(parseInt(d3.select("body").style("width"),10)>715){
  

Snap.load("./imgs/derechosamenzados.svg",function(f){
	var l0=f.select("g");
	$.each(l0.selectAll("circle").items,function(){
		this.attr({cursor:"pointer"})
		this.attr({
			rorig:this.attr("r"),
			rover:parseInt(this.attr("r"))*1.1
			})
		this.mouseover(function(){
			this.animate({
				r:parseInt(this.attr("rover"),10)
			},220,mina.bounce)}
		)
		this.mouseout(
			function(){this.animate({
				r:parseInt(this.attr("rorig"),10)
			},250,mina.bounce)}
		)
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+dicids[this.attr("id")]).style("display","inline")
			})
	})
	s.append(f);

	$.each(l0.selectAll("text").items,function(){
		this.attr({cursor:"pointer"})

		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+this.attr("id")).style("display","inline")
			})
	})
	s.append(f);
})}else{
	Snap.load("./imgs/derechosamenazdosmobile.svg",function(f){
	var l0=f.select("g");
	$.each(l0.selectAll("circle").items,function(){
		this.attr({
			rorig:this.attr("r"),
			rover:parseInt(this.attr("r"))*1.1
			})
		this.mouseover(function(){
			this.animate({
				r:parseInt(this.attr("rover"),10)
			},220,mina.bounce)}
		)
		this.mouseout(
			function(){this.animate({
				r:parseInt(this.attr("rorig"),10)
			},250,mina.bounce)}
		)
		this.attr({cursor:"pointer"})
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+dicids[this.attr("id")]).style("display","inline")
			})
	})
	s.append(f);

	$.each(l0.selectAll("text").items,function(){
		this.attr({cursor:"pointer"})
		
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+this.attr("id")).style("display","inline")
			})
	})
	s.append(f);
})
}

d3.selectAll("circle")
d3.selectAll("img.btn-cerrado").on("click",function(){console.log("no"),d3.selectAll("div.popss").style("display","none")})
$( window ).resize(function(){if(parseInt(d3.select("body").style("width"),10)>715){
  
d3.selectAll("div#visderechosh > svg").remove();
Snap.load("./imgs/derechosamenzados.svg",function(f){
	var l0=f.select("g");
	$.each(l0.selectAll("circle").items,function(){

		this.attr({cursor:"pointer"})
		this.attr({
			rorig:this.attr("r"),
			rover:parseInt(this.attr("r"))*1.1
			})
		this.mouseover(function(){
			this.animate({
				r:parseInt(this.attr("rover"),10)
			},220,mina.bounce)}
		)
		this.mouseout(
			function(){this.animate({
				r:parseInt(this.attr("rorig"),10)
			},250,mina.bounce)}
		)
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+dicids[this.attr("id")]).style("display","inline")
			})
	})
	s.append(f);

	$.each(l0.selectAll("text").items,function(){
		this.attr({cursor:"pointer"})
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+this.attr("id")).style("display","inline")
			})
	})
	s.append(f);
})}else{
	d3.selectAll("div#visderechosh > svg").remove();
	Snap.load("./imgs/derechosamenazdosmobile.svg",function(f){
	var l0=f.select("g");
	$.each(l0.selectAll("circle").items,function(){
		this.attr({cursor:"pointer"})
		this.attr({
			rorig:this.attr("r"),
			rover:parseInt(this.attr("r"))*1.1
			})
		this.mouseover(function(){
			this.animate({
				r:parseInt(this.attr("rover"),10)
			},220,mina.bounce)}
		)
		this.mouseout(
			function(){this.animate({
				r:parseInt(this.attr("rorig"),10)
			},250,mina.bounce)}
		)
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+dicids[this.attr("id")]).style("display","inline")
			})
	})
	s.append(f);

	$.each(l0.selectAll("text").items,function(){
		this.attr({cursor:"pointer"})
		this.click(function(){
			d3.selectAll("div.popss").style("display","none")
			d3.select("div."+this.attr("id")).style("display","inline")
			})
	})
	s.append(f);
})
}})