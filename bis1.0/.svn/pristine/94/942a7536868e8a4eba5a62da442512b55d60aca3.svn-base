// 定义Ext.lt.CaptureScreen 命名空间
if (Ext.lt.CaptureScreen == null) {
	Ext.lt.CaptureScreen = {};
}
Ext.lt.CaptureScreen = new function(){
	//保存后返回的id
	this.pId;
	this.picContent;
	
	//注册快捷键，默认快捷键为shift+cp。Key为快捷键组合使用框架快捷键机制，可以使用连续三个字符，后面三个参数为boolean值，true为需要按住。
	this.regKey=function(key,ctrl,alt,shift){
		Ext.lt.regKeyEvent(key,Ext.lt.CaptureScreen.capture,ctrl,shift);
	}
	
	//截屏方法，截屏完成后将图片数据库主键作为回调函数参数返回
	this.capture = function(){
		//调用框架的方法
		Ext.lt.CaptureScreen.picContent = Ext.lt.ifmis.activex.getScreenPicInfo();
		if(Ext.lt.CaptureScreen.picContent!=null&&Ext.lt.CaptureScreen.picContent!=""){
			if(window.ActiveXObject){
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		    }else if(window.XMLHttpRequest){
				xmlHttp=new XMLHttpRequest();
		    }else{
		        alert("Sorry,your brows don't support to create XMLHttpRequest Object!");
		    }
			xmlhttp.open("POST",_ROOT_PATH_ + "/portal/com/saveScreen.do",true);
	        xmlhttp.onreadystatechange=function(){
	        	if (xmlhttp.readyState==4){
	              if (xmlhttp.status==200){
	                 //alert(xmlhttp.responseText);
	                 Ext.lt.CaptureScreen.pId=xmlhttp.responseText;
	 				 Ext.lt.message.send('capturescreen','oncapture',xmlhttp.responseText);
	              }else{
	                 alert(xmlhttp.responseText);  
	              }
	            }
	        };
	        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");                                           
	        xmlhttp.send("res="+Ext.lt.CaptureScreen.picContent);
	        /*
			if(null!=res){
				Ext.lt.RCP.serverNotEncode("capScreenServer", "delScreenServer", res,function (resp){
					Ext.lt.CaptureScreen.pId=resp;
					Ext.lt.message.send('capturescreen','oncapture',resp);
					alert(resp);
				},function(err){
					alert(err);
				});
			}
			*/
		}
	}
	
	//将指定的截图显示在指定的HTML元素中。w h为图片显示的大小。如果不传则以指定的HTM元素大小为准
	this.showCaptureScreen=function(id,HTMLElementId,w,h){
		var obj = document.getElementById(HTMLElementId);
		if(obj.src==undefined){
			var imgHtml = '<img id="picImg" src="'+_ROOT_PATH_+'/portal/com/showImg.do?guid='+id+'"/>';
			obj.innerHTML=imgHtml;
			obj=document.getElementById('picImg');
			//var pics=new Image()
			//pics.src=_ROOT_PATH_+'/portal/com/showImg.do?guid='+id;
			//document.body.appendChild(pics);
		}else{
			obj.src=_ROOT_PATH_+'/portal/com/showImg.do?guid='+id;
		}
		if(null!=w){
			obj.style.width=w;
		}
		if(null!=h){
			obj.style.height=h;
		}
		
	}
	
	//获取截图ID
	this.getId=function(){
		return Ext.lt.CaptureScreen.pId;
	} 
	
	//删除截图
	this.del=function(id){
		Ext.lt.RCP.server("capScreenServer", "delScreen", id,function (resp){},function(resp){
		});
	} 
	
}
/**
 * 增加默认快捷键shift+cp。
 */
Ext.lt.CaptureScreen.regKey('cp',false,false,true);

/*
 * 截取当前屏幕并返回jpeg格式的图片base64编码字符串.
 * by jzy
 */
Ext.lt.ifmis.activex.getScreenPicInfo=function(){	
	var isAuto = rptOcxIsAuto;
	var capture = Ext.lt.ifmis.activex.checkOcx("CaptureScreen.Foo");
	var base64code = "";
	try{
		base64code = capture.PicValue();
		
	}catch(e){}
	return base64code.replace(/(\s*$)/g,""); //结尾去除空格
	/*
	if(capture == null){
        if (isAuto == "0") {
        	Ext.lt.ifmis.activex.showOcxCheckResult();
        } else {
        	Ext.lt.ifmis.activex.showObjectTips('D4A55BDB-B9FF-4CF2-AB5C-F073492D46DF','cap',_ROOT_PATH_+'/portal/CaptureScreen.cab#version=1,0,0,1');
        }
	}else{
		base64code = capture.PicValue();
		return base64code.replace(/(\s*$)/g,""); //结尾去除空格
	}
	*/
}
