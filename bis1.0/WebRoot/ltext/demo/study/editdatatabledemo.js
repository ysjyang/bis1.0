if(Ext.lt.study==null) Ext.lt.study={};
if(Ext.lt.study.component==null) Ext.lt.study.component={};

Ext.lt.study.component.editdatatabledemo=function(){
	var className="com.longtu.demo.component.EditDatatable"
	var dt;
	var rs=new Ext.lt.recordset({columns:[],datas:[[],[]]});
	
	var colsname=Ext.lt.RCP.asynserver(className,'loadCols',null);
	
	var rs=Ext.lt.RCP.asynserver(className,'loadData',null);
	var col;
	var testcol=["总计","预算外资金","财政拨款","纳入预算管理的政府性基金","单位经营收入","其他收入","罚没收入","测试资金来源1","测试资金来源2","测试资金来源3","测试资金来源4","测试资金来源5","测试资金来源6","测试资金来源7","测试资金来源8","测试资金来源9","测试资金来源10","测试资金来源11","测试资金来源12","测试资金来源13"];
	var testl=testcol.length;
	function init(div){
		dt=new Ext.lt.editdatatable(rs);
		col=[dt.columns.seq];
		var cj=null;
		for(var i=0;i<colsname.length;i++){
			if(testcol.indexOf(colsname[i])!=-1){
				var c={alias:colsname[i],datatype:'N',name:i,style:'text-align:right',edit:true};
				if(colsname[i]=="总计"){
					cj=c;
				}
				col.push(c);
			}else{
				col.push({alias:colsname[i],datatype:'S',name:colsname[i],style:'text-align:center'});
			}
		}
		c.fn=function(l,c,d,v){
			var _d=0;
			for(var i=1;i<testl;i++){
				_d+=parseFloat(d[testcol[i]]);
			}
			return _d+"/alll";
		}
		var olddata
		function oneditstart(table,el,l,c,d){
			if(l==0)return false;
			
			olddata=d[table.getCol(c).name];
			if(olddata==null)olddata=0;	
			this._startedit(table,el,l,c,d);
		}
		
		function oneditend(table,el,l,c,d){
			this._endedit(table,el,l,c,d);
			var cname=table.getCol(c).name;
			var v=d[cname]-olddata;
			var d0=table.getRecordset().getData(0);
			d0[cname]=v+parseFloat(d0[cname]);
			table.reflash();//_d.supcode
		}
		for(var i=1;i<col.length-1;i++){
			if(col[i].edit){
				col[i].oneditstart=oneditstart;
				col[i].oneditend=oneditend;
			}
		}
		dt.setCols(col);
		/*********设置样式*************/
		
		dt.headsort(false);
		dt.setAllowClock(false);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
		dt.clockColumnSize(2);
		dt.resize(600,800)
	}
	var ret={};
	ret.draw=function(div){
		init(div);
	}
	return ret;
}