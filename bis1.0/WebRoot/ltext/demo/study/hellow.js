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
		el.innerHTML=['<div id=msgdiv></div><button id="getword">�ٴλ�ȡ</button><br/>',
		'<input type="text"><button id="getwordwithparam">����������</button><br/>',
		'<button id="prossrpc">��������</button><br/>',
		'<button onclick="Ext.lt.RCP.server(\'com.longtu.demo.component.HelloWord\',\'swapUser\');">����û�</button>',
		'<button onclick="Ext.lt.RCP.server(\'com.longtu.demo.component.HelloWord\',\'swapUser\',\'IFMIS\');">�л���IFMIS�û�</button>'].join('');
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
			Ext.lt.RCPConsole.tipsserver('com.longtu.demo.component.HelloWord','getWord',["���",['How are you','Fine think you and you','i\'am fine too, thank you']],function(rs){				
				showmsg(rs)
			});
		}
		
		if(cfg!=null)showmsg(cfg.msg)
	}
	
	
	
	_cmp.resize=function(){}
	
	return _cmp;
}