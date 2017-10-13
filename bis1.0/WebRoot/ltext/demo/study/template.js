if(Ext.lt.study==null) Ext.lt.study={};
if(Ext.lt.study.template==null) Ext.lt.study.template={};
Ext.lt.study.template.showFrameworkDemoTemplate=function(config){
	document.body.innerHTML='<div style="height:40px;font:18px;background-color:#8ba3da;padding:10px">¿ò¼ÜÑÝÊ¾</div><div id="mainbody" style="background-color:rgb(238, 238, 238)" layout="{h:{fit:\'auto\'}}"></div>';
	var mainbody=document.getElementById('mainbody')
	
	Ext.lt.layout.on(function(){
		config.obj.draw(mainbody)
		
	})
	
};