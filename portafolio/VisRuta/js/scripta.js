//The purpose of this code is to provide a tool for users to consult the most
//dangerous subway stations on their route. I used the jsnetworkx.js library to 
//buid a  subway network, the typeahead.js library to select the stations (nodes)
//and d3.js to link the data


visfocorojo()
function visfocorojo(){

var substringMatcher = function(strs) {
     return function findMatches(q, cb) {
     var matches, substringRegex;    
     matches = [];
     substrRegex = new RegExp(q, 'i');
     $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
          matches.push(str);
          }
     });
     cb(matches);    
     };
};

var states = ["Balbuena-1","Balderas-1","Boulevard Puerto Aéreo-1","Candelaria-1","Chapultepec-1","Cuauhtémoc-1","Gómez Farías-1","Insurgentes-1","Isabel la Católica-1","Juanacatlán-1","Merced-1","Moctezuma-1","Observatorio-1","Pantitlán-1","Pino Suárez-1","Salto del Agua-1","San Lázaro-1","Sevilla-1","Tacubaya-1","Zaragoza-1","Allende-2","Bellas Artes-2","Chabacano-2","Colegio Militar-2","Cuatro Caminos-2","Cuitláhuac-2","Ermita-2","General Anaya-2","Hidalgo-2","Nativitas-2","Normal-2","Panteones-2","Pino Suárez-2","Popotla-2","Portales-2","Revolución-2","San Antonio Abad-2","San Cosme-2","Tacuba-2","Tasqueña-2","Viaducto-2","Villa de Cortés-2","Xola-2","Zócalo-2","Balderas-3","Centro Médico-3","Copilco-3","Coyoacán-3","Deportivo 18 de Marzo-3","División del Norte-3","Etiopía-3","Eugenia-3","Guerrero-3","Hidalgo-3","Hospital General-3","Indios Verdes-3","Juárez-3","La Raza-3","Miguel A. de Quevedo-3","Niños Héroes-3","Potrero-3","Tlatelolco-3","Universidad-3","Viveros-3","Zapata-3","Bondojito-4","Canal del Norte-4","Candelaria-4","Consulado-4","Fray Servando-4","Jamaica-4","Martín Carrera-4","Morelos-4","Santa Anita-4","Talismán-4","Aragón-5","Autobuses del Norte-5","Consulado-5","Eduardo Molina-5","Hangares-5","Instituto del Petróleo-5","La Raza-5","Misterios-5","Oceanía-5","Pantitlán-5","Politécnico-5","Terminal Aérea-5","Valle Gómez-5","Azcapotzalco-6","Deportivo 18 de Marzo-6","El Rosario-6","Ferrería-6","Instituto del Petróleo-6","La Villa/Basílica-6","Lindavista-6","Martín Carrera-6","Norte 45-6","Tezozomoc-6","Vallejo-6","Aquiles Serdán-7","Auditorio-7","Barranca del Muerto-7","Camarones-7","Constituyentes-7","El Rosario-7","Mixcoac-7","Polanco-7","Refinería-7","San Antonio-7","San Joaquín-7","San Pedro los Pinos-7","Tacuba-7","Tacubaya-7","Aculco-8","Apatlaco-8","Atlalilco-8","Bellas Artes-8","Cerro de la Estrella-8","Chabacano-8","Constitución de 1917-8","Coyuya-8","Doctores-8","Escuadrón 201-8","Garibaldi-8","Iztacalco-8","Iztapalapa-8","La Viga-8","Obrera-8","Salto del Agua-8","San Juan Letrán-8","Santa Anita-8","UAM/I-8","Centro Médico-9","Chabacano-9","Chilpancingo-9","Ciudad Deportiva-9","Jamaica-9","Lázaro Cárdenas-9","Mixiuhca-9","Pantitlán-9","Patriotismo-9","Puebla-9","Tacubaya-9","Velódromo-9","Atlalilco-12","Calle 11-12","Culhuacán-12","Eje Central-12","Ermita-12","Hospital 20 de Nov-12","Insurgentes Sur-12","Lomas Estrella-12","Mexicaltzingo-12","Mixcoac-12","Nopalera-12","Olivos-12","Parque de los Venados-12","Periférico Oriente-12","San Andrés Tomatlán-12","Tezonco-12","Tláhuac-12","Tlaltenco-12","Zapata-12","Zapotitlán-12","Acatitla-A","Agrícola Oriental-A","Canal de San Juan-A","Guelatao-A","La Paz-A","Los Reyes-A","Pantitlán-A","Peñón Viejo-A","Santa Marta-A","Tepalcates-A","Bque. de Aragón-B","Buenavista-B","Ciudad Azteca-B","Deportivo Oceanía-B","Ecatepec-B","Garibaldi-B","Guerrero-B","Impulsora-B","Lagunilla-B","Morelos-B","Múzquiz-B","Nezahualcóyotl-B","Oceanía-B","Olímpica-B","Plaza Aragón-B","R. Flores Magón-B","Río de los Remedios-B","Romero Rubio-B","San Lázaro-B","Tepito-B","Villa de Aragón-B"];
var w=parseInt(d3.select("#caminito").style("width"),10);


