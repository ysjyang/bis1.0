if (Ext.lt.console == null) {
	Ext.lt.console = {};
}
if (Ext.lt.console.component == null) {
	Ext.lt.console.component = {};
}
// Ext.lt.console.component.fileuploadtitle = null;
var fudsupload = null;
var jsloaded = true;
var fudsjsloadnum=0;
Ext.lt.FUDSUpload = function() {
// if(!jsloaded){
// // 引入js文件
// var ROOT_PATH_ = window.location.protocol+"//"+window.location.host;
// Ext.lt.util.createScript(ROOT_PATH_+"/ltext/swfupload/jslib/swfupload.js","swfupload1",function(){
// fudsjsloadnum++;
// if(fudsjsloadnum==4)
// initFudsJsFinish();
// });
// Ext.lt.util.createScript(ROOT_PATH_+"/ltext/swfupload/jslib/swfupload.queue.js","swfupload2",function(){
// fudsjsloadnum++;
// if(fudsjsloadnum==4)
// initFudsJsFinish();
// });
// Ext.lt.util.createScript(ROOT_PATH_+"/ltext/swfupload/jslib/fileprogress.js","swfupload3",function(){
// fudsjsloadnum++;
// if(fudsjsloadnum==4)
// initFudsJsFinish();
// });
// Ext.lt.util.createScript(ROOT_PATH_+"/ltext/swfupload/jslib/handlers.js","swfupload4",function(){
// fudsjsloadnum++;
// if(fudsjsloadnum==4)
// initFudsJsFinish();
// });
// }
// debugger;
	// if (Ext.lt.console.component.fileuploadtitle == null)
	// Ext.lt.console.component.fileuploadtitle = document.title;
	fudsupload = {
		fileguid:null,
		filename:null,
		fudsPath:null,
		showUploadButton:true,
		leftAreaShow:"select",
		uploadindex:0,
		basePath:null,
		appid:null,
		drawDivId:null,
		drawobj:null,
		showMark:null,
		successcallbackfn:null,
		failcallbackfn:null,
		userid:null,
		// flash地址
		flash_url : "ltext/swfupload/jslib/swfupload.swf",
		flash9_url : "ltext/swfupload/jslib/swfupload_fp9.swf",
		// 上传url
		upload_url : null,
		file_size_limit : "1000MB",
		file_types : "*.*",
		// file_post_name : "uploadFile",
		file_types_description : "All Files",
		file_upload_limit : 0,
		file_queue_limit : 1,
		custom_settings : {
			progressTarget : "fsUploadProgress",
			uploadButtonId : "btnUpload",
			cancelButtonId : "btnCancel"
		},
		debug : false,//

		// Button settings
		button_image_url : "/ltext/swfupload/images/XPButtonUploadText_61x22.png",
		button_width : "61",
		button_height : "22",
		button_placeholder_id : "spanButtonPlaceHolder",
		button_text : '<span class="theFont" ></span>',
		button_text_style : ".theFont { font-size: 15; }",
		button_text_left_padding : 12,
		button_text_top_padding : 3,
		upload_button_image : "/ltext/swfupload/images/upload.png",
		_buttons : [],
		// The event handler functions are defined in handlers.js
		file_queued_handler : fileQueued1,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError1,
		upload_success_handler : uploadSuccess1,
		upload_complete_handler : uploadComplete1
		// queue_complete_handler : queueComplete
	};
	// 设置fuds服务器
	if (fudsupload.fudsPath == null) {
		Ext.lt.RCP.server("fuds.fudscompomnentservice",
				'getFUDSServerInfo', null, function(msg) {
					var msgjson = $.parseJSON(msg); // 拼装服务器路径
					fudsupload.fudsPath = "http://" + msgjson.severip + ":"
							+ msgjson.httpport + "/";
					if (msgjson.contextpath != null
							&& msgjson.contextpath != 'undefine'
							&& msgjson.contextpath != "") {
						// contextpath不为空
						fudsupload.fudsPath = fudsupload.fudsPath
								+ msgjson.contextpath + "/";
					}
					if (msgjson.currentuserid != null
							&& msgjson.currentuserid != 'undefine'
							&& msgjson.currentuserid != "") {
						fudsupload.userid = msgjson.currentuserid;
					} else {
						fudsupload.userid = "null";
					}
					// alert(fudsupload.fudsPath);
				});
	}
	// 设置fuds服务器
	if (fudsupload.basePath == null) {
		Ext.lt.RCP.server("fuds.fudscompomnentservice",
				'getServerInfo', null, function(msg) {
					fudsupload.basePath = msg;
					// alert(fudsupload.basePath);
				});
	}
	// if (config.linkname != null) {
	// server = server + '&linkname=' + config.linkname;
	// }
	// if (config.param != null) {
	// server = server + "&" + config.param;
	// }

	function _draw() {
		// 设置上传文件servlet地址
// debugger;
		fudsupload.upload_url = fudsupload.fudsPath+"/fileUploadServlet";
		fudsupload.flash_url = fudsupload.fudsPath+fudsupload.flash_url;
		fudsupload.button_image_url =fudsupload.basePath+fudsupload.button_image_url;
		fudsupload.upload_button_image =fudsupload.basePath+fudsupload.upload_button_image;
		fudsupload.flash9_url =fudsupload.basePath+fudsupload.flash9_url;
		// alert(fudsupload.upload_url);
		// alert(fudsupload.button_image_url);
		fudsupload.initParam();
		var html = [];
		html.push('<div style="display:none;" id="fsUploadProgress"></div>')
		html.push('<table width="100%" id="divMovieContainer"><tr><td>')
		if(fudsupload.leftAreaShow=="select"){// 左侧显示选择文件按钮
			html.push('<div class="fudsuploadselectfilediv"><span id="spanButtonPlaceHolder"></span></div>');
		}
//		alert(filewidth);;
		// 画文件列表
		html
		.push('<div id="filenamelistdiv" class="fudsuploadfilenamelistdiv"><input id="filenamelist" type="text" name="filenamelist" readonly style="width:100%"/></div>');
		if(fudsupload.leftAreaShow=="text"){// 左侧显示文件列表,右侧是选择文件按钮
			html
			.push('<div class="fudsuploadselectfilediv"><span id="spanButtonPlaceHolder" ></span></div>');
		}
		// 上传按钮
		html
		.push('<div id="uploadButtonId" class="fudsuploaduploadbutton"><button id="spanButtonUploadFile" style="display:none;margin-left:2px;display:block;font-size: 12pt; height: 22px;width:61px;border:0;background:url('+fudsupload.upload_button_image+')" ></button></div>')
		// html.push('<span id="fsUploadProgress"></span>');
		// if (config.upload_button_image != false)
		// if (_config._buttons != null) {
		// for ( var i = 0; i < _config._buttons.length; i++) {
		// html.push('<td width="60px"></td>');
		// }
		// }
				// 画取消按钮
		html.push('<div class="fudsuploadcleanimg"><img src ="'+fudsupload.fudsPath+"/ltext/clear_nobg.gif"+'" onclick="fileallclear();" width=24px height=32px/></div>')
		html.push('</td>');
		html.push('</tr></table>');
		// alert(html);
		fudsupload.drawobj.innerHTML = html.join('');
		// 计算文件列表的宽度 ,总宽度-选择文件60-上传按钮60-清除图标36-其他10
		var filewidth = fudsupload.drawobj.offsetWidth-60-60-36-10;
		if(filewidth<100){
			filewidth=100;
		}
		document.getElementById('filenamelistdiv').style.width=filewidth+"px";
		var _tds = fudsupload.drawobj.children[1].getElementsByTagName('td');
		for ( var j = 0; j < fudsupload._buttons.length; j++) {
			_tds[3 + j].appendChild(config._buttons[j]);
		}
		document.getElementById('filenamelist').onclick = function() {
			fudsupload.swfUpload.fileQueued();
		}
		if (document.getElementById('spanButtonUploadFile') != null) {
			// 绑定上传事件
			document.getElementById('spanButtonUploadFile').onclick = function() {
				
				// alert(fudsupload.swfUpload.getStats().files_queued);
				if (fudsupload.swfUpload.getStats().files_queued > 0) {
					// alert("startupload");
					fudsupload.swfUpload.startUpload();
				} else {
					alert("还未选择上传文件，请选择文件后上传!");
				}
			}
		}
// alert(fudsupload.showUploadButton);
// 判断文件上传按钮是否显示
		if(!fudsupload.showUploadButton){
			document.getElementById('uploadButtonId').style.width="1px";
			document.getElementById('uploadButtonId').style.display="none";
			//将文本框变宽
			document.getElementById('filenamelistdiv').style.width=filewidth+60+"px";
		}
		fudsupload.swfUpload = new SWFUpload(fudsupload);
		fudsupload.swfUpload.stopped = false;

	}
	// 设置发送的参数
	fudsupload.initParam = function(){
		
		fudsupload.upload_url = fudsupload.upload_url+"?appid="+fudsupload.appid+"&userid="+fudsupload.userid;
	}
	
	fudsupload.show = function() {
		_draw(this);
	}
	fudsupload.draw = function(obj) {
		// 检查参数是否完整
		if(fudsupload.appid==null){
			alert("请在上传前使用setAppid方法设置appid");
			return;
		}
		if(obj!=null&&obj!='undefine')
			fudsupload.drawobj = obj;
		if(fudsupload.fudsPath==null||fudsupload.basePath==null){
			// fudsupload.fudsPath还未更新
			fudsupload.waitDraw();
		}else{
			// 直接执行
			fudsupload.show();
		}
		
	}
	
	fudsupload.waitDraw=function(){
		// 为避免等待过久，改为50毫秒刷新一次
		if(fudsupload.fudsPath==null||fudsupload.basePath==null){
			setTimeout("fudsupload.waitDraw()",50);
		}else{
			// 直接执行
			fudsupload.show();
		}
		
	}
	
	
	
	fudsupload.resize = function(w, h) {
	}
	fudsupload.clear = function() {
		fudsupload.swfUpload.cancelUpload();
	}
	fudsupload.setAppid = function(appid){
		fudsupload.appid = appid;
	}
	fudsupload.setFileType= function(fileType){
		fudsupload.file_types=fileType;
	}
	fudsupload.setDrawDivId= function(drawDivId){
		fudsupload.drawobj =document.getElementById(drawDivId);
	}
	fudsupload.setShowMark= function(showMark){
		fudsupload.showMark = showMark;
	}
	fudsupload.setSuccesscallbackfn= function(successcallbackfn){
		fudsupload.successcallbackfn = successcallbackfn;
	}
	
	fudsupload.setFailcallbackfn= function(failcallbackfn){
		fudsupload.failcallbackfn =failcallbackfn;
	}
	fudsupload.getFileGuid= function(){
		return fudsupload.fileguid;
	}
	fudsupload.getFileName= function(){
		return fudsupload.filename;
	}
	var regExp=/^\d+(\.\d+)?$/;
	fudsupload.setFileMaxSize=function(size){
		if(regExp.test(size)){
			fudsupload.file_size_limit=size+"MB";
		}else{
			alert("设置文件大小参数应为数字");
		}
	}
	fudsupload.setFileNum =function(num){
		if(regExp.test(num)){
			fudsupload.file_queue_limit=num;
		}else{
			alert("设置文件个数参数应为数字");
		}
	}
	fudsupload.getFileNumInQueue=function(){
		return fudsupload.swfUpload.getStats().files_queued;
	}
	// 设置是否显示上传按钮
	fudsupload.setShowUploadButton=function(show){
		fudsupload.showUploadButton = show;
// alert(showButton+"abc"+fudsupload.showUploadButton);
	}
	// 开始上传文件
	fudsupload.startUpLoad=function(){
		document.getElementById('spanButtonUploadFile').onclick();
	}
	fudsupload.setLeftArea=function(leftArea){
		if(leftArea!="select"&&leftArea!="text"){
			alert("设置左侧显示内容错误，参数值为text或select");
			return;
		}
		fudsupload.leftAreaShow=leftArea;
	}
	
	return fudsupload;
}

