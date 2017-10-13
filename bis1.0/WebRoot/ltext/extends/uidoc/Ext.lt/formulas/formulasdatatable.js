//��������ռ�
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;
//��ν���col��row�����ã�
//�������û����ص�Ԫ�������أ�
if(_lf==null){
	var _lf={};	
}
//�������������������ͨ����cfg���õ�table�ϣ�
//�ٽ������������õ�cfg�ϡ�

Ext.lt.formulasdatatable=function(cfg){
	var rs=cfg.rs;
	var table=new Ext.lt.editdatatable(rs);
	var fn_setCols=table.setCols;
//���ع�ʽ

	var fms={};//����ȫ����ʽ��
	var fmt={};//���浥Ԫ��ʽ���͡�
	_lf[table.id]=new Ext.lt.formulas();
	var lf=_lf[table.id];
	var _cell=lf.bind(table);
	var fmcells=[];
	var ovalue = 0;
	var editl = -1;
	var editc = -1;
	var _length=('_lf.'+table.id+'.').length;
	//������ʽ����
	var regs={}
	regs.column	=new RegExp ('\\$\\{column\\(','g');
	regs.col		=new RegExp ('\\$\\{col\\(','g');
	regs.row		=new RegExp ('\\$\\{row\\(','g');
	regs.cell		=new RegExp ('\\$\\{cell\\(','g');
	regs.cells	=new RegExp ('\\$\\{cells\\(','g');
		
	//����--
	
	//1��	������ʽ arrFormulas
	function _analyticalFormula(af,key,type){
		
		//2.����af�Ĺؼ��֡�
		//��ȡȫ��cell cells row col column
		var af_bak=af.replace(/\$\{/g,'_lf.'+table.id+'.').replace(/\}/g,'');
		for(var er in regs){
			var r=regs[er];
			var str=af.split(r);
			for(var i=0,l=str.length;i<l;i++){
				//�жϵ�һ���ǲ���������ʽ
				if(str[i].indexOf('$')!=0){
					//ֻҪ��һ��)}�ڵģ������Ĳ��������������ݡ�
					var sk=str[i].substring(0,str[i].indexOf(')}'));
					//�洢��ʱ��ʹ�ñ�׼��ʽ���������жϹ�ʽʱ�����׼ȷ�ж��Ƿ��Ǹ�ʹ�ù�ʽ��
					//sk=eval(sk);
					_setFormula(af_bak,_cell.findCL(er,sk),key);
				}	
			}
		}
		//fms����ͨ��key��ȡ��ʽʱ����׼ȷ��ȡ��һ����Ԫ��϶�ֻ��һ����ʽ��
		
		fms[key]=af_bak;
		fmt[key]=type;
	}
	//3��	���õ�Ԫ��͵�Ԫ��֮������ù�ϵ
	
	function _setFormula(af,cl,key){
		if(cl==null)return;
		for(var i=0,il=cl.c.length;i<il;i++){
			var c=cl.c[i];
			for(var j=0,jl=cl.l.length;j<jl;j++){
				var l=cl.l[j];
				if(fmcells[l+'_'+c]==null){
					fmcells[l+'_'+c]={};
				}
				//�����õ�Ԫ�������һ����ʽ��
				fmcells[l+'_'+c][key]=af;
			}
		}
	}
	function _init(){
		//��
		if(cfg.formulasrow!=null)
		for(var i=0,l=cfg.formulasrow.length;i<l;i++){
			var f=cfg.formulasrow[i];
			_analyticalFormula(f.formula,f.l+'_#all','row')
		}
		//��
		if(cfg.formulascol!=null)
		for(var i=0,l=cfg.formulascol.length;i<l;i++){
			var f=cfg.formulascol[i];
			_analyticalFormula(f.formula,'#all_'+f.c,'col')
		}
		//��Ԫ��
		if(cfg.formulas!=null)
		for(var i=0,l=cfg.formulas.length;i<l;i++){
			var f=cfg.formulas[i];
			_analyticalFormula(f.formula,f.l+'_'+f.c,'cell')
		}
	}
	var exeFs={};
	var recursionData={};
	//���ҹ�ʽ,�͹�ʽ���á���˳�򷵻ع�ʽ��Ӱ�쵥Ԫ��
	var findFormkeys={};
	function _findFormulas (l,c){
		//�ж�֮ǰ�Ƿ�����������Ԫ��ļ���˳��
		if(exeFs[l+'_'+c]!=null){
			return exeFs[l+'_'+c];
		}
		//�������Ԫ�������ļ����кܶࡣ�����������Ԫ���ֻ��һ��
		//1.	�ȴ�fmcells�ҵ����漰����ȫ����Ԫ��
		//#all_#all; fmcells
		var o=_findfmcells(l,c);
		var arr=[[],[]];
		var subarr=[];
		for(var ec in o){
			//�ų��ظ����ݡ�
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
			//û���ݾͲ����ˡ�
			if(_arr[0].length==0)continue;
			//3.	�ݹ�����������������ĺõģ�˳��Ҳ����ȷ�ģ����������ǾͰ��Լ���˳�������£�
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
	
	//��fmcells�ҵ����漰����ȫ����Ԫ��
	function _findfmcells(l,c){
		var cname=table.getCol(c).name;
		//��Ԫ�����õ�5�� key����
		var keys=[l+'_'+c,l+'_'+cname,'#all_'+c,'#all_'+cname,l+'_#all'];
		var o={}
		for(var i=0;i<5;i++){
			if(fmcells[keys[i]]!=null){
				var k=fmcells[keys[i]];
				for(var er in k	){
					//er �Ǵ���#all_#all�ģ�������滻�ɵ�ǰ����
					var _er=er.replace('#all_',l+'_').replace('_#all','_'+c);
					//2.	�жϵ�Ԫ����㹫ʽ���ͣ��������Ӧ��ִ�е���߼������㡣
					if(_isRunfm(_er,k[er])){
						o[_er]=k[er];
						//o[1].push(keys[i]);
					}
				}
			}
		}
		return o;
	}
	//�жϷ�ʽ�������Ԫ��ʽ���ڣ��ҹ�ʽ�����ڵ�Ԫ��ʽ����Ӧ��ִ�еļ���˳��
	//ͬ���У��С�	�����ʽ�಻ƥ�䣬�Ͳ��ԡ�
	function _isRunfm(key,f){
		//��ǰ����Ϊ�϶�Ϊ��Ԫ�����͵ġ�
		if(fms[key]!=null){
			if(fms[key]==f){
				return true;
			}else{
				return false;	
			}
		}
		var cl=key.split('_');
		//��ǰΪ��
		if(fms["#all_"+cl[1]]!=null){
			if(fms["#all_"+cl[1]]==f){
				return true;
			}else{
				return false;	
			}
		}
		//��ǰΪ��
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
			//������
			if((col.name==''||col.name==null)&&col.fnstr!=null){
				col.name=col.fnstr;
				//��ȱ$���滻
				col.fn=eval("function (){ return "+col.fnstr+"}");
			}
		}
		fn_setCols(c);
	}
	_init();
	
	return table;
}
