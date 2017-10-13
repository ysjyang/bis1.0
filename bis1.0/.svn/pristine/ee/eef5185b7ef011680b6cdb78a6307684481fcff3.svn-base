//分页相关
var tableData;	//从后台读取的列表数据
var currentPage = 1;	 /** 当前页号 */
var totalRecord = 1;	/** 所有页面的总记录数 */
var totalPage = 1;	/** 总页数 */
//分页对象
var pageDto={};
var table;//显示数据的table
var userdata;//table中的recordset对象
var column;//table的列

var logdatas;

$(function(){
	/**
	 * 分页绑定回车事件
	 */
	//取消IE默认回车事件
	document.onkeydown = function(e) {
	    var e = e || event;
	    if(e.keyCode == 13) {
	        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
	    }
	};
	//每页显示
	$("#pagesize").keydown(function(event){
		if(event.which == "13")    
	            modifySize();
	});
	//跳转到几页
	$("#jumpTo").keydown(function(event){
		if(event.which == "13")    
	            jumpTo();
	});
	var userdata= new Ext.lt.recordset();
						var table=new Ext.lt.datatable35(userdata);
						table.setCols([
							table.columns.seq,
							{name:'createtime',width:'150px',alias:'创建时间',style:'text-align:center'},
							{name:'method',width:'150px',alias:'方法名称',style:'text-align:center'},
							{name:'bustype',width:'150px',alias:'业务类型',style:'text-align:center'},
							{name:'bankcode',width:'150px',alias:'银行代码',style:'text-align:center'},
							{name:'province',width:'150px',alias:'财政区',style:'text-align:center'},
							{name:'year',width:'150px',alias:'年份',style:'text-align:center'},
							{name:'verifycode',width:'150px',alias:'验证码',style:'text-align:center'},
							{name:'listmap',width:'150px',alias:'请求数据 ',style:'text-align:center'},
							{name:'rt',width:'160px',alias:'回执数据',style:'text-align:center'}
						]);
						//设置样式
					table.setClassName('dttheme_inner');
					//设置排序功能
					table.headsort(true);
					//设置可以调整列宽
					table.setAllHeadWidth(true); 
					table.draw(tableevent);
					//设置页面的组件大小
//					var tablewidth = $(window).width()-270-30-2;
//					var tableheight = $(window).height()-160;
					var tablewidth = $(window).width()-20-2;
					var tableheight = $(window).height()-160;
					table.resize(tablewidth,tableheight); 
					$("#tableevent").css({"width":tablewidth,"height":tableheight});
					$(".sysMain").css({"overflow-y":"hidden"});
});

