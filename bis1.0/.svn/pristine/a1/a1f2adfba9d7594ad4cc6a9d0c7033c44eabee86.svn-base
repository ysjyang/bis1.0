if (Ext == null) {
	Ext = {};
}
if (Ext.lt == null) {
	Ext.lt = {};
}
// 新建文件下载对象
Ext.lt.FUDSDownload = function() {
	// 内置属性
	config = {
		appid : null,
		fileGuid : null,
		drawDivId : null,
		showType : null,
		fudsPath : null,
		picWidth : null,
		picHeight : null,
		downuserid : null
	};

	// 设置appid方法
	config.setAppid = function(appid) {
		config.appid = appid;
	}
	// 设置文件guid方法
	config.setFileGuid = function(fileGuid) {
		config.fileGuid = fileGuid;
	}
	// 设置drawDivId方法
	config.setDrawDivId = function(drawDivId) {
		config.drawDivId = drawDivId;
		config.showType = "self";
	}
	// 设置showType方法
	config.setShowType = function(showType) {
		config.showType = showType;
	}
	// 设置picWidth方法
	config.setPicWidth = function(picWidth) {
		config.picWidth = picWidth;
	}
	// 设置showType方法
	config.setPicHeight = function(picHeight) {
		config.picHeight = picHeight;
	}

	// 下载文件
	config.download = function() {
		if (config.appid == null) {
			alert("appid不能为空，请在下载前设置appid");
			return;
		}
		if (config.fileGuid == null) {
			alert("fileGuid不能为空，请在下载前设置fileGuid");
			return;
		}
		if (config.fudsPath == null) {

			Ext.lt.RCP.server("fuds.fudscompomnentservice",
					'getFUDSServerInfo', null, function(msg) {
						var msgjson = $.parseJSON(msg) // 拼装服务器路径
						config.fudsPath = "http://" + msgjson.severip + ":"
								+ msgjson.httpport + "/";
						if (msgjson.contextpath != null
								&& msgjson.contextpath != 'undefine'
								&& msgjson.contextpath != "") {
							// contextpath不为空
							config.fudsPath = config.fudsPath
									+ msgjson.contextpath + "/";
						}
						if (msgjson.currentuserid != null
								&& msgjson.currentuserid != 'undefine'
								&& msgjson.currentuserid != "") {
							// contextpath不为空
							config.downuserid = msgjson.currentuserid;
						} else {
							config.downuserid = "null";
						}
						// alert(config.fudsPath);
						config.downloadstart();
					});
			// 请求本地servlet，获得文件服务器ip
			/*
			 * $.ajax({ type: "GET",
			 * url: config.basePath+"FUDSServerInfoServlet", data: "", error:
			 * function (xhr, errorInfo, ex) { alert('下载文件失败' + errorInfo); },
			 * success: function(msg){ var msgjson = $.parseJSON(msg) // 拼装服务器路径
			 * config.fudsPath="http://"+msgjson.severip+":"+msgjson.httpport+"/";
			 * if(msgjson.contextpath!=null&&msgjson.contextpath!='undefine'&&msgjson.contextpath!=""){ //
			 * contextpath不为空 config.fudsPath =
			 * config.fudsPath+msgjson.contextpath+"/"; }
			 * alert(config.fudsPath); config.downloadstart(); } }); 
			 */
		} else {
			config.downloadstart();
		}
	}
	// 以打开文件方式开始下载
	config.downloadstart = function() {
//		alert(1);
//		var fudsdownloaddiv = document.getElementById("fudsdownloaddiv");
//		if(fudsdownloaddiv==null||fudsdownloaddiv=='undefine'){
//			var ifr = document.createElement('iframe');
//			//ifr.src = 'http://script.a.com/b.html';
//			ifr.id="fudsdownloaddiv";
//			ifr.style.display = 'none';
//			document.body.appendChild(ifr);
//			fudsdownloaddiv = document.getElementById("fudsdownloaddiv");
//		}
//		fudsdownloaddiv.src="";
//		url = config.fudsPath + "fileDownloadServlet?FUDSappid="+config.appid+"&FUDSfileGuid="+config.fileGuid+"&FUDSdownuserid="+config.downuserid;
//		alert(url);
//		fudsdownloaddiv.src=url;
		
		var url = config.fudsPath + "fileDownloadServlet?FUDSappid="+config.appid+"&FUDSfileGuid="+config.fileGuid+"&FUDSdownuserid="+config.downuserid
		var iframe=document.getElementById("funs_down");
		if(iframe==null){
			var div=document.createElement("div");
			div.className='funs_down';
			div.innerHTML="<iframe id='funs_down'></iframe>"
			document.body.appendChild(div);
			div.style.position='absolute';
			div.style.visibility='hidden';
			div.style.top='0px';
			div.style.left='0px';
			div.style.width='0px'
			div.style.height='0px'
			iframe=document.getElementById("funs_down");
		}
		iframe.src=url+"&"+new Date();
		return;
//		 alert("参数初始化完毕，开始下载");
//		 请求FUDS服务器远程下载地址
		var form = $("<form>"); // 定义一个form表单
		form.attr('style', 'display:none'); // 在form表单中添加查询参数
		form.attr('target', "_blank");
		form.attr('method', 'post');
		form.attr('action', config.fudsPath + "fileDownloadServlet");
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'FUDSappid');
		input1.attr('value', config.appid);
		var input2 = $('<input>');
		input2.attr('type', 'hidden');
		input2.attr('name', 'FUDSfileGuid');
		alert(config.fileGuid)
		input2.attr('value', config.fileGuid);
		var input3 = $('<input>');
		input3.attr('type', 'hidden');
		input3.attr('name', 'FUDSdownuserid');
		input3.attr('value', config.downuserid);
		$('body').append(form); // 将表单放置在web中
		form.append(input1);
		form.append(input2);
		form.append(input3);// 将查询参数控件提交到表单上
		form.submit(); // 表单提交
		 $('body').remove(form);
	}

	// 显示下载图片文件
	config.show = function() {
		if (config.appid == null) {
			alert("appid不能为空，请在下载前设置appid");
			return;
		}
		if (config.fileGuid == null) {
			alert("fileGuid不能为空，请在下载前设置fileGuid");
			return;
		}
		if (config.showType == null) {
			alert("showType不能为空，请在下载前设置showType");
			return;
		}
		if (config.showType == "self" && config.drawDivId == null) {
			alert("drawDivId不能为空，请在下载前设置drawDivId");
			return;
		}
		if (config.fudsPath == null) {
			Ext.lt.RCP.server("fuds.fudscompomnentservice",
					'getFUDSServerInfo', null, function(msg) {
						var msgjson = $.parseJSON(msg) // 拼装服务器路径
						config.fudsPath = "http://" + msgjson.severip + ":"
								+ msgjson.httpport + "/";
						if (msgjson.contextpath != null
								&& msgjson.contextpath != 'undefine'
								&& msgjson.contextpath != "") {
							// contextpath不为空
							config.fudsPath = config.fudsPath
									+ msgjson.contextpath + "/";
						}
						if (msgjson.currentuserid != null
								&& msgjson.currentuserid != 'undefine'
								&& msgjson.currentuserid != "") {
							// contextpath不为空
							config.downuserid = msgjson.currentuserid;
						} else {
							config.downuserid = "null";
						}
						// alert(config.fudsPath);
						config.showstart();
					});
			// 请求本地servlet，获得文件服务器ip
			/*
			 * $.ajax({ type: "GET",
			 * url: config.basePath+"FUDSServerInfoServlet", data: "", error:
			 * function (xhr, errorInfo, ex) { alert('下载文件失败' + errorInfo); },
			 * success: function(msg){ var msgjson = $.parseJSON(msg) // 拼装服务器路径
			 * config.fudsPath="http://"+msgjson.severip+":"+msgjson.httpport+"/";
			 * if(msgjson.contextpath!=null&&msgjson.contextpath!='undefine'&&msgjson.contextpath!=""){ //
			 * contextpath不为空 config.fudsPath =
			 * config.fudsPath+msgjson.contextpath+"/"; }
			 * alert(config.fudsPath); config.downloadstart(); } }); 
			 */
		} else {
			config.showstart();
		}
	}

	// 以打开文件方式开始下载
	config.showstart = function() {
		Ext.lt.RCP
				.server(
						"fuds.fudscompomnentservice",
						'saveFileToLocal',
						config.fileGuid + "," + config.appid,
						function(msg) {
							if (msg == null || msg == 'null') {
								alert("下载文件失败");
								return;
							}
							if (config.showType == "self") {
								// 在div中显示
								var showEle;
								showEle = document.createElement("img");
								showEle.id = "SWFElement_" + config.fileGuid;
								showEle.src = msg;
								if (config.picWidth != null)
									showEle.width = config.picWidth;
								if (config.picHeight != null)
									showEle.height = config.picHeight;
								try {
									var elDIV = document
											.getElementById(config.drawDivId);
									elDIV.appendChild(showEle);
								} catch (e) {
								}

							} else if (config.showType == "pop") {
								// 弹窗显示

								// 默认宽高
								var width = 600;
								var height = 450;
								if (config.picWidth != null) {
									width = config.picWidth;
									;
								}
								if (config.picHeight != null) {
									height = config.picHeight;
								}
								var iTop = (window.screen.availHeight - height) / 2;
								var iLeft = (window.screen.availWidth - width) / 2;
								window
										.open(
												msg,
												'',
												'width='
														+ width
														+ 'px,height='
														+ height
														+ 'px,top='
														+ iTop
														+ ',left='
														+ iLeft
														+ ',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,Scrollbars=yes,help:No');
							}
						});
	}

	return config;
}
