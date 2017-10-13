if(Ext.lt.uiapi==null) Ext.lt.uiapi={};

// api页面模板，左树右内容
Ext.lt.uiapi.template=function(config){
	var html='<div id=apimenu style="float:left;padding-left:3px;padding-right:3px;" layout="{w:{fit:200},h:{fit:true}}"></div><div id=apicontext style="float:left;overflow:hidden" layout="{w:{fit:-250},h:{fit:true}}"></div>';
	Ext.lt.HTML.setInnerHTML(document.body,html);
	
	this.apimenu=document.body.firstChild;
	this.apicontext=document.body.lastChild;
	
	config.menucmp.draw(this.apimenu);
	config.contextcmp.draw(this.apicontext);
}


// 基于Qtree的api文档目录，上面快速搜索，下面是树
Ext.lt.uiapi.menucmp=new Ext.lt.component(function(config){
	var _html='<div><input name="search" type="text" layout="{w:{fit:true}}" tipstext="请输入查询内容..." /></div><div layout="{w:{fit:true},h:{fit:\'auto\'}}"></div>';
	var _cmp={};
	var _search=null;
	var _qtree=null;
	
	_cmp.draw=function(el){
		Ext.lt.HTML.setInnerHTML(el,_html);
		_search=el.firstChild.firstChild;
		_qtree=new Ext.lt.Qtree({
			data:[{itemid:'Ext.lt',text:'公共函数',html:'./Ext.lt/default.html'}
				,{itemid:'JScriptExpand',text:'Js内置对象扩展',html:'./Ext.lt/JScriptExpand.html'}
				,{itemid:'aninmation',text:'样式动画',html:'./Ext.lt/aninmation/default.html'}
				,{itemid:'RCP',text:'远程调用',html:'./Ext.lt/RPC/default.html'}
				,{itemid:'RCPConsole',text:'远程调用终端',html:'./Ext.lt/RCPConsole/default.html'}
				,{itemid:'util',text:'工具类'}
				,{itemid:'HTML',text:'HTML扩展'}
				,{itemid:'Qtree',text:'Qtree',html:'./Ext.lt/Qtree/default.html'}
				,{itemid:'dateutil',text:'日期工具',html:'./Ext.lt/dateutil/default.html'}
				,{itemid:'layout',text:'布局管理',html:'./Ext.lt/layout/default.html'}
				,{itemid:'message',text:'页面消息管理',html:'./Ext.lt/message/default.html'}
				,{itemid:'window',text:'窗口对象',html:'./Ext.lt/window/default.html'}
				,{itemid:'popwindow',text:'弹出提示框对象',html:'./Ext.lt/popwindow/default.html'}
				,{itemid:'cookie',text:'cookie管理'}
				,{itemid:'showPageTest',text:'页面性能测试'}
				,{itemid:'editpanel',text:'编辑区'}
				,{itemid:'recordset',text:'数据集',html:'./Ext.lt/recordset/default.html'}
				,{itemid:'datatable',text:'表格',html:'./Ext.lt/datatable/datatable.html'}
				,{itemid:'report',text:'报告',html:'./Ext.lt/report/default.html'}
				,{itemid:'menu',text:'菜单',html:'./Ext.lt/popupmenu/default.html'}
				,{itemid:'color',text:'颜色选择器',html:'./Ext.lt/color/default.html'}
				,{itemid:'tabpanel',text:'tab页',html:'./Ext.lt/tabpanel/default.html'}
				
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


// 基于Iframe展示帮助内容
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
