var ajTimertasks;	//ajax
var rctTasks;		//recordset
var columTasks;		//colum
var dtTasks;		//datatable
var code;			//任务编码
var name;			//任务名称

$(function(){
	//绘制页面
	drawPage();	
	
	//执行任务
	$("#runbt").click(function(){
		if(code ==undefined){
			alert("请选择需要操作的任务！");
			return;
		}
		var rt = synajax('/bis/timertaskmgr.ajax','type=runTask&code='+code);	
		alert(rt+code);
	});
	
	//编辑任务
	$("#editbt").click(function(){
		if(code ==undefined){
			alert("请选择需要操作的任务！");
			return;
		}
		openNewModalWindow("/bis/timertaskmodify.do?name="+name+"&code="+code,600,300,"编辑定时任务",function(){
			drawPage();
		});

	});
	
	//启用
	$("#enablebt").click(function(){
		if(code ==undefined){
			alert("请选择需要操作的任务！");
			return;
		}
		var rt = synajax('/bis/timertaskmgr.ajax','type=enableTask&code='+code);	
		if(rt=="success"){
			alert("已启用");
		}else{
			alert("启用失败");
		}
		location.reload();
	});
	
	//停用
	$("#disablebt").click(function(){
		if(code ==undefined){
			alert("请选择需要操作的任务！");
			return;
		}
		var rt = synajax('/bis/timertaskmgr.ajax','type=disableTask&code='+code);
		if(rt=="success"){
			alert("已停用");
		}else{
			alert("停用失败");
		}
		location.reload();
	});
	
});

//绘制页面方法
function drawPage(){
	//获取数据
	ajTimertasks = synajax('/bis/timertaskmgr.ajax','type=getTask');	
	//设置表头
	columTasks = ['timertaskcode','timertaskname','status','remark'];
	//添加表头
	rctTasks = new Ext.lt.recordset({columns : columTasks}); 	
	//添加数据
	rctTasks.addData(ajTimertasks); 	
	dtTasks = new Ext.lt.datatable35(rctTasks);	
	//设置别名
	dtTasks.setCols([dtTasks.columns.seq,
	                 dtTasks.columns.radio,
					{name:'timertaskcode',alias:'任务编码',width:'200'},
					{name:'timertaskname',alias:'任务名称'},
					{name:'status',alias:'使用状态',fn:function(i,j,rs,value){
							if(value=='0') value='已停用';
							if(value=='1') value='已启用';
							return value;
						}
					},
					{name:'remark',alias:'备注',width:'600'}]);
	//点击任务后，把所选的任务的编码赋值给code
	dtTasks.onEvent("onclick",function(td,el,l,c,d){
		code = d.timertaskcode;
		name = d.timertaskname;
	});
	//设置样式
	dtTasks.setClassName('dttheme_inner');
	dtTasks.draw(maintabledata);	//画表
	dtTasks.setAllHeadWidth(true);	//允许调整列宽
	dtTasks.setMouselight('#597EAA');
}