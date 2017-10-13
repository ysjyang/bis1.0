Ext.lt.collapsed=function(cfg){
	this.varsion='1.0';
	var _config=Ext.lt.apply({direction:'buttom',title:'',el:null,className:"collapsed",time:0},cfg);
	_config.id='collapsed'+Ext.lt.getNextSeqValue();
	var _id=_config.id;
	
	
	function _draw(cfg){
		var d=cfg.el;
		var top=document.createElement("div");
		var body=document.createElement("div");
		top.className="top"
		body.className="body"
		
		cfg.top=top;
		cfg.body=body;
		
		
		
		var sc="Height";
		var _sc="Width"
		if(cfg.direction=='left'||cfg.direction=='right'){
			sc='Width';
			_sc="Height"
		}
		cfg.sc=sc;
		cfg._sc=_sc;
		d.className+=(" "+cfg.className);
		if(d.id!=null){
			body.id=d.id;
		}
		d.id=cfg.id;
		var cn=d.childNodes;
		for(var i=0,l=cn.length;i<l;i++){
			body.appendChild(cn[i]);
		}
		d.appendChild(top);
		d.appendChild(body);
		cfg.sclength=d["offset"+sc]-top['offset'+sc];
		cfg.toplength=top['offset'+sc];
		cfg.open=true;
		body.style[sc.toLowerCase()]=cfg.sclength;
		top.style[_sc.toLowerCase()]=d["offset"+_sc];//-bodyborder[_sc.toLowerCase()]-topborder[_sc.toLowerCase()]-1
		body.style[_sc.toLowerCase()]=d["offset"+_sc];//-bodyborder[_sc.toLowerCase()]-topborder[_sc.toLowerCase()]-1
		if(cfg.time==0){
			cfg.time=cfg.sclength*1.5
		}
		
		top.style.position='absolute';
		body.style.position='absolute';
		top.style[cfg.direction]=0;
		body.style[cfg.direction]=cfg.toplength;
		if(cfg.direction=='left'||cfg.direction=='right'){
			top.style.top=0;
			body.style.top=0;
		}else{
			top.style.left=0;
			body.style.left=0;
		}
		
		
		top.onclick=function(){toCollapsed(cfg);}
		top.innerText=cfg.title;
	}
	
	function toCollapsed(cfg){
		var l=cfg.sclength+cfg.toplength;
		if(cfg.open){
			l=cfg.toplength;
		}
		var div=cfg.el
		Ext.lt.aninmation(div);
		div.setAnimatProperty('style.'+cfg.sc.toLowerCase(),cfg.el['offset'+cfg.sc],l);
		div.play(cfg.time)
		if(cfg.body.style.position=="relative"){
			div=cfg.body;
			Ext.lt.aninmation(div);
			if(cfg.open){l=0;}
			div.setAnimatProperty('style.'+cfg.sc.toLowerCase(),cfg.body['offset'+cfg.sc],l);
			div.play(cfg.time)
		}
		cfg.open=!cfg.open;
	}
	
	function _resize(w,h,cfg){
		cfg.el.style.width=w;
		cfg.el.style.height=h;
		cfg.top.style[cfg._sc.toLowerCase()]=cfg.el["offset"+cfg._sc]
		cfg.body.style[cfg._sc.toLowerCase()]=cfg.el["offset"+cfg._sc]
		cfg.sclength=d["offset"+cfg.sc]-top['offset'+cfg.sc];
		if(cfg.open){
			cfg.body.style[cfg.sc.toLowerCase()]=cfg.sclength;
		}else{
			cfg.el.style[cfg.sc.toLowerCase()]=cfg.toplength;
		}
	}
	
	var collapsed={
		version:'1.0',
		cfg:_config
	}
	
	collapsed.draw=function(div){
		if(this.cfg.el==null){
			this.cfg.el=div;	
		}
		_draw(this.cfg);
	}
	
	collapsed.resize=function(w,h){
		_resize(w,h,cfg);
	}
	
	return collapsed;
}

