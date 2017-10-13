
/**
 * 系统模板命名空间
 * 系统中所有界面模板都在该命名空间下使用
 * panelcache： 数组对象，用来保存已经创建过的界面对象的缓冲。、

 *
 * showtasklist：开发任务列表模板，根据传入的系统参数，显示不同系统的任务列表
 * showSystemconfig： 系统配置模板，根据传入的系统配置参数显示不同系统的配置界面
 */
 
 /**
  * 方法及定义：
  * showPortalTemplate(cfg)       :  cfg={title:[{}],main:[{panel:{},show:boolean}]}
  * showOnepageTemplate(cfg)      :  cfg={main:[{panel:{},show:boolean}]}
  * showTopLeftTemplate(cfg)      :  cfg={title:[{}],left:[{}],main:[{panel:{},show:boolean}]}  右侧只显示一个
  * showTopLeftCom3Template(cfg)  :  cfg={title:[{}],left:[{}],main:[{panel:{},show:boolean}]}  右侧显示两列排列
  * showTopLeftCom3FootTemplate(cfg)  :  cfg={title:[{}],left:[{}],main:[{panel:{},show:boolean}],foot:[{}]}  右侧显示两列排列
  * showIfmisPageTemplate(cfg)    :  cfg={title:ExtComponent/LtComponent,menu:ExtComponent/LtComponent,main:ExtComponent/LtComponent}  上中下三个区域，适合一体化系统首页布局。页面组件支持Ext和自定义扩展组件
  * mask()                        :  当前页遮挡
  * unmask()                      :  取消当前页遮挡
  * loadmask(panel)				  :  带进度条遮罩。当前panel遮罩。没有panel带进度条遮罩当前页。
  * closeloadmask(panel)		  :  取消带进度条遮罩。当前panel取消遮罩。没有panel当前页取消带进度条遮罩。
  * showPanel2CenterMain(id)      :  根据id显示showTopLeftTemplate中右侧panel
  * addPanel2CenterMain(panel)    :  添加一个panel 到showTopLeftTemplate并且现在展示      要求panel有id
  * getLeftPanel()                :  获取当前页左侧panel  
  * getTitlePanel()               :  获取当前页头部panel
  * getMainPanel()                :  获取当前页中心区panel
  * isHaveMainPanel2id(id)        :  判断这个id是否存在与操作区
  */
  
  /**  
  *  themeTemplate 主题布局。
  *   属性
  *    type:布局格式  
  *      布局分为  1*1，2*1，2*2，2*3等 前一位表示行，后一列表示列
  *      特殊布局  2,3,...n  表示两行 n 列的
  *      特殊布局  2*2l 2*2r 2*2t 2*2b 等 l表示左侧合并，r表示右侧合并，t表示上部合并，b表示下部合并
  *    panels:Array(Ext.Panel,Ext.Panel)对象
  *   函数：
  *    setPanels:设置显示对象
  *    setType:设置布局
  *    getPanelLength:获取该布局的显示个数
  *    getMainPanel:获取布局后主题对象
  *    destroyPanels:清理废弃对象
  */
/**
	界面组件开发规范
	
	component:{
		draw(HTMLDivElement),
		resize(w,h),
		on({eventname:functionObject})
	}

 */
