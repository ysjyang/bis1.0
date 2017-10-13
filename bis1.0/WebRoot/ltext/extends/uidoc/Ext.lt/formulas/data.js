if(Ext.lt.onlineReporting== null){
	Ext.lt.onlineReporting={editfp:{}}
};
Ext.lt.onlineReporting.data={};
Ext.lt.onlineReporting.data.configdatatable={};
var ltdatatable=Ext.lt.onlineReporting.data.configdatatable;

ltdatatable.table1=new Ext.lt.recordset({columns:['name','table','p'],datas:[['人员','T_CAUSER','经建处月报'],['人员','T_CAUSER','经建处月报'],['人员','T_CAUSER','经建处月报'],['人员','T_CAUSER','经建处月报'],['人员','T_CAUSER','经建处月报'],['人员','T_CAUSER','经建处月报']]});
ltdatatable.pro=new Ext.lt.recordset({columns:['v','t','p'],datas:[['经建处月报','经建处月报','经建处月报']]});
ltdatatable.table2=new Ext.lt.recordset({columns:['A'],datas:[[]]});
ltdatatable.align=new Ext.lt.recordset({columns:['v','t','p'],datas:[['left','居左','zuo'],['center','居中','zhong'],['right','居右','you']]});
ltdatatable.table3=new Ext.lt.recordset({columns:['name'],datas:[['AAAAAA'],['BBBBBB'],['CCCCCC']]});
ltdatatable.tablerose=new Ext.lt.recordset({columns:['type','col'],datas:[[1,'code'],[2,"$(C)='ADMIN'"],[3,"$(C)='ADMIN'"]]});