//检查命名空间
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;
Ext.lt.formulas=function(cfg){
	var _config=Ext.lt.apply({},cfg);
	var fors={};
	
	
	var formulas={
		cfg:_config,
		type:'formulas',
		version:'1.0',
		currentRow:-1,
		currentCol:-1,
		setCell:function(cells){
			this.cfg.cells=cells;
		},
		getColNames:function(){
			return this.cfg.getColNames();
		},
		getFormulasInfo:function(){
			return 	Ext.lt.formulas.formulaInfo;
		},
		calculation:function(fnname,params){
			return this[fnname](params);
		},
		cells:function(l,c,whereObj){
			if(c==null||whereObj==null){
				return this.cfg.cells.queryCell(l,this.currentRow,this.currentCol);
			}
			if(this.cfg.cells.getCell(l+'_'+c+'_'+whereObj)==null){
				this.cfg.cells.setCells(l+'_'+c+'_'+whereObj,l,c,whereObj);
			}
			return this.cfg.cells.queryCell(l+'_'+c+'_'+whereObj,this.currentRow,this.currentCol);
		},
		
		cell:function(l,colName){
			return this.cfg.cells.cell(l,colName);
		},
		bind:function(ds){
			if(ds!=null&&ds.type=='datatable'){
				this.cfg.datatable=ds;
				this.cfg.recordset=null;
			}
			if(ds&&ds.type=='recordset'){
				this.cfg.recordset=ds;
				this.cfg.datatable=null;
			}
			if(this.cfg.cells==null){
				this.cfg.cells=Ext.lt.formulas.initcells();	
			}
			this.cfg.cells.bind(ds);
			return this.cfg.cells;
		},
		getRecordset:function(){
			return this.cfg.cells.getRecordset();
		},
		getColNames:function(){
			return _getCols(this.cfg);
		},
		execution2str:function(str,l,c){
			if(fors[str]==null){
				eval("fors[str]=function(l,c){ return "+str+"}");
			}
			this.currentRow = l;
			this.currentCol = c;
			return fors[str](l,c);
		},
		createFormulas:function(formulaname,name,promptinfo,fn){
			Ext.lt.formulas.createFormulas(formulaname,name,promptinfo,fn);
			this[formulaname]=fn
		},
		column:function(c){
				var rs=this.cfg.cells.getRecordset();
			var colnames=this.cfg.cells.getColNames();
			if(colnames.indexOf(c)==-1){
					c=colnames[c];
			}
			var v=rs.getData(this.currentRow)[c];;
			if(v==null||v==''||isNaN(v)){return 0}
			try{
				return parseFloat(rs.getData(this.currentRow)[c]);
			}catch(e){
				return 0
			}
		},
		col:function(c){
			var rs=this.cfg.cells.getRecordset();
			var colnames=this.cfg.cells.getColNames();
			if(colnames.indexOf(c)==-1){
					c=colnames[c];
			}
			var datas=[];
			for(var i=0,l=rs.size();i<l;i++){
				datas.push(rs.getData(i)[c]);
			}
			return datas;
		},
		row:function(l){
			return this.cfg.cells.getRow(l)
		},
		getDatatable:function(){
			return this.cfg.cells.getDatatable();
		}
	};
	
	function _init(){
		for(var E in Ext.lt.formulas.formulaInfo){
			formulas[E]=Ext.lt.formulas.formulaInfo[E].calculation;
		}
	}
	_init();
	return formulas;
}
Ext.lt.formulas.createFormulas=function(formulaname,name,promptinfo,fn){
	if(!(fn==null||formulaname==null||Ext.lt.isFunction(fn))){
		alert('加载【'+name+'】方法失败');
		return false;	
	}
	Ext.lt.formulas.formulaInfo[formulaname]={name:name,promptinfo:promptinfo,calculation:fn,selfFormulas:true};
};
Ext.lt.formulas.cells={
	_cell:{},
	setCells:function(str,l,c,wherefnstr){
		this._cell[str]=[str,l,c,wherefnstr];
	},
	getCell:function(str){
		return this._cell[str];
	},
	cells:function(l,c,w){
		if((c==null||c==''||c=='null')&&(w==null||w==''||w=='null')){
			return;
		}
		var str=l+''+c+''+w;
		this._cell[str]=[str,l,c,w];
		return str;
	}
}

