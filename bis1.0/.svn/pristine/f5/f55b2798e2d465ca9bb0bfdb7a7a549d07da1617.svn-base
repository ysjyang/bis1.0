//检查命名空间
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;
//如何进行col和row的设置？
//如果里面没有相关单元格设置呢？
if(_lf==null){
	var _lf={};	
}
//解决多个的引用问题可以通过将cfg设置到table上，
//再将缓存数据设置到cfg上。

Ext.lt.formulasdatatable=function(cfg){
	var rs=cfg.rs;
	var table=new Ext.lt.editdatatable(rs);
	var fn_setCols=table.setCols;
//加载公式

	var fms={};//缓存全部公式。
	var fmt={};//缓存单元格公式类型。
	_lf[table.id]=new Ext.lt.formulas();
	var lf=_lf[table.id];
	var _cell=lf.bind(table);
	var fmcells=[];
	var ovalue = 0;
	var editl = -1;
	var editc = -1;
	var _length=('_lf.'+table.id+'.').length;
	//正则表达式对象
	var regs={}
	regs.column	=new RegExp ('\\$\\{column\\(','g');
	regs.col		=new RegExp ('\\$\\{col\\(','g');
	regs.row		=new RegExp ('\\$\\{row\\(','g');
	regs.cell		=new RegExp ('\\$\\{cell\\(','g');
	regs.cells	=new RegExp ('\\$\\{cells\\(','g');
		
	//正则--
	
	//1。	解析公式 arrFormulas
	function _analyticalFormula(af,key,type){
		
		//2.解析af的关键字。
		//截取全部cell cells row col column
		var af_bak=af.replace(/\$\{/g,'_lf.'+table.id+'.').replace(/\}/g,'');
		for(var er in regs){
			var r=regs[er];
			var str=af.split(r);
			for(var i=0,l=str.length;i<l;i++){
				//判断第一个是不是其他公式
				if(str[i].indexOf('$')!=0){
					//只要第一个)}内的，其他的不是这个里面的内容。
					var sk=str[i].substring(0,str[i].indexOf(')}'));
					//存储的时候使用标准公式，方便在判断公式时候可以准确判断是否是该使用公式。
					//sk=eval(sk);
					_setFormula(af_bak,_cell.findCL(er,sk),key);
				}	
			}
		}
		//fms，当通过key获取公式时可以准确获取。一个单元格肯定只有一个公式。
		
		fms[key]=af_bak;
		fmt[key]=type;
	}
	//3。	设置单元格和单元格之间的引用关系
	
	function _setFormula(af,cl,key){
		if(cl==null)return;
		for(var i=0,il=cl.c.length;i<il;i++){
			var c=cl.c[i];
			for(var j=0,jl=cl.l.length;j<jl;j++){
				var l=cl.l[j];
				if(fmcells[l+'_'+c]==null){
					fmcells[l+'_'+c]={};
				}
				//被引用单元格最多有一个公式。
				fmcells[l+'_'+c][key]=af;
			}
		}
	}
	function _init(){
		//行
		if(cfg.formulasrow!=null)
		for(var i=0,l=cfg.formulasrow.length;i<l;i++){
			var f=cfg.formulasrow[i];
			_analyticalFormula(f.formula,f.l+'_#all','row')
		}
		//列
		if(cfg.formulascol!=null)
		for(var i=0,l=cfg.formulascol.length;i<l;i++){
			var f=cfg.formulascol[i];
			_analyticalFormula(f.formula,'#all_'+f.c,'col')
		}
		//单元格
		if(cfg.formulas!=null)
		for(var i=0,l=cfg.formulas.length;i<l;i++){
			var f=cfg.formulas[i];
			_analyticalFormula(f.formula,f.l+'_'+f.c,'cell')
		}
	}
	var exeFs={};
	var recursionData={};
	//查找公式,和公式引用。按顺序返回公式及影响单元格。
	var findFormkeys={};
	function _findFormulas (l,c){
		//判断之前是否整理过这个单元格的计算顺序。
		if(exeFs[l+'_'+c]!=null){
			return exeFs[l+'_'+c];
		}
		//由这个单元格引发的计算有很多。但计算这个单元格的只有一个
		//1.	先从fmcells找到被涉及到的全部单元格。
		//#all_#all; fmcells
		var o=_findfmcells(l,c);
		var arr=[[],[]];
		var subarr=[];
		for(var ec in o){
			//排除重复数据。
			if(findFormkeys[ec]){continue;}
			arr[0].push(ec);
			arr[1].push(o[ec]);
			var lc=ec.split('_');
			if(isNaN(lc[1])){
				lc[1]=_columns[lc[1]]	
			}
			if(recursionData[lc[0]+'_'+lc[1]]!=null){
				continue;
			}
			recursionData[lc[0]+'_'+lc[1]]=true;
			
			var _arr=_findFormulas(lc[0],parseInt(lc[1],10));
			//没数据就不管了。
			if(_arr[0].length==0)continue;
			//3.	递归出来的数据是排重拍好的，顺序也是正确的，到这里我们就把自己的顺序设置下，
			subindex=-1;
			for(var _i=0,_l=_arr[0].length;_i<_l;_i++){
				var keyIndex=arr[0].indexOf(_arr[0][_i]);
				if(keyIndex!=-1){
					subindex=keyIndex;
				}
				arr[0].insert(_arr[0][_i],subindex);
				arr[1].insert(_arr[1][_i],subindex);
			}
		}
		exeFs[l+'_'+c]=arr;
		findFormkeys[l+'_'+c]=true;
		return arr;
	}
	
	//从fmcells找到被涉及到的全部单元格
	function _findfmcells(l,c){
		var cname=table.getCol(c).name;
		//单元格被引用的5种 key类型
		var keys=[l+'_'+c,l+'_'+cname,'#all_'+c,'#all_'+cname,l+'_#all'];
		var o={}
		for(var i=0;i<5;i++){
			if(fmcells[keys[i]]!=null){
				var k=fmcells[keys[i]];
				for(var er in k	){
					//er 是带有#all_#all的，把这个替换成当前行列
					var _er=er.replace('#all_',l+'_').replace('_#all','_'+c);
					//2.	判断单元格计算公式类型，如果不是应该执行的最高级别则不算。
					if(_isRunfm(_er,k[er])){
						o[_er]=k[er];
						//o[1].push(keys[i]);
					}
				}
			}
		}
		return o;
	}
	//判断方式：如果单元格公式存在，且公式不等于单元格公式则不是应该执行的级次顺序
	//同理列，行。	如果公式多不匹配，就不对。
	function _isRunfm(key,f){
		//当前类型为肯定为单元格类型的。
		if(fms[key]!=null){
			if(fms[key]==f){
				return true;
			}else{
				return false;	
			}
		}
		var cl=key.split('_');
		//当前为列
		if(fms["#all_"+cl[1]]!=null){
			if(fms["#all_"+cl[1]]==f){
				return true;
			}else{
				return false;	
			}
		}
		//当前为行
		if(fms[cl[0]+"_#all"]!=null){
			if(fms[cl[0]+"_#all"]==f){
				return true;
			}else{
				return false;	
			}
		}
		return false;
		
	}
	
	function exeFormulas (table,arrs){
		for(var i=0,il=arrs[0].length;i<il;i++){
			var lc=arrs[0][i].split("_");
			var l=parseInt(lc[0],10);
			if(isNaN(lc[1])){
				lc[1]=_columns[lc[1]]	
			}
			var c=parseInt(lc[1],10);
			try{
				table.getRecordSet().getData(l)[_columns["PK_"+c]]=lf.execution2str(arrs[1][i],l,c);	
			}catch(e){
				if(e!=9000)	throw e;
			}
		}
	}
	function _startedit(table,el,l,c,d){
	
		if(this.startedit!=null){
			if(this.startedit(table,el,l,c,d)==false)return false;
		}
		ovalue = d[table.getCol(c).name];
		editl = l;
		editc = c;
	}
	
	function _endedit(table,el,l,c,d){
		if(this.endedit!=null){
			this.endedit(table,el,l,c,d)
		}
		findFormkeys={};
		exeFormulas(table,_findFormulas(l,c));
	}
	var _columns={}
	table.setCols=function(c){
		if(!Ext.lt.isArray(c)){c=[c]}
		var col
		for(var n=0;n<c.length;n++){
			col=c[n];
			if(col==null) continue;
			
			if(col.edit==true){
				if(col.oneditstart!=null){
					col.startedit=col.oneditstart
				}
				if(col.oneditend!=null){
					col.endedit=col.oneditend
				}
				col.oneditstart=_startedit;
				col.oneditend=_endedit;
			}
		
			_columns[col.name]=n;
			_columns["PK_"+n]=col.name;
			//虚拟列
			if((col.name==''||col.name==null)&&col.fnstr!=null){
				col.name=col.fnstr;
				//还缺$的替换
				col.fn=eval("function (){ return "+col.fnstr+"}");
			}
		}
		fn_setCols(c);
	}
	_init();
	
	return table;
}
