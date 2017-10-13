if(Ext.lt.template == null){
 	Ext.lt.template = {};
 }
Ext.lt.template = {
	DefaultTemplate:function(config){
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
	 		var comps=config.main;
	 		config.el=el;
			if(comps!=null){
				if(!Ext.lt.isArray(comps))comps=[comps];
				for(var i=0,j = comps.length; i <j; i++){
					if(typeof(comps[i])=="string"){
						comps[i]=eval(comps[i]);
						comps[i].draw(el);
					}else{
						comps[i].draw(el);
					}
				}
			}
			if(el.className.indexOf("margingtop10")=="tpl_main margingtop10"){
				if("datatable"!=comps[0].type){
					el.className.indexOf("margingtop10")="tpl_main";
				}
			}
			var tpl=Ext.lt.template;
			Ext.lt.message.hook("layout","endlayout",function(){
				var comps=config.main;
				el=config.el;
				if(comps!=null){
					if(!Ext.lt.isArray(comps))comps=[comps];
					var els=el.childNodes;
					var h=el.offsetHeight;
					//alert(h);
					var w=el.offsetWidth;
					for(var i=0,j = comps.length; i <j; i++){
						if(typeof(comps[i])=="string"){
							tpl.resize(eval(comps[i]),w,h);
						}else{
							tpl.resize(comps[i],w,h);
						}
					}
				}
			})
		}
		return _cmp;
	}
	,layoutTemplate:function(config){
		var _cmp={};
		_cmp.resize=function(w,h){
		};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
	 		var comps=config.main;
	 		var heights=config.heights;
	 		if(heights==null){heights=[]}
	 		config.el=el;
			if(comps!=null){
				if(!Ext.lt.isArray(comps))comps=[comps];
				if(!Ext.lt.isArray(heights))heights=[heights];
				if(el.offsetWidth<200){
					w=200
				}else{
					w=el.offsetWidth;
				}
				var autoh=200;
				var html=[];
				for(var i=0,j = comps.length; i <j; i++){
					var h=heights[i]
					if(heights[i]==null||heights[i]=='auto'){
						h=autoh;
						//alert(h);
						heights[i]='"auto"';
					}
					html.push("<div style='width:",w,"px,height:",h,"px' layout='{w:{fit:true},h:{fit:",heights[i],"}}'></div>");
				}
				
				el.innerHTML=html.join('');
				var cn=el.childNodes;
				for(var i=0,j = comps.length; i <j; i++){
					if(typeof(comps[i])=="string"){
						eval(comps[i]).draw(cn[i]);
					}else{
						comps[i].draw(cn[i]);
					}
				}
			}
			var tpl=Ext.lt.template;
			Ext.lt.message.hook("layout","endlayout",function(){
				var comps=config.main;
				el=config.el;
				if(comps!=null){
					if(!Ext.lt.isArray(comps))comps=[comps];
					var els=el.childNodes;
					var h=el.clientHeight;
					//alert(h);
					var w=el.offsetWidth;
					for(var i=0,j = comps.length; i <j; i++){
						if(typeof(comps[i])=="string"){
							tpl.resize(eval(comps[i]),el.offsetWidth,els[i].offsetHeight);
						}else{
							tpl.resize(comps[i],el.offsetWidth,els[i].offsetHeight);
						}
						
					}
				}
			})
		}
		
		return _cmp;
	}
	,datatablelayoutTemplate:function(config){
		var _cmp={};
		_cmp.resize=function(w,h){
		};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
	 		var comps=config.main;
	 		var heights=config.heights;
	 		if(heights==null){heights=[]}
	 		config.el=el;
			if(comps!=null){
				if(!Ext.lt.isArray(comps))comps=[comps];
				if(!Ext.lt.isArray(heights))heights=[heights];
				if(el.offsetWidth<200){
					w=200
				}else{
					w=el.offsetWidth;
				}
				var autoh=200;
				var html=[];
				for(var i=0,j = comps.length; i <j; i++){
					var h=heights[i];
					//alert(h);
					if(heights[i]==null||heights[i]=='auto'){
						h=autoh;
//						alert(h);
						heights[i]='"auto"';
					}
					html.push("<div style='width:",w,"px,height:",h,"px'></div>");
				}
				
				el.innerHTML=html.join('');
				var cn=el.childNodes;
				for(var i=0,j = comps.length; i <j; i++){
					if(typeof(comps[i])=="string"){
						eval(comps[i]).draw(cn[i]);
					}else{
						comps[i].draw(cn[i]);
					}
				}
			}
			var tpl=Ext.lt.template;
			Ext.lt.message.hook("layout","endlayout",function(){
				var comps=config.main;
				el=config.el;
				if(comps!=null){
					if(!Ext.lt.isArray(comps))comps=[comps];
					var els=el.childNodes;
					var h=el.offsetHeight-400+"px";
					//alert(h);
					var w=el.offsetWidth;
					for(var i=0,j = comps.length; i <j; i++){
						if(typeof(comps[i])=="string"){
							tpl.resize(eval(comps[i]),el.offsetWidth,els[i].offsetHeight);
						}else{
							tpl.resize(comps[i],el.offsetWidth,els[i].offsetHeight);
						}
						
					}
				}
			})
		}
		
		return _cmp;
	}
	,topleftrightTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// ��ɻ����
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
			if(cfg.topheight==null){cfg.topheight=50}
			if(cfg.leftwidth==null){cfg.leftwidth=200}
			var h=$(el).height();
			var w=$(el).width();
			var html=[];
			var th=parseInt(cfg.topheight);
			var lw=parseInt(cfg.leftwidth);

			cfg.el.innerHTML='<div style="height:'+th+'px;width:'+w+'px;"></div>'+
			'<div style= "height:'+(h-th)+'px;width:'+lw+'px;position: absolute;top:'+th+'px;"></div>'+
			'<div style= "position: absolute;top:'+th+'px;left:'+lw+'px;height:'+(h-th)+'px;width:'+(w-lw)+'px;" ></div>';
			
			var top=cfg.el.firstChild;
			var left=top.nextSibling;
			var right=left.nextSibling;
			if(typeof(cfg.top)=="string"){
				cfg.top=eval(cfg.top)
			}
			if(typeof(cfg.left)=="string"){
				cfg.left=eval(cfg.left)
			}
			if(typeof(cfg.right)=="string"){
				cfg.right=eval(cfg.right)
			}
			tpl.draw(top,cfg.top);
			tpl.draw(left,cfg.left);
			tpl.draw(right,cfg.right);
			}

		// ����ҳ���С�仯
		Ext.lt.message.hook("layout","endlayout",function(){
			var h=$(cfg.el).height();
			var w=$(cfg.el).width();
			var th=parseInt(cfg.topheight);
			var lw=parseInt(cfg.leftwidth);
			tpl.resize(cfg.top,w,th);
			tpl.resize(cfg.left,lw,h-th);
			tpl.resize(cfg.right,w-lw,h-th);
		})		
		return _cmp;
	}
	//数据元继承页面样式
	,topleftrifhtfootTemplate:function(cfg){
		var tpl=Ext.lt.template;
		// 生成基本界面
		var _cmp={};
		_cmp.resize=function(w,h){
		};
		Ext.lt.message.hook("layout","mydelayout",function(resp){
			cfg.push("topheight",resp.topheight);
			cfg.leftwidth=resp.leftwidth;
			
		})
		_cmp.draw=function(el){
			// 生成基本界面
			if(el==null) el=document.body;
			cfg.el=el;
			if(cfg.topheight==null){cfg.topheight=50}
			if(cfg.leftwidth==null){cfg.leftwidth=450}
			cfg.el.innerHTML=['<div style="height:',cfg.topheight,'" layout="{w:{fit:true},h:{fit:',cfg.topheight,'}}"></div><div style="width:400px;height:520px;" layout="{w:{fit:true}}"><div id="aaaa" style="width:',cfg.leftwidth,'px;float:left" layout="{w:{fit:',cfg.leftwidth,'}}"></div><div style="width:',400-cfg.leftwidth-10,'px;float:left" layout="{w:{fit:-',cfg.leftwidth+10,'}}"></div></div><div style="height:',cfg.topheight,'" layout="{w:{fit:true},h:{fit:',cfg.footheight,'}}"></div>'].join("")
			
			var top=cfg.el.firstChild;
			var left=top.nextSibling.firstChild;
			var right=left.nextSibling;
			var foot=top.nextSibling.nextSibling;
			if(typeof(cfg.top)=="string"){
				cfg.top=eval(cfg.top)
			}
			if(typeof(cfg.left)=="string"){
				cfg.left=eval(cfg.left)
			}
			if(typeof(cfg.right)=="string"){
				cfg.right=eval(cfg.right)
			}
			if(typeof(cfg.foot)=="string"){
				cfg.foot=eval(cfg.foot)
			}
			tpl.draw(top,cfg.top);
			tpl.draw(left,cfg.left);
			tpl.draw(right,cfg.right);
			tpl.draw(foot,cfg.foot);
			}

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.top,cfg.top._do_el.offsetWidth,cfg.top._do_el.offsetHeight);
			tpl.resize(cfg.left,cfg.left._do_el.offsetWidth,cfg.left._do_el.offsetHeight);
			tpl.resize(cfg.right,cfg.right._do_el.offsetWidth,cfg.right._do_el.offsetHeight);
			tpl.resize(cfg.foot,cfg.foot._do_el.offsetWidth,cfg.foot._do_el.offsetHeight);			
		})	
		return _cmp;		
	}
	,drawDivTemplate:function(config){
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(){
			for(var e in config){
				if(e.indexOf('div')==e.length-3){
					if(!Ext.lt.isArray(config[e])){
						config[e]=[config[e]];
					}
					var el=document.getElementById(e);
					if(typeof(config[e][0])=="string"){
						eval(config[e][0]).draw(el);
					}else{
						config[e][0].draw(el);
					}
				}
			}
		}
		var tpl=Ext.lt.template;
		Ext.lt.message.hook("layout","endlayout",function(){
			for(var e in config){
				if(e.indexOf('div')==e.length-3){
					if(!Ext.lt.isArray(config[e])){
						config[e]=[config[e]];
					}
					var el=document.getElementById(e);
					if(typeof(config[e][0])=="string"){
						tpl.resize(eval(config[e][0]),el.offsetWidth,el.offsetHeight);
					}else{
						tpl.resize(config[e][0],el.offsetWidth,el.offsetHeight);
					}
				}
			}
			
		})	
		return _cmp;
	}
	//数据元的布局
	,dataElementLayoutTemplate:function(config){
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			el.style.overflow='hidden';
			if(el==null) el=document.body;
	 		var comps=config.main;
	 		config.el=el;
			if(comps!=null){
				if(!Ext.lt.isArray(comps))comps=[comps];
				for(var i=0,j = comps.length; i <j; i++){
					var divel=document.createElement("div");
					el.appendChild(divel);
					divel.style.width='100%';
					if(comps[i]=="editform"){
						if(comps.length==4){
						fdivel=document.createElement("div");
						divel.style.height=255+"px";
						divel.appendChild(fdivel);
						divel=fdivel;
						}
						if(comps.length==2){							
							fdivel=document.createElement("div");
							divel.style.height=500+"px";
							divel.appendChild(fdivel);
							divel=fdivel;
						}
					}
					if(typeof(comps[i])=="string"){
						eval(comps[i]).draw(divel);
					}else{
						comps[i].draw(divel);
					}
				}
			}
		}
		var tpl=Ext.lt.template;
		Ext.lt.message.hook("layout","endlayout",function(){
			var comps=config.main;
			el=config.el;
			if(comps!=null){
				if(!Ext.lt.isArray(comps))comps=[comps];
				var els=el.childNodes;
				var h=el.offsetHeight;
				var w=el.offsetWidth;
				for(var i=0,j = comps.length; i <j-1; i++){
					h-=els[i].offsetHeight;
					els[i].style.width=w;
					if(typeof(comps[i])=="string"){
						tpl.resize(eval(comps[i]),el.offsetWidth,els[i].offsetHeight);
					}else{
						tpl.resize(comps[i],el.offsetWidth,els[i].offsetHeight);
					}
				}
				var divobj=comps[comps.length-1];
				els[ comps.length-1].style.width=el.offsetWidth;
				els[ comps.length-1].style.height=h;
				if(typeof(divobj)=="string"){
					tpl.resize(eval(divobj),el.offsetWidth,h);
				}else{
					tpl.resize(divobj,el.offsetWidth,h);
				}
			}
		})
		return _cmp;
	}
	//门户业务首页布局
	,portalDivTemplate:function(config){
		var _cmp={};
		var divcount=0;
		_cmp.resize=function(w,h){};
		_cmp.draw=function(){
			for(var e in config){
				if(e.indexOf('div')==e.length-3){
					divcount++;
				}
			}
			for(var e in config){
				if(e.indexOf('div')==e.length-3){
					if(!Ext.lt.isArray(config[e])){
						config[e]=[config[e]];
					}
					var el=document.getElementById(e);
					el.style.height=document.body.clientHeight/20;
					if(typeof(config[e][0])=="string"){
						eval(config[e][0]).draw(el);
					}else{
						config[e][0].draw(el);
					}
				}
			}
		}
		var tpl=Ext.lt.template;
		Ext.lt.message.hook("layout","endlayout",function(){
			for(var e in config){
				if(e.indexOf('div')==e.length-3){
					if(!Ext.lt.isArray(config[e])){
						config[e]=[config[e]];
					}
					var el=document.getElementById(e);
					if(typeof(config[e][0])=="string"){
						tpl.resize(eval(config[e][0]),el.offsetWidth,el.offsetHeight);
					}else{
						tpl.resize(config[e][0],el.offsetWidth,el.offsetHeight);
					}
				}
			}
			
		})	
		return _cmp;
	}

		//上中下布局
	,updownTemplate:function(cfg){
		var tpl=Ext.lt.template;
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
			cfg.el=el;
			if(cfg.upheight==null){cfg.upheight=50}
			if(cfg.middleheight==null){cfg.middleheight=30}
			cfg.el.innerHTML=['<div  layout="{w:{fit:true},h:{fit:'+cfg.upheight+'}}"></div><div  layout="{w:{fit:true},h:{fit:'+cfg.middleheight+'}}"></div><div layout="{w:{fit:true}"></div><div  layout="{w:{fit:true}}"></div>'].join('')
			var up=cfg.el.firstChild;
			var middle=up.nextSibling;
			var down=middle.nextSibling;
			var tab=cfg.el.lastChild;
			if(typeof(cfg.up)=="string"){
				cfg.up=eval(cfg.up)
			}
			if(typeof(cfg.middle)=="string"){
				cfg.middle=eval(cfg.middle)
			}
			if(typeof(cfg.down)=="string"){
				cfg.down=eval(cfg.down)
			}
			if(typeof(cfg.tab)=="string"){
				cfg.tab=eval(cfg.tab)
			}
			tpl.draw(up,cfg.up);
			tpl.draw(middle,cfg.middle);
			tpl.draw(down,cfg.down);
			tpl.draw(tab,cfg.tab);
			}
		Ext.lt.message.hook("layout","endlayout",function(){
			if(cfg.up && Ext.lt.isFunction(cfg.up.resize)){
				cfg.up.resize();
			}
			if(cfg.middle && Ext.lt.isFunction(cfg.middle.resize)){
				cfg.middle.resize();
			}
			if(cfg.down && Ext.lt.isFunction(cfg.down.resize)){
				cfg.down.resize();
			}
			if(cfg.tab && Ext.lt.isFunction(cfg.tab.resize)){
				cfg.tab.resize();
			}
		});
		return _cmp;		
	}
	,dictabTemplate:function(cfg){
		var tpl=Ext.lt.template;
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			if(el==null) el=document.body;
			cfg.el=el;
			if(cfg.part1height==null){cfg.part1height=120}
			if(cfg.part2height==null){cfg.part2height=600}
			if(cfg.part3height==null){cfg.part3height=600}
			if(cfg.part5height==null){cfg.part5height=30}
			cfg.el.innerHTML=['<div  layout="{w:{fit:true},h:{fit:'+cfg.part1height+'}}" style="width:100%;"></div><div><div  layout="{w:{fit:true},h:{fit:'+cfg.part2height+'}}"></div><div layout="{w:{fit:true},h:{fit:'+cfg.part3height+'}}"></div></div><div></div><div layout="{w:{fit:true},h:{fit:'+cfg.part5height+'}}"></div>'].join('')
			var part1 = cfg.el.firstChild;
			var part2 = part1.nextSibling.firstChild;
			var part3 = part1.nextSibling.lastChild;
			var part4 = part1.nextSibling.nextSibling;
			var part5 = cfg.el.lastChild;
			if(typeof(cfg.part1)=="string"){
				cfg.part1=eval(cfg.part1)
			}
			if(typeof(cfg.part2)=="string"){
				cfg.part2=eval(cfg.part2)
			}
			if(typeof(cfg.part3)=="string"){
				cfg.part3=eval(cfg.part3)
			}
			if(typeof(cfg.part4)=="string"){
				cfg.part4=eval(cfg.part4)
			}
			if(typeof(cfg.part5)=="string"){
				cfg.part5=eval(cfg.part5)
			}
			tpl.draw(part1,cfg.part1);
			tpl.draw(part2,cfg.part2);
			tpl.draw(part3,cfg.part3);
			tpl.draw(part4,cfg.part4);
			tpl.draw(part5,cfg.part5);
			}
		return _cmp;		
	}
	,causerTemplate:function(cfg){
		var tpl=Ext.lt.template;
		var _cmp={};
		_cmp.resize=function(w,h){};
		_cmp.draw=function(el){
			
			if(el==null) el=document.body;
			cfg.el=el;
			var htmls = [];
			htmls.push("<div id='logodiv' layout='{w:{fit:true,min:1024}}' style='width:1024px;height:73px;'></div>");
			htmls.push("<div layout='{w:{fit:true,min:1024},h:{fit:-73}}' style='width:1024px;height:500px;'>");//无endDIV
			htmls.push("<div id='leftdiv' style='width:200px;float:left;height:500px;' layout='{h:{fit:true}}'></div>");
			htmls.push("<div id='rightdiv' style='float:left;height:500px;width:800px;' layout='{w:{fit:-210},h:{fit:true}}'>");
			htmls.push("<div id='toolbuttondiv' style='height:30px;width:800px' layout='{w:{fit:true}}'></div>");
			htmls.push("<div id='paneldiv' style='padding-top:10px;padding-left:20px;height:80px;z-index:20;width:800px' layout='{w:{fit:true},h:{fit:80}}'></div>");
			htmls.push("<div id ='tabdiv' class='tabsarea tabline'></div>");
			htmls.push("<div id='tablediv'  style='height:290px;width:800px' layout='{w:{fit:true},h:{fit:-250}}'></div>");
			htmls.push("</div>");//end rightdiv
			htmls.push('</div>');
			cfg.el.innerHTML = htmls.join("");
			
			var logodiv = cfg.el.firstChild;
			var leftdiv =  logodiv.nextSibling.firstChild;
			var rightdiv = leftdiv.nextSibling;
			var toolbuttondiv = rightdiv.firstChild;
			var paneldiv = toolbuttondiv.nextSibling;
			var tabdiv = paneldiv.nextSibling;
			var tablediv = tabdiv.nextSibling;

			tpl.draw(logodiv,eval(cfg.logodiv[0]));
			tpl.draw(leftdiv,eval(cfg.leftdiv[0]));
			tpl.draw(toolbuttondiv,eval(cfg.toolbuttondiv[0]));
			tpl.draw(paneldiv,eval(cfg.paneldiv[0]));
			tpl.draw(tablediv,eval(cfg.tablediv[0]));
		}
		return _cmp;
	}
	,toptopleftrightTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		var _cmp={};
		function getHeight(el){
			if(el==document.body){
				return $(window).height();
			}else{
				return el.clientHeight;
			}
		}
		function getWidth(el){
			if(el==document.body){
				return $(window).width();
			}else{
				return el.clientWidth;
			}
		}
		_cmp.resize=function(w,h){};
		var _el=null;
		_cmp.draw=function(el){
			if(el==null) el=document.body;
			_el=el;
			if(cfg.topheight==null){cfg.topheight=30}else{cfg.topheight = parseInt(cfg.topheight)};
			if(cfg.top2height==null){cfg.top2height=50} else{cfg.top2height = parseInt(cfg.top2height)};
			if(cfg.leftwidth==null){cfg.leftwidth=200} else{cfg.leftwidth = parseInt(cfg.leftwidth)};
			if(cfg.rightwidth!=null){cfg.rightwidth = parseInt(cfg.rightwidth)};
			cfg.el.innerHTML='<div class="toptopleftrightTemplate_top1"></div><div class="toptopleftrightTemplate_top2"></div><div></div><div></div>';
			
			var top=cfg.el.firstChild;
			var top2 = top.nextSibling;
			var left=top2.nextSibling;
			var right=left.nextSibling;
			var w=getWidth(el);
			var h=getHeight(el);
			if(typeof(cfg.top)=="string"){
				top.style.width=w+'px';
				top.style.height=cfg.topheight+'px';
				cfg.top=eval(cfg.top)
				
			}
			if(typeof(cfg.top2)=="string"){
				top2.style.width=w+'px';
				top2.style.height=cfg.top2height+'px';
				cfg.top2=eval(cfg.top2)
			}
			var oh=cfg.top2height+cfg.topheight;
			h=h-oh;
			if(typeof(cfg.left)=="string"){
				left.style.width=cfg.leftwidth+'px';
				left.style.height=h+'px';
				left.style.position='absolute';
				left.style.top=oh+'px';
				left.style.left='0px';
				cfg.left=eval(cfg.left)
			}
			if(typeof(cfg.right)=="string"){
				right.style.width=w-cfg.leftwidth<600?600:w-cfg.leftwidth+'px';
				right.style.height=h+'px';
				right.style.position='absolute';
				right.style.top=oh+'px';
				right.style.left=cfg.leftwidth+'px';
				cfg.right=eval(cfg.right)
			}
			tpl.draw(top,cfg.top);
			tpl.draw(top2,cfg.top2);
			tpl.draw(left,cfg.left);
			tpl.draw(right,cfg.right);
		}
		Ext.lt.message.hook("layout","endlayout",function(){
				var w=getWidth(_el);
				var h=getHeight(_el);
				var oh=cfg.top2height+cfg.topheight;
				cfg.top._do_el.style.width=w+'px';
				cfg.top2._do_el.style.width=w+'px';
				cfg.left._do_el.style.height=h-oh+'px';
				cfg.right._do_el.style.height=h-oh+'px';
				cfg.right._do_el.style.width=w-cfg.leftwidth<600?600:w-cfg.leftwidth+'px';
				tpl.resize(cfg.top,w,cfg.topheight);
				tpl.resize(cfg.top2,w,cfg.top2height);
				tpl.resize(cfg.left,cfg.leftwidth,h-oh);
				tpl.resize(cfg.right,w-cfg.leftwidth<600?600:w-cfg.leftwidth,h-oh);
		})	
		return _cmp;
	},
	leftTreeTemplate:function(cfg){//左 上下结构
		cfg = Ext.lt.apply({height:[null,'25%',null],alt:[]},cfg);
		var c = {};
		var _el= null;
		var part = ['left','rtop','rbottom'];
		for(var i=0,il=part.length;i<il;i++){
			cfg[part[i]]&&(c[part[i]]=(typeof(cfg[part[i]])=="string")?eval(cfg[part[i]]):cfg[part[i]]);
		}
		var config={block:[{id:"mainblock",size:1},{size:4}],
				  widget:[
					[
						{height:cfg.height[0],alt:cfg.alt[0]}
					],
					[
						{height:cfg.height[1],alt:cfg.alt[1]},
						{height:cfg.height[2],head:false,alt:cfg.alt[2]}
					]
				]};
				var layout=new Ext.lt.template.layout(config);
				layout.setComponet(c.left,1,1);
				layout.setComponet(c.rtop,2,1);
				layout.setComponet(c.rbottom,2,2);

		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	},
	leftFlowTemplate:function(cfg){//左 上下结构
		var c = {};
		var cursor = 0; //c数组游标
		var _el= null;
		
		if(typeof(cfg['left'])!="undefine"){
			c['left'] = (typeof(cfg['left'])=="string")?eval(cfg['left']):cfg['left'];
		}
		for(var i in cfg){
			 if(typeof(i)!="function"&&i.indexOf("block")>-1){
				if(cfg[i]){
					c[cursor] = (typeof(cfg[i])=="string")?eval(cfg[i]):cfg[i];
					cursor++;
				}
			}
		}
		//此时cursor为block总数
		cfg = Ext.lt.apply({height:[100/cursor+'%'],alt:[]},cfg);
		var config={block:[{id:"mainblock",size:1},{size:4}],widget:[[],[]]};
		var wc = 0;
		if(c['left'])config.widget[0].push({height:cfg.height[0],alt:cfg.alt[j]});
		for(var j=0,jl=cursor;j<jl;j++){
			var wobj = {height:cfg.height[j+1],alt:cfg.alt[j+1]};
			config.widget[1].push(wobj);
		}
				var layout=new Ext.lt.template.layout(config);
				if(c['left'])layout.setComponet(c['left'],1,1);
				for(var j=0,jl=cursor;j<jl;j++){
					layout.setComponet(c[j],2,j+1);
				}
				
				
		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	},
	hanoiTemplate:function(cfg){ //汉诺塔布局(纵向分层，单层横向放置多个组件),适合场景，列表与左侧树同行并列页面 jzy  	var	cfg =  {block1:toolbuttonbar,block2:querypanel,block3:[{size:1,com:lefttreediv},{size:4,com:indiuidatatable}],block4:datatable,height:[60,250,null]};	var layout = new Ext.lt.template.hanoiTemplate(cfg);
		var c = {};
		var cursor = 0; //c数组游标
		var mul = []; //存放 多层组件 游标
		var layout = []; //存放多层layout布局
		var _el= null;
		
		for(var i in cfg){
			 if(typeof(i)!="function"&&i.indexOf("block")>-1){
 
				var  _b =  Object.prototype.toString.call(cfg[i]);
				switch(_b){
				case "[object String]":
					c[cursor] = eval(cfg[i]);
					break;
				case "[object Object]":
					c[cursor] = cfg[i];
					break;
				case "[object Array]":
					c[cursor] = cfg[i];
					mul.push(cursor);
					break;
				default:
					c[cursor] = null;
					break;
				}
				cursor++;
			}
		}
		//此时cursor为block总数
		cfg = Ext.lt.apply({height:[100/cursor+'%'],alt:[]},cfg);
		
		//处理布局嵌套
		for(var m=0,ml = mul.length;m<ml;m++){
		    var tmp = mul[m];
		    var num = tmp;
		    tmp = c[tmp]; //数组，这一层有多个组件
		    var _c = {block:[],widget:[]};
		    
		    for(var t=0,tl=tmp.length;t<tl;t++){
		    	var lc = tmp[t];
			    if(lc!=null){
			    	lc = typeof(type)=="string"?eval(lc):lc;
			    	_c.block.push({size:lc.size});
			    	_c.widget.push([{height:'100%',componet:typeof(lc.com)=="string"?eval(lc.com):lc.com}]);
			    }
		    }
		    c[num] =  new Ext.lt.template.layout(_c);
		}
		
		var config={block:[{size:1}],widget:[[],[]]};
		var wc = 0;
		var config={block:[{id:"mainblock",size:1}],widget:[[]]};
		for(var j=0,jl=cursor;j<jl;j++){
			var wobj = {height:cfg.height[j],alt:cfg.alt[j]};
			config.widget[0].push(wobj);
		}
				var layout=new Ext.lt.template.layout(config);
				for(var j=0,jl=cursor;j<jl;j++){
					layout.setComponet(c[j],1,j+1);
				}
				
				
		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	},
	tcbTemplate:function(cfg){//上中下
		cfg = Ext.lt.apply({height:['5%','25%',null],group:[null,null,null],alt:[]},cfg);
		var c = {};
		var _el= null;
		var part = ['top','center','bottom'];
		for(var i=0,il=part.length;i<il;i++){
			cfg[part[i]]&&(c[part[i]]=(typeof(cfg[part[i]])=="string")?eval(cfg[part[i]]):cfg[part[i]]);
		}
		var config={block:[{id:"mainblock",size:1}],
				  widget:[
					[
						{height:cfg.height[0],alt:cfg.alt[0],group:cfg.group[0]},
						{height:cfg.height[1],alt:cfg.alt[1],group:cfg.group[1]},
						{height:cfg.height[2],alt:cfg.alt[2],group:cfg.group[2]}
					]
				]};
				var layout=new Ext.lt.template.layout(config);
				layout.setComponet(c.top,1,1);
				layout.setComponet(c.center,1,2);
				layout.setComponet(c.bottom,1,3);
				
				
		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	},
	tabpanelTemplate:function(cfg){//上中下（列表带页签）
		cfg = Ext.lt.apply({height:['5%','25%','25%',null],group:[null,null,null,null],alt:[]},cfg);
		var c = {};
		var _el= null;
		var part = ['top','center','center2','bottom'];
		for(var i=0,il=part.length;i<il;i++){
			cfg[part[i]]&&(c[part[i]]=(typeof(cfg[part[i]])=="string")?eval(cfg[part[i]]):cfg[part[i]]);
		}
		var config={block:[{id:"mainblock",size:1}],
				  widget:[
					[
						{height:cfg.height[0],alt:cfg.alt[0],group:cfg.group[0]},
						{height:cfg.height[1],alt:cfg.alt[1],group:cfg.group[1]},
						{height:cfg.height[2],alt:cfg.alt[2],group:cfg.group[2]},
						{height:cfg.height[3],alt:cfg.alt[3],group:cfg.group[3]}
					]
				]};
				var layout=new Ext.lt.template.layout(config);
				layout.setComponet(c.top,1,1);
				layout.setComponet(c.center,1,2);
				layout.setComponet(c.center2,1,3);
				layout.setComponet(c.bottom,1,4);
				
		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	},
	flowTemplate:function(cfg){//纵向流式布局,isfixed 默认为true 采用自适应规则
		var c = {};
		var cursor = 0; //c数组游标
		var _el= null;
		for(var i in cfg){
			if(typeof(i)!="function"&&i.indexOf("block")>-1){
				if(cfg[i]){
					c[cursor] = (typeof(cfg[i])=="string")?eval(cfg[i]):cfg[i];
				}
				 cursor++;
			}
		}
		//此时cursor为block总数
		cfg = Ext.lt.apply({height:[100/cursor+'%'],group:[],alt:[],isfixed:true},cfg);
		if(!!!cfg.isfixed){
			Ext.lt.template.addStyle(_BASE_STYLE+"/layout.css");
		}
		var config={block:[{id:"mainblock",size:1}],widget:[[]],isfixed:cfg.isfixed};
		for(var j=0,jl=cursor;j<jl;j++){
			var wobj = {height:cfg.height[j],alt:cfg.alt[j],group:cfg.group[j]};
			config.widget[0].push(wobj);
		}
				var layout=new Ext.lt.template.layout(config);
				for(var j=0,jl=cursor;j<jl;j++){
					layout.setComponet(c[j],1,j+1);
				}
				
				
		c.draw=function(el){
			if(el==null) el=document.body;
			_el = el;
			layout.draw(el);
			if(Ext.lt.isFunction(c.init))c.init(); //画完回调方法
		}
		c.resize=function(){
			if(_el==null)return;
			var w = document.body?document.body.clientWidth:_el.clientWidth;
			var h = _el==document.body?$(window).height():_el.clientHeight;
			layout.resize(w,h);
		}
		c.showDemoStruct = layout.showDemoStruct;
		Ext.lt.message.hook("layout","endlayout",c.resize);
		return c;
	}
	
	// ʹ�õ�һ�廯��ҳ���ģ��
	// ��Ext�������LT��չ�����ɵ�ָ����div�����У����������������������toString������������Ϊ�գ���ָ��div�������
	,draw:function(div,obj){
		if(div==null) return;
		if(obj==null){
			div.innerHTML=='';
			return;	
		}
		// LT���������draw����
		if(Ext.lt.isFunction(obj.draw)){
			obj.draw(div);
			obj._do_el=div;
		}
		else{
			div.innerHTML=obj.toString();
		}
	}
	
	// ���������С��objΪExt�����LT��չ���
	,resize:function(obj,w,h){
		if(Ext.lt.isFunction(obj.resize)){
			obj.resize(w,h)
		}
	}
	,addStyle:function(stylePath){
			var container = document.getElementsByTagName("head")[0];
		    var addStyle = document.createElement("link");
		    addStyle.rel = "stylesheet";
		    addStyle.type = "text/css";
		    var root_path = window.location.href.split(window.location.pathname)[0];
		    addStyle.href =  root_path+"/common/themes/"+stylePath;
		    container.appendChild(addStyle);	
	    
	}

};

