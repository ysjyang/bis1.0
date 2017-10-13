if (Ext == null) {
	Ext = {};
}
if (Ext.lt == null) {
	Ext.lt = {};
}
if (Ext.lt.bis == null) {
	Ext.lt.bis = {};
}

//同步请求
function synajax(url,pars)
{
	if(url.indexOf(".ajax")!=-1){
		
	}else{
		url = url.replaceAll(".do",".ajax");
	}
	var rt;
	$.ajax({
	type: "POST",
	  url: url,
	  data:pars,
	  error:function (XMLHttpRequest, textStatus, errorThrown) {
	  			alert(textStatus);
			   return false;
			},
	  success:function (data) {
		  		if(data){
		  			try{
		  			var obj = eval("("+data+")");
					rt=obj;
		  			}catch(e){
		  				rt = data;
		  			}
		  		}
			},
	  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
	  async: false
	 });
	 
	 return rt;
}
//异步请求
function ajax(url,pars,func)
{
	if(url.indexOf(".ajax")!=-1){
		
	}else{
		url = url.replaceAll(".do",".ajax");
	}
	$.ajax({
	type: "POST",
	  url: url,
	  data:pars,
	  error:function (XMLHttpRequest, textStatus, errorThrown) {
	  			alert(textStatus);
			   return false;
			},
	  success:function (data) {
		  		try{
		  			func(eval("("+data+")"));
		  		}catch(e){}
			},
	  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
	  async: true
	 });
}


function StringBuffer() {
    this.__strings__ = new Array;
}

StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
};

StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
};


function openwindow(url,name,iWidth,iHeight)
{
	var url; //转向网页的地址;
	var name; //网页名称，可为空;
	var iWidth; //弹出窗口的宽度;
	var iHeight; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

function alertNoNull(obj){
	if(obj)alert(obj);
}



String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substring(this.length-str.length)==str)
		return true;
	else
		return false;
	return true;
};

String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(0,str.length)==str)
		return true;
	else
		return false;
	return true;
};

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
};

/**
 * 打开模态窗口
 * @param url
 * @param width
 * @param height
 * @returns
 */
function openNewModalWindow(url,width,height,titlename,onclosefunc){
	url=Ext.lt.token.urlAddToken(url);
	if(!titlename){
		titlename="";
	}
	Ext.lt.bis.window = new Ext.lt.window({
		title:titlename,
		pop:true,
		mark:true,
		onclose:onclosefunc,
		w:width,
		h:height,
		fitmode:'content',
		className:'windpblue'
	});
	var framediv = $('<div style="width:'
			+ width + 'px; height:' + height + 'px;overflow:hidden;"><iframe src="'
			+ url + '" scrolling="no" frameborder=0 style="width:'
			+ width + 'px; height:' + (height) + 'px"></iframe></div>');
	Ext.lt.bis.window.draw(framediv[0]);
	return Ext.lt.bis.window;
}

function showTextWindow(text,width,height,titlename,onclosefunc){
	if(!titlename){
		titlename="";
	}
	Ext.lt.bis.showwindow = new Ext.lt.window({
		title:titlename,
		pop:true,
		mark:true,
		onclose:onclosefunc,
		w:width,
		h:height,
		fitmode:'content',
		className:'windpblue'
	});
	var framediv = $('<div style="width:'
			+ width + 'px; height:' + height + 'px;overflow:hidden;"><textarea id="textarea1" style="height: '+(height-5)+'px;width:'+(width-5)+'px"style="overflow-y:auto">'+text+'</textarea></div>');
	Ext.lt.bis.showwindow.draw(framediv[0]);
	return Ext.lt.bis.showwindow;
}

/**
 * loading层开始
 */
Ext.lt.bis.loadingShow=function(){
	Ext.lt.HTML.mark();//开启遮罩
	var payloading = $("#loadingimg");
	if(payloading.size()==0){
		var htmlArr = [];
		htmlArr.push("<div id='loadingimg' style='position: absolute;z-index: 200004;'>");
		htmlArr.push("<center><img src='/img/progress bar.gif' /></center>")
		htmlArr.push("</div>")
		payloading = $(htmlArr.join(""));
		$("body").append(payloading);
	}
	payloading.show();
	Ext.lt.HTML.center(payloading[0]);
}
/**
 * loading层关闭
 */
Ext.lt.bis.loadingClose=function(){
	Ext.lt.HTML.unmark();//关闭遮罩
	var payloading = $("#loadingimg");
	if(payloading.size()!=0){
		payloading.hide();
	}
}
