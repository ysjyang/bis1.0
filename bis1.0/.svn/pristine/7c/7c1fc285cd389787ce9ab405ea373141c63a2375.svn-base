//分页相关
var tableData;	//从后台读取的列表数据
var currentPage = 1;	 /** 当前页号 */
var totalRecord = 1;	/** 所有页面的总记录数 */
var totalPage = 1;	/** 总页数 */
//分页对象
var pageDto={};
var table;//显示数据的table
var userdata;//table中的recordset对象
//优化页面三项
		//比window.onload加载快
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
			//可以用异步加载页面显示快
			ajax('/createTable/currentTable.ajax','',function(rt){
				var column=['year','provincecode','tablespace','status'];
					pageDto = rt;
					tableData = rt.datas;
					//为了页面table格式先出现
					userdata= new Ext.lt.recordset();
					table=new Ext.lt.datatable35(userdata);
					table.setCols([
						table.columns.seq,
						{name:'year',alias:'年份',width:'265px',style:'text-align:center'},
						{name:'provincecode',width:'267px',alias:'地区编码',style:'text-align:center'},
						{name:'tablespace',alias:'表空间',width:'265px',style:'text-align:center'},
						{name:'status',alias:'系列表创建状态',width:'265px',style:'text-align:center'},
						{alias:'删除',width:'300px',style:'text-align:center',fn:function(i,j,rs,value){
							var returnHtml = [];
							value='<input type="button" value="删除此表">';
							returnHtml.push(value);
							return returnHtml.join();
						},onclick:function(td,el,l,c,d){
							//点击删除按钮的事件
							var boo = confirm('请确认此表中无数据再删除表！');
							if(boo){
								//开启遮罩
								Ext.lt.bis.loadingShow();
								var year=d.year;
								var provincecode=d.provincecode;
								var tablespace=d.tablespace;
								ajax('/createTable/deleteTable.ajax','year='+year+'&tablespace='+tablespace+'&provincecode='+provincecode,function(rt){
									Ext.lt.bis.loadingClose();
									if(rt.havedata != null){
										alert(rt.havedata);
									}else{
										if(rt.deletetrue == true){
											alert("数据删除成功！");
											//刷新本页面
											location.reload();
										}else{
											alert(rt.errortablename+"表删除失败！");	
											alert(rt.errorMsg);							
										}
									}
									
								});
								//处理返回的结果
								
							}
							
						}}
					]);
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
					table.resize($(window).width()-20-2,$(window).height()-160); 
					var tablewidth = $(window).width()-20-2;
					var tableheight =$(window).height()-160;
					$("#tableevent").css({"width":tablewidth,"height":tableheight});
					
					
					if (pageDto.total % pageDto.numforpage == 0) {
				        totalPage = pageDto.total / pageDto.numforpage;
				    } else {
				        totalPage = Math.floor(pageDto.total / pageDto.numforpage) + 1;
				    }
					$("#currpage").text(currentPage);
					$("#totalpage").text(totalPage);
					$("#sumdate").val(pageDto.total);
			});
		});
		
		function createTableBatch(){
			openNewModalWindow("/createTable/createTableBatch.jsp",650,450,"批量生成表",function(){
				location.reload();
			});
			
		};
		
		
		// 跳转到上一页
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
			var inputnum = parseInt($("#jumpTo").val());
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
//			if(isNaN(pageDto.currentpage)){
//				pageDto.currentpage = 1;
//			}else{
				pageDto.currentpage = inputnum;
//			}
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
				var column=['year','provincecode','tablespace','status'];
				userdata = new Ext.lt.recordset({columns : column});
				//Recordset加入数据
				userdata.addData(tableData);
				table.setRecordset(userdata);
				table.redraw();
				$("#currpage").text(currentPage);
			});
			
		}
		