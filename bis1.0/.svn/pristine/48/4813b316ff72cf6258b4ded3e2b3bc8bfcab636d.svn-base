var table; 	// datatable数据列表
var userdata;	//recordset类型列表数据
var tableData = [];	//从后台读取的列表数据

var tableCols = []; //列的中文名称对象
var column = [];	//列
var columnname =[];	//中文名
//子表
var subDatas = [];
var stable; 	// 数据列表
var suserdata;	//recordset类型列表数据
//列的中文名称对象
var stableCols = [];
var scolumn = [];	//表的列
var scolumnname =[];	//列对应的中文名
/**
 * 分页相关
 */
var currentPage = 1;	 /** 当前页号 */
var totalRecord = 1;	/** 所有页面的总记录数 */
var totalPage = 1;	/** 总页数 */
var pageinputcon = false;	/**没有点查询之前不能用分页功能，点查询后变为true*/
/**
 * 分页对象
 */
var pageDto={};	

//查询相关
var busTypes=[];	//业务类型下拉选项对象 
var years=[]; 	//年度下拉
var opValue;	//业务类型下拉value
var typeCode;	//要查询的业务类型编码
var isSub;	//是否有子表
var province = ""; //区划
var year;
var busdatatype;  //数据源类型

//生成弹出层的代码
var xOffset = 0;//向右偏移量
var yOffset = 25;//向下偏移量

var toshow = "treediv";//要显示的层的id
var target = "proinput";//目标控件----也就是想要点击后弹出树形菜单的那个控件id
/*
 * 页面加载完执行，初始化数据
 */
$(function() {
	$("#sysMain").scroll(function(){
		$("#"+toshow).hide();
	});
	$("#proinput").css("width","200px");	//选择区划input设置宽度登陆下拉树的宽度
	$("#"+toshow).hide();
	$("#subtabledata").hide();
	$("#subtreediv").hide();
	$("#li_busdatatype").hide();	//隐藏数据类型区域
	$("#start").hide();
	$("#elements").hide();
	$("#li").hide();
	//$("#reset").hide();
	busTypes = synajax('/bis/bustypequery.ajax','datatype=type');	//获取业务类型
	//遍历业务类型赋值给查询区下拉框
	for(var i =0;i<busTypes.length;i++){
		//过滤2开头的业务类型
		if(busTypes[i].code.substring(0,1)=='1'){
		$("#bustype").append("<option value='"+busTypes[i].code+"-"+busTypes[i].sub+"'>"+busTypes[i].code
				+"-"+busTypes[i].name+"</option>");
		}
	}
	years = synajax('/bis/bustypequery.ajax','datatype=year');	//获取年度
	for(var i =0;i<years.length;i++){
		$("#year").append("<option value='"+years[i].year+"'>"+years[i].year+"</option>");
	}
	
	//调用公用画主表方法
//	drawMainTable();
	drawTree();
	//给typeCode赋值
	opValue=$("#bustype").val();
	var strs = opValue.split("-");
	typeCode = strs[0];
	
	//画主子表表头
	initTableHead();
	//下拉列表change事件
	$("#bustype").change(function(){
		$("#resetli").hide();
		initTableHead();
		var pcode=$("#bustype").val().substring(0,4);
		if("1001,1010,1011,1020,1021,1024,1027,1107".indexOf(pcode)==-1){
			$("#read").hide();
//			if("1002,1003,1004,1005,1006,1007,1008,1009".indexOf(pcode)!=-1){}
			if("1012,1013,1014,1015,1016,1017,1018,1019,1022,1023,1025,1026".indexOf(pcode)!=-1){
				$("#li_busdatatype").show();
			}else{
				$("#li_busdatatype").hide();
			}
		}else{
			$("#read").show();
		}
		if("1201,1202".indexOf(pcode)!=-1){
			$("#elements").show();
			$("#li").show();
		}else{
			$("#elements").hide();
			$("#li").hide();
		}
		if("1001,1011".indexOf(pcode)!=-1){
			$("#resetli").show();
		}
	});
	
	$("#provinceinput").click(function(){
		$("#treediv").show();
	});
	
	////////////////
	$("#"+target).click(function (){
		$("#"+toshow)
		.css("position", "absolute")
		.css("left", $("#"+target).position().left+xOffset + "px")
		.css("top", $("#"+target).position().top+yOffset +"px").show()
		.css("z-index","999999");
	});
	/*//关闭层
	$("#closed").click(function(){
		$("#"+toshow).hide();
	});*/

	//判断鼠标在不在弹出层范围内
	 function checkIn(id){
		var yy = 20;   //偏移量
		var str = "";
		var x=window.event.clientX;   
		var y=window.event.clientY;   
		var obj=$("#"+id)[0];
		if(x>obj.offsetLeft&&x<(obj.offsetLeft+obj.clientWidth)&&y>(obj.offsetTop-yy)&&y<(obj.offsetTop+obj.clientHeight)){   
			return true;
		}else{   
			return false;
		}   
	  }   
	//点击body关闭弹出层
		$(document).click(function(){
			var is = checkIn("treediv");
			if(!is){
				$("#"+toshow).hide();
			}
		});
		
		/**
		 * 分页绑定回车事件
		 */
		//取消IE默认回车事件
		$(document).keydown(function(e){
			var e = e || event;
		    if(e.keyCode == 13) {
		        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		    }
		});
		//每页显示
		$("#pagesize").keydown(function(event){
			if(event.which == "13"){
				this.blur();
	            modifySize();
			}  
		});
		//跳转到几页
		$("#jumpTo").keydown(function(event){
			if(event.which == "13"){
				this.blur();
				jumpTo();
			}    
		});
});