function queryData(){
	var type = $("#selectitem option:selected").val();
	var begintime = $("#begintime").val();
	var endtime = $("#endtime").val();
	if(begintime==""){
		alert("请选择起始时间！");
		return;
	}
	if(endtime==""){
		alert("请选择结束时间！");
		return;
	}
	if(begintime>endtime){
		alert("开始时间不能小于结束时间！");
	}else{
		Ext.lt.bis.loadingShow();
		ajax('/logManager/queryData.ajax','type='+type+'&begintime='+begintime+'&endtime='+endtime,function(rt){
					Ext.lt.bis.loadingClose();		
					if(type=="业务日志"){
						column=['createtime','method','bustype','bankcode','province','year','verifycode','listmap','rt'];
						pageDto = rt;
						tableData = rt.datas;
						userdata= new Ext.lt.recordset();
						table=new Ext.lt.datatable35(userdata);
						table.setCols([
							table.columns.seq,
							{name:'createtime',width:'150px',alias:'创建时间',style:'text-align:center'},
							{name:'method',width:'150px',alias:'方法名称',style:'text-align:center'},
							{name:'bustype',width:'150px',alias:'业务类型',style:'text-align:center'},
							{name:'bankcode',width:'150px',alias:'银行代码',style:'text-align:center'},
							{name:'province',width:'150px',alias:'财政区',style:'text-align:center'},
							{name:'year',width:'150px',alias:'年份',style:'text-align:center'},
							{name:'verifycode',width:'158px',alias:'验证码',style:'text-align:center'},
							{name:'listmap',width:'150px',alias:'请求数据',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}},
							{name:'rt',width:'150px',alias:'回执数据',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}}
						]);
					}
					if(type=="错误业务日志"){
						column=['createtime','method','bustype','bankcode','province','year','verifycode','errorno','errormsg','errorexpmsg','listmap','rt'];
						pageDto = rt;
						tableData = rt.datas;
						userdata= new Ext.lt.recordset();
						table=new Ext.lt.datatable35(userdata);
						table.setCols([
							table.columns.seq,
							{name:'createtime',width:'102px',alias:'创建时间',style:'text-align:center'},
							{name:'method',width:'102px',alias:'方法名称',style:'text-align:center'},
							{name:'bustype',width:'102px',alias:'业务类型',style:'text-align:center'},
							{name:'bankcode',width:'102px',alias:'银行代码',style:'text-align:center'},
							{name:'province',width:'102px',alias:'财政区',style:'text-align:center'},
							{name:'year',width:'102px',alias:'年份',style:'text-align:center'},
							{name:'verifycode',width:'102px',alias:'验证码',style:'text-align:center'},
							{name:'errorno',width:'102px',alias:'错误代码',style:'text-align:center'},
							{name:'errormsg',width:'182px',alias:'错误信息',style:'text-align:center'},
							{name:'errorexpmsg',width:'119px',alias:'异常信息',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}},
							{name:'listmap',width:'119px',alias:'请求数据',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}},
							{name:'rt',width:'121px',alias:'回执数据',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}}
						]);
					}
					if(type=="报文日志"){
						column=['createtime','ip','xml'];
						pageDto = rt;
						tableData = rt.datas;
						userdata= new Ext.lt.recordset();
						table=new Ext.lt.datatable35(userdata);
						table.setCols([
							table.columns.seq,
							{name:'createtime',width:'353px',alias:'创建时间',style:'text-align:center'},
							{name:'ip',width:'353px',alias:'IP',style:'text-align:center'},
							{name:'xml',width:'658px',alias:'请求报文',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}}
						]);
					}
					if(type=="错误报文日志"){
						column=['createtime','ip','xml','errmsg'];
						pageDto = rt;
						tableData = rt.datas;
						userdata= new Ext.lt.recordset();
						table=new Ext.lt.datatable35(userdata);
						table.setCols([
							table.columns.seq,
							{name:'createtime',width:'240px',alias:'创建时间',style:'text-align:center'},
							{name:'ip',width:'240px',alias:'IP',style:'text-align:center'},
							{name:'xml',width:'440px',alias:'请求报文',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}},
							{name:'errmsg',width:'443px',alias:'错误信息',style:'text-align:center',fn:function(i,j,rs,value){
								var returnHtml = [];
								value='<input type="button" value="显示详情">';
								returnHtml.push(value);
								return returnHtml.join();
							},onclick:function(td,el,l,c,d){
								showTextWindow(d[this.name],500,300,"数据详情");
							}}
						]);
					}
					
					
					//向table中添加recordset数据
					var userdata1= new Ext.lt.recordset({columns : column});
					userdata1.addData(tableData);
					table.setRecordset(userdata1);
					//设置样式
					table.setClassName('dttheme_inner');
					//设置排序功能
					table.headsort(true);
					//设置可以调整列宽
					table.setAllHeadWidth(true); 
					table.draw(tableevent);
					//设置页面的组件大小
