<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>定时任务管理</title>
<!-- 设置IE默认文本模式，为最高版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css" href="../css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="../css/poppup.css" />
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme35.css" />
<script src="../ltext/ltext_core.js"></script>
<script src="../ltext/datatable3.0.js"></script>
<script src="../js/jquery.js"></script>
<script src="../js/common.js"></script>
<script src="../timertaskmgr/timertaskmgr.js"></script>
</head>

<body>
<div class="bule_style">
  <div class="sysHead">
    <div class="sys_logo"><a href="#">银行接口服务</a><span>定时任务管理</span></div>
    <div class="sys_close"></div>
  </div>
  <div class="sysMain">
    <div class="sysBtnBox">
      <ul class="ULLeft">
        <li>
          <button id="runbt">执行</button>
        </li>
        <li>
          <button id="editbt">编辑</button>
        </li>
        <li>
          <button id="enablebt">启用</button>
        </li>
        <li>
          <button id="disablebt">停用</button>
        </li>
      </ul>
    </div>
    <div class="sysTableBox" id="maintabledata"></div>
  </div>
</div>
</body>
</html>
