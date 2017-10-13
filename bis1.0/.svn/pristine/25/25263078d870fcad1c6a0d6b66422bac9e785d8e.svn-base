//检查命名空间
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;

Ext.lt.cellconfig=function(service,config){
	var rs=null;
	var dt=null;
	var fm=null;
	var fmobj={};
	var col=[];
	function createWin(div){
		var _h=[];
		_h.push('<ul layout="{w:{fit:true}}" columnsize=1 labelwidth=300>');
		_h.push('<li label="编码：" width=\"250px\" type=\"input\" maxLength=50 name=\"code\" redwordmode=\"on\" />');
		_h.push('<li label="名称：" width=\"250px\" type=\"input\" maxLength=50 name=\"name\" redwordmode=\"on\" />');
		_h.push('<li label="行：" width=\"250px\" type=\"input\" maxLength=50 name=\"l\" redwordmode=\"on\" />');
		_h.push('<li label="列：" width=\"250px\" type=\"input\" maxLength=50 name=\"c\" redwordmode=\"on\" />');
		_h.push('<li label="其他条件：" width=\"250px\" type=\"textarea\" name=\"w\" redwordmode=\"on\" />');
		_h.push('</ul>');
		_h.push('<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>');
		_h.push('&nbsp;&nbsp;行内容填写行号，不控制行可以不写，多个行号用‘,’隔开<br/>');
		_h.push('&nbsp;&nbsp;例：  <br/>&nbsp;&nbsp;&nbsp;&nbsp;行： 1,2,3 表示第一，二，三行');
		_h.push('<br/><br/>');
		_h.push("&nbsp;&nbsp;列内容可以填写列号或列的英文名字(名字需要用引号''引起来)，不控制列可以不写，多个列号用‘,’隔开<br/>");
		_h.push('&nbsp;&nbsp;例：  <br/>&nbsp;&nbsp;&nbsp;&nbsp;列： 1,2,3 表示第一，二，三列');
		_h.push("<br/>&nbsp;&nbsp;&nbsp;&nbsp;列： 'itemid','code','name' 表示itemid列，code列，name列");
		_h.push('<br/><br/>');
		_h.push('&nbsp;&nbsp;提供默认参数(rs,c,cname,l,d,v)分别表示全部数据的recordSet对象，当前列号，当前列名字，当前行号，当前行的值，当前单元格的值<br/>');
		_h.push('&nbsp;&nbsp;返回值要求返回boolean类型<br/>');
		_h.push('&nbsp;&nbsp;例：<br/>');
		_h.push('&nbsp;&nbsp;&nbsp;&nbsp;其他条件： v>100&&(rs["name"]=="测试"||cname=="name")&&l>1');
		_h.push('</p>')
		_h.push('<center><button>确认</button><button>取消</button></center>');
		div.innerHTML=_h.join('');
		div.lastChild.firstChild.onclick=function(){
			wn.hidden();
		}
		div.lastChild.lastChild.onclick=function(){
			wn.hidden();
		}
		fm= Ext.lt.editpanel.initFormPanel(div.firstChild);
		fm.bind(fmobj);
		
		
		wn=new Ext.lt.window({title:"编辑信息",h:500,w:450,className:'wind7', close:false,pop:true,mark:true,autoshow:true});
		wn.draw(div);
		
	}
	function initTeble(div){
		dt=new Ext.lt.datatable(new Ext.lt.recordset());
		col=null;
		col=[dt.columns.seq,dt.columns.checkbox];
		
		col.push({alias:'编码',datatype:'S',name:'code'});
		col.push({alias:'名称',datatype:'S',name:'name'});
		col.push({alias:'单元格',datatype:'S',name:'cell'});
		col.push({alias:'备注',datatype:'S',name:'re'});
		dt.drawMultiHead(true);
		dt.setCols(col);
		/*********设置样式*************/
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	config.draw=function(d){
		d.innerHTML="<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='wn.show();Ext.lt.layout.doLayout();'>新增</button>&nbsp;&nbsp;<button class=\"btn\" onclick='wn.show();'>修改</button>&nbsp;&nbsp;<button class=\"btn\" onclick='alert(\"删除成功!\")'>删除</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div>"
		+"<div class='winfitmode' class='winfitmode' layout='{h:{fit:440},w:{fit:400}}' style='overflow:hidden;'></div>";
		initTeble(d.childNodes[1]);
		createWin(d.childNodes[2]);
	}
	config.resize=function(){
		
	}
	
	return config;
}