if(Ext.lt==null) alert('请加载ltext_core.js');

/**
	标准编辑框扩展,扩展后对象API如下
	
	支持的编辑框类型（type属性）：
	input：文本编辑框
	amtinput：金额编辑框
	numberinput：数字编辑框
	select：多选列表文本框
	treeselect：多选树型文本框
	label：文字标签
	button：按钮
	date：日期型文本框
	
	
EditPanel
	采用HTML元素初始化表单时建议采用UL LI标签。其中UL标签代表整个表单区域，LI代表其中的每一个编辑选项，通过UL、LI标签的属性设置表单外观和行为
参数：
	initFormPanel(element,ds)	需要扩展成编辑框的HTML元素，数据集

集合：
	elements	包含所有编辑区元素对象的引用，采用Array/Object方式存储所有编辑区子对象引用。

方法：
	getData()		获取编辑区绑定的值对象，如果初始化时值对象为Null，编辑区会重新创建一个值对象
	on({eventname:function(ds,param),…})	绑定事件，参数为对象，key是事件名，值为事件处理函数。事件处理函数包含两个参数，第一个为编辑区绑定的数据集，第二个是出发事件的对象传送的参数
	fireEvent(eventname,param)		触发指定的事件，参数为事件名和传递的参数。
	reset()		重置编辑区的内容
	check()		校验编辑区的内容，返回值为boolean。true表示全部校验通过
	submit(callback:function(returnvalue))		向初始化参数中action属性中设置的地址提交编辑区内容，在远程调用前会执行submit事件，远程调用成功后回执行aftersubmit事件
	bind(object)	向编辑区绑定数据集对象，可以为null。如果参数为null时则构造一个新的值对象
	isChange()	返回值为boolean。该方法会检查编辑区绑定的值对象的属性是否被改变过，如果有改变则返回true，没有则返回false



编辑元素对象
    编辑区对象包括label、input、select等常用输入对象。
    
公有属性；
	type：编辑元素的类型
	name：编辑元素的名称，也是编辑区对象elements集合中指向编辑元素的属性名称
	label：编辑区前面文字部分，支持HTML格式
	labelwidth：编辑区前面文字提示部分的宽度，支持像素，百分比方式设置。默认120像素
	width：编辑区整体宽度，可以使用像素、百分比方式设置。默认33.3%，编辑区内容分3列显示
	maxlength：最大录入文字数，对input，amtinput，text等可录入类型起作用
	clearbtn：可选值yes、no，默认no 显示清除按钮，可以通过清除按钮删除编辑框中显示的内容
	isrequired：是否可空，可选值true。当设置为true时在label后面追加红色星号，在check方法中验证用户必须录入信息或选择信息
	
	

公有方法：
	reset()	重置方法，将编辑元素内容与绑定值对象的属性值恢复到初始状态。注：这里是恢复到初始状态，不是清空属性
	check()	检查编辑元素内录入的值是否符合系统要求，符合返回true，不符合返回false。该方法为编辑元素强制要求实现的方法。验证逻辑有各个编辑元素自己实现。
	bind(object)	绑定数据对象属性与编辑元素name属性相同的属性值，如果参数为空，则自动创建一个新对象



	
 */
