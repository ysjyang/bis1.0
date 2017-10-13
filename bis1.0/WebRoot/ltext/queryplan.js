Ext.lt.queryplan=function(cfg){
	var _cfg=Ext.lt.apply({queryData:[],planData:[],classname:'queryplan',w:10,h:10,el:null},cfg);
	_cfg.id='queryplan'+Ext.lt.getNextSeqValue();
	_cfg.bakdataid={};
	_cfg.bakdatacode={};
	function _addPlan(cfg,obj){
		var _d=document.createElement("div");
		var name=obj.planname;
		_d.code=obj.plancode;
		_d.itemid=obj.itemid;
		_d.className="item"
		_d.innerHTML="<div class='body'>"+name+"<font></font></div>"
		cfg.el.appendChild(_d);
		_d.onclick=function(){
			var obj=cfg.bakdatacode[this.code];
			Ext.lt.message.send('queryplan','click',{body:this,value:obj,cfg:cfg});
			this.className='selected';
			if(cfg.selectnode!=this&&cfg.selectnode!=null){
				cfg.selectnode.className='item';
			}
			cfg.selectnode=this;
		}
	}
	function _draw(cfg){
		cfg.el.className+=" "+cfg.classname;
		for(var i=0,l=cfg.planData.length;i<l;i++){
			var obj=cfg.planData[i]
			_addPlan(cfg,obj);
			cfg.bakdataid[obj.itemid]=obj;
			cfg.bakdatacode[obj.plancode]=obj;
		}
	}
	var queryplan={
		type:'queryplan',
		version:'1.0',
		cfg:_cfg,
		draw:function(div){
			if(!this.drawed){
				if(div!=null){this.cfg.el=div}
				_draw(this.cfg);
			}
		},
		resize:function(w,h){
		
		}
	};
	queryplan.setDefPlan=function(index){
		var sn=this.cfg.el.childNodes[index];
		this.cfg.selectnode=sn;
		sn.className='selected';
	}
	//关闭窗口。
	queryplan.close=function(){}
	//打开查询方案窗口。
	queryplan.show=function(){}
	//添加一个查询方案数据。
	queryplan.addPlan=function(obj){}
	//根据编码获取查询方案数据。
	queryplan.getPlan=function(code){}
	//根据编码获取查询方案的sql。
	queryplan.getPlan2Sql=function(code){}
	//修改一个查询方案数据。
	queryplan.updatePlan=function(obj){}
	//删除一个查询方案数据。根据编码或itemid删除，字符类型为编码、数字类型为itemid
	queryplan.removePlan=function(code){}
	//删除一个查询方案数据。根据编码或itemid删除，字符类型为编码、数字类型为itemid
	queryplan.setCount=function(code,num){
		var i=0;
		for(var l=this.cfg.planData;i<l;i++){
			if(this.cfg.planData[i].plancode==code){break}
		}
		this.cfg.el.childNodes[i].firstChild.lastChild.innerText="("+num+")"
	}
	return queryplan;
}