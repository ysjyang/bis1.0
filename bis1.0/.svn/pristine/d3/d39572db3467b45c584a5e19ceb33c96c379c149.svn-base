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
	var cfg=cfg;
	var fms={};//缓存全部公式。
	var fmt={};//缓存单元格公式类型。
	_lf[table.id]=new Ext.lt.formulas();
	var lf=_lf[table.id];
	var _cell=lf.bind(table);
	var fmcells={};
	var exeFn2From={}
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
					try{
						_setFormula(af_bak,_cell.findCL(er,sk),key);
					}catch(e){}
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
	var _fi=0;
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
					continue;
				}
				if(subindex==-1){
					arr[0].push(_arr[0][_i]);
					arr[1].push(_arr[1][_i]);
				}else{
					arr[0].insert(_arr[0][_i],subindex);
					arr[1].insert(_arr[1][_i],subindex);
				}
			}
		}
		exeFs[l+'_'+c]=arr;
		findFormkeys[l+'_'+c]=true;
		return arr;
	}
	
	//从fmcells找到被涉及到的全部单元格
	function _findfmcells(l,c){
		if(table.getCol(c)==null)return {};
		var cname=_columns["PK_"+c];
		//单元格被引用的5种 key类型
		var keys=[l+'_'+c,l+'_'+cname,'#all_'+c,'#all_'+cname,l+'_#all'];
		var o={}
		var bo=false;
		for(var i=0;i<5;i++){
			if(fmcells[keys[i]]!=null){
				var k=fmcells[keys[i]];
				for(var er in k	){
					//er 是带有#all_#all的，把这个替换成当前行列
					var _er=er.replace('#all_',l+'_').replace('_#all','_'+c);
					//2.	判断单元格计算公式类型，如果不是应该执行的最高级别则不算。
					if(_isRunfm(_er,k[er])){
						o[_er]=k[er];
						bo=true;
						//o[1].push(keys[i]);
						if(exeFn2From[_er]==null){
							exeFn2From[_er]=[];
						}
						exeFn2From[_er].push(l+"_"+c);
					}
				}
			}
		}
		if(bo)return o;
		else return null;
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
	function _sortFormulas(table,arrs){
			var fnak={}
			var fnbeybk={};//反向设置
			for(var e in exeFn2From){
				var lc=e.split("_");
				var l=parseInt(lc[0],10);
				if(isNaN(lc[1])){
					lc[1]=_columns[lc[1]]	
				}
				var c=parseInt(lc[1],10);
				var _key=l+"_"+c;
				fnak[e]=_key;
				for(var i=0;i<exeFn2From[e].length;i++){
					var _k=exeFn2From[e][i];
					if(fnbeybk[_k]==null){
							fnbeybk[_k]=[];
					}
					if(_k!=_key)fnbeybk[_k].push(l+'_'+c);
				}
			}
			var runFn=[];
			function sorts(k,indexs){
				if(runFn[indexs]==null){
					runFn[indexs]=[];
				}
				if(fnbeybk[k]==null){fnbeybk[k]=[]}
				for(var i=0;i<fnbeybk[k].length;i++){
					if(runFn.indexOf(fnbeybk[k][i])==runFn.lastIndexOf(fnbeybk[k][i])){
						runFn[indexs].push(fnbeybk[k][i]);
						sorts(fnbeybk[k][i],indexs+1);
					}
				}
			}
			var retArr={};
			sorts(editl+"_"+editc,0);
			var indexs=0;
			for(var i=runFn.length-1;i>=0;i--){
					for(var l=0;l<runFn[i].length;l++){
							if(runFn[i][l]!=null&&retArr[runFn[i][l]]==null){
								retArr[runFn[i][l]]=indexs+1;
								indexs++;
							}
					}
			}
			var retArrs=[[],[]];
			for(var i=0;i<arrs[0].length;i++){
				var sk=arrs[0][i];
				retArrs[0][retArr[fnak[sk]]]=fnak[sk]
				retArrs[1][retArr[fnak[sk]]]=arrs[1][i];
			}	
			return retArrs;
	}
	
	
	
	function exeFormulas (table,arrs){
		if(arrs[0].length==0)return;
		arrs=_sortFormulas(table,arrs);
		for(var i=arrs[0].length-1;i>=0;i--){
			if(arrs[0][i]==null)continue;
			var lc=arrs[0][i].split("_");
			var l=parseInt(lc[0],10);
			if(isNaN(lc[1])){
				lc[1]=_columns[lc[1]]	
			}
			var c=parseInt(lc[1],10);
			var b=true;
			
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
		findFormkeys={};
		recursionData={};
		exeFs={};
		exeFn2From={};
		if(this.endedit!=null){
			this.endedit(table,el,l,c,d)
		}

		exeFormulas(table,_findFormulas(l,c));
		Ext.lt.message.send("formulasdatatable","endExeFormulas",{table:table,l:l,c:c,d:d,findFormkeys:findFormkeys});
	}
	table.columns.checkbox.beforeclick=function(table,el,l,c,d){
		var _c=el.id.split('_')[2].substr(1);
		return table.getCol(_c).name=="check"
	}
	var _columns={}
	table.setCols=function(c){
		if(!Ext.lt.isArray(c)){c=[c]}
		var col,index=0;
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
			if(table.columns.seq!=col&&table.columns.radio!=col&&table.columns.checkbox!=col){
				_columns[col.name]=index;
				_columns["PK_"+index]=col.name;
				
			}
			index++;
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
	table.setHiddenColumn_bak=table.setHiddenColumn;
	table.setHiddenColumn=function(col){
		this.setHiddenColumn_bak(col);
		var c=this.getCols();
		var index=0;
		var _col;
		_columns=[];
		for(var n=0;n<c.length;n++){
			col=c[n];
			if(col==null) continue;
			
			if(this.columns.seq!=col&&this.columns.radio!=col&&this.columns.checkbox!=col){
				_columns[col.name]=index;
				_columns["PK_"+index]=col.name;
				
			}
			index++;
			//虚拟列
		}
	}
	table.clearCache=function(){
		exeFs={}
		findFormkeys={};
		exeFn2From={};
		fms={};
		fmt={};
		fmcells={};
		recursionData={};
	}
	table.runFormulas=function(l,c){
		findFormkeys={};
		recursionData={};
		exeFs={};
		exeFn2From={};
		editl = l;
		editc = c;
		exeFormulas(table,_findFormulas(l,c));
	}
	function resetFormula2Init(formulas,index,length,isdel){
		var f=[];
		for(var i=0,l=formulas.length;i<l;i++){
			//删除当前行，则当前行公式不要了。
			if(formulas[i].l==index&&isdel==-1){
				continue;
			}
			//公式设置位置 大于 起始位置 重新设置
			if(formulas[i].l>index){
				formulas[i].l=parseInt(formulas[i].l)+(length*isdel);
			}
			
			f.push(formulas[i]);
		}
		return f;
	}
	function resetFormula(index,length,isdel){
		if(cfg.formulas!=null){
			cfg.formulas=resetFormula2Init(cfg.formulas,index,length,isdel)
		}
		if(cfg.formulasrow!=null){
			cfg.formulasrow=resetFormula2Init(cfg.formulasrow,index,length,isdel)
		}
		
	}
	function delResetValue(index,length,evalfn){
		if(evalfn==null){
			evalfn=['evalfn=function (table,d,l){'];
			var cols=table.getCols();
			for(var i=0,l=cols.length;i<l;i++){
				if(cols[i].edit){
					evalfn.push(' editl=l;editc=',i,'; d.',cols[i].name,'=0; table.runFormulas(l,',i,');')
				}
			}
			evalfn.push('}')
			evalfn =eval(evalfn.join(''));
		}
		var arr=table.getRecordset().toArray();
		for(var i=0,l=length;i<l;i++){
			evalfn(table,arr[i+index],i+index);
		}
		return evalfn;
	}
	table.endAddData=function(index,length){
		this.clearCache();
		fms={};
		fmt={};
		fmcells={};
		resetFormula(index,length,1);
		_init();
	}
	
	function startDeleteArray(arr,table){
		var evalfn=null;
		for(var i=0,l=arr.length;i<l;i++){
			evalfn=delResetValue(arr[i],1,evalfn);
		}
		table.clearCache();
		fms={};
		fmt={};
		fmcells={};
		for(var i=0,l=arr.length;i<l;i++){
			resetFormula(arr[i]-i,1,-1);
		}
		_init();
	}
	//新增和删除的时候可能位置有问题。需要测试
	table.startDeleteData=function(index,length){
		if(Ext.lt.isArray(index)){
			startDeleteArray(index,table);
			return;
		}else{
			if(length==null)length=1;
			delResetValue(index,length);
		}
		this.clearCache();
		fms={};
		fmt={};
		fmcells={};
		resetFormula(index,length,-1);
		_init();
	}
	return table;
}