//					var tablewidth = $(window).width()-270-30-2;
//					var tableheight = $(window).height()-160;
					var tablewidth = $(window).width()-20-2;
					var tableheight = $(window).height()-160;
					table.resize(tablewidth,tableheight); 
					$("#tableevent").css({"width":tablewidth,"height":tableheight});
					
					
					if (pageDto.total % pageDto.numforpage == 0) {
				        totalPage = pageDto.total / pageDto.numforpage;
				    } else {
				        totalPage = Math.floor(pageDto.total / pageDto.numforpage) + 1;
				    }
					$("#currpage").text(1);
					$("#jumpTo").val(" ");
					$("#pagesize").val(" ");
					$("#totalpage").text(totalPage);
					$("#sumdate").val(pageDto.total);
		});
	}
	
	
}

function deleteData(){
	var type = $("#selectitem option:selected").val();
	var begintime = $("#begintime").val();
	var endtime = $("#endtime").val();
	var boo = confirm("您将删除从"+begintime+"到"+endtime+"的"+type+"类型的数据，请确认是否已经备份！");
	if(boo){
		if(begintime==""){
			alert("请选择起始时间！");
			return;
		}
		if(endtime==""){
			alert("请选择结束时间！");
			return;
		}
		if(begintime>endtime){
			alert("开始时间不能小于结束时间！");
		}else{
			var date = new Date();
			var startY=date.getFullYear();
			var startM=date.getMonth()+1;
			var startD=date.getDate();
			var enddate;
			var mydate=new Date(startY,startM-3,startD);
			var endY=mydate.getFullYear();
			var endM=mydate.getMonth();
			var endD=mydate.getDate();
			if(endM.toString().length==1){
				enddate = endY+"-0"+endM+"-"+endD;
			}
			if(endD.toString().length==1){
				enddate = endY+"-"+endM+"-0"+endD;
			}
			if(endM.toString().length==1&&endD.toString().length==1){
				enddate = endY+"-0"+endM+"-0"+endD;
			}
			if(endtime>enddate){
				alert("抱歉，您不能删除三月之内的日志，请重新选择日期！");
			}else{
				Ext.lt.bis.loadingShow();
				ajax('/logManager/deleteData.ajax','type='+type+'&begintime='+begintime+'&endtime='+endtime,function(rt){
					Ext.lt.bis.loadingClose();
					if(rt.trueorfalse == true){
						alert("日志删除成功！");
						//刷新页面
						location.reload();
					}
					if(rt.trueorfalse == false){
						alert(rt.bigdate);				
					}
					if(rt.nodate != null){
						alert(rt.nodate);				
					}
				});
				
			};
		};
	};
}


//跳转到上一页
function prevPage() {
	if(pageDto.currentpage <= 1){
		alert("已经是第一页了！");
		return;
	}
	pageDto.currentpage = pageDto.currentpage - 1;
	loadPageData();
}
// 跳转到下一页
function nextPage() {
	if(pageDto.currentpage>=totalPage){
		alert("已经是最后一页");
		return;
	}
	pageDto.currentpage = pageDto.currentpage + 1;
	loadPageData();
}
// 跳转到指定页
function jumpTo() {
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
		//将页数置为当前也页
		$("#jumpTo").val(pageDto.currentpage);
		return;
	}
	pageDto.currentpage = inputnum;
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

// 修改每页显示记录数
function modifySize() {
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
	$("#jumpTo").val(pageDto.currentpage)
}

//公用加载页面数据方法
function loadPageData(){
	//显示遮罩层
	Ext.lt.bis.loadingShow();
	ajax('/bis/pageaction.ajax','pagedto='+JSON.stringify(pageDto),function(pageDto){
		Ext.lt.bis.loadingClose();	//关闭遮罩层
		tableData = pageDto.datas;
		totalRecord = pageDto.total;
		currentPage = pageDto.currentpage;
		//新建Recordset，加入列
		userdata = new Ext.lt.recordset({columns : column});
		//Recordset加入数据
		userdata.addData(tableData);
		table.setRecordset(userdata);
		table.redraw();
		$("#currpage").text(currentPage);
	});
}