//画主子表表头方法
function initTableHead(){
	opValue=$("#bustype").val();
	var strs = opValue.split("-");
	typeCode = strs[0];
	isSub = strs[1];
	//如果没有子表，把 子表区域清空
	if(isSub=="0" && stable!=null && stable != undefined){
		$("#subtabledata").hide();
		$("#subtreediv").hide();
		stable=null;
	}
	drawMainTableHead();
	//如果有子表，画子表表头
	if(isSub =="1"){
		drawSubTableHead();
	}
}

//画树
function drawTree(){
	//获取树数据
	ajax('/bis/bustypequery.ajax','datatype=provincetree',function(rt){
		var dataTree=[];
		for(var i=0;i<rt.length;i++){
				var data=[];
				data.push(rt[i].code);
				data.push(rt[i].levelno);
				data.push(rt[i].superguid);
				data.push(rt[i].isleaf);
				data.push(rt[i].guid);
				data.push(rt[i].name);
				
				dataTree.push(data);
		}
		
		var treedata=new Ext.lt.recordset({ver:"1.3",columns:["code","level","superitemid","isleaf","itemid","name"],datas:dataTree});
		_qtree=new Ext.lt.Qtree({
			data:treedata,
			outformart:'#code-#name',
			showRootNode:false,
			viewmodel:'tree',
			clickexpand:true,
			on:{
				'nodeclick':function(){
					var v=_qtree.getSelected();
					if(v.length>0){
						if(v[0].isleaf==1){
							$("#"+toshow).hide();
							$("#proinput").val(v[0].code+"-"+v[0].name);
							province = v[0].code;
						}
					}
					
				 }	
				} 
			});
		_qtree.draw(treediv);	
	});
};

//数据查询方法
function queryPageData(){
	pageinputcon = true;
	//清除之前数据
	userdata.clear();
	table.reflash();
	//行政区划非空校验
	if(province=="" || $("#proinput").val()==""){
		alert("请选择财政区划！");
		return;
	}
	//日期校验
	var begindate = $("#begindate").val();
	var enddate = $("#enddate").val();
	year = $("#year").val();
	if(enddate!="" && begindate!=""){
		if(begindate>enddate){
			alert("开始时间不能小于结束时间！");
			return;
		}
	}
	//显示遮罩层
	Ext.lt.bis.loadingShow();
	//查询数据
	ajax('/bis/bustypequery.ajax','datatype=testdata&typeCode='+typeCode+'&begindate='+begindate+'&enddate='
			+enddate+'&year='+year+'&province='+province,function(rt){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		pageDto = rt;
		//报错
		if(pageDto.error==1){
			currentPage=1;
			totalPage=1;
		}else{
			
			tableData = pageDto.datas;	//要展示的数据
			currentPage = pageDto.currentpage;    //当前页数
			totalRecord = pageDto.total;	//数据的总记录数
			//计算总页数
			if (totalRecord % pageDto.numforpage == 0) {
				totalPage = totalRecord / pageDto.numforpage;
			} else {
				totalPage = Math.floor(totalRecord / pageDto.numforpage) + 1;
			}
			userdata.addData(pageDto.datas); 	//把查询数据加入到表格中
		}
		
		$("#currpage").text(currentPage);
		$("#totalpage").text(totalPage);
		$("#totalrecord").val(totalRecord);
	});
}

