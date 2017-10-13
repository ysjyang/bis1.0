
if (Ext == null) {
	Ext = {lt:{}};
}
if (Ext.lt == null) {
	Ext.lt = {demo:{}};
}
if (Ext.lt.demo == null) {
	Ext.lt.demo = {};
}
Ext.lt.demo.testPanel = function (config, server) {
	var _testPanel={};
	_testPanel.cfg=config;
	
	function _draw(div,t){
		if(t.cfg.info==null){
			div.innerHTML='<div id="main" style="height:400px;width:400px;"></div>';
		}else{
			div.innerHTML=t.cfg.info;
		}
	}
	_testPanel.draw=function(div){
		_draw(div,this);
	}
	
	
	return _testPanel;
};

