if (Ext == null) {
	Ext = {};
}
if (Ext.lt == null) {
	Ext.lt = {};
}
if (Ext.lt.fudsmanager == null) {
	Ext.lt.fudsmanager = {};
}

// click lefttree function
Ext.lt.message.hook("left", "click", function(resp) {
	var node_data = resp.node.data;
	if (node_data == null) {
		window.location = "./index.page";
	} else {
		var url = node_data.url;
		window.location = url
	}
});

Ext.lt.fudsmanager.logmanager = function(config, serviceid) {
	Ext.lt.fudsmanager.logmanager = serviceid;
	// _guid = config.guid;
	// if (_guid!=null) {
	// var node2=lefttree.qtree.gotoNode(_guid);
	// }
	var ret = {};
	ret.cfg = config;
	ret.draw = function(div) {
		alert('draw');
	}
	ret.resize = function(w, h) {
		// coltab.resize(800,(htmlheight-46));
	}
	ret.reflash = function() {

	}
	return ret;
}

Ext.lt.fudsmanager.logmanager.search = function() {
	// 拼装查询sql
//	var sql = "select f.filename,l.opertime,l.opertype,l.operuserid,u.name operuser "+
//	"from fw_t_fudslog l,fw_t_fudsfile f,fasp_t_causer u " +
//			"where  l.fileguid =f.guid and l.operuserid= u.guid ";
	
	
	var sql = "select t.*,u.code operuser from (select l.appid,f.filename,l.opertime,l.opertype,l.operuserid "+
	"from fw_t_fudslog l,fw_t_fudsfile f  " +
			" where l.fileguid =f.guid) t left join fasp_t_causer u on operuserid= u.guid  " +
			" where 1=1";
	
	// 文件名
	var filename = document.getElementsByName("filename")[0].value;
	if (filename != "" && filename.indexOf("请录入") < 0) {
		sql += " and t.filename like '%" + filename + "%' ";
	}
	// 操作用户
	var userid = document.getElementsByName("userid")[0].value;
	if (userid != "" && userid.indexOf("请录入") < 0) {
		sql += " and u.code like '%" + userid + "%' ";
	}
	// 产品标识
	var appid = document.getElementsByName("appid")[0].value;
	if (appid != "" && appid.indexOf("请录入") < 0) {
		sql += " and appid ='" + appid + "' ";
	}
	// 起始时间
	var starttime = document.getElementsByName("starttime")[0].value;
	if (starttime != "") {
		sql += " and opertime >'" + maketime(starttime) + "' ";
	}
	// 结束时间
	var endtime = document.getElementsByName("endtime")[0].value;
	if (endtime != "") {
		sql += " and opertime <'" + maketime(endtime) + "' ";
	}
	sql += "order by opertime desc";
//	alert(sql);
	uidatatable.queryData(sql);
}
function maketime(time){
	return time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8)+" 00:00:00";
}


Ext.lt.message.hook("datatable", 'beforesetcols', function(resp) {
	var cols = resp.cols;
	// for(var i=0;i<cols.length;i++){
	// alert(cols[i].name);
	// }
	// 操作用户
	cols[2].width = 200;
	// 文件名
	cols[3].width = 300;
	// 操作时间
	cols[4].width = 150;
	// 操作类型
	cols[5].width = 50;

	cols[5].fn = function(i, j, rs, v) {
		if (rs.opertype == 1)
			return "下载";
		else
			return "上传";
	};

});

Ext.lt.message.hook("editform", "drawed", function(resp) {
	// alert("hook.editform");
	// // 数据类型 下拉值绑定
	// var datatype_eva={
	// appid:{
	// asyncloaddata:function(param){
	// param.data=new Ext.lt.recordset({
	// columns: ['_locationposition', 'code', 'itemid', 'name'],
	// datas: [[0, 'S', 'S', '字符型'], [1, 'N', 'N', '数字型'], [2, 'D', 'D', '日期型']]
	// });
	// }
	// ,change:function(param){
	// appid=param._value.value;
	// }
	// }
	// };
	// resp.editformpanel.attachEvent(datatype_eva);
});

function downloadfile(fileguid) {
	// alert(fileguid);
	// 创建下载组件
	var obj = new Ext.lt.FUDSDownload();
	// 设置appid
	obj.setAppid('common');
	// 设置下载文件的guid
	obj.setFileGuid(fileguid);
	// 直接下载，以ie对话框方式保存
	obj.download();
}

Ext.lt.message
		.hook(
				"datatable",
				"drawed",
				function() {
					var sql = "select t.*,u.code operuser from (select f.filename,l.opertime,l.opertype,l.operuserid "+
						"from fw_t_fudslog l,fw_t_fudsfile f  " +
								" where l.fileguid =f.guid) t left join fasp_t_causer u on operuserid= u.guid  " +
								"order by opertime desc";
					uidatatable.queryData(sql);
				});

Ext.lt.message.hook("layout", "endlayout", function() {
	// _tabpanel.resize(tabpanel_div.offsetWidth,tabpanel_div.offsetHeight);
});
