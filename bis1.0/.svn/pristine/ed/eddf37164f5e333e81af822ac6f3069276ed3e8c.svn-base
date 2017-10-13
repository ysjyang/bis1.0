if (Ext.lt.console == null) {
	Ext.lt.console = {};
}
if (Ext.lt.console.component == null) {
	Ext.lt.console.component = {};
}
Ext.lt.console.component.fileuploadtitle=null;
Ext.lt.console.component.fileupload = function (server,config) {
if(Ext.lt.console.component.fileuploadtitle==null)
	Ext.lt.console.component.fileuploadtitle=document.title;
	if(server==null)server=_ROOT_PATH_+'/fasp/webservice.rcp?serverid=fileimport&method=uploadfile';
	else server=_ROOT_PATH_+server+'.rcp?method=upload'
	//else server = 'http://127.0.0.1/fasp/fileimport.rcp?method=uploadfile';
	if(config.linkname!=null){
		server=server+'&linkname='+config.linkname;
	}
	if(config.param!=null){
		server=server+"&"+config.param;
	}
	var _config = {
			flash_url : _ROOT_PATH_+"/ltext/swfupload/jslib/swfupload.swf",
			upload_url: Ext.lt.token.urlAddToken(server),
			post_params: {"param" : "uploadParams"},
			file_size_limit : "200MB",
			file_types : "*.*",
			file_post_name: "uploadFile",
			file_types_description : "All Files",
			file_upload_limit : 0,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel"
			},
			debug: false,//�Ƿ���ʾ���Ե�textarea
			
			// Button settings
			button_image_url:  _ROOT_PATH_+"/ltext/swfupload/images/XPButtonUploadText_61x22.png",
			button_width: "61",
			button_height: "22",
			button_placeholder_id: "spanButtonPlaceHolder",
			button_text: '<span class="theFont" ></span>',
			button_text_style: ".theFont { font-size: 15; }",
			button_text_left_padding: 12,
			button_text_top_padding: 3,
			upload_button_image: _ROOT_PATH_+"/ltext/swfupload/images/upload.png",
			_buttons:[],
			// The event handler functions are defined in handlers.js
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			//file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			//upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete
	};
	function init(){
		if(config==null){config={setting:_config};return;}
		//��������
		for(var e in config){
			_config[e]=config[e];
		}
		config.setting=_config;
	}
	init();
	function _draw(){
		
		var html=[];
		html.push('<div style="width:1px;height:1px;visibility:hidden;display:none;" id="fsUploadProgress"></div>')
		html.push('<table width="100%" id="divMovieContainer"><tr>')
		html.push('<td width="60px"><span id="spanButtonPlaceHolder" ></span></td>')
		//html.push('<span  id="fsUploadProgress"></span>');
		html.push('<td ><input id="filenamelist" type="text" name="filenamelist" readOnly style="width:90%"/></td>')
		if(config.upload_button_image!=false)
		html.push('<td width="60px"><button id="spanButtonUploadFile" style="margin-left:2px;display:block;font-size: 12pt; height: 22px;width:61px;border:0;background:url(\'',config.upload_button_image,'\')" ></button></td>')
		if(_config._buttons!=null){
			for(var i=0;i<_config._buttons.length;i++){
				html.push('<td width="60px"></td>');
			}
		}
		html.push('</tr></table>');
		config.drawobj.innerHTML=html.join('');
		var _tds=config.drawobj.children[1].getElementsByTagName('td');
		for(var j=0;j<_config._buttons.length;j++){
			_tds[3+j].appendChild(_config._buttons[j]);
		}
		document.getElementById('filenamelist').onclick=function(){
			config.swfUpload.fileQueued();
		}
		if(document.getElementById('spanButtonUploadFile')!=null){
			document.getElementById('spanButtonUploadFile').onclick=function(){
				if (config.swfUpload.getStats().files_queued > 0) {
					config.swfUpload.startUpload();
				} else {
					alert("��ѡ��Ҫ�ϴ����ļ�!");
				}
			}
		}
		config.swfUpload = new SWFUpload(config.setting);
		config.swfUpload.stopped = false;
		
	}
	config.show=function(){
		_draw(this);
	}
	config.draw=function(obj){
		config.drawobj=obj;
		config.show();
	}
	config.resize=function(w,h){
	}
	config.clear=function(){
		config.swfUpload.cancelUpload();
	}
	return config
}

Ext.lt.message.hook("fileupload","clear",function(obj){
	document.getElementById('filenamelist').value='';
	document.title=Ext.lt.console.component.fileuploadtitle;
});
Ext.lt.message.hook("fileupload","fileQueued",function(p){
	document.getElementById('filenamelist').value=p.fileProgressElement.children[1].innerText;
	document.title=Ext.lt.console.component.fileuploadtitle;
});
Ext.lt.message.hook("fileupload","queue_complete_submit",function(p){
	document.getElementById('filenamelist').value='';
	document.title=Ext.lt.console.component.fileuploadtitle;
});