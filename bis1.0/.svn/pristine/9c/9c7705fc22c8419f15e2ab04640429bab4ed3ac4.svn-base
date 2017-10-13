if (Ext == null) {
	Ext = {};
}
if (Ext.lt == null) {
	Ext.lt = {};
}
if (Ext.lt.fudsmanager == null) {
	Ext.lt.fudsmanager = {};
}
Ext.lt.fudsmanager.realtime = function(config, serviceid) {
	Ext.lt.fudsmanager.realtime = serviceid;
	var ret = {
		cfg : config
	};

	function _buildReflash(cfg) {
		var servers = (ret.cfg.fudsservers + "").split(",");
		var servershtml = [];
		servershtml.push("<select class='selectstyle_n' id='selectedserver'>");
		for ( var is = 0; is < servers.length; is++) {
			servershtml.push("<option>" + servers[is] + "</option>");
		}
		servershtml.push("</select>");
		cfg.reflash.innerHTML = "<button type='button' class='nomalbtnfuds' onmouseover=\"this.className='nomalbtnfuds_o'\" onmouseout=\"this.className='nomalbtnfuds'\">刷新</button>"
				+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				+ servershtml.join("");
		cfg.reflash.firstChild.onclick = function() {
			showOnlineUser(cfg);
		}
	}

	function _buildFlash(cfg) {
		var chart = new FusionCharts("/ltext/Charts/Pie3D.swf", "ChartId",
				"500", "200", "0", "0");
		chart
				.setDataXML("<chart caption='存储空间' palette='4' decimals='2' enableSmartLabels='1' enableRotation='1'"
						+ "bgColor='99CCFF,FFFFFF' bgAlpha='40,100' bgRatio='0,100' bgAngle='360'"
						+ "showBorder='1' startingAngle='70' numberSuffix=' GB'>"
						+ "<set label='已用空间' value='"
						+ (cfg.diskspace.USEDSPACE / 1024 / 1024 / 1024)
						+ "' />"
						+ "<set label='可用空间' value='"
						+ (cfg.diskspace.FREESPACE / 1024 / 1024 / 1024)
						+ "' /></chart>");
		chart.render("chartdiv");
	}

	function _buildDown(cfg) {
		var config = {
			title : '当前下载用户数：0',
			data : []
		};
		var col = [ {
			name : 'filename',
			datatype : 'S',
			alias : '下载文件名'
		} ];
		col.push({
			name : 'userid',
			datatype : 'S',
			alias : '下载用户',
			format : '#name',
			mapper : {
				"datas" : [],
				"columns" : [ "guid", "code", "name" ]
			}

		});
		col.push({
			name : 'starttime',
			datatype : 'S',
			alias : '下载开始时间'
		});
		col.push({
			name : 'percent',
			datatype : 'S',
			alias : '已下载比例',
			width :200,
			fn:function(i,j,rs,value){
				return getHTML(value)
			}
		});
		col.push({
			name : 'transformedlength',
			datatype : 'S',
			alias : '已下载大小(kb)'
		});
		col.push({
			name : 'transformedtime',
			datatype : 'S',
			alias : '下载用时（秒）'
		});
		config.col = col;
		cfg.downtable = new Ext.lt.ui.datatable(config, serviceid);
		cfg.downtable.draw(cfg.down)
	}

	function _buildUp(cfg) {
		var config = {
			title : '当前上传用户数：0',
			data : []
		};
		var col = [ {
			name : 'filename',
			datatype : 'S',
			alias : '上传文件名'
		} ];
		col.push({
			name : 'userid',
			datatype : 'S',
			alias : '上传用户',
			format : '#name',
			mapper : {
				"datas" : [],
				"columns" : [ "guid", "code", "name" ]
			}
		});
		col.push({
			name : 'starttime',
			datatype : 'S',
			alias : '上传开始时间'
		});
		col.push({
			name : 'transformedlength',
			datatype : 'S',
			alias : '已上传大小(kb)'
		});
		col.push({
			name : 'transformedtime',
			datatype : 'S',
			alias : '上传用时（秒）'
		});
		config.col = col;
		cfg.uptable = new Ext.lt.ui.datatable(config, serviceid);
		cfg.uptable.draw(cfg.up);

	}

	function _draw(cfg) {
		cfg.el.innerHTML = "<div style='height:200px' id='chartdiv' align='center'></div><div style='height:30px'></div><div></div><div></div>";
		cfg.flash = cfg.el.firstChild;
		cfg.reflash = cfg.flash.nextSibling;
		cfg.down = cfg.reflash.nextSibling;
		cfg.up = cfg.down.nextSibling;

		var w = $(window).width();
		var h = $(window).height();
		cfg.flash.style.width = w + 'px';
		cfg.reflash.style.width = w + 'px';
		cfg.down.style.width = w + 'px';
		cfg.up.style.width = w + 'px';
		var _h = (h - 250) / 2;
		if (_h < 100) {
			_h = 100;
		}
		cfg.down.style.height = _h + 'px';
		cfg.up.style.height = _h + 'px';
		_buildFlash(cfg)
		_buildReflash(cfg)
		_buildDown(cfg)
		_buildUp(cfg)
	}

	ret.resize = function(w, h) {
		this.cfg.flash.style.width = w + 'px';
		this.cfg.reflash.style.width = w + 'px';
		this.cfg.down.style.width = w + 'px';
		this.cfg.up.style.width = w + 'px';
		var _h = (h - 250) / 2;
		if (_h < 100) {
			_h = 100;
		}
		this.cfg.down.style.height = _h + 'px';
		this.cfg.up.style.height = _h + 'px';

		this.cfg.downtable.resize(w, _h)
		this.cfg.uptable.resize(w, _h)

	}

	ret.draw = function(div) {
		this.cfg.el = div;
		_draw(this.cfg);
	}

	return ret;
}