if(w<750){
var h=300,esc=2,er=4*w/320, escim=455/680;

var inputs1=d3.select("div.row.inputs").append("div").attr("class","row");
inputs1.append("div").attr("class","col-xs-2")
inputs1.append("div").attr("class","col-xs-8 input inicial").append("input").attr("class","typeahead inicial").attr("type","text").attr("placeholder","Estación de inicio")

var inputs2=d3.select("div.row.inputs").append("div").attr("class","row")
inputs2.append("div").attr("class","col-xs-2")
inputs2.append("div").attr("class","col-xs-8 input final").append("input").attr("class","typeahead final").attr("type","text").attr("placeholder","Estación final")

var sepy=37*w/400;
var svg1=d3.select("#caminito")
     .append("svg")
     .attr("width",w)
     .attr("height",w)
svg1.append("image")
     .attr("xlink:href","./imagenes/turuta.svg")
    .attr("x",0+w*.4)
    .attr("y",w*.1)
    .attr("width",w*.20)
    .attr("height",w*.2)

svg1=svg1.attr("class","caminito")
     .append("g")
     .attr("class","caminito");



var G = new jsnx.Graph();

G.addNodesFrom(["Balbuena-1","Balderas-1","Boulevard Puerto Aéreo-1","Candelaria-1","Chapultepec-1","Cuauhtémoc-1","Gómez Farías-1","Insurgentes-1","Isabel la Católica-1","Juanacatlán-1","Merced-1","Moctezuma-1","Observatorio-1","Pantitlán-1","Pino Suárez-1","Salto del Agua-1","San Lázaro-1","Sevilla-1","Tacubaya-1","Zaragoza-1","Allende-2","Bellas Artes-2","Chabacano-2","Colegio Militar-2","Cuatro Caminos-2","Cuitláhuac-2","Ermita-2","General Anaya-2","Hidalgo-2","Nativitas-2","Normal-2","Panteones-2","Pino Suárez-2","Popotla-2","Portales-2","Revolución-2","San Antonio Abad-2","San Cosme-2","Tacuba-2","Tasqueña-2","Viaducto-2","Villa de Cortés-2","Xola-2","Zócalo-2","Balderas-3","Centro Médico-3","Copilco-3","Coyoacán-3","Deportivo 18 de Marzo-3","División del Norte-3","Etiopía-3","Eugenia-3","Guerrero-3","Hidalgo-3","Hospital General-3","Indios Verdes-3","Juárez-3","La Raza-3","Miguel A. de Quevedo-3","Niños Héroes-3","Potrero-3","Tlatelolco-3","Universidad-3","Viveros-3","Zapata-3","Bondojito-4","Canal del Norte-4","Candelaria-4","Consulado-4","Fray Servando-4","Jamaica-4","Martín Carrera-4","Morelos-4","Santa Anita-4","Talismán-4","Aragón-5","Autobuses del Norte-5","Consulado-5","Eduardo Molina-5","Hangares-5","Instituto del Petróleo-5","La Raza-5","Misterios-5","Oceanía-5","Pantitlán-5","Politécnico-5","Terminal Aérea-5","Valle Gómez-5","Azcapotzalco-6","Deportivo 18 de Marzo-6","El Rosario-6","Ferrería-6","Instituto del Petróleo-6","La Villa/Basílica-6","Lindavista-6","Martín Carrera-6","Norte 45-6","Tezozomoc-6","Vallejo-6","Aquiles Serdán-7","Auditorio-7","Barranca del Muerto-7","Camarones-7","Constituyentes-7","El Rosario-7","Mixcoac-7","Polanco-7","Refinería-7","San Antonio-7","San Joaquín-7","San Pedro los Pinos-7","Tacuba-7","Tacubaya-7","Aculco-8","Apatlaco-8","Atlalilco-8","Bellas Artes-8","Cerro de la Estrella-8","Chabacano-8","Constitución de 1917-8","Coyuya-8","Doctores-8","Escuadrón 201-8","Garibaldi-8","Iztacalco-8","Iztapalapa-8","La Viga-8","Obrera-8","Salto del Agua-8","San Juan Letrán-8","Santa Anita-8","UAM/I-8","Centro Médico-9","Chabacano-9","Chilpancingo-9","Ciudad Deportiva-9","Jamaica-9","Lázaro Cárdenas-9","Mixiuhca-9","Pantitlán-9","Patriotismo-9","Puebla-9","Tacubaya-9","Velódromo-9","Atlalilco-12","Calle 11-12","Culhuacán-12","Eje Central-12","Ermita-12","Hospital 20 de Nov-12","Insurgentes Sur-12","Lomas Estrella-12","Mexicaltzingo-12","Mixcoac-12","Nopalera-12","Olivos-12","Parque de los Venados-12","Periférico Oriente-12","San Andrés Tomatlán-12","Tezonco-12","Tláhuac-12","Tlaltenco-12","Zapata-12","Zapotitlán-12","Acatitla-A","Agrícola Oriental-A","Canal de San Juan-A","Guelatao-A","La Paz-A","Los Reyes-A","Pantitlán-A","Peñón Viejo-A","Santa Marta-A","Tepalcates-A","Bque. de Aragón-B","Buenavista-B","Ciudad Azteca-B","Deportivo Oceanía-B","Ecatepec-B","Garibaldi-B","Guerrero-B","Impulsora-B","Lagunilla-B","Morelos-B","Múzquiz-B","Nezahualcóyotl-B","Oceanía-B","Olímpica-B","Plaza Aragón-B","R. Flores Magón-B","Río de los Remedios-B","Romero Rubio-B","San Lázaro-B","Tepito-B","Villa de Aragón-B"]);
var links=[["Balbuena-1","Boulevard Puerto Aéreo-1"],["Balbuena-1","Moctezuma-1"],["Balderas-1","Cuauhtémoc-1"],["Balderas-1","Salto del Agua-1"],["Balderas-1","Balderas-3"],["Boulevard Puerto Aéreo-1","Gómez Farías-1"],["Candelaria-1","Merced-1"],["Candelaria-1","San Lázaro-1"],["Candelaria-1","Candelaria-4"],["Chapultepec-1","Juanacatlán-1"],["Chapultepec-1","Sevilla-1"],["Cuauhtémoc-1","Insurgentes-1"],["Gómez Farías-1","Zaragoza-1"],["Insurgentes-1","Sevilla-1"],["Isabel la Católica-1","Pino Suárez-1"],["Isabel la Católica-1","Salto del Agua-1"],["Juanacatlán-1","Tacubaya-1"],["Merced-1","Pino Suárez-1"],["Moctezuma-1","San Lázaro-1"],["Observatorio-1","Tacubaya-1"],["Pantitlán-1","Zaragoza-1"],["Pantitlán-1","Pantitlán-5"],["Pantitlán-1","Pantitlán-9"],["Pantitlán-1","Pantitlán-A"],["Pino Suárez-1","Pino Suárez-2"],["Salto del Agua-1","Salto del Agua-8"],["San Lázaro-1","San Lázaro-B"],["Tacubaya-1","Tacubaya-7"],["Tacubaya-1","Tacubaya-9"],["Allende-2","Bellas Artes-2"],["Allende-2","Zócalo-2"],["Bellas Artes-2","Hidalgo-2"],["Bellas Artes-2","Bellas Artes-8"],["Chabacano-2","San Antonio Abad-2"],["Chabacano-2","Viaducto-2"],["Chabacano-2","Chabacano-8"],["Chabacano-2","Chabacano-9"],["Colegio Militar-2","Normal-2"],["Colegio Militar-2","Popotla-2"],["Cuatro Caminos-2","Panteones-2"],["Cuitláhuac-2","Popotla-2"],["Cuitláhuac-2","Tacuba-2"],["Ermita-2","General Anaya-2"],["Ermita-2","Portales-2"],["Ermita-12","Ermita-2"],["General Anaya-2","Tasqueña-2"],["Hidalgo-2","Revolución-2"],["Hidalgo-2","Hidalgo-3"],["Nativitas-2","Portales-2"],["Nativitas-2","Villa de Cortés-2"],["Normal-2","San Cosme-2"],["Panteones-2","Tacuba-2"],["Pino Suárez-2","San Antonio Abad-2"],["Pino Suárez-2","Zócalo-2"],["Revolución-2","San Cosme-2"],["Tacuba-2","Tacuba-7"],["Viaducto-2","Xola-2"],["Villa de Cortés-2","Xola-2"],["Balderas-3","Juárez-3"],["Balderas-3","Niños Héroes-3"],["Centro Médico-3","Etiopía-3"],["Centro Médico-3","Hospital General-3"],["Centro Médico-3","Centro Médico-9"],["Copilco-3","Miguel A. de Quevedo-3"],["Copilco-3","Universidad-3"],["Coyoacán-3","Viveros-3"],["Coyoacán-3","Zapata-3"],["Deportivo 18 de Marzo-3","Indios Verdes-3"],["Deportivo 18 de Marzo-3","Potrero-3"],["Deportivo 18 de Marzo-3","Deportivo 18 de Marzo-6"],["División del Norte-3","Eugenia-3"],["División del Norte-3","Zapata-3"],["Etiopía-3","Eugenia-3"],["Guerrero-3","Hidalgo-3"],["Guerrero-3","Tlatelolco-3"],["Guerrero-3","Guerrero-B"],["Hidalgo-3","Juárez-3"],["Hospital General-3","Niños Héroes-3"],["La Raza-3","Potrero-3"],["La Raza-3","Tlatelolco-3"],["La Raza-3","La Raza-5"],["Miguel A. de Quevedo-3","Viveros-3"],["Zapata-12","Zapata-3"],["Bondojito-4","Consulado-4"],["Bondojito-4","Talismán-4"],["Canal del Norte-4","Consulado-4"],["Canal del Norte-4","Morelos-4"],["Candelaria-4","Fray Servando-4"],["Candelaria-4","Morelos-4"],["Consulado-4","Consulado-5"],["Fray Servando-4","Jamaica-4"],["Jamaica-4","Santa Anita-4"],["Jamaica-4","Jamaica-9"],["Martín Carrera-4","Talismán-4"],["Martín Carrera-4","Martín Carrera-6"],["Morelos-4","Morelos-B"],["Santa Anita-4","Santa Anita-8"],["Aragón-5","Eduardo Molina-5"],["Aragón-5","Oceanía-5"],["Autobuses del Norte-5","Instituto del Petróleo-5"],["Autobuses del Norte-5","La Raza-5"],["Consulado-5","Eduardo Molina-5"],["Consulado-5","Valle Gómez-5"],["Hangares-5","Pantitlán-5"],["Hangares-5","Terminal Aérea-5"],["Instituto del Petróleo-5","Politécnico-5"],["Instituto del Petróleo-5","Instituto del Petróleo-6"],["La Raza-5","Misterios-5"],["Misterios-5","Valle Gómez-5"],["Oceanía-5","Terminal Aérea-5"],["Oceanía-5","Oceanía-B"],["Pantitlán-5","Pantitlán-9"],["Pantitlán-5","Pantitlán-A"],["Azcapotzalco-6","Ferrería-6"],["Azcapotzalco-6","Tezozomoc-6"],["Deportivo 18 de Marzo-6","La Villa/Basílica-6"],["Deportivo 18 de Marzo-6","Lindavista-6"],["El Rosario-6","Tezozomoc-6"],["El Rosario-6","El Rosario-7"],["Ferrería-6","Norte 45-6"],["Instituto del Petróleo-6","Instituto del Petróleo-6"],["Instituto del Petróleo-6","Lindavista-6"],["Instituto del Petróleo-6","Vallejo-6"],["La Villa/Basílica-6","Martín Carrera-6"],["Norte 45-6","Vallejo-6"],["Aquiles Serdán-7","Camarones-7"],["Aquiles Serdán-7","El Rosario-7"],["Auditorio-7","Constituyentes-7"],["Auditorio-7","Polanco-7"],["Barranca del Muerto-7","Mixcoac-7"],["Camarones-7","Refinería-7"],["Constituyentes-7","Tacubaya-7"],["Mixcoac-7","San Antonio-7"],["Mixcoac-12","Mixcoac-7"],["Polanco-7","San Joaquín-7"],["Refinería-7","Tacuba-7"],["San Antonio-7","San Pedro los Pinos-7"],["San Joaquín-7","Tacuba-7"],["San Pedro los Pinos-7","Tacubaya-7"],["Tacubaya-7","Tacubaya-9"],["Aculco-8","Apatlaco-8"],["Aculco-8","Escuadrón 201-8"],["Apatlaco-8","Iztacalco-8"],["Atlalilco-8","Escuadrón 201-8"],["Atlalilco-8","Iztapalapa-8"],["Atlalilco-12","Atlalilco-8"],["Bellas Artes-8","Garibaldi-8"],["Bellas Artes-8","San Juan Letrán-8"],["Cerro de la Estrella-8","Iztapalapa-8"],["Cerro de la Estrella-8","UAM/I-8"],["Chabacano-8","La Viga-8"],["Chabacano-8","Obrera-8"],["Chabacano-8","Chabacano-9"],["Constitución de 1917-8","UAM/I-8"],["Coyuya-8","Iztacalco-8"],["Coyuya-8","Santa Anita-8"],["Doctores-8","Obrera-8"],["Doctores-8","Salto del Agua-8"],["Garibaldi-8","Garibaldi-B"],["La Viga-8","Santa Anita-8"],["Salto del Agua-8","San Juan Letrán-8"],["Centro Médico-9","Chilpancingo-9"],["Centro Médico-9","Lázaro Cárdenas-9"],["Chabacano-9","Jamaica-9"],["Chabacano-9","Lázaro Cárdenas-9"],["Chilpancingo-9","Patriotismo-9"],["Ciudad Deportiva-9","Puebla-9"],["Ciudad Deportiva-9","Velódromo-9"],["Jamaica-9","Mixiuhca-9"],["Mixiuhca-9","Velódromo-9"],["Pantitlán-9","Puebla-9"],["Pantitlán-9","Pantitlán-A"],["Patriotismo-9","Tacubaya-9"],["Atlalilco-12","Culhuacán-12"],["Atlalilco-12","Mexicaltzingo-12"],["Calle 11-12","Lomas Estrella-12"],["Calle 11-12","Periférico Oriente-12"],["Culhuacán-12","San Andrés Tomatlán-12"],["Eje Central-12","Ermita-12"],["Eje Central-12","Parque de los Venados-12"],["Ermita-12","Mexicaltzingo-12"],["Hospital 20 de Nov-12","Insurgentes Sur-12"],["Hospital 20 de Nov-12","Zapata-12"],["Insurgentes Sur-12","Mixcoac-12"],["Lomas Estrella-12","San Andrés Tomatlán-12"],["Nopalera-12","Olivos-12"],["Nopalera-12","Zapotitlán-12"],["Olivos-12","Tezonco-12"],["Parque de los Venados-12","Zapata-12"],["Periférico Oriente-12","Tezonco-12"],["Tláhuac-12","Tlaltenco-12"],["Tlaltenco-12","Zapotitlán-12"],["Acatitla-A","Peñón Viejo-A"],["Acatitla-A","Santa Marta-A"],["Agrícola Oriental-A","Canal de San Juan-A"],["Agrícola Oriental-A","Pantitlán-A"],["Canal de San Juan-A","Tepalcates-A"],["Guelatao-A","Peñón Viejo-A"],["Guelatao-A","Tepalcates-A"],["La Paz-A","Los Reyes-A"],["Los Reyes-A","Santa Marta-A"],["Peñón Viejo-A","Peñón Viejo-A"],["Bque. de Aragón-B","Deportivo Oceanía-B"],["Bque. de Aragón-B","Villa de Aragón-B"],["Buenavista-B","Guerrero-B"],["Ciudad Azteca-B","Plaza Aragón-B"],["Deportivo Oceanía-B","Oceanía-B"],["Ecatepec-B","Múzquiz-B"],["Ecatepec-B","Olímpica-B"],["Garibaldi-B","Guerrero-B"],["Garibaldi-B","Lagunilla-B"],["Guerrero-B","Lagunilla-B"],["Impulsora-B","Nezahualcóyotl-B"],["Impulsora-B","Río de los Remedios-B"],["Lagunilla-B","Tepito-B"],["Morelos-B","San Lázaro-B"],["Morelos-B","Tepito-B"],["Múzquiz-B","Río de los Remedios-B"],["Nezahualcóyotl-B","Villa de Aragón-B"],["Oceanía-B","Romero Rubio-B"],["Olímpica-B","Plaza Aragón-B"],["R. Flores Magón-B","Romero Rubio-B"],["R. Flores Magón-B","San Lázaro-B"]];
var linkw=[];
for(var i=0;i<links.length;i++ ){
    if(links[i][0].split("-")[0]==links[i][1].split("-")[0]){
        linkw.push([links[i][0],links[i][1],3])
    }else{linkw.push([links[i][0],links[i][1],1])}

}
console.log(linkw)
G.addWeightedEdgesFrom(linkw)
var dcolor={"1":"#F14A9D", "2":"#1675C7", "3" :"#BBAC02", "4":"#79CFB4", "5":"#FFDC00", "6":"#EF2622", "7":"#F57019", "8":"#00A060", "9":"#4E1801", "12":"#B19A3A", "A" :"#8D188E", "B":"#BFBDBE"};
var valoresdel={"Balbuena-1": [1.0,0.0,1.0,4.94285],"Balderas-1": [0.0,1.0,37.0,8.19843],"Boulevard Puerto Aéreo-1": [0.0,1.0,1.0,9.6634],"Candelaria-1": [0.0,4.0,12.0,9.16385],"Chapultepec-1": [0.0,0.0,2.0,20.5865],"Cuauhtémoc-1": [0.0,3.0,8.0,8.51253],"Gómez Farías-1": [0.0,0.0,1.0,14.17],"Insurgentes-1": [0.0,1.0,10.0,21.737],"Isabel la Católica-1": [0.0,0.0,8.0,8.67107],"Juanacatlán-1": [0.0,0.0,4.0,4.4461],"Merced-1": [0.0,1.0,16.0,19.3123],"Moctezuma-1": [0.0,2.0,1.0,8.54731],"Observatorio-1": [0.0,0.0,3.0,27.7326],"Pantitlán-1": [0.0,6.0,6.0,17.1814],"Pino Suárez-1": [1.0,2.0,32.0,12.4459],"Salto del Agua-1": [0.0,1.0,22.0,8.6844],"San Lázaro-1": [0.0,0.0,18.0,11.8988],"Sevilla-1": [0.0,0.0,7.0,12.5393],"Tacubaya-1": [0.0,6.0,1.0,13.0181],"Zaragoza-1": [0.0,2.0,2.0,19.0931],"Allende-2": [0.0,2.0,12.0,11.4253],"Bellas Artes-2": [0.0,2.0,34.0,11.7091],"Chabacano-2": [0.0,2.0,9.0,10.2722],"Colegio Militar-2": [0.0,3.0,0.0,5.55621],"Cuatro Caminos-2": [0.0,8.0,2.0,38.9629],"Cuitláhuac-2": [0.0,0.0,0.0,7.0106],"Ermita-2": [0.0,0.0,0.0,5.98583],"General Anaya-2": [1.0,0.0,1.0,10.6493],"Hidalgo-2": [1.0,2.0,47.0,11.3625],"Nativitas-2": [0.0,0.0,1.0,7.78039],"Normal-2": [0.0,0.0,0.0,13.3937],"Panteones-2": [0.0,1.0,1.0,5.75978],"Pino Suárez-2": [0.0,4.0,45.0,9.59736],"Popotla-2": [0.0,0.0,1.0,3.766],"Portales-2": [0.0,0.0,0.0,8.09076],"Revolución-2": [1.0,1.0,6.0,10.4502],"San Antonio Abad-2": [0.0,0.0,6.0,8.86688],"San Cosme-2": [0.0,3.0,4.0,9.41792],"Tacuba-2": [1.0,8.0,4.0,13.5926],"Tasqueña-2": [0.0,0.0,1.0,27.9438],"Viaducto-2": [0.0,0.0,2.0,7.59717],"Villa de Cortés-2": [0.0,1.0,0.0,6.77203],"Xola-2": [0.0,1.0,2.0,7.78571],"Zócalo-2": [0.0,2.0,41.0,26.6784],"Balderas-3": [1.0,1.0,18.0,2.93796],"Centro Médico-3": [0.0,1.0,8.0,7.91556],"Copilco-3": [0.0,0.0,0.0,14.9581],"Coyoacán-3": [0.0,0.0,4.0,8.7198],"Deportivo 18 de Marzo-3": [1.0,3.0,10.0,13.3737],"División del Norte-3": [0.0,0.0,0.0,7.10634],"Etiopía-3": [0.0,0.0,2.0,11.0555],"Eugenia-3": [0.0,0.0,0.0,6.7217],"Guerrero-3": [1.0,3.0,21.0,4.18116],"Hidalgo-3": [1.0,1.0,30.0,6.83349],"Hospital General-3": [0.0,0.0,2.0,8.44962],"Indios Verdes-3": [3.0,2.0,8.0,42.9084],"Juárez-3": [0.0,0.0,5.0,6.84012],"La Raza-3": [0.0,1.0,3.0,11.2373],"Miguel A. de Quevedo-3": [0.0,1.0,0.0,12.8132],"Niños Héroes-3": [0.0,0.0,7.0,7.00959],"Potrero-3": [0.0,0.0,3.0,6.98436],"Tlatelolco-3": [0.0,0.0,3.0,7.85714],"Universidad-3": [0.0,0.0,1.0,27.0226],"Viveros-3": [0.0,0.0,0.0,8.49511],"Zapata-3": [0.0,2.0,3.0,9.93729],"Bondojito-4": [0.0,1.0,0.0,2.45978],"Canal del Norte-4": [0.0,0.0,1.0,3.25266],"Candelaria-4": [0.0,8.0,7.0,2.73748],"Consulado-4": [0.0,3.0,0.0,1.58618],"Fray Servando-4": [0.0,0.0,1.0,2.96435],"Jamaica-4": [0.0,7.0,1.0,2.73155],"Martín Carrera-4": [0.0,5.0,1.0,8.98815],"Morelos-4": [0.0,5.0,1.0,2.82612],"Santa Anita-4": [0.0,0.0,0.0,0.872802],"Talismán-4": [0.0,0.0,0.0,2.09784],"Aragón-5": [0.0,2.0,6.0,2.61966],"Autobuses del Norte-5": [0.0,10.0,5.0,8.68234],"Consulado-5": [0.0,2.0,2.0,1.80361],"Eduardo Molina-5": [0.0,3.0,0.0,2.55866],"Hangares-5": [0.0,1.0,1.0,1.80414],"Instituto del Petróleo-5": [0.0,0.0,0.0,1.9917],"La Raza-5": [0.0,4.0,1.0,3.48421],"Misterios-5": [0.0,1.0,1.0,2.98504],"Oceanía-5": [0.0,3.0,7.0,3.14355],"Pantitlán-5": [0.0,12.0,9.0,35.867],"Politécnico-5": [0.0,3.0,1.0,12.038],"Terminal Aérea-5": [0.0,1.0,4.0,6.11719],"Valle Gómez-5": [0.0,2.0,2.0,1.65788],"Azcapotzalco-6": [0.0,2.0,0.0,3.05899],"Deportivo 18 de Marzo-6": [0.0,1.0,3.0,0.666926],"El Rosario-6": [0.0,1.0,2.0,6.3199],"Ferrería-6": [0.0,2.0,1.0,8.64409],"Instituto del Petróleo-6": [0.0,3.0,3.0,1.34156],"La Villa/Basílica-6": [0.0,0.0,2.0,5.67497],"Lindavista-6": [0.0,7.0,1.0,6.42965],"Martín Carrera-6": [0.0,1.0,10.0,9.52764],"Norte 45-6": [0.0,0.0,1.0,2.43488],"Tezozomoc-6": [0.0,1.0,1.0,2.03114],"Vallejo-6": [0.0,1.0,3.0,3.05244],"Aquiles Serdán-7": [0.0,1.0,1.0,6.05719],"Auditorio-7": [0.0,1.0,21.0,12.2185],"Barranca del Muerto-7": [0.0,2.0,5.0,14.5084],"Camarones-7": [0.0,0.0,1.0,5.50861],"Constituyentes-7": [0.0,0.0,2.0,3.1788],"El Rosario-7": [0.0,0.0,4.0,14.0234],"Mixcoac-7": [0.0,0.0,8.0,8.35659],"Polanco-7": [0.0,3.0,13.0,11.8327],"Refinería-7": [1.0,1.0,1.0,3.84123],"San Antonio-7": [1.0,3.0,2.0,5.59716],"San Joaquín-7": [0.0,1.0,1.0,9.25634],"San Pedro los Pinos-7": [0.0,1.0,9.0,5.0709],"Tacuba-7": [0.0,5.0,7.0,2.99364],"Tacubaya-7": [0.0,1.0,30.0,2.44313],"Aculco-8": [0.0,0.0,0.0,3.24704],"Apatlaco-8": [0.0,0.0,0.0,5.24345],"Atlalilco-8": [0.0,1.0,0.0,5.48982],"Bellas Artes-8": [0.0,1.0,4.0,8.39678],"Cerro de la Estrella-8": [0.0,1.0,0.0,4.02201],"Chabacano-8": [1.0,1.0,0.0,1.39404],"Constitución de 1917-8": [0.0,1.0,1.0,33.2717],"Coyuya-8": [1.0,0.0,1.0,7.61152],"Doctores-8": [0.0,1.0,0.0,4.51939],"Escuadrón 201-8": [0.0,1.0,1.0,8.6078],"Garibaldi-8": [1.0,4.0,1.0,6.73002],"Iztacalco-8": [0.0,0.0,3.0,7.94902],"Iztapalapa-8": [0.0,0.0,0.0,3.26724],"La Viga-8": [0.0,0.0,0.0,2.57502],"Obrera-8": [0.0,2.0,0.0,4.74337],"Salto del Agua-8": [0.0,0.0,1.0,6.71],"San Juan Letrán-8": [0.0,0.0,1.0,11.2867],"Santa Anita-8": [1.0,0.0,1.0,2.36321],"UAM/I-8": [0.0,0.0,1.0,8.796],"Centro Médico-9": [0.0,4.0,18.0,5.20525],"Chabacano-9": [0.0,12.0,55.0,3.9982],"Chilpancingo-9": [0.0,2.0,2.0,16.0593],"Ciudad Deportiva-9": [0.0,6.0,7.0,2.40825],"Jamaica-9": [0.0,10.0,19.0,4.32503],"Lázaro Cárdenas-9": [0.0,4.0,9.0,4.5749],"Mixiuhca-9": [0.0,1.0,4.0,7.0093],"Pantitlán-9": [1.0,3.0,38.0,33.2792],"Patriotismo-9": [0.0,2.0,5.0,6.54963],"Puebla-9": [0.0,0.0,11.0,11.8927],"Tacubaya-9": [0.0,7.0,35.0,18.2317],"Velódromo-9": [0.0,4.0,4.0,3.4019],"Atlalilco-12": [0.0,0.0,3.0,4.49765],"Calle 11-12": [0.0,0.0,0.0,4.42598],"Culhuacán-12": [0.0,0.0,0.0,4.31052],"Eje Central-12": [0.0,0.0,0.0,3.33101],"Ermita-12": [0.0,0.0,2.0,3.64608],"Hospital 20 de Nov-12": [0.0,0.0,0.0,4.15015],"Insurgentes Sur-12": [0.0,0.0,6.0,10.5346],"Lomas Estrella-12": [0.0,0.0,0.0,3.4763],"Mexicaltzingo-12": [0.0,0.0,3.0,5.79727],"Mixcoac-12": [0.0,1.0,6.0,4.92639],"Nopalera-12": [0.0,0.0,0.0,5.88869],"Olivos-12": [0.0,0.0,0.0,4.78924],"Parque de los Venados-12": [0.0,0.0,0.0,3.60919],"Periférico Oriente-12": [0.0,0.0,0.0,8.364],"San Andrés Tomatlán-12": [0.0,0.0,0.0,3.31206],"Tezonco-12": [0.0,0.0,1.0,6.29546],"Tláhuac-12": [0.0,0.0,2.0,14.4755],"Tlaltenco-12": [0.0,0.0,0.0,0.864854],"Zapata-12": [0.0,0.0,5.0,4.46845],"Zapotitlán-12": [0.0,1.0,0.0,4.13444],"Acatitla-A": [0.0,4.0,1.0,4.8327],"Agrícola Oriental-A": [0.0,0.0,3.0,3.6265],"Canal de San Juan-A": [0.0,5.0,1.0,4.62188],"Guelatao-A": [0.0,5.0,3.0,6.83621],"La Paz-A": [0.0,0.0,0.0,12.4107],"Los Reyes-A": [0.0,2.0,1.0,6.64673],"Pantitlán-A": [3.0,12.0,30.0,42.4313],"Peñón Viejo-A": [0.0,1.0,4.0,4.49078],"Santa Marta-A": [0.0,1.0,3.0,9.32693],"Tepalcates-A": [0.0,6.0,1.0,6.24192],"Bque. de Aragón-B": [0.0,3.0,8.0,2.49609],"Buenavista-B": [0.0,3.0,14.0,21.4236],"Ciudad Azteca-B": [0.0,0.0,6.0,22.5749],"Deportivo Oceanía-B": [0.0,3.0,10.0,5.96669],"Ecatepec-B": [0.0,1.0,3.0,10.3998],"Garibaldi-B": [0.0,2.0,14.0,2.73607],"Guerrero-B": [0.0,7.0,18.0,2.01724],"Impulsora-B": [2.0,1.0,0.0,9.30053],"Lagunilla-B": [1.0,1.0,6.0,9.43444],"Morelos-B": [0.0,13.0,2.0,1.42335],"Múzquiz-B": [0.0,3.0,2.0,11.9796],"Nezahualcóyotl-B": [1.0,1.0,1.0,8.79558],"Oceanía-B": [0.0,3.0,24.0,3.84773],"Olímpica-B": [0.0,1.0,0.0,6.65172],"Plaza Aragón-B": [1.0,0.0,1.0,7.51655],"R. Flores Magón-B": [0.0,2.0,8.0,1.95706],"Río de los Remedios-B": [0.0,1.0,4.0,8.40666],"Romero Rubio-B": [0.0,6.0,6.0,3.00106],"San Lázaro-B": [1.0,3.0,15.0,5.74289],"Tepito-B": [0.0,8.0,1.0,8.15174],"Villa de Aragón-B": [0.0,1.0,4.0,5.14784]
}
var inicio="",final="";

$('.typeahead.inicial').typeahead({hint: true,highlight: true,minLength: 1},{name: 'states',source: substringMatcher(states)})
.on('typeahead:selected', function (obj, datum) {
     inicio= datum;
     ruta(inicio, final,G)
});


$('.typeahead.final').typeahead({hint: true,highlight: true,minLength: 1},
     {name: 'states',source: substringMatcher(states)})
.on('typeahead:selected', function (obj, datum) {
     final= datum;     ruta(inicio, final,G);});


function ruta(inicio, final,G){     
     if(inicio!="" && final!=""){
          d3.select("svg.caminito").remove();
          var svg1=d3.select("#caminito")
               .append("svg")
               .attr("width",w)
               .attr("height",h+20)
               .attr("class","caminito")
               .append("g")
               .attr("class","caminito");

          d3.selectAll("line.ruta").remove();
          d3.selectAll("circle.ruta").remove()
          var lisr=jsnx.shortestPath(G,{source:inicio,target:final,weight:"weight"});

          d3.select("svg.caminito")
               .attr("height",sepy*(lisr.length+2))
          var indi=lisr[0].split("-")[1],despy=0, despx=0,interc=0;          
          for (var ii=0;ii<lisr.length;ii++){

               if(indi!=lisr[ii].split("-")[1]){
                    console.log(indi)
                    var indiant=indi;
                    despy=despy+1;despx=despx+1;indi=lisr[ii].split("-")[1]; 
                    interc=interc+2;
                    if(interc/ 2==parseInt(interc/2)){

                         texef.attr("x",w*.5+despx*sepy+2*er);
                         img.attr("x",w*.5+despx*sepy+texef[0][0].getComputedTextLength()+3*er)
                         tx1.attr("x",w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][0]+valoresdel[lisr[ii]][0])))))
                         tx2.attr("x",w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][2]+valoresdel[lisr[ii]][2])))))
                         tx3.attr("x",w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][1]+valoresdel[lisr[ii]][1])))))


                    }
                    tx1.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][0]+valoresdel[lisr[ii]][0])))))
                    tx2.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][2]+valoresdel[lisr[ii]][2])))))
                    tx3.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][1]+valoresdel[lisr[ii]][1])))))
                    svg1.append("line")
                         .attr("class","ruta")
                         .attr("x1",w*.5+(despx-1)*sepy)
                         .attr("y1",20+(ii-despy)*sepy)
                         .attr("x2",w*.5+despx*sepy)
                         .attr("y2",20+(ii-despy)*sepy)
                         .style("stroke","gray")
                         .style("stroke-width",4)
                         .style("stroke-dasharray","5,5")
               }
               else{
                    interc=interc+1;
                    var texef=svg1.append("text")
                         .attr("class","estaciones")
                         .attr("x",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+2*er}else{return w*.5+despx*sepy-2*er}})
                         .attr("y",20+(ii-despy)*sepy)
                         .text(lisr[ii].split("-")[0])
                         .style("text-anchor",function(){if(interc/ 2==parseInt(interc/2)){return "start"}else{return "end"}})
                         

                    var img=svg1.append("image")
                         .attr("xlink:href",function(){if(interc/ 2==parseInt(interc/2)){return "./imagenes/delitosmovilder.svg"}else{return "./imagenes/delitosmovilizq.svg"}})
                         .attr("x",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+texef[0][0].getComputedTextLength()+3*er}else{return w*.5+despx*sepy-texef[0][0].getComputedTextLength()-w*.15*escim-3*er}})
                         .attr("y",20+(ii-despy-.33)*sepy)
                         .attr("width",w*.15*escim)
                         .attr("height",w*.15)

                    if(ii!=0){
                         svg1.append("line")
                              .attr("class","ruta")
                              .attr("x1",w*.5+despx*sepy)
                              .attr("y1",20+(ii-despy)*sepy)
                              .attr("x2",w*.5+despx*sepy)
                              .attr("y2",20+(ii-1-despy)*sepy)
                              .style("stroke",dcolor[lisr[ii].split("-")[1]])
                              .style("stroke-width",er*.8)
                         }
           

                    var tx1=svg1.append("text")
                         .attr("class","cifras")
                         .attr("x",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er}else{return w*.5+despx*sepy-texef[0][0].getComputedTextLength()-w*.15*escim-4*er}})
                         .attr("y",20+(ii-despy)*sepy)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][0])))
                         .style("text-anchor",function(){if(interc/ 2==parseInt(interc/2)){return "start"}else{return "end"}})
                         
                    var tx2=svg1.append("text")
                         .attr("class","cifras")
                         .attr("x",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er}else{return w*.5+despx*sepy-texef[0][0].getComputedTextLength()-w*.15*escim-4*er}})
                         .attr("y",20+(ii-despy)*sepy+.05*w)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][2])))
                         .style("text-anchor",function(){if(interc/ 2==parseInt(interc/2)){return "start"}else{return "end"}})
                         
                    var tx3=svg1.append("text")
                         .attr("class","cifras")
                         .attr("x",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+texef[0][0].getComputedTextLength()+w*.15*escim+4*er}else{return w*.5+despx*sepy-texef[0][0].getComputedTextLength()-w*.15*escim-4*er}})
                         .attr("y",20+(ii-despy)*sepy+.10*w)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][1])))
                         .style("text-anchor",function(){if(interc/ 2==parseInt(interc/2)){return "start"}else{return "end"}})
              }
            
      };
      //
      var indi=lisr[0].split("-")[1],despy=0, despx=0,interc=0;  
     for (var ii=0;ii<lisr.length;ii++){
               if(indi!=lisr[ii].split("-")[1]){despy=despy+1;despx=despx+1;indi=lisr[ii].split("-")[1]; interc=interc+2;
                    if(interc/ 2==parseInt(interc/2)){

                         
                    }
               
               }
               else{
                    interc=interc+1;
  


           
              }
               svg1.append("circle")
                    .attr("class","ruta")
                    .attr("r",er)
                    .attr("cx",w*.5+despx*sepy)
                    .attr("cy",20+(ii-despy)*sepy)
                    .style("stroke-width",er*.5)
      };
      d3.select("g.caminito").attr("transform","translate("+(-.5*despx*sepy)+","+.1*w+")")

      }};
}
else{
///////////////////////Versión de escritorio
d3.select("img#nomenclatura").remove()
d3.select("div.row.nomenclatura").remove()

d3.select("h3.tit1").style("font-size","calc(30px + 1.8vw)");
d3.select("p.textovis").style("font-size","calc(15px + .9vw)");
d3.select("span.textovis").style("font-size","calc(12px + .7vw)")
d3.selectAll("div.row.caja").style("box-shadow","0px 0px 4px 2px #3b3530");
d3.selectAll("input").style("background","#f7e2cf");
d3.selectAll("div.input").style("background","#f7e2cf")
d3.select("div.row.caja")
     




d3.select("img#nomenclaturacolor").attr("src","imagenes/nomenclaturalinesweb.svg").style("background","rgba(0,0,0,0)")

var valoresdel={"Balbuena-1": [1.0,0.0,1.0,4.94285],"Balderas-1": [0.0,1.0,37.0,8.19843],"Boulevard Puerto Aéreo-1": [0.0,1.0,1.0,9.6634],"Candelaria-1": [0.0,4.0,12.0,9.16385],"Chapultepec-1": [0.0,0.0,2.0,20.5865],"Cuauhtémoc-1": [0.0,3.0,8.0,8.51253],"Gómez Farías-1": [0.0,0.0,1.0,14.17],"Insurgentes-1": [0.0,1.0,10.0,21.737],"Isabel la Católica-1": [0.0,0.0,8.0,8.67107],"Juanacatlán-1": [0.0,0.0,4.0,4.4461],"Merced-1": [0.0,1.0,16.0,19.3123],"Moctezuma-1": [0.0,2.0,1.0,8.54731],"Observatorio-1": [0.0,0.0,3.0,27.7326],"Pantitlán-1": [0.0,6.0,6.0,17.1814],"Pino Suárez-1": [1.0,2.0,32.0,12.4459],"Salto del Agua-1": [0.0,1.0,22.0,8.6844],"San Lázaro-1": [0.0,0.0,18.0,11.8988],"Sevilla-1": [0.0,0.0,7.0,12.5393],"Tacubaya-1": [0.0,6.0,1.0,13.0181],"Zaragoza-1": [0.0,2.0,2.0,19.0931],"Allende-2": [0.0,2.0,12.0,11.4253],"Bellas Artes-2": [0.0,2.0,34.0,11.7091],"Chabacano-2": [0.0,2.0,9.0,10.2722],"Colegio Militar-2": [0.0,3.0,0.0,5.55621],"Cuatro Caminos-2": [0.0,8.0,2.0,38.9629],"Cuitláhuac-2": [0.0,0.0,0.0,7.0106],"Ermita-2": [0.0,0.0,0.0,5.98583],"General Anaya-2": [1.0,0.0,1.0,10.6493],"Hidalgo-2": [1.0,2.0,47.0,11.3625],"Nativitas-2": [0.0,0.0,1.0,7.78039],"Normal-2": [0.0,0.0,0.0,13.3937],"Panteones-2": [0.0,1.0,1.0,5.75978],"Pino Suárez-2": [0.0,4.0,45.0,9.59736],"Popotla-2": [0.0,0.0,1.0,3.766],"Portales-2": [0.0,0.0,0.0,8.09076],"Revolución-2": [1.0,1.0,6.0,10.4502],"San Antonio Abad-2": [0.0,0.0,6.0,8.86688],"San Cosme-2": [0.0,3.0,4.0,9.41792],"Tacuba-2": [1.0,8.0,4.0,13.5926],"Tasqueña-2": [0.0,0.0,1.0,27.9438],"Viaducto-2": [0.0,0.0,2.0,7.59717],"Villa de Cortés-2": [0.0,1.0,0.0,6.77203],"Xola-2": [0.0,1.0,2.0,7.78571],"Zócalo-2": [0.0,2.0,41.0,26.6784],"Balderas-3": [1.0,1.0,18.0,2.93796],"Centro Médico-3": [0.0,1.0,8.0,7.91556],"Copilco-3": [0.0,0.0,0.0,14.9581],"Coyoacán-3": [0.0,0.0,4.0,8.7198],"Deportivo 18 de Marzo-3": [1.0,3.0,10.0,13.3737],"División del Norte-3": [0.0,0.0,0.0,7.10634],"Etiopía-3": [0.0,0.0,2.0,11.0555],"Eugenia-3": [0.0,0.0,0.0,6.7217],"Guerrero-3": [1.0,3.0,21.0,4.18116],"Hidalgo-3": [1.0,1.0,30.0,6.83349],"Hospital General-3": [0.0,0.0,2.0,8.44962],"Indios Verdes-3": [3.0,2.0,8.0,42.9084],"Juárez-3": [0.0,0.0,5.0,6.84012],"La Raza-3": [0.0,1.0,3.0,11.2373],"Miguel A. de Quevedo-3": [0.0,1.0,0.0,12.8132],"Niños Héroes-3": [0.0,0.0,7.0,7.00959],"Potrero-3": [0.0,0.0,3.0,6.98436],"Tlatelolco-3": [0.0,0.0,3.0,7.85714],"Universidad-3": [0.0,0.0,1.0,27.0226],"Viveros-3": [0.0,0.0,0.0,8.49511],"Zapata-3": [0.0,2.0,3.0,9.93729],"Bondojito-4": [0.0,1.0,0.0,2.45978],"Canal del Norte-4": [0.0,0.0,1.0,3.25266],"Candelaria-4": [0.0,8.0,7.0,2.73748],"Consulado-4": [0.0,3.0,0.0,1.58618],"Fray Servando-4": [0.0,0.0,1.0,2.96435],"Jamaica-4": [0.0,7.0,1.0,2.73155],"Martín Carrera-4": [0.0,5.0,1.0,8.98815],"Morelos-4": [0.0,5.0,1.0,2.82612],"Santa Anita-4": [0.0,0.0,0.0,0.872802],"Talismán-4": [0.0,0.0,0.0,2.09784],"Aragón-5": [0.0,2.0,6.0,2.61966],"Autobuses del Norte-5": [0.0,10.0,5.0,8.68234],"Consulado-5": [0.0,2.0,2.0,1.80361],"Eduardo Molina-5": [0.0,3.0,0.0,2.55866],"Hangares-5": [0.0,1.0,1.0,1.80414],"Instituto del Petróleo-5": [0.0,0.0,0.0,1.9917],"La Raza-5": [0.0,4.0,1.0,3.48421],"Misterios-5": [0.0,1.0,1.0,2.98504],"Oceanía-5": [0.0,3.0,7.0,3.14355],"Pantitlán-5": [0.0,12.0,9.0,35.867],"Politécnico-5": [0.0,3.0,1.0,12.038],"Terminal Aérea-5": [0.0,1.0,4.0,6.11719],"Valle Gómez-5": [0.0,2.0,2.0,1.65788],"Azcapotzalco-6": [0.0,2.0,0.0,3.05899],"Deportivo 18 de Marzo-6": [0.0,1.0,3.0,0.666926],"El Rosario-6": [0.0,1.0,2.0,6.3199],"Ferrería-6": [0.0,2.0,1.0,8.64409],"Instituto del Petróleo-6": [0.0,3.0,3.0,1.34156],"La Villa/Basílica-6": [0.0,0.0,2.0,5.67497],"Lindavista-6": [0.0,7.0,1.0,6.42965],"Martín Carrera-6": [0.0,1.0,10.0,9.52764],"Norte 45-6": [0.0,0.0,1.0,2.43488],"Tezozomoc-6": [0.0,1.0,1.0,2.03114],"Vallejo-6": [0.0,1.0,3.0,3.05244],"Aquiles Serdán-7": [0.0,1.0,1.0,6.05719],"Auditorio-7": [0.0,1.0,21.0,12.2185],"Barranca del Muerto-7": [0.0,2.0,5.0,14.5084],"Camarones-7": [0.0,0.0,1.0,5.50861],"Constituyentes-7": [0.0,0.0,2.0,3.1788],"El Rosario-7": [0.0,0.0,4.0,14.0234],"Mixcoac-7": [0.0,0.0,8.0,8.35659],"Polanco-7": [0.0,3.0,13.0,11.8327],"Refinería-7": [1.0,1.0,1.0,3.84123],"San Antonio-7": [1.0,3.0,2.0,5.59716],"San Joaquín-7": [0.0,1.0,1.0,9.25634],"San Pedro los Pinos-7": [0.0,1.0,9.0,5.0709],"Tacuba-7": [0.0,5.0,7.0,2.99364],"Tacubaya-7": [0.0,1.0,30.0,2.44313],"Aculco-8": [0.0,0.0,0.0,3.24704],"Apatlaco-8": [0.0,0.0,0.0,5.24345],"Atlalilco-8": [0.0,1.0,0.0,5.48982],"Bellas Artes-8": [0.0,1.0,4.0,8.39678],"Cerro de la Estrella-8": [0.0,1.0,0.0,4.02201],"Chabacano-8": [1.0,1.0,0.0,1.39404],"Constitución de 1917-8": [0.0,1.0,1.0,33.2717],"Coyuya-8": [1.0,0.0,1.0,7.61152],"Doctores-8": [0.0,1.0,0.0,4.51939],"Escuadrón 201-8": [0.0,1.0,1.0,8.6078],"Garibaldi-8": [1.0,4.0,1.0,6.73002],"Iztacalco-8": [0.0,0.0,3.0,7.94902],"Iztapalapa-8": [0.0,0.0,0.0,3.26724],"La Viga-8": [0.0,0.0,0.0,2.57502],"Obrera-8": [0.0,2.0,0.0,4.74337],"Salto del Agua-8": [0.0,0.0,1.0,6.71],"San Juan Letrán-8": [0.0,0.0,1.0,11.2867],"Santa Anita-8": [1.0,0.0,1.0,2.36321],"UAM/I-8": [0.0,0.0,1.0,8.796],"Centro Médico-9": [0.0,4.0,18.0,5.20525],"Chabacano-9": [0.0,12.0,55.0,3.9982],"Chilpancingo-9": [0.0,2.0,2.0,16.0593],"Ciudad Deportiva-9": [0.0,6.0,7.0,2.40825],"Jamaica-9": [0.0,10.0,19.0,4.32503],"Lázaro Cárdenas-9": [0.0,4.0,9.0,4.5749],"Mixiuhca-9": [0.0,1.0,4.0,7.0093],"Pantitlán-9": [1.0,3.0,38.0,33.2792],"Patriotismo-9": [0.0,2.0,5.0,6.54963],"Puebla-9": [0.0,0.0,11.0,11.8927],"Tacubaya-9": [0.0,7.0,35.0,18.2317],"Velódromo-9": [0.0,4.0,4.0,3.4019],"Atlalilco-12": [0.0,0.0,3.0,4.49765],"Calle 11-12": [0.0,0.0,0.0,4.42598],"Culhuacán-12": [0.0,0.0,0.0,4.31052],"Eje Central-12": [0.0,0.0,0.0,3.33101],"Ermita-12": [0.0,0.0,2.0,3.64608],"Hospital 20 de Nov-12": [0.0,0.0,0.0,4.15015],"Insurgentes Sur-12": [0.0,0.0,6.0,10.5346],"Lomas Estrella-12": [0.0,0.0,0.0,3.4763],"Mexicaltzingo-12": [0.0,0.0,3.0,5.79727],"Mixcoac-12": [0.0,1.0,6.0,4.92639],"Nopalera-12": [0.0,0.0,0.0,5.88869],"Olivos-12": [0.0,0.0,0.0,4.78924],"Parque de los Venados-12": [0.0,0.0,0.0,3.60919],"Periférico Oriente-12": [0.0,0.0,0.0,8.364],"San Andrés Tomatlán-12": [0.0,0.0,0.0,3.31206],"Tezonco-12": [0.0,0.0,1.0,6.29546],"Tláhuac-12": [0.0,0.0,2.0,14.4755],"Tlaltenco-12": [0.0,0.0,0.0,0.864854],"Zapata-12": [0.0,0.0,5.0,4.46845],"Zapotitlán-12": [0.0,1.0,0.0,4.13444],"Acatitla-A": [0.0,4.0,1.0,4.8327],"Agrícola Oriental-A": [0.0,0.0,3.0,3.6265],"Canal de San Juan-A": [0.0,5.0,1.0,4.62188],"Guelatao-A": [0.0,5.0,3.0,6.83621],"La Paz-A": [0.0,0.0,0.0,12.4107],"Los Reyes-A": [0.0,2.0,1.0,6.64673],"Pantitlán-A": [3.0,12.0,30.0,42.4313],"Peñón Viejo-A": [0.0,1.0,4.0,4.49078],"Santa Marta-A": [0.0,1.0,3.0,9.32693],"Tepalcates-A": [0.0,6.0,1.0,6.24192],"Bque. de Aragón-B": [0.0,3.0,8.0,2.49609],"Buenavista-B": [0.0,3.0,14.0,21.4236],"Ciudad Azteca-B": [0.0,0.0,6.0,22.5749],"Deportivo Oceanía-B": [0.0,3.0,10.0,5.96669],"Ecatepec-B": [0.0,1.0,3.0,10.3998],"Garibaldi-B": [0.0,2.0,14.0,2.73607],"Guerrero-B": [0.0,7.0,18.0,2.01724],"Impulsora-B": [2.0,1.0,0.0,9.30053],"Lagunilla-B": [1.0,1.0,6.0,9.43444],"Morelos-B": [0.0,13.0,2.0,1.42335],"Múzquiz-B": [0.0,3.0,2.0,11.9796],"Nezahualcóyotl-B": [1.0,1.0,1.0,8.79558],"Oceanía-B": [0.0,3.0,24.0,3.84773],"Olímpica-B": [0.0,1.0,0.0,6.65172],"Plaza Aragón-B": [1.0,0.0,1.0,7.51655],"R. Flores Magón-B": [0.0,2.0,8.0,1.95706],"Río de los Remedios-B": [0.0,1.0,4.0,8.40666],"Romero Rubio-B": [0.0,6.0,6.0,3.00106],"San Lázaro-B": [1.0,3.0,15.0,5.74289],"Tepito-B": [0.0,8.0,1.0,8.15174],"Villa de Aragón-B": [0.0,1.0,4.0,5.14784]
}

var inputs=d3.select("div.row.inputs");
inputs.append("div").attr("class","col-sm-3");
inputs.append("div").attr("class","col-sm-3 input inicial")
     .style("padding","8px 0px 8px 0px")
     .style("margin-right","2% ")
     .style("border-right","2% solid #f7e2cf")
     .append("input")
     .style("margin-left","calc(30% + 0px)")
     .style("width","70%")
     .attr("class","typeahead inicial")
     .attr("type","text")
     .attr("placeholder","Estación de inicio")
     .style("font-size","calc(10px + .7vw)");
inputs.append("div").attr("class","col-sm-0");
inputs.append("div").attr("class","col-sm-3 input final")
     .style("padding","8px 0px 8px 0px")
     .style("margin-left","2% ")
     .append("input")
     .style("margin-left","calc(30% + 0px)")
     .style("width","70%")
     .attr("class","typeahead final")
     .attr("type","text")
     .attr("placeholder","Estación final")
     .style("font-size","calc(10px + .7vw)");

d3.select("div.input.inicial:before").style("font-size","calc(0px + .0vw)")


inputs.append("div").attr("class","col-sm-3");




var h=w*.5,w=w*.5,esc=1,er=3*w/320, escim=455/680;

var sepy=37*w/400;
var tl;
if(parseInt(d3.select("body").style("width"),10)<1000){tl=.7*h}else{tl=.4*h}

var marder=d3.select("#caminito")
    .append("div")    
    .style("height",tl*1.3+"px") 
    .style("padding","0px")    
    .attr("class","col-sm-2")  
  
var svg1=d3.select("#caminito")
     .append("div")
     .attr("class","col-sm-8 caminito")
      .style("padding","0px")   
     .style("overflow-x", "scroll")
     .append("svg")
     .attr("position","relative")
     .style("padding","0px")
     .attr("width",w)
     .attr("height",tl);

svg1.append("image")
     .attr("xlink:href","./imagenes/turuta.svg")
    .attr("x",0+parseInt(d3.select("div.caminito").style("width"),10)*.4)
    .attr("y",w*.1)
    .attr("width",parseInt(d3.select("div.caminito").style("width"),10)*.20)
    .attr("height",parseInt(d3.select("div.caminito").style("width"),10)*.2)

svg1=svg1.attr("class","caminito")
     .append("g")
     .attr("class","caminito");

var imgnomen=marder.append("img")
    .attr("src","imagenes/botonvertical.svg")    
    .style("display","block")
    .style("margin","auto")
    .style("margin-top","20%")
    .style("height","320px")
    


var G = new jsnx.Graph();

G.addNodesFrom(["Balbuena-1","Balderas-1","Boulevard Puerto Aéreo-1","Candelaria-1","Chapultepec-1","Cuauhtémoc-1","Gómez Farías-1","Insurgentes-1","Isabel la Católica-1","Juanacatlán-1","Merced-1","Moctezuma-1","Observatorio-1","Pantitlán-1","Pino Suárez-1","Salto del Agua-1","San Lázaro-1","Sevilla-1","Tacubaya-1","Zaragoza-1","Allende-2","Bellas Artes-2","Chabacano-2","Colegio Militar-2","Cuatro Caminos-2","Cuitláhuac-2","Ermita-2","General Anaya-2","Hidalgo-2","Nativitas-2","Normal-2","Panteones-2","Pino Suárez-2","Popotla-2","Portales-2","Revolución-2","San Antonio Abad-2","San Cosme-2","Tacuba-2","Tasqueña-2","Viaducto-2","Villa de Cortés-2","Xola-2","Zócalo-2","Balderas-3","Centro Médico-3","Copilco-3","Coyoacán-3","Deportivo 18 de Marzo-3","División del Norte-3","Etiopía-3","Eugenia-3","Guerrero-3","Hidalgo-3","Hospital General-3","Indios Verdes-3","Juárez-3","La Raza-3","Miguel A. de Quevedo-3","Niños Héroes-3","Potrero-3","Tlatelolco-3","Universidad-3","Viveros-3","Zapata-3","Bondojito-4","Canal del Norte-4","Candelaria-4","Consulado-4","Fray Servando-4","Jamaica-4","Martín Carrera-4","Morelos-4","Santa Anita-4","Talismán-4","Aragón-5","Autobuses del Norte-5","Consulado-5","Eduardo Molina-5","Hangares-5","Instituto del Petróleo-5","La Raza-5","Misterios-5","Oceanía-5","Pantitlán-5","Politécnico-5","Terminal Aérea-5","Valle Gómez-5","Azcapotzalco-6","Deportivo 18 de Marzo-6","El Rosario-6","Ferrería-6","Instituto del Petróleo-6","La Villa/Basílica-6","Lindavista-6","Martín Carrera-6","Norte 45-6","Tezozomoc-6","Vallejo-6","Aquiles Serdán-7","Auditorio-7","Barranca del Muerto-7","Camarones-7","Constituyentes-7","El Rosario-7","Mixcoac-7","Polanco-7","Refinería-7","San Antonio-7","San Joaquín-7","San Pedro los Pinos-7","Tacuba-7","Tacubaya-7","Aculco-8","Apatlaco-8","Atlalilco-8","Bellas Artes-8","Cerro de la Estrella-8","Chabacano-8","Constitución de 1917-8","Coyuya-8","Doctores-8","Escuadrón 201-8","Garibaldi-8","Iztacalco-8","Iztapalapa-8","La Viga-8","Obrera-8","Salto del Agua-8","San Juan Letrán-8","Santa Anita-8","UAM/I-8","Centro Médico-9","Chabacano-9","Chilpancingo-9","Ciudad Deportiva-9","Jamaica-9","Lázaro Cárdenas-9","Mixiuhca-9","Pantitlán-9","Patriotismo-9","Puebla-9","Tacubaya-9","Velódromo-9","Atlalilco-12","Calle 11-12","Culhuacán-12","Eje Central-12","Ermita-12","Hospital 20 de Nov-12","Insurgentes Sur-12","Lomas Estrella-12","Mexicaltzingo-12","Mixcoac-12","Nopalera-12","Olivos-12","Parque de los Venados-12","Periférico Oriente-12","San Andrés Tomatlán-12","Tezonco-12","Tláhuac-12","Tlaltenco-12","Zapata-12","Zapotitlán-12","Acatitla-A","Agrícola Oriental-A","Canal de San Juan-A","Guelatao-A","La Paz-A","Los Reyes-A","Pantitlán-A","Peñón Viejo-A","Santa Marta-A","Tepalcates-A","Bque. de Aragón-B","Buenavista-B","Ciudad Azteca-B","Deportivo Oceanía-B","Ecatepec-B","Garibaldi-B","Guerrero-B","Impulsora-B","Lagunilla-B","Morelos-B","Múzquiz-B","Nezahualcóyotl-B","Oceanía-B","Olímpica-B","Plaza Aragón-B","R. Flores Magón-B","Río de los Remedios-B","Romero Rubio-B","San Lázaro-B","Tepito-B","Villa de Aragón-B"]);
var links=[["Balbuena-1","Boulevard Puerto Aéreo-1"],["Balbuena-1","Moctezuma-1"],["Balderas-1","Cuauhtémoc-1"],["Balderas-1","Salto del Agua-1"],["Balderas-1","Balderas-3"],["Boulevard Puerto Aéreo-1","Gómez Farías-1"],["Candelaria-1","Merced-1"],["Candelaria-1","San Lázaro-1"],["Candelaria-1","Candelaria-4"],["Chapultepec-1","Juanacatlán-1"],["Chapultepec-1","Sevilla-1"],["Cuauhtémoc-1","Insurgentes-1"],["Gómez Farías-1","Zaragoza-1"],["Insurgentes-1","Sevilla-1"],["Isabel la Católica-1","Pino Suárez-1"],["Isabel la Católica-1","Salto del Agua-1"],["Juanacatlán-1","Tacubaya-1"],["Merced-1","Pino Suárez-1"],["Moctezuma-1","San Lázaro-1"],["Observatorio-1","Tacubaya-1"],["Pantitlán-1","Zaragoza-1"],["Pantitlán-1","Pantitlán-5"],["Pantitlán-1","Pantitlán-9"],["Pantitlán-1","Pantitlán-A"],["Pino Suárez-1","Pino Suárez-2"],["Salto del Agua-1","Salto del Agua-8"],["San Lázaro-1","San Lázaro-B"],["Tacubaya-1","Tacubaya-7"],["Tacubaya-1","Tacubaya-9"],["Allende-2","Bellas Artes-2"],["Allende-2","Zócalo-2"],["Bellas Artes-2","Hidalgo-2"],["Bellas Artes-2","Bellas Artes-8"],["Chabacano-2","San Antonio Abad-2"],["Chabacano-2","Viaducto-2"],["Chabacano-2","Chabacano-8"],["Chabacano-2","Chabacano-9"],["Colegio Militar-2","Normal-2"],["Colegio Militar-2","Popotla-2"],["Cuatro Caminos-2","Panteones-2"],["Cuitláhuac-2","Popotla-2"],["Cuitláhuac-2","Tacuba-2"],["Ermita-2","General Anaya-2"],["Ermita-2","Portales-2"],["Ermita-12","Ermita-2"],["General Anaya-2","Tasqueña-2"],["Hidalgo-2","Revolución-2"],["Hidalgo-2","Hidalgo-3"],["Nativitas-2","Portales-2"],["Nativitas-2","Villa de Cortés-2"],["Normal-2","San Cosme-2"],["Panteones-2","Tacuba-2"],["Pino Suárez-2","San Antonio Abad-2"],["Pino Suárez-2","Zócalo-2"],["Revolución-2","San Cosme-2"],["Tacuba-2","Tacuba-7"],["Viaducto-2","Xola-2"],["Villa de Cortés-2","Xola-2"],["Balderas-3","Juárez-3"],["Balderas-3","Niños Héroes-3"],["Centro Médico-3","Etiopía-3"],["Centro Médico-3","Hospital General-3"],["Centro Médico-3","Centro Médico-9"],["Copilco-3","Miguel A. de Quevedo-3"],["Copilco-3","Universidad-3"],["Coyoacán-3","Viveros-3"],["Coyoacán-3","Zapata-3"],["Deportivo 18 de Marzo-3","Indios Verdes-3"],["Deportivo 18 de Marzo-3","Potrero-3"],["Deportivo 18 de Marzo-3","Deportivo 18 de Marzo-6"],["División del Norte-3","Eugenia-3"],["División del Norte-3","Zapata-3"],["Etiopía-3","Eugenia-3"],["Guerrero-3","Hidalgo-3"],["Guerrero-3","Tlatelolco-3"],["Guerrero-3","Guerrero-B"],["Hidalgo-3","Juárez-3"],["Hospital General-3","Niños Héroes-3"],["La Raza-3","Potrero-3"],["La Raza-3","Tlatelolco-3"],["La Raza-3","La Raza-5"],["Miguel A. de Quevedo-3","Viveros-3"],["Zapata-12","Zapata-3"],["Bondojito-4","Consulado-4"],["Bondojito-4","Talismán-4"],["Canal del Norte-4","Consulado-4"],["Canal del Norte-4","Morelos-4"],["Candelaria-4","Fray Servando-4"],["Candelaria-4","Morelos-4"],["Consulado-4","Consulado-5"],["Fray Servando-4","Jamaica-4"],["Jamaica-4","Santa Anita-4"],["Jamaica-4","Jamaica-9"],["Martín Carrera-4","Talismán-4"],["Martín Carrera-4","Martín Carrera-6"],["Morelos-4","Morelos-B"],["Santa Anita-4","Santa Anita-8"],["Aragón-5","Eduardo Molina-5"],["Aragón-5","Oceanía-5"],["Autobuses del Norte-5","Instituto del Petróleo-5"],["Autobuses del Norte-5","La Raza-5"],["Consulado-5","Eduardo Molina-5"],["Consulado-5","Valle Gómez-5"],["Hangares-5","Pantitlán-5"],["Hangares-5","Terminal Aérea-5"],["Instituto del Petróleo-5","Politécnico-5"],["Instituto del Petróleo-5","Instituto del Petróleo-6"],["La Raza-5","Misterios-5"],["Misterios-5","Valle Gómez-5"],["Oceanía-5","Terminal Aérea-5"],["Oceanía-5","Oceanía-B"],["Pantitlán-5","Pantitlán-9"],["Pantitlán-5","Pantitlán-A"],["Azcapotzalco-6","Ferrería-6"],["Azcapotzalco-6","Tezozomoc-6"],["Deportivo 18 de Marzo-6","La Villa/Basílica-6"],["Deportivo 18 de Marzo-6","Lindavista-6"],["El Rosario-6","Tezozomoc-6"],["El Rosario-6","El Rosario-7"],["Ferrería-6","Norte 45-6"],["Instituto del Petróleo-6","Instituto del Petróleo-6"],["Instituto del Petróleo-6","Lindavista-6"],["Instituto del Petróleo-6","Vallejo-6"],["La Villa/Basílica-6","Martín Carrera-6"],["Norte 45-6","Vallejo-6"],["Aquiles Serdán-7","Camarones-7"],["Aquiles Serdán-7","El Rosario-7"],["Auditorio-7","Constituyentes-7"],["Auditorio-7","Polanco-7"],["Barranca del Muerto-7","Mixcoac-7"],["Camarones-7","Refinería-7"],["Constituyentes-7","Tacubaya-7"],["Mixcoac-7","San Antonio-7"],["Mixcoac-12","Mixcoac-7"],["Polanco-7","San Joaquín-7"],["Refinería-7","Tacuba-7"],["San Antonio-7","San Pedro los Pinos-7"],["San Joaquín-7","Tacuba-7"],["San Pedro los Pinos-7","Tacubaya-7"],["Tacubaya-7","Tacubaya-9"],["Aculco-8","Apatlaco-8"],["Aculco-8","Escuadrón 201-8"],["Apatlaco-8","Iztacalco-8"],["Atlalilco-8","Escuadrón 201-8"],["Atlalilco-8","Iztapalapa-8"],["Atlalilco-12","Atlalilco-8"],["Bellas Artes-8","Garibaldi-8"],["Bellas Artes-8","San Juan Letrán-8"],["Cerro de la Estrella-8","Iztapalapa-8"],["Cerro de la Estrella-8","UAM/I-8"],["Chabacano-8","La Viga-8"],["Chabacano-8","Obrera-8"],["Chabacano-8","Chabacano-9"],["Constitución de 1917-8","UAM/I-8"],["Coyuya-8","Iztacalco-8"],["Coyuya-8","Santa Anita-8"],["Doctores-8","Obrera-8"],["Doctores-8","Salto del Agua-8"],["Garibaldi-8","Garibaldi-B"],["La Viga-8","Santa Anita-8"],["Salto del Agua-8","San Juan Letrán-8"],["Centro Médico-9","Chilpancingo-9"],["Centro Médico-9","Lázaro Cárdenas-9"],["Chabacano-9","Jamaica-9"],["Chabacano-9","Lázaro Cárdenas-9"],["Chilpancingo-9","Patriotismo-9"],["Ciudad Deportiva-9","Puebla-9"],["Ciudad Deportiva-9","Velódromo-9"],["Jamaica-9","Mixiuhca-9"],["Mixiuhca-9","Velódromo-9"],["Pantitlán-9","Puebla-9"],["Pantitlán-9","Pantitlán-A"],["Patriotismo-9","Tacubaya-9"],["Atlalilco-12","Culhuacán-12"],["Atlalilco-12","Mexicaltzingo-12"],["Calle 11-12","Lomas Estrella-12"],["Calle 11-12","Periférico Oriente-12"],["Culhuacán-12","San Andrés Tomatlán-12"],["Eje Central-12","Ermita-12"],["Eje Central-12","Parque de los Venados-12"],["Ermita-12","Mexicaltzingo-12"],["Hospital 20 de Nov-12","Insurgentes Sur-12"],["Hospital 20 de Nov-12","Zapata-12"],["Insurgentes Sur-12","Mixcoac-12"],["Lomas Estrella-12","San Andrés Tomatlán-12"],["Nopalera-12","Olivos-12"],["Nopalera-12","Zapotitlán-12"],["Olivos-12","Tezonco-12"],["Parque de los Venados-12","Zapata-12"],["Periférico Oriente-12","Tezonco-12"],["Tláhuac-12","Tlaltenco-12"],["Tlaltenco-12","Zapotitlán-12"],["Acatitla-A","Peñón Viejo-A"],["Acatitla-A","Santa Marta-A"],["Agrícola Oriental-A","Canal de San Juan-A"],["Agrícola Oriental-A","Pantitlán-A"],["Canal de San Juan-A","Tepalcates-A"],["Guelatao-A","Peñón Viejo-A"],["Guelatao-A","Tepalcates-A"],["La Paz-A","Los Reyes-A"],["Los Reyes-A","Santa Marta-A"],["Peñón Viejo-A","Peñón Viejo-A"],["Bque. de Aragón-B","Deportivo Oceanía-B"],["Bque. de Aragón-B","Villa de Aragón-B"],["Buenavista-B","Guerrero-B"],["Ciudad Azteca-B","Plaza Aragón-B"],["Deportivo Oceanía-B","Oceanía-B"],["Ecatepec-B","Múzquiz-B"],["Ecatepec-B","Olímpica-B"],["Garibaldi-B","Guerrero-B"],["Garibaldi-B","Lagunilla-B"],["Guerrero-B","Lagunilla-B"],["Impulsora-B","Nezahualcóyotl-B"],["Impulsora-B","Río de los Remedios-B"],["Lagunilla-B","Tepito-B"],["Morelos-B","San Lázaro-B"],["Morelos-B","Tepito-B"],["Múzquiz-B","Río de los Remedios-B"],["Nezahualcóyotl-B","Villa de Aragón-B"],["Oceanía-B","Romero Rubio-B"],["Olímpica-B","Plaza Aragón-B"],["R. Flores Magón-B","Romero Rubio-B"],["R. Flores Magón-B","San Lázaro-B"]];
var linkw=[];
for(var i=0;i<links.length;i++ ){
    if(links[i][0].split("-")[0]==links[i][1].split("-")[0]){
        linkw.push([links[i][0],links[i][1],3])
    }else{linkw.push([links[i][0],links[i][1],1])}

}
console.log(linkw)
G.addWeightedEdgesFrom(linkw);
var dcolor={"1":"#F14A9D", "2":"#1675C7", "3" :"#BBAC02", "4":"#79CFB4", "5":"#FFDC00", "6":"#EF2622", "7":"#F57019", "8":"#00A060", "9":"#4E1801", "12":"#B19A3A", "A" :"#8D188E", "B":"#BFBDBE"};

var inicio="",final="";

$('.typeahead.inicial').typeahead({hint: true,highlight: true,minLength: 1},{name: 'states',source: substringMatcher(states)})
.on('typeahead:selected', function (obj, datum) {
     inicio= datum;
     ruta(inicio, final,G)
});


$('.typeahead.final').typeahead({hint: true,highlight: true,minLength: 1},
     {name: 'states',source: substringMatcher(states)})
.on('typeahead:selected', function (obj, datum) {
     final= datum;     ruta(inicio, final,G);});


function ruta(inicio, final,G){     
     if(inicio!="" && final!=""){
          d3.select("div.caminito").remove();
          var svg1=d3.select("#caminito")
               .append("div")
               .attr("class","col-sm-8 caminito")
               .style("overflow-x", "scroll")
               .attr("position","relative")
               .append("svg")
               .attr("width",w)
               .attr("height",h*.7)
               .attr("class","caminito")     
               .append("g")
               .attr("class","caminito");


          d3.selectAll("line.ruta").remove();
          d3.selectAll("circle.ruta").remove()
          var lisr=jsnx.shortestPath(G,{source:inicio,target:final,weight:"weight"});

          d3.select("svg.caminito")
               .attr("width",sepy*(lisr.length)+35*w/1000+30)


          var indi=lisr[0].split("-")[1],despy=0, despx=0,interc=0;          
          for (var ii=0;ii<lisr.length;ii++){
               console.log(valoresdel[lisr[ii]][1])
               if(indi!=lisr[ii].split("-")[1]){

                    var indiant=indi;
                    despy=despy+1;despx=despx+1;indi=lisr[ii].split("-")[1]; 
                    interc=interc+2;
                    if(interc/ 2==parseInt(interc/2)){

                         texef.attr("y",w*.5+despx*sepy+3*er);
                         img.attr("y",w*.5+despx*sepy+5*er)
                         tx1.attr("y",w*.5+despx*sepy+w*.15*escim+7*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][0]+valoresdel[lisr[ii]][0])))))
                         tx2.attr("y",w*.5+despx*sepy+w*.15*escim+7*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][2]+valoresdel[lisr[ii]][2])))))
                         tx3.attr("y",w*.5+despx*sepy+w*.15*escim+7*er)
                              .text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][1]+valoresdel[lisr[ii]][1])))))


                    }
                    tx1.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][0]+valoresdel[lisr[ii]][0])))))
                    tx2.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][2]+valoresdel[lisr[ii]][2])))))
                    tx3.text(cerovacio(""+parseInt(Math.round((valoresdel[lisr[ii-1]][1]+valoresdel[lisr[ii]][1])))))
                    svg1.append("line")
                         .attr("class","ruta")
                         .attr("y1",w*.5+(despx-1)*sepy)
                         .attr("x1",20+(ii-despy)*sepy)
                         .attr("y2",w*.5+despx*sepy)
                         .attr("x2",20+(ii-despy)*sepy)
                         .style("stroke","gray")
                         .style("stroke-width",4)
                         .style("stroke-dasharray","3,3")
               }
               else{
                    interc=interc+1;
                    var texef=svg1.append("text")
                         .attr("class","estaciones")
                         .attr("y",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+3*er}else{return w*.5+despx*sepy-3*er}})
                         .attr("x",20+(ii-despy)*sepy)
                         .text(lisr[ii].split("-")[0])
                         .style("text-anchor","middle")
                         

                    var img=svg1.append("image")
                         .attr("xlink:href",function(){if(interc/ 2==parseInt(interc/2)){return "./imagenes/delitoswebinferior.svg"}else{return "./imagenes/delitoswebsuperior.svg"}})
                         .attr("y",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+5*er}else{return w*.5+despx*sepy-w*.15*escim-5*er}})
                         .attr("x",20+(ii-despy)*sepy-w*.075)
                         .attr("height",w*.15*escim)
                         .attr("width",w*.15)

                    if(ii!=0){
                         svg1.append("line")
                              .attr("class","ruta")
                              .attr("y1",w*.5+despx*sepy)
                              .attr("x1",20+(ii-despy)*sepy)
                              .attr("y2",w*.5+despx*sepy)
                              .attr("x2",20+(ii-1-despy)*sepy)
                              .style("stroke",dcolor[lisr[ii].split("-")[1]])
                              .style("stroke-width",er*.8)
                         }
           
                    marder.style("height",d3.select("div.col-sm-8.caminito").style("height"));

                    var tx1=svg1.append("text")
                         .attr("class","cifras")
                         .attr("y",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+w*.15*escim+7*er}else{return w*.5+despx*sepy-w*.15*escim-7*er}})
                         .attr("x",20+(ii-despy)*sepy-w*.05)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][0])))
                         .style("text-anchor","middle")
                         
                    var tx2=svg1.append("text")
                         .attr("class","cifras")
                         .attr("y",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+w*.15*escim+7*er}else{return w*.5+despx*sepy-w*.15*escim-7*er}})
                         .attr("x",20+(ii-despy)*sepy+.05*w-w*.05)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][2])))
                        .style("text-anchor","middle")
                         
                    var tx3=svg1.append("text")
                         .attr("class","cifras")
                         .attr("y",function(){if(interc/ 2==parseInt(interc/2)){return w*.5+despx*sepy+w*.15*escim+7*er}else{return w*.5+despx*sepy-w*.15*escim-7*er}})
                         .attr("x",20+(ii-despy)*sepy+.10*w-w*.05)
                         .text(cerovacio(""+Math.round(valoresdel[lisr[ii]][1])))
                         .style("text-anchor","middle")
              }
            
      };
      //
      var indi=lisr[0].split("-")[1],despy=0, despx=0,interc=0;  
     for (var ii=0;ii<lisr.length;ii++){
               if(indi!=lisr[ii].split("-")[1]){despy=despy+1;despx=despx+1;indi=lisr[ii].split("-")[1]; interc=interc+2;
                    if(interc/ 2==parseInt(interc/2)){

                         
                    }
               
               }
               else{
                    interc=interc+1;
  


           
              }
               svg1.append("circle")
                    .attr("class","ruta")
                    .attr("r",er)
                    .attr("cy",w*.5+despx*sepy)
                    .attr("cx",20+(ii-despy)*sepy)
                    .style("stroke-width",er*.5)
      };
      var tlc;
      if(despx>0){ tlc=-.85*(despx+1)*sepy}else{ tlc=-.85*(despx+2)*sepy};
      d3.select("g.caminito").attr("transform","translate("+w*.08+","+(tlc)+")")

      }};
}

}

function cerovacio(dd){
    if(dd!="0"){return dd}
    else{return ""}


}