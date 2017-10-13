if(Ext.lt.study==null) 
	Ext.lt.study={component:{}};

function save(obj){
	var result = Ext.lt.RCP.asynserver('com.longtu.demo.component.EditPanelDemo','TestDemo',obj);
	alert(result);
}

Ext.lt.study.editfp={};
var testselect=new Ext.lt.recordset({columns:['v','t'],datas:[['老张','老张'],['老王','老王'],['老李','老李']]});
// [{t:显示文本,v:选中值,sv:上级代码,s:是否选中,p:显示文本的拼音，每个字的首字母必须为大写，其余小写}]
var testtreeselect=new Ext.lt.recordset({columns:['t','v','sv','s','p'],datas:[['标示一','标示一','0','0','CeShiYi'],['标示二','标示二','0','1','CeShiEr'],['标示三','标示三','0','0','CeShiSan']]});
