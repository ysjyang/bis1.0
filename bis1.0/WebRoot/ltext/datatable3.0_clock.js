// 组件帮助请参考 ltext/extends/uidoc/Ext.lt/datatable/default.html
Ext.lt.datatableMap={};

if(Ext.lt.datatable==null){
Ext.lt.datatable=function(ds){
	// 使用3.5替换3.0
	var dt35 = new Ext.lt.datatable35(ds);
	return dt35;
}
}

var mouse={};
//document.attachEvent('onmousemove',function(){mouse.x=event.screenX;mouse.y=event.screenY;});
Ext.lt.bindEvent(document,'onmousemove',function(){mouse.x=event.screenX;mouse.y=event.screenY;});
Ext.lt.datatable.colsort={};
Ext.lt.message.hook("datatable","sort",function(key){
	var tabid=key.substring(0,key.indexOf('_'));
	if(Ext.lt.datatable.colsort[tabid]==null){
		Ext.lt.datatable.colsort[tabid]=key;
	}else if(Ext.lt.datatable.colsort[tabid]!=key){
		var col=document.getElementById(Ext.lt.datatable.colsort[tabid])
		var fs=col.getElementsByTagName("font");
		var f=null;
		for(var i=0;i<fs.length;i++){
			if(fs[i].name=='sort'){
				f=fs[i];
			}
		}
		f.className='btn_none';
		col.colconfig.asc=null;
		Ext.lt.datatable.colsort[tabid]=key;
	}
})
Ext.lt.datatable.style=null;


Ext.lt.report=Ext.lt.createComponent(function(conf){
	var _config=Ext.lt.apply({id:'report'+Ext.lt.getNextSeqValue()},conf);
	var _report={id:_config.id,version:'1.0',type:'report'};
	var _commandTag=['loop','if'];
	for(var i=0,l=_commandTag.length;i<l;i++) _commandTag[_commandTag[i]]='command'
	var _template=[];
	_template.loop=function(){this._point=0};
	_template.next=function(){
		if(this._point==this.length) return null;
		return this[this._point++];
	}
	
	
	
	
	if(_config.recordset==null){
		alert('没有指定数据集');
		return null;
	}
	
	// 设置默认数据集
	_config.ds={};
	if(_config.recordset.type=='recordset'){
		_config.ds['_default']=_config.recordset;
	}
	else if(_config.recordset.defaultrs!=null){
		_config.ds['_default']=_config.recordset[_config.recordset.defaultrs];
	}
	else {
		for(var n in _config.recordset){_config.ds['_default']=_config.recordset[n];break};
		for(var n in _config.recordset){_config.ds[n]=_config.recordset[n]};
	}
	
	
	// 将模板编译成产生HTML的函数
	function _compile(template){
		var tmp=template.split('<rpt:');
		_template.clear();
		_template.push(tmp[0]);
		for(var i=1,l=tmp.length;i<l;i++){
			_template.add(_getTagObject(tmp[i]));
		}
	}
	
	
	// 将标签文本转换为标签对象，将剩下的内容作为文本返回
	var _getTagObject=function(str){
		var c,tag,np=str.indexOf(' '),tp=str.indexOf('>'),rs=[];
		
		if(np==-1){
			// 没有任何标签属性
			tag=_createTag(str.substring(0,tp).trim());
		}
		else{
			if(np>tp) np=tp;
			// 获取标签名称
			var tn=str.substring(0,np);
			tag=_createTag(tn.trim());
			
			var attrtxt=str.substring(np,tp).split('='),k,v;
			for(var i=0,l=attrtxt.length-1;i<l;i++){
				k=attrtxt[i].trim();
				v=attrtxt[i+1].trim()
				if(i==(l-1)){
					if('/'==v.charAt(v.length-1)) v=v.substr(0,v.length-1);
				}
				else{
					attrtxt[i+1]=v.substring(v.lastIndexOf(' '));
					v=v.substring(0,v.lastIndexOf(' ')).trim();			
				}
				
				if('"'==v.charAt(0)) v=v.substring(1,v.length-1);
				tag[k]=v;
			}
		}		
		str=str.substr(tp+1);

		rs.push(tag);
		rs=rs.concat(_getEndTagObject(str));
		return rs;
	}
	
	// 检查结束标签，将文本分解为数组返回
	var _getEndTagObject=function(str){
		var rs=[str],rs1=[],tmprs;
		for(var i=0,l=_commandTag.length;i<l;i++){
			for(var j=0,m=rs.length;j<m;j++){
				if(typeof(rs[j])=='string'){
					tmprs=rs[j].split('</rpt:'+_commandTag[i]+'>');
					rs1.push(tmprs[0]);
					for(var k=1,n=tmprs.length;k<n;k++){
						rs1.push(_createTag(_commandTag[i],{endtag:true}));
						rs1.push(tmprs[k]);
					}
				}
				else{
					rs1.push(rs[j]);
				}
			}
			rs=rs1;
			rs1=[]
		}
		return rs;
	}
	
	var _createTag=function(tagName,attr){
		var type=(_commandTag[tagName]==null)?'out':'command';
		var tag={name:tagName,tagtype:type,ds:'_default'};
		Ext.lt.apply(tag,attr);
		return tag;
	}
	
	// 
	var _applyTemplate=function(){
		var html=[],tmp;
		_template.loop();
		tmp=_template.next()
		while(tmp!=null){
			tagExecute.execute(_template,html,tmp);
			tmp=_template.next();
		}

		return html.join('');
	}
	
	var tagExecute={
		'execute':function(_template,html,tag,rsname,line){
			if(typeof(tag)=='string'){
				html.push(tag);
			}
			else if(tag.tagtype=='out'){
				html.push(tagExecute.out(tag,rsname,line));
			}
			else if(tag.name=='loop'){
				html.push(tagExecute[tag.name](_template,html,tag));
			}
			else{
				html.push('/**error**/');
			}
		},
		'out':function(tag,dsname,l){
			// 获取数据集
			var rs=(dsname==null)?(tag.ds==null)?_config.ds['_default']:_config.ds[tag.ds]:_config.ds[dsname];
			var line=(l==null)?(tag.line==null)?0:parseInt(tag.line,10):isNaN(l)?0:l;
			var ds=rs.getData(line);
			var v=ds[tag.field];
			
			switch(tag.datatype){
				case 'D':
					if(v==null && tag['default']!=null) return tag['default']
					v=(''+v).toNumber(parseInt(tag.dot,10), tag.qfw=='true', parseInt(tag.unit,10));
					break;
				case 'P':
					if(v==null && tag['default']!=null) return tag['default']
					v=(''+v).toNumber(parseInt(tag.dot,10), false, 0.01)+'%';
					break;
				case 'S':
					if(v==null) v='';
					break;
			}
			if(v==null) v=''
			return v;			
		},
		'loop':function(_template,html,tag){
			var rs=tag.ds==null?_config.ds['_default']:_config.ds[tag.ds];
			var s=tag.start==null?0:parseInt(tag.start,10);
			var e=tag.end==null?rs.size():parseInt(tag.end,10);
			var p=_template._point,t;
			for(;s<e;){
				t=_template.next();
				if(t.endtag){
					s++;
					if(s<e)_template._point=p;
					continue;
				}
				tagExecute.execute(_template,html,t,t.ds,s);
			}
		}
		
	}
	
	
	_report.draw=function(el){
		var html=[];
		
		
		
		
		
		el.innerHTML=_applyTemplate();;
	};
	_report.resize=function(w,h){		
	}
	_report.setTemplate=function(tmp){
		_config.template=tmp;
		_compile(tmp);
	}
	
	if(_config.template!=null) _compile(_config.template);
	
	return _report;
});





/**
  由于本次改动内容太大，表格内部结构全部调整，锁定行、锁定列的实现全部重新实现。并且，要支持IE9标准模式。
  因此将该版本datatable暂定为3.5，待全部修改完成后逐步推广使用
*/
if(Ext.lt.datatable35==null){
Ext.lt.datatable35=function(ds){
	var lt=Ext.lt;
	var _columnMapper=null; //列名
	var _tableid;   //数据表格ID
	var _seq=1000;  //内置序列
	var _rs=ds;
	var _rs_bak=null;  // 保存未过滤的数据集
	var _columns=[]; //列设置信息
	var _columns_all=[]; //保存所有列信息
	var _columns_bak=[]; //列设置信息
	var _highlightcolor='';
	var _highlightline=0; // 最后一次鼠标定位行数
	var _selectlinestyle='';
	var _backgroundColor='#FFFFFF';
	var _tab=document.createElement('DIV');
	var _keysearch=false;
	var _renderdiv=null;

	var _head=document.createElement('DIV');
	    _head.className='h';
	    _head.setAttribute('style','top:0px;left:0px;position:absolute;overflow: hidden;');
	var _cross=document.createElement('DIV');
	    _cross.className='h ch';
	    _cross.setAttribute('style','top:0px;position:absolute;');
	var _gather=document.createElement('DIV');
	    _gather.className='clock';
	    _gather.style.cssText='position:absolute;top:0px;left:0px;overflow:hidden;position:absolute;display:block';
	var _div=document.createElement('DIV');
			_div.setAttribute('style','position:relative');
	
	_div.id='lt'+lt.getNextSeqValue();
	var _tbody=[];
	var _tbodyHeight=0; // 原本为数据块的高度，现在作为行高使用
	var _tagdiv=document.createElement('DIV');
	var _multiHead=false;  //是否绘制多层表头
	var _debug=false;    //调试模式
	var _showLine=false; //显示行号
	var _showLineCol=null;
	var _showLineFn=null;
	var _dtTop=0,_dtLeft=0,_dtWidth=0,_dtHeight=0;//datatable在页面中的位置，表格初始化后或者页面调整后修改
	var _initFillLine=30;
	var _initFillWidth=600;
	var _oldHighlight=null;
	var _drawed=false;    // 标记数据表格是否已经生成
	var _clock=0;         // 锁定列数
	var _preclock=0;			// 在表格初始化前，指定表格锁定列数
	var _clockwidth=-1;
	var _clockrow=0;      // 锁定行数
	var _clockrs=null;			// 锁定行结果集
	var _mousedrag=true;  // 支持鼠标拖拽
	var _merge=[0];        // 合并列数
	var _zoom=1;           // 显示放大系数
	var _headsort=false;  // 是否支持表头排序
	var _filterwindowstyle='wind7'; //过滤框弹出样式
	var _table={};         // 外部引用对象
	var table;
	var _classname="dt_tagdiv"; // 样式单名
	var _allowclock=true;  // 是否允许锁定，默认是允许
	var _headCol=true;	  // 是否允许调整列宽
	var _allowlineheight=false; // 是否允许调整行高
	var _layoutconfig='';				//布局
	var _maxdata=0;			//分页最大数据
	var _funfilter=[];		//动作(函数过滤)返回值 true/false
	var _hastotal = false;//是否有合计行标识
	var _chktot = false;//合计 行checkbox控制标识
	var _userwid = false; // 拖动列宽的保存
	var _userdiv = document.getElementById("ifmisuserdiv"); //存储默认宽度DIV
	var _stopdivscroll=false;
 		
	var _themes=[{title:'缺省样式',className:'dt_tagdiv'},{title:'一体化风格',className:'dttheme_ifmis'},
	             {title:'门户内嵌样式',className:'dttheme_inner'},{title:'春天主题',className:'dttheme_spring'},
	             {title:'样式1',className:'dttheme_style1'}
	             ];
	
	// 缺省列实现             
	var _defaultcolumns={
		seq:{fixi:1,isDef:true,name:'_locationposition',alias:'序号',width:40,minwidth:40,
			fn:function(l,c,rs,v){
				if (_hastotal) {
					if (this.fixi == 1) {
						_chktot = true;
						return '<center>合计</center>';
					}
					else {
						return '<center>'+(l+this.fixi-1)+'</center>';
					}
				} else {
					return '<center>'+(l+this.fixi)+'</center>';
				}
			}
		},
		checkbox:{isDef:true,name:'check',alias:'<input type="checkbox">',width:22,minwidth:22,style:'text-align:center',
			//初始化时需要改变颜色
			fn:function(l,c,rs,v){
				if (_hastotal && _chktot) {
					_chktot=false;
					return;
				};
				return '<input type="checkbox" '+(v==this._checkvalue?'checked':'')+' style="margin-top:3px;">'
			},
			_checkvalue:1,
			_alias:'',
			setColumnName:function(n){this.name=n;return this},
			setCheckValue:function(v){this._checkvalue=v;return this;},
			onclick:function(table,el,l,c,d){
					if(this.beforeclick!=null){
						if(this.beforeclick(table,el,l,c,d)==false)return;
					}
					var opt=document.getElementById(table.id+'_l'+l+(_clock>c?'_g':'_d')).children.item((c<_clock?c:c-_clock)).firstChild;
					if(!_editSelectCheckbox&&el!=opt.parentNode){return;}
					// 横向滚动条拖动后，opt.checked未定义。 全选和选中样式都通过d[this.name]控制  lp 20120407
					if(opt != null && opt.checked != null && event.srcElement!=opt){
						opt.checked^=true; 
						opt.checked?d[this.name]=this._checkvalue:d[this.name]=null;
					}else{
						!d[this.name]?d[this.name]=this._checkvalue:d[this.name]=null;
					}
					if (_hastotal) {
						if(d[this.name] != null) {
							Ext.lt.message.send(table.id,"onChecked",d);
						} else {
							Ext.lt.message.send(table.id,"unChecked",d);
						}
					}
						//开始判断是否选中第一个。
					//2.判断如果是选中。判断选中个数。如果选中个数和总长度一样就选中
					var chk=document.getElementById(table.id+'_h_'+c).firstChild;
					if(d[this.name]){
						if(table.getRecordset().size()==table.getRecordset().query({check:1}).length){
							chk.checked=true;
						}
					}
					else{
						if(chk.checked){
							chk.checked=false;
						}
					}
					//1.判断如果是取消~ 第一个是否是选中。如果是选中则取消勾选。
					
					if(_selectlinestyle=='')return;
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),d[this.name]?_selectlinestyle:'')
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),d[this.name]?_selectlinestyle:'')
					if(this.afterclick!=null){this.afterclick(table,el,l,c,d)}
				},
			onheadclick:function(table,el,c,rs){
				if(this._alias=='') this._alias=this.alias;
				var f=this.name,v=this._checkvalue,check=el.firstChild.checked,dt=this._dt;
				rs.each(function(rs){
					check?rs[f]=v:rs[f]=null});
				this.alias='<input type="checkbox" '+(check?'checked':'')+'>';dt.reflash()
				if (_hastotal) {
					if (check) {
						Ext.lt.message.send(table.id,"onAllSelected",true);
					} else {
						Ext.lt.message.send(table.id,"onAllunSelected",false);
					}
				}
				if(this.onallselected!=null && check){this.onallselected(table,el,c,rs);}
				if(this.onallunselected!=null && !check){this.onallunselected(table,el,c,rs);}
			},
			reset:function(){
				if(this._alias=='') return;
				this.alias=this._alias;
				this._alias='';
			}},
		radio:{isDef:true,name:'check',alias:'&nbsp;',width:22,minwidth:22,_checkvalue:1,_lastchecked:null,
			//初始化时需要改变颜色
			fn:function(l,c,rs,v){ if(v==this._checkvalue){this._dt._checkradio=l;this._lastchecked=rs}return '<input type="radio" name="'+_tableid+'_radio_'+this.name+'" '+(v==this._checkvalue?'checked':'')+'>'},
			setColumnName:function(n){this.name=n;return this},
			setCheckValue:function(v){_checkvalue=v;return this;},
			onclick:function(table,el,l,c,d){
				//if(this.beforeclick!=null){this.beforeclick(table,el,l,c,d)}
				if(this.beforeclick!=null){
					if(this.beforeclick(table,el,l,c,d)==false)return;
				}
				if(el.parentElement==null) return;
				var opt = document.getElementById(table.id+'_l'+l+"_c"+this.colindex+(_clock>this.colindex?'_g':'_d')).firstChild;
                opt.checked=true;
                d[this.name]=this._checkvalue;
                if(this._lastchecked!=null&&this._lastchecked!=d)
                    this._lastchecked[this.name]=null;
                this._lastchecked=d;
				if(_selectlinestyle=='')return;
				if(table._checkradio!=null){
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+table._checkradio+'_g'),'')
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+table._checkradio+'_d'),'')
				}
				table._checkradio=l;
				_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),_selectlinestyle)
				_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),_selectlinestyle)
				if(this.afterclick!=null){this.afterclick(table,el,l,c,d)}
			}}
	};
	var _searchword=null; // 搜索关键词
	var _align='left'; // 控制表格显示时是否居中
	var _dragflag=false;
	var _allowcustom=true;  // 是否显示自定义按钮
	var _coldrag=false;		// 是否可以通过拖动表头来调整列顺序
	var _render={startline:0,startcolumn:0,fillline:0,fillcolumn:0}  // 记录渲染区域配置
	var _breakword=false;  // 折行显示控制
	var filterwindow=null;	// 数据过滤窗口对象
	var filterwindowdiv=null;	// 数据过滤窗口div
	var _clickRowSelect=true;
	var correction =null ; //高度修正值
	
	
	// 窗口退出时释放内存
	//window.attachEvent('onunload',function(){
	Ext.lt.bindEvent(window,'onunload',function(){
		_table=null;
		table=null;
		_tagdiv=null;
		_div=null;
		_gather=null;
		_cross=null;
		_head=null;
		_tab=null;
		_columns=null;
		_rs=null;
		lt=null;
	});

	
	// 内部事件处理，如果需要添加追踪的事件需要在这里定义事件的名字
	var _events=[
		'onclick',
		'onselect',
		'ondblclick',
		'onmousemove',
		'onmouseout',
		'onmouseenter',
		'onmousein',
		'onmouseover',
		'onmouseup',
		'onmousedown',
		'onselectstart',
		'onmousewheel',
		'onkeypress',
		'onkeyup',
		'oncontextmenu',
		'ondragend'
	];
	
	
	var _divscrollfn=Ext.lt.util.fnbind(_divscroll,_tagdiv);
	// 追加表格拖拽事件跟踪
	//_tagdiv.attachEvent("onscroll",Ext.lt.util.fnbind(_divscroll,_tagdiv));
	//_tagdiv.attachEvent("onmousewheel",Ext.lt.util.fnbind(_divscroll,_tagdiv));
	Ext.lt.bindEvent(_tagdiv,"onscroll",_divscrollfn);
	// Ext.lt.bindEvent(_tagdiv,"onmousewheel",Ext.lt.util.fnbind(_divscroll,_tagdiv));
	function _mousewheelfunction(en){
		if(_tagdiv.parentElement==null){
			// 表格界面已经从界面中删除。
			_mousewheelfunction.unbindEvent();
			return ;
		}
		if(!_tagdiv.parentElement.contains(en.srcElement)) return;
		
		if(!_tagdiv.contains(en.srcElement)){
			_tagdiv.scrollTop-=en.wheelDelta;
		}
		_divscrollfn();
	};
	
	Ext.lt.bindEvent(document.body,"onmousewheel",_mousewheelfunction);
	
	// 监听页面事件
	for(var i=0,l=_events.length;i<l;i++){
		_events[_events[i]]=function(){};
		Ext.lt.bindEvent(document.body,_events[i],_defaultEventFunction);
	}
	//特殊监听
