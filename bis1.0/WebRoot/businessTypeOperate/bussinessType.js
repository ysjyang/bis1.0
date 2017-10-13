//分页相关
//分页相关
var tableData;	//从后台读取的列表数据
var currentPage = 1;	 /** 当前页号 */
var totalRecord = 1;	/** 所有页面的总记录数 */
var totalPage = 1;	/** 总页数 */
//分页对象
var pageDto={};
var table;//显示数据的table
var userdata;//table中的recordset对象

var _qtree;//左侧树
//设置全局变量
var provice;//左侧树的地区code
var recordSet;
    //js的默认加载
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
    	//加载页面的左侧树
    	//后台返回由list转换的json
    	ajax('/businessTypeOperate/businessType.ajax','',function(rt){
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
					provice = v[0].code;
					//把地区的code传给后台
					var selectBus = $("#busselect").val();
					Ext.lt.bis.loadingShow();
					ajax('/businessTypeOperate/businessTypeTable.ajax','code='+v[0].code+'&selectBus='+selectBus,function(rt){
						Ext.lt.bis.loadingClose();	//关闭遮罩层
						//加载table组件
						tableData = rt.datas;
						pageDto = rt;
						var userdata1=new Ext.lt.recordset({columns:column});	
						userdata1.addData(tableData);
						//表的组件
	    				table.setRecordset(userdata1);
	    				table.reflash() ;
	    				
	    				
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
		});
		_qtree.draw(treediv);
		
		//加载右侧表
//		var column=['type','code','name','sixteen','seventeen','eighteen','nineteen','twenty','twentyone'];
		var column=['type','code','name','isuse'];
		var userdata=new Ext.lt.recordset();
		table=new Ext.lt.datatable35(userdata);
					table.setCols([
						table.columns.seq,
						{name:'type',alias:'接口类型',width:'200px',style:'text-align:center'},
						{name:'code',alias:'业务类型编码',width:'200px',style:'text-align:center'},
						{name:'name',alias:'业务类型名称',width:'400px',style:'text-align:center'},
						{name:'isuse',alias:'是否启用',width:'300px',style:'text-align:center',fn:function(i,j,rs,value){
							var returnHtml = [];
							//勾选框不勾选
							if(value=='0') value='<input type="checkbox">';
							if(value=='1') value='<input type="checkbox" checked="1">';
							returnHtml.push(value);
							return returnHtml.join();
						},onclick:function(td,el,l,c,d){
							var name=d[this.name];
							if(name==0){
								d[this.name]='1';
							}else{
								d[this.name]='0';
							}
						}}
					]);
					//设置样式
					table.setClassName('dttheme_inner');
					//设置排序功能
					table.headsort(true);
					//设置可以调整列宽
					table.setAllHeadWidth(true); 
					table.draw(tableevent);
					
					//设置页面的组件大小
					
					var tablewidth = $(window).width()-270-30-2;
					var tableheight = $(window).height()-160;
//					var tablewidth = window.innerWidth-270-30-2;
//					var tableheight = window.innerHeight-160;
					table.resize(tablewidth+30,tableheight-40);
					$("#tableevent").css({"width":tablewidth+40,"height":tableheight});
//					$(".syspage").css({"width":tablewidth-100});
					var treeheight = $(window).height()-150;
					$("#treediv").css({"height":treeheight});
					$("#busselect").css({"width":"200px"});
					$(".syspage").css({"width":tablewidth+40});
    	});
    });
//    window.onresize = function () {
//    	location.reload(); 
//    };
    
    /*
    * 页面table的checkbox点击事件
    * 怎么改？？
    */
    function clickCheckbox(td,el,l,c,d){
    	var name=d[this.name];
		alert("1:"+name);
		if(name==0){
			d[this.name]='1';
		}else{
			d[this.name]='0';
		}
    }
    /*
    * 页面保存按钮
    */
    function saveDataTable(){
    	//获取列表中的数据(以数组的形式)
    	 var boo = confirm('确认保存数据吗?');
    	        //confirm 会返回你选择的选项,然后可以依据选择执行逻辑        
    	 if(boo){   
    		 Ext.lt.bis.loadingShow();
    	 	 recordSet=table.getRecordset();
	    	 var data1 = recordSet.toJSON();
			 ajax('/businessTypeOperate/businessTypeSave.ajax','data='+data1+'&province='+provice,function(){
				 Ext.lt.bis.loadingClose();
				 alert("保存成功！");        
			 });
    	 }	
	}
    /*
     * select的事件
     */
    function selectBusType(){
    	var selectBus = $("#busselect").val();
//    	if(selectBus!="请选择接口类型"){
    			//左侧树是否选择
    			var v=_qtree.getSelected();
    			if(v[0]!=null){
    				//执行查询
    					//把地区的code传给后台
    					Ext.lt.bis.loadingShow();
    					ajax('/businessTypeOperate/businessTypeTable.ajax','code='+v[0].code+'&selectBus='+selectBus,function(rt){
    						Ext.lt.bis.loadingClose();	//关闭遮罩层
    						//加载table组件
        					tableData = rt.datas;
        					pageDto = rt;
//        					var column=['type','code','name','sixteen','seventeen','eighteen','nineteen','twenty','twentyone'];
        					var column=['type','code','name','isuse'];
        					var userdata1=new Ext.lt.recordset({columns:column});	
        					userdata1.addData(tableData);
        					//表的组件
            				table.setRecordset(userdata1);
            				table.reflash() ;
            				
            				
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
    					
    				
    			}else{
    				alert("请选择财政区！");
    			}
//    	}else{
//    		alert("请选择需要的接口类型！");
//    	}
    }
    
    
    
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
		debugger;
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
			var column=['type','code','name','isuse'];
			var dataTable1=[];
	 		for(var i=0;i<tableData.length;i++){
	 				var data=[];
	 				if(tableData[i].code.substring(0,2) == "10" || tableData[i].code.substring(0,2) == "20"){
	 					data.push("集中支付业务");
	 				}
	 				if(tableData[i].code.substring(0,2) == "11" || tableData[i].code.substring(0,2) == "21"){
	 					data.push("公务卡业务");
	 				}
	 				if(tableData[i].code.substring(0,2) == "12" || tableData[i].code.substring(0,2) == "22"){
	 					data.push("基础数据");
	 				}
	 				if(tableData[i].code.substring(0,2) == "13" || tableData[i].code.substring(0,2) == "23"){
	 					data.push("民生平台接口");
	 				}
	 				data.push(tableData[i].code);
	 				data.push(tableData[i].name);
	 				data.push(tableData[i].isuse);
	 				dataTable1.push(data);
	 		}
	 		
	 		var userdata1= new Ext.lt.recordset({columns : column,datas:dataTable1});
			table.setRecordset(userdata1);
			
			table.redraw();
			$("#currpage").text(currentPage);
		});
	}
	