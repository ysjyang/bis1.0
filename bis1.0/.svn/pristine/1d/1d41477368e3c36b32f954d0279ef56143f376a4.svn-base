
if (Ext == null) {
	Ext = {lt:{}};
}
if (Ext.lt == null) {
	Ext.lt = {demo:{}};
}
if (Ext.lt.demo == null) {
	Ext.lt.demo = {};
}
Ext.lt.demo.login = function (config, server) {
	var _login={};
	var n=config.loginname;
	var p=config.pwd;
	
	
	function _draw(div,_l){
		div.innerHTML="<input id='name'><br/><input id='pwd'/><button id='dologin'>µÇÂ¼</button>";
		_l.name=document.getElementById('name');
		_l.pwd=document.getElementById('pwd');
		_l.dologin=document.getElementById('dologin');
		_l.dologin.onclick=function(){
			
			Ext.lt.RCPAnnotation.call(server,"dologin",{username:_l.name.value,p:_l.pwd.value});
		}
	}
	_login.draw=function(div){
		_draw(div,this);
	}
	
	
	return _login;
};
function aacc(v){
alert(v);
}
