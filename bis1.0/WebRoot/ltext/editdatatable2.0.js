if(Ext==null){alert('请加载ltext_core.js文件');}
if(Ext.lt.datatable==null){alert('请加载datatable3.0.js文件');}

/**
 基于datatable实现可编辑列表
 
*/
Ext.lt.editdatatable=Ext.lt.createComponent(function(rs){
	var _rs=rs;
	var table=new Ext.lt.datatable35(rs);

	var _tableid=table.id;
	var fn_setCols=table.setCols;
	var fn_clearCols=table.clearCols;
	var _columns=[];
	var _selectDown=false;

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
		//已经关闭的直接返回
			if(_editor.parentNode.style.display =='none')return;
			var col=_editor.col;
			var d='';
			if(_editor._tagName=='INPUT') d=_editor.value;
			if(_editor._tagName=="TREE"){
				d=_editor.value
				if(_editor.col.mapping[d]==null){
					save=false;
				}
			}
			if(_editor._tagName=='SELECT') {
				var _sel=_editor.parentNode.getElementsByTagName("select")[0];
				//1.选中值 。
				//2.空值。
				//3.还原之前的值
				
				//当_sel打开的时候一定是非空的。如果值不对，则是之前的值
				if(_sel!=null&&_sel.style.display!='none'){
					_editor.value=_sel.value;
					
				}else{
					//当_sel关闭的时候。录入值则是当前值。可以为空值
					if(_editor.value==null||_editor.value==''){
						_editor.value='';
					}else{
						if(col.mapping[_editor.value]==null){
							if(ovalue==null)ovalue='';
							_editor.value=ovalue
						}
					}
				}
				d=_editor.value;
			}
			if(_editor._tagName=='DATE') {
				d=_editor.value;
				if(_dynarch_popupCalendar!=null){
					_dynarch_popupCalendar.hide();
				}
				_dateDiv.style.display ='none';
			}
			_editor.srcobj.innerHTML=d==null?'':d
			_editor.srcobj.editing=false;
			for(var i=1,l=_editor.parentNode.children.length;i<l;i++){
				_editor.parentNode.children[i].style.position='static';
				_editor.parentNode.children[i].style.top=0;
				_editor.parentNode.children[i].style.display ='none';
			}
			
			_editor.parentNode.style.display ='none';
			
			
			if(!save){table.reflash();return;}
			if(col.datatype=='N'){
				d=d.toNumber(col.format.dotname,false,1);
			}
			_editor.data[col.name]=d
			d=col._fn(_editor.l,_editor.c,_editor.data)
			if(col.oneditend!=null){
				col.oneditend(col._dt,null,_editor.l,_editor.c,_editor.data);
			}
			Ext.lt.message.send('editdatatable','endedit',
			{dt:col._dt,odata:odata,ndata:Ext.lt.clone(_editor.data),stype:'编辑',l:_editor.l,c:_editor.c,colname:col.name}
			);
			ovalue=null;
			odata=null;
			table.reflashdata();
	}
	
	// 初始化简单可编辑区
	
	function init_input(el,col,d,l,c){
		if(col._dt.editor==null){
			_editor=document.createElement('input');
			var _div=document.createElement("div");
			_div.appendChild(_editor);
			_div.className='editdatatable';
			document.body.appendChild(_div);
			col._dt.editor=_editor;
			Ext.lt.HTML.expand(_editor);
			_editor.onKey({
				'27':function(){
					_endEdite.apply(this,[false]);
					event.cancelBubble=true;
				}
			});
			table.moveKeyfn={};
			for(var ec in table.moveKey){
				table.moveKeyfn[ec]=eval('move'+table.moveKey[ec])
				table.moveKey[ec]=function(){
					//控制打开
					if(_editor._tagName=='SELECT'&&[13].indexOf(event.keyCode)!=-1){
						if(_sel.style.display !='block'){
							_sel.style.display ='block';
							_sel.focus();
						}else{
							_sel.style.display ='none';
							_editor.select();
							_editor.focus();
						}
						return;
					}
					if(_editor._tagName=='SELECT'&&event.keyCode==40){
						if(_sel.style.display !='none'){
							_sel.focus();	
							event.cancelBubble=true;
							return;
						}
					}
					//控制打开
					if(_editor._tagName=='DATE'&&[13].indexOf(event.keyCode)!=-1){
						if(_dateDiv.style.display !='block'){
							_dateDiv.style.display ='block';
							setTimeout(
								function(){showCalendar(_editor, '%Y%m%d', null, true)},100
							);
						}else{
							_dateDiv.style.display ='none';
							_editor.select();
							_editor.focus();
						}
						return;
					}
					//控制打开
					if(_editor._tagName=='DATE'&&[37,38,39,40].indexOf(event.keyCode)!=-1){
						if(_dateDiv.style.display =='block'){
							return;
						}
					}
					table.moveKeyfn[event.keyCode]();
				}
			}
			_editor.onKey(table.moveKey);
		}
		_editor=col._dt.editor;
		_editor.ondblclick=null;
		//设置向下键的特殊内容。
		_editor._tagName="INPUT";
		_editor.className="edit "+col.datatype;
		_editor.col=col;
		
		_editor.value=d[col.name]==null?'':d[col.name];
		_editor.srcobj=el;
		_editor.data=d;
		_editor.l=l;
		_editor.c=c;
		var pos=Ext.lt.HTML.positionedOffset(el,document.body,false);
		var pbs=Ext.lt.HTML.getBorderSet(_editor);
		_editor.style.width=(el.offsetWidth-pbs.left-pbs.right+1)+'px';
		_editor.style.lineHeight=(el.offsetHeight-pbs.top-pbs.bottom-1)+'px';
		_editor.style.height=(el.offsetHeight-pbs.top-pbs.bottom-1)+'px';
		_editor.parentNode.style.top=pos.top;
		_editor.parentNode.style.left=pos.left;
		_editor.parentNode.style.display ='block';
		return _editor;	
	}
	
	function _init_edit_input(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor.onselect=function(){event.cancelBubble=true};
		_editor.onclick=function(){
			event.cancelBubble=true;
		}
		_editor.select();
		_editor.focus();
	}
	var _dateDiv
	function _init_edit_date(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor._tagName="DATE";
		if(_dateDiv==null){
			_dateDiv=document.createElement("div");
			_dateDiv.className='editdate'
			_editor.parentNode.appendChild(_dateDiv);
		}
		var pbs=Ext.lt.HTML.getBorderSet(_dateDiv);
		_dateDiv.style.display ='block';
		
		_editor.onselect=function(){event.cancelBubble=true};
		if(!_selectDown){
			showCalendar(_editor, '%Y%m%d', null, true);
		}else{
		_dateDiv.style.display ='none';	
		}
		var _editorValue=d[col.name];
		if(col.showSelectValue!=null){
			_editor.value=col.showSelectValue(_editorValue,col.mapping[_editorValue]);
		}
		_editor.ondblclick=function(){
			showCalendar(_editor, '%Y%m%d', null, true);
		}
		_editor.select();
		_editor.focus();
	}
	var _sel
	function _init_edit_select(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor._tagName="SELECT";
		if(_sel==null){
			_sel=document.createElement("SELECT");
			_sel.className='editselect'
			_editor.parentNode.appendChild(_sel);
			_sel.style.display ='block';
			_sel.onkeydown=function(){
				if(event.keyCode==13){
					var newEvt = document.createEventObject()
					newEvt.keyCode = 13
					_editor.value=_sel.value;
					_editor.fireEvent("onkeydown", newEvt);
					return;
				}
				if(event.keyCode==27){
					_sel.style.display ='none';
					_editor.select();
					_editor.focus();
					return;
				}
				if([37,38,39,40,9].indexOf(event.keyCode)==-1){
					_editor.select();
					_editor.focus();
				}
			}
			_editor.onKey({'*':function(){
				if([9,13,37,38,39,40].indexOf(event.keyCode)!=-1)return;
					setTimeout(function(){
						buildselect();
					},100);
			}});
			_sel.ondblclick=function(){
				event.cancelBubble=true;
				_endEdite.apply(_editor,[true]);
			}
		}
		_sel.size=10;
		_sel.style.display ='block';
		//_sel.style.width=_editor.parentNode.clientWidth
		//判断菜单位置
		//_sel.clientHeight=150;
		//Ext.lt.HTML.positionedOffset(el,table.drawdiv,false).top=205
		//_editor.clientHeight=22
		//table.drawdiv.clientHeight=250;
		var cdata=null;
		if(col.getSelectData!=null){
			cdata=col.getSelectData(el,col,d,l,c);
		}else{
			cdata=col.mapper.datas;
		}
		_sel.datas=cdata;
		_sel.col=col;
		var ci=col.ci;
		
		var _editorValue=d[col.name];
		if(col.showSelectValue!=null){
			_editor.value=col.showSelectValue(_editorValue,col.mapping[_editorValue]);
		}
	
		_sel.style.width='auto';
		buildselect(false);
		if(_sel.offsetWidth<col.minwidth){
			_sel.style.width=col.minwidth;	
		}
		var showtop=false;
		var pos=Ext.lt.HTML.positionedOffset(el,table.drawdiv,false);
		if(pos.top+_editor.clientHeight+_sel.clientHeight>table.drawdiv.clientHeight){
			_sel.style.position='absolute';
			_sel.style.top=-_sel.offsetHeight;
			_sel.style.left=0;
			showtop=true;
		}
		
		if(pos.left+_sel.clientWidth>table.drawdiv.clientWidth){
			_sel.style.position='absolute';
			_sel.style.left=_editor.offsetWidth-_sel.offsetWidth+1;
			if(!showtop){
				_sel.style.top=_editor.offsetHeight+2;
			}
		}
		
		if(_selectDown){
			_sel.style.display ='none';
			_editor.ondblclick=function(){
				_sel.style.display ='block';
				_sel.focus();
			}
		}
		function buildselect(b){
			var sth=[]; 
			var str=_editor.value.toUpperCase();
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
				if(str==null||str==''||_bindex||b==false){
					var opt=document.createElement("option");
					opt.value=cdata[i][ci];
					//if(_editorValue==opt.value){
					//	_SO=opt;
					//}
					opt.innerText=col._formartValue(cdata[i][ci])
					_sel.appendChild(opt);
				}
			}
			if(b!=null&&_sel.childNodes.length<10){
				_sel.size=_sel.childNodes.length;
			}/*
			if(_SO==null){
				_SO=_sel.firstChild
			}
			if(_SO!=null){
				_SO.selected=true;
			}*/
			_sel.value=_editorValue;
		}
		
		_editor.onselect=function(){event.cancelBubble=true};
		_editor.select();
		_editor.focus();
		if(!_selectDown){
				_sel.focus();
		}
	}
	
	var _treeDiv
	var _qtree
	function _init_edit_tree(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor._tagName="TREE";
		if(_treeDiv==null){
			_treeDiv=document.createElement("div");
			_treeDiv.className='edittree'
			_editor.parentNode.appendChild(_treeDiv);
		}
		var pbs=Ext.lt.HTML.getBorderSet(_treeDiv);
		_treeDiv.style.width=el.offsetWidth<200?200:(el.offsetWidth-pbs.left-pbs.right+1)
		_treeDiv.style.display ='block';
		
		var showtop=false;
		var pos=Ext.lt.HTML.positionedOffset(el,table.drawdiv,false);
		if(pos.top+_editor.clientHeight+_treeDiv.clientHeight>table.drawdiv.clientHeight){
			_treeDiv.style.position='absolute';
			_treeDiv.style.top=-_treeDiv.offsetHeight;
			_treeDiv.style.left=0;
			showtop=true;
		}
		if(pos.left+_editor.clientWidth+_treeDiv.clientWidth>table.drawdiv.clientWidth){
			_treeDiv.style.position='absolute';
			_treeDiv.style.left=_editor.offsetWidth-_treeDiv.offsetWidth+1;
			if(!showtop){
				_treeDiv.style.top=_editor.offsetHeight+2;
			}
		}
		
		_editor.onselect=function(){event.cancelBubble=true};
		_initQtree(el,col,d,l,c,_editor.value);
		var _editorValue=d[col.name];
		if(col.showSelectValue!=null){
			_editor.value=col.showSelectValue(_editorValue,col.mapping[_editorValue]);
		}
		
		_editor.onKey({'*':function(){
			if([9,13,37,38,39,40].indexOf(event.keyCode)!=-1)return;
				setTimeout(function(){
					filterTree();
				},100);
		}});
		_editor.select();
		_editor.focus();
	}
	function filterTree(){
		var v=_editor.value;
		_qtree.setFilter([{field:'code',values:[v]},{field:'name',values:[v]},{field:'pinyin',values:[v]}],'contain')
	}
	function _dblclickTree(){
		var code=_qtree.getSelected()[0].code;
		_editor.value=code;
		_endEdite.apply(_editor,[true]);
	}
	function _clickTree(){
		var code=_qtree.getSelected()[0].code;
		_editor.value=code;
		if(_editor.col.showSelectValue!=null){
			_editor.value=_editor.col.showSelectValue(code,_editor.col.mapping[code]);
		}
	}
	function _initQtree(el,col,d,l,c,v){
		var _data=null;
		if(col.getSelectData!=null){
			_data=col.getSelectData(el,col,d,l,c);
		}else{
			if(col.mapper.rs==null){
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
	//左
	function moveleft(){
		event.cancelBubble=true;
		_endEdite.apply(this,[true]);
		var id=_editor.srcobj.id
		var nextcol=_editor.c-1,nextline=_editor.l;
		for(;nextline>=0;nextline--){
			for(;nextcol>=0;nextcol--){
				if(nextcol<0) break;
				var _n=is2NextCell(nextline,nextcol)
				if(_n==true){
					gotocell(nextline,nextcol);
					return;
				}else if(_n==null){
					gotocell(_editor.l,_editor.c);
					return;
				}
			}
			nextcol=_columns.length-1;
		}
		gotocell(_editor.l,_editor.c);
	}
	//上
	function moveup(){
		event.cancelBubble=true;
		_endEdite.apply(this,[true]);
		var id=_editor.srcobj.id
		var nextline=_editor.l-1;
		for(;nextline>=0;nextline--){
			var _n=is2NextCell(nextline,_editor.c)
			if(_n==true){
				gotocell(nextline,_editor.c);
				return;
			}else if(_n==null){
				gotocell(_editor.l,_editor.c);
				return;
			}
		}
		gotocell(_editor.l,_editor.c);
	}
			//右
	function moveright(){
		event.cancelBubble=true;
		_endEdite.apply(this,[true]);
		var id=_editor.srcobj.id
		var nextcol=_editor.c+1,nextline=_editor.l;
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
		gotocell(_editor.l,_editor.c);
	}
	//下
	function movedown(){
		event.cancelBubble=true;
		_endEdite.apply(this,[true]);
		var id=_editor.srcobj.id
		var nextline=_editor.l+1;
		for(;true;nextline++){
			var _n=is2NextCell(nextline,_editor.c);
			if(_n==true){
				gotocell(nextline,_editor.c);
				return;
			}else if(_n==null){
				gotocell(_editor.l,_editor.c);
				return;
			}
		}
		gotocell(_editor.l,_editor.c);
	}
	
	document.attachEvent('onmousedown',function(){
		//var _editor=dt.editor;
		
		//判断点击的是否是框里面。
		if(_editor!=null&&!_editor.parentNode.contains(event.srcElement)&&_editor.parentNode.style.display=='block'){
			_endEdite.apply(table.editor,[true]);
		}
		
	});

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

var _replaceWindow=null;
	function _initReplaceWindow(_dt){
		if(_replaceWindow!=null) return;
		
		// 生成界面
		var replaceWindow=document.createElement('DIV');
		replaceWindow.className='datatable_replacewindow';
		replaceWindow.style.cssText='display:none;';
		Ext.lt.HTML.expand(replaceWindow);
		replaceWindow.setInnerHTML('<table border="0"><tr><td class="drag"></td><td><input type="text" tipstext="请输入查找文字..." value=""></td><td><button>上一个</button></td><td><button>下一个</button></td><td></td></tr><tr><td class="drag"></td><td><input type="text" tipstext="请输入替换文字..." value=""></td><td><button>替换</button></td><td><button>全部替换</button></td><td><button>关闭</button></td></tr></table>');
		document.body.appendChild(replaceWindow);
		var tds = replaceWindow.getElementsByTagName('TD');
		
		// 生成对象引用
		replaceWindow.dragdt=tds.item(0);
		replaceWindow.inputbox=tds.item(1).firstChild;
		replaceWindow.prebtn=tds.item(2).firstChild;
		replaceWindow.nextbtn=tds.item(3).firstChild;
		replaceWindow.replacebox=tds.item(6).firstChild;
		replaceWindow.repbtn=tds.item(7).firstChild;
		replaceWindow.repallbtn=tds.item(8).firstChild;
		replaceWindow.closebtn=tds.item(9).firstChild;
		replaceWindow.table=_dt
		var _searchword=null
		// 生成动作
		var lastkeyup=null;
		Ext.lt.HTML.drag({element:replaceWindow.dragdt,holder:false,dragel:replaceWindow});
		replaceWindow.inputbox.onkeyup=function(){
			lastkeyup=new Date();
			_searchword=this.value
			setTimeout(function(){if(new Date()-lastkeyup>300){replaceWindow.table.setSearchWord(_searchword)}},400);
			
		}
		replaceWindow.prebtn.onclick=function(){replaceWindow.cell=replaceWindow.table.goPreSearchWord()};
		replaceWindow.nextbtn.onclick=function(){
			replaceWindow.cell=replaceWindow.table.goNextSearchWord();
		};
		replaceWindow.closebtn.onclick=function(){replaceWindow.inputbox.value='';replaceWindow.table.clearSearchWord();replaceWindow.style.display='none'};
		replaceWindow.repbtn.onclick=function(){
			if(_searchword==null||replaceWindow.cell==null||_searchword.length==0||_dt.getClockRowSize()>replaceWindow.cell.l)return;
			
			var reg=eval('/('+_searchword.replace(/\./gi,'\\.').replace(/\*/gi,'.*').replace(/\?/gi,'.?')+')/gi');
			var l=replaceWindow.cell.l;
			var c=replaceWindow.cell.c;
			var col=_dt.getCol(c);
			if(!col.edit){replaceWindow.cell=replaceWindow.table.goNextSearchWord();return;}
			var data=_dt.getRecordset().getData(l);
			var d=data[col.name];
			if(col.oneditstart){
				col.oneditstart(table,null,l,c,data);
			}
			//修改数字类型数据
			if(col.datatype=='N'&&d==null){
				d='0';
			}
			if(col.datatype=='N'){
				d=(d+'').toNumber(col.format.dotname,false,col.format.unit);	
			}
			//改变数据
			d=(d+'').replace(reg,replaceWindow.replacebox.value);
			if(col.datatype=='N'){
				d=d.toNumber(col.format.dotname,false,1);
			}
			
			data[col.name]=d
			if(col.oneditend){
				col.oneditend(_dt,_dt.getRecordset(),l,c,data);
			}
			_dt.reflashdata();
			replaceWindow.cell=_dt.goNextSearchWord();
		}
		replaceWindow.repallbtn.onclick=function(){
			if(_searchword==null||_searchword.length==0)return;
			var cols=dt.getCols();
			var colmuns=[];
			for(var i=0;i<cols.length;i++){
				if(cols[i].edit){
					colmuns.push(cols[i]);
				}
			}
			var _rs=dt.getRecordset();
			var colsize=colmuns.length;
			var l=dt.getClockRowSize();
			var c=0;
			var reg=eval('/('+_searchword.replace(/\./gi,'\\.').replace(/\*/gi,'.*').replace(/\?/gi,'.?')+')/gi');
			for(l;l<_rs.size();l++){
				var data=_rs.getData(l);
				for(c=0;c<colsize;c++){
					var col=colmuns[c]
					var d=data[col.name];
				
					//修改数字类型数据
					if(col.datatype=='N'&&d==null){
						d='0'.toNumber(col.format.dotname,col.format.qfw,col.format.unit);
					}
					if(!reg.test(d))continue;
					if(col.oneditstart){
						col.oneditstart(table,null,l,c,data);
					}
					//改变数据
					d=(d+'').replace(reg,replaceWindow.replacebox.value);
					
					if(col.datatype=='N'){
						d=d.toNumber(col.format.dotname,false,1);
					}
					
					data[col.name]=d
					if(col.oneditend){
						col.oneditend(dt,dt.getRecordset(),l,col.colindex,data);
					}
				}
			}
			dt.reflashdata();
		}
		
		_replaceWindow=replaceWindow;
	}
	
	var stuffWindow=null;
	var stuffEl={};
	function _init_stuff_win(_dt){
		if(stuffWindow!=null)return;
			stuffWindow=document.createElement('div');
			stuffWindow.innerHTML='<table border="0"><tr><td class="drag"></td><td><input type="text" tipstext="请输入填充个数" value=""></td><td><button>向上</button></td><td><button>向下</button></td><td><button>关闭</button></td></tr></table>'
			document.body.appendChild(stuffWindow);
			stuffWindow.className='datatable_searchwindow';
			stuffWindow.style.cssText='display:none;';
			Ext.lt.HTML.expand(stuffWindow);
			var tds = stuffWindow.getElementsByTagName('TD');
			// 生成对象引用
			stuffWindow.dragdt=tds.item(0);
			stuffWindow.inputbox=tds.item(1).firstChild;
			stuffWindow.prebtn=tds.item(2).firstChild;
			stuffWindow.nextbtn=tds.item(3).firstChild;
			stuffWindow.closebtn=tds.item(4).firstChild;
			stuffWindow.table=_dt
			
			// 生成动作
			Ext.lt.HTML.drag({element:stuffWindow.dragdt,holder:false,dragel:stuffWindow});
			//_editor
			stuffWindow.inputbox.onblur=function(){
				//验证输入的是否是数字；	
			}
			stuffWindow.prebtn.onclick=function(){
				if(stuffEl.c==null){return}
				var crs=_dt.getClockRowSize();
				var col=_dt.getCol(stuffEl.c);
				var l=stuffEl.l-1;
				var v=_dt.getRecordset().getData(stuffEl.l)[col.name];
				for(var i=stuffWindow.inputbox.value;i>0&&l>=crs;i--,l--){
					if(col.oneditstart){
						col.oneditstart(_dt,null,l,stuffEl.c,_dt.getRecordset().getData(l));
					}
					_dt.getRecordset().getData(l)[col.name]=v;
					if(col.oneditend){
						col.oneditend(_dt,_dt.getRecordset(),l,stuffEl.c,_dt.getRecordset().getData(l));
					}
				}
					_dt.reflashdata();
			};
			stuffWindow.nextbtn.onclick=function(){
				if(stuffEl.c==null){return}
				var col=_dt.getCol(stuffEl.c);
				var l=stuffEl.l+1;
				var v=_dt.getRecordset().getData(stuffEl.l)[col.name];
				var datasize=_dt.getRecordset().size();
				for(var i=stuffWindow.inputbox.value;i>0&&l<datasize;i--,l++){
					if(col.oneditstart){
						col.oneditstart(_dt,null,l,stuffEl.c,_dt.getRecordset().getData(l));
					}
					_dt.getRecordset().getData(l)[col.name]=v;
					if(col.oneditend){
						col.oneditend(_dt,_dt.getRecordset(),l,stuffEl.c,_dt.getRecordset().getData(l));
					}
				}
					_dt.reflashdata();	
				
			};
			stuffWindow.closebtn.onclick=function(){stuffWindow.inputbox.value='';stuffWindow.style.display='none'};
			
	}
	table.showReplacewindow=function(){
		_initReplaceWindow(this);
		_replaceWindow.style.display='';
		_replaceWindow.style.top='0px';
		_replaceWindow.style.left='0px';
		
	}
	table.showStuffwindow=function(){
		_init_stuff_win(this);
		stuffWindow.style.display='';
		stuffWindow.style.top='0px';
		stuffWindow.style.left='0px';
	}
	table._draw_bak=table.draw;
	table.draw=function(div){
		table.drawdiv=div;
		table._draw_bak(div);
		buildEventScorll(div);
	}
	table.moveKey={'13':"down",'9':'right','37':'left','38':'up','40':'down','39':'right'};
	table.setMoveKey=function(cfg){
		table.moveKey=Ext.lt.apply({'13':"down",'9':'right','37':'left','38':'up','40':'down','39':'right'},cfg);
	}
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