//公用加载分页数据方法
function loadPageData(){
	userdata.clear();
	table.reflash();
	//显示遮罩层
	Ext.lt.bis.loadingShow();
	//查询数据
	ajax('/bis/pageaction.ajax','pagedto='+JSON.stringify(pageDto),function(rt){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		pageDto = rt;
		tableData = pageDto.datas;
		totalRecord = pageDto.total;
		currentPage = pageDto.currentpage;
		//新建Recordset，加入列
		userdata = new Ext.lt.recordset({columns : column});
		//Recordset加入数据
		userdata.addData(tableData);
		table.setRecordset(userdata);
		table.mousedrag(false);	//关闭鼠标拖拽功能
		table.redraw();
		$("#currpage").text(pageDto.currentpage);
	});
}

//画主表方法
function drawMainTable(){
    
	//获取数据的列名
	tableCols = synajax('/bis/bustypequery.ajax','datatype=cols&typeCode='+typeCode);
	var noSysCols = [];
	for(var i=0;i<tableCols.length;i++){
//		//去除bis系统字段
//		if(tableCols[i].code.indexOf("bis")>-1){
//			continue;
//		}
		noSysCols.push(tableCols[i]);
	}
	
	for(var i=0;i<noSysCols.length;i++){
		column[i]=noSysCols[i].code;
		columnname[i]=noSysCols[i].name;
	}

	userdata = new Ext.lt.recordset({columns : column}); 	//新建Recordset，加入列
	userdata.addData(tableData); 	//Recordset加入数据
	table = new Ext.lt.datatable35(userdata);	//新建表组件，传入recordset组件
	var setcoldatas=[]; 	//表列对象数组；
	setcoldatas[0]= table.columns.seq;
	setcoldatas[1]= table.columns.checkbox;//radio列
	
	for (var i =0;i<column.length;i++){
		var col = new Object();
		col.name=column[i];
		col.alias=columnname[i];	//列别名
		col.type='s';
		setcoldatas[i+2]=col;
	}
	table.setCols(setcoldatas);
	
	// 设置样式
	table.setClassName('dttheme_inner');
	table.draw(maintabledata);
	table.setAllHeadWidth(true);
	table.setMouselight('#597EAA');
	calculateSize();
	table.mousedrag(false);	//关闭鼠标拖拽功能
	$("#currpage").text(currentPage);
	$("#totalpage").text(totalPage);
	$("#totalrecord").val(totalRecord);
}

