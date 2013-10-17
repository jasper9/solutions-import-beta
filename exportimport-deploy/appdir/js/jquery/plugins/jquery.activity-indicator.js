/*
 * NETEYE Activity Indicator jQuery Plugin
 *
 * Copyright (c) 2010 NETEYE GmbH
 * Licensed under the MIT license
 *
 * Author: Felix Gnass [fgnass at neteye dot de]
 * Version: 1.0.0
 */

(function($){$.fn.activity=function(opts){return this.each(function(){var $this=$(this),el=$this.data("activity");el&&(clearInterval(el.data("interval")),el.remove(),$this.removeData("activity"));if(opts!==!1){opts=$.extend({color:$this.css("color")},$.fn.activity.defaults,opts),el=render($this,opts).css("position","absolute").prependTo(opts.outside?"body":$this);var h=$this.outerHeight()-el.height(),w=$this.outerWidth()-el.width(),margin={top:opts.valign=="top"?opts.padding:opts.valign=="bottom"?h-opts.padding:Math.floor(h/2),left:opts.align=="left"?opts.padding:opts.align=="right"?w-opts.padding:Math.floor(w/2)},offset=$this.offset();opts.outside?el.css({top:offset.top+"px",left:offset.left+"px"}):(margin.top-=el.offset().top-offset.top,margin.left-=el.offset().left-offset.left),el.css({marginTop:margin.top+"px",marginLeft:margin.left+"px"}),animate(el,opts.segments,Math.round(10/opts.speed)/10),$this.data("activity",el)}}),this},$.fn.activity.defaults={segments:12,space:3,length:7,width:4,speed:1.2,align:"center",valign:"center",padding:4},$.fn.activity.getOpacity=function(opts,i){var steps=opts.steps||opts.segments-1,end=opts.opacity!==undefined?opts.opacity:1/steps;return 1-Math.min(i,steps)*(1-end)/steps};var render=function(){return $("<div>").addClass("busy")},animate=function(){};function svg(tag,attr){var el=document.createElementNS("http://www.w3.org/2000/svg",tag||"svg");return attr&&$.each(attr,function(k,v){el.setAttributeNS(null,k,v)}),$(el)}if(document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect){render=function(target,d){var innerRadius=d.width*2+d.space,r=innerRadius+d.length+Math.ceil(d.width/2)+1,el=svg().width(r*2).height(r*2),g=svg("g",{"stroke-width":d.width,"stroke-linecap":"round",stroke:d.color}).appendTo(svg("g",{transform:"translate("+r+","+r+")"}).appendTo(el));for(var i=0;i<d.segments;i++)g.append(svg("line",{x1:0,y1:innerRadius,x2:0,y2:innerRadius+d.length,transform:"rotate("+360/d.segments*i+", 0, 0)",opacity:$.fn.activity.getOpacity(d,i)}));return $("<div>").append(el).width(2*r).height(2*r)};if(document.createElement("div").style.WebkitAnimationName!==undefined){var animations={};animate=function(el,steps,duration){if(!animations[steps]){var name="spin"+steps,rule="@-webkit-keyframes "+name+" {";for(var i=0;i<steps;i++){var p1=Math.round(1e5/steps*i)/1e3,p2=Math.round(1e5/steps*(i+1)-1)/1e3,value="% { -webkit-transform:rotate("+Math.round(360/steps*i)+"deg); }\n";rule+=p1+value+p2+value}rule+="100% { -webkit-transform:rotate(100deg); }\n}",document.styleSheets[0].insertRule(rule),animations[steps]=name}el.css("-webkit-animation",animations[steps]+" "+duration+"s linear infinite")}}else animate=function(el,steps,duration){var rotation=0,g=el.find("g g").get(0);el.data("interval",setInterval(function(){g.setAttributeNS(null,"transform","rotate("+ ++rotation%steps*(360/steps)+")")},duration*1e3/steps))}}else{var s=$("<shape>").css("behavior","url(#default#VML)").appendTo("body");if(s.get(0).adj){var sheet=document.createStyleSheet();$.each(["group","shape","stroke"],function(){sheet.addRule(this,"behavior:url(#default#VML);")}),render=function(target,d){var innerRadius=d.width*2+d.space,r=innerRadius+d.length+Math.ceil(d.width/2)+1,s=r*2,o=-Math.ceil(s/2),el=$("<group>",{coordsize:s+" "+s,coordorigin:o+" "+o}).css({top:o,left:o,width:s,height:s});for(var i=0;i<d.segments;i++)el.append($("<shape>",{path:"m "+innerRadius+",0  l "+(innerRadius+d.length)+",0"}).css({width:s,height:s,rotation:360/d.segments*i+"deg"}).append($("<stroke>",{color:d.color,weight:d.width+"px",endcap:"round",opacity:$.fn.activity.getOpacity(d,i)})));return $("<group>",{coordsize:s+" "+s}).css({width:s,height:s,overflow:"hidden"}).append(el)},animate=function(el,steps,duration){var rotation=0,g=el.get(0);el.data("interval",setInterval(function(){g.style.rotation=++rotation%steps*(360/steps)},duration*1e3/steps))}}$(s).remove()}})(jQuery);