//function addStyle(stylePath) {
//
//}
//addStyle('css/add.css');

//
// 布局对象
/* 
var _panel = Ext.lt.ui.editformpanel4key("/demo/ui/test/*");
var config={width:1200,height:750,block:[{id:"mainblock",size:1},{size:5},1],
  widget:[
	[
		{title:'左侧树',height:'30%',config:{serviceid:'billboardcomponent'}}, 
		{title:'2',height:'30%',head:false}, 
		{title:'3',head:false}
	],
	[
		{title:'查询区',height:120},
		{title:'来源数据',height:'25%'},
		{title:'编辑区',height:'28%',componet:_panel},
		{title:'按钮区',height:'8%',head:false},
		{title:'明细列表'}
	]
]};
var layout=new Ext.lt.template.layout(config);
layout.draw(document.getElementById("web"));
*/

//
// 门户布局对象
Ext.lt.template.layout=Ext.lt.createComponent(function(config){
	var _cmp={};
	var _cfg=Ext.lt.apply({width:'auto',height:'auto',iswidget:false,iscollap:false,isfixed:true},config);
	var _el;
	var _width=_cfg.width||"auto";
	var _height=_cfg.height||"auto";
	var _columnsize=config.columnsize||0;
//	var _segment=isNaN(_cfg.segment)?1:_cfg.segment;
	var _sects=[];//存放初始化block数据
	var _block=_cfg.block;
	var _jsLibs=null;
	if(!Ext.lt.isArray(_block)) _block=[_block];
	var _widgets = [];
//	if(!Ext.lt.isArray(_block[0])) _block=[_block];

//	for(var i=0;i<_segment;i++){
//		_sects[i]=[];
	for(var j=0,jl=_block.length;j<jl;j++){
		_sects[j]=initBlock(_block[j]);
		_columnsize+=_sects[j].size;
	}
	
//	}
	//折叠功能  暂时给居左block 与居右block有该功能
	function makeCollapsable(){
		if(!_cfg.iscollap)return;
		var segment = _el.firstChild;
		 $(segment).append("<div class='collapse'></div><div class='collapse'></div>");
		 var c2 = segment.lastChild;
		 var c1 = c2.previousSibling;
		 var b1 = segment.firstChild;
		 var b2 = c1.previousSibling;
		 c1.setAttribute('collapse',1);
		 c1.onclick=function(){
			 if(1==this.getAttribute('collapse')){
				 $(b1).stop().animate({
					 width:'0px'
				 },'normal',null,function(){
					 c1.setAttribute('collapse',0);
				 });
				 $(this).stop().animate({
					 left:'0px'
				 },'normal');
			 }else{
				 $(b1).stop().animate({
					 width:'187px'
				 },'normal',null,function(){
					 c1.setAttribute('collapse',1);
				 });
				 $(this).stop().animate({
					 left:'179px'
				 },'normal');
			 }

		 }
		 _layoutCollapasable();
	}
	function _layoutCollapasable(){
		if(!_cfg.iscollap)return;
		var segment = _el.firstChild;
		 var c2 = segment.lastChild;
		 var c1 = c2.previousSibling;
		 var b1 = segment.firstChild;
		 var b2 = c1.previousSibling;
		 
		 c1.style.left=b1.offsetWidth+b1.offsetLeft-c1.offsetWidth+'px';
		 c1.style.top=(b1.offsetHeight-c1.offsetHeight)/2+'px';
		 c2.style.left=b2.offsetLeft+'px';
		 c2.style.top=(b2.offsetHeight-c2.offsetHeight)/2+'px';
		 c1.style.zIndex=Ext.lt.getNextZIndex();
		 c2.style.zIndex=Ext.lt.getNextZIndex();
	}
	
	_cmp.draw=function(el){
		_el=el;
		var w=getWidth(),column_width=w/_columnsize;
		var h=getHeight();
		var html=[];
		var bks,left=0;
		html.push('<div class="segment" style="width:'+w+'px;height:'+(_cfg.isfixed?(h+'px'):'auto')+';">');
		for(var i=0,il=_sects.length,left=0;i<il;i++){
			bks=_sects[i];
			bks.width=column_width*bks.size;
			html.push('<div   class="block'+(i+1)+'" style="position:absolute;left:'+(column_width*left)+'px;top:0px;width:'+(column_width*bks.size)+'px;height:100%'+'"></div>');
			left+=bks.size;
		}
		html.push('</div>');
		el.innerHTML=html.join('');
		makeCollapsable();
		_cmp.setWidget(_cfg.widget);
		
	}
	
	
	_cmp.resize=function(w,h){
		_width = w;
		_height =h;
		
		var segment = _el.firstChild;
		
		var mg = getMargin(segment); //外边距控制最外实际宽高
		w =  w-mg[1]-mg[3];
		h = h-mg[0]-mg[2]
		segment.style.width = w +'px';
		segment.style.height = h +'px';
		
		
		var sd = getPadding(segment); //内边距矫正
		var sw = getBorder(segment);
		
		column_width = w/_columnsize;
		var blocks = segment.childNodes;
		var left = 0;
		for(var i=0,il=blocks.length;i<il;i++){
			if(!_sects[i])continue;
			var _w = column_width*_sects[i].size;
			var _l = column_width*left;
			
			var pd =getPadding(blocks[i]); //内边距矫正
			var bw = getBorder(blocks[i]);
			
			blocks[i].style.width = (_w-bw[1]-bw[3]-pd[1]-pd[1])+'px';
 			blocks[i].style.top  = sd[0]+'px';
			
			blocks[i].style.left  = _l+'px';
			blocks[i].style.height  = (h-sd[0]-sd[2]-sw[0]-sw[2]-pd[0]-pd[2]-bw[0]-bw[2])+'px';
			left +=_sects[i].size;
			

			_w = _w-pd[1]-pd[3]-bw[1]-bw[3];
			
			if(!_cfg.widget[i])continue;
//			fixHeight(_cfg.widget[i]);
//			var _lefth = _el.offsetHeight;
			
			fixHeight(_cfg.widget[i],h-sd[0]-sd[2]-sw[0]-sw[2]-pd[0]-pd[2]-bw[0]-bw[2]);
  		   var _lefth = null;
			
			
			for(var j=0,jl=_widgets[i].length;j<jl;j++){
			 if(_widgets[i][j]){
				 
				 
				 if(!_cfg.iswidget){
					 var _pb = [0,0,0,0];
					 if(_cfg.widget[i][j].group&&_goup[_cfg.widget[i][j].group]){
						 _pb = getBorder(_goup[_cfg.widget[i][j].group]);
					 }
					 _widgets[i][j]._div.style.width=_w-_pb[1]-_pb[3]+'px';
					 
					 if(_lefth!=null&&_lefth<_cfg.widget[i][j].height_f){ //如果 布局指定分配高度定额的总和超过可分配高度，即不够分配时，剩余组件平均分配
 						 _cfg.widget[i][j].height_f = _lefth/(jl-j);
					 }
					 _widgets[i][j]._div.style.height=_cfg.widget[i][j].height_f-_pb[0]-_pb[2]+'px';
			     }
				 _widgets[i][j].resize(_w,_cfg.widget[i][j].height_f);
				 if(_cfg.isfixed){
					 if(_lefth==null)_lefth = h-sd[0]-sd[2]-sw[0]-sw[2]-pd[0]-pd[2]-bw[0]-bw[2];
					 _lefth-= _cfg.widget[i][j].div.offsetHeight;
					 //modify 150316 去掉对高度的修正
					 fixHeight(_cfg.widget[i],_lefth,j+1); //第N个组件resize事件后，1剩余高度按照初始分配原则分配给第N+1个组件后的所有组件
 
				 }
//				
				 
			 }
			}
		}
		_layoutCollapasable();
		
	}
//	Ext.lt.message.hook("layout","endlayout",_cmp.resize);
	
	
	//layout创建时不传入component对象，调用该方法，指定特定布局某位置放置组件对象，应先于draw方法调用，i，j为布局坐标，不传入默认为1
	_cmp.setComponet=function(obj,i,j){
		i=i?i:1;
		j=j?j:1;
		i--;j--;
		if(i<0||j<0){
			alert("Ext.lt.template.layout.setComponet方法传入组件坐标错误!")
			return;	
		}
		  _cfg.widget[i][j]?_cfg.widget[i][j].componet=obj:null;
	}
	
	_cmp.setWidget=function(widget){
		var widgets;
//		for(var i=0;i<_segment;i++){
//			for(var j=0,jl=_sects[i].length;j<jl;j++){
//				widgets=widget[i][j];
//				if(!Ext.lt.isArray(widgets)) widgets=[widgets];
//				for(var k=0,kl=widgets.length;k<kl;k++){
//					o=widgets[k];
//					o.width=_sects[i][j].width;
//					o.layout=_cmp;
//					var w=new Ext.lt.portal.widget(o);
//					w.draw(_cmp.getBlock(i+1,j+1));
//				}
//			}
//		}
		for(var i=0,il=_sects.length;i<il;i++){
			widgets = widget[i];
			if(!widgets)continue;
//			if(!Ext.lt.isArray(widgets)) widgets=[widgets];
			fixHeight(widgets);
			var x,y=0;
			var w = null;
			_widgets[i]=[];
			for(var j=0,size=jl=widgets.length;j<jl;j++){
				o=widgets[j];
				var pd = getPadding(_cmp.getBlock(i));
				o.width = _sects[i].width-pd[1]-pd[3];
				o.layout = _cmp;
				o.top = o.top||0+y;
				y+=o.height_f;
//				布局内画什么
//				try{
				w = null;
					 if(!_cfg.iswidget){
							w = loadComponet(o);
							var _p = _cmp.getGroup(o,i);
							var pb = getBorder(_p);
							var _div = document.createElement("div");
							_div.className = "widget";
							_div.style.width=o.width-pb[1]-pb[3]+'px';
							_div.style.height=o.height_f+'px';
//							_cmp.getBlock(i).appendChild(_div);
							_p.appendChild(_div);
							
							if(w){
								w._div = _div;
								o.div=_div;
								w.draw(_div);
							}
						 }else{
							w = loadWidget(o);
							w.draw(_cmp.getBlock(i));
							o.div=_cmp.getBlock(i);
						 }
//				}catch(e){
//					//测试阶段先注掉，主要是toolbar 先去检测 function 是否存在 会影响后边的alert(e);
//				}
				 _widgets[i].push(w);
			}
		}
	}
	
	function getPadding(el){
		 var   pt = parseInt(Ext.lt.HTML.getRealStyle(el).paddingTop,10)||0;
		 var   pb = parseInt(Ext.lt.HTML.getRealStyle(el).paddingBottom,10)||0;
		 var   pl = parseInt(Ext.lt.HTML.getRealStyle(el).paddingLeft,10)||0;
		 var   pr = parseInt(Ext.lt.HTML.getRealStyle(el).paddingRight,10)||0;
		 return [pt,pr,pb,pl];
	}
	function getMargin(el){
		 var   pt = parseInt(Ext.lt.HTML.getRealStyle(el).marginTop,10)||0;
		 var   pb = parseInt(Ext.lt.HTML.getRealStyle(el).marginBottom,10)||0;
		 var   pl = parseInt(Ext.lt.HTML.getRealStyle(el).marginLeft,10)||0;
		 var   pr = parseInt(Ext.lt.HTML.getRealStyle(el).marginRight,10)||0;
		 return [pt,pr,pb,pl];
	}
	function getBorder(el){
		 var   bt = parseInt(Ext.lt.HTML.getRealStyle(el).borderTopWidth,10)||0;
		 var   bb = parseInt(Ext.lt.HTML.getRealStyle(el).borderBottomWidth,10)||0;
		 var   bl = parseInt(Ext.lt.HTML.getRealStyle(el).borderLeftWidth,10)||0;
		 var   br = parseInt(Ext.lt.HTML.getRealStyle(el).borderRightWidth,10)||0;
		 return [bt,br,bb,bl];
	}
	
	
	
	//加载widget工具,依赖Ext.lt.portal.widget
	function loadWidget(o){
		return new Ext.lt.portal.widget(o);
	}
	//加载传入组件对象
	function loadComponet(o){
		return o.componet;
	}
	//block内部高度布局调整,支持百分比及数值指定两种方式，未指定按剩余高度平均分配
	//modify 1013 height_f使用该修正数据进行编辑
	//modify 150316 jzy 不按照页面高度分配，简化程序，使用指定固定高度
	//modify 150318 jzy 通过属性控制是否自适应
	function fixHeight(widget,h,cursor){
		if(_cfg.isfixed){
			var _divs=[]; //没有height属性
			var ch = oh = h||_el.offsetHeight;
			cursor = !!cursor?cursor:0;
			for(var w=widget,i=cursor,il=w.length;i<il;i++){
				o=w[i];
				if(!!o.height){
					if(typeof(o.height)=="string"&&o.height.indexOf('%')){
						o.height_f = ((_el?_el.offsetHeight:ch)*(parseInt(o.height,10)/100));
					}
					(!!!o.height_f)&&(o.height_f=o.height);
					ch-=o.height_f;
				}else{
					_divs.push(i);
				}
			}
			for(var j=0,jl=_divs.length;j<jl;j++){
				w[_divs[j]].height_f = Math.abs(parseInt(ch/jl,10)); 
			}
		}else{
			for(var w=widget,i=0,il=w.length;i<il;i++){
				o=w[i];
				if(!!o.height){
					if(typeof(o.height)=="string"&&o.height.indexOf('%')){
						o.height_f = ((_el?_el.offsetHeight:ch)*(parseInt(o.height,10)/100));
					}else{
						o.height_f =  o.height ;
					}
				}else{
					o.height_f = 200
				}
			}
		}
	}
	
	var _goup = {};
	//引入分组概念   jzy 20150312  逻辑上相关的一组组件进行分组
	_cmp.getGroup=function(widget,b){
		if(widget.group){
			var _t = _goup[widget.group];
			if(_t==null){
			var _div = document.createElement("div");
			_div.className = "group";
			_goup[widget.group] = _div;
			var _block = _cmp.getBlock(b); //目标block;
			_block.appendChild(_div);
			_t = _div;
			}
			return _t;
		}
		
		return _cmp.getBlock(b);
		
	}
	
	_cmp.getBlock=function(b){
		return _el.children.item(0).children.item(b);
	}
	//缩略图
	_cmp.showDemoStruct=function(h,ids){
		if(!h)h = $(window).height();
		var html = "<div class='demostruct'  style='width:100%;height:100%'>";
		var bks,_block,widgets,_wid;
		var k =0;
		ids = ids==null?[]:ids;
		for(var i=0,il=_sects.length;i<il;i++){
			bks=_sects[i];
			_block = '<div class="democontainer" style="float:left;width:'+(parseInt((bks.size/_columnsize)*100,10))+'%;height:100%">'
			widgets = _cfg.widget[i];
			if(!widgets)continue;
			fixHeight(widgets,h);
			for(var j=0,jl=widgets.length;j<jl;j++){
				var clas =  'demowidget';
				var tip  = '';
				var hasclass = false;
				if(widgets[j].alt){
					if(widgets[j].alt.indexOf("class_")>-1){
						clas = '_'+widgets[j].alt.split("class_")[1];
						tip = '';
						 hasclass = true;
					}else{
						tip = widgets[j].alt;
					}
				}
				_wid='<div id="'+(ids[k]?ids[k]:("w"+k))+'" class="'+clas+'" style="width:100%;'+(hasclass?'':('height:'+(parseInt((widgets[j].height_f/h)*100,10))+'%'))+'">'+tip+'</div>';
				_block+=_wid;
				k++;
			}
			_block+='</div>';
			html+=_block;
		}
		html+="</div>";
		return html;
	}
	
	function _initJsLib(){
		_jsLibs={};
		var scripts=document.getElementsByTagName('script');
		for(var i=0,il=scripts.length;i<il;i++){
			var jsurl=scripts[i].src;
			if(jsurl.indexOf('?')>-1){
				jsurl=jsurl.substring(1,jsurl.indexOf('?'));
			}
			_jsLibs[jsurl]=scripts[i];
		}
	}
	
	
	
	// 初始化区块配置对象
	function initBlock(b){
		var block;
		if(Ext.lt.isNumber(b)){
			block={size:b,id:'block'+Ext.lt.getNextSeqValue()}
		}
		else{
			block=Ext.lt.apply({id:'block'+Ext.lt.getNextSeqValue(),size:1},b);
		}
		return block;
	}
	
	function getWidth(){
		return _width=='auto'?$(_el).width():_width;
	}
	//如果_el没有高度
	function getHeight(){
		if(_height!="auto")return _height;
		var _h = $(_el).height();
		var _node = _el;
		  while(_h==0){
			  _h = $(_node.parentNode).height();
			  if(_el.tagName=="BODY"){
				  _h=$(window).height();
				  break;
			  }
			  _node = _node.parentNode;
		}
		return _h;
	}
	
//	_initJsLib();
	
	return _cmp;
});