//画主表表头
function drawMainTableHead(){
	//画之前先清空之前的数据
	if(column!=null){
		column=[];
	}
	
	if(columnname!=null){
		columnname=[];
	}
	//获取数据的列名
	tableCols = synajax('/bis/bustypequery.ajax','datatype=cols&typeCode='+typeCode);
	var noSysCols = [];
	for(var i=0;i<tableCols.length;i++){
		//去除bis系统字段
//		if(tableCols[i].code.indexOf("bis")>-1){
//			continue;
//		}
		noSysCols.push(tableCols[i]);
	}
	
	for(var i=0;i<noSysCols.length;i++){
		column[i]=noSysCols[i].code;
		columnname[i]=noSysCols[i].name;
	}

	userdata = new Ext.lt.recordset({columns : column}); 	//新建Recordset，加入列
	table = new Ext.lt.datatable35(userdata);	//新建表组件，传入recordset组件
	var setcoldatas=[]; 	//表列对象数组；
	setcoldatas[0]= table.columns.seq;
	setcoldatas[1]= table.columns.checkbox;//radio列
	
	for (var i =0;i<column.length;i++){
		var col = new Object();
		col.name=column[i];
		col.alias=columnname[i];	//列别名
		col.type='s';
		setcoldatas[i+2]=col;
	}
	table.setCols(setcoldatas);
	//点击事件，如果有子表加载子表的数据
	table.onEvent("onclick",function(td,el,l,c,d){
		if(isSub=="1"){
			//先清除子表数据
			suserdata.clear();
			var guid=d.guid; //获取本行数据的 guid
			//获取子表数据 
			Ext.lt.bis.loadingShow();
			ajax('/bis/bustypequery.ajax','datatype=subdata&typeCode='+typeCode+'&guid='+guid+'&year='+year+'&province='+province,function(rt){
				Ext.lt.bis.loadingClose();	//关闭遮罩层
				subDatas = rt;
				//把子表数据加载到数据区
				suserdata.addData(subDatas);
				table.reflash();
			});
		}else{
			$("#subtabledata").hide();
			$("#subtreediv").hide();
			stable=null;
		}
	 });
	// 设置样式
	table.setClassName('dttheme_inner');
	table.mousedrag(false);	//关闭鼠标拖拽功能
	table.draw(maintabledata);
	table.setAllHeadWidth(true);
	table.setMouselight('#597EAA');
	calculateSize();
	table.mousedrag(false);	//关闭鼠标拖拽功能
}
//画子表表头
function drawSubTableHead(){
	$("#subtabledata").show();
	$("#subtreediv").show();
	//画之前先清空之前的数据
	if(scolumn!=null){
		scolumn=[];
	}
	
	if(scolumnname!=null){
		scolumnname=[];
	}
	//获取子表列名
	stableCols = synajax('/bis/bustypequery.ajax','datatype=subcols&typeCode='+typeCode);
	var noSysCols = [];
	for(var i=0;i<stableCols.length;i++){
		//去除bis系统字段
//		if(stableCols[i].code.indexOf("bis")>-1){
//			continue;
//		}
		noSysCols.push(stableCols[i]);
	}
	
	for(var i=0;i<noSysCols.length;i++){
		scolumn[i]=noSysCols[i].code;
		scolumnname[i]=noSysCols[i].name;
	}
	//新建Recordset，加入列
	suserdata = new Ext.lt.recordset({columns : scolumn});
	stable = new Ext.lt.datatable35(suserdata);
	//表列对象数组；
	var setcoldatas=[];
	setcoldatas[0]= stable.columns.seq;
	for (var i =0;i<scolumn.length;i++){
		var col = new Object();
		col.name=scolumn[i];	//列明
		col.alias=scolumnname[i];	//列中文名字
		col.type='s';		//数据类型
		setcoldatas[i+1]=col;
	}
	stable.setCols(setcoldatas);
	
	// 设置样式
	stable.setClassName('dttheme_inner');
	stable.mousedrag(false);	//关闭鼠标拖拽功能
	stable.draw(subtabledata);
	calculateSize();
	stable.mousedrag(false);	//关闭鼠标拖拽功能
	stable.setAllHeadWidth(true); 
}

//当窗口大小变化调用重新 绘制表格方法
$(window).resize(function(){
	calculateSize();
});

//窗口大小改变重新绘制列表的大小，最小值1000*450
function calculateSize(){
	//窗口大小
	var w = $(window).width();	//宽
	var h = $(window).height();	//高
	//表格大小
	var tw = w;
	var th = h-500;
	if(tw<1000){
		tw =1000;
	}
	if(th<250){
		th = 250;
	}
	table.resize(tw,th);
	if(stable!=null && stable != undefined){
		stable.resize(tw,th);
	}
	$(".sysMain").css({"height":h-74+"px"});
	$(".syspage").css({"width":w-100+"px"});
	
}

/**
 * 分页相关
 */
