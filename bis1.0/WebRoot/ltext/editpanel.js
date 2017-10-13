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
	fireEvent(eventname,param)		出发指定的事件，参数为事件名和传递的参数。
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
	isnull：是否可空，可选值true。当设置为true时在label后面追加红色星号，在check方法中验证用户必须录入信息或选择信息
	
	

公有方法：
	reset()	重置方法，将编辑元素内容与绑定值对象的属性值恢复到初始状态。注：这里是恢复到初始状态，不是清空属性
	check()	检查编辑元素内录入的值是否符合系统要求，符合返回true，不符合返回false。该方法为编辑元素强制要求实现的方法。验证逻辑有各个编辑元素自己实现。
	bind(object)	绑定数据对象属性与编辑元素name属性相同的属性值，如果参数为空，则自动创建一个新对象



	
 */
Ext.lt.editpanel=new function(){
	var _labelstart=this._labelstart='<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr>';
	var _labelend=this._labelend='</tr></table>';
	var _clearbtn=this._clearbtn='<button class="btn_clear" overclass="btn_clear_over" clickclass="btn_clear_click"></button>';
	var _morebtn=this._morebtn='<button class="btn_pop" overclass="btn_pop_over" clickclass="btn_pop_click"></button>';
	var _listbtn=this._listbtn='<button class="btn_list" overclass="btn_list_over" clickclass="btn_list_click"></button>';
	var _datebtn=this._datebtn='<button class="btn_date" overclass="btn_date_over" clickclass="btn_date_click"></button>';
	var _calbtnfn=this._calbtnfn=function(s){
		return '<button class="cal" switchgroup="_buildfrom" switchclass="calon" '+(s?'switch="on"':'')+'></button>';
	}
	
	var _elconfig=this._elconfig=function(el){
		return {
			type:el.getAttribute("type")==null?'input':el.getAttribute("type"),
			label:el.getAttribute("label")==null?'':el.getAttribute("label"),
			isnull:el.getAttribute("isnull")!='false',
			labelwidth:el.getAttribute("labelwidth")==null?'0':el.getAttribute("labelwidth"),
			format:el.getAttribute("format")==null?'':el.getAttribute("format"),
			width:el.getAttribute("width"),
			clearbtn:el.getAttribute("clearbtn")==null?false:el.getAttribute("clearbtn")=='true',
			morebtn:el.getAttribute("morebtn")==null?false:el.getAttribute("morebtn")=='true',
			name:el.getAttribute("name")==null?'':el.getAttribute("name"),
			maxlength:el.getAttribute("maxlength")==null?'250':el.getAttribute("maxlength"),
			cal:el.getAttribute("cal")==null?false:el.getAttribute("cal")=='true',
			calmode:el.getAttribute("calmode")==null?false:el.getAttribute("calmode")=='on',
			redwordmode:el.getAttribute("redwordmode")==null?false:el.getAttribute("redwordmode")=='on',
			dot:el.getAttribute("dot")==null?2:parseInt(el.getAttribute("dot"),10),
			qfw:el.getAttribute("qfw")==null?true:el.getAttribute("qfw")=='true',
			action:el.getAttribute("action")==null?'':el.getAttribute("action"),
			dataloader:el.getAttribute("dataloader")==null?'':el.getAttribute("dataloader"),
			selectmode:el.getAttribute("selectmode")==null?'':el.getAttribute("selectmode"),
			tagel:el
		}
	}
	
	/**
	 * 初始化一个表单区域
	 * 采用HTML元素初始化表单时建议采用UL LI标签。其中UL标签代表整个表单区域，LI代表其中的每一个编辑选项，通过UL、LI标签的属性设置表单外观和行为
	 */
	this.initFormPanel=function(element,ds){
		// 返回的FormPanel对象
		var times=[]
		var start=new Date();
		var _form=element;
		    _form.elements=[];
		var _ds=ds==null?{}:ds;
		var _dsbak=null;  // 数据备份
		var _action=element.action;
		var _btn_submit=[];

		// 支持的时间名
		var _events=['submit','aftersubmit','reset','valuechange','aftervaluechange'];
		var _method=['reset','check','bind'];


		function initformattr(attr,dv){
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
				else if(typeof(dv)=='boolean'){
					v=v=='true'?true:v=='false'?false:true;
					_form[attr]=v==null?dv:v;
				}

			}
		}
		    
		// 添加editpanel样式
		_form.className+=" editpanel";
		// 设置列数和列宽最小120px
		initformattr('columnsize',3);
		initformattr('mincolumnwidth',200);		
		initformattr('autolayout',true);		
		
		times.push(new Date()-start)
		Ext.lt.HTML.expand(element);
		
		var els=_form.children,el,type,cfg,obj;
		for(var i=0,j=els.length;i<j;i++){
			el=els.item(i);
			el.className+=' box';
			cfg=_elconfig(el);
			cfg.bind=_ds;
			cfg.formpanel=_form;
			if(cfg.width!=null) Ext.lt.HTML.setStyle(el,"width:"+cfg.width+";min-width:"+((cfg.width>250)?"250":cfg.width)+";");
			// 创建对象
			switch (cfg.type){
				case 'input':
					obj=new _input(cfg);
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
				case 'dateregion':
					obj=new _dateregion(cfg);
					break;
				case 'textarea':	
					obj=new _textarea(cfg);
					break;	
				default: 
					obj=_label(cfg);
					break;
			}
			
			// 检查对象行为方法
			var noMethod=[]
			for(var n=0,m=_method.length;n<m;n++){
				if(obj[_method[n]]==null) noMethod.push(_method[n])
			}
			if(noMethod.length>1)alert('编辑区组件'+cfg.type+'没有实现'+noMethod.join('、')+'方法');
			
			obj.draw(el);
			
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
		
		// 提交编辑区
		_form.submit=function(fn){
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
		_form.bind=function(obj){
			if(obj==null) obj={}
			_ds=obj;
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].bind!=null) eles[eles[i]].bind(obj);
			}
			_dsbak=Ext.lt.clone(_ds);
		}
		
		_form.isChange=function(){
			// 检查所有属性是否被修改过
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(_ds[eles[i]]!=_dsbak[eles[i]]) return true;
			}
			return false;
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
		
		
		if(_form.autolayout) Ext.lt.message.hook("layout","endlayout",Ext.lt.util.fnbind(_form._layout,_form));
		_form._layout();
		_form.bind();
		return _form;
	}
	
	// 生成Label区域
	var _buildLabel=this._buildLabel=function(cfg,contextfn){
		var _html=[]
		if(cfg.label!=null && cfg.label!=''){
			// _html.push(_labelstart);
			if(cfg.labelwidth==0){
				_html.push('<q class="lab">',cfg.label);
			}
			else{
				_html.push('<q style="width:',cfg.labelwidth,';" class="lab">',cfg.label);
			}
			// 判断是否为必填项
			if(!cfg.isnull) _html.push('&nbsp;<font color=red>*</font>');
			_html.push('</q><q>');
		}

		// 生成内部HTML
		_html.push(contextfn(),'</q>');

		// 生成其余Table部分
		//if(cfg.label!=null &&cfg.label!='') _html.push('</div>',_labelend);
		return _html.join('');
	}
	
	// 按公司规范实现的标准输入框
	/*
	type:"input"  录入框类型
	width:String 宽度设置，可以使用百分比或数字加单位的形式。如"49.9%"、"300px"
	maxlength:String 最大输入长度，默认250
	isnull:"true"    是否必填，默认为false，设置为true后录入说明位置自动追加红色星号
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
		var _morebtn=null;
		var _clearbtn=null;
		var _id=_cfg.id;
		var _defaulttext=_cfg.defaulttext==null?'':''+_cfg.defaulttext;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name=_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isnull=cfg.isnull;
		var _pl_input;
		var _form=cfg.formpanel;
		
		// 如果传入的是对象名时，则从全局变量中查找该对象
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
		_pl_input=new function(){
			
			// 设置对象返回值
			this.getValue=function(){return _input.value};
			
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input id="',_cfg.id,'" name="',_name,'" class="inputbox" type="text" maxLength=',_cfg.maxlength,'/>'];
					if(_cfg.morebtn) _html.push(Ext.lt.editpanel._morebtn);
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				_tagel.setInnerHTML(this.toString());
				
				
				// 获取Input对象，增加处理属性
				_input=_tagel.getElementsByTagName('INPUT').item(0);
				if(_cfg.morebtn) _morebtn=_input.nextSibling;
				if(_cfg.clearbtn) _morebtn==null?_clearbtn=_input.nextSibling:_clearbtn=_morebtn.nextSibling

				// 处理捆绑数据集中的值
				if(_ds==null){
					_input.value=_tipstext;
					Ext.lt.HTML.setRuntimeStyle(_input,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_input.value=_ds[_name];
				}
				
				// 清空按钮的点击事件
				if(_clearbtn!=null){
						_clearbtn.onclick=function(){
						_input.value='';
						Ext.lt.fireEvent(_input,'onblur');
					}
				}

				Ext.lt.bindEvent(_input,'onfocus',function(){
					_input.select()
					_input.runtimeStyle.color='';
				});
				
				// 失焦点事件，处理数据校验，同步数据集数据等操作
				Ext.lt.bindEvent(_input,'onblur',Ext.lt.util.fnbind(function(){
					var v=this.value;
					
					// 校验非空提示，更换样式单会造成input框宽度变形，因此暂时改为代码设置出错样式
					if(!_isnull && v==''){
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
				},_input));
				
				_input.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}

					// 出发编辑区修改事件
					if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input,value:v});	
				}
				
			};
			
			// 设置名称属性
			this.name=_name;
			
			// 将对象内容重置为初始值
			this.reset=function(){
				_input.reset();
			}
			// 校验文本框内容是否符合设置
			this.check=function(){
				if(!_isnull && (_input.value==null || _input.value=='')){
					alert(_cfg.label+'是必填项，请填写');
					_input.fireEvent('onfocus');
					_input.focus();
					return false;
				}
			}
			// 绑定数据集
			this.bind=function(ds){
				_input.bind(ds);
				Ext.lt.fireEvent(_input,'onblur');
			}
			this.resize=function(w,h){
				if(w!=null) _tagel.style.width=w+'px'
				if(h!=null) _tagel.style.height=h+'px'
				this._layout();
			}
			this._layout=function(){
				var width=_tagel.offsetWidth;
				if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
				if(_morebtn!=null ) width-=20
				if(_clearbtn!=null ) width-=20
				if(width>80) width*=.9;
				if(width<80) width=80
				_input.style.width=width+'px';
			}
		}
		
		return _pl_input
	}
	this.input=_input;
	
	// 按公司规范实现的标准输入框
	/*
	type:"input"  录入框类型
	width:String 宽度设置，可以使用百分比或数字加单位的形式。如"49.9%"、"300px"
	maxlength:String 最大输入长度，默认250
	isnull:"true"    是否必填，默认为false，设置为true后录入说明位置自动追加红色星号
	label:"输入文本"     label区文字
	labelwidth:			 label区宽度
	tipstext:     缺省提示性文字，当设置该属性后，在文本框生成时和文本框内容为空的状态下失去焦点时，文本框内容将显示为defaulttext内所设置的内容
	bind:		绑定数据集对象名或对象本身，输入框自动修改绑定数据集中属性域name相同的内容
	*/
	var _textarea=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel==null?'':_tagel.innerHTML;
		var _textarea=null;
		var _morebtn=null;
		var _clearbtn=null;
		var _id=_cfg.id;
		var _defaulttext=_cfg.defaulttext==null?'':''+_cfg.defaulttext;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name=_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isnull=cfg.isnull;
		var _pl_textarea;
		var _form=cfg.formpanel;
		
		// 如果传入的是对象名时，则从全局变量中查找该对象
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
		_pl_textarea=new function(){
			
			// 设置对象返回值
			this.getValue=function(){return _textarea.value};
			
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					if(_cfg.height==null||_cfg.height<20)_cfg.height=40;
					var _html=['<textarea id="',_cfg.id,'" name="',_name,'" class="inputbox" style="height:',_cfg.height,'px" ROWS =2 maxLength=',_cfg.maxlength,'></textarea>'];
					if(_cfg.morebtn) _html.push(Ext.lt.editpanel._morebtn);
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				_tagel.setInnerHTML(this.toString());
				
				
				// 获取Input对象，增加处理属性
				_textarea=_tagel.getElementsByTagName('TEXTAREA').item(0);
				if(_cfg.morebtn) _morebtn=_textarea.nextSibling;
				if(_cfg.clearbtn) _morebtn==null?_clearbtn=_textarea.nextSibling:_clearbtn=_morebtn.nextSibling

				// 处理捆绑数据集中的值
				if(_ds==null){
					_textarea.value=_tipstext;
					Ext.lt.HTML.setRuntimeStyle(_textarea,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_textarea.value=_ds[_name];
				}
				
				// 清空按钮的点击事件
				if(_clearbtn!=null){
						_clearbtn.onclick=function(){
						_textarea.value='';
						_textarea.fireEvent('onblur');
					}
				}

				_textarea.attachEvent('onfocus',function(){
					_textarea.select()
					_textarea.runtimeStyle.color='';
				});
				
				// 失焦点事件，处理数据校验，同步数据集数据等操作
				_textarea.attachEvent('onblur',Ext.lt.util.fnbind(function(){
				},_textarea));
				
				_textarea.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}

					// 出发编辑区修改事件
					if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_textarea,value:v});	
				}
				_pl_textarea.resize=function(w,h){
					if(w!=null) el.style.width=w+'px'
					if(h!=null) el.style.height=h+'px'
					this._layout();
				}
				_pl_textarea._layout=function(){
					var width=el.offsetWidth;
					if(el.children.length>1) width-=el.firstChild.offsetWidth
					if(_clearbtn!=null ) width-=20
					if(width>80){
						width*=.9;
						if(width<80) width=80
					}
					_textarea.style.width=width+'px';
				}
			};
			
			// 设置名称属性
			this.name=_name;
			
			// 将对象内容重置为初始值
			this.reset=function(){
				_textarea.reset();
			}
			// 校验文本框内容是否符合设置
			this.check=function(){
				if(!_isnull && (_textarea.value==null || _textarea.value=='')){
					alert(_cfg.label+'是必填项，请填写');
					_textarea.fireEvent('onfocus');
					_textarea.focus();
					return false;
				}else if(_textarea.maxLength!=null&&_textarea.value!=null&&_textarea.value.length>_textarea.maxLength){
					alert(_cfg.label+'长度超过'+_textarea.maxLength+'，请填写');
					_textarea.fireEvent('onfocus');
					_textarea.focus();
					return false;
				}
			}
			// 绑定数据集
			this.bind=function(ds){
				_textarea.bind(ds);
			}
		
		}
		
		return _pl_textarea
	}
	this.textarea=_textarea;
	
	
	// 按公司规范实现的标准金额输入框，
	/*
	type:"amtinput"  录入框类型
	width:String 宽度设置，可以使用百分比或数字加单位的形式。如"49.9%"、"300px"
	maxlength:String 最大输入长度，默认250
	isnull:"true"    是否必填，默认为false，设置为true后录入说明位置自动追加红色星号
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
		var _inner=_tagel.innerHTML;
		var _input=null;
		var _calbtn=null;
		var _express='';

		return new function(){
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" class="inputbox" type="text" style="text-align:right" maxLength=',_cfg.maxlength,'/>'];
					if(_cfg.cal) _html.push(_calbtnfn(_cfg.calmode));
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el==null) el=_tagel;
				if(el==null) {
					errlog('没有指定Input框生成的目标对象');
					return;
				}
				el.innerHTML=this.toString();
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
					// 开启计算式模式失焦点时先处理计算机内容，在通过计算机按钮调用是焦点事件
					if(_cfg.cal && _calbtn.switchon) return;
					_input.value=_input.value.toNumber(_cfg.dot,_cfg.qfw,1);
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
				_input.attachEvent('onkeydown',function(){
					var keycode=event.keyCode;

					// 计算器模式下可以输入任意字符
					if(_cfg.cal &&_calbtn.switchon){
						// 计算器模式下按回车建相当于关闭计算器
						if(keycode==13) _calbtn.fireEvent('onclick');
						return true;
					}
					
					var nstr=String.fromCharCode(keycode)
					
					if(!isNaN(nstr)) return true; // 输入的是数字
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
						if(_calbtn.switchon){
							_input.runtimeStyle.backgroundColor='yellow';
							_input.runtimeStyle.color='';
							if(_express==null) _express=_input.value
							_input.value=_express;
						}
						else{
							_input.runtimeStyle.backgroundColor='';
							_express=_input.value;
							try{_input.value=eval(_input.value)}catch(ex){_input.value='0'} ;
							_input.fireEvent('onkeyup');
							_input.fireEvent('onblur');
						}
					});
				}
			};
			
		}
	}
	this.amtinput=_amtinput;
	
	
	/**
	  type:"numberinput"  数字型录入框
	  name:String      对象名称
	  width:String     宽度设置
	  isnull:boolean   是否必填
	  label:""         label区文字
	  labelwidth:			 label区宽度
	  dot:int      小数位个数会进行四舍五入计算  -1时不控制小数位，并不进行四舍五入计算
	  maxlength:       最大录入长度
	  clearbtn:boolean 显示清除按钮
	  qfw:boolean      是否显示千分位
	  redwordmode:boolean 红字模式，当用户输入负数时显示为红色
	*/
	var _numberinput=Ext.lt.createComponent(function(config){
		// 处理配置属性的默认值
		
		var _cfg=Ext.lt.apply({width:"",isnull:false,label:"",dot:-1,redwordmode:false,clearbtn:false,qfw:true,maxlength:50,id:'input'+Ext.lt.getNextSeqValue()},config);
		var _name=_cfg.name;
		var numberinput={}
		// 生成录入框的HTMLDIV对象
		var el;
		// 录入框对象
		var _input;
		// 清除按钮对象
		var _clearbtn;
		// 录入框绑定的数据集对象
		var _ds={};
		var _isnull=_cfg.isnull;
		
		numberinput.name=_cfg.name
		numberinput.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input id="',_name,'" name="',_name,'" class="inputbox" style="text-align:right" type="text" maxLength=',_cfg.maxlength,'/>'];
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		numberinput.resize=function(w,h){
			if(w!=null) el.style.width=w+'px'
			if(h!=null) el.style.height=h+'px'
			this._layout();
		}
		numberinput._layout=function(){
			var width=el.offsetWidth;
			if(el.children.length>1) width-=el.firstChild.offsetWidth
			if(_clearbtn!=null ) width-=20
			if(width>80){
				width*=.9;
				if(width<80) width=80
			}
			_input.style.width=width+'px';
		}
		numberinput.draw=function(_tagel){
				el=_tagel;
				Ext.lt.HTML.setInnerHTML(el,this.toString());
			//	Ext.lt.HTML.expand(el);
				
				// 获取Input对象，增加处理属性
				_input=el.getElementsByTagName('INPUT').item(0);
				if(_cfg.clearbtn) _clearbtn=_input.nextSibling
				
				// 文本框事件
				_input.attachEvent('onfocus',function(){
					_input.value=_input.value.replace(/,/g,'');
					_input.select()
				});
				
				// 失焦点事件，将数字格式化显示
				_input.onafterbind=function(){
					_input.setvalue(_input.value.toNumber(_cfg.dot,false,1));
					_input.value=_input.value.toNumber(_cfg.dot,_cfg.qfw,1);
				};
				
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
				/*
				_input.attachEvent('onkeydown',function(){
					var keycode=event.keyCode;
					
					var nstr=String.fromCharCode(keycode)
					//这里出差了
					if(!isNaN(nstr)) return true; // 输入的是数字
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
				});*/
			};
			numberinput.bind=function(ds){
				_input.bind(ds);
				_input.fireEvent('onblur')
			}
		numberinput.reset=function(){
			_input.reset();
		}
		numberinput.check=function(){
			if(!_isnull && (_input.value==null || _input.value=='')){
				alert(_cfg.label+'是必填项，请填写');
				_input.fireEvent('onfocus');
				_input.focus();
				return false;
			}
		}
		return numberinput;
	});
	this.numberinput=_numberinput;
	
	// 多选文本框
	var _select=Ext.lt.createComponent(function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _isnull=cfg.isnull;
		// 选择框数据基本结构
		// [{{t:显示文本,v:选中值,s:是否选中,p:显示文本的拼音，每个字的首字母必须为大写，其余小写}}]
		var v=[],_datas=null;
		
		var _input=null;
		var _pop=new Ext.lt.popwindow();
		
		var _selectValue=cfg.value;
		var _selectText=cfg.text;
		var _selectstyle=cfg.selectstyle==null?'nomorl':'tree';
		var _datas=null;
		var _morebtn=null;
		var _clearbtn=null;
		var select={};

		_pop.checkEvent=function(srcobj){
				return _tagel.contains(srcobj)
		}
		_pop.onclick=function(){
			var srcobj = window.event.srcElement;
			if(srcobj.tagName=='LI'){
				var v=srcobj.innerText;
				var vl=_datas.query({'t':v});
				if(vl.length>0)
					_input.value=_datas.query({'t':v})[0].v;
				else
					_input.value='';
				_input.fireEvent('onblur');
				_input.blur();
			}
			_pop.close();
		};
		_pop.selectfirst=function(){
			var opt=this.firstChild.firstChild;
			if(opt==null) return ;
			var v=opt.getAttribute('value');
			_input.value=v;
			_input.blur();
			_pop.close();
		}
		_pop.onclose=function(){_pop.filter()};
		// 支持拼音录入
		_pop.filter=function(v){
			// 拼音,及显示内容匹配，过滤值为空则恢复默认下拉框内容
			if(v==null){
				_pop.setInnerHTML(_pop._htmlcontext);
			}
			else{
				var upperv=v.toUpperCase()
				var rs=_datas.select(function(d){
					var vl=v.length,py=d.p,text=d.t;
					if(py==null) return vl>text.length&&text.substr(0,vl)==v;
	
					if(vl>py.length && vl>text.length) return false				
					return ((vl<=py.length)&&(py.substr(0,vl)==upperv)) || ((vl<=text.length)&&(text.substr(0,vl)==v))
				});
				_pop.setInnerHTML(_buildSelect(rs));
				
			}
			
			return ;
		}
		// 使过滤出来的数据生效
		_pop.dofilter=function(){
			if(_input.value!=''){
				var opts=_pop.getElementsByTagName('LI');
				if(opts.length==0){
					// 没有选中项
					_input.value='';	
				}
				else{
					//_input.value=opts.item(0).getAttribute("value");
					var v=opts.item(0).innerText;
					var vl=_datas.query({'t':v});
					if(vl.length>0)
						_input.value=_datas.query({'t':v})[0].v;
					else
						_input.value='';
				}
			}
			_pop.close();
		}

		// 获取下拉框数据，flag参数控制是否回调 onafterbind 方法
		function dataloader(flag){
			if(_cfg.dataloader=='') return;
			eval("var elementcodes="+_cfg.dataloader)
			if(elementcodes==null) return;
			_datas=elementcodes;
			var pophtml=_buildSelect(_datas);
			_pop.setInnerHTML(pophtml);
			_pop._htmlcontext=pophtml;
			if(flag!=false) _input.onafterbind();
		}
		
		// 改为点击时加载
		if(typeof(_cfg.dataloader)=='string'){
			// setTimeout(dataloader,0)
		}

		var _buildSelect=function(ds){
			var _popHTML=['<ul>'];
			ds.each(function(rs){
				_popHTML.push('<li class="opt" value="',rs['v'],'" overclass="opt optover" p="',rs['p'],'">',rs['t'],'</li>');
			});
			_popHTML.push('</ul>');
			return _popHTML.join('');
		}
		

		
		// 从Select标签中读取数据
		var _readSelectData=function(seltag){
			var opts=seltag.options,opt,v=[];
			for(var i=0,l=opts.length;i<l;i++){
				opt=opts.item(i);
				if(opt.selected){
					_selectValue=opt.value;
					_selectText=opt.text;
				}
				v.push([opt.text,opt.value,opt.selected,opt.getAttribute("py")]);	
			}
			return new Ext.lt.recordset({columns:['t','v','s','p'],datas:v});
		}


		select.name=_cfg.name
		select.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" type="text" class="inputbox"',(_cfg.maxlength==null?'':' maxLength='+_cfg.maxlength),(_selectText==null?'':' value="'+_selectText+'"'),'/>'];
				_html.push(Ext.lt.editpanel._listbtn);
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		
		
		function _showMore(){
			if(_pop.isShow()){
				_pop.close()
			}	
			else{
				dataloader(false);
				_pop.show(_input)
			};
		}
			
		select.draw=function(el){
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('没有指定Input框生成的目标对象');
				return;
			}

			// 如果目标对象每部存在select对象，则读取内部数据作为初始化数据
			if(_tagel.getElementsByTagName('SELECT').length>0){
				_datas=_readSelectData(_tagel.getElementsByTagName('SELECT').item(0));
				_pop.innerHTML=_buildSelect(_datas);
			}
			
			_tagel.setInnerHTML(this.toString());
			
			
			// 获取Input对象，增加处理属性
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_morebtn=_input.nextSibling;
			if(_cfg.clearbtn) _clearbtn=_morebtn.nextSibling
			
			// 追加下拉框
			_input.insertAdjacentElement('beforeBegin',_pop);

			
			// 鼠标点击事件
			_morebtn.attachEvent('onclick',_showMore);
			if(_clearbtn!=null){
				_clearbtn.onclick=function(){
					_input.settext();
					_input.fireEvent('onblur');
				}
			}
			
			// 输入框获取焦点事件
			_input.onfocus=function(){
				_input.settext(_input.getBindValue());
				_input.select();
				_showMore();
			};
			
			_input.onafterbind=function(){
				// 如果没有赋值，则不需要加载数据
				if(_input.value=='') return;
				// 如果没有加载数据，这里开始加载数据
				if(_datas==null){dataloader(false);}
				var rs=_datas.query({'v':_input.value});
				if(rs.length==0){
					this.settext();
					this.setvalue();
				}
				else{
					this.settext(rs[0].t);
				}
				Ext.lt.message.send("formSelect","onchange",_input);
			}
			_input.onkeyup=function(){
				var keycode=event.keyCode;
				// 回车 tab键
				if(keycode==13){
					_pop.selectfirst();
					return;
				}
				else if(keycode==9){
					_pop.dofilter();
					// 模拟失去焦点
					_input.blur();
					_input.fireEvent('onblur');
				}
				// Esc键
				else if(window.event.keyCode==27) {
					_input.value=_input.getBindValue();
					_pop.close();
					_input.blur();
				}
				else _pop.filter(_input.value);
			}
		};
			
		select.resize=function(w,h){
			_pop.close();
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		select._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_morebtn!=null ) width-=20
			if(_clearbtn!=null ) width-=20
			
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
	
		select.bind=function(ds){
			_input.bind(ds);
			_input.fireEvent('onblur');
		}
		
		select.reset=function(){
			_input.reset();
		}
		
		select.check=function(){
			if(!_isnull && (_input.value==null || _input.value=='')){
				alert(_cfg.label+'是必填项，请填写');
				//_input.fireEvent('onfocus');
				//_input.focus();
				return false;
			}
		}

		select.getText=function(v){
			var rs=_datas.query({v:v});
			if(rs!=null) return rs.length==0?null:rs[0].t;			
			return null
		}

		return select;
	});
	this.select=_select;
	
	
	// 多选树形文本框
	var _treeselect=Ext.lt.createComponent(function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		// 选择框数据基本结构
		// [{t:显示文本,v:选中值,sv:上级代码,s:是否选中,p:显示文本的拼音，每个字的首字母必须为大写，其余小写}]
		var _datas=null;
		var _input=null;
		var _selectText=null;
		var _treeselect={}
		var _pop=new Ext.lt.popwindow();
		var _qtree=null;
		var _btn_more=null;
		var _btn_clear=null;
		
		// 设置下拉框数据
		if(typeof(_cfg.dataloader)=='string'){
				eval("var elementcodes="+_cfg.dataloader)
				// if(elementcodes==null) return;
				_datas=elementcodes;
		}

		function _onTreeNodeClick(){
			var sels=_qtree.getSelected();
			var values=[];
			for(var i=0,l=sels.length;i<l;i++){
				values.push(sels[i].v);
			}
			_input.settext(values.join());
		}
		
		function _onTreeClick(){
			if(_pop.isShow()) return;
			// 调整弹窗大小
			_pop.show();
		}


		_treeselect.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" type="text" class="inputbox"',(_cfg.maxlength==null?'':' maxLength='+_cfg.maxlength),(_selectText==null?'':' value="'+_selectText+'"'),'/>'];
				_html.push(Ext.lt.editpanel._morebtn);
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		
		_treeselect.bind=function(ds){
			_input.bind(ds);
			_input.fireEvent('onblur');
		};
		
		function _getSelectedValue(){
			var values=null;
			var v=_input.getBindValue();
			if(v!=null) values=v.split(',');
			return values;
		}
		
		function _initQtree(){
			if(_qtree==null){
				_qtree=new Ext.lt.Qtree({
					field:{id:'v',sid:'sv',level:'l',isleaf:'isleaf'},
					outformart:'#t',
					data:_datas,
					linkchild:true,
					values:_getSelectedValue(),
					showRootNode:_cfg.selectmode=='n'||_cfg.selectmode=='checkbox',
					selectmode:_cfg.selectmode,
					on:{nodeclick:_onTreeNodeClick,click:_onTreeClick}
				});
				_qtree.draw(_pop);
			}	
		}
		
		_treeselect.draw=function(el){
			// 如果目标对象每部存在select对象，则读取内部数据作为初始化数据
			if(_tagel.getElementsByTagName('SELECT').length>0){
				_datas=_tagel.getElementsByTagName('SELECT').item(0).readData();
			}
			_tagel.setInnerHTML(this.toString());
			
			// 获取Input对象，增加处理属性
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_btn_more=_input.nextSibling;
			if(_cfg.clearbtn) _btn_clear=_btn_more.nextSibling
			if(_btn_clear!=null){
				_btn_clear.onclick=function(){
					_input.settext();
					_qtree.clearSelected();
					_input.fireEvent('onblur');
				}
			}
			// 检查多选下拉框是否失去焦点
			function _checkBlur(en){
				var srcel=en.srcElement
				if(!_pop.contains(srcel) && !_input.contains(srcel) ){
					_pop.close();
					document.detachEvent('onclick',_checkBlur);
				}
			}
			
			// Input聚焦时显示下拉框内容
			_input.attachEvent('onfocus',function(){
				_input.select();
				_initQtree();
				_qtree.setFilter(null);
				_pop.show(_input);
				document.attachEvent('onclick',_checkBlur);
			});
			
			_input.onafterbind=function(){
				_initQtree();
				var sels=_qtree.getSelected();
				var values=[],texts=[];
				if(sels[0]!=null){
					for(var i=0,l=sels.length;i<l;i++){
						texts.push(sels[i].t);
						values.push(sels[i].v);
					}
				}
				_input.settext(texts.join());
				_input.setvalue(values.join());
			}
			
			function showfiltertree(){
				var filter=null;
				if(_input.value!=''){
					filter=[{field:'t',values:_input.value}]
					_qtree.setFilter(filter,'left');
					_pop.show();
				}
				else{
					_qtree.setFilter(null);
					_pop.show();
				}
			}
			
			// left:37 up:38 right:39 down:40 space:32 enter13
			_input.onKey({
				'40':function(){ //down:40 
					var node=_qtree.getActiveNode();
					if(node==null){
						node=_qtree.getNode(_datas.toArray()[0].v);
						if(node==null) return;
					}
					else{
						node=node.nextSibling;
						if(node==null) return;						
					}
					node.body.fireEvent('onclick');
				},
				'38':function(){ //up:38
					var node=_qtree.getActiveNode();
					if(node==null){
						node=_qtree.getNode(_datas.toArray()[0].v);
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
			_btn_more.onclick=function(){
				_input.fireEvent('onfocus');
			}
		};
				
		_treeselect.blur=function(){
			_input.fireEvent('onblur');
		}
		_pop.onclose=_treeselect.blur

		
		// 重置方法
		_treeselect.reset=function(){
			_input.reset();
		}
		_treeselect.check=function(){
			
		}
		_treeselect.resize=function(w,h){
			_pop.close();
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_treeselect._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn_more!=null ) width-=20
			if(_btn_clear!=null ) width-=20
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
		return _treeselect;
	});
	this.treeselect=_treeselect;
	
	// 按公司界面规范实现Label属性
	var _label=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel.innerHTML;
		
		return new function(){
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					return _inner;
				});
			};
			this.reset=function(){
			};
			this.check=function(){
			};
			this.bind=function(){
			};
			this.draw=function(el){
				if(el!=null) _tagel=el;
				_tagel.innerHTML=this.toString();
			};
			
		}
	}
	this.label=_label;
	
	
	// 按公司规范实现button属性控件
	var _button=function(cfg){
		var _pl_button=null;
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel.innerHTML;
		var _btn=null;
		var _form=cfg.formpanel;
		var _length_css=[,'one','two',,'four','five']
		
		var _btn_action={
			submit:function(){
				_btn.action='submit';
				_btn.attachEvent('onclick',function(){
					_form.submit();
				})
			},
			reset:function(){
				_btn.action='reset';
				Ext.lt.bindEvent(_btn,'onclick',function(){
					_form.reset()
				})
			},
			common:function(){
				Ext.lt.bindEvent(_btn,'onclick',Ext.lt.util.fnbind(function(){
					if(typeof(_pl_button.onclick)=='function') _pl_button.onclick.apply(_btn);
				},_btn));
				Ext.lt.bindEvent(_btn,'onclick',function(){
					_form.fireEvent('on'+_cfg.name+'click',null,_btn)
				})
			}
		}
		
		
		_pl_button=new function(){
			this.toString=function(){
				return '<button class="buttons '+_length_css[_cfg.label.length]+'">'+_cfg.label+'</button>';
			}
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				
				// 构造页面
				_btn=_tagel.getElementsByTagName('BUTTON').item(0);
				if(_btn==null){
					_tagel.innerHTML=this.toString();
					_btn=_tagel.getElementsByTagName('BUTTON').item(0);
				}
				
				// 构造通用行为行为
				_btn_action['common']();
				if(_btn_action[_cfg.action]!=null){
					// 构造特定行为
					_btn_action[_cfg.action]();
				}
			}
			
			this.hold=function(){
				if(_btn.action=='submit') _btn.disabled=true;
			}
			this.release=function(){
				if(_btn.action=='submit') _btn.disabled=false;
			}
			
			this.name=_cfg.name;
			
			this.reset=function(){};
			
			this.check=function(){};
			
			this.bind=function(){};
			
			this.resize=function(){};
		}
		return _pl_button;
		
	}
	this.button=_button;
	
	// 日期型文本框
	var _date=Ext.lt.createComponent(function(_cfg){
		var _name=_cfg.name;
		var _cmp={name:_name,resize:function(){},check:function(){}};
		var _input=null;
		var _btn=null;
		var clearbtn=null;
		var _format=_cfg.format==''?'$1-$2-$3':_cfg.format;
		var _datevalue="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _tagel=null;
		
		_cmp.draw=function(el){
			_tagel=el;
			el.setInnerHTML(_buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" class="inputbox" type="text" readOnly maxLength=',_cfg.maxlength,'/>',_datebtn];
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				}))
			
			// 获取可操作对象	
			_input=el.getElementsByTagName('INPUT').item(0);
			_btn=_input.nextSibling;
			if(_cfg.clearbtn) _clearbtn=_btn.nextSibling;
			
			// 添加对象行为
			_input.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_clearbtn!=null) _clearbtn.onclick=function(){_input.value='';_input.onchange();}
			_input.onchange=function(){
				_datevalue=this.value
				_input.fireEvent("onblur");
				
			};
			_input.onafterbind=function(){
				var v=_dataset[_input.name];
				if(v!=null && v!=_datevalue){
					this.value=_datevalue;
					_input.fireEvent("onblur");
					return;
				}
				this.value=_datevalue.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				// 检查数据类型
				if(typeof(v)=='string' && v.length>8) _dataset[_input.name]=parseInt(_dataset[_input.name],10);
				// 出发编辑区修改事件
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input,value:_datevalue});	
			}
		};
		
		_cmp.reset=function(){
			_input.reset();
		};
		
		_cmp.bind=function(ds){
			_dataset=ds;
			if(ds[_input.name]!=null){
				var v=ds[_input.name];
				_datevalue=Ext.lt.dateutil.YYYYMMDD(v);
			}
			else{
				_datevalue="";
			}
			_input.bind(ds);
			_input.fireEvent("onblur");
		};
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn!=null ) width-=20
			if(clearbtn!=null ) width-=20
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
		
		return _cmp;
	});
	this.date=_date;
	
	
	
	// 日期区间文本框
	// 日期区间包含两个日期控件，校验时候一项必须大于前一项的时间
	// 两个日期属性为 start_控件名 end_控件名
	var _dateregion=Ext.lt.createComponent(function(_cfg){
		var _name=_cfg.name;
		var _format=_cfg.format==''?'$1-$2-$3':_cfg.format;
		var _datevalue_start="";
		var _datevalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _cmp={name:_name,resize:function(){}};
		var _input_start,_input_end,_btn_start,_btn_end,_clearbtn_start,_clearbtn_end;
		var _tagel
		
		
		_cmp.draw=function(el){
			_tagel=el
			// 生成日期区间界面
			el.setInnerHTML(_buildLabel(_cfg,function(){
					var _html=['<input name="start_',_cfg.name,'" class="shortdate" type="text" readOnly/>',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:'','至<input name="end_',_cfg.name,'" class="shortdate" type="text" readOnly/>',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:''];
					return _html.join('');
				}))
			
			// 获取可操作对象	
			_input_start=el.getElementsByTagName('INPUT').item(0);
			_btn_start=_input_start.nextSibling;
			if(_cfg.clearbtn) _clearbtn_start=_btn_start.nextSibling;
			
			_input_end=el.getElementsByTagName('INPUT').item(1);
			_btn_end=_input_end.nextSibling;
			if(_cfg.clearbtn)_clearbtn_end=_btn_end.nextSibling;
			
			// 添加对象行为
			_input_start.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_start.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_cfg.clearbtn) _clearbtn_start.onclick=function(){_input_start.value='';_input_start.onchange()}
			_input_start.onchange=function(){
				_datevalue_start=this.value
				_input_start.fireEvent("onblur");
			};
			_input_start.onafterbind=function(){
				var v=_dataset[_input_start.name];
				if(v!=null && v!=_datevalue_start){
					this.value=_datevalue_start;
					_input_start.fireEvent("onblur");
					return;
				}
				this.value=_datevalue_start.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				
				if(!_cmp.check()){
					return;
				}
				// 检查数据类型
				if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_start,value:_datevalue_start});	
			}
			
			
			// 添加对象行为
			_input_end.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_end.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_cfg.clearbtn) _clearbtn_end.onclick=function(){_input_end.value='';_input_end.onchange()}
			_input_end.onchange=function(){
				_datevalue_end=this.value
				_input_end.fireEvent("onblur");
				return;
			};
			_input_end.onafterbind=function(){
				var v=_dataset[_input_end.name];
				if(v!=null && v!=_datevalue_end){
					this.value=_datevalue_end;
					_input_end.fireEvent("onblur");
				}
				
				this.value=_datevalue_end.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				if(!_cmp.check()){
					_btn_end.onclick();
					return;
				}
				
				// 检查数据类型
				var v=_dataset[this.name];
				if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// 出发编辑区修改事件
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_end,value:_datevalue_end});	
			}
			
		}
		
		_cmp.reset=function(){
			_input_start.reset();
			_input_end.reset();
						
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
			if(_dataset['end_'+_name]==null ||_dataset['end_'+_name]==''){
				return true;
			}
			if(parseInt(_dataset['start_'+_name],10)>parseInt(_dataset['end_'+_name],10)){
				alert('结束日期必须大于开始日期');
				return false;
			}
			return true;
		}
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn_start!=null) width-=20;
			if(_btn_end!=null) width-=20;
			if(_clearbtn_start!=null) width-=20;
			if(_clearbtn_end!=null) width-=20;
			width-=16 // 删除‘至’的宽度
			
			if(width>30) width*=.9;
			if(width<30) width=30
			_input_start.style.width=width/2+'px';
			_input_end.style.width=width/2+'px';
		}
		
		return _cmp;
	});
	this.dateregion=_dateregion;
	
	
	
	

}