/*
	Ext.lt.bindEvent(document.body,'onkeydown',function(){
		var eventName='on'+window.event.type;
		var el=window.event.srcElement;
		var en=window.event
		if(el==null) return;
		var pel=el.parentElement;
		if(_tagdiv.contains(el)&&en.keyCode == 9){
		debugger;
			return false;
		}
	});
*/
	Ext.lt.bindEvent(_tagdiv,"onmousewheel",_defaultEventFunction);
	
	_events['onmousewheel']=function(){
		var p=window.event.wheelDelta;
		if(window.event.shiftKey){
			_tagdiv.scrollLeft-=p			
		}
		else{
			_tagdiv.scrollTop-=p
		}
	};
	
	
	// 通过鼠标滚轮调整显示比例
	function _tablezoom(){
	}
	
	function mousewheelEvent(){return _defaultEventFunction("onmousewheel")};
	/**
	 * 缺省事件处理函数
	 */
	function _defaultEventFunction(en){
		var eventName='on'+window.event.type;
		var el=window.event.srcElement;
		if(el==null) return;
		var pel=el.parentElement;
		var cn=el.className;
		var elid=el.id;
		// 说明，对象已经被销毁，目标元素不在页面中的任何位置
		if(pel==null){
			if(_div.innerHTML==''){
				for(var i=0,l=_events.length-1;i<l;i++){
					_events[_events[i]]=function(){};
					document.body.detachEvent(_events[i],_defaultEventFunction);
				}
			
				_tagdiv.detachEvent("onmousewheel",mousewheelEvent);
			}
				return false;
		}
		if('onselectstart'==eventName && _tagdiv.contains(el) && _dragflag) return false;
		
		if(_head.contains(el) || _cross.contains(el)){
			if(eventName=='onclick')
			if(el.tagName=='B' && el.getAttribute('eltype')=='headbtn'){
				var btnfn=_columns[el.getAttribute('colid')]._headbtns[el.getAttribute('position')][el.getAttribute('index')];
				if(btnfn!=null){
					btnfn.click(table,el.getAttribute('level'),el.getAttribute('colid'),el);
					window.event.cancelBubble=true;
					return false;
				}
			}
			while(_head.contains(el) || _cross.contains(el)){
				if(elid.search(_tableid)==0){
					if(_debug){
						window.status=_tableid+" head event: "+eventName+" srcElement:"+elid
					}
					
					if(_events[eventName]){
						var params=elid.split("_");
						if(params.length!=3) break;
						var c=parseInt(params[2],10),mc=0;
						for(;mc<_merge.length;mc++){
							if(c-_merge[mc]<0){
								mc++;
								break
							}
							c-=_merge[mc]
						}
						c+=--mc;
						var headeventName='onhead'+eventName.substr(2);
						if(_columns[c][headeventName]!=null){
							_columns[c][headeventName](table,el,c,_rs);
							if(window.event.cancelBubble) return;
						}
						Ext.lt.message.send("datatable",headeventName,[table,el,l,c,_rs]);
					}
					
					break;
				}
				// 如果鼠标点击在表头TD区域时出发表头事件
				else if(el.tagName=='TD'){
					var colindex=el.getAttribute('colindex')
					if(colindex!=null){
						var enel=document.getElementById(_tableid+'_h_'+colindex);
						if(enel!=null){
							var c=parseInt(colindex,10);
							if(_columns[c][headeventName]!=null){
								_columns[c][headeventName](table,enel,c,_rs);
								if(window.event.cancelBubble) return;
								break;
							}
							Ext.lt.message.send("datatable",headeventName,[table,el,l,c,_rs]);
						}
					}
				}
				el=el.parentElement;
				elid=el.id;
			}
		}
		// 判断是否在左侧汇总区域或者数据区域
		else while(_gather.contains(el) || _div.contains(el) || _showdatadiv.contains(el) ){
			if(elid.search(_tableid)==0){
				if(_debug){
					window.status=_tableid+" event: "+eventName+" srcElement:"+elid+" y:"+window.event.offsetY+' '+_events[eventName]
				}
				
				// 鼠标事件
				if(eventName=='onmousewheel'){
					_events['onmousewheel'](table,el,_rs.getData(i));
					if(window.event.cancelBubble) return;
				}
				else if(_events[eventName]){				
					var params=elid.split("_");
					var linetype=params[1].substring(0,1)
					
					if(linetype=='g'){
						var groupeventName='ongroup'+eventName.substr(2);
						if(_groupbycolumn!=null && _groupbycolumn[groupeventName]!=null){
							_groupbycolumn[groupeventName](table,el,l,c,d);
						}
					}
					else if(params.length==4){
						var c=parseInt(params[2].substring(1),10);
						var l=parseInt(params[1].substring(1),10);
						var d=_rs.getData(l);
						if(d==null) {
							d={};
							_rs.setData(d,l);
						}
						
						if(_allowlineheight && eventName=='onmousemove'){
							_checkDragLineHeight(table,el,l,c,d);
						}
						
						if(eventName=='ondblclick'){
							_canelDragLineHeight(table,el,l,c,d);
						}
						
						if(eventName=='onblur' && _columns[c].edit){
							_columns[c].oneditend(table,el,l,c,d)
							if(window.event.cancelBubble) return;
						}
						
						
						// 执行列定义上对应的事件
						if(_columns[c] != null && _columns[c][eventName]!=null){
							_columns[c][eventName](table,el,l,c,d);
							if(window.event.cancelBubble) return;
						}
						
						if(eventName=='onmousedown') {
							if(!table.getCol(c).edit){
								_mouselightcell(table,el,l,c,d);
								_linedropStart(table,el,l,c,d);
							}
							_dragLineHeight(table,el,l,c,d);
						}
						if(eventName=='onmouseup') {
							if(!table.getCol(c).edit){
								_linedropEnd(table,el,l,c,d);
							}
						}
						
						if(eventName=='onclick'){
							// 处理单选、多选列
							Ext.lt.message.send("datatable","onclick",[table,el,l,c,d]);
							for(var i=0,ll=_columns.length;i<ll;i++){
								if(i==c) continue;
								if(_columns[i]==_defaultcolumns['checkbox'] || _columns[i]==_defaultcolumns['radio']) if(_columns[i].onclick!=null) { 
									if(_clickRowSelect)
									_columns[i].onclick(table,el,l,i,d)
								};
							}
						}
						_events[eventName](table,el,l,c,d);
						if(window.event.cancelBubble) return;
						Ext.lt.message.send("datatable",eventName,[table,el,l,c,_rs]);


						if(_highlightcolor!=''){
							// 处理行变色
							if(eventName=='onmouseover' && _highlightline!=params[1]){
								_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_g'),'');
								_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_d'),'');
								_highlightline=params[1];
								_drawLineBgcolor(document.getElementById(_tableid+'_'+params[1]+'_g'),_highlightcolor);
								_drawLineBgcolor(document.getElementById(_tableid+'_'+params[1]+'_d'),_highlightcolor);
							}
						}
						
						// 处理键盘定位
						//if(eventName=='onkeypress'){alert(eventName+" "+l+" "+c+" "+event.keyCode);}

					}
					else if(params.length==3){
						// 处理行变色
						if(eventName=='onmouseover' && _highlightline!=params[1]){
							_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_g'),'');
							_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_d'),'');
							_highlightline=params[1];
							_drawLineBgcolor(document.getElementById(_tableid+'_'+params[1]+'_g'),_highlightcolor);
							_drawLineBgcolor(document.getElementById(_tableid+'_'+params[1]+'_d'),_highlightcolor);
						}

					}
				}

				break;
			}
			el=el.parentElement;
			elid=el.id;
		}
		if(_highlightcolor!=''){
			if(eventName=='onmouseover' ){
				if(!(_gather.contains(el) || _div.contains(el) || _showdatadiv.contains(el))){
					_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_g'),'');
					_drawLineBgcolor(document.getElementById(_tableid+'_'+_highlightline+'_d'),'');
					_highlightline=null;
				}
			}
		}
		if(eventName=='onmousewheel'){
			if(_tagdiv.parentElement==null) return
			en.cancelBubble=true;
			// 这里需要判断鼠标位置是否在该表格上面
			return !_tagdiv.parentElement.contains(en.srcElement);
		}
	}

	var _linehieghtflag=false; // 行高调整标志
	var _linehieghtobj={};     // 行高对象
	// 检查是否显示行高调整光标
	function _checkDragLineHeight(table,el,l,c,d){
		if(!_allowlineheight) return;
		var y=window.event.offsetY;
		var h=el.offsetHeight;
		
		if(h-y<4){
			el.style.cursor='row-resize';
			_linehieghtflag=true;
		}
		else{
			el.style.cursor='default';
			_linehieghtflag=false;
		}
	}
	// 开始调整行高
	function _dragLineHeight(table,el,l,c,d){
		if(!_linehieghtflag) return;
		_linehieghtobj.el=el;
		_linehieghtobj.l=l;
		_linehieghtobj.initY=window.event.clientY;
		_linehieghtobj.dline=document.getElementById(_tableid+'_l'+l+'_d');
		_linehieghtobj.gline=document.getElementById(_tableid+'_l'+l+'_g');
		_linehieghtobj.lineheight=el.offsetHeight;
		document.body.attachEvent('onmousemove',_dragLineHeightMove);
		document.body.attachEvent('onmouseup',_dragLineHeightEnd);
	}
	// 删除行高设置
	function _canelDragLineHeight(table,el,l,c,d){
		if(!_linehieghtflag) return;
		_linehieghtobj['lh'+l]=null;
		_divscroll(true);
	}
	
	function _dragLineHeightMove(){
		var cY=window.event.clientY;
		var h=_linehieghtobj.lineheight+cY-_linehieghtobj.initY;
		if(h<12) h=12;
		window.status=h+' '+_linehieghtobj.lineheight+' '+cY+' '+_linehieghtobj.initY;
		_linehieghtobj.dline.style.height=h+'px'
		_linehieghtobj.gline.style.height=h+'px'
		// 保存修改后的行高
		_linehieghtobj['lh'+_linehieghtobj.l]=h
	}
	function _dragLineHeightEnd(){
		document.body.detachEvent('onmousemove',_dragLineHeightMove);
		document.body.detachEvent('onmouseup',_dragLineHeightEnd);
	}

	/**
	 * 显示鼠标事件
	 */
	function _showEvent(){
		window.status='onclick '+_tagdiv.contains(window.event.srcElement );
	}

	/**
	 * 将指定区域内的所有HTML对象绑定事件
	 */	
	function _bindEvent(element){
		return;
		var els = element.getElementsByTagName('DIV');
	}
	
	function _initMousedrag(){
		var _eventbind=false;
		
		function _endMousedrag(en){
			_showdatadiv.style.cursor="";
			if(!_dragflag) return;
			_div.mousedrag=false;
			
			// 采用动画结束拖拽
			var x=_div.x*3;
			var y=_div.y*3;
			var t=_tagdiv.scrollTop;
			var l=_tagdiv.scrollLeft;
			_dragflag=false;
			_mousedragflag=false
			
			document.body.detachEvent("onmousemove",_dotMousedrag);
			_eventbind=false;
			window.status=""
		}
		var _count=5;
		function _dotMousedrag(en){
			// window.status="mouse button:"+en.button+"  "+(en.button==0)+" "+(_div.mousedrag)+" x:"+_div.oldx;
			if(_debug) window.status="x:"+_div.oldx+"  y:"+_div.oldy;
			
			if(!_div.mousedrag) return;
			// 由于鼠标刚按下时产生的鼠标移动事件中可能检测不到鼠标按键，因此，这里连续检测5次，如果5次全抬起则结束鼠标拖拽
			if(!_showdatadiv.contains(en.srcElement)){
				_endMousedrag(en);return;
			}
			if(en.button==0){
				if(_count--<1) _endMousedrag(en);return;
			}
			else{
				_count=5;
			}
			_dragflag=true;
			
			var newx=window.event.clientX;
			var newy=window.event.clientY;
			_div.x=_div.oldx-newx
			_div.y=_div.oldy-newy
			
			var st=_tagdiv.scrollTop+_div.y,sl=_tagdiv.scrollLeft+_div.x
			
			_tagdiv.scrollTop=st;
			_tagdiv.scrollLeft=sl;
			_doscroll(_tagdiv.scrollLeft,_tagdiv.scrollTop)
			
			
			_div.oldx=newx;
			_div.oldy=newy;
		}
		
		
		document.body.attachEvent("onmousedown",function(en){
			// 如果是右键点击则返回
			if(en.button==2){return}
			if(!_showdatadiv.contains(en.srcElement)) return;
			_div.oldx=en.clientX;
			_div.oldy=en.clientY;
			//setTimeout(function(){
				_div.x=_div.y=0;
				_div.mousedrag=true;
				_showdatadiv.style.cursor="move";
				_mousedragflag=true
				
				window.status=""
				if(!_eventbind){
					document.body.attachEvent("onmousemove",_dotMousedrag);
					_eventbind=true
				}

			//},0);
		});
		
		document.body.attachEvent("onmouseup",function(en){setTimeout(_endMousedrag,0)});
		


	}
	
	// 计算距离指定位置最近的行高，第二个参数控制查找上一行还是下一行
	function _getScrollTop(h,flag){
		if(_tbodyHeight<2) return 0;
		
		flag=flag==true
		return h-h%_tbodyHeight+(flag?_tbodyHeight:0)
	}
	
	var _lastlinebgcolor=[];
	function _drawLineBgcolor(l,color){
		if(l==null) return;
		if(_lastlinebgcolor[l.id]==color) return;
		var obj=l.firstChild;
		while(obj!=null){
			obj.runtimeStyle.backgroundColor=color;
			_drawLineBorder(obj,color);
			obj=obj.nextSibling;
		}
		_lastlinebgcolor[l.id]=color
	}
	function _drawSelectLineBgcolor(l,color){
		if(l==null)return;
		var cs = l.children;
		for(var i=0,l=cs.length;i<l;i++){
			cs.item(i).style.backgroundColor=color;
		}
	}
	function _showHighlight(_line){
		
		if(_oldHighlight!=null){
			_drawLineBgcolor(_oldHighlight,'');
		}

		_drawLineBgcolor(_line,_highlightcolor);
		_oldHighlight=_line;
	}
	
	var _lastScrollTime=new Date();
	var _lastScrollLeft=_tagdiv.scrollLeft;
	var _lastScrollTop=_tagdiv.scrollTop;
	function _doscroll(sl,st){
		if(sl==null) sl=_tagdiv.scrollLeft;
		if(st==null) st=_tagdiv.scrollTop;
		if(sl<0) sl=0
		if(st<0) st=0
		
		// 当滚动条停止活动时开始填充数据
		_dofillData(sl,st);
		
		// 设定表头和左侧位置
		new function(){
			if(_lastScrollLeft!=sl){
				_head.scrollLeft=sl;
				_lastScrollLeft=sl;
			}
			_head.fixscrollLeft=0;
			if(_showclockdiv.fixscrollTop!=0){
				 _showclockdiv.parentElement.scrollTop-=_showclockdiv.fixscrollTop;
			}
			else{
				_showclockdiv.parentElement.scrollTop=0;
			}
			_showclockdiv.fixscrollTop=0;
		}()
	}
	
	var _showdatadiv=document.createElement('DIV');
	_showdatadiv.funcname='showdatadiv';
	_showdatadiv.style.position='absolute';
	_showdatadiv.style.overflow='hidden';
	
	_showdatadiv.show=false;

	var _showclockdiv=document.createElement('DIV');
	_showclockdiv.funcname='showclockdiv';
	_showclockdiv.style.overflow='hidden';
	_showclockdiv.show=false;
	
	
	var _laststartline=null,_laststartcolumn=null;
	function _dofillData(sl,st){
		if(!_showdatadiv.show){
			_tagdiv.style.position='absolute';
			_tagdiv.insertAdjacentElement('afterEnd',_showdatadiv);
			
			_showdatadiv.show=true;
			_gather.appendChild(_showclockdiv);
		}
		
		if(_rs.size()==0){
			_showdatadiv.innerHTML='';
			_showclockdiv.innerHTML='';
			return;
		}
		// 根据滚动条位置计算显示的起始行列
		var l=0;
		var t=st-st%_tbodyHeight;
		var sc=_clock,_column,firstline=_div.firstChild.firstChild.firstChild.children,_fillColumn=0,colsize=_columns.length;
		
		// 计算填充多少列
		var tmp=0;
		_laststartcolumn=sc
		for(;sc<colsize;sc=nextColumnId(sc)){
			_column=firstline.item(tmp++);
			if(_column==null) break;
			if((l+_column.offsetWidth)>sl){
				var colid=_column.id;
				_laststartcolumn=colid.split('_')[2].substr(1);
				_laststartcolumn=parseInt(_laststartcolumn,10);
				break;
			}
			l+=_column.offsetWidth;
		}
		
		_showclockdiv.style.top=st+'px';
		
		t=isNaN(t)?0:t
		
		var buf=[],id,nc,odd='',sdd='',tmpdata;
		
		// 如果起始位置没变，则不需要重新生成数据
		_laststartline=t/_tbodyHeight+(_clockrs==null?_clockrow:0);
		var fixleft=(sl-l)<0?'0px':((l-sl)+'px');

		_defaultcolumns.seq.fixi=_clockrs==null?1:(_clockrs.size()+1);
		_fillShowDataDivHTML(_showdatadiv,_laststartline,_laststartcolumn,fixleft);
		if(_drawed&&_clock>0) _fillShowClockDivHTML(_showclockdiv,_laststartline);
		_defaultcolumns.seq.fixi=1;
		
		// 处理折行
		if(_breakword) _fixBreakWordLineHeight();
	}
	
	// 根据折行数据调整行高
	function _fixBreakWordLineHeight(){
		var sl=_render.startline,fl=_render.fillline
		if(fl<1) return; // 填充行数小于1行，不需要验证行高
		var _fontSize;
		if(_showdatadiv.firstChild.firstChild==null){
			_fontSize=_showdatadiv.firstChild.currentStyle.fontSize;
		}else{
			_fontSize=_showdatadiv.firstChild.firstChild.currentStyle.fontSize;
		}
		var fontsize=parseInt(_fontSize,10);
		fontsize=isNaN(fontsize)?14:fontsize;
		var lineheight,datalines=_showdatadiv.children,clocklines=_showclockdiv.children,cellheight;
		
		// 根据显示字符长度
		for(var i=0,fl=datalines.length;i<fl;i++){
			lineheight=_tbodyHeight;
			var dataline=datalines.item(i);
			dataline.style.height='auto';
			var checkboxcell = null;
			
			var dcells=dataline.children,cell;
			for(var j=0,l=dcells.length;j<l;j++){
				cell=dcells.item(j);
				cellheight=cell.offsetHeight;
				if(lineheight<cellheight) lineheight=cellheight
				if(cell.firstChild!=null &&cell.firstChild.tagName=='INPUT' &&(cell.firstChild.type=='radio'||cell.firstChild.type=='checkbox')) checkboxcell=cell;
			}
			
			if(_clock>0 && clocklines.item(i)!=null){
				var ccells=clocklines.item(i).children;
				for(var j=0,l=ccells.length;j<l;j++){
					cell=dcells.item(j);
					cellheight=cell.offsetHeight;
					if(lineheight<cellheight) lineheight=cellheight
					if(cell.firstChild!=null &&cell.firstChild.tagName=='INPUT' &&(cell.firstChild.type=='radio'||cell.firstChild.type=='checkbox')) checkboxcell=cell;
				}
			}
			
			dataline.style.height=lineheight+'px'
			if(_clock>0 && clocklines.item(i)) clocklines.item(i).style.height=lineheight+'px';
			if(checkboxcell!=null){
				var p = (lineheight-24)/2;
				if(p>0)checkboxcell.style.paddingTop=p+'px';
				if(p>0)checkboxcell.style.height=(lineheight+(p>0?0:1)-p)+'px'
			}
			
			var lineid=dataline.id.split('_');
			if(lineid.length>2) {
				var l=lineid[1].substring(1);
				if(_linehieghtobj['lh'+l]==null){
					var b=Ext.lt.HTML.getBorderSet(datalines.item(i));
					_linehieghtobj['lh'+l]=lineheight-b.height;
				}
			}
		}
		
		// Ext.lt.message.send('datatable','fixlineheight',{datatable:_tableid,lineheight:lineheight});
	}
	
	
	// 向指定div中填充数据
	function _fillShowDataDivHTML(showdiv,startline,startcolumn,fixleft){
		var ie6=Ext.lt.ieversion==6;
		var buf=[],colsize=_columns.length,l=0,_fillColumn=1;
		var firstline=_div.firstChild.firstChild.firstChild.children;
		var linesize=firstline.length;
		var showcl=0;
		var groupwidth=0
		
		for(var sc=_toColumnId(_clock);sc<startcolumn;sc=nextColumnId(sc)) showcl++
		if(firstline.length>0){
			// 计算填充列数
			var fillwidth=_showdatadiv.offsetWidth+(showcl<firstline.length?firstline.item(showcl).offsetWidth:0);

			for(var sc=startcolumn;sc<colsize;sc=nextColumnId(sc)){
				if(showcl>=linesize) break;
				var _column=firstline.item(showcl++);
				_fillColumn++;
				l+=_column.offsetWidth;
				if(_column.offsetLeft>0) groupwidth=_column.offsetLeft
				if(_column.firstChild!=null){
					groupwidth+=isNaN(_column.firstChild.offsetWidth)?0:_column.firstChild.offsetWidth;
				}
				if(l>(fillwidth)) break;		
			}

			if(_fillColumn+startcolumn>_columns.length) _fillColumn--;
	
			// 生成数据
			var g={},d,v;
			for(var i=startline,endi=(i+_initFillLine)>_rs.size()?_rs.size():(i+_initFillLine);i<endi;i++){
				d=_rs.getData(i);
				if(_groupbycolumn!=null){
					v=d[_groupbycolumn.name]
					if(g['v:'+v]==null){
						_buildGroupLineHtml(i,d,buf,'_d',fixleft,groupwidth);
						g['v:'+v]=true;
					}
				}
				_buildLineHtml(i,startcolumn,_fillColumn,d,buf,'_d',fixleft);
			}
		}
		
		// buf.push('<div style="width:1000000px;height:1px;display:block"></div>');
		// 清理编辑表格造成的可视区移位的问题
		showdiv.innerHTML='';
		showdiv.scrollTop=0;
		showdiv.scrollLeft=0;

		showdiv.innerHTML=buf.join('');

		_searchwordinbody(showdiv)
		
		// 记录本次渲染区域
		_render={'startline':startline,'startcolumn':startcolumn,'fillline':_initFillLine,'fillcolumn':_fillColumn}
	}
	
	// 生成锁定列
	function _fillShowClockDivHTML(showdiv,startline){
		var ie6=Ext.lt.ieversion==6;
		var gbuf=[],colsize=_columns.length,l=0;
		var cwidth=_cross.realwidth+10;
		var clockwidth=_clockwidth,startcolumn=0,_fillColumn=0;
		var colwidths=[],cid=0;
		
		// 计算锁定列占多少实际显示列
		for(var j=0;j<_clock;j++){
			colwidths.push(_columns[cid].width);
			cid=_nextColumnId(cid);
			startcolumn++;
		}
		
		// 按锁定区域宽度计算生成多少锁定列
		for(var j=colwidths.length;j>0;j--){
			if(clockwidth<0) break;
			clockwidth-=colwidths[j-1];
			_fillColumn++;
			startcolumn--
		}
		

		// 生成数据
		for(var i=startline,endi=(i+_initFillLine)>_rs.size()?_rs.size():(i+_initFillLine);i<endi;i++){
			_buildLineHtml(i,startcolumn,_fillColumn,_rs.getData(i),gbuf,'_g');
		}
		
		showdiv.innerHTML='';
		showdiv.scrollTop=0;
		showdiv.fixscrollTop=0;
		showdiv.style.marginLeft='0px';
		
		showdiv.innerHTML=gbuf.join('');
		
		// 修正锁定区表格宽度
		var fl=showdiv.firstChild; 
		if(fl!=null){
			var cls=fl.children,clw=0;
			for(var i=0,l=cls.length;i<l;i++) clw+=cls.item(i).offsetWidth;
			var fixright=Ext.lt.documentmode>7?0:Ext.lt.HTML.getBorderSet(fl).right;
			
			for(var cls=showdiv.children,i=0,l=cls.length;i<l;i++){
				cls.item(i).style.width=(clw-fixright)+'px';
			}
		}
		
		// 使用margin-left属性实现锁定单元格居右s
		showdiv.style.marginLeft=(showdiv.offsetWidth-fl.offsetWidth-(Ext.lt.documentmode>7?Ext.lt.HTML.getBorderSet(fl).width:0))+'px';
		
		_searchwordinbody(showdiv)
	}
	
	function _buildGroupLineHtml(line,data,buf,fixidname,fixleft,fillwidth){
		buf.push('<span id="',_tableid,'_gl',line,fixidname,'" class="l" style="width:1000000px;margin-Left:',fixleft,'">');
		buf.push('<span id="',_tableid,'_gl',line,'_c',fixidname,'" class="c ',_groupbycolumn.rowspan(1,1,data),' S" style="width:',fillwidth,'px">');
		 buf.push(_groupbycolumn.gfn(data,data[_groupbycolumn.name]));
		buf.push('</span>')
		buf.push('</span>')
	}
	
	
	// 生成指定列数的HTML代码
	// startcol:开始生成列数，collength：生成可见列数，tmpdata：数据集，buf：保存HTML的缓冲
	function _buildLineHtml(line,startcol,collength,tmpdata,buf,fixidname,fixleft){	
			var id=_tableid+'_l'+line;
			var odd=(line%2==0)?'odd':'';	
			var c=startcol,nc=0,v,_column,sdd;
			var lh=_linehieghtobj['lh'+line];
			
			buf.push('<span id="',id,fixidname,'" class="',odd,' l " style="',(fixidname=='_g'?'float:right;':''),'width:1000000px;margin-Left:',fixleft,';',(lh?('height:'+lh+'px;'):(_breakword?'height:auto;':'')),'">');
			
			// 判断选中的背景色
			if(tmpdata!=null){
				if(_defaultcolumns.checkbox.id!=null){
					sdd=(tmpdata[_defaultcolumns.checkbox.name]==1 && _selectlinestyle!='')?'style="background:'+_selectlinestyle+'"':'';
				}
				if(_defaultcolumns.radio.id!=null){
					sdd=(tmpdata[_defaultcolumns.radio.name]==1 && _selectlinestyle!='')?'style="background:'+_selectlinestyle+'"':'';
				}
			}
			
			for(j=0;j<collength;j++){
				_column=_columns[c];
				if(_column==null) break;
				_column.rstype='datarowset'
				buf.push('<span id="',id,'_c',c,fixidname,'" class="c c',c,' ',_column.datatype,' ',_column.rowspan(line,c,tmpdata),'" ',_column.style,' ',sdd,'  standvalue="',tmpdata[_column.name],'">');
				nc=nextColumnId(c);
				if(nc-c>1){
					// 处理和并列
					for(;c<nc;c++){
						_column=_columns[c];
						buf.push('<font id="',id,'_c',c,fixidname,'" class="m">',_column._fn(line,c,tmpdata),'</font>');
					}
				}
				else{
					buf.push(_column._fn(line,c,tmpdata));
					c++;
				}
				buf.push('</span>');
				_column.rstype=''
			}
			
			buf.push('</span>');
	}

	
	// 记录积累的divscroll事件，事件大于10个则强制执行，清空积累事件
	var _scrollcount=0;
	var _listendivscroll=null;
	// 鼠标拖动标记
	var _mousedragflag=false;
	function _divscroll(flag){
		if(_stopdivscroll) return;
		if(_mousedragflag && !flag) return;
		// 记录滚动条位置，如果没动则不处理
		var sl=_tagdiv.scrollLeft,st=_tagdiv.scrollTop;
		// 强制重新生成数据
		if(flag==true){
			_laststartline=null,_laststartcolumn=null,_lastScrollLeft=null,_lastScrollTop=null;
		}
		
		_doscroll(sl,st)
		_showmouselightcell()
		_lastScrollLeft=sl,_lastScrollTop=st;
	};
	function _showScrollLine(){
		//如果不是滚动的事件就不理他
		if(event.type!="scroll")return;
		//鼠标在滚动条的位置才是进行滚动的；
		var x=event.x;
		//莫名其妙的减100就对了
		var y=event.clientY;
		var ow=event.srcElement.offsetWidth;
		var cw=event.srcElement.clientWidth;
		//如果鼠标不在这个范围内则表示不是滚动条滚动滴。
		if(x>=ow+10||x<=cw-10){
			if(_debug)
			window.status='x:'+x+"  ow:"+ow+"  cw:"+cw;
			return;
		}
		
		//window.status='event.clientX:'+event.clientX+'  document.body.clientWidth:'+document.body.clientWidth+'  event.offsetX:'+event.offsetX
		var linenum=_tagdiv.scrollTop/_tbodyHeight;
		var ln=Math.floor(_tagdiv.scrollTop/_tbodyHeight);
		if(linenum>ln){
			ln++;
		}
		if(!this._scrollLineNum){
			this._scrollLineNum=document.getElementById('showrow_num');
		}
		
		//计算行号好了。给个div开始显示
		if(!this._scrollLineNum){
			var sv=document.createElement('DIV');
			sv.className='showrow_num';
			sv.id='showrow_num';
			_tagdiv.parentElement.insertAdjacentElement('beforeBegin',sv);
			//document.body.appendChild(sv);
			sv.innerHTML='<table cellpadding="0" cellspacing="0" border="0"><tr><td class="leftp">&nbsp;</td><td nowrap="nowrap"><p></p></td><td class="rightp">&nbsp;</td></tr></table>';
			this._scrollLineNum=sv;
		}
			
		
		//把行号放进去了;
		var v=ln;
		var d=_rs.getData(v-1);
		if(d==null) return;
		//先判断是否是fn的。
		if(_showLineFn!=null){
				v=_showLineFn(v,d);
		}else if(_showLineCol!=null){
				v=d[_showLineCol];
		}
		var p=this._scrollLineNum.getElementsByTagName('p')[0];
		p.innerHTML=v;
		var pos=Ext.lt.HTML.positionedOffset(_tagdiv,document.body,false);
		//window.status='top:'+(pos.top)+'px   left:'+(pos.left)+'px';
		this._scrollLineNum.style.top=pos.top+event.y-25+'px';
		this._scrollLineNum.style.visibility='visible';
		//将当前时间放进去。
		this._scrollLineNumTime=new Date();
		this._scrollLineNumClosed=false;
		//延迟设置列宽
		this._scrollLineNum.style.left=pos.left+_tagdiv.clientWidth-p.offsetWidth+'px';
		if(!this._scrollLineNumTimed){
			this._scrollLineNumTimed=true;
			window.setTimeout(_closeShowLineNumDiv,100);
		}
	}
	//关系提示
	function _closeShowLineNumDiv(){
		//首先看窗口是否关闭了。
		if(this._scrollLineNumClosed){return;}
		
		//匹配事件时间和当前时间。
		var t=new Date().getTime()-this._scrollLineNumTime.getTime();
		if(t>1000){
		//关闭了就设置成关闭状态
			this._scrollLineNum.style.visibility='hidden';
			this._scrollLineNumClosed=true;
			this._scrollLineNumTimed=false;
		}else{
			window.setTimeout(_closeShowLineNumDiv,100)
		}
	}
	// 显示滚动条值
	function _showScrollValue(){
		if(!this._scrollvalue){
			var sv=document.createElement('DIV');
			sv.style.position='absolute';
			sv.style.fontSize='12px';
			sv.style.top=(_dtTop+_dtHeight)+'px';
			sv.style.left=(_dtLeft+_dtWidth)+'px';
			sv.style.backgroundColor='#FFFFFF';
			_tagdiv.parentElement.insertAdjacentElement('beforeBegin',sv);
			this._scrollvalue=sv;
		}
		this._scrollvalue.innerHTML='h:'+_div.scrollTop+'/'+_div.scrollHeight+'<br>w:'+_div.scrollLeft +'/'+_div.scrollWidth;
	};

	// 处理数字型数据显示格式
	function _checkNumberFormat(c){
			var format=c.format;
			var isu=c.datatype.indexOf('U')!=-1;
			var isq=c.datatype.indexOf('Q')!=-1;
			var isd=c.datatype.indexOf('D')!=-1;
			if(!format){
					format={unit:1,dotname:2,qfw:false}	
			}
			else{
				if(format.unit<0){
					format.unit=1;
				}
				if(format.dotname==null){
					format.dotname=2;
				}
				else if(format.dotname<0){
					format.dotname=0;
				}
				if(!format.qfw){
					format.qfw=false;
				}
			}
			c.format=format;
			c._formartValue=function(value){
				var d=isd?-1:this.format.dotname;
				var q=isq?false:this.format.qfw;
				var u=isu?1:this.format.unit;
				if(!isNaN(value)){
					value=(value+'').toNumber(d,q,u);
				}else{
					value='0'.toNumber(d,q,u);;
				}
				return value
			}
			c._fn=function(i,j,rs){
				var value=rs[this.name];
				value=this._formartValue(value);
				return c.fn(i,j,rs,value);
			}
	}
	
	// 处理字符串行数据显示格式
	// 
	function _checkStringFormat(c){
		if(c.mapper!=null &&  c.mapper.columns!=null &&  lt.isArray(c.mapper.columns) && c.mapper.datas!=null&&c.mapping==null){
			c.ci=0;
			// 查找索引列
			c.mapper.regs=[];
			if(c.mapper.default_column == null){
				c.mapper.default_column=c.mapper.columns[0];
			}
			
			// 构造替换正则表达式
			for(var i=0,j=c.mapper.columns.length;i<j;i++){
				if(c.mapper.default_column==c.mapper.columns[i]) c.ci=i; 
				c.mapper.regs.push(new RegExp('#'+c.mapper.columns[i],'g'));
			}
			
			// 生成索引数据
			c.mapping={};
			for(var i=0,j=c.mapper.datas.length;i<j;i++){
				c.mapping[c.mapper.datas[i][c.ci]]=c.mapper.datas[i];
			}
			
			// 添加追加对照关系表方法
			c.addMapperDatas=function(datas){
				if(!datas)return;
				for(var i=0,j=datas.length;i<j;i++){
					if(datas[i]!=null){
						if(this.mapping[datas[i][this.ci]]==null){
							this.mapper.datas.push(datas[i])
						}
						this.mapping[datas[i][this.ci]]=datas[i];
					}
				}
			}
			
			c.getMapperData=function(d){
				if(d==null) return null;
				var rs,o=null,mappercol=this.mapper.columns;
				switch(typeof(d)){
					case 'string':
					case 'number':
						rs=this.mapping[d];
						break;
					case 'object':
						rs=this.mapping[d[this.name]];
						break;
				}
				if(rs==null) return null;
				o={};
				for(var i=0,l=mappercol.length;i<l;i++){
					o[mappercol[i]]=rs[i];
				}
				return o;
			}

		}
		
		c._formartValue=function(value){
		
			if('&'==value)return '';
			if(this.format!=null && this.mapping!=null){
				var fm=this.format
				var m=this.mapping[value];
				if(m!=null){
					var cols = c.mapper.columns;
					for(var i=0,j=cols.length;i<j;i++){
						fm=fm.replace(c.mapper.regs[i],m[i]);
					}
					value=fm;
					if('undefined'==value) value='';
				}
				else{
					if(null==value||undefined==value||'&'==value||'&&'==value||'_&&'==value||''==value) return '';
					var cols = c.mapper.columns;
					for(var i=0,j=cols.length;i<j;i++){
						fm=fm.replace(c.mapper.regs[i],value);
					}
					value=fm;
				}
			}
			return value==null?'':value+''
		}
		
		c._fn=function(line,col,rs){
			var value=rs[this.name];
			value=this._formartValue(value);
			var al=this.fn(line,col,rs,value);
			if('undefined'==al||null==al||'null'==al)al='';
			if(_breakword){
				return ['<div style="white-space:normal; word-break:break-all;">',al,'</div>'].join('');
			}
			else
				return al
		}
		
	}
	
	// 处理日期数据显示格式
	function _checkDateFormat(c){
		// 处理日期格式的正则表达式
		c.input=/(\d{4})(\d{2})(\d{2})/
		// 将输出格式准换为这则表达式
		if(c.format==null){
			c.output="$1-$2-$3"
		}
		else{
			c.output=c.format.replace('YYYY','$1').replace('MM','$2').replace('DD','$3');
		}
		
		c._formartValue=function(value){
			if(value==null) {
				value='';
			}
			else if(typeof(value)=='number'){
				value=new Date(value);
				value=Ext.lt.dateutil.YYYYMMDD(value)
			}
			value=value.replace(this.input, this.output);
			return value
		}
		c._fn=function(i,j,rs){
			var value=rs[this.name];
			value=this._formartValue(value)
			var al=this.fn(i,j,rs,value);
			if(null==al && 'undefined'==al) al='';			
			return al+"";
		}
	}
	
	// 处理百分比格式
	function _checkPercentFormat(c){
		c.format={};
		c._formartValue=function(value){
			value=parseFloat(value,10);
			if(isNaN(value)) value=0;
			value=(value*100+'').toNumber(1,true,1)+'%';
			return value
		}
		c._fn=function(i,j,rs){
			var value=rs[this.name];
			// 转换为十进制浮点数
			value=this._formartValue(value)
			var al=this.fn(i,j,rs,value);
			if(null==al && 'undefined'==al) al='0%';			
			return al+'';
		}
	}
	
	// 处理浮点型数字格式，显示时居右显示，可以通过format属性设置千分位和小数位。但不能控制计量单位
	function _checkFloatFormat(c){
		var format=c.format;
		if(!format){
				format={dotname:2,qfw:false}	
		}
		else{
			if(format.dotname==null){
				format.dotname=2;
			}
			else if(format.dotname<0){
				format.dotname=2;
			}
			// 默认显示千分位
			format.qfw=format.qfw!=false;
		}
		c.format=format;
		c._formartValue=function(value){
			// 转换为十进制浮点数
			value=parseFloat(value,10);
			if(isNaN(value)) value=0;
			value=(value+'').toNumber(this.format.dotname,this.format.qfw,1);
			return value;
		}
		c._fn=function(i,j,rs){
			var value=rs[this.name];
			value=this._formartValue(value);
			var al=this.fn(i,j,rs,value);
			if(null==al && 'undefined'==al) al='0';			
			return ""+al+"";
		}
	}
	
	function _filteStringColumn(filterwindow,div,_rs,_rs_bak){
								var _html=[];
								_html.push('<div style="width:250px;white-space:nowrap;background-color:#FFF"><div class="r_div_s" style="height:25px;padding-left:5px"><input type=text tipstext="请输入查询条件..." notvalidchars="*"><input type="checkbox" />包含</div><div style="height:300px;overflow:hidden" class="dt_headmenu">b</div>');
								_html.push('<div class="r_div_s" style="width:250px;height:25px"><input type="checkbox" />全选<button class="r_div_falter" overclass="r_div_falter_over">确认</button><button class="r_div_close" overclass="r_div_close_over">关闭</button></div></div>')
								Ext.lt.HTML.setInnerHTML(div,_html.join(''));
								Ext.lt.HTML.expand(div);
								
								div=div.firstChild;
								var searchinput=div.firstChild.firstChild;
								var searchtype=searchinput.nextSibling;
								var checkall=div.lastChild.firstChild;
								var btnconfirm=checkall.nextSibling.nextSibling;
								var btnclose=btnconfirm.nextSibling;
								var datalist=div.firstChild.nextSibling;
								
								// 生成列表数据
								var col=this,cname=col.name,ldata=[],tdata=_rs.toArray(),d,v,sv=[];
								for(var i=0,l=_rs_bak.length;i<l;i++){
									d=_rs_bak[i],v=d[cname];
									if(v==null) v='';
									if(ldata['v_'+v]==null){
										ldata.push(v);
										ldata['v_'+v]=true;
										ldata['o_'+v]={v:v,t:col._formartValue(v)};
									}
								}
								ldata._sort(true);
								for(var i=0,l=ldata.length;i<l;i++){
									ldata[i]=ldata['o_'+ldata[i]];
								}
								// 处理选中项
								for(var i=0,l=tdata.length;i<l;i++){
									d=tdata[i],v=d[cname];
									if(sv['v_'+v]==null){
										sv.push(v);
										sv['v_'+v]=true;
									}
								}
								
								// 设置全选
								if(sv.length==ldata.length) checkall.checked=true;
								
								
								var qlist=new Ext.lt.Qtree({
									data:ldata,
									field:{id:'v',name:'t'},
									outformart:'#t',
									viewmodel:'list',
									selectmode:'n',
									values:sv,
									on:{
										'change':function(tree){
											var sels=tree.getSelected();
											checkall.checked=sels.length==ldata.length;
										}
									}
								});
								qlist.draw(datalist);
								datalist.onmousewheel=function(en){if(en!=null)en.cancelBubble=true;return true;}
								
								searchinput.onKey({
									'u*':function(){
										qlist.setFilter([{field:'t',values:this.getValue()}],searchtype.checked?'contain':'left',true)
									}
								})
								
								searchtype.onclick=function(){
									searchinput.fireEvent('onkeyup');
								}
								
								//全选的事件
								checkall.onclick=function(){
									qlist.checkAll(this.checked);
								}
								
								
								btnconfirm.onclick=function(){
									var val=[];
									var sels=qlist.getSelected();
									
									for(var i=0,l=sels.length;i<l;i++){
										val.push(sels[i]['v'])
									}
									
									if(sels.length==0){
										table.clearFilter();
										col.filterbtn.setClass("filterbtn");
									}else{
										var filter={};
										filter[cname]=val;
										table.setFilter(filter);	
										col.filterbtn.setClass("filteredbtn");
									}
									filterwindow.close();
								}
		
	}
	
	function _filteNumberColumn(filterwindow,div,_rs,_rs_bak){
		// 暂时按文本处理
								_filteStringColumn.apply(this,[filterwindow,div,_rs,_rs_bak]);
	}

	function _filteDateColumn(filterwindow,div,_rs,_rs_bak){
		// 暂时按文本处理
								_filteStringColumn.apply(this,[filterwindow,div,_rs,_rs_bak]);
	}
	
	// 处理整数数字格式，显示时居右显示，可以通过format属性设置千分位，强制取整。但不能控制计量单位
	function _checkIntegerFormat(c){
		var format=c.format;
		if(!format){
				format={qfw:false}	
		}
		else{
			// 默认显示千分位
			format.qfw=format.qfw!=false;
		}
		c.format=format;
		c._formartValue=function(value){
			// 转换为十进制浮点数
			value=parseInt(value,10);
			if(isNaN(value)) value=0;
			value=(value+'').toNumber(0,this.format.qfw,1);
			return value;
		}
		c._fn=function(i,j,rs){
			var value=rs[this.name];
			value=this._formartValue(value);
			var al=this.fn(i,j,rs,value);
			if(null==al && 'undefined'==al) al='0';			
			return " "+al+" ";
		}
	}
	
	// datatable列设置{id:列索引,name:列名,alias:别名,sort:顺序码,datatype:数据类型SND,format:{unit:计量单位,dotname:小数位}格式,width:列宽度,minwidth:最小宽度默认50,fn(i,rs,value):回调函数可以扩展表格行为,head:[]保存多层表头设置}
	function _addCol(c){
		if(!c){c={_bind:function(){}}};
		//c.width=false;
		if(!c.id){c.id=_seq++};
		if(!c.name){c.name="col"+c.id};
		if(!c.alias){
			if(_columnMapper!=null&&_columnMapper[c.name]!=null){
				c.alias=_columnMapper[c.name];
			}else{
				c.alias=c.name
			}
		};
		c.display=c.display!=false;
		c._dt=table;
		if(!Ext.lt.isFunction(c.rowspan))c.rowspan=function(i,j,rs){return "bl ";}
		if(!c.style){c.style=''}else{c.style=' style="'+c.style+'"'};
		if(!c.sort){c.sort=_columns.length};
		if(!c.minwidth){
			var mw=c.alias.length*12+50;
			if(mw<50)
				c.minwidth=50;
			else if(mw>300)
				c.minwidth=300;
			else
				c.minwidth=mw;
		};
		if(!c.width){c.width='auto'}
		if(!c.datatype){c.datatype='S'}
		c.datatype=c.datatype.substring(0,1);
		var _datatype=c.datatype;
		if(_datatype=='N'){
			// 生成数字型格式
			_checkNumberFormat(c);
			c.onfilter=_filteNumberColumn
		}
		else if(_datatype=='S'){
			// 生成数字型格式
			_checkStringFormat(c);
			// 追加默认数据过滤实现
			c.onfilter=_filteStringColumn;
		}
		else if(_datatype=='D'){
			// 生成日期型格式
			_checkDateFormat(c);
			c.onfilter=_filteDateColumn;
		}
		else if(_datatype=='P'){
			// 生成百分比型格式
			_checkPercentFormat(c);
			c.onfilter=_filteNumberColumn
		}
		else if(_datatype=='F'){
			// 生成整数型格式
			_checkFloatFormat(c);
			c.onfilter=_filteNumberColumn
		}
		else if(_datatype=='I'){
			// 生成整数型格式
			_checkIntegerFormat(c);
			c.onfilter=_filteNumberColumn
		}
		else if(c._fn==null){
			c._fn=function(i,j,rs){
				var al=this.fn(i,j,rs,rs[this.name]);
				if(null==al && 'undefined'==al && 'null'==al) al='';
				return al;
			}
		}
		


		if(c._formartValue==null) c._formartValue=function(v){return v}
		if(!c.fn){
			c.fn=function(i,j,rs,value){
				if(value==null || value=='null') value='';
				return '<span title="'+value+'" >'+value+'</span>';
			}
		}
		if(!c.head) c.head=[];
		// 追加初始化方法
		if(!Ext.lt.isFunction(c.init)) c.init=function(){};
		
		if(c._bind!=null){
			c._bind(table,_rs);
		}
		
		if(c.gfn==null){
			c.gfn=function(rs,value){
				var v=this._formartValue(value),ginfo=_rs.getgroupinfo(rs[_groupbycolumn.name]);
				if(ginfo==null) 
					return '找不到该组数据';
				if(v==null || v=='') v='空'
				return this.alias+':'+v+' 共('+ginfo._groupdatasize+')条';
			}
		}
		
		c._headbtns={left:[],right:[]};
		if(c.btns!=null){
			for(var i=0,li=c.btns.length;i<li;i++){
				if(c.btns[i].position=='right'){
					c._headbtns.right.push(c.btns[i]);
				}
				else{
					c._headbtns.left.push(c.btns[i]);
				}
			}
		}
		if(c.filter && c.onfilter!=null){
			// 插入一个排序按钮
			var filterbtnconfig={
				colobj:c
				,icon:'filterbtn'
				,position:'left'
				,click:function(table,l,c,el){
					if(this.btnel==null) this.btnel=el;
					this.colobj.onfilter(filterwindow,filterwindowdiv,_rs,_rs_bak);
					filterwindow.show();
				}
				,setClass:function(icon){
					// 替换默认样式
					this.btnel.className=this.btnel.className.replace(' '+this.icon,' '+icon);
					this.icon=icon;
				}
			};
			c._headbtns.left.push(filterbtnconfig)
			c.filterbtn=filterbtnconfig;
		}
		
		
		// 这是列索引
		c.colindex=_columns_all.length
		if(c.display)_columns.push(c);
		_columns_all.push(c)
		_columns_all['col:'+c.name]=c
	}

	
	
	
	
	// DataTable 绘制完毕后，每次增加或减少列时都需要重新对列设置进行初始化
	function _initCol(){
		// 处理列初始化函数
		var _sumrs = null;
		if (_hastotal && _clockrs != null) {
			_sumrs = _clockrs.toArray();
		}
		for(var i=0,l=_columns_all.length;i<l;i++) {
			var _col = _columns_all[i];
			if (_userwid) {
				var _userWidth=Ext.lt.cache.getData(_tableid+_col.name);
				// 保存初始化时的宽度
				if (_col.oldwidth == null){_col.oldwidth = _col.width};
				if (_userWidth != null && _userWidth != "")_col.width = parseInt(_userWidth);
			}
			// 判断是否有合计数据
			if (_sumrs != null) {
				var _totalflag = _col.totalflag;
				if (_totalflag == 2) {
					delete _sumrs[0][_col.name];
				}
			}
			_col.init();
		}
		// 验证列的显示属性
		_columns=[];
		for(var i=0,l=_columns_all.length;i<l;i++) if(_columns_all[i].display) _columns.push(_columns_all[i]);
		// 合计 lp 20130326
		var totalrs = {};
		// 选中合计
		var _totFn = function(d){
			var _data = d;
			var _clrs = _clockrs.toArray()[0];
			for (var id in _clrs) {
				if (totalrs[id] == null) totalrs[id] = 0;
				if (totalrs[id] == null) totalrs[id] = 0;
				totalrs[id] += _data['check'] ? parseFloat(_data[id]) : -1 * parseFloat(_data[id]);
			}
			var _delfn = function(_clrs){return true};
			_clockrs.setData(totalrs,0);
			_reflash();
		}
		// 全选合计
		var _allTotFn = function(flag){
			var _clrs = _clockrs.toArray()[0];
			for (var id in _clrs) {
				if (flag) totalrs[id] = 0;
				for (var j=0, jlen = _rs.size(); j<jlen; j++) {
					var d = _rs.getData(j);
					var _tempVal = d[id];
					if (_tempVal == null) d[id]=0;
					totalrs[id] += d['check'] ? parseFloat(d[id]) : -1 * parseFloat(d[id]);
				}
			}
			_clockrs.setData(totalrs,0);
			_reflash();
		} 
		Ext.lt.message.hook(table.id,'onChecked',_totFn);
		Ext.lt.message.hook(table.id,'unChecked',_totFn);
		Ext.lt.message.hook(table.id,'onAllSelected',_allTotFn);
		Ext.lt.message.hook(table.id,'onAllunSelected',_allTotFn);
	}
	
	// 获取一个显示列的设置信息
	function _getCol(i){
		var col;
		if(typeof(i)=='string'){
			col=_columns_all['col:'+i];
			if(col!=null) return col;
			i=parseInt(i,10);
			if(isNaN(i)) return null;
		}
		if(typeof(i)=='number'){
			var c=_columns[i];
			if(c){return c}
			else{_addCol()}
		}
	}
	
	// 创建显示表格的固定div区域
	function _buildDiv(){
		var d=_tagdiv.parentElement;
		d.className+=' '+_classname;

		_tagdiv.style.cssText='position: relative;overflow:auto;'
		_tagdiv.appendChild(_div);
		d.appendChild(_head);
		d.appendChild(_gather);
		d.appendChild(_cross);
		_cross.top=parseInt(_cross.style.top,10);
		if(isNaN(_cross.top)) _cross.top=0;
		_cross.left=parseInt(_cross.style.left,10);
		if(isNaN(_cross.left)) _cross.left=0;
		if(_clockwidth>0){
			_cross.style.width=_clockwidth;
			_cross.style.overflow='hidden';
		}
		else{
			_cross.style.width='auto';
			_cross.style.overflow='visible';
		}
		
	}
	
	// 创建数据表格区域使用的样式单
	// .datatable_tagdiv 目标DIV的样式
	function _buildCSS(){
		if(_table.style==null){
			_table.style=document.createStyleSheet();
		}
		else{
			// 清除样式
			_table.style.cssText='';
		}

		var csstxt=[];
		csstxt.push(" .",_tableid," .N{width:100%;text-align:right;}");
		csstxt.push(" .",_tableid," .P{width:100%;text-align:right;}");
		csstxt.push(" .",_tableid," .I{width:100%;text-align:right;}");
		csstxt.push(" .",_tableid," .D{width:100%;text-align:center;}");
		csstxt.push(" .",_tableid," .F{width:100%;text-align:right;}");
		if(!_breakword){
			// 添加不折行样式
			csstxt.push(" .",_tableid," .c{text-overflow: ellipsis;white-space:nowrap;}");
		}
		
		var tablewidth=_tagdiv.parentElement.offsetWidth,autocolumns=[],w,reminw=tablewidth;
		for(var j=0, colsize=_columns.length;j<colsize;j++){
			
			w=_columns[j].width;
			
			if(w>1){
				reminw-=w;
			}
			else if(w=='auto'){
				autocolumns.push(j)
				continue;
			}
			else if(0<w && w<1){
				// 按百分比控制列宽
				w=tablewidth*w;
			}
			else if(w<0){
				w+=tablewidth;
			}
			if(w<_columns[j].minwidth){
				w=_columns[j].minwidth
			}
			reminw-=w;
			
			csstxt.push(" .",_tableid," .c",j,"{width:"+w+"px;overflow:hidden;}");
		}
		
		// 处理自动宽度
		var autow=(reminw/autocolumns.length)-20,colid
		for(var i=0;i<autocolumns.length;i++){
			colid=autocolumns[i];
			_columns[colid].width=_columns[colid].minwidth>autow?_columns[colid].minwidth:autow
			csstxt.push(" .",_tableid," .c",colid,"{width:"+(_columns[colid].width)+"px;overflow:hidden;}");
		}

	  _table.style.cssText=csstxt.join('');
		_table.columnstyle=[]
		// 将列样式对象分离出来		
		for(var j=0, colsize=_columns.length;j<colsize;j++){
			var styleobj=_table.style.rules.item(5+j);
			var cid=styleobj.selectorText.split(' .c')[1];
			_table.columnstyle[parseInt(cid,10)]=styleobj
		}
		
	}
	
	function _buildColWidthCSS(colid,width){
		if(_table.columnstyle[colid] !=null)
			_table.columnstyle[colid].style.width=width+'px';
	}
	
	function _fixcolumnwidth(){
		var tablewidth=_tagdiv.parentElement.offsetWidth,autocolumns=[],w,reminw=tablewidth;
		for(var j=0, colsize=_columns.length;j<colsize;j++){
			w=_columns[j].width;
			
			if(w>1){
				reminw-=w;
				continue;
			}
			if(w=='auto'){
				autocolumns.push(j)
				continue;
			}
			if(0<w && w<1){
				// 按百分比控制列宽
				w=_dtWidth*w;
			}
			else if(w<0){
				w+=_dtWidth;
			}
			if(w<_columns[j].minwidth){
				w=_columns[j].minwidth
			}
			_buildColWidthCSS(j,w);
			reminw-=w;
		}
		
		// 处理自动宽度
		var autow=(reminw/autocolumns.length)-20,colid
		for(var i=0;i<autocolumns.length;i++){
			colid=autocolumns[i];
			_columns[colid].width=_columns[colid].minwidth>autow?_columns[colid].minwidth:autow
			_buildColWidthCSS(colid,_columns[colid].width);
		}
		

	}
	
	// 获取表头最大层次
	function _getTableHeadLevel(){
		var maxlevel=0;
		for(var i=0,l=_columns.length;i<l;i++){
			if(maxlevel<_columns[i].head.length) maxlevel=_columns[i].head.length;
		}
		return ++maxlevel;
	}
	
	// 根据和并列计算实际可见列
	var _merge_init=null;
	// 将可见列ID转换为实际列ID
	function _toColumnId(showcolid){
		var i=0,t=0;
		for(l=_merge.length;i<l;i++){
			t+=_merge[i];
		}
		for(l=_columns.length;i<showcolid;i++){
			t++;
		}
		return t;
	}
	function _nextColumnId(colid){
		var t=0;
		for(var i=0,l=_merge.length;i<l;i++){
			t+=_merge[i];
			if(colid<t){
				return t;
			}
		}
		return colid+1;
	}
	
	function nextColumnId(colid){
		if(_merge_init==null){
			_merge_init=[];
			for(var i=0,l=_columns.length;i<l;i++){
				_merge_init[i]=_nextColumnId(i);
			}
		}
		return _merge_init[colid]==null?1:_merge_init[colid];
	}
	
	// 从指定列开始构造多层表头数组，返回值结构为二位数组，外层是行，内层为列。以支付方式为例，返回值数组结如下所示
	// {['支付',    '支付',    '支付'],
	//  ['集中支付','集中支付','实拨'],
	//  ['直接支付','授权支付','实拨']} 
	var _buildHeadArr=function(colstart,collength,maxlevel){
		var headarr=[];
		//for(var i=colstart;i<(colstart+collength);i++){
		for(var i=colstart;i<(colstart+collength);i=nextColumnId(i)){
			colcfg=_columns[i];
			colarr=[colcfg.alias]
			// 由于IE8 concat处理速度很慢，因此，改用循环赋值数组对象内容
			//colarr=colarr.concat(colcfg.head);
			var j=0;
			for(;j<colcfg.head.length;j++) colarr.push(colcfg.head[j])
			for(j++;j<maxlevel;j++){
				colarr[j]=colarr[j-1];
			}
			headarr.push(colarr.reverse( ));
		}
		
		// 行列转换
		var _tempheadarr=[],_temprol;
		for(var i=0;i<maxlevel;i++){
			_tempheadarr[i]=[];
			_temprol=headarr[0]
			for(var j=0,l=headarr.length;j<l;j++){
				_tempheadarr[i][j]=headarr[j][i]
			}
		}
		//alert(Object.toJSON(_tempheadarr))
		return _tempheadarr
	}
	
	// 清理表头数组中指定区域的数据
	var _clearHeadarr=function(headarr,i,j,colspan,rowspan){
		for(var m=i,endi=i+rowspan;m<endi;m++){
			for(var n=j,endj=j+colspan;n<endj;n++){
				if(headarr[m]!=null)
					headarr[m][n]='wow';
			}	
		}
		return headarr;
	}
	
	//创建表头的HTML代码，使用Table标签实现表头
	var _buildMultiHeadHTML=function(headarr,start){
		if(headarr.length<1) return '' // 晃点我，没有表头
		var maxlevel=headarr.length,rownum=headarr[0].length,colcfg,colarr,colname,colspan=0,rowspan=0,tablewidth=rownum,startcolnum=start;
		var tableheadstr=['<table border="0" cellspacing="0" cellpadding="0"><head>']
		// 将显示列与实际的列进行转换，这里将转换关系提前算好，避免大表头重复计算时速度慢的问题
		var rownumtocolid=[];
			var colid=start;
		for(var j=0;j<rownum;j++){
			rownumtocolid[j]=colid;
			colid=nextColumnId(colid);
		}
		// 按照headarr中的数据拼装表格，开始消除方块吧 :)
		for(var i=0;i<maxlevel;i++){
			colarr=headarr[i];
			tableheadstr.push('<tr><td class="c" style="border-left-width:0px;border-right-width:0px;overflow:hidden"><span style="padding:0px;display:block;overflow:hidden;width:0px">&nbsp;</span></td>');
			for(var j=0;j<rownum;j++){
				colname=colarr[j],colspan=1,rowspan=1;
				if(colname=='wow') continue;
				if(colname==' ') colname='&nbsp;';
				// 计算合并行数
				for(;i+rowspan<maxlevel;rowspan++){
					if(headarr[i+rowspan][j]!=headarr[i+rowspan-1][j]) break;					
				}
				// 计算合并列数
				for(;j+colspan<rownum;colspan++){
					if(colarr[j+colspan]!=colarr[j+colspan-1]) break;					
				}
				
				// 1.合并列数说明最上面的一行肯定是对的。
				// 2.表头不会超过5行所以从第二行顺序向下循环判断。
				if(rowspan>1)for(var r=rowspan;r>1;r--){
					for(var n=colspan;n>1;n--){
						if(headarr[i+r-1][j+n-1]!=colname){
							rowspan=r-1;
						}
					}
				}
				if(colspan>1&&i+rowspan==maxlevel){
						if(i!=maxlevel-1){
							rowspan--;
						}else{
							colspan=1;	
						}
				}
				/* 反向校验表头合并区域
				if(colspan>1)for(var r=colspan;r>1;r--){
					if(headarr[i+rowspan-1][j+r-1]!=headarr[i+rowspan-1][j+r-2]) colspan=r-1;					
				}
				if(rowspan>1)for(var r=rowspan;r>1;r--){
					if(headarr[i+r-1][j+colspan-1]!=headarr[i+r-2][j+colspan-1]) rowspan=r-1;					
				}
				*/
				
				// 将显示列与实际的列进行转换
				colid=rownumtocolid[j]
				tableheadstr.push('<td colspan="',colspan,'" rowspan="',rowspan,'" VALIGN="middle" class="m c">');
				
				var leftbtns=_columns[colid]._headbtns.left,btnhtml=[];
				if(leftbtns.length>0){
					for(var bi=0,bil=leftbtns.length;bi<bil;bi++){
						if(leftbtns[bi].level==i+1 || (leftbtns[bi].level==null && maxlevel==i+rowspan)){
							btnhtml.push('<b class="hbtn ',leftbtns[bi].icon,'" overclass="hbtn ',leftbtns[bi].icon,' ',leftbtns[bi].icon,'_over" eltype="headbtn" position="left" colid="',colid,'" index="',bi,'" level="',i,'">&nbsp;&nbsp;</b>')
						}
					}
				}

				if(maxlevel==i+rowspan){
					tableheadstr.push('<span id="',_tableid,'_h_',colid,'" clockindex=',(j+start),' colindex="',colid,'" colflag="true" class="c',colid,'">',btnhtml.join(''),colname,_debug?colid+' '+(j+start):'','</span>');
				}
				else{
					// 宽度计算
					var headw=_columns[colid].width;
					for(var ci=1;ci<colspan;ci++){
							headw+=_columns[colid+ci].width;
					}
					
					if(headw==null||headw==0)headw=_columns[colid].minwidth;
					
					tableheadstr.push('<span class="c',colid,'" style="height:100%;width:',headw,'px">');
					tableheadstr.push(btnhtml.join(''),colname,_debug?colid:'');
					tableheadstr.push('</span>');
				}
				var leftbtns=_columns[colid]._headbtns.right;
				
				tableheadstr.push('</td>');


				headarr=_clearHeadarr(headarr,i,j,colspan,rowspan);
			}
			tableheadstr.push('</tr>');
		}
		tableheadstr.push('</head></table>');
		return tableheadstr.join('');
	}
	
	//创建单层表头的HTML代码，使用Table标签实现表头
	var _buildSingleHeadHTML=function(headarr,start){
		if(headarr.length<1) return '' // 晃点我，没有表头
		var maxlevel=headarr.length,rownum=headarr[0].length,colcfg,colarr,colname,startrownum=start;
		var tableheadstr=['<table border="0" cellspacing="0" cellpadding="0" ><head>']
		// 按照headarr中的数据拼装表格，开始消除方块吧 :)
		colarr=headarr[0];
		tableheadstr.push('<tr><td class="c" style="border-width:0px;overflow:hidden"><span style="padding:0px"></span></td>');
		var colid=start;
		var cc=0,t=0;
		var btnhtml=[];
		for(;t<start;cc++){
			t=nextColumnId(t);
		}
		
		
		for(var j=0;j<rownum;j++){

			var leftbtns=_columns[colid]._headbtns.left,btnhtml=[];
			if(leftbtns.length>0){
				for(var bi=0,bil=leftbtns.length;bi<bil;bi++){
					btnhtml.push('<b class="hbtn ',leftbtns[bi].icon,'" overclass="hbtn ',leftbtns[bi].icon,' ',leftbtns[bi].icon,'_over" eltype="headbtn" position="left" colid="',colid,'" index="',bi,'">&nbsp;&nbsp;</b>')
				}
			}

			colname=colarr[j];
			tableheadstr.push('<td colindex="',(colid),'" colflag="true"><span class="c c',(colid),'" id="',_tableid,'_h_',colid,'" clockindex="',(j+cc),'" colindex="',colid,'" colflag="true">',btnhtml.join(''),colname,_debug?(j+cc)+' '+colid:'','</span></td>');
			colid=nextColumnId(colid);
		}
		tableheadstr.push('</tr>');
		tableheadstr.push('</head></table>');
		return tableheadstr.join('');
	}
	
	// 创建_cross区表头
	// 实现方式是分析表头设置结构采用Table标签实现多层表头
	// 返回末级表头列
	function _buildCrossDiv(){
		var maxlevel=1;
		if(_multiHead){maxlevel=_getTableHeadLevel()};
		var rownum=0;
		for(var i=0;i<_clock;i++){
			if(i<_merge.length)
				rownum+=_merge[i]==0?1:_merge[i];
			else
				rownum+=1;
		}
		var coltd=[];
		var _fixdiv='<div class="clock clockrow"></div>';
		if(_merge>0||_merge.length>0){
			var headarr=_buildHeadArr(0,rownum,maxlevel)
			if(_multiHead){
				// 多层表头
				_cross.innerHTML=_buildMultiHeadHTML(headarr,0)+_fixdiv;
			}
			else{
				// 单层表头
				_cross.innerHTML=_buildSingleHeadHTML(headarr,0)+_fixdiv;
			}

			var coltd=_fixHeadTable(_cross);
			
		}
		else{
			// 如果没有左侧锁定列，则将该区域内容设空
			_cross.innerHTML='<div></div>'+_fixdiv;
		}
		
		return coltd;
	}
	
	// 创建_head区表头
	// 实现方式是分析表头设置结构采用Table标签实现多层表头
	// 返回末级表头列
	function _buildHeadDiv(){
		var maxlevel=1;
		if(_multiHead){maxlevel=_getTableHeadLevel()};
		
		// 获取表头的列数，构造二维数组
		var rownum=_columns.length
		for(var i=0;i<_clock;i++){
			if(i<_merge.length)
				rownum-=_merge[i]==0?1:_merge[i];
			else
				rownum-=1;
		}
		var headarr=_buildHeadArr(_columns.length-rownum,rownum,maxlevel)
		// 解决表头scrollLeft最大值不足的问题
		var fixscrolldiv='<div class="clockrow" style="width:10000000px;height:1px;overflow:hidden"></div><div style="display:block;width:10000000px;height:1px;font-size:1px;overflow:hidden"></div>';
		if(_multiHead){
			// 多层表头
			_head.innerHTML=_buildMultiHeadHTML(headarr,_columns.length-rownum)+fixscrolldiv;
		}
		else{
			// 单层表头
			_head.innerHTML=_buildSingleHeadHTML(headarr,_columns.length-rownum)+fixscrolldiv;
		}

		return _fixHeadTable(_head);
	}
	
	function _fixHeadTable(headdiv){
		// 为了保证表头内文字水平居中，这里通过span的lineHeight样式设置成与外层td高度一致的方法来控制
		var headcells=headdiv.getElementsByTagName('span'),tdobj,coltd=[],rowSpan
		function getheight(){return headdiv.firstChild.offsetHeight/headdiv.firstChild.rows.length}
		var baselinehieght=getheight();
		baselinehieght=baselinehieght<4?baselinehieght:baselinehieght-4
		for(var i=0;i<headcells.length;i++){
			headcell=headcells.item(i);
			if(headcell.getAttribute('colflag')=="true"){
				coltd.push(headcell);
				rowSpan=parseInt(headcell.parentElement.rowSpan,10);
				if(rowSpan>1){
					headcell.style.lineHeight=baselinehieght+"px";
				}
				
			}
		}
		return coltd;
	}
	
	//是否计算过表头宽，减少计算次数。
	var isCalHeadWidth=false;
	//开始计算列宽
	function _calculationHeadWidth(){
		_fixcolumnwidth();
		return
		if(isCalHeadWidth)return;
		var autocol=[];
		var maxwidth=_tagdiv.offsetWidth;
		//挑出自适应列宽  同时计算均分的最大列宽
		for(var i=0;i<_columns.length;i++){
			if(_columns[i].width=='auto'){
				autocol.push(_columns[i]);
			}else{
				maxwidth-=_columns[i].width;
			}
		}
		if(_rs.size()==0){
			//均分
			var pw=300;
			if(maxwidth>autocol.length*50){
				//获取平均值同时需要小于最大列宽
				pw=(maxwidth/autocol.length)<pw?(maxwidth/autocol.length):pw;
			}else{
				pw=50;
			}
			if(isNaN(pw)) pw=50;
			for(var i=0;i<autocol.length;i++){
				autocol[i].width=pw;
			}
		}else{
			var rscol=_rs.getColNames();
			var maxColDataLength=_rs.getMaxColDataLength();
			//根据内容设置列宽
			for(var i=0;i<autocol.length;i++){
				autocol[i].width=_rs.getMaxLength(autocol[i].name)*12+20;
			}
		}
		//列宽必须大于等于 最小列宽
		for(var i=0;i<_columns.length;i++){
			if(_columns[i].width<_columns[i].minwidth)
				_columns[i].width=_columns[i].minwidth
		}
		isCalHeadWidth=true;
	}
	// 创建一个隐含的表头，用于计算表头宽度
	function _buildColHead(){

		var hw=0;
		var cw=0;
		var _colsize=_columns.length;
		//开始计算列宽
		_calculationHeadWidth();
		var i=0;
		//合并的要计算整个合并中最大的列
		for(;i<_clock;i++){
			cw+=isNaN(_columns[i].width)?_columns[i].minwidth:_columns[i].width;
			i=nextColumnId(i)-1;
		}
		for(;i<_colsize;i++){
			hw+=(isNaN(_columns[i].width)&&_columns[i].width>_columns[i].minwidth)?_columns[i].width:_columns[i].minwidth;
			i=nextColumnId(i)-1;
		}
		_head.style.width=(hw)+'px';
		
		// 创建可调整宽度的表头
		var cols=[]
		
		// 构造_head区域的表头部分
		cols=cols.concat(_buildCrossDiv());
		cols=cols.concat(_buildHeadDiv());
		// _layout();
		// 生成锁定、列宽调整按钮
		if(_headsort){
			_buildSortColHead(cols,0,_columns);
		}
		if(_headCol){
			_buildColWidth(cols);
		}
		if(true){
			_buildHeadMenu(cols,0,_columns);
		}
		if(_coldrag){
			_buildColDrag(cols)	
		}
	}
	function _buildColDrag(cols){
		if(_head.initColDrag) return;
		_head.attachEvent('onselectstart',function(en){
			if(_column_width_modify_) return;
			var headel=null,colindex,el=en.srcElement,_fixX=0,endcolindex=0;
			// 找到被拖动表头对象
			while(_head.contains(el)){
				if(el.colindex!=null) colindex=parseInt(el.colindex,10);
				if(el.tagName=='TD'){
					_fixX=el.offsetLeft;
					headel=el;
					break;
				}
				el=el.parentElement;
			}
			if(headel.className.charAt(0)=='m') return;
			var tablebody=_tagdiv.parentElement;
			var dragel=document.createElement('DIV');
			dragel.className='h';
			dragel.innerHTML='<table border=0 cellSpacing=0 cellPadding=0><tr><td class="c">'+headel.innerHTML+'</td></tr></table>'
			dragel.style.position='absolute';
			dragel.style.display='block';
			dragel.style.top=(_head.offsetHeight-(_clockrow>0?(_tbodyHeight*_clockrow):0))+'px';
			dragel.innertop=dragel.style.top
			tablebody.appendChild(dragel);
			endcolindex=colindex;
			
			var insertflagel=document.createElement('DIV');
			var outsideel=document.createElement('DIV');
			    outsideel.style.cssText="border:2px dotted #c0e1e3;position:absolute;font-size:12px;padding:2px;margin-left:3px;display:none"
			    outsideel.innerHTML=headel.innerText;
			var left=parseInt(headel.currentStyle.borderLeftWidth,10);
			insertflagel.style.cssText='height:'+dragel.offsetHeight+'px;width:1px;border-left:2px dashed #999;position:absolute;left:-'+(isNaN(left)?0:left)+'px;top:0px'
			
			function dragHead(en){
				if(en.srcElement==insertflagel) return;
				
				if(tablebody.contains(en.srcElement)){
					// 在表格内部拖拽表头
					var p=Ext.lt.HTML.positionedOffset(en.srcElement,tablebody,false);
					dragel.style.left=(p.left+en.offsetX)+'px'
					dragel.style.top=dragel.innertop;
					
					var el=en.srcElement;
					while(_head.contains(el)){
						if(el.colindex!=null) endcolindex=parseInt(el.colindex,10);
						if(el.tagName=='TD' && el.className.charAt(0)!='m'){
							el.appendChild(insertflagel)
							break;
						}
						el=el.parentElement;
					}
					outsideel.style.display='none'
					dragel.style.display=''
				}
				else{
					// 将表头拖出
					var p=Ext.lt.HTML.positionedOffset(en.srcElement,document.body,false);
					outsideel.style.left=(p.left+en.offsetX)+'px'
					outsideel.style.top=(p.top+en.offsetY)+'px'
					outsideel.style.display=''
					dragel.style.display='none'
					document.body.appendChild(outsideel);
				}
			}
			
			function enddragHead(en){
				dragel.removeNode(true);
				outsideel.removeNode(true);
				insertflagel.removeNode(true);
				document.detachEvent('onmouseup',enddragHead);
				document.detachEvent('onmousemove',dragHead);
				
				if(dragel.style.display=='') _table.swapColumn(colindex,endcolindex);
				if(outsideel.style.display=='') Ext.lt.message.send('datatable','dragheadout',_columns[colindex]);
			}

			document.attachEvent('onmousemove',dragHead);
			document.attachEvent('onmouseup',enddragHead);
			
		});
		_head.initColDrag=true
	}
	
	
	var _mouseImgStyle='onmouseover="this.runtimeStyle.filter=\'alpha(opacity=70);\'" onmouseout="this.runtimeStyle.filter=\'\'"'
	// 创建可调整宽度的表头
	var _column_width_modify_=false;
	function _buildColWidth(hcols){
		for(var sindex=0,end=hcols.length;sindex<end;sindex++){
			if(_columns[sindex].isDef)continue;
			var col=hcols[sindex];
			// 追加表头宽度调整区域
			var colindex=parseInt(col.getAttribute('colindex'),10);// 把属性修改成数字型
			
			// 生成调整宽度的按钮
			col.datatable=table;
			col.colindex=colindex;
			col.colcofig=_columns[colindex];
			col.onselectstart=function(){return false};
			if(_userwid) {
				col.ondblclick = function(){
					var x=this.offsetWidth-Ext.lt.HTML.positionedOffset(event.srcElement,this).left-event.offsetX
					if(x>20 || x<0) return true;
					Ext.lt.cache.removeData(_tableid+this.colcofig.name);
					if (this.colcofig.oldwidth != null) this.colcofig.width = this.colcofig.oldwidth;
					_table.redraw();
				}
			}
			col.onmousemove=function(){
				var x=this.offsetWidth-Ext.lt.HTML.positionedOffset(event.srcElement,this).left-event.offsetX
				if(x<15 && x>0){
					this.style.cursor="w-resize";
				}
				else{
					this.style.cursor="";
				}
			}
			col.onmousedown=function(){
				var x=this.offsetWidth-Ext.lt.HTML.positionedOffset(event.srcElement,this).left-event.offsetX
				if(x>10 || x<0) return true;
				this.style.cursor='w-resize'
				
				var ss=this;
				ss.start=window.event.screenX;
				// 生成辅助线
				var linediv=this.datatable._linediv
				
				if(linediv==null){
					linediv=document.createElement('DIV');
					linediv.style.cssText='position:absolute;width:1px;height:1000000px;top:0px;left:0px;border-left:1px dotted #666666;';
					this.datatable._linediv=linediv
				}
				linediv.style.display='';
				var p=Ext.lt.HTML.positionedOffset(window.event.srcElement,_tagdiv.parentElement,false);
				linediv.initleft=p[0]+window.event.offsetX
				linediv.style.left=(p[0]+window.event.offsetX)+'px';

				_tagdiv.parentElement.appendChild(linediv);
				var initwidth=ss.colcofig.width;

				document.body.onmousemove=function(en){
					var wc=window.event.screenX-ss.start;
					linediv.style.left=(linediv.initleft+wc)+'px';
				}
				document.body.onmouseup=function(){
					// 关闭辅助线
//					var o=mousecol[ss.id.substring(0,ss.id.lastIndexOf('_'))];
//					table.setObj(o);
					var zoom=table.getZoom();
					linediv.style.display='none';
					// 重新计算列宽
					var wc=window.event.screenX-ss.start;
					if((ss.colcofig.width+wc)<ss.colcofig.minwidth){
						wc=ss.colcofig.minwidth-ss.colcofig.width;
					}
					ss.colcofig.width=ss.offsetWidth+wc;
					// 修改列宽样式单
					_buildColWidthCSS(ss.colindex,ss.colcofig.width);
					// 保存新宽度 lp 20130309
					if (_userwid) {
						Ext.lt.cache.setData(_tableid+ss.colcofig.name, ss.colcofig.width);
					}
					// 删除鼠标事件
					document.body.onmouseup=null;
					document.body.onmousemove=null;
					// 刷新表格
					table.redraw();
					//_layout();
					// 发送列宽调整消息
					Ext.lt.message.send('datatable','onColumnWidthChange',{datatable:table,columnindex:ss.colindex,column:ss.colcofig});
					document.body.releaseCapture();
					// 由于排序事件在这个事件之后触发，因此，采用延时方式修改标记位
					setTimeout(function(){_column_width_modify_=false},10);
				}
				_column_width_modify_=true;
				event.cancelBubble=false;
			};
		}
	}
	
	function _sortColumn(config){
		var col=config.headobject,asc;
		var s1=new Date();
		if(col.clock){
			col.clock=false;
			return;
		}
		
		asc=(config.asc==null)?true:(config.asc)?false:null;		
						
		if(config.onbeforesort!=null){
			var r=config.onbeforesort(config,_table,asc);
			if(r==false) return;
		}

		Ext.lt.message.send("datatable","sort",col.id)
		var s2=new Date();

		var fs=col.getElementsByTagName("font");
		var f=null;
		
		for(var i=0;i<fs.length;i++){
			if(fs[i].name=='sort'){
				f=fs[i];
				break;
			}
		}
		if(f==null)return;
		if(_funfilter['colsort']!=null){if(_funfilter['colsort'](table,_rs,col,_maxdata))return ;}
		var fv=null;
		
		if(config.asc==null){
			f.className='btn_up';
		}else{
			if(config.asc){
				f.className='btn_down';
			}else{
				f.className='btn_none';
			}
		}
		config.asc=asc;
		
		if(config.onbeforedatasort!=null && config.onbeforedatasort(config,_table,config.asc)==false){
			// 跳过排序
		}
		else{
			_sortData(config.name,config.asc);
		}
		
		_reflash();		
		if(_debug) window.status='排序:'+(s2-s1)+'  绘制:'+(new Date()-s2);
	}
	
	function _sortData(colname,asc){
		var config=_columns_all['col:'+colname];
		switch(config.datatype){
			case 'S':fv= Ext.lt.util.fnbind(config._formartValue,config);break;
			case 'D':fv= Ext.lt.util.fnbind(config._formartValue,config);break;
			case 'N':fv=function(v){return parseFloat(v,10)};break;
			case 'F':fv=function(v){return parseFloat(v,10)};break;
			case 'I':fv=function(v){return parseInt(v,10)};break;
		}
		if(asc==null){
			_rs.sort(null,true,null);
		}
		else{
			_rs.sort(config.name,asc,fv);
		}
	}
	
	// 向表头中的各个列添加排序功能
	function _buildSortColHead(hcols,sindex,_col){
      
		for(var end=hcols.length;sindex<end;sindex++){
			var col=hcols[sindex];
			var colindex=parseInt(col.getAttribute('colindex'),10);
			col.colconfig=_columns[colindex];
			col.colconfig.headobject=col;

			var f=document.createElement("font");
			f.name='sort';
			f.className='btn_none'
			col.appendChild(f);
			col.sort=true;
			if(_columns[sindex].isDef)continue;
			col.onclick=function(){
				if(_column_width_modify_) return;
				var col=this;
				window.setTimeout(function(){
					var colindex=parseInt(col.getAttribute('colindex'),10);
					_sortColumn(_columns[colindex]);					
				},1);
				this.style.cursor=null;
			}
			if(col.colconfig != null && col.colconfig.asc!=null)f.className=col.colconfig.asc?'btn_up':'btn_down'
		}
	}
	// 表头菜单
	function _buildHeadMenu(hcols,sindex,_col){
	
		for(var end=hcols.length;sindex<end;sindex++){
			var col=hcols[sindex];
			if(col.colconfig==null){
				if(_columns[sindex]._col){
					col.colconfig=_columns[sindex]._col;
				}
				else{
					col.colconfig=_columns[sindex];
				}
			}
			col.oncontextmenu =function(){
				var _c=this;
				var datas=[];
				var _menucol=table.getCol(_c.colindex);
				if(_menucol.isDef){
					if(_allowclock){
				//		datas.push({id:4,name:'锁定',code:'cs1',pid:0,ico:'/ltext/images/datatable/menulock.gif'});
						var tempclock=_c.getAttribute('clockindex')
						if(_clock!=parseInt(tempclock)+1){
							datas.push({id:5,name:'锁定',code:'cs1',pid:0,click:function(){
									table.clockColumnSize(parseInt(tempclock)+1);
							},icoclass:'btn_lock35'});
						}else{
							datas.push({id:6,name:'解锁',code:'cs1',pid:0,click:function(){
									table.clockColumnSize(0);
							},icoclass:'btn_unlock35'});
						}
					}
				
				
					if(_menucol.name!="_locationposition"){
						datas.push({id:1,name:'选中项置顶',code:'cs1',pid:0,click:function(){
							Ext.lt.message.send("datatable","sort",_c.id)
							var f=null;
							var fs=_c.getElementsByTagName("font");
							for(var i=0;i<fs.length;i++){
								if(fs[i].name=='sort'){
									f=fs[i];
								}
							}
							if(f==null)return;
							if(_funfilter['colsort']!=null){if(_funfilter['colsort'](table,_rs,col,_maxdata))return ;}
							var fv=function(v){return parseInt(v,10)};
							f.className='btn_down';
							_rs.sort('check',false,fv);
							_reflash();
						}});
					}
				}else{
					if(_headsort){
					//	datas.push({id:1,name:'排序',code:'cs1',pid:0,ico:'/ltext/images/datatable/menuorder.gif'});
						datas.push({id:2,name:'升序',code:'cs1',pid:0,click:function(){
							_c.colconfig.asc=null;
							_c.onclick();
						},icoclass:'btn_up35'});
						datas.push({id:3,name:'降序',code:'cs1',pid:0,click:function(){
							_c.colconfig.asc=true;
							_c.onclick();
						},icoclass:'btn_down35'});
						datas.push({id:8,name:'还原',code:'cs1',pid:0,click:function(){
							_c.colconfig.asc=false;
							_c.onclick();
						},icoclass:'btn_none35'});
					}
					if(_allowclock){
				//		datas.push({id:4,name:'锁定',code:'cs1',pid:0,ico:'/ltext/images/datatable/menulock.gif'});
						var tempclock=_c.getAttribute('clockindex')
						if(_clock!=parseInt(tempclock)+1){
							datas.push({id:5,name:'锁定',code:'cs1',pid:0,click:function(){
									table.clockColumnSize(parseInt(tempclock)+1);
							},icoclass:'btn_lock35'});
						}else{
							datas.push({id:6,name:'解锁',code:'cs1',pid:0,click:function(){
									table.clockColumnSize(0);
							},icoclass:'btn_unlock35'});
						}
					}
					if(_c.colconfig.filter && _c.colconfig.onfilter!=null){
						datas.push({id:7,name:'过滤',code:'cs1',pid:0,icoclass:'btn_menufilting35',click:function(){
							var col=_c.colconfig
							col.onfilter(filterwindow,filterwindowdiv,_rs,_rs_bak);
							filterwindow.show();
						}});
					}
					if(_allowcustom){
						_columns_bak=_columns_bak.concat(_columns);
						for(var i=0,l=_columns_bak.length;i<l;i++) _columns_bak['col_'+_columns_bak[i].name]=_columns_bak[i];
						
						datas.push({id:10,name:'|',code:'cs1',pid:0});
						datas.push({id:9,name:'自定义...',code:'cs1',pid:0,click:function(){
							var configwindowdiv=document.createElement('DIV');
							configwindowdiv.style.cssText='width:400px;height:500px;display:block;overflow:hidden';
							document.body.appendChild(configwindowdiv);
							var configwindow=new Ext.lt.window({title:'<font style="font-weight:bold;color:#012A3A;font-size:14px">表格配置</font>',fitmode:'content',pop:true,mark:true,className:'wind7',bodystyle:'padding:0px;overflow:hidden'});
							configwindow.draw(configwindowdiv);
							configwindowdiv.innerHTML='<div style="width:100%;height:460px;display:block"></div><div class="dt_configbg" style="width:100%;height:40px;display:block;text-align:center;"><button style="width:80px;height:25px;margin:5px">保存</button><button style="width:80px;height:25px;margin:5px">取消</button></div>'
							
							var columnconfigrs=new Ext.lt.recordset({columns:['name','alias','width','check'],datas:[]});
							var colnames=[],tempcol;
							for(var i=0,l=_columns.length;i<l;i++) colnames[_columns[i].name]=1;
							for(var i=0,l=_columns_bak.length;i<l;i++){
								tempcol=_columns_bak[i];
								columnconfigrs.addData({'name':tempcol.name,'alias':tempcol.alias,'width':tempcol.width,'check':colnames[tempcol.name]});
							}
							var configtable=new Ext.lt.editdatatable(columnconfigrs);
							configtable.setCols([
								configtable.columns['checkbox'],
								{name:'name',alias:'列编码',width:100},
								{name:'alias',alias:'列名称',width:'auto',width:175,edit:true},
								{name:'width',alias:'宽度',datatype:'I',width:60,edit:true}
							]);
							configtable.mousedrag(false);
							configtable.setClassName('dttheme_ifmis');
							configtable.draw(configwindowdiv.firstChild);
							
							var btn=configwindowdiv.getElementsByTagName('BUTTON');
							// 保存按钮
							btn.item(0).onclick=function(){
								_columns=[];
								var tempcol,colname=[];
								columnconfigrs.each(function(d){
									if(d['check']!=1) return;
									tempcol=_columns_bak['col_'+d['name']];
									tempcol.alias=d.alias;
									colname.push(d['name']);
									_columns.push(tempcol);
								})
								_table.redraw();
								
								// 想cookie中写入数据
								Ext.lt.cookie.add('dtcolumn_'+_tableid,Object.toJSON(colname));
								configwindow.close();
							}
							// 取消按钮
							btn.item(1).onclick=function(){
								configwindow.close();
							}
							
							
						},icoclass:''});
					}
				}
				var m=Ext.lt.Popupmenu({
					data:datas,
					field:{id:'id',name:'name',code:'code',sid:'pid'}
					});
				var d=document.getElementById('datatablemenu');
				if(d==null){
					var d=document.createElement('div');
					document.body.appendChild(d);
					d.id='datatablemenu';
				}
				
			
				//设置坐标
				var colp=Ext.lt.HTML.positionedOffset(_c,_tagdiv.parentElement,false)
				_tagdiv.parentElement.appendChild(d)
				
				d.style.left=(colp.left-(_clock<_c.colindex?_head.scrollLeft:0)+1)+'px';
				d.style.top=(_head.firstChild.offsetHeight)+'px';
				d.style.visibility='visible';
				m.draw(d);
				return false;
			}
		}
	}
	
	function _searchwordinbody(divobj){
		if(_searchword!=null&&divobj!=null){
			var els=divobj.all,el,nodes,node,textnodes=[];
			for(var n=0,m=els.length;n<m;n++){
				el=els.item(n);
				if(el.children.length==0 && el.childNodes.length==1){
					textnodes.push(el);
				}
			}
			textnodes.each(function(textnode){textnode.innerHTML=textnode.innerHTML.replace(_searchword,'<font class="sw">$1</font>');});
		}	
	}
	
	function _buildClockRow(){
			var crdbuf=[],crgbuf=[],hwidth=_head.offsetWidth,cwidth=_cross.offsetWidth,colsize=_columns.length;
			
			for(var cline=0;cline<_clockrow;cline++){
				_buildline(cline,crdbuf,crgbuf,hwidth,cwidth,_clockrs==null?_rs:_clockrs,colsize);
			}
		  _head.children.item(1).innerHTML=crdbuf.join('');
		  _cross.children.item(1).innerHTML=crgbuf.join('');
		  _head.children.item(1).style.height='auto';
		  _cross.children.item(1).style.height='auto';	
	}
	
	// 创建初始化的表格
	function _buildInitTable(){
		var hwidth=function(){return _head.firstChild==null?_head.offsetWidth:_head.firstChild.offsetWidth}();
		var cwidth=function(){return _cross.firstChild==null?_cross.offsetWidth:_cross.firstChild.offsetWidth}();
		
		function aa(){
			_div.innerHTML='<div class="dt_divtable"></div>';
			_gather.innerHTML="";
			_tab=_div.firstChild;
			
			var divs=_div.parentElement.children;
			for(var i=1,li=divs.length;i<li;i++){
				_div.parentElement.lastChild.removeNode(true);
			}
		};
		aa();
		_tbody=[];




		// 生成数据区域
		var colsize=_columns.length;
		var dbuf=['<div style="position:absolute;top:-100px">'];
		var gbuf=['<div>'];
		var id = null;
		var j=0

		// 无论多大的表格只构造前200行，产生第一个tbody
		var i=0
		var tmpdata;
		_buildline(0,dbuf,gbuf,hwidth,cwidth,_rs,colsize,true);
		dbuf.push('</div>');
		gbuf.push('</div>');

		var temphtml=dbuf.join("");
		
		setInnerHTML(_tab,dbuf.join(""));
		
		function getCssHeight(){
			var h=parseInt(_tab.firstChild.firstChild.currentStyle.height,10);
			var pt=parseInt(_tab.firstChild.firstChild.currentStyle.paddingTop,10);
			var pb=parseInt(_tab.firstChild.firstChild.currentStyle.paddingBottom,10);
			return (isNaN(h)?24:h)+(isNaN(pt)?0:pt)+(isNaN(pb)?0:pb)
		}
		function getOffsetHeight(){                                                       
			var cellstyle=_tab.firstChild.firstChild.firstChild.currentStyle;
			return (parseInt(cellstyle.height,10)+parseInt(cellstyle.borderTopWidth,10)+parseInt(cellstyle.borderBottomWidth,10))*loop;			
		};

		try{
			_tbodyHeight=getCssHeight();
			if(isNaN(_tbodyHeight)) _tbodyHeight=getOffsetHeight();
			// 此处有bug，等待以后处理
		}catch(e){
			_tbodyHeight=23  // 默认23个像素
		}
		
		// 生成锁定行
		if(_clockrow>0){
			_buildClockRow();
		}
		else{
		  _head.children.item(1).style.height='0px';
		  _cross.children.item(1).style.height='0px';
		}
		
		_fixFillDataArea();

		// 计算数据区域大小，撑出滚动条
		_tab.style.display='block';
		var h=_tbodyHeight*(_rs.size()+(_rs.getgroupsize()>0?10:0))+_head.offsetHeight+20,divp=0,divh=1000000,fixhdiv=_div;
		do{
			fixhdiv.style.height=(h>divh?divh:h)+'px';
			h-=divh;
			fixhdiv=document.createElement('DIV');
			fixhdiv.style.cssText='display:block;height:0px;width:10px';
			_div.parentElement.appendChild(fixhdiv);
		}while(h>0);
		
		
		// 控制数据区到表格底部的高度
		if(correction!=null){
			fixhdiv.style.marginBottom=correction+'px';
		}else{
			fixhdiv.style.marginBottom=fixhdiv.parentNode.parentNode.clientHeight/2+'px';
		}
	}
	
	function setInnerHTML(obj,html){
		if(obj!=null)
		obj.innerHTML=html
	}
	
	// 填充一行数据
	function _buildline(i,buf,gbuf,hwidth,cwidth,_rs,colsize,demoflag){
			var id = _tableid+'_l'+i;
			var odd=(i%2==0)?'odd':'';
			var sdd=''
			var tmpdata=_rs.getData(i);
			if(demoflag==null) demoflag=false;
			if(i==0 && tmpdata==null) tmpdata={}


			cwidth+=10
			if(tmpdata==null) return;
			if(_defaultcolumns.checkbox.id!=null){
				sdd=(tmpdata[_defaultcolumns.checkbox.name]==1)?'style="background:'+_selectlinestyle+'"':'';
			}
			if(_defaultcolumns.radio.id!=null){
				sdd=(tmpdata[_defaultcolumns.radio.name]==1)?'style="background:'+_selectlinestyle+'"':'';
			}
			
			buf.push('<span class="',odd,' l " style="width:',(_head.firstChild.offsetWidth+10),'px">');
			gbuf.push('<span class="',odd,' l " style="width:1000000px">');
			var j=0,c=0,nc=0,v,_column;
			for(;j<_clock;j++){
				_column=_columns[c];
				if(_column==null) continue;
				_column.rstype='clockrowset'
				gbuf.push('<span class="c c',c,' ',_column.datatype,' ',_column.rowspan(i,c,tmpdata),'" ',_column.style,' ',sdd,'>');
				nc=nextColumnId(c);
				if(nc-c>1){
					// 处理和并列
					for(;c<nc;c++){
						_column=_columns[c];
						gbuf.push('<font class="m">',(demoflag?'':_column._fn(i,c,tmpdata)),'</font>');
					}
				}
				else{
					gbuf.push((demoflag?'':_column._fn(i,c,tmpdata)));
					c++;
				}
				gbuf.push('</span>');
				_column.rstype='';
			}
			for(;c<colsize;c++){
				_column=_columns[c];
				_column.rstype='clockrowset'
				buf.push('<span id="',id,'_c',c,'_hd" class="c c',c,' ',_column.datatype.substring(0,1),' ',_column.rowspan(i,c,tmpdata),'" ',_column.style,' ',sdd,'>');
				nc=nextColumnId(c);
				if(nc-c>1){
					// 处理和并列
					for(;c<nc;c++){
						_column=_columns[c];
						buf.push('<font id="',id,'_c',c,'_hg">',(demoflag?'':_column._fn(i,c,tmpdata)),'</font>');
					}
					c--;
				}
				else{
					buf.push((demoflag?'':_column._fn(i,c,tmpdata)));
				}
				buf.push('</span>');
				_column.rstype='';
			}
			buf.push('</span>');
			gbuf.push('</span>');
	}
	
	// 清除填充标志重新绘制表格
	function _reflash(){
		_showdatadiv.show=false
		
		_buildInitTable();
		_fixDivWidth();

		_divscroll(true);
	}
	
	function _reflashcell(l,c){
		var suffix='_d';
		if(c<_clock) suffix='_g';
		var cell=document.getElementById(_tableid+'_l'+l+'_c'+c+suffix);
		if(cell==null) return null;
		var d=_rs.getData(l);
		cell.innerHTML=_columns[c]._fn(l,c,d);
	}
	
	// 刷新可见区数据，只重新填出单元格数据，不重绘整个区域
	function _reflashViewData(){
		if(_clock>0) _reflashAreaData(_showclockdiv);
		_reflashAreaData(_showdatadiv);
	}
	
	function _reflashAreaData(area){
		var line=area.firstChild;
		var l,c,id,data,tableidlength=_tableid.length,html
		do{
			id=line.id;
			if(id.length>tableidlength){ 
				l=parseInt(id.split('_')[1].substring(1),10);
				data=_rs.getData(l);
				
				var cell=line.firstChild;
				do{
					id=cell.id;
					c=parseInt(id.split('_')[2].substring(1),10);
					sv=cell.getAttribute('standvalue');
					if(sv!=data[_columns[c].name]+''){
						cell.innerHTML=_columns[c]._fn(l,c,data);
						cell.setAttribute('standvalue',sv);
					}
					cell=cell.nextSibling;
				}
				while(cell!=null)
				
				
				
			}
			line=line.nextSibling;
		}while(line!=null)	
	}
	
	
	// 刷新锁定行数据
	function _reflashClockRow(){
		_buildClockRow();
	}
	
	// 计算个区域的位置
	function _layout(){
		var left=0,top=0,p=0
		var zoom=_zoom;
		if(isNaN(zoom)){
			zoom=1
		}
		var iescrollbar=16*zoom;
		_tagdiv.style.zoom=zoom;
		_head.style.zoom=zoom;
		_gather.style.zoom=zoom;
		_cross.style.zoom=zoom;
		_showdatadiv.style.zoom=zoom;
		
		// 控制滚动条布局
		_tagdiv.style.width=_tagdiv.parentElement.offsetWidth/zoom;
		_tagdiv.style.height=_tagdiv.parentElement.offsetHeight/zoom;
		//处理zoom 改变时候，压横向纵向滚动条或者边线的问题
		if(zoom != null && zoom >1.5) _tagdiv.style.width=( (_tagdiv.parentElement.offsetWidth)/zoom-10);
		if(zoom != null && zoom >1.5) _tagdiv.style.height=( (_tagdiv.parentElement.offsetHeight)/zoom-10);

		var h=0,_hs=_head.children;
		for(var i=0;i<_hs.length;i++) {
			h+=_hs.item(i).offsetHeight;
		}
		
		_head.style.height=h+'px'

		_cross.style.top='0px';
		if(_drawed && _clock>0){
			_cross.style.height=_head.offsetHeight+'px';
			_cross.style.width=_clockwidth+'px';
			_cross.realheight=_head.offsetHeight
			_cross.realwidth=_clockwidth;
			_cross.style.overflow='hidden';
			var ch=_cross.firstChild;
			ch.style.float='right';
			ch.style.marginLeft=(_clockwidth-ch.offsetWidth)+'px';
			ch.nextSibling.style.marginLeft=(_clockwidth-ch.offsetWidth)+'px';
			left=(_clockwidth-p);
			_head.style.oldborderLeftWidth=_head.style.borderLeftWidth;
			_head.style.borderLeftWidth='0px';
		}
		else{
			_cross.style.width='0px';
			_cross.realwidth=0;
			_cross.style.overflow='visible';
			var ch=_cross.firstChild;
			ch.style.float='';
			ch.style.marginLeft='';
			ch.nextSibling.style.marginLeft='';
			var oldleftwidth=_head.style.oldborderLeftWidth;
			if(oldleftwidth!=null)_head.style.borderLeftWidth=oldleftwidth;
		}
		
		top=_head.offsetHeight;
		_div.style.marginLeft=left+'px';
		
		var _fixscrollwidth=_tagdiv.offsetHeight<_tagdiv.firstChild.offsetHeight?iescrollbar:0;
		var _fixscrollheight=_tagdiv.offsetWidth-_cross.offsetWidth-_fixscrollwidth<_tagdiv.firstChild.offsetWidth?iescrollbar:0;
		if(_fixscrollheight>0) _fixscrollwidth=_tagdiv.offsetHeight-_fixscrollheight<_tagdiv.firstChild.offsetHeight?iescrollbar:0;
		
		_fixscrollwidth>0?_tagdiv.style.overflowY='scroll':_tagdiv.style.overflowY='hidden';
		_fixscrollheight>0?_tagdiv.style.overflowX='scroll':_tagdiv.style.overflowX='hidden';
		
		_head.style.left=(left*zoom)+'px';
		var _headwidth=0
		if(_cross.currentStyle.width=='0px'&&_cross.offsetWidth>0){
			_headwidth=(_cross.parentElement.offsetWidth/zoom-0)-_fixscrollwidth-1;
		}else{
		 	_headwidth=(_cross.parentElement.offsetWidth/zoom-_cross.offsetWidth)-_fixscrollwidth-1;
		}
		_head.style.width=_headwidth>0?_headwidth+'px':'0px';
		
		_gather.style.top=(top*zoom-1)+'px';
		_gather.style.width=(left+1)+'px';
		var _gatherheight=(_head.parentElement.offsetHeight/zoom-4-_head.offsetHeight-_fixscrollheight)
		_gather.style.height=_gatherheight>0?_gatherheight+'px':'0px';
		
		// 第一行一定生成到不压线的位置
		_showdatadiv.style.top=(top*zoom-1)+'px';
		//这行干啥用啊？
		//_showdatadiv.style.left=(left*zoom-((_drawed&&_clock>0)?(_showdatadiv.firstChild!=null?Ext.lt.HTML.getBorderSet(_showdatadiv.firstChild).left:0):0))+'px';
		_showdatadiv.style.left=left*zoom+'px';
		_showdatadiv.style.width=(_head.offsetWidth)<0?0:(_head.offsetWidth)+'px';
		_showdatadiv.style.height=(_gather.offsetHeight-1)<0?'0px':((_gather.offsetHeight-1)+'px');
		_fixFillDataArea()
		_fixDivWidth();
		_fixAlign()
	}
	
	// 计算数据显示区域大小
	function _fixFillDataArea(){
		if(_tbodyHeight>0){
			_initFillLine=Math.ceil((_showdatadiv.offsetHeight/_tbodyHeight))
			_initFillLine=_initFillLine<1?2:_initFillLine;
			_initFillWidth=_head.offsetWidth+100;
		}
	}
	
	// 计算表格位置经常重复计算
	function _position(){
		var p=Ext.lt.HTML.getBorderSet(_tagdiv.parentElement);
		_resize(_tagdiv.parentElement.offsetWidth-p.width,_tagdiv.parentElement.offsetHeight-p.height);
	}
	
	function _init(d){
		var h=d.offsetHeight,w=d.offsetWidth,dborder=Ext.lt.HTML.getBorderSet(d);
		d.style.overflow='hidden';
		d.style.position='relative';
		
		_tagdiv.style.height=(h-dborder.height)+'px';
		_tagdiv.style.width=(w-dborder.width)+'px';

		d.appendChild(_tagdiv);
		
		// 产生表格列设置
		if(_columns.length==0){ 
			var cs=_rs.getColNames();
			for(var i=0, loop=cs.length;i<loop;i++){
				var c={};
				c["name"]=cs[i];
				_addCol(c);
			}
		}

		filterwindow=new Ext.lt.window({title:'<font style="font-weight:bold;color:#012A3A;font-size:14px">列过滤</font>',fitmode:'content',pop:true,mark:true,className:_filterwindowstyle,bodystyle:'padding:0px;overflow:hidden',autoshow:false});
		filterwindowdiv=document.createElement('DIV');
		filterwindowdiv.style.cssText='width:250px;height:350px;display:block;overflow:hidden';
		document.body.appendChild(filterwindowdiv);
		filterwindow.draw(filterwindowdiv);
		if(_rs_bak==null) _rs_bak=_rs.toArray();

		_initCol();
		d.className +=' '+_tableid;
		d.setAttribute('datatableid',_tableid);
		_buildCSS();
		_buildDiv();

		_buildColHead()	
		// 估算整个数据区域大小
		_buildInitTable();
		
		_fixDivWidth();
		_fixAlign();
	}
	
	var _fixalignwidth=0;
	function _fixAlign(){
		if(_align!='center') return;
		// 表格尚未创建完毕
		if(_div.firstChild==null) return;
		// 获取实际数据区域宽度
		var datawidth=_gather.offsetWidth+_div.firstChild.offsetWidth;
		var maxwidth=_tagdiv.parentElement.offsetWidth;
		_fixalignwidth=0
		if(datawidth<maxwidth-26){
			_fixalignwidth=(maxwidth-datawidth-26)/2
		}
		else{
			_fixalignwidth=0
		}
		if(_fixalignwidth<0){
			_fixalignwidth=0;
		}
		var fixalignwidth=(_fixalignwidth)+'px'
		_tagdiv.style.marginLeft=fixalignwidth
		_tagdiv.style.width=(maxwidth-_fixalignwidth*2)+'px'
		_cross.style.marginLeft=fixalignwidth
		_gather.style.marginLeft=fixalignwidth
		_showdatadiv.style.marginLeft=fixalignwidth
		_head.style.marginLeft=fixalignwidth
	}
	
	function _fixDivWidth(){
		// 计算当前显示页面
		if(_div.firstChild!=null && _div.firstChild.firstChild!=null && _div.firstChild.firstChild.firstChild!=null){
			var cs=_div.firstChild.firstChild.firstChild.children,w=0;
			for(var i=0,l=cs.length;i<l;i++){
				w+=cs.item(i).offsetWidth;
			}
			_div.style.width=(w+5)+'px';
		}
	}
	
	// 向指定DIV中画表格
	function _drawto(d){
		_renderdiv=d;
		_init(d);
		_position(true);

		// 设置跟踪滚动条位置进行二次填充的方法
		
		_layout();
		if(_clockrow>0){
			_buildClockRow();
		}
		if(_preclock>0){
			_drawed=true;
			table.clockColumnSize(_preclock);
			_drawed=false;
			_preclock=0;
		}
		else{
			_divscroll();
			_layout();
		}

		if(_debug){
			_tagdiv.attachEvent("onscroll",_showScrollValue);
			_tagdiv.attachEvent("onmousewheel",_showScrollValue);
		}		
		//显示跟着鼠标走的显示行号的div;
		if(_showLine){
			_tagdiv.attachEvent("onscroll",_showScrollLine);
		}
		if(_mousedrag) _initMousedrag();

	}
	
	// 重新设置DataTable显示区域的大小
	function _resize(w,h){
		if(w<2) w=2
		if(h<0) h=1
		
		// 修改DataTable区大小
		var _tagdivborder=Ext.lt.HTML.getBorderSet(_tagdiv);
		_tagdiv.style.height=(h-_tagdivborder.height>0?h-_tagdivborder.height:0)+'px';
		_tagdiv.style.width=(w-_tagdivborder.width+_fixalignwidth>0?w-_tagdivborder.width+_fixalignwidth:0)+'px';
		_dtWidth=_tagdiv.offsetWidth;
		_dtHeight=_tagdiv.offsetHeight;
		
		var p=_tagdiv.parentElement;
		p.style.width=_dtWidth+'px';
		p.style.height=_dtHeight+'px';
		_layout()
		_divscroll();
		_fixcolumnwidth();
		
	}

	
	
	// 增加主题切换快捷键
	var _theme=function(){
		
		var _DTThemeWindow = new Ext.Window({
				width : 600,
				height : 500
			});
		_DTThemeWindow.show();
		
		var body=_DTThemeWindow.body.dom;
		var btn,t;
		for(var i=0;i<_themes.length;i++){
			t=_themes[i];
			btn=document.createElement('<li style="width:150px;line-height:24px;font-size:14px;padding-left:10px;cursor:pointer;display:block;float:left;"></li>');
			btn.innerHTML='<a href="#">'+t.title+'</a>';
			btn.dtclassname=t.className;
			btn.onclick=function(){
				table.setClassName(this.dtclassname);
			}
			body.appendChild(btn);
		}
		
	}
	
	Ext.lt.regKeyEvent('t',_theme,true,true);
	Ext.lt.regKeyEvent('h',_theme,true,true);
	
	function _redrawCross(){
	
		_stopdivscroll=true;
		_cross.style.width=0;
		var n=_clock;
		if(n>0){
				if(_clockwidth<0) _clockwidth=0;
				var w=0
				_clockwidth=0
				var c0=_div.firstChild.firstChild.firstChild.children.item(0);
				var cellborderwidth=c0.offsetWidth-_columns[c0.id.split('_')[2].substr(1)].width;
				for(var i=1;i<=n;i++){
					w+=_columns[_toColumnId(i)].width;
				}
				w+=cellborderwidth*n;
				_clockwidth=w;
				
				_tagdiv.scrollLeft-=w;
			}
		else{
			_clockwidth=-1;
			_clock=0;
		}
		if(_clockwidth>0){
			_cross.style.width=_clockwidth;
			_cross.style.overflow='hidden';
		}
		else{
			_cross.style.width='auto';
			_cross.style.overflow='visible';
		}
		_stopdivscroll=false;	
		
	}
	
	table ={};
	_table=table
		table.version="3.5";
		table.type="datatable";
		_tableid="datatable"+lt.getNextSeqValue();
		table.id=_tableid;
		Ext.lt.datatableMap[_tableid]=table;
		table.setDebug=function(mode){
			_debug=mode;
			if(_debug){
				document.body.attachEvent("onclick",_showEvent);
			}
		}
		table.setTableId=function(newid){
			_tableid=newid
			table.id=newid;
		}
		
		// 设置列
		table.setCols=function(c){
			
			try{
				var colnames=eval(decodeURIComponent(Ext.lt.cookie.get('dtcolumn_'+_tableid)));
				if(colnames!=null){
					colnames=[];
					for(var i=0,l=colnames.length;i<l;i++) colnames['col_'+colnames[i]]=true
					
					var tmpcols=[];
					for(var i=0,l=c.length;i<l;i++) if(colnames['col_'+c[i].name]) tmpcols.push(c[i]);
					
					c=[];
					c=c.concat(tmpcols);
				}
			}catch(e){}
			
			_columns_all=[];
			_columns=[];
			if(lt.isArray(c)){for(var n=0;n<c.length;n++){_addCol(c[n]);}}
			else{_addCol(c);}
			
		}
		table.getCol=function(i){
			return	_getCol(i);
		}
		table.setColMapper=function(c){
			_columnMapper=c;
		}
		
		table.getColMapper=function(){
			return	_columnMapper;
		}
		
		table.destory=function(){
			// 删除HTML对象
			_renderdiv.innerHTML='';
			// 删除样式
			_renderdiv.className=_renderdiv.className.replace(' '+_tableid,'').replace(' '+_classname,'');
			table.style.cssText='';
			table.style.owningElement.removeNode(true);

			delete Ext.lt.datatableMap[_tableid];
		}
		
		// 向指定区域显示
		table.draw=function(d){
			if(_drawed){
				
			}
			else{
				// 删除旧表格实例
				var tdid=d.getAttribute('datatableid');
				var oldtable=Ext.lt.datatableMap[tdid];
				if(oldtable!=null){
					oldtable.destory();
				}

				//var start = new Date();
				if(d.tagName!='DIV') return;
				_drawto(d);
				d.datatable=table;
				d.datatableid=_tableid;
				d.ignorelayout=true;
				d.ignoreexpand=true;
				Ext.lt.message.send("datatable","drawed",table);
			}
			_drawed = true;
		}
		
		table.position=function(){
			if(_drawed) _position();
		}
		
		table._resizing=false;var _resizew=1;_resizeh=1;
		table.resize=function(w,h){
			if(!_drawed) return;
			_resizew=w;_resizeh=h;

			var rw=w;
			var rh=h;
			// 改成每次调用时调整高度
			_resize(rw,rh);
			var z=this.getZoom();
			this.setZoom(1);
			this.setZoom(z);
		}
		
		table.clockColumnSize=function(n){
			if(n<0) n=0;
			
			if(!_drawed){
				_preclock=n;
			}
			else{
				_stopdivscroll=true;
				if(n>0){
					if(_clockwidth<0) _clockwidth=0;
					if(n>_clock){
						// 通过基准行计算锁定列位置
						var clockheadcell=_div.firstChild.firstChild.firstChild.children.item(n-_clock-1)
						var left=clockheadcell.offsetLeft+clockheadcell.offsetWidth+(Ext.lt.documentmode>7?-1*Ext.lt.HTML.getBorderSet(clockheadcell.parentElement,['border']).left:Ext.lt.HTML.getBorderSet(clockheadcell,['border']).left);
						var scorllleft=_tagdiv.scrollLeft;
						_clockwidth+=left-(_clockwidth>0?0:scorllleft);
						_tagdiv.scrollLeft-=left;
					}
					else{
						var w=0
						var cellborderwidth=_div.firstChild.firstChild.firstChild.children.item(0).offsetWidth-_columns[_toColumnId(_clock+1)].width;
						for(var i=_clock;i>n;i--){
							w+=_columns[_toColumnId(i)].width+cellborderwidth;
						}
						_clockwidth-=w;
						_tagdiv.scrollLeft-=w;
					}
					_clock=n;
				}
				else{
					if(_clock>0){
						_tagdiv.scrollLeft+=_cross.firstChild.offsetWidth-_cross.offsetWidth;
					}
					_clockwidth=-1;
					_clock=0;
				}
				_stopdivscroll=false;
				Ext.lt.message.send("datatable","clockcolumn",{clockcolumn:n});
				table.redraw();
			}

		}
		table.clockRealColumnSize=function(n){
			var clock=0;
			for(var i=0;i<n;i=nextColumnId(i)) clock++;
			table.clockColumnSize(clock);
		}

		table.clockRowSize=function(n){
			if(n<0) n=0;
			_clockrow=n;
			table.redraw();
		}
		
		table.setClockRowSet=function(rs){
			if(rs.type!='recordset'){
				alert('设置的数据集类型不是recordset')
				return ;
			}
			_clockrs=rs;
			_clockrs._rstype='clockrow'
			_clockrow=rs.size();
		}
		
		table.getClockRowSet=function(){
			return _clockrs
		}
		// 设置是否显示合计行 lp20130326
		table.setHasTotal = function(flag){
			_hastotal = flag;
		}
		table.getClockRowSize=function(){
			return _clockrow;
		}
		table.reflash=function(l,c){
			if(_clockrow>0) _reflashClockRow();
			if(l=='viewdata'){
				_reflashViewData()
			}
			else if(l!=null && c!=null){
				_reflashcell(l,c);
			}
			else{
				_reflash();
				_layout();
			}
		}
		
		// 只刷新数据
		table.reflashdata=function(l,c){
			if(_clockrow>0) _reflashClockRow();
			if(l=='viewdata'){
				_reflashViewData()
			}
			else if(l!=null && c!=null){
				_reflashcell(l,c);
			}
			else{
				_reflashViewData(true);
			}
		}
		table.setClickRowSelect=function(b){
			_clickRowSelect=false==b;
		}
		table.redraw=function(){
			if(_drawed){
				//_tagdiv.parentElement.innerHTML='';
				_head.innerHTML=''
				_merge_init=null;
				_initCol();
				_buildCSS();
				_buildColHead();
				//没有考虑锁定列重新绘制。
				_redrawCross();
				_reflash();
				_layout();
				_divscroll(true);	
				//_fixcolumnwidth();
			}
		}
		
		table.mergeColumn=function(n){
			if(n==null){
				n=[0];
			}
			else{
				if(n<0) n=0
				
				if(typeof(n)=='number'){
					_merge=[n]
				}
				else{
					_merge=n;
				}
			}
			_merge_init=null;
		}
		
		table.getZoom=function(v){
			return _zoom;
		}
		
		table.setZoom=function(v){
			if(!_drawed) return;
			v=parseFloat(v,10);
			if(isNaN(v)) v=1;
			if(v<=0) v=1;
			_zoom=v;
			_layout();
			_doscroll();
		}
		
		table.headsort=function(b){
			_headsort=b&&true;
		}
		
		table.getCols=function(){
			return _columns;
		}
		table.getAllCols=function(){
			return _columns_all;
		}
		table.clearCols=function(){
			_columns.clear();
		}
		table.onEvent=function(en,f){
			if(_events[en]==null){
				return false;
			}
			else{
				_events[en]=f;
				return true;
			}
		}
		
		table.addMapperDatas=function(cn,datas){
			for(i=0,j=_columns.length;i<j;i++){
				if(_columns[i].name==cn){
					_columns[i].addMapperDatas(datas)
					break;
				}
			}
		}
		
		table.setClassName=function(cn){
			if(cn!=null)	_classname=cn;
			if(!_drawed) return ;
			
			_tagdiv.parentElement.className=table.id+' '+cn;
			_tagdiv.className=cn;
			_cross.className=cn;
			_buildColHead();
			_layout();
		}
		table.setSelectClassName=function(cn){
			if(cn!=null)_selectlinestyle=cn;			
		}
		var _clickselected=false;
		var _editSelectCheckbox=true;
		table.setEditSelectCheckbox=function(t){
			_editSelectCheckbox=t;
		}
		table.clickselected=function(t){
			_clickselected=t;
			var selectedline=t==true?-1:{};
			
			function func_selectedline(param){
				var l=param[2];
				if(table.id!=param[0].id){
					return;
				}
				if(_clickselected==true){
					if(selectedline==l){
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+selectedline+'_g'),'')
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+selectedline+'_d'),'')
						selectedline=-1;
					}
					else{
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),_selectlinestyle)
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),_selectlinestyle)
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+selectedline+'_g'),'')
						_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+selectedline+'_d'),'')
						_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),'')
						_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),'')
						selectedline=l
					}
					
				}
				else if(_clickselected=='n'){
					if(selectedline['l'+l]==null) selectedline['l'+l]=false;
					selectedline['l'+l]^=true
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),selectedline['l'+l]?_selectlinestyle:'')
					_drawSelectLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),selectedline['l'+l]?_selectlinestyle:'')
					_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),'')
					_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),'')
				}
				
			}
			
			Ext.lt.message.hook("datatable","onclick",func_selectedline)
			Ext.lt.message.hook("datatable","onmouseup",func_selectedline)
		}
		table.setAllowClock=function(t){
			_allowclock=true==t;
		}
		table.setAllHeadWidth=function(t){
			table.setAllowHeadWidth(t);
		}
		table.setAllowHeadWidth=function(t){
			_headCol=true==t;
		}
		table.setAllowLineHeight=function(t){
			_allowlineheight=true==t;
			if(_allowlineheight ){
				if(_events['onmouseover']==null) _events['onmousemove']=function(){}
				if(_events['ondblclick']==null) _events['ondblclick']=function(){}
			}
		}
		table.setColumndrag=function(t){
			_coldrag=true==t;
		}
		table.drawMultiHead=function(t){
			_multiHead=true==t;
		}
		table.showLine=function(b){
			_showLineCol=null;
			_showLineFn=null;
			if(b==null)b=false;
			_showLine=false!=b;
			
			if(typeof(b)=='boolean'){
				return;
			}
			if(typeof(b)=='function'){
				_showLineFn=b;
			}else if(typeof(b)=='string'){
				_showLineCol=b;
			}else if(typeof(b)=='number'){
				_showLineCol=table.getCol(b).name;
			}
		}
		table.setLayout=function(l){
			if(l!=null) _tagdiv.parentElement.setAttribute('layout',l);
			Ext.lt.message.hook("layout","endlayout",function(){
				_layout();
				_divscroll();
			})
		}
		table.setMouselight=function(color){
			_highlightcolor=color
		}
		
		table.mousedrag=function(opt){
			_mousedrag=opt;
			if(opt) _initMousedrag();
		}
		
		table.columns=_defaultcolumns;
		
		table.setFnFilter=function(fnname,fn){
			if(Ext.isFunction(fn))
			_funfilter[fnname]=fn;
		}
		table.clearFnFilter=function(){
			_funfilter=[];
		}
		table.setMaxData=function(ml){
			if(ml>0)
			_maxdata=ml;
		}
		table.gatMaxData=function(){
			return _maxdata;
		}
		table.setFilter=function(filter){
			_rs.setFilter(filter);
			table.reflash();
		}
		
		table.clearFilter=function(){
			_rs.clearFilter();
			table.reflash();
		}
		
		table.remove=function(filter){
			var d=_rs.query(filter);
			_rs.remove(d);
			table.reflash();
		}
		table.getbody=function(){
			return _div;
		}
		table.subsort=function(){
			_rs.sortobj();
			table.reflash();
		}
		table.setObj=function(o){
			return;
			if(o==null)return;
			_columns=o.col;
			_tableid=o._tableid;
			//_rs=o._rs;
			_tab=o._tab;
			_head=o._head;
			_cross=o._cross;
			_gather=o._gather;
			_div=o._div;
			//_tbody=o._tbody;
			_tagdiv=o._tagdiv;
		}
		
		
		// 表格搜索工具
		table.setKeysearch=function(flag){
			_keysearch=flag==true;
			var tab=this;
			Ext.lt.regKeyEvent('sh',function(){tab.showSearchwindow()},false,true);
		}
		
		var _searchWindow=null;
		function _initSearchWindow(){
			if(_searchWindow!=null) return;
			
			var dt=table;
			// 生成界面
			var searchWindow=document.createElement('DIV');
			searchWindow.className='datatable_searchwindow';
			searchWindow.style.cssText='display:none';
			Ext.lt.HTML.expand(searchWindow);
			searchWindow.setInnerHTML('<table border="0"><tr><td class="drag"></td><td><input type="text" tipstext="请输入查找文字..." value=""></td><td><button>上一个</button></td><td><button>下一个</button></td><td><button>关闭</button></td></tr></table>');
			document.body.appendChild(searchWindow);
			var tds = searchWindow.getElementsByTagName('TD');
			
			// 生成对象引用
			searchWindow.dragdt=tds.item(0);
			searchWindow.inputbox=tds.item(1).firstChild;
			searchWindow.prebtn=tds.item(2).firstChild;
			searchWindow.nextbtn=tds.item(3).firstChild;
			searchWindow.closebtn=tds.item(4).firstChild;
			searchWindow.table=table
			
			// 生成动作
			var lastkeyup=null;
			Ext.lt.HTML.drag({element:searchWindow.dragdt,holder:false,dragel:searchWindow});
			searchWindow.inputbox.onkeyup=function(){
				lastkeyup=new Date();
				var value=this.value
				setTimeout(function(){if(new Date()-lastkeyup>300){searchWindow.table.setSearchWord(value)}},400);
				
			}
			searchWindow.prebtn.onclick=function(){searchWindow.table.goPreSearchWord()};
			searchWindow.nextbtn.onclick=function(){searchWindow.table.goNextSearchWord()};
			searchWindow.closebtn.onclick=function(){searchWindow.inputbox.value='';searchWindow.table.clearSearchWord();searchWindow.style.display='none'};
			
			_searchWindow=searchWindow;
		}
		
		table.showSearchwindow=function(){
			_initSearchWindow();
			_searchWindow.style.display='';
			_searchWindow.style.top='0px';
			_searchWindow.style.left='0px';
			_searchWindow.inputbox.fireEvent('onfocus');
			_searchWindow.inputbox.focus();
		}
		
		var last_l=0,last_c=0;
		table.setSearchWord=function(str){
			last_l=0,last_c=0
			if(str==null){
				this.clearSearchWord();
				return null;
			}
			
			if(str.trim()==''){
				this.clearSearchWord();
				return null;
			}
			
			try{
				_searchword=eval('/('+str.replace(/\./gi,'\\.').replace(/\*/gi,'.*').replace(/\?/gi,'.?')+')/gi');
				table.reflash();
			}catch(en){}
		}
		
		table.clearSearchWord=function(){
			_searchword=null;
			table.reflash();
		}
		
		
		function _tagSearchWord(last_l,last_c,data){
					var	v=_columns[last_c]._fn(last_l,last_c,data);
					
					if(_searchword.test(v)){						
						_table.gotoCell(last_l,last_c-1,function(cell){
							// _doscroll(true)
							var cell=document.getElementById(_tableid+'_l'+last_l+'_c'+last_c+'_d');
							if(cell==null) cell=document.getElementById(_tableid+'_l'+last_l+'_c'+last_c+'_g');
							if(cell!=null){
								var fts=cell.getElementsByTagName('FONT');
								for(var i=0,l=fts.length;i<l;i++){
									if(fts.item(i).className=='sw'){
										fts.item(i).className+=' swf'
										break;
									}
								}
							}
						
						});
						

						// 设置纵向滚动条位置
						// _tagdiv.scrollTop=_getScrollTop((last_l-1)*23,false);
						// 设置横向滚动条位置
						// var left=0;
						// for(var i=0;i<last_c;i++) left+=_columns[i].width
						// _tagdiv.scrollLeft=left;
						return true;
					}
					return false
		}
		
		
		table.goPreSearchWord=function(){
			if(_searchword==null) return;
			var colsize=_columns.length;
			for(last_l=last_l<0?_rs.size()-1:last_l;last_l>-1;last_l--){
				var data=_rs.getData(last_l);
				for(last_c=last_c<0?colsize-1:last_c;last_c>-1;last_c--){
					if(_tagSearchWord(last_l,last_c,data)) {
						if(--last_c==colsize){last_l--;last_c=colsize-1}
						this.gotoCell(last_l,last_c+1,function(){});
						return {l:last_l,c:last_c+1};
					}
				}
			}
			if(last_l==-1 && last_c==-1){
				alert('已经搜索完毕');
				last_l=_rs.size()-1,last_c=colsize-1;
			}
		}
		
		table.goNextSearchWord=function(){
			if(_searchword==null) return;
			var colsize=_columns.length;
			for(last_l=last_l==_rs.size()?0:last_l;last_l<_rs.size();last_l++){
				var data=_rs.getData(last_l);
				for(last_c=last_c==colsize?0:last_c;last_c<colsize;last_c++){
					
					if(_tagSearchWord(last_l,last_c,data)){
						if(++last_c==colsize){last_l++;last_c=0}
						this.gotoCell(last_l,last_c-1,function(){});
						return {l:last_l,c:last_c-1};
					}
				}
			}
			
			if(last_l==_rs.size() && last_c==colsize){
				alert('已经搜索完毕');
				last_l=0,last_c=0;
			}
		}
		
		
		table.goto=function(l){
			if(l==null) return;
			if(l<1) l=1;
			_tagdiv.scrollTop=_getScrollTop((l-1)*_tbodyHeight,false);
		}
		
		table.setAlign=function(c){
			if(c=='center'){
				_align='center';
			}
			else{
				_align='left'
			}
		}
		table.getAlign=function(){
			return _align;
		}

		table.setDragFlag=function(v){
		    _dragflag=v;
		}
		table.getDragFlag=function(){
		    return _dragflag;
		}
		
		table.getclockColumnSize=function(){
			return _clock;
		}
		
		table.getrealclockColumnSize=function(){
			return _toColumnId(_clock);
		}
		
		// 返回单元格对象 l-行 c-列
		table.gotoCell=function(l,c,fn,b){
			if(l>=_rs.size()||l<0) return;
			//c=c<0?0:c;
			if(c-_clock>_div.firstChild.firstChild.firstChild.children.length) return;
			if(b){
				var cell_top=_tbodyHeight*l;
				if(cell_top<_tagdiv.scrollTop){
					_tagdiv.scrollTop=cell_top;
				}
				else if(cell_top-_tagdiv.scrollTop-_showdatadiv.offsetHeight>_tbodyHeight*-1){
					_tagdiv.scrollTop+=_tbodyHeight;
				}
				if(c>=_clock){
					var cell_col=_div.firstChild.firstChild.firstChild.children.item(c-(_clock==null?0:_clock));
					var cell_left=cell_col==null?0:cell_col.offsetLeft;
					if(cell_left<_tagdiv.scrollLeft){
						_tagdiv.scrollLeft=cell_left;
					}
					else if(cell_left>_tagdiv.scrollLeft+_showdatadiv.offsetWidth-(cell_col==null?0:cell_col.offsetWidth)){
						_tagdiv.scrollLeft=cell_left-_showdatadiv.offsetWidth*.4;
					}
				}
			}else{
				var cell_top=_tbodyHeight*l;
				if(cell_top-_tagdiv.scrollTop-_showdatadiv.offsetHeight>_tbodyHeight*-1||cell_top<_tagdiv.scrollTop){
					table.goto(l);
				}
				
				var sl=0;
				if(c>=_clock){
					var citems=_div.firstChild.firstChild.firstChild.children;
					for(var i=_clock;i<c;i++){
						sl+=citems.item(i-_clock).offsetWidth;
					}
					sl=sl-_showdatadiv.offsetWidth*.4;
					if(sl+_tagdiv.offsetWidth>=_tagdiv.scrollWidth){
//						var pos=Ext.lt.HTML.positionedOffset(_tagdiv,_tagdiv.parentNode,false);
						sl=_tagdiv.scrollWidth-_tagdiv.clientWidth-9;
					}
					_tagdiv.scrollLeft=sl;
				}
			}
			//debugger;
			// 使用延时等待页面重新绘制
			setTimeout(function(){
				fn(document.getElementById(_tableid+'_l'+l+'_c'+c+'_'+(c<_clock?'g':'d')))
				table.fixPositionByDatadiv();
			},1);
		}
		
		table.setRecordset=function(rs){
			if(rs.type!='recordset'){
				alert('设置的数据集不是Ext.lt.recordset类型');
				return ;
			}
			_rs=rs
			_rs.bindTable(table);
		}
		table.getRecordSet=function(){
			return _rs;
		}
		
		// 获取表格行对象
