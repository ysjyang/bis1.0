//Ext.lt.util.createScript(_ROOT_PATH_+"/ltext/extends/ckeditor/ckeditor.js","ckeditor");
Ext.lt.ckedit = Ext.lt.createComponent(function(config){
	if(config==null)config={};
	var lt=Ext.lt;
	config.id='lt'+lt.getNextSeqValue();
	
	var _config={
	    toolbar:[
							[/*'Font',*/'FontSize','Bold','Italic','Underline','Strike','TextColor','-','Subscript','Superscript']],
			font_names : 'ËÎÌå/ËÎÌå;ºÚÌå/ºÚÌå;·ÂËÎ/·ÂËÎ_GB2312;¿¬Ìå/¿¬Ìå_GB2312;Á¥Êé/Á¥Êé;Ó×Ô²/Ó×Ô²;'+ config.font_names ,
			skin :	 'office2003',
			toolbarCanCollapse : true,
			resize_enabled : false
		}
	
	function _init(config){
		
		var d=config.tagel;
		if(d==null)return;
		var dtdiv=document.createElement('DIV');
		var h=d.offsetHeight,w=d.offsetWidth;
		dtdiv.id=config.id;
		d.appendChild(dtdiv);
		dtdiv.style.height=h+'px';
		dtdiv.style.width=w+'px';
		config._drawobj=dtdiv;
		config._drawed=true;
		
		for(var ee in _config){
			if(config[ee]==null){
				config[ee]=_config[ee];
			}
		}
		
		CKEDITOR.editorConfig = function( _config ){_config=config;};
	}
	config.draw=function(div){
		if(config._drawed)return;
		if(div!=null)config.tagel=div;
		_init(config);
		
		config.editor = CKEDITOR.appendTo(config.id)
	}
	config.resize=function(w,h){
		if(config.tagel!=null){
			config.tagel.style.height=h+'px';
			config.tagel.style.width=w+'px';
		}
		if(!config._drawed)return;
		config._drawobj.style.height=h+'px';
		config._drawobj.style.width=w+'px';
	}
	config.setData=function(value){
		config.editor.setData(value);
	}
	config.getData=function(){
		return config.editor.getData();
	}
	return config;
});