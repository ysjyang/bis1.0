if(Ext.lt.uiapi==null) Ext.lt.uiapi={};

// apiҳ��ģ�壬����������
Ext.lt.uiapi.template=function(config){
	var html='<div id=apimenu style="float:left;padding-left:3px;padding-right:3px;" layout="{w:{fit:200},h:{fit:true}}"></div><div id=apicontext style="float:left;overflow:hidden" layout="{w:{fit:-250},h:{fit:true}}"></div>';
	Ext.lt.HTML.setInnerHTML(document.body,html);
	
	this.apimenu=document.body.firstChild;
	this.apicontext=document.body.lastChild;
	
	config.menucmp.draw(this.apimenu);
	config.contextcmp.draw(this.apicontext);
}


// ����Qtree��api�ĵ�Ŀ¼�����������������������
Ext.lt.uiapi.menucmp=new Ext.lt.component(function(config){
	var _html='<div><input name="search" type="text" layout="{w:{fit:true}}" tipstext="�������ѯ����..." /></div><div layout="{w:{fit:true},h:{fit:\'auto\'}}"></div>';
	var _cmp={};
	var _search=null;
	var _qtree=null;
	
	_cmp.draw=function(el){
		Ext.lt.HTML.setInnerHTML(el,_html);
		_search=el.firstChild.firstChild;
		_qtree=new Ext.lt.Qtree({
			data:[{itemid:'Ext.lt',text:'��������',html:'./Ext.lt/default.html'}
				,{itemid:'JScriptExpand',text:'Js���ö�����չ',html:'./Ext.lt/JScriptExpand.html'}
				,{itemid:'aninmation',text:'��ʽ����',html:'./Ext.lt/aninmation/default.html'}
				,{itemid:'RCP',text:'Զ�̵���',html:'./Ext.lt/RPC/default.html'}
				,{itemid:'RCPConsole',text:'Զ�̵����ն�',html:'./Ext.lt/RCPConsole/default.html'}
				,{itemid:'util',text:'������'}
				,{itemid:'HTML',text:'HTML��չ'}
				,{itemid:'Qtree',text:'Qtree',html:'./Ext.lt/Qtree/default.html'}
				,{itemid:'dateutil',text:'���ڹ���',html:'./Ext.lt/dateutil/default.html'}
				,{itemid:'layout',text:'���ֹ���',html:'./Ext.lt/layout/default.html'}
				,{itemid:'message',text:'ҳ����Ϣ����',html:'./Ext.lt/message/default.html'}
				,{itemid:'window',text:'���ڶ���',html:'./Ext.lt/window/default.html'}
				,{itemid:'popwindow',text:'������ʾ�����',html:'./Ext.lt/popwindow/default.html'}
				,{itemid:'cookie',text:'cookie����'}
				,{itemid:'showPageTest',text:'ҳ�����ܲ���'}
				,{itemid:'editpanel',text:'�༭��'}
				,{itemid:'recordset',text:'���ݼ�',html:'./Ext.lt/recordset/default.html'}
				,{itemid:'datatable',text:'���',html:'./Ext.lt/datatable/datatable.html'}
				,{itemid:'report',text:'����',html:'./Ext.lt/report/default.html'}
				,{itemid:'menu',text:'�˵�',html:'./Ext.lt/popupmenu/default.html'}
				,{itemid:'color',text:'��ɫѡ����',html:'./Ext.lt/color/default.html'}
				,{itemid:'tabpanel',text:'tabҳ',html:'./Ext.lt/tabpanel/default.html'}
				
			],
			outformart:' <a href="javascript:void(0)" >#text</a>',
			on:{
				'nodeclick':function(qtree,param){
					Ext.lt.message.send('menucmp','click',param.data.html==null?'./_blank.html':param.data.html);
				}
				
			}
		});
		_qtree.draw(el.lastChild);
		
		_search.onkeyup=function(){
			if(this.value==''){
				_qtree.setFilter([]);
			}
			else{
				_qtree.setFilter([{field:'text',values:[this.value]}],'left');
			}
			_qtree.reflash();
		}
	}
	
	
	_cmp.resize=function(w,h){
		
	}
	return _cmp;
});


// ����Iframeչʾ��������
Ext.lt.uiapi.contextcmp=new Ext.lt.component(function(config){
	var _frame=null;
	var _cmp={}
	_cmp.draw=function(el){
		Ext.lt.HTML.setInnerHTML(el,'<iframe src="Ext.lt/default.html" layout="{w:{fit:true},h:{fit:true}}" scrolling="auto" border="0"></iframe>');
		_frame=el.firstChild;
		Ext.lt.message.hook('menucmp','click',function(htmlurl){
			_frame.src=htmlurl
		});
	}
	_cmp.resize=function(w,h){}
	return _cmp;
});
