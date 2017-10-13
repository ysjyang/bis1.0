if(Ext == null) var Ext={};
Ext.BLANK_IMAGE_URL = '../images/s.gif';
/**
ext框架的扩展，本文件为核心包。包括动态加载，模板管理的功能。

API说明：

命名空间：Ext.lt
方法说明：
getNextSeqValue()  返回该页面中的一个唯一索引，数字型最小值1000
regKeyEvent(char,fn,ctrl,shift) 注册组合键事件。char表示要监控的字母按键，不区分大小写。ctrl、shift表示是否要同时按住键盘的ctrl键和shift键
clone(Object)	 复制以对象
createComponent(function(){ return cmpinstance}) 创建组件对象方法，要求返回对象必须实现draw，resize方法



aninmation(HTMLElement)  属性动画实现类,将给定对象添加属性动画实现方法。
    return HTMLElement.setAnimatProperty(proerty,start,end) 设置动画属性及开始值和结束值
                      .play(time);                          执行动画，time为动画执行的时间
                      .stop();                              终止动画执行，属性直接赋值为结束值





命名空间：Ext.lt.RCP
    实现浏览器调用远程服务的方法，调试快捷键'ctrl+shift+r'
方法说明：
call(server, m, parameters, callbakfn, falsefun);
asyncall(server, m, parameters);
asynserver(serverid, m, parameters)
asynserverNotEncode(serverid, m, parameters)  不对参数进行编码
server(serverid, m, parameters, callbakfn, falsefun)
script( serverid, m, parameters, callName)




命名空间：Ext.lt.util
    各种JavaScript的常用工具方法
方法说明：
setText(String)		将参数中的文本发送到剪贴版中
fnbind(fn,Object)		将方法的this常量指向Object
clone(Object)		复制一个值对象。只能复制对象的字符串、数字、数组属性。方法和绑定的事件不能对象
setUserData(key,value) IE/noIE本地存储到Userdata
getUserData(key)       IE/noIE 本地存储取值
removedata(key)        IE/noIE 本地存储删除




命名空间：Ext.lt.HTML
		各类HTML常用方法及扩展
		对HTML元素增加鼠标移入、移出、点击时的样式控制，属性名
			鼠标移入样式 overclass overstyle
			鼠标点击样式 clickclass clickstyle
			开关样式     switchstyle switchclass  当鼠标点击一次，对象样式换为属性指定内容，再次点击以后样式恢复
			开关组       switchgroup 一组开关中只能有一个开关打开，当打开一个开关后，同一组中的其他开关自动关闭，并出发onclick时间
			开关状态     switch=on   当该属性为on时，改元素默认使用打开状态样式

方法说明：
positionedOffset(element)  返回指定元素在页面中的位置。为方便使用，返回值结构为数组、对象混用模式。返回值基本类型为数组[左边距，上编剧]。也可以从返回值对象中获取left、top属性
mark(element,boolean:flag)     采用IFRAME遮罩指定对象，flag 默认为true。当flag为true时遮罩指定对象，flase时恢复
setStyle(element,csstext)      采用CSS格式设置对象样式。如 setStyle(divid,'width:100%;border:1px red solid')
drag(cfg:{})               对HTML对象生成拖拽操作，参数为拖拽的配置信息。
 cfg={element:HTMLElement, 需要拖拽的HTML元素
      holder:boolean,      是否显示占位负号
      x:int,               鼠标和拖拽对象的X轴相对位置
      y:int,               鼠标和拖拽对象的Y轴相对位置
      onend:function,      当拖拽结束时执行的方法
      onstart:function     当拖拽开始时执行的方法
      dragel:HTMLElement   拖拽对象
      }    



命名空间：Ext.lt.dateutil
    实现各种日期工具
方法说明：
YYMMDD(dateobj)    返回'YYYY年MM月DD日' 的中文格式
weekday(dateobj)   返回中文的星期几
solarDay(dateobj)  返回农历和节日
holiday(dateobj)   返回西方节日名称
chinaholiday(dateobj)  返回中国传统节日名称




命名空间：Ext.lt.layout
		简单布局管理
使用布局管理时需要在HTML元素上增加布局设置layout属性。如：<div layout="{h:{fit:-65,min:400}}"></div>
在layout属性中设置HTML元素的宽、高设置，设置信息符合Json格式。最外层布局元素的属性是相对窗口可见区的大小来设置的
min:表示元素的最小值，当界面高度或宽度小于这个值时，则使用这个值
fit:属性用来控制元素宽度。
		'auto' - 自动适应宽度，使用上级元素的宽度（高度）减去其他兄弟元素的宽度（高度）。如果平级兄弟元素中有多个fit:auto则只有第一个生效
		 true  - 自动充满真个区域
		 正数  - 应用该宽度
		 负数  - 与上级布局元素的属性的差值
当页面大小被改变后，布局样式在0.2秒之后开始应用。在完成布局计算后，向页面发送"layout","endlayout"消息，其他页面组件可以通过Ext.lt.message.hook("layout","endlayout",function(){})来获取消息
例如：
设置一个div，大小充满这个窗口可见区域 
	<div layout="{h:{fit:true},w:{fit:true}}"></div>
设置一个div，高度为窗口可见区域大小减去页头高度（100px）
	<div layout="{h:{fit:-100}}"></div>
设置一个div，宽度为窗口可见区减去左侧菜单宽度150px，并且，宽度不得小于600px
	<div layout="{w:{fit:-150,min:600}}"></div>


命名空间：Ext.lt.message
		页面消息管理器，页面间组件可以通过消息相互通讯。消息机制可以在组件之间保持松耦合状态下的实现各种联动效果。

属性：
	assistfn:function()	辅助区内容扩展函数。参数与alert参数相同，返回HTML代码并生成到系统提示框辅助区中，通过Ext.lt.message.hook('assistfn',helpobj)实现回调。
方法说明：
	send(src,type,msg)  发送一个消息，src消息来源  type消息类型  msg消息内容，消息内容可以是数字、日期、字符串、对象，结构有消息发布者规定，并需要提供详细的结构说明，消息使用者根据该说明使用
	hook(src,type,fn)   拦截一个消息，src消息来源  type消息类型  fn消息处理的回调函数，参数为发送消息的msg参数。在函数中可以修改msg的内容，并且会影响拦截该消息的其他组件。
	unhook(src,type,fn) 取消消息拦截，src消息来源  type消息类型  fn消息处理的回调函数
	alert(msg,{title:,assist:,})	替换浏览器缺省提示框，在原有提示框的基础上增加标题控制和辅助区。并提供扩展接口可修改服务区内容






Ext.lt.cookie
	add(name,value,expires,path,domain,secure)  添加一个cookie
	del(name)                                   删除cookie
	get(key)									获取一个cookie





 */
 
var N=null;
if(Ext.lt==null){
Ext.lt = new function(){
	var _seq=1000;  //内置序列
	var _keymap={}; //快捷键缓存
	var _keymapTime={key:'',time:new Date()}; //快捷键缓存
	var _zIndex=99999;
	var _Max_zIndex = 999999999; //提供一个最大值
	
	// 运行模式，默认为演示模式使用本地数据文件。变为运行模式后则按照server属性设置加载服务器端数据
	this.demomode=false;
	// 演示模式下模拟交互的数据,key为远程调用的URL
	this.demodatamap=[];
	
	// 服务器访问路径，当系统为演示模式时该参数无效，而变为运行模式时，所有数据文件访问将自动追加服务器地址
	this.serverUrl='';
	// 用于设置客户端框架根目录位置，默认/ltext
	this.ltextpath='/ltext';
	
	// ie版本号
	var _msie=navigator.userAgent.toLowerCase().match(/msie (\d+)\./);
	this.ieversion=_msie?_msie[1]:7;
	this.isie=/msie/.test(navigator.userAgent.toLowerCase());
	this.ischrome=/webkit/.test(navigator.userAgent.toLowerCase());
	this.documentmode=document.documentMode;
	
	// 存储已加载js库文件名称
	this.jslib={};
	
	// 定义常量NULL
	N=null;   
	
	var _onload_fn =[];
	
	this.onload=function(fn){
		_onload_fn.push(fn)
	}
	var event2Type={'onclick':'MouseEvents'};
	this.createEventObject=function(src,eventtype){
		var event=null;
		if(document.createEventObject==null){
			event=document.createEvent(event2Type[eventtype]);
			event.initMouseEvent(eventtype.substr(1), true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);  
		}else{
			event=document.createEventObject();
		}
		if(src!=null){
			event._srcElement=src;
		}
		return event;
	}
	this.fireEvent=function(src,eventtype){
		if (src.fireEvent) { // IE
			var event = this.createEventObject();
			src.fireEvent(eventtype,event);  
		}else if(document.createEvent){ //兼容chrome jzy
	  	    try {
	  	    	if(!!src.disabled){ //兼容浏览器， disabled状态不触发任何事件
	  	    		return;
	  	    	}
		   	        var evobj = document.createEvent("Event");
		   	        evobj.initEvent(eventtype.replace("on",""), true, true);
		   	        src.dispatchEvent(evobj);	
	   	    } catch (e) {
	   	        alert(e)
	   	    }
		}    
	}
 
	
	// 添加事件绑定/解除方法，兼容各个版本浏览器
	this.bindEvent=function(el,en,fn,useCapture){
		var tagel=el;
		if(fn.bindel==null) fn.bindel=[];
		fn.bindel.push(tagel);

		if(window.attachEvent){
			if(en.indexOf('on')!=0) en='on'+en;
			// IE浏览器
			try{
			tagel.attachEvent(en,fn);
			}catch(e){
				
			}
			fn.unbindEvent=function(tagel,en){
				if(tagel==null){
					// 解除所有事件绑定
					for(var i=0,l=this.bindel.length;i<l;i++) this.bindel[i].detachEvent(en,this);
				}
				else{
					tagel.detachEvent(en,this);
				}
			}
		}
		else{
			if(en.indexOf('on')==0) en=en.substring(2);
			tagel.addEventListener(en,fn,useCapture==true);
			fn.unbindEvent=function(tagel,en){
				if(tagel==null){
					// 解除所有事件绑定
					for(var i=0,l=this.bindel.length;i<l;i++) this.bindel[i].removeEventListener(en,this,useCapture==true);
				}
				else{
					tagel.removeEventListener(en,this,useCapture==true);
				}
			}
			
		}
	};
	
	this.unbindEvent=function(el,en,fn,useCapture){
		var tagel=el;
		if(fn.unbindEvent==null){
			if(window.attachEvent){
				if(en.indexOf('on')!=0) en='on'+en;
				tagel.detachEvent(en,this);
			}
			else{
				if(en.indexOf('on')==0) en=en.substring(2);
				tagel.removeEventListener(en,fn,useCapture==true);
			}
		} else if(!window.attachEvent){
			if(en.indexOf('on')==0) en=en.substring(2);
			tagel.removeEventListener(en,fn,useCapture==true);
		}else{
			fn.unbindEvent(el,en);
		}
	}
	
	this.bindEvent(window,'onload',function(){
		if(this.isonload==false)return;
		for(var i=0,l=_onload_fn.length;i<l;i++){
			_onload_fn[i]();
		}
	});
	this.runOnload=function(){
		for(var i=0,l=_onload_fn.length;i<l;i++){
			_onload_fn[i]();
		}
	}

	
	
	/**
	 * 向页面中加载新的js库
	 * 由于页面初始显示时并不需要加载所有的js文件。因此，后使用的js库文件通过改方法动态加载到页面中
	 */
	this.loadLib=function(libname, fn){
    if(this.jslib.libname == null){
      var scpt = document.createElement("SCRIPT");
      scpt.type = "text/javascript";
      scpt.src = './ltext/extends/'+libname+'.js';
      scpt.onreadystatechange = function(){
      	if (this.readyState == "complete") { 
      		Ext.lt.jslib.libname = true;
      		// 尝试执行js库的初始化函数
   			  eval(libname+"_init()");
      		
      		if(Ext.lt.isFunction(fn)){
      			fn();
      		}
      	}
      }
      document.getElementsByTagName("HEAD")[0].appendChild(scpt);
    }
    else{
    	if(Ext.lt.isFunction(fn)){
        fn();
      }
    }
	};
	
	/**
	 * 检查指定的js库是否被加载
	 */
	this.hasJsLib=function(libname){
		return (this.jslib.libname)?true:false;
	};
	
	/**
	 * 处理系统中获取数据url
	 * 如为demo系统则访问本地数据，如果是真实系统，则根据Ext.lt.serverUrl修改链接，直接从正式服务上获取数据
	 */
	this.encodeUrl=function(url){
	    // 如果链接已经指定具体的域名则直接返回
	    if(url.toLowerCase().indexOf('http') ==0){
		   return url;
	    }
	    
	    if(!Ext.lt.demomode){
		   if(url.substring(0,1) == '/'){
		       return Ext.lt.serverUrl+url;
		   }
		   else{
		       return Ext.lt.serverUrl+'/'+url;
		   }
	    }
	    return url;
	};
	
	/**
	 * 创建模型用的远程调用方法
	 */
	this.createModule=function(modulename,moduleparams){
		modulerul = Ext.lt.serverUrl+'/module/'+modulename;
		return function(fn){
			Ext.Ajax.request({
				url: modulerul,
				success: fn,
				failure: function(){
			  	alert("error");	
				},
				params: moduleparams
			});
		}
	}
	
	this.getNextSeqValue=function(){return _seq++};
	this.getNextZIndex=function(){return _zIndex++};
	this.getMaxZIndex=function(){return _Max_zIndex++};
	this.apply=function(p,c){for(var n in c){p[n]=c[n]};return p};
	this.isArray=function(object) {return object && object.constructor === Array;};
	this.isFunction=function(e){return typeof(e)=='function'};
	this.isDate=function(e){return Object.prototype.toString.apply(e)==='[object Date]'}
	this.isRegexp=function(e){return e.compile!=null}
	this.isString=function(e){return typeof(e)=='string'}
	this.isNumber=function(e){return typeof(e)=='number'}
	
	this.exception=function(){};
	this.log=function(){};
	
	this.clone=function(obj){ //该方法可能有点问题，不建议使用
		if(obj==null) return null;
		eval('var tmp='+Object.toJSON(obj));
		// 将对象中的其他属性复制到克隆对象中
		Ext.lt.apply(tmp,obj);
		return tmp;
	}
	this.getparam=function(val,url){ //获取URL中参数
		var uri = url||window.location.search;
    	var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
    	return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
	}
 	//深度克隆
	this.cloneobj=function(obj){
	    var objClone;
	    if (obj.constructor == Object){
	        objClone = new obj.constructor(); 
	    }else{
	        objClone = new obj.constructor(obj.valueOf()); 
	    }
	    for(var key in obj){
	        if ( objClone[key] != obj[key] ){ 
	            if ( typeof(obj[key]) == 'object' ){ 
	                objClone[key] = Ext.lt.cloneobj(obj[key]);
	            }else{
	                objClone[key] = obj[key];
	            }
	        }
	    }
	    objClone.toString = obj.toString;
	    objClone.valueOf = obj.valueOf;
	    return objClone; 
	}

	// 错误代码库
	this.errlib=new function(){
			var errs=[]
			addErr=function(e){
				if(!e.code){i=i/0}
				if(!e.msg){i=i/0}
				errs.push(e);
			}
			this.loadErr=function(){
				
			}
	};
	
	this.bindEvent(document,'onkeypress',function(){
		var nD=new Date();
		if((nD-_keymapTime.time)>1000){
			_keymapTime.key='';
		}
		_keymapTime.key=_keymapTime.key+"_"+event.keyCode
		_keymapTime.time=nD;
		var en=_keymap['press'+_keymapTime.key];
		if(en==null) return true;
		if(event.ctrlKey==en.ctrl && event.shiftKey==en.shift){
			en.fn();
		}
	});

	
	// 注册组合键事件。ctrl、shift表示键盘ctrl键和是shift的组合，字母键不区分大小写
	this.regKeyEvent=function(k,fn,pressctrl,pressshift){
		if(fn==null || k==null) return false ;
		if(k.length<1) return false;
		var charcodes=['','',''];
		for(var i=0;i<k.length;i++){
			var _k=k.charAt(i);
			charcodes[0]=charcodes[0]+"_"+(_k.toUpperCase().charCodeAt(0));
			charcodes[1]=charcodes[1]+"_"+(_k.toLowerCase().charCodeAt(0));
			charcodes[2]=charcodes[2]+"_"+(_k.toUpperCase().charCodeAt(0)-64);
		}
		_keymap['press'+charcodes[0]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		_keymap['press'+charcodes[1]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		_keymap['press'+charcodes[2]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		if(pressctrl){
			if(k=='v') _keymap['press22']={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		}
	}

	var _logger=[]
	window.errlog=function(msg){
		// 分析堆栈呢rio那个
		var stack=[],caller=errlog.caller;
		while(caller!=null){
			stack.push(caller.toString('Function'));
			caller=caller.caller;
		alert(caller)
		}
		_logger.push({'Date':new Date(),'msg':msg,'stack':stack})		
	}
	
	
	this.createComponent=function(cmpfunction){
		return function(cfg){
			var newcmp=new cmpfunction(cfg);
			// 检查newcmp对象是否包含draw、resize等方法
			if(Ext.lt.isFunction(newcmp.draw) && Ext.lt.isFunction(newcmp.resize)){
				// 遍历对象所有方法，设置通过fnbind函数，将所有方法的this指针指向newcmp
				for(var fn in newcmp){
					if(Ext.lt.isFunction(newcmp[fn])){
						Ext.lt.util.fnbind(newcmp[fn],newcmp);
					}
				}
				
				// 将组件基本方法组装到组件中
				return new Ext.lt.component(newcmp);
			}
			else{
				alert("无法创建组件，组件没有实现draw方法或resize方法");
				return;
			}
		}
	}
	
	this.getObject=function(objname){
		var fn=new Function('name','return '+objname);
		return fn(objname);
	}

};


Ext.lt.cache=new function(){
	
	this.setData=function(key,v){
		if(key==null) return null;
		Ext.lt.util.setUserData(key,v);
	}
	this.getData=function(key){
		if(key==null) return null;
		var v =  Ext.lt.util.getUserData(key);
		return v;	
	}
	this.removeData=function(key){
		if(key==null) return null;
		Ext.lt.util.removeUserData(key);
	}
}

// 对数字格式化的扩展，参数为unit:int计量单位，dot:int小数位，qfw:boolean是否显示千分位
String.prototype.toNumber=function(dot, qfw, unit){
	
	if(unit==null || isNaN(unit)) unit=1;
	if(dot==null || isNaN(dot)) dot=2;
	dot=parseInt(dot,10);
	if(qfw==null) qfw=true;
	var ins =this.trim();
	if(qfw){ //传入千分位parseFloat方法造成值不准确。
		ins = this.replace(/,/g,'');
	}
	if(ins.indexOf('.')==0){
		ins='0'+ins;
	}
	if(isNaN(ins)||ins.length==0)return 0;
	// 判断是否为负数
	var neg=ins.indexOf('-')==0;
	if(neg){
		ins=ins.substr(1,ins.length);
	}
	//改变小数位 unit;
	var inss=ins.split('.');
	if(inss[1]==null)inss[1]='';
	var _unitlength=(unit+'').length-1;
	inss[0]=parseInt(inss[0],10)+'';
	if(inss[0].length>_unitlength){
		inss[1]=inss[0].substr(inss[0].length-_unitlength)+inss[1];
		if(inss[1]==''){
			ins=inss[0].substr(0,inss[0].length-_unitlength)
		}else{
			ins=inss[0].substr(0,inss[0].length-_unitlength)+'.'+inss[1]
		}
		
	}else if(inss[0].length==_unitlength){
		ins="0."+inss[0]+inss[1];
	}else{
		var z=["0."];
		for(var i=inss[0].length;i<_unitlength;i++){
			z.push("0");
		}
		ins=z.join('')+inss[0]+inss[1];
	}
	//开始进行四舍五入。
	var fixpoint = function(val,len){
		var vs=val.split('.');
		if(vs[1]==null)vs[1]='';
		//判断len==0,且不含.直接return val(包含着  有小数位，且长度正好)
		if(len==vs[1].length)return val;
		
		//判断len!=0,小数位不满足长度。
		if(len!=0&&vs[1].length<len){
			var z=[vs[0]];
			z.push('.');
			z.push(vs[1]);
			for(var i=vs[1].length;i<len;i++){
				z.push('0');
			}
			return z.join('');
		}
		//这样我们首先截取不需要舍弃的小数位。
		var v1= vs[1].substr(0,len);
		//从小数部分截取舍部分。
		var v2=parseInt(vs[1].substr(len,1),10);
		//判断是否进位
		if(v2>=5){
			var ret=[];
			var b=true;
			//先返序进位小数部分
			for(var i=len-1;i>=0;i--){
				if(v1.charAt(i)=='9'){
					ret.push('0');
				}else{
					var c=parseInt(v1.charAt(i),10)
					ret.push(++c);
					return vs[0]+'.'+vs[1].substr(0,i)+ret.reverse().join('')
				}
			}
			if(len!=0){
				ret.push('.');
			}
			for(var i=vs[0].length-1;i>=0;i--){
				if(vs[0].charAt(i)=='9'){
					ret.push('0');
				}else{
					var c=parseInt(vs[0].charAt(i),10)
					ret.push(++c);
					return vs[0].substr(0,i)+ret.reverse().join('');
				}
			}
			if(ret[ret.length-1]==0){
					ret.push('1');
			}
			return ret.reverse().join('');
			//进位整数部分
		}else{
			if(len==0){
				return vs[0];
			}else{
				return vs[0]+'.'+v1;	
			}
		}
	}
	var v = fixpoint(ins,dot);
	// 处理千分位
	if(qfw){
		var vs=v.split('.');
		var integer=vs[0];
		var re=/(\d+)(\d{3})/;  
		while(re.test(integer)){   
			integer = integer.replace(re,"$1,$2");  
		}
		if(vs[1]==null){
			v=integer
		}else{
			v=integer+'.'+vs[1];
		}
	}
	return neg?'-'+v:v; 
}
Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};
String.prototype.Base64decode=function(){return Base64.decode(this)};

// md5 lp 20130403
String.prototype.md5 = function(string) {
	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	
	var F = function(x, y, z) {
		return (x & y) | ((~ x) & z);
	}
	
	var G = function(x, y, z) {
		return (x & z) | (y & (~ z));
	}
	
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	
	var I = function(x, y, z) {
		return (y ^ (x | (~ z)));
	}
	
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	
	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	
	var uTF8Encode = function(string) {
		string = string+"";
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	string = uTF8Encode(this);
	x = convertToWordArray(string);
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	for (k = 0; k < x.length; k += 16) {
		AA = a; BB = b; CC = c; DD = d;
		a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
		b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
		b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
		a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
		d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
		c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
		c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
		a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
		d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
		c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
		a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
		a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
		b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
		d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
		a = addUnsigned(a, AA);
		b = addUnsigned(b, BB);
		c = addUnsigned(c, CC);
		d = addUnsigned(d, DD);
	}
	var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	return tempValue.toLowerCase();
}
String.prototype.compare=function(s){
	return this.localeCompare(s);
}
Number.prototype.compare=function(i){
	if(this==i) return 0;
	return this>i?1:-1;
}
Date.prototype.compare=function(d){
	if(this==d) return 0;
	return this>d?1:-1;
}

// 设置对象格式化输出的模板，设置模板后会追加out方法。调用后按照模板形式返回字符串
// 设置数据模板
var _regfn={}
Object.setTemplate=function(obj,tmp){
	var _tmp=tmp;
	
	var _getRegFn=function(field){
		var regx=_regfn[field]
		if(regx==null){
			regx=RegExp("#"+field,"ig");
			_regfn[field]=regx
		}
		return regx;
	}
	
	
	obj.out=function(){
		var o=_tmp,fs=[],fi,l;
		for(var f in this){
			l=f.length
			if(l!=null && fs[l]==null){
				fs[l]=[];
			}
			fs[l].push(f);
		}
		
		for(var i=fs.length-1;i>-1;i--){
			fi=fs[i];
			if(fi==null) continue;
			for(var j=fi.length;j>-1;j--){
				f=fi[j]
				if(this[f]==null){
					o=o.replace(_getRegFn(f),'');
				}else if(typeof(this[f])!='function' && typeof(this[f])!='object'){
					o=o.replace(_getRegFn(f),this[f]);
				}
			}
		}
		
		return o;
	}
}

// 扩展数组toArray方法
Array.prototype.toArray=function(){return this}
Array.prototype.indexOf=function(elem){
	for (var i=0, length=this.length; i<length; i++)
		if (this[i]==elem)return i;
	return -1;
}
// 扩展数组清空方法
Array.prototype.clear=function(){
	this.splice(0,this.length);
}
// 删除数组中的指定对象
Array.prototype.remove=function(obj){
	var c=0
	for(var i=0,l=this.length;i<l;i++){
		if(this[i]==obj){
			this.splice(i--,1);
			c++;
			l--;
		}
	}
	return c;
}


// 向数组中追加新元素
Array.prototype.add=function(arr){
	for(var i=0,l=arr.length;i<l;i++) this.push(arr[i]);
}
// 向数组中追加新元素
Array.prototype.insert=function(obj,i){
	this.splice(i, 0, obj)
}
// 排序函数 true升序、false降序，默认升序
Array.prototype.sortArray=function(asc){
	var nullsize=this.remove(null);
	this._sort(asc);
	if(nullsize>0){
		var nullarr=[];
		for(;nullsize>0;nullsize--) {
			if(asc==false){
				this.splice(this.length,0,null);
			}
			else{
				this.splice(0,0,null);
			}
		}
	}
}
// 排序函数 true升序、false降序，默认升序
Array.prototype._sort=function(asc){
	var cmpvalue=asc!=false?1:-1
	var size=this.length;
	// shell排序法
	for (var step = size >> 1; step > 0; step >>= 1){
		for (var i = 0; i < step; ++i){
			for (var j = i + step; j < size; j += step){
				var k = j, value =this[j];
				
				while (k >= step && this[k - step]!=null && (this[k - step].compare(value))==cmpvalue){
					this[k]=this[k - step]
	   				k -= step;
					}					
				this[k]=value;
			}
		}
	}
}

// 筛选函数，可以支持通配符星号、问号
Array.prototype.filter=function(filter){
	var t=typeof(filter);
	if(t=='string'){
		return this._Stringfilter(filter);
	}
	if(t=='object'){
		return this._Objectfilter(filter);
	}
	if(t=='array'){
		
	}
	return this;
}
// 防止和JQuery冲突
Array.prototype.dofilter=function(filter){
	var t=typeof(filter);
	if(t=='string'){
		return this._Stringfilter(filter);
	}
	if(t=='object'){
		return this._Objectfilter(filter);
	}
	if(t=='array'){
		
	}
	return this;
}



Array.prototype._Stringfilter=function(filter){
	if(filter==null) return this
	var buf=[],regstr=eval("/(\\d+):"+filter.replace(/\*/ig,'.*').replace(/\?/ig,'.')+"/ig");
	for(var i=0,l=this.length;i<l;i++) buf.push(i+':'+this[i]+'\n')
	
	buf=buf.join('').match(regstr)
	if(buf==null) return [];
	buf=buf.join('\n').replace(regstr,'$1').split('\n');
	
	for(var i=0,l=buf.length;i<l;i++){
		buf[i]=this[buf[i]];
	}
	
	return buf
}

Array.prototype._Objectfilter=function(filter){
	if(filter==null) return this
	var buf=[];
	
	var regstr=["/(\\d+):"],fn=['function datafunction(d,i){return [i,":"'];
	for(var k in filter){
		var v=filter[k];
		if(v==null) continue;
		if(!Ext.lt.isArray(v)) v=[v];
		var matchstr=[],ms;
		for(var i=0,li=v.length;i<li;i++){
			matchstr.push(v[i].replace(/\*/ig,'.*').replace(/\?/ig,'.'));
		}
		regstr.push('@@',k,"##(",matchstr.join('|'),")@#");
		fn.push(',"@@',k,'##",d["',k,'"],"@#"');
	}
	fn.push('].join("")}');
	regstr.push('/ig');
	regstr=eval(regstr.join(''));
	eval(fn.join(''));
	
	
	for(var i=0,l=this.length;i<l;i++) buf.push(datafunction(this[i],i));
	
	buf=buf.join('\n').match(regstr);
	if(buf==null) return [];
	buf=buf.join('\n').replace(regstr,'$1').split('\n');
	
	for(var i=0,l=buf.length;i<l;i++){
		buf[i]=this[buf[i]];
	}
	
	return buf
}

// 添加删除空格的方法
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

// 对象输出模板
Ext.lt.out={};
Ext.lt.out.template=function(template){
	var _template=template;
	var _cmp={};
	var _fields=[];
	var _formatfn=null; // 格式化输出函数
	
	// 设置输出字段集合或字段名
	_cmp.setField=function(fs){
		if(!Ext.lt.isArray(fs)) fs=[fs];
		for(var i=0,l=fs.length;i<l;i++){
			_fields.push(fs[i]);
			_fields[fs[i]]=RegExp("#"+fs[i],"ig")
		}
		// 按字段长短排序
		var t=[],len,o;
		for(var i=0,l=_fields.length;i<l;i++){
			o=_fields[i];
			if(o==null)return;
			len=o.length
			if(len!=null && t[len]==null){
				t[len]=[];
			}
			t[len].push(o);
		}
		
		// 按字段属性由长到短重新生成
		var f=[],fi;
		for(var i=t.length-1;i>-1;i--){
			fi=t[i];
			if(fi==null) continue;
			f=f.concat(fi);
		}
		_fields.clear();
		_fields.add(f);
		
		// 根据字段名和输出模板生成输出函数
		var useredfield=[],outtext=[_template.replace(/(")/g,'\\\"')],r;
		function splitTemplate(f){
			var t=[],field='#'+f,size=outtext.length;
			for(var i=0;i<outtext.length;i++){
				t=outtext[i].split(field);
				if(t.length>1){
					outtext[i]=t[0];
					for(var m=1;m<t.length;m++){
						outtext.splice(i+m,0,t[m]);
						useredfield.splice(i+m-1,0,f);
					}
					i+=m.length-1;
				}
			}
		}
		for(var i=0,l=_fields.length;i<l;i++){
			splitTemplate(_fields[i]);
		}
		
		var outfn=['function templateoutfunction(d){ return ['];
		outfn.push('"',outtext[0],'"');
		for(var i=1,l=outtext.length;i<l;i++){
			outfn.push(',d["',useredfield[i-1],'"],"',outtext[i],'"');
		}
		outfn.push('].join("")}');
		eval(outfn.join(''));
		_formatfn=templateoutfunction;
	}
	
	
	_cmp.out=function(o){
		if(_formatfn!=null){
			return _formatfn(o);
		}
		// 复制输出摸板
		var str=_template+'',f
		for(var i=0,l=_fields.length;i<l;i++){
				f=_fields[i]
				if(o[f]==null){
					str=str.replace(_fields[f],'');
				}else if(typeof(o[f])!='function' && typeof(o[f])!='object'){
					str=str.replace(_fields[f],o[f]);
				}
		}
		return str;
	}
	
	return _cmp;
}


// 数据集对象
Ext.lt.recordset=function(obj){
	var _datas=[];
	    _datas.size=0;
	var _datas_all=[];
	    _datas_all.size=0
	var _columnNames=[];      // 列名即合
	var lt=Ext.lt;
	var _datatable;  // 数据表格对象
	var _asc=true;   // 升序排序，false时为降序排序
	var _total=-1;
	var dataSort=false;
	var _prejson=obj==null?false:true==obj.prejson; // 是否预处理导出JSON串
	var _version=(obj!=null&&obj.ver!=null)?obj.ver:'1.1';
	var _filter=[]; 	// 数据过滤调节集合
	var _locationposition=0;
	var maxlength=null;
	var sortobj=null;
	var compress=obj==null?2:(obj.compress==null?2:obj.compress);
	var _groupcolumn=null;
	var _groupdata=[];
		
	// 设置数据过滤条件，结构为{key1:[value1,value2,…],key1:[value1,value2,…],…}
	function _setFilter(filterset){
		// 清除原有过滤条件
		_filter=[];
		if(filterset!=null){
			for(var key in filterset){
				var values=filterset[key];
				// 保存过滤条件内容
				_filter.push(key);
				for(var i=0,l=values.length;i<l;i++){
					_filter['_k'+key+'_v'+values[i]]=true
				}
			}
		}
		// 过滤数据
		_filterData();
	}
	
	function _filterData(){
		if(_filter.length==0){
			_datas=_datas_all;
			_setSortId()
			return;
		}
		
		// 清空数据集
		_datas=[];
		// 验证数据，并将数据插入数据集中
		for(var i=0,n=_datas_all.length;i<n;i++){
			for(var j=0,l=_filter.length;j<l;j++){
				if(_filter['_k'+_filter[j]+'_v'+_datas_all[i][_filter[j]]]){
					// 发现匹配数据项，将匹配数据项添加到显示数组中
					_datas.push(_datas_all[i]);
					break;
				}
			}
		}
		_datas.size=_datas.length;
		_setSortId()
	}
	
	function _clearFilter(){
		_setFilter();
	}
			
	function _addData(d){
	
		// 保存数据副本
		_datas_all.push(d);
		_datas_all.size++;
		_fix(d);
	}
	
	function _fix(d){
		// 预处理成Json
		if(_prejson && d._jsonstring==null){
			var _temp=[];
			for (var i=0,l=_columnNames.size;i<l;) {
				_cn=_columnNames[i++]
				if(d[_cn]!=null)	_temp.push(_cn+":"+d[_cn]);
			}
			d._jsonstring='{'+_temp.join(',')+'}';
		}
		
		// 内部排序字段
		if(d._locationposition==null) d._locationposition=_locationposition++;
	}
	
	function _size(){
		return _datas.size;
	};

	function _getData(n){
		// 这里改为过滤数据
		return _datas[n];
	}
			
	function _insertData(i,d){
		var _newdatas=_datas_all.slice(0,i+1);
		var _newdatae=_datas_all.slice(i+1);
		
		// 对追加数据进行预处理
		for(var i=0,l=d.length;i<l;i++) _fix(d[i]);
		
		_datas_all=_newdatas.concat(d,_newdatae);
		_datas_all.size=_datas_all.length;
		_filterData();
		return ;
	}
	
	function _delData(fn,i){
		var _newdatas=[];
		_newdatas.size=0;
		
		var tmp,p=0;
		if(i==null)i=0;
		for(n=0,l=_datas_all.length;n<l;n++){
			tmp=_datas_all[n];
			if(n>=i){
				if(!fn(tmp)){
					_newdatas.push(tmp);
					_newdatas.size++
				}
			}
			else{
				_newdatas.push(tmp)
				_newdatas.size++
			}
		}
		_datas_all=_newdatas;
		_datas_all.size=_datas_all.length;
		_filterData();
	}
	
	function _delRow(rownum){
		if(!Ext.lt.isArray(rownum)) rownum=[rownum];
		var start=0,end=0,newdatas=[];
		
		// 删除指定数据并拼接新数组
		for(var i=0,l=rownum.length;i<l;i++){
			end=rownum[i]
			newdatas=newdatas.concat(_datas_all.slice(start, end));
			start=end+1;
		}
		newdatas=newdatas.concat(_datas_all.slice(start));
		
		_datas_all=newdatas;
		_datas_all.size=_datas_all.length;
		_filterData();
	}
	
	function _setData(n,data){
		//_datas[n]=data
		_datas_all[n].push(data);
		_filterData();
	}
	
	function _swap(i,j,arr){
		if(arr==null) arr=_datas;
		var d=arr[i];
		arr[i,arr[j]];
		arr[j,d];
	}
	
	// 排序函数
	function _sortArray(s,e,arr){
	
		//首行或末尾不排序
		var totval=null;
		if(_total>-1){
			totval=arr[_total];
			arr[_total]=null;
			arr.remove(null);
		}
		
		arr.sortArray(_asc);
		
		//首行或末尾不排序
		if(_total==0){
			arr=[].concat(totval, arr);
		}else if(_total>0){
			arr=arr.concat(totval);
		}
		//----------
		return arr;	
	}
	
	function _sortWithColumn(s,e,cname){

		var size=_size();
		/*
		// 快速排序法
		if (s == null) s = 0;
    if (e == null) e = size - 1;
    if (s >= e) return;
    _swap((s + e) >> 1, e);
    var index = s - 1;
    
    var d2=_getData(e);
    for (var i = s; i <= e; ++i){
    	var d1=_getData(i);
			if (d1[cname] <= d2[cname]){
				_setData(i,_getData(++index));
				_setData(index,d1);
			}
    }
        
    _sortWithColumn(s, index - 1,cname);
    _sortWithColumn(index + 1, e,cname);
		*/
		
		// shell排序法
			for (var step = size >> 1; step > 0; step >>= 1){
				for (var i = 0; i < step; ++i){
					for (var j = i + step; j < size; j += step){
						var k = j, data=_getData(j), value =data[cname];
						
						while (k >= step && (_getData(k - step)[cname]>value)==_asc){
							_setData(k,_getData(k - step));
							k -= step;
						}
						
						_setData(k,data);
					}
				}
			}
	}
	
	var _setColNames=function(cs){
		if(lt.isArray(cs)){
			_columnNames=[];
			for(var i=0,j=cs.length;i<j;i++){
				_columnNames[i]=cs[i];
				_columnNames[cs[i]]=i
			}	
			_columnNames.size=_columnNames.length;
		}
	}
	
	// 为显示的数据添加排序ID，属性名为_sortid
	function _setSortId(){
		for(var i=0,l=_datas.size;i<l;i++){
			_datas[i]['_sortid']=i;
		}
	}
	
	// 处理初始化数据集，将数据集重新转换为对象结构
	var start = new Date(),log=[];
	if(obj!=null && obj.columns!=null && obj.datas!=null){
		_setColNames(obj.columns);
		var m=0,n=obj.columns.length;
		var t,o,v,sv;
		var seqdata=obj.seqdata;
		var seqdatamap=obj.seqdatamap==null?{}:obj.seqdatamap;
		
		if(seqdata!=null){
			for(var i=0,j=seqdata.length;i<j;i++){
				seqdatamap['@'+i]=seqdata[i];
			}
		}

		log.push(new Date()-start);
		var l=0;
		
		if(compress==1 || _prejson==true){
			// 采用Map方式压缩或prejson方式压缩的解压
			var json=[],datas=obj.datas;
			for(var i=1,j=datas.length;i<j;i++){
				json.push(datas[i].join(''));
			}
			_datas_all=eval('(['+json.join(',')+'])');
			_datas_all.size=_datas_all.length;
			for(var i=0,j=_datas_all.length;i<j;i++) _datas_all[i]['_jsonstring']=json[i]
		}/*
		else if(compress==2){
			for(var i=0,j=obj.datas.length;i<j;i++){
				t=obj.datas[i],o={_locationposition:null};
				for(m=0;m<n;m++) if(t[m]!=null) o[_columnNames[m]]=t[m];
				_addData(o);
			}
		}*/
 		else if(compress==2){
			// 生成创建对象的函数
			var fnbuffer=['var buildobjectfunction=function(d){return {"_locationposition":_locationposition++']
			for(m=0;m<n;m++) fnbuffer.push(',"',_columnNames[m],'":d[',m,']');
			fnbuffer.push('}}')
			eval(fnbuffer.join(''));
			for(var i=0,j=obj.datas.length;i<j;i++){
				_addData(buildobjectfunction(obj.datas[i]));
			}
		}
		_locationposition=_datas_all.length;
		
		maxlength=obj.ml;
		log.push(l);
	}
		
	log.push(new Date()-start);


	_filterData();
	
	// 窗口退出时释放内存
	if(window.attachEvent){
		window.attachEvent('onunload',function(){
			_datas=null;
			_columnNames=null;
		});
	}
	else{
		window.addEventListener('unload',function(){
			_datas=null;
			_columnNames=null;
		});
	}
  // 公有方法
	return new function(){
		this.version="1.0";
		this.type="recordset";
		this.setTotal=function(v){
			if(v>=0)
			_total=v
		}
		// 返回数据集长度
		this.size=function(){return _size()};
		// 向数据集中追加数据
		this.setData=function(d,i){
			if(d==null) return;
			if(i==null){
				if(lt.isArray(d)){for(var n=0,l=d.length;n<l;n++){_addData(d[n]);}}
				else{_addData(d);}
			}
			else{
				if(!lt.isArray(d)){d=[d]}
				var data;
				for(var n=0,l=d.length;n<l;n++){
					data=_datas[i+n];
					if(data==null){
						d[n]['_locationposition']=_locationposition++;
					}
					else{
						d[n]['_locationposition']=data['_locationposition'];
					}
					_datas[i+n]=d[n]
				}
			}
			_filterData();
			if(sortobj!=null&&sortobj.col!=null&&i==null&&dataSort){
				this.sort(sortobj.col,sortobj.asc,sortobj.fn);
			}
			if(_datatable!=null) _datatable.reflash();
		}
		// 向数据集中的指定位置追加数据
		this.addData=function(d,i){
			if(i==null) i=this.size();
			if(lt.isArray(d)){
				//重设_locationposition;
				for(var loop=0,end=d.length;loop<end;loop++){
					d[loop]._locationposition=null;
				}
				_insertData(i,d)
			}else{
				d._locationposition=null;
				_insertData(i,[d])
			}
			
			if(_datatable!=null) _datatable.reflash();
		}
		this.join=function(dt,ip){
			if(ip==null) ip=this.size();
			// 向现有数据集中追加字段名
			var cs=dt.getColNames();
			if(lt.isArray(cs)){
				var cn;
				for(var i=0,j=cs.length;i<j;i++){
					cn=cs[i];
					if(_columnNames[cn]==null){
							// 现有数据集中没有该字段名，则追加字段名
							_columnNames[cn]=_columnNames.length;
							_columnNames.push(cn);
					}
				}	
			}
			
			// 向现有数据集中追加数据
			this.addData(dt.toArray(),ip);
		}
		
		this.toArray=function(){
			return _datas;
		}
		//从数据集中获取数据
		this.getData=function(n){
			return 	_getData(n);
		}
		this.getDataValue=function(n,name){
			var r=this.getData(n);
			return 	(r)?r[name]:r[columns[name]];
		}
		// 设置列名
		this.setColNames=function(cs){
			_setColNames(cs)
		}
		// 获取列名的数组
		this.getColNames=function(){
			if(_columnNames.length==0 && this.size()>0){
				var obj=this.getData(0);
				for(var n in obj){
					if('_locationposition'!=n ) _columnNames.push(n);
				}
			}
			
			var cols=[];
			for(var i=0,l=_columnNames.length;i<l;i++){
				var c=_columnNames[i];
				if('_locationposition'!=c && '_sortid'!=c && '_jsonstring'!=c) cols.push(c);
			}
			
			return cols;
		}
		// 循环结果集 fn 
		this.each=function(fn,s,l){
			if(!s){s=0}
			if(!l){l=this.size()}else{(s+l<this.size())?l=s+l:l=this.size()-l}
			for(;s<l;s++){
				fn(this.getData(s));
			}
		}
		
		this.bindTable=function(dt){
			_datatable=dt;
		}
		this.setDataSort=function(b){
			dataSort=b;
		}
		
		// 按指定字段分组，第二个参数为排序参数，true为升序、false为降序，默认升序。
		this.groupby=function(colname,asc){
			if(_groupcolumn!=null) _groupdata=[];
			_groupcolumn=colname;
			
			this.each(function(d){
				var v=d==null?null:d[colname];
				if(typeof(v)=='undefined'){
					d[colname]=null;
					v=null;
				}
				g=_groupdata['v:'+v];
				if(g==null){
					_groupdata['v:'+v]=[{colname:v,_datatye:'group'}]
					g=_groupdata['v:'+v];
					_groupdata.push(v);
				}
				g.push(d);
			})
						
			// 统计分组数据
			for(var i=0,l=_groupdata.length;i<l;i++){
				_groupdata['v:'+_groupdata[i]][0]['_groupdatasize']=_groupdata['v:'+_groupdata[i]].length-1
			}
			_groupdata.sortArray(asc);
		}
		this.getgrouncolum=function(){return _groupcolumn}
		this.getgroupinfo=function(colvalue){
			if(_groupdata['v:'+colvalue]==null) return null;
			return _groupdata['v:'+colvalue][0];
		}
		
		this.cleargroup=function(){
			_groupcolumn=null;
			_groupdata=[];
		}
		this.getgroupsize=function(){
			return _groupcolumn==null?0:_groupdata.length;
		}
		
		// 按照指定属性排序，使用谢尔排序法
		// 采用js页面排序时需要大量的从数组中获取数据对象再获取属性的操作，由于js是解释型语言。因此，频繁重复的操作会消耗大量的时间。
		// 因此，这次排序优化的方式时先将需要排序的内容保存到一个数组sortkey中，需要排序的数据按照排序内容分组保存到一个对象sortmap中。
		// 然后对sortkey中的内容进行排序，最后再将sortmap中的数据按sortkey中的顺序保存到结果集中
		this.sort=function(col,asc,fn){
			sortobj={col:col,asc:asc,fn:fn};
			if(col==null) col="_locationposition";
			_asc=asc==true;
			var start = new Date();
			
			// 采用分组排序优化方式提高排序速度
			var sortkey=[],sortmap={};
			var ds=this.toArray(),dobj,darr,dk;
			
			if(_groupcolumn==null) {
				// 按照排序字段分组
				for(var i=0,l=ds.length;i<l;i++){
					dobj=ds[i];
					dk=dobj[col];  // 此处应该转换为列显示的实际内容
					if(dk==null) dk='null';
	
					darr=sortmap['sk:'+dk];
					if(darr==null){
						darr=[];
						sortmap['sk:'+dk]=darr;
						sortkey.push(dk);
					}
					darr.push(dobj);
				}
			}
			else{
				var gkey;
				for(var gi=0,gl=_groupdata.length;gi<gl;gi++) sortmap['g:'+_groupdata[gi]]={};
				for(var i=0,l=ds.length;i<l;i++){
					dobj=ds[i];
					dk=dobj[col];  // 此处应该转换为列显示的实际内容
	
					darr=sortmap['g:'+dobj[_groupcolumn]][dk];
					if(darr==null){
						darr=[];
						sortmap['g:'+dobj[_groupcolumn]][dk]=darr;
					}
					if(sortkey['v:'+dk]==null){
						sortkey.push(dk);
						sortkey['v:'+dk]=''
						sortkey['sk:'+dk]=dk
					}
					darr.push(dobj);
					
				}
			}
	
			if(fn!=null){
				var dk,sk;
				for(var i=0,l=sortkey.length;i<l;i++){
					dk=sortkey[i];
					sk=fn(dk);
					sortkey[i]=sk;
					sortkey['sk:'+sk]=dk;
					sortmap['sk:'+sk]=sortmap['sk:'+dk];
				}
			}
			
			// 排序指定字段的值
			sortkey=_sortArray(null,null,sortkey);

			// 重新填充数据
			_datas=[];
			var sortgroupdata;
			if(_groupcolumn==null){
				for(var i=0,l=sortkey.length;i<l;i++){
					sortgroupdata=sortmap['sk:'+sortkey[i]]
					for(var j=0,m=sortgroupdata.length;j<m;j++){
						_datas.push(sortgroupdata[j]);
					}
				}
			}
			else{
				var gdata,temp={}
				
				for(var gi=0,gl=_groupdata.length;gi<gl;gi++){
					var gmap=sortmap['g:'+_groupdata[gi]]
					for(var i=0,l=sortkey.length;i<l;i++){
						if(gmap[sortkey['sk:'+sortkey[i]]]!=null)
							_datas=_datas.concat(gmap[sortkey['sk:'+sortkey[i]]]);
					}
				}
				
			}
			
			
			
			_datas.size=_datas.length;
			_setSortId()
			sortmap=null;
			sortkey=null;
			ds=null;
			dobj=null;
			darr=null;
			dk=null;
		}
		
		// 清除数据集内容
		this.clear=function(){
			_datas=null;
			_datas=[];
			_datas.size=0;
			_datas_all=null;
			_datas_all=[];
	    _datas_all.size=0
		}
		
		// 从指定位置开始删除数据
		this.delData=function(fn,i){
			_delData(fn,i);
			if(_datatable!=null) _datatable.reflash();
		}
		
		// 转换为JSON形式的字符串
		this.toJSON=function(){
			
			if(_prejson){
				var r=[];
				for(var i=0,li=_datas.size;i<li;i++){
					r.push(_datas[i]._jsonstring);
				}
				return '['+r.join(',')+']'.replace(/'/g,"\\\'").replace(/"/g,"\\\"");;
			}
			else{
				// 根据列名生成导出函数 
				/* */
				var fn=['function _toDataJSON(datas){var  str=["["],str1,data;for(var i=0,il=datas.length;i<il;i++){data=datas[i],str.push("{"),str1=[];'],cn,colnames=this.getColNames();
				for(var i=0,l=_columnNames.length;i<l;i++){
					cn=_columnNames[i];
					fn.push('var d=data["',cn,'"],dtype=typeof d;if(dtype!="undefined")if(dtype=="string"){str1.push("\\"',cn,'\\":\\""+d+"\\"")}else if(dtype=="number"){str1.push("\\"',cn,'\\":"+d)}else if(dtype=="boolean"){str1.push("\\"',cn,'\\":"+d.toString())}else{str1.push("\\"',cn,'\\":"+Object.toJSON(d))}');
				}
				
				fn.push('str.push(str1.join(","));str.push("},");} str.splice(str.length-1,1,"}");str.push("]");')
				
				
				fn.push('return str.join("");}');
				eval(fn.join(''));
				
				/*
				var _json=[];
				for(var i=0,l=_datas.length;i<l;i++){
					_json.push(_toDataJSON(_datas[i]));
				}
				return '['+_json.join(',')+']';
				*/
				
				return _toDataJSON(_datas);
				//return Object.toJSON(_datas);	
			}
		}
		
		// 转换为{columns:[],datas:[[],[]]}形式的字符串
		this.toArrayJSON=function(){
			var fn=['function _toDataArrayJSON(datas){var  str=[],_json=[];for(var i=0,l=datas.length;i<l;i++){var data=datas[i],str=[];'],cn,colnames=this.getColNames();
			for(var i=0,l=colnames.length;i<l;i++){
				cn=colnames[i];
				fn.push('var d=data["',cn,'"],dtype=typeof d;if(d==null){str.push("null")}else if(dtype=="string"){str.push("\\""+d+"\\"")}else if(dtype=="number"){str.push(d)}else if(dtype=="boolean"){str.push(d.toString())}else{str.push(Object.toJSON(d))}');
			}
			fn.push('_json.push("["+str.join(",")+"]");}return _json.join(',')}');
			eval(fn.join(''));
			
			return ['{columns:',Object.toJSON(colnames),',datas:[',_toDataArrayJSON(_datas),']}'].join('');
		}
		
		// 设置过滤条件，设置格式为{key:string/number/array[number/string],…}
		this.setFilter=function(filterset){
			for(var key in filterset){
				if(!Ext.lt.isArray(filterset[key])){
					filterset[key]=[filterset[key]];
				}
			}
			_setFilter(filterset);
		}
		this.sortobj=function(){
			if(sortobj!=null&&sortobj.col!=null){
				this.sort(sortobj.col,sortobj.asc,sortobj.fn);
			}
		}
		// 清除数据过滤
		this.clearFilter=function(){
			_clearFilter();
		}
		
		
		// 根据过滤条件查询数据集中的数据，过滤条件格式为{key:string/number/array[number/string],…}
		this.query=function(filterset){
			var r=[],keys=[];
			
			// 没有查询条件，返回全部数据
			if(filterset==null){
				return _datas_all;
			}
		
			// 生成查询索引
			if(filterset!=null){
				for(var key in filterset){
					keys.push(key);
				}
				
				for(var k=0,j=keys.length;k<j;k++){
					var values=filterset[keys[k]];
					if(!Ext.lt.isArray(values)) values=[values];
					for(var i=0,l=values.length;i<l;i++){
						filterset['_k'+keys[k]+'_v'+values[i]]=true
					}
				}
			}
		
			// 验证数据，并将数据插入数据集中
			var checkflag=true;
			for(var i=0,n=_datas_all.length;i<n;i++){
				checkflag=true;
				for(var j=0,l=keys.length;j<l;j++){
					if(filterset['_k'+keys[j]+'_v'+_datas_all[i][keys[j]]]!=true){
						// 发现匹配数据项，将匹配数据项添加到显示数组中
						checkflag=false;
						break;
					}
				}
				if(checkflag) r.push(_datas_all[i]);
				
			}
		
			return r;
		}
		
		// 从数据集中移除数据元素，移除的元素必须是从数据集中取出的对象
		this.remove=function(datas){
			if(!Ext.lt.isArray(datas)) datas=[datas];
			for(var i=0,l=datas.length;i<l;i++){
				datas['_locationposition'+datas[i]._locationposition]=true;
			}
			
			var _datas_all_new=[];
			for(var i=0,l=_datas_all.length;i<l;i++){
					if(datas['_locationposition'+_datas_all[i]._locationposition]!=true) _datas_all_new.push(_datas_all[i]);
			}
			_datas_all=_datas_all_new;
			_datas_all.size=_datas_all.length;
			_filterData();
			if(_datatable!=null) _datatable.reflash();
		}
		
		this.moveTo=function(s,e){
			var d=_getData(s);
		
			var _datas_all_new=[];
			for(var i=0,l=_datas_all.length;i<l;i++){
					if(i==e){ 
						_datas_all_new.push(d);
						d._locationposition=_locationposition++;
					}
					if(i!=s){ _datas_all_new.push(_datas_all[i]);}
					
					if(i>=e){
						_datas_all[i]._locationposition=_locationposition++;
					}
			}
			_datas_all=_datas_all_new;
			_datas_all.size=_datas_all.length;
			_filterData();
				if(_datatable!=null) _datatable.reflash();
		}
		
		this.select=function(fn){
			if(!Ext.lt.isFunction(fn)){
				return this;
			}
			
			var rs=new Ext.lt.recordset({columns:this.getColNames(),datas:[]}),ds=[];
			this.each(function(d){
				if(fn(d)) ds.push(d);
			});
			rs.addData(ds);
			return rs;
		}
		
		this.createMaxColLength=function(){
			maxlength=[];
			var collength=_columnNames.length
			for(var p=0;p<collength;p++) maxlength[p]=0;
			
			this.each(function(d){
				for(var n=0;n<collength;n++){
					var v=d[_columnNames[n]];
					if(v!=null && maxlength[n]<v.length) maxlength[n]=v.length;
				}
			},0,1000)
		}
		
		this.getMaxColDataLength=function(){
			if(maxlength==null) this.createMaxColLength();
			return maxlength;
		}
		
		this.getMaxLength=function(col){
			for(var i=0;i<_columnNames.length;i++){
				if(col==_columnNames[i]){
					if(maxlength==null) this.createMaxColLength();
					return maxlength[i];
				}
			}
			return 0;
		}
		this.setMaxLength=function(col,l){
			for(var i=0;i<_columnNames.length;i++){
				if(col==_columnNames[i]){ 
					maxlength[i]=l;
					return ;
				}
			}
		}
		this.delRow=function(rownum){
			_delRow(rownum)
			if(_datatable!=null) _datatable.reflash();
		}
		Ext.lt.message.hook("recordset","load",function(config){
			if(config.rs==this){this.clear();this.setData(config.data,0);}
		});
	}
}


/**
 * 属性动画实现类
 * 将给定对象添加属性动画实现方法。
 * 执行后，将给对象添加setAnimatProperty(proerty,start,end);
                       play(time,fn);
                       stop();
   三个方法
 */
Ext.lt.aninmation=function(elem){
	elem.animat={playtime:0,property:[],timer:0,starttime:0};
	
	elem.setAnimatProperty=function(proerty,start,end){
		this.animat.property.push({"name":proerty,"start":start,"end":end});
	}
	
	// 终止动画播放
	elem._stop=function(){
		if(this.animat.timer!=0){
			clearInterval(this.animat.timer);
			
			var l=this.animat.property.length;
			for(var i=0;i<l;i++){
				var pro=this.animat.property[i];
				this._changeAnimatProperty(pro.name,0,pro.end,-1);
			}

			this.animat.timer=0
			this.animat.playtime=0;
			this.animat.property=[];
			
			if(Ext.lt.isFunction(this.animat.endfn)) this.animat.endfn();
		}
	}
	
	elem._changeAnimatProperty=function(proerty,start,end,run){
		var v=end;
		if(run>0){
			var x=Math.sqrt(run/this.animat.playtime);
			v=start+((end-start)*(x));
		}
		
		if(proerty.indexOf('style')==0){
			this.style[proerty.replace('style\.','')]=v+'px';
		}
		else{
			this.setAttribute(proerty,v);
		}
	}
	
	elem._play=function(){
		var p=new Date()-this.animat.starttime;
		// 判断动画是否结束
		if(p>=this.animat.playtime){
			this._stop();
			return;
		}
		
		var l=this.animat.property.length;
		for(i=0;i<l;i++){
			var pro=this.animat.property[i];
			this._changeAnimatProperty(pro.name,pro.start,pro.end,p);
		}
		
	}
	
	// 播放动画
	elem.play=function(time,fn){
		// 检查当前是否有动画在运行
		if(this.animat.timer!=0){
			this._stop();
		}
		
		this.animat.playtime=time;
		this.animat.starttime=new Date();
		this.animat.timer=setInterval( Ext.lt.util.fnbind(this._play,elem),1);
		this.animat.endfn=fn;
	}
	
	return elem;
}
Ext.lt.token=new function(){
	var tokenid=null;
	function getTokenid(win){
		if(tokenid!=null)return tokenid;
		if(win==null)return null;
		var sear=win.location.search;
		if(sear.indexOf('tokenid')!=-1){
			tokenid=sear.substr(sear.indexOf("tokenid=")+8,40);
		}else{
			if(win.parent==window){return tokenid;}
			return getTokenid(win.parent);
		}
		return tokenid;
	}
	this.getTokenid=function(){
		return getTokenid(window);
	}
	this.urlAddToken=function(URL){
		if(URL.indexOf('tokenid')!=-1){
			return URL;
		}else{
			var t=this.getTokenid();
			if(URL.indexOf('?')==-1){
				URL+='?tokenid='+t;
			}else{
				URL+='&tokenid='+t;
			}
			return URL
		}
		
	}
}
Ext.lt.RCP = new function () {
	var _param="";
	function setAllParameters(param){
		if(param!=null)
		_param="&"+param;
	}
	function getAllParameters(){
		return _param;
	}
	function setParameters(param){
		_param='&'+param;
		return _param;
	}
	
	this.setAllParameters=function(param){
		setAllParameters(param);
	}
	this.getAllParameters=function(){
		return getAllParameters()
	}
	this.setParameters=function(param){
		setParameters(param)
	}
	var _lt=Ext.lt;
	// 远程调用日志
	var _remotelog = [];
	var _url = "";
	//try{_url=_ROOT_PATH_;}catch(e){}
	function _getUrl(){
		var _url=Ext.lt.serverUrl;
		try{_url=_ROOT_PATH_;}catch(e){}
		return _url;
	}
	function _getUrlServer(){
		var pn=window.location.pathname;
		if(pn.indexOf('.page')!=-1){
			pn=pn.substr(0,pn.indexOf('.page'))
		}else if(pn.indexOf('.jsp')!=-1){
			pn=pn.substr(0,pn.indexOf('.jsp'))
		}else if(pn.indexOf('.do')!=-1){
			pn=pn.substr(0,pn.indexOf('.do'))
		}
		return _ROOT_PATH_+'/'+pn;
	}
	// 调用页面请求，将页面信息加载到指定div上。
	this.iframe = function (url,divid) {
		var iframe=document.createElement("iframe");
		var div=document.getElementById(divid);
		div.appendChild(iframe);
		iframe.width="100%";
		iframe.height="100%";
		iframe.src=url;
		
	}
	
	// 远程调用方法
	// server    服务ID，使用组件初始化时框架提供的服务引用参数
	// m         方法名
	// paramets  参数集合，可以是简单变量，如数字、文本等，多个参数需要使用数组形式
	// callbakfn 回调函数，服务端执行结果对象化后直接作为第一个参数，第二个参数表示服务端是否有错误。
	// falsefun  远程调用异常时执行该方法，并返回错误码
	this.call = function (server, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var callfn = arguments.callee.caller;
		if (server == null || m == null) {
			return;
		}
		var para = "";
		para += "method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "."+server + ".rcp";
		if(Ext.lt.demomode){
			this.demoCall(remote_url+'?'+para,callbakfn);
		}
		else{
			new Ajax.Request(_getUrl()+server + ".rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param, 
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//禁止读取缓存数据
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));	
						}
						return;
					}
					else{
						// 产生成功调用日志
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
						if(callbakfn!=null) {
							try{
								callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
							}catch(e){
								console.error("执行RCP.call请求回调方法出现异常!\r错误原因："+e.message+"\n错误现场:"+callfn.toString());
								throw e;
							}
						}
					}
				}
			});
		}
	};
	// 远程调用方法
	// server    服务ID，使用组件初始化时框架提供的服务引用参数
	// m         方法名
	// paramets  参数集合，可以是简单变量，如数字、文本等，多个参数需要使用数组形式
	// callbakfn 回调函数，服务端执行结果对象化后直接作为第一个参数，第二个参数表示服务端是否有错误。
	// falsefun  远程调用异常时执行该方法，并返回错误码
	this.asyncall = function (server, m, parameters,falsefun) {
		///defaulttitleservice.rcp
		if (server == null || m == null) {
			return;
		}
		var para = "";
		para += "method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "."+server + ".rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
			new Ajax.Request(_getUrl()+server + ".rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param, 
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//禁止读取缓存数据
				asynchronous: false,
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				}
			});
			return resps;
		}
	};
		//同步调用
	this.asynserver = function (serverid, m, parameters,falsefun) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		para += "serverid=" + serverid;
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
				// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrlServer() +"/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				}
				
			});
			return resps;
		}
	};
//--------------
	this.asynserverNotParamts = function (serverid, m, parastr,falsefun) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		if(parastr==null)parastr='';
		para += "serverid=" + serverid;
		para += "&method=" + m;
		para += "&" + parastr;
				// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrlServer() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				}
			});
			return resps;
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.serverNotParamts = function (serverid, m, parastr, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		if(parastr==null)parastr='';
		para += "serverid=" + serverid;
		para += "&method=" + m;
		para += "&" + parastr;
		// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var ajax=new Ajax.Request(_getUrlServer() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
				}
			});
		}
	};
//----------------
	this.asynserverNotEncode = function (serverid, m, parameters,falsefun) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		para += "serverid=" + serverid;
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + Object.toJSON(parameters);
			}
			else{
				para += "&paramjson=" +Object.toJSON([parameters]);;
			}
		}
				// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrlServer() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				}
			});
			return resps;
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.serverNotEncode = function (serverid, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = [];
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		if (null != parameters) {
			para.push("&paramjson=",Object.toJSON(_lt.isArray(parameters)?parameters:[parameters]));
		}
		para=para.join('');
		// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var ajax=new Ajax.Request(_getUrlServer() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
				}
			});
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.server = function (serverid, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = [];
		var callfn = arguments.callee.caller;
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		if (null != parameters) {
			para.push("&paramjson=",encodeURIComponent(Object.toJSON(_lt.isArray(parameters)?parameters:[parameters])));
		}
		para=para.join('');
		// 验证系统运行模式，如果为演示模式，则使用本地数据文件模拟远程调用
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			//var ajax=new Ajax.Request(_getUrlServer() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid(),{
			//var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid(),{
			var ajax=new Ajax.Request(_getUrlServer() +"/webservice.rcp?"+new Date()+"&tokenid="+Ext.lt.token.getTokenid()+_param,{
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					if(resp.status!=200){
						// 产生错误调用日志
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText;
						if(err==null||err==''){
							err=resp.statusText;
						}
						if(resp.status==12029){
							err="网络不通，连接失败!"
						}
						if(resp.status==404){
							err="请求未找到!"
						}
						if(falsefun==null){
							alert(decodeURIComponent(err));
						}
						else{
							falsefun(decodeURIComponent(err));
						}
						return;
					}
					// 产生成功调用日志
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) {
						try{
							callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);	
						}catch(e){
							console.error("执行RCP.server请求回调方法出现异常!\n错误原因："+e.message+"\n错误现场:"+callfn.toString());
							throw e;
						}
					}
				}
			});
		}
	};
	
	this.script = function ( serverid, m, parameters, callName) {
		if (callName == null || m == null || serverid == null) {
			return false;
		}
		var httpurl = "";
		var para = "";
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		//new Ext.lt.util().createScript(httpurl + "/" + serverid + ".script?" + para, serverid);
		// 生成返回的变量名
		var returnname="servrereturnvalue" + _lt.getNextSeqValue();
		if(Ext.lt.demomode){
			this.demoCall("." + serverid + ".script?returnname="+returnname+"&"+ para,callName);
		}
		else{
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + serverid + ".script?returnname="+returnname+"&"+ para+_param;
			s.onreadystatechange = function () {
				if (this.readyState == "complete" || this.readyState == "loaded") {
					// 产生失败调用日志
					if (callName != null) {
						callName(eval(returnname));
						try{
						_remotelog.push({'calltype':'script','httpurl':"."+serverid + ".script?returnname="+returnname+"&"+ para,'response':returnname+'='+eval(returnname).toJSON(),'result':'success','calltime':new Date()});
						}catch(e){}
					}
				}
			};
			document.getElementsByTagName("HEAD")[0].appendChild(s);
		}
	};
	
	
	this.script = function (httpurl, serverid, m, parameters, callName,jsessionid) {
		if (callName == null || m == null || serverid == null) {
			return false;
		}
		if (httpurl == null || httpurl == "") {
			httpurl = "";
		}
		var para = "";
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + Object.toJSON(parameters);
			}
			else{
				para += "&paramjson=" +Object.toJSON([parameters]);
			}
		}
		if(jsessionid!=null){
			jsessionid='&seesionid='+jsessionid;
		}else{
			jsessionid=''
		}
		//new Ext.lt.util().createScript(httpurl + "/" + serverid + ".script?" + para, serverid);
		// 生成返回的变量名
		var returnname="servrereturnvalue" + _lt.getNextSeqValue();
		if(Ext.lt.demomode){
			this.demoCall("." + serverid + ".script?returnname="+returnname+"&"+ para,callName);
		}
		else{
		//获取系统时间，防止请求地址相同不再发送请求
		 var date = new Date();
		 /*  
         var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+sysTime;
			*/
		    var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
       //  var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + "/" + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+sysTime+_param;
			//s.src = httpurl + "/" + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+1;
			s.onreadystatechange = function () {
				if (this.readyState == "complete" || this.readyState == "loaded") {
					// 产生失败调用日志
					if (callName != null) {
						callName(eval(returnname));
						try{
						_remotelog.push({'calltype':'script','httpurl':"."+serverid + ".script?returnname="+returnname+"&"+ para,'response':returnname+'='+eval(returnname).toJSON(),'result':'success','calltime':new Date()});
						}catch(e){}
					}
				}
			};
			document.getElementsByTagName("HEAD")[0].appendChild(s);
		}
	};
	this.down=function(serverid, m, parameters,target){
		var para = [];
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		/*if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + Object.toJSON(parameters);
			}
			else{
				para += "&paramjson=" +Object.toJSON([parameters]);
			}
		}*/
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				//para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
				//para.push("&paramjson=",encodeURI(encodeURI(Object.toJSON(parameters))));
				var paramjson=Object.toJSON(parameters);
			}
			else{
				//para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
				//para.push("&paramjson=",encodeURI(encodeURI(Object.toJSON([parameters]))));  
				var paramjson= Object.toJSON([parameters]);  
			}
			
		}
		para=para.join('');
		var url=_getUrlServer() + "/webservicedown.rcp?"+para+_param;
		var turl = Ext.lt.token.urlAddToken(url);
		//window.open("about:blank",target==null?"_blank":target);
		var iframe,iframeId="downIframeId";
		iframe=document.getElementById(iframeId);
		var iframediv=document.getElementById("downIframeId_div");
		if(!iframe){			
			iframe=document.createElement('iframe');
			iframe.id=iframeId;
			iframe.name="mydown";
			document.body.appendChild(iframe);//把form放到页面里
			var div=document.createElement("div");
			div.id="downIframeId_div";
			div.innerHTML="<form  action='' method='post' target='mydown'><input name ='paramjson' value=''/></form>";
			div.style.display='none';
			document.body.appendChild(div);
			iframediv=document.getElementById("downIframeId_div");
		}
		iframe.style.width=0;
		iframe.style.height=0;
		iframediv.firstChild.action=turl;
		iframediv.firstChild.firstChild.value=encodeURIComponent(paramjson);
		iframediv.firstChild.submit();
		
		
		
		
		
		//iframe.src=turl+'&paramjson='+encodeURIComponent(paramjson);
//			document.body.removeChild(iframe);
	};
	// 采用本地数据文件模拟远程调用
	this.demoCall = function(httpurl,callbakfn){
		for(var i=0;i<Ext.lt.demodatamap.length;i++){
			if(Ext.lt.demodatamap[i].httpurl==httpurl){
				if(null!=callbakfn){
					window.setTimeout ((function(){callbakfn(Ext.lt.demodatamap[i].value); }),100);
					return ;
				}else{
					return Ext.lt.demodatamap[i].value;
				}
			}
		}
	};
	// 增加调试快捷键'ctrl+shift+r'
	var _RCPlogWindow=null;
	Ext.lt.regKeyEvent('r',function(){
		var event = window.event;
		if(event.shiftKey && event.ctrlKey && event.keyCode==18){
			// 生成日志表格及调用日志
			var logtable=[],logscript=[],tmp=[];
			var log;
			logtable.push('<table border=1 width="100%"><tr><td>访问时间</td><td>调用类型</td><td>请求</td><td>服务端响应</td><td>返回值</td></tr>');
			for(var i=0,loop=_remotelog.length;i<loop;){
				log = _remotelog[i++];
				logtable.push('<tr><td>');
				logtable.push(log.calltime);
				logtable.push('</td><td>');
				logtable.push(log.calltype);
				logtable.push('</td><td>');
				logtable.push(log.httpurl);
				logtable.push('</td><td>');
				logtable.push(log.result);
				logtable.push('</td><td >');
				if(log.response.length>197){
					logtable.push(log.response.substring(0,197)+'...');
				}else{
					logtable.push(log.response);
				}
				logtable.push('</td></tr>');

				tmp.push('Ext.lt.demodatamap.push({"httpurl":\'');
				tmp.push(log.httpurl);
				tmp.push('\',"value":');
				tmp.push(log.response);
				tmp.push('});');
				logscript.push(tmp.join(''));
				tmp=[];
				//logscript.push();
				//logscript.push();
				//logscript.push();
				//logscript.push();
			}
			logtable.push('</table>');
			
			
			if(_RCPlogWindow==null){
				_RCPlogWindow=Ext.lt.window({title:"查看调用日志", w:406, h:481,close:true,pop:true,mark:false});
				var _div=document.createElement("div");
				document.body.appendChild(_div);
				_div.style.height='450px';
				_div.style.width='400px';
				_div.innerHTML="<button onclick='Ext.lt.message.send(\"RCPlogWindow\",\"logtable\")'>查看调用日志</button><button onclick='Ext.lt.message.send(\"RCPlogWindow\",\"logscript\")'>生成模拟数据</button><div id='_RCPlogWindow_div' style='height:428px;width:400px;overflow:scroll;font-size:12px;'></div>";
				_RCPlogWindow.draw(_div);
				document.getElementById('_RCPlogWindow_div').innerHTML=logtable.join('');
				Ext.lt.message.hook("RCPlogWindow","logtable",function(){
					document.getElementById('_RCPlogWindow_div').innerHTML=logtable.join('');
				});
				Ext.lt.message.hook("RCPlogWindow","logscript",function(){
					document.getElementById('_RCPlogWindow_div').innerHTML=logscript.join('\n');
				});
			}
			_RCPlogWindow.show();

		}
	},true,true);
	
};



/**
  终端调用
  在远程调用的同时，在客户端提供一个显示终端，可以将服务端信息推送到客户端显示
  提供多种终端显示方式：如进度条、信息提示、滚动信息等
*/
Ext.lt.RCPConsole=new function(){
	var _url = "";
	//try{_url=_ROOT_PATH_;}catch(e){}
	function _getUrl(){
		var _url=Ext.lt.serverUrl;
		try{_url=_ROOT_PATH_;}catch(e){}
		return _url;
	}
	// 控制请求超时的定时器
	var _timeout_interval=0;
	// 用于获取控制太输出的定时器
	var _console_interval=0;
	// 终端是否已经插入到页面中
	var _tipsappend=false;
	var _tipsconsolediv=document.createElement('DIV');
	_tipsconsolediv.className='rcpconsole';
	_tipsconsolediv.style.display='none';
	_tipsconsolediv.consoletype=null;
	var _closebtn=null;
	var _messagediv=null;
	var _processdiv=null;
	
	// 关闭终端窗口，清除输出内容，关闭遮罩
	function _close(){
		clearInterval(_timeout_interval);
		clearInterval(_console_interval);
		_console_interval=0;
		_timeout_interval=0;
		_tipsconsolediv.style.display='none';
		if(_messagediv!=null)_messagediv.innerHTML='';
		if(_processdiv!=null)_processdiv.style.width='0px';
		Ext.lt.HTML.unmark();
	}
	
	// 显示终端，在达到超时时间之后显示关闭按钮，默认15秒
	function _showtipsconsole(timeout){
		timeout=timeout==null?15:timeout;
		if(_tipsconsolediv.consoletype!='tips'){
			_tipsconsolediv.innerHTML='<table cellpadding="0" cellspacing="0" background="0" width="100%"><tr><td nowrap="nowrap" class="ll">&nbsp;</td><td nowrap="nowrap" class="l_loading"><img src="'+Ext.lt.ltextpath+'/images/rcpconsole/wait.gif"></td><td nowrap="nowrap" class="l_loading"><div class="console"></div></td><td nowrap="nowrap" width="12px" valign="top" align="right" class="l_loading title"><button class="closebtn" type="button" overclass="closebtn_over" title="关闭"></button></td><td nowrap="nowrap" class="lr">&nbsp;</td></tr></table>';
			document.body.appendChild(_tipsconsolediv);
			// 查找关闭按钮
			var l=_tipsconsolediv.firstChild.cells.length;
			_closebtn=_tipsconsolediv.firstChild.cells.item(l-2).firstChild;
	    _closebtn.style.display='none';
	    _closebtn.onclick=_close;
	    // 查找输出数据的位置
	    _messagediv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild
			_tipsconsolediv.consoletype='tips';
		}
		
		_tipsconsolediv.style.display='';
		Ext.lt.HTML.center(_tipsconsolediv);
		
		// 超时后显示关闭窗口
		_timeout_interval=setInterval(function(){
			_closebtn.style.display='';
		},timeout*1000)
	}
	
	this.tipscall=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'call'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	this.tipsserver=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'server'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	this.tipsserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'serverNotEncode'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	function buildtipsconsole(config){
		
		Ext.lt.HTML.mark();
		_showtipsconsole(config.timeout);
		
		// 提示框架开启终端
		config.m+="&rcpconsole=tips&noserveranalyselog=true"
		var callbakfn=config.callbakfn
		var falsefun=config.falsefun
		
		_timeout_interval=1;
		function _console_function(){
			var messagediv=_messagediv;
			Ext.lt.RCP.server('com.longtu.framework.rpcfw.termial.RCPConsoleComponentService','getConsoleMessage',null,function(msg){
				if(_timeout_interval==0) return;
				if(msg==null) return _console_continue_function();
				msg.each(function(text){
					var lastdiv = messagediv.lastChild;
					if(lastdiv!=null && lastdiv.doaninmation==null){
						Ext.lt.aninmation(lastdiv);
						lastdiv.setAnimatProperty('style.marginTop',0,-1*_messagediv.offsetHeight);
						lastdiv.play(200,function(){lastdiv.removeNode(true)});
						lastdiv.doaninmation=true
					}
					
					var msgdiv=document.createElement('DIV');
					msgdiv.className='tipsmsg';
					msgdiv.style.cssText='width:'+(_messagediv.offsetWidth)+'px;Height:'+(_messagediv.offsetHeight)+'px';
					msgdiv.innerHTML=text;
					messagediv.appendChild(msgdiv);
				});
				_console_continue_function();
			})
		}
		
		function _console_continue_function(){
			setTimeout(_console_function,100);
		}
		_console_continue_function();
		
		
		// 重载回调函数
		Ext.lt.RCP[config.rcptype](config.serverid, config.m, config.parameters, function(rs){
			_close();
			callbakfn(rs)
		}, function(rs){
			_close();
			if(falsefun!=null)falsefun(rs)
		});
		
	}
	
	//底部进度条不生效使用遮罩层进度条
	function _showprocessconsole_bottom(timeout){
		var _doc = document;
		if(self.frameElement){
			_doc = window.parent.document;
			window.parent.showFramemark();
			_tipsconsolediv=_doc.createElement('DIV');
			_tipsconsolediv.className='rcpconsole';
			_tipsconsolediv.style.display='none';
			_tipsconsolediv.consoletype=null;
		}else{
			Ext.lt.HTML.mark();
		}
		
		var progressdiv = _doc.getElementById("bottom_processdiv");
		timeout=timeout==null?15:timeout;
		if(_tipsconsolediv.consoletype!='process'){
			_tipsconsolediv.className='rcpconsole_bottom';
			_tipsconsolediv.innerHTML='<div class="console">'+
			'<div class="lt"><div class="process0"><div class="process100"></div></div></div><div class="processmsg" ></div>'+
			'<button class="bottom_closebtn" type="button"  title="关闭"></button></div>';
			
			progressdiv.appendChild(_tipsconsolediv);
			// 查找关闭按钮
			var consolediv=_tipsconsolediv.firstChild;
			_closebtn=consolediv.lastChild;
	    _closebtn.style.display='none';
	    _closebtn.onclick=_close;
	    // 查找进度条位置
	    _processdiv=consolediv.firstChild.firstChild.firstChild;
	    _processdiv.style.width='1px'
	    // 查找输出数据的位置
	    _messagediv=consolediv.firstChild.nextSibling;
			_tipsconsolediv.consoletype='process'
		}
		
		_tipsconsolediv.style.display='';
		Ext.lt.HTML.center(_tipsconsolediv);
		//edited zhangkai993 增加信息层的zindex，避免被遮罩层覆盖
		_tipsconsolediv.style.zIndex=Ext.lt.getNextZIndex();
		// 超时后显示关闭窗口
		_timeout_interval=setInterval(function(){
			_closebtn.style.display='';
		},timeout*1000)
	}
	
	// 显示终端，在达到超时时间之后显示关闭按钮，默认15秒
	function _showprocessconsole(timeout){
		Ext.lt.HTML.mark();
		timeout=timeout==null?15:timeout;
		if(_tipsconsolediv.consoletype!='process'){
			_tipsconsolediv.innerHTML='<table cellpadding="0" cellspacing="0" background="0" width="100%"><tr><td nowrap="nowrap" class="ll">&nbsp;</td><td nowrap="nowrap" class="l_loading"><div class="console"><div class="lt"><div class=""><div class="process100"></div></div></div><div class="processmsg" ></div></td><td nowrap="nowrap" width="12px" valign="top" align="right" class="l_loading title"><button class="closebtn" type="button" overclass="closebtn_over" title="关闭"></button></td><td nowrap="nowrap" class="lr">&nbsp;</td></tr></table>';
			document.body.appendChild(_tipsconsolediv);
			// 查找关闭按钮
			var l=_tipsconsolediv.firstChild.cells.length;
			_closebtn=_tipsconsolediv.firstChild.cells.item(l-2).firstChild;
	    _closebtn.style.display='none';
	    _closebtn.onclick=_close;
	    // 查找进度条位置
	    _processdiv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild.firstChild.firstChild.firstChild;
	    _processdiv.style.width='1px'
	    // 查找输出数据的位置
	    _messagediv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild.lastChild
			_tipsconsolediv.consoletype='process'
		}
		
		_tipsconsolediv.style.display='';
		Ext.lt.HTML.center(_tipsconsolediv);
		//edited zhangkai993 增加信息层的zindex，避免被遮罩层覆盖
		_tipsconsolediv.style.zIndex=Ext.lt.getNextZIndex();
		// 超时后显示关闭窗口
		_timeout_interval=setInterval(function(){
			_closebtn.style.display='';
		},timeout*1000)
	}
	this.processcall=function(serverid, m, parameters, callbakfn, falsefun,showfn){
		var config={timeout:15,rcptype:'call'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		config['showfn']=showfn
		
		buildprocessconsole(config);
	}
	this.processserver=function(serverid, m, parameters, callbakfn, falsefun,showfn){
		var config={timeout:15,rcptype:'server'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		config['showfn']=showfn
		
		buildprocessconsole(config);
	}
	this.processdown=function(serverid, m, parameters){
		var iframe=document.getElementById("processdown");
		if(iframe==null){
			iframe=document.createElement("iframe");
			iframe.style.display ="none";
			document.body.appendChild(iframe);
		}
		this.processserver(serverid, m, parameters,function(){
			var url=_getUrl() + "/consoledown.rcp";
			iframe.src =url;
			//window.open(url);
		})
	}
	this.processserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun,showfn){
		var config={timeout:15,rcptype:'serverNotEncode'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		config['showfn']=showfn
		
		buildprocessconsole(config);
	}
	this.processdownNotEncode=function(serverid, m, parameters){
		var iframe=document.getElementById("processdown");
		if(iframe==null){
			iframe=document.createElement("iframe");
			iframe.style.display ="none";
			document.body.appendChild(iframe);
		}
		this.processserverNotEncode(serverid, m, parameters,function(){
			var url=_getUrl() + "/consoledown.rcp";
			iframe.src =url;
			//window.open(url);
		})
	}
	function buildprocessconsole(config){
		var showfn = config.showfn;
		if(typeof(showfn)!="undefined"){
			try{
				eval(showfn+'('+config.timeout+')');
			}catch(e){
				_showprocessconsole(config.timeout);
			}
			
		}else{
			_showprocessconsole(config.timeout);
		}
		
		
		// 提示框架开启终端
		config.m+="&rcpconsole=process&noserveranalyselog=true"
		var callbakfn=config.callbakfn
		var falsefun=config.falsefun
		
		_console_interval=1;
		function _console_function(){
			var messagediv=_messagediv;
			
			// 通过同步调用获取返回值
			Ext.lt.RCP.server('com.longtu.framework.rpcfw.termial.RCPConsoleComponentService','getProcessMessage',null,function(msg){
				if(_console_interval==0) return;
				
				var p=msg.process;
				_processdiv.style.width=Math.round(_processdiv.parentElement.offsetWidth*p)+'px';
				
				if(msg.text==null) return _console_continue_function();
				msg.text.each(function(text){
					messagediv.innerHTML=text
				});
				_console_continue_function();
			});
		}
		
		function _console_continue_function(){
			setTimeout(_console_function,100);
		}
		_console_continue_function();
		
		// 重载回调函数
		Ext.lt.RCP[config.rcptype](config.serverid, config.m, config.parameters, function(rs){
			_processdiv.style.width=_processdiv.parentElement.offsetWidth+'px';
			_close();
			if(self.frameElement){
				if(window.parent.closeFramemark!=null)
				window.parent.closeFramemark();
			}
			callbakfn(rs);
		}, function(rs){
			_processdiv.style.width=_processdiv.parentElement.offsetWidth+'px';
			_close();
			if(self.frameElement){
				window.parent.closeFramemark();
			}
			if(falsefun!=null)falsefun(rs);
		})

	}
	
	
}
//针对现有请求增加注解的支持。
Ext.lt.RCPAnnotation = new function () {
	var _param="&isMethodValue=true";
	function _callbakfn(resp,callbakfn){
		var runfnstr=resp.runfn;
		var v=resp.value;
		var wlf=runfnstr.indexOf('window.location.href');
		var wlt=runfnstr.indexOf('tokenid=');
		if(wlf!=-1&&wlt==-1){
			var firstLength=runfnstr.indexOf('\";',wlf);
			var tokenid=Ext.lt.token.getTokenid();
			if(tokenid!=null){
				if(runfnstr.indexOf('?',wlf)==-1){
					runfnstr=runfnstr.substring(0,firstLength)+"?tokenid="+tokenid+runfnstr.substring(firstLength);
				}else{
					runfnstr=runfnstr.substring(0,firstLength)+"&tokenid="+tokenid+runfnstr.substring(firstLength);
				}
			}
		}
		eval("Ext.lt.RCPAnnotation.ComponentMethodValue=function(ComponentMethodValue){"+runfnstr+"}");
		Ext.lt.RCPAnnotation.ComponentMethodValue(v);
		if(callbakfn!=null){
			callbakfn(v);
		}
	}
	this.call = function (server, m, parameters, callbakfn, falsefun) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCP.call(server, m, parameters, function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.asyncall = function (server, m, parameters,exception) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		var resp=Ext.lt.RCP.asyncall(server, m, parameters,exception);
		Ext.lt.RCP.setParameters(bakParam);
		_callbakfn(resp);
		return resp;
	};
	this.asynserver = function (server, m, parameters,exception) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		var resp=Ext.lt.RCP.asynserver(server, m, parameters,exception);
		Ext.lt.RCP.setParameters(bakParam);
		_callbakfn(resp);
		return resp;
	};
	this.asynserverNotParamts = function (server, m, parameters,exception) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		var resp=Ext.lt.RCP.asynserverNotParamts(server, m, parameters,exception);
		Ext.lt.RCP.setParameters(bakParam);
		_callbakfn(resp);
		return resp;
	};
	this.serverNotParamts = function (server, m, parameters, callbakfn, falsefun) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCP.serverNotParamts(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.asynserverNotEncode = function (server, m, parameters,exception) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		var resp=Ext.lt.RCP.asynserverNotEncode(server, m, parameters,exception);
		Ext.lt.RCP.setParameters(bakParam);
		_callbakfn(resp);
		return resp;
	};
	this.serverNotEncode = function (server, m, parameters, callbakfn, falsefun) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCP.serverNotEncode(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.server = function (server, m, parameters, callbakfn, falsefun) {
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCP.server(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.tipscall=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.tipscall(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.tipsserver=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.tipsserver(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.tipsserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.tipsserverNotEncode(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.processcall=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.processcall(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.processserver=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.processserver(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
	this.processserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun){
		var bakParam=Ext.lt.RCP.getAllParameters();
		Ext.lt.RCP.setAllParameters(_param);
		Ext.lt.RCPConsole.processserverNotEncode(server, m, parameters,  function(resp){_callbakfn(resp,callbakfn)}, falsefun)
		Ext.lt.RCP.setParameters(bakParam);
	};
};


Ext.lt.util = new function () {
	// 记录当前页面加载过的js
	var JSCACH=[];
	this.hiddselect=function(flag){
		var selects = document.getElementsByTagName("SELECT");
		var formObj = document.getElementById("advancedQueryForm")
		if(selects!=null&&selects.length>0){
			for(var i=0;i<selects.length;i++){
				var obj = selects[i];
				if(formObj != null ){
					if(formObj.contains(obj)){
						continue;
					}
				}
				
				if(flag){
					obj.style.visibility='hidden';
					obj.style.display='none';
				} else {
					obj.style.visibility='visible';
					obj.style.display='inline';
				}
			}
		}
	}
	this.createScript = function (srcIp, divId) {
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		s.src = srcIp;
		return s;
	};
	this.createScript = function (srcIp, divId, fn) {
		if(JSCACH[srcIp]){
			if(fn!=null){
				fn();
			}
			return;
		}
		
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		s.src = srcIp+"?id"+Math.random();
		s.onload = s.onreadystatechange = function(){
			//这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
			if(!this.readyState|| 
			// 这是IE的判断语句
			this.readyState=='loaded' || this.readyState=='complete' ) {
				if (fn != null) {
					fn();
				}
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		JSCACH[srcIp]=true
		return s;
	};
	this.createStylesheet = function (srcIp, divId) {
		var s = document.createElement("LINK");
		s.id = "cgi_LINK_list" + divId;
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		s.type = "text/css";
		s.rel='stylesheet';
		s.href = srcIp;
	};
	this.addTablPanel = function (title, panel, tablpanelid) {
		Ext.getCmp(tablpanelid).add({title:title, items:[panel]}).show();
	};
	this.setText=function(txt){
		return window.clipboardData.setData("text",txt);
	};
	this.fnbind=function(fn,context){
		if (arguments.length < 2 && context===undefined) return fn;  
		var method = fn//,args=arguments
		//slice = Array.prototype.slice,  
		//args = slice.call(arguments, 2) ;  
		return function(){ 
			//var array = slice.call(arguments, 0);  
			//return method.apply(context,args.concat(array))  
			return method.apply(context,arguments)  
		} 
	};
	this.checkData=function(data){
		var check=/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
		if(check.test(data)){
			return true;
		}
		return false;
	};
	this.clone=function(obj){
		return Ext.lt.clone(obj);
	};
		//返回值 0成功
	//返回值 1含有非数字类型的
	//返回值 2小于最小值
	//返回值 3大于最大值
	//返回值 4where时候失败
	this.checkNumber=function(num,min,max,wherefn){
		if(isNaN(num)){
			return 1;
		}
		if(min!=null&&num<min){
			return 2;
		}
		if(max!=null&&num>max){
			return 3;
		}
		if(wherefn!=null&&!wherefn(num)){
			return 4;
		}
		return 0;
	};
	
	this.JSON=new function(){
		this.decode=function(json){
			return eval("(" + json + ')');
		}
		
	};
	var userdataDiv;
	this.setUserData=function(key,headString){
	    try{
		    if(typeof(userdataDiv)=="undefined"){
		    	createUserDataDiv();
		    }
	    	obj = userdataDiv;
		    if(obj==null) return;
		    if(key==null) return;
		    var isIE = Ext.lt.isie;
	    	var _user ="";
	    	var _path = location.pathname;
	    	if(typeof(current_user)!="undefined"){
	    		_user = current_user;
	    	}
	    	var newKey = (_path+_user).md5();
	    	if(window.localStorage){
				localStorage.setItem(newKey+"_"+key,headString);
			}else  if(isIE){   
			    with(window.document.body)
			    {
			    	obj.load(newKey);	//防止文件指向错误
			        obj.setAttribute(key,headString);
			        obj.save(newKey);
			    }
			}
		}catch(ex){
		} 
	};
	this.getUserData=function(key){ 
	    var headString;
	    try{
		    if(typeof(userdataDiv)=="undefined"){
		    	createUserDataDiv();
		    }
	    	obj = userdataDiv;
		    if(obj==null) return null;
		    if(key==null) return null;
		    var isIE = Ext.lt.isie;
	    	var _user ="";
	    	var _path =location.pathname;
	    	if(typeof(current_user)!="undefined"){
	    		_user = current_user;
	    	}
	    	var newKey = (_path+_user).md5();
	    	if(window.localStorage){
			    headString = localStorage.getItem(newKey+"_"+key);
			}	else  if(isIE){
			    with(window.document.body)
			    {
			       try{
			    	obj.load(newKey); 
			        headString = obj.getAttribute(key);
			       }catch(ex){
			       }  
			    }
			}
		}catch(ex){
		} 
		return headString;
	}
	this.removeUserData = function(key){
		   try{ 
			    if(typeof(userdataDiv)=="undefined"){
			    	createUserDataDiv();
			    	obj = userdataDiv;
			    }
			   if(obj==null) return null;
			   if(key==null) return null;
			   var isIE = Ext.lt.isie;
		    	var _user ="";
		    	var _path =location.pathname;
		    	if(typeof(current_user)!="undefined"){
		    		_user = current_user;
		    	}
		    	var newKey = (_path+_user).md5();
		    	if(window.localStorage){
				    headString = localStorage.removeItem(newKey+"_"+key);
				}else if(isIE){
				    with(window.document.body)
				    {
				    	obj.load(newKey); 
				        obj.removeAttribute(key);
				        obj.save(newKey); 
				    }
			    }
		    }catch(ex){
		    } 
	}
	function createUserDataDiv(){
		if(typeof(userdataDiv)=="undefined"){
			userdataDiv= document.createElement("div");
			userdataDiv.style.behavior="url(#default#userData)";
			userdataDiv.style.display="none";
			userdataDiv.style.height="0";
			userdataDiv.style.widtht="0";
	        document.body.appendChild(userdataDiv);
		}
	}
};

if(Ext.lt.HTML==null)
Ext.lt.HTML=new function(){
	var _returnOffset = function(l, t) {
	  var result = [l, t];
	  result.left = l;
	  result.top = t;
	  return result;
	};
	
	var _camelize=function(style) {
    var parts = style.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = parts[0].charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  };
  
	
	this.removeNode=function(n){
		if(n && n.removeNode && n.tagName != 'BODY'){
			n.innerHTML='';
			n.removeNode();
		}
		else if(n && n.parentNode && n.tagName != 'BODY'){
			n.parentNode.removeChild(n);
		}
		
	}
		
  this.hiddenAll=function(sels){
  	var sel;
  	for(var i=0,l=sels.length;i<l;i++){
  		sel=sels.item(i);
  		if(Ext.lt.HTML.getRealStyle(sel).display!='none'){
  			sel.style.display='none';
  			sel._marked=true;
  		}
  	}
	}
	
  this.showAll=function(sels){
  	var sel;
  	for(var i=0,l=sels.length;i<l;i++){
  		sel=sels.item(i);
  		if(sel._marked){
  			sel.style.display='';
  		}
  	}
	}
	
	this.setOpacity=function(el,n){
		if(Ext.lt.isie && Ext.lt.documentmode<10){
			el.style.filter="Alpha(Opacity="+n+")";
		}
		else{
			el.style.opacity=n<1?n:(n/100);
		}
		
	}
	
  this.markload=function(el,flag){
  	Ext.lt.HTML.mark(el,flag);
  	if(flag==null) flag=true;
  	if(el==null) el=document.body;
	if(el.initmark.loaddiv==null){
		el.initmark.loaddiv=document.createElement("div");
		document.body.appendChild(el.initmark.loaddiv);
		el.initmark.loaddiv.className="markload";
	}
  	if(flag){
  		el.initmark.style.display='';
  	}
	Ext.lt.message.hook("mark","endresize",resizeMarkLoad);
  }
  function resizeMarkLoad(el){
	  		var t=el.initmark.clientTop;
	  		var l=el.initmark.clientLeft;
	  		var h=el.initmark.clientHeight;
	  		var w=el.initmark.clientWidth;
	  		el.initmark.loaddiv.style.left=(w-32)/2+l
	  		el.initmark.loaddiv.style.top=(h-32)/2+t
  	}
  // 遮罩指定HTML元素
  // 改用DIV遮罩
  this.mark=function(el,flag){
  	if(flag==null) flag=true;
  	if(el==null) el=document.body;
  	
  	
  	function elresize(){
  		if(el.tagName=="BODY"){
			_pw=document.documentElement.clientWidth;
			_ph=document.documentElement.clientHeight;
			}
			else{
				_pw=el.offsetWidth-parseInt(el.currentStyle.marginLeft,10)-parseInt(el.currentStyle.marginRight,10);
				_ph=el.offsetHeight-parseInt(el.currentStyle.marginTop,10)-parseInt(el.currentStyle.marginBottom,10);
			}
			el.initmark.style.width=_pw+'px';
  		el.initmark.style.height=_ph+'px';
  		Ext.lt.message.send("mark","endresize",el);
  	}
  	
		var _pl=0,_pt=0;
  	if(el.tagName=='BODY'){
	  	_pl=0,_pt=0;
		}
		else{
			var _p=this.positionedOffset(el,null,false);
			_pl=_p.left,_pt=_p.top;
		}
  	
  	if(el.initmark==null){
  		var isCSS3=!(Ext.lt.isie && Ext.lt.documentmode<10);
  		el.initmark=document.createElement('IFRAME');
  		el.initmark.assdiv=document.createElement('DIV');
  		el.initmark.style.cssText="border:0;display:none;position:absolute;background-color:#000;height:0px;left:"+_pl+"px;top:"+_pt+"px;"+(isCSS3?"opacity:0.5;":"filter:Alpha(Opacity=50)");
  		el.initmark.assdiv.style.cssText="display:none;position:absolute;background-color:#000;"+(isCSS3?"opacity:0.5;":"filter:Alpha(Opacity=50)");
  		
  		Ext.lt.aninmation(el.initmark)
  		document.body.appendChild(el.initmark);
  		document.body.appendChild(el.initmark.assdiv);
  	}
  	// 启动遮罩
  	if(flag==true){
  		// 已经遮罩成功了
  		if(el.initmark.style.display=='') return false;
  		var _pw=0,_ph=0;
  		if(el.tagName=="BODY"){
				_pw=document.documentElement.scrollWidth;
				_ph=document.documentElement.scrollHeight;
			}
			else{
				var cstyle=Ext.lt.HTML.getRealStyle(el);
				_pw=el.offsetWidth-parseInt(cstyle.marginLeft,10)-parseInt(cstyle.marginRight,10);
				_ph=el.offsetHeight-parseInt(cstyle.marginTop,10)-parseInt(cstyle.marginBottom,10);
				
			}
			// 隐藏所有不能被遮罩的HTML对象
	  	Ext.lt.HTML.hiddenAll(el.getElementsByTagName('SELECT'));
	  	Ext.lt.HTML.hiddenAll(el.getElementsByTagName('OBJECT'));
	  	
	  	//Ext.lt.HTML.hiddenAll(el.getElementsByTagName('IFRAME'));
  		
			//el.initmark.contentWindow.document.write('<html><body style="background-color:#000"></body></html>');
  		el.initmark.style.display='';
  		el.initmark.style.zIndex=Ext.lt.getNextZIndex();
  		el.initmark.style.width=_pw+'px';
  		el.initmark.style.height='0px';
  		
  		el.initmark.assdiv.style.display='';
  		el.initmark.assdiv.style.zIndex=Ext.lt.getNextZIndex();
  		el.initmark.assdiv.style.left=_pl+"px";
  		el.initmark.assdiv.style.top=_pt+"px";
  		el.initmark.assdiv.style.width=_pw+"px";
  		el.initmark.assdiv.style.height=_ph+"px";

  		el.initmark.setAnimatProperty("style.height",0,_ph);
  		//时间控制下
  		el.initmark.play(0,function(){
  			 Ext.lt.message.hook("layout","endlayout",elresize);
  			 // 增加div遮罩处理鼠标事件问题
  		}); 
  		
  		return true;
  	}
  	else{
			// 隐藏所有不能被遮罩的HTML对象
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('SELECT'));
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('OBJECT'));
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('IFRAME'));
	  	
	  	if(el.initmark.loaddiv!=null){el.initmark.loaddiv.style.display='none';}
  		// 消除遮罩
  		Ext.lt.message.unhook("layout","endlayout",elresize);
  		Ext.lt.message.unhook("mark","endresize",resizeMarkLoad);
  		el.initmark.style.display='none';
  		el.initmark.assdiv.style.display='none';
  		Ext.lt.layout.doLayout();
  		return true;
  	}
  }
  this.unmark=function(el){
  	if(el==null) el=document.body;
  	Ext.lt.HTML.mark(el,false);
  	
  }
  
  // 让指定的HTML对象定位到屏幕中间
  this.center=function(el){
  	var left=isNaN(document.documentElement.scrollLeft)?0:document.documentElement.scrollLeft+(document.documentElement.clientWidth-el.offsetWidth)/2
		var top=isNaN(document.documentElement.scrollTop)?0:document.documentElement.scrollTop+(document.documentElement.clientHeight-el.offsetHeight)/3
		
		if(top<0){
			el.runtimeStyle.height=(document.body.offsetHeight-50)+'px';
			top=30;
		}
		el.style.left=left+'px'
		el.style.top=(top)+'px'
  }
  
  // 返回对象实际的样式
  this.getRealStyle=function(el){
  	return el.currentStyle? el.currentStyle :el.style;
  }
  
  this.getBodyHeight=function(){
  	return $(window).height();

  }
  
  // 生成拖拽操作
  this.drag=function(cfg){
	var el=cfg.element;
	var endfn=cfg.onend==null?function(){}:cfg.onend;
	var startfn=cfg.onstart==null?function(){}:cfg.onstart;
	var holder=cfg.holder!=false; // 控制是否显示占位符
	var _x=cfg.x;
	var _y=cfg.y;
	var _dragel=cfg.dragel==null?el:cfg.dragel;
	var _el_zindex=el.style.zIndex;
	var _nomove=cfg.nomove==true;
  	
  	// 生成占位标签
	_dragel._placeholder=document.createElement('DIV');
	_dragel._placeholder.style.cssText='border:#999999 2px dotted;display:none';
	
	Ext.lt.bindEvent(el,'onmousedown',function(){
		var pos=Ext.lt.HTML.positionedOffset(_dragel,document.body,false);
		(cfg.x==null)? _x=window.event.screenX-pos.left:_x=cfg.x;//-window.event.offsetX;
		(cfg.y==null)? _y=window.event.screenY-pos.top:_y=cfg.y;//-window.event.offsetY;
	})

	// 鼠标按下后开始拖动
	el.onselectstart=function(){
		startfn.apply(el);
		
		// 保存鼠标相对位置
		var pos=Ext.lt.HTML.positionedOffset(_dragel,document.body,false);
		var oldposition=_dragel.style.position;
		_dragel.style.position='absolute';
		_dragel.style.left=(window.event.screenX -_x)+"px";
		_dragel.style.top=(window.event.screenY-_y)+"px";
		_el_zindex=el.style.zIndex;
		_dragel.style.zIndex=Ext.lt.getNextZIndex();
		_dragel.style.cursor='pointer';
		// 通过插入占位符记录HTML元素原有位置
		_dragel.insertAdjacentElement('beforeBegin',_dragel._placeholder);
		if(!_nomove)document.body.appendChild(_dragel);

		// 显示占位DIV
		if(holder){
			_dragel._placeholder.style.display='block';
			_dragel._placeholder.style.width=(_dragel.offsetWidth-4)+'px';
			_dragel._placeholder.style.height=(_dragel.offsetHeight-4)+'px';
		}
	
		document.body.onmousemove=function(){
			_dragel.style.left=(window.event.screenX -_x)+'px';
			_dragel.style.top=(window.event.screenY-_y)+'px';
		}
		
		// 鼠标抬起后停止拖动
		document.body.onmouseup=function(){
			document.body.onmousemove=null;
			document.body.onmouseup=null;
			_dragel.style.cursor='';
			
			if(_dragel==null) return;
			if(holder) _dragel._placeholder.style.display='none';
			if(!_nomove)_dragel._placeholder.insertAdjacentElement('beforeBegin',_dragel);
			_dragel.style.position=oldposition;
			if(_el_zindex>0) _dragel.style.zIndex=_el_zindex;
			
			endfn.apply(el);
		}
		return true;
	}
	
	//el.onselect=function(){return false};
	//el.onselectstart=function(){return false};
	el.ondragstart=function(){return false};

	
}
	
	this.positionedOffset=function(element,endel,flag) {
    var valueT = 0, valueL = 0;
    if(flag==null) flag=true;
    if(endel==null) endel=document.body;
    if(element==endel) return _returnOffset(0, 0);
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element == endel) break;
        var p = this.getStyle(element, 'position');
        if ((p == 'relative' || p == 'absolute') && flag) break;
      }
    } while (element);
    return _returnOffset(valueL, valueT);
  };
  
  function buildBorderSetObject(r){
  	r.left=r[0];
  	r.right=r[1];
  	r.top=r[2];
  	r.bottom=r[3]
  	r.width=r.left+r.right;
  	r.height=r.top+r.bottom;
  	
  	return r;
  }
  
  // 获取指定HTML元素的四个边宽度
  this.getBorderSet=function(element,sty,attr){
  	var r=[0,0,0,0];
  	attr=attr==null?['Left','Right','Top','Bottom']:attr;
  	sty=sty==null?['padding','margin','border']:sty;
  	if(element==null) return buildBorderSetObject(r);
  	var v=0
  	var v=0,styleobj,num
  	for(var i=0;i<sty.length;i++){
  		for(var j=0;j<attr.length;j++){
  			styleobj=Ext.lt.HTML.getRealStyle(element);
  			num=styleobj[sty[i]+attr[j]+(sty[i]=='border'?'Width':'')]
  			v=parseInt(num,10);
  			r[j]+=isNaN(v)?0:v;
  		}	
  	}

  	return buildBorderSetObject(r);
  }
  
  this.getStyle=function(element, style) {
    //element = $(element);
    style = style == 'float' ? 'cssFloat' : _camelize(style);
    var styleobj=element.currentStyle?element.currentStyle:element.style
    var value = styleobj[style];
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  }
  
  this.setStyle=function(element, styletext) {
    var sty=styletext.split(';');
    var s,k,v;
    for(var i=0,l=sty.length;i<l;i++){
    	s=sty[i].split(':');
    	if(s.length!=2) continue;
			k=s[0],v=s[1];
    	k = k == 'float' ? 'styleFloat' : _camelize(k);
   		element.style[k]=v;
    }
  }
  
  this.setRuntimeStyle=function(element, styletext) {
    var sty=styletext.split(';');
    var s,k,v;
    for(var i=0,l=sty.length;i<l;i++){
    	s=sty[i].split(':');
    	if(s.length!=2) continue;
			k=s[0],v=s[1];
    	k = k == 'float' ? 'cssFloat' : _camelize(k);
   		element.runtimeStyle[k]=v;
    }
  }
  
  this.clearRuntimeStyle=function(ele){
  	var rsty=ele.runtimeStyle;
  	rsty.cssText="";
  }
  
  var _switchgroup={}; // 保存开关组
  Ext.lt.onload(function(){
  	
  	if(Ext.lt.isie && Ext.lt.documentmode>8){
		HTMLElement.prototype.getUniqueID=function(){
	  		if(this.uniqueID==null){
	  			this.uniqueID="htmlelement"+Ext.lt.getNextSeqValue();
	  		}
	 		return this.uniqueID;
	 	}
	 }else if(!Ext.lt.isie ){
		 HTMLElement.prototype.getUniqueID=function(){
	  		if(this.getAttribute("uniqueID")==null){
	  			this.setAttribute("uniqueID","htmlelement"+Ext.lt.getNextSeqValue());
	  		}
	  		return this.getAttribute("uniqueID");
  		}
  	}
	  
  	
  	Ext.lt.bindEvent(document.body,'onmouseout',function(event){
	  	var el=event.srcElement;
	  	if(el==null) return;
	  	try{
		  	while(el!=null){
		  		var attr=el.getAttribute("overclass"),flag=false;
		  		if(attr!=null){
		  			var uniqueID = el.uniqueID;
		  			if(uniqueID==null) uniqueID=el.getUniqueID();
		 			el.className=_expandelement[uniqueID];
		  			flag=true;
		  		}
		  		
		  		attr=el.getAttribute("overstyle");
		  		if(attr!=null){
						el.runtimeStyle.cssText='';
						flag=true;
		  		}
		  		
		  		//if(flag) return
		  		el=el.parentElement;
		  	}
		  }
		  catch(e){}
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmousedown',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	var attr1=el.getAttribute("clickstyle");
		  	if(attr!=null){
		  		el.className=attr;
		  	}
		  	if(attr1!=null){
			  	el.rsty=el.runtimeStyle.cssText;
		  		Ext.lt.HTML.setRuntimeStyle(el,attr1);
		  	}
		  }
		  catch(e){
		  }
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmouseup',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;  		
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	var el=event.srcElement;
  			var uniqueID=el.uniqueID;
	  		if(uniqueID==null) uniqueID=el.getUniqueID();
		  	if(attr!=null) el.className=el.overclass==null?_expandelement[uniqueID]:el.overclass;
	  		if(el.rsty!=null)	el.runtimeStyle.cssText=el.rsty;
		  }
		  catch(e){}
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmouseover',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;	  	
	  	try{
	  		do{
			  	var attr=el.getAttribute("overclass");
			  	if(attr!=null){
			  		var uniqueID=el.uniqueID;
			  		if(uniqueID==null) uniqueID=el.getUniqueID();
			  		if(_expandelement[uniqueID]==null) _expandelement[uniqueID]=el.className;
			  		el.className=attr;
			  	}
			  	
			  	var attr=el.getAttribute("overstyle");
			  	if(attr!=null){
			  		el.runtimeStyle.cssText=attr;
			  	}
			  	
			  	el=el.parentElement;
			  }while(el!=null)
		  }
		  catch(e){}

	  });
  })
  
  
  function getElementExpAttr(el){
  	return {attroverclass:el.getAttribute("overclass")}
  }
  
  
  
  
  
  // 扩展鼠标移入、移出、点击样式 overclass clickclass  
  // 处理分组样式属性，包括switchclass、switchgroup、switch
  function expandHTMLElementSwitchStyle(el){
  	var switchclass=el.getAttribute('switchclass');
  	if(switchclass==null) return;
  	
  	var switchgroup=el.getAttribute('switchgroup');
  	
  	// 开关样式，指鼠标点击以后样式改变，再点击一次后恢复的效果，同一组的开关按钮只能有一个被按下
		el.onswitchclass=Ext.lt.util.fnbind(function(){  		
			if(this.switchon){
				this.className=this.getAttribute("switchclass");
			}
			else{
				this.className=_expandelement[this.uniqueID];
			}
		},el);
		
		
		el.switchon=false;
		Ext.lt.bindEvent(el,'onclick',Ext.lt.util.fnbind(function(){
			// 修改开关状态
			this.switchon^=true
			
			var group=_switchgroup[this.getAttribute("switchgroup")];
			if(group!=null){
				// 开始进行分组检查，并跳过其他按钮的分组检查
				window.switchgroupskip=true;
				var grouptype='',tmp=this.getAttribute("switchgroup").split(':'),otherclear=false;
				if(tmp.length>1) grouptype=tmp[1];
					
				for(var i=0,l=group.length;i<l;i++){
					// 将本组中的其他选中项清除选中状态
  				if(group[i].switchon && group[i]!=this){
  					//group[i].fireEvent('onclick');
  					// 修改选中状态
  					group[i].switchon^=true
  					// 处理样式
  					group[i].onswitchclass()
  					otherclear=true
  				}
  			}
  			
  			// 强制选中一个，不能取消选中状态
  			if('clockone'==grouptype && this.switchon==false && !otherclear) this.switchon=true;
  			
  		}
  		
  		this.onswitchclass();
  		
		},el));
	
  	// _switchgroup 处理开关组
  	if(switchgroup!=null){
  		var group=_switchgroup[switchgroup];
  		if(group==null){group=[];_switchgroup[switchgroup]=group}
  		group.push(el);
  		
			// 替换删除方法，删除对象之前检查对象
			el.oldremoveNode=el.removeNode;
			el.removeNode=function(flag){
				_switchgroup[this.getAttribute("switchgroup")].remove(this);
				this.oldremoveNode(flag);
			}
  	}
  	
  	if(el.getAttribute('switch')=='on') Ext.lt.fireEvent(el,"onclick");
  }
  
  
  function expandEditHTMLElement(el,tagName){
		// 可编辑控件方法绑定
		if((tagName=='INPUT' && el.type=='text')||tagName=='TEXTAREA'){
			expandINPUTHTMLElement(el);
		}
		// select 控件绑定方法
		else if(tagName=='SELECT'){
			expandSELECTHTMLElement(el);
		}
  }
  
  var _expandelement={};

  // 界面中的HTML元素很多，对全部进行扩展没有必要，因此，这里设置筛选功能
  var _StyleExpanderHTMLTag={'SPAN':true,'DIV':true,'FONT':true,'LI':true,'TD':true,'TH':true,'A':true,'BUTTON':true};
  var _EditHTMLExpander={'INPUT':true,'BUTTON':true,'TEXTAREA':true,'SELECT':true};
  
	function isinclude(uniqueID){
		return uniqueID!=null?_expandelement[uniqueID]!=null:false;
	}
	

  
  // 增加鼠标移入、移出、点击时的样式控制，
  // 属性名 overclass overstyle clickclass clickstyle switchstyle switchclass switchgroup switch
  // 为input select 控件添加数据绑定方法
  function _expandHTMLElement(el){
  	var tagname=el.tagName,uniqueID=el.uniqueID;
  	// 如果是已经处理过扩展属性的HTML元素则直接退出
 		if(el.getAttribute('ignoreexpand')=='true') return;
 		if(isinclude(uniqueID)) return;
  	
  	if(_StyleExpanderHTMLTag[tagname]){
  		_expandelement[uniqueID]=el.className;
  		el.setInnerHTML=innerHTMLsetter;
  		expandHTMLElementSwitchStyle(el);  		
  	}
  	else if(_EditHTMLExpander[tagname]){
  		_expandelement[uniqueID]=el.className;
  		expandEditHTMLElement(el,tagname);
  	}
  }
  this.expandHTMLElement=function(el){_expandHTMLElement(el)}
  
  var func_bind=function(ds){
			if(ds==null) ds={};
			this._binddataset=ds;
			if(ds[this.name]==null) ds[this.name]='';
			this.value=ds[this.name]
			this.defaultValue=ds[this.name];
		}
  
  // 扩展Input对象的属性
  var expandINPUTHTMLElement=function(el){
		// 添加数据绑定方法 bind，参数为数据对象，绑定后与数据对象中name同名属性的值进行绑定。
		// 数据绑定只支持 type为 checkbox hidden password radion text 对text类型将绑定更多行为
		el.bind=Ext.lt.util.fnbind(function(ds){
			if(ds==null) ds={};
			this._binddataset=ds;
			if(ds[this.name]==null) ds[this.name]='';
			this.defaultValue=ds[this.name];
			this.settext(ds[this.name]);
		},el);
		
		el.settext=Ext.lt.util.fnbind(inputsetvalue,el);
		el.setvalue=function(v){el._binddataset[el.name]=v};
		// 获取对象绑定数据
		el.getBindValue=Ext.lt.util.fnbind(function(){	return this._binddataset[this.name];},el);
		el.getValue=function(){var tips=this.getAttribute("tipstext"),v=this.value;if(tips==null){return v}else{if(v==tips){return ''}else{return v}}}
		// 失焦点时处理绑定数据，并触发绑定数据修改后的事件
			var mutl = el.getAttribute("mutldata");
			if(mutl){
				Ext.lt.bindEvent(el,'onblur',Ext.lt.util.fnbind(htmlelementbindMutl,el));
			}else{
				Ext.lt.bindEvent(el,'onblur',Ext.lt.util.fnbind(htmlelementbind,el));
			}
		
		// 重置文本框的内容
		el.reset=htmlelementreset;
		// 增加输入校验功能
		if(el.getAttribute('validchars')!=null || el.getAttribute('notvalidchars')!=null || el.getAttribute('validreg')!=null || el.getAttribute('notvalidreg')!=null){
		
			Ext.lt.bindEvent(el,'onkeyup',Ext.lt.util.fnbind(validinput,el));
			Ext.lt.bindEvent(el,'onpaste',Ext.lt.util.fnbind(validClipboardData,el));
		}
		// 如果是文本框，增加默认值输出功能
		if(el.type=='text' && el.getAttribute("tipstext")!=null){
			el.tipstext=el.getAttribute("tipstext");
			Ext.lt.bindEvent(el,'onfocus',Ext.lt.util.fnbind(inputdefaulttips,el));
			Ext.lt.bindEvent(el,'onblur',Ext.lt.util.fnbind(inputdefaulttips,el));
			// el.fireEvent('onblur');
			inputdefaulttips.apply(el,[{type:'blur'}]);
		}
		// 扩展键盘事件操作
		// {keycode:fn} keycode以u开头表示键盘抬起时触发
		// left:37 up:38 right:39 down:40 space:32 enter13
		el.onKey=function(keyevent){
			var _keydownevent={};
			var _keyupevent={};
			
			var fn;
			for(var key in keyevent){
				fn=keyevent[key];
				if(key.charAt(0)=='u'){
					key=key.substring(1);
					if(!isNaN(parseInt(key,10))){
						_keyupevent['k'+key]=fn;
					}
					else{
						_keyupevent[key]=fn;
					}
				}
				else{
					if(!isNaN(parseInt(key,10))){
						_keydownevent['k'+key]=fn;
					}
					else{
						_keydownevent[key]=fn;
					}
				}
			}
			if(_keydownevent['*']!=null) _keydownevent['k*']=_keydownevent['*'];
			if(_keyupevent['*']!=null) _keyupevent['k*']=_keyupevent['*'];
			
			Ext.lt.bindEvent(el,'onkeydown',function(en){
				var r=true;
				if(_keydownevent['k'+en.keyCode]!=null){
					r=r&(_keydownevent['k'+en.keyCode].apply(el,[en])!=false);
				}
				if(_keydownevent['k*']!=null){
					r=r&(_keydownevent['k*'].apply(el,[en])!=false);
				}
				return r;
			});

			Ext.lt.bindEvent(el,'onkeyup',function(en){
				var r=true;
				if(_keyupevent['k'+en.keyCode]!=null){
					r=r&(_keyupevent['k'+en.keyCode].apply(el,[en])!=false);
				}
				if(_keyupevent['k*']!=null){
					r=r&(_keyupevent['k*'].apply(el,[en])!=false);
				}
				return r;
			});
		}
		
		// 特殊类型文本框
  }
  
  // 扩展Select对象的属性
  var expandSELECTHTMLElement=function(el){
		// 从Select标签中读取数据，并转换成RecordSet对象
		el.readData=Ext.lt.util.fnbind(function(){
			var opts=el.options,opt,v=[];
			for(var i=0,l=opts.length;i<l;i++){
				opt=opts.item(i);
				if(opt.selected){
					_selectValue=opt.value;
					_selectText=opt.text;
				}
				v.push([opt.text,opt.value,opt.selected,opt.getAttribute("py")]);	
			}
			return new Ext.lt.recordset({columns:['t','v','s','p'],datas:v});
		},el);
  }
  
  var valid=function(nstr){
  	if(nstr==null) return;
  	if(nstr.srcElement!=null){
	  	// 获取输入按键的编码
		 	var keycode=event.keyCode;
			if(keycode<41 && keycode>36) return true; // 方向键
			if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // 回车、tab键 del键 退格键
		 	// 转换为字符
		 	if(keycode>128 && keycode<256) keycode-=128;
			nstr=String.fromCharCode(keycode)
	  }
	  
  	if(this.validchars!=null){
  		if(this.validchars.indexOf(nstr)==-1) return false;
  	}
		if(this.notvalidchars!=null){
  		if(this.notvalidchars.indexOf(nstr)>-1) return false;
  	}
  	if(this.validreg!=null){
  		if(!eval('('+this.validreg+')').test(nstr)){
  			return false;
  		}
  	}
  	if(this.notvalidreg!=null){
  		if(eval('('+this.notvalidreg+')').test(nstr)) return false;
  	}

		return true;  	
  }
  
  var validinput=function(){
  	var txt=this.value,char,i=0,v=[],f=false;
  	
  	for(l=txt.length;i<l;i++){
  		char=txt.charAt(i)
  		if(!valid.apply(this,[char])){
  			Ext.lt.HTML.minitips(this,char+'&nbsp;不能录入');
  			f=true
  		}
  		else v.push(char);
  	}
  	
  	if(f){
			r = document.selection.createRange(); 
			r.collapse(false); 
			r.setEndPoint("StartToStart", this.createTextRange());
			point= r.text.length;
  		this.value=v.join('');
			r.move("character", point-1); 
			r.select();
  	}
  	return true;
  }
  
  var inputdefaulttips=function(en){
  	if(en.type=='focus'){
  		if(this.value==this.tipstext){
  			this.value='';
  		}
 			this.runtimeStyle.color='';
  	}
  	else if(en.type=='blur'){
  		if(this.value==this.tipstext || this.value.trim()==''){
  			if(this.runtimeStyle!=null){
  				this.runtimeStyle.color='#ccc';
  			}
  			this.value=this.tipstext;
  		}
  	}
  }
  
  
  // 验证剪贴办内容
  var validClipboardData=function(){
		var clipdata=window.clipboardData.getData('Text');
  	if(clipdata==null) return true;
  	var char
  	for(var i=0,l=clipdata.length;i<l;i++){
  		char=clipdata.charAt(i)
  		if(!valid.apply(this,[char])){
  			alert("剪贴板中包含禁止录入的字符-> "+char+"\r\n剪贴板内容为："+clipdata);
  			return false;
  		}
  	}
  	return true;
  }
  
  var inputsetvalue=function(v){
  	this.value=v==null?'':v
  }
  
  // HTML元素重置方法
  var htmlelementreset=function(){
		this.value=this.defaultValue;
  	if(window.event.type!='blur'){
			Ext.lt.fireEvent(this,"onblur");
		}
  }
  
  // 处理各种录入框失去焦点后将用户录入内容绑定到数据集中
  var htmlelementbind=function(){
		if(this._binddataset==null) return;
		if(this.type=='radio' || this.type=='checkbox'){
			// 单选、或多选框只有选中时才更改绑定数据
			if(this.checked) this._binddataset[this.name]=this.value;
		}
		else if(this.type=='text' || this.type=='password'||this.tagName=='TEXTAREA'){
			this._binddataset[this.name]=this.value==''?null:this.value;
		}
		if(Ext.lt.isFunction(this.onafterbind)) {this.onafterbind();}
  }
  
  // 处理各种录入框失去焦点后将用户录入内容绑定到数据集中，多选值集，有显示值与真实值之分
  var htmlelementbindMutl=function(){
		if(this._bindMutldataset==null) return;
		if(this.type=='radio' || this.type=='checkbox'){
			// 单选、或多选框只有选中时才更改绑定数据
			if(this.checked) this._bindMutldataset[this.name].value=this.value;
		}
		else if(this.type=='text' || this.type=='password'||this.tagName=='TEXTAREA'){
			this._bindMutldataset[this.name].text=this.value==''?null:this.value;
		}
		if(Ext.lt.isFunction(this.onafterbind)) this.onafterbind();
  }
  
  // 设置元素HTML并自动进行HTML扩摘
  var innerHTMLsetter=function(html){
  	if(html==null) return;
  	this.innerHTML=html;
  	Ext.lt.HTML.expand(this)
  }
  
  this.setInnerHTML=function(el,html){
  	el.setInnerHTML=innerHTMLsetter;
  	el.setInnerHTML(html);
  }
  
  // 按HTML结构逐层分析，对标签进行扩展
  // 遇到标签中包含ignoreexpand=true的标签则跳过扩展
  _expand=function(el){
  	if(el==null) return;
  	if(el==document) return;
  	if(el.getAttribute("ignoreexpand")=="true") return;
		_expandHTMLElement(el);
		
		var subels=el.children;
		for(var i=0,l=subels.length;i<l;i++){
			_expand(subels[i])
		}
  }
  
  // 界面中的HTML元素很多，对全部进行扩展没有必要，因此，这里设置筛选功能
  this.expand=function(el){
  	function HTMLElementExpandTestPoint(){}
  	HTMLElementExpandTestPoint();
  	_expand(el);
  	return;  	
  	
		if(el!=document)
			_expandHTMLElement(el);
		var els=el.all;
		// 遍历所有元素是否使用指定标签
		for(var i=0,l=els.length;i<l;i++){
			_expandHTMLElement(els(i));
		}  	
  }
  
  // 增加鼠标移入、移出、点击时的样式控制，属性名 overclass overstyle clickclass clickstyle switchstyle switchclass switchgroup switch
  Ext.lt.onload(function(){
		if(document.hoverfinish) return;
		Ext.lt.HTML.expand(document.body);
		document.hoverfinish=true;
  });
	
	
	
	/*
	******************************************
	minitips
	******************************************
	<div class="minitips">
	  <div class="popHeader">
	    <div class="popLeft"></div>
	    <div class="minitipsText"><span class=\"popIcon wrong></span>请输入您的用户名！</div>
	    <div class="popRight"></div>
	  </div>
	  <div class="popAngle"><span></span></div>
	</div>
	*/
	var tipsdiv=null, tipsmsgdiv=null;
	var _lastinputtime=0;
	this.minitips=function(el,txt,p){
		if(tipsdiv==null){
			tipsdiv=document.createElement('DIV');
			tipsdiv.className='minitips';
			tipsdiv.innerHTML='<div class="popHeader"><div class="popLeft"></div><div class="minitipsText"><span class="popIcon wrong"></span>请输入您的用户名！</div><div class="popRight"></div></div><div class="popAngle"><span></span></div>';
			tipsmsgdiv=tipsdiv.firstChild.children.item(1);
			tipsdiv.style.display='none';
			document.body.appendChild(tipsdiv)
		}
		tipsmsgdiv.innerHTML='<span class="popIcon wrong"></span>'+txt;
		var p=Ext.lt.HTML.positionedOffset(el);
		tipsdiv.style.display='';
		tipsdiv.style.top=(p.top-tipsdiv.offsetHeight)+'px';
		tipsdiv.style.left=p.left+'px';
		
		_lastinputtime=new Date()
		window.setTimeout(function(){
			if(new Date()-_lastinputtime>=1500) tipsdiv.style.display='none';
		},2000);
	};
	
	var _promptValue=null;
	var _promptInput="<div style='width:360px' class='prompt'><input type='text' style='width:350px' onkeypress ='Ext.lt.message.send(\"prompt\",\"onkeypress\")' id='prompt_input' value=''></div>"
	
	Ext.lt.onload(function(){
		Ext.lt.message.hook('assistfn','prompt',function(){return _promptInput;});
		Ext.lt.message.hook("prompt","onkeypress",function(){
			if(event.keyCode==13){
				event.srcElement.parentElement.parentElement.nextSibling.firstChild.onclick();
			}
		});
		Ext.lt.message.hook('alert','show',function(){
			var input=document.getElementById('prompt_input');
			if(input==null) return;
			input.focus();
		});
		Ext.lt.message.hook('alert','close',function(button){
			var ipt=document.getElementById('prompt_input');
			if(ipt==null) return;
			if(button.innerText!=''){
				_promptValue=ipt.value;
			}else{
				_promptValue=null;
			}
			ipt.value='';
			Ext.lt.message.send('prompt','close');
		});
	});
	
	this.prompt={
		show:function(msg){
			_promptValue=null;
			window.alert(msg,'prompt');
		},
		getValue:function(){
			return _promptValue;
		}
	};
}

Ext.lt.HTML.select=function(config)
{
	var _cfg=Ext.lt.apply({id:'selectdemo'+Ext.lt.getNextSeqValue(),nullvalue:true,className:''+'selectclass'},config);
	var obj={};
	var _id=_cfg.id; 
	var rs=_cfg.data;
	var _class=_cfg.className;
	var _style =_cfg.style;
	var _value = _cfg.value;
	var _nullvalue = _cfg.nullvalue&true;
	var _nullvaluehtml = '<option value=""></option>';
	var _valuefield = _cfg.valuefield?_cfg.valuefield:'v';
	var _textfield = _cfg.textfield?_cfg.textfield:'t';
	var _selobj = {};
	
	obj.draw=function(d){
		// 生成下拉框HTML代码
		var str1=['<select id = "',_id,'" class  = "',_class,'" style ="',_style,'" ', '>'];
		// 判断是否显示控制行
		if(_nullvalue) str1.push(_nullvaluehtml);
		for(var i=0;l=rs.length,i<l; i++){
			str1.push('<option value="' , rs[i][_valuefield], '" >',rs[i][_textfield], '</option>');
		}
		str1.push("</select>");
		d.innerHTML=str1.join('');
		// 获取下拉框对象		
		_selobj=d.firstChild;
		// 设置默认值
		obj.setValue(_value);
		// 添加onselected事件处理
		_selobj.onchange=function(en){
			var rt=true;
			if(obj.onselected!=null){
				var data=obj.getData();
				if(data==null){
					rt=obj.onselected(null,null,null);
				}
				else{
					rt=obj.onselected(data,data[_valuefield],data[_textfield]);
				}
			}
			if(rt==false) return rt;
			
			if(obj.onchange!=null){
				rt=obj.onchange.apply(_selobj,en)
			}
			
			return rt;
		}
	}
 
	obj.getId=function(){
		return _id;
	}
	
	obj.getValue=function(){
		  return _selobj.value; 
	}
	
	obj.setValue=function(v){
		_selobj.value=v
		return;
	}
	
	obj.getText = function(){
		var d=obj.getData()
		return d==null?null:d[_textfield];
	}
  
	obj.getData=function(){
		var selid=_selobj.selectedIndex;
		return rs[selid-(_nullvalue?1:0)];
	}
	
	return obj;	
}

Ext.lt.isExist = function(obj){
	if(obj==="0"){
		return false;
	}else if(!obj){
		return false;
	}else{
		return true;
	}
}

Ext.lt.Qtree=function(cfg){
	// 数据集结构为[{itemid:,code:,name:,level:,isleaf:,superitemid:,},……]
	var _config=Ext.lt.apply({data:{},doRootSelected:false,endlevelselect:false,el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid',level:'level',isleaf:'isleaf',tps:'tps'},outformart:'#code-#name',showRootNode:false,rootNode:null,selectmode:false,values:[],on:{},viewmodel:'tree',linkchild:false,expandlevel:1,expand:null,parentlinksub:true,isexpand:true,contextmenudata:null,search:false,search_attribute:'*',complementary:true},cfg);
	var contextmenudata=_config.contextmenudata;
	var _id='qtree'+Ext.lt.getNextSeqValue();
	// 半选中状态，默认为false
	var _indeterminate=_config.indeterminate==true;
	//是否自动勾选全部默认值/默认值：true
	var _complementary=_config.complementary==true;
	// 数据集
	var _data=(_config.data==null)?[]:(_config.data.toArray());
	    _data.size=_data.length;
	var _data_bak=_data; // 当设置了数据过滤条件后使用该对象保存原始数据集
	    _data_bak.size=_data_bak.length;
	var _maxlength=50;
	if(_data.getMaxColDataLength!=null){
		var _coldatalength=_config.data.getMaxColDataLength();
		for(var i=0;i<_coldatalength.length;i++){
			_maxlength=_maxlength>_coldatalength[i]?_maxlength:_coldatalength[i];
		}
	}
	var _doRootSelected=_config.doRootSelected;
	//设置初始单击不展开
	var _onclick_expand=false;
	if(_config.expand=='click'){
		_onclick_expand=true;
	}
	if(_config.clickexpand==true){
		_onclick_expand=true;
	}
	//设置电击展开层次
	var _onclick_expandlevel=1;
	if(_config.clickexpandlevel!=null){
		_onclick_expandlevel=_config.clickexpandlevel;
	}
	
	// 设置数据过滤条件。过滤条件为数组对象，数组中保存需要过滤的属性名
	// 匹配的值集作为对象属性保存 _filter._kXXX_vXXX=true 方便快速过滤数据值集,不符合过滤条件的数据，其选中属性将自动删除
	var _filter=[];
	// 数据集中所有字段名
	var _fields=[];
	// 设置渲染目标HTML对象
	var _tagel=_config.el;
	// 设置id属性名
	var _field_id=_config.field.id;
			_fields[_field_id]='';
			_fields.push(_field_id);
	var _preid='PK_'
	// 设置name属性
	var _field_name=_config.field.name;
			_fields[_field_name]='';
			_fields.push(_field_name);
	// 设置code属性
	var _field_code=_config.field.code;
			_fields[_field_code]='';
			_fields.push(_field_code);
	// 设置上级ID属性名
	var _field_sid=_config.field.sid;
			_fields[_field_sid]='';
			_fields.push(_field_sid);
	// 设计级次属性名
	var _field_level=_config.field.level;
			_fields[_field_level]='';
			_fields.push(_field_level);
	// 设置是否末级属性名，使用true、false或0、1
	var _field_isleaf=_config.field.isleaf;
			_fields[_field_isleaf]='';
			_fields.push(_field_isleaf);
	// 表示选中的属性
	var _field_checked='_checked'
			_fields[_field_checked]='';
			_fields.push(_field_checked);
	// 设置默认显示格式
	var _formart=_config.outformart;
	// 处理输出格式的函数
	var _formartfn=_config.outformartfn;
	// 是否产生根节点，默认为false。
	var _showRootNode=_config.showRootNode;
	// 是否自动展开,默认值为true。
	var _isexpand = _config.isexpand;
	// 根节点值对象
	var _rootnodeobject=_config.rootNode;
	if(_rootnodeobject==null){
		_rootnodeobject={'name':'全部'}
		_rootnodeobject[_field_id]='QTreeAllNode';
		_rootnodeobject[_field_sid]='QTreeRootNode';
		_rootnodeobject[_field_isleaf]=1;
	}
	var _rootnode=null;
	// 已经生成HTML代码的节点数组，节点采用数组、对象混合存储方式。如果需要遍历可以按数组方式寻缘_treenode对象，遍历所有节点。
	// 如果需要通过数据ID查找具体的节点对象可以通过该对象的'node'+dataid的方式查找节点
	var _treenode=[];
	
	// 禁用选项
	var _disabled=_config.disabled==true;

	// 选择模式 false-不选择  radio、1-单选  checkbox、n-多选
	var _selectmode=_config.selectmode;
	var _endlevelselect=_config.endlevelselect==true;
	var _select_formart=''
	if(_selectmode==1 || _selectmode=='radio'){
		// 取消单选控制
		_selectmode=null
	}
	else if(_selectmode=='n' || _selectmode=='checkbox'){
		_selectmode='n';
		_select_formart='<input type="checkbox" name="'+_id+'" dataid="#'+_field_id+'" value="#'+_field_id+'" #'+_field_checked+' '+(Ext.lt.isExist(_disabled)?'disabled':'')+'/>';
	}
	
	var _viewmodel=_config.viewmodel;
	var _oldviewmodel=_viewmodel;
	var _linkchild=_config.linkchild==true&&_selectmode=='n'&&_viewmodel=='tree';
	var _linkchildonchecked=_linkchild;
	var _linkchildonunchecked=_linkchild;
	    if(_config.linkchildonchecked!=null) 
	    	_linkchildonchecked=_config.linkchildonchecked==true;
	    if(_config.linkchildonunchecked!=null) 
	    	_linkchildonunchecked=_config.linkchildonunchecked==true;
	var _linkparend=_config.linkparend==true&&_selectmode=='n'&&_viewmodel=='tree';
	var _parentlinksub=_config.parentlinksub==true;
	var _bodydblselect=_config.bodydblselect==true; // 双击强制选中
	//自定义样式类
	var _classname = _config.classname ? _config.classname : "";
	var _lastSelected={className:'',getAttribute:function(attr){return this[attr]}};
	// 异步创建标志
	var _sync=false;
	// 异步数据阀值
	var _sync_value=_config.syncvalue==null?100:isNaN(_config.syncvalue)?100:_config.syncvalue<1?100:_config.syncvalue;
	
	
	// 默认选中值
	var _values=_config.values==null?[]:_config.values;
	if(_values!=null) for(var i=0;i<_values.length;i++) _values[_preid+_values[i]]='checked';
	
	// 显示搜索功能区
	var _search=_config.search==true;
	var _searchdiv=null;
	var _search_attribute=_config.search_attribute;
	var _search_key={};
	if(_search_attribute=='*' && _data.length>0){
		_search_attribute=[];
		var d=_data[0];
		for(attr in d){
			if(typeof(attr)=='string'){
				_search_attribute.push(attr);
			}
		}
	}
	if(_search){
		_search_key={'enter':_config.search_enter==true,'keypress':_config.search_keypress!=false,'button':true,'blue':_config.search_blur!=false};
	}
	var _search_match=_config.search_match==null?'left':_config.search_match;
	
	var keypress=_config.keypress==true;
	
	// 根元素，如果数据集没有根元素则声称缺省根元素，一般认为_field_sid属性为null或0的对象为根节点
	var _root=[];

	
	// 对用于显示树的数据进行处理
	var _initRootData=function(){
		_root=[];
		
		// 如果有全选节点，则增加次节点
		if(_showRootNode){
			_root.push(_rootnodeobject);
			_root['dataid_'+_rootnodeobject[_field_id]]=_rootnodeobject;
		}
		
		// 将符合条件的根目录添加到root中，当有过滤条件的时候所有数据都形成List结构
		if(_viewmodel=='tree'){
			var temp
			for(var i=0,l=_data.length;i<l;i++){
				temp=_data[i]
				if(_filter.length>0){
					_root.push(temp);
					_root['dataid_'+temp[_field_id]]=temp;
				}
				else if((temp[_field_sid]==0&&(temp[_field_sid]+'').length<=1) || temp[_field_sid]==null || 
					temp[_field_level]==1 || _data[_preid+temp[_field_sid]]==null){
					_root.push(_data[i]);
					_root['dataid_'+_data[i][_field_id]]=_data[i];
				}
			}
		}
		else{
			_root=_root.concat(_data)
		}
		
		// 设置根节点的长度
		_root.size=_root.length;
		// 设置异步加载标志
		_sync=_root.size>=_sync_value
		
	}
	
	// 对树的数据进行过滤，如果过滤条件为空则直接返回
	var _filterData=function(regfilter,checkflag){
		_subnodes=null;
		if(_filter.length==0){
			_data=_data_bak;
			_viewmodel=_oldviewmodel
			return;
		}
//		_viewmodel='list';		//bug-6913	下列数的class变了,导致样式丢失

		// 清空数据集
		_data=[];
		
		// 将参与匹配的数据拼到一个字符串中，格式$@xxxxx$%dataid$@xxxxx$%dataid
		// 目前测试与下面的实现方法速度差不多，主要性能问题在单层数据量太大时速度缓慢
		var searchText=[];
		var l=_filter.length,d
		for(var i=0;i<_data_bak.size;i++){
			d=_data_bak[i]
			if(checkflag==true)d[_field_checked]='';
			for(var j=0;j<l;j++){
				searchText.push('##',d[_filter[j]])
			}
			searchText.push('%%',d[_field_id],'\n');
		}
		
		// 采用正则表达式匹配
		var tmp=searchText.join('').match(regfilter),d;
		
		if(tmp!=null){
			tmp=tmp.join('\n').replace(/.*%%(.*)/ig,'$1').split('\n');
			for(var i=0,l=tmp.length;i<l;i++){
				d=_data_bak[_preid+tmp[i]]
				_data.push(d);
				if(checkflag==true)d[_field_checked]='checked';
				_data[_preid+tmp[i]]=d
			}
		}
		
		_data.size=_data.length;
	}
	
	var _t,_superIds={};
	var _supkeys={}//存储当前节点的子节点。都有谁
	//判断是否重现计算默认值。
	//1.selectmode是多选。2.是tree类型
	var _modeType=_selectmode=='n'&&_viewmodel=='tree'&&(_linkchildonchecked||_linkparend);
	// 将数据集转换为编码索引的结构
	for(var i=0,l=_data.size;i<l;i++){
		_t=_data[i];
		// 防止id为数字，因此增加PK前缀
		_data[_preid+_t[_field_id]]=_t;
		
		// 添加选中属性
		_t[_field_checked]=_values[_preid+_t[_field_id]]
		
		// 是否末级节点为空则默认末级节点
		if(_t[_field_isleaf]==null) _t[_field_isleaf]=1;
		else if(_t[_field_isleaf]==true) _t[_field_isleaf]=1
		else if(_t[_field_isleaf]==false) _t[_field_isleaf]=0
			
		// 级次为空则默认为1级
		if(_t[_field_level]==null) _t[_field_level]=0;
		_superIds[_preid+_t[_field_sid]]=true;
		//要复选状态的
		if(_modeType&&_complementary){
			//设置父节点。
			if(_supkeys[_preid+_t[_field_sid]]==null){
				_supkeys[_preid+_t[_field_sid]]=[_t[_field_id]];
			}else{
				_supkeys[_preid+_t[_field_sid]].push(_t[_field_id]);
			}
		}
	}
	
	// 检查是否末级标志
	for(var i=0,l=_data.size;i<l;i++){
		_t=_data[i];
		// 检查非末级节点数据是否能找到下级数据
		_superIds[_preid+_t[_field_id]]==true?_t[_field_isleaf]=0:_t[_field_isleaf]=1;
		
	}
	//开始搞初始默认值：
		//if(_values!=null) for(var i=0;i<_values.length;i++) _values[_preid+_values[i]]='checked';
	var _allcheck_sid={};
	var _indeterminate_values={};//半勾选对象
	var _values_baks=[];
	if(_modeType&&_complementary){
		for(var i=0,l=_values.length;i<l;i++){
			_setDefValues(_values[i]);
		}
	}
	function _setIndeterminate(){
		if(!_complementary)return;
		for(var e in _indeterminate_values){
			if(_treenode['node'+_indeterminate_values[e]]!=null){
				var node=_treenode['node'+_indeterminate_values[e]];
				if(node.body.select!=null&&!node.body.select.checked){
					node.body.select.indeterminate=true;
				}
			}else if(_indeterminate_values[e]==0||_indeterminate_values[e]=='0'){
				if(_showRootNode&&_rootnode!=null&&!_rootnode.body.select.checked){
					_rootnode.body.select.indeterminate=true;
				}
			}
		}
	}
	//1.父节点勾选。下级全选。
	//2.选中父节点，下面不选（关联子集）
	//3.子集全选，父节点勾选
	//4.子集勾选，父节点勾选。
	//5.半勾选。
	//6.什么都没关系。
	
	function _setDefIndeterminate(keys){
		if(!_complementary)return;
		if(keys==null||keys==''||keys=='QTreeRootNode')return;
		//当前节点被设置过了。
		if(_indeterminate_values[_preid+keys]!=null){
			return ;
		}
		if(_values_baks[_preid+keys]!=null){
			return ;
		}
		_indeterminate_values[_preid+keys]=keys;
		if(keys==0||keys=='0'){
			_indeterminate_values[_preid+0]='0';
			return;
		}
		if(_data[_preid+keys]==null)return;
		if(_data[_preid+keys][_field_checked]=='checked')return;
		_setDefIndeterminate(_data[_preid+keys][_field_sid]);
	}
	
	function _setDefValues(keys,dc,dp){
		if(!_complementary)return;
		if(keys==null||keys==''||keys=='QTreeRootNode')return;
		//当前节点被设置过了。
		if(_values_baks[_preid+keys]!=null){
			return ;
		}
		_values_baks.push(keys);
		_values_baks[_preid+keys]='checked';
		if(_data[_preid+keys]==null)return;
		_data[_preid+keys][_field_checked]='checked';
		//需要搞父节点的
		if(_linkparend){
			var sid=_data[_preid+keys][_field_sid];
			if(!_parentlinksub){
				//1.就搞_parentlinksub==false   下级只要有一个节点选中，则选中上级
				//只用找父节点。不用考虑子集问题问题。
				_setDefValues(sid,false)
			}else{
				//2._parentlinksub==true
				
				if(_allcheck_sid[_preid+sid]==null){
					_allcheck_sid[_preid+sid]=0;	
				}
				_allcheck_sid[_preid+sid]++;
				
				if(_allcheck_sid[_preid+sid]==_supkeys[_preid+sid].length){
					_setDefValues(sid);
				}else{
					//设置半勾选
					if(_indeterminate){
						_setDefIndeterminate(sid)
					}
				}
			}
		}
		//需要搞子节点的
		if(_linkchildonchecked&&(dc==null||dc)){
			var arr=_supkeys[_preid+keys]
			if(arr!=null){
				for(var i=0,l=arr.length;i<l;i++){
						_setDefValues(arr[i])
				}
			}
			
		}
	}
	if(_modeType&&_complementary){
		_values = _values_baks
	}
	function getselectpath(dataid){
		var _t=_data[_preid+dataid],_tmp=[];
		
		while(_t!=null){
			_tmp.push(_t[_field_id]);
			if(!_t[_field_sid] || _t[_field_sid]==0) break;
			_t=_data[_preid+_t[_field_sid]];
		}
		// 反转顺序
		_tmp.reverse();
		return _tmp;
	}
	
	// 为选中值生成选中路径
	var _t,_tmp;
	for(var i=0,l=_values.length;i<l;i++){
		_values['path:'+_values[i]]=getselectpath(_values[i]);
	}
	
	_filterData();
	_initRootData();

	// 创建输出模板
	var _template=new Ext.lt.out.template(_select_formart+(_formartfn==null?_formart:''));
	if(_endlevelselect){
		var _unendlevel_template=new Ext.lt.out.template(_formartfn==null?_formart:'');
	}
	// 获取输出字段列表
	if(_data.length>0){
		var v=_data[0];
		for(var f in v){
			if(!Ext.lt.isFunction(v[f])){
				if(_fields[f]==null){
					_fields[f]=''
					_fields.push(f);
				}
			}
		}
	}
	_template.setField(_fields);
	if(_endlevelselect) _unendlevel_template.setField(_fields);

	
	// 根据上级ID获取下级数据
	var _subnodes=null;
	function _getSubData(sid){
		if(_subnodes==null){
			_subnodes={}
			var t=[],d,_sid;
			for(var i=0,l=_data.size;i<l;i++){
				d=_data[i],_sid=d[_field_sid];
				if(_subnodes[_sid]==null) _subnodes[_sid]=[]
				_subnodes[_sid].push(d);
			}
		}
		return _subnodes[sid]==null?[]:_subnodes[sid];
	}
	
	
	// 创建树的HTML代码
	function _buildTreeHTML(){
		var start=new Date();
		var _popHTML=[];
		var _subHTML=[];
		var ele,cls,end='0';
		var i=0,out,maxlength=1,dataid

		// 构造全选节点
		if(_showRootNode){
			ele=_root[i];
			_popHTML.push('<div class="rootitem" type="node" stat="open" stat="close" level="0" isleaf="',ele[_field_isleaf],'"  end="',end,'" dataid="',ele[_field_id],'"><div level=0 class="qbody" type="body" class="qbody" end="',end,'" dataid="',ele[_field_id],'" style="width:250px"><font class="link" overclass="overlink">',((_endlevelselect==true)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>');
			i++;
		}

		for(;i<_root.size;i++){

			// 单层一次最多构造200节点
			if(i<_sync_value){
				_popHTML.push(_buildRootNodeHTML(_root[i],i));
			}
			else{
				break;
				_subHTML.push(['<div id=',_id,'_node_',dataid,' class="item" stat="close" type="node" level="0" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',dataid,'><span class=',cls,'></span><div type="body" class="qbody" level=0 end=',end,' dataid=',dataid,'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>'].join(''));
			}
			
		}
		return [_popHTML.join(''),_subHTML];
	}
	
	function _buildRootNodeHTML(ele,i){
			var cls='itemclose',end='0',i=i==null?0:i
			if(ele[_field_isleaf]==1) cls='rootline'; // 没有字段
			if(i==_root.size-1){
				cls+='-nl'
				end='1'
			}
			var dataid=ele[_field_id]
		
		return ['<div id=',_id,'_node_',dataid,' class="item" stat="close" type="node" level="0" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',dataid,'><span class=',cls,' type=i></span><div type="body" class="qbody" level=0 end=',end,' dataid=',dataid,'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>'].join('')
	}
	
	// 处理双击事件
	function _body_dblclick(){
		if(!_onclick_expand){
			Ext.lt.fireEvent(this.parentElement,"onclick");
			//this.parentElement.fireEvent('onclick');
		}
		
		var node=_treenode['node'+this.getAttribute('dataid')];
		if(node!=null){
			if(node.body.select!=null && !Ext.lt.isExist(_disabled)){
				if(_bodydblselect){
					node.body.select.checked=true;
				}
				else{
					node.body.select.checked^=true;
				}
			}
			if(node.body.select!=null&&!Ext.lt.isFunction(node.body.select)) _check_click.apply(node.body.select)
		}
		
	};
	// 处理选中后样式
	function _body_click_style(){
		var dataid=this.getAttribute('dataid');

		// 更换样式
		if(_lastSelected!=this){
			// 没有设置选择模式，通过body的点击控制选中数据
			if(_selectmode!='n'){
				if(_lastSelected.getAttribute!=null && _lastSelected.getAttribute('dataid')!=""+_rootnodeobject[_field_id] && _data[_preid+_lastSelected.getAttribute('dataid')]!=null) _data[_preid+_lastSelected.getAttribute('dataid')][_field_checked]=null;
				if(this.getAttribute('dataid')!=""+_rootnodeobject[_field_id]) _data[_preid+this.getAttribute('dataid')][_field_checked]='checked';
			}

			_lastSelected.className=_lastSelected.className.replace(' selected','');
			_lastSelected=this;
			this.className+=' selected';			
		}
		if(_onclick_expand){
			_node_click_load.apply(this.parentElement,[false,_onclick_expandlevel])
		}
		_fireEvent('onnodeclick',{body:this,node:this.parentElement,data:_data[_preid+this.getAttribute('dataid')]});
	}

	// 处理下级数据加载事件,flag为强制展开标志
	function _node_click_load(flag,expandlevel,bodyclick){
		// 只有树才需要处理下级节点加载
		if(_viewmodel!='tree') return;
		// 如果点击根节点则退出不处理
		var dataid=this.getAttribute('dataid');
		if(dataid==_rootnodeobject[_field_id]) return;
		if(dataid==null&&this.firstChild.getAttribute('dataid')==_rootnodeobject[_field_id]){
			return;
		}
		flag=flag==true;
		expandlevel=expandlevel==null?1:expandlevel;
		bodyclick=bodyclick!=false;
		// 末级节点不需要处理下级数据的加载
		if(this.getAttribute('isleaf')==1) return;
		
		var stat=this.getAttribute('stat');
		if(stat==null&&this.getAttribute('level')==null)return;
		var icon=this.children.item(parseInt(this.getAttribute('level'),10));
		if(this.getAttribute('stat')=='close' || flag){
			// 其他节点关闭样式，则换成根节点打开
			icon.className=icon.className.replace('itemclose','itemopen');
			this.setAttribute('stat','open');
			if(this.subtree==null){
				// 加载下级数据
				var ul=document.createElement('DIV'),html=[];
				ul.superitem=this;
				var level=parseInt(this.getAttribute('level'),10)+1
				var dataid=this.getAttribute('dataid');
				var subeles=_getSubData(dataid);
				    subeles.size=subeles.length;

				
				var ele,rootpath=[this],end=0,spclass='line'
				
				var sel=this.parentElement.parentElement; // 获取上级级的DIV对象
				while(sel!=null && _tagel.contains(sel)){
					rootpath.push(sel);
					if(sel.getAttribute('level')==0) break;
					if(sel.parentElement==null) break;
					sel=sel.parentElement.parentElement; // 获取上级级的UL对象
				}
				
					var spclass='line',spanhtml=[];
					//只有树才生成span
					if(_viewmodel=='tree'){
						// 生成之前层次的竖线
						for(var j=level-1;j>-1;j--){
							if(rootpath[j].getAttribute('end')==1){
								spclass='line-nl'
							}else{
								spclass='line';
							}
							spanhtml.push('<span class=',spclass,' type=i></span>');
						}
					}
				
				for(var i=0;i<subeles.size;i++){
					ele=subeles[i];
					cls='itemclose'
					if(ele[_field_isleaf]==1) cls='itemnomorl'; // 没有下级字段
					if(i==subeles.size-1){
						cls+='-nl';
						end='1';
					}
					
					html.push('<div type="node" class="item" stat="close"  level="',level,'" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',ele[_field_id],'>');

					html.push(spanhtml.join(''),'<span class=',cls,' type=i></span><div type="body" class="qbody" level=',level,' end=',end,' dataid=',ele[_field_id],'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>');
				}

				ul.innerHTML=html.join('');
				// 追加下级节点
				this.subtree=ul;
				this.appendChild(ul);
				
				// 添加树行为
				var items=ul.children,it,txtlength,txtmaxlength=0;
				items.size=items.length;
				for(var i=0;i<items.size;i++){
					it=items.item(i);
					it.body=it.lastChild
					if(_selectmode=='n')it.body.select=it.body.getElementsByTagName('INPUT').item(0);
					// 追加node索引
					_treenode.push(it);
					_treenode['node'+it.getAttribute('dataid')]=it;
					txtlength=it.innerText.length;
					txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength
				}
				ul.style.width=(txtmaxlength*17+40+level*20)+'px'
			}
			this.subtree.style.display='';
			
			if(expandlevel>1 || expandlevel<0){
				var subids=_getSubData(this.getAttribute('dataid'));
				for(var i=0,l=subids.length;i<l;i++){
					_tree.nodeExpand(_tree.getNode(subids[i][_field_id]),expandlevel-1);
				}
			}
		}
		else if(this.getAttribute('stat')=='open'){
			// 其他节点打开样式，则换成根节点关闭
			icon.className=icon.className.replace('itemopen','itemclose');
			this.setAttribute('stat','close');
			
			// 隐藏下级列表
			if(this.subtree==null){
				var childs=this.children;
				childs.size=childs.length;
				for(var i=0;i<childs.size;i++){
					if(childs.item(i).tagName=='UL'){
						this.subtree=childs.item(i);
						break;
					}
				}
			}
			if(bodyclick && this.subtree!=null && _lastSelected!=null && _lastSelected.all!=null && this.subtree.contains(_lastSelected)){
				Ext.lt.fireEvent(this.body,"onclick");
			}
			this.subtree.style.display='none';
		}
		else{
		//	alert('树节点状态错误，必须为open、close之一')
		}
	}

	// 带选择模式的树，需要绑定单选框、复选框的行为
	var _last_checkbox=null;
	function _check_click(){
		if(Ext.lt.isExist(_disabled)) return false;
		var dataid=this.getAttribute('dataid');
		var obody=this.parentElement.parentElement;
		if(dataid==_rootnodeobject[_field_id]){
			// 全选节点 设置所有数据项
			for(var i=0;i<_data.size;i++){
				_data[i][_field_checked]=this.checked?'checked':null;
			}
			// 设置所有界面上显示的选择框的选中状态
			var eles=_tagel.getElementsByTagName('INPUT');
			    eles.size=eles.length;
			for(var i=0;i<eles.size;i++){
				if(eles[i].type=='checkbox' || eles[i].type=='radio') eles[i].checked=this.checked;
			}
			_fireEvent('onchange',{body:obody,node:obody.parentElement,data:_data[_preid+obody.getAttribute('dataid')]});
			return;
		}
		
		_data[_preid+dataid][_field_checked]=this.checked?'checked':null;
		
		// 需要关联上下级选中项检查
		if(this.checked && _linkchildonchecked){
			_syncchildnode(dataid,true);
		}
		else if(!this.checked &&_linkchildonunchecked){
			_syncchildnode(dataid,false);
		}
		
		if(_linkparend){
			// 检查上级节点状态
			_checkparentnode(dataid);
		}
			//if(this.checked ){
			if(_rootnode!=null&&_rootnode.body!=null&&_rootnode.body.select!=null){
				// 检查是否已经是全选
				var hashCheck=false;
				var hashNotCheck=false;
				var i=0,l=_data.size;
				for(;i<l;i++){
					if(_data[i][_field_checked]!='checked') {
						hashNotCheck=true;
					}else{
						hashCheck=true;
					}
					if(hashCheck&&hashNotCheck)break;
				}
				if(!hashNotCheck){//肯定全部选中
					_rootnode.body.select.checked=true;
				}else{
					_rootnode.body.select.checked=false;
				}
				
				if(_indeterminate){
					//hashCheck&&hashNotCheck == tree&&true 就是有选中和没选中的并存
					_rootnode.body.select.indeterminate=hashCheck&&hashNotCheck;
				}
			}
				
				// 如果是单选按钮，在这里清除上一次选中数据的选中状态
				if(this.type=='radio'){
					for(var i=0,l=_data.length;i<l;i++){
						_data[i][_field_checked]=(_data[i][_field_id]==dataid)?'checked':null;
					}
				}
		
		_fireEvent('onchange',{body:obody,node:obody.parentElement,data:_data[_preid+obody.getAttribute('dataid')]});
	}
	// 同步下级节点数据，参数为节点ID
	function _syncchildnode(dataid,checkstatus){
		var sub=_getSubData(dataid),t,node;
		for(var i=0,l=sub.length;i<l;i++){
			t=sub[i];
			t[_field_checked]=checkstatus?"checked":null;
			node=_treenode['node'+t[_field_id]]
			if(node!=null) {
				node.body.select.checked=checkstatus;
				if(_indeterminate){
					node.body.select.indeterminate=false;
				}
			}
			_syncchildnode(t[_field_id],checkstatus);
		}
	}
	
	// 检查上级节点状态
	function _checkparentnode(dataid,subindeterminateflag){
		var sid=_data[_preid+dataid][_field_sid];
		if(subindeterminateflag==null) subindeterminateflag=false
		if(sid==null || sid==0 || _treenode['node'+sid]==null) return;
		// 检查同级节点是否全部选中
		var sub=_getSubData(sid),i,l,flag=false,p=0;
		for(i=0,l=sub.length;i<l;i++){
			node=_treenode['node'+sub[i][_field_id]]
			if(node!=null&&(sub[i][_field_checked]=='checked'||node.body.select.indeterminate)) p++;
			indeterminateflag=indeterminateflag||sub[i][_field_checked]=='checked'
		}
		var flag=_parentlinksub?p==l:p>0
		// 复选框半选中状态
		var indeterminateflag=subindeterminateflag||(p>0&&p<l)
		
		_treenode['node'+sid].body.select.checked=flag;
		if(_indeterminate) _treenode['node'+sid].body.select.indeterminate=indeterminateflag;
		
		if(_data[_preid+sid]==null){
			return;
		}
		_data[_preid+sid][_field_checked]=flag?"checked":null;
		_checkparentnode(sid,indeterminateflag);
	}
	// 处理事件
	var _events=['onchange','onclick','onnodeclick','ondblclick','oncontextmenu'];
	for(var i=0;i<_events.length;i++){
		var fname=_events[i];
		if(_config.on[fname.substr(2)]!=null) _events[fname]=_config.on[fname.substr(2)];
	}
	
	if(_events['oncontextmenu']==null&&contextmenudata!=null){
		
		if(contextmenudata.correctionX==null){contextmenudata.correctionX=0}
		if(contextmenudata.correctionY==null){contextmenudata.correctionY=0}
		if(contextmenudata.selectColor==null){contextmenudata.selectColor=''}
		_events['oncontextmenu']=function(qtree,node){
			
			var qtreemenu=document.getElementById('qtree_menu');
			if(qtreemenu==null){
					qtreemenu=document.createElement("div");
					qtreemenu.id='qtree_menu';
					qtreemenu.className='popupmenu';
					document.body.appendChild(qtreemenu);
			}
		
			//var node={body:t,node:t.parentElement,data:_data[_preid+t.getAttribute('dataid')]};
			
			var _menud=cfg.contextmenudata.data;
			for(var i=0,l=_menud.length;i<l;i++){
				if(_menud[i].click!=null){
					if(_menud[i]._click==null)_menud[i]._click=_menud[i].click;
					_menud[i].click=function(d){
						this._click(qtree,{body:node.body,node:node.node,data:_data[_preid+node.node.body.getAttribute('dataid')]},d);
					}
				}	
			}
			if(cfg.contextmenu==null){
				cfg.contextmenu=Ext.lt.Popupmenu(cfg.contextmenudata);
				cfg.contextmenu.draw(qtreemenu);
			}

			var x=document.documentElement.scrollLeft+event.x+contextmenudata.correctionX;
			var y=document.documentElement.scrollTop+event.y-event.offsetY+event.srcElement.offsetHeight+contextmenudata.correctionY;
			if(popupmenuOpenNode!=null){
				popupmenuOpenNode.runtimeStyle.cssText='';
			}
			//设置单元格选择样式。
			if(cfg.contextmenudata.selectColor!=null&&cfg.contextmenudata.selectColor!=''){
				node.body.firstChild.runtimeStyle.background=cfg.contextmenudata.selectColor
			}
			popupmenuOpenNode=node.body.firstChild
			qtreemenu.style.left=x+'px';
			qtreemenu.style.top=y+'px';
			qtreemenu.style.visibility='visible';
			cfg.contextmenu.show();
		}
	}
	var popupmenuOpenNode
	Ext.lt.message.hook("Popupmenu","closed",function(){
		if(popupmenuOpenNode!=null){
			popupmenuOpenNode.runtimeStyle.cssText='';
		}
	})
	function _getContextmenu(){
		if(cfg.contextmenu!=null){
			return cfg.contextmenu;	
		}
		return null;
	}
	
	function _fireEvent(eventname,params){
		var en=_events[eventname];
		if(en==null) return ;
		en(_tree,params);
	}
	
	// 根据事件来源对象查找Node节点对象
	function _findNode(el){
		var obj={bodyclick:true};
		if(el.tagName=='INPUT' && el.getAttribute("name")==_id){
			obj.check=el;
			obj.body=el.parentElement.parentElement;
			obj.node=obj.body.parentElement;
			obj.src='check';
		}
		else while(el!=null && el.getAttribute("type")!='body' && el.getAttribute("type")!='node' ){
			if(el.getAttribute("type")=='i'){
				obj.bodyclick=false;
			}			
			if(_tagel.contains(el)){
				el = el.parentElement;				
			}
			else{
				return obj;
			}
		}
		el.type=el.getAttribute("type");
		
		if(el.type=='body'){
			var t=el.getElementsByTagName('INPUT');
			obj.check=(t.length>0)?(t[0].getAttribute("name")==_id?t[0]:null):null;
			obj.body=el;
			obj.node=el.parentElement;
			obj.src='body';
		}
		else if(el.type=='node'){
			obj.node=el;
			if(el.lastChild.getAttribute("type")==null){
				obj.body=el.lastChild.previousSibling;
			}
			else{
				obj.body=el.lastChild;
			}
			obj.check=obj.body.firstChild;
			obj.src='node';
		}
		return obj;
	}
	
	var elTop=0; // 记录第一批数据绘制出的高度
	function _buildtree(){
		var start=new Date(),log=[];
		// 生成首层数据
		var html=_buildTreeHTML();

		function setInnerHTML(html){
			_tagel.innerHTML=html;
		}
		// 获取延时加载节点
		var othernode=html[1];
		var initnode=['<div class="',_classname,'q',_viewmodel,'">',html[0]],nodehieght=20*_sync_value;
		for(i=0,l=Math.ceil(_root.length/_sync_value)-1;i<l;i++){
			initnode.push('<div id="',_id,'_',i,'" type="othernode" seq="',i,'" style="height:',nodehieght,'px;display:block"></div>');
		}
		initnode.push('</div>');

		// 生成处室树
		setInnerHTML(initnode.join(''))
		
		
		// 添加树行为
		var items=_tagel.firstChild.children,it;
		

		// 生成node、body之间的引用关系
		var node,body,nodeid,nodehieght=0,txtlength,txtmaxlength=0,checkobj;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			if(node.getAttribute('type')=='othernode'){
				if(elTop==0) elTop=node.offsetTop;
				node.style.height=elTop+'px';
			}
			else{
				nodeid=node.getAttribute('dataid');
				body=node.lastChild;
				node.body=body
				if(_selectmode=='n'){
					checkobj=body.firstChild.firstChild;
					body.select=checkobj.type=='checkbox'?checkobj:null;
				}
				// 追加node索引
				_treenode.push(node);
				_treenode['node'+nodeid]=node;
				txtlength=node.innerText.length;
				txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength;
			}
			_tagel.firstChild.style.width=(txtmaxlength*17+40)+'px'
		}
		

		// 保存根节点对象引用，没有根节点的则删除根节点定义
		if(_showRootNode){
			_rootnode=items.item(0);
			_rootnode.body=_rootnode.lastChild;
			_rootnode.body.select=_rootnode.body.getElementsByTagName('INPUT').item(0);
		}
		else{
			_rootnode=null;
		}
		Ext.lt.bindEvent(document.body,'onscroll',_buildQtree);
		Ext.lt.bindEvent(document,'onmousewheel',_buildQtree);
		Ext.lt.bindEvent(_tagel,'onscroll',_buildQtree);
		Ext.lt.bindEvent(_tagel,'onmousewheel',_buildQtree);
	}
	
		
		// 生成Qtree可见的部分
	function _buildQtree(en){
		if(cfg.contextmenu!=null){
			cfg.contextmenu.close();
		}
		if(elTop==0) return;
		// 估算显示页数
		var showpage=Math.ceil((_tagel.scrollTop+document.body.scrollTop)/elTop)-1;
		var pagediv=document.getElementById(_id+'_'+showpage--);
		_buildQtreeContent(pagediv);

		var pagediv=document.getElementById(_id+'_'+showpage);
		_buildQtreeContent(pagediv);
		
		if(pagediv==null) return;
		
		var flag=pagediv.offsetTop>(_tagel.scrollTop+document.body.scrollTop);
		while(pagediv!=null &&  pagediv.offsetTop>(_tagel.scrollTop+document.body.scrollTop)){
			showpage+=flag?-1:1;
			pagediv=document.getElementById(_id+'_'+showpage);
			_buildQtreeContent(pagediv);
		}
	}
	
	function _buildQtreeContent(div){
		if(div==null) return;
		if(div._displayflag==true) return;
			
		var id=div.id.split('_')[1];
		var start=_sync_value*(parseInt(id,10)+1);
		var html=[];
		
		for(var i=start,l=(start+_sync_value)<_root.length?(start+_sync_value):_root.length;i<l;i++){
			html.push(_buildRootNodeHTML(_root[i],i))
		}
		
		div.innerHTML=html.join('')
		div.style.height='auto';
		div._displayflag=true;
		
		// 生成Node对象
		var node,body,nodeid,nodehieght=0,items=div.children,txtlength,txtmaxlength=0;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			nodeid=node.getAttribute('dataid');
			body=node.lastChild;
			node.body=body
			if(_selectmode=='n'){
				body.select=body.firstChild.firstChild;
			}
			// 追加node索引
			_treenode.push(node);
			_treenode['node'+nodeid]=node;
			txtlength=node.innerText.length;
			txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength;
		}
		div.style.width=(txtmaxlength*17+40)+'px'
	}
	
	// 将所有延迟加载的节点全部加载
	function _showOthernode(){
		var items=_tagel.firstChild.children,it;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			if(node.type!='othernode') continue;
			_buildQtreeContent(node)
		}
	}
	
	// 将有选中的值的节点展开
	function _expandSelect(){
		if(_values==null) return;
		if(_values.length==0) return null;
		var v,paths,node,rootv,viewnode;
		for(var i=0,l=_values.length;i<l;i++){
			v=_values[i],paths=_values['path:'+v];
			// 显示根id
			if(paths.length!=1) {
				_showRootNodeById(paths[0])
				for(var j=0,m=paths.length-1;j<m;j++){
					node=_treenode['node'+paths[j]];
					if(node!=null && node.getAttribute('stat')=='close') 
						_node_click_load.apply(node,[true]);
				}
			}
			else{
				if(_treenode['node'+paths[0]]!=null){
					_body_click_style.apply(_treenode['node'+paths[0]]);
				}
			}
			if(viewnode==null && _treenode['node'+v]) viewnode=_treenode['node'+v]
		}

		// 定位选中节点，多选时定位的第一个选中的节点
		if(viewnode!=null){
			_body_click_style.apply(viewnode.body);
			
			var top=Ext.lt.HTML.positionedOffset(viewnode,_tagel).top;
			if(top>(_tagel.offsetHeight+_tagel.scrollTop)){
				_tagel.scrollTop=top-_tagel.offsetHeight+50;
			}
		}
	}
	
	// 构造指定根节点HTML代码
	function _showRootNodeById(dataid){
		var d=_root['dataid_'+dataid];
		if(d==null) return;
		var i=0,li=_root.length;
		for(;i<li && _root[i]!=d;){
			i++;
		}
		
		pagediv=document.getElementById(_id+'_'+Math.floor((i-_sync_value)/_sync_value));
		_buildQtreeContent(pagediv);
	}
	
	function onTreekeydownFunction(en){
		if(!_tagel.contains(en.srcElement)) return true;
		if(_viewmodel!='tree') return true;
		
		var code=en.keyCode;
		switch (code){
			case 38: return up(en);break;
			case 40: return down(en);break;
			case 39: return right(en);break;
			case 37: return left(en);break;
			case 32: return space(en);break;
			case 13: return enter(en);break;
		}
	}
	function enter(en){
		Ext.lt.fireEvent(en.srcElement,'ondblclick');
	}
	
	function space(en){
		if(_selectmode=='n'){
			var node=_tree.getActiveNode();
			_check_click.apply(node.body.select);
		}
		return false;
	}
	
	function right(en){
		var node=_tree.getActiveNode();
		var stat=node.getAttribute('stat');
		if(stat=='close'){
			_tree.nodeExpand(node,1);
		}
		else if(node.getAttribute('isleaf')=='0'){
			down(en);
		}
		return false;
	}
	
	function left(en){
		var node=_tree.getActiveNode();
		var stat=node.getAttribute('stat');
		if(stat=='open'){
			_node_click_load.apply(node);
		}
		else{
			var nodeid=node.getAttribute('dataid');
			var paths=getselectpath(nodeid);
			if(paths.length==1) return false;
			_tree.gotoNode(_treenode['node'+paths[paths.length-2]]);
			return false;
		}
	}
	
	// 方向键控制
	function down(en){
		var node=_tree.getActiveNode();
		if(node==null){
			// 未选中任何节点，焦点跳到第一个节点
			var d=_root[0];
			_tree.gotoNode(_treenode['node'+d[_field_id]]);
		}
		else{
			var id=node.getAttribute('dataid');
			// 判断是否根节点
			if(_showRootNode){
				if(node==_treenode['node'+_root[0][_field_id]]){
					_tree.gotoNode(_treenode['node'+_root[1][_field_id]]);
					return false;
				}
			}
			// 判断节点是否展开
			var stat=node.getAttribute('stat');
			if(stat=='open'){
				_tree.gotoNode(_treenode['node'+_getSubData(id)[0][_field_id]]);
				return false;
			}
			
			function gotoNode(nodeid){
				var paths=getselectpath(nodeid);
				if(paths==null) return;
				var brothers=(paths.length==1)?_root:_getSubData(paths[paths.length-2]),i=0,l=brothers.length;
				for(;i<l;i++){if(brothers[i][_field_id]==nodeid)break;}
				if(i<l-1){
					_tree.gotoNode(_treenode['node'+brothers[i+1][_field_id]]);
				}
				else if(paths.length>1){
					gotoNode(paths[paths.length-2]);
				}
			}
			gotoNode(id);
		}
		
		return false;
	}
	
	// 方向键控制
	function up(en){
		var node=_tree.getActiveNode();
		if(node==null){
			// 未选中任何节点，焦点跳到第一个节点
			var d=_root[0];
			_tree.gotoNode(_treenode['node'+d[_field_id]]);
		}
		else{
			var id=node.getAttribute('dataid');
			
			function gotoNode(nodeid){
				var paths=getselectpath(nodeid);
				if(paths==null) return;
				var brothers=(paths.length==1)?_root:_getSubData(paths[paths.length-2]),i=0,l=brothers.length;
				for(;i<l;i++){if(brothers[i][_field_id]==nodeid)break;}
				if(0<i&&i<l){

					var nodeid=brothers[i-1][_field_id];node=_treenode['node'+nodeid];
					if(_showRootNode){
						if(node==_treenode['node'+_root[0][_field_id]]){
							_tree.gotoNode(node);
							return false;
						}
					}
						
					// 判断节点是否展开
					var stat=node.getAttribute('stat');
					if(stat=='open'){
						var subs=_getSubData(nodeid);
						_tree.gotoNode(_treenode['node'+subs[subs.length-1][_field_id]]);
						return false;
					}
					else{

						_tree.gotoNode(node);
					}
				}
				else if(paths.length>1){
						_tree.gotoNode(_treenode['node'+paths[paths.length-2]]);
						return false;
				}
			}
			gotoNode(id);
		}
		
		return false;
	}
	
	function buildKeyPress(){
		if(keypress!=true) return;
		
		Ext.lt.unbindEvent(document.body,'keydown',onTreekeydownFunction);
		Ext.lt.bindEvent(document.body,'keydown',onTreekeydownFunction)
		
	}

	var _tree=new function(){
		this.resize=function(w,h){
			if(_search){
				var _tagel=_tree.el.lastChild;
				var _searchdiv=_tree.el.firstChild;
				_tagel.style.height=(_tagel.parentElement.offsetHeight-_tagel.parentElement.firstChild.offsetHeight-30)+'px';
				var inputobj=_searchdiv.firstChild;
				var inputborder=Ext.lt.HTML.getBorderSet(inputobj);
				var w=_searchdiv.offsetWidth-_searchdiv.lastChild.offsetWidth-inputborder.width-2;
				inputobj.style.width=(w>0?w:0)+'px';
			}
		}
		
		function onTreeClick(){
			var obj=_findNode(window.event.srcElement);
			if (obj.node!=undefined||obj.node!=null) {
				if(obj.node.isDisable_UI) return;//单据定义-UI，解决排序树灰化后单击仍能能选择@fzw
			}
			if(obj.src==null) return;
			var d=_data[_preid+obj.body.getAttribute('dataid')];
			if(d!=null&&d.disable){return false};
			if(obj.src=='node'){
				_node_click_load.apply(obj.node,[false,1,obj.bodyclick]);
			}
			
			else if(obj.src=='body'){
				_body_click_style.apply(obj.body);
				if(obj.check && !Ext.lt.isExist(_disabled)){
					obj.check.checked^=true
					_check_click.apply(obj.check);
				}
			}
			else if(obj.src=='check'){
				_check_click.apply(obj.check);
				_tree.nodeExpand(obj.node,_onclick_expandlevel);
			}
			_fireEvent('onclick',{body:obj.body,node:obj.node,data:d});
		}
		
		function onTreeDblClick(){
			var obj=_findNode(window.event.srcElement);
			if (obj.node!=undefined||obj.node!=null) {
				if(obj.node.isDisable_UI) return;//单据定义-UI，解决排序树灰化后双击仍能能选择@fzw
			}
			if(obj.src==null) return;
			if(obj.body.getAttribute('dataid') != 'QTreeAllNode'){
			var d=_data[_preid+obj.body.getAttribute('dataid')];
			if(d!=null&&d.disable){return false};
			_body_dblclick.apply(obj.body);
			_fireEvent('ondblclick',[]);
			}
		}
		
		// 扩展增加右键事件 lp
		function onContextMenu(){
			var obj=_findNode(window.event.srcElement);
			if(obj.src==null) return;

			_fireEvent('oncontextmenu', obj);
			return _events['oncontextmenu']==null;
		}
		
		this.getContextmenu=function(){
			return _getContextmenu();	
		}
		this.draw=function(tagel){
			var start=new Date(),t=[];
			if(tagel!=null) _tagel=tagel;
			if(_tagel==null){
				alert('没有指定绘制区域');
				return ;
			}
			if(_tagel._qtree!=null){
				_tagel._qtree.destory();
			}
			this.el=tagel;
			// 生成搜索区
			if(_search){
				var html='<div class="'+_classname+'qsearch" style="width:100%"><input type="text" class="input"  style="float:left"><span class="btn" style="float:right"><div style="width:25px;"></div></span></div><div id="aaaa" style="width:100%"></div>';
//				var html='<div class="'+_classname+'qsearch" style="width:100%"><input type="text" class="input"  style="float:left"><span class="btn" style="float:right">搜索</span></div><div id="aaaa" style="width:100%"></div>';
				Ext.lt.HTML.setInnerHTML(tagel,html);
				_searchdiv=tagel.firstChild;
				_tagel=tagel.lastChild
			}

			var h=tagel.offsetHeight;
			var w=tagel.offsetWidth;
			 Ext.lt.HTML.setStyle(_tagel,"overflow:auto");
			tagel.ignoreexpand=true;
			tagel.ignorelayout=true;
			_buildtree();
			// 事件扩展
			var _eventel=_tagel;
			Ext.lt.bindEvent(_eventel,'onclick',onTreeClick);
			Ext.lt.bindEvent(_eventel,'ondblclick',onTreeDblClick);
			Ext.lt.bindEvent(_eventel,'oncontextmenu',onContextMenu);
						
			// 扩展搜索区事件
			if(_search){
				Ext.lt.bindEvent(_searchdiv.firstChild,'keydown',function(en){
					if(en.keyCode==13 && _search_key.enter){
						_search_do();
					}
					if(en.keyCode==13) return false;
				});
				
				Ext.lt.bindEvent(_searchdiv.firstChild,'keyup',function(en){
					var char=en.keyCode;

					// 不开放输入实时匹配
					if(char!=13 && _search_key.keypress)	{
						_search_do();
					};
					if(char==13) return false;
				});
				
				Ext.lt.bindEvent(_searchdiv.firstChild,'blur',function(){
					if(_search_key.blue){
						_search_do();
					}
					else{
						_searchdiv.firstChild.reset();
					}
				});
			}
			
			buildKeyPress();
		
			this.expandlevel(_config.expandlevel);
			if(_viewmodel=='tree' && _isexpand){ _expandSelect()}
			_tagel._qtree=this;
			_setIndeterminate();
			//勾选下根节点
			if(_showRootNode&&_rootnode!=null&&_rootnode.body.select!=null&&!_rootnode.body.select.checked){
				var allcheck = 0;
				for(var i=1,il=_root.length;i<il;i++){ //_root存放所有一级节点
					if(_root[i]["_checked"]&&_root[i]["_checked"]=="checked"){
						allcheck++;
					}
				}
				if(allcheck>0&&(allcheck==_root.length-1)){
					_rootnode.body.select.checked=true;
				}
				
//				if(_values!=null&&_values.PK_0!=null){
//					_rootnode.body.select.checked='checked'
//				}
			}
			if(_values.length>0 && _values[0]!=null && _values[0]!="")
				this.gotoNode(_values[0]);
			this.resize();
		};
		
		function _search_do(){
				var filter=[],txt=_searchdiv.firstChild.value;
				for(var i=0,il=_search_attribute.length;i<il;i++){
					filter.push({'field':_search_attribute[i],'values':txt});
				}
				_tree.setFilter(filter,_search_match,false);
		}
		
		// 展开指定层次数据
		this.expandlevel=function(l){
			if(l<1) return;
			
			// 显示所有延迟加载节点
			_showOthernode();
			
			var node,flag=true,start=0,loop=_treenode.length;
			while(flag){
				flag=false;
				for(;start<loop;start++){
					var node=_treenode[start];
					if(node!=null && node.getAttribute('level')<l && node.getAttribute('stat')=='close'){
						_node_click_load.apply(node,[true])
					}
				}
				flag=loop<_treenode.length
				loop=_treenode.length
			}
		}
		
		this.dataExpand=function(){
			
		}
		
		// 展开指定节点
		this.nodeExpand=function(node,expandlevel){
			if(!node)return;
			var expandlevel=isNaN(expandlevel)?1:expandlevel;
			if(expandlevel==0) return
			// 展开指定节点
			if(node.getAttribute('isleaf') == '0'){
				_node_click_load.apply(node,[true])
				var dataid=node.getAttribute('dataid');
				var subids=_getSubData(dataid);
				for(var i=0,l=subids.length;i<l;i++){
					this.nodeExpand(this.getNode(subids[i][_field_id]),expandlevel-1);
				}
			}
		}
		function _addNode(node,aitemid){
			if(!(_data[_preid+node[_field_sid]]==null||_data[_preid+node[_field_sid]]=="0"||_data[_preid+node[_field_sid]]==0)){
				_data[_preid+node[_field_sid]][_field_isleaf]=0
			}
			if(node[_field_isleaf]==null)node[_field_isleaf]=1;
			if(aitemid==null){
				_data.push(node);	
			}else{
				_data.insert(node,_data.indexOf(_data[_preid+aitemid]))
			}
			_data[_preid+node[_field_id]]=node;
		}
		this.updateNode=function(node){
			var _node=_data[_preid+node[_field_id]];
			var osnode=_node[_field_sid];
			
			for(var p in node){
				_node[p]=node[p];
			}
			
			if(osnode!='0'&&osnode!=0&&osnode!=_node[_field_sid]){
				_subnodes=null;
				var isleaf=_getSubData(_node[_field_sid]);
				_data[_preid+osnode][_field_isleaf]=(isleaf==null||isleaf.length<1)?1:0
			}
			_initRootData();
			this.reflash();
		}
		
		this.setDisabled=function(node,b){
			var _node=_data[_preid+node[_field_id]];
			if(_node==null){return}
			_node.disable=b;
			_treenode['node'+node[_field_id]].disabled=b==true;
			if(b==true&&_treenode['node'+node[_field_id]].getAttribute('stat')=='open'){
				_node_click_load.apply(_treenode['node'+node[_field_id]],[false]);
			}
		}
		
		this.addNode=function(nodes,aitemid){
			if(Ext.lt.isArray(nodes)){
				for(var i=0,l=nodes.length;i<l;i++){
					_addNode(nodes[i],aitemid);
				}
			}else{
				_addNode(nodes,aitemid);
				
			}
			_subnodes=null;
			_data.size=_data.length;
			_initRootData();
			this.reflash();
		}
		function _removeNode(id){
			var cdata=_getSubData(id);
			var _b=_data[_preid+id];
			_data.remove(_data[_preid+id]);
			_data[_preid+id]=null;
			for(var i=0,l=cdata.length;i<l;i++){
				_removeNode(cdata[i][_field_id]);
			}	
		}
		this.removeNode=function(id){
			var _dnode=_data[_preid+id];
			_removeNode(id)
			_subnodes=null;
			_data.size=_data.length;
			var isleaf=_getSubData(_dnode[_field_sid]);
			if(_data[_preid+_dnode[_field_sid]]!=null){
				_data[_preid+_dnode[_field_sid]][_field_isleaf]=(isleaf==null||isleaf.length==0)?1:0
			}
			_initRootData();
			this.reflash();
		}
		this.getData=function(id){
			return _data[_preid+id];
		}
		
		// 得取所有数据集 lp
		this.getAllData = function() {
			return _data;
		}
		// 根据数据ID获取节点对象
		this.getNode=function(id){
			return _treenode['node'+id];
		}
		// 直接定位到指定ID的节点，并返回Node对象
		this.gotoNode=function(node,isfocus){
			if(node.tagName=='DIV'){
				//_body_click_style.apply(node.body);
				node.body.focus();
				return node;
			}
			else{
				id=node;
				var paths=getselectpath(id);
				// 显示根id
				_showRootNodeById(paths[0])
				for(var j=0,m=paths.length-1;j<m;j++){
					node=_treenode['node'+paths[j]];
					if(node!=null && node.getAttribute('stat')=='close') 
						_node_click_load.apply(node,[true]);
				}
				var _n=_treenode['node'+id];
				//modify by xqf 如果_n为undefined,_n.body页面会报错并混乱布局
				if(_n){
					_body_click_style.apply(_n.body);
					if(isfocus!=false){						
						_n.body.focus()
					}
					return _n;
				}else{
					return null;
				}
				
			}			
		}
		// 选中节点
		this.selectedNode=function(node){
			if(node==null) return;
			var n=this.gotoNode(node);
			if(n==null) return;
			
			if(n.tagName=='DIV'){
				_body_dblclick.apply(n.body);
				_body_click_style.apply(n.body);
				n.body.focus();
			}
		}
		
		// 返回指定数据的所有下级节点
		this.getSubData=function(id){
			return _getSubData(id);
		}
		
		// 返回树选中的数据对象
		this.getSelected=function(){
			if(_selectmode !="n"){
				// 单选，返回最后一次选中的节点
				if(_lastSelected.className!=""&&_data[_preid+_lastSelected.getAttribute("dataid")]){
					return [_data[_preid+_lastSelected.getAttribute("dataid")]];
				}else{
					return [];
				}
			}
			else{
				
				var r=[]
				for(var i=0;i<_data_bak.length;i++){
					if(_data_bak[i][_field_checked]=='checked')
						r.push(_data_bak[i])
				}
				return r;
			}
		}
		// 获取所有子孙级数据,包括id数组  lp
		this._getAllSubData = function (sid){
			var sub = {subid:[],subdata:[]};
			var subid = [];
			var subdata = []; 
			for (var i=0,l=_data.size;i<l;i++){
				var d = _data[i];
				// 子级
				if(d[_field_sid] == sid) {
					subid.push(d[_field_id]);
					subdata.push(d);
				}
				// 孙级
				for (var j=0,len=subdata.length; j<len; j++) {
					if (d[_field_sid] && d[_field_sid] == subdata[j][_field_id]) {
						subid.push(d[_field_id]);
						subdata.push(d);
					}
				}
			}
			sub.subid = subid;
			sub.subdata = subdata;
			return sub;
		}
		// 清除选中
		this.clearSelected=function(){
			var sels=this.getSelected();
			for(var i=0,l=sels.length;i<l;i++){
				sels[i][_field_checked]=null;
			}
			//清除单选模式的最后选中状态
			_lastSelected={className:''};
			this.reflash();
		}
		
		
		// 返回用户最后一次操作的结点
		this.getActiveNode=function(){
			return this.getNode(_lastSelected.getAttribute('dataid'));//  _lastSelected.parentElement;
		}
		
		// 设置数据过滤条件，结构为[{field:key1,values:[value1,value2,…],{field:key1,values:[value1,value2,…],…],match:fn}
		this.setFilter=function(filter,match,checkflag){
			// 清除原有过滤条件
			_filter=[];
			// 采用正则表达式过滤数据，正则表达式结构如下所示
			// /\$#.*[1].*\$%(.*)/ig
			var regfilter=[];
			if(checkflag==null) checkflag==false
			
			if(filter!=null){
				var values,field
				for(var i=0,l=filter.length;i<l;i++){
					values=filter[i].values;
					if(values=='' || values.length==0)
						continue;
					field=filter[i].field;
					_filter.push(field);
					values=Ext.lt.isArray(values)?values:[values];
					_filter['_k'+field]=values;
					for(var j=0,m=values.length;j<m;j++){
						_filter['_k'+field+'_v'+values[j]]=true
						if(regfilter['v+'+values[j]]==null){
							regfilter.push(values[j]);
							regfilter['v+'+values[j]]=true;
						}
					}
				}
			}
			
			
			if(match==null){
				// 精确匹配
				_filter.matchfn=function(k,v){
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v==vs[i]) return true;
					}
					return false;
				}
				regfilter=regfilter.length>0?eval('/##('+regfilter.join('|')+')%%.*/ig'):null
			}
			else if(match=='left'){
				// 左侧开始匹配
				_filter.matchfn=function(k,v){
					if(v==null) return false;
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v.indexOf(vs[i])==0) return true;
					}
					return false;
				}
				regfilter=regfilter.length>0?eval('/##('+regfilter.join('|')+').*%%.*/ig'):null
			}
			else if(match=='contain'){
				// 包含开始匹配
				_filter.matchfn=function(k,v){
					if(v==null) return false;
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v.indexOf(vs[i])>-1) return true;
					}
					return false;
				}
					regfilter=regfilter.length>0?eval('/##.*('+regfilter.join('|')+').*%%.*/ig'):null
			}
			_filterData(regfilter,checkflag);
			_initRootData();
			this.reflash();
		}
		
		// 重绘树
		this.reflash=function(){
			_buildtree();
		}
		
		// 添加事件
		this.on=function(events){
			for(var event in events){
					_events['on'+event]=events[event]
			}
		}
		
		this.destory=function(){
			Ext.lt.unbindEvent(_tagel,'onclick',onTreeClick)
			Ext.lt.unbindEvent(_tagel,'ondblclick',onTreeDblClick);
			Ext.lt.unbindEvent(_tagel,'oncontextmenu',onContextMenu);
		}
		// 设置默认选中状态
		this.checkAll=function(flag){
			if(_selectmode!='n') return;
			flag=!(flag==false)
			var stat=flag?'checked':null;
			// 修改数据选中状态
			for(var i=0,l=_data.length;i<l;i++){
				_data[i][_field_checked]=stat;
			}
			
			// 修改界面checkbox状态
			for(var i=0,l=_treenode.length;i<l;i++){
				if(_treenode[i].body.select.checked!=flag){
					_treenode[i].body.select.checked=flag
				}
			}
			// 修改全选节点
			if(_rootnode!=null && _rootnode.body.select!=null){
				_rootnode.body.select.checked=flag
			}
		}
				
		this.searchnode=function(filters,match,startnodeid){
			var filter=[],f,matchfn;
			var _sels=this.getSelected();
			if(_sels.length==1&&startnodeid==null){
				startnodeid=_sels[0][_field_id];
			};
			if(!Ext.lt.isArray(filters)) filters=[filters];
			for(var i=0;i<filters.length;i++){
				f=filters[i];
				filter.push(f['field'])
				filter['_k'+f['field']]=f['values'];
			}
			
			if(match==null){
				// 精确匹配
				filter.matchfn=function(k,v){
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v==vs[i]) return true;
					}
					return false;
				}
			}
			else if(match=='left'){
				// 从左匹配
				filter.matchfn=function(k,v){
					var vs=this['_k'+k],t;
					for(var i=0,l=vs.length;i<l;i++){
						t=vs[i]
						if(v==t) return true;
						if(v==null) return false;
						if(v.indexOf(t)==0) return true;
					}
					return false;
				}
			}
			else if(match=='contain'){
				// 模糊匹配
				filter.matchfn=function(k,v){
					var vs=this['_k'+k],t;
					for(var i=0,l=vs.length;i<l;i++){
						t=vs[i]
						if(v==t) return true;
						if(v==null) return false;
						if(v.indexOf(t)>-1) return true;
					}
					return false;
				}
			}

			
			var starti=0;
			if(startnodeid!=null){
				// 找到搜索起点
				for(var l=_data.length;starti<l;){
					if(_data[starti++][_field_id]==startnodeid) break;
				}
			}
			//记录实际查询的开始位置
			var _relstarti=starti-1;
			// 搜索匹配数据
			var mi=0,ml=filter.length,d,nodeid=null;
			for(var l=_data.length;starti<l;starti++){
				d=_data[starti];
				for(mi=0;mi<ml;mi++){
					if(filter.matchfn(filter[mi],d[filter[mi]])){
						nodeid=d[_field_id];
					}
				}
				if(nodeid!=null) break;
				if(_relstarti==starti||(_relstarti==-1&&starti==l-1)){
					alert("未找到匹配项！")
					break;
				}else if(starti==l-1){
					starti=-1;
				}
			}
			
			if(nodeid==null) return;
			
			
			// 定位选中节点
			var paths=getselectpath(nodeid);
			_showRootNodeById(paths[0])
			for(var j=0,m=paths.length-1;j<m;j++){
				node=_treenode['node'+paths[j]];
				if(node!=null && node.getAttribute('stat')=='close') 
					_node_click_load.apply(node,[true]);
			}
			var viewnode=_treenode['node'+nodeid]
			_body_click_style.apply(viewnode.body);
			var top=Ext.lt.HTML.positionedOffset(viewnode,_tagel).top;
			if(top>(_tagel.offsetHeight+_tagel.scrollTop-viewnode.scrollHeight-50)){
				_tagel.scrollTop=top-_tagel.offsetHeight+50;
				return nodeid;
			}
			if(top<_tagel.offsetHeight){
					_tagel.scrollTop=0;
					return nodeid;
			}
			
			if(top<_tagel.scrollTop){
				_tagel.scrollTop=top-50;
				return nodeid;
			}
			return nodeid;
		}
	}
	
	// 与框架布局管理关联
	//Ext.lt.message.hook("layout","endlayout",_tree.resize);
	return _tree;
}

Ext.lt.dateutil=new function(){
	var lunarInfo = new Array(
	0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);
	var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
	var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
	var cmStr = new Array('日', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊');
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至")
	var lFtv = new Array("0101*春节", "0115 元宵节", "0505 端午节", "0707 七夕", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年", "0100*除夕")
	var sFtv = new Array("0101*元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节", "0801 建军节", "0910 教师节", "1001*国庆节", "1101 万圣节", "1108 记者日", "1225 圣诞节", "0513 母亲节", "0617 父亲节")

	function cyclical(num) { return (Gan[num % 10] + Zhi[num % 12]) }
	function lYearDays(y) {
    var i, sum = 348
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0
    return (sum + leapDays(y))
	}
	function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
    else return (0)
	}
	function leapMonth(y) { return (lunarInfo[y - 1900] & 0xf) }
	function monthDays(y, m) { return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29) }
	function Lunar(objDate) {
    var i, leap = 0, temp = 0
    var baseDate = new Date(1900, 0, 31)
    var offset = (objDate - baseDate) / 86400000
    this.dayCyl = offset + 40
    this.monCyl = 14
    for (i = 1900; i < 2050 && offset > 0; i++) {
        temp = lYearDays(i)
        offset -= temp
        this.monCyl += 12
    }
    if (offset < 0) {
        offset += temp;
        i--;
        this.monCyl -= 12
    }
    this.year = i
    this.yearCyl = i - 1864
    leap = leapMonth(i)
    this.isLeap = false
    for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == (leap + 1) && this.isLeap == false)
        { --i; this.isLeap = true; temp = leapDays(this.year); }
        else
        { temp = monthDays(this.year, i); }
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false
        offset -= temp
        if (this.isLeap == false) this.monCyl++
    }
    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap)
        { this.isLeap = false; }
        else
        { this.isLeap = true; --i; --this.monCyl; }
    if (offset < 0) { offset += temp; --i; --this.monCyl; }
    this.month = i
    this.day = offset + 1
	}	
	function cDay(m, d) {
		d=parseInt(d);
	    var nStr2 = new Array('初', '十', '廿', '卅', '　'); var s
	    s = cmStr[m] + '月'
	    switch (d) {
	        case 10: s += '初十'; break;
	        case 20: s += '二十'; break;
	        case 30: s += '三十'; break;
	        default: s += nStr2[Math.floor(d / 10)]; s += nStr1[Math.round(d % 10)];
	    } return (s)
	}

	// 返回中文的年月日格式
	this.YYMMDD=function(dateobj) {
		if(dateobj==null) dateobj=new Date();
		return ('' + dateobj.getFullYear() + '-' + (dateobj.getMonth() + 1) + '-' + dateobj.getDate() + '') 
	}
	// 返回星期数
	this.weekday=function(dateobj) {
		if(dateobj==null) dateobj=new Date();
		var cl = '';
		return (cl + '星期' + nStr1[dateobj.getDay()] + '');
	}
	// 返回节日
	this.holiday=function(dateobj){
		var SY = dateobj.getFullYear(); SM = dateobj.getMonth(); SD = dateobj.getDate();
		for (var i=0,loop=sFtv.length;i<loop;i++)
			if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - (SM + 1)
				tmp2 = Number(RegExp.$2) - SD
				if (tmp1 == 0 && tmp2 == 0) return RegExp.$4
			}
	}
	//返回中国传统节日
	this.chinaholiday=function(dateobj){
		// 转换为阴历
		var lDObj = new Lunar(dateobj);

		for (var i=0,loop=lFtv.length;i<loop;i++)
			if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - lDObj.month
				tmp2 = Number(RegExp.$2) - lDObj.day
				if (tmp1 == 0 && tmp2 == 0) return RegExp.$4
			}		
	}
	
	// 返回农历和节日
	this.solarDay=function(dateobj) {
		var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758)
		var sDObj = dateobj;
		var SY = dateobj.getFullYear(); SM = dateobj.getMonth(); SD = dateobj.getDate();
		var lDObj = new Lunar(sDObj);
		var lDPOS = new Array(3)
		var festival = '', solarTerms = '', solarFestival = '', lunarFestival = '', solarTerms = '', tmp1, tmp2;

		for (var i=0,loop=lFtv.length;i<loop;i++)
			if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - lDObj.month
				tmp2 = Number(RegExp.$2) - lDObj.day
				if (tmp1 == 0 && tmp2 == 0) lunarFestival = RegExp.$4
			}


		if (lunarFestival == '') {
			for (var i=0,loop=sFtv.length;i<loop;i++)
				if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
					tmp1 = Number(RegExp.$1) - (SM + 1)
					tmp2 = Number(RegExp.$2) - SD
					if (tmp1 == 0 && tmp2 == 0) solarFestival = RegExp.$4
				}

				if (solarFestival == '') {
					tmp1 = new Date((31556925974.7 * (SY - 1900) + sTermInfo[SM * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
					tmp2 = tmp1.getUTCDate()
					if (tmp2 == SD) solarTerms = solarTerm[SM * 2 + 1]
					tmp1 = new Date((31556925974.7 * (SY - 1900) + sTermInfo[SM * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
					tmp2 = tmp1.getUTCDate()

					if (tmp2 == SD) solarTerms = solarTerm[SM * 2]
					if (solarTerms == '') sFtv = ''; else sFtv = solarTerms
				} else sFtv = solarFestival
		} else sFtv = lunarFestival
		if (sFtv == '')
			sTermInfo = cyclical(lDObj.year - 1900 + 36) + '年 农历' + cDay(lDObj.month, lDObj.day)
		else sTermInfo = cDay(lDObj.month, lDObj.day) + ' ' + sFtv + ''
		return (sTermInfo)
	}
	
	this.YYYYMMDD=function(v){
		var _datevalue='';
		if(typeof(v)=='string'){
			if(v.length=8){
				// 8位数字，可能是YYYYMMdd形式
				_datevalue=v
			}
			else{
				var dateobj=new Date(parseInt(ds[_input.name],10));
				var mm=(dateobj.getMonth()<9?'0':'')+(dateobj.getMonth() + 1);
				var dd=(dateobj.getDate()<10?'0':'')+dateobj.getDate();
				_datevalue=dateobj.getFullYear()  + mm +  dd;
			}
		}
		else if(typeof(v)=='number'){
				var dateobj=new Date(v);
				var mm=(dateobj.getMonth()<9?'0':'')+(dateobj.getMonth() + 1);
				var dd=(dateobj.getDate()<10?'0':'')+dateobj.getDate();
				_datevalue=dateobj.getFullYear()  + mm +  dd;
		}
		else if(Ext.lt.isDate(v)){
				var mm=(v.getMonth()<9?'0':'')+(v.getMonth() + 1);
				var dd=(v.getDate()<10?'0':'')+v.getDate();
				_datevalue=v.getFullYear()  + mm +  dd;
		}
		return _datevalue;
	}
	
}



// 布局管理，防止重复加载
if(Ext.lt.layout==null){
Ext.lt.layout=new function(){
	var elroot=document.body;
	var _onload_fn=[];
	var sidebardiv=document.createElement('DIV');
	sidebardiv.style.cssText='position:absolute;font-size:5px;line-height:5px'
	Ext.lt.aninmation(sidebardiv);
	// 布局调整是否在运行
	this.running=false;
	
	function showfoldbar(el,foldside){
		sidebardiv.innerHTML=foldside;
		el.appendChild(sidebardiv);
		sidebardiv.style.height=(foldside=='bottom'||foldside=='top')?'5px':(el.offsetHeight+'px')
		sidebardiv.style.width=(foldside=='bottom'||foldside=='top')?(el.offsetWidth+'px'):'5px'
		sidebardiv.style.top=(foldside=='bottom')?((el.offsetHeight-5)+'px'):'0px'
		sidebardiv.style.left=(foldside=='right')?((el.offsetWidth-5)+'px'):'0px'
	}
	
	function addLayout(pel,el,c){
		if(pel==null) pel=document.body;
		if(pel.childlayoutelement==null) pel.childlayoutelement=[]
		
		pel.childlayoutelement.push(el)
		el.layout=Ext.lt.apply({h:{},w:{}},c);
		if(el.style.position=='')el.style.position='relative';
		// 为了防止元素长宽不能修改，将元素样式改为溢出隐藏
		//el.style.overflow='hidden';
		
		// 如果设置折叠属性，则创建折叠事件
		if(el.layout.fold==null || true) return;
		if(el.layout.fold.bottom) el.style.paddingBottom='5px';
		Ext.lt.bindEvent(el,'onmousemove',function(en){
			var x=en.offsetX,y=en.offsetY;
			if(this.layout.fold.bottom!=null && el._h-y<5) showfoldbar(el,'bottom');
			if(this.layout.fold.top!=null && el._h-y<5) showfoldbar(el,'top');
			if(this.layout.fold.left!=null && el._h-y<5) showfoldbar(el,'left');
			if(this.layout.fold.right!=null && el._h-y<5) showfoldbar(el,'right');
		})
		
		
	}
	
	function getOffsetHeight(el){
		var style=el.currentStyle==null?el.style:el.currentStyle;
		var mt=parseInt(style.paddingTop,10),ml=parseInt(style.paddingBottom,10);
		if(el.tagName=="BODY") return document.documentElement.scrollHeight-mt-ml;
		return el.offsetHeight-mt-ml;
	}
	
	function getOffsetWidth(el){
		var style=el.currentStyle==null?el.style:el.currentStyle;
		var mt=parseInt(style.paddingLeft,10),ml=parseInt(style.paddingRight,10);
		if(el.tagName=="BODY") return document.documentElement.clientWidth;
		return el.offsetWidth;
	}
	
	this.doLayout=function(el){
		_doLayout(el);
		Ext.lt.message.send("layout","endlayout");
		Ext.lt.layout.running=false;
	}
	
	function _doLayout(pel){
		if(pel==null) pel=document.body;
		if(pel!=document.body) {
			if(pel.style.overflow=='') pel.style.overflow="hidden";
		}
		
		var el,els=pel.childlayoutelement,_pw=pel._w,_ph=pel._h;
		
		if(els==null) return;
		if(pel.tagName=="BODY"){
			var border=Ext.lt.HTML.getBorderSet(document.body);
			_pw=document.documentElement.clientWidth-border.width;
			_ph=Ext.lt.HTML.getBodyHeight()-border.height;
		}
		
		// 记录初始布局
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			pel=el.parentElement;
			el._w=el.offsetWidth,el._h=el.offsetHeight;
			
			if(Ext.lt.ieversion=='6' && el.style.styleFloat =='left'){
				el.style.marginRight='-3px';
				el.ie6widthfix=true
			}
							
			var border=Ext.lt.HTML.getBorderSet(el,['margin','border']);
			el._wfix=border.width+(el.ie6widthfix==true?3:0); 
			el._hfix=border.height;
		}
		
		// 应用布局
		var _brothers,_tempel,_autoel=[],style,pstyle;
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			style=el.currentStyle==null?el.style:el.currentStyle;
			if(el==null) continue;
			
			// 处理布局设置的逻辑
			var _wconfig=el.layout.w,_w=_pw;
			// 设置横向溢出属性
			if(_wconfig.overflow!=null){
				el.style.overflowX=_wconfig.overflow
				if(_wconfig.overflow=='scroll') el._hfix+=18;
			}
			if(_wconfig.fit!=null && _wconfig.fit!='auto'){
				if(_wconfig.fit==true) _w=_pw;
				else if(_wconfig.fit>1) _w=_wconfig.fit;
				else if(_wconfig.fit>0) _w=_pw*_wconfig.fit;
				else if(_wconfig.fit<0) _w=_pw+_wconfig.fit;
				
				// 处理最小宽度设置			
				if(_w<_wconfig.min){
					_w=_wconfig.min;
				}
				
				var elw=parseInt(style.paddingLeft,10);
				if(!isNaN(elw))_w-=elw;
				var elw=parseInt(style.paddingRight,10);
				if(!isNaN(elw))_w-=elw;
				
				if(_w<0) _w=0;
				el._w=(_w-el._wfix>0?_w-el._wfix:0);
				el.style.width=el._w+'px';
			}
			else if(_wconfig!=null){
				//el._w=_pw
			}
			
			var _hconfig=el.layout.h,_h=_ph,_tempelm;
			// 设置纵向溢出属性
			if(_hconfig.overflow!=null){
				el.style.overflowY=_hconfig.overflow
				if(_hconfig.overflow=='scroll') el._wfix+=18;
			}
			if(_hconfig.fit!=null && _hconfig.fit!='auto'){
				if(_hconfig.fit==true) _h=_ph;
				else if(_hconfig.fit>1) _h=_hconfig.fit;
				else if(_hconfig.fit>0) _h=_ph*_hconfig.fit;
				else if(_hconfig.fit<0) _h=_ph+_hconfig.fit;
				// 处理最小宽度设置			
				if(_h<_hconfig.min){
					_h=_hconfig.min;
				}
				
				var elh=parseInt(style.paddingTop,10);
				if(!isNaN(elh))_h-=elh;
				var elh=parseInt(style.paddingBottum,10);
				if(!isNaN(elh))_h-=elh;
				
				try{
					if(_h<0 || style.visibility=='hidden' || style.display=='none') _h=0;
				}catch(e){
					_h=0;
				}
				try{
					el._h=(_h-el._hfix>0?_h-el._hfix:0);
					el.style.height=el._h+'px'
				}catch(e){}
			}
			else if(_hconfig!=null){
				//el._h=_ph;
			}
			
			if((_wconfig!=null && _wconfig.fit=='auto')||(_hconfig!=null && _hconfig.fit=='auto')){
				_autoel.push(el);
			}
			// 处理下级样式
			else if(el.childlayoutelement!=null) _doLayout(el);
		}
		
		
		
		// 处理'auto'样式
		for(var i=0,l=_autoel.length;i<l;i++){
			el=_autoel[i];
			style=el.currentStyle==null?el.style:el.currentStyle;
			pstyle=el.parentElement.currentStyle==null?el.parentElement.style:el.parentElement.currentStyle;
			// 处理布局设置的逻辑
			var _wconfig=el.layout.w,_w=_pw;
			if(_wconfig.fit!=null && _wconfig.fit=='auto'){
				if(_wconfig.fit=='auto') {
					var _divw=getOffsetWidth(el.parentElement),_brothers=el.parentElement.children;
					var elw=parseInt(pstyle.paddingLeft,10);
					if(!isNaN(elw))_divw-=elw;
					var elw=parseInt(pstyle.paddingRight,10);
					if(!isNaN(elw))_divw-=elw;
					
					for(var wi=0,wl=_brothers.length;wi<wl;wi++){
						_tempel=_brothers.item(wi);
						//如果样式带绝对路径不计算。（宽）
						if(el!=_tempel && _tempel.tagName!='!' && _tempel.tagName!='SCRIPT' && _tempel.tagName!='LINK' && _tempel.tagName!='STYLE' && _tempel.currentStyle.visibility!='hidden' && _tempel.currentStyle.display!='none'&&_tempel.style.left==""&&_tempel.style.right==""){
							_divw-=_tempel._w==null?_tempel.offsetWidth:(_tempel._w+_tempel._wfix);
							
							var _tempelm=parseInt(_tempel.currentStyle.marginLeft,10)
							_divw-=isNaN(_tempelm)?0:_tempelm;
							var _tempelm=parseInt(_tempel.currentStyle.marginRight,10)
							_divw-=isNaN(_tempelm)?0:_tempelm;
							
							_divw-=_tempel.ie6widthfix==true?3:0;
						}
					}
					_w=_divw;

					var elw=parseInt(style.marginLeft,10);
					if(!isNaN(elw))_w-=elw;
					var elw=parseInt(style.marginRight,10);
					if(!isNaN(elw))_w-=elw;

					var elw=parseInt(style.borderLeftWidth ,10);
					if(!isNaN(elw))_w-=elw;
					var elw=parseInt(style.borderRightWidth,10);
					if(!isNaN(elw))_w-=elw;
					
					_w-=el.ie6widthfix==true?3:0
				}
				
				// 处理最小宽度设置			
				if(_w<_wconfig.min){
					_w=_wconfig.min;
				}
				if(_w<0) _w=0;
				el._w=(_w-el._wfix>0?_w-el._wfix:0);
				el.style.width=el._w+'px';
				
			}
			
			var _hconfig=el.layout.h,_h=_ph,_tempelm;
			if(_hconfig.fit!=null && _hconfig.fit=='auto'){
				if(_hconfig.fit=='auto') {
					var _divh=getOffsetHeight(el.parentElement),_brothers=el.parentElement.children;
					var elh=parseInt(pstyle.paddingTop,10);
					if(!isNaN(elh))_divh-=elh;
					var elh=parseInt(pstyle.paddingBottom,10);
					if(!isNaN(elh))_divh-=elh;
					
					for(var hi=0,hl=_brothers.length;hi<hl;hi++){
						_tempel=_brothers.item(hi);
						var _tstyle=_tempel.currentStyle==null?_tempel.style:_tempel.currentStyle;
							//如果样式带绝对路径不计算。（高）
						if(el!=_tempel && _tempel.tagName!='!' && _tempel.tagName!='SCRIPT' && _tempel.tagName!='LINK' && _tempel.tagName!='STYLE' && _tstyle.visibility!='hidden' && _tstyle.display!='none'&&_tempel.style.bottom==""&&_tempel.style.top==""&&_tstyle.position!="absolute"){
							_divh-=_tempel.offsetHeight
							_tempelm=parseInt(_tstyle.marginTop,10);
							_divh-=isNaN(_tempelm)?0:_tempelm;
							_tempelm=parseInt(_tstyle.marginBottom,10)
							_divh-=isNaN(_tempelm)?0:_tempelm;
							_divh-=_tempel.tagName=='FORM'?10:0;
						}
					}
					_h=_divh
					_tempelm=parseInt(style.marginTop,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					_tempelm=parseInt(style.marginBottom,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					
					_tempelm=parseInt(style.borderTopWidth,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					_tempelm=parseInt(style.borderBottomWidth,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
				}
				// 处理最小宽度设置			
				if(_h<_hconfig.min){
					_h=_hconfig.min;
				}
				if(_h<0 || style.visibility=='hidden' || style.display=='none') _h=0;
				try{
					el._h=(_h-el._hfix>0?_h-el._hfix:0);
					el.style.height=el._h+'px'
				}catch(e){}
			}
			
			// 处理下级样式
			if(el.childlayoutelement!=null) _doLayout(el);
		}

	}
	var doLayout=this.doLayout;
	
	// 递归查找设置布局的页面元素
	function initLayoutElement(pel,cel){
		if(cel.ignorelayout==true) return;
		var els=cel.children,el,layout;
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			//if(el.tagName=='IFRAME') continue;
			layout=el.getAttribute("layout");
			if(layout!=null && typeof(layout)=='string'){
				try{
					eval("config="+layout)
					addLayout(pel,el,config);
				}
				catch(ex){}
				initLayoutElement(el,el);
			}
			else{
				initLayoutElement(pel,el);
			}
		}
	}
	
	this.init=function(){
		var config,el;
		// 遍历页面所有HTML元素
		var root=document.body;
		if(root.initlayout==true) return ;
		root.initlayout=true;
		var els=root.children,layout;
		for(var i=0,l=els.length;i<l;i++){
			el=els.item(i);
			//if(el.tagName=='IFRAME') continue;
			layout=el.getAttribute("layout");
			if(layout!=null && typeof(layout)=='string'){
				try{
					eval("config="+layout)
					addLayout(root,el,config);
				}
				catch(ex){}
				initLayoutElement(el,el);
			}
			else{
				initLayoutElement(root,el);
			}
		}
		setTimeout(function(){
			Ext.lt.layout.doLayout();
			
			for(var i=0,l=_onload_fn.length;i<l;i++){
				//try{
					_onload_fn[i]();
				//}catch(e){}
			}
		},100)
	}
	
	this.on=function(fn){
		_onload_fn.push(fn)
	}
	
	// 布局模板
	this.template=function(config){
		var _cmp={};
		
		_cmp.draw=function(){
			
			
		}
		
		return _cmp;
	}
	
	
	
	// 从页面中获取需要需要做布局控制的元素
	Ext.lt.onload(this.init);
	
	Ext.lt.bindEvent(window,'onresize',function(){
		if(!Ext.lt.layout.running){
			Ext.lt.layout.running=true;
			window.setTimeout(Ext.lt.layout.doLayout,200);
		}
	});

}
}


// 页面消息循环
Ext.lt.message=new function(){
	var _reghooks={};
	
	
	// 向页面中发送消息
	this.send=function(src,type,msg){
		if(_reghooks[type+"@"+src]==null) return;
		var fns=_reghooks[type+"@"+src];
		for(var i=0,j=fns.length;i<j;i++){
			fns[i](msg);
		}
	};
	
	// 从页面中获取消息，并执行指定回调函数
	this.hook=function(src,type,fn){
		if(_reghooks[type+"@"+src]==null) _reghooks[type+"@"+src]=[];
		for(var i=0,j=_reghooks[type+"@"+src].length;i<j;i++){
			// 校验重复注册
			if(_reghooks[type+"@"+src][i]==fn) return;
		}
		_reghooks[type+"@"+src].push(fn);
	};

	// 取消监听的页面消息
	this.unhook=function(src,type,fn){
		if(_reghooks[type+"@"+src]==null) return;
		var newfn=[],fns=_reghooks[type+"@"+src];
		
		for(var i=0,j=fns.length;i<j;i++){
			// 校验重复注册
			if(fns[i]!=fn) newfn.push(fns[i]);
		}
		_reghooks[type+"@"+src]=newfn;
	};
	
	// 保存浏览器默认alert函数
	var _alert=window.alert;
	this.assistfn=function(msg,helpobj){
		if(_reghooks[helpobj+"@assistfn"]==null) return;
		var fns=_reghooks[helpobj+"@assistfn"];
		if(fns==null||fns.length==0)return null;
		return fns[0]();
	}
	
	var _messageDiv=document.createElement('DIV');
	//Ext.lt.HTML.expand(_messageDiv);
	_messageDiv.className='alertbox';
	_messageDiv.style.display='none'
	Ext.lt.HTML.setInnerHTML(_messageDiv,'<div class="message-t"><button class="closebtn" overclass="closebtn_over" clickclass="closebtn_click"></button></div><div class="message-h">来自系统的消息</div><div class="message-c"><table cellSpacing=0><tr><td colSpan=2><div class="content"></div></td></tr><tr class="function"><td class="help"><a href="#">点击这里获取更多帮助</a></td><td class="btn" align="right"><button>确定</button></td></tr></table></div><div class="message-b"></div>');
	
	var _messagedrag=_messageDiv.children.item(1)
	var _messagebody=_messageDiv.children.item(2).firstChild.rows.item(0).cells.item(0).firstChild;
	var _messagehelp=_messageDiv.children.item(2).firstChild.rows.item(1).cells.item(0);
	var _messageclosebtn=_messageDiv.getElementsByTagName('BUTTON').item(0);
	var _messagebtn=_messageDiv.getElementsByTagName('BUTTON').item(1);
	
	var _append=false;
	
	function _close(){
		_messageDiv.style.display='none';
		_messagebody.innerText='';
		_messageDiv.style.height='';
		Ext.lt.message.send('alert','close',this);
		Ext.lt.HTML.unmark();
	}
	
	_messagebtn.onclick=_close;
	_messageclosebtn.onclick=_close;
		
	window.alert=function(msg,helpobj){
		// 界面没有初始化完毕
		if(document.body==null){
			_alert(msg)
		}
		
		// 检查提示框是否已经追加到页面中
		if(!_append){
			document.body.appendChild(_messageDiv);
			Ext.lt.HTML.drag({element:_messagedrag,holder:false,dragel:_messageDiv});
			_append=true
		}
		
		// 没有帮助信息时使用浏览器默认提示窗口
		if(helpobj==null){
			_alert(msg);
		}
		else{
			if(_messageDiv.style.display==''){
				_messagebody.innerText+="\r\n"+msg;
			}
			else{
				_messagebody.innerText=msg;
				var helpcontent='';
				if(Ext.lt.message.assistfn!=null){
					helpcontent=Ext.lt.message.assistfn(msg,helpobj);
				}
				_messagehelp.innerHTML=helpcontent==null?'':helpcontent;

				_messageDiv.style.display='';
				
				Ext.lt.HTML.center(_messageDiv);
				_messagebody.style.height=_messagebody.offsetHeight>150?150:'auto'
				_messagebody.style.width=474;
				_messageDiv.style.zIndex=Ext.lt.getNextZIndex();
				Ext.lt.HTML.mark();
				Ext.lt.message.send('alert','show');
			}
		}
	}
}


//消息提示框中文设置
if(Ext.Msg!=null){
	Ext.Msg.buttonText.ok="确定";
	Ext.Msg.buttonText.cancel="取消";
	Ext.Msg.buttonText.yes="确定";
	Ext.Msg.buttonText.no="取消";
}
Ext.lt.shutter=new function(){};


Ext.lt.window=function(d){
	var _config=Ext.lt.apply({icon:'wnd_icon',className:'wnd',style:'',bodystyle:'',title:'&nbsp;',autoshow:true,close:true,w:100,h:100,fitmode:'body',mark:false,drag:false},d)
	if(_config.id==null) _config.id='wnd'+Ext.lt.getNextSeqValue();
	
	
	var wind=document.createElement('DIV');
	wind.id=_config.id;
	wind.className=_config.className;
	if(_config.pop){
		wind.style.cssText='width:'+_config.w+'px;height:'+_config.h+'px';
	}
	Ext.lt.HTML.setStyle(wind,_config.style.replace(/\s/g,''))
	wind.style.display='none';

	
	if(_config.onclose!=null) _config.onclose=Ext.lt.util.fnbind(_config.onclose,wind);
	var _events={
		'close':function(){if(_config.onclose==null){return}else{return _config.onclose()}},
		'ruin':function(){if(_config.onruin==null){return}else{return _config.onruin()}},
		'show':function(){if(_config.onshow==null){return}else{return _config.onshow()}},
		'hidden':function(){if(_config.onhidden==null){return}else{return _config.onhidden()}}
	};
	function _fireEvent(en,param){
		if(_events[en]!=null) return _events[en](param);
	}


	if(_config.layout!=null)wind.setAttribute('layout',_config.layout);
	
	
	
	
	var _html=['<table width="100%"  border="0" cellSpacing="0" cellPadding="0"><tr class="head"><td class="left"></td><td class="bg"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="',_config.icon,'">&nbsp;</td><td class=" title" NOWRAP >',_config.title,'</td><td class="closewidth">',(_config.instack?
	'<button method=collect type="button" class=btn_collect overclass=btn_collect_over title=收藏窗口></button><button type="button"  method=toggle class=btn_toggle overclass=btn_toggle_over title=切换窗口></button>':''),(_config.close?
	'<button method=close type="button"  class=btn_close overclass=btn_close_over title=关闭></button>':''),(_config.ruin?
	'<button method=ruin type="button"  class=btn_ruin overclass=btn_ruin_over title=关闭></button>':''),'</td></tr></table></td><td class="right"></td></tr>',
	'<tr class="foot"><td class="left_bg"></td><td><div class="wbody">',
	'</div></td><td class="right_bg">&nbsp;</td></tr><tr class="foot"><td class="tw_bl"></td><td class="tw_bbg"></td><td class="tw_br"></td></tr></table>'];
	
	
	wind.collect = function(){
	    Ext.lt.message.send("window","collectwindow",wind);
	}
	wind.toggle = function(){ //窗口切换交给窗口堆栈来做
		this.close();
		Ext.lt.message.send("window","togglewindow",wind);
	}
	
	wind.resetTitle=function(title){
		this.head.rows[0].cells[1].innerHTML = title;
	};
	
	wind.getTitle=function(){
		return this.head.rows[0].cells[1].innerHTML;
	};
	
	wind.draw=Ext.lt.util.fnbind(function(div){
		if(_config.pop){
			document.body.appendChild(this);    
		}
		else{
			div.insertAdjacentElement('beforeBegin',this);
		}
		Ext.lt.HTML.setInnerHTML(this,_html.join(''))
		this.head=wind.firstChild.rows.item(0).cells.item(1).firstChild;
		this.body=wind.lastChild.rows.item(1).getElementsByTagName('DIV').item(0);
		Ext.lt.HTML.setStyle(this.body,_config.bodystyle.replace(/\s/g,''));

		var btns=this.getElementsByTagName('BUTTON');
		for(var i=0;i<btns.length;i++){
			btns[i].onclick=function(){
				var m=this.getAttribute('method');
				if(wind[m]!=null) 
					wind[m]();
			}
		}
		
		this.body.appendChild(div);
		
		if(_config.pop){
			this.style.position='absolute';
	      // 生成拖拽对象
	      if(_config.drag){
	    	  Ext.lt.HTML.drag({
		      	element:this.head.rows.item(0).cells.item(1),
		      	dragel:this,
		      	holder:false,
				nomove:true
		      });
			}
		}
		// 显示窗口
		if(_config.autoshow){
			this.show();
		}
		else{
//			this.close();	
		}
	},wind);
	
	// 关闭窗口(实际为最小化)
	wind.close=function(){
		if(_fireEvent('close')!=false) wind.hide();
		Ext.lt.message.send("window","minwindow",wind); //发送关闭消息到窗口堆栈
	}
	//关闭窗口（文档流中移除）
	wind.ruin=function(){
		if(_config.mark) Ext.lt.HTML.unmark();
		if(_fireEvent('ruin')!=false){
			var _close=wind.window.contentWindow.onclose;
			if(_close!=null&&_close()==false){
				return;
			}
			if(Ext.lt.isie){
				wind.removeNode(true);
			}else{
				var dandy = wind.parentNode; 
				try{
					dandy.removeChild(wind);
				}catch(e){
				}
			}
			
			Ext.lt.message.send("window","ruinwindow",wind);
		}
	}
 
	wind.hide=function(){
		if(_config.mark) Ext.lt.HTML.unmark();
		if(_fireEvent('hidden')!=false)
		wind.style.display='none';
	}
	
	wind.show=Ext.lt.util.fnbind(function(){
		if(_fireEvent('show')==false) return;
		if(_config.mark){
			Ext.lt.HTML.mark();
		}
		this.style.display='';
		this.style.zIndex=Ext.lt.getNextZIndex();
		var w=this.offsetWidth,h=this.offsetHeight;
		if(w==0||h==0) return;
		// 设置窗口大小
		
		if(_config.fitmode=='body'){
			this.resize(w,h);
		}
		else if(_config.fitmode=='content'){
			var div=this.body.firstChild;
			this.resize(div.offsetWidth,div.offsetHeight);
		}
		
		
		if(_config.left==null){
			this.style.left=((document.documentElement.offsetWidth-w)/2)+'px';
		}
		else{
			this.style.left=_config.left+'px';
		}

		if(_config.top==null){
			this.style.top=((Ext.lt.HTML.getBodyHeight()-this.offsetHeight)*0.4)+'px';
		}
		else{
			this.style.top=_config.top+'px';
		}
	},wind);
	
	wind.isopened=function(){
		return wind.style.display!='none';
	}

	wind.isclose=function(){
		return wind.style.display=='none';
	}
	
	wind.resize=function(w,h){

		var bodyborder_leftobj=this.body.parentElement.previousSibling
		var leftRstyle=Ext.lt.HTML.getRealStyle(bodyborder_leftobj);
		var bodyborder_left=isNaN(parseInt(leftRstyle.width,10))?bodyborder_leftobj.offsetWidth:parseInt(leftRstyle.width,10);

		var bodyborder_rightobj=this.body.parentElement.nextSibling
		var rightRstyle=Ext.lt.HTML.getRealStyle(bodyborder_rightobj);
		var bodyborder_right=isNaN(parseInt(rightRstyle.width,10))?bodyborder_rightobj.offsetWidth:parseInt(rightRstyle.width,10);

		var bodyborder_bottomobj=this.body.parentElement.parentElement.nextSibling
		var bodyborder_bottom=bodyborder_bottomobj.offsetHeight;
		
		var divborder = Ext.lt.HTML.getBorderSet(this.body);
		
		
		if(_config.fitmode=='body'){
			var windborder=Ext.lt.HTML.getBorderSet(this);
			this.style.width=w+'px';
			this.style.height=h+'px';
			this.body.style.width=(w-bodyborder_left-bodyborder_right-windborder.width-divborder.width)+'px';
			this.body.style.height=(h-this.head.offsetHeight-bodyborder_bottom-windborder.height)+'px';
		}
		else if(_config.fitmode=='content'){
			this.body.style.width=(w)+'px';
			this.body.style.height=(h)+'px';
			this.style.width=(bodyborder_left+bodyborder_right+w+divborder.width)+'px'
			this.style.height=(this.head.offsetHeight+h+bodyborder_bottom)+'px'
		}
	}
	
	Ext.lt.HTML.expandHTMLElement(wind);
	
	return wind;
}

Ext.lt.window2=function(config){
	var _config=Ext.lt.apply({
			icon:'wnd_icon',className:'wnd',title:config.title,autoshow:true,showClose:true,w:100,h:100,fitmode:'body',mark:true,drag:false,pop:true},config)
	if(_config.id==null) _config.id='wnd'+Ext.lt.getNextSeqValue();
	

	var _id=_config.id;
	var struct_out='<div class="str_l"></div><div class="str_r"></div><div class="str_t"></div><div class="str_b"></div><div class="str_lt"></div><div class="str_rt"></div><div class="str_lb"></div><div class="str_rb"></div><div></div>';
	var struct_in='<div class="head" style="width:100%;position:relative"></div><div class="body" style="overflow:auto;width:100"></div><div class="bottom" style="width:100%"></div>';
	var _wind=document.createElement("div");
	var _inner,_head,_body,_bottom,_title;
	var _l,_t,_r, _b;
	var _buttons=_config.buttons==null?[]:_config.buttons;
	var _btn_close;
	var _mark=_config.mark;
	var _showClose=_config.showClose==true;
	
	
	
	
	function parse(n){
		var i=parseInt(n,10);
		return isNaN(i)?0:i;
	};
	
	function _setTitle(title){
		_title.innerHTML=title;
	}
	function _getTitle(){
		return _title.innerHTML;
	}

	
	function _initWindow(){
		_wind.id=_id;
		_wind.className=_config.className;
		if(_config.pop) _wind.style.cssText='display:none;position:absolute';
		
		document.body.appendChild(_wind);
		_wind.innerHTML=struct_out;
		var strs=_wind.children;
		var _lt=strs.item(4);
		var _rb=strs.item(7);
		_inner=strs.item(8);
		
		 _l=parse(Ext.lt.HTML.getRealStyle(_lt).width);
		 _t=parse(Ext.lt.HTML.getRealStyle(_lt).height);
		 _r=parse(Ext.lt.HTML.getRealStyle(_rb).width);
		 _b=parse(Ext.lt.HTML.getRealStyle(_rb).height);
		var _w=(~~_config.w>0)?~~_config.w:$(window).width()/3;
		var _h=(~~_config.w>0)?~~_config.h:$(window).height()/2;
		_w-=_l+_r;
		_h-=_t+_b;
		
		_inner.style.cssText='margin:'+_t+'px '+_r+'px '+_b+'px '+_l+'px;width:'+_w+'px;height:'+_h+'px;border:0px;overflow:hidden;';
		_inner.innerHTML=struct_in;
		
		strs=_inner.children;
		_head=strs.item(0);
		_body=strs.item(1);
		_bottom=strs.item(2);
		
		
		_wind.head=_head;
		_wind.body=_body;
		_wind.bottom=_bottom;
		
		var _html=['<div class="ico"></div><div class="btns" style="position:absolute;right:0px;top:0px">'];
		var btn_action={};
		for(var i=0,il=_buttons.length;i<il;i++){
			var btn=_buttons[i]
			_buttons[btn.id]=btn.action;
			_html.push('<input type="button" btnid="'+btn.id+'" overclass="'+btn.icon+'_over" class="'+btn.icon+'" title="'+btn.title+'"></button>');
		}
		
		
		_html.push(_showClose?'<input type="button" class="minimize" overclass="minimize_over" title="最小化窗口"/><input type="button" class="close" overclass="close_over" title="关闭窗口"/>':'');
		_html.push('</div><div class="title">'+(_config.title?_config.title:'&nbsp;')+'</div>');
		
		
		
		_head.innerHTML=_html.join('');
		strs=_head.children;
		_title=strs.item(2);
		var btndiv=strs.item(1);
		
		
		btndiv.onclick=function(en){
			var ent=en||window.event;
			var div=ent.srcElement;
			var btnid=div.getAttribute('btnid');
			for(var i=0,il=_buttons.length;i<il;i++){
				if(_buttons[i].id==btnid){
					_buttons[i].action.apply(div);
					return ;
				}
			}
		}
		
		_showClose&&(_btn_close=btndiv.lastChild);
		_showClose&&(_btn_close.onclick=_close);
		if(_showClose){
			_btn_close=btndiv.lastChild;
			_btn_close.onclick=_close;
			_btn_min = _btn_close.previousSibling;
			_btn_min.onclick=_hide;
		}
		
		if(_config.drag){
			Ext.lt.HTML.drag({
				element:_title,
				dragel:_wind,
				holder:false,
				nomove:true
			});
		}
		
	}
	
	function _show(){
		if(_mark) Ext.lt.HTML.mark();
		_wind.style.display='';
		_wind.style.zIndex=Ext.lt.getNextZIndex();
		
		var l=parse(_config.left),t=parse(_config.top);
		_wind.style.left=(_config.left?parse(_config.left):($(window).width()-_wind.offsetWidth)/2)+'px';
		_wind.style.top=(_config.top?parse(_config.top):($(window).height()-_wind.offsetHeight)/3)+'px';
		_layout();
		if(Ext.lt.isFunction(_config.onShow)) _config.onShow(_wind);
	}
	
	function _hide(){
		if(_mark) Ext.lt.HTML.unmark();
		_wind.style.display='none';
		if(Ext.lt.isFunction(_config.onHide)) _config.onHide(_wind);
	}
	_wind.hide=_hide;
	
	function _close(){
		if(Ext.lt.isFunction(_config.onClose)) _config.onClose(_wind);
		Ext.lt.HTML.removeNode(_wind);
		if(_mark) Ext.lt.HTML.unmark();
	}
	_wind.close=_close;
	function _layout(){
		var w=_inner.offsetWidth,h=_inner.offsetHeight;
		_head.style.width=w+'px';
		_body.style.width=w+'px';
		_bottom.style.width=w+'px';
		
		_body.style.height= h-_head.offsetHeight - _bottom.offsetHeight +'px';
		
	}
	
	
	
	_wind.draw=function(el){
		_body.appendChild(el);
		_show();
	}
	
	_wind.resize=function(w,h){
		_wind.style.width = w+'px';
		_wind.style.height = h+'px';
		w-=_l+_r;
		h-=_t+_b;
		_inner.style.width = w+'px';
		_inner.style.height = h+'px';
		_layout();
	}

	_wind.setTitle=_wind.resetTitle=_setTitle;
	_wind.getTitle=_getTitle;
	_wind.show = _show;
	
	_wind.insert=function(el){
		el.appendChild(_wind);
	}
	
	
	_wind.isopened=function(){
		return (!_wind.isclosed())&&_wind.style.display!='none';
	}

	_wind.ishide=function(){
		return (!_wind.isclosed())&&_wind.style.display=='none';
	}
	_wind.isclosed=function(){
		return !document.body.contains(_wind);
	}
	
	_initWindow();
	if(_config.title) _setTitle(_config.title);
	
	
	
	return _wind;
};

//封装们门户窗口
Ext.lt.portalwindow = function(cfg){
	var c = {buttons:[],showClose:false};
	c.buttons.push({id:'collect',icon:'wnd_collect',title:'收藏窗口',action:function(){
		 Ext.lt.message.send("window","collectwindow",cmp);
	}});
	c.buttons.push({id:'toggle',icon:'wnd_toggle',title:'切换窗口',action:function(){
		cmp.hide();
		Ext.lt.message.send("window","togglewindow",cmp);
	}});
	c.buttons.push({id:'minimize',icon:'wnd_minimize',title:'最小化窗口',action:function(){
		cmp.hide();
		Ext.lt.message.send("window","minwindow",cmp); 
	}});
	c.buttons.push({id:'close',icon:'wnd_close',mark:false,title:'关闭窗口',action:function(){
		cmp.close();
	}});
    var cmp = new Ext.lt.window2(Ext.lt.apply(c,cfg));
    var _close =cmp.close;
    cmp.close=function(){
    	var r = true;
    	if(Ext.lt.isFunction(cmp.onclose)) {
    		r = cmp.onclose();
    	}
    	if(r!=null&&r==false){ //so suck
    		return;
    	}
    	 _close();
    	Ext.lt.message.send("window","ruinwindow",cmp);
    }
	return cmp;
}




/**
弹出框组件，一般用于提示框
组件本身为一个DIV元素，对DIV元素进行了扩展
初始化参数为:
  id:String   组件引用ID，如果没有指定ID，组件会随机生成一个'popwindow'+随机数
  className:String  组件样式单，默认样式单名为sel

组件方法：
  checkEvent() 默认检测事件，如果用户动作在弹出框之外则关闭弹出框
  show()     弹出框打开后就开始监控鼠标动作，如果发现鼠标在其他组件上进行操作则自动关闭弹出框
  close()    关闭弹出框方法
  isShow()     返回弹出框显示状态，true表示窗口显示

事件：
  onclose    当窗口执行close方法后产生该事件

 */
Ext.lt.popwindow=function(config){
	var cfg=Ext.lt.apply({id:'popwindow'+Ext.lt.getNextSeqValue(),className:'sel'},config);
	var _pop=document.createElement('DIV');
	var _tagel=null;
	
	Ext.lt.aninmation(_pop);
	_pop.className=cfg.className;
	_pop.style.cssText='position:absolute;display:none;z-index:999999;overflow:auto;padding:2px;';
	Ext.lt.HTML.expandHTMLElement(_pop);
	var _popresize=document.createElement('DIV');
	_popresize.className='popresize';
	_popresize.style.cssText='position:absolute;top:100px;left:50px;display:block;width:16px;height:16px';
	
	// 默认检测事件，如果用户动作在弹出框之外则关闭弹出框
	_pop.checkEvent=function(srcobj){
			return _pop.contains(srcobj) || (_tagel!=null && _tagel.contains(srcobj))
	}
	_pop.documentEvent=function(){
		if(_pop.checkEvent(event.srcElement)!=true){
			_pop.close();
			Ext.lt.unbindEvent(document,"onclick",_pop.documentEvent);
			//document.detachEvent('onclick',_pop.documentEvent);
		}
	}
	// 弹出框打开后就开始监控鼠标动作，如果发现鼠标在其他组件上进行操作则自动关闭弹出框
	//modify jzy popwindow独立于el存在，使用绝对定位
	_pop.show=function(el){
		if(_pop.style.display!='') {
			_pop.style.display='';
			var bw=Ext.lt.HTML.getBorderSet(_pop);
			var _h1 = Math.max(_pop.scrollHeight,_pop.clientHeight);
			if(_h1<=150)_h1=150;
			var endHeight=_h1>300?300:_h1+bw.height;
			if(_pop.scrollWidth-_pop.offsetWidth>bw.width) endHeight+=18;
			_pop.style.height=endHeight<0?0:endHeight+'px';
			_h1=$(_pop).height();
			if(el!=null){
				document.body.appendChild(_pop); // el.insertAdjacentElement('beforeBegin',_pop);
				var p = $(el).offset();  //var p=Ext.lt.HTML.positionedOffset(el,null,true)  
				// 如果传el参数，则根据对象当前屏幕位置计算弹出框显示在对象上面还是下面
				//开始计算了  窗口高度  $(window).height()  p.top+el.offsetHeight是相对窗口的绝对坐标 
				var doc=document.body;var st=doc.scrollTop;
				var bw=Ext.lt.HTML.getBorderSet(_pop);
				var endHeight=_pop.offsetHeight==0?300:_pop.offsetHeight
				if(p.top+el.offsetHeight+endHeight>$(window).height()+st){
					_pop.style.top='';
					_pop.style.bottom = ($(window).height()-p.top)+'px';
				}else{
					_pop.style.bottom='';
					_pop.style.top=(p.top+el.offsetHeight)+'px';
				}
				_pop.style.left=p.left+'px';
				_pop.style.width=el.offsetWidth+'px';
				_tagel=el
			}
		}
		else{
			// 重新设定弹框大小
			_pop.style.height='auto'
		}
		
		Ext.lt.bindEvent(document,'onclick',_pop.documentEvent);
		if(Ext.lt.isFunction(_pop.onshow)){_pop.onshow();}
		

		
	}
	_pop.draw=function(s){
		_pop.innerHTML = s;
	}
	_pop.close=function(){
		_pop.style.display='none';
		_tagel=null;
		Ext.lt.unbindEvent(document,'onclick',_pop.documentEvent);
		if(Ext.lt.isFunction(_pop.onclose)){_pop.onclose();}
	}
	_pop.isShow=function(){return _pop.style.display==''};
	
	/*
	_pop.attachEvent('onmouseenter',function(){
		_pop.appendChild(_popresize);
	});
	*/
	
	
	return _pop;
}

Ext.lt.cookie=new function(){
	var cookie=document.cookie;
	this.add=function(name,value){
		var argv = this.add.arguments;
		var argc = this.add.arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : null;
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + escape(value)
				+ ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
				+ ((path == null) ? "" : ("; path=" + path))
				+ ((domain == null) ? "" : ("; domain=" + domain))
				+ ((secure == true) ? "; secure" : "");
		cookie=name + "=" + escape(value)
				+ ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
				+ ((path == null) ? "" : ("; path=" + path))
				+ ((domain == null) ? "" : ("; domain=" + domain))
				+ ((secure == true) ? "; secure" : "");
	}
	this.del=function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 100);
		var cval = this.get(name);
		cookie = name + "=" + cval + "; expires="
			+ exp.toGMTString() + ";path=/";
	}
	this.clear=function(){
		cookie = "";
	}
	this.get=function(key){
		var reg=key+'=(.*)';
		var vs=new RegExp(reg).exec(cookie)
		if(vs!=null){
			return vs[1].split(/;.*/)[0];
		}
		return null;
	}
	this.getKeys=function(){
	
	}
}

if(window.info_load==null) info_load={};
Ext.lt.showPageTest=function(){
	var tpltest='<table width=\'100%\' style=\'background:#fff\' height=\'40\'><tr><td colspan=2 style=" height:20px;font-size:12px; background:#FFF url(\''+_ROOT_PATH_+'/ltext/images/page_test_title.gif\') no-repeat left top;padding-left:18px;padding-top:1px;">性能测试</td></tr>'
	+'<tr><td ><ul><li>Javascript性能&nbsp;：{js}</li><li>DHTML性能　　&nbsp;&nbsp;：{dhtml}</li><li>HTML性能　　&nbsp;&nbsp;&nbsp;：{html}</li><li>网速测试　　&nbsp;&nbsp;&nbsp;：{web}</li></ul></td><td width=\'150\'>总评分:{all}</td></tr></table>';
	function showTest(obj){
		if(obj.web==null||obj.web=='null')obj.web=0;
		var value=obj.web;
		if(value!=0)value=(1/value)*10000;
		obj.web=value;
		if(value>1024){
			value=(value/1024+'').toNumber(2,false,1)+"MB/s";
		}else{
			value=(value+'').toNumber(2,false,1)+"KB/s";
		}
		obj.all=60
		obj.txt=''
		if(obj.js<3000){obj.all=parseFloat((obj.js/100+'').toNumber(2,false,1),10)}
		
		if(obj.web<40){
			obj.all+=parseFloat((obj.web/100+'').toNumber(2,false,1),10)
		}else{
			obj.all+=40;
		}
		
		if(obj.js<2000){
			if(Ext.lt.ieversion<8){
				obj.txt='建议您升级浏览器版本。';
			}else{
				obj.txt='建议您升级机器配置。';
			}
		}
		if(obj.web<20){
			obj.txt+='\t您的网络环境较差，下载访问速度较低。';
		}
		if(obj.txt==''){
			obj.txt='您的机器状态良好。';
		}
		return tpltest.replace('{js}',obj.js).replace('{dhtml}',obj.dhtml).replace('{html}',obj.html).replace('{web}',value).replace('{all}',obj.all);
	}
	var cookie=Ext.lt.cookie.get('loadtest');
	var info_test=null;
	if(cookie!=null){
		info_test=Ext.lt.util.JSON.decode(cookie.replace(/%7B/g,'{').replace(/%22/g,'').replace(/%3A/g,':').replace(/%20/g,' ').replace(/%7D/g,'}').replace(/%2C/g,','));
		//info_test={js:0,dhtml:0,html:0,web:0,all:0};
	}else{
		info_test={js:0,dhtml:0,html:0,web:0,all:0};
	}
	function testjs(){
		var str="";
		var d=new Date();
		while(new Date()-d<1000){
			str+="s";
		}
		info_test.js=str.length;
	}
	function testDhtml(){
		var div=document.getElementById("test_html_div");
		var d=new Date();
		while(new Date()-d<1000){
			div.appendChild(document.createElement("div"));
		}
		info_test.dhtml=div.childNodes.length;
	}
	function testhtml(){
		var l=0;
		var d=new Date();
		while(new Date()-d<1000){
			document.createElement("div");
			l++;
		}
		info_test.html=l;
	}
	function testweb(){
		var statr=new Date();
		var v=Ext.lt.RCP.asynserver('com.longtu.managerconsole.loadtest.LoadTestComponent','loadTest',null);
		var statrtest=new Date();
		var v2=Ext.lt.RCP.asynserver('com.longtu.managerconsole.loadtest.LoadTestComponent','loadTest1M',null);
		//100kb
		var end=new Date();
		info_test.web=(end-statrtest)-(statrtest-statr);
	}
	function setcookie(){
		var v=Object.toJSON(info_test);
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 31));
		Ext.lt.cookie.add('loadtest',v,expdate);
	}
	function loadshow(div,info_test){
		if(info_test.txt==null)info_test.txt='';
		div.innerHTML=["<table width=\'100%\' style=\'background:#fff\' ><tr height=\'80\'><td id=\'test_web_sef\'></td></tr><tr height=\'80\'><td id=\'test_web_w\'>综合评价：",
		info_test.txt
		,"</td></tr></table>"].join('');
		
		var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/Bar2D.swf", "ChartId3", "480", "60");
		var xml=[];
		xml.push('<chart palette=\'5\' yAxisMinValue=\'0\' yAxisMaxValue=\'100\'  decimals=\'0\'  baseFontSize =\'12\'  enableSmartLabels=\'1\' enableRotation=\'0\' bgColor=\'99CCFF,FFFFFF\' bgAlpha=\'40,100\' bgRatio=\'0,100\' bgAngle=\'360\' showBorder=\'1\' >');
		xml.push('<set label=\'您的得分\' value=\'',info_test.all,'\' />'); 
		xml.push('</chart>');
		chart.setDataXML(xml.join(''));
		chart.render("test_web_sef","test_web_sef", "480", "60");
	}
	function showFlash(){
		var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/Pie2D.swf", "ChartId", "200", "170");
		var xml=[];
		xml.push('<chart palette=\'1\' showLabels=\'0\'  baseFontSize =\'12\' showValues=\'0\'   bgColor=\'99CCFF,FFFFFF\' bgAlpha=\'40,100\' bgRatio=\'0,100\' bgAngle=\'360\' showBorder=\'1\' >');
		xml.push('<set label=\'资源加载时间\' value=\'',info_load.npublics,'\' color=\'883366\' />'); 
		xml.push('<set label=\'ocx加载时间\' value=\'',info_load.nocxs,'\' color=\'878345\'/>');
		xml.push('<set label=\'组件创建时间\' value=\'',info_load.ncomponents,'\' color=\'11ffee\'/>');
		xml.push('<set label=\'模版创建时间\' value=\'',info_load.ntemplates,'\' color=\'f674f6\'/>');
		xml.push('<set label=\'其他时间\' value=\'',info_load.other,'\' color=\'1155ff\'/>');
		xml.push('</chart>');
		chart.setDataXML(xml.join(''));
		chart.render("chart");
	}
	function loadnavigator(){
		var value=window.navigator;
		function os(){
			var vs=new RegExp(/Windows NT (\d{1,}.\d{1,})/).exec(value.userAgent);
			if(vs==null)return "其他操作系统";
			var v=parseFloat(vs[1]);
			if(v<5.1)return 'WINDOWS 2000';
			if(v==5.1)return 'WINDOWS XP';
			if(v==5.2)return 'WINDOWS 2003';
			if(v==6.0)return 'WINDOWS Vista';
			if(v==6.1)return 'WINDOWS 7';
			if(v==6.8)return 'WINDOWS 8';
			return "其他操作系统"
		}
		function userLanguage(){
			if(value.userLanguage=='zh-cn') return '简体中文';
			return value.userLanguage;
		}
		function browser(){
			var vs=new RegExp(/MSIE (\d{1,}.\d{1,})/).exec(value.userAgent);
			if(vs==null)return "其他浏览器";
			return "IE "+vs[1];
		}
		var tpl='<table width=\'100%\' style=\'background:#fff\' height=\'30\'><tr><td>操作系统：'+os()+' </td><td>处理器类型：'+value.cpuClass+'</td></tr><tr><td>语言环境：'+userLanguage()+'</td><td>浏览器版本：'+browser()+'</td></tr></table>';
		return tpl;
	}
	function loadtime(obj){
		var tpl=[];
		tpl.push('<table width=\'100%\' height=\'200\' style=\'background:#fff\'>');
		tpl.push('<tr><td colspan=2 style=" height:20px;font-size:12px; background:#FFF url(\''+_ROOT_PATH_+'/ltext/images/page_test_title.gif\') no-repeat left top;padding-left:18px;padding-top:1px;">组件加载情况</td></tr>');
		tpl.push('<tr><td><ul style=\'height:170px;overflow: scroll;\'>');
		tpl.push('<li><span style="background:#1155ff">　</span>&nbsp;页面加载时间：',obj.all,'</li>');
		var _all=obj.all
		obj.npublics=0;
		var _npublics=[];
		for(var r in obj.npublic){
			obj.npublics+=obj.npublic[r];
			_npublics.push('<li>　',r,'：',obj.npublic[r],'</li>');
		}
		_all-=obj.npublics
		tpl.push('<li style="padding-top:1px"><span style="background:#883366">　</span>&nbsp;资源加载时间：',obj.npublics,'<ul>');
		tpl.push(_npublics.join(''));
		tpl.push('</ul></li>');
		obj.nocxs=0;
		for(var r=0 ;r<obj.nocx.size();i++){
			obj.nocxs+=obj.nocx[r];
		}
		_all-=obj.nocxs
		tpl.push('<li style="padding-top:1px"><span style="background:#878345">　</span>&nbsp;ocx加载时间&nbsp;：',obj.nocxs,'</li>');
		
		obj.ncomponents=0;
		var _ncomponents=[];
		for(var r in obj.ncomponent){
			obj.ncomponents+=obj.ncomponent[r];
			_ncomponents.push('<li>　',r,'：',obj.ncomponent[r],'</li>');
		}
		tpl.push('<li style="padding-top:1px"><span style="background:#11ffee">　</span>&nbsp;组件创建时间：',obj.ncomponents,'<ul>');
		tpl.push(_ncomponents.join(''));
		tpl.push('</ul></li>');
		_all-=obj.ncomponents
		obj.ntemplates=0;
		var _ntemplates=[];
		for(var r in obj.ntemplate){
			obj.ntemplates+=obj.ntemplate[r];
			_ntemplates.push('<li>　',r,'：',obj.ntemplate[r],'</li>');
		}
		_all-=obj.ntemplates
		tpl.push('<li style="padding-top:1px"><span style="background:#f674f6">　</span>&nbsp;模版创建时间：',obj.ntemplates,'<ul>');
		tpl.push(_ntemplates.join(''));
		tpl.push('</ul></li>');
		obj.other=obj.all-_all;
		tpl.push('</ul></td><td width="200" id="chart"></td></tr>');
		tpl.push('</table>');
		return tpl.join("");
	}
	
	if(Ext.lt.showPageTest.win==null){
		Ext.lt.showPageTest.win=Ext.lt.window({title:"性能测试", w:545, h:571,close:true,className:'wind7',pop:true,mark:false});
		var _div=document.createElement("div");
		document.body.appendChild(_div);
		_div.style.height='510px';
		_div.style.width='500px';
		_div.style.color='#003399';
		_div.style.background='#C9d5e4';
		_div.style.fontSize='12px';
		//_div.style.width='500px';
		var _divhtml=[];
		_divhtml.push(loadnavigator());
		_divhtml.push(loadtime(info_load));
		_divhtml.push("<div id='test_html_div_show' style='background:#fff'>");
		_divhtml.push(showTest(info_test));
		_divhtml.push("</div>");
		_divhtml.push("<div id='test_html_div_flash' style='height:170px;'></div>");
		_divhtml.push("<center ><button onclick='Ext.lt.message.send(\"page_test\",\"test\")' style='border:0; width:64px; height:22px; line-height:22px; background:url("+_ROOT_PATH_+"/ltext/images/btn.gif) no-repeat left center; cursor:pointer; margin-left:5px;'>测　试　</button>&nbsp;&nbsp;&nbsp;<button onclick='Ext.lt.showPageTest.win.hidden();' style='border:0; width:64px; height:22px; line-height:22px; background:url("+_ROOT_PATH_+"/ltext/images/btn.gif) no-repeat left center; cursor:pointer; margin-left:5px;'>确　认　</button></center>");
		_divhtml.push("<div id=\'test_html_div\' style=\'visibility: hidden\'/>");
		_div.innerHTML=_divhtml.join('');
		Ext.lt.showPageTest.win.draw(_div);
		showFlash();
		loadshow(document.getElementById("test_html_div_flash"),info_test);
	}
	Ext.lt.message.hook("page_test","test",function(){
		testjs();
		testDhtml();
		testhtml();
		testweb();
		setcookie();
		document.getElementById('test_html_div_show').innerHTML=showTest(info_test)
	});
	Ext.lt.showPageTest.win.show();
}
Ext.lt.regKeyEvent('v',Ext.lt.showPageTest,true,true);
//ie9测试
Ext.lt.showIE9Test=function(){window.open("http://ie9pvz.lonelystar.org/");}
Ext.lt.regKeyEvent('eev',Ext.lt.showIE9Test,true,true);







/**
界面组件基类

说明：
为所有页面组件提供共有方法和缺省行为。所有页面组件都要继承该对象。
界面组件既可以与模板配合使用，也可以独立使用。因此，每个组件必须实现draw、resize方法。
实现界面组件时推荐采用界面和行为分离的编程风格，也就是先通过配置信息快速生成整个组件的HTML元素。之后再为组件中可交互部分添加行为和事件。

 */
Ext.lt.nullcomponent={draw:function(){},resize:function(){}};
Ext.lt.component=function(cmp){
	
	//在指定的HTML元素中绘制页面组件，参数一般是DIV对象，也可以是指定对象的ID。该方法必须实现 
	//验证成功后，调用页面组件的draw方法 
	var draw=function(el){
		if(el==null || (el!=null && el.innerHTML==null)){
			//datatable 在改版过程中原有的draw方法没有参数
			//alert('没有指定生成数据规则组件的HTML元素');
			return true;
		}
		Ext.lt.HTML.expandHTMLElement(el);
		return true;
	};
	
	// 验证并设置对象的宽、高。如果调用时没有指定参数，则已对象缺省宽、高为准。该方法必须实现 
	var resize=function(w,h){
		if(isNaN(w) || w<0) w=0;
		if(isNaN(h) || h<0) w=0;
		return true;
	};
	
	// 设置对象事件处理函数。 参数为js对象，key为事件名称
	this.on=function(en){
		
	};
	
	// 触发指定事件。 事件名称和处理函数由on函数指定 
	this.fireEvent=function(eventname,callback){
		alert('call '+eventname);
	}
	
	// 在指定的HMTL对象中生成组件配置界面 
	this.showconfig=function(el){
		cmp.showconfig(el);
	};
	
	// 保存组件配置的方法
	this.saveconfig=function(){
		cmp.saveconfig();
	}
	
	// 将页面组件缺省方法添加到组件对象上
  // 将组件标准方法draw、resize等添加到指定对象上。在执行完标准方法后在执行组件原本的方法。以draw方法为例：
	this.exp=function(cmp){
		if(Ext.lt.isFunction(cmp['draw'])){
			var _fn_draw=Ext.lt.util.fnbind(cmp['draw'],cmp);
		cmp.draw=function(e){if(draw(e)!=false) _fn_draw(e)};
		}
		if(Ext.lt.isFunction(cmp['resize'])){
			var _fn_resize=Ext.lt.util.fnbind(cmp['resize'],cmp);
			cmp.resize=function(w,h){if(resize(w,h)!=false) _fn_resize(w,h)};
		}
		
		// 追加组件方法
		if(cmp['on']==null) cmp['on']=this['on'];
		if(cmp['fireEvent']==null) cmp['fireEvent']=this['fireEvent'];
		if(cmp['showconfig']==null) cmp['showconfig']=this['showconfig'];
		if(cmp['saveconfig']==null) cmp['saveconfig']=this['saveconfig'];
	}
	
	this.exp(cmp);
	return cmp;
}


// 为了兼容一帮不区分大小写的xx
var ext=Ext
ext.lt.recordset.toarray=ext.lt.recordset.toArray;
/*
 *	初步提供方法draw(div)：菜单绘制到那个div上。
 *	提供方法close()      : 关闭窗口。
 *	当点击事件发生后；如果不是点击在菜单上面则表示关闭他
 *	当窗口大小改变或有调用layout，dolayout之后则也关闭
 *	config数据内容：
 *			data：数据
 *			className:样式。可以通过设置className来改变菜单样式
 *			field: id,name,code,sid(菜单父节点，用于表示级次关系),click(点击菜单节点时的方法),ico(节点前面的图标)
 *			不支持select等遮罩
 */
Ext.lt.Popupmenu=function(cfg){
	this.version='v1.0';
	this.buildMenu=true;
	if(Ext.lt.Popupmenu.divs==null)Ext.lt.Popupmenu.divs=[];
	if(Ext.lt.Popupmenu.leveldiv==null)Ext.lt.Popupmenu.leveldiv={};
	var _config=Ext.lt.apply({data:{},values:[],el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid'},className:'popupmenu',outformart:'#name',on:{},maxHeight:true},cfg);
	var values={};
	for(var i=0,l=_config.values.length;i<l;i++){
		values[_config.values[i]]=i;
	}
	_config._values=values;
	var _id='menu'+Ext.lt.getNextSeqValue();
	var _data=_config.data.toArray();
			_data.size=_config.data.length;
	var _menu=null;
	//整理数据。
	for(var i=0;i<_data.size;i++){
		if(!_config.data['PK_'+_data[i][_config.field.sid]]) {
			_config.data['PK_'+_data[i][_config.field.sid]] = [];
		}
		_config.data['PK_'+_data[i][_config.field.sid]].push(_data[i]);
		_config.data[_id+'_PK_'+_data[i][_config.field.id]] = _data[i];
		_config.data[i].isleaf=true;
	}
	//加个根节点。
	_data[_id+'_PK_0']={};
	//设置是否是子节点
	for(var i=0;i<_data.size;i++){
		_data[_id+'_PK_'+_data[i][_config.field.sid]].isleaf=false;
		//如果有显示回调函数。认为有其子节点。
		if(_data[i].show!=null){
			_data[i].isleaf=false;
		}
		if(_data[i].end){
			_data[i].end='end';
		}else{
			_data[i].end='';	
		}
	}
	_config.fields=[];
	for(var e in _config.field){
		_config.fields.push(_config.field[e]);
	}
	_buildMenuHTML=function(div,_cfg,sid,level){
		Ext.lt.Popupmenu.buildMenu=true;
		if(sid==null)sid=0;
		if(level==null)level=0;
		div.style.height='auto';
		var _id=_cfg.id;
		var _d=_cfg.data['PK_'+sid];
		if(_d==null||_d.length==0)return;
		var _html=[];
		var _template=Ext.lt.out.template(_cfg.outformart);
		_template.setField(_cfg.fields);
		if(div.id==null){
			div.id=_cfg.id	
		}
		_html.push('<div><table border="0" id="',div.id,'_t"  cellpadding="0" cellspacing="0" >');
		if(_cfg.statrclass!=null){
			_buildSplitLine({cls:_cfg.statrclass},_html)
		}
		for(var i=0;i<_d.length;i++){
			var s=_d[i].name;
			if(s=='|'){
				_buildSplitLine(_d[i],_html)
			}else{
				_buildMenuLine(_d[i],_html,i,_template,_cfg)
			}
		}
		if(_cfg.endclass!=null){
			_buildSplitLine({cls:_cfg.endclass},_html)
		}
		_html.push('</table></div>');
		div.innerHTML=_html.join('');
		if(_cfg.maxHeight!=true){
				_build2Scroll(div,_cfg);
		}
		if(div.className==null||div.className==''){
			div.className=_cfg.className;
		}
		div.ismenu=true;
		_buildEvent(div,_cfg,level);
		Ext.lt.Popupmenu.buildMenu=false;
	}
	function _build2Scroll(div,_cfg){
		var mh=_cfg.maxHeight;

		var pos=Ext.lt.HTML.positionedOffset(div,document.body,true);
		var dElHeightType='offsetHeight';
		
		if(mh=='auto'){
			mh=document.documentElement[dElHeightType]+document.documentElement.scrollHeight-pos.top-50;
		}else{
			if(mh+pos.top>(document.documentElement[dElHeightType]+document.documentElement.scrollTop)&&mh<div.clientHeight){
				mh=document.documentElement[dElHeightType]+document.documentElement.scrollTop-pos.top-50;
			}
		}
		var ith=document.getElementById(div.id+'_t').firstChild.firstChild.clientHeight;
		mh=mh-(mh-12)%ith;
		div.style.width='auto';
		if(div.clientHeight<=mh){return}
		div.style.height=mh;
		_cfg.scroll=new Ext.lt.scroll({itemlength:ith*5,el:div.firstChild});
		_cfg.scroll.draw();
		_cfg.scroll.cfg.top.setAttribute('ismenu',true);
		_cfg.scroll.cfg.bottom.setAttribute('ismenu',true);
		_cfg.scroll.cfg.top.innerHTML="<div style='width:25px' class='scrollico' ismenu=true>&nbsp;</div><div style='width:"+(div.clientWidth-25)+"px' class='scrollitem' ismenu=true>&nbsp;</div>";
		_cfg.scroll.cfg.bottom.innerHTML="<div style='width:25px' class='scrollico' ismenu=true>&nbsp;</div><div style='width:"+(div.clientWidth-25)+"px' class='scrollitem' ismenu=true>&nbsp;</div>";
	}
	
	function _buildMenuLine(_d,_html,i,_template,_cfg){
			if(_d.fn!=null){s=_d.fn()}
			else{
				s=_template.out(_d);
			}
			_html.push("<tr height=25px  id ='",_cfg.id,'_PK_',_d[_cfg.field.id],"' vid='",_d[_cfg.field.id],"' ",Ext.lt.isExist(_d.disabled)==true?"disabled":""," itemnum=",i,"  class='item ");
			if(_cfg._values[_d[_cfg.field.id]]!=null){
				_html.push(" select ");	
			}
			_html.push(_d.end,"' ismenu=true>");
			_html.push("<td width=25px ismenu=true style='");
			if(_d.ico){
				_html.push("background:url(",_d.ico,") no-repeat center center;");
			}
			if(_d.icostyle){
				_html.push(_d.icostyle);
			}
			if(_d.icoclass){
				_html.push("' class='",_d.icoclass);
			}
			_html.push("'><div style='width:25px'></div></td><td class='itemtd ",(_d.isleaf==true?'':'notleaf'),"'  nowrap='nowrap' ismenu=true>",s,"</td></tr>");
	}
	function _buildSplitLine(_d,_html){
			_html.push("<tr class='",_d.cls,"' ismenu=true><td colspan=2 ismenu=true class='split'>&nbsp;</td></tr>");
	}


	//开始增加事件，样式等
	_buildEvent=function(div,_cfg,level){
		var cn=document.getElementById(div.id+'_t').firstChild.childNodes;
		for(var i=0;i<cn.length;i++){
			if(cn[i].tagName=='TR'){
				_buildItem(cn[i],_cfg,level)
			}
		}
	}
	_buildItem=function(item,_cfg,level){
		var d=_cfg.data[item.id];
		if(d==null){return;}
		d.level=level;
		var l=d.level;
		var div=document.getElementById(_cfg.id+'_itemdiv'+(l+1));
		if(div==null){
			div=document.createElement('div');
			div.id=_cfg.id+'_itemdiv'+(l+1);
			div.className=_cfg.className;
			//document.body.appendChild(div);
			div.style.visibility='hidden';
			_cfg.el.appendChild(div);
			Ext.lt.Popupmenu.divs.push(div);
		}
		//span的四种样式。有,无子节点，与移入和移出的样式组合
		
		item.onmouseover=function(){
			//变色1
			var d=_cfg.data[item.id];
			if(d==null)return;
			//是否有子节点
			var cfg=Ext.lt.Popupmenu;
			if(cfg.showli==null){cfg.showli=[];}
			if(cfg.showli[d.level]){
				cfg.showli[d.level].className=cfg.showli[d.level].className.replace(/ selected/g,'');
			}
			if(item.className=='split')return;
			this.className+=' selected';
			cfg.showli[d.level]=this;
			_cfg.el.appendChild(div);
			var vid=d[_config.field.id];
			var level=d.level;
			if(!d.isleaf){
				//是否自己绘制字节点
				Ext.lt.Popupmenu.buildMenu=true;
				if(d.show!=null){
					d.show(div,_cfg,vid,level+1);
					setChildNodeAttribute(div.childNodes);
				}else{
					_buildMenuHTML(div,_cfg,vid,level+1);
				}
				
				var pos=Ext.lt.HTML.positionedOffset(this,_cfg.el,false);
				//window.status=x+';'+y;
				window.status=pos.left+this.offsetWidth
				var x=pos.left+this.offsetWidth;
				var y=pos.top+5;
				//window.status='x='+x+';y='+y
				div.style.left=x+'px';
				div.style.top=y+'px';
				div.style.visibility='visible';
				Ext.lt.Popupmenu.leveldiv[level]=div;
			}else{
				if(Ext.lt.Popupmenu.leveldiv[level]!=null)
				Ext.lt.Popupmenu.leveldiv[level].style.visibility='hidden';
			}
			//关闭下级的节点们	
			for(var e in Ext.lt.Popupmenu.leveldiv){
				if(e>level){
					Ext.lt.Popupmenu.leveldiv[e].style.visibility='hidden';
				}
			}
		}
		item.onmouseout=function(){
			//变色2	
			this.className=this.className.replace(' selected','');
		}
		item.onclick=function(){
			if(d.href!=null&&d.href.length>0){
				window.open(d.href,d.target);
				//关闭
				_close();
			}else	if(d.click!=null){
				_close();
				d.click(d);
			}
		}
	}
	function setChildNodeAttribute(cn){
		if(cn==null)return;
		for(var i=0;i<cn.length;i++){
			if(cn[i].tagName!=null){
				cn[i].setAttribute('ismenu',true);
				setChildNodeAttribute(cn[i].childNodes);
			}	
		}
	}
	function _close(){
		for(var i=0;i<Ext.lt.Popupmenu.divs.length;i++){
			Ext.lt.Popupmenu.divs[i].style.visibility='hidden';
		}
		Ext.lt.message.send("Popupmenu","closed");
		var showli=Ext.lt.Popupmenu.showli;
		if(showli!=null){
			for(var i=0;i<showli.length;i++){
				showli[i].className=showli[i].className.replace(/ selected/g,'');
			}
		}
	}
	
	function _mouselistener(en){
		// 这里改为如果鼠标事件不是从菜单对象内部产生的
		for(var i=0;i<Ext.lt.Popupmenu.divs.length;i++){
			if(Ext.lt.Popupmenu.divs[i].contains(en.srcElement)){
				return;
			}
		}
		_close();
		// 解除事件绑定
		//document.detachEvent ('onmousedown',_mouselistener);
		_mouselistener.unbindEvent(document,'onmousedown');
	}
	
	Ext.lt.message.hook("Popupmenu","close",_close);
	_menu={
		cfg:_config,
		id:_id,
		draw:function(div){
			if(!this.cfg.drawed){
				this.cfg.el=div
				Ext.lt.Popupmenu.divs.push(div);
				_buildMenuHTML(div,this.cfg);
				this.cfg.drawed=true;
				// 绑定鼠标事件
			//	document.attachEvent('onmousedown',_mouselistener);
			}
			this.show();
		},
		show:function(){
			if(this.cfg.drawed){
				this.cfg.el.style.visibility='visible';
			}
			// 绑定鼠标事件
			//document.attachEvent('onmousedown',_mouselistener);
			Ext.lt.bindEvent(document,'onmousedown',_mouselistener);
		},
		resize:function(w,h){
			
		},
		setDisabled:function(id,b){
			this.cfg.data[this.cfg.id+"_PK_"+id].disabled=b;
			document.getElementById(this.cfg.id+"_PK_"+id).disabled=b;
		},
		close:function(){
			_close();
		}
	};
	_menu.cfg.id=_menu.id;
	return _menu;
}
}
/*
 *	初步提供方法draw(div)：菜单绘制到那个div上。
 *	提供方法close()      : 关闭窗口。
 *	当点击事件发生后；如果不是点击在菜单上面则表示关闭他
 *	当窗口大小改变或有调用layout，dolayout之后则也关闭
 *	config数据内容：
 *			data：数据
 *			className:样式。可以通过设置className来改变菜单样式
 *			field: id,name,code,sid(菜单父节点，用于表示级次关系),click(点击菜单节点时的方法),ico(节点前面的图标)
 *			不支持select等遮罩
 */
Ext.lt.TabPanel=function(cfg){
	this.version='v1.0';
	var _config=Ext.lt.apply({items:[],className:'tabpanel',activeTab:0,on:{},buttons:[],buttonAlign:'center'},cfg);
	_config.itemsid=-1;
	var _id='menu'+Ext.lt.getNextSeqValue();
	_config.id=_id;
	function _activate(t,i,_b){
		var item=t.cfg.items[t.cfg.activeTab];
		if(item==null)return;
		item.el.style.visibility ='hidden';
		item.titleel.className='title';
		t.cfg.activeTab=i;
		var item=t.cfg.items[t.cfg.activeTab];
		item.el.style.visibility ='visible';
		item.titleel.className+=' select';
		if(false){
			var top = t.cfg.top;
			Ext.lt.aninmation(top.parentNode);
			top.parentNode.setAnimatProperty('scrollLeft',top.parentNode.scrollLeft,item.titleel.offsetLeft);
			top.parentNode.play(150)
		//	scroll2Activate(t.cfg.el.firstChild.childNodes[1],i,item);
		}
		if(t.cfg.aftershow!=null){
			t.cfg.aftershow(t,item);	
		}
		
	}
	function _remove(t,i){
		var item=t.cfg.items[i];
		if(item==null)return;
		var top=t.cfg.top
		var main=t.cfg.main
		main.removeChild(item.el);
		top.removeChild(item.titleel);
		var elw=item.titleel.offsetWidth;
		var w=top.offsetWidth-elw;
		top.style.width=w+'px';
	}
	function _addItems(t,i){
		var top=t.cfg.top;
		var main=t.cfg.main;
		if(i.el==null){
			i.el=document.createElement('div');
		}
		if(i.html!=null){
			i.el.innerHTML=i.html;	
		}
		i.el.className+=' body';
		main.appendChild(i.el);

		var title=document.createElement('li');
		title.className='title';
		title.innerHTML="<div class='title_left'></div><div class='title_center'>"+i.title+"</div><div class='title_right'></div>";
		top.appendChild(title);
		title.index=_config.itemsid+1;
		_config.itemsid++;
		i.titleel=title;
		i.el.style.visibility ='hidden';
		title.onclick=function(){
			_activate(t,this.index,false);
		}
		var w=title.offsetWidth+top.offsetWidth;	
		top.style.width=w+'px';
		i.el.style.height=main.offsetHeight;
		i.el.style.width=main.offsetWidth;
		i.el.style.position='absolute';
		if(i.els!=null&&i.els.resize!=null){
				i.els.resize(main.offsetWidth,main.offsetHeight);
		}
	}
	
	function _initButton(t){
		return;
		t.cfg.right.onclick=function(){
			var top = t.cfg.top;
			Ext.lt.aninmation(top.parentNode);
			top.parentNode.setAnimatProperty('scrollLeft',top.parentNode.scrollLeft,top.parentNode.scrollLeft+top.parentNode.offsetWidth);
			top.parentNode.play(150)
		}
		t.cfg.left.onclick=function(){
			var top = t.cfg.top;
			Ext.lt.aninmation(top.parentNode);
			top.parentNode.setAnimatProperty('scrollLeft',top.parentNode.scrollLeft,top.parentNode.scrollLeft-top.parentNode.offsetWidth);
			top.parentNode.play(150)
		}
	}

	function _draw(d,t){
		d.className=t.cfg.className;
		var html=["<div id='tabpanel_top",t.id,"' class='top'><table width=100%  border='0' cellspacing='0' cellpadding='0'><tr><td id='tabpanel_left",t.id,"' class='left' >&nbsp;</td>"];
		html.push("<td ><div class='centersorll' ><ul class='center' id='tabpanel_title",t.id,"'>");
		html.push("</ul></div>&nbsp;</td><td  id='tabpanel_right",t.id,"' class='right' >&nbsp;</td></tr></table></div>");
		html.push("<div class='main' style='height:",d.offsetHeight,"px' id='tabpanel_main'",t.id,"'></div>");
		d.innerHTML=html.join('');
		t.cfg.top=document.getElementById("tabpanel_title"+t.id);
		t.cfg.left=document.getElementById("tabpanel_left"+t.id);
		t.cfg.right=document.getElementById("tabpanel_right"+t.id);
		t.cfg.main=d.lastChild;
		t.cfg.top.parentNode.style.width=t.cfg.main.offsetWidth-t.cfg.left.offsetWidth-t.cfg.right.offsetWidth+'px';
		for(var i=0;i<t.cfg.items.length;i++){
			_addItems(t,t.cfg.items[i]);
		}
		
		_activate(t,t.cfg.activeTab,true);
		_initButton(t);
	}
	
	
	var tp={
		cfg:_config,
		id:_id,
		activate:function(num){
			_activate(this,num,true)
		},
		addItem:function(item){
			if(this.cfg.el!=null){
				_addItems(this,item);
			}
			this.cfg.items.push(item);
			_activate(this,this.cfg.items.length-1,true)
		},
		removeItem:function(num){
			if(this.cfg.el!=null){
				_remove(this,num);
			}
			this.cfg.items.remove(num);
		},
		getActiveTab:function(){
			return this.cfg.activeTab;
		},
		getSelectItem:function(){
			return this.getItem(this.getActiveTab());
		},
		getItem:function(num){
			return this.cfg.items[num];
		},
		getItems:function(){
			return this.cfg.items;	
		},
		draw:function(div){
			if(div==null)return;
			this.cfg.el=div;
			_draw(div,this)
		},
		resize:function(w,h){
			if(w<0||h<0)return;
			this.cfg.el.style.height=h+'px';
			this.cfg.el.style.width=w+'px';
			this.cfg.el.firstChild.style.width=w+'px';
			this.cfg.el.lastChild.style.width=w+'px';
			var _h=h-$(this.cfg.el.firstChild).height()-4;
			this.cfg.el.lastChild.style.height=_h+'px';
			for(var i=0;i<this.cfg.items.length;i++){
				cfg.items[i].el.style.width=w+'px';
				cfg.items[i].el.style.height=_h+'px';
			}
		}
		,getMainStyle:function(){
			return {w:this.cfg.el.lastChild.clientWidth,h:this.cfg.el.lastChild.clientHeight}
		}
	}
	return tp;
}
/*
 *	初步提供方法draw(div)：菜单绘制到那个div上。
 *	提供方法close()      : 关闭窗口。
 *	当点击事件发生后；如果不是点击在菜单上面则表示关闭他
 *	当窗口大小改变或有调用layout，dolayout之后则也关闭
 *	config数据内容：
 *			data：数据
 *			className:样式。可以通过设置className来改变菜单样式
 *			field: id,name,code,sid(菜单父节点，用于表示级次关系),click(点击菜单节点时的方法),ico(节点前面的图标)
 *			不支持select等遮罩
 */
Ext.lt.color=function(cfg){
	this.version='v1.0';
	var ColorHex=new Array('00','33','66','99','CC','FF');
	var _config=Ext.lt.apply({lable:'',value:null},cfg);
//	var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF')
	var current=null
	var wdiv=document.getElementById('Ext_lt_color_win');
	if(wdiv==null){
		wdiv=document.createElement('div');
		wdiv.className='color_div';
		wdiv.id='Ext_lt_color_win';
		wdiv.iscolorwin=true;
		//wdiv.innerHTML="";
		var h=[];
		h.push('<table iscolorwin=true border="1" cellspacing="0" cellpadding="0" style="text-align:center;cursor:pointer;border-collapse:collapse" bordercolor="000000" >');
		for (i = 0; i < 2; i++){
			for (j = 0; j < 6; j++){
				h.push('<tr iscolorwin=true height=15>');
				for (k = 0; k < 3; k++){
					 for (l = 0; l < 6; l++){
					 	 h.push('<td iscolorwin=true width=15 style="cursor:pointer;background-color:#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j] + '">　</td>')
					 }	
				}
				h.push('</tr>');
			}
		}
		h.push('</table>')
		wdiv.innerHTML=h.join('');
		wdiv.style.display ='none';
		wdiv.style.top=0;
		wdiv.style.left=0;
		document.body.appendChild(wdiv);
		Ext.lt.bindEvent(document.body,'onmousedown',function(en){
			if(en.srcElement.iscolorwin){
				wdiv.el.style.backgroundColor=en.srcElement.style.backgroundColor;
			}
			wdiv.style.display='none';
		});
	}
	function showWdiv(i,c,d){
			var pos=Ext.lt.HTML.positionedOffset(i,document.body,false);
			wdiv.style.left=pos.left+i.offsetWidth;
			wdiv.style.top=pos.top;
			wdiv.style.display='inline';
			wdiv.el=i;
	
		wdiv.onclick=function(){
		}
	}
	
	function _draw(c,d){
		d.innerHTML=c.cfg.lable+'<input type="text" readOnly = true/>';
		if(c.cfg.value!=null){
			d.lastChild.style.backgroundColor=c.cfg.value;
		}
		d.lastChild.onclick=function(){
			showWdiv(this,c,d);
		}
	}
	var color	= {cfg:_config};
	color.draw=function(div){
		this.el=div;
		_draw(this,div);
	}
	color.resize=function(w,h){}
	color.getValue=function(){
		return this.el.lastChild.style.backgroundColor;
	}
	color.setValue=function(color){
		this.cfg.value=color;
		if(this.el!=null){
			this.el.lastChild.style.backgroundColor=color;
		}
	}
	return color;
}


/**
界面工具条组件

实例化参数：
	id:String	工具条对象id，通过标签生成的工具条对象在界面中生成的对象名
	configbtn:boolean	是否显示配置按钮
	querybtn:boolean 是否显示‘显示查询’按钮
	buttons:array+object	按钮对象配置
	name:string	按钮对象id，按钮对象引用标志
	title:string	按钮显示内容
	icon:string	按钮图标，系统按照 icon+'_btn'的规则为按钮添加样式，并且，按照icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'的规则生成按钮鼠标样式
	action:function	按钮执行事件
	isvisiable:boolean	是否可见，默认为true
	disabled:boolean	按钮是否为禁用状态

工具条对象属性：
	id:string	工具条对象id
	configbtn:HTMLButtonElement	配置按钮对象
	querybtn:HTMLButtonElement	查询按钮对象
	buttons:array	可以通过按钮名称或按钮位置查找按钮对象
		按钮对象结构
			属性：
			name:string	按钮对象id，按钮对象引用标志
			title:string	按钮显示内容
			icon:string	按钮图标，系统按照 icon+'_btn'的规则为按钮添加样式，并且，按照icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'的规则生成按钮鼠标样式
			action:function	按钮执行事件
			disabled:boolean	按钮是否为禁用状态
			isvisiable:boolean	是否可见，默认为true
			方法：
			setDisabled(boolean)	设置是否可用
			setIsvisible(boolean)	设置是否可见
*/
Ext.lt.toolbar=Ext.lt.createComponent(function(cfg){
	var _config=Ext.lt.apply({configbtn:true,querybtn:true,className:'nomalbtn',buttons:[]},cfg);
	if(_config.id==null) _config.id='toolbar'+Ext.lt.getNextSeqValue();
	
	var _cmp={buttons:[],rootbutton:[],subbtn:{}};
	var _subbtnmenu=null;
	
	_cmp.obtaincfg=function(){
		return _config;
	}
	_cmp.draw=function(el){
		var html=['<ul class="',_config.className,'">'];
		var btn,queryflag=false;

		for(var i=0,l=_config.buttons.length;i<l;i++){
			btn=_config.buttons[i]
			if(typeof(btn)=='string') {
				html.push('<li class="line" style="float:left;">|</li>');
			}
			else {
				var defbtn=null,subbtns=null;
				if(Ext.lt.isArray(btn)){
					subbtns=btn;
					for(var j=0;j<subbtns.length;j++){
						if(subbtns[j].defaultbutton){
							defbtn=subbtns[j];
						}
						_cmp.buttons[subbtns[j].name]=subbtns[j];
						_cmp.buttons.push(subbtns[j]);
					}
					if(defbtn==null) defbtn=subbtns[0];
					btn=defbtn;
				}

				if(btn.name==null) btn.name='toolbarbtn'+Ext.lt.getNextSeqValue();
				if(btn.isvisiable==null) btn.isvisiable=true;
				html.push('<li class="',btn.classname,'_bg bg" overclass="',btn.classname,'_bg_over bg bg_over" style="',(btn.isvisiable?'':'display:none'),'"><button type="button"  id="',btn.name,'" title="',btn.title,'" icon="',btn.classname,'" class="',btn.classname,'_btn btn" overclass="',btn.classname,'_btn ',btn.classname,'_btn_over btn"',(Ext.lt.isExist(btn.disabled)?'disabled':''),' style="float:left;',(btn.isvisiable?'':'display:none'),'" >',btn.title,'</button></li>');
				_cmp.buttons[btn.name]=btn;
				if(btn.code)_cmp.buttons[btn.code]=btn;
				_cmp.buttons.push(btn);
				
				// 添加复选按钮
				if(subbtns!=null){
					html.push('<button type="button"  id="',btn.name,'_sub" group="',btn.name,'" class="groupbtn btn" style="float:left">6</button>');
					_cmp.subbtn[btn.name]=subbtns
					subbtns=null;
				}
				html.push('')
			}
		}
		html.push('</ul><div style="position:absolute;"></div>');
		
		// 生成工具条
		//el.style.position='relative'
		el.style.zIndex=Ext.lt.getNextZIndex();
		Ext.lt.HTML.setInnerHTML(el,html.join(''));
		
		_subbtnmenu=el.lastChild;
		
		// 添加启用、禁用方法
		var btns=el.getElementsByTagName('BUTTON');
		for(var i=0,l=btns.length;i<l;i++){
			btn=btns[i];
			if(_cmp.buttons[btn.id]!=null){
				_cmp.buttons[btn.id].element=btn;
				try{
					if(Ext.lt.isFunction(_cmp.buttons[btn.id].action)||Ext.lt.isFunction(eval(_cmp.buttons[btn.id].action))) {
						_cmp.buttons[btn.id].element.setAttribute('btn_data',Object.toJSON(_cmp.buttons[btn.id]));
						_cmp.buttons[btn.id].element.onclick=eval(_cmp.buttons[btn.id].action);
					}
				}catch(e){
					console.warn("按钮'"+btn.innerText+"'方法未实现!"+e.message);
				}

				_cmp.buttons[btn.id].setDisabled=function(flag){
					flag=flag==true;
					this.disabled=flag;
					flag?this.element.setAttribute('disabled','true'):this.element.removeAttribute('disabled');
				}
				_cmp.buttons[btn.id].setIsvisible=function(flag){
					flag=flag==true;
					this.isvisiable=flag;
					this.element.style.display=flag?'':'none';
				}
			}
			else if(btn.className.indexOf('groupbtn')>-1){
				_cmp.subbtn[btn.getAttribute('group')].element=btn;
				
				btn.onclick=function(){
					var btns=_cmp.subbtn[this.getAttribute('group')];
					
					var datas=[];
					for(var i=0;i<btns.length;i++){
						datas.push({name:btns[i].title,group:this.getAttribute('group'),id:btns[i].name,icostyle:btns[i].classname+'_btn',pid:0,click:function(){
							var btn=_cmp.buttons[this.id]
							var grpbtn=_cmp.subbtn[this.group].element

							if(btn==null) return;
							grpbtn.previousSibling.removeNode(true);
							if(btn.element==null){
								if(btn.isvisiable==null) btn.isvisiable=true;
								var t=document.createElement('DIV');
								t.innerHTML=['<li class="',btn.classname,'_bg bg" overclass="',btn.classname,'_bg_over bg  bg_over"><button type="button" id="',btn.name,'" title="',btn.title,'" icon="',btn.classname,'" class="',btn.classname,'_btn btn" overclass="',btn.classname,'_btn ',btn.classname,'_btn_over btn" clickclass="',btn.classname,'_btn ',btn.classname,'_btn_click btn" ',(Ext.lt.isExist(btn.disabled)?'disabled':''),' style="float:left;',(btn.isvisiable?'':'display:none'),'" >',btn.title,'</button></li>'].join('');
								grpbtn.insertAdjacentElement('beforeBegin',t.firstChild);
								btn.element=grpbtn.previousSibling.firstChild
								if(btn.action!=null) btn.element.onclick=btn.action;
								btn.setDisabled=function(flag){
									flag=flag==true;
									this.disabled=flag;
									flag?this.element.setAttribute('disabled','true'):this.element.removeAttribute('disabled');
								}
								btn.setIsvisible=function(flag){
									flag=flag==true;
									this.isvisiable=flag;
									this.element.style.display=flag?'':'none';
								}
							}
							else{
								grpbtn.insertAdjacentElement('beforeBegin',btn.element);
							}
							
						}});
					}
					var m=new Ext.lt.Popupmenu({
						data:datas,
						field:{id:'id',name:'name',code:'code',sid:'pid'}
					});
					m.draw(_subbtnmenu);
					var p=Ext.lt.HTML.positionedOffset(this.previousSibling);
					_subbtnmenu.style.visibility='';
					_subbtnmenu.style.left=(p.left)+'px'
					_subbtnmenu.style.Top=(this.offsetHeight+p.top)+'px'
				}
			}
		}
		
		
	}

	// 工具条不实现ersize方法	
	_cmp.resize=function(){
	}
	
	_cmp.setDisabled=function(btns,flag){
		flag=flag==true
		for(var i=0,j=btns.length;i<j;i++){
			_cmp.buttons[btns[i]].setDisabled(flag);
		}
	}
	
	return _cmp
});

Ext.lt.scroll=function(cfg){
	var version='v1.0';
	//direction:un/lr
	var _config=Ext.lt.apply({direction:'ud',el:null,srcEl:null,itemlength:10},cfg);
	//upward  upwardend  downward  downwardend
	//left leftend right rightend
	function _draw(_cfg){
		var directionclass=[];
		_cfg.styletype='top';
		var el=_cfg.el;
		if(_cfg.direction=='ud'){
			directionclass=['upward','downward'];
		}else{
			directionclass=['left','right'];
			_cfg.styletype='left';
		}
		//<div class='left' ></div><div class='centersorll' ><div class='center'></div></div><div class='right' id='tabpanel_right",t.id,"'></div>
		if(_cfg.srcEl==null){
			_cfg.srcEl=_cfg.el.firstChild;
		}
		var center=document.createElement('div');
		center.className='_center';
		center.appendChild(_cfg.srcEl);
		center.style.position='absolute';
		el.innerHTML="<div class='scl "+directionclass[0]+"end'>&nbsp;</div><div class='centersorll' style='width:0px;height:0px'></div><div class='scl "+directionclass[1]+"'>&nbsp;</div>";
		el.childNodes[1].appendChild(center);
		setTimeout(function(){
			if(_cfg.direction=='ud'){
				el.childNodes[1].style.width=el.parentNode.clientWidth;
				var h=(el.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
				if(h<=0){
					h=el.parentNode.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight
				}
				el.childNodes[1].style.height=h;//(el.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
				if(el.childNodes[1].firstChild.offsetHeight<el.childNodes[1].offsetHeight){
					el.lastChild.className+='end';
				}
			}else{
				el.childNodes[1].style.width=el.clientWidth-el.lastChild.offsetWidth-el.firstChild.offsetWidth;
				el.childNodes[1].style.height=el.parentNode.offsetHeight;
				if(el.childNodes[1].firstChild.offsetWidth<el.childNodes[1].offsetWidth){
					el.lastChild.className+='end';
				}
			}
		},100)
		
		el.lastChild.onclick=function(){toScroll(this.parentNode,1,_cfg)}
		el.firstChild.onclick=function(){toScroll(this.parentNode,-1,_cfg)}	
		_cfg.top=el.firstChild;
		_cfg.left=el.firstChild;
		_cfg.bottom=el.lastChild;
		_cfg.right=el.lastChild;
		
	}
	function _resize(_cfg,w,h){
		var el=_cfg.el;
		if(_cfg.direction=='ud'){
			el.childNodes[1].style.width=w;
			el.childNodes[1].style.height=(h-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
		}else{
			el.childNodes[1].style.width=w-el.lastChild.offsetWidth-el.firstChild.offsetWidth;
			el.childNodes[1].style.height=h;
		}
	}
	function toScroll(d,r,_cfg){
		if(d.lastChild.className.indexOf('end')!=-1&&r==1){return;}
		if(d.firstChild.className.indexOf('end')!=-1&&r==-1){return;}
		var div=d.childNodes[1].firstChild;

		var endl=div.getAttribute('offset'+_cfg.styletype);
		var l=_cfg.itemlength*r-div.getAttribute('offset'+_cfg.styletype);
		var _alllength=0;
		var cd=d.childNodes[1];
		if(_cfg.direction=='ud'){
			_alllength=cd.firstChild.offsetHeight-cd.offsetHeight;
		}else{
			_alllength=cd.firstChild.offsetWidth-cd.offsetWidth;
		}
				
		if(r==1&&l>=_alllength){
			l=_alllength;
			d.lastChild.className+='end';
		}else{
			d.lastChild.className=d.lastChild.className.replace('end','');
		}
		if(r==-1&&l<=0){
			l=0;
			d.firstChild.className+='end';
		}else{
			d.firstChild.className=d.firstChild.className.replace('end','');
		}
		Ext.lt.aninmation(div);
		div.setAnimatProperty('style.'+_cfg.styletype,endl,-1*l);
		div.play(150)
	}
	var scroll={
		cfg:_config,
		draw:function(div){
			if(div!=null){
				this.cfg.el=div;	
			}else{
				if(this.cfg.el==null){return;}	
			}
			_draw(this.cfg);
		},
		scroll:function(r){
			toScroll(this.cfg.el,r,this.cfg);
		},
		resize:function(w,h){
			_resize(this.cfg,w,h);
		}
	};
	return scroll;
}
//前进回退操作
Ext.lt.recallOperation=function(cfg){
	var _config=Ext.lt.apply({maxOper:10},cfg);
	_config.rs=[];
	_config.nextRs=[];
	function _addOperation(o,cfg){
			if(cfg.rs.length==cfg.maxOper){
				cfg.rs.remove(cfg.rs.first());
			}
			cfg.rs.push(o);
			cfg.nextRs.clear();
	}
	function _next(cfg){
		var v=cfg.nextRs.pop();
		cfg.rs.push(v);
		return v;
	}
	function _back(cfg){
		var v=cfg.rs.pop();
		cfg.nextRs.push(v);
		return v;
	}
	var recall={
			version:'1.0',
			cfg:_config,
			next:function(){return _next(this.cfg);},
			back:function(){return _back(this.cfg);},
			addOperation:function(o){_addOperation(o,this.cfg);},
			clear:function(){this.cfg.rs.clear();this.cfg.nextRs.clear();}
		}
	return recall;
}
Ext.lt.topmenu=function(cfg){
	var _config=Ext.lt.apply({data:{},values:[],el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid'},className:'topmenu',outformart:'#name',on:{},maxHeight:true,correction:15,scroll:false,showmenu:'onclick'},cfg);
	_config.maxHeight=true;
	_config.id='topmenu'+Ext.lt.getNextSeqValue();
	var values={};
	for(var i=0,l=_config.values.length;i<l;i++){
		values[_config.values[i]]=i;
	}
	_config._values=values;
	var _id=_config.id;
	var topmenu={
		version:'1.0',
		cfg:_config
	}
	function _initData(cfg){
		var _data=cfg.data.toArray();
		_data.size=cfg.data.length;
		var data_bak={};
		cfg.data_bak=data_bak;
		var _menu=null;
		//整理数据。
		
		for(var i=0;i<_data.size;i++){
			_data[i]._sid=_data[i][cfg.field.sid]
			if(data_bak['PK_'+_data[i][cfg.field.sid]]==null)data_bak['PK_'+_data[i][cfg.field.sid]]=[];
			data_bak['PK_'+_data[i][cfg.field.sid]].push(_data[i]);
			data_bak[_id+'_PK_'+_data[i][cfg.field.id]]=_data[i];
		}
		//加个根节点。
		data_bak[_id+'_PK_0']={};
		
		if(data_bak.PK_0==null)data_bak.PK_0=[];
		for(var i=0;i<data_bak.PK_0.length;i++){
			var _d=data_bak.PK_0[i];
			var arr=[];
			_buildmenudatas(_d[cfg.field.id],_d[cfg.field.id],cfg,data_bak,arr);
			data_bak[_id+'_MD_'+_d[cfg.field.id]]=arr;
		}
	}
	function _buildmenudatas(fid,id,cfg,_data,arr){
		var ds=_data["PK_"+id];
		if(ds==null||ds.length==0){return;}
		for(var i=0;i<ds.length;i++){
			var d=ds[i];
			if(fid==id){
				d._sid=0;
			}
			arr.push(d);
			_buildmenudatas(fid,d[cfg.field.id],cfg,_data,arr)
		}
	}
	function _buildTopmenu(cfg){
		cfg.menu={};
		var _template=Ext.lt.out.template(cfg.outformart);
		_template.setField(cfg.fields);
		var d=cfg.el;
		d.innerHTML='<ul class="'+cfg.className+'_tops" id="'+cfg.id+'" ></ul>';
		_buildtopmenuli(cfg);
		_buildEvent(d,cfg);
	}
	
	function _buildtopmenuli(cfg){
		var ul=document.getElementById(cfg.id);
		var _data=cfg.data_bak.PK_0;
		var html=[];
		for(var i=0;i<_data.length;i++){
			var _mainmenu=_data[i];;
			//html.push('<li><a id="'+cfg.id+'_PK_'+_data[i][cfg.field.id]+'" href="#">'+_mainmenu.name+'</a></li>');
			
			html.push('<li')
			if(cfg._values[_data[i][cfg.field.id]]!=null){
				html.push(' class="select" ')
			}
			html.push('><a id="'+cfg.id+'_PK_'+_data[i][cfg.field.id]+'" ><div>'+_mainmenu.name+'</div></a></li>');
		}
		ul.innerHTML=html.join('');
	}
	function _buildEvent(d,cfg){
		var l=d.firstChild.childNodes.length;
		for(var i=0;i<l;i++){
			var li=d.firstChild.childNodes[i];
			li.firstChild.cfg=cfg;
			li.firstChild.showmenu=showmenu;
			li.firstChild[cfg.showmenu]=li.firstChild.showmenu;
			if(li.innerText=='|'){
				li.className='split';
				li.innerText="　";
				continue;	
			}
			li.onmouseover=function(){
				if(cfg.showli){
					cfg.showli.className=cfg.showli.className.replace(/ selected/g,'');
				}
				this.className+=" selected";
				if(cfg._showmenu){
					this.firstChild.showmenu(cfg);
				}
				cfg.showli=this;
			}
			li.onmouseout=function(){
				//变色2	
				this.className=this.className.replace(' selected','');
			}

			li.firstChild.onclick=function(){
				var d=cfg.data_bak[this.id];
				if(d.href!=null&&d.href.length>0){
					window.open(d.href,d.target);
				}else	if(d.click!=null){
					d.click(d);
				}
				if(cfg.on['onclick']!=null){
					cfg.on['onclick'](d);
				}
				if(cfg.showmenu=='onclick'){
					this.showmenu(cfg);
					
				}
			}
		}	
	}
	_config._showmenu=false;
	Ext.lt.message.hook("Popupmenu","closed",function(){
		_config._showmenu=false;
		if(_config.showli){
			_config.showli.className=_config.showli.className.replace(/ selected/g,'');
		}
		_config.showli=null;
		Ext.lt.util.hiddselect(false);
	});
	
	
	
	function showmenu(cfg){
			var mid=this.id.replace("PK","MD");
			if(cfg.beforeshowmenu!=null){
				var menuid = this.id.replace("topmenu1000_PK_","");
				cfg.beforeshowmenu(parseInt(menuid));
			}
			Ext.lt.message.send("Popupmenu","close");
			Ext.lt.util.hiddselect(true);
			this.parentNode.className+=" selected";
			cfg.showli=this.parentNode;
			cfg._showmenu=true;
			if(cfg.data_bak[mid]==null||cfg.data_bak[mid].length==0){return;}
			if(cfg.menu[mid]==null){
				if(cfg._field==null){
					cfg._field={};
					for(var ec in cfg.field){
						cfg._field[ec]=cfg.field[ec];
					}
					cfg._field.sid="_sid";
				}
				
				cfg.menu[mid]=Ext.lt.Popupmenu({
					data:cfg.data_bak[mid],
					field:cfg._field,
					className:cfg.className,
					outformart:cfg.outformart,
					values:cfg.values,
					maxHeight:cfg.maxHeight,
					on:cfg.on
				});
				var div=document.createElement("div");
				div.id=mid;
				document.body.appendChild(div);
				cfg.menu[mid].draw(div);
				div.style.visibility='visible';
				cfg.menu[mid].div=div;
			}
			var _pos=Ext.lt.HTML.positionedOffset(this,document.body,false);
			var x=_pos.left;
			var y=_pos.top+this.offsetHeight+cfg.correction;
			cfg.menu[mid].div.style.left=x-6+'px';
			cfg.menu[mid].div.style.top=y+'px';
			cfg.menu[mid].show();
		}
	function _setDisabled(cfg,d){
		var superid=_getsuperid(cfg,d);
		if(cfg.menu[cfg.id+"_MD_"+superid]!=null){
			cfg.menu[cfg.id+"_MD_"+superid].setDisabled(d[cfg.field.id],d.disabled);;
		}
	}
	function _getsuperid(cfg,d){
		var sid=d._sid;
		if(sid==0){
			return d[cfg.field.sid];
		}else{
			return _getsuperid(cfg,cfg.data_bak[cfg.id+'_PK_'+d[cfg.field.sid]]);
		}
	}
	function _clearMenus(cfg){
		var menus=cfg.menu;
		cfg.data_bak={};
		for(var p in menus){
			document.body.removeChild(document.getElementById(p));
		}
		cfg.menu={};
	}
	
	function _draw(cfg){
		_initData(cfg);
		_buildTopmenu(cfg);
		
		setTimeout(function(){
			var _el=document.getElementById(cfg.id);
			var w=0;
			for(var i=0,l=_el.childNodes.length;i<l;i++){
				w+=_el.childNodes[i].offsetWidth;
				w+=_el.firstChild.offsetLeft;
			}
			if(cfg.scroll){
				_el.style.width=w+"px";
			}
		},100);
	}
	function _removeById(cfg,id){
		var arr=cfg.data_bak["PK_"+id];
		cfg.data.remove(cfg.data_bak[cfg.id+"_PK_"+id]);	
		if(arr!=null){
			cfg.data.remove(arr[i]);
			for(var i=0,l=arr.length;i<l;i++){
				_removeById(cfg,arr[i][cfg.field.id])
			}	
		}
	}
	
	topmenu.initData = function(cfg){
		_initData(this.cfg);
	}
	topmenu.draw=function(div){
		if(div!=null){
			this.cfg.el=div;	
		}
		if(this.cfg.el==null){
			alert('请设置绘制菜单的位置');
			return ;	
		}
		div=this.cfg.el;
		_draw(this.cfg);
		
		if(div.className==null||div.className==""){
			div.className="topmenus2";	
		}
		if(this.cfg.scroll){
			this.cfg._scrollobj=new Ext.lt.scroll({direction:"lr",itemlength:100});
			this.cfg._scrollobj.draw(div);
		}
	}
	topmenu.scroll=function(r){
		if(this.cfg._scrollobj!=null)
		this.cfg._scrollobj.scroll(r);
	}
	topmenu.additem=function(d){
		if(Ext.lt.isArray(d)){
			for(var n=0,l=d.length;n<l;n++){this.cfg.data.push(d[n]);}
		}else{
			this.cfg.data.push(d);
		}
	}
	topmenu.remove=function(d){
		if(Ext.lt.isArray(d)){
			for(var n=0,l=d.length;n<l;n++){this.removeById(d[n][this.cfg.field.id]);}
		}else{
			this.removeById(d[this.cfg.field.id]);
		}
	}
	topmenu.removeById=function(id){
		_removeById(this.cfg,id);
	}
	topmenu.setDisabled=function(id,b){
		this.cfg.data_bak[this.cfg.id+'_PK_'+id].disabled=b;
		_setDisabled(this.cfg,this.cfg.data_bak[this.cfg.id+'_PK_'+id]);
	}
	topmenu.reflash=function(){
		_clearMenus(this.cfg)
		_initData(this.cfg);
		_buildtopmenuli(this.cfg);
		_buildEvent(this.cfg.el,this.cfg)
	}
	topmenu.setShowmenu=function(eventname){
		this.cfg.showmenu=eventname;
	}
	return topmenu;	
}

Ext.lt.pagecomponents=[];
Ext.lt.pagecomponent=function(config){

	var _cmp={};
	var _pagecmpid=config.pagecmpid;
	var _targel=config.target;
	
	// 将后台生成页面区域移动到指定区域
	_cmp.draw=function(el){
		if(this.drawed)return;
		this.drawed=true;
		var pagecmp=document.getElementById(_pagecmpid);
		if(pagecmp==null) return;
		
		//document.body.removeChild(pagecmp);
		el.appendChild(pagecmp);
		pagecmp.style.visibility='visible'
		//pagecmp.removeNode();
		var e=new Date();
	}
	_cmp.resize=function(){}
	Ext.lt.pagecomponents.push(_cmp);
	_cmp._targel=config.target;
	if(_targel!=null){
		try{
		_targel=eval('('+_targel+')');
		}catch(e){}
		if( _targel==null){
			_targel=document.getElementById(_targel);
		}
		Ext.lt.onload(function(){_cmp.draw(_targel)});
	}
	
	return _cmp;
}



Ext.lt.cube=function(cubedata){
	var _cmp=Ext.lt.datatable35(cubedata);
	    _cmp.version='1.0';
	    _cmp.type='cube';
	// 保存原始数据集
	var _cubedata=cubedata.toArray();
	// 按X轴，Y轴设置汇总出来的数据
	var fcubedata=[];
	// 保存字段名
	var _columns=cubedata.getColNames();
	
	var _columnsX=[],_columnsY=[],_columnsZ=[];
	var _initshowlevel=1;
	var _columnYdatas=[];  // Y轴基准数据集，采用多维数组的方式，按数据集实际内容构造基准数据
	var _columnXdatas=[];  // Y轴基准数据集，采用多维数组的方式，按数据集实际内容构造基准数据
	

	
	// 获取列值集，去重并排序
	function _getcolumnvalues(config){
		if(_columns[cn]!=null) return ;
		var carr=[],v,cn=config.name;
		
		for(var j=0,jl=_cubedata.length;j<jl;j++){
			v=_cubedata[j][cn];
			if(!carr['v:'+v]){
				carr.push(v)
				carr['v:'+v]=true;
			}
		}

		if(carr.length<5000)carr._sort(config.asc);
		_columns[cn]=carr;
	}
	
	
	// 设置统计X轴内容，可以穿列名或统计设置对象{name:列名,alias:显示名称,asc:true,filter:array/reg/function,total:{show:true,position:'head',txt:''},}
	_cmp.setColumnX=function(rows){
		if(!Ext.lt.isArray(rows)) rows=[rows]; 
		_columnsX=[];
		var row
		for(var i=0;i<rows.length;i++){
			row=rows[i]
			if(typeof(row)=='string'){
				row={name:row,alias:row,asc:true,filter:null,values:[]};
			}
			else{
				if(row.name==null) alert('统计X轴设置的列名为空');
				if(row.alias==null) row.alias=row.name
				row.asc=row.asc!=true;
				// 不是方法或正则表达式则设置为null
				if(row.filter!=null && Ext.lt.isArray(row.filter) && Ext.lt.isFunction(row.filter) && Ext.lt.isString(row.filter)) row.filter=null;
				if(row.values==null) row.values=[];
			}
			_getcolumnvalues(row);
			
			if(row.filter==null){
				row.values=row.values.concat(_columns[row.name]);
			}
			else if(Ext.lt.isArray(row.filter)){
				row.values=[].concat(row.filter);
				row.hasfilter=true;
			}
			else if(Ext.lt.isFunction(row.filter)){
				var colvs=_columns[row.name],d;
				for(var j=0,jl=colvs.length;j<jl;j++){
					d=colvs[j];
					if(row.filter(d))row.values.push(d);
				}
				row.hasfilter=true;
			}
			else if(Ext.lt.isString(row.filter)){
				var colvs=_columns[row.name];
				row.values=colvs.filter(filter);
				row.hasfilter=true;
			}
			
			if(row.total==null){
				row.total={show:true,position:'head',txt:'合计'}
			}
			else{
				row.total.show=true==row.total.show;
				if(row.total.position!='head' && row.total.position!='tail') row.total.position='head'
				if(row.total.txt==null) row.total.txt='合计';
			}
			
			_columnsX.push(row)
			
		}
	}
	
	// 设置统计Y轴内容{name:列名,asc:true,filter:array/reg/function}
	_cmp.setColumnY=function(columns){
		if(!Ext.lt.isArray(columns)) columns=[columns];
		
		_columnsY=[];
		var column
		for(var i=0;i<columns.length;i++){
			column=columns[i];
			if(typeof(column)=='string'){
				column={name:column,alias:column,asc:true,filter:null,values:[]};
			}
			else{
				if(column.name==null) alert('统计Y轴设置的列名为空');
				if(column.alias==null) column.alias=column.name;
				column.asc=column.asc!=true;
				if(column.values==null)column.values=[];
				// 不是方法或正则表达式则设置为null
				if(column.filter!=null && Ext.lt.isArray(column.filter) && Ext.lt.isFunction(column.filter) && Ext.lt.isString(column.filter)) column.filter=null;
			}
			_getcolumnvalues(column);
			
			if(column.filter==null){
				column.values=column.values.concat(_columns[column.name]);
			}
			else if(Ext.lt.isArray(column.filter)){
				column.values=[].concat(column.filter);
				column.hasfilter=true;
			}
			else if(Ext.lt.isFunction(column.filter)){
				var colvs=_columns[column.name],d;
				for(var j=0,jl=colvs.length;j<jl;j++){
					d=colvs[j];
					if(column.filter(d))column.values.push(d);
				}
				column.hasfilter=true;
			}
			else if(Ext.lt.isString(column.filter)){
				var colvs=_columns[column.name];
				column.values=colvs.filter(filter);
				column.hasfilter=true;
			}
			
			if(column.total==null){
				column.total={show:true,position:'head',txt:(i==0?'总计':'小计')}
			}
			else{
				column.total.show=true==column.total.show;
				if(column.total.position!='head' && column.total.position!='tail') column.total.position='head'
				if(column.total.txt==null) column.total.txt=i==0?'总计':'小计';
			}
			_columnsY.push(column)
		}
		
		// 生成数据过滤函数
		var filterfn=['var Yfilterfunction=function(d){'],col,cvalues,filterflag=false;
		for(var i=0,l=_columnsY.length;i<l;i++){
			col=_columnsY[i];
			if(column.hasfilter){
				filterflag=true
				cvalues=col.values;
				for(var j=0,m=cvalues.length;j<m;j++) col['f_'+cvalues[j]]=true;
				filterfn.push('var dv',i,'=d["'+col.name+'"];if(_columnsY[',i,']["f_"+dv',i,']) return true;');
			}
		}		
		filterfn.push('return false;}')
		if(filterflag){
			eval(filterfn.join(''));
			_cmp['Yfilterfunction']=Yfilterfunction;
		}
		else{
			_cmp['Yfilterfunction']=function(){return true};
		}
	}
	
	// 设置统计项内容，只有数字类型可以设置汇总 对象{name:列名,sigma:}
	_cmp.setColumnZ=function(counts){
		if(!Ext.lt.isArray(counts)) counts=[counts];
		
		_columnsZ=[];
		var count
		for(var i=0;i<counts.length;i++){
			count=counts[i]
			if(typeof(count)=='string'){
				count={name:count,sigma:'count',datatype:'I'};
			}
			else{
				if(count.name==null) alert('统计项设置的列名为空');
				if(count.sigma==null) count.sigma='count';
				if(count.datatype==null) count.datatype='I';
			}
			
			if(count.sigma=='count'){
				count.dosigma=function(obj,data){
					if(obj==null) obj={v:0};
					obj.v++;
					return obj
				};
				count.sumsigma=function(obj1,obj2){
					if(obj1==null) obj1={v:0};
					if(obj1.v==null) obj1.v=0;
					
					if(Ext.lt.isArray(obj2)){
						for(var i=0,l=obj2.length;i<l;i++) obj1.v+=isNaN(obj2.v[i])?0:obj2.v[i];
					}
					else{
						obj1.v+=isNaN(obj2.v)?0:obj2.v; 
					}
					return obj1;
				}
			}
			else if(count.sigma=='sum'){
				count.datatype='N';
				count.dosigma=function(obj,data){
					if(obj==null) obj={size:0,v:0.0};
					obj.size++;
					obj.v+=isNaN(data)?0:data;
					return obj;
				};
				count.sumsigma=function(obj1,obj2){
					if(obj1==null) obj1={size:0,v:0.0};
					if(obj1.v==null) obj1.v=0.0;
					if(obj1.size==null) obj1.size=0.0;
					if(Ext.lt.isArray(obj2)){
						for(var i=0,l=obj2.length;i<l;i++){
							obj1.v+=isNaN(obj2[i].v)?0:obj2[i].v; 
							obj1.size+=isNaN(obj2[i].size)?0:obj2[i].size;
						}
					}
					else{
							obj1.v+=isNaN(obj2.v)?0:obj2.v; 
							obj1.size+=isNaN(obj2.size)?0:obj2.size;
					}
					return obj1;
				}
			}
			else{
				count.dosigma=function(values){return Ext.lt.isArray(values)?values.length:0};
			}
			
			_columnsZ.push(count)
			_columnsZ['Z'+count.name]=count;
		}
	}
	
	
	// 计算合计值，返回recordset数据集
	_cmp.doSigma=function(){
		fcubedata=[]
		var d,fd,key,cname,v,seq,seqtxt,fdata,tmp;
		_columnYdatas=[];
		_columnXdatas=[];
		
		// 生成ykey值生成函数，同时产生Y轴基准数据
		var fnbuf=['var buildColumnYValuesFunction=function(d){var t,coly=_columnYdatas,colx=_columnXdatas;\n']
		// 生成Y轴基准数据
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push('var v=d["',cname,'"],k="v:"+(v==null?"":v);if(v==null)v="";t=coly[k];if(t==null){coly[k]=[];t=coly[k];coly.push(v);};coly=t;\n');
		}
		// 生成X轴基准数据
		for(var n=0,nl=_columnsX.length;n<nl;n++){
			cname=_columnsX[n].name;
			fnbuf.push('var v=d["',cname,'"],k="v:"+(v==null?"":v);if(v==null)v="";t=colx[k];if(t==null){colx[k]=[];t=colx[k];colx.push(v);};colx=t;\n');
		}
		
		// 生成ykey值
		fnbuf.push('return {"ykey":[');
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push(',"Y',cname,'@",d["',cname,'"]');
		}
		fnbuf.push('].join(""),"data":');
		fnbuf.push('{');
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push('"',cname,'":d["',cname,'"],');
		}
		fnbuf.push('t:0},"xkey":[');
		for(var n=0,nl=_columnsX.length;n<nl;n++){
			cname=_columnsX[n].name;
			fnbuf.push('"X',cname,'@"+d["',cname,'"],');
		}
		fnbuf.push('"Z"].join("_")}}');
		
		eval(fnbuf.join(''))
		

		for(var i=0,l=_cubedata.length;i<l;i++){
			d=_cubedata[i];
			
			// 对数据进行筛选
			if(!_cmp.Yfilterfunction(d)) continue;
			
			fd={},key=[],seq=[];
			tmp=buildColumnYValuesFunction(d);
			fd=tmp.data,seq=tmp.ykey,key=tmp.xkey;
			
			tmp=fcubedata[seq]
			if(tmp==null){
				fcubedata.push(seq);
				fcubedata[seq]=fd
			}
			else{
				fd=tmp
			}

			for(var n=0,nl=_columnsZ.length;n<nl;n++){
				cname=_columnsZ[n].name,keytxt=key+cname,fdata=fd[keytxt];
				if(fdata==null){
					fd[keytxt]=_columnsZ[n].dosigma(null,d[cname]);
				}
				else{
					_columnsZ[n].dosigma(fdata,d[cname])
				}
			}
		}
		
		// 生成用于计算列合计的函数
		function buildRowSumFunction(){
			var fnbuf=['var rowsumfunction=function(d){'];
			
			// 生成单层合计函数内容
			function _rowsumfunction(preX,rowlevel,Zrow,zi,colx){
				if(rowlevel>=_columnsX.length) return ;
				if(colx==null) colx=_columnXdatas;
				var nextlevel=rowlevel+1;
				var row=_columnsX[rowlevel];
				var cname=row.name
				var vs=row.values
				var key;
				var fnrowbuf=['d["',preX,Zrow,'"]={};\n']				
				
				for(var i=0,l=vs.length;i<l;i++){
					if(colx['v:'+vs[i]]==null) continue;
					key=preX+'X'+cname+'@'+vs[i]+'_';
					if(rowlevel<_columnsX.length-1) {
						_rowsumfunction(key,nextlevel,Zrow,zi,colx['v:'+vs[i]]);
					}
					fnrowbuf.push('if(d["',key,Zrow,'"]!=null) zcol.sumsigma(d["',preX,Zrow,'"],d["',key,Zrow,'"]);\n')
				}
				fnbuf.push(fnrowbuf.join(''))
			}
			
			for(var zi=0,zl=_columnsZ.length;zi<zl;zi++) {
				fnbuf.push('var zcol=_columnsZ[',zi,'];');
				_rowsumfunction('',0,'Z'+_columnsZ[zi].name,zi);
			}
			fnbuf.push('}')
			eval(fnbuf.join(''))
			return rowsumfunction;
		}
		
		var fn=buildRowSumFunction();
		for(var i=0,l=fcubedata.length;i<l;i++){
			fn(fcubedata[fcubedata[i]]);
		}
		
		_buildColumnSet();
		_buildTemplateDataSet();
		
		return fcubedata;
	}
	
	
	function _buildSumDataFunction(){
		var columns=_cmp.getCols();
		var funcbuf_sum=['var sumdatafunction=function(t,s){'];
		var funcbuf_create=['var createsumlinefunction=function(){var obj={};'];
		var colname;
		
		for(var i=0,l=columns.length;i<l;i++){
			colname=columns[i].name;
			if(columns[i].sumsigma!=null){
				funcbuf_sum.push('if(s["',colname,'"]!=null){_columnsZ[',columns[i].zcolid,'].sumsigma(t["',colname,'"],s["',colname,'"])};\n')
			}
			funcbuf_create.push('obj["',colname,'"]={};');
		}
		
		funcbuf_sum.push('}');
		funcbuf_create.push('return obj}');
		eval(funcbuf_sum.join(''))
		eval(funcbuf_create.join(''))
		_cmp.sumlinedatafunction=sumdatafunction;
		_cmp.createsumlinefunction=createsumlinefunction;
	}
	
	var _lastlinedata={key:null,data:null}
	function _getLineDataByYkey(ykey){
		if(_lastlinedata.key==ykey) return _lastlinedata.data;
		
		var data=[];
		if(ykey.charAt(ykey.length-1)=='@'){
			for(var i=0,l=fcubedata.length;i<l;i++){
				if(fcubedata[i]==ykey || fcubedata[i].indexOf(ykey+'Y')==0){
					data.push(fcubedata[fcubedata[i]]);
				}
			}
		}
		else{
			for(var i=0,l=fcubedata.length;i<l;i++){
				if(fcubedata[i].indexOf(ykey)==0){
					data.push(fcubedata[fcubedata[i]]);
				}
			}
		}
		
		_lastlinedata['key']=ykey;
		_lastlinedata['data']=data;
		return data;
	}
	
	function _Zfn(i,j,rs,value){
		var data=_getLineDataByYkey(rs['_Ykey']);
		var sigmafn=_columnsZ[this.zcolid].sumsigma,key=this.name,v={};
		for(var i=0,l=data.length;i<l;i++){
			if(data[i][key]!=null) sigmafn(v,data[i][key]);
		}
		return this._formartValue(v.v);
	}
	
	
	
		
	function _Yfn(i,j,rs,value){
		var level=rs['_level'],out=[];
		if(level<0) level=0
		for(var i=0;i<level;i++) out.push('&nbsp;&nbsp;')
		var txt=rs[_columnsY[level].name];
		if(txt==null || txt=='') txt='(空值)';
		
		if(rs['_isleaf']){
			out.push('<a>',txt,'</a>')
		}
		else{
			out.push('<font>',(rs['_stat']=='close'?'+':'-'),'&nbsp;</font><a href="#">',txt,'(',rs['_subcount'],')</a>')
		}
		return out.join('');
	}
	
	function _expandData(table,el,l,c,d){
		// 总计行不处理点击事件
		if(l==0 && _columnsY.length>0 && _columnsY[0].total.show) return;
		if(d['_isleaf']) return;
		if(d['_stat']=='close'){
			d['_stat']='open';
			
			// 修改显示状态
			var columns=_getTemplateDataColumns();
			var predata=[],columnydata=_columnYdatas;
			for(var i=0,il=d['_level']+1;i<il;i++){
				predata.push(d[_columnsY[i].name]);
				columnydata=columnydata['v:'+d[_columnsY[i].name]];
			}
			var datas=buildcolumny(d['_Ykey'],d['_level']+1,predata,d['_level']+2,columnydata);
			var newrs=new Ext.lt.recordset({columns:columns,datas:datas})
			
			var rs=_cmp.getRecordSet();
			rs.addData(newrs.toArray().slice(1),l);
			
			// _cmp.reflash('viewdata')
		}
		else{
			d['_stat']='close';
			var rs=_cmp.getRecordSet().toArray();
			var ykey=d['_Ykey'];
			var data,deldatas=[];
			if(ykey.charAt(ykey.length-1)=='@') ykey+='Y';
			for(var i=l+1,il=rs.size;i<il;i++){
				data=rs[i];
				if(data['_Ykey'].indexOf(ykey)==0){
					deldatas.push(data);
				}
				else{
					break;
				}
			}
			_cmp.getRecordSet().remove(deldatas);
		}

	}
	
	function _getTemplateDataColumns(){
		var columns=['_Ykey','_level','_isleaf','_stat','_subcount'];
		for(var i=0,l=_columnsY.length;i<l;i++) columns.push(_columnsY[i].name);
		return columns;
	}
	
	function buildcolumny(preY,rowlevel,predata,maxlevel,columnydatas){
		if(rowlevel>=_columnsY.length) return 0;
		if(maxlevel==null) maxlevel=0
		if(columnydatas==null) return []
		var datas=[];
		var nextlevel=rowlevel+1;
		var row=_columnsY[rowlevel];
		var cname=row.name
		var vs=row.values
		var key=preY,keytxt;
		var linetxt
		var line;
		var totalline=null;
		var subcount=0
		var linedatas=[]
		var subcolumnydatas=null;
		
		// 添加合计
		if(row.total.show) {
			totalline=[preY,rowlevel-1,false,'open',0].concat(predata,row.total.txt);
		}
		
		if(vs.length==0){
			buildcolumny(preY+'Y'+cname+'@',nextlevel,predata.concat('(空值)'),maxlevel);
		}
		else {
			// 这里对下级数据集进行筛选
			for(var i=0,l=vs.length;i<l;i++){
				subcolumnydatas=columnydatas['v:'+(vs[i]==null?'':vs[i])];
				if(subcolumnydatas==null) continue;
				
				linetxt=vs[i]==null?'':vs[i]
				key=preY+'Y'+cname+'@'+(vs[i]==null?'':vs[i]);
				if(rowlevel<_columnsY.length-1) {
					var subdatas=buildcolumny(key,nextlevel,predata.concat(linetxt),maxlevel,subcolumnydatas);
					if(subdatas.length>0){
						subcount+=subdatas['count'];
						if(maxlevel>0 && nextlevel==maxlevel){
							subdatas[0][3]='close';
							subdatas[0][4]=subdatas['count'];
							linedatas.push(subdatas[0]);
						}
						else{
							linedatas=linedatas.concat(subdatas);
						}
					}
				}
				else{
					var v=fcubedata[key]
					if(v!=null){
						line=[key,rowlevel,true,'open',0].concat(predata,linetxt);
						linedatas.push(line);
						subcount++;
						if(rowlevel>maxlevel) break;
					}
				}
			}
		}
		
		if(totalline!=null) totalline[4]=subcount;
		
		if(subcount>0){
			if(row.total.position=='head') datas.push(totalline)
			datas=datas.concat(linedatas);
			if(row.total.position=='tail') datas.push(totalline)
		}
		datas['count']=subcount;
		return datas;
	}
	
	// 根据Y轴设置生成模板数据，即：只包含Y周分组数据，没有汇总数据的数据结构。
	function _buildTemplateDataSet(){
		var columns=_getTemplateDataColumns();
		
		var datas=buildcolumny('',0,[],_initshowlevel,_columnYdatas);
		
		var rs=new Ext.lt.recordset({columns:columns,datas:datas})
		_cmp.setRecordset(rs);
	}
	
	function _headclick_open(table,l,c,el){
		var col=table.getCols()[c],colname=col.name;
		var keyx=col.keyx,headtxt=col.head.join('');
		var allcols=table.getAllCols(),showcolnames=[],cn;
		var xlevel=col.xlevel,stat=col._headbtns.left[el.getAttribute('index')].icon;
		
		var newcols=[];
		for(var i=0,li=allcols.length;i<li;i++){
			col=allcols[i];
			if(col.xlevel==xlevel && col.keyx==keyx){
				col.display=false;
			}
			else if(col.xlevel==xlevel+1 && col.prex==keyx){
				col.display=true;
			}
			
			newcols.push(col);
		}
		_cmp.setCols(newcols);
		_cmp.redraw();
	}
	
	function _headclick_close(table,l,c,el){
		var col=table.getCols()[c],colname=col.name;
		var prex=col.prex,keyx=col.keyx;
		var allcols=table.getAllCols(),showcolnames=[],cn;
		var xlevel=parseInt(el.getAttribute('level'))+1;
		var tmp=keyx.split('_X');
		prex=tmp.slice(0,xlevel).join('_X');
		keyx=tmp.slice(0,xlevel+1).join('_X');
		if(prex.charAt(prex.length-1)!='_') prex+='_'
		if(keyx.charAt(keyx.length-1)!='_') keyx+='_'
		
		var totalprex=prex+'X'+colname+'@_';

		var newcols=[];
		for(var i=0,li=allcols.length;i<li;i++){
			col=allcols[i];
			if(col.xlevel==xlevel-1 && col.keyx==prex){
				col.display=true;
			}
			else{
				if(col.xlevel==xlevel && col.keyx==keyx){
					col.display=false;
				}
				else if(col.keyx!=null && (col.keyx.indexOf(prex)==0 || col.keyx.indexOf(totalprex)==0)){
					col.display=false;
				}
			}
			newcols.push(col);
		}
		_cmp.setCols(newcols);
		_cmp.redraw();
	}
	
	function _buildColumnHead(headtxt,prehead){
		var maxlevel=_columnsX.length-1,h=[];
		for(var i=prehead.length,li=0;i>li;i--){
			h[maxlevel--]=prehead[i-1];
		}
		for(;maxlevel>-1;) h[maxlevel--]=headtxt;
		return h;
	}
	
	// 创建显示列定义
	function _buildColumnSet(){
		var columns=[],rscolumns=[],col;
		columns.push({name:'columnY',alias:'',fn:_Yfn,width:150,onclick:_expandData})
		for(var i=0,l=_columnsY.length;i<l;i++){
			col=_columnsY[i];
			columns.push(Ext.lt.apply({display:false},col));
		}
		
		// 生成横表头
		function buildcolumnx(preX,rowlevel,prehead,colx){
			if(rowlevel>=_columnsX.length) return ;
			var nextlevel=rowlevel+1;
			var row=_columnsX[rowlevel];
			var cname=row.name
			var vs=row.values
			var key=preX,keytxt;
			var zcol,headtxt;
			var display=rowlevel==0?true:false;
			var icon=rowlevel==0?'close':'open';
			var btns=[];
			var preheadtxt='';//rowlevel
			var xv;
			if(colx==null) colx=_columnXdatas;
			
			for(var i=0;i<rowlevel;i++){
				btns.push({icon:'open',level:i+1,position:'left',click:_headclick_close});
			}
			if(rowlevel<_columnsX.length-1) btns.push({icon:'close',level:rowlevel+1,position:'left',click:_headclick_open});

			
			// 添加合计
			if(row.total.show && row.total.position=='head'){
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:true,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?row.total.txt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+row.total.txt,prehead),sumsigma:zcol.sumsigma,display:display};
					
						if(colconfig.head.length !="1"){
							colconfig.btns=btns;
							}
				
					
					columns.push(colconfig);
				}
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+row.total.txt,prehead));
			}
			
			// if(rowlevel<_columnsX.length-1) btn=[{icon:icon,level:rowlevel+1,position:'left',click:_headclick}]
			for(var i=0,l=vs.length;i<l;i++){
				xv=vs[i];
				// 如果该列没有数据则不需要生成
				if(colx['v:'+xv]==null) continue;
				
				headtxt=xv==null?'(空值)':xv;
				key=preX+'X'+cname+'@'+vs[i]+'_';
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:false,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?headtxt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+headtxt,prehead),sumsigma:zcol.sumsigma,display:display};
					colconfig.btns=btns
					columns.push(colconfig);
				}
				
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+headtxt,prehead),colx['v:'+xv]);
			}
			
			// 添加合计
			if(row.total.show && row.total.position=='tail'){
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					key=preX+'X'+cname+'@_';
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:true,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?row.total.txt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+row.total.txt,prehead),sumsigma:zcol.sumsigma,display:display};
					colconfig.btns=btns;
					columns.push(colconfig);
				}
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+row.total.txt,prehead));
			}
		}
		buildcolumnx('',0,[])
		_cmp.setCols(columns);
		_cmp.clockColumnSize(1);
		_buildSumDataFunction()
	}
	
	
	_cmp.drawMultiHead(true);
	_cmp.setInitshowlevel=function(level){
		if(isNaN(level)) return;
		if(level<0) return;
		_initshowlevel=level
	}
	
	
	var _cmpdraw=_cmp.draw;
	_cmp.draw=function(el){
		el.className+=' cube '
		_cmpdraw.apply(this,[el]);
	}
	
	/*
	var cubecomdiv=null;
	var showsigmadatadiv=null;
	var showcolumndatadiv=null;
	var showcolumnXdiv=null;
	var showcolumnYdiv=null;
	var showcolumnZdiv=null;
	
	
	
	
	_cmp.draw=function(el){
		if(el==null) return;
		
		var w=el.offsetWidth,h=el.offsetHeight;
		if(w<500) w=500;
		if(h<400) h=400;
		
		// 生成界面基本结构
		Ext.lt.HTML.setInnerHTML(el,'<div><div></div><div style="height:100%;width:150px;float:left"><div style="width:150px;"></div><table width=150px height=150px border=1 cellpadding=0 cellmargin=0><tr><td></td><td>X</td></tr><tr><td>Y</td><td>Z</td></tr></table></div></div>');
		cubecomdiv=el.firstChild;
		cubecomdiv.style.cssText='width:'+w+'px;height:'+h+'px;overflow:hidden;';
		showsigmadatadiv=cubecomdiv.firstChild;
		showsigmadatadiv.style.cssText='width:'+(w-150-1)+'px;height:'+h+'px;overflow:hidden;float:left;overflow:hidden;';
		var tmpdiv=cubecomdiv.lastChild;
		showcolumndatadiv=tmpdiv.firstChild;
		showcolumndatadiv.style.height=(h-150)+'px';
		tmpdiv=tmpdiv.lastChild.cells;
		showcolumnXdiv=tmpdiv[1];
		showcolumnYdiv=tmpdiv[2];
		showcolumnZdiv=tmpdiv[3];
		
		
		_drawColumnList();
		
		
		_cmp._draw(showsigmadatadiv);
	}
	
	var columnqlist=null;
	function _drawColumnList(){
		var ldata=[];
		for(var i=0,l=_columns.length;i<l;i++){
			ldata.push({itemid:_columns[i],isleaf:true,level:0});
		}
		
		columnqlist=new Ext.lt.Qtree({
			data:ldata
			,outformart:'#itemid'
			,viewmodel:'list'
		});
		columnqlist.draw(showcolumndatadiv);
	}
	*/
	return _cmp;
}



Ext.lt.windowcollect =Ext.lt.createComponent(function(){
	var _cmp={};
	_cmp.draw=function(el){}
	_cmp.resize=function(w,h){}
	
	//收藏夹内容
	_cmp.getcollect=function(){
		var collect =  Ext.lt.util.getUserData("collect");
		if(collect!=null){
			try{
				collect = eval("("+collect+")");
			}catch(e){
			}
		}
		return collect;
	}
 
	
	_cmp.show=function(URL){
		 window.open(URL);
	};
   
	_cmp.del=function(title){
		var col = this.getcollect();
		if(col!=null&&col[title]!=null){
			delete col[title];
			Ext.lt.util.setUserData("collect",Object.toJSON(col));
		}
		
	}
	
	return _cmp;
});








Ext.lt.windowstack=Ext.lt.createComponent(function(config){
	var _cmp={};
	var win_id = 0;
	var wndstyle=config.windowstyle?config.windowstyle:'wind7';
	var nowwindow=config.window||Ext.lt.portalwindow;
	// 保存window.open方法，防止程序通过window.open打开窗口
	var openfn=Ext.lt.windowstack.openfn;
	var showmodal = Ext.lt.windowstack.modalfn;
	if(!openfn){
		Ext.lt.windowstack.openfn=window.open;
		openfn=Ext.lt.windowstack.openfn;
		_initOpenfn();
	}
	if(!showmodal){
		Ext.lt.windowstack.modalfn=window.showModalDialog;
		showmodal=Ext.lt.windowstack.modalfn;
	}
	
	_cmp.draw=function(el){}
	_cmp.resize=function(w,h){}
	
	_cmp.getWindowStack=function(){
		return Ext.lt.windowstack.windowstack;
	}
	
 
	
	function _initOpenfn(){
		Ext.lt.message.hook("window","ruinwindow",function(reps){ //销毁窗口消息
			var tmpwind = stack.getWindow(reps.id);
			if(tmpwind!=null){
				stack.close(reps.id);
			}
		});
		Ext.lt.message.hook("window","minwindow",function(reps){ //最小化窗口消息
			if(reps!=null){
				if(stack.length>2){
					 	stack.shift();
				}
			}
		});
		
		Ext.lt.message.hook("window","togglewindow",function(reps){ //切换窗口 消息
			if(reps!=null){
				Ext.lt.message.send("window","showwindowstack");
			}
		});
		
		 Ext.lt.message.hook("window","collectwindow",function(reps){
			 if(reps!=null){
//				 Ext.lt.util.removeUserData("collect");
				 var allInfo = Ext.lt.util.getUserData("collect");
				try{
					allInfo = eval("("+allInfo+")");
				}catch(e){
				}					 				 
					if(allInfo==null){
						allInfo = {};
					}
					 allInfo[reps.getTitle()] = reps.URL;
					 var result=Object.toJSON(allInfo);
					 Ext.lt.util.setUserData("collect",result); 
				 }
				  
			 }
		  );
		
		Ext.lt.windowstack.windowstack=[];
		var stack=Ext.lt.windowstack.windowstack;
		stack.getWindow=function(URL){
			return stack[URL];
		};
		stack.show=function(winid){
			var wind = stack[winid];
			if(wind!=null){
				// 使窗口全屏显示在窗口中间
				wind.style.zoom=1;
				wind.show();
				Ext.lt.message.send("windowstack","showwindow");
			}
		}
		stack.getOpenedWindow=function(){
			for(var i=0,il=this.length;i<il;i++){
					if(this[i].isopened()) return this[i];
			}
		};
		stack.close=function(winid){
			var wind = stack[winid];
			if(document.body.contains(wind.window)){
				wind.window.removeNode(true);
			}
			 for(var i=0,j=stack.length;i<j;i++){
				 if(stack[i].id==wind.id){
					 stack.splice(i,1);
					 break;
				 }
			 }
			  
			  delete stack[winid];
			  delete stack[wind.URL];
		}
		stack.shift = function(){
			if(stack.length<1){
				return;
			}
			for(var i=0,j=stack.length;i<j;i++){
				var win = stack[i];
				if(!win.islocked){
					this.close(win.id);	
					break;
				}
			}
			
		}
		stack.toggleClock = function(winid){
			var wind = stack[winid];
			wind.islocked = !wind.islocked;
		}
		stack.islock = function(winid){
			return stack[winid].islocked;
		}
		window.oldopen=window.open;
		window.oldclose=window.close;
		window.open=function(URL,config){
			var tokenid = Ext.lt.token.getTokenid();
			if(URL.indexOf('?')==-1){
				URL+='?tokenid='+tokenid;
			}else{
				URL+='&tokenid='+tokenid;
			}
			var wind=stack[URL];
			if(wind==null){
				wind=new nowwindow(Ext.lt.apply({pop:true,className:wndstyle,top:0,left:0,w:document.body.clientWidth,h:Ext.lt.HTML.getBodyHeight(),drag:false,instack:true,ruin:true,
					onclose:function(){
						// alert(0);
					}
				},config));
				wind.islocked = false;//默认窗口不锁定 jzy
				var windbody=document.createElement("IFRAME");
				windbody.frameBorder = 0;
				windbody.style.cssText="width:100%;height:100%;border-width:0px";
				wind.window=windbody;
				windbody.wind=wind;
				document.body.appendChild(windbody);
				Ext.lt.bindEvent(windbody,"onload",function(){
					if(windbody.contentWindow==null) return;
					if(Ext.lt.isFunction(_cmp.onload))_cmp.onload(windbody);
					var wind=windbody.wind;
					try{
						title = windbody.contentWindow.document.title;
						if(title==null||title.trim()==""||title.indexOf("&nbsp")!=-1){
//							title = "窗口"+(win_id++);
						}
						wind.resetTitle(title);
						Ext.lt.message.send("windowstack","addwindow",wind);
						windbody.contentWindow.document.body.focus();
					}catch(e){
						// 跨域调用的话，这里会报错	
					}
	
				});
				
				wind.draw(windbody);
				windbody.src=URL;
				
				// 追加窗口方法
				wind.showPreview=function(){
					this.style.zoom=0.3;
					this.focus();
				}
				var _close = wind.close;
				wind.close=function(){
					wind.onclose = windbody.contentWindow.onclose;
					 _close();
				}
				wind.URL = URL;
				stack.push(wind);
				stack[URL]=wind;
				stack[wind.id]=wind;
			}
			else{
				// 使窗口全屏显示在窗口中间
				wind.style.zoom=1;
				wind.show();
				Ext.lt.message.send("windowstack","showwindow");
			}
		};
		window._close=function(){
			for(var i=0,il=stack.length;i<il;i++){
				var win = stack[i];
				if(win.isopened()){
					win.close();
				}
			}
		};

		window._showModalDialog=function(URL,config){
			var wind = null;
			var cfg = Ext.lt.apply({pop:true,className:wndstyle,top:0,left:0,w:800,h:600,drag:false,instack:true,ruin:true,
				onclose:function(){
					// alert(0);
				}
			},config);
			if(wind==null){
				wind=new Ext.lt.ModalDialog(cfg);
				var windbody=document.createElement("IFRAME");
				windbody.frameBorder = 0;
				windbody.style.cssText="width:100%;height:100%;border-width:0px"
				document.body.appendChild(windbody);				
				Ext.lt.bindEvent(windbody,"onload",function(){
					try{
						if(cfg.title){
							title = cfg.title;
						}else{
							title = windbody.contentWindow.document.title;
						}
						if(title==null||title.trim()==""||title.indexOf("&nbsp")!=-1){
							title = "";
						}
						wind.resetTitle(title);
					}catch(e){
						// 跨域调用的话，这里会报错	
					}
					
				});
				
				wind.draw(windbody);
				windbody.src=Ext.lt.token.urlAddToken(URL);
			}
			else{
				// 使窗口全屏显示在窗口中间
				wind.style.zoom=1;
				wind.show();
				Ext.lt.message.send("windowstack","showwindow");
			}
		};
		Ext.lt.bindEvent(window,"onresize",function(){
			var wind=stack.getOpenedWindow();
			if(wind!=null&&null!=wind.resize){
				wind.resize(document.documentElement.clientWidth,Ext.lt.HTML.getBodyHeight());
			}
		});
	}
	
	_cmp.showStack=function(){
		var listwind=Ext.lt.windowstack.windowlist;
		if(listwind==null){
			listwind=_initWindowStack();
		}
		listwind.show();
	};
	
	function _initWindowStack(){
		var listdiv=document.createElement('DIV');
		listdiv.style.cssText="width:800px;border:1px b;ack solid;overflow:auto;height:400px;margin:20px;position:absolute;left:100px;top:100px;display:none;background-color:gray;"
		document.body.appendChild(listdiv);
		
		listdiv.show=function(){
			var html=[];
			var stack=Ext.lt.windowstack.windowstack;
			html.push('<div style="display:block;width:'+(550*stack.length)+'px;height:300px;">');
			for(var i=0,il=stack.length;i<il;i++){
				html.push('<div style="display:block;width:500px;height:300px;margin:10px;float:left;"></div>');				
			}
			html.push('</div>');
			this.innerHTML=html.join('');
			this.style.display='';
			
			var subdiv=this.firstChild.children;
			for(var i=0,il=stack.length;i<il;i++){
				var wind=stack[i];
				wind.resize(400,200);
				wind.style.position='';
				wind.style.display='';
				subdiv.item(i).appendChild(wind);
			}
		}
		
		return listdiv;
	}
	
	return _cmp;
});

Ext.lt.ModalDialog=function(d){
	var _config=Ext.lt.apply({icon:'wnd_icon',className:'wnd_skin2',style:'',bodystyle:'',title:'&nbsp;',close:true,w:100,h:100,fitmode:'body',mark:false,drag:true},d)
	if(_config.id==null) _config.id='wnd'+Ext.lt.getNextSeqValue();
	
	var shadow = document.createElement("div");
	shadow.className = "screenshadow";
	var zIndex = Ext.lt.getNextZIndex();
	shadow.style.cssText="z-index:"+zIndex+";width:"+window.document.body.scrollWidth+"px;height:"+window.document.body.scrollHeight+"px;";
	
	var dialog=document.createElement('div');
	dialog.id=_config.id;
	dialog.className=_config.className;
	dialog.style.cssText='width:'+_config.w+'px;height:'+_config.h+'px;z-index:'+zIndex;
	Ext.lt.HTML.setStyle(dialog,_config.style.replace(/\s/g,''))
	dialog.style.display='none';

	
	if(_config.onclose!=null) _config.onclose=Ext.lt.util.fnbind(_config.onclose,dialog);
	var _events={
		'close':function(){if(_config.onclose==null){return}else{return _config.onclose()}},
		'ruin':function(){if(_config.onruin==null){return}else{return _config.onruin()}}
	};
	function _fireEvent(en,param){
		if(_events[en]!=null) return _events[en](param);
	}
	
	
	var _html=['<table width="100%"  border="0" cellSpacing="0" cellPadding="0"><tr class="head"><td class="left"></td><td class="bg"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="',_config.icon,'"></td><td class=" title" NOWRAP >',_config.title,'</td><td class="closewidth">','<input type="button" method=ruin class=btn_close overclass=btn_close_over title=关闭  />','</td></tr></table></td><td class="right"></td></tr>',
	'<tr class="foot"><td class="left_bg"></td><td><div class="wbody">',
	'</div></td><td class="right_bg"></td></tr><tr class="foot"><td class="tw_bl"></td><td class="tw_bbg"></td><td class="tw_br"></td></tr></table>'];
	
	dialog.resetTitle=function(title){
		this.head.rows[0].cells[1].innerHTML = title;
	};
	
	dialog.getTitle=function(){
		return this.head.rows[0].cells[1].innerHTML;
	};
	
	dialog.draw=Ext.lt.util.fnbind(function(div){
		window.document.body.appendChild(shadow);  
		window.document.body.appendChild(this);
		Ext.lt.HTML.setInnerHTML(this,_html.join(''))
		this.head=dialog.firstChild.rows.item(0).cells.item(1).firstChild;
		this.body=dialog.lastChild.rows.item(1).getElementsByTagName('DIV').item(0);
		Ext.lt.HTML.setStyle(this.body,_config.bodystyle.replace(/\s/g,''));

		var btns=this.getElementsByTagName('input');
		for(var i=0;i<btns.length;i++){
			if(btns[i].type!="button"){continue;}
			btns[i].onclick=function(){
				var m=this.getAttribute('method');
				if(dialog[m]!=null) 
					dialog[m]();
			}
		}
		
		this.body.appendChild(div);
		this.style.position='absolute';
	      // 生成拖拽对象
	      if(_config.drag){
	    	  Ext.lt.HTML.drag({
		      	element:this.head.rows.item(0).cells.item(1),
		      	dragel:this,
		      	holder:false
		      });
			}
		// 显示窗口
			this.show();
	},dialog);
	
	// 关闭窗口(实际为最小化)
	dialog.close=function(){
		if(_fireEvent('close')!=false) dialog.hide();
	}
	//关闭窗口（文档流中移除）
	dialog.ruin=function(){
		if(_fireEvent('ruin')!=false){
			if(Ext.lt.isie){
				dialog.removeNode(true);
			}else{
				var dandy = dialog.parentNode; 
				try{
					dandy.removeChild(dialog);
				}catch(e){
				}
			}
		}
		shadow.style.display = "none";
		window.document.body.style.overflow = _initbodyscroll;
	}
 
	var _initbodyscroll = null;
	dialog.show=Ext.lt.util.fnbind(function(){
		_initbodyscroll = window.document.body.style.overflow; 
		window.document.body.style.overflow = "hidden";
		this.style.zIndex =  Ext.lt.getNextZIndex();
		if(_fireEvent('show')==false) return;
		shadow.style.width = window.document.documentElement.scrollWidth+"px";
		shadow.style.height =window.document.documentElement.scrollHeight+"px";
		shadow.style.display = "block";
		this.style.display='';
		this.style.zIndex=Ext.lt.getNextZIndex();
		var w=this.offsetWidth,h=this.offsetHeight;
		if(w==0||h==0) return;
		// 设置窗口大小
			this.resize(w,h);
			this.style.left=((document.documentElement.offsetWidth-w)/2)+'px';
			this.style.top=((window.document.documentElement.scrollTop)+(window.document.documentElement.clientHeight-this.offsetHeight)*0.5)+'px';
	},dialog);
	
	dialog.isopened=function(){
		return dialog.style.display!='none'&&shadow.style.display!='none';
	}

	dialog.isclose=function(){
		return dialog.style.display=='none'&&shadow.style.display=='none';
	}
	
	dialog.resize=function(w,h){

		var bodyborder_leftobj=this.body.parentElement.previousSibling
		var leftRstyle=Ext.lt.HTML.getRealStyle(bodyborder_leftobj);
		var bodyborder_left=isNaN(parseInt(leftRstyle.width,10))?bodyborder_leftobj.offsetWidth:parseInt(leftRstyle.width,10);

		var bodyborder_rightobj=this.body.parentElement.nextSibling
		var rightRstyle=Ext.lt.HTML.getRealStyle(bodyborder_rightobj);
		var bodyborder_right=isNaN(parseInt(rightRstyle.width,10))?bodyborder_rightobj.offsetWidth:parseInt(rightRstyle.width,10);

		var bodyborder_bottomobj=this.body.parentElement.parentElement.nextSibling
		var bodyborder_bottom=bodyborder_bottomobj.offsetHeight;
		
		var divborder = Ext.lt.HTML.getBorderSet(this.body);
		
		
		if(_config.fitmode=='body'){
			var windborder=Ext.lt.HTML.getBorderSet(this);
			this.style.width=w+'px';
			this.style.height=h+'px';
			this.body.style.width=(w-bodyborder_left-bodyborder_right-windborder.width-divborder.width)+'px';
			this.body.style.height=(h-this.head.offsetHeight-bodyborder_bottom-windborder.height)+'px';
		}
		else if(_config.fitmode=='content'){
			this.body.style.width=(w)+'px';
			this.body.style.height=(h)+'px';
			this.style.width=(bodyborder_left+bodyborder_right+w+divborder.width)+'px'
			this.style.height=(this.head.offsetHeight+h+bodyborder_bottom)+'px'
		}
	}
	// 窗口按钮事件
	Ext.lt.bindEvent(dialog,"onclick",Ext.lt.util.fnbind(function(){
		var srcel=window.event.srcElement;
		// 该方法只处理按钮事件
		if(srcel.tagName!='INPUT') return ;
		if(srcel.className=='btn_ruin'){
			if(_fireEvent('ruin')!=false){
				this.ruin();
			}
		}
		if(srcel.className=='btn_close'){
			if(_fireEvent('close')!=false){
				this.close();
			}
		}
		window.event.cancelBubble =true;
	},dialog))
	
	Ext.lt.HTML.expandHTMLElement(dialog);
	return dialog;
}



// browser global cache
Ext.lt.GCache=(function(){
	var _cmp={};
	
	function getRootWindow(){
		var _rootwindow=window.opener;
		while(_rootwindow.opener){
			_rootwindow=_rootwindow.opener;
		}
		return _rootwindow;
	}
	
	function getCache(){
		var wind=getRootWindow();
		if(!wind._globalcache){
			wind._globalcache=[];
		}
		return wind._globalcache;
	}

	_cmp.put=function(k,v){
		var c=getCache();
		c[k]=v;
	}
	
	_cmp.get=function(k){
		var c=getCache();
		return c[k];
	}


	return _cmp;	
})()


Ext.lt.dic=(function(){
	var _cmp={},gcache=Ext.lt.GCache,rcp=Ext.lt.RCP,dic_key='DIC_CACHE::';
	
	
	function _loadRanges(dsguid,fn){
		var dsid=dsguid;
		rcp.server('gov.mof.fasp2.dic.dataset.componentservice.DataSetCacheComponent','getRangesByDsGuid',[dsid],function(datas){
			_putCache(dsid,datas);
			if(!fn) fn(datas);
		});
	}
	
	function _loadRangesBygudis(dsguid,rangeguids,fn){
		var dsid=dsguid;
		rcp.server('gov.mof.fasp2.dic.dataset.componentservice.DataSetCacheComponent','getRangesByGuid',[dsid,rangeguids],function(datas){
			_putCache(dsid,datas);
			if(!fn) fn(datas);
		});
	}
	
	function _putCache(dsguid,datas){
		datas=datas.toArray();
		var c=_cmp.getLocalRanges(dsguid);
		if(!Ext.lt.isArray(c)) c=[];
		for(var i=0,il=datas.length,d;i<il;i++){
			d=datas[i];
			c.push(d);
			c['guid:'+d.guid]=d;
		}
		gcache.put(dic_key+dsguid,c);
		console.log('load '+dsguid+'('+c.length+') finished' );
	}
	
	_cmp.load=function(dsguids,fn){
		if(!Ext.lt.isArray(dsguids)) dsguids=[dsguids];
		var dscount=dsguids.length,loadcount=0;
		for(var i=0;i<dscount;i++){
			_cmp.loadDsRanges(dsguids[i],function(datas){
				loadcount++;
				if(loadcount==loadcount && !fn) fn();
			})
		}
	}
		
		
	_cmp.loadDsRanges=function(dsguid,fn){
		var dsid=dsguid,c=_cmp.getLocalRanges(dsguid);
		if(c==null){
			_loadRanges(dsguid,fn)
		}
		else{
			console.log('load '+dsguid+'('+c.length+') from gcache' );
			if(!fn) fn(c);
		}
	}

	_cmp.getLocalRanges=function(ds){
		return gcache.get(dic_key+ds)
	}
	
	_cmp.loadRangesByguid=function(ds,ranges,fn){
		if(!Ext.lt.isArray(ranges)) ranges=[ranges];
		var c=_cmp.getLocalRange(ds),loaddata=[],loadguids=[],d,id;
		for(var i=0,il=ranges.length;i<il;i++){
			id=ranges[i];
			d=c['guid:'+id];
			d==null?loadguids.push(id):loaddata.push(d);
		}
		
		if(loadguids.length==0){
			if(fn) fn(loaddata);
		}
		else{
			_loadRangesBygudis(ds,loadguids,function(data){
				if(fn) fn(loaddata.concat(data));
			});
		}
		return loaddata;
	}
	
	return _cmp;
})()


//Ext.lt.dic.load(['099003','099076','099079','099079','10103','10103','10603','10606','10606','10609','10909','10912','10915','10922','10925','10928','10931','2300jSoiCDVP'],function(){console.log('加载完毕')});
//Ext.lt.dic.load(['099003']);