Ext.lt.editpanel2=function(config,server){
	var _clearbtn=this._clearbtn='<button class="btn_clear" overclass="btn_clear_over" clickclass="btn_clear_click"></button>';
	var _morebtn=this._morebtn='<button class="btn_pop" overclass="btn_pop_over" clickclass="btn_pop_click"></button>'; //按钮做为全局变量来统一处理
	var _listbtn=this._listbtn='<button class="btn_list"   overclass="btn_list_over" clickclass="btn_list_click"></button>';
	var _datebtn=this._datebtn='<button class="btn_date" overclass="btn_date_over" clickclass="btn_date_click"></button>';
	var _calbtnfn=this._calbtnfn=function(s,switchgroup){
		if(typeof(switchgroup)=="undefined"){
			switchgroup = "_buildfrom";
		}
		return '<button class="cal" switchgroup="'+switchgroup+'" switchclass="calon" '+(s?'switch="on"':'')+'></button>';
	}
	
	var _edit = config;
	var _cfg;
	var maxwidth;

	// 拼装editpanel属性
	var _elconfig=this._elconfig=function(el){
		return {
			type:el.type==null?'input':el.type,
			treetype:el.treetype==null?'select':el.treetype,
			isMulti:el.isMulti==null?false:el.isMulti,
			outformart:el.outformart==null?false:el.outformart,
			field:el.field==null?null:el.field,
			label:el.label==null?'':el.label,
			isrequired:el.isrequired,
			isedit:el.isedit!=false,
			labelwidth:el.labelwidth==null?'0':el.labelwidth,
			format:el.format==null?'':el.format,
			width:el.width,
			clearbtn:el.clearbtn==null?false:el.clearbtn,
			morebtn:el.morebtn==null?false:el.morebtn,
			name:el.name==null?'':el.name,
			maxlength:el.maxlength==null?'250':el.maxlength,
			cal:el.cal==null?false:el.cal==true,
			calmode:el.calmode==null?false:el.calmode=='on',
			redwordmode:el.redwordmode==null?false:el.redwordmode=='on',
			dot:el.dot==null?2:parseInt(el.dot,10),
			qfw:el.qfw==null?true:el.qfw=='true',
			initzero:el.initzero==null?false:el.initzero,
			action:el.action==null?'':el.action,
			dataloader:el.dataloader==null?'':el.dataloader,
			loadthedata:el.loadthedata==null?'':el.loadthedata,
			selectmode:el.selectmode==null?'':el.selectmode,
			tipstext:el.tipstext==null?null:el.tipstext,
			textarearows:el.textarearows==null?9:parseInt(el.textarearows)
		}
	}
	
	 
	_edit.draw = function(el){
		 _edit.tagel = el;
		 var _inc = this;
		 _inc.divs = [];
		 el.className=" editpanel2";
		 var columnsize = _edit.columnsize;
		 var hasconfig = _edit.hasconfig; //是否含配置页面
		 maxwidth = el.offsetWidth/2;
		 var containerDiv = document.createElement("div");
		 containerDiv.className="containerDiv";
		 containerDiv.style.width = el.offsetWidth-(hasconfig?35:0);
		 el.appendChild(containerDiv);
		 
		 var bottomDiv = document.createElement("div");
		 bottomDiv.className="bottomDiv";
		 bottomDiv.style.width = "100%";
		 containerDiv.appendChild(bottomDiv);
		 
		 if(hasconfig&&_edit.hasconfigobj){
			 var imgDiv = document.createElement("div");
			 imgDiv.className="imgDiv";
			 imgDiv.style.width=28;
			 imgDiv.style.height=containerDiv.offsetHeight; 
			 imgDiv.innerHTML = "<img   src='../../../images/fasp/editpanel/setOnpage.gif' style='cursor:pointer;' />"
			 el.appendChild(imgDiv);
			 
			 imgDiv.title = _edit.hasconfigobj.title;
			 imgDiv.attachEvent("onclick",function(){
				 _edit.hasconfigobj.clickHandle();
			 });
		 }
		 
		 
		 
		 var colwidth = Math.floor(10/columnsize)*10;
		 var eles=_edit.elements;
		 for(var k=0;k<eles.length;k++){
			 var _div = document.createElement("div");
			 _div.className = "conditionDiv";
			 _div.style.width = colwidth+"%";
			 bottomDiv.appendChild(_div);
			 _inc.divs[k]=_div;
		 }
		 for(var i=0,j=eles.length;i<j;i++){
			 tmp = eles[i];
			 eles[tmp].draw(_inc.divs[i]);
		 }
		 for(var i=0,j=eles.length;i<j;i++){
			 tmp = eles[i];
			 if(eles[tmp].paneltype=="textarea"&&_edit.form._div_width&&_edit.form._div_height){
				 eles[tmp].resize(_edit.form._div_width,_edit.form._div_height);
			 }
		 }
	}
	
	_edit.resize = function(w,h){
		 var hasconfig = _edit.hasconfig; //是否含配置页面
		w = w -(hasconfig?35:0);
		var eles=_edit.elements;
		var width = w*Math.floor(10/_edit.columnsize)*10/100;
		if(width<200){
			width= 200;
		}
		var _divwidth = _edit.form._div_width;
	//	if(_divwidth){ jzy20131119暂时注掉
			//if(width>_divwidth){ //重画目标宽度大于标准组件宽度，此时应该以大的算。
				_divwidth = width;
			//} 
			_edit.form.columns = Math.floor((w)/_divwidth);//调整大小后一行有多少个标准宽度的组件,不足N个，以N-1个算，最小为1，不可能为零，
			_edit.form.columns = _edit.form.columns==0?1:_edit.form.columns;
//		}
		 for(var i=0,j=eles.length;i<j;i++){
			 tmp = eles[i];
			 eles[tmp].resize(width);
		 }
		 if(_edit.tagel){
			 //此时容器DIV内部所有元素的实际宽度
			 var cal_w = _edit.form.columns*_divwidth;
			 			//+(_edit.form.columns)*2; //有边线 需要加上边线宽度
			 //容器DIV的宽度
			 var ctr_w = _edit.tagel.offsetWidth-(_edit.hasconfig?35:0); //containerDiv宽度
			 _edit.tagel.firstChild.style.width =  ctr_w; //containerDiv宽度
			 while(cal_w>ctr_w&&_edit.form.columns>0){ //bottomDiv的宽度一直是标准宽度*当前实际每行组件个数
				 _edit.form.columns--;
				 cal_w = _edit.form.columns*_divwidth+(_edit.form.columns)*2;
			 }
			 
			 
	/*		 if(cal_w>_edit.tagel.firstChild.offsetWidth){
				  cal_w = _edit.tagel.firstChild.offsetWidth;
			 }*/
			 
			 _edit.tagel.firstChild.firstChild.style.width = cal_w; //bottomDiv 宽度
			 if(_edit.hasconfig)_edit.tagel.firstChild.nextSibling.style.height = _edit.tagel.firstChild.offsetHeight-2;// imgDiv宽度 
		 }
	}
	
	_edit.clear = function(){
		var eles=_edit.elements;
		 for(var i=0,j=eles.length;i<j;i++){
			 tmp = eles[i];
			 eles[tmp].clear();
		 }
	}
 
	//生成Label,使用label标签
	var _buildLabel=this._buildLabel=function(cfg,contextfn){
		var _html=[];
		_html.push('<div class="treeselect">');
		if(cfg.label!=null && cfg.label!=''){
			if(cfg.labelwidth==0){
				_html.push('<label class="lab">',cfg.label);
			}
			else{
				_html.push('<label class="lab" style="width:',cfg.labelwidth,';">',cfg.label);
			}
			// 判断是否为必填项
			if(cfg.isrequired) _html.push('<font color=red>*</font>');
			_html.push('</label>');
		}
		// 生成内部HTML
		_html.push(contextfn(),'</div>');
		return _html.join('');
	}
	
	
	// 生成Label区域
	var _buildLabel2=this._buildLabel2=function(cfg,contextfn){
		var _html=[]
		if(cfg.label!=null && cfg.label!=''){
			// _html.push(_labelstart);
			if(cfg.labelwidth==0){
				_html.push('<qt class="lab">',cfg.label);
			}
			else{
				_html.push('<qt style="width:',cfg.labelwidth,';" class="lab">',cfg.label);
			}
			// 判断是否为必填项
			if(cfg.isrequired) _html.push('&nbsp;<font color=red>*</font>');
			_html.push('</qt><qt>');
		}

		// 生成内部HTML
		_html.push(contextfn(),'</qt>');

		// 生成其余Table部分
		//if(cfg.label!=null &&cfg.label!='') _html.push('</div>',_labelend);
		return _html.join('');
	}
	
	//自定义组件querypanel
	var _querytree=function(cfg){
		var _obj = null;
		cfg.createComponet = function(obj,arguments){ //自定义组件继承父类组件接口 ，实现大部分方法
			_edit.querytree_modal.apply(obj,arguments);
		}
		if(cfg.formpanel.querypanel){
			_obj = eval('new Ext.lt.querypanel_'+cfg.name+'(cfg)');
		}else if(cfg.formpanel.editformpanel){
			_obj = eval('new Ext.lt.editformpanel_'+cfg.name+'(cfg)');
		}
		return _obj;
	}
	//提供自定义弹出树组件的一个简单结构，业务系统自定义组件继承该组件
	_edit.querytree_modal = function(cfg){
		var _cfg = this._cfg = cfg;
		 var _clearbtn =this._clearbtn='<button class="btn_clear" overclass="btn_clear_over" clickclass="btn_clear_click"></button>';
		 var _morebtn =this._morebtn='<button class="btn_pop" overclass="btn_pop_over" clickclass="btn_pop_click"></button>'; //按钮做为全局变量来统一处理
		 var _listbtn =this._listbtn='<button class="btn_list"   overclass="btn_list_over" clickclass="btn_list_click"></button>';
		 var _form = this._form=cfg.formpanel;
		 var minwidth = this.minwidth =180;
		 var _tagel = this._tagel=_cfg.tagel;
		 var datapool = []; //存放窗口选中值.
		 var putData =  this.putData = function(obj){
			 datapool = [];
			 if(obj)datapool.push(obj);
			 _input.fireEvent('onblur');
		 }
		 this.getData = function(){
			 return datapool;
		 }
		 this._buildLabel = function(cfg,contextfn){
			var _html=[];
			_html.push('<div class="treeselect">');
			if(cfg.label!=null && cfg.label!=''){
				if(cfg.labelwidth==0){
					_html.push('<label class="lab">',cfg.label);
				}
				else{
					_html.push('<label class="lab" style="width:',cfg.labelwidth,';">',cfg.label);
				}
				// 判断是否为必填项
				if(cfg.isrequired) _html.push('<font color=red>*</font>');
				_html.push('</label>');
			}
			// 生成内部HTML
			_html.push(contextfn(),'</div>');
			return _html.join('');
		}
	  this.toString = function(){
			return this._buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" ',_cfg.isedit==false?'readonly':'',' type="text" mutldata="1" class="inputbox"','/>'];
					_html.push(_morebtn);
					_html.push(_clearbtn);
				return _html.join('');
			});
		}
	  this.reset = function(){
	  }
	  this.check = function(){
	  }
	  //自定义按钮组件单击方法，默认为空
	  this.btn_onclick = function(){
	  }
	  //自定义文本组件的单击方法，
	  this.ipt_onclick = function(){
	  }
	  this.bind=function(ds){
			_input.settext();
			_input.bindMutlval(ds); //数据项类型绑定多个值 
			
			if(ds[_cfg.name]==null) ds[_cfg.name]={val:'',sval:''};
			
			_dsbak = Ext.lt.cloneobj(ds[_cfg.name]);//每次绑定数据更新备份数据	
			
			_selNode =[]; //有默认值 需要有默认显示  itemid
			var val_arry = [];
			
			if(_dsbak.val.toString().trim()!="")val_arry=_dsbak.val.toString().split(',');
			var sval_arry = [];
			if(_dsbak.sval.toString().trim()!="")sval_arry=_dsbak.sval.toString().split(',');
			
			for(var i=0;i<val_arry.length;i++){
				var tmpobj = {
						itemid:val_arry[i],
						value:sval_arry[i]
				}
				_selNode.push(tmpobj);
				this.putData(tmpobj);
			}
			_input.fireEvent('onblur');
			if(_selNode.length>0){
				var defs=[];
				for(var i=0,j=_selNode.length;i<j;i++){
					if(_selNode[i].value){
						defs.push(_selNode[i].value);
					}else{
						defs.push(_selNode[i].code+"-"+_selNode[i].name);
					}
				}
				_input.settext(defs.join(","));
			}
	  };
	  this.clrbtn_onclick=function(){
			_input.settext();
			 putData();
	    _input.fireEvent('onblur');
		_form.aftervaluechange({src:_input,value:""});
	  }
	  
	  this.draw = function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			_tagel.setInnerHTML(this.toString());
			
			// 获取Input对象，增加处理属性
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_btn_ctrl=_input.nextSibling;
			_input.onclick = this.ipt_onclick;
			_btn_ctrl.onclick=this.btn_onclick; //按钮事件需要自己实现
			_btn_clear=_btn_ctrl.nextSibling;
	 		_btn_clear.onclick=this.clrbtn_onclick;
			
			_input.onafterbind=function(){
					var sels=ins.getData();
				//	var sels = _selNode;
					var values=[],texts=[];
					if(sels!=null&&sels[0]!=null){
						for(var i=0,l=sels.length;i<l;i++){
							if(sels[i].value){
								texts.push(sels[i].value);
							}else{
								texts.push(sels[i].code+"-"+sels[i].name);
							}
							values.push(sels[i].itemid);
						}
						_input.settext(texts.join());
						//	_input.setvalue(values.join()); 
							ins.value = values.join();
					}
					if(ins.ischange()){
						if(_cfg.isedit){
							_form.aftervaluechange({src:_input,value:_input.value});
						}else{
							_form.aftervaluechange({src:_input,value:values.join()});
						}
					}
			}
			this._layout();
			return;
		}
	  this.ischange = function(){
	    	var val = _input.value;
	    	if(val==_dsbak.sval){
	    		return false;
	    	}
	    	return true;
	  }
	  this.resize = function(w,h){
			if(w!=null){
				_input.parentNode.style.width=w+'px'
				_input.parentNode.parentNode.style.width=w+'px'
			} 
			if(h!=null) _input.parentNode.style.height=h+'px'
			this._layout();
	 }
	 this._layout = function(){
			var outEl = _input.parentNode;
			//alert(_input.parentNode.offsetWidth)
			 var width =outEl.parentNode.offsetWidth ;
			 var _labelWidth = 0;
			 if(cfg.label!=null){
				 _labelWidth=outEl.firstChild.offsetWidth;
			 }
			 width -=  _labelWidth;
			  width-=40;
			 if(width>80) width*=0.9;
			  if(width<80) width=80;
			// Ext.lt.message.send("editpanel", "treeselectwidth", width+"");
			 _input.style.width=(width)+'px'; 
			 
			 width += _labelWidth;
			  width+=50;
			 if(width< minwidth){
				 width =  minwidth;
			 }
			  outEl.style.width=(width)+'px';
			  outEl.parentNode.style.width=(width)+'px';
			 _form._div_width = width;
			 // outEl.style.width=(outEl.parentNode.offsetWidth-10)+'px';
		}
	}
	
	var extendformelement=function(formelement){
;
			var _formelement=formelement;
			
			if(_formelement.gettagel==null){
				alert('该formelement组件需要实现gettagel方法');	
			}
			
			_formelement.show=function(){
				formelement.gettagel().style.display="";
			}
		
			_formelement.hide=function(){
				formelement.gettagel().style.display="none";
			}
			
			return _formelement;
	}
	
	//按公司规范实现的标准大文本录入textarea
	var _textarea=function(cfg){
		var _cfg=cfg;
		var _tagel =_cfg.tagel;
		var _input = null;
		var _id=_cfg.id;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name =_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isrequired=cfg.isrequired;
		var _pl_input;
		var minwidth = 180;
		var _form=cfg.formpanel;
		var _dsbak=null; //数据备份
		// 如果传入的是对象名时，则从全局变量中查找该对象
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
		_pl_input=new function(){		
			var _p1=this;
			
			this.paneltype="textarea";//组件类型
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<textarea id="',_cfg.id,'" name="',_name,'" class="inputbox2" ROWS = ',_cfg.textarearows,'  maxLength=',_cfg.maxlength,'></textarea>'];
					return _html.join('');
				});
			};
			this.gettegel=function(){
				return _tagel;
			}
			this.draw =function(el){
				var ins = this;
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定TextArea框生成的目标对象');
					return;
				}
				Ext.lt.HTML.expand(_tagel);
				_tagel.setInnerHTML(this.toString());
				// 获取Textarea对象，增加处理属性
				_input=_tagel.getElementsByTagName('TEXTAREA').item(0);

				// 处理捆绑数据集中的值
				if(_ds==null||isempty(_ds)){
					_input.value=_tipstext;
				//	Ext.lt.HTML.setRuntimeStyle(_input,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_input.value=_ds[_name];
				}
				
				_input.attachEvent('onfocus',function(){
					//_input.select();
					if(_input.value==_tipstext){
						_input.value="";
					}
					_input.runtimeStyle.color='';
				});
				
				// 失焦点事件，处理数据校验，同步数据集数据等操作
				_input.attachEvent('onblur',Ext.lt.util.fnbind(function(){
					var v=this.value;
					if(v=='') {
						this.value=_tipstext;
						this.runtimeStyle.color=_tipstextcolor;
					}
					// 校验非空提示，更换样式单会造成input框宽度变形，因此暂时改为代码设置出错样式
					if(_isrequired && v==''){
						if(this.borderBottomColorbak==null) this.borderBottomColorbak=this.currentStyle.borderBottomColor
						if(this.borderBottomStylebak==null) this.borderBottomStylebak=this.currentStyle.borderBottomStyle
						this.style.borderBottomColor='red'
						this.style.borderBottomStyle='dashed'
					}
					else{
						if(this.borderBottomColorbak!=null)this.style.borderBottomColor=this.borderBottomColorbak
						if(this.borderBottomStylebak!=null)this.style.borderBottomStyle=this.borderBottomStylebak
					}
					window.event.cancelBubble=true;
/*					if(ins.ischange()){ //同步数据仓库
						_form.aftervaluechange({src:_input,value:v});
					}*/
				},_input));
				
				_input.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}else{
						this.runtimeStyle.color="";
					}

					
					// 同步更新form表单数据
					if(ins.ischange()){
						_form.aftervaluechange({src:_input,value:v!=_tipstext?v:''});
						_dsbak = v!=_tipstext?v:''; //更新 最新的值
					}
				}
				this._layout();
 				 Ext.lt.message.hook("editpanel", "outDivWidth", _layout2);
			}
			// 值是否改变
		    this.ischange=function(){
		    	var val = _input.value;
		    	if(typeof(val)!="undefined"&&val!=_dsbak){ //值不等于提示文字以及默认值
		    		return true;
		    	}
		    	return false;
		    }
			function _layout2(w,h){
				_p1._layout(w, h);
			}
			this._layout=function(w,h){
				var outEl = _input.parentNode; 
				//alert(_input.parentNode.offsetWidth)
				 var width =outEl.parentNode.offsetWidth ; //condititonDIv
			//	 if(w)width =  w;
				 var _labelWidth = 0;
				 if(cfg.label!=null){
					 _labelWidth=outEl.firstChild.offsetWidth;
				 }
				 width -=  _labelWidth;
				  width-=40;
				 if(width>80) width*=0.9;
				  if(width<80) width=80;
					 if(width> maxwidth){
						 width =  maxwidth;
					 }
				 //_input.style.width=(width)+'px';
				 
				 width += _labelWidth;
				 width += 50;
				 if(width < minwidth){
					 width =  minwidth;
				 }
				 
				 w = outEl.parentNode.offsetWidth;
				 var size = 1;
				 if(_edit.form._div_width)w=_edit.form._div_width;
				 if(_edit.form.columns)size = _edit.form.columns;
				 outEl.style.width=(w*size)+'px';
				 outEl.parentNode.style.width=(w*size)+'px';
				 
				 //_input.style.width=(w*size-_labelWidth-40)*0.8+'px';
				 _input.style.width=(w*size-_labelWidth-40)+'px';
		 
			};
			this.resize=function(w,h){
				if(w)w = Number(w);
				if(h)h = Number(h);
				if(w!=null){
					_input.parentNode.style.width=w+'px'
					_input.parentNode.parentNode.style.width=w+'px'
				}
				if(h!=null) {
					//_input.parentNode.style.height=h+'px';
					//_input.parentNode.parentNode.style.height=h+'px';
				}
				this._layout();
			};
			
			//设置名称属性
			this.name=_name;
			
			this.clear=function(){
				if(typeof(_tipstext)!="undefined"&&_tipstext!=""){
					_input.settext(_tipstext);
				}else{
					_input.settext();
				}
				_input.fireEvent('onblur');
				_form.aftervaluechange({src:_input,value:""});
			}
			
			// 将对象内容重置为初始值
			this.reset=function(){
				_input.reset();
			}
			// 校验文本框内容是否符合设置
			this.check=function(){
				if(_isrequired && (_input.value==null || _input.value=='')){
					alert(_cfg.label+'是必填项，请填写');
					_input.fireEvent('onfocus');
					_input.focus();
					return false;
				}
			}
			// 绑定数据集
			this.bind=function(ds){
				_input.bind(ds);
				if(ds[this.name]==null) ds[this.name]='';
				_dsbak = ds[this.name]; //每次绑定数据更新备份数据
				_input.fireEvent('onblur');
			}
			
		};
		return extendformelement(_pl_input);
		
	}
	
	// 按公司规范实现的标准输入框
	/*
	type:"input"  录入框类型
	width:String 宽度设置，可以使用百分比或数字加单位的形式。如"49.9%"、"300px"
	maxlength:String 最大输入长度，默认250
	isrequired:"true"    是否必填，默认为false，设置为true后录入说明位置自动追加红色星号
	label:"输入文本"     label区文字
	labelwidth:			 label区宽度
	tipstext:     缺省提示性文字，当设置该属性后，在文本框生成时和文本框内容为空的状态下失去焦点时，文本框内容将显示为defaulttext内所设置的内容
	bind:		绑定数据集对象名或对象本身，输入框自动修改绑定数据集中属性域name相同的内容
	*/
	var _input=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel==null?'':_tagel.innerHTML;
		var _input=null;
		var _id=_cfg.id;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name=_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isrequired=cfg.isrequired;
		var _pl_input ={};
		var _form=cfg.formpanel;
		var _dsbak = null ; //数据备份
		var minwidth = 180;
		
		// 如果传入的是对象名时，则从全局变量中查找该对象
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
			
			// 设置对象返回值
		_pl_input.getValue=function(){return _input.value};
			
			
		_pl_input.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input id="',_cfg.id,'" name="',_name,'" class="inputbox" type="text" maxLength=',_cfg.maxlength,'/>'];
					return _html.join('');
				});
			};
			
			_pl_input.gettagel=function(){
				return _tagel;
			}
			_pl_input.draw=function(el){
				var ins = this;
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				Ext.lt.HTML.expand(_tagel);
				_tagel.setInnerHTML(this.toString());
				
				// 获取Input对象，增加处理属性
				_input=_tagel.getElementsByTagName('INPUT').item(0);
				if(_cfg.morebtn) _morebtn=_input.nextSibling;
				if(_cfg.clearbtn) _morebtn==null?_clearbtn=_input.nextSibling:_clearbtn=_morebtn.nextSibling

				// 处理捆绑数据集中的值
				if(_ds==null||isempty(_ds)){
					_input.value=_tipstext;
				//	Ext.lt.HTML.setRuntimeStyle(_input,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_input.value=_ds[_name];
				}
				
				// 清空按钮的点击事件
				if(_clearbtn!=null){
						_clearbtn.onclick=function(){
						_input.value='';
						_input.fireEvent('onblur');
					}
				}

				_input.attachEvent('onfocus',function(){
					//_input.select();
					if(_input.value==_tipstext){
						_input.value="";
					}
					_input.runtimeStyle.color='';
				});
				
				// 失焦点事件，处理数据校验，同步数据集数据等操作
				_input.attachEvent('onblur',Ext.lt.util.fnbind(function(){
					var v=this.value;
					if(v=='') {
						this.value=_tipstext;
						this.runtimeStyle.color=_tipstextcolor;
					}
					// 校验非空提示，更换样式单会造成input框宽度变形，因此暂时改为代码设置出错样式
					if(_isrequired && v==''){
						if(this.borderBottomColorbak==null) this.borderBottomColorbak=this.currentStyle.borderBottomColor
						if(this.borderBottomStylebak==null) this.borderBottomStylebak=this.currentStyle.borderBottomStyle
						this.style.borderBottomColor='red'
						this.style.borderBottomStyle='dashed'
					}
					else{
						if(this.borderBottomColorbak!=null)this.style.borderBottomColor=this.borderBottomColorbak
						if(this.borderBottomStylebak!=null)this.style.borderBottomStyle=this.borderBottomStylebak
					}
					window.event.cancelBubble=true;
			/*		if(ins.ischange()){
						_form.aftervaluechange({src:_input,value:v});
					}*/
				},_input));
				
				_input.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}else{
						this.runtimeStyle.color="";
					}
					
					// 同步更新form表单数据
					if(ins.ischange()){
						_form.aftervaluechange({src:_input,value:v!=_tipstext?v:''});
						_dsbak = v!=_tipstext?v:''; //更新 最新的值
					}
				}
				this._layout();
			};
			// 值是否改变
			_pl_input.ischange=function(){
		    	var val = _input.value;
		    	if(typeof(val)!="undefined"&&val!=_dsbak){ //值不等于提示文字以及默认值
		    		return true;
		    	}
		    	return false;
		    }
			// 设置名称属性
			_pl_input.name=_name;
			
			_pl_input.clear=function(){
				if(typeof(_tipstext)!="undefined"&&_tipstext!=""){
					_input.settext(_tipstext);
				}else{
					_input.settext();
				}
				_input.fireEvent('onblur');
				_form.aftervaluechange({src:_input,value:""});
			}
			
			// 将对象内容重置为初始值
			_pl_input.reset=function(){
				_input.reset();
			}
			// 校验文本框内容是否符合设置
			_pl_input.check=function(){
				if(_isrequired && (_input.value==null || _input.value==''||_input.value==_tipstext)){
					alert(_cfg.label+'是必填项，请填写');
					_input.fireEvent('onfocus');
					_input.focus();
					return false;
				}
			}
			// 绑定数据集
			_pl_input.bind=function(ds){
				_input.bind(ds);
				if(ds[this.name]==null) ds[this.name]='';
				_dsbak = ds[this.name]; //每次绑定数据更新备份数据
				_input.fireEvent('onblur');
			}
			_pl_input.resize=function(w,h){
				if(w!=null){
					_input.parentNode.style.width=w+'px'
					_input.parentNode.parentNode.style.width=w+'px'
				}
				if(h!=null) _tagel.style.height=h+'px'
				this._layout();
			}
			
			//文本框宽度跟下拉组件看齐
			function _layout2(width){
				var v = Number(width);
				_form._input_width = v;
				_pl_input._layout(v);
			}
			_pl_input._layout=function(width2){
				var outEl = _input.parentNode;
				//alert(_input.parentNode.offsetWidth)
				 var width =outEl.parentNode.offsetWidth ;
				 var _labelWidth = 0;
				 if(cfg.label!=null){
					 _labelWidth=outEl.firstChild.offsetWidth;
				 }
				 width -=  _labelWidth;
				 width-=20;
				 width-=20;
				 if(width>80) width*=0.9;
				 if(width<80) width=80;
				 if(width>maxwidth){
					 width = maxwidth;
				 }
				 if(typeof(width2)!="undefined")width = width2;
				 if(typeof(_form._input_width)!="undefined")width = _form._input_width;
				 _input.style.width=(width)+'px';
				 
				 
				 
				 width = width+_labelWidth;
					 width+=25;
					 width+=25;
				 if(width< minwidth){
					 width =  minwidth;
				 }
			 	 outEl.style.width=(width)+'px';
			 	 outEl.parentNode.style.width=(width)+'px';
				 
				 _form._div_width = width;
				 _form._div_height= outEl.parentNode.offsetHeight;
			}
			debugger;
		return extendformelement(_pl_input);
	}
	
	
	
	var _treeselecti=function(cfg){
		var _cfg=cfg;
		var _input=null;
		var _treevalue_start="";
		var _treevalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _qtree_start=null;
		var _qtree_end = null;
		var _cmp={};
		var _input_start,_input_end,_btn_start,_btn_end,_clearbtn;
		var _tagel;
		
		var _id='ts_'+Ext.lt.getNextSeqValue();
		var _pop_start=new Ext.lt.popwindow();
		var _pop=new Ext.lt.popwindow();
		
		_cmp.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="start_',_cfg.name,'" id="start_'+_id+'" ',_cfg.isedit==false?'readonly':'',' type="text" class="shortdate"','/>'];
				if(_cfg.treetype=="tree"){
					_html.push(_cfg._morebtn);
				}else{
					_html.push(_listbtn);
				}
				var _html2=['至','<input name="end_',_cfg.name,'" id="end_'+_id+'" ',_cfg.isedit==false?'readonly':'',' type="text" class="shortdate"','/>']
				
				if(_cfg.treetype=="tree"){
					_html2.push(_cfg._morebtn);
				}else{
					_html2.push(_listbtn);
				}
				_html2.join('');
				if(_cfg.clearbtn){
					_html.push(_clearbtn);
				}
				return _html.join('');
			});
		}
		
		_cmp.gettagel=function(){
			return _tagel;
		}
		_cmp.draw=function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('请设置绘制treeselect控件的位置');
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			_tagel.setInnerHTML(this.toString());
		}
		
		_cmp.bind=function(ds){
			
		}
		_cmp.resize=function(w,h){
			
		}
		_cmp.clear=function(){
		
		}
		return extendformelement(_cmp);
	}
	
	// 日期区间文本框
	// 日期区间包含两个日期控件，校验时候一项必须大于前一项的时间
	// 两个日期属性为 start_控件名 end_控件名
	var _datei=function(_cfg){
		var _name=_cfg.name;
		var _format=_cfg.format==''?'%Y%m%d':_cfg.format;
		var _datevalue_start="";
		var _datevalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _cmp={name:_name,resize:function(){}};
		var _input_start,_input_end,_btn_start,_btn_end,_clearbtn_start,_clearbtn_end;
		var _tagel;
		
		_cmp.gettagel=function(){
			return _tagel;
		}
		
		_cmp.draw=function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('没有指定Input框生成的目标对象');
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			_tagel.setInnerHTML(_buildLabel(_cfg,function(){
				var _html=['<input name="start_',_cfg.name,'" id="start_',_cfg.name,'" class="shortdate" type="text" />',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:'','至<input name="end_',_cfg.name,'" id="end_',_cfg.name,'"  class="shortdate" type="text" />',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:''];
				return _html.join('');
			}));
			
			
			// 获取可操作对象	
			_input_start=el.getElementsByTagName('INPUT').item(0);//起始日期
			_btn_start=_input_start.nextSibling;
			if(_cfg.clearbtn) _clearbtn_start=_btn_start.nextSibling;
			
			_input_end=el.getElementsByTagName('INPUT').item(1); //终止日期
			_btn_end=_input_end.nextSibling;
			if(_cfg.clearbtn)_clearbtn_end=_btn_end.nextSibling;
			
			// 添加对象行为
			//_input_start.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_start.onclick=function(){return showCalendar(this.previousSibling.id, _format, null, true);}
			if(_cfg.clearbtn) _clearbtn_start.onclick=function(){_input_start.value='';_input_start.onchange()}
			_input_start.onchange=function(){
				//_datevalue_start=this.value;
				_input_start.fireEvent("onblur");
				
			};
			_input_start.onafterbind=function(){
	/*			var v=_dataset[_input_start.name];
				if(v!=null && v!=_datevalue_start){
					this.value=_datevalue_start;
					_input_start.fireEvent("onblur");
					return;
				}*/
				//this.value=_datevalue_start.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				
				if(!_cmp.check()){
					return;
				}
				// 检查数据类型
		// 注掉		if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
			//	if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_start,value:_datevalue_start});	
				if(_form!=null&&_cmp.ischange()) _form.aftervaluechange({src:_input_start,value:_input_start.value});
			}
			
			
			// 添加第二文本框对象行为
			//_input_end.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_end.onclick=function(){return showCalendar(this.previousSibling.id, _format, null, true);}
			if(_cfg.clearbtn) _clearbtn_end.onclick=function(){_input_end.value='';_input_end.onchange()}
			_input_end.onchange=function(){
	//			_datevalue_end=this.value;
				_input_end.fireEvent("onblur");
		//		return;*/
			};
			_input_end.onafterbind=function(){
	/*			var v=_dataset[_input_end.name];
				if(v!=null && v!=_datevalue_end){
					this.value=_datevalue_end;
					_input_end.fireEvent("onblur");
				}*/
				
				//this.value=_datevalue_end.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				if(!_cmp.check()){
				//	_btn_end.onclick();
					return;
				}
				
				// 检查数据类型
			//	var v=_dataset[this.name];
		//	if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
				//if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_end,value:_datevalue_end});	
				if(_form!=null&&_cmp.ischange()) _form.aftervaluechange({src:_input_end,value:_input_end.value});
			}
			
		}
		
		_cmp.ischange=function(){
			if(_input_end.value!=_datevalue_end||_input_start.value!=_datevalue_start){
				return true;
			}
			return false;
		}
		
		_cmp.reset=function(){
			_input_start.reset();
			_input_end.reset();
		}
		_cmp.clear=function(){
			_input_start.settext();
			_input_start.setvalue();
			
			_input_end.settext();
			_input_end.setvalue();
			
			_form.aftervaluechange({src:_input_start,value:""});
			_form.aftervaluechange({src:_input_end,value:""});
			
		}
		
		_cmp.bind=function(ds){
			_dataset=ds;
			// 处理开始时间
			if(ds['start_'+_name]!=null){
				_datevalue_start=Ext.lt.dateutil.YYYYMMDD(ds['start_'+_name]);
			}
			else{
				_datevalue_start="";
			}
			_input_start.bind(ds);
			_input_start.fireEvent("onblur");


			// 处理结束时间
			if(ds['end_'+_name]!=null){
				_datevalue_end=Ext.lt.dateutil.YYYYMMDD(ds['end_'+_name]);
			}
			else{
				_datevalue_end="";
			}
			_input_end.bind(ds);
			_input_end.fireEvent("onblur");
		}
		
		_cmp.check=function(){
			var v_1 = _input_start.value;
			var v_2 = _input_end.value;
   
			if(!checkDate(_input_start)){
				return false;
			}
			if(!checkDate(_input_end)){
				return false;
			}

			if(v_2==null ||v_2==''){
				return true;
			}
			if(parseInt(v_1,10)>=parseInt(v_2,10)){
				alert('起始日期必须小于终止日期');
				_input_end.value="";
				_input_end.focus();
				return false;
			}
			return true;
		}
		
		function checkDate(oTextbox){
		    oTextbox.value = oTextbox.value.trim();
			var inputVal = oTextbox.value;
			//格式：yyyymmdd
			var regDate = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])([-]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-]?)(?:29|30)|(?:0?[13578]|1[02])([-]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2([-]?)29)$/g;
			var isValidDate = regDate.test(inputVal);
			if(!isValidDate&&inputVal!=null&&inputVal!=""){
				alert("日期或格式错误，请重新填写！");
				oTextbox.value = "";
				return false;
			}else{
				if(typeof _format !="undefined" && _format=="%Y%m%d"){
					if(inputVal.indexOf("-")>-1||inputVal.indexOf("/")>-1 || inputVal.indexOf(".")>-1) {
						inputVal = 	inputVal.replace(/-/g,"").replace(/\//g,"").replace(/\./g,"");
					}
				}
				oTextbox.value = inputVal;
				return true;
			}
		}
 
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var outEl = _input_start.parentNode;
			//alert(_input.parentNode.offsetWidth)
			 var width =outEl.offsetWidth ;
				if(_form._div_width)width = _form._div_width;
			 var _labelWidth = 0;
			 if(_cfg.label!=null){
				 _labelWidth=outEl.firstChild.offsetWidth;
			 }
			
			width-=_labelWidth;
			width-=40;
			width-=16 // 删除‘至’的宽度
			
			if(width>30) width*=.9;
			if(width<30) width=30
			_input_start.style.width=width/2+'px';
			_input_end.style.width=width/2+'px';

			 width += _labelWidth;
			  width+=50;
			 
			  outEl.style.width=(_form._div_width)+'px';
			  outEl.parentNode.style.width=(_form._div_width)+'px';
			
		}
		
		return extendformelement(_cmp);
	}
	
	
	
	// 文本区间
	// 文本区间
	// 两个控件属性为 start_控件名 end_控件名
	var _amtinputi=function(_cfg){
		var _name=_cfg.name;
		var _inputvalue_start="";
		var _inputvalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _cmp={name:_name,resize:function(){}};
		var _input_start,_input_end,_calbtn_start,_calbtn_end,_clearbtn_start,_clearbtn_end;
		var _tagel;
		var _express_start='',_express_end='';
		var _datevalue_end,_datevalue_start;
		
		_cmp.gettagel=function(){
			return _tagel;
		}
		
		_cmp.draw=function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('没有指定Input框生成的目标对象');
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			var _tk = _buildLabel(_cfg,function(){
				var _btn_first = _cfg.cal?_calbtnfn(_cfg.calmode,'_bulidform_1'):'';
				var _btn_second = _cfg.cal?_calbtnfn(_cfg.calmode,'_bulidform_2'):'';
				var _html=['<input name="min_',_cfg.name,'" id="min_',_cfg.name,'" class="shortdate" type="text" />',_btn_first,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:'','至<input name="max_',_cfg.name,'" id="max_',_cfg.name,'"  class="shortdate" type="text" />',_btn_second,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:''];
				return _html.join('');
			});
			_tagel.setInnerHTML(_tk);
			
			// 获取可操作对象	
			_input_start=el.getElementsByTagName('INPUT').item(0);//起始文本框
			if(_cfg.cal) _calbtn_start=_input_start.nextSibling;
			if(_cfg.clearbtn) _calbtn_start==null?_clearbtn_start=_input_start.nextSibling:_clearbtn_start=_calbtn_start.nextSibling;
			
			
			_input_end=el.getElementsByTagName('INPUT').item(1); //终止文本框
			if(_cfg.cal) _calbtn_end=_input_end.nextSibling;
			if(_cfg.clearbtn) _calbtn_end==null?_clearbtn_end=_input_end.nextSibling:_clearbtn_end=_calbtn_end.nextSibling;
			
			
			
			// 文本框事件
			_input_start.attachEvent('onfocus',function(){
				_input_start.value=_input_start.value.replace(/,/g,'');
				_input_start.select();
			});
			
			// 失焦点事件，将数字格式化显示
			_input_start.attachEvent('onblur',function(){
				// 开启计算式模式失焦点时先处理计算机内容，在通过计算机按钮调用失去焦点事件
				if(_cfg.cal && !_calbtn_start.switchon) return;
				fireBlur2();
			});
			
			function fireBlur2(){
				_input_start.value=_input_start.value.toNumber(_cfg.dot,_cfg.qfw,1);
				if(!_cfg.initzero&&_input_start.value.trim()==0){
					_input_start.value="";
				}
				ins._value = _input_start.value;
	 			if(!ins.check()){
					return;
				}
				if(ins.ischange()){
					_form.aftervaluechange({src:_input_start,value:_input_start.value.replace(/,/gi,'')});
				}
			}
			
			// 处理负数显示为红字的问题
			_input_start.attachEvent('onkeyup',function(){
				if(_cfg.redwordmode){
					if(_input_start.value.charAt(0)=='-'){
						_input_start.runtimeStyle.color='red';
					}
					else{
						_input_start.runtimeStyle.color='';
					}
				}
			});
			_input_start.attachEvent('onkeydown',function(){
				var keycode=event.keyCode;
				// 计算器模式下可以输入任意字符
				if(_cfg.cal &&!_calbtn_start.switchon){
					// 计算器模式下按回车建相当于关闭计算器
					if(keycode==13) _calbtn_start.fireEvent('onclick');
					return true;
				}
				
				//var nstr=String.fromCharCode(keycode)
				
				//if(!isNaN(nstr)) return true; // 输入的是数字
				if(keycode<48||keycode>57) return true;
				if(keycode<41 && keycode>36) return true; // 方向键
				if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // 回车、tab键 del键 退格键
				
				// 负号 只能录入一个，并且出现在第一个位置
				// 数据负号后在录入数字前面追加一个负号
				if(keycode==189){
					if(_input_start.value.indexOf('-')==-1){
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input_start.createTextRange());
						point= r.text.length;
						_input_start.value='-'+_input_start.value;
						r.move("character", point+1); 
						r.select();
					}
					else{
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input_start.createTextRange());
						point= r.text.length;
						_input_start.value=_input_start.value.replace(/-/g,'');
						r.move("character", point-1); 
						r.select();
					}
				}
				
				// 小数点，只能录入一个小数点，如果文本中已经有小数点，则删除之前的小数点，在新的位置生成小数点
				if(keycode==190){
					r = document.selection.createRange(); 
					r.collapse(false); 
					r.setEndPoint("StartToStart", _input_start.createTextRange());
					point= r.text.length;
					_input_start.value=_input_start.value.substr(0,point).replace(/\./g,'')+'.'+_input_start.value.substr(point).replace(/\./g,'');
					r.move("character", point); 
					r.select(); 
				}

				_input_start.focus();
				return false;						
			});
			
			// 计算器按钮
			if(_calbtn_start!=null){
				_calbtn_start.attachEvent('onclick',function(){
					if(_calbtn_start.switchon){ //为1，则当前为普通模式，下一步打开计算模式
						_input_start.runtimeStyle.backgroundColor='yellow';
						_input_start.runtimeStyle.color='';
						if(_express_start==null) _express_start=_input_start.value
						_input_start.value=_express_start;
						_input_start.focus();
					}
					else{ //为0，则当前为计算器模式，下一步关闭计算器模式
						_input_start.runtimeStyle.backgroundColor='';
						_express_start=_input_start.value;
						try{_input_start.value=eval(_input_start.value)}catch(ex){_input_start.value='0'} ;
						_input_start.fireEvent('onkeyup');
						//_input_start.fireEvent('onblur');
						fireBlur2();
					}
				});
			}
			
			// 文本框事件
			_input_end.attachEvent('onfocus',function(){
				_input_end.value=_input_end.value.replace(/,/g,'');
				_input_end.select();
			});
			
			// 失焦点事件，将数字格式化显示
			_input_end.attachEvent('onblur',function(){
				// 开启计算式模式失焦点时先处理计算机内容，在通过计算机按钮调用失去焦点事件
				if(_cfg.cal && !_calbtn_end.switchon) return;
				fireBlur();
			});
			
			function fireBlur(){
				_input_end.value=_input_end.value.toNumber(_cfg.dot,_cfg.qfw,1);
				if(!_cfg.initzero&&_input_end.value.trim()==0){
					_input_end.value="";
				}
				ins._value = _input_end.value;
				if(!ins.check()){
					return;
				}
				if(ins.ischange()){
					_form.aftervaluechange({src:_input_end,value:_input_end.value.replace(/,/gi,'')});
				}
			}
			
			// 处理负数显示为红字的问题
			_input_end.attachEvent('onkeyup',function(){
				if(_cfg.redwordmode){
					if(_input_end.value.charAt(0)=='-'){
						_input_end.runtimeStyle.color='red';
					}
					else{
						_input_end.runtimeStyle.color='';
					}
				}
			});
			_input_end.attachEvent('onkeydown',function(){
				var keycode=event.keyCode;
				// 计算器模式下可以输入任意字符
				if(_cfg.cal &&!_calbtn_end.switchon){
					// 计算器模式下按回车建相当于关闭计算器
					if(keycode==13) _calbtn_end.fireEvent('onclick');
					return true;
				}
				
				//var nstr=String.fromCharCode(keycode)
				
				//if(!isNaN(nstr)) return true; // 输入的是数字
				if(keycode<48||keycode>57) return true;
				if(keycode<41 && keycode>36) return true; // 方向键
				if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // 回车、tab键 del键 退格键
				
				// 负号 只能录入一个，并且出现在第一个位置
				// 数据负号后在录入数字前面追加一个负号
				if(keycode==189){
					if(_input_end.value.indexOf('-')==-1){
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input_end.createTextRange());
						point= r.text.length;
						_input_end.value='-'+_input_end.value;
						r.move("character", point+1); 
						r.select();
					}
					else{
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input_end.createTextRange());
						point= r.text.length;
						_input_end.value=_input_end.value.replace(/-/g,'');
						r.move("character", point-1); 
						r.select();
					}
				}
				
				// 小数点，只能录入一个小数点，如果文本中已经有小数点，则删除之前的小数点，在新的位置生成小数点
				if(keycode==190){
					r = document.selection.createRange(); 
					r.collapse(false); 
					r.setEndPoint("StartToStart", _input_end.createTextRange());
					point= r.text.length;
					_input_end.value=_input_end.value.substr(0,point).replace(/\./g,'')+'.'+_input_end.value.substr(point).replace(/\./g,'');
					r.move("character", point); 
					r.select(); 
				}

				_input_end.focus();
				return false;						
			});
			
			// 计算器按钮
			if(_calbtn_end!=null){
				_calbtn_end.attachEvent('onclick',function(){
					if(_calbtn_end.switchon){ //为1，则当前为普通模式，下一步打开计算模式
						_input_end.runtimeStyle.backgroundColor='yellow';
						_input_end.runtimeStyle.color='';
						if(_express_end==null) _express_end=_input_end.value
						_input_end.value=_express_end;
						_input_end.focus();
					}
					else{ //为0，则当前为计算器模式，下一步关闭计算器模式
						_input_end.runtimeStyle.backgroundColor='';
						_express_end=_input_end.value;
						try{_input_end.value=eval(_input_end.value)}catch(ex){_input_end.value='0'} ;
						_input_end.fireEvent('onkeyup');
						//_input_end.fireEvent('onblur');
						fireBlur();
					}
				});
			}
			this._layout();
		}
		
		_cmp.check=function(){
			var v_1=_input_start.value;
			var v_2=_input_end.value;
			if(v_2==null ||v_2==''||(v_2==0&&v_1==0)){ //金额区间都是0.0验证通过
				return true;
			}
			if(v_1-v_2>0){
				alert("最小金额值不能大于最大金额");
				_input_end.settext();
				_input_end.focus();
				return false;
			}
			return true;
		}
		
		_cmp.reset=function(){
			_input_start.reset();
			_input_end.reset();
		}
		_cmp.clear=function(){
			if(!_cfg.initzero){
				_input_start.settext();
			}else{
				_input_start.settext("".toNumber(_cfg.dot,_cfg.qfw,1));
			}
			_form.aftervaluechange({src:_input_start,value:_input_start.value.replace(/,/gi,'')});
			if(!_cfg.initzero){
				_input_end.settext();
			}else{
				_input_end.settext("".toNumber(_cfg.dot,_cfg.qfw,1));
			}
			_form.aftervaluechange({src:_input_end,value:_input_end.value.replace(/,/gi,'')});
			
		}
		_cmp.ischange=function(){
			if(_input_end.value.replace(/,/gi,'')!=_datevalue_end||_input_start.value.replace(/,/gi,'')!=_datevalue_start){
				return true;
			}
			return false;
		}
		
		_cmp.bind=function(ds){
			_dataset=ds;
			if(ds['min_'+_name]!=null){
				_datevalue_start=ds['min_'+_name];
			}
			else{
				_datevalue_start="";
			}
			_input_start.bind(ds);
			_input_start.fireEvent("onblur");


			if(ds['max_'+_name]!=null){
				_datevalue_end=ds['max_'+_name];
			}
			else{
				_datevalue_end="";
			}
			_input_end.bind(ds);
			_input_end.fireEvent("onblur");
		}
		
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var outEl = _input_start.parentNode;
			//alert(_input.parentNode.offsetWidth)
			 var width =outEl.offsetWidth ;
				if(_form._div_width)width = _form._div_width;
			 var _labelWidth = 0;
			 if(_cfg.label!=null){
				 _labelWidth=outEl.firstChild.offsetWidth;
			 }
			
			width-=_labelWidth;
			width-=40;
			width-=16 // 删除‘至’的宽度
			
			if(width>30) width*=.9;
			if(width<30) width=30
			_input_start.style.width=width/2+'px';
			_input_end.style.width=width/2+'px';

			 width += _labelWidth;
			  width+=50;
			 
			  outEl.style.width=(_form._div_width)+'px';
			  outEl.parentNode.style.width=(_form._div_width)+'px';
			
		}
		
		return extendformelement(_cmp);
	}
	
	
	// 文本区间
	// 文本区间
	// 两个控件属性为 start_控件名 end_控件名
	var _inputi=function(_cfg){
		var _name=_cfg.name;
		var _inputvalue_start="";
		var _inputvalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _cmp={name:_name,resize:function(){}};
		var _input_start,_input_end,_clearbtn_start,_clearbtn_end,_btn_start,_btn_end;
		var _tagel;
		var _datevalue_end,_datevalue_start;
		
		_cmp.gettagel=function(){
			return _tagel;
		}
		
		_cmp.draw=function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('没有指定Input框生成的目标对象');
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			_tagel.setInnerHTML(_buildLabel(_cfg,function(){
				var _html=['<input name="min_',_cfg.name,'" id="min_',_cfg.name,'" class="shortdate" type="text" />',_cfg.clearbtn?Ext.lt.editpanel._clearbtn:'','至<input name="max_',_cfg.name,'" id="max_',_cfg.name,'"  class="shortdate" type="text" />',_cfg.clearbtn?Ext.lt.editpanel._clearbtn:''];
				return _html.join('');
			}));
			
			
			// 获取可操作对象	
			_input_start=el.getElementsByTagName('INPUT').item(0);//起始文本框
			if(_cfg.clearbtn) _clearbtn_start=_input_start.nextSibling;
			
			_input_end=el.getElementsByTagName('INPUT').item(1); //终止日期
			if(_cfg.clearbtn)_clearbtn_end=_input_end.nextSibling;
			
			// 添加对象行为
			if(_cfg.clearbtn) _clearbtn_start.onclick=function(){_input_start.value='';_input_start.onchange()}
			_input_start.onchange=function(){
/*				_datevalue_start=this.value;
*/				_input_start.fireEvent("onblur");
				
			};
			_input_start.onafterbind=function(){
/*				var v=_dataset[_input_start.name];
				if(v!=null && v!=_datevalue_start){
					this.value=_datevalue_start;
					_input_start.fireEvent("onblur");
					return;
				}*/
 
				// 检查数据类型
				//if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
			//	if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_start,value:_datevalue_start});	
				if(_form!=null&&ins.ischange()) _form.aftervaluechange({src:_input_start,value:_input_start.value});
			}
			
			
			// 添加第二文本框对象行为
			//_input_end.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			//_btn_end.onclick=function(){return showCalendar(this.previousSibling.id, _format, null, true);}
			if(_cfg.clearbtn) _clearbtn_end.onclick=function(){_input_end.value='';_input_end.onchange()}
			_input_end.onchange=function(){
				/*_datevalue_end=this.value*/
				_input_end.fireEvent("onblur");
				return;
			};
			_input_end.onafterbind=function(){
	/*			var v=_dataset[_input_end.name];
				if(v!=null && v!=_datevalue_end){
					this.value=_datevalue_end;
					_input_end.fireEvent("onblur");
				}
				*/
				//this.value=_datevalue_end.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				
				// 检查数据类型
				var v=_dataset[this.name];
			//	if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
				//if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_end,value:_datevalue_end});	
				if(_form!=null&&ins.ischange()) _form.aftervaluechange({src:_input_end,value:_input_end.value});
			}
			this._layout();
		}
		_cmp.ischange=function(){
			if(_input_end.value!=_datevalue_end||_input_start.value!=_datevalue_start){
				return true;
			}
			return false;
		}
		
		_cmp.reset=function(){
			_input_start.reset();
			_input_end.reset();
		}
		_cmp.clear=function(){
			_input_start.settext();
			_input_end.settext();
			_form.aftervaluechange({src:_input_start,value:""});
			_form.aftervaluechange({src:_input_end,value:""});
			
		}
		
		_cmp.bind=function(ds){
			_dataset=ds;
			if(ds['min_'+_name]!=null){
				_datevalue_start=ds['min_'+_name];
			}
			else{
				_datevalue_start="";
			}
			_input_start.bind(ds);
			_input_start.fireEvent("onblur");


			if(ds['max_'+_name]!=null){
				_datevalue_end=ds['max_'+_name];
			}
			else{
				_datevalue_end="";
			}
			_input_end.bind(ds);
			_input_end.fireEvent("onblur");
		}
		
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var outEl = _input_start.parentNode;
			//alert(_input.parentNode.offsetWidth)
			 var width =outEl.offsetWidth ;
				if(_form._div_width)width = _form._div_width;
			 var _labelWidth = 0;
			 if(_cfg.label!=null){
				 _labelWidth=outEl.firstChild.offsetWidth;
			 }
			
			width-=_labelWidth;
			width-=16 // 删除‘至’的宽度
			
			if(width>30) width*=.9;
			if(width<30) width=30
			_input_start.style.width=width/2+'px';
			_input_end.style.width=width/2+'px';

			width += _labelWidth;
			 
			outEl.style.width=(_form._div_width)+'px';
			outEl.parentNode.style.width=(_form._div_width)+'px';
		}
		
		
		return extendformelement(_cmp);
	}
	
	// 多选树形文本框
	var _treeselect= function(cfg,service){
		var _cfg=cfg;
		// 选择框数据基本结构
		var _datas=null;
		var _input=null;
		var _btn_ctrl=null;
		var _btn_clear=null;
		var _selectText=null;
		var _i_template = null;
		var _ts={}; //组件本身
		var _pop=new Ext.lt.popwindow();
		var _t_qtree=null;
		var _btn=null;
		var _id = 'ts_'+Ext.lt.getNextSeqValue();
		// 外层DIV最小宽度
		var minwidth = 180;
		var _tagel = _cfg.tagel;
 
	 	_cfg.inputformart='#code-#name';
	 	_cfg.value='#itemid';
	 	
	 	var _dsbak=null;  // 数据备份
	 	var value = null; //树组件
	 	var _selNode = null; //确定有的选中值
	 	var _form=cfg.formpanel;
	 	var _isbind = false;

		function loadTreeData(){
			var t_data;
			// 数据初始化-支持对象赋值和函数调用.
			if(typeof(_cfg.dataloader)=='function'){
				var elementcodes = _cfg.dataloader.apply(this);
				t_data=elementcodes;
			}else if(typeof(_cfg.dataloader)=='object'){
				t_data = _cfg.dataloader;
			}
			return t_data;
		}
		_data = loadTreeData();
		//生成Label,使用label标签
		function _buildLabel(cfg,contextfn){
			var _html=[];
			_html.push('<div class="treeselect">');
			if(cfg.label!=null && cfg.label!=''){
				if(cfg.labelwidth==0){
					_html.push('<label class="lab">',cfg.label);
				}
				else{
					_html.push('<label class="lab" style="width:',cfg.labelwidth,';">',cfg.label);
				}
				// 判断是否为必填项
				if(cfg.isrequired) _html.push('<font color=red>*</font>');
				_html.push('</label>');
			}
			// 生成内部HTML
			_html.push(contextfn(),'</div>');
			return _html.join('');
		}
		
		_ts.paneltype="treeselect";//组件类型
		//创建基本页面基本HTML
		_ts.toString = function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" id="'+_id+'" ',_cfg.isedit==false?'readonly':'',' type="text" mutldata="1" class="inputbox"','/>'];
				if(_cfg.treetype=="tree"){
					_html.push(_cfg._morebtn);
				}else{
					_html.push(_listbtn);
				}
				if(_cfg.clearbtn){
					_html.push(_clearbtn);
				}
				return _html.join('');
			});
		}
		//数据集格式如果没有指定，则使用默认
		_ts.getField = function(){
			if(_cfg.field==null){
				_cfg.field = {id:'itemid',sid:'superitemid',isleaf:'isleaf'};
			}  
			if(typeof(_cfg.field)!="object"){
				alert("数据集格式不正确，请重新指定filed值！");
				return false;
			}
			return true;
		}
		//数据展示格式
		_ts.getOutformat = function(){
			if(_cfg.outformart==null){
				_cfg.outformart = "未指定输出格式！";
			}  
		}
		function _getSelectedValue(){
			var values=null;
			var v=_input.getBindMutlValue().val.toString();
			if(v!=null) values=v.split(',');
			return values;
		}
		//内部调用，根据创建treeselect传入参数创建不同类型的下拉树,必须指定类型.
		function _initQtree2(){ //初始化下拉QTree
			_isbind = false; //已经打开过弹出树
			if(_t_qtree==null){
				_t_qtree=new Ext.lt.Qtree({
					field:_cfg.field, //数据集格式
					outformart:_cfg.outformart,
					data:_datas,
					linkchild:true, //关联子节点属性
					values:_getSelectedValue(),
					showRootNode:_cfg.isMulti==true,
					keypress:true,
					bodydblselect:true,
					selectmode:_cfg.isMulti==false?'':'n',
					viewmodel:_cfg.treetype=='sin_select'?'list':'tree', //单层下拉还是多层下拉
					classname:'pop', //统一使用弹出树样式
					on:{nodeclick:_onTreeNodeClick,click:_onTreeClick,change:_onTreeNodeClick,dblclick:_onDbClick}
				});
				_t_qtree.draw(_pop);
			}
		}
		//文本框显示格式
		_ts.getInputFormat = function(){
			if(this._i_template==null){
				
			}
		}
		//双击选中并关闭
		function _onDbClick(){
			_onTreeNodeClick();
			_pop.close();
			Ext.lt.message.send("close", "closeTreeselect");
		}
 
		function _onTreeNodeClick(){
			_selNode=_t_qtree.getSelected();
			var values=[];
			for(var i=0,l=_selNode.length;i<l;i++){
				values.push(_selNode[i].code+"-"+_selNode[i].name);
			}
			_input.settext(values.join());
		}
		
		function _onTreeClick(){
			if(_pop.isShow()) return;
			// 调整弹窗大小
			_pop.show();
		}
		
		_ts.getTreeId = function(){
			return _id;
		}
		_ts.reset = function(){
			
		}
		_ts.check = function(){
			if(_cfg.isrequired&&(_input.value==null||_input.value=="")){
				alert(_cfg.label+'是必填项，请填写');
				_input.fireEvent('onfocus');
				_input.focus();
				return false;
			}
			return true;
		}
		_ts.clear = function(){
			_input.settext();
				if(_t_qtree!=null){
				_t_qtree.clearSelected();
				 _selNode = null; //当前选中节点 清空
			}
		    _input.fireEvent('onblur');
			_form.aftervaluechange({src:_input,value:""});
		}
		
		_ts.gettagel=function(){
			return _tagel;
		}
 
		_ts.draw = function(el){
			var ins = this;
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('请设置绘制treeselect控件的位置');
				return;
			}
			Ext.lt.HTML.expand(_tagel);
			_tagel.setInnerHTML(this.toString());
			
			// 获取Input对象，增加处理属性
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_btn_ctrl=_input.nextSibling;
			if(_cfg.clearbtn) _btn_clear=_btn_ctrl.nextSibling;
			if(_btn_clear!=null){
	 			_btn_clear.onclick=function(){
	 				_ts.clear();
				}
			}
			//QTREE数据集赋值，并校验
		 	if(!this.getField()){
		 		return false;
		 	}
		 	this.getOutformat();
		 	
			// 检查多选下拉框是否失去焦点
			function _checkBlur(en){
				var srcel=en.srcElement;
				if(!_pop.contains(srcel) && !_input.contains(srcel) ){
					_pop.close();
					document.detachEvent('onclick',_checkBlur);
				}
			}
			
			// Input点击时显示下拉框内容
			//不要触发 onfocus事件，windows窗口间切换 到IE，会得到焦点，每次都执行
			_input.attachEvent('onclick',function(){
				showPopTree();
			});
			
			function showPopTree(){
				_datas = null; //重新获取数据
 				var _pop_focus = _form._pop_focus;
				if(typeof(_pop_focus)!="undefined"&&_pop_focus!=_pop){
					_pop_focus.close();
				} 
				 var dd = (_cfg.loadthedata).apply(this);
 				 _form._pop_focus = _pop;
				var d1 = new Date();
				  _input.select(); 
			    _setbinds();
			    _pop.show(_input);
			    _pop.style.height="150px";
			    _pop.draw("<div><img src='../../../images/default/editpanel/load.gif'></img>正在加载，请稍后....</div>");
				var d2 = new Date(); 
				//t("展示Qtree耗时"+(d2 - d1));	
			}
			   //循环等待，如果数据加载完毕，则绑定数据.
		    function _setbinds() {
		        if (_datas==null) {
					var elementcodes = (_cfg.dataloader).apply(this);
					_datas = elementcodes;
		            window.setTimeout(_setbinds, 1000)
		        };
		        if (_datas) {
		        	if(!(_datas.type&&_datas.type=="recordset")){ //暂时只支持recordset格式
		        		_pop.draw("<div><img src='../../../ifmis_images/actions/error_big.jpg'></img></div>");
		        		return;
		        	}
		        	if(_datas.size()==0){
		        		_pop.draw("<div><font color='red'>无显示内容！</font></div>");
		        		return;
		        	}
			 		_initQtree2();
			 		//_pop.show(_input); 此处不能加，否则无法控制同时 只一个POPWINDOW是弹出的
					_t_qtree.setFilter(null);
		        }
		    }

			_input.onafterbind=function(){
	 				if(_t_qtree==null||_isbind){
				 		if(ins.ischange()){
						 	 _form.aftervaluechange({src:_input,value:''});
			 		}
	 					return;
	 				}
					_initQtree2();
					var sels=_t_qtree.getSelected();
				//	var sels = _selNode;
					var values=[],texts=[];
					if(sels!=null&&sels[0]!=null){
						for(var i=0,l=sels.length;i<l;i++){
							if(sels[i].value){
								texts.push(sels[i].value);
							}else{
								texts.push(sels[i].code+"-"+sels[i].name);
							}
							values.push(sels[i].itemid);
						}
					}
					_input.settext(texts.join());
				//	_input.setvalue(values.join()); 
					ins.value = values.join();
					if(ins.ischange()){
						_form.aftervaluechange({src:_input,value:values.join()});
					}
			}
			
			function showfiltertree(){
				var filter=null;
				if(_t_qtree){
					if(_input.value!=''){
						f = _input.value;
						filter=[{field:'name',values:f},{field:'code',values:f},{field:'pinyin',values:f}]
					//	_t_qtree.setFilter(filter,'left');
						_t_qtree.setFilter(filter,'contain');
						_pop.show();
					}
					else{
						_t_qtree.setFilter(null);
						_pop.show();
					}
					_pop.style.height = "350px";
				}
			}
			if(_cfg.isedit){
				// left:37 up:38 right:39 down:40 space:32 enter13
			_input.onKey({
				'40':function(){ //down:40 
					var node=_t_qtree.getActiveNode();
					if(node==null){
						node=_t_qtree.getNode(_datas.toArray()[0].itemid);
						if(node==null) return;
					}
					else{
						node=node.nextSibling;
						if(node==null) return;						
					}
					_t_qtree.selectedNode(node);
				},
				'38':function(){ //up:38
					var node=_t_qtree.getActiveNode();
					if(node==null){
						node=_t_qtree.getNode(_datas.toArray()[0].itemid);
						if(node==null) return;
					}
					else{
						node=node.previousSibling;
						if(node==null) return;						
					}
					node.body.fireEvent('onclick');
				},
				'*':showfiltertree
			});
			}
			
			_btn_ctrl.onclick=function(){
				//会触发popwindow的documentEvent事件，先手动创建事件对象，让其触发，再执行文本框按钮事件
				window.setTimeout(function(){
				_input.focus();
				var newEvt = document.createEventObject();
				newEvt._srcElement = _input;
				_input.fireEvent('onclick',newEvt);
			},100);
				//showPopTree();
			}
			this._layout();
		}
		
		// 值发生改变
		_ts.ischange=function(){
 	    	var val = _input.value;
	    	if(val==_dsbak.sval){
	    		return false;
	    	}
	    	return true;
	    }
		
		_ts.blur=function(){
			_input.fireEvent('onblur');
			
		}
		_pop.onclose=_ts.blur;
		
		
		//计算HTML元素布局及位置.控制最小宽度，根据tagel计算大小.
		_ts._layout = function(){
			var outEl = _input.parentNode;
			//alert(_input.parentNode.offsetWidth)
			 var width =outEl.parentNode.offsetWidth ;
			 var _labelWidth = 0;
			 if(cfg.label!=null){
				 _labelWidth=outEl.firstChild.offsetWidth;
			 }
			 width -=  _labelWidth;
			  width-=40;
			 if(width>80) width*=0.9;
			  if(width<80) width=80;
				 if(width> maxwidth){
					 width =  maxwidth;
				 }
			// Ext.lt.message.send("editpanel", "treeselectwidth", width+"");
			 _input.style.width=(width)+'px';
			 
			 width += _labelWidth;
			  width+=50;
			 if(width< minwidth){
				 width =  minwidth;
			 }
			 
			 
			  outEl.style.width=(width)+'px';
			  outEl.parentNode.style.width=(width)+'px';
			 _form._div_width = width;
			 // outEl.style.width=(outEl.parentNode.offsetWidth-10)+'px';
		}
		_ts.resize = function(w,h){
			_pop.close();
			if(w!=null){
				_input.parentNode.style.width=w+'px'
				_input.parentNode.parentNode.style.width=w+'px'
			} 
			if(h!=null) _input.parentNode.style.height=h+'px'
			this._layout();
		}
		_ts.checkNull = function(_config){
		}

		_ts.bind=function(ds){
			_isbind = true;
			_input.settext();
			if(_t_qtree!=null){
				_t_qtree.clearSelected();
			}
			
			_input.bindMutlval(ds); //数据项类型绑定多个值 
			
			if(ds[_cfg.name]==null) ds[_cfg.name]={val:'',sval:''};
			
			_dsbak = Ext.lt.cloneobj(ds[_cfg.name]);//每次绑定数据更新备份数据	
			
			_selNode =[]; //有默认值 需要有默认显示  itemid

			var val_arry = [];
			
			if(_dsbak.val.toString().trim()!="")val_arry=_dsbak.val.toString().split(',');
			var sval_arry = [];
			if(_dsbak.sval.toString().trim()!="")sval_arry=_dsbak.sval.toString().split(',');
			
			for(var i=0;i<val_arry.length;i++){
				var tmpobj = {
						itemid:val_arry[i],
						value:sval_arry[i]
				}
				_selNode.push(tmpobj);
			}
			_input.fireEvent('onblur');
			if(_selNode.length>0){
				var defs=[];
				for(var i=0,j=_selNode.length;i<j;i++){
					if(_selNode[i].value){
						defs.push(_selNode[i].value);
					}else{
						defs.push(_selNode[i].code+"-"+_selNode[i].name);
					}
				}
				_input.settext(defs.join(","));
			}
		};
		return extendformelement(_ts);
	}
	
	// 按公司规范实现的标准金额输入框，
	/*
	type:"amtinput"  录入框类型
	width:String 宽度设置，可以使用百分比或数字加单位的形式。如"49.9%"、"300px"
	maxlength:String 最大输入长度，默认250
	isrequired:"true"    是否必填，默认为false，设置为true后录入说明位置自动追加红色星号
	label:"金额"     label区文字
	labelwidth:			 label区宽度
	cal:             是否使用计算器工具
	calmode:         是否开启计算器模式。使用该属性是cal必须为true。当属性值为on时，录入区自动进入计算器模式
	qfw:             是否显示千分位，默认为true
	dot:             小数点后的位数，默认2位
	redwordmode:     红字模式，当录入数字为负数时改为红色
	*/
	var _amtinput=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel==null?'':_tagel.innerHTML;
		var _input=null;
		var _calbtn=null;
		var _express='';
		var _dsbak; //数据备份
		var _value;
		var _form=_cfg.formpanel;
		var minwidth = 180;

		var _cmp=new function(){
			var _ai = this;
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" class="inputbox" type="text" style="text-align:middle" maxLength=',_cfg.maxlength,'/>'];
					if(_cfg.cal) _html.push(_calbtnfn(_cfg.calmode));
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			this.bind = function(ds){
				_input.bind(ds);
				if(ds[this.name]==null) ds[this.name]='';
				_dsbak = ds[this.name]; //每次绑定数据更新备份数据
				_input.fireEvent("onblur");
			}
			this.resize = function(w,h){
				if(w!=null){
					_input.parentNode.style.width=w+'px'
					_input.parentNode.parentNode.style.width=w+'px'
				}
				if(h!=null) _tagel.style.height=h+'px'
				this._layout();
			}
			this.reset = function(){
				
			}
				this._layout=function(width2){
					     var outEl = _input.parentNode;
						 var width =outEl.parentNode.offsetWidth ;
						 var _labelWidth = 0;
						 if(cfg.label!=null){
							 _labelWidth=outEl.firstChild.offsetWidth;
						 }
						 width -=  _labelWidth;
						 width-=20;
						 width-=20;
						 if(width>80) width*=0.9;
						 if(width<80) width=80;
						 if(width>maxwidth){
							 width = maxwidth;
						 }
						 if(typeof(width2)!="undefined")width = width2;
						 if(typeof(_form._input_width)!="undefined")width = _form._input_width;
						 _input.style.width=(width)+'px';
						 width = width+_labelWidth;
							 width+=25;
							 width+=25;
						 if(width< minwidth){
							 width =  minwidth;
						 }
					 	 outEl.style.width=(width)+'px';
					 	 outEl.parentNode.style.width=(width)+'px';
						 
						 _form._div_width = width;
						 _form._div_height= outEl.parentNode.offsetHeight;
				}
			this.clear=function(){
				if(_cfg.initzero){
					_input.value="".toNumber(_cfg.dot,_cfg.qfw,1);
				}else{
					_input.settext();
				}
				_form.aftervaluechange({src:_input,value:_input.value.replace(/,/gi,'')});
			}
			this.ischange = function(){
				if(this._value==_dsbak){
					return false;
				}
				return true;
			}
			this.gettagel=function(){
				return _tagel;
			}
			this.draw=function(el){
				
				var ins = this;
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				Ext.lt.HTML.expand(_tagel);
				_tagel.setInnerHTML(this.toString());
	 
				// 获取Input对象，增加处理属性
				_input=el.getElementsByTagName('INPUT').item(0);
				if(_cfg.cal) _calbtn=_input.nextSibling;
				if(_cfg.clearbtn) _calbtn==null?_clearbtn=_input.nextSibling:_clearbtn=_calbtn.nextSibling
				
				
				// 文本框事件
				_input.attachEvent('onfocus',function(){
					_input.value=_input.value.replace(/,/g,'');
					_input.select()
				});
				// 失焦点事件，将数字格式化显示
				_input.attachEvent('onblur',function(){
					// 开启计算式模式失焦点时先处理计算机内容，在通过计算机按钮调用失去焦点事件
					if(_cfg.cal && !_calbtn.switchon) return; //
					fireBlur();
				});
				// 处理负数显示为红字的问题
				_input.attachEvent('onkeyup',function(){
					if(_cfg.redwordmode){
						if(_input.value.charAt(0)=='-'){
							_input.runtimeStyle.color='red';
						}
						else{
							_input.runtimeStyle.color='';
						}
					}
				});
				function fireBlur(){
					_input.value=_input.value.toNumber(_cfg.dot,_cfg.qfw,1);
					if(!_cfg.initzero&&_input.value==0){
						_input.settext();
					}
					ins._value = _input.value.replace(/,/gi,'');
					if(ins.ischange()){
						_form.aftervaluechange({src:_input,value:_input.value.replace(/,/gi,'')});
					}
				}
				_input.attachEvent('onkeydown',function(){
					var keycode=event.keyCode;
					// 计算器模式下可以输入任意字符
					if(_cfg.cal &&!_calbtn.switchon){
						// 计算器模式下按回车建相当于关闭计算器
						if(keycode==13) _calbtn.fireEvent('onclick');
						return true;
					}
					
					//var nstr=String.fromCharCode(keycode)
					
					//if(!isNaN(nstr)) return true; // 输入的是数字
					if(keycode<48||keycode>57) return true;
					if(keycode<41 && keycode>36) return true; // 方向键
					if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // 回车、tab键 del键 退格键
					
					// 负号 只能录入一个，并且出现在第一个位置
					// 数据负号后在录入数字前面追加一个负号
					if(keycode==189){
						if(_input.value.indexOf('-')==-1){
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value='-'+_input.value;
							r.move("character", point+1); 
							r.select();
						}
						else{
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value=_input.value.replace(/-/g,'');
							r.move("character", point-1); 
							r.select();
						}
					}
					
					// 小数点，只能录入一个小数点，如果文本中已经有小数点，则删除之前的小数点，在新的位置生成小数点
					if(keycode==190){
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input.createTextRange());
						point= r.text.length;
						_input.value=_input.value.substr(0,point).replace(/\./g,'')+'.'+_input.value.substr(point).replace(/\./g,'');
						r.move("character", point); 
						r.select(); 
					}

					_input.focus();
					return false;						
				});
				
				// 计算器按钮
				if(_calbtn!=null){
					_calbtn.attachEvent('onclick',function(){
						if(_calbtn.switchon){ //为1，则当前为普通模式，下一步打开计算模式
							_input.runtimeStyle.backgroundColor='yellow';
							_input.runtimeStyle.color='';
							if(_express==null) _express=_input.value
							_input.value=_express;
							_input.focus();
						}
						else{ //为0，则当前为计算器模式，下一步关闭计算器模式
							_input.runtimeStyle.backgroundColor='';
							_express=_input.value;
							try{
								if(_input.value.trim()!=""){
									_input.value=eval(_input.value);
								}
							}catch(ex){
								_input.value='0';
							}
							_input.fireEvent('onkeyup');
							//_input.fireEvent('onblur');
							fireBlur();
						}
					});
				}
				
				this._layout();
			};
			
		}
		
		return extendformelement(_cmp);
	}
	
	
	// 日期型文本框
	var _date=function(cfg){
		var _cfg = cfg;
		var _name=_cfg.name;
		//var _cmp={name:_name,resize:function(){},check:function(){}};
		var _input=null;
		var _btn=null;
		var clearbtn=null;
		//var _format=_cfg.format==''?'$1-$2-$3':_cfg.format;
		var _format=_cfg.format==''?'%Y-%m-%d':_cfg.format;
		var _datevalue="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _tagel=null;
		var minwidth = 180;
		var _date_input= null;
		
		_date_input =new function(){
			var _cmp = this;
			_cmp.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" id="',_cfg.name,'" class="inputbox" type="text" ',_cfg.isedit==false?'readonly':'',' maxLength=',_cfg.maxlength,'/>',_datebtn];
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			_cmp.gettagel=function(){
				return _tagel;
			}
			_cmp.draw=function(el){
				var ins = this;
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				Ext.lt.HTML.expand(_tagel);
				_tagel.setInnerHTML(this.toString());
				
				// 获取可操作对象	
				_input=el.getElementsByTagName('INPUT').item(0);
				_btn=_input.nextSibling;
				if(_cfg.clearbtn) _clearbtn=_btn.nextSibling;
				
				// 添加对象行为
				_btn.onclick=function(){return showCalendar(this.previousSibling.id, _format, null, true);}
				if(_clearbtn!=null) _clearbtn.onclick=function(){_input.value='';_input.onchange();}
				_input.onchange=function(){
	/*				_datevalue=this.value*/
					_input.fireEvent("onblur");
					
				};
				_input.onafterbind=function(){
	/*				var v=_dataset[_input.name];
					if(v!=null && v!=_datevalue){
						this.value=_datevalue;
						_input.fireEvent("onblur");
						return;
					}*/
					
					
					if(!_cmp.check2()){
						return;
					}
					
					//this.value=_datevalue.replace(/(\d{4})(\d{2})(\d{2})/, _format);
					// 检查数据类型
				//	if(typeof(v)=='string' && v.length>8) _dataset[_input.name]=parseInt(_dataset[_input.name],10);
					// 出发编辑区修改事件
					//if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input,value:_datevalue});
					if(_form!=null&&_cmp.ischange()) _form.aftervaluechange({src:_input,value:_input.value});
				}
				this._layout();
				Ext.lt.message.hook("editpanel", "treeselectwidth", _layout2);
			};
			
			_cmp.check2=function(){
				var v = _input.value;
				
				if(!checkDate(_input)){
					_input.focus();
					return false;
				}
				return true;
			}
			
			_cmp.check=function(){
				var v = _input.value;
				if(_cfg.isrequired&&(v==null||v.trim()=="")){
					alert(_cfg.label+'为必填项，必须填写!')
					_input.fireEvent("onfocus");
					_input.focus();
					return false;
				}
			}
			
			function checkDate(oTextbox){
			    oTextbox.value = oTextbox.value.trim();
				var inputVal = oTextbox.value;
				//格式：yyyymmdd
				var regDate = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])([-]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-]?)(?:29|30)|(?:0?[13578]|1[02])([-]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2([-]?)29)$/g;
				var isValidDate = regDate.test(inputVal);
				if(!isValidDate&&inputVal!=null&&inputVal!=""){
					alert("日期或格式错误，请重新填写！");
					oTextbox.value = "";
					return false;
				}else{
					if(typeof _format !="undefined" && _format=="%Y%m%d"){
						if(inputVal.indexOf("-")>-1||inputVal.indexOf("/")>-1 || inputVal.indexOf(".")>-1) {
							inputVal = 	inputVal.replace(/-/g,"").replace(/\//g,"").replace(/\./g,"");
						}
					}
					oTextbox.value = inputVal;
					return true;
				}
			}
			
			_cmp.ischange=function(){
				if(_datevalue!=_input.value){
					return true;
				}
				return false;
			}
			_cmp.reset=function(){
				_input.reset();
			};
			_cmp.clear=function(){
				_input.settext();
				_form.aftervaluechange({src:_input,value:""});
			}
			_cmp.bind=function(ds){
				_dataset=ds;
				if(ds[_input.name]!=null){
					var v=ds[_input.name];
					_datevalue=Ext.lt.dateutil.YYYYMMDD(v);
					//_datevalue="";
				}
				else{
					_datevalue="";
				}
				_input.bind(ds);
				_input.fireEvent("onblur");
			};
			_cmp.resize = function(w,h){
				if(w!=null){
					_input.parentNode.style.width=w+'px'
					_input.parentNode.parentNode.style.width=w+'px'
				}
				if(h!=null) _tagel.style.height=h+'px'
				this._layout();
			}
			function _layout2(width){
				_form._input_width = width;
				_cmp._layout(width);
			}
			_cmp._layout=function(width2){
					var outEl = _input.parentNode;
					//alert(_input.parentNode.offsetWidth)
					 var width =outEl.parentNode.offsetWidth ;
					 var _labelWidth = 0;
					 if(cfg.label!=null){
						 _labelWidth=outEl.firstChild.offsetWidth;
					 }
					 width -=  _labelWidth;
					 width-=40
					 if(width>80) width*=0.9;
					 if(width<80) width=80;
					 if(width>maxwidth){
						 width = maxwidth;
					 }
					 if(typeof(width2)!="undefined")width = width2;
					 if(typeof(_form._input_width)!="undefined")width = _form._input_width;
					 _input.style.width=(width)+'px';
					 
					 width = width+_labelWidth;
					 width+=50;
					 if(width< minwidth){
						 width =  minwidth;
					 }
				 	outEl.style.width=(width)+'px';
			 	 	outEl.parentNode.style.width=(width)+'px';
				 
			 	 	_form._div_width = width;
				}
			
		};
		return extendformelement(_date_input);
	}
	
	// 按公司界面规范实现Label属性
	var _label=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		//var _inner=_tagel.innerHTML;
		
		var _cmp=new function(){
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					return "";
				});
			};
			this.reset=function(){
			};
			this.check=function(){
			};
			this.bind=function(){
			};
			this.gettagel=function(){
				return _tagel;
			}
			this.draw=function(el){
				if(el!=null) _tagel=el;
				_tagel.innerHTML=this.toString();
			};
			this.resize=function(){
				
			}
			
		}
		return extendformelement(_cmp);
	}
	
	/**
	 * 初始化一个表单区域
	 */
	var  initFormPanel=function(element,ds){
		// 返回的FormPanel对象
		var times=[];
		var start=new Date();
		var _form=element;
		    _form.elements=[];
		    _form.values={};
		    _form._pop_focus;//缓存当前操作控件popwindow;
		    _form._input_width;
		    _form._div_width;//组件DIV标准宽度 width. 每个组件外层DIV宽度只能是width的整数倍.
		    _form._div_height;//组件DIV标准宽度 height. 每个组件外层DIV高度只能是height的整数倍.
		    _form.columns;
		var _ds=ds==null?{}:ds;
		var _dsbak=null;  // 数据备份
		var _action=element.action; //action属性
		var _btn_submit=[];
		

		// 支持的事件名
		var _events=['submit','aftersubmit','reset'];
		var _method=['reset','check','bind'];


		function initformattr(attr,dv){
			return;
			var v=_form.getAttribute(attr)
			if(v==null){
				 _form[attr]=dv
			}
			else{
				if(typeof(dv)=='number'){
					v=parseInt(v,10);
					_form[attr]=isNaN(v)?dv:v;
				}
				else if(typeof(dv)=='string'){
					_form[attr]=v==null?dv:v;
				}

			}
		}

		// 添加editpanel样式
		_form.className+=" editpanel";
		// 设置列数和列宽最小120px
		initformattr('columnsize',3);
		initformattr('mincolumnwidth',200);		
		
		times.push(new Date()-start)
		//Ext.lt.HTML.expand(element);
		var els=_form.configs,el,type,cfg,obj;
		//测试期间先 试一个.
		for(var i=0,j=els.length;i<j;i++){
			el=els[i];
			el.className+=' box';
			cfg=_elconfig(el); //组装.
			cfg.bind=_ds;
			cfg.formpanel=_form;
			if(cfg.width!=null) Ext.lt.HTML.setStyle(el,"width:"+cfg.width+";min-width:"+((cfg.width>250)?"250":cfg.width)+";");
			// 创建对象
			switch (cfg.type){
				case 'input':
					obj=new _input(cfg);
					break;
				case 'ti':
					obj=new _inputi(cfg);
					break;
				case '_amtinputi':
					obj=new _amtinputi(cfg);
					break;
				case 'treeselecti':
					obj=new _treeselecti(cfg);
					break;
				case 'amtinput':
				 	obj=_amtinput(cfg);
					break;
				case 'label':
					obj=_label(cfg);
					break;
				case 'select':
					obj=new _select(cfg);
					break;
				case 'treeselect':
				  	obj=new _treeselect(cfg);
					break;
				case 'numberinput':
					obj=new _numberinput(cfg);
					break;
				case 'button':
					obj=_button(cfg);
					if(cfg.type=='submit') _btn_submit.push(obj)
					_events.push(cfg.name+'click')
					break;
				case 'date':
					obj=new _date(cfg);
					break;
				case 'di':
					obj=new _datei(cfg);
					break;
				case 'textarea':	
					obj=new _textarea(cfg);
					break;
				case 'intree':
					obj=new _querytree(cfg);
					break;
				default: 
					obj=_input(cfg);
					break;
			}
			
			
			// 检查对象行为方法
			var noMethod=[]
			for(var n=0,m=_method.length;n<m;n++){
				if(obj[_method[n]]==null) noMethod.push(_method[n])
			}
			if(noMethod.length>1)alert('编辑区组件'+cfg.type+'没有实现'+noMethod.join('、')+'方法');
			
			//obj.draw(el);	不在这里画
			
			_form.elements.push(cfg.name);
			_form.elements[cfg.name]=obj;
			times.push(new Date()-start)
		}
		
		// 添加编辑区的方法和事件
		
		// 获取编辑区数据
		_form.getData=function(){return _ds};
		
		_form.on=function(events){
			for(var i=0;i<_events.length;i++){
				if(events[_events[i]]!=null){
					// 添加事件
					_events['on'+_events[i]]=Ext.lt.util.fnbind(events[_events[i]],_form);
				}
			}
		};
		
/*		_form.clear=function(){
			var ele = _form.elements;
			for(var i in ele){
				if(typeof(ele[i])=="object"&&Ext.lt.isFunction(ele[i].clear)){
					ele[i].clear.apply(this);
				}
			}
		}*/
		
		// 出发事件执行
		_form.fireEvent=function(en,param){
			if(_events[en]!=null){
				_events[en](_ds,param);
			}
		}
		// 重置编辑区的值
		_form.reset=function(){
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].reset!=null)	eles[eles[i]].reset();
			}
		}
		// 检查表单中各个要素的内容是否符合录入规则
		_form.check=function(){
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].check!=null)	if(eles[eles[i]].check()==false) return false;
			}
			return true;
		}
		
		//各组件值改变，调用该方法记录
		_form.aftervaluechange = function(obj){
			if(obj!=null){
				this.values[obj.src.name]=obj.value;
				if(obj.value==""){
					delete this.values[obj.src.name];
				}
			}
		}
		
		// 提交编辑区
		_form.k=function(fn){
			if(!_form.check()) return false;
			if(_action==null){
				alert('没有指定提交的地址');
				return false;
			}
			_form.fireEvent('onsubmit',_form);
			_form.holdSubmitButton();
			$.ajax({
				type: "POST",
				url: _action,
				data:_ds,
				success : function(retobj){
					var _data=retobj;
					try{
						eval('var _data='+retobj);
					}
					catch(ex){}
				  _form.fireEvent('onaftersubmit',_data);
				  _form.releaseSubmitButton()
				  if(fn!=null) fn(_data);
				},
				error : function(resp, textStatus, errorThrown) {
					alert(_action+"提交数据失败"+resp.responseText.replace('\\','\\\\'));
				  _form.releaseSubmitButton()
				}
			})
			return true;
		}
		
		// 锁定所有submit型的按钮
		_form.holdSubmitButton=function(){
			for(var i=0;i<_btn_submit.length;i++) _btn_submit[i].hold();	
		}
		// 释放所有submit型按钮的锁定状态
		_form.releaseSubmitButton=function(){
			for(var i=0;i<_btn_submit.length;i++) _btn_submit[i].release();
		}
		
		
		// 让编辑区重新绑定对象
		_form.bind=function(obj,usedef){
			if(obj==null) obj={}
			
			var eles=_form.elements;
			var _obj = {};
			for(var j=0;j<eles.length;j++){  //过滤传入数据
				_obj[eles[j]] = obj[eles[j]];
			}
			_ds=_obj;
			if(!this._dsbak){
				this._dsbak=Ext.lt.cloneobj(_ds);
			}else{
				if(usedef){ //传入数据值集没有的元素，使用默认值，更新备份数据
					for(var j in _ds){
						this._dsbak[j] = _ds[j];
					}
				}else{
					this._dsbak = _ds ;
				}
			}
			_ds = Ext.lt.cloneobj(this._dsbak);
			
			if(usedef){
				//1.更新editpanel 所有组件的当前值
				var tval = getValue(this._dsbak);
				for (var i in tval){
					this.values[i]=tval[i];
				}
			}else{
				this.values = getValue(this._dsbak);
			}
			
			//2.更新具体每个组件对象的值
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].bind!=null) eles[eles[i]].bind(_ds);
			}
		}
		
		//获取值集对象的真实值
		function getValue(obj){
			var _objbak=Ext.lt.cloneobj(obj);
			for(var i in _objbak){
				if(typeof(_objbak[i])=="object"){
					_objbak[i]=_objbak[i].val;
				}
			}
			return _objbak;
		}
		
		_form.isChange=function(){
			// 检查所有属性是否被修改过
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(_ds[eles[i]]!=_dsbak[eles[i]]) return true;
			}
			return false;
		}
		//更新查询区组件
		_form.update=function(obj){
			
		}

		_form._layout=function(){
			var columnwidth;
			if(this.columnsize>0){
				// 最小宽度
				var formminwidth=this.mincolumnwidth*this.columnsize;
				var formwidth=this.offsetWidth;
				if(formwidth<formminwidth){
					this.style.width=formminwidth+'px';
					formwidth=formminwidth;
				}
				
				columnwidth=formwidth/this.columnsize;
			}
			var boxs=this.elements;
			for(var i=0,l=boxs.length;i<l;i++){
				boxs[boxs[i]].resize(columnwidth);
			}
		}
		
		//Ext.lt.message.hook("layout","endlayout",Ext.lt.util.fnbind(_form._layout,_form));
		//_form._layout();
		//_form.bind();
		return _form;
	}
	
    _edit.form = initFormPanel(config);
	
    
    //临时放  这里 判断是否是空对象
    var isempty = function(obj){
    	for(var i in obj){
    		return false;
    	}
    	return true;
    }
	
	return _edit;
}
