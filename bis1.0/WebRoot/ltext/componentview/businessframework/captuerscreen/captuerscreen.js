// ����Ext.lt.CaptureScreen �����ռ�
if (Ext.lt.CaptureScreen == null) {
	Ext.lt.CaptureScreen = {};
}
Ext.lt.CaptureScreen = new function(){
	//����󷵻ص�id
	this.pId;
	this.picContent;
	
	//ע���ݼ���Ĭ�Ͽ�ݼ�Ϊshift+cp��KeyΪ��ݼ����ʹ�ÿ�ܿ�ݼ����ƣ�����ʹ�����������ַ���������������Ϊbooleanֵ��trueΪ��Ҫ��ס��
	this.regKey=function(key,ctrl,alt,shift){
		Ext.lt.regKeyEvent(key,Ext.lt.CaptureScreen.capture,ctrl,shift);
	}
	
	//����������������ɺ�ͼƬ���ݿ�������Ϊ�ص�������������
	this.capture = function(){
		//���ÿ�ܵķ���
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
	
	//��ָ���Ľ�ͼ��ʾ��ָ����HTMLԪ���С�w hΪͼƬ��ʾ�Ĵ�С�������������ָ����HTMԪ�ش�СΪ׼
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
	
	//��ȡ��ͼID
	this.getId=function(){
		return Ext.lt.CaptureScreen.pId;
	} 
	
	//ɾ����ͼ
	this.del=function(id){
		Ext.lt.RCP.server("capScreenServer", "delScreen", id,function (resp){},function(resp){
		});
	} 
	
}
/**
 * ����Ĭ�Ͽ�ݼ�shift+cp��
 */
Ext.lt.CaptureScreen.regKey('cp',false,false,true);

/*
 * ��ȡ��ǰ��Ļ������jpeg��ʽ��ͼƬbase64�����ַ���.
 * by jzy
 */
Ext.lt.ifmis.activex.getScreenPicInfo=function(){	
	var isAuto = rptOcxIsAuto;
	var capture = Ext.lt.ifmis.activex.checkOcx("CaptureScreen.Foo");
	var base64code = "";
	try{
		base64code = capture.PicValue();
		
	}catch(e){}
	return base64code.replace(/(\s*$)/g,""); //��βȥ���ո�
	/*
	if(capture == null){
        if (isAuto == "0") {
        	Ext.lt.ifmis.activex.showOcxCheckResult();
        } else {
        	Ext.lt.ifmis.activex.showObjectTips('D4A55BDB-B9FF-4CF2-AB5C-F073492D46DF','cap',_ROOT_PATH_+'/portal/CaptureScreen.cab#version=1,0,0,1');
        }
	}else{
		base64code = capture.PicValue();
		return base64code.replace(/(\s*$)/g,""); //��βȥ���ո�
	}
	*/
}
