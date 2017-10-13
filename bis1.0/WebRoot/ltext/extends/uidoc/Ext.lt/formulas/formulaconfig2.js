//检查命名空间
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;

Ext.lt.formulaconfig=function(service,config){
	var html=[];
	var rs=null;
	var dt=null;
	var fm=null;
	html.push("<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='wn.show();'>新增</button>&nbsp;&nbsp;<button class=\"btn\" onclick='alert(\"删除成功!\")'>删除</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div><div class='winfitmode' class='winfitmode' style='height:500px;width:600px;overflow:hidden;'></div>");
	function initWin(){
		
	}
	function initTeble(d){
		rs=ltdatatable.table1;
		dt=new Ext.lt.datatable(rs);
		col=null;
		col=[dt.columns.seq,dt.columns.checkbox];
		
		col.push({alias:'编码',datatype:'S',name:'code'});
		col.push({alias:'名称',datatype:'S',name:'name'});
		col.push({alias:'公式',datatype:'S',name:'formula'});
		col.push({alias:'公式内容',datatype:'S',name:'formulas'});
		col.push({alias:'备注',datatype:'S',name:'re'});
		dt.drawMultiHead(true);
		dt.setCols(col);
		/*********设置样式*************/
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(d);
	}
	function createWin(d){
		d.id='winfitmode'
		wn=Ext.lt.window({title:"编辑信息",h:560,w:860,className:'wind7', close:false,pop:true,mark:true});
		var h=[];
		h.push('<ul layout="{w:{fit:800}}" columnsize=1 >');
		h.push('<li label="公式编码：" width=\"750px\" type=\"input\" maxLength=50 name=\"name\" redwordmode=\"on\" />');
		h.push('<li label="公式名称：" width=\"750px\" type=\"input\" maxLength=50 name=\"table\" redwordmode=\"on\" />');
		h.push('<li label="产品名称：" width=\"750px\" type=\"select\" maxLength=50 name=\"p\" redwordmode=\"on\" dataloader=\"ltdatatable.pro\" />');
		h.push('</ul>');
		h.push('<div style="float:left" layout="{w:{fit:600},h:{fit:400}}">');
		h.push('<p>公式：');
		h.push('<div class="formula_area" id="formula_area" layout="{w:{fit:600},h:{fit:200}}"></div>');
		h.push('</p>');
		h.push('<p>');
		h.push('<div class="formula_formulas" id="formula_formulas" layout="{w:{fit:280},h:{fit:160}}"></div>');
		h.push('<div class="formula_formulas_other" id="formula_formulas_other" layout="{w:{fit:300},h:{fit:160}}">');
		h.push('<button _val="+">+ 加</button>');
		h.push('<button _val="-">- 减</button>');
		h.push('<button _val="*">* 乘</button>');
		h.push('<button _val="/">/ 除</button>');
		h.push('<button _val="%">% 求余</button>');
		h.push('<button _val=",">, 参数分割符</button>');
		h.push('<button _val="(">( 左括号</button>');
		h.push('<button _val=")">) 右括号</button>');
		h.push('<button _val=">">> 大于</button>');
		h.push('<button _val="<">< 小于</button>');
		h.push('<button _val="=">= 等于</button>');
		h.push('<button _val="const">常量</button>');
		h.push('<button _val="cell">cell 单元格</button>');
		h.push('<button _val="row">row 行</button>');
		h.push('<button _val="col">col 列</button>');
		h.push('<button _val="backspace">backspace</button>');
		h.push('</div>');
		h.push('</p>');
		h.push('</div>')
		h.push('<div class="formula_cells" id="formula_cells" ></div>');
		h.push('<div style="width:800px"><center><button class=\"btn\" onclick="wn.hidden();">确认</button>&nbsp;&nbsp;<button class=\"btn\" onclick="wn.hidden();" >取消</button></center></div>');
		d.innerHTML=h.join('');
		wn.draw(d);
		buildFormulaTree();
		buildButton();
//		wn.hidden();
		buildCellsTree();
		fm = Ext.lt.editpanel.initFormPanel(d.firstChild);
	}
	var celltree=new Ext.lt.recordset({columns:['itemid','name','code','v'],datas:[
		[1,'功能分类 类','func1','func1'],
		[2,'功能分类 款','func2','func2'],
		[3,'功能分类 项','func3','func3']
	]});
	function buildCellsTree(){
		var qtree=new Ext.lt.Qtree({
			data:celltree,
			viewmodel:'list',
			on:{'nodeclick':function(qtree,node){
					addFormula("cells("+node.data.v+")");
			}}
		});
		qtree.draw(document.getElementById('formula_cells'));
	}
	var fttree=new Ext.lt.recordset({columns:['itemid','name','code','promptinfo','formulas'],datas:[]});
	var selectNode=null;
	var formulas=new Ext.lt.formulas();
	function buildFormulaTree(){
		var formulasInfs=formulas.getFormulasInfo();
		for(var es in formulasInfs){
			fttree.addData({itemid:es,name:formulasInfs[es].name,code:es,promptinfo:formulasInfs[es].promptinfo});
		}
		var qtree=new Ext.lt.Qtree({
			data:fttree,
			outformartfn:function(node){
				return '<a title=\"'+node.promptinfo+'\">'+node.name+'</a>';
			},
			viewmodel:'list',
			on:{'nodeclick':function(qtree,node){
					addFormula(node.data.name+"(");
					addFormula(")");
			}}
		});
		qtree.draw(document.getElementById('formula_formulas'));
	}
	
	var formula_area=null;
	Ext.lt.message.hook('prompt','close',function(){
		var v=Ext.lt.HTML.prompt.getValue()
		var vs=selectNode.formulas(v);
		selectNode=null;
		if(v==null||v==''){
			return;
		}
		addFormula(vs);
	});
	
	function buildButton(){
		var div=document.getElementById('formula_formulas_other');
		var ds=div.childNodes;
		for(var i=0;i<ds.length;i++){
			var _ds=ds[i];
			switch(_ds._val){
				case 'indexOf':
					_ds.onclick=function(){selectNode=this; Ext.lt.HTML.prompt.show("查找的子字符串")};
					_ds.formulas=function(v){return "indexOf('"+v+"')"};
					break;
				case 'const':
					_ds.formulas=function(v){return v};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("请填常量值");}
					break;
				case 'cell':
					_ds.formulas=function(v){return "cell("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("请单元格 列,行");}
					break;
				case 'row':
					_ds.formulas=function(v){return "row("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("请行编号");}
					break;
				case 'col':
					_ds.formulas=function(v){return "col("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("请列编号");}
					break;
				case 'backspace':
					_ds.onclick=function(){
						if(selectFdiv==null){
							formula_area.removeChild(formula_area.lastChild);	
						}else{
							formula_area.removeChild(selectFdiv.previousSibling);
						}
					}
					break;
				default:_ds.onclick=function(){addFormula(this._val);}
			}
		}
		document.getElementById('formula_area').onclick=function(){
			if(event.srcElement==this &&	selectFdiv!=null)	{
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
				selectFdiv=null;
			}
		}
		
		document.getElementById('formula_area').onkeypress=function(e){
			if(keyCode[event.keyCode]!=null){
				addFormula(keyCode[event.keyCode]);
			}
			
		}
	}
	var keyCode={};
	function getKeyCodes(){
		var buttons= document.getElementById('formula_formulas_other').childNodes;
		for(var i=0;i<buttons.length;i++){
			if(buttons[i]._val.length==1){
				keyCode[buttons[i]._val.toUpperCase().charCodeAt(0)]=buttons[i]._val;
			}
		}
	}
	var fdivClose="<span onclick='Ext.lt.message.send(\"formula\",\"removeFormula\",this)'>　</span>";
	Ext.lt.message.hook("formula","removeFormula",function(font){
		if(selectFdiv==font.parentNode){selectFdiv=null;}
		formula_area.removeChild(font.parentNode);
	});
	var selectFdiv=null;
	function addFormula(t){
		if(t==null)return;
		var fdiv=document.createElement('div');
		if(selectFdiv==null){
			formula_area.appendChild(fdiv);
		}else{
			formula_area.insertBefore(fdiv,selectFdiv);
		}
		fdiv.innerHTML=t+fdivClose;
		fdiv.sthml=t;
		fdiv.onmousemove=function(){
			if(this.className.indexOf('divmouse')==-1){
				this.className+=' divmouse';
			}
		}
		fdiv.onmouseout=function(){
			this.className=this.className.replace(' divmouse','');
		}
		fdiv.onclick=function(){
			if(selectFdiv==this){
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
				selectFdiv=null;
				return;
			}
			if(selectFdiv!=null){
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
			}
			this.className+=' divselect';
			selectFdiv=this;
		}
		
	}
	config.draw=function(d){
		var html=[];
		html.push("<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='wn.show();'>新增</button>&nbsp;&nbsp;<button class=\"btn\" onclick='alert(\"删除成功!\")'>删除</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div><div class='winfitmode' class='winfitmode' style='height:500px;width:800px;overflow:hidden;'></div>");
		d.innerHTML=html.join('');
		initTeble(d.childNodes[1]);
		createWin(d.childNodes[2]);
		formula_area=document.getElementById('formula_area');
		getKeyCodes();
	}
	config.resize=function(){
	}
	
	return config;
}