function getHTML(num){
	var html=[];
		html.push('<div style="background-color:#fff;position:relative;top:0px; width:200px;">');
		html.push('<div style="background-color:#fff;position:absolute;z-index:9;top:0px; width:200px;">&nbsp;</div>');
    html.push('<div style="background-color:transparent;width:',num*2,'px; position:absolute;top:0px; z-index:999;width:200px;text-align:center;color:#FFF">',num,'%</div>');
    html.push('<div style="background-color:#2a7a31;height:20px;width:',num*2,'px; position: absolute;top:5px; z-index:99">&nbsp;</div>');
    html.push('</div>	');
    return html.join('');
}


function showOnlineUser(cfg) {
	var selectedserver = document.getElementById("selectedserver").options[document
			.getElementById("selectedserver").selectedIndex].text;
	// debugger;
	// alert(document.getElementById("selectedserver"));
	if (selectedserver == "没有可用服务器") {
		return;
	}
	var message = {
		fudsservername : selectedserver
	}
	Ext.lt.RCP.call(Ext.lt.fudsmanager.realtime, "getOnlineUser", message,
			function(resp) {
				// alert(resp.onlineusers);
				// var users = resp.onlineusers;
				if (resp.onlineupusers != "undefine") {
					for(var mapperValue in resp.onlineupmapper){
						cfg.uptable.addMapperDatas(mapperValue, resp.onlineupmapper[mapperValue]);
					}
					
					cfg.uptable.ui_setRecordset(resp.onlineupusers);
					cfg.uptable.setTitle("当前上传用户数："
							+ cfg.uptable.getRecordset().size());
					cfg.uptable.reflash();

				}
				if (resp.onlinedownusers != "undefine") {
					for(var mapperValue in resp.onlineupmapper){
						cfg.downtable.addMapperDatas(mapperValue, resp.onlinedownmapper[mapperValue]);
					}
					cfg.downtable.ui_setRecordset(resp.onlinedownusers);
					
					cfg.downtable.setTitle("当前下载用户数："
							+ cfg.downtable.getRecordset().size());
					cfg.downtable.reflash();
				}
			});
}
