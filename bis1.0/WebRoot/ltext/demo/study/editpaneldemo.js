if(Ext.lt.study==null) 
	Ext.lt.study={component:{}};

function save(obj){
	var result = Ext.lt.RCP.asynserver('com.longtu.demo.component.EditPanelDemo','TestDemo',obj);
	alert(result);
}

Ext.lt.study.editfp={};
var testselect=new Ext.lt.recordset({columns:['v','t'],datas:[['����','����'],['����','����'],['����','����']]});
// [{t:��ʾ�ı�,v:ѡ��ֵ,sv:�ϼ�����,s:�Ƿ�ѡ��,p:��ʾ�ı���ƴ����ÿ���ֵ�����ĸ����Ϊ��д������Сд}]
var testtreeselect=new Ext.lt.recordset({columns:['t','v','sv','s','p'],datas:[['��ʾһ','��ʾһ','0','0','CeShiYi'],['��ʾ��','��ʾ��','0','1','CeShiEr'],['��ʾ��','��ʾ��','0','0','CeShiSan']]});