Ext.lt.template = {
		// 默认显示配置
	displayconfig : null,
	drawDiv:null,
    // 本页使用的页面模板
    currenttemplate : null,
    //右侧为单个的面版显示的对象
     main2showpanel : null,
    // 默认页面模板
    defaulttemplate : {
            layout:'border',
            items:[{
                    id:'headbody',
                    region:'north'
                    
            },{
                    id:'mainbody',
		            region:'center',
		            border:false,
		            autoScroll:true,
			        items:[]
            }]
        },
    
    //上下结构页面模板
    showPortalTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle};
        }
        
        // 追加默认页头
        if(cfg.title == null){
            cfg.title = this.defaultTitle;
        }
        
    
    		// 使用默认显示模板
    		if(cfg.displaytemplate == null){
    			 cfg.displaytemplate = this.defaulttemplate;
    		}
    		
    		this.displayconfig = cfg;
    		
    		
    		//  生成页面框架
    		this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
    		var headbody = this.currenttemplate.get('headbody');
    		headbody.add(cfg.title);
    		// 让页头重新计算布局
    		headbody.doLayout();
    		if(cfg.title.length>0){
    			var height=1;
    			for(var i=0;i<cfg.title.length;i++){
    				height+=cfg.title[i].getHeight()
    			}
    			headbody.setHeight(height);
    		}else{
    			headbody.setHeight(cfg.title.getHeight()+1);
    		}
    		        // 主栏目
	        if(cfg.defaultMain == null){
	            cfg.defaultMain = this.currenttemplate.get('mainbody');
	        }
	        
	        if(cfg.main!=null){
	        	for(var i=0;i<cfg.main.length;i++){
		        		cfg.defaultMain.add(cfg.main[i].panel);
	        		if(!cfg.main[i].show){
	        			cfg.main[i].panel.hide();
	        		}
	        	}
	        }
    		cfg.defaultMain.doLayout();
    		
    		// 重新计算整个页面的布局
    		this.currenttemplate.doLayout();
    },
    
    // 默认页面模板
		onepagetemplate : {
			layout:'border',
			items:[{
				id:'mainbody',
				region:'center',
				bodyStyle:'background-color:transparent',
				layout:'fit',
				border:false,
				autoScroll:true,
				height:500,
				margins:'0 0 0 0'
			}]
		},
    
    // 只含有操作区页面模板
    showOnepageTemplate : function(cfg){
    /*
    //debugger;
		var tpl=Ext.lt.template;
		// 生成基本界面
		//document.body.innerHTML='<div layout="{w:{fit:true},h:{fit:true}}"></div>';
		document.body.innerHTML='<div layout="{h:{fit:true}}"></div>';
		var div_main=document.body.firstChild;
		
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.main[0].panel,div_main.offsetWidth,div_main.offsetHeight);			
		})
		*/		
    	
        if(cfg == null){
            cfg = {main:[]};
            return;
        }
    		this.displayconfig = cfg;
    		
    		//  生成页面框架
    		this.currenttemplate = new Ext.Viewport(this.onepagetemplate);
	        
    		var headbody = this.currenttemplate.get('mainbody');
				for(var i=0;i<cfg.main.length;i++){
					if(cfg.main[i].panel!=null){
						headbody.add(cfg.main[i].panel);
					// 隐藏不显示的内容
						if(!cfg.main[i].show) cfg.main[i].panel.hide();
					}     			
				}
    		// 重新计算整个页面的布局
    		this.currenttemplate.doLayout();
    		
    },
    
    // 默认页面模板
    toplefttemplate : {
            layout:'border',
            items:[{
                    id:'headbody',
                    region:'north'
            },{
            		id:'leftbody',
            		region:'west',
            		border:false,
            		//collapsible: true,
            		//margins:'0 0 0 0',
            		// split:true,
                    width: 200,
                    autoScroll:true,
                    minSize: 175,
                    maxSize: 400,
                    border:false,
                    //collapsible: true,
                    margins:'0 0 0 5'
   		    },{
        			id:'mainbody',
        			region:'center',
        			//layout:'column',
        			layout:'fit',
        			border:false,
                    width: 800,
                    autoScroll:true,
        			margins:'0 0 0 0'
            }]
        },
    
    // 上左右功能页面模板
    showTopLeftTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft};
        }
   		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.toplefttemplate;
    	}
    	this.displayconfig = cfg;
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
        
        var mainbody = this.currenttemplate.get('mainbody');
        if(cfg.main!=null){
        	for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null){
	        		mainbody.add(cfg.main[i].panel);
        			if(!cfg.main[i].show){
        				cfg.main[i].panel.hide();        		
        			}		
        		}
        	}
        }
        
		if(cfg.title!=null){
	    	var headbody = this.currenttemplate.get('headbody');
	    	headbody.add(cfg.title);
	    		// 让页头重新计算布局
	    	headbody.doLayout();
	    	if(cfg.title.length>0){
	    		var height=1;
	    		for(var i=0;i<cfg.title.length;i++){
	    			height+=cfg.title[i].getHeight();
	    		}
	    		headbody.setHeight(height);
	    	}else{
	    		headbody.setHeight(cfg.title.getHeight()+1);
	    	}
    	}

    	if(cfg.left!=null){
	    	var leftbody = this.currenttemplate.get('leftbody');
	    	leftbody.add(cfg.left);
	    		// 让页头重新计算布局
	    	leftbody.doLayout();
	    	if(cfg.left.length>0){
	    		var width=1;
	    		for(var i=0;i<cfg.left.length;i++){
	    			width+=cfg.left[i].getWidth();
	    		}
	    		leftbody.setWidth(width);
	    		//leftbody.setWidth(200);
	    	}else{
//	    		leftbody.setWidth(cfg.left.getWidth()+1);
		    	if(cfg.left==this.defaultLeft){
	    			leftbody.setWidth(0);
	    		}else{
	    			leftbody.setWidth(200);
	    		}
	    	}
    	}
    	mainbody.doLayout();
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    	mainbody.on("afterlayout",function(pan,layout){
		   		if(Ext.lt.template.main2showpanel==null)return;
		   		Ext.lt.template.main2showpanel.setHeight(Ext.lt.template.getMainPanel().getHeight());
			   	Ext.lt.template.main2showpanel.doLayout();
    	});
    },
     // 默认页面模板
	lefttoptemplate : {
		layout:'border',
		margins:'0 0 0 0',
		border:false,
		items:[
			{
				id:'leftbody',
				region:'west',
				margins:'0 0 0 5'
			},{
				layout:'border',
				region:'center',
				margins:'0 0 0 0',
				border:false,
				items:[
					{
						id:'headbody',
						region:'north',
						margins:'0 0 0 0',
						border:false
					},{
						id:'mainbody',
						region:'center',
						layout:'fit',
						border:false,
						width: 800,
						autoScroll:true,
						margins:'-1 0 0 0'
					}
				]
			}
		]
	},
    
    // 上左右功能页面模板
    showLeftTopTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft};
        }
   		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.lefttoptemplate;
    	}
    	this.displayconfig = cfg;
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
       	if(cfg.title!=null){
	    	var headbody = this.currenttemplate.findById('headbody');
	    	headbody.add(cfg.title);
	    		// 让页头重新计算布局
	    	headbody.doLayout();
	    	if(cfg.title.length>0){
	    		var height=1;
	    		for(var i=0;i<cfg.title.length;i++){
	    			height+=cfg.title[i].getHeight();
	    		}
	    		headbody.setHeight(height);
	    	}else{
	    		headbody.setHeight(cfg.title.getHeight()+1);
	    	}
    	}
        
        var mainbody = this.currenttemplate.findById('mainbody');
        if(cfg.main!=null){
        	for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null){
	        		mainbody.add(cfg.main[i].panel);
        			if(!cfg.main[i].show){
        				cfg.main[i].panel.hide();        		
        			}		
        		}
        	}
        }
        
	
    	if(cfg.left!=null){
	    	var leftbody = this.currenttemplate.get('leftbody');
	    	leftbody.add(cfg.left);
	    		// 让页头重新计算布局
	    	leftbody.doLayout();
	    	if(cfg.left.length>0){
	    		var width=1;
	    		for(var i=0;i<cfg.left.length;i++){
	    			width+=cfg.left[i].getWidth();
	    		}
	    		leftbody.setWidth(width);
	    		leftbody.setWidth(200);
	    	}else{
//	    		leftbody.setWidth(cfg.left.getWidth()+1);
		    	if(cfg.left==this.defaultLeft){
	    			leftbody.setWidth(0);
	    		}else{
	    			leftbody.setWidth(200);
	    		}
	    	}
    	}
    	mainbody.doLayout();
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    	mainbody.on("afterlayout",function(pan,layout){
		   		if(Ext.lt.template.main2showpanel==null)return;
		   		Ext.lt.template.main2showpanel.setHeight(Ext.lt.template.getMainPanel().getHeight());
			   	Ext.lt.template.main2showpanel.doLayout();
    	});
    },
       // 上左右，右侧分两栏功能页面模板
    showTopLeftCom3Template : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft};
        }
		
			// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 this.toplefttemplate.items.last().layout='column';
    		 cfg.displaytemplate = this.toplefttemplate;
    	}
    		
    	this.displayconfig = cfg;
    	
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);

        var mainbody = this.currenttemplate.get('mainbody');
        if(cfg.main!=null){
        	for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null){
		        		cfg.main[i].panel.columnWidth=.5;
		        		cfg.main[i].panel.style={"padding":"10px 10px 10px 10px"};
		        		cfg.main[i].panel.doLayout();
		        		mainbody.add(cfg.main[i].panel);
	        		if(!cfg.main[i].show){
	        			cfg.main[i].panel.hide();        		
	        		}
	        	}
	        }
        }
    		
		if(cfg.title!=null){
	    	var headbody = this.currenttemplate.get('headbody');
	    	headbody.add(cfg.title);
	    	headbody.doLayout();
	    		// 让页头重新计算布局
	    	if(cfg.title.length>0){
	    		var height=1;
	    		for(var i=0;i<cfg.title.length;i++){
	    			height+=cfg.title[i].getHeight();
	    		}
	    		headbody.setHeight(height);
	    	}else{
	    		headbody.setHeight(cfg.title.getHeight()+1);
	    	}
    	}
    	if(cfg.left!=null){
	    	var leftbody = this.currenttemplate.get('leftbody');
	    	leftbody.add(cfg.left);
	    		// 让页头重新计算布局
	    	leftbody.doLayout();
	    	if(cfg.left.length>0){
	    		var width=1;
	    		for(var i=0;i<cfg.left.length;i++){
	    			width+=cfg.left[i].getWidth();
	    		}
	    		leftbody.setWidth(200);
	    	}else{
//	    		leftbody.setWidth(cfg.left.getWidth()+1);
		    	
		    	if(cfg.left==this.defaultLeft){
	    			leftbody.setWidth(0);
	    		}else{
	    			leftbody.setWidth(200);
	    		}
	    	}
    	}
    	// 让页头重新计算布局
    	mainbody.doLayout();
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    },
    
    // 左右结构主页模板（）
    leftrighttemplate : {
            layout:'border',
            items:[{
            		id:'leftbody',
            		region:'west',
            		border:false,
            		//margins:'0 0 0 0',
            		
                    width: 200,
                   
                    margins:'0 0 0 0'
   		    },{
        			id:'mainbody',
        			region:'center',
        			//layout:'border',
        			border:false,
        			autoScroll:true,
        			margins:'0 0 0 0'
//        			items:[{
//        				id:'headbody',
//                    	region:'north'
//     
//        			},{
//        				id:'mainbody',
//                    	region:'center'
//        			}]
            }]
    },
    
    showLeftRightTemplate : function(cfg){
        if(cfg == null){
            cfg = {left:this.defaultLeft,title:this.defaultTitle};
        }
   		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.leftrighttemplate;
    	}
    	this.displayconfig = cfg;
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
        
        var mainbody = this.currenttemplate.get('mainbody');
        if(cfg.main!=null){
        	for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null){
	        		mainbody.add(cfg.main[i].panel);
        			if(!cfg.main[i].show){
        				cfg.main[i].panel.hide();        		
        			}		
        		}
        	}
        }
        
    	if(cfg.left!=null){
	    	var leftbody = this.currenttemplate.get('leftbody');
	    	leftbody.add(cfg.left);
	    		// 让页头重新计算布局
	    	leftbody.doLayout();
	    	if(cfg.left.length>0){
	    		var width=1;
	    		for(var i=0;i<cfg.left.length;i++){
	    			width+=cfg.left[i].getWidth();
	    		}
	    		leftbody.setWidth(width);
	    	}else{
	    		leftbody.setWidth(cfg.left.getWidth()+1);
	    	}
	    	leftbody.setWidth(200);
    	}
    	mainbody.doLayout();
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    },
        // 上左右（右侧分两栏）下模版 (青海门户使用)
    topleftfoottemplate : {
            layout:'border',
            items:[{
                    id:'headbody',
                    region:'north'
            },{
            		id:'leftbody',
            		region:'west',
            		border: false,
            		margins:'0 0 0 0'
			}, {
					
            		layout:'border',
            		region:'center',
            		items:[{
            			id:'mainbody',
            			region:'center',
            			border: false,
            			autoScroll:true,
            			bodyStyle:'overflow-y:auto;overflow-x:hidden;',
            			margins:'0 0 0 0'
            		},{
            			id:'footbody',
            			region:'south',
            			border: false,
            			autoScroll:true,
            			margins:'0 0 0 0'	
            		}]
			}]
    },
        
            // 上左右（右侧分两栏）下页面模版 (青海门户使用)青海门户使用
    showTopLeftCom3FootTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft,main:this.defaultMain};
        }
        // 追加默认页头
        if(cfg.left == null){
            cfg.left = this.defaultLeft;
        }
        
        // 主栏目
        if(cfg.defaultMain == null){
            cfg.defaultMain = this.defaultCom3Main;
        }
        
        var arr=new Array();
        if(cfg.main!=null){
	        for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null)
	        	{
	        	arr.push(cfg.main[i]);
	        	}
	        }
	        var j=0;
        	for(var i=0;i<arr.length;i++,j++){
		        		arr[i].panel.style={"padding":"10px 10px 10px 10px"};
		        		arr[i].panel.tools = tools;
		        		arr[i].panel.doLayout();
		        		arr[i].panel.collapsible=true;
		        		if(j>1){
		        				if(arr[i-2].panel.panelheight>300){
			        				j++;
			        			}
		        		}
		        		cfg.defaultMain.items.items[j%2].add(arr[i].panel);
		        		
	        		if(!arr[i].show){
	        			arr[i].panel.hide();        		
	        		}
	        }
        }
            // 追加默认页头
        if(cfg.title == null){
            cfg.title = this.defaultTitle;
        }
    		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.topleftfoottemplate;
    	}
    	this.displayconfig = cfg;
    		
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
    	var headbody = this.currenttemplate.get('headbody');
    	headbody.add(cfg.title);
    	headbody.doLayout();
    		// 让页头重新计算布局
    	if(cfg.title.length>0){
    		var height=1;
    		for(var i=0;i<cfg.title.length;i++){
    			height+=cfg.title[i].getHeight();
    		}
    		headbody.setHeight(height);
    	}else{
    		headbody.setHeight(cfg.title.getHeight()+1);
    	}

    	var footbody = Ext.getCmp('footbody');
    	var footheight=190;
		if(cfg.foot!=null){
    		footbody.add(cfg.foot);
    	}
    	footbody.setHeight(footheight);
    	footbody.doLayout();
    	
    	var mainbody = Ext.getCmp('mainbody');
    	
    		// 让页头重新计算布局
    	mainbody.add(cfg.defaultMain);
    	mainbody.doLayout();
    	
    	var leftbody = this.currenttemplate.get('leftbody');
    	leftbody.add(cfg.left);
    		// 让页头重新计算布局
    	leftbody.doLayout();
    	if(cfg.left.length>0){
    		var width=1;
    		for(var i=0;i<cfg.left.length;i++){
    			width+=cfg.left[i].getWidth();
    		}
    		leftbody.setWidth(width);
    	}else{
    		leftbody.setWidth(cfg.left.getWidth()+1);
    	}
    	leftbody.setWidth(200);
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    },
    
    // 上左右(2两栏)黑龙江门户使用
    toplefthljtemplate : {
            layout:'border',
            items:[{
                    id:'headbody',
                    region:'north'
            },{
            		id:'leftbody',
            		region:'west',
            		border:false,
            		//collapsible: true,
            		//margins:'0 0 0 0',
            		// split:true,
                    width: 200,
                    //autoScroll:true,
                    minSize: 175,
                    maxSize: 400,
                    border:false,
                  //  collapsible: true,
                    margins:'0 0 0 0'
			}, {
            			id:'mainbody',
            			region:'center',
            			border: false,
            			autoScroll:true,
            			bodyStyle:'overflow-y:auto;overflow-x:hidden;',
            			margins:'0 0 0 0'
			}]
        },
    // 上左右(2两栏)黑龙江风格页面模版
    showTopLeftCom3HLJTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft,main:this.defaultMain};
        }
        // 追加默认页头
        if(cfg.left == null){
            cfg.left = this.defaultLeft;
        }
        
        // 主栏目
        if(cfg.defaultMain == null){
            cfg.defaultMain = this.defaultCom3Main;
        }
        
	    var arr=new Array();
        if(cfg.main!=null){
	        for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null)
	        	{
	        		arr.push(cfg.main[i]);
	        	}
	        }
	        var j=0;
        	for(var i=0;i<arr.length;i++,j++){
		        		arr[i].panel.style={"padding":"0px 0px 0px 0px"};
		        		arr[i].panel.tools = tools;
		        		arr[i].panel.doLayout();
		        	//	arr[i].panel.collapsible=true;
		        	var hhh = (document.body.clientHeight-50)/2+20;
		        		if(j>1){
		        				if(arr[i-2].panel.panelheight>hhh){
			        				j++;
			        			}
		        		}
		        		cfg.defaultMain.items.items[j%2].add(arr[i].panel);
		        		
	        		if(!arr[i].show){
	        			arr[i].panel.hide();        		
	        		}
	        }
        }
            // 追加默认页头
        if(cfg.title == null){
            cfg.title = this.defaultTitle;
        }
    		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.toplefthljtemplate;
    	}
    	this.displayconfig = cfg;
    		
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
    	var headbody = this.currenttemplate.get('headbody');
    	headbody.add(cfg.title);
    	headbody.doLayout();
    		// 让页头重新计算布局
    	if(cfg.title.length>0){
    		var height=1;
    		for(var i=0;i<cfg.title.length;i++){
    			height+=cfg.title[i].getHeight();
    		}
    		headbody.setHeight(height);
    	}else{
    		headbody.setHeight(cfg.title.getHeight()+1);
    	}

    	
    	var mainbody = Ext.getCmp('mainbody');
    	
    		// 让页头重新计算布局
    	mainbody.add(cfg.defaultMain);
    	mainbody.doLayout();
    	
    	var leftbody = this.currenttemplate.get('leftbody');
    	leftbody.add(cfg.left);
    		// 让页头重新计算布局
    	leftbody.doLayout();
    	if(cfg.left.length>0){
    		var width=1;
    		for(var i=0;i<cfg.left.length;i++){
    			width+=cfg.left[i].getWidth();
    		}
    		leftbody.setWidth(width);
    	}else{
    		leftbody.setWidth(cfg.left.getWidth()+1);
    	}
    	leftbody.setWidth(200);
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    	//重新计算高度。但目前无法计算里面iframe和div等高度
    	/*var lastheight=mainbody.lastSize.height;
    	for(var i=0;i<arr.length;i++){
    		if(arr[i].panel.panelheight>300){
	        	arr[i].panel.setHeight(lastheight);
	        }else{
	        	arr[i].panel.setHeight(lastheight/2);
	        }
	    }*/
    },
    
    // 上左右(2两栏)黑龙江嵌套第三方业务系统组件的模板
    showTopLeftCom1HLJTemplate : function(cfg){
        if(cfg == null){
            cfg = {title:this.defaultTitle,left:this.defaultLeft,main:this.defaultMain};
        }
        // 追加默认页头
        if(cfg.left == null){
            cfg.left = this.defaultLeft;
        }
        
        // 主栏目
        if(cfg.defaultMain == null){
            cfg.defaultMain = this.defaultCom1Main;
        }
        
	    var arr=new Array();
        if(cfg.main!=null){
	        for(var i=0;i<cfg.main.length;i++){
	        	if(cfg.main[i].panel!=null)
	        	{
	        		arr.push(cfg.main[i]);
	        	}
	        }
	        var j=0;
        	for(var i=0;i<arr.length;i++,j++){
		        		arr[i].panel.style={"padding":"0px 0px 0px 0px"};
		        		arr[i].panel.tools = tools;
		        		arr[i].panel.doLayout();
		        	//	arr[i].panel.collapsible=true;
		        	var hhh = (document.body.clientHeight-50)/2+20;
		        		if(j>1){
		        				if(arr[i-2].panel.panelheight>hhh){
			        				j++;
			        			}
		        		}
		        		cfg.defaultMain.items.items[j%2].add(arr[i].panel);
		        		
	        		if(!arr[i].show){
	        			arr[i].panel.hide();        		
	        		}
	        }
        }
            // 追加默认页头
        if(cfg.title == null){
            cfg.title = this.defaultTitle;
        }
    		// 使用默认显示模板
    	if(cfg.displaytemplate == null){
    		 cfg.displaytemplate = this.toplefthljtemplate;
    	}
    	this.displayconfig = cfg;
    		
    		
    		//  生成页面框架
    	this.currenttemplate = new Ext.Viewport(cfg.displaytemplate);
    	var headbody = this.currenttemplate.get('headbody');
    	headbody.add(cfg.title);
    	headbody.doLayout();
    		// 让页头重新计算布局
    	if(cfg.title.length>0){
    		var height=1;
    		for(var i=0;i<cfg.title.length;i++){
    			height+=cfg.title[i].getHeight();
    		}
    		headbody.setHeight(height);
    	}else{
    		headbody.setHeight(cfg.title.getHeight()+1);
    	}

    	
    	var mainbody = Ext.getCmp('mainbody');
    	
    		// 让页头重新计算布局
    	mainbody.add(cfg.defaultMain);
    	mainbody.doLayout();
    	
    	var leftbody = this.currenttemplate.get('leftbody');
    	leftbody.add(cfg.left);
    		// 让页头重新计算布局
    	leftbody.doLayout();
    	if(cfg.left.length>0){
    		var width=1;
    		for(var i=0;i<cfg.left.length;i++){
    			width+=cfg.left[i].getWidth();
    		}
    		leftbody.setWidth(width);
    	}else{
    		leftbody.setWidth(cfg.left.getWidth()+1);
    	}
    	leftbody.setWidth(200);
    		// 重新计算整个页面的布局
    	this.currenttemplate.doLayout();
    	//重新计算高度。但目前无法计算里面iframe和div等高度
    	/*var lastheight=mainbody.lastSize.height;
    	for(var i=0;i<arr.length;i++){
    		if(arr[i].panel.panelheight>300){
	        	arr[i].panel.setHeight(lastheight);
	        }else{
	        	arr[i].panel.setHeight(lastheight/2);
	        }
	    }*/
    },
    
    defaultCom1Main: new Ext.Panel({
			id: 'systemcom1main',
			region: 'center', // this is what makes this panel into a region within the containing layout
			border: false,
			cls : 'defmainbodycom3style',
			layout: 'column',
			margins: '0 0 0 0',
			items: [{
					border:false,
					columnWidth:1,
	                items:[]
	            }]
		}),
    
    
    defaultLeft: new Ext.Panel({id:'systemleft'}),

    // 默认页头
    defaultTitle : new Ext.Panel({
        id:'systemtitle'
   }),
   
   defaultCom3Main: new Ext.Panel({
		id: 'systemcom3main',
		region: 'center', // this is what makes this panel into a region within the containing layout
		border: false,
		cls : 'defmainbodycom3style',
		layout: 'column',
		margins: '0 0 0 0',
		items: [{
				border:false,
				columnWidth:.61182,
                items:[]
            },{
            	border:false,
				columnWidth:.37818,
                items:[]
            }]
	}),
   mask:function(test,cls,panel){
  		this.currenttemplate.getEl().mask(test,cls);
   },
   unmask:function(){
  		this.currenttemplate.getEl().unmask();
   },
   maskPanel:function(panel,test,cls){
   		if(null==panel) panel=this.currenttemplate.currenttemplate;
  		panel.getEl().mask(test,cls);
   },
   unmaskPanel:function(panel){
  	 	if(null==panel) panel=this.currenttemplate.currenttemplate;
  		panel.getEl().unmask();
   },
   loadmask:function(panel,text){
   		if(null==panel) panel=Ext.lt.template.currenttemplate;
   		if(null==panel)return;
   		var showMsg = "正在处理,请稍侯...";
   		if(text!=null)showMsg = text;
   		if(panel.loadMask==null){
			panel.loadMask=new Ext.LoadMask(panel.getEl(),{
				msgCls  : "loadMask",
				msg:'<span class="mark_txt">'+showMsg+'</span><div id="'+panel.id+'_loadmask" class="mark" style="width:0px"></div>'
			});
		}
		panel.closeLoadMask=true;
		panel.loadMask.show(); 
		document.getElementById(panel.id+'_loadmask').style.width=0;
  		var i=0;
  		function runPar(){
			if(panel.closeLoadMask==false){
				try{
					document.getElementById(panel.id+'_loadmask').style.width=277;
					window.setTimeout(function(){
						try{
							panel.loadMask.hide();
							panel.loadMask=null;
						}catch(e){}
					},1);
				}catch(e){}
  				return;
  			}
  			i++;
  			document.getElementById(panel.id+'_loadmask').style.width=Math.pow(0.1,1/i)*277;
  			window.setTimeout(function(){
  				runPar();
  			},500);
  		}
  		runPar();
   },
   closeloadmask:function(panel){
   	if(null==panel)panel=Ext.lt.template.currenttemplate;
   	if(null==panel)return;
  		panel.closeLoadMask=false;
   },
   showPanel2CenterMain:function(id){
   	var itm=this.getMainPanel().items.items;
		for(var i=0;i<itm.length;i++){
			if(itm[i].id==id){
				itm[i].show();
				Ext.lt.template.main2showpanel=itm[i];
			   	Ext.lt.template.main2showpanel.setHeight(Ext.lt.template.getMainPanel().getHeight());
			   	Ext.lt.template.main2showpanel.doLayout();
   			}else{
   				itm[i].hide();
   			}
		}
		this.getMainPanel().doLayout();
   },
   addPanel2CenterMain:function(panel){
   		var itm=this.getMainPanel().items.items;
	   for(var i=0;i<itm.length;i++){
		if(itm[i].id==panel.id){
			this.showPanel2CenterMain(panel.id);
			return;
		}   
	   }
	   	panel.height=this.getMainPanel().getHeight();
	   	this.getMainPanel().add(panel);
		this.showPanel2CenterMain(panel.id);
	},
	removePanel2CenterMain:function(panel){
	},
	getLeftPanel:function(){
		return Ext.lt.template.currenttemplate.get("leftbody"); 
	},
	getTitlePanel:function(){
		return Ext.lt.template.currenttemplate.get("headbody"); 
	},
	getMainPanel:function(){
		//return Ext.lt.template.currenttemplate.get("mainbody");
		return Ext.getCmp("mainbody");
	},
	isHaveMainPanel2id:function(id){
		var itm=this.getMainPanel().items.items;
	   for(var i=0;i<itm.length;i++){
		if(itm[i].id==id){
			return true;
		}   
	   }
	   return false;
	},
   // 演示用简单框架
   showDemoPageTemplate : function(cfg){
        if(cfg == null){
            cfg = {};
        }
    		this.displayconfig = cfg;
    		
    		//  生成页面框架
    		this.currenttemplate = new Ext.Viewport({
            layout:'border',
            items:[{
                    id:'headbody',
                    region:'north',
                    height:100
            },{
            		id:'leftbody',
            		region:'west',
            		width:200,
            		border:0,
            		margins:'0 0 0 0'
			},{
            		id:'mainbody',
            		region:'center',
            		border:0,
            		autoScroll:true,
            		margins:'0 0 0 0'
			 }]
        });
	      
	      if(cfg.headbody !=null){
	      	this.currenttemplate.get('headbody').add(cfg.headbody);
	      }
	      if(cfg.leftbody !=null){
	      	this.currenttemplate.get('leftbody').add(cfg.leftbody);
	      }
	      if(cfg.mainbody !=null){
	      	this.currenttemplate.get('mainbody').add(cfg.mainbody);
	      }

    		// 重新计算整个页面的布局
    		this.currenttemplate.doLayout();
   },

	// 使用的一体化首页风格模板
	// 界面分为页头、菜单、主体三个区域
	// 参数结构 {title:'页头区对象',menu:'主菜单区对象',main:'页面主体区域对象'}
	showIfmisPageTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// 生成基本界面
		if(cfg.titleheight==null){cfg.titleheight=50}
		cfg.el.innerHTML='<div layout="{w:{fit:true},h:{fit:',cfg.titleheight,'}}"></div><div id="top" layout="{w:{fit:true}}"></div><div id="default_main" layout="{w:{fit:true},h:{fit:\'auto\'}}"></div>'
		
		var div_title=cfg.el.firstChild;
		var div_menu=div_title.nextSibling;
		var div_main=div_menu.nextSibling;
		
		tpl.draw(div_title,cfg.title);
		tpl.draw(div_menu,cfg.menu);
		tpl.draw(div_main,cfg.main);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.title,div_title.offsetWidth,div_title.offsetHeight);
			tpl.resize(cfg.menu,div_menu.offsetWidth,div_menu.offsetHeight);
			tpl.resize(cfg.main,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
		// 使用的一体化首页风格模板
	// 界面分为页头、主体三个区域
	// 参数结构 {title:'页头区对象',main:'页面主体区域对象'}
	,showIfmisTopTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// 生成基本界面
		cfg.el.innerHTML='<div layout="{w:{fit:true}}"></div><div id="default_main" layout="{h:{fit:\'auto\'}}"></div>'
		
		var div_title=cfg.el.firstChild;
		var div_main=div_title.nextSibling;
		tpl.draw(div_title,cfg.title);
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.title,div_title.offsetWidth,div_title.offsetHeight);
			tpl.resize(cfg.main[0].panel ,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
	// 使用的一体化首页风格模板
	// 界面分为页头、左侧、主体三个区域
	// 参数结构 {title:'页头区对象',left:'左侧内容',main:'页面主体区域对象'}
	,showIfmisTopLeftTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// 生成基本界面
		cfg.el.innerHTML='<div layout="{w:{fit:true},h:{fit:50}}"></div><div id="top" layout="{w:{fit:true}}"></div><div id="default_main" layout="{w:{fit:true},h:{fit:\'auto\'}}"></div>'
		
		var div_title=cfg.el.firstChild;
		var div_left=div_title.nextSibling;
		var div_main=div_left.nextSibling;
		
		tpl.draw(div_title,cfg.title);
		tpl.draw(div_left,cfg.left);
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.title,div_title.offsetWidth,div_title.offsetHeight);
			tpl.resize(cfg.left,div_left.offsetWidth,div_left.offsetHeight);
			tpl.resize(cfg.main[0].panel,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
	// 使用的一体化首页风格模板
	// 界面分为左侧、主体三个区域
	// 参数结构 {left:'左侧内容',main:'页面主体区域对象'}
	,showIfmisLeftRightTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// 生成基本界面
		cfg.el.innerHTML='<div layout="{h:{fit:true},w:{fit:205}}" style="float: left;"></div><div layout="{w:{fit:\'auto\'},h:{fit:true}}"  ></div>';
		var div_left=cfg.el.firstChild;
		var div_main=div_left.nextSibling;
		
		tpl.draw(div_left,cfg.left);
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.left,div_left.offsetWidth,div_left.offsetHeight);
			tpl.resize(cfg.main[0].panel,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
	// 使用的一体化首页风格模板
	// 界面分为左侧、页头、主体三个区域
	// 参数结构 {title:'页头区对象',left:'左侧内容',main:'页面主体区域对象'}
	,showIfmisLeftTopTemplate:function(cfg){
		var tpl=Ext.lt.template;
		if(cfg.el==null){cfg.el=document.body};
		// 生成基本界面
		cfg.el.innerHTML='<div layout="{h:{fit:true},w:{fit:205}}" style="float: left;"></div><div layout="{w:{fit:\'auto\'},h:{fit:true}}"  style="float: right;" ><div id="top"  layout="{w:{fit:true}}" ></div><div id="default_main" layout="{w:{fit:true},h:{fit:\'auto\'}}"></div></div>'
		var div_left=cfg.el.firstChild;
		var div_title=document.getElementById('top');
		var div_main=div_title.nextSibling;
		
		tpl.draw(div_title,cfg.title);
		tpl.draw(div_left,cfg.left);
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.title,div_title.offsetWidth,div_title.offsetHeight);
			tpl.resize(cfg.left,div_left.offsetWidth,div_left.offsetHeight);
			tpl.resize(cfg.main[0].panel,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
		// 使用的一体化首页风格模板
	// 界面分为主体区域
	// 参数结构 {main:'页面主体区域对象'}
	,showIfmisOnePageTemplate:function(cfg){
		if(cfg==null)return;
		var tpl=Ext.lt.template;
		// 生成基本界面
		if(Ext.lt.template.drawDiv==null){
			Ext.lt.template.drawDiv=document.body;
		}
		if(cfg.el==null){cfg.el=Ext.lt.template.drawDiv};
		cfg.el.innerHTML='<div layout="{w:{fit:true},h:{fit:true}}"></div>'
		
		var div_main=cfg.el;
		
		tpl.draw(div_main,cfg.main[0].panel);
		

		// 处理页面大小变化
		Ext.lt.message.hook("layout","endlayout",function(){
			tpl.resize(cfg.main[0].panel,div_main.offsetWidth,div_main.offsetHeight);			
		})		
	}
	// 将Ext组件，或LT扩展组件生成到指定的div对象中，如果对象不是组件则调用组件的toString方法。如果对象为空，将指定div内容清空
	,draw:function(div,obj){
		if(div==null) return;
		if(obj==null){
			div.innerHTML=='';
			return;	
		}
		// Ext组件都会有render方法
		if(Ext.lt.isFunction(obj.render)){
			obj.render(div);
		}
		// LT组件都会有draw方法
		else if(Ext.lt.isFunction(obj.draw)){
			obj.draw(div);
		}
		else{
			div.innerHTML=obj.toString();
		}
	}
	
	// 调整组件大小，obj为Ext组件或LT扩展组件
	,resize:function(obj,w,h){
		if(Ext.lt.isFunction(obj.setSize)){
			obj.setSize(w,h);
		}
		else if(Ext.lt.isFunction(obj.resize)){
			obj.resize(w,h)
		}
	},
	   themeTemplate : function(type,panels){
		var _type;
		var _panels;
		var _destroy=[];
		var _keys=['r','t','l','b'];
		var k=false;
		var rl=2;
		var index=0;
		var cl=2;
		var l=0
		var _height=0;
		var _width=0;
		function _init(){
			rl=2;
			cl=2;
			var t=_type;
			k=t.charAt(t.length-1);
			if(_keys.indexOf(k)!=-1){
				t=t.substring (0,t.length-1);
			}
			if(t.indexOf('*')==-1){
				cl=parseInt(t);
			}else{
				rl=parseInt(t.split('*')[0]);
				cl=parseInt(t.split('*')[1])
			}
			l=rl*cl;
			if(k=='r'||k=='l'){
				l=rl*(cl-1)+1
			}
			if(k=='t'||k=='b'){
				l=(rl-1)*cl+1;
			}
		}	
		function _destroyPanels(){
			if(_destroy.length==0)return;
			for(var i=0;i<_destroy.length;i++){
				if(_destroy[i]!=null)
					_destroy[i].destroy();
			}
		}
		function _getPanel(){
			if(_panels==null)return;
			if(k=='l'){
				_panels[0].rowspan=rl;
			}
			if(k=='t'){
				_panels[0].colspan=cl;
			}
			if(k=='r'){
				_panels[cl-1].rowspan=rl;
			}
			if(k=='b'){
				_panels[_panels.length-1].colspan=cl;
			}
			var panel=new Ext.Panel({
				layout:'table',
				plain : true,
				//region:'center',
			    layoutConfig: {
			        columns: cl
			    },
			    height:_height,
			    width:_width,
			    items: _panels
			});
			panel.addListener('afterlayout',function(pp,p){
				var h=panel.getHeight()/rl;
				var w=panel.getWidth()/cl;
				if(_height!=0){
					h=_height;
				}
				if(_width!=0){
					w=_width;
				}
				for(var i=0;i<_panels.length;i++){
					var pan=_panels[i];
					var _h=1;
					if(pan.rowspan!=null)_h=pan.rowspan;
					var _w=1;
					if(pan.colspan!=null)_w=pan.colspan;
						pan.setHeight(_h*h);
						pan.setWidth(_w*w);
				}
			});
			return panel;
		}
		
		obj=new function(){
			_type=type;
			_panels=panels;
			this.setPanels=function(panels){
				if(panels!=null){
					_panels=panels;
					_destroy=_destroy.concat(_panels); 
				}
			}
			this.setType=function(type){
				_type=type;
			}
			this.getPanelLength=function(){
				if(_type==null)return 0;
				_init();
				return l;
			}
			this.getMainPanel=function(panels){
				this.setPanels(panels);
				if(_type==null)return null;
				return _getPanel();
			}
			this.destroyPanels=function(){
				_destroyPanels();
			}
			this.setSize=function(w,h){
				_height=h
				_width=w;
			}
		}
		return obj;


	}

};
var testMainbodyPPanel=null;
var testIndex;
var testHeight;
var tools = [
{id:'maximize',handler: function(e, target, panel){
if(panel.getHeight()<100){alert('请先还原再操作');return ;}
			if(Ext.getCmp("maxManbody")==null){
				var _window = new Ext.Window({
					id:'maxMainbody',
					width : 600,
					height : 500,
					//maximizable:true ,
					closable:false,
					layout : 'fit',
					items:[]
				});
			_window.show();
			_window.maximize();
			_window.hide();
			}
			
			testMainbodyPPanel=panel.ownerCt;
			var itm=testMainbodyPPanel.items.items;
			for(var i=0;i<itm.length;i++){
				if(itm[i].id==panel.id){
					testIndex=i;
					break;
				}   
			}
			testHeight=panel.getHeight();
			panel.tools.maximize.hide();
			panel.tools.restore.show();
 			panel.collapsible=false;
			Ext.lt.template.getMainPanel().show();
			Ext.lt.template.getMainPanel().doLayout();
			
			Ext.getCmp("maxMainbody").add(panel);
			Ext.getCmp("maxMainbody").show();
			if(null!=panel.panelheight){
				panel.bwrap.dom.children[0].children[0].style.height=panel.getHeight()-50;
			}
			if(null!=panel.reportinfo_tmp){
				Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,panel.getHeight()-50,panel.getWidth()-50);
			}
		}
	},
	{id:'restore',hidden:true,handler: function(e, target, panel){
	if(panel.getHeight()<100){alert('请先还原再操作');return ;}
			testMainbodyPPanel.insert(testIndex,panel);
			var w=testMainbodyPPanel.getWidth();
			panel.collapsible=true;
			panel.tools.maximize.show();
			panel.tools.restore.hide();
			testMainbodyPPanel.doLayout();
			panel.setHeight(testHeight);
			panel.setWidth(w);
			testMainbodyPPanel=null;
			if(null!=panel.panelheight){
				panel.bwrap.dom.children[0].children[0].style.height=panel.panelheight;
			}
			Ext.lt.template.getMainPanel().show();
			Ext.lt.template.getMainPanel().doLayout();
    		Ext.getCmp("maxMainbody").close();
			if(null!=panel.reportinfo_tmp){
				if(panel.reportinfo_tmp.reportorimage == 0){
					Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,330,372);
				}else{
					Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,330,372);
				}
			}
			
		}
	}
//	{id:'maximize'},
//	{id:'close',handler: function(e, target, panel){panel.ownerCt.remove(panel, true);}}
];
