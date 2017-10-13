
if (Ext == null) {
	Ext = {lt:{}};
}
if (Ext.lt == null) {
	Ext.lt = {demo:{}};
}
if (Ext.lt.demo == null) {
	Ext.lt.demo = {};
}
var innerHTML = [];
Ext.lt.demo.template = function (config, service) {
	function draw(div,obj){
		if(div==null) return;
		if(obj==null){
			div.innerHTML=='';
			return;	
		}
		// Ext组件都会有render方法
		if(Ext.lt.isFunction(obj.render)){
			obj.render(div);
		}
		// LT组件都会有draw方法
		else if(Ext.lt.isFunction(obj.draw)){
			obj.draw(div);
		}
		else{
			div.innerHTML=obj.toString();
		}
	}
	
	function creatediv(div){
		var html=[];
		html.push("<div id='demo_title' style='height:20px;' layout='{w:{fit:true}}' ></div>");
	  	html.push("<div id='demo_menu'  style='height:20px;' layout='{w:{fit:true}}'></div>");
	  	html.push("<div id='demo_main'  layout='{w:{fit:true}}'></div>");
		div.innerHTML=html.join("");
	}
	
	creatediv(document.getElementById("main"));
	

	var demo_title=document.getElementById('demo_title');
	var demo_menu=document.getElementById('demo_menu');
	var demo_main=document.getElementById('demo_main');
	draw(demo_title,config.title);
	draw(demo_menu,config.left);
	draw(demo_main,config.main);
	


};