// 将文件名写入filenamelist中
//fudsupload.swfUpload.wrapper = fudsupload; 
//我觉得这么写就可以，upload_success_handler的句柄this是fudsupload.swfUpload，
//这样写可以在方法内部通过this.wrapper获取到fudsupload对象
function fileQueued1(file){
	if(file!=null&&file!="undefined")
	document.getElementById('filenamelist').value+=file.name+";";
}
// 暂时不使用此方法
function fileDialogComplete(numberselected, numberqueued,totalnum) {
// document.getElementById('filenamelist').value="";
// for(var i=0;i<totalnum;i++){
// document.getElementById('filenamelist').value+=this.getFile(i).name+";";
// }
// //去掉最后一个分号
// document.getElementById('filenamelist').value =
// document.getElementById('filenamelist').value.substring(0,document.getElementById('filenamelist').value.length-1);
}
// 整体上传成功后触发
function uploadSuccess1(file , server , received){
	if(server.length==32){
		// 上传成功，返回fileguid
		fudsupload.fileGuid = server;
		// 上传文件索引
		fudsupload.uploadindex=fudsupload.uploadindex+1
		fudsupload.filename=fudsupload.swfUpload.getFile(fudsupload.uploadindex-1).name;
		// alert(fudsupload.filename);
		// fudsupload.swfUpload.cancelUpload();
		// alert(fudsupload.swfUpload.getStats().files_queued);
		var result = new Object();
		result.fileGuid=fudsupload.fileGuid;
		result.fileName=file.name;
		// 调用成功的回调函数
//		setTimeout(fudsupload.successcallbackfn+"('"+fudsupload.fileGuid+"','"+file.name+"')",1);
		fudsupload.successcallbackfn(result);
	}else{
			// 调用失败的回调函数
		fudsupload.failcallbackfn(server);
	}
	document.getElementById('filenamelist').value = "";
	// 清除swfUpload信息
	// fudsupload.clear();
	
} 
// 一个文件上传成功后触发
function uploadComplete1(file){
	 // alert("file"+file);
}
function fileallclear(){
	while (fudsupload.swfUpload.getStats().files_queued > 0) {
		// alert(fudsupload.swfUpload.getStats().files_queued);
		// 顺序从待上传列表中获得文件，并逐一移除队列
		fudsupload.swfUpload.cancelUpload(null,false);
	}
	// 清空text框
	document.getElementById('filenamelist').value = "";
	//	fudsupload.uploadindex=0;
}

function uploadError1(file, error, message){
//		alert("forcefaile"+forcefaile);
		document.getElementById('filenamelist').value = "";
		// 调用失败的回调函数
		if(fudsupload.failcallbackfn!=null)
			fudsupload.failcallbackfn(message);
	
}

function initFudsJsFinish(){
	jsloaded=true;
}
