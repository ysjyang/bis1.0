if(Ext==null){alert('请加载ltext_core.js文件');}
if(Ext.lt.datatable==null){alert('请加载datatable3.0.js文件');}
/**
 基于datatable实现可编辑列表
 
*/
try{
	_dynarch_popupCalendar!=null;
}catch(e){
	_dynarch_popupCalendar=null;
}
Ext.lt.editdatatable=Ext.lt.createComponent(function(rs){
	var _rs=rs;
	var qtreeclass='';
	var table=new Ext.lt.datatable35(rs);
	table.setEditSelectCheckbox(false);
	table.editversion='2.0';
	var _tableid=table.id;
	var fn_setCols=table.setCols;
	var fn_clearCols=table.clearCols;
	var _columns=[];
	var _selectOpen=false;
	var _openKey=13;
	var stuffEl={};
	var selectedType='left';
	var _mappingfilter=false;
	
	table.checkbox_disabled=function(){
		var d = Ext.lt.apply(table.columns.checkbox,{isDisabled:true});
		d.alias = '<input type="checkbox"  '+(d.isDisabled?'disabled':'')+'>';
	  return table.columns.checkbox;
	}
	table.radio_disabled=function(){
		Ext.lt.apply(table.columns.radio,{isDisabled:true});
		return table.columns.radio;
	}
	
	
	table.activeCheckbox=function(){
		table.columns["checkbox"]["isDisabled"]=false;
		table.columns["checkbox"]["alias"] = '<input type="checkbox"/>';
      table.reflash();
	}
	table.activeRadio = function(){
		table.columns["radio"]["isDisabled"]=false;
      table.reflash();
		
	}
	
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
		if((col.mapping==null||table.nowtype=="input"||table.nowtype=="number"||table.nowtype=="date"||table.nowtype=="boolean")&&table.nowtype!="select"&&table.nowtype!="tree"){
			 if (table.nowtype=='custom'){
				_init_edit_custom(el,col,d,l,c);
			}else if(col.datatype=='D'||table.nowtype=="date"){
				_init_edit_date(el,col,d,l,c);
			}else if(col.datatype=='B'||table.nowtype=="boolean"){
				return;
			}else{
				_init_edit_input(el,col,d,l,c);
			}
		}
		else {
			if(table.nowtype=="custom"){
				_init_edit_custom(el,col,d,l,c);
				return ;
			}else if(table.nowtype=="select"){
				_init_edit_select(el,col,d,l,c);
				return ;
			}else if(table.nowtype=="tree"){
				_init_edit_tree(el,col,d,l,c);
				return;
			} 
			
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
		this.parentNode.scrollLeft=0;
		this.contentEditable=false;
		closeOpens();
		if(!save){table.reflashdata('viewdata');return;}
		var d=_editor.innerText;
		var col=_editor.col;
		if (col.datatype == 'D'||table.nowtype=="date") {
	      d = d.substr(0, 8);
	      if (d.length != 8&&d.length!=0) {
	         d = ovalue
	      }
	      if(isNaN(d)){
	        d = ovalue
	      }
	    }
		if(col.datatype=='N'){
			d=d.toNumber(col.format.dotname,false,1);
			if (d<0) {
				if (table.config.isnegative!='1') {//不允许为负
					alert("不允许为负,请重新录入！");
					d=0;
				}
			}
			ovalue=(ovalue+"").toNumber(col.format.dotname,false,1);
		}
		if(col.datatype=='F'){
			d=d.toNumber(col.format.dotname,false,1);
			ovalue=(ovalue+"").toNumber(col.format.dotname,false,1);
		}
		if(col.datatype=='I'){
			d=d.toNumber(col.format.dotname,false,1);
			ovalue=(ovalue+"").toNumber(col.format.dotname,false,1);
		}
		if(col.datatype=='P'){
			d=d.toNumber(col.format.dotname,false,1);
			ovalue=(ovalue+"").toNumber(col.format.dotname,false,1);
		}
		
		if(table.nowtype=="number"){
			d=d.toNumber(table.nowformat.dotname,false,1);
			ovalue=(ovalue+"").toNumber(table.nowformat.dotname,false,1);
		}
		if(col.mapping!=null||table.nowtype=="select"||table.nowtype=="tree"){
			d=_editor.value;
			
		}
		if(d==ovalue){
			ovalue=null;
			odata=null;
			if(col.oneditend!=null){
				col.oneditend(col._dt,null,_editor.l,_editor.c,_editor.data);
			}
			table.reflashdata(_editor.l,_editor.c);
			_editor=null;
			table.nowtype=null;
			closeOpens();
			table.reflash();
			return;
		}
		_editor.data[col.name]=d
		
		if(col.oneditend!=null){
			col.oneditend(col._dt,null,_editor.l,_editor.c,_editor.data);
		}
		var mf=false;
		if(col.mappingfilter!=null){
			mf=col.mappingfilter;
		}else{
			mf=_mappingfilter;
		}
		if(col.mapping!=null&&mf){
				if(col.mapping[d]==null){
					_editor.data[col.name]=ovalue;
				}
		}
		Ext.lt.message.send('editdatatable','endedit',
		{dt:col._dt,odata:odata,ndata:_editor.data,stype:'编辑',l:_editor.l,c:_editor.c,colname:col.name}
		);
		setUpdataValue(_editor.data,col.name);
		ovalue=null;
		odata=null;
		table.reflashdata(_editor.l,_editor.c);
		_editor=null;
		closeOpens();
		table.nowtype=null;
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
	Ext.lt.bindEvent(
	span,'onmousemove',function(){
		var x=event.offsetX,y=event.offsetY;
		if(span.offsetWidth-x<10&&span.offsetHeight-y<10){
			span.style.cursor='crosshair';
		}else{
			span.style.cursor='default';
		}
	});
	// 启用鼠标随动单元格
	var _mousecelldiv=document.createElement('DIV');

	_mousecelldiv.top=0;
	_mousecelldiv.style.zIndex=999999;
	_mousecelldiv.style.position='absolute';
	_mousecelldiv.style.border='2px solid #000';
	_mousecelldiv.style.display ='none';
	_mousecelldiv.left=0;
	document.body.appendChild(_mousecelldiv);
	Ext.lt.bindEvent(
	span,'onmousedown',function(){
		if(span.style.cursor!='crosshair')return;
		mover=true;
		var el=span.parentNode
		var celltype=el.id.split('_')[3];
		_mousecelldiv.style.display='block';
		var p=Ext.lt.HTML.positionedOffset(span,document.documentElement,false);
		_mousecelldiv.style.top=p.top
		_mousecelldiv.style.left=p.left
		_mousecelldiv.style.width=el.offsetWidth
		_mousecelldiv.style.height=el.offsetHeight;
	});
	
	var _moverobj={};
	table.onEvent('onmouseover',function(table,el,l,c,d){
		if(!mover)return;
		var h=(l-stuffEl.l)*el.offsetHeight;
		if(h<0)h=h*-1
		_moverobj.l=l;
		_moverobj.c=c;
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
	Ext.lt.bindEvent(document,'onmouseup',function(){
		if(!mover)return;
			mover=false;
			_mousecelldiv.style.display ='none';
			//开始赋值
			_endEdite.apply(_editor,[true]); 
			var l=	_moverobj.l
			var c=	_moverobj.c
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
				repData(table,null,s,c,datas[s],col,v);
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
	var range;
	if(document.createRange){
	    range = document.createRange();
	}else{
	    range = document.body.createTextRange();
	}
	function init_input(el,col,d,l,c){
		el.innerHTML='';
		el.appendChild(span);
		span.innerHTML='';
		span.focus();
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
		_editor.innerHTML=d[col.name]==null?'':d[col.name];
		
		_editor.data=d;
		table.editor=_editor;
		if(selectedType=='all'||_editor.col.selectedType=='all'){
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
	function _init_edit_input(el,col,d,l,c){
		_editor=init_input(el,col,d,l,c);
		_editor.onselect=function(){event.cancelBubble=true};
		_editor.onclick=function(){
			event.cancelBubble=true;
		}
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==13){
				setTimeout(function(){
					if(_editor!=null){
						_editor.innerHTML=_editor.innerText;
					}
				},1);
			}
			if(event.keyCode==27){
				_endEdite.apply(this,[true]);
				return;
			}
			if(_toMove())return;
			if(_editor.col.datatype!='S'){
				var v=_editor.innerText;//.substr(0,_editor.innerText.indexOf('.'))
				var index=v.indexOf('.');
				
				var length=0
				if(document.selection!=null){
					var seled=document.selection;
					length=seled.focusOffset-seled.anchorOffset;
				}else{
					var seled=window.getSelection()
					length=seled.focusOffset-seled.anchorOffset;
				}
				
				if(length>0){
					return true;
				}
				if(event.keyCode==46||event.keyCode==8){
					return true;
				}
				if(index==-1&&v.length>=20){
					return false;
				}else if(index>=20){
					return false;
				}
			}
			if(_editor.col.keydown!=null){
				return _editor.col.keydown(_editor.col._dt,_editor,l,c);
			}
		}
		_editor.focus();
	}
	
	var _sel
	
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
		
		if($(window).height()-pos.top>200){
			p.top=pos.top+_editor.offsetHeight;//st+e.clientY-(pos.y)-200+_editor.offsetHeight
		}else{
			// 
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
//			p.top=$(_editor).offset().top-200//+_editor.offsetHeight*2;
//			p.top=$(_editor).offset().top-200+_editor.offsetHeight*3;//为解决界面设置上下弹框乱飘，做得修改2015-07-20@fzw
//			p.bottom=doc.clientHeight-e.clientY;
			if (_sel && _sel.datas.size()>10) {
				p.top=$(_editor).offset().top-_editor.offsetHeight*(10)*0.5-5;
			}else{
				if (_sel) {
					p.top=$(_editor).offset().top-_editor.offsetHeight*(_sel.datas.size())*0.5-5;
				}else{
					p.top=$(_editor).offset().top-200+_editor.offsetHeight*3;
				}
			}
		}else{
			p.top=st+e.clientY-e.offsetY+_editor.offsetHeight;
		}
		if(doc.clientWidth-e.clientX<30){//doc.clientWidth-e.clientX<200修改为doc.clientWidth-e.clientX<30，为了解决弹出框乱票问题2015-07-20@fzw
			p.left=sl+e.clientX-e.offsetX-180+_editor.offsetWidth
		}else{
			p.left=sl+e.clientX-e.offsetX
		}
		return p;
	}	
	
	function _init_edit_custom(el,col,d,l,c){
		var ev=el.innerText;
		_editor=init_input(el,col,d,l,c);
		_editor.innerHTML=ev;
		if(_sel==null){
			_sel=document.createElement("div");
			//_editor.parentNode.appendChild(_sel);
			document.body.appendChild(_sel);
			_sel.className='editselect';
			//_sel.size=10;
		}
		var ci=0;//col.ci;
		var cdata=null;
		var pos=getEditorPosition();
		_sel.style.display ='block';
		for(var p in pos){
			if(pos[p]==null){pos[p]=0}
			_sel.style[p]=pos[p]+'px';
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
			return false;
			if(event.keyCode==_openKey){
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
					if(_sel!=null)
					_sel.firstChild.focus();
					return;
				}
			}
			if(_toMove())return;
			window.setTimeout(function(){
				_sel.value=_editor.innerText;
				_editor.value=_editor.innerText;
				buildselect(false)
			},100)
		}
		buildselect(true)
		_sel.style.display ='none';
		_sel.style.height ='30px';
		if(!_selectOpen){
			_sel.style.display ='block';
			buildselect(true)
		}
		_sel.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==27){
				_sel.style.display ='none'
				//_editor.focus();
				return;
			}
			if(event.keyCode==13){
				_sel.style.display ='none';
				//_editor.focus();
				window.setTimeout(function(){
					setSelectValue();
				},100);
				return;
			}
		}
		_sel.ondblclick=function(){
			_sel.style.display ='none';
			setSelectValue();
		}
		_sel.onclick=function(){
			setSelectValue();
		}
		function setSelectValue(){
			var col=_sel.col
			_editor.innerHTML=col.setShowValue(table,col,d,l,c,_sel);
			_editor.value=_sel.value;
		}
		
		function buildselect(b){
			var sth=[]; 
			var str=_editor.innerText.toUpperCase();
			_sel.innerHTML="";
			var _SO=null;
			var cdata=_sel.datas;
			var col=_sel.col;
			if(col.setEditShowDiv!=null && b){
				_sel.innerHTML=col.setEditShowDiv(el,col,d,l,c);
			}
			if(col.bulidafter){
				col.bulidafter(table,col,d,l,c,_sel);
			}
		}
	}
	
	
	
	
	function _init_edit_select(el,col,d,l,c){
		var ev=el.innerText;
		_editor=init_input(el,col,d,l,c);
		_editor.innerHTML=ev;
		if(_sel==null){
			_sel=document.createElement("div");
			//_editor.parentNode.appendChild(_sel);
			document.body.appendChild(_sel);
			_sel.className='editselect';
			//_sel.size=10;
		}
		var ci=0;//col.ci;
		var cdata=null;
	
		
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
			if(event.keyCode==_openKey){
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
					if(_sel.firstChild!=null)
					_sel.firstChild.focus();
					return;
				}
			}
			if(_toMove())return;
			window.setTimeout(function(){
				if(_editor==null)
				_sel.firstChild.value=_editor.innerText;
				_editor.value=_editor.innerText;
				buildselect(false)
			},100)
		}
		_sel.style.display ='block';
		buildselect(true)
		var pos=getEditorPosition();
		
		/*
		for(var p in pos){
			if (pos["bottom"]!=null) {
				if (p!="top") {
					if(pos[p]==null){pos[p]=0}
					_sel.style[p]=pos[p]+'px';
				}
			}else{
				if(pos[p]==null){pos[p]=0}
				_sel.style[p]=pos[p]+'px';
			}
		}
		*/
		for(var p in pos){
			if(pos[p]==null){pos[p]=0}
			_sel.style[p]=pos[p]+'px';
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
					setSelectValue();
				},100);
				return;
			}
		}
		_sel.onkeypress=function(){
			_editor.focus();
			_editor.onkeydown();
		}
		_sel.onclick=function(){
			setSelectValue();
		}
		_sel.ondblclick=function(){
			_sel.style.display ='none';
			_editor.focus();
			setSelectValue();
		}
		
		function setSelectValue(){
			var col=_sel.col
			_editor.innerHTML=col._formatValue(_sel.firstChild.value);
			_editor.value=_sel.firstChild.value;
		}
		function buildselect(b){
			var sth=[]; 
			var str=_editor.innerText.toUpperCase();
			_sel.innerHTML="";
			var _SO=null;
			var cdata=_sel.datas;
			var col=_sel.col;
			var relwidth = col.width>col.minwidth?col.width:col.minwidth;
			var viewwidth = relwidth>300?300:relwidth;
			var _h=["<select size=10 style='width:"+viewwidth+"px;'>"];
			for(var i=0,j=cdata.length;i<j;i++){
			var _bindex=false;
				for(var z=0,zl=cdata[i].length;z<zl;z++){
					if((cdata[i][z]+"").toUpperCase().indexOf(str)!=-1){
						_bindex=true;break;	
					}
				}
				if(str==null||str==''||_bindex||b){
					/*var opt=document.createElement("option");
					opt.value=cdata[i][ci];
					opt.innerText=col._formatValue(cdata[i][ci])
					_sel.appendChild(opt);
					*/
					if(col.showSelectValue==null){
						_h.push("<option value='",cdata[i][ci],"'>",col._formatValue(cdata[i][ci]),"</option>");
					}else{
						_h.push("<option value='",cdata[i][ci],"'>",col.showSelectValue(cdata[i][ci],cdata[i]),"</option>");
					}
				}
			}
			_h.push("</select>")
			_sel.innerHTML=_h.join("");
			if(_sel.firstChild.childNodes.length<4){
				_sel.size=4;
			}else	if(_sel.firstChild.childNodes.length<10){
				_sel.firstChild.size=_sel.firstChild.childNodes.length;
			}else{
				_sel.firstChild.size=10;	
			}
			_sel.firstChild.value=_editorValue;
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
			if(event.keyCode==_openKey){
				if(_dynarch_popupCalendar!=null&&!_dynarch_popupCalendar.hidden){
					_dynarch_popupCalendar.hide();
				}else{
					setTimeout(function(){_showCal()},100);
				}
				setTimeout(function(){	_editor.innerHTML=_editor.innerText},100);
			
				 return false;
			}
			if(event.keyCode==27){
				_dynarch_popupCalendar.hide();
				_endEdite.apply(this,[true]);
				 return false;
			}
			
			if(_toMove()) return false;
			var ec = event.keyCode;
      if ((ec >= 48 && ec <= 57) || (ec >= 96 && ec < 105)) {
          return true;
      }
      if (ec == 46 || ec == 8) return true;
      return false;
		}
		_editor.focus();
		
		if(!_selectOpen){
			_showCal();
		}
	
	}
	Ext.lt.message.hook('calendar','selected',function(cal){
		if(cal==null||cal.sel==null||cal.sel.tagName!="SPAN")return;
		cal.sel.innerHTML=cal.sel.value;cal.sel.focus();
	});
	Ext.lt.message.hook('calendar','hide',function(cal){
		if(cal==null||cal.sel==null||cal.sel.tagName!="SPAN")return;
		cal.sel.focus();
	});
	function _showCal(){
		showCalendar(_editor, '%Y%m%d', null, true);
		_dynarch_popupCalendar._showDiv.focus();
	}
	
	var _treeDiv
	var _qtree
	function _init_edit_tree(el,col,d,l,c){
		var ev=el.innerText;
		_editor=init_input(el,col,d,l,c);
		_editor.innerHTML=ev;
		var _editorValue=d[col.name];
		if(_treeDiv==null){
			_treeDiv=document.createElement("div");
			document.body.appendChild(_treeDiv);
			_treeDiv.className='edittree';
		}
		var pos=getEditorPosition();
		for(var p in pos){
			if(pos[p]){
			_treeDiv.style[p]=pos[p]+'px';
			}
		}
		
		_initQtree(el,col,d,l,c,_editorValue);
		_treeDiv.style.display ='none';
		_editor.focus();
		_editor.qtree=_qtree;
		_editor.onkeydown=function(){
			event.cancelBubble=true;
			if(event.keyCode==_openKey){
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
			window.setTimeout(function(){filterTree(col)},100)
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
			window.setTimeout(function(){filterTree(col)},100)
		}
		
	}
	function filterTree(){
		var v=_editor.innerText;
		_qtree.setFilter([{field:'code',values:[v]},{field:'name',values:[v]},{field:'pinyin',values:[v]}],'contain')
	}
	function _dblclickTree(){
		if(_qtree.getSelected().length==0)return;
		var code=_qtree.getSelected()[0][_qtree.colkey];
		setQreeSelectValue(code)
		_treeDiv.style.display ='none';
		_editor.focus();
	}
	function _clickTree(){
		if(_qtree.getSelected().length==0)return;
		var code=_qtree.getSelected()[0][_qtree.colkey];
		setQreeSelectValue(code)
	}
	
		
	function setQreeSelectValue(code){
		var col=_editor.col
		_editor.innerHTML=col._formatValue(code);
		_editor.value=code
		Ext.lt.message.send('editdatatable.'+_editor.col.name,'onTreeSelected',{qtree:_qtree,col:_editor.col,value:code,editor:_editor});
	}
	
	function _initQtree(el,col,d,l,c,v){
		var rowobj = table.getRecordset().getData(l);//获得可编辑列表行对象
		var _strFilter="";	//翻译UI字段级过滤条件
		if ((col.uifilter!=undefined)&&(col.uifilter!="")) {
			var _keyVals=col.uifilter.split("$");	//filter如果是通配符形式进行处理
			if (_keyVals.size()>0) {
				for ( var i = 0; i < _keyVals.size(); i++) {
					if (i%2==0) {
						_strFilter+=_keyVals[i]
					}else{
						_strFilter+=" ‘";	//全角下的‘号
						_strFilter+=(rowobj)[_keyVals[i].toLowerCase()];//_edit.getvalue()获得整个编辑区的值
						_strFilter+="‘ ";	//全角下的‘号
					}
				}
			}else{
				_strFilter=col.uifilter;
			}
		}else{
			_strFilter="1=1";
		}
		col._uifilter=_strFilter;
		
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
		var cols=null;
		var format=null;
		if(col._dt.nowtype=="tree"){
			cols=col._dt.nowcol;
			format=col._dt.nowformat;
		}else{
			cols=col.mapper.columns;
			format=col.format
		}
		if(_data.type!="recordset"){
			_data=new Ext.lt.recordset({columns:cols,datas:_data});
		}
		_qtree=new Ext.lt.Qtree({
			field:{id:cols[0],sid:'supcode',name:'name',pinyin:'pinyin',level:"level"},
			outformart:format,
			data:_data,
			classname:qtreeclass,
			linkchild:true,
			values:[v],
			on:{dblclick:_dblclickTree,click:_clickTree}
		});
		_qtree.colkey=cols[0];
		_treeDiv.style.display ='block';
		_qtree.draw(_treeDiv);
		var w_div=_treeDiv.offsetWidth,w_tree=_treeDiv.firstChild.offsetWidth;
		
		if(w_tree>350) w_tree=350;
		_treeDiv.style.width=w_tree+'px';
		var pos=Ext.lt.HTML.positionedOffset(_treeDiv,document.documentElement,false);
		if(pos.left+w_tree-document.body.clientWidth>0) _treeDiv.style.left=(pos.left-(w_tree-225))+'px';
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
		_init_edit(el,table.getCol(c),d,l,c)
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
				_endEdite.apply(_editor,[true]); 
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
		//table.getRecordset().size() 获得表格下数据的行数
		for(var _length=table.getRecordset().size();nextline<_length;nextline++){//_length=_rs.size() 修改为_length=table.getRecordset().size()，用以获得行数（Bug4152 ） 20150909@fzw
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
			_editor=null;
			ovalue=null;
			odata=null;
			table.nowtype=null;
			closeOpens();
		}
	}
	function buildEventScorll(div){
		// 追加表格拖拽事件跟踪
		Ext.lt.bindEvent(div.firstChild,"onscroll",Ext.lt.util.fnbind(_scroll,div.firstChild));
		Ext.lt.bindEvent(div.firstChild,"onmousewheel",Ext.lt.util.fnbind(_scroll,div.firstChild));
	}
		
	Ext.lt.bindEvent(document,'onmousedown',function(){
		//判断点击的是否是框里面。
		if(_treeDiv!=null&&_treeDiv.contains(event.srcElement)){
			return;
		}
		if(_sel!=null&&(_sel==event.srcElement||_sel.contains(event.srcElement))){
			return;	
		}
		if(_editor!=null&&_editor.parentElement!=null&&!_editor.parentNode.contains(event.srcElement)){
			_endEdite.apply(table.editor,[true]);
			_editor=null;
			ovalue=null;
			odata=null;
			table.nowtype=null;
			closeOpens();
		}
	});
		// 这里开始识别可编辑属性
	table.setCols=function(c){
		if(!Ext.lt.isArray(c)){c=[c]}
		var col
		for(var n=0;n<c.length;n++){
			col = {};
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
				if(col.datatype=='B'){
					if(col.fn == null){
						col.fn=function(i,j,rs,value){return 	'<span class="checkbox_editspan"><input type="checkbox" '+(value==1?'checked=true':'')+' /></span>';}	
					}
					col.onclick=function(table,el,l,c,d){
						if(this.onclickstart!=null&&this.onclickstart((table,el,l,c,d))==false){
							return false; //  是否允许触发点击事件
						}
						_columnclick.apply(this,arguments);
						if(d[this.name]==1){
							d[this.name]=0;
						}else{
							d[this.name]=1;
						}
					if(this.oneditend!=null){
						this.oneditend(table,null,l,c,d);
					}

					Ext.lt.message.send('editdatatable','endedit',
					{dt:table,odata:odata,ndata:d,stype:'编辑',l:l,c:c,colname:this.name}
					);
					setUpdataValue(d,this.name);
					ovalue=null;
					odata=null;
					table.reflash();
					}
				}
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
	table._reflash_bak=table.reflash;
	table.reflash=function(cc){
		closeOpens()
		table._reflash_bak(cc);
	}
	table.moveKey={'37':'left','38':'up','40':'down','39':'right'};
	table.setMoveKey=function(cfg){
		table.moveKey=Ext.lt.apply({'13':"down",'9':'right','37':'left','38':'up','40':'down','39':'right'},cfg);
	}
	table.setSelectDown=function(b){
		_selectOpen=b==true;	
	}
	
	table.getOldData=function(){
		return odata;
	}
	table.getOldValue=function(){
		return ovalue;	
	}
	table.mappingfilter=function(b){
		_mappingfilter=b==true;	
	}
	table.setOpenKeycode=function(keycode){
		_openKey=keycode;	
	}
	table.setEditSelect=function(type){
		selectedType=type;
	}
	table._setRecordset=table.setRecordset;
	table.setRecordset=function(rs){
		table._setRecordset(rs);
		init();
	}
	function init(){
		adddata={};
		deldata={};
		updateData={};
	}
	function setUpdataValue(d,cname){
		if(adddata[d._locationposition]!=null){
			return;	
		}
		if(updateData[d._locationposition]==null){
			updateData[d._locationposition]={nowData:d,cols:[]};
		}
		if(updateData[d._locationposition].cols[cname]==null){
			updateData[d._locationposition].cols[cname]=true;
			updateData[d._locationposition].cols.push(cname);
		}
		d.update=true;
	}
	var adddata={};
	var deldata={};
	var updateData={};
	table.addData=function(v,il){
		this.getRecordset().addData(v,il);
		if(!Ext.lt.isArray(v)) v=[v];
		for(var i=0,l=v.length;i<l;i++){
			adddata[v[i]._locationposition]=v[i];
		}
	}
	
	table.removeData=function(v){
		this.getRecordset().remove(v);
		if(!Ext.lt.isArray(v)) v=[v];
		for(var i=0,l=v.length;i<l;i++){
			if(adddata[v[i]._locationposition]!=null){
				adddata[v[i]._locationposition]=null;
			}else {
				if(updateData[v[i]._locationposition]!=null){
					updateData[v[i]._locationposition]=null;
				}
				deldata[v[i]._locationposition]=v[i];
			}
		}
	}
	table.updateData=function(l,cname,v){
		var d=this.getRecordset().getData(l);
		d[cname]=v;
		setUpdataValue(d,cname);
	}
	table.getAddData=function(){
		var ret=[];
		for(var e in adddata){
			if(adddata[e]!=null){
				ret.push(adddata[e]);	
			}
		}
		return ret;
	}
	table.updateDataBylocaid = function(locationposition, cname, v) {
		var d = this.getRecordset().query({_locationposition:locationposition})[0];
		d[cname] = v;
		setUpdataValue(d, cname);
	}
	table.getUpdataData=function(){
		var ret=[];
		for(var e in updateData){
			if(updateData[e]!=null){
				ret.push(updateData[e]);	
			}
		}
		return ret;
	}
	table._destory=table.destory;
	table.destory=function(){
		if(_sel!=null){
			document.body.removeChild(_sel);
		}
		if(_treeDiv!=null){
			document.body.removeChild(_treeDiv);
		}
		this._destory();
	}
	table.getRemoveData=function(){
		var ret=[];
		for(var e in deldata){
			if(deldata[e]!=null){
				ret.push(deldata[e]);	
			}
		}
		return ret;
	}
	table.setNowType=function(type){
		this.nowtype=type;
	}
	table.getEditor=function(){
		return _editor;	
	}
	table.getEditorPosition=function(){
		
		return getEditorPosition();
	}
	table.setTreeClass=function(classname){
		qtreeclass=classname;	
	}
	return table;
});