/*
获取表格行对象
通过行对象可以对整行进行整体操作，如设置行背景色等
*/
		table.getline=function(l){
			// 超出数据范围
			if(l<0 || l>=_rs.size()) return;
			var line={l:l};
			line.getData=function(){return _rs.getData(this.l);}
			line.goto=function(){table.gotoCell(this.l,0)};
			line.setbgcolor=function(){};
		}
		
	table.getDataWidth=function(){
		return _gather.offsetWidth+_div.firstChild.offsetWidth;		
	}
	table.getRecordset=function(){
		return _rs;		
	}
	table.setAllowcustom=function(t){
		_allowcustom=t==true;
		if(_allowcustom==true && Ext.lt.editdatatable==null){
			alert('没有加载可编辑表格');
		}
	}
//鼠标拖动行
	var _linedrop=false;
	var _linedropobj=null;
	var _linedropdiv=null;
	function _drawLineBorder(obj,color){
		if(_linedropobj==null){return;}
		if(color==''){
			obj.runtimeStyle.borderTop='';
		}else{
			obj.runtimeStyle.borderTop="1px #000 solid";
			var p=Ext.lt.HTML.positionedOffset(obj,_tagdiv.parentNode,false)
			_linedropdiv.style.top=p.top+obj.offsetHeight+5;
		}
	}
	function _linedropStart(tabel,el,l,c){
		if(!_linedrop||_linedropobj!=null) return;
		_linedropobj = l;
	//	
		var valuediv=document.getElementById(table.id+'_l'+l+'_d');
		_linedropdiv = valuediv.cloneNode(true);
		_linedropdiv.id="_linedropdiv";
		
		_tagdiv.parentNode.appendChild(_linedropdiv);
		_linedropdiv.className+=' dt_linedrop';
		var p=Ext.lt.HTML.positionedOffset(valuediv,_tagdiv.parentNode,false)
		_linedropdiv.style.top=p.top+valuediv.offsetHeight+5;
		//_rs.remove(_linedropobj);
	}
	function _linedropEnd(tabel,el,l,c){
		if(!_linedrop||_linedropobj==null) return;
		//_rs.remove(_linedropobj);
		
		//_rs.addData(_linedropobj,l-2);
		_rs.moveTo(_linedropobj,l);
		_linedropobj=null;
		_tagdiv.parentNode.removeChild(_linedropdiv);
		_linedropdiv=null;
		_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_g'),'');
		_drawLineBgcolor(document.getElementById(table.id+'_l'+l+'_d'),'');
		Ext.lt.message.send("datatable","linedrop",l);
	}
	
	// 启用鼠标随动单元格
	var _mousecelldiv=document.createElement('DIV');
	var _mousecellflag=false;
	_mousecelldiv.className='dt_mousecell';
	_mousecelldiv.style.lineHeight='1px';
	_mousecelldiv.style.display='block';
	_mousecelldiv.borderwidth=4
	_mousecelldiv=Ext.lt.aninmation(_mousecelldiv)
	_mousecelldiv.top=0;
	_mousecelldiv.left=0;
	
	function _mouselightcell(tabel,el,l,c){
		if(!_mousecellflag) return;

		var celltype=el.id.split('_')[3];
		if(celltype=='g'){
			_gather.appendChild(_mousecelldiv);
		}
		else{
			_showdatadiv.appendChild(_mousecelldiv);
		}
		
		var p=Ext.lt.HTML.positionedOffset(el,celltype=='g'?_gather:_showdatadiv);
		/*
		_mousecelldiv.style.top=(p.top)+'px'
		_mousecelldiv.style.left=(p.left)+'px'
		_mousecelldiv.style.width=el.offsetWidth-_mousecelldiv.borderwidth;
		_mousecelldiv.style.height=el.offsetHeight-_mousecelldiv.borderwidth;
		*/
		_mousecelldiv.line=l
		_mousecelldiv.column=c
		_mousecelldiv.celltype=celltype
		_mousecelldiv.setAnimatProperty('style.top',_mousecelldiv.top,p.top);
		_mousecelldiv.setAnimatProperty('style.left',_mousecelldiv.left,p.left);
		_mousecelldiv.setAnimatProperty('style.width',_mousecelldiv.offsetWidth,el.offsetWidth-_mousecelldiv.borderwidth);
		_mousecelldiv.setAnimatProperty('style.height',_mousecelldiv.offsetHeight,el.offsetHeight-_mousecelldiv.borderwidth);
		_mousecelldiv.play(100,function(){
			_mousecelldiv.top=p.top;
			_mousecelldiv.left=p.left;
		})
		
	}


	function _showmouselightcell(){
		if(!_mousecellflag) return;
		var celltype=_mousecelldiv.celltype;
		var el=document.getElementById(_tableid+'_l'+_mousecelldiv.line+'_c'+_mousecelldiv.column+'_'+celltype);
		if(el==null) return;
		
		if(celltype=='g'){
			_gather.appendChild(_mousecelldiv);
		}
		else{
			_showdatadiv.appendChild(_mousecelldiv);
		}
		
		var p=Ext.lt.HTML.positionedOffset(el,celltype=='g'?_gather:_showdatadiv);
		_mousecelldiv.style.top=(p.top)+'px'
		_mousecelldiv.style.left=(p.left)+'px'
		_mousecelldiv.style.width=el.offsetWidth-_mousecelldiv.borderwidth;
		_mousecelldiv.style.height=el.offsetHeight-_mousecelldiv.borderwidth;
	}

	table.setMouselightCell=function(flag){
		_mousecellflag=true==flag
		_showdatadiv.appendChild(_mousecelldiv);
		_mousecelldiv.borderwidth=Ext.lt.HTML.getBorderSet(_mousecelldiv).width;
	}
	
	// 将列调整到指定位置
	table.swapColumn=function(colid,toid){
		var newcolumn=[];
		if(colid==toid) return;
		// 转换为列名
		var srcColName=_columns[colid].name,toColName=_columns[toid].name;
		// 记录该列在整体列设置中的位置
		var srcCol=_columns_all['col:'+srcColName],srcColId=srcCol.colindex;
		var toCol=_columns_all['col:'+toColName],toColId=toCol.colindex;
		_columns_all.splice(srcColId,1,toCol);
		_columns_all.splice(toColId,1,srcCol);
		srcCol.colindex=toColId;
		toCol.colindex=srcColId;

		Ext.lt.message.send("datatable","swapcolumn",[table]);
		table.redraw();
	}
	
	// 按数据区位置调整表头和锁定区位置
	table.fixPositionByDatadiv=function(){
		var left=0,top=0;
		if(_head.fixscrollLeft==0){
			left=_showdatadiv.scrollLeft
		}
		else{
			left=_showdatadiv.scrollLeft-_head.fixscrollLeft;
		}
		_head.fixscrollLeft=_showdatadiv.scrollLeft;
		_head.scrollLeft+=left;

		top=_showdatadiv.scrollTop
		_showclockdiv.fixscrollTop=_showdatadiv.scrollTop;
		_showclockdiv.parentElement.scrollTop=top;
	}
	table.setLinedrop=function(boo){
		_linedrop=boo;
	}
	var _groupbycolumn=null;
	table.groupby=function(column,asc){
		asc=asc==false?false:true;
		if(column==null){
			// 清除分组
			_rs.cleargroup();
			table.redraw();
			return;
		}
		
		if(_groupbycolumn!=null) _columns.insert(_groupbycolumn,_groupbycolumn.index)
		for(var i=0;i<_columns.length;i++){
			if(_columns[i].name==column){
				_groupbycolumn=_columns[i];
				_groupbycolumn.index=i;
				_columns.splice(i--,1);
				break;
			}
		}
		
		_rs.groupby(column,asc);
		_rs.sort(column,true);
		
		table.redraw();
	}
	
	table.setBreakWord=function(flag){
		_breakword=flag==true
	}
	table.getTbodyHeight=function(){
		return _tbodyHeight;	
	}
	table.setDisplayColumn=function(cols){
		if(!Ext.lt.isArray(cols)) cols=[cols]
		var col,newcolumns=[]
		for(var i=0,li=cols.length;i<li;i++){
			col=cols[i];
			if(typeof(col)=='string'){
				cols['col:'+col]=true;
			}
			else{
				cols['col:'+col.name]=true;
			}
		}
		for(var i=0,li=_columns.length;i<li;i++){
			cols['col:'+_columns[i].name]=true;
		}
		
		for(var i=0,li=_columns_all.length;i<li;i++){
			if(cols['col:'+_columns_all[i].name]){
				_columns_all[i].display=true;
				newcolumns.push(_columns_all[i])
			}
		}
		_columns=newcolumns;
		table.mergeColumn();
		table.redraw();
		Ext.lt.message.send(_tableid,'DisplayColumn',{}); 
	}
	table.setOnescroll=function(b){
		onescroll=b==true;	
	}
	table.setHiddenColumn=function(cols){
		if(!Ext.lt.isArray(cols)) cols=[cols]
		
		var col,newcolumns=[]
		for(var i=0,li=cols.length;i<li;i++){
			col=cols[i];
			if(typeof(col)=='string'){
				cols['col:'+col]=true;
			}
			else{
				cols['col:'+col.name]=true;
			}
			
		}
		
		for(var i=0,li=_columns.length;i<li;i++){ if(cols['col:'+_columns[i].name]) 
		{ _columns[i].display=false; continue; } newcolumns.push(_columns[i]) } 
		_columns=newcolumns; table.mergeColumn(); table.redraw(); 
		Ext.lt.message.send(_tableid,'HiddenColumn',{}); 
	}
	
	_rs.bindTable(table);
	
	table.setFilterWindowStyle=function(cn){
		if(cn==null) return;
		_filterwindowstyle=cn;
	}

	
	// 创建treelistcolumn对象
	table.treelistcolumn=function(config){
		var datatable,rs;
		var cmp=Ext.lt.apply({},config);
		var _columns=cmp.columns;
		if(!Ext.lt.isArray(_columns)) _columns=[_columns];
		var levelcolumn=cmp.levelcolumn==null?'level':cmp.levelcolumn;
		// 自动处理级次，默认值为false，如果为true则在列对象初始化时自动计算每条数据的级次。计算规则为按提供的列对象顺序第一个值为null的字段即为级次
		var autolevel=cmp.autolevel==true;
		if(isNaN(cmp.rootlevel)) cmp.rootlevel=0;
		// 是否生成展开、折叠动作，默认为false数据全部显示，如果设置为true，则需要指定数据折叠状态字段、初始显示层次等属性
		cmp.treeaction=cmp.treeaction==true;
		// 设置行状态属性
		if(cmp.statcolumn==null) cmp.statcolumn='_stat';
		var statcolumn=cmp.statcolumn;
		
		if(cmp.isleafcolumn==null) cmp.isleafcolumn='_isleaf';
		var isleafcolumn=cmp.isleafcolumn;
		
		if(isNaN(cmp.initlevel)) cmp.initlevel=0;
		if(cmp.initlevel<0) cmp.initlevel=0;
		if(cmp.initlevel>_columns.length) cmp.initlevel=_columns.length-1;
		var initlevel=cmp.initlevel;
		
		var hiddencolumn=cmp.hiddencolumn==false;
		var _inited=false;
		var _rs_bak=null;
		
		
		cmp.init=function(){
			if(_inited) return;
			var cols=this._dt.getCols();
			for(var i=0,l=_columns.length;i<l;i++) _columns['c:'+_columns[i]]=1;
			for(var i=0,l=cols.length;i<l;i++){
				if(_columns['c:'+cols[i].name]==1) _columns['c:'+cols[i].name]=cols[i];
			}
			for(var i=0,l=_columns.length;i<l;i++) {
				_columns[i]=_columns['c:'+_columns[i]];
				_columns[i].display=hiddencolumn;
			}
			
			// 自动处理数据级次
			if(autolevel){
				function setlevel(rs,level){
					if(level>_columns.length) return;
					var stat=initlevel<1?'open':level<cmp.initlevel?'open':'close';
					var _level=level>0?level-1:0
					if(level==_columns.length){
						for(var i=0,l=rs.length;i<l;i++){
							rs[i][levelcolumn]=_level
							rs[i][statcolumn]=stat;
						}
					}
					else{
						var cname=_columns[level].name,d,nextleveldata=[];
						for(var i=0,l=rs.length;i<l;i++){
							d=rs[i];
							if(d[cname]==null){
								d[levelcolumn]=_level;
								d[statcolumn]=stat;
							}
							else{
								nextleveldata.push(d);
							}
						}
						level++
						setlevel(nextleveldata,level);
					}
					
				}
				setlevel(this._dt.getRecordSet().toArray(),0);
			}
			
			// 按照初始显示级次，过滤数据
			if(cmp.treeaction){
				_rs_bak=this._dt.getRecordSet().toArray();
				var _rs=this._dt.getRecordSet();
				var datas_bak=_rs_bak,datas=[],i=0,newrs=new Ext.lt.recordset({columns:_rs.getColNames(),'datas':[]});

				for(l=_rs.size()-1;i<l;i++){
					var d=datas_bak[i],level=d[levelcolumn];
					// 过滤显示级次数据
					if(initlevel<1 || level<initlevel){
						d['_srcposition']=i;
						datas.push(d);
					}
					
					// 计算是否末级数据
					var nd=datas_bak[i+1],nlevel=nd[levelcolumn];
					d[cmp.isleafcolumn]=nlevel>level;
					
				}
				
				var lastdata=datas_bak[i]
				if(initlevel<1 || lastdata[levelcolumn]<initlevel){
					lastdata['_srcposition']=i;
					datas.push(lastdata);
				}
				lastdata[cmp.isleafcolumn]=false;
				newrs.addData(datas);
				this._dt.setRecordset(newrs);
			}
			
			_inited=true;
		}

		cmp.fn=function(i,j,rs,value){
			var out=[];
			var level=rs[levelcolumn];
			if(isNaN(level)) level=0;
			var w=14*level,ctx='';
			if(cmp.treeaction){
				w+=20;
				if(rs[cmp.isleafcolumn]) ctx='<font class="btn '+(rs[cmp.statcolumn]=='open'?'open':'close')+'" treelistcolumnbtn="1" style="float:right"></font>';
			}
			out.push('<font class="treelist" style="width:',w,'px;text-align:right;">',ctx,'</font>');

			out.push(_columns[level]._fn(_columns[level].colindex,j,rs));
			
			return out.join('');
		}
		
		cmp.onclick=function(table,el,l,c,d){
			if(window.event.srcElement.getAttribute("treelistcolumnbtn")!='1') return;
			var level=d[levelcolumn];
			if(d[statcolumn]=='close'){
				var instdata=[];
				var i=d['_srcposition']+1;

				for(var loop=_rs_bak.length;i<loop;i++){
					var data=_rs_bak[i];
					if(data[levelcolumn]==level+1){
						data['_srcposition']=i;
						data[statcolumn]='close';
						instdata.push(data);
					}
					if(data[levelcolumn]<=level) break;
				}
				d[statcolumn]='open';
				table.getRecordSet().addData(instdata,l);
			}
			else if(d[statcolumn]=='open'){
				var f=true;
				d[statcolumn]='close';
				table.getRecordSet().delData(function(data){
					f=f && data[levelcolumn]>level;
					d[statcolumn]='close'
					return f
				},l+1);
			}
			
		}
		
		return cmp;
	}
	
	function _findMapperValueSet(col,attr,filter){
		var col=_columns_all['col:'+col];
		if(col==null) return null;
		var id=col.mapper.default_column;
		var iid=col.mapper.columns.indexOf(id),iattr=col.mapper.columns.indexOf(attr);
		var set=[],datas=col.mapper.datas,d,filterobj={};
		for(var i=0,li=datas.length;i<li;i++){
			d={};
			d[attr]=datas[i][iattr];
			d[id]=datas[i][iid];
			set.push(d);
		}
		filterobj[attr]=filter;
		set=set.dofilter(filterobj);
		var rs=[];
		for(var i=0,li=set.length;i<li;i++){
			rs.push(set[i][id]);
		}
		return rs;
	}
	table.setCorrectionHeight=function(h){
		correction=h;
	}
	// 表格数据查询方法
	table.query=function(filter){
		var t,valueset;
		for(var k in filter){
			t=k.split('.');
			if(t.length>1) {
				valueset=_findMapperValueSet(t[0],t[1],filter[k]);
				filter[k]=null;
				delete(filter,k);
				if(valueset!=null){
					filter[t[0]]=valueset;
				}
			}
		}
		return _rs.toArray().dofilter(filter);
	}
	// 表格拖动宽度保存
	table.saveColumnWidth=function(flag){
		table.setUserWid(flag)
	}
	table.setUserWid = function(flag) {
		_userwid = flag;
	}
	// 表格排序方法
	table.sortColumn=function(param){
		var colconfig;
		if(typeof(param)=='object'){
			// 按列对象处理
			colconfig=param;
		}
		else if(typeof(param)=='string'){
			// 按列名处理
			colconfig=_columns_all['col:'+param]
		}
		else if(typeof(param)=='number'){
			// 按列序号处理
			colconfig=table.getCols()[param];
		}
		
		if(colconfig!=null)_sortColumn(colconfig);
	}
	
	// 表格排序方法
	table.sortData=function(param,asc){
		var colname;
		if(typeof(param)=='object'){
			// 按列对象处理
			colname=param.name;
		}
		else if(typeof(param)=='string'){
			// 按列名处理
			colname=param;
		}
		else if(typeof(param)=='number'){
			// 按列序号处理
			colname=table.getCols()[param].name;
		}
		
		if(colname!=null)_sortData(colname,asc);
	}
	
	
	return table;
}
}