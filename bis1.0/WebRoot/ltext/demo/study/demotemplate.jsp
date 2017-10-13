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
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css" />
<script>
//var _ROOT_PATH_="http://localhost:7002"
</script>
<script src="<%=basePath%>/ltext/jquery.js"></script>
<script src="<%=basePath%>/ltext/frameworksupport.js"></script>
<script src="<%=basePath%>/ltext/ltext_core.js"></script>
<script src="<%=basePath%>/ltext/demo/study/template.js"></script>
<script>
//Ext.lt.ltextpath="http://localhost:7002/ltext"
</script>
<style>
*{margin:0px;padding:0px}
</style>
</head>

<body>
</body>
</html>

<%=request.getAttribute("page_content")%>
