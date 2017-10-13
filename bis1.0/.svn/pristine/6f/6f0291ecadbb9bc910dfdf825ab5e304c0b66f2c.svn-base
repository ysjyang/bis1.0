<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>修改登录密码</title>
<link rel="stylesheet" type="text/css" href="../../css/poppup.css" />
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/usermanage/changepwd/changePwdSub.js"></script>
<%
  String msg = (String)request.getAttribute("msg");
  msg = (msg==null)?"":msg; //第一次进入该页面msg获取过来的值为空
  String code = (String)request.getParameter("code");
%>
</head>

<body>
<form action="/bis/changePwdSub.do" method="post" id="f">
  <fieldset>
    <div><label>用户名：</label><input type="text" name="code" value="<%=code %>" readonly/></div>
    <div><label>旧密码：</label><input type="password" name="oldPwd" id="txtOldPass"/><span id="password0.info"></span></div>
    <div><label>新密码：</label><input type="password" name="newPwd" id="txtPassword"/><span id="password.info"></span></div>
    <div><label>确认新密码：</label><input type="password" name="comfirmPwd" id="txtRepeatPass"/><span id="password1.info"></span></div>
  </fieldset>
  <fieldset class="tip">
    密码规则：1.密码长度6-20位 2.密码只能包含大写字母、小写字母和数字
  </fieldset>
  <p class="sureBtn"><button type="submit">确定</button> <span id="submit.info"><%=msg %></span></p>
</form>
<br>
</body>
</html>
