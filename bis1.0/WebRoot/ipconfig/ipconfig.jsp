<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>IP地址配置</title>
<!-- 设置IE默认文本模式，为最高版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<link rel="stylesheet" type="text/css" href="../../css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="../../css/poppup.css" />
<link rel="stylesheet" type="text/css" href="/ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css"
	href="/ltext/datatabletheme35.css" />

<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/datatable3.0.js"></script>
<script src="/js/jquery.js"></script>
<script src="/js/common.js"></script>
<script src="/ipconfig/ipconfig.js"></script>
</head>


<body>
	<div class="bule_style">
		<div class="sysHead">
			<div class="sys_logo">
				<a href="#">银行接口服务</a><span>IP地址配置</span>
			</div>
			<div class="sys_close"></div>
		</div>
		<div class="sysMain">
			<div class="sysTableBox" id="maindiv"></div>
		</div>
	</div>
</body>
</html>
