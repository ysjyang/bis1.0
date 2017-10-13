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

Ext.lt.fudsmanager.parametersetting = function(config, serviceid) {
	Ext.lt.fudsmanager.parametersetting = serviceid;
	// _guid = config.guid;
	// if (_guid!=null) {
	// var node2=lefttree.qtree.gotoNode(_guid);
	// }
	var ret = {};
	ret.cfg = config;
	ret.draw = function(div) {
		var html = [];
		html
				.push("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
		html.push("<tr>");
		html.push("	<td nowrap='nowrap' valign='top'>");
		html.push("<!-- InstanceBeginEditable name='EditRegion4' -->");
//		html.push("<div class='ttitle'>");
//		html
//				.push("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
//		html.push("<tr>");
//		html.push("<td style='padding-left: 19px;' width='185px'>");
//		html.push("基本参数设置");
//		html.push("</td>");
//		html.push("<td width='150px' class='ttitle_v'>");
//		html.push("&nbsp;");
//		html.push("</td>");
//		html.push("<td>");
//		html.push("&nbsp;");
//		html.push("</td>");
//		html.push("<td width='210px'>");
//		html
//				.push("<table width='100%' border='0' cellspacing='0'cellpadding='0' class='mainqryarea'>");
//		html.push("<tr>");
//		html.push("<td class='search_l'>&nbsp;");
//		html.push("</td>");
//		html.push("<td class='search_m'>");
//		html.push("<input type='text' class='searchinput_' value='请输入关键词' />");
//		html.push("</td>");
//		html
//				.push("<td width='41px' class='search_n' onmouseover='this.className='search_o'' onmouseout='this.className='search_n''>&nbsp;");
//		html.push("</td>");
//		html.push("<td width='10px'>&nbsp;");
//		html.push("</td>");
//		html.push("</tr>");
//		html.push("</table>");
//		html.push("</td>");
//		html.push("</tr>");
//		html.push("</table>");
		html.push("</div>");
		html.push("<div style='height: 10px;'>&nbsp;");
		html.push("</div>");
		html.push("<div class='specialedit'>");
		html
				.push("<table width='90%' border='0' cellspacing='0' cellpadding='0' align='center'>");
		html.push("<tr>");
		html.push("<th>最大传输时间（秒）</th>");
		html.push("<td nowrap='nowrap'>");
		html
				.push("<input type='text' class='inputtype_edit' id='MAXTRANSTIME' name='fudsproperties' onKeyup='valuechange(this)'  value='"
						+ +ret.cfg.MAXTRANSTIME + "'/>");
		html.push("<span class='notice_k'>默认时间600</span>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>上传文件最大限制（kb）</th>");
		html.push("<td nowrap='nowrap'>");
		html
				.push("<input type='text' class='inputtype_edit' id='FILEMAXSIZE' name='fudsproperties' onKeyup='valuechange(this)' value='"
						+ +ret.cfg.FILEMAXSIZE + "' />");
		html.push("<span class='notice_k'>默认设置100000（100MB）</span>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>同时上传最大数</th>");
		html.push("<td nowrap='nowrap'>");
		html
				.push("<input type='text' class='inputtype_edit' id='MAXUPLOAD' name='fudsproperties' onKeyup='valuechange(this)' value='"
						+ +ret.cfg.MAXUPLOAD + "' />");
		html.push("<span class='notice_k'>最大值：50</span>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>同时下载最大数</th>");
		html.push("<td nowrap='nowrap'>");
		html
				.push("<input type='text' class='inputtype_edit' id='MAXDOWNLOAD' name='fudsproperties' onKeyup='valuechange(this)' value='"
						+ +ret.cfg.MAXDOWNLOAD + "' />");
		html.push("<span class='notice_k'>最大值：150</span>");
		html.push("</td>");
		html.push("</tr>");
		html.push("<tr>");
		html
				.push("<th colspan='2' style='border-top: 1px #b9b9b9 dotted; padding-top: 20px; text-align: center;'>");
		html
				.push("<button id='okbutton' class='nomalbtnfuds' onmouseover=\"this.className='nomalbtnfuds_o'\" onmouseout=\"this.className='nomalbtnfuds'\" onclick='saveFUDSProperties()'> 保存 </button>");
		html.push("</th>");
		html.push("</tr>");
		html.push("</table>");
		html.push("</div>");
		html.push("<div style='height: 10px;'>&nbsp;</div>");
		html.push("<!-- InstanceEndEditable -->");
		html.push("</td>");
		html.push("</tr>");
		html.push("</table>");
		div.innerHTML = html.join("");
	}
	ret.resize = function(w, h) {
		// coltab.resize(800,(htmlheight-46));
	}
	ret.reflash = function() {

	}
	return ret;
}

Ext.lt.message.hook("layout", "endlayout", function() {
	// _tabpanel.resize(tabpanel_div.offsetWidth,tabpanel_div.offsetHeight);
})
var post = new Object();
function valuechange(obj) {
	var MAXTRANSTIME = document.getElementById("MAXTRANSTIME").value;
	if (!isitnum(MAXTRANSTIME)) {
		alert("最大传输时间只能为数字");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	if (MAXTRANSTIME > 600 || MAXTRANSTIME < 1) {
		alert("最大传输时间最大值为600");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	var FILEMAXSIZE = document.getElementById("FILEMAXSIZE").value;
	if (!isitnum(FILEMAXSIZE)) {
		alert("上传文件大小只能为数字");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	if (FILEMAXSIZE < 1 || FILEMAXSIZE > 1000000) {
		alert("上传文件大小必须在1-1000000之间");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	var MAXUPLOAD = document.getElementById("MAXUPLOAD").value;
	if (!isitnum(MAXUPLOAD)) {
		alert("最大上传人数只能为数字");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	if (MAXUPLOAD > 50 || MAXUPLOAD < 1) {
		alert("最大上传人数最大值为50");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	var MAXDOWNLOAD = document.getElementById("MAXDOWNLOAD").value;
	if (!isitnum(MAXDOWNLOAD)) {
		alert("最大下载人数只能为数字");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}
	if (MAXDOWNLOAD > 150 || MAXDOWNLOAD < 1) {
		alert("最大下载人数最大值为150");
		obj.value = obj.value.substring(0, obj.value.length - 1);
		return;
	}

}

function saveFUDSProperties() {

	var inputs = document.getElementsByName("fudsproperties");
	for ( var i = 0; i < inputs.length; i++) {
		if (i == 0) {
			post = "{";
		}
		var input = inputs[i];
		var key = input.id;
		var value = input.value;
		post += '"' + key + '":' + value + ''
		if (i != inputs.length - 1) {
			post += ",\n"
		} else {
			post += "}"
		}
	}
	post = $.parseJSON(post);
	document.getElementById("okbutton").disabled = "disabled";
	Ext.lt.RCP.call(Ext.lt.fudsmanager.parametersetting, "saveFUDSProperties",
			post, function(resp) {
				if (resp.success != "true") {
					alert("服务器参数修改成功");
				} else {
					alert("errmsg:数据异常");
				}
				document.getElementById("okbutton").disabled = "";
			});
}

function isitnum(num){
	var r = /^[0-9]*[1-9][0-9]*$/　　//正整数
	return r.test(num); //str为你要判断的字符 执行返回结果 true 或 false 
}

