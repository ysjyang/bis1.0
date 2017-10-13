var spacetable = null;
    	var yeartable = null;
    	var _qtree = null;
    	$(function(){
    		//设置页面样式
    		$("#yeartablediv").css({"width":"63%"});
    		$("#spacetablediv").css({"width":"60%"});
    		
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
				selectmode:'n',
				endlevelselect:true,
				on:{
					'nodeclick':function(){
						var v=_qtree.getSelected();
						if(v.length>0){
							provice = v[0].code;
						}
					 }	
					} 
				});
				_qtree.draw(treediv);	
    	
    	
    	//显示表空间和年限列表
    		ajax('/createTable/yearDatasAction.ajax','',function(tableData){
    			var column=['year'];
					var userdata= new Ext.lt.recordset({columns:column});
					userdata.addData(tableData);
					yeartable=new Ext.lt.datatable35(userdata);
					yeartable.setCols([
						yeartable.columns.seq,yeartable.columns.checkbox,
						{name:'year',width:'290px',alias:'年份',style:'text-align:center'}]);
					//设置样式
					yeartable.setClassName('dttheme_inner');
					//设置排序功能
					yeartable.headsort(true);
					//设置可以调整列宽
					yeartable.setAllHeadWidth(true); 
					yeartable.draw(yeartablediv);
    		});
    	
					
					
			//显示表空间列表
//    		ajax('/createTable/sapceDatasAction.ajax','',function(tableData){
//    		var column=['tablespace_name'];
//					var userdata= new Ext.lt.recordset({columns:column});
//					userdata.addData(tableData);
//					spacetable=new Ext.lt.datatable35(userdata);
//					spacetable.setCols([
//						spacetable.columns.seq,spacetable.columns.checkbox,
//						{name:'tablespace_name',width:'193px',alias:'表空间',style:'text-align:center'}]);
//					//设置样式
//					spacetable.setClassName('dttheme_inner');
//					//设置排序功能
//					spacetable.headsort(true);
//					//设置可以调整列宽
//					spacetable.setAllHeadWidth(true); 
//					spacetable.draw(spacetablediv);	
//    		});
    	});
    	}); 
    			
		
		function saveDataTable(){
			$("#textarea1").val("表的生成结果："+"\n");
//			var spacerecordSet=spacetable.getRecordset().query({check:1});
			var yearrecordSet=yeartable.getRecordset().query({check:1});
			var treeDate=_qtree.getSelected();
			//表空间只能选择一个
//			if(spacerecordSet.length == 1){
				for(var i=0;i<yearrecordSet.length;i++){
					for(var j=0;j<treeDate.length;j++){
//						alert("开始创建"+yearrecordSet[i].year +"年、"+treeDate[j].code+"的批量表");
//						var tableData = synajax('/createTable/createTableBatchAction.ajax','year='+yearrecordSet[i].year +'&province='+treeDate[j].code+'&tablespace='+spacerecordSet[0].tablespace_name);
//						//完成一类型的创建在页面给出提示
//						if(tableData.createTrue == true){
//							$("#textarea1").val("表的生成结果："+"\n"+ yearrecordSet[i].year +"年、"+treeDate[j].code+"的批量表创建成功创建成功！"+"\n");
//						}else{
//							if(tableData.errorMsg!=null){
//								alert(tableData.errorMsg);
//							}else{
//								alert(tableData.consoleMsg);
//							}
//							$("#textarea1").val("表的生成结果："+"\n"+ yearrecordSet[i].year +"年、"+treeDate[j].code+"的批量表创建成功创建失败！"+"\n");
//							return;
//						}
						Ext.lt.bis.loadingShow();
//						ajax('/createTable/createTableBatchAction.ajax','year='+yearrecordSet[i].year +'&province='+treeDate[j].code+'&tablespace='+spacerecordSet[0].tablespace_name,function(tableData){
						debugger
						ajax('/createTable/createTableBatchAction.ajax','year='+yearrecordSet[i].year +'&province='+treeDate[j].code+'&tablespace=bis',function(tableData){
							Ext.lt.bis.loadingClose();
							if(tableData.createTrue == true){
								$("#textarea1").val("表的生成结果："+"\n"+"批量表创建成功！"+"\n");
							}else{
								if(tableData.errorMsg!=null){
									alert(tableData.errorMsg);
								}else{
									alert(tableData.consoleMsg);
								}
								$("#textarea1").val("表的生成结果："+"\n"+"批量表创建失败！"+"\n"+"请您手动删除失败已创建的数据！");
								return;
							}
						});
						//完成一类型的创建在页面给出提示
					}
				}
//			}else{
//				alert("表空间有且只能选一项！请重新选择");
//			}
			
		}