Ext.lt.formulas.initcells=function(cfg){
	var _config=Ext.lt.apply({},cfg);
	
	function _getRs(cfg){
		if(cfg.recordset!=null){
			return cfg.recordset;
		}
		if(cfg.datatable!=null){
			return cfg.datatable.getRecordset();
		}
		return null;
	}
	function _getColNames(cfg){
		if(cfg.recordset!=null){
			return cfg.recordset.getColNames();
		}
		if(cfg.datatable!=null){
			 var cols=cfg.datatable.getCols();
			 var arr=[];
			 for(var i=0,l=cols.length;i<l;i++){
			 	arr.push(cols[i].name);
			 }
			 return arr;
		}
		return [];
	}
	function createRc(lc){
		if(lc==null)return null;
		var arrs=lc.split(',');
		var ret=[];
		for(var i=0,l=arrs.length;i<l;i++){
			if(arrs[i].indexOf('-')==-1){
				ret.push(arrs[i])
			}	else{
				var m=arrs[i].split('-');
				for(var s=parseInt(m[0],10),e=parseInt(m[1],10);s<e;s++){
					ret.push(s+0);
				}
			}
		}
		return ret;
	}
	var cels={};
	var celswherefn={};
	var cells={
		cfg:_config,
		type:'cell',
		version:'1.0'	,
		//c 当前列，l 当前行， whereObj,条件语句}
		cell:function(l,colName){
			return this.getRecordset().getData(l)[colName];
		},
		getRow:function(l){
			return this.getRecordset().getData(l);
		},
		queryCell:function(str,l,c){
			if(cels[str]==null){
				var vs=Ext.lt.formulas.cells.getCell[str];
				if(vs==null)return
				this.setCells(vs[0],vs[1],vs[2],vs[3]);
			}
			return cels[str].fn(this,l,c);
		},
		setCells:function(str,ls,cs,wherefnstr){
			eval("celswherefn[\""+wherefnstr+"\"]=function(rs,c,cname,l,d,v,al,ac){ return "+wherefnstr+"}");	
			cels[str]={}

			cels[str].cs=createRc(cs);
			cels[str].ls=createRc(ls);
			cels[str].fn=function(cells,al,ac){
				var ret=[];
				
				var rs=cells.getRecordset()
				var names=cells.getColNames();
				var _ls=this.ls;
				var _lslength;
				if(_ls!=null){
					_lslength=_ls.length;
				}else{
					_lslength=rs.size();
				}
				var _cs=this.cs;
				var _cslength;
				if(_cs!=null){
					_cslength=_cs.length;
				}else{
					_cslength=names.length;
				}
				
				for(var l=0;l<_lslength;l++){
					var d;
					if(_ls==null){
						d=rs.getData(l);
					}else{
						d=rs.getData(_ls[l]);
					}
					
					for(var c=0;c<_cslength;c++){
						var cname=_cs[c];
						if(!isNaN(cname)){
							cname=names[cname];
						}
						var v=d[cname];
						if(wherefnstr==null||celswherefn[wherefnstr]==null||celswherefn[wherefnstr](rs,c,cname,l,d,v,al,ac)){
							ret.push(v);
						}
					}
				}
				if(ret.length==0){
					throw 9000;
				}
				return ret;
			}
		},
		getCell:function(str){
			if(cels[str]==null){
				var vs=Ext.lt.formulas.cells.getCell[str];
				if(vs==null)return
				this.setCells(vs[0],vs[1],vs[2],vs[3]);
			}
			return cels[str];
		},
		findCL:function(type,str){
			var cl={};
			switch(type){
				case 'cell': 
					var o=str.split(',');
					return {l:[o[0]],c:[eval(o[1])]};
				case 'row':
					return {l:[str],c:["#all"]};
				case 'col':
					return {l:['#all'],c:[eval(str)]};
				case 'column':
					return {l:['#all'],c:[eval(str)]};
				case 'cells':
				var _formulas_cells_key
					eval('_formulas_cells_key=Ext.lt.formulas.cells.cells('+str+')');
					var vs=Ext.lt.formulas.cells.getCell(_formulas_cells_key);
					
					if(vs==null)return null
					
					this.setCells(vs[0],vs[1],vs[2],vs[3]);
					var o={l:cels[_formulas_cells_key].ls,c:cels[_formulas_cells_key].cs};
					if(o.l==null)o.l=["#all"];
					if(o.c==null)o.c=["#all"];
					return o;
			}
			return {l:['#all'],c:['#all']};
		},
		
		bind:function(ds){
			if(ds!=null&&ds.type=='datatable'){
				this.cfg.datatable=ds;
				this.cfg.recordset=null;
			}
			if(ds&&ds.type=='recordset'){
				this.cfg.recordset=ds;
				this.cfg.datatable=null;
			}
		},
		getRecordset:function(){
			return _getRs(this.cfg);
		},
		getDatatable:function(){
			return this.cfg.datatable
		},
		getColNames:function(){
			return _getColNames(this.cfg);
		}
	};
	return cells;
}
Ext.lt.formulas.formulaInfo={'sum':{
		name:"合计",
		promptinfo:"sum(Array)",
		execution:function(arr){
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				if(isNaN(arr[i])){
					continue;
				}
				//if(typeof(arr[i])=='string'){
					_sum+=parseFloat(arr[i]);
				//}else{
				//	_sum+=arr[i]
				//}
				
			}
			return _sum;
		}
	},'ave':{
		name:"平均值",
		promptinfo:"ave(Array)",
		execution:function(arr){
			if(arr.length==0)return 0;
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				_sum+=arr[i]	
			}
			return _sum/arr.length;
		}
	},'sum2obj':{
		name:"合计",
		promptinfo:"sum(Array,prototypeName)",
		execution:function(arr,pn){
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				if(isNaN(arr[i][pn])||arr[i][pn]==null){
					continue;
				}
				//if(typeof(arr[i][pn])=='string'){
					_sum+=parseFloat(arr[i][pn]);
				//}else{
				//	_sum+=arr[i]
				//}
			}
			
			return _sum;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo.sum2obj.execution(arrs[0],arrs[1]);
		}
	},'ave2obj':{
		name:"平均值",
		promptinfo:"ave(Array,prototypeName)",
		execution:function(arr,pn){
			if(arr.length==0)return 0;
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				_sum+=arr[i][pn]
			}
			return _sum/arr.length;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo.ave2obj.execution(arrs[0],arrs[1]);
		}
	},'if':{
		name:"判断",
		promptinfo:"判断满足条件，如果满足返回一个，否则返回另一个(if(test,true_value,false_value))",
		execution:function(test,true_value,false_value){
			if(eval(test)){
				return true_value;
			}else{
				return false_value;
			}
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['if'].execution(arrs[0],arrs[1],arrs[2]);
		}
	},'indexOf':{
		name:"存在于",
		promptinfo:"返回指定子字符串在此字符串中第一次出现处的索引。如果它不作为一个子字符串出现，则返回 -1。(indexOf(str,str))",
		execution:function(str,s){
			return str.indexOf(s);
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['indexOf'].execution(arrs[0],arrs[1]);
		}
	},'indexOfArray':{
		name:"数组存在对象",
		promptinfo:"返回指定子值在此集合中第一次出现处的索引。如果它不存在，则返回 -1。(indexOfArray(Array,obj))",
		execution:function(arr,obj){
			  var length = arr.length;
			  for (var i=0; i < length; i++){
			    if (arr[i] === obj) return i;
			  }
			  return -1;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['indexOfArray'].execution(arrs[0],arrs[1]);
		}
	},'count':{
		name:"包含个数",
		promptinfo:"集合子集的个数",
		execution:function(arr){
			if(arr==null)return 0;
			if(typeof(arr)==Array){
				return arr.length;
			}else{
				return 1;
			}
		}
	},'max':{
		name:"最大值",
		promptinfo:"获取集合的最大值",
		execution:function(arr){
			var max=arr[0];
			var length = arr.length;
		  for (var i=1; i < length; i++){
		    if (arr[i] >max) {
		    	max=arr[i];
		    }
		  }
		  return max;
		}
	},'min':{
		name:"最小值",
		promptinfo:"获取集合的最小值",
		execution:function(arr){
			var min=arr[0];
			var length = arr.length;
		  for (var i=1; i < length; i++){
		    if (arr[i] <min) {
		    	min=arr[i];
		    }
		  }
		  return min;
		}
	},'round':{
		name:"四舍五入当前值",
		promptinfo:"四舍五入(number,需要控制的位数)。需要控制的位数（0表示控制的整数位 2表示四舍五入两位小数，-2表示四舍五入到百位）",
		execution:function(num,n){
			var _n=1;
			var sb=n>=0;
			n=Math.abs(n) 
			for(var i=0;i<n;i++){
				_n=_n*10;
			}
			var v=0;
			if(sb){
				v=num*_n;	
			}else{
				v=num/_n;
			}
			v=parseInt((v+(0.5*Math.pow(0.1, 0))),10);
			if(sb){
				v=v/_n;	
			}else{
				v=v*_n;
			}
			return v;
		},
		calculation:function(arrs){
			return  Ext.lt.formulas.formulaInfo['round'].execution(arrs[0],arrs[1]);
		}
	},'isNull':{
		name:"判断是否为空",
		promptinfo:"判断当前值是否为空，是空返回true",
		execution:function(arr){
			if(arr==null){
				return true;	
			}
			return false;
		}
	}
};
function initFormula(){
	for(var E in Ext.lt.formulas.formulaInfo){
		if(Ext.lt.formulas.formulaInfo[E].calculation==null){
			Ext.lt.formulas.formulaInfo[E].calculation=Ext.lt.formulas.formulaInfo[E].execution
		}
	}
}
initFormula();