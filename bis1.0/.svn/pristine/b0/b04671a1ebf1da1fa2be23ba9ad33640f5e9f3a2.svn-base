


if (Ext == null) {
	alert("\u8bf7\u52a0\u8f7dltext_core.js\u6587\u4ef6");
}
if (Ext.lt.datatable == null) {
	alert("\u8bf7\u52a0\u8f7ddatatable3.0.js\u6587\u4ef6");
}
/**
 基于datatable实现可编辑列表
 
*/
try {
	_dynarch_popupCalendar != null;
}
catch (e) {
	_dynarch_popupCalendar = null;
}
Ext.lt.editdatatable = Ext.lt.createComponent(function (rs) {
	//创建div，在div里面放select和tree等。
	//控制录入方式 ，如金额类型。增加Amt类型。
	//支持弹出树的选择。
	//控制有来源的进行选择数据的格式，当满足条件的直接放到mapper
	//增加功能1.录入状态的方向键控制。单击选中情况下为全部替换。
	//增强功能1.录入状态的方向键控制。第二次点击进入具体编辑状态。控制内部位置。
	//选择键的控制。        direction控制方向键
	//用户自定义方向键控制。
	//全局录入状态的控制。
	//整行的编辑状态控制。  结果集中的edit属性如果是0或者false表示不可以编辑的行
	//下拉内容的严格控制。
	//增强扩展性。  可以自己扩展编辑类型，给table.editcfg进行扩展方法，方法需要有start和end方法
	var _editor = null;//编辑的单元格
	var table = new Ext.lt.datatable35(rs);
	table.editcfg={edit:true,doEdit:false,editing:false,method:{},direction:{},hasDirection:false,keyvalue:''};
	table.editversion = "2.7";
	var _tableid = table.id;
	var ovalue;
	var odata;
	
	//编辑中弹出用的div。
	var _editdiv=document.createElement("div");
	
	function clickCell(table,el,l,c,d){
		if(table.editcfg.stuffEl_l==l&&table.editcfg.stuffEl_c==c){
			//触发开始编辑状态  	
			_columnclick.apply(this,arguments);
			return;
		}
		
		removeSelect(table,l,c);
		//需要判断当前有没有进行录入操作，如果没有不需要调用endEdit方法，否则需要调用其end方法
		table.editcfg.keyvalue='';
		table.editcfg.stuffEl_l=l;
		table.editcfg.stuffEl_c=c;
		var span=getSelectSpan(table,l,c);
		span.className=span.className+' edit_select';
	}
	table.onEvent('onclick',clickCell);
	
	//通过keyup控制方向键等
	table.onEvent('onkeyup',function(table,el,l,c,d){
		event.cancelBubble=false
		if(table.editcfg.editing){
			return;
		}
		var keycode=event.keyCode
		if(table.editcfg.hasDirection&&table.editcfg.stuffEl_l!=null&&table.editcfg.stuffEl_c!=null&&table.editcfg.direction[event.keyCode]!=null){
			//方向控制的方式使用stuffEl_l 和 stuffEl_c 的值得改变
			if(table.editcfg.direction[keycode]=='up'){
			}else
			if(table.editcfg.direction[keycode]=='down'){
			}else
			if(table.editcfg.direction[keycode]=='left'){
			}else
			if(table.editcfg.direction[keycode]=='right'){
			}else
			if(table.editcfg.direction[keycode]=='enter'){
			}else
			if(table.editcfg.direction[keycode]=='esc'){
			}
			table.goto(table.editcfg.stuffEl_l,table.editcfg.stuffEl_c);
			//调用clickCell方法，
			return;
		}
		if(!table.editcfg.doEdit){
			//根据编辑类型调用 inputingCheck 判断录入的值是否满足录入情况，不符合录入数据不成功
			if(event.shiftKey){
			}
			//满足当前单元格如果可以进行编辑则该单元格不进入编辑状态时候是用全选的方式进行编辑：例如Excel
			table.editcfg.keyvalue+=keycode;
		}	
		return false;
		
	})
	//该方法可以获取目前进入编辑状态的单元格
	function getSelectSpan(table,l,c){
		var span=null;
		if(table.editcfg.stuffEl_l!=null&&table.editcfg.stuffEl_c!=null){
			span=document.getElementById(table.id+'_l'+table.editcfg.stuffEl_l+'_c'+table.editcfg.stuffEl_c+'_g');
			if(span==null){
				span=document.getElementById(table.id+'_l'+table.editcfg.stuffEl_l+'_c'+table.editcfg.stuffEl_c+'_d');
			}
		}
		return span;
	}
	//删除编辑选中状态
	function removeSelect(table,l,c){
		var span=getSelectSpan(table,l,c);
		
		if(span!=null){
			span.className=span.className.replace(" edit_select","");
		}
	}
	function rowspan(l,c,t){
		if(table.editcfg.stuffEl_l==l&&table.editcfg.stuffEl_c==c){
			return "bl edit_select";
		}else{
			return "bl "
		}
	}
	
	//数字类型编辑状态
	table.editcfg.method.number={start:function(table,el,l,c,d){
		//调用init_input方法
		//获取返回对象控制键盘事件的监听。
		//根据数据格式控制录入的值，调用inputingCheck
		
	},inputingCheck:function(){},end:function(){}};
	//日期类型编辑状态
	table.editcfg.method.data={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){}};
	//boolean  check 类型编辑状态
	table.editcfg.method.boolean={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){}};
	//文本状态编辑
	table.editcfg.method.input={start:function(table,el,l,c,d){
		var view='asdfsadfasd';
		var _editor = init_input(table,el,l,c,d,view);
		
	},inputingCheck:function(){},end:function(){}};
	//下拉菜单类型编辑状态
	table.editcfg.method.select={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){
		//控制结束操作的值，如果使用非严格校验
		//则 控制有来源的进行选择数据的格式，当满足format的直接放到mapper
		//控制值 _editor.value=*** 
		//其他操作请参考以前实现
	}};
	//树类型编辑状态
	table.editcfg.method.tree={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){
		//同上	
	}};
	//弹出树类型编辑状态
	table.editcfg.method.poptree={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){}};
	//指标使用类型的编辑状态
	table.editcfg.method.custom={start:function(table,el,l,c,d){
	
	},inputingCheck:function(){},end:function(){}};
	//获取编辑状态需要弹出时候的位置
	function getEditorPosition(){
		if(Ext.lt.isie){
			return getEditorPosition2ie();
		}else{
			return getEditorPosition2chrome();
		}
	}
	function getEditorPosition2chrome(){
		var pos=Ext.lt.HTML.positionedOffset(_editor,document.body,false);
		var p={left:null,top:null,right:null,bottom:null}
		//h=180,w=200;
		//不同浏览器使用不同方法计算
		var doc=document.body;
		var st=doc.scrollTop;
		var sl=doc.scrollLeft;
		var e=window.event;
		
		if(document.documentElement.scrollHeight-pos.top>200){
			p.top=pos.top+_editor.offsetHeight;//st+e.clientY-(pos.y)-200+_editor.offsetHeight
		}else{
			p.top=pos.top-200-5;//st+e.clientY-(e.screenY-e.y)+_editor.offsetHeight
		}
		
		if(doc.clientWidth-pos.left>400){
			p.left=pos.left//sl+e.clientX-e.offsetX-180+_editor.offsetWidth
		}else{
			p.left=pos.left-225+_editor.offsetWidth//sl+e.clientX-e.offsetX
		}
		return p;
	}
	function getEditorPosition2ie(){
		var pos=Ext.lt.HTML.positionedOffset(_editor,document.documentElement,false);
		var p={left:null,top:null,right:null,bottom:null}
		//h=180,w=200;
		//不同浏览器使用不同方法计算
		var doc=document.documentElement;
		var st=doc.scrollTop;
		var sl=doc.scrollLeft;
		var e=window.event;
		if(doc.clientHeight-e.clientY<200){
			//p.top=st+e.clientY-e.offsetY-200+_editor.offsetHeight
			p.top=$(_editor).offset().top-200+_editor.offsetHeight*2;
			
		}else{
			p.top=st+e.clientY-e.offsetY+_editor.offsetHeight
		}
		if(doc.clientWidth-e.clientX<200){
			//p.left=sl+e.clientX-e.offsetX-180+_editor.offsetWidth
			p.left=sl+e.clientX-e.offsetX
		}else{
			p.left=sl+e.clientX-e.offsetX
		}
		return p;
	}	
	function _columnclick(table,el,l,c,d){
		if(!this.edit&&!table.editcfg.edit) return;
		table.editcfg.doEdit=false;
		if(this.oneditstart==null||this.oneditstart(table,el,l,c,d)!=false){
			if(table.editcfg.doEdit){return;}
			table.editcfg.doEdit=true;//开启进入编辑状态。
			_startedit(table,el,l,c,d);
		}
	}
	//开始进入编辑状态
	function _startedit(table,el,l,c,d){
		
		ovalue=d[table.getCol(c).name];
		odata=Ext.lt.clone(d);
		_init_edit(el,table.getCol(c),d,l,c)
	}
	var span=document.createElement("span")
	span.contentEditable=true;
	span.style.textAlign='right';
	span.className="edit";
	var range;
	if(document.createRange){
	    range = document.createRange();
	}else{
	    range = document.body.createTextRange();
	}
	// 初始化单元格编辑状态，由每个编辑组件调用该方法获取编辑内容
	//el,col,d,l,c,view
	function init_input(table,el,l,c,d,view){
		//开启span的编辑状态
		el.innerHTML='';
		el.appendChild(span);
		span.innerHTML=view;
		span.focus();
		span.contentEditable=true;
		var col=table.getCol(c);
		//控制显示内容
		_editor=span;
		_editor.col=col
		_editor.l=l
		_editor.c=c
		
		table.editor=_editor;
		//设置选中内容
		if(table.editcfg.selectedType=='all'||_editor.col.selectedType=='all'){
			if(range.moveToElementText==null){
				range.selectNode(span);
				var selection=window.getSelection()
				selection.removeAllRanges();
				selection.addRange(range);
				selection.selectAllChildren(span)
			}else{
				range.moveToElementText(span)
				range.select();
			}
		}
		return _editor;
	}
	// 初始化简单可编辑区
	function _init_edit(el,col,d,l,c){
		var methods=table.editcfg.method;
		if(el==null||el.contains(_editor)) return;
		if(_editor!=null)_endEdit.apply(this,[true,el,d]);
		if(table.editcfg.nowtype!=null){
			//methods[table.editcfg.nowtype]进行非空判断，当为空使用哪种录入方式
			methods[table.editcfg.nowtype].start(table,el,l,c,d);
		}else{
			//methods[table.editcfg.nowtype]进行非空判断，当为空使用哪种录入方式
			methods[col.edittype].start(table,el,l,c,d);
		}
		
	}
	//结束编辑状态的方法	
	function _endEdit(save,el,d) {
		var methods=table.editcfg.method;
		var l=table.editcfg.stuffEl_l;
		var c=table.editcfg.stuffEl_c;
		if(table.editcfg.nowtype!=null){
			//methods[table.editcfg.nowtype]进行非空判断，当为空使用哪种录入方式
			methods[table.editcfg.nowtype].end(table,el,l,c,d);
		}else{
			//methods[table.editcfg.nowtype]进行非空判断，当为空使用哪种录入方式
			var col=table.getCol(c);
			methods[col.edittype].end(table,el,l,c,d);
		}
		
		//关闭编辑状态
		
		//赋值给具体对象
		//刷新当前显示内容
	}
	var adddata = {};
	var deldata = {};
	var updateData = {};
	// 这里开始识别可编辑属性
	//编辑表格继承后需要修改的方法
	table._setColos_bak=table.setCols;
	table.setCols = function (c) {
		if (!Ext.lt.isArray(c)) {
			c = [c];
		}
		var _columns=[];
		var col;
		for (var n = 0; n < c.length; n++) {
			col = {};
			col = c[n];
			if (col == null) {
				continue;
			}
			
			if(col.editType==null){
				if(col.datatype=='N'&&col.datatype=='F'&&col.datatype=='I'&&col.datatype=='P'&&col.datatype=='A'){
					col.edittype='number';
				}else if(col.datatype=='D'){
					col.edittype='data';
				}else if(col.datatype=='B'){
					col.edittype='boolean';
				}else if(col.mapping==null){
					col.edittype='input'
				}else if(col.mapper.columns.indexOf('supcode')==-1){
					col.edittype='select';
				}else if(col.datatype=='tree'){
					col.edittype='tree';
				}
			}
			col._rowspan=col.rowspan;
			col.rowspan=rowspan;
			_columns.push(col);
		}
		table._setColos_bak(_columns);
	};

	table._draw_bak = table.draw;
	table.draw = function (div) {
		table.drawdiv = div;
		table._draw_bak(div);
	};
	table._reflash_bak = table.reflash;
	table.reflash = function (cc) {
		closeOpens();
		table._reflash_bak(cc);
	};
	table._destory = table.destory;
	table.destory = function () {
		if (_sel != null) {
			document.body.removeChild(_sel);
		}
		if (_treeDiv != null) {
			document.body.removeChild(_treeDiv);
		}
		this._destory();
	};
	table._setRecordset = table.setRecordset;
	table.setRecordset = function (rs) {
		table._setRecordset(rs);
		init();
	};
	
	//编辑表格自己的方法。
	table.moveKey = {"37":"left", "38":"up", "40":"down", "39":"right"};
	table.setMoveKey = function (cfg) {
		table.moveKey = Ext.lt.apply({"13":"down", "9":"right", "37":"left", "38":"up", "40":"down", "39":"right"}, cfg);
	};
	table.setSelectDown = function (b) {
		_selectOpen = b == true;
	};
	table.getOldData = function () {
		return odata;
	};
	table.getOldValue = function () {
		return ovalue;
	};
	table.mappingfilter = function (b) {
		_mappingfilter = b == true;
	};
	table.setOpenKeycode = function (keycode) {
		_openKey = keycode;
	};
	table.setEditSelect = function (type) {
		selectedType = type;
	};
	
	table.addData = function (v, il) {
		this.getRecordset().addData(v, il);
		if (!Ext.lt.isArray(v)) {
			v = [v];
		}
		for (var i = 0, l = v.length; i < l; i++) {
			adddata[v[i]._locationposition] = v[i];
		}
	};
	table.removeData = function (v) {
		this.getRecordset().remove(v);
		if (!Ext.lt.isArray(v)) {
			v = [v];
		}
		for (var i = 0, l = v.length; i < l; i++) {
			if (adddata[v[i]._locationposition] != null) {
				adddata[v[i]._locationposition] = null;
			} else {
				if (updateData[v[i]._locationposition] != null) {
					updateData[v[i]._locationposition] = null;
				}
				deldata[v[i]._locationposition] = v[i];
			}
		}
	};
	table.updateData = function (l, cname, v) {
		var d = this.getRecordset().getData(l);
		d[cname] = v;
		setUpdataValue(d, cname);
	};
	table.getAddData = function () {
		var ret = [];
		for (var e in adddata) {
			if (adddata[e] != null) {
				ret.push(adddata[e]);
			}
		}
		return ret;
	};
	table.updateDataBylocaid = function (locationposition, cname, v) {
		var d = this.getRecordset().query({_locationposition:locationposition})[0];
		d[cname] = v;
		setUpdataValue(d, cname);
	};
	table.getUpdataData = function () {
		var ret = [];
		for (var e in updateData) {
			if (updateData[e] != null) {
				ret.push(updateData[e]);
			}
		}
		return ret;
	};
	table.getRemoveData = function () {
		var ret = [];
		for (var e in deldata) {
			if (deldata[e] != null) {
				ret.push(deldata[e]);
			}
		}
		return ret;
	};
	table.setNowType = function (type) {
		this.nowtype = type;
	};
	table.getEditor = function () {
		return _editor;
	};
	table.getEditorPosition = function () {
		return getEditorPosition();
	};
	table.setTreeClass = function (classname) {
		qtreeclass = classname;
	};
	table.setMouselightCell=function(){}
	return table;
});

