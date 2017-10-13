if(Ext.lt.study==null) Ext.lt.study={};
if(Ext.lt.study.component==null) Ext.lt.study.component={};

Ext.lt.study.component.hellow
Ext.lt.study.component.hellow=function(sid,config){
	var server=sid;
	var cfg=config;
	var _cmp={resize:function(){}}
	var rcpbtn=null;
	var msgdiv=null;
	var prossbtn=null;	
	var rcpbtn_withparam=null;
	
	
	function showmsg(txt){
		msgdiv.innerHTML=txt;
	}
	
	_cmp.draw=function(el){
		el.innerHTML=['<div id=msgdiv></div><button id="getword">再次获取</button><br/>',
		'<input type="text"><button id="getwordwithparam">带参数调用</button><br/>',
		'<button id="prossrpc">带进度条</button><br/>',
		'<button onclick="Ext.lt.RCP.server(\'com.longtu.demo.component.HelloWord\',\'swapUser\');">清除用户</button>',
		'<button onclick="Ext.lt.RCP.server(\'com.longtu.demo.component.HelloWord\',\'swapUser\',\'IFMIS\');">切换到IFMIS用户</button>'].join('');
		msgdiv=document.getElementById('msgdiv');
		rcpbtn=document.getElementById('getword');
		rcpbtn.onclick=function(){
			Ext.lt.RCP.call(server,'getWord',[],function(rs){				
				showmsg(rs)
			});
		}
		
		rcpbtn_withparam=document.getElementById('getwordwithparam');
		rcpbtn_withparam.onclick=function(){
			
			Ext.lt.RCP.server('com.longtu.demo.component.HelloWord','getWord',this.previousSibling.value,function(rs){				
				showmsg(rs)
			});
		}
		
		prossbtn=document.getElementById('prossrpc');
		prossbtn.onclick=function(){
			Ext.lt.RCPConsole.tipsserver('com.longtu.demo.component.HelloWord','getWord',["完成",['How are you','Fine think you and you','i\'am fine too, thank you']],function(rs){				
				showmsg(rs)
			});
		}
		
		if(cfg!=null)showmsg(cfg.msg)
	}
	
	
	
	_cmp.resize=function(){}
	
	return _cmp;
}