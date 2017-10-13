<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"  buffer="1400k"%>
<%
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 
response.setDateHeader("Expires",0); 

String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>framework demo hellow</title>
<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.public=new Date();
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			var windot_top=null;
			var col=[];
		</script>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css" />
		<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/datatable3.0.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/editdatatable.js"></script>
		<script type="text/javascript" src="./editdatatabledemo.js"></script>
</head>

<body>
<div id="dt_div"  style="width:600px;height:800px;"></div>
<script type="text/javascript">
	var edit=new Ext.lt.study.component.editdatatabledemo();
	edit.draw(document.getElementById("dt_div"));
</script>
</body>
</html>

