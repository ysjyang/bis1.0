if(Ext==null){alert('请加载ltext_core.js文件');}
if(Ext.lt.datatable==null){alert('请加载datatable3.0.js文件');}

/**
 基于datatable实现可编辑列表
 
*/
Ext.lt.editdatatable=Ext.lt.createComponent(function(rs){
	var _rs=rs;
	var table=new Ext.lt.datatable35(rs);
	table.editversion='2.0';
	var _tableid=table.id;
	var fn_setCols=table.setCols;
	var fn_clearCols=table.clearCols;
	var _columns=[];
	var _selectOpen=false;
	var stuffEl={};
	
	Ext.lt.message.hook(_tableid,'HiddenColumn',function(){
		_columns=table.getCols();
	});
	Ext.lt.message.hook(_tableid,'DisplayColumn',function(){
		_columns=table.getCols();
	});
		/** 通过列定义可编辑属性替换下列通用方法 **/
	// 初始化简单可编辑区
	function _init_edit(el,col,d,l,c){
		if(el==null||el.contains(_editor)) return;
		if(_editor!=null)_endEdite.apply(this,[true]);
		var pos=Ext.lt.HTML.positionedOffset(el,document.body,false);
		var tpos=Ext.lt.HTML.positionedOffset(table.drawdiv,document.body,false);
		if((el.clientWidth+pos.left)>(table.drawdiv.clientWidth+tpos.left)||pos.left<tpos.left){
			table.gotoCell(l,c,function(nextCell){
				if(nextCell!=null){
					nextCell.fireEvent('onclick');
				}
			});	
			return ;
		}
		if(col.mapping==null){
			if(col.datatype=='D'){
				_init_edit_date(el,col,d,l,c);
			}else{
				_init_edit_input(el,col,d,l,c);
			}
		}
		else{
			if(col.mapper.columns.indexOf('supcode')==-1){
				_init_edit_select(el,col,d,l,c);
			}else{
				_init_edit_tree(el,col,d,l,c);
			}
		}
	}
	
	var _editor=null;
	var _endEdite=function(save){
		//非录入状态。
		if(!this.isContentEditable)return;
		this.contentEditable=false;
		closeOpens();
		if(!save){table.reflash();return;}
		var d=_editor.innerText;
		var col=_editor.col;
		if(col.datatype=='N'){
			d=d.toNumber(col.format.dotname,false,1);
		}
		_editor.data[col.name]=d
		
		if(col.oneditend!=null){
			col.oneditend(col._dt,null,_editor.l,_editor.c,_editor.data);
		}
		
		Ext.lt.message.send('editdatatable','endedit',
		{dt:col._dt,odata:odata,ndata:Ext.lt.clone(_editor.data),stype:'编辑',l:_editor.l,c:_editor.c,colname:col.name}
		);
		ovalue=null;
		odata=null;
		table.reflashdata(_editor.l,_editor.c);
		_editor=null;
		table.reflashdata('viewdata');
	}
	function closeOpens(){
		if(_sel){_sel.style.display ='none'}
		if(_dynarch_popupCalendar!=null){
			_dynarch_popupCalendar.hide();
		}
		if(_treeDiv)_treeDiv.style.display ='none';
	}
	var span=document.createElement("span")
	span.contentEditable=true;
	span.style.textAlign='right';
	span.className="edit";
	var mover=false;
	span.onmousemove=function(){
		var x=event.offsetX,y=event.offsetY;
		if(span.offsetWidth-x<10&&span.offsetHeight-y<10){
			this.style.cursor='crosshair';
		}else{
			this.style.cursor='default';
		}
	}
	// 启用鼠标随动单元格
	var _mousecelldiv=document.createElement('DIV');

	_mousecelldiv.top=0;
	_mousecelldiv.style.zIndex=999999;
	_mousecelldiv.style.position='absolute';
	_mousecelldiv.style.border='2px solid #000';
	_mousecelldiv.style.display ='none';
	_mousecelldiv.left=0;
	document.body.appendChild(_mousecelldiv);
	
	span.onmousedown=function(){
		if(this.style.cursor!='crosshair')return;
				mover=true;
		var el=this.parentNode
		var celltype=el.id.split('_')[3];
		_mousecelldiv.style.display='block';
		var p=Ext.lt.HTML.positionedOffset(this,document.documentElement,false);
		_mousecelldiv.style.top=p.top
		_mousecelldiv.style.left=p.left
		_mousecelldiv.style.width=el.offsetWidth
		_mousecelldiv.style.height=el.offsetHeight;
	}
	
	table.onEvent('onmouseover',function(table,el,l,c,d){
		if(!mover)return;
		var h=(l-stuffEl.l)*el.offsetHeight;
		if(h<0)h=h*-1
		
		if(l<stuffEl.l){
			var p=Ext.lt.HTML.positionedOffset(span,document.documentElement,false);
			_mousecelldiv.style.top=p.top-h;
			_mousecelldiv.style.height=h+el.offsetHeight;
		}else{
			var p=Ext.lt.HTML.positionedOffset(span,document.documentElement,false);
			_mousecelldiv.style.top=p.top;
			_mousecelldiv.style.height=h;
		}
	});
	table.onEvent('onmouseup',function(table,el,l,c,d){
		if(!mover)return;
			mover=false;
			_mousecelldiv.style.display ='none';
			//开始赋值
			_endEdite.apply(_editor,[true]); 
			
			var k=1;
			var s,e;
			if(l<stuffEl.l){
				s=l;e=stuffEl.l;
			}else{
				e=l;s=stuffEl.l+1;
			}
			var datas=table.getRecordset().toArray();
			var col=table.getCol(c);
			var v=datas[stuffEl.l][col.name]
			for(;s<e;s++){
				repData(table,el,s,c,datas[s],col,v);
			}
			table.reflashdata('viewdata');
	});
	function repData(table,el,l,c,d,col,v){
		//开始赋值~
		if(col.oneditstart!=null&&col.oneditstart(table,el,l,c,d)==false){
			return;
		}
		ovalue=d[col.name];
		odata=Ext.lt.clone(d);
		d[col.name]=v;
		if(col.oneditend!=null){
			col.oneditend(table,null,l,c,d);
		}
	}
	function init_input(el,col,d,l,c){
		el.innerHTML='';
		el.appendChild(span);
		span.contentEditable=true;
		_editor=span;
		_editor.onclick=null;
		_editor.ondblclick=null;
	/*function init_input(el,col,d,l,c){
		_editor=el.firstChild
		_editor.contentEditable=true;
		_editor.className="edit";
		_editor.style.textAlign='right';
		*/
		_editor.col=col
		_editor.l=l
		_editor.c=c
		_editor.value=d[col.name]==null?'':d[col.name];
		_editor.innerHTML=_editor.value;
		_editor.data=d;
		table.editor=_editor;
		return _editor;
	}
	function _init_edit_input(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor.onselect=function(){event.cancelBubble=true};
		_editor.onclick=function(){
			event.cancelBubble=true;
		}
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==13){
				_editor.innerHTML=_editor.innerText;
				return;
			}
			if(event.keyCode==27){
				_endEdite.apply(this,[false]);
				return;
			}
			_toMove();
		}
		_editor.focus();
	}
	
	var _sel
	
	function getEditorPosition(){
		var pos=Ext.lt.HTML.positionedOffset(_editor,document.documentElement,false);
		var p={left:null,top:null,right:null,bottom:null}
		//h=180,w=200;
		var doc=document.documentElement;
		var st=doc.scrollTop;
		var oh=doc.offsetHeight;
		var sl=doc.scrollLeft;
		var ow=doc.offsetWidth;
		if(doc.clientHeight-pos.top+st<200){
			p.bottom=doc.clientHeight+sl-pos.top
		}else{
			p.top=pos.top+_editor.offsetHeight
		}
		if(pos.left+_editor.offsetWidth-sl<doc.clientWidth-200){
			p.left=pos.left
		}else{
			p.right=doc.clientWidth+sl-pos.left-_editor.offsetWidth
		}
		return p;
	}
	
	function _init_edit_select(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		if(_sel==null){
			_sel=document.createElement("select");
			//_editor.parentNode.appendChild(_sel);
			document.body.appendChild(_sel);
			_sel.className='editselect';
			_sel.size=10;
		}
		var ci=col.ci;
		var cdata=null;
		var pos=getEditorPosition();
		_sel.style.display ='block';
		for(var p in pos){
			_sel.style[p]=pos[p];
		}
		
		if(col.getSelectData!=null){
			cdata=col.getSelectData(el,col,d,l,c);
		}else{
			cdata=col.mapper.datas;
		}
		_sel.datas=cdata;
		_sel.col=col;
		
		var _editorValue=d[col.name];
		_editor.ondblclick=function(){
			if(_sel.style.display =='none'){
				_sel.style.display='block';
			}
		}
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==13){
				var _dis='none'
				if(_sel.style.display =='none'){
					_dis='block';
				}
				window.setTimeout(function(){_editor.innerHTML=_editor.innerText},100)
				_sel.style.display =_dis;
				return;
			}
			if(event.keyCode==27){
				_sel.style.display ='none'
				_endEdite.apply(this,[true]);
				return ;
			}
			if(event.keyCode==40){
				if(_sel.style.display !='none'){
					_sel.focus();
					return;
				}
			}
			if(_toMove())return;
			window.setTimeout(function(){buildselect(false)},100)
		}
		_sel.style.display ='none';
		_editor.focus();
		
		if(!_selectOpen){
			_sel.style.display ='block';
			buildselect(true)
		}
		_sel.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==27){
				_sel.style.display ='none'
				_editor.focus();
				return;
			}
			if(event.keyCode==13){
				_sel.style.display ='none';
				_editor.focus();
				window.setTimeout(function(){
					_editor.innerHTML=_sel.value;
				},100);
				return;
			}
		}
		_sel.onkeypress=function(){
			_editor.focus();
			_editor.onkeydown();
		}
		_sel.onclick=function(){
			_editor.innerHTML=_sel.value;
		}
		_sel.ondblclick=function(){
			_sel.style.display ='none';
			_editor.focus();
			_editor.innerHTML=_sel.value;
			//_endEdite.apply(_editor,[true]);
		}
		function buildselect(b){
			var sth=[]; 
			var str=_editor.innerText.toUpperCase();
			_sel.innerHTML="";
			var _SO=null;
			var cdata=_sel.datas;
			var col=_sel.col;
			for(var i=0,j=cdata.length;i<j;i++){
			var _bindex=false;
				for(var z=0,zl=cdata[i].length;z<zl;z++){
					if((cdata[i][z]+"").toUpperCase().indexOf(str)!=-1){
						_bindex=true;break;	
					}
				}
				if(str==null||str==''||_bindex||b){
					var opt=document.createElement("option");
					opt.value=cdata[i][ci];
					opt.innerText=col._formartValue(cdata[i][ci])
					_sel.appendChild(opt);
				}
			}
			if(_sel.childNodes.length<4){
				_sel.size=4;
			}else	if(_sel.childNodes.length<10){
				_sel.size=_sel.childNodes.length;
			}else{
				_sel.size=10;	
			}
			_sel.value=_editorValue;
		}
	}
	var _dateDiv
	function _init_edit_date(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		if(_dateDiv==null){
			_dateDiv=document.createElement("div");
			//_editor.parentNode.appendChild(_sel);
			document.body.appendChild(_dateDiv);
			_dateDiv.className='editselect';
		}
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==13){
				if(_dynarch_popupCalendar!=null&&!_dynarch_popupCalendar.hidden){
					_dynarch_popupCalendar.hide();
				}else{
					setTimeout(function(){_showCal()},100);
				}
				setTimeout(function(){	_editor.innerHTML=_editor.innerText},100);
			
				return;
			}
			if(event.keyCode==27){
				_dynarch_popupCalendar.hide();
				_endEdite.apply(this,[true]);
				return ;
			}
			
			if(_toMove())return;
		}
		_editor.focus();
		
		if(!_selectOpen){
			_showCal();
		}
	
	}
	Ext.lt.message.hook('calendar','selected',function(cal){
		cal.sel.innerHTML=cal.sel.value;cal.sel.focus();
	});
	Ext.lt.message.hook('calendar','hide',function(cal){
		cal.sel.focus();
	});
	function _showCal(){
		showCalendar(_editor, '%Y%m%d', null, true);
		_dynarch_popupCalendar._showDiv.focus();
	}
	
	var _treeDiv
	var _qtree
	function _init_edit_tree(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		var _editorValue=d[col.name];
		if(_treeDiv==null){
			_treeDiv=document.createElement("div");
			document.body.appendChild(_treeDiv);
			_treeDiv.className='edittree';
		}
		var pos=getEditorPosition();
		_treeDiv.style.display ='block';
		_initQtree(el,col,d,l,c,_editor.innerText);
		for(var p in pos){
			_treeDiv.style[p]=pos[p];
		}
		_treeDiv.style.display ='none';
		_editor.focus();
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==13){
				var _dis='none'
				if(_treeDiv.style.display =='none'){
					_dis='block';
				}
				window.setTimeout(function(){_editor.innerHTML=_editor.innerText},100)
				_treeDiv.style.display =_dis;
				return;
			}
			if(event.keyCode==27){
				_treeDiv.style.display ='none'
				_endEdite.apply(this,[true]);
				return ;
			}
			if(event.keyCode==40){
				if(_treeDiv.style.display !='none'){
					_treeDiv.focus();
				}
			}
			if(_toMove())return;
			window.setTimeout(function(){filterTree()},100)
		}
		if(!_selectOpen){
			_treeDiv.style.display ='block';
		}
		
		_treeDiv.onkeydown=function(){
			event.cancelBubble=true;
			
			if(event.keyCode==27){
				_treeDiv.style.display ='none'
				window.setTimeout(function(){_editor.innerHTML=_editor.innerText},100)
				_editor.focus();
				return ;
			}
			_editor.focus();
			window.setTimeout(function(){filterTree()},100)
		}
		
	}
	function filterTree(){
		var v=_editor.innerText;
		_qtree.setFilter([{field:'code',values:[v]},{field:'name',values:[v]},{field:'pinyin',values:[v]}],'contain')
	}
	function _dblclickTree(){
		var code=_qtree.getSelected()[0].code;
		_editor.innerHTML=code;
		_treeDiv.style.display ='none';
		_editor.focus();
		//_endEdite.apply(_editor,[true]);
	}
	function _clickTree(){
		var code=_qtree.getSelected()[0].code;
		_editor.innerHTML=code;
	}
	function _initQtree(el,col,d,l,c,v){
		var _data=null;
		if(col.getSelectData!=null){
			_data=col.getSelectData(el,col,d,l,c);
		}else{
			if(col.mapper.rs==null){
				_data=col.mapper.datas;
				col.mapper.rs=new Ext.lt.recordset({columns:col.mapper.columns,datas:_data});
			}
			_data=col.mapper.rs;
		}
		if(_data.type!="recordset"){
			_data=new Ext.lt.recordset({columns:col.mapper.columns,datas:_data});
		}
		_qtree=new Ext.lt.Qtree({
			field:{id:'code',sid:'supcode',name:'name',pinyin:'pinyin',level:"level"},
			outformart:col.format,
			data:_data,
			linkchild:true,
			values:[v],
			on:{dblclick:_dblclickTree,click:_clickTree}
		});
		_qtree.draw(_treeDiv);
	}
	var ovalue=null;
	var odata=null;	
	// 开始单元格编辑
	var seboo=false
	function _startedit(table,el,l,c,d){
		seboo=true;
		stuffEl.l=l;
		stuffEl.c=c;
		ovalue=d[table.getCol(c).name];
		odata=Ext.lt.clone(d);
		_init_edit(el,_columns[c],d,l,c)
	}
	
	// 结束编辑单元格编辑
	function _endedit(){
	}
	
	function _columnclick(table,el,l,c,d){
		if(!this.edit) return;
		seboo=false;
		if(this.oneditstart==null||this.oneditstart(table,el,l,c,d)!=false){
			if(!seboo){_startedit(table,el,l,c,d);seboo=false;	}
		}
		
	}
	
	function is2NextCell(l,c){
		var col=_columns[c];
		if(col.edit!=true)return false;
		if(l>=table.getRecordset().size()||l<0||c<0||c>=_columns.length)return null;
		if(this.oneditstart!=null&&this.oneditstart(table,null,l,c,table.getRecordset().getData(l))==false){
			return false;
		}
		return true;
	}
	function gotocell(l,c){
		
		table.gotoCell(l,c,function(nextCell){
			if(nextCell!=null){
				nextCell.fireEvent('onclick');
			}
		});	
	}
	//table.moveKey={'13':"down",'9':'right','37':'left','38':'up','40':'down','39':'right'};
	function _toMove(){
		if(table.moveKey[event.keyCode]==null)return false;
		if(table.moveKey[event.keyCode]=='down'){ movedown();return true;}
		if(table.moveKey[event.keyCode]=='right'){ moveright();return true;}
		if(table.moveKey[event.keyCode]=='up'){ moveup();return true;}
		if(table.moveKey[event.keyCode]=='left'){ moveleft();return true;}
		return false;
	}
	
	//左
	function moveleft(){
		event.cancelBubble=true;
		_endEdite.apply(_editor,[true]);
		var nextcol=stuffEl.c-1,nextline=stuffEl.l;
		for(;nextline>=0;nextline--){
			for(;nextcol>=0;nextcol--){
				if(nextcol<0) break;
				var _n=is2NextCell(nextline,nextcol)
				if(_n==true){
					gotocell(nextline,nextcol);
					return;
				}else if(_n==null){
					gotocell(stuffEl.l,stuffEl.c);
					return;
				}
			}
			nextcol=_columns.length-1;
		}
		gotocell(stuffEl.l,stuffEl.c);
	}
	//上
	function moveup(){
		event.cancelBubble=true;
		_endEdite.apply(_editor,[true]);
		var nextline=stuffEl.l-1;
		for(;nextline>=0;nextline--){
			var _n=is2NextCell(nextline,stuffEl.c)
			if(_n==true){
				gotocell(nextline,stuffEl.c);
				return;
			}else if(_n==null){
				gotocell(stuffEl.l,stuffEl.c);
				return;
			}
		}
		gotocell(stuffEl.l,stuffEl.c);
	}
			//右
	function moveright(){
		event.cancelBubble=true;
		_endEdite.apply(_editor,[true]);
		var nextcol=stuffEl.c+1,nextline=stuffEl.l;
		for(var _length=_rs.size();nextline<_length;nextline++){
			for(;nextcol<_columns.length;nextcol++){
				if(nextcol==_columns.length){;break}
				var _n=is2NextCell(nextline,nextcol);
				if(_n==true){
					gotocell(nextline,nextcol);
					return;
				}
			}
			nextcol=0;
		}
		gotocell(stuffEl.l,stuffEl.c);
	}
	//下
	function movedown(){
		event.cancelBubble=true;
		_endEdite.apply(_editor,[true]);
		var nextline=stuffEl.l+1;
		for(;true;nextline++){
			var _n=is2NextCell(nextline,stuffEl.c);
			if(_n==true){
				gotocell(nextline,stuffEl.c);
				return;
			}else if(_n==null){
				gotocell(stuffEl.l,stuffEl.c);
				return;
			}
		}
		gotocell(stuffEl.l,stuffEl.c);
	}
	
	function _scroll(){
		if(_editor!=null){
			_endEdite.apply(_editor,[true]);
		}
	}
	function buildEventScorll(div){
		// 追加表格拖拽事件跟踪
		div.firstChild.attachEvent("onscroll",Ext.lt.util.fnbind(_scroll,div.firstChild));
		div.firstChild.attachEvent("onmousewheel",Ext.lt.util.fnbind(_scroll,div.firstChild));
	}
		
	document.attachEvent('onmousedown',function(){
		//判断点击的是否是框里面。
		if(_treeDiv!=null&&_treeDiv.contains(event.srcElement)){
			return;
		}
		if(_sel!=null&&_sel==event.srcElement){
			return;	
		}
		if(_editor!=null&&_editor.parentElement!=null&&!_editor.parentNode.contains(event.srcElement)){
			_endEdite.apply(table.editor,[true]);
		}
	});
		// 这里开始识别可编辑属性
	table.setCols=function(c){
		if(!Ext.lt.isArray(c)){c=[c]}
		var col
		for(var n=0;n<c.length;n++){
			col=c[n];
			if(col==null) continue;
			if(col.onclick!=null){
				col.onclick=function(fn){
					var col_click=fn
					return function(){
						_columnclick.apply(this,arguments);
						if(col_click!=null) col_click.apply(this,arguments);
					}
				}(col.onclick);
			}
			else{
				col.onclick=_columnclick
			}
			
			
			if(col.edit==true){
				col._startedit=_startedit;
				col._endedit=_endedit;
			}
			
			_columns.push(col);
		}
		
		fn_setCols(_columns);
	}
	table.clearCols=function(){
		_columns.clear();
		fn_clearCols();
	}
	table._draw_bak=table.draw;
	table.draw=function(div){
		table.drawdiv=div;
		table._draw_bak(div);
		buildEventScorll(div);
	}
	table.moveKey={'37':'left','38':'up','40':'down','39':'right'};
	table.setMoveKey=function(cfg){
		table.moveKey=Ext.lt.apply({'13':"down",'9':'right','37':'left','38':'up','40':'down','39':'right'},cfg);
	}
	table.setSelectDown=function(b){
		_selectDown=b==true;	
	}
// div.isContentEditable
	table.setSelectDown=function(b){
		_selectDown=b==true;	
	}
	
	table.getOldData=function(){
		return odata;
	}
	table.getOldValue=function(){
		return ovalue;	
	}
	return table;
});