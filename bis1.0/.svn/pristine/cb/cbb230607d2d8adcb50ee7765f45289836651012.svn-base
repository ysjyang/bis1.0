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
var _edpanel = null;
Ext.lt.fudsmanager.storagechange = function(config, serviceid) {
	Ext.lt.fudsmanager.storagechange = serviceid;
	// _guid = config.guid;
	// if (_guid!=null) {
	// var node2=lefttree.qtree.gotoNode(_guid);
	// }
	var ret = {};
	ret.cfg = config;
	ret.draw = function(div) {
		var html = [];

		// 页面头部
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
//		html.push("存储方式修改");
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
//		html.push("</div>");

		html.push("<div class='specialedit_'>");
		html
				.push("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
		html.push("<tr>");
		html.push("<th width='110px'>现文件存储方式：</th>");
		html.push("<td nowrap='nowrap' id='oldsavetypetd'>");
		// 原存储方式
		html.push(ret.cfg.SAVETYPE);
		html.push("</td>");
		html.push(" <td width='30px' nowrap='nowrap'>&nbsp;</td>");
		html.push("<th width='110px'>新文件存储方式</th>");
		html.push("<td nowrap='nowrap'>");
		// html.push("<input type='text' class='inputtype'
		// value='文件系统/HDFS系统'/><button
		// class='popbtn'>&nbsp;</button></td>");
		html.push("<div id='newtypediv' style='width:300px;'></div></td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>现存储路径：</th>");
		html.push("<td width='30%' id='oldfilepath'>" + ret.cfg.FILESERVER + "</td>");
		html.push("<td>&nbsp;</td>");
		html.push("<th>新存储路径</th>");
		html
				.push("<td nowrap='nowrap'><input type='text' id='newFilePath' class='inputtype_edit' value='' style='width:60%;' /></td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>现用户名：</th>");
		html.push("<td nowrap='nowrap' id='oldusernametd'>" + ret.cfg.USERNAME + "</td>");
		html.push("<td>&nbsp;</td><th>新用户名</th>");
		html
				.push("<td nowrap='nowrap'><input type='text' id='newUsername' class='inputtype_edit' value='' /></td>");
		html.push("</tr>");
		html.push("<tr>");
		html.push("<th>现密码：</th>");
		html.push("<td nowrap='nowrap'>" + "******" + "</td>");
		html.push("<td>&nbsp;</td>");
		html.push("<th>新密码</th>");
		html
				.push("<td nowrap='nowrap'><input type='password' id='newPassword' class='inputtype_pwd' style='width:130px;' value='' /></td>");
		html.push("</tr>");
		html.push("<tr>");
		html
				.push("<th colspan='5' style='border-top:1px #b9b9b9 dotted; padding-top:10px; text-align:center;'><button class='nomalbtnfuds' id='okbutton' onmouseover='this.className=\"nomalbtnfuds_o\"' onmouseout='this.className=\"nomalbtnfuds\"' onclick='savetypechange()'>转换</button></th>");
		html.push("</tr>");
		html.push("</table>");

		html.push("</div>");
		html
				.push("<div class='specialedit_o' style='display:none;' id='checkdiv'>");
		html.push("</div>");
		html.push("<!-- InstanceEndEditable -->");
		html.push("</td>");
		html.push("</tr>");
		html.push("</table>");

		div.innerHTML = html.join("");

		var te = null;
		var cfg = {
			columnsize : 1,
			configs : [ {
				name : "fundtype",
				label : "",
				type : "treeselect",
				treetype : "sin_select",
				isMulti : false,
				clearbtn : true,
				outformart : "#name",
				field : {
					id : 'itemid',
					sid : 'superitemid',
					isleaf : 'isleaf',
					name:'name'
				},
				isrequired : true,
				dataloader : function() {
					return te;
				},
				loadthedata : function() {
						te = new Ext.lt.recordset({
							columns : [ '_locationposition', 'code', 'l',
									'superitemid', 'isleaf', 'itemid', 'name',
									'_sortid' ],
							datas : [ [ 0, '1', 1, '0', 0, '1', '数据库存储', 0 ],
									[ 1, '2', 2, '0', 0, '2', '文件系统存储', 1 ],
									[ 2, '3', 3, '0', 0, '3', 'HDFS系统存储', 2 ] ]
						});
						
				}
			} ]
		};
		_edpanel = new Ext.lt.editpanel2(cfg);
		var el = document.getElementById("newtypediv");
		window.setTimeout(function() {
			_edpanel.draw(el);
			_edpanel.resize(300);
			_edpanel.bind();
		}, 100);
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
function savetypechange(obj) {
	
	document.getElementById("checkdiv").innerHTML = "";
	document.getElementById("checkdiv").style.display = "none";
	if (_edpanel.getvalue4all().fundtype == null
			|| _edpanel.getvalue4all().fundtype == 'undefine') {
		alert("请选择存储类型");
		return;
	}
	if (document.getElementById("newFilePath").value == "") {
		alert("请输入新存储位置");
		return;
	}
	if(document.getElementById("newFilePath").value==document.getElementById("oldfilepath").innerHTML){
		alert("新旧存储位置不能相同");
		return;
	}
	

	// 新的存储类型
	var newSaveType = _edpanel.getvalue4all().fundtype.value;
	var newSaveTypeStr = _edpanel.getvalue4all().fundtype.text
	var newFilePath = document.getElementById("newFilePath").value;
	var newUsername = document.getElementById("newUsername").value;
	var newPassword = document.getElementById("newPassword").value;
	post.newSaveTypeStr = newSaveTypeStr;
	post.newSaveType = newSaveType;
	post.newFilePath = newFilePath;
	post.newUsername = newUsername;
	post.newPassword = newPassword;

	Ext.lt.RCP.call(Ext.lt.fudsmanager.storagechange, "checkNewSaveType", post,
			function(resp) {
				// alert(resp.typeerrormessage);
				if (resp.typeerrormessage == "null") {
//					alert("存储类型验证通过");
					showFileCheck();
				} else {
					alert(resp.errormessage);
				}
				// document.getElementById("okbutton").disabled = "";
			});
}

function showFileCheck() {
	var html = [];
	html.push("<div class='jttitle'>权限校验</div>");
	html.push("<div style='height:10px;'>&nbsp;</div>");
	html
			.push("<table border='0' cellspacing='0' width='50%' cellpadding='0' style='float:left;'>");
	html.push("      <tr>");
	html.push("        <th width='110px'>访问权限检测：</th>");
	html
			.push("        <td nowrap='nowrap' id='checktd1'><span id='check1' class='unpass'>未检测</span></td>");
	html.push("      </tr>");
	html.push("      <tr>");
	html.push("        <th>创建目录权限检测：</th>");
	html
			.push("        <td nowrap='nowrap' id='checktd2'><span id='check2' class='unpass'>未检测</span></td>");
	html.push("      </tr>");
	html.push("      <tr>");
	html.push("        <th>创建文件权限检测：</th>");
	html
			.push("        <td nowrap='nowrap' id='checktd3'><span id='check3' class='unpass'>未检测</span></td>");
	html.push("      </tr>");
	html.push("</table> ");
	html
			.push(" <table border='0' id='startchangetable' style='display:none;' cellspacing='0' cellpadding='0' width='40%' style='float:left;'>");
	html.push(" <tr>");
	html.push(" <th id='changestatusth'>文件转存进度：-/-</th>");
	html.push(" </tr>");
	html.push(" <tr>");
	html.push(" <th>");
	html
			.push(" <div style='background:#FFF url(../../images/fudsmanager/bg/loadingbg.png) repeat-x left bottom;border:1px #c8c8c8 solid; padding:20px;'>");
	html.push(" <img src='../../images/fudsmanager/bg/loading.png'/>");
	html
			.push(" <p style='text-align:center; color:#2a7a31; font-size:32px; font-family:Arial, Helvetica, sans-serif; margin-top:20px;'>95%</p>");
	html.push(" </div>");
	html.push(" </th>");
	html.push(" </tr>");
	html.push("</table> ");
	html.push("</div>");

	document.getElementById("checkdiv").innerHTML = html.join("");
	document.getElementById("checkdiv").style.display = "";
	Ext.lt.RCP.call(Ext.lt.fudsmanager.storagechange, "checkNewSavePath", post,
			function(resp) {
				
				// alert(resp.typeerrormessage);
				showFileCheckResult(resp.patherrormessage);
			});
}

function showFileCheckResult(message) {
	if (message == "null") {
		document.getElementById("check1").setAttribute("class", "pass");
		document.getElementById("check1").innerHTML = "通过";
		document.getElementById("check2").setAttribute("class", "pass");
		document.getElementById("check2").innerHTML = "通过";
		document.getElementById("check3").setAttribute("class", "pass");
		document.getElementById("check3").innerHTML = "通过";
//		alert("开始进行文件转换，请勿关闭此页面");
		startChangeSaveType();
	} else {
		var errorcode = message.substring(message.length - 1, message.length);
		if (errorcode == "1") {
			document.getElementById("check1").innerHTML = "未通过";
			document.getElementById("checktd1").innerHTML = document
					.getElementById("checktd1").innerHTML
					+ "<span class='notice_k'>检查用户是否有访问目录的权限</span>";
		} else if (errorcode == '2') {
			document.getElementById("check1").setAttribute("class", "pass");
			document.getElementById("check1").innerHTML = "通过";
			document.getElementById("check2").innerHTML = "未通过";
			document.getElementById("checktd2").innerHTML = document
					.getElementById("checktd2").innerHTML
					+ "<span class='notice_k'>检查用户是否有创建目录的权限</span>";
		} else if (errorcode == '3') {
			document.getElementById("check1").setAttribute("class", "pass");
			document.getElementById("check1").innerHTML = "通过";
			document.getElementById("check2").setAttribute("class", "pass");
			document.getElementById("check2").innerHTML = "通过";
			document.getElementById("check3").innerHTML = "未通过";
			document.getElementById("checktd3").innerHTML = document
					.getElementById("checktd3").innerHTML
					+ "<span class='notice_k'>检查用户是否有创建文件的权限</span>";
		}
	}
}

var changestarted = false;
var totalnum = 0;
var successnum = 0;
function startChangeSaveType() {
	document.getElementById("startchangetable").style.display = "";
	document.getElementById("okbutton").disabled = "disabled";
	changestarted = true;
	Ext.lt.RCP.call(Ext.lt.fudsmanager.storagechange, "saveNewSaveType", post,
			function(resp) {
				if(resp.started=="true"){
					alert("系统当前正在进行存储方式修改，请等待后台操作完毕后再进行修改");
					document.getElementById("startchangetable").style.display = "none";
					document.getElementById("okbutton").disabled = "";
				}else{
					alert("已开始转换");
					setTimeout("getChangeStatus()", 500);
				}
			});

}

function changeSuccess(successnum){
	document.getElementById("changestatusth").innerHTML = "文件转存进度："
		+ successnum + "/" + totalnum + "  失败的文件数:"
		+ "<font color=red>"+(totalnum-successnum)+"</font>";
	alert("转换成功，转换失败的文件数为" + (totalnum-successnum) + "个");
	document.getElementById("oldsavetypetd").innerHTML=post.newSaveTypeStr;
	document.getElementById("oldfilepath").innerHTML=post.newFilePath;
	document.getElementById("newFilePath").value="";
	document.getElementById("newUsername").value="";
	document.getElementById("newPassword").value="";
}

function getChangeStatus() {
	Ext.lt.RCP
			.call(
					Ext.lt.fudsmanager.storagechange,
					"getSavingStatus",
					post,
					function(resp) {
						if (changestarted) {
							var status = resp.status.split(",");
							if (status[0] == "true"){
								document.getElementById("changestatusth").innerHTML = "文件转存进度："
									+ status[1] + "/" + status[2];
								totalnum = status[2];
								setTimeout("getChangeStatus()", 1000);
							}else{
								changeSuccess(totalnum);
								endChangeSaveType();
							}
						}
					});
}

function endChangeSaveType() {
	changestarted=false;
	totalnum = 0;
	successnum = 0;
	document.getElementById("okbutton").disabled = "";
	post = new Object();
}