//跳转到上一页
function prevPage() {
	if(pageDto.currentpage <= 1){
		alert("已经是第一页了！");
		return;
	}
	pageDto.currentpage = pageDto.currentpage - 1;
	loadPageData();
}
//跳转到下一页
function nextPage() {
	if(pageDto.currentpage>=totalPage){
		alert("已经是最后一页");
		return;
	}
	pageDto.currentpage = pageDto.currentpage + 1;
	loadPageData();
}
//首页
function headPage(){
	pageDto.currentpage = 1;
	loadPageData();
}
//末页
function tailPage(){
	pageDto.currentpage = totalPage;
	loadPageData();
}
//跳转到指定页
function jumpTo() {
	//没有点查询之前不允许使用分页
	if(!pageinputcon){
		return;
	}
	var inputnum = $.trim($("#jumpTo").val());
	//没有输入任何数据
	if(inputnum=="" || inputnum == null ){
		return;
	}
	inputnum = parseInt(inputnum);
	//正整数验证
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if(!reg.test(inputnum) || inputnum<1 || inputnum >totalPage){
		alert("请输入正确的页数");
		//将页数置为当前页
		$("#jumpTo").val(pageDto.currentpage);
		return;
	}
	pageDto.currentpage = inputnum;
	loadPageData();
}
//修改每页显示记录数
function modifySize() {
	//没有点查询之前不允许使用分页
	if(!pageinputcon){
		return;
	}
	//输入的值
	var inputsize = $.trim($("#pagesize").val());
	//非空校验
	if(inputsize=="" || inputsize == null ){
		return;
	}
	pageDto.numforpage = parseInt(inputsize);
	//正整数验证
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if(!reg.test(pageDto.numforpage)){
		alert("请输入正确的数字");
		return;
	}
	//把当前页设置成1
	pageDto.currentpage=1;
	//加载数据
	loadPageData();
	//计算总页数
	if (pageDto.total % pageDto.numforpage == 0) {
		totalPage = pageDto.total / pageDto.numforpage;
	} else {
		totalPage = Math.floor(pageDto.total / pageDto.numforpage) + 1;
	}
	$("#totalpage").text(totalPage);
	$("#jumpTo").val(pageDto.currentpage);
}
//重置
function reset(){
	//行政区划非空校验
	if(province=="" || $("#proinput").val()==""){
		alert("请选择财政区划！");
		return;
	}
	var province = $("#proinput").val();
	var year = $("#year").val();
	var selected = $("#bustype option:selected").val().substr(0,4);
	var selectedguids = [];
	var selectedbiscreatetime = [];
	var olddata = table.getRecordset();
//	({check:1});
	for (var i =0,j=olddata.size();i < j; i++){
		if(olddata.getData(i).check==1){
			selectedguids.push(olddata.getData(i).guid)
			selectedbiscreatetime.push(olddata.getData(i).biscreatetime);
		}
	}
	Ext.lt.bis.loadingShow();
	ajax('/bis/reset.ajax',"bustype="+selected+"&province="+province+"&year="+year+"&selectedguids="+selectedguids+"&selectedbiscreatetime="+selectedbiscreatetime,function(rt){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		var results = eval(rt);
		queryPageData();
		alert(results["res"]);
	});
}
//清空
function del(){
	//行政区划非空校验
	if(province=="" || $("#proinput").val()==""){
		alert("请选择财政区划！");
		return;
	}
	var selected = $("#bustype option:selected").val().substr(0,4);
	var province = $("#proinput").val();
	var year = $("#year").val();
	Ext.lt.bis.loadingShow();
	ajax('/bis/del.ajax','typecode='+selected+"&province="+province+"&year="+year,function(rt){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		if((eval(rt))["result"]=="success"){
			queryPageData();
			alert("清表成功！");
		}else{
			alert("清表失败！");
		}
	});
}
//执行业务
function exe(){
	//行政区划非空校验
	if(province=="" || $("#proinput").val()==""){
		alert("请选择财政区划！");
		return;
	}
	var selected = $("#bustype option:selected").val().substr(0,4);
	var bankcode = $("#bankcode").val();
	var province = $("#proinput").val();
	var year = $("#year").val();
	var readtype = $("#readtype option:selected").val();
	var ele = $("#ele option:selected").val();
	var seq = $("#seq").val();
	var busdatatype = $("#busdatatype").val();
	Ext.lt.bis.loadingShow();
	ajax('/bis/test.ajax','typecode='+selected+"&bankcode="+bankcode+"&province="+province+"&year="+year+"&readtype="+readtype+"&ele="+ele+"&seq="+seq+"&busdatatype="+busdatatype,function(rt){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		var results=eval(rt);
		var res="";
		for (var prop in results) {
			if(prop=="datas"){
				res+=prop+":\n\r"
				for(var i=0;i<results[prop].length;i++){
					var data = results[prop][i];
					for(var p in data){
						res+=p+":"+data[p]+";";
					}
					res+="\n\r";
				}
			}else{
				res+=prop+":"+results[prop]+"\n\r";
			}
		}
		queryPageData();
		alert(res);
	});
}


